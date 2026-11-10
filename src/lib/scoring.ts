import type { ProgramId } from '../data/programs'
import type { Days, Experience, Format, Goal, QuizAnswers } from '../data/quiz'
import { goalPhrases } from '../data/quiz'

/**
 * Scoring logic for the "Find your program" quiz.
 *
 * 1. Format decides which programs are realistic options:
 *    - online    → Momentum or Foundation (both work fully remote)
 *    - hybrid    → Momentum or Elite
 *    - in-person → Elite or Momentum (both include studio sessions)
 * 2. Every answer adds points to the programs it suits (tables below).
 * 3. The highest-scoring eligible program wins. Ties go to the format's
 *    first-choice program (the first entry in `eligibleByFormat`).
 */
type Points = Partial<Record<ProgramId, number>>
export type Scores = Record<ProgramId, number>

const eligibleByFormat: Record<Format, ProgramId[]> = {
  online: ['momentum', 'foundation'],
  hybrid: ['momentum', 'elite'],
  'in-person': ['elite', 'momentum'],
}

const formatPoints: Record<Format, Points> = {
  online: { foundation: 2, momentum: 1 },
  hybrid: { momentum: 3 },
  'in-person': { elite: 3 },
}

const goalPoints: Record<Goal, Points> = {
  // Fat loss responds best to nutrition coaching and frequent accountability.
  'lose-fat': { momentum: 2, elite: 1 },
  'build-muscle': { foundation: 1, momentum: 1, elite: 1 },
  // Heavier lifting benefits most from hands-on technique coaching.
  'get-stronger': { elite: 2, foundation: 1 },
  'improve-energy': { foundation: 2, momentum: 1 },
}

const experiencePoints: Record<Experience, Points> = {
  // Beginners need more feedback while they learn movement patterns.
  beginner: { momentum: 2, elite: 1 },
  intermediate: { momentum: 1, foundation: 1, elite: 1 },
  // Advanced lifters can run a plan independently, or want elite-level detail.
  advanced: { foundation: 2, elite: 1 },
}

const daysPoints: Record<Days, Points> = {
  '2': { foundation: 2 },
  '3': { foundation: 1, momentum: 1 },
  '4': { momentum: 1, elite: 1 },
  '5+': { elite: 2 },
}

export interface Recommendation {
  programId: ProgramId
  scores: Scores
  reason: string
}

export function scoreQuiz(answers: QuizAnswers): Scores {
  const scores: Scores = { foundation: 0, momentum: 0, elite: 0 }
  const tables: Points[] = [
    formatPoints[answers.format],
    goalPoints[answers.goal],
    experiencePoints[answers.experience],
    daysPoints[answers.days],
  ]
  for (const table of tables) {
    for (const [id, pts] of Object.entries(table) as [ProgramId, number][]) {
      scores[id] += pts
    }
  }
  return scores
}

export function recommendProgram(answers: QuizAnswers): Recommendation {
  const scores = scoreQuiz(answers)
  const eligible = eligibleByFormat[answers.format]
  // Strict ">" keeps the earlier (preferred) program on ties.
  const programId = eligible.reduce((best, id) => (scores[id] > scores[best] ? id : best))
  return { programId, scores, reason: explain(programId, answers) }
}

const daysText = (days: Days) => (days === '5+' ? '5 or more days' : `${days} days`)

function explain(programId: ProgramId, a: QuizAnswers): string {
  const goal = goalPhrases[a.goal]
  const days = daysText(a.days)

  switch (programId) {
    case 'foundation':
      return a.experience === 'beginner'
        ? `You want to ${goal} on ${days} a week, and Foundation gives you a clear, beginner-friendly plan you can follow from anywhere. Weekly check-ins and video form reviews make sure you learn the lifts properly without paying for sessions you don’t need yet.`
        : `With ${a.experience}-level experience and ${days} a week to train, you don’t need someone counting reps; you need a smart plan and someone keeping you honest. Foundation delivers a custom program and weekly feedback so you can ${goal} on your own schedule.`
    case 'momentum':
      return a.format === 'online'
        ? `To ${goal} on ${days} a week, the biggest lever is consistency with both training and food, which is exactly what Momentum’s nutrition coaching and video calls every 2 weeks are built for. You get closer support than a plan alone while still training wherever you are.`
        : `Momentum pairs a custom plan and nutrition coaching with 2 in-person sessions a month, so you get hands-on technique work without paying for weekly sessions. It’s the best fit to ${goal} on ${days} a week while building habits that last.`
    case 'elite':
      return `You want to ${goal} and can commit ${days} a week, so a weekly 1-on-1 session at the studio will make every one of those days count. Elite gives you real-time technique coaching and in-person check-ins, so every rep is coached and every week builds on the last.`
  }
}
