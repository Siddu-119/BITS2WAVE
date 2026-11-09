import { AlertCircle } from 'lucide-react'
import { buttonClass } from './Button'

export default function ErrorMessage({ message, onRetry, title = 'Something needs attention' }) {
  return (
    <div className="rounded-2xl border border-rose-200 bg-white px-5 py-4" role="alert">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 shrink-0 text-rose-700" size={18} />
        <div>
          <p className="font-semibold text-navy-900">{title}</p>
          <p className="mt-1 text-sm leading-6 text-muted">{message}</p>
          {onRetry && (
            <button type="button" className={`${buttonClass('secondary')} mt-3`} onClick={onRetry}>
              Try again
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
