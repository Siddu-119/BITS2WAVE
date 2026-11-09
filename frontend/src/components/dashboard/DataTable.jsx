import EmptyState from '../common/EmptyState'

export default function DataTable({ columns, rows, getRowId, emptyTitle, emptyDescription }) {
  if (!rows?.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />
  }
  return (
    <>
      <div className="space-y-3 md:hidden">
        {rows.map((row) => (
          <article key={getRowId(row)} className="rounded-2xl border border-line bg-white p-4 shadow-sm">
            {columns.map((column) => (
              <div key={column.key} className="flex items-start justify-between gap-3 border-b border-line py-2 last:border-0">
                <span className="text-sm text-muted">{column.header}</span>
                <span className="text-right text-sm text-ink">{column.render ? column.render(row) : row[column.key] || '—'}</span>
              </div>
            ))}
          </article>
        ))}
      </div>
      <div className="hidden overflow-x-auto rounded-2xl border border-line bg-white shadow-sm md:block">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-sea-50 text-muted">
            <tr>
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-3 font-semibold">{column.header}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={getRowId(row)} className="border-t border-line">
                {columns.map((column) => (
                  <td key={column.key} className="px-4 py-3 align-top text-ink">
                    {column.render ? column.render(row) : row[column.key] || '—'}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
