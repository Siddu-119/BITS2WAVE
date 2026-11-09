import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import Logo from './Logo'
import { buttonClass } from './Button'
import { useAuth } from '../../hooks/useAuth'
import { homeByRole } from '../../utils/constants'

const links = [
  { to: '/', label: 'Home', end: true },
  { to: '/find-lawyers', label: 'Find Lawyers' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user } = useAuth()
  const close = () => setOpen(false)

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-white/95 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 lg:px-6" aria-label="Primary">
        <Logo />
        <button type="button" className="rounded-lg p-2 text-navy-900 lg:hidden" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen((value) => !value)}>
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
        <div className={`${open ? 'flex' : 'hidden'} absolute top-full right-0 left-0 flex-col gap-1 border-b border-line bg-white p-4 lg:static lg:flex lg:flex-row lg:items-center lg:border-0 lg:bg-transparent lg:p-0`}>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.end}
              onClick={close}
              className={({ isActive }) => `rounded-lg px-3 py-2 text-sm font-semibold ${isActive ? 'bg-sea-100 text-navy-900' : 'text-muted hover:bg-sea-50 hover:text-navy-900'}`}
            >
              {link.label}
            </NavLink>
          ))}
          <div className="mt-2 flex flex-col gap-2 lg:mt-0 lg:ml-3 lg:flex-row">
            {user ? (
              <NavLink to={homeByRole[user.role] || '/'} onClick={close} className={buttonClass('primary')}>Dashboard</NavLink>
            ) : (
              <>
                <NavLink to="/login" onClick={close} className={buttonClass('secondary')}>Login</NavLink>
                <NavLink to="/register" onClick={close} className={buttonClass('primary')}>Register</NavLink>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  )
}
