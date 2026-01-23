import { getAnalyticsData } from '@/app/admin/analytics-data'
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
import { Eye, Users, Smartphone, Monitor, Globe, MapPin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { format } from 'date-fns'
import { RefreshButton } from '@/components/admin/refresh-button'

export default async function AnalyticsPage() {
  const data = await getAnalyticsData()

  if (!data) {
    return <div className="p-8">Loading analytics...</div>
  }

  return (
    <div className="space-y-8 animate-in fade-in-50">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Visitors Analytics</h2>
          <p className="text-muted-foreground">
            Detailed insights into your website traffic and user behavior.
          </p>
        </div>
        <RefreshButton />
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalVisits}</div>
            <p className="text-xs text-muted-foreground">
              All time page views
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unique Visitors</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.uniqueVisitors}</div>
            <p className="text-xs text-muted-foreground">
              Distinct users
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Mobile Users</CardTitle>
            <Smartphone className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.devices.Mobile}</div>
            <p className="text-xs text-muted-foreground">
              Visits from mobile devices
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Desktop Users</CardTitle>
            <Monitor className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.devices.Desktop}</div>
            <p className="text-xs text-muted-foreground">
              Visits from desktop computers
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        {/* Most Visited Pages */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Most Popular Pages</CardTitle>
            <CardDescription>
              Pages with the highest traffic volume.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {data.topPages.slice(0, 10).map((page: any, i: number) => (
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
              {data.topPages.length === 0 && (
                <div className="text-center text-muted-foreground py-8 text-sm">
                  No visit data available yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Top Locations */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Top Locations</CardTitle>
            <CardDescription>
              Countries with the most visitors.
            </CardDescription>
          </CardHeader>
          <CardContent>
             <div className="space-y-4">
              {data.topCountries?.map((country: any, i: number) => (
                <div key={i} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium">{country.country}</p>
                      <p className="text-xs text-muted-foreground">{country.count} visits</p>
                    </div>
                  </div>
                  <Badge variant="secondary">{Math.round((country.count / data.totalVisits) * 100)}%</Badge>
                </div>
              ))}
              {(!data.topCountries || data.topCountries.length === 0) && (
                <div className="text-center text-muted-foreground py-8 text-sm">
                  No location data available yet.
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity Table */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Real-time log of the latest 100 visits.
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
              {data.recentVisits.slice(0, 100).map((visit: any, i: number) => (
                <TableRow key={i}>
                  <TableCell className="font-medium">
                    <span className="truncate block max-w-[200px] sm:max-w-md" title={visit.page_path}>
                      {visit.page_path}
                    </span>
                  </TableCell>
                  <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                    {visit.user_agent.includes('Mobile') ? 'Mobile' : 'Desktop'}
                  </TableCell>
                  <TableCell className="hidden md:table-cell text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      <span className="truncate max-w-[150px]" title={`${visit.city || ''}, ${visit.country || ''}`}>
                          {visit.country === 'Unknown' ? 'Unknown' : `${visit.city || ''}, ${visit.country}`}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="text-right text-xs text-muted-foreground">
                    {format(new Date(visit.created_at), 'MMM d, h:mm a')}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
