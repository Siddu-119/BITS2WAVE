import { Link } from 'react-router-dom'
import { BadgeCheck, MapPin } from 'lucide-react'
import Avatar from '../common/Avatar'
import StatusBadge from '../common/StatusBadge'
import { buttonClass } from '../common/Button'
import { experienceLabel, feeLabel } from '../../utils/format'

function Row({ label, value }) {
  return (
    <div className="grid gap-1 border-b border-line py-3 sm:grid-cols-[180px_1fr]">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="text-sm text-ink">{value || 'Not provided'}</dd>
    </div>
  )
}

export default function LawyerProfileView({ lawyer, bookTo, bookNote }) {
  const consultation = lawyer.consultation || {}
  const consultationText = [feeLabel(consultation.fee), consultation.mode, consultation.duration, consultation.details]
    .filter(Boolean)
    .join(' · ')

  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-sm sm:p-7">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <Avatar name={lawyer.name} src={lawyer.photoUrl} size={88} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="font-serif text-3xl text-navy-900">{lawyer.name || 'Lawyer'}</h2>
            <StatusBadge status={lawyer.verificationStatus} />
          </div>
          <p className="mt-2 text-sea-700">{lawyer.specialization || 'Practice area not provided'}</p>
          <p className="mt-2 flex items-center gap-2 text-sm text-muted">
            <MapPin size={16} />
            {lawyer.location || 'Location not provided'}
          </p>
          {lawyer.verificationStatus === 'verified' && (
            <p className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-emerald-700">
              <BadgeCheck size={16} />
              Verification badge: verified by the platform
            </p>
          )}
        </div>
      </div>
      <dl className="mt-6">
        <Row label="Qualifications" value={lawyer.qualifications} />
        <Row label="Experience" value={experienceLabel(lawyer.experience)} />
        <Row label="Location" value={lawyer.location} />
        <Row label="Bar Council number" value={lawyer.barCouncilNumber} />
        <Row label="Description" value={lawyer.description} />
        <Row label="Consultation" value={consultationText} />
      </dl>
      {lawyer.rejectionReason && (
        <p className="mt-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">Rejection reason: {lawyer.rejectionReason}</p>
      )}
      <div className="mt-6">
        {bookTo ? (
          <Link to={bookTo} className={buttonClass('primary')}>Book Appointment</Link>
        ) : (
          bookNote && <p className="text-sm text-muted">{bookNote}</p>
        )}
      </div>
    </article>
  )
}
