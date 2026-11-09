import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export default function ProtectedRoute({ loginPath = '/login' }) {
  const { user } = useAuth()
  const location = useLocation()
  if (!user) {
    const next = encodeURIComponent(location.pathname + location.search)
    return <Navigate to={`${loginPath}?next=${next}`} replace />
  }
  return <Outlet />
}
