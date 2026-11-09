import { useEffect } from 'react'

export default function Modal({ open, title, onClose, children, wide = false }) {
  useEffect(() => {
    if (!open) return undefined
    const onKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = previous
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center p-4 sm:items-center" role="presentation">
      <button type="button" className="absolute inset-0 bg-navy-950/50" aria-label="Close dialog" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className={`relative max-h-[90vh] w-full overflow-y-auto rounded-2xl bg-white p-5 shadow-xl sm:p-6 ${wide ? 'max-w-3xl' : 'max-w-lg'}`}
      >
        <h2 id="dialog-title" className="font-serif text-2xl text-navy-900">{title}</h2>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  )
}
