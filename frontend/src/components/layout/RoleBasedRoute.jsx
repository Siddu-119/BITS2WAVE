import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { homeByRole } from '../../utils/constants'

export default function RoleBasedRoute({ allow }) {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  if (!allow.includes(user.role)) return <Navigate to={homeByRole[user.role] || '/'} replace />
  return <Outlet />
}
