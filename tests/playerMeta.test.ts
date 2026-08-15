import { describe, it, expect } from 'vitest'
import {
  displayMeta,
  isMaskedTrack,
  toPlayerSnapshot,
  type TrackMeta
} from '../src/renderer/src/lib/playerMeta'

// displayMeta is the choke point for every OS-facing metadata surface
// (mediaSession/SMTC, the widget snapshot, the thumbbar tooltip). Its one hard
// job: quiz- tracks must never leak the answer to an OS overlay.
describe('displayMeta', () => {
  const quizTrack: TrackMeta = {
    id: 'quiz-42',
    title: 'Song Quiz',
    subtitle: null,
    context: '???',
    coverPath: null
  }

  it('masks quiz- tracks completely', () => {
    expect(displayMeta(quizTrack)).toEqual({
      title: 'Song Quiz',
      artist: '',
      album: '',
      coverPath: null
    })
  })

  it('masks a quiz- track even if a page hands it real metadata', () => {
    const leaky: TrackMeta = {
      id: 'quiz-7',
      title: 'Tank!',
      subtitle: 'The Seatbelts',
      context: 'Cowboy Bebop',
      coverPath: 'media/dl-abc.jpg'
    }
    const meta = displayMeta(leaky)
    expect(meta.title).toBe('Song Quiz')
    expect(meta.artist).toBe('')
    expect(meta.album).toBe('')
    expect(meta.coverPath).toBeNull()
  })

  it("never surfaces the quiz page's '???' album placeholder", () => {
    expect(displayMeta(quizTrack).album).not.toBe('???')
  })

  it('passes every other namespace through untouched', () => {
    for (const id of ['theme-3', 'music-11', 'tourney-abc', 'file-tok', 'quizmaster-1']) {
      const t: TrackMeta = {
        id,
        title: 'A Title',
        subtitle: 'An Artist',
        context: 'An Album',
        coverPath: 'music/Artist/Album/cover.jpg'
      }
      expect(displayMeta(t)).toEqual({
        title: 'A Title',
        artist: 'An Artist',
        album: 'An Album',
        coverPath: 'music/Artist/Album/cover.jpg'
      })
    }
  })

  it('normalizes missing optional fields to empty/null', () => {
    expect(displayMeta({ id: 'theme-1', title: 'T' })).toEqual({
      title: 'T',
      artist: '',
      album: '',
      coverPath: null
    })
  })
})

describe('isMaskedTrack', () => {
  it('matches only the quiz- namespace prefix', () => {
    expect(isMaskedTrack('quiz-1')).toBe(true)
    expect(isMaskedTrack('music-1')).toBe(false)
    expect(isMaskedTrack('theme-quiz-1')).toBe(false)
  })
})

describe('toPlayerSnapshot', () => {
  const state = { isPlaying: true, hasNext: true, hasPrev: false, volume: 0.8 }

  it('returns null for a null track', () => {
    expect(toPlayerSnapshot(null, state)).toBeNull()
  })

  it('carries masked metadata plus transport state', () => {
    const snap = toPlayerSnapshot(
      { id: 'quiz-9', title: 'Real Title', subtitle: 'Real Artist', coverPath: 'media/x.jpg' },
      state
    )
    expect(snap).toEqual({
      trackId: 'quiz-9',
      title: 'Song Quiz',
      artist: '',
      coverPath: null,
      isPlaying: true,
      hasNext: true,
      hasPrev: false,
      volume: 0.8
    })
  })

  it('carries real metadata for normal tracks', () => {
    const snap = toPlayerSnapshot(
      {
        id: 'music-5',
        title: 'INTERNET OVERDOSE',
        subtitle: 'Aiobahn',
        coverPath: 'music/a/cover.jpg'
      },
      { isPlaying: false, hasNext: false, hasPrev: true, volume: 0.35 }
    )
    expect(snap).toEqual({
      trackId: 'music-5',
      title: 'INTERNET OVERDOSE',
      artist: 'Aiobahn',
      coverPath: 'music/a/cover.jpg',
      isPlaying: false,
      hasNext: false,
      hasPrev: true,
      volume: 0.35
    })
  })

  it('carries the volume through unchanged (the widget slider reads it)', () => {
    for (const volume of [0, 0.5, 1]) {
      const snap = toPlayerSnapshot({ id: 'theme-1', title: 'T' }, { ...state, volume })
      expect(snap?.volume).toBe(volume)
    }
  })
})
