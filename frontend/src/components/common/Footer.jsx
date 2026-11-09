import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import Logo from './Logo'
import { contactInfo, DISCLAIMER } from '../../utils/constants'

const groups = [
  {
    title: 'Explore',
    links: [
      ['Home', '/'],
      ['Find Lawyers', '/find-lawyers'],
      ['About', '/about'],
      ['Services', '/services'],
      ['Contact', '/contact'],
    ],
  },
  {
    title: 'Account',
    links: [
      ['Login', '/login'],
      ['Register', '/register'],
      ['Lawyer registration', '/register/lawyer'],
      ['Admin entrance', '/admin/login'],
    ],
  },
]

export default function Footer() {
  return (
    <footer className="mt-auto bg-navy-950 text-sea-50">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4 lg:px-6">
        <div>
          <Logo tone="light" />
          <p className="mt-4 text-sm leading-6 text-sea-100">
            A marketplace for verified local lawyers, with particular attention to rural, tier-2 and tier-3 communities.
          </p>
        </div>
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="font-semibold text-white">{group.title}</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {group.links.map(([label, to]) => (
                <li key={to}>
                  <Link className="text-sea-100 hover:text-white" to={to}>{label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <h2 className="font-semibold text-white">Contact</h2>
          <ul className="mt-3 space-y-3 text-sm text-sea-100">
            {contactInfo.address ? <li className="flex gap-2"><MapPin size={16} className="mt-0.5 shrink-0" />{contactInfo.address}</li> : null}
            {contactInfo.phone ? <li className="flex gap-2"><Phone size={16} className="mt-0.5 shrink-0" />{contactInfo.phone}</li> : null}
            {contactInfo.email ? <li className="flex gap-2"><Mail size={16} className="mt-0.5 shrink-0" />{contactInfo.email}</li> : null}
            {!contactInfo.address && !contactInfo.phone && !contactInfo.email && (
              <li>Public contact details will appear here once they are configured.</li>
            )}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs leading-5 text-sea-100 lg:px-6">
          <p>{DISCLAIMER}</p>
          <p>© {new Date().getFullYear()} Regional LegalTech Marketplace</p>
        </div>
      </div>
    </footer>
  )
}
