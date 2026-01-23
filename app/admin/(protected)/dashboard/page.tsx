import Link from 'next/link'
import { 
  FolderOpen, 
  FileText, 
  Activity, 
  ArrowUpRight, 
  Clock,
  Plus,
  Eye,
  Users,
  BarChart3,
  MapPin
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
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <p className="text-muted-foreground">
            Overview of projects, documents, and site analytics.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <CreateProjectDialog />
        </div>
      </div>

      {/* Stats Cards */}
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
            <CardTitle className="text-sm font-medium">Total Site Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalVisits}</div>
            <p className="text-xs text-muted-foreground">
              All time page views
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
             <Button size="sm" variant="outline" className="w-full" asChild>
              <Link href="/admin/analytics">View Full Report</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        
        {/* Recent Projects */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
            <CardDescription>
              Latest projects added to the system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Project</TableHead>
                  <TableHead>Dept</TableHead>
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
        
        {/* Top Pages */}
        <Card className="col-span-1 lg:col-span-3">
          <CardHeader>
            <CardTitle>Top Visited Pages</CardTitle>
            <CardDescription>
              Most popular pages on your site.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stats.topPages.slice(0, 3).map((page: any, i: number) => (
                <div key={page.path} className="flex items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-sm font-medium">
                    {i + 1}
                  </div>
                  <div className="ml-4 space-y-1 flex-1">
                    <p className="text-sm font-medium leading-none truncate" title={page.path}>
                      {page.path === '/' ? 'Home Page' : page.path}
                    </p>
                  </div>
                  <div className="font-bold text-sm">
                    {page.count}
                  </div>
                </div>
              ))}
              {stats.topPages.length === 0 && (
                <div className="text-center text-muted-foreground py-8 text-sm">
                  No visit data available yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-7">
        
        {/* Recent Uploads */}
        <Card className="col-span-1 lg:col-span-3">
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

        {/* Recent Live Visits */}
        <Card className="col-span-1 lg:col-span-4">
          <CardHeader>
            <CardTitle>Live Activity Log</CardTitle>
            <CardDescription>
              Real-time visitor activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Page</TableHead>
                  <TableHead className="hidden sm:table-cell">Device</TableHead>
                  <TableHead className="hidden md:table-cell">Location</TableHead>
                  <TableHead className="text-right">Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stats.recentVisits.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                      No recent activity.
                    </TableCell>
                  </TableRow>
                ) : (
                  stats.recentVisits.map((visit: any, i: number) => (
                    <TableRow key={i}>
                      <TableCell className="font-medium">
                        <span className="truncate block max-w-[150px] sm:max-w-xs" title={visit.page_path}>
                          {visit.page_path}
                        </span>
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-xs text-muted-foreground truncate max-w-[150px]" title={visit.user_agent}>
                        {visit.user_agent.includes('Mobile') ? 'Mobile' : 'Desktop'}
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span className="truncate max-w-[120px]" title={`${visit.city || ''}, ${visit.country || ''}`}>
                             {visit.country === 'Unknown' ? 'Unknown' : `${visit.city || ''}, ${visit.country}`}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell className="text-right text-xs text-muted-foreground">
                        {format(new Date(visit.created_at), 'h:mm a')}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
