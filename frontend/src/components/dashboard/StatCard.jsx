export default function StatCard({ label, value, icon: Icon, hint, error }) {
  return (
    <article className="rounded-2xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted">{label}</p>
          <p className="mt-2 font-serif text-3xl text-navy-900">{error ? '—' : value ?? '—'}</p>
        </div>
        {Icon && (
          <span className="rounded-xl bg-sea-100 p-2.5 text-sea-700">
            <Icon size={18} />
          </span>
        )}
      </div>
      {hint && !error && <p className="mt-3 text-sm text-muted">{hint}</p>}
      {error && <p className="mt-3 text-sm text-rose-700">{error}</p>}
    </article>
  )
}
