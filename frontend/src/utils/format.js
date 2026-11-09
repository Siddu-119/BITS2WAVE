export function formatStatus(value) {
  if (!value) return 'Unknown'
  return String(value)
    .replace(/[_-]+/g, ' ')
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

export function formatDate(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
}

export function formatDateTime(value) {
  if (!value) return '—'
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return date.toLocaleString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  })
}

export function initials(name) {
  const parts = String(name || '?')
    .trim()
    .split(/\s+/)
    .slice(0, 2)
  return parts.map((part) => part[0]?.toUpperCase() || '').join('') || '?'
}

export function experienceLabel(value) {
  if (value === 0 || value === '0') return '0 years'
  if (value === undefined || value === null || value === '') return 'Not provided'
  const text = String(value)
  return /year/i.test(text) ? text : `${text} years`
}

export function feeLabel(value) {
  if (value === undefined || value === null || value === '') return ''
  const text = String(value)
  return /^[₹\d]/.test(text) ? text : `₹${text}`
}

export function safeNext(next, role) {
  const fallback = role === 'admin' ? '/admin' : role === 'lawyer' ? '/lawyer' : role === 'client' ? '/client' : '/'
  if (!next || typeof next !== 'string' || !next.startsWith('/') || next.startsWith('//')) return fallback
  if (next === fallback || next.startsWith(`${fallback}/`)) return next
  return fallback
}
