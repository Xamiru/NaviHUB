import { describe, expect, it } from 'vitest'
import { quizClipDurationMs, shouldAcceptAudioRequest, shouldAutoplaySongMode, shouldStopQuizTrack } from '../src/shared/quizAudioCore'

describe('song quiz audio decisions', () => {
  it('starts reverse mode silent while classic and arcade autoplay', () => {
    expect(shouldAutoplaySongMode('reverse')).toBe(false)
    expect(shouldAutoplaySongMode('classic')).toBe(true)
    expect(shouldAutoplaySongMode('arcade')).toBe(true)
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
