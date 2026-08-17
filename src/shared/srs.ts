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

// A card that has lapsed this many times is a leech: it isn't sticking and
// repeating it unchanged just burns reviews. Anki's default is 8, but this
// scheduler relearns through a single 10-minute step (RELEARN_STEPS_MIN), so a
// lapse costs less here and lapses accrue faster per unit of pain — 6 catches
// the problem cards a session or two earlier without flagging normal wobble.
export const LEECH_LAPSES = 6
// A card can also be a leech BEFORE it ever graduates: repeated Again grades
// in the learning/relearning steps never touch `lapses` (gradeCard only bumps
// it from `review`), so listLeeches also counts Again grades among the card's
// reviews since its last reset (reps rows of jp_review_log).
export const LEECH_AGAINS = 8
// Ghost reviews (Bunpro-style): a lapsed review-state card echoes back until
// answered correctly this many times, independent of its real SM-2 state.
export const GHOST_STEPS = 3

const DAY_MIN = 1440

// A lapse keeps this share of the old interval instead of dropping to 1 day.
// Anki's own default is 0%, and it is the default every modern scheduler
// changed: one miss should not cost a 200-day card ten successful reviews.
export const LAPSE_NEW_INTERVAL = 0.4

// ±5%. Deterministic intervals keep a cohort a cohort forever, and this app
// introduces cards in cohorts BY DESIGN — buildCoreDeck dumps 500 words,
// buildPrepDeck 100, and setLessonLearned flips a whole lesson at once.
export const FUZZ_RATIO = 0.1

// A relearning card is recognized by its non-zero interval: lapsing keeps a
// fraction of the interval, while a genuinely new card starts at 0.
function isRelearning(s: SrsState): boolean {
  return s.intervalDays > 0
}

function capDays(days: number): number {
  return Math.min(MAX_INTERVAL_DAYS, Math.max(1, days))
}

// Applied to review-length intervals only: fuzzing a 1-day step would round
// straight back to 1 and just add noise to the learning ladder.
function fuzz(days: number, rng: () => number): number {
  if (days < 2) return days
  return capDays(Math.round(days * (1 + (rng() - 0.5) * FUZZ_RATIO)))
}

function graduate(s: SrsState, days: number, rng: () => number): SrsResult {
  const intervalDays = fuzz(capDays(days), rng)
  return {
    ...s,
    status: 'review',
    learningStep: 0,
    intervalDays,
    dueInMinutes: intervalDays * DAY_MIN
  }
}

export type GradeOptions = {
  // Days the card was overdue when answered (0 when answered on time). SM-2
  // does NOT handle lateness on its own: without this an 8-day-late and an
  // 80-day-late card schedule identically, so every backlog you clear
  // under-grows its intervals and comes back sooner than it earned.
  elapsedDays?: number
  // Injected so previewIntervals and the tests stay deterministic.
  rng?: () => number
}

export function gradeCard(
  state: SrsState,
  grade: SrsGrade,
  opts: GradeOptions = {}
): SrsResult {
  const rng = opts.rng ?? Math.random
  const s: SrsState = { ...state, reps: state.reps + 1 }
  // The multiplier base: a card answered late has demonstrably survived the
  // longer gap, so that gap — not the scheduled interval — is what it earned.
  const base = Math.max(s.intervalDays, Math.max(0, Math.floor(opts.elapsedDays ?? 0)))

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
          // the interval their lapse left them with.
          return graduate(s, isRelearning(s) ? s.intervalDays : GRADUATING_DAYS, rng)
        }
        return { ...s, status: 'learning', learningStep: next, dueInMinutes: steps[next] }
      }
      case 'easy':
        // Easy used to call graduate(s, s.intervalDays) exactly like good, so
        // on a relearning card it was a byte-identical no-op — a button that
        // implied a reward it never gave.
        return graduate(
          s,
          isRelearning(s) ? Math.round(s.intervalDays * EASY_BONUS) : EASY_DAYS,
          rng
        )
    }
  }

  switch (grade) {
    case 'again':
      // Lapse: back to relearning with a penalized ease, keeping a fraction of
      // the interval rather than dropping a mature card all the way to 1 day.
      return {
        ...s,
        status: 'learning',
        learningStep: 0,
        lapses: s.lapses + 1,
        ease: Math.max(MIN_EASE, s.ease - 0.2),
        intervalDays: Math.max(1, Math.round(s.intervalDays * LAPSE_NEW_INTERVAL)),
        dueInMinutes: RELEARN_STEPS_MIN[0]
      }
    case 'hard': {
      // Hard deliberately does NOT take the overdue base: the answer says the
      // longer gap was too long, so rewarding it with the gap is backwards.
      const ease = Math.max(MIN_EASE, s.ease - 0.15)
      const intervalDays = fuzz(
        capDays(Math.max(s.intervalDays + 1, Math.round(s.intervalDays * 1.2))),
        rng
      )
      return { ...s, ease, intervalDays, dueInMinutes: intervalDays * DAY_MIN }
    }
    case 'good': {
      const intervalDays = fuzz(
        capDays(Math.max(s.intervalDays + 1, Math.round(base * s.ease))),
        rng
      )
      return { ...s, intervalDays, dueInMinutes: intervalDays * DAY_MIN }
    }
    case 'easy': {
      const ease = s.ease + 0.15
      const intervalDays = fuzz(
        capDays(Math.max(s.intervalDays + 1, Math.round(base * ease * EASY_BONUS))),
        rng
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

// Days a card is overdue, from its stored due_at ('YYYY-MM-DD HH:MM:SS', UTC).
// The renderer needs this so the grade buttons can preview the SAME interval
// main will persist: submitReview passes the gap into gradeCard, and without it
// a 10-day card answered 40 days late advertised 25d and was written as 100d.
export function overdueDays(dueAt: string | null | undefined, now = Date.now()): number {
  if (!dueAt) return 0
  const due = Date.parse(dueAt.includes('T') ? dueAt : `${dueAt.replace(' ', 'T')}Z`)
  if (!Number.isFinite(due)) return 0
  return Math.max(0, Math.floor((now - due) / 86_400_000))
}

// "1m / 10m / 1d / 4d" labels for the four review buttons. rng is pinned to the
// midpoint so the preview shows the un-fuzzed interval — the button must not
// flicker between renders, and Anki shows the same unfuzzed number.
export function previewIntervals(state: SrsState, elapsedDays = 0): Record<SrsGrade, string> {
  const grades: SrsGrade[] = ['again', 'hard', 'good', 'easy']
  const opts: GradeOptions = { elapsedDays, rng: () => 0.5 }
  return Object.fromEntries(
    grades.map((g) => [g, formatDueIn(gradeCard(state, g, opts).dueInMinutes)])
  ) as Record<SrsGrade, string>
}

// The SRS fields of a brand-new card, matching the jp_card column defaults.
export function newCardState(): SrsState {
  return { status: 'new', learningStep: 0, intervalDays: 0, ease: START_EASE, reps: 0, lapses: 0 }
}
