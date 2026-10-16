// Spaced-repetition scheduler (FSRS-5 with Anki-style learning steps) for the
// Japanese and English review decks. Pure and deterministic: the main process
// applies grades in japaneseRepo/englishRepo, and the renderer imports the
// same module to preview each grade's next interval on the review buttons —
// no IPC round trip, and the two can never disagree.
//
// FSRS models each card's memory as stability S (days until recall drops to
// 90%) and difficulty D (1–10), updated from every answer and the real time
// since the previous one. The interval is then chosen to hit the desired
// retention. It replaced an SM-2 variant (2026-10): for the same retention it
// schedules noticeably fewer reviews, and lateness, lapses and easy cards are
// handled by the model instead of hand-tuned multipliers. Parameters are the
// published FSRS-5 defaults; the review logs now record what an optimizer
// would need (state, elapsed and scheduled days) should per-user fitting come.
import type { SrsGrade, SrsStatus } from './types'

export interface SrsState {
  status: SrsStatus
  learningStep: number
  intervalDays: number
  // Legacy SM-2 ease. Still stored (and still in the logs) so older rows and
  // exports keep their meaning; FSRS neither reads nor changes it.
  ease: number
  reps: number
  lapses: number
  // FSRS memory state; null until the card's first answer.
  stability: number | null
  difficulty: number | null
}

export interface SrsResult extends SrsState {
  dueInMinutes: number
}

// Learning steps for cards being introduced; a single shorter ladder for cards
// relearning after a lapse (they had graduated once already).
export const LEARNING_STEPS_MIN = [1, 10]
export const RELEARN_STEPS_MIN = [10]
export const START_EASE = 2.5
export const MAX_INTERVAL_DAYS = 3650
export const DEFAULT_RETENTION = 0.9
// The retention choices offered in Settings; anything else clamps into range.
export const RETENTION_OPTIONS = [0.85, 0.9, 0.95] as const
export const RETENTION_SETTING = 'srs.desiredRetention'
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
// answered correctly this many times, independent of its real FSRS state.
export const GHOST_STEPS = 3
// ±5%. Deterministic intervals keep a cohort a cohort forever, and this app
// introduces cards in cohorts BY DESIGN — buildCoreDeck dumps 500 words,
// buildPrepDeck 100, and setLessonLearned flips a whole lesson at once.
export const FUZZ_RATIO = 0.1

const DAY_MIN = 1440

// FSRS-5 default parameters (w0..w18).
export const FSRS_WEIGHTS = [
  0.40255, 1.18385, 3.173, 15.69105, 7.1949, 0.5345, 1.4604, 0.0046, 1.54575, 0.1192, 1.01925,
  1.9395, 0.11, 0.29605, 2.2698, 0.2315, 2.9898, 0.51655, 0.6621
] as const
const w = FSRS_WEIGHTS
const DECAY = -0.5
const FACTOR = 19 / 81 // so that retrievability(S, S) === 0.9
const MIN_STABILITY = 0.01

const GRADE_VALUE: Record<SrsGrade, 1 | 2 | 3 | 4> = { again: 1, hard: 2, good: 3, easy: 4 }

const clampD = (d: number): number => Math.min(10, Math.max(1, d))

export function clampRetention(r: number | null | undefined): number {
  if (r == null || !Number.isFinite(r)) return DEFAULT_RETENTION
  return Math.min(0.97, Math.max(0.7, r))
}

// The `srs.desiredRetention` settings row as a retention; a missing, blank or
// unreadable value is the default, never 0 clamped to the floor.
export function retentionFromSetting(raw: string | null | undefined): number {
  if (raw == null || raw.trim() === '') return DEFAULT_RETENTION
  return clampRetention(Number(raw))
}

// Probability of recall after `elapsedDays` for a card of stability `s`.
export function retrievability(elapsedDays: number, s: number): number {
  return Math.pow(1 + (FACTOR * Math.max(0, elapsedDays)) / s, DECAY)
}

