'use client'

import { useState } from 'react'
import { Eye, FileIcon } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'

interface DocumentPreviewDialogProps {
  url: string
  title: string
  format?: string
}

export function DocumentPreviewDialog({ url, title, format }: DocumentPreviewDialogProps) {
  const [isOpen, setIsOpen] = useState(false)
  
  // Determine if we can show a preview based on format
  const isImage = ['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(format?.toLowerCase() || '')
  const isPdf = format?.toLowerCase() === 'pdf'
  
  // Cloudinary PDF transformation for better embedding if needed, or just use URL
  const previewUrl = url

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-blue-500">
          <Eye className="h-4 w-4" />
          <span className="sr-only">Preview</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FileIcon className="h-5 w-5" />
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="flex-1 w-full h-full bg-muted/20 rounded-md overflow-hidden border mt-4 relative">
          {isImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img 
              src={previewUrl} 
              alt={title} 
              className="w-full h-full object-contain"
            />
          ) : isPdf ? (
            <iframe
              src={`${previewUrl}#toolbar=0`}
              className="w-full h-full"
              title={title}
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground p-8 text-center">
              <FileIcon className="h-16 w-16 mb-4 opacity-20" />
              <p className="text-lg font-medium">Preview not available for this file type</p>
              <p className="text-sm mb-6">You can download the file to view it.</p>
              <Button asChild>
                <a href={url} download target="_blank" rel="noopener noreferrer">
                  Download File
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
