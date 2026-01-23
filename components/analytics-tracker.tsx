'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { logVisit } from '@/app/analytics-actions'

export function AnalyticsTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Log visit and handle potential errors
    logVisit(pathname).then(result => {
      if (!result.success) {
        console.error('Analytics tracking failed:', result.error)
      }
    })
  }, [pathname, searchParams])

  return null
}
