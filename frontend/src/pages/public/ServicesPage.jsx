import { Link } from 'react-router-dom'
import SectionHeading from '../../components/common/SectionHeading'
import { SPECIALIZATIONS } from '../../utils/constants'
import { buttonClass } from '../../components/common/Button'

const services = [
  ['Lawyer discovery', 'Search the directory by name, location, specialization, and years of experience.'],
  ['Profile review', 'Open a lawyer profile for qualifications, location, verification, and consultation details.'],
  ['Appointments', 'Clients request a date and time. Lawyers accept or reject. Both sides can see the status.'],
  ['Documents', 'Upload supporting papers and check the status returned for each file.'],
  ['Verification', 'Administrators review lawyer applications and the documents uploaded with them.'],
  ['AI legal information', 'Clients can ask general questions. The assistant is not a replacement for a qualified lawyer.'],
]

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
      <SectionHeading
        eyebrow="Services"
        title="Tools for finding, booking, and verifying local legal help"
        description="These are the services the interface is prepared to run with the backend. Nothing here is completed only on the screen."
      />
      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {services.map(([title, text]) => (
          <article key={title} className="rounded-2xl border border-line bg-white p-5 shadow-sm">
            <h2 className="font-semibold text-navy-900">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{text}</p>
          </article>
        ))}
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-3xl text-navy-900">Practice areas you can filter</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {SPECIALIZATIONS.map((item) => (
            <li key={item} className="rounded-full bg-white px-3 py-1.5 text-sm text-navy-900 ring-1 ring-line">{item}</li>
          ))}
        </ul>
        <Link to="/find-lawyers" className={`${buttonClass('primary')} mt-6`}>Search the directory</Link>
      </section>
    </div>
  )
}
