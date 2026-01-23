'use server'

import { createClient } from '@/lib/supabase/server'
import { cookies } from 'next/headers'
import { headers } from 'next/headers'

export async function logVisit(pathname: string) {
  try {
    const supabase = await createClient()
    const cookieStore = await cookies()
    const headersList = await headers()
    
    // 1. Get or create visitor_id
    let visitorId = cookieStore.get('visitor_id')?.value
    
    if (!visitorId) {
      visitorId = crypto.randomUUID()
      // Set cookie for 1 year
      cookieStore.set('visitor_id', visitorId, { 
        expires: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        path: '/'
      })
    }

    // 2. IP and Location Logic
    let ip = headersList.get('x-forwarded-for')?.split(',')[0]
    if (!ip) ip = headersList.get('x-real-ip') || undefined
    
    // Fallback for local dev
    if (!ip || ip === '::1') ip = '127.0.0.1'

    let country = headersList.get('x-vercel-ip-country')
    let city = headersList.get('x-vercel-ip-city')

    // If no Vercel headers (e.g. local dev), try to fetch location via IP API
    if (!country || !city) {
      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 1000)
        
        // If local IP, query the API without IP to get the public IP of the machine
        // If public IP, query specifically for that IP
        const isLocal = !ip || ip === '127.0.0.1' || ip === '::1'
        const queryUrl = isLocal 
          ? 'http://ip-api.com/json/' 
          : `http://ip-api.com/json/${ip}`

        if (isLocal || (ip && ip !== 'Unknown')) {
          const response = await fetch(queryUrl, { 
            signal: controller.signal 
          })
          
          clearTimeout(timeoutId)
          
          if (response.ok) {
            const data = await response.json()
            if (data.status === 'success') {
              country = data.country
              city = data.city
              // If we were local, we can also update the IP to the real public one
              if (isLocal) {
                ip = data.query
              }
            }
          }
        }
      } catch (e) {
        // Ignore external API errors
      }
    }

    // 3. Get User Agent
    const userAgent = headersList.get('user-agent') || 'Unknown'

    // 4. Log the visit
    // We use the service_role key or public anonymous insert if policy allows.
    // Since we set up RLS for public insert, this standard client should work 
    // IF the client is not authenticated (anonymous).
    // However, createClient() in '@/lib/supabase/server' might use cookie-based auth.
    // If the user is an admin, it will log as them. That's fine.
    
    const { error } = await supabase.from('site_visits').insert({
      page_path: pathname,
      visitor_id: visitorId,
      user_agent: userAgent,
      ip_address: ip,
      country: country || 'Unknown',
      city: city || 'Unknown'
    })

    if (error) {
      console.error('Supabase Insert Error:', error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error: any) {
    console.error('Failed to log visit:', error)
    return { success: false, error: error.message }
  }
}
