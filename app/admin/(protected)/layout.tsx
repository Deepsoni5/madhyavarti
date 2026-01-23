import { createClient } from '@/lib/supabase/server'
import { redirect } from 'next/navigation'
import { AdminSidebar, MobileSidebar } from '@/components/admin/sidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin')
  }

  return (
    <div className="flex min-h-screen w-full flex-col md:flex-row">
      <AdminSidebar />
      <div className="flex flex-col flex-1">
        <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-6 md:hidden">
          <MobileSidebar />
          <span className="font-semibold">Admin Panel</span>
        </header>
        <main className="flex-1 overflow-y-auto bg-background p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
