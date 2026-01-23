'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FileText, LayoutDashboard, LogOut, Menu, BarChart3 } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { signOut } from '@/app/admin/actions'
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
  SheetDescription,
} from '@/components/ui/sheet'

const sidebarItems = [
  {
    title: 'Dashboard',
    href: '/admin/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'Documents',
    href: '/admin/documents',
    icon: FileText,
  },
  {
    title: 'Analytics',
    href: '/admin/analytics',
    icon: BarChart3,
  },
]

interface SidebarContentProps {
  onLinkClick?: () => void
}

function SidebarContent({ onLinkClick }: SidebarContentProps) {
  const pathname = usePathname()

  return (
    <div className="flex h-full flex-col bg-muted/40">
      <div className="flex h-14 items-center border-b px-6">
        <Link 
          href="/admin/dashboard" 
          className="flex items-center gap-2 font-semibold"
          onClick={onLinkClick}
        >
          <span>Admin Panel</span>
        </Link>
      </div>
      <div className="flex-1 overflow-auto py-4">
        <nav className="grid items-start px-4 text-sm font-medium">
          {sidebarItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={onLinkClick}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:text-primary',
                pathname === item.href
                  ? 'bg-muted text-primary'
                  : 'text-muted-foreground'
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.title}
            </Link>
          ))}
        </nav>
      </div>
      <div className="mt-auto border-t p-4">
        <form action={signOut}>
          <Button type="submit" variant="ghost" className="w-full justify-start gap-2">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Button>
        </form>
      </div>
    </div>
  )
}

export function AdminSidebar() {
  return (
    <div className="hidden h-screen w-64 border-r md:block">
      <SidebarContent />
    </div>
  )
}

export function MobileSidebar() {
  const [open, setOpen] = useState(false)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle Menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-64 p-0">
        <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
        <SheetDescription className="sr-only">
          Main navigation links for the admin panel
        </SheetDescription>
        <SidebarContent onLinkClick={() => setOpen(false)} />
      </SheetContent>
    </Sheet>
  )
}
