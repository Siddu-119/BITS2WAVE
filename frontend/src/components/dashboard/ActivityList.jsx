export default function ActivityList({ items, emptyTitle, emptyDescription }) {
  if (!items?.length) {
    return <p className="text-sm text-muted">{emptyDescription || emptyTitle}</p>
  }
  return (
    <ul className="divide-y divide-line">
      {items.map((item) => (
        <li key={item.id} className="py-3">
          <p className="font-medium text-navy-900">{item.title}</p>
          {item.detail && <p className="mt-1 text-sm text-muted">{item.detail}</p>}
        </li>
      ))}
    </ul>
  )
}
