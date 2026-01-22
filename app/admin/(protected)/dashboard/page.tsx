import Link from 'next/link'
import { 
  FolderOpen, 
  FileText, 
  Activity, 
  ArrowUpRight, 
  Clock,
  Plus
} from 'lucide-react'
import { format } from 'date-fns'

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
import { getStats, getRecentProjects, getRecentDocuments } from '@/app/admin/data'
import { CreateProjectDialog } from '@/components/admin/create-project-dialog'

export default async function DashboardPage() {
  const stats = await getStats()
  const recentProjects = await getRecentProjects()
  const recentDocuments = await getRecentDocuments()

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of your projects and document activity.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CreateProjectDialog />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <FolderOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.projects}</div>
            <p className="text-xs text-muted-foreground">
              {stats.activeProjects} active now
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.documents}</div>
            <p className="text-xs text-muted-foreground">
              Across {stats.projects} projects
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.projects > 0 
                ? `${Math.round((stats.activeProjects / stats.projects) * 100)}%` 
                : '0%'}
            </div>
            <p className="text-xs text-muted-foreground">
              Projects currently active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Quick Actions</CardTitle>
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent className="flex gap-2">
            <Button size="sm" className="w-full" asChild>
              <Link href="/admin/documents">View All</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>
              You have {stats.projects} total projects.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Project</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Created</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentProjects.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No projects found.
                    </TableCell>
                  </TableRow>
                ) : (
                  recentProjects.map((project: any) => (
                    <TableRow key={project.id}>
                      <TableCell className="font-medium">
                        <Link href={`/admin/documents/${project.id}`} className="hover:underline">
                          {project.name}
                        </Link>
                      </TableCell>
                      <TableCell>{project.department}</TableCell>
                      <TableCell>
                        <Badge variant={project.status === 'Active' ? 'default' : 'secondary'}>
                          {project.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground text-sm">
                        {format(new Date(project.created_at), 'MMM d')}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Uploads</CardTitle>
            <CardDescription>
              Latest documents added to the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentDocuments.length === 0 ? (
                <div className="text-center text-muted-foreground py-8 text-sm">
                  No documents uploaded yet.
                </div>
              ) : (
                recentDocuments.map((doc: any) => (
                  <div key={doc.id} className="flex items-center">
                    <div className="space-y-1 flex-1">
                      <p className="text-sm font-medium leading-none truncate max-w-[200px]" title={doc.title}>
                        {doc.title}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {doc.projects?.name} • {format(new Date(doc.uploaded_at), 'MMM d, p')}
                      </p>
                    </div>
                    <div className="ml-auto font-medium">
                      <Badge variant="outline" className="text-[10px] uppercase">
                        {doc.file_format || 'FILE'}
                      </Badge>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
