// PURE: the timeline's front pages. Modern history reads by decade; before 1700
// most decades would hold one event or none, so earlier years group by century
// (1000-1699) and before 1000 CE by half-millennium. Years are astronomical
// (year 0 is 1 BCE, -479 is 480 BCE), as in HistDate.

export interface Bucket {
  /** First year in the bucket. */
  start: number
  /** Number of years it covers. */
  span: number
}

export const DECADES_FROM = 1700
export const CENTURIES_FROM = 1000

/** The front page a year belongs to. */
export function bucketOf(year: number): Bucket {
  const y = Math.floor(year)
  if (y >= DECADES_FROM) return { start: Math.floor(y / 10) * 10, span: 10 }
  if (y >= CENTURIES_FROM) return { start: Math.floor(y / 100) * 100, span: 100 }
  if (y >= 1) return { start: y < 500 ? 1 : 500, span: y < 500 ? 499 : 500 }
  // BCE half-millennia counted the way readers count them: 500-1 BCE, 1000-501 BCE.
  const bce = 1 - y
  const k = Math.floor((bce - 1) / 500)
  return { start: 1 - (k * 500 + 500), span: 500 }
}

const ordinal = (n: number): string => {
  const t = n % 100
  if (t >= 11 && t <= 13) return `${n}th`
  return `${n}${['th', 'st', 'nd', 'rd'][n % 10] ?? 'th'}`
}

const yearLabel = (y: number): string => (y <= 0 ? `${1 - y} BCE` : String(y))

/** "1720s", "16th century", "500–999", "1000–501 BCE". */
export function bucketLabel(b: Bucket): string {
  if (b.span === 10) return `${b.start}s`
  if (b.span === 100) return `${ordinal(b.start / 100 + 1)} century`
  const end = b.start + b.span - 1
  if (end <= 0) return `${1 - b.start}–${1 - end} BCE`
  return `${yearLabel(b.start)}–${yearLabel(end)}`
}

/** True when `year` falls inside the bucket. */
export function inBucket(b: Bucket, year: number): boolean {
  return year >= b.start && year < b.start + b.span
}
