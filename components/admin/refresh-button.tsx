'use client'

import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { RotateCw } from 'lucide-react'

export function RefreshButton() {
  const router = useRouter()

  const handleRefresh = () => {
    router.refresh()
  }

  return (
    <Button variant="outline" size="sm" onClick={handleRefresh} className="gap-2">
      <RotateCw className="h-4 w-4" />
      Refresh Data
    </Button>
  )
}
