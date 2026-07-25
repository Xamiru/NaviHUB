// Config for the Checklist section: which recurring items can exist, and the
// pure date math behind daily/weekly periods. Pure data + functions, importable
// by main (the repo), the renderer (pages render the catalog straight from
// here) and tests. Adding an item = one entry in CHECKLIST_DEFS; the DB only
// stores which items are enabled and what happened.
//
// `key` strings are FROZEN vocabulary — they're stored in checklist_task.task_key
// and checklist_log.task_key. Rename labels freely, never keys.

import { GACHA_GAMES } from './gacha'
import type { ChecklistCadence, ChecklistKind, MediaType } from './types'

// Where a `detected` item reads its completion from. Each maps to one timestamp
// column the app already writes (see checklistRepo.detectedCount).
export type ChecklistDetectSource = 'jpReviews' | 'jpLesson' | 'mangaChapter' | 'quizRound'

export interface ChecklistDef {
  key: string
  label: string
  hint: string // one-line explanation of what completes it
  kind: ChecklistKind
  defaultCadence: ChecklistCadence
  target: number
  // mediaLog only: which library type the picker searches, and what logging one
  // does to the picked row.
  mediaType?: MediaType
  mediaAction?: 'incrementProgress' | 'markWatched'
  // detected only: where clicking the row goes, and which activity table proves
  // it was done.
  route?: string
  source?: ChecklistDetectSource
}

export const CHECKLIST_DEFS: ChecklistDef[] = [
  {
    key: 'anime-episode',
    label: 'Watch an anime episode',
    hint: 'Logging one bumps that anime’s episode progress.',
    kind: 'mediaLog',
    defaultCadence: 'daily',
    target: 1,
    mediaType: 'anime',
    mediaAction: 'incrementProgress'
  },
  {
    key: 'movie-watch',
    label: 'Watch a movie',
    hint: 'Logging one marks that film watched.',
    kind: 'mediaLog',
    defaultCadence: 'weekly',
    target: 2,
    mediaType: 'movie',
    mediaAction: 'markWatched'
  },
  {
    key: 'jp-reviews',
    label: 'Japanese reviews',
    hint: 'Counts distinct cards reviewed in the SRS.',
    kind: 'detected',
    defaultCadence: 'daily',
    target: 20,
    route: '/japanese/review',
    source: 'jpReviews'
  },
  {
    key: 'jp-lesson',
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
    label: 'Read a manga chapter',
    hint: 'Counts chapters marked read in the reader.',
    kind: 'detected',
    defaultCadence: 'daily',
    target: 1,
    route: '/manga',
    source: 'mangaChapter'
  },
  {
    key: 'quiz-round',
    label: 'Play a quiz round',
    hint: 'Any finished quiz round counts.',
    kind: 'detected',
    defaultCadence: 'weekly',
    target: 1,
    route: '/quiz',
    source: 'quizRound'
  },
  ...GACHA_GAMES.map(
    (g): ChecklistDef => ({
      key: `gacha-daily-${g.id}`,
      label: `${g.short} dailies`,
      hint: 'Tick it yourself when the dailies are cleared.',
      kind: 'manual',
      defaultCadence: 'daily',
      target: 1
    })
  )
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

// ---------------------------------------------------------------------------
// Status-list resolution for the MAIN process. Per-type status lists live in
// the settings table as JSON arrays and follow the positional convention
// first = in-progress, second = completed, last = planned (mirrors the
// renderer's statusesFrom in lib/hooks.ts). The fallbacks duplicate
// mediaConfig.ts / connection.ts DEFAULT_SETTINGS because main cannot import
// renderer files — keep the three in step.
// ---------------------------------------------------------------------------

export const CHECKLIST_STATUS_FALLBACKS: Partial<Record<MediaType, string[]>> = {
  anime: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
  movie: ['Watching', 'Watched', 'On Hold', 'Dropped', 'Want to Watch']
}

export function parseStatuses(raw: string | null, mediaType: MediaType): string[] {
  const fallback = CHECKLIST_STATUS_FALLBACKS[mediaType] ?? []
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((s) => typeof s === 'string')) {
      return parsed as string[]
    }
  } catch {
    /* fall through */
  }
  return fallback
}
