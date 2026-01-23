'use client'

import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Input } from '@/components/ui/input'
import { MapPin, Search } from 'lucide-react'
import { format } from 'date-fns'

interface Visit {
  page_path: string
  user_agent: string
  created_at: string
  country: string
  city: string
}

interface ActivityTableProps {
  visits: Visit[]
}

export function ActivityTable({ visits }: ActivityTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchTerm, setSearchTerm] = useState('')
  const itemsPerPage = 25

  // Filter based on search term
  const filteredVisits = visits.filter((visit) => {
    const searchLower = searchTerm.toLowerCase()
    return (
      visit.page_path.toLowerCase().includes(searchLower) ||
      visit.city?.toLowerCase().includes(searchLower) ||
      visit.country?.toLowerCase().includes(searchLower)
    )
  })

  // Pagination logic
  const totalPages = Math.ceil(filteredVisits.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedVisits = filteredVisits.slice(startIndex, startIndex + itemsPerPage)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 max-w-sm">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search by page or location..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value)
            setCurrentPage(1) // Reset to first page on search
          }}
          className="h-8"
        />
      </div>

      <div className="rounded-md border">
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
            {paginatedVisits.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8 text-muted-foreground">
                  No activity found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedVisits.map((visit, i) => (
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
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(currentPage - 1)
                }}
                className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
            
            <span className="text-sm text-muted-foreground px-2">
              Page {currentPage} of {totalPages}
            </span>

            <PaginationItem>
              <PaginationNext 
                href="#" 
                onClick={(e) => {
                  e.preventDefault()
                  handlePageChange(currentPage + 1)
                }}
                className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
