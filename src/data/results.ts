import { photos } from './images'
import type { ProgramId } from './programs'

export interface ClientResult {
  name: string
  photoId: string
  photoAlt: string
  outcome: string
  timeframe: string
  detail: string
  programId: ProgramId
}

export const clientResults: ClientResult[] = [
  {
    name: 'Priya',
    photoId: photos.priya,
    photoAlt: 'Priya doing a core exercise on a gym floor',
    outcome: 'Down 14 lb',
    timeframe: '12 weeks',
    detail: 'Three 45-minute sessions a week and a simple protein target, built around her nursing shifts.',
    programId: 'momentum',
  },
  {
    name: 'Alyssa',
    photoId: photos.alyssa,
    photoAlt: 'Alyssa training on a lat pulldown machine',
    outcome: 'First unassisted pull-up',
    timeframe: '8 weeks',
    detail: 'Progressed from band-assisted reps to a full bodyweight pull-up with a weekly pulling block.',
    programId: 'elite',
  },
  {
    name: 'Marcus',
    photoId: photos.marcus,
    photoAlt: 'Marcus performing a pull-up in a dark gym',
    outcome: 'Deadlift up from 365 to 425 lb',
    timeframe: '20 weeks',
    detail: 'A peaking block with weekly video form reviews, after two years stuck at the same numbers.',
    programId: 'foundation',
  },
  {
    name: 'Dan',
    photoId: photos.dan,
    photoAlt: 'Dan doing a push-up on dumbbells at home',
    outcome: 'Down 22 lb',
    timeframe: '6 months',
    detail: 'Home workouts four days a week and a nutrition plan that still left room for family dinners.',
    programId: 'momentum',
  },
  {
    name: 'Elena',
    photoId: photos.elena,
    photoAlt: 'Elena pressing a barbell overhead in a squat rack',
    outcome: 'Squat up 60 lb',
    timeframe: '16 weeks',
    detail: 'From 95 to 155 lb for a clean set of five, with technique coached every week in the studio.',
    programId: 'elite',
  },
  {
    name: 'Chris',
    photoId: photos.chris,
    photoAlt: 'Chris doing a cable fly exercise',
    outcome: 'Gained 8 lb of bodyweight, waist unchanged',
    timeframe: '16 weeks',
    detail: 'A four-day split and a steady calorie surplus after years of trying to bulk on his own.',
    programId: 'foundation',
  },
]
