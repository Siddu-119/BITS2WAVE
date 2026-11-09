import { Link, useNavigate } from 'react-router-dom'
import { BadgeCheck, Bot, CalendarCheck, FileText, MapPinned, ShieldCheck } from 'lucide-react'
import { DISTRICTS, DISCLAIMER, SPECIALIZATIONS } from '../../utils/constants'
import { fieldClass } from '../../components/common/FormInput'
import { buttonClass } from '../../components/common/Button'
import SectionHeading from '../../components/common/SectionHeading'
import LawyerCard from '../../components/common/LawyerCard'
import EmptyState from '../../components/common/EmptyState'
import LoadingSpinner from '../../components/common/LoadingSpinner'
import ErrorMessage from '../../components/common/ErrorMessage'
import { useResource } from '../../hooks/useResource'
import * as lawyerService from '../../services/lawyerService'
import * as userService from '../../services/userService'
import { getErrorMessage } from '../../services/api'
import { useAuth } from '../../hooks/useAuth'
import { homeByRole } from '../../utils/constants'

const steps = [
  ['Create an account', 'Register as a client, or submit a lawyer profile for verification.'],
  ['Find a local lawyer', 'Search by name, location, practice area, and experience.'],
  ['Book and prepare', 'Request a time, track the status, and share documents.'],
]

const features = [
  [BadgeCheck, 'Verified profiles', 'Lawyers are marked verified only after an administrator approves the application.'],
  [MapPinned, 'Local search', 'Filter by town or district, including places outside the largest cities.'],
  [CalendarCheck, 'Appointments', 'Request a consultation and follow it from pending to completed.'],
  [FileText, 'Documents', 'Upload papers and check the status returned by the server.'],
  [Bot, 'AI legal information', 'Ask general questions in English or Kannada. It is not a substitute for a lawyer.'],
  [ShieldCheck, 'Separate roles', 'Clients, lawyers, and administrators each have their own tools.'],
]

const reasons = [
  'Built for people who cannot easily travel to a city court or chamber.',
  'Verification status is visible before you book.',
  'Appointments and documents stay with the account that created them.',
  'Lawyers manage availability, requests, and their own profile.',
  'Administrators review applications instead of the screen deciding alone.',
  'The assistant can be used in English or Kannada.',
]

