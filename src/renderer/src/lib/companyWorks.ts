import type { MediaItem } from '@shared/types'

export type WorkSort = 'newest' | 'oldest' | 'score'

export const WORK_SORT_OPTIONS: { key: WorkSort; label: string }[] = [
  { key: 'newest', label: 'Newest' },
  { key: 'oldest', label: 'Oldest' },
  { key: 'score', label: 'Your score' }
]

// Undated works go last in every order; ties fall back to the title.
export function sortWorks(works: MediaItem[], sort: WorkSort): MediaItem[] {
  const date = (m: MediaItem): string => m.releaseDate ?? ''
  return [...works].sort((a, b) => {
    if (sort === 'score') {
      const byScore = (b.score ?? -1) - (a.score ?? -1)
      if (byScore) return byScore
    }
    if (!date(a) !== !date(b)) return date(a) ? -1 : 1
    const byDate = sort === 'oldest' ? date(a).localeCompare(date(b)) : date(b).localeCompare(date(a))
    return byDate || a.title.localeCompare(b.title)
  })
}

// Known for: the user's highest-scored works, then finished but unscored ones
// (newest first) to fill the strip. Works the user has neither scored nor
// finished never appear, so the strip reflects their own history.
export function pickTopWorks(
  works: MediaItem[],
  isCompleted: (m: MediaItem) => boolean,
  limit = 6
): MediaItem[] {
  const scored = sortWorks(works.filter((m) => m.score != null), 'score')
  const finished = sortWorks(works.filter((m) => m.score == null && isCompleted(m)), 'newest')
  return [...scored, ...finished].slice(0, limit)
}
