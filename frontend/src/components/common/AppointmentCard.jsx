import StatusBadge from './StatusBadge'
import { formatDate } from '../../utils/format'

export default function AppointmentCard({ appointment, partyLabel, partyName, actions }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{partyLabel}</p>
          <h3 className="font-serif text-xl text-navy-900">{partyName || 'Name not provided'}</h3>
        </div>
        <StatusBadge status={appointment.status} />
      </div>
      <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-2">
        <div>
          <dt className="text-muted">Date</dt>
          <dd className="font-medium text-ink">{formatDate(appointment.date)}</dd>
        </div>
        <div>
          <dt className="text-muted">Time</dt>
          <dd className="font-medium text-ink">{appointment.time || '—'}</dd>
        </div>
      </dl>
      {appointment.notes && <p className="mt-3 text-sm leading-6 text-muted">{appointment.notes}</p>}
      {appointment.rejectionReason && (
        <p className="mt-3 text-sm leading-6 text-rose-700">Reason: {appointment.rejectionReason}</p>
      )}
      {actions && <div className="mt-4 flex flex-wrap gap-2">{actions}</div>}
    </article>
  )
}
