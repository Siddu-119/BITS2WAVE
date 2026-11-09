import { Link } from 'react-router-dom'
import Logo from '../common/Logo'
import { DISCLAIMER } from '../../utils/constants'

export default function AuthLayout({ title, subtitle, children }) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <section className="hidden flex-col justify-between bg-navy-900 px-12 py-10 text-white lg:flex">
        <Logo tone="light" />
        <div>
          <p className="font-serif text-4xl leading-tight">Legal help, closer to home.</p>
          <p className="mt-4 max-w-md text-base leading-7 text-sea-100">
            Verified local lawyers for people in rural, tier-2 and tier-3 areas, with appointments, documents, and clear verification.
          </p>
        </div>
        <p className="max-w-md text-sm leading-6 text-sea-100">{DISCLAIMER}</p>
      </section>
      <section className="flex flex-col bg-sea-50 px-4 py-8 sm:px-8">
        <div className="lg:hidden"><Logo /></div>
        <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center py-8">
          <h1 className="font-serif text-3xl text-navy-900">{title}</h1>
          {subtitle && <p className="mt-2 text-sm leading-6 text-muted">{subtitle}</p>}
          <div className="mt-6">{children}</div>
          <p className="mt-8 text-sm">
            <Link className="font-semibold text-sea-700" to="/">Back to home</Link>
          </p>
        </div>
      </section>
    </div>
  )
}