function initStability(g: number): number {
  return Math.max(MIN_STABILITY, w[g - 1])
}

function initDifficulty(g: number): number {
  return clampD(w[4] - Math.exp(w[5] * (g - 1)) + 1)
}

function nextDifficulty(d: number, g: number): number {
  const delta = -w[6] * (g - 3)
  const damped = d + (delta * (10 - d)) / 9
  // Mean reversion toward the difficulty of a first-answer Easy.
  return clampD(w[7] * initDifficulty(4) + (1 - w[7]) * damped)
}

function recallStability(d: number, s: number, r: number, g: number): number {
  const hardPenalty = g === 2 ? w[15] : 1
  const easyBonus = g === 4 ? w[16] : 1
  return (
    s *
    (Math.exp(w[8]) *
      (11 - d) *
      Math.pow(s, -w[9]) *
      (Math.exp(w[10] * (1 - r)) - 1) *
      hardPenalty *
      easyBonus +
      1)
  )
}

function forgetStability(d: number, s: number, r: number): number {
  const sf = w[11] * Math.pow(d, -w[12]) * (Math.pow(s + 1, w[13]) - 1) * Math.exp(w[14] * (1 - r))
  // FSRS-5 caps a lapse below S / e^(w17·w18), so the same-day relearning Good
  // that follows (×e^(w17·w18)) can at most restore the old stability — a
  // forgotten card must never come out more stable than it went in.
  return Math.max(MIN_STABILITY, Math.min(sf, s / Math.exp(w[17] * w[18])))
}

// A second answer the same calendar day (learning steps): the elapsed time is
// too short for the forgetting curve to say anything, so FSRS-5 uses a
// separate update.
function shortTermStability(s: number, g: number): number {
  return Math.max(MIN_STABILITY, s * Math.exp(w[17] * (g - 3 + w[18])))
}

// Days until recall falls to `retention` for a card of stability `s`.
export function intervalForStability(s: number, retention: number): number {
  const days = (s / FACTOR) * (Math.pow(retention, 1 / DECAY) - 1)
  return Math.min(MAX_INTERVAL_DAYS, Math.max(1, Math.round(days)))
}

// The memory state after one answer. Exported for the log replay that gives
// pre-FSRS cards their state (db/fsrsMigration.ts).
export function nextMemory(
  memory: { stability: number | null; difficulty: number | null },
  grade: SrsGrade,
  elapsedDays: number
): { stability: number; difficulty: number } {
  const g = GRADE_VALUE[grade]
  if (memory.stability == null || memory.difficulty == null) {
    return { stability: initStability(g), difficulty: initDifficulty(g) }
  }
  const s = memory.stability
  const d = memory.difficulty
  const difficulty = nextDifficulty(d, g)
  if (elapsedDays < 1) return { stability: shortTermStability(s, g), difficulty }
  // Whole days, as the default weights were fitted on.
  const r = retrievability(elapsedDays, s)
  return {
    stability: g === 1 ? forgetStability(d, s, r) : recallStability(d, s, r, g),
    difficulty
  }
}

export type GradeOptions = {
  // Calendar days since the card's previous answer (calendarDaysSince; 0 for
  // the same day or a first answer). FSRS needs the real gap, early or late: a
  // card that survived a longer gap than scheduled earns a bigger stability
  // gain, one answered early earns less, and a same-day answer takes the
  // short-term update. Whole days, as the FSRS-5 weights were fitted on.
  elapsedDays?: number
  // Desired retention (Settings → Learning → Review scheduler).
  retention?: number
  // Injected so previewIntervals and the tests stay deterministic.
  rng?: () => number
}

