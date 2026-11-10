import type { LucideIcon } from 'lucide-react'
import { CalendarCheck, ClipboardList, MessagesSquare } from 'lucide-react'
import { site } from '../../data/site'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

interface Step {
  icon: LucideIcon
  title: string
  body: string
}

const steps: Step[] = [
  {
    icon: MessagesSquare,
    title: 'Free consult',
    body: `A ${site.consult.minutes}-minute call or studio visit. We talk through your goals, schedule, training history, and any injuries, and I’ll tell you honestly which program fits, or if none do.`,
  },
  {
    icon: ClipboardList,
    title: 'Custom plan',
    body: 'Within 3 days you get a training plan built around your equipment and calendar, plus nutrition guidance matched to your program. No templates, no guesswork.',
  },
  {
    icon: CalendarCheck,
    title: 'Weekly check-ins',
    body: 'Every week we review your training, energy, and progress, then adjust the plan. Small, steady changes are what make results stick.',
  },
]

export function HowItWorks() {
  return (
    <section id="how-it-works" aria-labelledby="how-title" className="section-y bg-mist">
      <div className="container-site">
        <SectionHeading
          id="how-title"
          eyebrow="How it works"
          title="From first call to steady progress in three steps."
        />

        <ol className="relative mt-14 grid gap-6 md:grid-cols-3">
          <span
            aria-hidden="true"
            className="absolute top-12 right-[16%] left-[16%] hidden border-t-2 border-dashed border-navy/15 md:block"
          />
          {steps.map((step, i) => (
            <li key={step.title}>
              <Reveal delay={i * 0.1} className="relative h-full rounded-card bg-white p-7 shadow-card sm:p-8">
                <div className="flex items-center justify-between">
                  <span className="flex size-14 items-center justify-center rounded-2xl bg-navy text-lime">
                    <step.icon aria-hidden="true" className="size-7" />
                  </span>
                  <span className="font-display text-5xl font-bold text-navy/10" aria-hidden="true">
                    0{i + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold text-ink">
                  <span className="sr-only">Step {i + 1}: </span>
                  {step.title}
                </h3>
                <p className="mt-3 leading-relaxed text-muted">{step.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
