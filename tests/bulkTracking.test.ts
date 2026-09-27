import { describe, expect, it } from 'vitest'
import { mapAniListStatus, scaleAniListScore } from '../src/renderer/src/lib/bulkTracking'

// A user-list import lands AniList statuses on this app's own, possibly
// renamed, per-type list: positional roles first, names for the rest.
describe('mapAniListStatus', () => {
  const anime = ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch']

  it('uses the positional Home roles for in progress, completed and planned', () => {
    expect(mapAniListStatus('CURRENT', anime)).toBe('Watching')
    expect(mapAniListStatus('REPEATING', anime)).toBe('Watching')
    expect(mapAniListStatus('COMPLETED', anime)).toBe('Completed')
    expect(mapAniListStatus('PLANNING', anime)).toBe('Plan to Watch')
  })

  it('matches paused and dropped by name, and leaves them unset when renamed away', () => {
    expect(mapAniListStatus('PAUSED', anime)).toBe('On Hold')
    expect(mapAniListStatus('DROPPED', anime)).toBe('Dropped')
    const renamed = ['Now', 'Done', 'Later']
    expect(mapAniListStatus('PAUSED', renamed)).toBeNull()
    expect(mapAniListStatus('COMPLETED', renamed)).toBe('Done')
  })
})

describe('scaleAniListScore', () => {
  it('maps an AniList score out of 10 onto the user score scale', () => {
    expect(scaleAniListScore(8, 10)).toBe(8)
    expect(scaleAniListScore(8.5, 100)).toBe(85)
    expect(scaleAniListScore(7, 5)).toBe(3.5)
    expect(scaleAniListScore(null, 100)).toBeNull()
  })
})
