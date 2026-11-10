import type { ProgramId } from '../data/programs'

export type ProgramInterest = ProgramId | 'not-sure' | ''

export interface ConsultValues {
  name: string
  email: string
  phone: string
  program: ProgramInterest
  message: string
}

export type ConsultErrors = Partial<Record<keyof ConsultValues, string>>

export const MESSAGE_MAX = 1000

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateConsult(v: ConsultValues): ConsultErrors {
  const errors: ConsultErrors = {}
  const digits = v.phone.replace(/\D/g, '')

  if (v.name.trim().length < 2) errors.name = 'Please enter your name.'
  if (!v.email.trim()) errors.email = 'Please enter your email address.'
  else if (!EMAIL_RE.test(v.email.trim())) errors.email = 'Please enter a valid email, like name@example.com.'
  if (v.phone.trim() && (digits.length < 10 || digits.length > 15))
    errors.phone = 'Please enter a full phone number, including area code.'
  if (!v.program) errors.program = 'Please choose a program, or select “Not sure yet”.'
  if (v.message.length > MESSAGE_MAX) errors.message = `Please keep your message under ${MESSAGE_MAX} characters.`

  return errors
}

const FORMSPREE_ID = import.meta.env.VITE_FORMSPREE_ID?.trim()

/**
 * Sends the form to Formspree when VITE_FORMSPREE_ID is set.
 * Without it (local demo), resolves after a 1s delay to simulate success.
 */
export async function submitConsult(values: ConsultValues): Promise<void> {
  if (!FORMSPREE_ID) {
    await new Promise((resolve) => setTimeout(resolve, 1000))
    return
  }

  const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      ...values,
      _subject: `New free consult request from ${values.name}`,
      _replyto: values.email,
    }),
  })
  if (!res.ok) throw new Error(`Formspree responded with ${res.status}`)
}
