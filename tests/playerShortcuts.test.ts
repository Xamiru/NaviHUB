import { describe, it, expect } from 'vitest'
import { playerShortcutsEnabled } from '../src/renderer/src/lib/playerShortcuts'

// The global music keys (Space, PageUp/PageDown) are a fallback layer: any
// section whose pages bind those keys for their own answer flow keeps them.
describe('playerShortcutsEnabled', () => {
  it('is on across the library, music and the rest of the app', () => {
    for (const p of [
      '/',
      '/anime',
      '/anime/12',
      '/music',
      '/music/albums/3',
      '/now-playing',
      '/checklist',
      '/stats',
      '/settings',
      '/gacha/fgo',
      '/torrents'
    ])
      expect(playerShortcutsEnabled(p)).toBe(true)
  })

  it('yields the keyboard to the study and quiz sections', () => {
    for (const p of [
      '/japanese',
      '/japanese/review',
      '/japanese/kanji/quiz',
      '/english',
      '/english/spelling',
      '/programming',
      '/programming/quiz',
      '/quiz',
      '/quiz/song',
      '/quiz/tournament'
    ])
      expect(playerShortcutsEnabled(p)).toBe(false)
  })

  it('matches whole path segments, not prefixes', () => {
    // A future /quizzes or /englishy route must not be swallowed by the rule.
    expect(playerShortcutsEnabled('/quizzes')).toBe(true)
    expect(playerShortcutsEnabled('/japanesey')).toBe(true)
  })
})
