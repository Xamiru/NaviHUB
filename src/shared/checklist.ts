// Config for the Checklist section: which built-in recurring items can exist,
// and the pure date, schedule and streak math behind the board. Pure data +
// functions, importable by main (the repo), the renderer and tests. Adding a
// built-in item = one entry in CHECKLIST_DEFS; the DB stores which items are
// enabled, the user's own custom items, skips and what happened.
//
// `key` strings are FROZEN vocabulary — they're stored in checklist_task.task_key
// and checklist_log.task_key. Rename labels freely, never keys. A custom item's
// key is `custom-<checklist_custom.id>`, equally frozen.

import type {
  ChecklistCadence,
  ChecklistKind,
  ChecklistPeriodState,
  ChecklistStreak,
  MediaType
} from './types'

// Where a `detected` item reads its completion from. Each maps to one timestamp
// column the app already writes (see checklistRepo's DETECT_SQL). Detection is
// the primary signal, but every detected item can also be credited by hand —
// the activity often happens outside the app.
export type ChecklistDetectSource =
  | 'jpReviews'
  | 'jpLesson'
  | 'quizRound'
  | 'enReviews'
  | 'gameSession'
  | 'progLesson'
  | 'gameMinutes'
  | 'jpDrill'
  | 'jpTutor'
  | 'enDrill'
  | 'enWriting'
  | 'progSolve'

// Where the add dialog files an item.
export type ChecklistGroup = 'watch' | 'study' | 'play'

export const CHECKLIST_GROUPS: { key: ChecklistGroup; label: string }[] = [
  { key: 'watch', label: 'Watch and read' },
  { key: 'study', label: 'Study' },
  { key: 'play', label: 'Play' }
]

export interface ChecklistDef {
  key: string
  label: string
  hint: string // one-line explanation of what completes it
  kind: ChecklistKind
  group: ChecklistGroup
  defaultCadence: ChecklistCadence
  target: number
  unit?: string // shown after the target: '30 min'
  // mediaLog / mediaSession: which library type the picker searches. What a
  // mediaLog DOES to the picked row is derived from that type by
  // @shared/mediaProgress (advanceProgress + isUnitProgress) — the same path the
  // detail page's log button takes — so it is deliberately not restated per
  // item. A mediaSession only ever runs startSession.
  mediaType?: MediaType
  // detected only: where clicking the row goes, and which activity table proves
  // it was done.
  route?: string
  source?: ChecklistDetectSource
}

