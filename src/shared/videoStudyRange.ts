export interface VideoStudyRange {
  start: number
  end: number
}

function seconds(value: string | number | null | undefined): number {
  const parsed = typeof value === 'number' ? value : Number(value)
  return Number.isFinite(parsed) ? parsed : Number.NaN
}

export function parseVideoStudyRange(
  startValue: string | number | null | undefined,
  endValue: string | number | null | undefined,
  duration?: number | null
): VideoStudyRange | null {
  const start = seconds(startValue)
  const requestedEnd = seconds(endValue)
  if (start < 0 || requestedEnd <= start || requestedEnd - start > 4 * 60 * 60) return null
  if (!Number.isFinite(start) || !Number.isFinite(requestedEnd)) return null
  if (duration != null && Number.isFinite(duration) && duration > 0) {
    if (start >= duration) return null
    return { start, end: Math.min(requestedEnd, duration) }
  }
  return { start, end: requestedEnd }
}

export function formatVideoStudyTime(secondsValue: number): string {
  const whole = Math.max(0, Math.floor(secondsValue))
  const hours = Math.floor(whole / 3600)
  const minutes = Math.floor((whole % 3600) / 60)
  const secondsPart = whole % 60
  return hours > 0
    ? `${hours}:${String(minutes).padStart(2, '0')}:${String(secondsPart).padStart(2, '0')}`
    : `${minutes}:${String(secondsPart).padStart(2, '0')}`
}

export function formatVideoStudyCue(range: VideoStudyRange): string {
  return `Start ${formatVideoStudyTime(range.start)}, stop ${formatVideoStudyTime(range.end)}`
}

// The in-app player's study range, carried as ?start=S&end=E on a /watch
// route. A missing or invalid pair means "no range", never an error.
export function parseWatchRange(
  params: { get(name: string): string | null },
  duration?: number | null
): VideoStudyRange | null {
  const start = params.get('start')
  const end = params.get('end')
  if (!start?.trim() || !end?.trim()) return null
  return parseVideoStudyRange(start, end, duration)
}

export function watchRangeSearch(range: VideoStudyRange): string {
  return `start=${Math.floor(range.start)}&end=${Math.ceil(range.end)}`
}
