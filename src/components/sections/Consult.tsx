import { AlertCircle, CheckCircle2, Loader2, Mail, MapPin, Phone, Send } from 'lucide-react'
import type { ChangeEvent, FormEvent } from 'react'
import { useRef, useState } from 'react'
import { programs } from '../../data/programs'
import { site } from '../../data/site'
import { useFocusOnMount } from '../../hooks/useFocusOnMount'
import type { ConsultErrors, ConsultValues, ProgramInterest } from '../../lib/consultForm'
import { MESSAGE_MAX, submitConsult, validateConsult } from '../../lib/consultForm'
import { Button } from '../ui/Button'
import { fieldClasses, FormField } from '../ui/FormField'
import { SectionHeading } from '../ui/SectionHeading'

interface ConsultProps {
  program: ProgramInterest
  onProgramChange: (program: ProgramInterest) => void
}

type Status = 'idle' | 'submitting' | 'success' | 'error'
type TextFields = Exclude<keyof ConsultValues, 'program'>

const emptyText: Record<TextFields, string> = { name: '', email: '', phone: '', message: '' }

const nextSteps = [
  `A ${site.consult.minutes}-minute call or studio visit, at a time that suits you`,
  'An honest recommendation, even if that means a different coach',
  'No payment details needed and no pressure to sign up',
]