export const CHECKLIST_DEFS: ChecklistDef[] = [
  {
    key: 'anime-episode',
    group: 'watch',
    label: 'Watch an anime episode',
    hint: 'Logging one bumps that anime’s episode progress.',
    kind: 'mediaLog',
    defaultCadence: 'daily',
    target: 1,
    mediaType: 'anime'
  },
  {
    key: 'movie-watch',
    group: 'watch',
    label: 'Watch a movie',
    hint: 'Logging one marks that film watched.',
    kind: 'mediaLog',
    defaultCadence: 'weekly',
    target: 2,
    mediaType: 'movie'
  },
  {
    key: 'jp-reviews',
    group: 'study',
    label: 'Japanese reviews',
    hint: 'Counts distinct cards reviewed in the SRS.',
    kind: 'detected',
    defaultCadence: 'daily',
    target: 20,
    route: '/japanese/review',
    source: 'jpReviews'
  },
  {
    key: 'english-reviews',
    group: 'study',
    label: 'English reviews',
    hint: 'Counts distinct words reviewed in the English SRS.',
    kind: 'detected',
    defaultCadence: 'daily',
    target: 10,
    route: '/english/review',
    source: 'enReviews'
  },
  {
    key: 'jp-lesson',
    group: 'study',
    label: 'Learn a Japanese lesson',
    hint: 'Counts lessons marked as learned.',
    kind: 'detected',
    defaultCadence: 'weekly',
    target: 1,
    route: '/japanese',
    source: 'jpLesson'
  },
  {
    key: 'manga-chapter',
    group: 'watch',
    label: 'Read a manga chapter',
    // Was auto-detected from manga_chapter.read_at, but those rows only exist
    // for series with a scanned local folder read in the in-app reader — every
    // other way of reading manga could never tick it.
    hint: 'Logging one bumps that series’ chapter progress.',
    kind: 'mediaLog',
    defaultCadence: 'daily',
    target: 1,
    mediaType: 'manga'
  },
  {
    key: 'tv-episode',
    group: 'watch',
    label: 'Watch a TV episode',
    hint: 'Logging one bumps that show’s episode progress.',
    kind: 'mediaLog',
    defaultCadence: 'daily',
    target: 1,
    mediaType: 'tv'
  },
  {
    key: 'quiz-round',
    group: 'play',
    label: 'Play a quiz round',
    hint: 'Any finished quiz round counts.',
    kind: 'detected',
    defaultCadence: 'weekly',
    target: 1,
    route: '/quiz',
    source: 'quizRound'
  },
  {
    key: 'game-session',
    group: 'play',
    label: 'Play a game',
    // Only sessions launched through NaviHUB are detected — the credit button
    // covers everything played outside it (the detected-kind design note).
    hint: 'Counts play sessions launched from NaviHUB; credit by hand for sessions elsewhere.',
    kind: 'detected',
    defaultCadence: 'daily',
    target: 1,
    route: '/games',
    source: 'gameSession'
  },
  {
    key: 'prog-lesson',
    group: 'study',
    label: 'Complete a programming lesson',
    hint: 'Counts lessons marked complete in the Programming section.',
    kind: 'detected',
    defaultCadence: 'weekly',
    target: 1,
    route: '/programming',
    source: 'progLesson'
  },
  {
    key: 'book-session',
    group: 'watch',
    label: 'Read a book',
    hint: 'Pick the book you read. Starts a planned book; never marks it finished.',
    kind: 'mediaSession',
    defaultCadence: 'daily',
    target: 1,
    mediaType: 'book'
  },
  {
    key: 'vn-session',
    group: 'watch',
    label: 'Read a visual novel',
    hint: 'Pick the visual novel you read. Starts a planned one; never marks it finished.',
    kind: 'mediaSession',
    defaultCadence: 'daily',
    target: 1,
    mediaType: 'visual_novel'
  },
  {
    key: 'game-minutes',
    group: 'play',
    label: 'Play games',
    hint: 'Counts minutes of play sessions launched from NaviHUB; add minutes played elsewhere by hand.',
    kind: 'detected',
    defaultCadence: 'daily',
    target: 30,
    unit: 'min',
    route: '/games',
    source: 'gameMinutes'
  },
  {
    key: 'jp-drill',
    group: 'study',
    label: 'Do a Japanese drill',
    hint: 'Counts finished Japanese quiz and drill rounds.',
    kind: 'detected',
    defaultCadence: 'daily',
    target: 1,
    route: '/japanese',
    source: 'jpDrill'
  },
  {
    key: 'jp-tutor-day',
    group: 'study',
    label: 'Finish a Japanese tutor day',
    hint: 'Counts tutor days you have finished and saved.',
    kind: 'detected',
    defaultCadence: 'daily',
    target: 1,
    route: '/japanese',
    source: 'jpTutor'
  },
  {
    key: 'en-drill',
    group: 'study',
    label: 'Do an English drill',
    hint: 'Counts finished English quiz and drill rounds.',
    kind: 'detected',
    defaultCadence: 'daily',
    target: 1,
    route: '/english',
    source: 'enDrill'
  },
  {
    key: 'en-writing',
    group: 'study',
    label: 'Write in English',
    hint: 'Counts English writing submissions.',
    kind: 'detected',
    defaultCadence: 'weekly',
    target: 1,
    route: '/english',
    source: 'enWriting'
  },
  {
    key: 'prog-exercise',
    group: 'study',
    label: 'Solve a new programming exercise',
    hint: 'Counts SQL exercises and regex puzzles solved for the first time.',
    kind: 'detected',
    defaultCadence: 'weekly',
    target: 3,
    route: '/programming',
    source: 'progSolve'
  }
]

export function checklistDef(key: string): ChecklistDef | undefined {
  return CHECKLIST_DEFS.find((d) => d.key === key)
}

// ---------------------------------------------------------------------------
// Period math. Every date in and out is a LOCAL calendar day 'YYYY-MM-DD'; the
// arithmetic runs on the split parts through Date.UTC so a timezone offset can
// never shift a day (`new Date('2026-07-25')` parses as UTC midnight, which is
// the previous day west of Greenwich).
// ---------------------------------------------------------------------------

export const WEEK_START = 6 // Saturday, in getUTCDay() terms (0 = Sunday)

