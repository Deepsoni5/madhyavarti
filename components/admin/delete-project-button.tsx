'use client'

import { Trash } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { deleteProject } from '@/app/admin/data'
import { toast } from 'sonner'

export function DeleteProjectButton({ id }: { id: string }) {
  async function handleDelete(e: React.MouseEvent) {
    e.preventDefault() // Prevent navigation
    e.stopPropagation()
    
    if (!confirm('Are you sure you want to delete this project and all its files?')) return

    const result = await deleteProject(id)
    if (result.error) {
      toast.error(result.error)
    } else {
      toast.success('Project deleted')
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="absolute right-4 top-4 h-8 w-8 text-muted-foreground hover:text-red-500"
      onClick={handleDelete}
    >
      <Trash className="h-4 w-4" />
    </Button>
  )
}
