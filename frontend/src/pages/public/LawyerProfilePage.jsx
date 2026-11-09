import { Link, useParams } from 'react-router-dom'
import LawyerProfileView from '../../components/lawyers/LawyerProfileView'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import { useResource } from '../../hooks/useResource'
import * as lawyerService from '../../services/lawyerService'
import { getErrorMessage } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'

export default function LawyerProfilePage() {
  const { id } = useParams()
  const { user } = useAuth()
  const { data, loading, error, reload } = useResource(() => lawyerService.getById(id), [id])
  const bookTo = data?.id
    ? user?.role === 'client'
      ? `/client/appointments/book/${data.id}`
      : !user
        ? `/login?next=${encodeURIComponent(`/client/appointments/book/${data.id}`)}`
        : null
    : null

  return (
    <div className="mx-auto max-w-4xl px-4 py-14 lg:px-6">
      <Link to="/find-lawyers" className="text-sm font-semibold text-sea-700">Back to lawyers</Link>
      <div className="mt-4">
        {loading && !data ? <LoadingSpinner label="Loading profile" /> : null}
        {error && !data ? <ErrorMessage message={getErrorMessage(error)} onRetry={reload} /> : null}
        {data ? (
          <LawyerProfileView
            lawyer={data}
            bookTo={bookTo}
            bookNote={user && user.role !== 'client' ? 'Appointment requests are available to client accounts.' : ''}
          />
        ) : null}
      </div>
    </div>
  )
}