// Applied to review-length intervals only: fuzzing a 1-day step would round
// straight back to 1 and just add noise to the learning ladder.
function fuzz(days: number, rng: () => number): number {
  if (days < 2) return days
  return Math.min(MAX_INTERVAL_DAYS, Math.max(1, Math.round(days * (1 + (rng() - 0.5) * FUZZ_RATIO))))
}

function reviewAt(s: SrsState, days: number): SrsResult {
  return { ...s, status: 'review', learningStep: 0, intervalDays: days, dueInMinutes: days * DAY_MIN }
}

export function gradeCard(state: SrsState, grade: SrsGrade, opts: GradeOptions = {}): SrsResult {
  const rng = opts.rng ?? Math.random
  const retention = clampRetention(opts.retention)
  const elapsed = Math.max(0, opts.elapsedDays ?? 0)
  const memory = nextMemory(state, grade, elapsed)
  const s: SrsState = { ...state, ...memory, reps: state.reps + 1 }
  const interval = (stability: number): number => fuzz(intervalForStability(stability, retention), rng)

  if (s.status !== 'review') {
    // 'new' and 'learning' share the step ladder; a new card is step 0. A
    // relearning card is recognized by its non-zero interval (it graduated
    // once), and walks the shorter relearning ladder.
    const relearning = state.intervalDays > 0 && state.status === 'learning'
    const steps = relearning ? RELEARN_STEPS_MIN : LEARNING_STEPS_MIN
    const step = Math.min(s.learningStep, steps.length - 1)
    switch (grade) {
      case 'again':
        return { ...s, status: 'learning', learningStep: 0, dueInMinutes: steps[0] }
      case 'hard':
        return { ...s, status: 'learning', learningStep: step, dueInMinutes: steps[step] }
      case 'good': {
        const next = step + 1
        if (next >= steps.length) return reviewAt(s, interval(memory.stability))
        return { ...s, status: 'learning', learningStep: next, dueInMinutes: steps[next] }
      }
      case 'easy':
        // Easy skips the remaining steps; FSRS's Easy stability already
        // carries the bonus, and it must at least beat a Good graduation.
        return reviewAt(s, Math.max(interval(memory.stability), 2))
    }
  }

  if (grade === 'again') {
    // Lapse: into relearning. The interval kept on the card is what the
    // forgetting model leaves, so relearning resumes from it.
    return {
      ...s,
      status: 'learning',
      learningStep: 0,
      lapses: s.lapses + 1,
      intervalDays: intervalForStability(memory.stability, retention),
      dueInMinutes: RELEARN_STEPS_MIN[0]
    }
  }

  // Hard ≤ Good < Easy, whatever the model says for a near-tie: the buttons
  // must never invert. The chosen grade's memory is already computed.
  const stabilityFor = (g: 'hard' | 'good' | 'easy'): number =>
    g === grade ? memory.stability : nextMemory(state, g, elapsed).stability
  const hard = stabilityFor('hard')
  const good = stabilityFor('good')
  const easy = stabilityFor('easy')
  const hardDays = Math.min(intervalForStability(hard, retention), intervalForStability(good, retention))
  const goodDays = Math.max(intervalForStability(good, retention), hardDays + 1)
  const easyDays = Math.max(intervalForStability(easy, retention), goodDays + 1)
  const days = grade === 'hard' ? hardDays : grade === 'good' ? goodDays : easyDays
  return reviewAt(s, fuzz(days, rng))
}

export function formatDueIn(minutes: number): string {
  if (minutes < 60) return `${Math.max(1, Math.round(minutes))}m`
  if (minutes < DAY_MIN) return `${Math.round(minutes / 60)}h`
  const days = Math.round(minutes / DAY_MIN)
  if (days < 30) return `${days}d`
  if (days < 365) return `${Math.round(days / 30.4)}mo`
  return `${(days / 365).toFixed(1)}y`
}

