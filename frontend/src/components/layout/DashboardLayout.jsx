import { useEffect, useState } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import { Menu } from 'lucide-react'
import Sidebar from './Sidebar'
import { useAuth } from '../../hooks/useAuth'

export default function DashboardLayout({ items, portalName }) {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const { user, logout } = useAuth()
  const current = [...items].reverse().find((item) => (item.end ? location.pathname === item.to : location.pathname === item.to || location.pathname.startsWith(`${item.to}/`)))

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  return (
    <div className="min-h-screen bg-sea-50 lg:flex">
      <Sidebar open={open} onClose={() => setOpen(false)} items={items} user={user} portalName={portalName} onLogout={logout} />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-20 flex items-center gap-3 border-b border-line bg-white/95 px-4 py-3 backdrop-blur lg:px-8">
          <button type="button" className="rounded-lg p-2 text-navy-900 lg:hidden" aria-label="Open navigation" onClick={() => setOpen(true)}>
            <Menu size={20} />
          </button>
          <h1 className="truncate font-serif text-xl text-navy-900">{current?.label || portalName}</h1>
          <p className="ml-auto hidden text-sm text-muted sm:block">{user?.email}</p>
        </header>
        <main className="px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
