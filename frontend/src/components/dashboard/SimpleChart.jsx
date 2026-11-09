import { formatStatus } from '../../utils/format'

export default function SimpleChart({ items }) {
  if (!items?.length) return null
  const max = Math.max(...items.map((item) => item.value), 1)
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.label}>
          <div className="mb-1 flex justify-between gap-3 text-sm">
            <span className="text-ink">{formatStatus(item.label)}</span>
            <span className="font-semibold text-navy-900">{item.value}</span>
          </div>
          <div className="h-2 rounded-full bg-sea-100">
            <div className="h-2 rounded-full bg-sea-600" style={{ width: `${Math.max(4, (item.value / max) * 100)}%` }} />
          </div>
        </div>
      ))}
    </div>
  )
}
