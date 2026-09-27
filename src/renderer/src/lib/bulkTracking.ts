import type { BulkPreviewItem, BulkTracking } from '@shared/types'

// AniList list statuses onto this app's per-type status list, which the user
// may have renamed. The Home roles are positional (first = in progress,
// second = completed, last = planned); paused and dropped have no position,
// so they match by their default names and are left unset when renamed away.
export function mapAniListStatus(status: string, statuses: string[]): string | null {
  if (!statuses.length) return null
  const named = (name: string): string | null =>
    statuses.find((s) => s.toLowerCase() === name) ?? null
  switch (status) {
    case 'CURRENT':
    case 'REPEATING':
      return statuses[0]
    case 'COMPLETED':
      return statuses[1] ?? null
    case 'PLANNING':
      return statuses[statuses.length - 1]
    case 'PAUSED':
      return named('on hold')
    case 'DROPPED':
      return named('dropped')
    default:
      return null
  }
}

// AniList list scores arrive out of 10; stored scores use the user's score.max.
export function scaleAniListScore(score: number | null, scoreMax: number): number | null {
  if (score == null) return null
  return Math.round((score / 10) * scoreMax * 10) / 10
}

export function trackingFor(
  item: BulkPreviewItem,
  statuses: string[],
  scoreMax: number
): BulkTracking | undefined {
  if (!item.list) return undefined
  return {
    status: mapAniListStatus(item.list.status, statuses),
    score: scaleAniListScore(item.list.score, scoreMax),
    progress: item.list.progress
  }
}
