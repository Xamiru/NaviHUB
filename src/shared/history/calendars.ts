// Calendar arithmetic for the History section. Dates are stored once, as
// proleptic Gregorian (schema.ts HistDate); the Solar Hijri and Old Style
// (Julian) forms shown beside them are computed here so no date is ever
// hand-converted. Everything goes through the Julian Day Number.
//
// The Solar Hijri conversion is a port of jalaali-js (MIT, Behrang Noruzi
// Niya) and its break-table algorithm, which follows the astronomical rule
// (Nowruz is the day of the March equinox if it falls before noon in Tehran).

import type { HistDate } from './schema'

const div = (a: number, b: number): number => ~~(a / b)
const mod = (a: number, b: number): number => a - ~~(a / b) * b

export interface Ymd {
  y: number
  m: number
  d: number
}

// ---- Gregorian <-> JDN ----

export function gregorianToJdn(y: number, m: number, d: number): number {
  let n = div((y + div(m - 8, 6) + 100100) * 1461, 4) + div(153 * mod(m + 9, 12) + 2, 5) + d - 34840408
  n = n - div(div(y + 100100 + div(m - 8, 6), 100) * 3, 4) + 752
  return n
}

export function jdnToGregorian(jdn: number): Ymd {
  let j = 4 * jdn + 139361631
  j = j + div(div(4 * jdn + 183187720, 146097) * 3, 4) * 4 - 3908
  const i = div(mod(j, 1461), 4) * 5 + 308
  const d = div(mod(i, 153), 5) + 1
  const m = mod(div(i, 153), 12) + 1
  const y = div(j, 1461) - 100100 + div(8 - m, 6)
  return { y, m, d }
}

// ---- Julian (Old Style) <-> JDN ----

export function julianToJdn(y: number, m: number, d: number): number {
  const a = Math.floor((14 - m) / 12)
  const yy = y + 4800 - a
  const mm = m + 12 * a - 3
  return d + Math.floor((153 * mm + 2) / 5) + 365 * yy + Math.floor(yy / 4) - 32083
}

export function jdnToJulian(jdn: number): Ymd {
  const c = jdn + 32082
  const d4 = Math.floor((4 * c + 3) / 1461)
  const e = c - Math.floor((1461 * d4) / 4)
  const mm = Math.floor((5 * e + 2) / 153)
  return {
    d: e - Math.floor((153 * mm + 2) / 5) + 1,
    m: mm + 3 - 12 * Math.floor(mm / 10),
    y: d4 - 4800 + Math.floor(mm / 10)
  }
}

export function gregorianToJulian(g: Ymd): Ymd {
  return jdnToJulian(gregorianToJdn(g.y, g.m, g.d))
}

export function julianToGregorian(j: Ymd): Ymd {
  return jdnToGregorian(julianToJdn(j.y, j.m, j.d))
}

// ---- Solar Hijri (jalaali) ----

const BREAKS = [
  -61, 9, 38, 199, 426, 686, 756, 818, 1111, 1181, 1210, 1635, 2060, 2097, 2192, 2262, 2324, 2394, 2456, 3178
]

/** First and last Solar Hijri years the break table covers. */
export const SH_MIN_YEAR = BREAKS[0]
export const SH_MAX_YEAR = BREAKS[BREAKS.length - 1] - 1

function jalCal(jy: number): { leap: number; gy: number; march: number } {
  const gy = jy + 621
  let leapJ = -14
  let jp = BREAKS[0]
  let jump = 0
  for (let i = 1; i < BREAKS.length; i += 1) {
    const jm = BREAKS[i]
    jump = jm - jp
    if (jy < jm) break
    leapJ = leapJ + div(jump, 33) * 8 + div(mod(jump, 33), 4)
    jp = jm
  }
  let n = jy - jp
  leapJ = leapJ + div(n, 33) * 8 + div(mod(n, 33) + 3, 4)
  if (mod(jump, 33) === 4 && jump - n === 4) leapJ += 1
  const leapG = div(gy, 4) - div((div(gy, 100) + 1) * 3, 4) - 150
  const march = 20 + leapJ - leapG
  if (jump - n < 6) n = n - jump + div(jump + 4, 33) * 33
  let leap = mod(mod(n + 1, 33) - 1, 4)
  if (leap === -1) leap = 4
  return { leap, gy, march }
}

