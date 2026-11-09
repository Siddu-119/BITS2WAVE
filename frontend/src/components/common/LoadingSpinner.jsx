import { Loader2 } from 'lucide-react'

export default function LoadingSpinner({ label = 'Loading', className = '' }) {
  return (
    <div className={`flex items-center justify-center gap-3 py-12 text-muted ${className}`} role="status">
      <Loader2 className="animate-spin text-sea-700" size={22} />
      <span className="text-sm font-medium">{label}</span>
    </div>
  )
}
