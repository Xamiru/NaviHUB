import { describe, expect, it } from 'vitest'
import { chronologicalYear, mediaProgressDisplay, progressPercent } from '../src/renderer/src/lib/archiveDisplay'

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
})
