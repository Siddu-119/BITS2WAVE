import { NavLink } from 'react-router-dom'
import { LogOut, X } from 'lucide-react'
import Logo from '../common/Logo'

export default function Sidebar({ open, onClose, items, user, portalName, onLogout }) {
  return (
    <>
      {open && <button type="button" className="fixed inset-0 z-30 bg-navy-950/40 lg:hidden" aria-label="Close navigation" onClick={onClose} />}
      <aside className={`fixed inset-y-0 left-0 z-40 flex w-72 flex-col bg-navy-900 text-white transition-transform lg:static lg:translate-x-0 ${open ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
          <Logo tone="light" compact />
          <button type="button" className="rounded-lg p-2 lg:hidden" aria-label="Close navigation" onClick={onClose}>
            <X size={18} />
          </button>
        </div>
        <div className="px-4 py-4">
          <p className="text-xs font-semibold tracking-wide text-sea-100 uppercase">{portalName}</p>
          <p className="mt-1 truncate text-sm text-white">{user?.name || user?.email}</p>
        </div>
        <nav className="flex-1 space-y-1 overflow-y-auto px-3" aria-label="Dashboard">
          {items.map((item) => {
            const Icon = item.icon
            return (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => `flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold ${isActive ? 'bg-white text-navy-900' : 'text-sea-50 hover:bg-white/10'}`}
              >
                <Icon size={18} />
                {item.label}
              </NavLink>
            )
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button type="button" onClick={onLogout} className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold text-sea-50 hover:bg-white/10">
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </aside>
    </>
  )
}
