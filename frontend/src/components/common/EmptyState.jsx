import { Inbox } from 'lucide-react'

export default function EmptyState({ title, description, action, icon: Icon = Inbox }) {
  return (
    <div className="rounded-2xl border border-dashed border-line bg-white px-6 py-12 text-center">
      <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-sea-100 text-sea-700">
        <Icon size={22} />
      </span>
      <h3 className="mt-4 font-serif text-2xl text-navy-900">{title}</h3>
      {description && <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">{description}</p>}
      {action && <div className="mt-5">{action}</div>}
    </div>
  )
}
