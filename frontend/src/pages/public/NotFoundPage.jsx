import { Link } from 'react-router-dom'
import { buttonClass } from '../../components/common/Button'

export default function NotFoundPage() {
  return (
    <div className="mx-auto max-w-xl px-4 py-20 text-center">
      <p className="text-sm font-semibold text-sea-700">404</p>
      <h1 className="mt-2 font-serif text-4xl text-navy-900">This page is not on the site</h1>
      <p className="mt-3 text-sm leading-6 text-muted">The address may be mistyped, or the page has moved.</p>
      <Link to="/" className={`${buttonClass('primary')} mt-6`}>Go to home</Link>
    </div>
  )
}