export default function HomePage() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const lawyers = useResource(() => lawyerService.list({ featured: true }), [])
  const stories = useResource(() => userService.testimonials(), [])

  const search = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const params = new URLSearchParams()
    ;['search', 'location', 'specialization'].forEach((key) => {
      const value = String(data.get(key) || '').trim()
      if (value) params.set(key, value)
    })
    navigate(`/find-lawyers?${params.toString()}`)
  }

  const assistantHref = user?.role === 'client' ? '/client/assistant' : user ? homeByRole[user.role] : '/register'

  return (
    <div>
      <section className="bg-white">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 lg:grid-cols-[1.1fr_0.9fr] lg:px-6 lg:py-20">
          <div>
            <p className="text-sm font-semibold tracking-wide text-sea-700 uppercase">Regional legal access</p>
            <h1 className="mt-3 font-serif text-4xl leading-tight text-navy-900 sm:text-5xl">
              Verified lawyers, closer to the town you live in.
            </h1>
            <p className="mt-4 max-w-xl text-lg leading-8 text-muted">
              Regional LegalTech Marketplace connects people with local lawyers, especially where travelling for legal help is difficult.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/find-lawyers" className={buttonClass('primary')}>Find Lawyers</Link>
              <Link to="/register" className={buttonClass('secondary')}>Create an account</Link>
            </div>
          </div>
          <form onSubmit={search} className="rounded-2xl border border-line bg-sea-50 p-5 shadow-sm">
            <h2 className="font-serif text-2xl text-navy-900">Search lawyers</h2>
            <div className="mt-4 space-y-3">
              <label className="block text-sm font-semibold text-navy-900">Lawyer name
                <input name="search" className={`${fieldClass} mt-1.5`} placeholder="Search by name" />
              </label>
              <label className="block text-sm font-semibold text-navy-900">Location
                <input name="location" list="home-districts" className={`${fieldClass} mt-1.5`} placeholder="District or town" />
              </label>
              <datalist id="home-districts">{DISTRICTS.map((district) => <option key={district} value={district} />)}</datalist>
              <label className="block text-sm font-semibold text-navy-900">Specialization
                <select name="specialization" className={`${fieldClass} mt-1.5`} defaultValue="">
                  <option value="">Any specialization</option>
                  {SPECIALIZATIONS.map((item) => <option key={item}>{item}</option>)}
                </select>
              </label>
              <button type="submit" className={buttonClass('primary', 'w-full')}>Search lawyers</button>
            </div>
          </form>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <SectionHeading eyebrow="How it works" title="Three steps from question to consultation" />
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {steps.map(([title, text], index) => (
            <li key={title} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
              <p className="font-serif text-3xl text-sea-700">0{index + 1}</p>
              <h3 className="mt-3 font-semibold text-navy-900">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <SectionHeading eyebrow="Key features" title="What the platform is built to do" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([Icon, title, text]) => (
              <article key={title} className="rounded-2xl border border-line p-5">
                <span className="inline-flex rounded-xl bg-sea-100 p-2.5 text-sea-700"><Icon size={18} /></span>
                <h3 className="mt-4 font-semibold text-navy-900">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <SectionHeading eyebrow="Why choose us" title="A clearer way to reach a local lawyer" />
        <ul className="mt-8 grid gap-3 md:grid-cols-2">
          {reasons.map((reason) => (
            <li key={reason} className="rounded-2xl border border-line bg-white px-5 py-4 text-sm leading-6 text-ink shadow-sm">{reason}</li>
          ))}
        </ul>
      </section>

      <section className="bg-navy-900 text-white">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-16 lg:grid-cols-2 lg:px-6">
          <div>
            <p className="text-sm font-semibold tracking-wide text-sea-100 uppercase">AI Legal Assistant</p>
            <h2 className="mt-2 font-serif text-3xl sm:text-4xl">General legal information, with the limit stated clearly.</h2>
            <p className="mt-4 text-base leading-7 text-sea-100">
              Clients can ask questions in English or Kannada. The assistant shows the answer returned by the server, along with any sources the server provides.
            </p>
            <Link to={assistantHref} className={`${buttonClass('secondary')} mt-6`}>Open the assistant</Link>
          </div>
          <div className="rounded-2xl bg-white p-5 text-ink">
            <p className="text-sm font-semibold text-navy-900">Disclaimer</p>
            <p className="mt-2 text-sm leading-6 text-muted">{DISCLAIMER}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
        <SectionHeading eyebrow="Featured lawyers" title="Profiles published by the server" description="This list is loaded from the lawyer directory. It stays empty until verified profiles are available." />
        <div className="mt-8">
          {lawyers.loading && !lawyers.data ? <LoadingSpinner label="Loading featured lawyers" /> : null}
          {lawyers.error && !lawyers.data ? <ErrorMessage message={getErrorMessage(lawyers.error)} onRetry={lawyers.reload} /> : null}
          {lawyers.data && lawyers.data.items.length === 0 ? (
            <EmptyState title="No featured lawyers yet" description="When the server returns lawyer profiles, they will appear in this section." />
          ) : null}
          {lawyers.data && lawyers.data.items.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              {lawyers.data.items.slice(0, 6).map((lawyer) => (
                <LawyerCard key={lawyer.id || lawyer.name} lawyer={lawyer} href={lawyer.id ? `/lawyers/${lawyer.id}` : ''} />
              ))}
            </div>
          ) : null}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 py-16 lg:px-6">
          <SectionHeading eyebrow="Testimonials" title="Stories from people who used the marketplace" />
          <div className="mt-8">
            {stories.loading && !stories.data ? <LoadingSpinner label="Loading stories" /> : null}
            {stories.error || stories.data?.length === 0 ? (
              <EmptyState title="No stories published yet" description="Client stories will appear here when the server provides them." action={<button type="button" className={buttonClass('secondary')} onClick={stories.reload}>Refresh</button>} />
            ) : null}
            {stories.data?.length > 0 ? (
              <div className="grid gap-4 md:grid-cols-3">
                {stories.data.map((story, index) => (
                  <blockquote key={story.id || index} className="rounded-2xl border border-line p-5">
                    <p className="text-sm leading-6 text-ink">{story.quote || story.message || story.text}</p>
                    <footer className="mt-4 text-sm font-semibold text-navy-900">{story.name || story.author || 'Client'}</footer>
                  </blockquote>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </section>
    </div>
  )
}
