import { describe, expect, it } from 'vitest'
import {
  initialSongAuditionIndex,
  quizClipDurationMs,
  shouldAcceptAudioRequest,
  shouldAutoplaySongMode,
  shouldRunSongTimer,
  shouldStopQuizTrack,
  songAnswerKey
} from '../src/shared/quizAudioCore'

describe('song quiz audio decisions', () => {
  it('autoplays the answer in classic/arcade and the first option in reverse', () => {
    expect(shouldAutoplaySongMode('reverse')).toBe(false)
    expect(shouldAutoplaySongMode('classic')).toBe(true)
    expect(shouldAutoplaySongMode('arcade')).toBe(true)
    expect(initialSongAuditionIndex('reverse', 4)).toBe(0)
    expect(initialSongAuditionIndex('classic', 4)).toBeNull()
    expect(initialSongAuditionIndex('reverse', 0)).toBeNull()
  })

  it('pauses only the reverse decision timer while a quiz audition plays', () => {
    expect(shouldRunSongTimer('reverse', true)).toBe(false)
    expect(shouldRunSongTimer('reverse', false)).toBe(true)
    expect(shouldRunSongTimer('classic', true)).toBe(true)
    expect(shouldRunSongTimer('arcade', true)).toBe(true)
  })

  it('uses stable string answer keys for both question directions', () => {
    const song = { mediaId: 12, themeId: 34 }
    expect(songAnswerKey('classic', song)).toBe('media-12')
    expect(songAnswerKey('arcade', song)).toBe('media-12')
    expect(songAnswerKey('reverse', song)).toBe('theme-34')
  })

  it('applies one snippet duration policy to every clip', () => {
    expect(quizClipDurationMs(10)).toBe(10_000)
    expect(quizClipDurationMs(0)).toBeNull()
  })

  it('ignores stale URL resolutions and preserves unrelated player tracks', () => {
    expect(shouldAcceptAudioRequest(4, 3)).toBe(false)
    expect(shouldAcceptAudioRequest(4, 4)).toBe(true)
    expect(shouldStopQuizTrack('quiz-42')).toBe(true)
    expect(shouldStopQuizTrack('music-42')).toBe(false)
    expect(shouldStopQuizTrack('theme-42')).toBe(false)
  })
})
