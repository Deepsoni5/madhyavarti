'use client'

import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteDocument } from '@/app/admin/data'
import { toast } from 'sonner'

export function DeleteDocumentButton({ id, publicId, projectId }: { id: string, publicId: string, projectId: string }) {
  const [loading, setLoading] = useState(false)

  async function handleDelete() {
    if (!confirm('Are you sure you want to delete this file?')) return

    setLoading(true)
    const result = await deleteDocument(id, publicId, projectId)
    
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Document deleted')
    }
    setLoading(false)
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      className="h-8 w-8 p-0 text-muted-foreground hover:text-red-500"
      onClick={handleDelete}
      disabled={loading}
    >
      <Trash className="h-4 w-4" />
      <span className="sr-only">Delete</span>
    </Button>
  )
}

import { useState } from 'react'
