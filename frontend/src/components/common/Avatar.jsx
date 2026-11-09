import { useState } from 'react'
import { initials } from '../../utils/format'

export default function Avatar({ name, src, size = 48 }) {
  const [failed, setFailed] = useState(false)
  const style = { width: size, height: size }
  if (src && !failed) {
    return (
      <img
        src={src}
        alt=""
        style={style}
        className="rounded-full object-cover ring-1 ring-line"
        onError={() => setFailed(true)}
      />
    )
  }
  return (
    <span
      style={style}
      className="inline-flex items-center justify-center rounded-full bg-sea-100 text-sm font-semibold text-sea-700 ring-1 ring-line"
      aria-hidden="true"
    >
      {initials(name)}
    </span>
  )
}
