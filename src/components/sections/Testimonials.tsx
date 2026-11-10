import { getProgram } from '../../data/programs'
import { site } from '../../data/site'
import { testimonials } from '../../data/testimonials'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'
import { Stars } from '../ui/Stars'

const initials = (name: string) =>
  name
    .split(' ')
    .map((part) => part[0])
    .join('')

export function Testimonials() {
  return (
    <section aria-labelledby="testimonials-title" className="section-y bg-white">
      <div className="container-site">
        <SectionHeading
          id="testimonials-title"
          eyebrow="Testimonials"
          title="What clients say after the first few months."
          intro={
            <>
              <span className="font-semibold text-ink">{site.rating.average} out of 5</span> average across{' '}
              {site.rating.count}+ client reviews.
            </>
          }
        />

        <ul className="mt-14 grid gap-6 md:grid-cols-2">
          {testimonials.map((t, i) => (
            <li key={t.name}>
              <Reveal delay={(i % 2) * 0.08} className="h-full">
                <figure className="flex h-full flex-col rounded-card border border-line bg-white p-7 shadow-card sm:p-8">
                  <Stars rating={t.rating} />
                  <blockquote className="mt-5 flex-1 text-lg leading-relaxed text-ink">“{t.quote}”</blockquote>
                  <figcaption className="mt-7 flex items-center gap-4 border-t border-line pt-6">
                    <span
                      aria-hidden="true"
                      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-navy font-display font-bold text-lime"
                    >
                      {initials(t.name)}
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-semibold text-ink">{t.name}</span>
                      <span className="block text-sm text-muted">{t.role}</span>
                    </span>
                    <span className="rounded-full bg-mist px-2.5 py-1 text-xs font-semibold text-ink">
                      {getProgram(t.programId).name}
                    </span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
