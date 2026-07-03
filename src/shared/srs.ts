// Spaced-repetition scheduler (SM-2 / Anki-style) for the Japanese section.
// Pure and deterministic: the main process applies grades in japaneseRepo, and
// the renderer imports the same module to preview each grade's next interval on
// the review buttons — no IPC round trip, and the two can never disagree.

import type { SrsGrade, SrsStatus } from './types'

export interface SrsState {
  status: SrsStatus
  learningStep: number
  intervalDays: number
  ease: number
  reps: number
  lapses: number
}

export interface SrsResult extends SrsState {
  dueInMinutes: number
}

// Learning steps for cards being introduced; a single shorter ladder for cards
// relearning after a lapse (they had graduated once already).
export const LEARNING_STEPS_MIN = [1, 10]
export const RELEARN_STEPS_MIN = [10]
export const GRADUATING_DAYS = 1
export const EASY_DAYS = 4
export const START_EASE = 2.5
export const MIN_EASE = 1.3
export const EASY_BONUS = 1.3
export const MAX_INTERVAL_DAYS = 365

const DAY_MIN = 1440

// A relearning card is recognized by its non-zero interval: lapsing resets the
// interval to 1 day, while a genuinely new card starts at 0.
function isRelearning(s: SrsState): boolean {
  return s.intervalDays > 0
}

function capDays(days: number): number {
  return Math.min(MAX_INTERVAL_DAYS, Math.max(1, days))
}

function graduate(s: SrsState, days: number): SrsResult {
  const intervalDays = capDays(days)
  return {
    ...s,
    status: 'review',
    learningStep: 0,
    intervalDays,
    dueInMinutes: intervalDays * DAY_MIN
  }
}

export function gradeCard(state: SrsState, grade: SrsGrade): SrsResult {
  const s: SrsState = { ...state, reps: state.reps + 1 }

  if (s.status !== 'review') {
    // 'new' and 'learning' share the step ladder; a new card is step 0.
    const steps = isRelearning(s) ? RELEARN_STEPS_MIN : LEARNING_STEPS_MIN
    const step = Math.min(s.learningStep, steps.length - 1)

    switch (grade) {
      case 'again':
        return { ...s, status: 'learning', learningStep: 0, dueInMinutes: steps[0] }
      case 'hard':
        return { ...s, status: 'learning', learningStep: step, dueInMinutes: steps[step] }
      case 'good': {
        const next = step + 1
        if (next >= steps.length) {
          // Graduation: fresh cards start at 1 day; relearning cards resume
          // their (reset) interval.
          return graduate(s, isRelearning(s) ? s.intervalDays : GRADUATING_DAYS)
        }
        return { ...s, status: 'learning', learningStep: next, dueInMinutes: steps[next] }
      }
      case 'easy':
        return graduate(s, isRelearning(s) ? s.intervalDays : EASY_DAYS)
    }
  }

  switch (grade) {
    case 'again':
      // Lapse: back to relearning with a penalized ease and the interval reset.
      return {
        ...s,
        status: 'learning',
        learningStep: 0,
        lapses: s.lapses + 1,
        ease: Math.max(MIN_EASE, s.ease - 0.2),
        intervalDays: 1,
        dueInMinutes: RELEARN_STEPS_MIN[0]
      }
    case 'hard': {
      const ease = Math.max(MIN_EASE, s.ease - 0.15)
      const intervalDays = capDays(
        Math.max(s.intervalDays + 1, Math.round(s.intervalDays * 1.2))
      )
      return { ...s, ease, intervalDays, dueInMinutes: intervalDays * DAY_MIN }
    }
    case 'good': {
      const intervalDays = capDays(
        Math.max(s.intervalDays + 1, Math.round(s.intervalDays * s.ease))
      )
      return { ...s, intervalDays, dueInMinutes: intervalDays * DAY_MIN }
    }
    case 'easy': {
      const ease = s.ease + 0.15
      const intervalDays = capDays(
        Math.max(s.intervalDays + 1, Math.round(s.intervalDays * ease * EASY_BONUS))
      )
      return { ...s, ease, intervalDays, dueInMinutes: intervalDays * DAY_MIN }
    }
  }
}

export function formatDueIn(minutes: number): string {
  if (minutes < 60) return `${Math.max(1, Math.round(minutes))}m`
  if (minutes < DAY_MIN) return `${Math.round(minutes / 60)}h`
  const days = Math.round(minutes / DAY_MIN)
  if (days < 30) return `${days}d`
  if (days < 365) return `${Math.round(days / 30.4)}mo`
  return `${(days / 365).toFixed(1)}y`
}

// "1m / 10m / 1d / 4d" labels for the four review buttons.
export function previewIntervals(state: SrsState): Record<SrsGrade, string> {
  const grades: SrsGrade[] = ['again', 'hard', 'good', 'easy']
  return Object.fromEntries(
    grades.map((g) => [g, formatDueIn(gradeCard(state, g).dueInMinutes)])
  ) as Record<SrsGrade, string>
}

// The SRS fields of a brand-new card, matching the jp_card column defaults.
export function newCardState(): SrsState {
  return { status: 'new', learningStep: 0, intervalDays: 0, ease: START_EASE, reps: 0, lapses: 0 }
}
