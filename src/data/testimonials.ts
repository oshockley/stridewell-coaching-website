import type { ProgramId } from './programs'

export interface Testimonial {
  name: string
  role: string
  rating: number
  quote: string
  programId: ProgramId
}

export const testimonials: Testimonial[] = [
  {
    name: 'Rachel M.',
    role: 'Teacher, Tempe',
    rating: 5,
    quote:
      'I’d bought programs online before and quit every one by week three. Jordan’s weekly check-ins are the difference. Someone actually notices when I miss a session, and the plan changes when life gets busy instead of making me feel guilty.',
    programId: 'momentum',
  },
  {
    name: 'Tom K.',
    role: 'Software engineer, Scottsdale',
    rating: 5,
    quote:
      'I was nervous about lifting at 52 with a cranky lower back. Jordan started me with light, controlled work and built from there. A year in, I deadlift twice a week and my back feels better than it has in a decade.',
    programId: 'elite',
  },
  {
    name: 'Sofia L.',
    role: 'Nurse, Chandler',
    rating: 5,
    quote:
      'My schedule is rotating twelve-hour shifts, so a fixed class time never works. The app plan flexes around my week, and the form review videos caught a squat habit I didn’t even know I had.',
    programId: 'foundation',
  },
  {
    name: 'Andre W.',
    role: 'Small business owner, Phoenix',
    rating: 5,
    quote:
      'No crash diets, no 6am punishment workouts. Just a realistic plan, good food, and a coach who explains the why. I’m down two pant sizes and I finally have energy left after work.',
    programId: 'momentum',
  },
]
