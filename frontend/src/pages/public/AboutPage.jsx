import SectionHeading from '../../components/common/SectionHeading'

const problems = [
  'People in smaller towns often travel a long way for a short legal consultation.',
  'It is hard to tell which lawyer is locally available and which profile has been checked.',
  'Appointment requests and papers are scattered across phone calls and messaging apps.',
  'Lawyers spend time answering the same introductory questions before a meeting.',
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-14 lg:px-6">
      <SectionHeading
        eyebrow="About"
        title="A marketplace for legal help that is actually nearby"
        description="Regional LegalTech Marketplace is a meeting place for clients and verified local lawyers, with extra attention to rural, tier-2 and tier-3 areas."
      />
      <div className="mt-10 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl text-navy-900">Mission</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            Make the first step of getting legal help practical: find a lawyer who practises in your area, see whether the profile is verified, and request a consultation without guessing who to call.
          </p>
        </article>
        <article className="rounded-2xl border border-line bg-white p-6 shadow-sm">
          <h2 className="font-serif text-2xl text-navy-900">Vision</h2>
          <p className="mt-3 text-sm leading-7 text-muted">
            A region where distance and town size do not decide whether someone can reach a qualified lawyer, and where verification is done by an administrator rather than assumed from a form.
          </p>
        </article>
      </div>
      <section className="mt-12">
        <h2 className="font-serif text-3xl text-navy-900">Problems this platform addresses</h2>
        <ul className="mt-5 grid gap-3 md:grid-cols-2">
          {problems.map((problem) => (
            <li key={problem} className="rounded-2xl bg-white px-5 py-4 text-sm leading-6 text-ink shadow-sm ring-1 ring-line">{problem}</li>
          ))}
        </ul>
      </section>
      <section className="mt-12 grid gap-4 lg:grid-cols-2">
        <article className="rounded-2xl bg-navy-900 p-6 text-white">
          <h2 className="font-serif text-2xl">For clients</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-sea-100">
            <li>Search lawyers by name, location, specialization, and experience.</li>
            <li>Read qualifications, consultation details, and verification status.</li>
            <li>Request appointments and keep related documents with the account.</li>
            <li>Use the assistant for general information in English or Kannada.</li>
          </ul>
        </article>
        <article className="rounded-2xl border border-line bg-white p-6">
          <h2 className="font-serif text-2xl text-navy-900">For lawyers</h2>
          <ul className="mt-4 space-y-2 text-sm leading-6 text-muted">
            <li>Publish a profile with practice details and consultation information.</li>
            <li>Submit documents for administrator verification.</li>
            <li>Accept or reject appointment requests and set available times.</li>
            <li>Read client enquiries and reply through the platform.</li>
          </ul>
        </article>
      </section>
    </div>
  )
}
