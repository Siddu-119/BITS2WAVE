import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { buttonClass } from '../../components/common/Button'

const roleLabels = {
  client: 'Client',
  lawyer: 'Lawyer',
  admin: 'Administrator',
}

export default function DashboardPendingPage({ role }) {
  const { logout } = useAuth()

  return (
    <main className="mx-auto flex min-h-screen max-w-3xl flex-col justify-center px-4 py-12">
      <p className="text-sm font-semibold text-sea-700">{roleLabels[role]} workspace</p>
      <h1 className="mt-2 font-serif text-3xl text-navy-900">Your dashboard is not ready yet</h1>
      <p className="mt-4 max-w-2xl text-sm leading-7 text-muted">
        This account is signed in, but the {roleLabels[role].toLowerCase()} dashboard screens have not been implemented.
        No dashboard actions or account data are being simulated. Booking, document, verification, and assistant
        features will be added in their own modules after the required UI and backend contracts are confirmed.
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link to="/" className={buttonClass('primary')}>Return to home</Link>
        {role === 'client' && (
          <Link to="/find-lawyers" className={buttonClass('secondary')}>Find a lawyer</Link>
        )}
        <button type="button" className={buttonClass('secondary')} onClick={logout}>Sign out</button>
      </div>
    </main>
  )
}
