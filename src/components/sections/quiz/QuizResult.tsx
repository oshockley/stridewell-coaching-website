import { ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react'
import { getProgram } from '../../../data/programs'
import { useFocusOnMount } from '../../../hooks/useFocusOnMount'
import { formatUsd } from '../../../lib/pricing'
import type { Recommendation } from '../../../lib/scoring'
import { Button } from '../../ui/Button'

interface QuizResultProps {
  recommendation: Recommendation
  onChoose: () => void
  onRestart: () => void
  focusOnMount: boolean
}

export function QuizResult({ recommendation, onChoose, onRestart, focusOnMount }: QuizResultProps) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>(focusOnMount)
  const program = getProgram(recommendation.programId)

  return (
    <div>
      <p className="inline-flex items-center gap-2 rounded-full bg-lime px-3 py-1 text-xs font-semibold tracking-wide text-navy uppercase">
        <Sparkles aria-hidden="true" className="size-3.5" />
        Your best fit
      </p>
      <h3 ref={headingRef} tabIndex={-1} className="mt-4 text-3xl font-bold text-ink outline-none sm:text-4xl">
        {program.name}
        <span className="mt-1 block text-base font-medium text-muted sm:text-lg">
          {program.format} · from {formatUsd(program.monthlyPrice)}/month
        </span>
      </h3>

      <p className="mt-5 text-lg leading-relaxed text-ink/85">{recommendation.reason}</p>

      <ul className="mt-6 grid gap-2.5 sm:grid-cols-2">
        {program.features.slice(0, 4).map((feature) => (
          <li key={feature} className="flex gap-2.5 text-sm text-muted">
            <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-navy" strokeWidth={3} />
            {feature}
          </li>
        ))}
      </ul>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button size="lg" onClick={onChoose}>
          Book my free consult
          <ArrowRight aria-hidden="true" className="size-5" />
        </Button>
        <Button variant="outline-dark" size="lg" onClick={onRestart}>
          <RotateCcw aria-hidden="true" className="size-4" />
          Retake quiz
        </Button>
      </div>
      <p className="mt-4 text-sm text-muted">
        Want to compare first?{' '}
        <a href="#programs" className="font-semibold text-ink underline underline-offset-4 hover:text-navy-700">
          See all three programs
        </a>
      </p>
    </div>
  )
}
