import { describe, expect, it } from 'vitest'
import {
  formatVideoStudyCue,
  formatVideoStudyTime,
  parseVideoStudyRange,
  parseWatchRange,
  watchRangeSearch
} from '../src/shared/videoStudyRange'

describe('video study range', () => {
  it('accepts a bounded local-media scene', () => {
    expect(parseVideoStudyRange('90', '210')).toEqual({ start: 90, end: 210 })
  })

  it('rejects invalid and excessively broad ranges', () => {
    expect(parseVideoStudyRange('90', '90')).toBeNull()
    expect(parseVideoStudyRange('-1', '90')).toBeNull()
    expect(parseVideoStudyRange('0', String(4 * 60 * 60 + 1))).toBeNull()
    expect(parseVideoStudyRange('words', '90')).toBeNull()
  })

  it('clips to known duration without accepting a start past the file', () => {
    expect(parseVideoStudyRange(100, 300, 240)).toEqual({ start: 100, end: 240 })
    expect(parseVideoStudyRange(250, 300, 240)).toBeNull()
  })

  it('formats study boundaries for the player', () => {
    expect(formatVideoStudyTime(90)).toBe('1:30')
    expect(formatVideoStudyTime(3670)).toBe('1:01:10')
    expect(formatVideoStudyCue({ start: 90, end: 210 })).toBe('Start 1:30, stop 3:30')
  })
})

describe('player watch range', () => {
  const params = (q: string): URLSearchParams => new URLSearchParams(q)

  it('round-trips a range through the /watch query string', () => {
    const q = watchRangeSearch({ start: 90.4, end: 209.2 })
    expect(q).toBe('start=90&end=210')
    expect(parseWatchRange(params(q))).toEqual({ start: 90, end: 210 })
  })

  it('treats a missing, empty or invalid pair as no range', () => {
    expect(parseWatchRange(params(''))).toBeNull()
    expect(parseWatchRange(params('start=90'))).toBeNull()
    expect(parseWatchRange(params('start=&end=30'))).toBeNull()
    expect(parseWatchRange(params('start=200&end=100'))).toBeNull()
  })

  it('clamps the end to the file duration once it is known', () => {
    expect(parseWatchRange(params('start=60&end=900'), 600)).toEqual({ start: 60, end: 600 })
    expect(parseWatchRange(params('start=700&end=900'), 600)).toBeNull()
  })
})
