export type ProgramId = 'foundation' | 'momentum' | 'elite'

export interface Program {
  id: ProgramId
  name: string
  tagline: string
  format: string
  monthlyPrice: number
  popular?: boolean
  features: string[]
}

/** Paying for 3 months up front saves this fraction of the monthly price. */
export const THREE_MONTH_DISCOUNT = 0.1

export const programs: Program[] = [
  {
    id: 'foundation',
    name: 'Foundation',
    tagline: 'A smart plan and steady accountability, fully online.',
    format: 'Online',
    monthlyPrice: 150,
    features: [
      'Custom training plan in the Stridewell app',
      'Plan updated every 4 weeks',
      'Weekly written check-in with feedback',
      'Form reviews on your uploaded videos',
      'Habit-based nutrition guide',
    ],
  },
  {
    id: 'momentum',
    name: 'Momentum',
    tagline: 'Coaching and nutrition support to build lasting habits.',
    format: 'Hybrid or online',
    monthlyPrice: 250,
    popular: true,
    features: [
      'Everything in Foundation',
      'Plan adjusted every 2 weeks',
      'Weekly check-in plus a video call every 2 weeks',
      '2 in-person sessions a month (live video if remote)',
      'Personalized nutrition targets and meal guidance',
    ],
  },
  {
    id: 'elite',
    name: 'Elite',
    tagline: 'Hands-on, in-person coaching every single week.',
    format: 'In-person',
    monthlyPrice: 450,
    features: [
      'Everything in Momentum',
      '1-on-1 session every week at the Arcadia studio',
      'Weekly check-ins done in person',
      'Direct messaging, replies within 1 business day',
      'Monthly progress assessment and plan review',
    ],
  },
]

export function getProgram(id: ProgramId): Program {
  const program = programs.find((p) => p.id === id)
  if (!program) throw new Error(`Unknown program: ${id}`)
  return program
}
