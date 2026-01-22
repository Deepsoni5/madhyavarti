import Link from 'next/link'
import { format } from 'date-fns'
import { Folder, MoreVertical } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Badge } from '@/components/ui/badge'
import { CreateProjectDialog } from '@/components/admin/create-project-dialog'
import { getProjects, deleteProject } from '@/app/admin/data'
import { DeleteProjectButton } from '@/components/admin/delete-project-button'

export default async function DocumentsPage() {
  const projects = await getProjects()

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Projects</h1>
        <CreateProjectDialog />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project: any) => (
          <Link key={project.id} href={`/admin/documents/${project.id}`}>
            <Card className="h-full transition-colors hover:bg-muted/50 cursor-pointer">
              <CardHeader className="relative">
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Folder className="h-5 w-5 text-blue-500" />
                      <CardTitle className="line-clamp-1">{project.name}</CardTitle>
                    </div>
                    <CardDescription className="line-clamp-2 min-h-[2.5rem]">
                      {project.description || 'No description provided.'}
                    </CardDescription>
                  </div>
                </div>
                
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
                    {project.status}
                  </Badge>
                  {project.department && (
                    <Badge variant="outline">{project.department}</Badge>
                  )}
                </div>

                <div className="mt-4 text-xs text-muted-foreground">
                  Updated {format(new Date(project.updated_at), 'PP')}
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {projects.length === 0 && (
          <div className="col-span-full flex h-40 flex-col items-center justify-center rounded-lg border border-dashed text-center">
            <h3 className="text-lg font-semibold">No projects found</h3>
            <p className="text-sm text-muted-foreground">
              Create a new project to start uploading documents.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
