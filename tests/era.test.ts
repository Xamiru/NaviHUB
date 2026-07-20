import { describe, expect, it } from 'vitest'
import { ERAS, eraForYear } from '../src/shared/era'

describe('eraForYear', () => {
  it('buckets years into the right decade', () => {
    expect(eraForYear(1994)?.key).toBe('90s')
    expect(eraForYear(2005)?.key).toBe('2000s')
    expect(eraForYear(2019)?.key).toBe('2010s')
    expect(eraForYear(2023)?.key).toBe('2020s')
  })

  it('puts everything up to 1989 in the retro bucket', () => {
    expect(eraForYear(1989)?.key).toBe('retro')
    expect(eraForYear(1974)?.key).toBe('retro')
    expect(eraForYear(1963)?.key).toBe('retro')
  })

  it('treats the open-ended 2020s bucket as latest-and-beyond', () => {
    expect(eraForYear(2020)?.key).toBe('2020s')
    expect(eraForYear(2031)?.key).toBe('2020s')
  })

  it('handles decade boundaries inclusively', () => {
    expect(eraForYear(1990)?.key).toBe('90s')
    expect(eraForYear(1999)?.key).toBe('90s')
    expect(eraForYear(2000)?.key).toBe('2000s')
  })

  it('returns null for unknown / invalid years', () => {
    expect(eraForYear(null)).toBeNull()
    expect(eraForYear(undefined)).toBeNull()
    expect(eraForYear(2020.5)).toBeNull()
  })

  it('every era has a frozen key and chronological, gapless bounds', () => {
    expect(ERAS.map((e) => e.key)).toEqual(['retro', '90s', '2000s', '2010s', '2020s'])
    for (let i = 1; i < ERAS.length; i++) {
      // each era starts the year after the previous one ends
      expect(ERAS[i].minYear).toBe((ERAS[i - 1].maxYear as number) + 1)
    }
  })
})
