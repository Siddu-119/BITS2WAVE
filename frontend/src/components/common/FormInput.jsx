import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'

export const fieldClass =
  'w-full rounded-xl border border-line bg-white px-3 py-2.5 text-sm text-ink outline-none transition focus:ring-2 focus:ring-sea-600'

function Label({ label, required }) {
  return (
    <span className="mb-1.5 block text-sm font-semibold text-navy-900">
      {label}
      {required && <span className="text-rose-700"> *</span>}
    </span>
  )
}

function Hint({ error }) {
  if (!error) return null
  return <span className="mt-1 block text-sm text-rose-700">{error}</span>
}

export function FormInput({ label, error, required, registration, ...props }) {
  return (
    <label className="block">
      <Label label={label} required={required} />
      <input className={fieldClass} {...registration} {...props} />
      <Hint error={error} />
    </label>
  )
}

export function FormSelect({ label, error, required, registration, children, ...props }) {
  return (
    <label className="block">
      <Label label={label} required={required} />
      <select className={fieldClass} {...registration} {...props}>
        {children}
      </select>
      <Hint error={error} />
    </label>
  )
}

export function FormTextarea({ label, error, required, registration, rows = 4, ...props }) {
  return (
    <label className="block">
      <Label label={label} required={required} />
      <textarea className={fieldClass} rows={rows} {...registration} {...props} />
      <Hint error={error} />
    </label>
  )
}

export function PasswordInput({ label, error, required, registration, ...props }) {
  const [visible, setVisible] = useState(false)
  return (
    <label className="block">
      <Label label={label} required={required} />
      <span className="relative block">
        <input type={visible ? 'text' : 'password'} className={`${fieldClass} pr-11`} {...registration} {...props} />
        <button
          type="button"
          className="absolute top-1/2 right-3 -translate-y-1/2 text-muted"
          aria-label={visible ? 'Hide password' : 'Show password'}
          onClick={() => setVisible((current) => !current)}
        >
          {visible ? <EyeOff size={18} /> : <Eye size={18} />}
        </button>
      </span>
      <Hint error={error} />
    </label>
  )
}

export function FilePicker({ label, error, required, file, onChange, accept = '.pdf,.png,.jpg,.jpeg' }) {
  return (
    <label className="block">
      <Label label={label} required={required} />
      <input
        type="file"
        accept={accept}
        className={`${fieldClass} file:mr-3 file:rounded-lg file:border-0 file:bg-sea-100 file:px-3 file:py-1.5 file:text-sm file:font-semibold file:text-navy-900`}
        onChange={(event) => onChange(event.target.files?.[0] || null)}
      />
      {file && <span className="mt-1 block text-sm text-muted">{file.name}</span>}
      <Hint error={error} />
    </label>
  )
}
