import { m } from 'framer-motion'
import { ArrowRight, CalendarCheck } from 'lucide-react'
import { photos, unsplash, unsplashSrcSet } from '../../data/images'
import { site, stats } from '../../data/site'
import { Button, ButtonLink } from '../ui/Button'

interface HeroProps {
  onStartQuiz: () => void
}

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero({ onStartQuiz }: HeroProps) {
  return (
    <section id="top" aria-labelledby="hero-title" className="on-dark relative overflow-hidden bg-navy text-white">
      <StrideLines />

      <div className="container-site relative grid items-center gap-12 pt-10 pb-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pt-16 lg:pb-24">
        <div>
          <m.p
            {...fadeUp(0)}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-1.5 text-sm text-on-navy"
          >
            <span className="size-2 rounded-full bg-lime" aria-hidden="true" />
            In-person in {site.contact.city} · Online anywhere
          </m.p>

          <m.h1
            {...fadeUp(0.05)}
            id="hero-title"
            className="text-[2.6rem] leading-[1.04] font-bold sm:text-6xl lg:text-[4.25rem]"
          >
            Strength You Can Feel.{' '}
            <span className="text-lime">Results You Can Keep.</span>
          </m.h1>

          <m.p {...fadeUp(0.12)} className="mt-6 max-w-xl text-lg leading-relaxed text-on-navy sm:text-xl">
            Coaching with {site.coach.name} that fits your schedule, your experience, and your life: a custom plan,
            weekly check-ins, and real accountability, so progress doesn’t stop when motivation does.
          </m.p>

          <m.div {...fadeUp(0.18)} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button size="lg" onClick={onStartQuiz}>
              Find My Program
              <ArrowRight aria-hidden="true" className="size-5" />
            </Button>
            <ButtonLink href="#consult" variant="outline-light" size="lg">
              <CalendarCheck aria-hidden="true" className="size-5" />
              Book a Free Consult
            </ButtonLink>
          </m.div>

          <m.dl
            {...fadeUp(0.26)}
            className="mt-12 grid max-w-lg grid-cols-3 divide-x divide-white/10 border-t border-white/10 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse px-3 first:pl-0 sm:px-6">
                <dt className="mt-1 text-xs text-on-navy sm:text-sm">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold text-white sm:text-4xl">{stat.value}</dd>
              </div>
            ))}
          </m.dl>
        </div>

        <m.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="absolute -inset-3 rotate-3 rounded-4xl bg-lime/90" aria-hidden="true" />
          <img
            src={unsplash(photos.hero, 800, 960)}
            srcSet={unsplashSrcSet(photos.hero, [480, 800, 1100], 1.2)}
            sizes="(min-width: 1024px) 40vw, (min-width: 480px) 28rem, 90vw"
            width={800}
            height={960}
            alt="Athlete setting up for a heavy barbell deadlift in a dimly lit gym"
            fetchPriority="high"
            className="relative aspect-5/6 w-full rounded-[1.75rem] object-cover shadow-lift"
          />
          <div className="absolute -bottom-5 left-4 flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-ink shadow-lift sm:-left-6">
            <span className="flex size-10 items-center justify-center rounded-xl bg-navy font-display font-bold text-lime">
              {site.rating.average}
            </span>
            <span className="text-sm leading-tight">
              <span className="block font-semibold">Average client rating</span>
              <span className="text-muted">from {site.rating.count}+ reviews</span>
            </span>
          </div>
        </m.div>
      </div>
    </section>
  )
}

/** Decorative rising "stride" lines echoing the logo mark. */
function StrideLines() {
  return (
    <svg
      aria-hidden="true"
      focusable="false"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-[0.07]"
      preserveAspectRatio="none"
      viewBox="0 0 1440 800"
    >
      <path d="M-40 700 L380 420 L560 540 L1480 40" fill="none" className="stroke-lime" strokeWidth="2" />
      <path d="M-40 780 L420 500 L600 620 L1480 140" fill="none" className="stroke-white" strokeWidth="1" />
    </svg>
  )
}
