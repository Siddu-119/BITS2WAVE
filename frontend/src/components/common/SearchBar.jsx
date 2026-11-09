import { Search } from 'lucide-react'
import Button from './Button'
import { fieldClass } from './FormInput'

export default function SearchBar({ id = 'search', value, onChange, onSubmit, placeholder = 'Search' }) {
  return (
    <form
      className="flex flex-col gap-2 sm:flex-row"
      onSubmit={(event) => {
        event.preventDefault()
        onSubmit?.()
      }}
    >
      <div className="relative min-w-0 flex-1">
        <Search className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-muted" size={18} />
        <input
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          className={`${fieldClass} pl-10`}
        />
      </div>
      <Button type="submit">Search</Button>
    </form>
  )
}
