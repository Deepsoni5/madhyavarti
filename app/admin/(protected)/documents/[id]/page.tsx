import Link from 'next/link'
import { format } from 'date-fns'
import { 
  ArrowLeft, 
  FileIcon, 
  Calendar, 
  Download, 
  Eye, 
  HardDrive,
  Users,
  Briefcase,
  Building
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { getProject, getDocuments } from '@/app/admin/data'
import { UploadDocumentDialog } from '@/components/admin/upload-document-dialog'
import { DeleteDocumentButton } from '@/components/admin/delete-document-button'
import { DeleteProjectButton } from '@/components/admin/delete-project-button'
import { DocumentPreviewDialog } from '@/components/admin/document-preview-dialog'

export default async function ProjectDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const project = await getProject(id)
  const documents = await getDocuments(id)

  if (!project) {
    return (
      <div className="flex h-[50vh] flex-col items-center justify-center gap-4 text-center">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <p className="text-muted-foreground">The project you are looking for does not exist or has been deleted.</p>
        <Button asChild>
          <Link href="/admin/documents">Back to Projects</Link>
        </Button>
      </div>
    )
  }

  // Group documents by type
  const groupedDocs = documents?.reduce((acc: any, doc: any) => {
    const type = doc.document_type || 'Other'
    if (!acc[type]) acc[type] = []
    acc[type].push(doc)
    return acc
  }, {})

  return (
    <div className="space-y-8 animate-in fade-in-50">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <Button variant="outline" size="icon" className="shrink-0" asChild>
            <Link href="/admin/documents">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <h1 className="text-3xl font-bold tracking-tight">{project.name}</h1>
              <Badge variant={project.status === 'Active' ? 'default' : 'secondary'} className="h-6">
                {project.status}
              </Badge>
            </div>
            <p className="text-muted-foreground max-w-2xl">
              {project.description || 'No description provided.'}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <UploadDocumentDialog projectId={id} />
          <DeleteProjectButton id={id} />
        </div>
      </div>

      {/* Project Details Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Client / Owner</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate" title={project.owner_client}>
              {project.owner_client || '-'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Partner</CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate" title={project.partner}>
              {project.partner || '-'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Department</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold truncate" title={project.department}>
              {project.department || '-'}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Created Date</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {format(new Date(project.created_at), 'MMM d, yyyy')}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Documents List */}
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold tracking-tight">Documents</h2>
          <div className="text-sm text-muted-foreground">
            Total: {documents?.length || 0} files
          </div>
        </div>
        
        {Object.keys(groupedDocs || {}).length === 0 ? (
          <Card className="flex h-60 flex-col items-center justify-center border-dashed bg-muted/20">
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="rounded-full bg-background p-3 shadow-sm">
                <FileIcon className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-semibold">No documents yet</h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                Upload contracts, invoices, and other documents to this project folder.
              </p>
              <div className="mt-2">
                <UploadDocumentDialog projectId={id} />
              </div>
            </div>
          </Card>
        ) : (
          <div className="grid gap-6">
            {Object.entries(groupedDocs).map(([type, docs]: [string, any]) => (
              <Card key={type} className="overflow-hidden">
                <CardHeader className="bg-muted/40 py-3">
                  <CardTitle className="text-base font-medium flex items-center gap-2">
                    <FolderOpen className="h-4 w-4 text-blue-500" />
                    {type}
                    <Badge variant="secondary" className="ml-auto text-xs font-normal">
                      {docs.length} {docs.length === 1 ? 'file' : 'files'}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[40%]">Title</TableHead>
                        <TableHead>Date Uploaded</TableHead>
                        <TableHead>Format</TableHead>
                        <TableHead>Size</TableHead>
                        <TableHead className="text-right">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {docs.map((doc: any) => (
                        <TableRow key={doc.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-3">
                              <div className="flex h-8 w-8 items-center justify-center rounded bg-blue-50 text-blue-600">
                                <FileIcon className="h-4 w-4" />
                              </div>
                              <span className="truncate max-w-[200px] sm:max-w-xs" title={doc.title}>
                                {doc.title}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {format(new Date(doc.uploaded_at), 'MMM d, yyyy p')}
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="uppercase text-[10px]">
                              {doc.file_format || 'FILE'}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-muted-foreground">
                            {doc.size ? `${(doc.size / 1024).toFixed(1)} KB` : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-1">
                              <DocumentPreviewDialog 
                                url={doc.file_url} 
                                title={doc.title} 
                                format={doc.file_format} 
                              />
                              <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-muted-foreground hover:text-green-600" asChild>
                                <a href={doc.file_url} target="_blank" rel="noopener noreferrer" download>
                                  <Download className="h-4 w-4" />
                                  <span className="sr-only">Download</span>
                                </a>
                              </Button>
                              <DeleteDocumentButton 
                                id={doc.id} 
                                publicId={doc.public_id} 
                                projectId={id}
                              />
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

import { FolderOpen } from 'lucide-react'