// A stored SQLite timestamp ('YYYY-MM-DD HH:MM:SS', UTC) as epoch ms.
export function parseSqliteUtc(at: string | null | undefined): number | null {
  if (!at) return null
  const t = Date.parse(at.includes('T') ? at : `${at.replace(' ', 'T')}Z`)
  return Number.isFinite(t) ? t : null
}

// Days since a stored SQLite timestamp, fractional.
export function daysSince(at: string | null | undefined, now = Date.now()): number {
  const t = parseSqliteUtc(at)
  return t == null ? 0 : Math.max(0, (now - t) / 86_400_000)
}

// Whole local calendar days between two instants (0 = the same day), the
// elapsed measure FSRS schedules with. Counted on local dates, so an answer at
// 23:00 and one at 08:00 the next morning are a day apart.
export function calendarDaysBetween(fromMs: number, toMs: number): number {
  const a = new Date(fromMs)
  const b = new Date(toMs)
  const days =
    (Date.UTC(b.getFullYear(), b.getMonth(), b.getDate()) -
      Date.UTC(a.getFullYear(), a.getMonth(), a.getDate())) /
    86_400_000
  return Math.max(0, Math.round(days))
}

export function calendarDaysSince(at: string | null | undefined, now = Date.now()): number {
  const t = parseSqliteUtc(at)
  return t == null ? 0 : calendarDaysBetween(t, now)
}

// Days a card is overdue, from its stored due_at ('YYYY-MM-DD HH:MM:SS', UTC).
// Display only (deck lists); scheduling uses daysSince(last_reviewed_at).
export function overdueDays(dueAt: string | null | undefined, now = Date.now()): number {
  return Math.floor(daysSince(dueAt, now))
}

// "1m / 10m / 1d / 4d" labels for the four review buttons. rng is pinned to the
// midpoint so the preview shows the un-fuzzed interval — the button must not
// flicker between renders. Pass the same elapsed days and retention main uses.
export function previewIntervals(
  state: SrsState,
  elapsedDays = 0,
  retention = DEFAULT_RETENTION
): Record<SrsGrade, string> {
  const grades: SrsGrade[] = ['again', 'hard', 'good', 'easy']
  const opts: GradeOptions = { elapsedDays, retention, rng: () => 0.5 }
  return Object.fromEntries(
    grades.map((g) => [g, formatDueIn(gradeCard(state, g, opts).dueInMinutes)])
  ) as Record<SrsGrade, string>
}

// The scheduler's view of a stored card or word — one definition for both
// repos and both review pages.
export function srsStateOf(card: {
  status: SrsStatus
  learningStep: number
  intervalDays: number
  ease: number
  reps: number
  lapses: number
  stability: number | null
  difficulty: number | null
}): SrsState {
  return {
    status: card.status,
    learningStep: card.learningStep,
    intervalDays: card.intervalDays,
    ease: card.ease,
    reps: card.reps,
    lapses: card.lapses,
    stability: card.stability,
    difficulty: card.difficulty
  }
}

// The optimizer columns of a review log row: state_before, elapsed_days,
// scheduled_days. Relearning (a lapsed card in its steps) is told apart from
// first-time learning, the scheduled gap is the review interval the card had
// (0 inside the step ladder), and a first answer has no previous gap.
export function reviewLogValues(
  before: SrsState,
  elapsedDays: number
): [stateBefore: string, elapsedDays: number | null, scheduledDays: number] {
  const relearning = before.status === 'learning' && before.intervalDays > 0
  const stateBefore = relearning ? 'relearning' : before.status
  const scheduledDays = before.status === 'review' ? before.intervalDays : 0
  return [stateBefore, before.reps === 0 ? null : elapsedDays, scheduledDays]
}

// The SRS fields of a brand-new card, matching the jp_card column defaults.
export function newCardState(): SrsState {
  return {
    status: 'new',
    learningStep: 0,
    intervalDays: 0,
    ease: START_EASE,
    reps: 0,
    lapses: 0,
    stability: null,
    difficulty: null
  }
}
