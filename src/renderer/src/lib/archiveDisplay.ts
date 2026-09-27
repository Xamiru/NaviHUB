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

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December'
]

// Person birthdays are ISO 8601 with whatever the source knows: 1965-05-23,
// 1965, or --05-23 when only the day of the year is public.
export function formatBirthday(value: string | null | undefined): string | null {
  if (!value) return null
  const m = /^(\d{4}|-)-?(\d{2})?-?(\d{2})?$/.exec(value)
  if (!m) return value
  const [, year, month, day] = m
  const monthName = month ? MONTHS[Number(month) - 1] : undefined
  const dayMonth = monthName && day ? `${Number(day)} ${monthName}` : null
  if (year === '-') return dayMonth
  return dayMonth ? `${dayMonth} ${year}` : year
}

// A rough run length for a preview: coarse on purpose, since it is an estimate.
export function formatRunTime(seconds: number): string {
  if (seconds < 60) return 'under a minute'
  const minutes = Math.round(seconds / 60)
  if (minutes < 60) return `about ${minutes} minute${minutes === 1 ? '' : 's'}`
  const hours = Math.round((seconds / 3600) * 2) / 2
  return `about ${hours} hour${hours === 1 ? '' : 's'}`
}
