import { Check } from 'lucide-react'
import { useState } from 'react'
import type { Program, ProgramId } from '../../data/programs'
import { programs, THREE_MONTH_DISCOUNT } from '../../data/programs'
import type { BillingCycle } from '../../lib/pricing'
import { formatUsd, getPrice } from '../../lib/pricing'
import { Button } from '../ui/Button'
import { Reveal } from '../ui/Reveal'
import { SectionHeading } from '../ui/SectionHeading'

interface ProgramsProps {
  onChooseProgram: (id: ProgramId) => void
}

const discountLabel = `Save ${Math.round(THREE_MONTH_DISCOUNT * 100)}%`

export function Programs({ onChooseProgram }: ProgramsProps) {
  const [cycle, setCycle] = useState<BillingCycle>('monthly')

  return (
    <section id="programs" aria-labelledby="programs-title" className="section-y bg-white">
      <div className="container-site">
        <SectionHeading
          id="programs-title"
          eyebrow="Programs & pricing"
          title="Coaching that matches how much support you want."
          intro="Every program includes a custom plan and weekly check-ins. Pick the level of hands-on coaching that fits your goals and budget."
        />

        <BillingToggle cycle={cycle} onChange={setCycle} />

        <div className="mt-12 grid items-stretch gap-6 lg:grid-cols-3">
          {programs.map((program, i) => (
            <Reveal key={program.id} delay={i * 0.08} className="h-full">
              <PricingCard program={program} cycle={cycle} onChoose={() => onChooseProgram(program.id)} />
            </Reveal>
          ))}
        </div>

        <p className="mt-8 text-center text-sm text-muted">
          Monthly plans can be cancelled anytime with 7 days’ notice. Prices in USD.
        </p>
      </div>
    </section>
  )
}

function BillingToggle({ cycle, onChange }: { cycle: BillingCycle; onChange: (c: BillingCycle) => void }) {
  const options: { value: BillingCycle; label: string }[] = [
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: '3 months' },
  ]
  return (
    <div className="mt-10 flex justify-center">
      <div role="group" aria-label="Billing period" className="inline-flex rounded-full bg-mist p-1.5">
        {options.map((opt) => {
          const active = cycle === opt.value
          return (
            <button
              key={opt.value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(opt.value)}
              className={`inline-flex h-11 items-center gap-2 rounded-full px-5 text-sm font-semibold transition-colors ${
                active ? 'bg-navy text-white shadow-card' : 'text-muted hover:text-ink'
              }`}
            >
              {opt.label}
              {opt.value === 'quarterly' && (
                <span className="rounded-full bg-lime px-2 py-0.5 text-xs font-semibold text-navy">
                  {discountLabel}
                </span>
              )}
            </button>
          )
        })}
      </div>
      <p className="sr-only" aria-live="polite">
        {cycle === 'monthly' ? 'Showing monthly prices.' : `Showing 3-month prices. ${discountLabel}.`}
      </p>
    </div>
  )
}

interface PricingCardProps {
  program: Program
  cycle: BillingCycle
  onChoose: () => void
}

function PricingCard({ program, cycle, onChoose }: PricingCardProps) {
  const price = getPrice(program.monthlyPrice, cycle)
  const featured = Boolean(program.popular)
  const headingId = `program-${program.id}`

  return (
    <article
      aria-labelledby={headingId}
      className={`relative flex h-full flex-col rounded-card p-7 sm:p-8 ${
        featured ? 'on-dark bg-navy text-white shadow-lift lg:-my-4 lg:py-12' : 'border border-line bg-white shadow-card'
      }`}
    >
      {featured && (
        <p className="absolute -top-3.5 left-7 rounded-full bg-lime px-3.5 py-1 text-xs font-bold tracking-wide text-navy uppercase sm:left-8">
          Most Popular
        </p>
      )}

      <div className="flex items-start justify-between gap-4">
        <h3 id={headingId} className="text-2xl font-bold">
          {program.name}
        </h3>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${featured ? 'bg-white/10 text-white' : 'bg-mist text-ink'}`}
        >
          {program.format}
        </span>
      </div>
      <p className={`mt-3 ${featured ? 'text-on-navy' : 'text-muted'}`}>{program.tagline}</p>

      <div className="mt-7">
        <p className="flex items-end gap-1.5">
          <span className="font-display text-5xl font-bold tracking-tight">{formatUsd(price.perMonth)}</span>
          <span className={`pb-1.5 ${featured ? 'text-on-navy' : 'text-muted'}`}>/month</span>
        </p>
        <p className={`mt-2 min-h-10 text-sm ${featured ? 'text-on-navy' : 'text-muted'}`}>
          {cycle === 'monthly' ? (
            'Billed monthly. Cancel anytime.'
          ) : (
            <>
              {formatUsd(price.billedAmount)} billed every 3 months.{' '}
              <span className={`font-semibold ${featured ? 'text-lime' : 'text-success'}`}>
                You save {formatUsd(price.savings)}.
              </span>
            </>
          )}
        </p>
      </div>

      <ul className="mt-7 grid gap-3.5">
        {program.features.map((feature) => (
          <li key={feature} className="flex gap-3">
            <span
              aria-hidden="true"
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full ${featured ? 'bg-lime text-navy' : 'bg-navy text-lime'}`}
            >
              <Check className="size-3" strokeWidth={3.5} />
            </span>
            <span className={featured ? 'text-white' : 'text-ink'}>{feature}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-8">
        <Button size="lg" variant={featured ? 'primary' : 'navy'} onClick={onChoose} className="w-full">
          Choose {program.name}
        </Button>
      </div>
    </article>
  )
}
