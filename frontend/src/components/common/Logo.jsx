import { Scale } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PLATFORM } from '../../utils/constants'

export default function Logo({ tone = 'dark', compact = false }) {
  const light = tone === 'light'
  return (
    <Link to="/" className="inline-flex items-center gap-2.5">
      <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${light ? 'bg-white text-navy-900' : 'bg-navy-900 text-white'}`}>
        <Scale size={20} />
      </span>
      <span className="leading-tight">
        <span className={`block font-serif text-lg ${light ? 'text-white' : 'text-navy-900'}`}>{PLATFORM.name}</span>
        {!compact && <span className={`block text-xs ${light ? 'text-sea-100' : 'text-muted'}`}>{PLATFORM.descriptor}</span>}
      </span>
    </Link>
  )
}