export function isValidSolarHijriYear(jy: number): boolean {
  return Number.isInteger(jy) && jy >= SH_MIN_YEAR && jy <= SH_MAX_YEAR
}

export function solarHijriToJdn(jy: number, jm: number, jd: number): number {
  const r = jalCal(jy)
  return gregorianToJdn(r.gy, 3, r.march) + (jm - 1) * 31 - div(jm, 7) * (jm - 7) + jd - 1
}

/** null when the date falls outside the break table's range. */
export function jdnToSolarHijri(jdn: number): Ymd | null {
  const gy = jdnToGregorian(jdn).y
  let jy = gy - 621
  if (!isValidSolarHijriYear(jy) || !isValidSolarHijriYear(jy - 1)) return null
  const r = jalCal(jy)
  const jdn1f = gregorianToJdn(gy, 3, r.march)
  let k = jdn - jdn1f
  if (k >= 0) {
    if (k <= 185) return { y: jy, m: 1 + div(k, 31), d: mod(k, 31) + 1 }
    k -= 186
  } else {
    jy -= 1
    k += 179
    if (r.leap === 1) k += 1
  }
  return { y: jy, m: 7 + div(k, 30), d: mod(k, 30) + 1 }
}

/**
 * Iran adopted the Solar Hijri calendar by law on 31 March 1925 (11 Farvardin
 * 1304); earlier dates are proleptic computations and can differ by a day
 * from the conventional Solar Hijri dates commemorations use, so the UI marks
 * them.
 */
export const SOLAR_HIJRI_ADOPTED = '1925-03-31'

export function isProlepticSolarHijri(s: string): boolean {
  const y = decimalYear(s)
  const adopted = decimalYear(SOLAR_HIJRI_ADOPTED)
  return y !== null && adopted !== null && y < adopted
}

export function gregorianToSolarHijri(g: Ymd): Ymd | null {
  return jdnToSolarHijri(gregorianToJdn(g.y, g.m, g.d))
}

export function solarHijriMonthLength(jy: number, jm: number): number {
  if (jm <= 6) return 31
  if (jm <= 11) return 30
  return jalCal(jy).leap === 0 ? 30 : 29
}

// ---- HistDate parsing ----

export type Precision = 'year' | 'month' | 'day'

export interface ParsedDate {
  y: number
  m?: number
  d?: number
  precision: Precision
}

const DATE_RE = /^(-?\d{4})(?:-(\d{2})(?:-(\d{2}))?)?$/

const DAYS_IN_MONTH = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

