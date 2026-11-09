import { Loader2 } from 'lucide-react'

const variants = {
  primary: 'bg-navy-900 text-white hover:bg-navy-800',
  secondary: 'border border-line bg-white text-navy-900 hover:bg-sea-50',
  danger: 'border border-rose-200 bg-white text-rose-700 hover:bg-rose-50',
  ghost: 'text-navy-800 hover:bg-sea-100',
}

export function buttonClass(variant = 'primary', className = '') {
  return `inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-60 ${variants[variant] || variants.primary} ${className}`
}

export default function Button({ variant = 'primary', loading = false, children, className = '', ...props }) {
  return (
    <button className={buttonClass(variant, className)} disabled={loading || props.disabled} {...props}>
      {loading && <Loader2 className="animate-spin" size={16} />}
      {children}
    </button>
  )
}
