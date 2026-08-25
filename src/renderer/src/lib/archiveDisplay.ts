import type { MediaItem } from '@shared/types'

export function progressPercent(progress: number, totalUnits: number | null): number | null {
  if (!totalUnits || totalUnits <= 0) return null
  return Math.min(100, Math.max(0, Math.round((progress / totalUnits) * 100)))
}

export function mediaProgressDisplay(media: Pick<MediaItem, 'progress' | 'totalUnits' | 'status'>) {
  const percent = progressPercent(media.progress, media.totalUnits)
  if (percent !== null) {
    return {
      label: `${media.progress} of ${media.totalUnits}`,
      percent,
      complete: media.progress >= (media.totalUnits ?? Number.POSITIVE_INFINITY)
    }
  }
  if (media.status) return { label: media.status, percent: null, complete: false }
  return { label: 'Not started', percent: null, complete: false }
}

export function chronologicalYear(value: string | null | undefined): string {
  if (!value) return 'Undated'
  const year = Number(value.slice(0, 4))
  return Number.isFinite(year) && year >= 1000 ? String(year) : 'Undated'
}
