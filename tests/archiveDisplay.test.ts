import { describe, expect, it } from 'vitest'
import {
  chronologicalYear,
  formatBirthday,
  formatRunTime,
  mediaProgressDisplay,
  progressPercent
} from '../src/renderer/src/lib/archiveDisplay'

describe('archive derived display helpers', () => {
  it('clamps progress percentages', () => {
    expect(progressPercent(6, 12)).toBe(50)
    expect(progressPercent(14, 12)).toBe(100)
    expect(progressPercent(-2, 12)).toBe(0)
    expect(progressPercent(2, null)).toBeNull()
  })

  it('prefers measurable progress then falls back to status', () => {
    expect(mediaProgressDisplay({ progress: 8, totalUnits: 12, status: 'Watching' })).toEqual({
      label: '8 of 12',
      percent: 67,
      complete: false
    })
    expect(mediaProgressDisplay({ progress: 0, totalUnits: null, status: 'Planned' }).label).toBe(
      'Planned'
    )
  })

  it('extracts stable chronology labels', () => {
    expect(chronologicalYear('1998-07-06')).toBe('1998')
    expect(chronologicalYear(null)).toBe('Undated')
  })

  it('formats partial birthdays without inventing missing parts', () => {
    expect(formatBirthday('1965-05-23')).toBe('23 May 1965')
    expect(formatBirthday('1965')).toBe('1965')
    expect(formatBirthday('--05-23')).toBe('23 May')
    expect(formatBirthday(null)).toBeNull()
  })

  it('rounds run-time estimates coarsely', () => {
    expect(formatRunTime(20)).toBe('under a minute')
    expect(formatRunTime(90)).toBe('about 2 minutes')
    expect(formatRunTime(3 * 3600 + 20 * 60)).toBe('about 3.5 hours')
    expect(formatRunTime(3600)).toBe('about 1 hour')
  })
})
