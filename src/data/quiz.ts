export type Goal = 'lose-fat' | 'build-muscle' | 'get-stronger' | 'improve-energy'
export type Experience = 'beginner' | 'intermediate' | 'advanced'
export type Days = '2' | '3' | '4' | '5+'
export type Format = 'in-person' | 'online' | 'hybrid'

export interface QuizAnswers {
  goal: Goal
  experience: Experience
  days: Days
  format: Format
}

export type QuestionKey = keyof QuizAnswers

export interface QuizOption {
  value: string
  label: string
  hint: string
}

export interface QuizQuestion {
  key: QuestionKey
  title: string
  options: QuizOption[]
}

export const quizQuestions: QuizQuestion[] = [
  {
    key: 'goal',
    title: 'What’s your main goal right now?',
    options: [
      { value: 'lose-fat', label: 'Lose fat', hint: 'Feel lighter and see the scale move' },
      { value: 'build-muscle', label: 'Build muscle', hint: 'Add size and shape' },
      { value: 'get-stronger', label: 'Get stronger', hint: 'Lift heavier with better technique' },
      { value: 'improve-energy', label: 'Improve energy', hint: 'Sleep better, move better, feel better' },
    ],
  },
  {
    key: 'experience',
    title: 'How much training experience do you have?',
    options: [
      { value: 'beginner', label: 'Beginner', hint: 'New to lifting, or back after a long break' },
      { value: 'intermediate', label: 'Intermediate', hint: 'Training consistently for 1–3 years' },
      { value: 'advanced', label: 'Advanced', hint: '3+ years and confident with the big lifts' },
    ],
  },
  {
    key: 'days',
    title: 'How many days a week can you train?',
    options: [
      { value: '2', label: '2 days', hint: 'Busy schedule, maximum efficiency' },
      { value: '3', label: '3 days', hint: 'The sweet spot for most people' },
      { value: '4', label: '4 days', hint: 'Room for more focused training' },
      { value: '5+', label: '5+ days', hint: 'Training is a top priority' },
    ],
  },
  {
    key: 'format',
    title: 'How would you like to be coached?',
    options: [
      { value: 'in-person', label: 'In-person', hint: 'Train with Jordan at the Phoenix studio' },
      { value: 'online', label: 'Online', hint: 'Train anywhere with app-based coaching' },
      { value: 'hybrid', label: 'Hybrid', hint: 'Mostly online, plus some studio sessions' },
    ],
  },
]

/** Human-readable phrasing used in result explanations. */
export const goalPhrases: Record<Goal, string> = {
  'lose-fat': 'lose fat',
  'build-muscle': 'build muscle',
  'get-stronger': 'get stronger',
  'improve-energy': 'boost your energy',
}
