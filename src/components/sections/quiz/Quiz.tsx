import { AnimatePresence, m } from 'framer-motion'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useState } from 'react'
import type { ProgramId } from '../../../data/programs'
import type { QuizAnswers } from '../../../data/quiz'
import { quizQuestions } from '../../../data/quiz'
import { recommendProgram } from '../../../lib/scoring'
import { Button } from '../../ui/Button'
import { SectionHeading } from '../../ui/SectionHeading'
import { QuizResult } from './QuizResult'
import { QuizStep } from './QuizStep'

interface QuizProps {
  onChooseProgram: (id: ProgramId) => void
}

const TOTAL = quizQuestions.length

export function Quiz({ onChooseProgram }: QuizProps) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Partial<QuizAnswers>>({})
  // Focus moves to each new step's heading only after the user has interacted.
  const [hasInteracted, setHasInteracted] = useState(false)

  const isResult = step === TOTAL
  const question = quizQuestions[step]
  const currentAnswer = question ? answers[question.key] : undefined

  const go = (next: number) => {
    setHasInteracted(true)
    setStep(next)
  }

  const restart = () => {
    setAnswers({})
    go(0)
  }

  const recommendation = isResult ? recommendProgram(answers as QuizAnswers) : null
  const progress = isResult ? 100 : (step / TOTAL) * 100

  return (
    <section id="quiz" aria-labelledby="quiz-title" className="section-y bg-mist">
      <div className="container-site">
        <SectionHeading
          id="quiz-title"
          eyebrow="Find your program"
          title="Four questions. One clear starting point."
          intro="Answer honestly. There are no wrong answers, and you’ll get a recommendation with the reasoning behind it."
        />

        <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-card bg-white shadow-card">
          <div className="border-b border-line px-5 pt-5 pb-4 sm:px-8">
            <div className="flex items-center justify-between text-sm font-medium">
              <span className="text-ink">{isResult ? 'Your recommendation' : `Question ${step + 1} of ${TOTAL}`}</span>
              <span className="text-muted">{Math.round(progress)}%</span>
            </div>
            <div
              className="mt-3 h-2 overflow-hidden rounded-full bg-mist"
              role="progressbar"
              aria-label="Quiz progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <div
                className="h-full rounded-full bg-navy transition-[width] duration-500 ease-out motion-reduce:transition-none"
                style={{ width: `${Math.max(progress, 4)}%` }}
              />
            </div>
          </div>

          {/* A form so Enter on a selected option advances, like any other form. */}
          <form
            className="px-5 py-7 sm:px-8 sm:py-9"
            aria-labelledby="quiz-title"
            onSubmit={(e) => {
              e.preventDefault()
              if (currentAnswer) go(step + 1)
            }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <m.div
                key={step}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
              >
                {recommendation ? (
                  <QuizResult
                    focusOnMount={hasInteracted}
                    recommendation={recommendation}
                    onChoose={() => onChooseProgram(recommendation.programId)}
                    onRestart={restart}
                  />
                ) : (
                  <QuizStep
                    focusOnMount={hasInteracted}
                    question={question}
                    value={currentAnswer}
                    onChange={(value) => setAnswers((a) => ({ ...a, [question.key]: value }))}
                  />
                )}
              </m.div>
            </AnimatePresence>

            {!isResult && (
              <div className="mt-8 flex items-center justify-between gap-3">
                <Button variant="outline-dark" onClick={() => go(step - 1)} disabled={step === 0}>
                  <ArrowLeft aria-hidden="true" className="size-4" />
                  Back
                </Button>
                <Button type="submit" variant="navy" disabled={!currentAnswer}>
                  {step === TOTAL - 1 ? 'See my program' : 'Next'}
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  )
}
