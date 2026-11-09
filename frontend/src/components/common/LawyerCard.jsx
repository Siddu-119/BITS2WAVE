import { Link } from 'react-router-dom'
import { MapPin } from 'lucide-react'
import Avatar from './Avatar'
import StatusBadge from './StatusBadge'
import { buttonClass } from './Button'
import { experienceLabel } from '../../utils/format'

export default function LawyerCard({ lawyer, href }) {
  return (
    <article className="flex h-full flex-col rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3">
        <Avatar name={lawyer.name} src={lawyer.photoUrl} size={56} />
        <div className="min-w-0 flex-1">
          <h3 className="truncate font-serif text-xl text-navy-900">{lawyer.name || 'Lawyer'}</h3>
          <p className="mt-1 text-sm text-sea-700">{lawyer.specialization || 'Practice area not provided'}</p>
        </div>
      </div>
      <dl className="mt-4 space-y-2 text-sm text-muted">
        <div className="flex items-center gap-2">
          <MapPin size={15} />
          <dd>{lawyer.location || 'Location not provided'}</dd>
        </div>
        <div className="flex items-center justify-between gap-3">
          <dt>Experience</dt>
          <dd className="text-ink">{experienceLabel(lawyer.experience)}</dd>
        </div>
      </dl>
      <div className="mt-4">
        <StatusBadge status={lawyer.verificationStatus} />
      </div>
      <div className="mt-5">
        {lawyer.id && href ? (
          <Link to={href} className={buttonClass('secondary', 'w-full')}>View profile</Link>
        ) : (
          <p className="text-sm text-muted">This record has no identifier, so the profile cannot be opened.</p>
        )}
      </div>
    </article>
  )
}
