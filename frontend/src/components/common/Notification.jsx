import { CheckCircle2, Info, X, XCircle } from 'lucide-react'

const tones = {
  success: 'border-emerald-200 bg-white text-navy-900',
  error: 'border-rose-200 bg-white text-navy-900',
  info: 'border-line bg-white text-navy-900',
}

const icons = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

export default function Notification({ item, onDismiss }) {
  const Icon = icons[item.type] || Info
  return (
    <div className={`rounded-xl border px-4 py-3 shadow-sm ${tones[item.type] || tones.info}`} role="status">
      <div className="flex items-start gap-3">
        <Icon size={18} className={item.type === 'error' ? 'text-rose-700' : 'text-sea-700'} />
        <p className="flex-1 text-sm leading-6">{item.message}</p>
        <button type="button" className="text-muted" aria-label="Dismiss notification" onClick={() => onDismiss(item.id)}>
          <X size={16} />
        </button>
      </div>
    </div>
  )
}