export function isGregorianLeap(y: number): boolean {
  return (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0
}

export function gregorianMonthLength(y: number, m: number): number {
  return m === 2 && isGregorianLeap(y) ? 29 : DAYS_IN_MONTH[m - 1]
}

/** null for anything that is not a real `YYYY[-MM[-DD]]` date. */
export function parseDate(s: string): ParsedDate | null {
  const match = DATE_RE.exec(s)
  if (!match) return null
  const y = Number(match[1])
  if (!match[2]) return { y, precision: 'year' }
  const m = Number(match[2])
  if (m < 1 || m > 12) return null
  if (!match[3]) return { y, m, precision: 'month' }
  const d = Number(match[3])
  if (d < 1 || d > gregorianMonthLength(y, m)) return null
  return { y, m, d, precision: 'day' }
}

/** First and last calendar day a partial date covers. */
export function dateBounds(p: ParsedDate): { first: Ymd; last: Ymd } {
  if (p.precision === 'day') {
    const day = { y: p.y, m: p.m!, d: p.d! }
    return { first: day, last: day }
  }
  if (p.precision === 'month') {
    return { first: { y: p.y, m: p.m!, d: 1 }, last: { y: p.y, m: p.m!, d: gregorianMonthLength(p.y, p.m!) } }
  }
  return { first: { y: p.y, m: 1, d: 1 }, last: { y: p.y, m: 12, d: 31 } }
}

/**
 * Position on a continuous year axis: `edge: 'start'` is the first instant
 * the date covers, `'end'` the last (1979 → 1979.0 / 1980.0).
 */
export function decimalYear(s: string, edge: 'start' | 'end' = 'start'): number | null {
  const p = parseDate(s)
  if (!p) return null
  const { first, last } = dateBounds(p)
  const day = edge === 'start' ? first : last
  const jan1 = gregorianToJdn(day.y, 1, 1)
  const yearLength = isGregorianLeap(day.y) ? 366 : 365
  const offset = gregorianToJdn(day.y, day.m, day.d) - jan1 + (edge === 'end' ? 1 : 0)
  return day.y + offset / yearLength
}

export function compareDates(a: string, b: string): number {
  return (decimalYear(a) ?? 0) - (decimalYear(b) ?? 0)
}

// ---- formatting ----

const GREGORIAN_MONTHS = [
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
export const SOLAR_HIJRI_MONTHS = [
  'Farvardin',
  'Ordibehesht',
  'Khordad',
  'Tir',
  'Mordad',
  'Shahrivar',
  'Mehr',
  'Aban',
  'Azar',
  'Dey',
  'Bahman',
  'Esfand'
]
export const SOLAR_HIJRI_MONTHS_FA = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند'
]

/** Astronomical year to its display form (0 → 1 BCE, -479 → 480 BCE). */
export function yearLabel(y: number): string {
  return y > 0 ? String(y) : `${1 - y} BCE`
}

function shortMonth(m: number): string {
  return GREGORIAN_MONTHS[m - 1].slice(0, 3)
}

export function formatGregorian(s: string, opts: { short?: boolean } = {}): string {
  const p = parseDate(s)
  if (!p) return s
  const month = (m: number): string => (opts.short ? shortMonth(m) : GREGORIAN_MONTHS[m - 1])
  if (p.precision === 'year') return yearLabel(p.y)
  if (p.precision === 'month') return `${month(p.m!)} ${yearLabel(p.y)}`
  return `${p.d} ${month(p.m!)} ${yearLabel(p.y)}`
}

/** Old Style form of a Gregorian day-precision date ("25 October 1917"). */
export function formatOldStyle(s: string): string | null {
  const p = parseDate(s)
  if (!p || p.precision !== 'day') return null
  const j = gregorianToJulian({ y: p.y, m: p.m!, d: p.d! })
  return `${j.d} ${GREGORIAN_MONTHS[j.m - 1]} ${yearLabel(j.y)}`
}

const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹'
export function toPersianDigits(s: string | number): string {
  return String(s).replace(/\d/g, (c) => PERSIAN_DIGITS[Number(c)])
}

/**
 * Solar Hijri form of a date at its own precision. A Gregorian month or year
 * straddles two Solar Hijri months or years, so partial dates become ranges
 * ("Dey to Bahman 1356", "1356 to 1357"). Returns null before the epoch.
 */
export function formatSolarHijri(s: string, opts: { script?: 'latin' | 'fa' } = {}): string | null {
  const p = parseDate(s)
  if (!p) return null
  const { first, last } = dateBounds(p)
  const a = gregorianToSolarHijri(first)
  const b = gregorianToSolarHijri(last)
  if (!a || !b || a.y < 1) return null
  const fa = opts.script === 'fa'
  const num = (n: number): string => (fa ? toPersianDigits(n) : String(n))
  const mon = (m: number): string => (fa ? SOLAR_HIJRI_MONTHS_FA : SOLAR_HIJRI_MONTHS)[m - 1]
  const to = fa ? ' تا ' : ' to '
  if (p.precision === 'day') return `${num(a.d)} ${mon(a.m)} ${num(a.y)}`
  if (p.precision === 'month') {
    if (a.y === b.y) return a.m === b.m ? `${mon(a.m)} ${num(a.y)}` : `${mon(a.m)}${to}${mon(b.m)} ${num(a.y)}`
    return `${mon(a.m)} ${num(a.y)}${to}${mon(b.m)} ${num(b.y)}`
  }
  return a.y === b.y ? num(a.y) : `${num(a.y)}${to}${num(b.y)}`
}

/** Full display form of a HistDate, with "c." and uncertainty ranges. */
export function formatHistDate(h: HistDate, opts: { short?: boolean } = {}): string {
  const base = formatGregorian(h.d, opts)
  const upper = h.notAfter ? ` to ${formatGregorian(h.notAfter, opts)}` : ''
  return `${h.approx ? 'c. ' : ''}${base}${upper}`
}

/** Integer year a date falls in, for decade grouping. */
export function yearOf(s: string): number | null {
  return parseDate(s)?.y ?? null
}