export function Consult({ program, onProgramChange }: ConsultProps) {
  const [text, setText] = useState(emptyText)
  const [errors, setErrors] = useState<ConsultErrors>({})
  const [submitted, setSubmitted] = useState(false)
  const [status, setStatus] = useState<Status>('idle')
  const formRef = useRef<HTMLFormElement>(null)

  const values: ConsultValues = { ...text, program }

  // After the first submit attempt, re-validate live so errors clear as they're fixed.
  const revalidate = (next: ConsultValues) => submitted && setErrors(validateConsult(next))

  const onText = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const next = { ...text, [e.target.name]: e.target.value }
    setText(next)
    revalidate({ ...next, program })
  }

  const onProgram = (e: ChangeEvent<HTMLSelectElement>) => {
    const next = e.target.value as ProgramInterest
    onProgramChange(next)
    revalidate({ ...values, program: next })
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    const found = validateConsult(values)
    setErrors(found)
    const firstInvalid = Object.keys(found)[0]
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#consult-${firstInvalid}`)?.focus()
      return
    }
    setStatus('submitting')
    try {
      await submitConsult(values)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setText(emptyText)
    onProgramChange('')
    setErrors({})
    setSubmitted(false)
    setStatus('idle')
  }

  const submitting = status === 'submitting'

  return (
    <section id="consult" aria-labelledby="consult-title" className="section-y bg-white">
      <div className="container-site grid gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="on-dark flex flex-col rounded-card bg-navy p-7 text-white sm:p-10">
          <SectionHeading
            id="consult-title"
            align="left"
            tone="light"
            eyebrow="Free consultation"
            title="Let’s talk about your goals."
            intro="Tell me a little about where you are now. I’ll reply within 1 business day to set up your free consult."
          />
          <ul className="mt-8 grid gap-4">
            {nextSteps.map((item) => (
              <li key={item} className="flex gap-3 text-on-navy">
                <CheckCircle2 aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-lime" />
                {item}
              </li>
            ))}
          </ul>
          <div className="mt-auto grid gap-3 border-t border-white/10 pt-8 text-on-navy max-lg:mt-10">
            <a href={site.contact.phoneHref} className="flex items-center gap-3 hover:text-white">
              <Phone aria-hidden="true" className="size-5 text-lime" />
              {site.contact.phoneDisplay}
            </a>
            <a href={`mailto:${site.contact.email}`} className="flex items-center gap-3 break-all hover:text-white">
              <Mail aria-hidden="true" className="size-5 shrink-0 text-lime" />
              {site.contact.email}
            </a>
            <p className="flex items-center gap-3">
              <MapPin aria-hidden="true" className="size-5 text-lime" />
              {site.contact.studio}, {site.contact.city}
            </p>
          </div>
        </div>

        <div className="rounded-card border border-line bg-white p-6 shadow-card sm:p-10">
          {status === 'success' ? (
            <SuccessMessage name={text.name.trim().split(' ')[0]} onReset={reset} />
          ) : (
            <form ref={formRef} noValidate onSubmit={onSubmit} aria-labelledby="consult-form-title">
              <h3 id="consult-form-title" className="text-2xl font-bold text-ink">
                Request your free consult
              </h3>
              <p className="mt-2 text-muted">All fields are required unless marked optional.</p>

              <div className="mt-8 grid gap-5 sm:grid-cols-2">
                <FormField id="consult-name" label="Full name" error={errors.name}>
                  <input
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={text.name}
                    onChange={onText}
                    className={fieldClasses}
                  />
                </FormField>
                <FormField id="consult-email" label="Email" error={errors.email}>
                  <input
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={text.email}
                    onChange={onText}
                    className={fieldClasses}
                  />
                </FormField>
                <FormField id="consult-phone" label="Phone" optional error={errors.phone}>
                  <input
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    value={text.phone}
                    onChange={onText}
                    className={fieldClasses}
                  />
                </FormField>
                <FormField id="consult-program" label="Program interest" error={errors.program}>
                  <select name="program" value={program} onChange={onProgram} className={`${fieldClasses} pr-10`}>
                    <option value="" disabled>
                      Choose a program
                    </option>
                    {programs.map((p) => (
                      <option key={p.id} value={p.id}>
                        {p.name} ({p.format})
                      </option>
                    ))}
                    <option value="not-sure">Not sure yet</option>
                  </select>
                </FormField>
                <div className="sm:col-span-2">
                  <FormField
                    id="consult-message"
                    label="What would you like help with?"
                    optional
                    error={errors.message}
                    hint="Goals, schedule, injuries, anything that helps me prepare."
                  >
                    <textarea
                      name="message"
                      rows={4}
                      maxLength={MESSAGE_MAX}
                      value={text.message}
                      onChange={onText}
                      className={`${fieldClasses} resize-y`}
                    />
                  </FormField>
                </div>
              </div>

              {status === 'error' && (
                <p
                  role="alert"
                  className="mt-6 flex items-start gap-2 rounded-xl bg-danger/10 p-4 text-sm font-medium text-danger"
                >
                  <AlertCircle aria-hidden="true" className="mt-0.5 size-4 shrink-0" />
                  Something went wrong sending your request. Please try again, or email {site.contact.email}.
                </p>
              )}

              <Button
                type="submit"
                variant="navy"
                size="lg"
                className="mt-8 w-full sm:w-auto"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 aria-hidden="true" className="size-5 animate-spin motion-reduce:animate-none" />
                    Sending…
                  </>
                ) : (
                  <>
                    Request my free consult
                    <Send aria-hidden="true" className="size-4" />
                  </>
                )}
              </Button>
              <p className="sr-only" aria-live="polite">
                {submitting ? 'Sending your request…' : ''}
              </p>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function SuccessMessage({ name, onReset }: { name: string; onReset: () => void }) {
  const headingRef = useFocusOnMount<HTMLHeadingElement>(true)
  return (
    <div className="flex h-full flex-col items-start justify-center py-6" role="status">
      <span className="flex size-14 items-center justify-center rounded-2xl bg-lime text-navy">
        <CheckCircle2 aria-hidden="true" className="size-7" />
      </span>
      <h3 ref={headingRef} tabIndex={-1} className="mt-6 text-3xl font-bold text-ink outline-none">
        Thanks, {name}! Your request is in.
      </h3>
      <p className="mt-4 max-w-md text-lg leading-relaxed text-muted">
        I’ll reply within 1 business day to book your free {site.consult.minutes}-minute consult. Keep an eye on your
        inbox, and check your spam folder just in case.
      </p>
      <Button variant="outline-dark" className="mt-8" onClick={onReset}>
        Send another request
      </Button>
    </div>
  )
}
