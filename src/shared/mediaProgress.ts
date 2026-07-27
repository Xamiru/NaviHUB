// One step forward through a tracked title — the app's single definition of
// "I watched another episode" / "I read another chapter" / "I saw it again".
// Pure and importable everywhere: the media detail page's log button, the
// checklist's mediaLog items, and the tests all go through advanceProgress so
// status promotion and rewatch bookkeeping can't drift between them.

import type { MediaType } from './types'

// Mirrors MediaConfig.unitProgress in renderer/lib/mediaConfig.ts — main can't
// import renderer files, so keep the two in step. These types count units
// (episodes / chapters); the rest are one-shot works.
export const UNIT_PROGRESS_TYPES: MediaType[] = ['anime', 'manga', 'tv']

export function isUnitProgress(mediaType: MediaType): boolean {
  return UNIT_PROGRESS_TYPES.includes(mediaType)
}

// Per-type status lists live in the settings table as JSON arrays and follow
// the positional convention first = in progress, second = completed, last =
// planned (mirrors the renderer's statusesFrom in lib/hooks.ts). These
// fallbacks duplicate mediaConfig.ts / connection.ts DEFAULT_SETTINGS for the
// main process — keep the three in step.
export const STATUS_FALLBACKS: Record<MediaType, string[]> = {
  anime: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
  manga: ['Reading', 'Completed', 'On Hold', 'Dropped', 'Plan to Read'],
  visual_novel: ['Playing', 'Completed', 'On Hold', 'Dropped', 'Plan to Play'],
  game: ['Playing', 'Completed', 'On Hold', 'Dropped', 'Plan to Play'],
  movie: ['Watching', 'Watched', 'On Hold', 'Dropped', 'Want to Watch'],
  tv: ['Watching', 'Watched', 'On Hold', 'Dropped', 'Want to Watch']
}

export function parseStatuses(raw: string | null, mediaType: MediaType): string[] {
  const fallback = STATUS_FALLBACKS[mediaType] ?? []
  if (!raw) return fallback
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((s) => typeof s === 'string')) {
      return parsed as string[]
    }
  } catch {
    /* malformed setting — fall back */
  }
  return fallback
}

export interface MediaProgressState {
  progress: number
  status: string | null
  totalUnits: number | null
  rewatchCount: number
}

export interface MediaProgressAdvance extends MediaProgressState {
  // True when this step wrapped a finished title back to the start — the
  // caller should say so out loud rather than silently resetting progress.
  startedRewatch: boolean
}

function isFinished(cur: MediaProgressState, completed: string | null): boolean {
  if (completed && cur.status === completed) return true
  return cur.totalUnits != null && cur.totalUnits > 0 && cur.progress >= cur.totalUnits
}

export function advanceProgress(
  cur: MediaProgressState,
  statuses: string[],
  unitProgress: boolean
): MediaProgressAdvance {
  const inProgress = statuses[0] ?? null
  const completed = statuses[1] ?? null
  const planned = statuses.length ? statuses[statuses.length - 1] : null

  // Already through it once: this is another pass. rewatch_count is read as
  // "times consumed" (mediaRepo.timeStats uses max(rewatch_count, 1)), so a
  // row that never recorded a count is at 1 and the second pass makes it 2.
  if (isFinished(cur, completed)) {
    const rewatchCount = Math.max(cur.rewatchCount, 1) + 1
    if (!unitProgress) {
      // Nothing to count down — a film stays watched, just one more time.
      return { ...cur, status: completed ?? cur.status, rewatchCount, startedRewatch: true }
    }
    const oneUnit = cur.totalUnits != null && cur.totalUnits <= 1
    return {
      ...cur,
      progress: 1,
      status: oneUnit ? (completed ?? cur.status) : (inProgress ?? cur.status),
      rewatchCount,
      startedRewatch: true
    }
  }

  if (!unitProgress) {
    return { ...cur, status: completed ?? cur.status, startedRewatch: false }
  }

  const progress = cur.progress + 1
  let status = cur.status
  if (!status || status === planned) status = inProgress ?? status
  if (cur.totalUnits != null && cur.totalUnits > 0 && progress >= cur.totalUnits && completed) {
    status = completed
  }
  return { ...cur, progress, status, startedRewatch: false }
}
