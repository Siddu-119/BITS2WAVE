import { Link, Navigate } from 'react-router-dom'
import { Scale, UserRound } from 'lucide-react'
import AuthLayout from '../../components/layout/AuthLayout'
import { useAuth } from '../../hooks/useAuth'
import { homeByRole } from '../../utils/constants'

const roles = [
  {
    to: '/register/client',
    title: 'I need a lawyer',
    text: 'Create a client account to search verified lawyers, book appointments, and keep documents in one place.',
    icon: UserRound,
  },
  {
    to: '/register/lawyer',
    title: 'I am a lawyer',
    text: 'Submit your practice details and Bar Council registration for administrator verification.',
    icon: Scale,
  },
]

export default function RoleSelectPage() {
  const { user } = useAuth()
  if (user) return <Navigate to={homeByRole[user.role] || '/'} replace />

  return (
    <AuthLayout title="Create an account" subtitle="Choose how you will use the marketplace. Administrator accounts are issued separately.">
      <div className="space-y-3">
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <Link key={role.to} to={role.to} className="flex gap-3 rounded-2xl border border-line bg-white p-4 shadow-sm hover:border-sea-600">
              <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-sea-100 text-sea-700">
                <Icon size={20} />
              </span>
              <span>
                <span className="block font-semibold text-navy-900">{role.title}</span>
                <span className="mt-1 block text-sm leading-6 text-muted">{role.text}</span>
              </span>
            </Link>
          )
        })}
      </div>
      <p className="mt-4 text-sm text-muted">
        Already registered? <Link className="font-semibold text-sea-700" to="/login">Login</Link>
      </p>
    </AuthLayout>
  )
}
