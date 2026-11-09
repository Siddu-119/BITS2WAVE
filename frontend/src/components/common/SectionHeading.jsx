export default function SectionHeading({ eyebrow, title, description, align = 'left' }) {
  return (
    <div className={align === 'center' ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      {eyebrow && <p className="text-sm font-semibold tracking-wide text-sea-700 uppercase">{eyebrow}</p>}
      <h2 className="mt-2 font-serif text-3xl text-navy-900 sm:text-4xl">{title}</h2>
      {description && <p className="mt-3 text-base leading-7 text-muted">{description}</p>}
    </div>
  )
}
