'use server'

import { createClient } from '@/lib/supabase/server'

export async function getAnalyticsData() {
  const supabase = await createClient()

  // We fetch last 5000 visits to aggregate in memory for now.
  const { data: visits, error } = await supabase
    .from('site_visits')
    .select('visitor_id, page_path, created_at, user_agent, country, city')
    .order('created_at', { ascending: false })
    .limit(5000)

  if (error) {
    console.error('Analytics Fetch Error:', error)
    return null
  }

  if (!visits) return null

  const totalVisits = visits.length
  
  // Unique Visitors
  const uniqueVisitors = new Set(visits.map(v => v.visitor_id)).size

  // Top Pages (All)
  const pageCounts: Record<string, number> = {}
  visits.forEach(v => {
    pageCounts[v.page_path] = (pageCounts[v.page_path] || 0) + 1
  })
  
  const topPages = Object.entries(pageCounts)
    .sort(([, a], [, b]) => b - a)
    .map(([path, count]) => ({ path, count }))

  // Top Countries
  const countryCounts: Record<string, number> = {}
  visits.forEach(v => {
    const c = v.country && v.country !== 'Unknown' ? v.country : 'Other'
    countryCounts[c] = (countryCounts[c] || 0) + 1
  })

  const topCountries = Object.entries(countryCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10) // Top 10 countries
    .map(([country, count]) => ({ country, count }))

  // Device Stats (Simple Mobile/Desktop split)
  const devices = visits.reduce((acc: any, v) => {
    const type = v.user_agent.includes('Mobile') ? 'Mobile' : 'Desktop'
    acc[type] = (acc[type] || 0) + 1
    return acc
  }, { Mobile: 0, Desktop: 0 })

  return {
    totalVisits,
    uniqueVisitors,
    topPages,
    recentVisits: visits,
    devices,
    topCountries
  }
}
