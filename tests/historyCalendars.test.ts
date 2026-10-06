import { describe, expect, it } from 'vitest'
import {
  decimalYear,
  formatGregorian,
  formatHistDate,
  formatOldStyle,
  formatSolarHijri,
  isProlepticSolarHijri,
  gregorianToJdn,
  gregorianToJulian,
  gregorianToSolarHijri,
  jdnToGregorian,
  jdnToSolarHijri,
  julianToGregorian,
  parseDate,
  solarHijriToJdn,
  yearLabel
} from '../src/shared/history/calendars'

// Dates every Iranian reader knows by their Solar Hijri name; these are the
// acceptance cases for the conversion the History pages show.
const KNOWN_SH: Array<[string, [number, number, number]]> = [
  ['1953-08-19', [1332, 5, 28]], // 28 Mordad 1332
  ['1978-01-07', [1356, 10, 17]], // 17 Dey 1356
  ['1978-01-09', [1356, 10, 19]], // 19 Dey 1356, Qom
  ['1978-09-08', [1357, 6, 17]], // 17 Shahrivar 1357
  ['1979-01-16', [1357, 10, 26]], // 26 Dey 1357
  ['1979-02-01', [1357, 11, 12]], // 12 Bahman 1357
  ['1979-02-11', [1357, 11, 22]], // 22 Bahman 1357
  ['1979-11-04', [1358, 8, 13]], // 13 Aban 1358
  ['1980-09-22', [1359, 6, 31]], // 31 Shahrivar 1359
  ['2024-03-20', [1403, 1, 1]], // Nowruz 1403
  ['2025-03-21', [1404, 1, 1]] // Nowruz 1404
]

const ymd = (s: string): { y: number; m: number; d: number } => {
  const [y, m, d] = s.split('-').map(Number)
  return { y, m, d }
}

describe('Solar Hijri conversion', () => {
  it.each(KNOWN_SH)('%s is %j', (g, [y, m, d]) => {
    expect(gregorianToSolarHijri(ymd(g))).toEqual({ y, m, d })
    expect(jdnToGregorian(solarHijriToJdn(y, m, d))).toEqual(ymd(g))
  })

  it('round-trips every day from 1800 to 2100', () => {
    const start = gregorianToJdn(1800, 1, 1)
    const end = gregorianToJdn(2100, 12, 31)
    for (let jdn = start; jdn <= end; jdn++) {
      const sh = jdnToSolarHijri(jdn)!
      expect(solarHijriToJdn(sh.y, sh.m, sh.d)).toBe(jdn)
    }
  })

  it('marks dates before the 1925 adoption as proleptic', () => {
    expect(isProlepticSolarHijri('1906-08-05')).toBe(true)
    expect(isProlepticSolarHijri('1925-03-31')).toBe(false)
    expect(isProlepticSolarHijri('1979')).toBe(false)
  })

  it('formats at each precision, as ranges where a Gregorian unit straddles two', () => {
    expect(formatSolarHijri('1979-02-11')).toBe('22 Bahman 1357')
    expect(formatSolarHijri('1979-02-11', { script: 'fa' })).toBe('۲۲ بهمن ۱۳۵۷')
    expect(formatSolarHijri('1978-01')).toBe('Dey to Bahman 1356')
    expect(formatSolarHijri('1979-03')).toBe('Esfand 1357 to Farvardin 1358')
    expect(formatSolarHijri('1953')).toBe('1331 to 1332')
    expect(formatSolarHijri('0500')).toBeNull()
  })
})

describe('Old Style (Julian) dates', () => {
  it('converts the October Revolution and the 1582 reform boundary', () => {
    expect(gregorianToJulian(ymd('1917-11-07'))).toEqual({ y: 1917, m: 10, d: 25 })
    expect(gregorianToJulian(ymd('1582-10-15'))).toEqual({ y: 1582, m: 10, d: 5 })
    expect(julianToGregorian({ y: 1917, m: 10, d: 25 })).toEqual(ymd('1917-11-07'))
    expect(formatOldStyle('1917-11-07')).toBe('25 October 1917')
    expect(formatOldStyle('1917-11')).toBeNull()
  })
})

describe('HistDate parsing and display', () => {
  it('rejects impossible dates', () => {
    expect(parseDate('1979-02-30')).toBeNull()
    expect(parseDate('1979-13')).toBeNull()
    expect(parseDate('79')).toBeNull()
    expect(parseDate('2000-02-29')).toEqual({ y: 2000, m: 2, d: 29, precision: 'day' })
    expect(parseDate('1900-02-29')).toBeNull()
    expect(parseDate('-0479')).toEqual({ y: -479, precision: 'year' })
  })

  it('positions dates on a continuous axis by their covered span', () => {
    expect(decimalYear('1979')).toBe(1979)
    expect(decimalYear('1979', 'end')).toBe(1980)
    expect(decimalYear('1979-07-02')).toBeCloseTo(1979 + 182 / 365, 6)
    expect(decimalYear('1979-12', 'end')).toBe(1980)
  })

  it('labels years, approximations and ranges', () => {
    expect(yearLabel(-479)).toBe('480 BCE')
    expect(yearLabel(0)).toBe('1 BCE')
    expect(formatGregorian('1979-02-11')).toBe('11 February 1979')
    expect(formatGregorian('1979-02-11', { short: true })).toBe('11 Feb 1979')
    expect(formatHistDate({ d: '1412', approx: true })).toBe('c. 1412')
    expect(formatHistDate({ d: '1410', notAfter: '1412' })).toBe('1410 to 1412')
  })
})
