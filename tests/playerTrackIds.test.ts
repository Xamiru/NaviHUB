import { describe, expect, it } from 'vitest'
import { musicIdOf, themeIdOf } from '../src/renderer/src/lib/playerTrackIds'

describe('player track database ids', () => {
  it('extracts only a complete numeric music id', () => {
    expect(musicIdOf('music-42')).toBe(42)
    expect(musicIdOf('music-')).toBeNull()
    expect(musicIdOf('music-42-extra')).toBeNull()
    expect(musicIdOf('theme-42')).toBeNull()
  })

  it('extracts only a complete numeric theme id', () => {
    expect(themeIdOf('theme-17')).toBe(17)
    expect(themeIdOf('theme-')).toBeNull()
    expect(themeIdOf('theme-17-extra')).toBeNull()
    expect(themeIdOf('quiz-17')).toBeNull()
  })

  it('treats History archive recordings as neither music nor themes', () => {
    // `history-<archive row id>`: no Like, no Favorite, no play logging.
    expect(musicIdOf('history-12')).toBeNull()
    expect(themeIdOf('history-12')).toBeNull()
  })
})
