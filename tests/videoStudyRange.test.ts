import { describe, expect, it } from 'vitest'
import {
  formatVideoStudyCue,
  formatVideoStudyTime,
  parseVideoStudyRange
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
