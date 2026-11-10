import { Check } from 'lucide-react'
import type { QuizQuestion } from '../../../data/quiz'
import { useFocusOnMount } from '../../../hooks/useFocusOnMount'

interface QuizStepProps {
  question: QuizQuestion
  value: string | undefined
  onChange: (value: string) => void
  focusOnMount: boolean
}

/**
 * One question rendered as a native radio group: arrow keys move between
 * options, Space selects, and screen readers announce "1 of 4" automatically.
 */
export function QuizStep({ question, value, onChange, focusOnMount }: QuizStepProps) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>(focusOnMount)
  const name = `quiz-${question.key}`
  const twoCol = question.options.length === 4

  return (
    <fieldset>
      <legend className="contents">
        <h3 ref={headingRef} tabIndex={-1} className="text-2xl font-semibold text-ink outline-none sm:text-3xl">
          {question.title}
        </h3>
      </legend>
      <div className={`mt-6 grid gap-3 ${twoCol ? 'sm:grid-cols-2' : ''}`}>
        {question.options.map((option) => {
          const selected = value === option.value
          return (
            <label
              key={option.value}
              className={`group relative flex cursor-pointer items-center gap-4 rounded-2xl border-2 p-4 transition-colors has-[:focus-visible]:outline-3 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-navy sm:p-5 ${
                selected ? 'border-navy bg-navy/[0.03]' : 'border-line hover:border-navy/40'
              }`}
            >
              <input
                type="radio"
                name={name}
                value={option.value}
                checked={selected}
                onChange={() => onChange(option.value)}
                className="sr-only"
              />
              <span
                aria-hidden="true"
                className={`flex size-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                  selected ? 'border-navy bg-lime' : 'border-line bg-white'
                }`}
              >
                {selected && <Check className="size-3.5 text-navy" strokeWidth={3} />}
              </span>
              <span>
                <span className="block font-semibold text-ink">{option.label}</span>
                <span className="mt-0.5 block text-sm text-muted">{option.hint}</span>
              </span>
            </label>
          )
        })}
      </div>
    </fieldset>
  )
}
