import { AlertCircle } from 'lucide-react'
import type { ReactElement } from 'react'
import { cloneElement } from 'react'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  hint?: string
  optional?: boolean
  /** A single input, select, or textarea. Receives id and ARIA wiring automatically. */
  children: ReactElement<Record<string, unknown>>
}

export const fieldClasses =
  'block w-full rounded-field border-2 border-line bg-white px-4 py-3 text-ink placeholder:text-muted/70 transition-colors focus:border-navy focus:ring-4 focus:ring-lime/50 focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-danger'

export function FormField({ id, label, error, hint, optional, children }: FormFieldProps) {
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const describedBy = [hint && !error && hintId, error && errorId].filter(Boolean).join(' ') || undefined

  return (
    <div>
      <label htmlFor={id} className="mb-2 flex items-baseline justify-between gap-2 text-sm font-semibold text-ink">
        {label}
        {optional && <span className="font-normal text-muted">Optional</span>}
      </label>
      {cloneElement(children, {
        id,
        'aria-invalid': error ? true : undefined,
        'aria-describedby': describedBy,
      })}
      {hint && !error && (
        <p id={hintId} className="mt-1.5 text-sm text-muted">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-danger">
          <AlertCircle aria-hidden="true" className="size-4 shrink-0" />
          {error}
        </p>
      )}
    </div>
  )
}
