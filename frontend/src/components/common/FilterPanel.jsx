export default function FilterPanel({ children, onReset }) {
  return (
    <section className="rounded-2xl border border-line bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-center justify-between gap-3">
        <h2 className="text-sm font-semibold text-navy-900">Filters</h2>
        {onReset && (
          <button type="button" className="text-sm font-semibold text-sea-700" onClick={onReset}>
            Reset
          </button>
        )}
      </div>
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">{children}</div>
    </section>
  )
}
