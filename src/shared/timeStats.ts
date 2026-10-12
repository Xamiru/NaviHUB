// "Days watched" math for the /stats page — how many minutes one tracked title
// stands for. Pure, because two processes need it: mediaRepo.timeStats on main
// and the quiz-pool child's creditTime (top people and studios), which has no
// settingsRepo. Main reads the settings into a TimeStatsConfig and passes it in.

import type { MediaType } from './types'

export const STAT_TYPES: MediaType[] = [
  'anime',
  'manga',
  'visual_novel',
  'game',
  'movie',
  'tv',
  'book'
]

// Types whose minutes always lean on a per-unit assumption.
export const ESTIMATED_TYPES = new Set<MediaType>(['anime', 'manga', 'tv', 'book'])

export interface TimeStatsConfig {
  animeEp: number
  tvEp: number
  mangaCh: number
  bookPage: number
  // The POSITIONAL second status per type (parseStatuses(...)[1]), so a renamed
  // completed status keeps counting.
  completed: Partial<Record<MediaType, string>>
}

export interface StatRow {
  id: number
  media_type: MediaType
  title: string
  cover_path: string | null
  total_units: number | null
  status: string | null
  progress: number
  rewatch_count: number
  ep_duration: number | null
}

// The SELECT list every consumer of rowMinutes reads (alias m).
export const STAT_ROW_COLUMNS = `m.id, m.media_type, m.title, m.cover_path, m.total_units,
  m.status, m.progress, m.rewatch_count,
  CAST(json_extract(m.metadata, '$.epDuration') AS REAL) AS ep_duration`

// Case and surrounding space are ignored, as the SQL prefilter does.
function normStatus(s: string | null | undefined): string {
  return (s ?? '').trim().toLowerCase()
}

export function isCompletedRow(
  r: Pick<StatRow, 'media_type' | 'status'>,
  cfg: TimeStatsConfig
): boolean {
  const completed = normStatus(cfg.completed[r.media_type])
  return completed !== '' && normStatus(r.status) === completed
}

// A row contributes to the stats when it has progress, a logged pass, or the
// type's completed status.
export function isConsumed(r: StatRow, cfg: TimeStatsConfig): boolean {
  return r.progress > 0 || r.rewatch_count > 0 || isCompletedRow(r, cfg)
}

// Distinct completed labels, lowercased, for a SQL prefilter on
// COMPLETED_STATUS_SQL; the exact per-type check happens in isConsumed.
export function completedLabels(cfg: TimeStatsConfig): string[] {
  return [...new Set(Object.values(cfg.completed).map(normStatus).filter((s) => s !== ''))]
}

// The status as completedLabels compares it (alias m).
export const COMPLETED_STATUS_SQL = `LOWER(TRIM(COALESCE(m.status, '')))`

// Units across every pass of a unit-counted title (episodes, chapters, pages).
// rewatch_count is "times consumed". A finished title is total × passes. One
// in progress on a later pass (the rewatch wrap sets progress back to 1 and
// the status to in-progress) is every earlier full pass plus the current one.
function passUnits(r: StatRow, completed: boolean): number {
  const passes = Math.max(r.rewatch_count, 1)
  const full = r.total_units ?? r.progress
  if (completed) return full * passes
  return (passes - 1) * full + r.progress
}

// Minutes for one consumed row. `estimated` = the value leans on a per-unit
// assumption (anime/tv/manga/book always; game/vn only when no playtime was
// logged and the title's length stands in).
export function rowMinutes(
  r: StatRow,
  cfg: TimeStatsConfig
): { minutes: number; estimated: boolean } {
  const completed = isCompletedRow(r, cfg)
  switch (r.media_type) {
    case 'game': {
      // progress = hours played (replays already folded in, never × passes)
      if (r.progress > 0) return { minutes: r.progress * 60, estimated: false }
      if (completed && r.total_units) return { minutes: r.total_units * 60, estimated: true }
      return { minutes: 0, estimated: false }
    }
    case 'visual_novel': {
      // progress = minutes played (replays already folded in, never × passes)
      if (r.progress > 0) return { minutes: r.progress, estimated: false }
      if (completed && r.total_units) return { minutes: r.total_units, estimated: true }
      return { minutes: 0, estimated: false }
    }
    case 'movie': {
      // total_units = runtime minutes; count every viewing
      return { minutes: (r.total_units ?? 0) * Math.max(r.rewatch_count, 1), estimated: false }
    }
    case 'anime':
    case 'tv': {
      const perEp =
        r.ep_duration && r.ep_duration > 0 ? r.ep_duration : r.media_type === 'tv' ? cfg.tvEp : cfg.animeEp
      return { minutes: passUnits(r, completed) * perEp, estimated: true }
    }
    case 'manga':
      return { minutes: passUnits(r, completed) * cfg.mangaCh, estimated: true }
    case 'book':
      // progress = current page; total_units = page count
      return { minutes: passUnits(r, completed) * cfg.bookPage, estimated: true }
    default:
      return { minutes: 0, estimated: false }
  }
}
