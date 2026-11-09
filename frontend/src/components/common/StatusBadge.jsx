import { formatStatus } from '../../utils/format'

const tones = {
  pending: 'bg-amber-50 text-amber-800 ring-amber-200',
  open: 'bg-amber-50 text-amber-800 ring-amber-200',
  accepted: 'bg-sky-50 text-sky-800 ring-sky-200',
  verified: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  approved: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  completed: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  active: 'bg-emerald-50 text-emerald-800 ring-emerald-200',
  rejected: 'bg-rose-50 text-rose-800 ring-rose-200',
  cancelled: 'bg-slate-100 text-slate-700 ring-slate-200',
  canceled: 'bg-slate-100 text-slate-700 ring-slate-200',
  suspended: 'bg-rose-50 text-rose-800 ring-rose-200',
}

export default function StatusBadge({ status }) {
  const key = String(status || 'unknown').toLowerCase()
  return (
    <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${tones[key] || 'bg-sea-50 text-navy-800 ring-line'}`}>
      {formatStatus(key)}
    </span>
  )
}