function toUtc(date: string): Date {
  const [y, m, d] = date.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function fromUtc(d: Date): string {
  const p = (n: number): string => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}-${p(d.getUTCMonth() + 1)}-${p(d.getUTCDate())}`
}

export function addDays(date: string, n: number): string {
  const d = toUtc(date)
  d.setUTCDate(d.getUTCDate() + n)
  return fromUtc(d)
}

export function dailyKey(date: string): string {
  return date
}

// The Saturday on or before `date` — the key every weekly row in that week shares.
export function weeklyKey(date: string): string {
  const back = (toUtc(date).getUTCDay() - WEEK_START + 7) % 7
  return addDays(date, -back)
}

export function periodKeyFor(cadence: ChecklistCadence, date: string): string {
  return cadence === 'weekly' ? weeklyKey(date) : dailyKey(date)
}

export function weekRange(date: string): { start: string; end: string } {
  const start = weeklyKey(date)
  return { start, end: addDays(start, 6) }
}

export function periodRange(
  cadence: ChecklistCadence,
  date: string
): { start: string; end: string } {
  return cadence === 'weekly' ? weekRange(date) : { start: date, end: date }
}

export function isValidDay(value: unknown): value is string {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false
  return fromUtc(toUtc(value)) === value
}

// The seven days of the week `date` falls in, Saturday first.
export function weekDays(date: string): string[] {
  const start = weeklyKey(date)
  return Array.from({ length: 7 }, (_, i) => addDays(start, i))
}

// ---------------------------------------------------------------------------
// Custom items. Their board key is derived from the checklist_custom row id.
// ---------------------------------------------------------------------------

export const CUSTOM_KEY_PREFIX = 'custom-'

export function customKey(id: number): string {
  return `${CUSTOM_KEY_PREFIX}${id}`
}

export function customIdOf(key: string): number | null {
  if (!key.startsWith(CUSTOM_KEY_PREFIX)) return null
  const id = Number(key.slice(CUSTOM_KEY_PREFIX.length))
  return Number.isInteger(id) && id > 0 ? id : null
}

// ---------------------------------------------------------------------------
// Weekday schedules. A daily item may be due only on some days: the mask has
// one bit per weekday in getUTCDay() terms (bit 0 = Sunday … bit 6 = Saturday).
// null means every day; an empty or full mask normalises to null.
// ---------------------------------------------------------------------------

export const ALL_DAYS_MASK = 0b1111111

// Display order, matching the Saturday-first week.
export const WEEKDAY_ORDER: { bit: number; short: string; long: string }[] = [
  { bit: 6, short: 'Sat', long: 'Saturday' },
  { bit: 0, short: 'Sun', long: 'Sunday' },
  { bit: 1, short: 'Mon', long: 'Monday' },
  { bit: 2, short: 'Tue', long: 'Tuesday' },
  { bit: 3, short: 'Wed', long: 'Wednesday' },
  { bit: 4, short: 'Thu', long: 'Thursday' },
  { bit: 5, short: 'Fri', long: 'Friday' }
]

export function weekdayOf(date: string): number {
  return toUtc(date).getUTCDay()
}

export function normalizeDays(mask: number | null | undefined): number | null {
  if (mask == null || !Number.isInteger(mask)) return null
  const clean = mask & ALL_DAYS_MASK
  return clean === 0 || clean === ALL_DAYS_MASK ? null : clean
}

export function isDueOn(mask: number | null, date: string): boolean {
  return mask == null || (mask & (1 << weekdayOf(date))) !== 0
}

// 'Sat, Mon, Wed' for a mask; 'Every day' for null.
export function describeDays(mask: number | null): string {
  if (mask == null) return 'Every day'
  return WEEKDAY_ORDER.filter((d) => mask & (1 << d.bit))
    .map((d) => d.short)
    .join(', ')
}

// ---------------------------------------------------------------------------
// Period states and streaks. Kept pure so the repo, the page and the tests all
// judge a day the same way.
// ---------------------------------------------------------------------------

export interface PeriodFacts {
  active: boolean // the item was on the board in this period
  due: boolean // scheduled in this period
  skipped: boolean // the item or the whole day was skipped
  progress: number
  target: number
  current: boolean // the period containing today
  future: boolean // after today
}

// Doing an item counts even on an off or skipped day: it is still done.
export function itemPeriodState(f: PeriodFacts): ChecklistPeriodState {
  if (f.future) return 'future'
  if (f.active && f.progress >= f.target) return 'done'
  if (!f.active || !f.due) return 'off'
  if (f.skipped) return 'skipped'
  return f.current ? 'pending' : 'missed'
}

// A whole day from its due items' states. A rest day is skipped as a whole;
// a day with nothing due is off.
export function dayState(
  itemStates: ChecklistPeriodState[],
  opts: { restDay: boolean; current: boolean; future: boolean }
): ChecklistPeriodState {
  if (opts.future) return 'future'
  if (opts.restDay) return 'skipped'
  const counted = itemStates.filter((s) => s === 'done' || s === 'missed' || s === 'pending')
  if (counted.length === 0) return itemStates.includes('skipped') ? 'skipped' : 'off'
  if (counted.every((s) => s === 'done')) return 'done'
  return opts.current ? 'pending' : 'missed'
}

// Streak over periods in ascending order (oldest first, ending at the current
// period). done extends the run; missed ends it; skipped and off bridge it
// without counting; a pending current period has not broken anything yet.
export function checklistStreak(statesAsc: ChecklistPeriodState[]): ChecklistStreak {
  let run = 0
  let longest = 0
  for (const state of statesAsc) {
    if (state === 'done') {
      run++
      if (run > longest) longest = run
    } else if (state === 'missed') {
      run = 0
    }
  }
  return { current: run, longest }
}

// Status-list resolution and the progress/rewatch rules live in
// @shared/mediaProgress — they're media concerns, shared with the media detail
// page's log button, not checklist-specific.

// The board's default shape, seeded once on first launch (connection.ts
// seedChecklist, gated by the `checklist.seeded` setting). Everything here is
// removable in-app afterwards.
export const CHECKLIST_SEED: { key: string; cadence: ChecklistCadence }[] = [
  { key: 'anime-episode', cadence: 'daily' },
  { key: 'jp-reviews', cadence: 'daily' },
  { key: 'manga-chapter', cadence: 'daily' },
  { key: 'movie-watch', cadence: 'weekly' },
  { key: 'jp-lesson', cadence: 'weekly' },
  { key: 'quiz-round', cadence: 'weekly' }
]
