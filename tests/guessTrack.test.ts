import { describe, expect, it } from 'vitest'
import type { GuessTrackEntry } from '../src/shared/guessTrack'
import {
  GUESS_TRACK_CLIP_SECONDS,
  buildGuessTrackQuestions,
  guessTrackArtistInitial,
  guessTrackClipSeconds,
  guessTrackChoices,
  guessTrackGroups,
  guessTrackHints,
  guessTrackIdentityCount,
  guessTrackMusicEntry,
  guessTrackNearMiss,
  guessTrackPoints,
  guessTrackRecordingKey,
  guessTrackThemeEntry,
  initialGuessTrackRound,
  normalizeGuessTrackText,
  leadingSilenceSeconds,
  searchGuessTrackChoices,
  skipGuessTrack,
  submitGuessTrack
} from '../src/shared/guessTrack'
import type { MusicTrack, QuizSong } from '../src/shared/types'

function entry(
  key: string,
  title: string,
  performer: string,
  balanceKey: string,
  context = 'Context'
): GuessTrackEntry {
  return {
    key,
    source: 'music',
    recordingKey: `${normalizeGuessTrackText(title)}::${normalizeGuessTrackText(performer)}`,
    title,
    performer,
    context,
    answerLabel: `${title} — ${performer}`,
    audioPath: `music/${key}.mp3`,
    audioUrl: null,
    coverPath: null,
    year: null,
    balanceKey
  }
}

function musicTrack(id: number, title: string, artistId = 1, tagArtist: string | null = null): MusicTrack {
  return {
    id,
    albumId: id,
    albumTitle: `Album ${id}`,
    artistId,
    artistName: `Artist ${artistId}`,
    tagArtist,
    filePath: `Artist/Album/${id}.flac`,
    title,
    trackNo: null,
    discNo: null,
    duration: null,
    likedAt: null,
    playCount: 0,
    lastPlayedAt: null,
    coverPath: null
  }
}

const POOL = [
  entry('a1', 'Alpha', 'Artist A', 'artist-a'),
  entry('a2', 'Alpha Two', 'Artist A', 'artist-a'),
  entry('b1', 'Beta', 'Artist B', 'artist-b'),
  entry('c1', 'Café Moon', 'Artist C', 'artist-c'),
  entry('d1', 'Delta', 'Artist D', 'artist-d'),
  entry('e1', 'Echo', 'Artist E', 'artist-e'),
  entry('f1', 'Foxtrot', 'Artist F', 'artist-f')
]

describe('Guess the Track pure engine', () => {
  it('deals reproducibly, balances source identities, and never repeats a mystery identity', () => {
    const dealt = buildGuessTrackQuestions(POOL, 5, 418)
    const first = dealt.map((q) => q.mystery.key)
    const second = buildGuessTrackQuestions(POOL, 5, 418).map((q) => q.mystery.key)
    expect(first).toEqual(second)
    expect(new Set(first)).toHaveLength(5)
    expect(new Set(dealt.map((q) => q.mystery.balanceKey))).toHaveLength(5)
  })

  it('groups indistinguishable duplicate recordings and accepts every duplicate key', () => {
    const duplicate = { ...POOL[0], key: 'a-copy', context: 'Other album' }
    const questions = buildGuessTrackQuestions([...POOL, duplicate], 7, 9)
    const alpha = questions.find((q) => q.recordingKey === POOL[0].recordingKey)
    expect(guessTrackIdentityCount([...POOL, duplicate])).toBe(POOL.length)
    expect(guessTrackGroups([...POOL, duplicate]).find((g) => g.length === 2)).toBeTruthy()
    expect(alpha?.validKeys.sort()).toEqual(['a-copy', 'a1'])
  })

  it('normalizes accents and ranks title prefixes ahead of context matches', () => {
    expect(normalizeGuessTrackText('  Café—Moon! ')).toBe('cafe moon')
    expect(searchGuessTrackChoices(POOL, 'cafe').map((item) => item.key)).toEqual(['c1'])
    const contextual = entry('z1', 'Zeta', 'Artist Z', 'artist-z', 'Alpha series')
    expect(searchGuessTrackChoices([...POOL, contextual], 'alpha').map((item) => item.key)).toEqual([
      'a1',
      'a2',
      'z1'
    ])
  })

  it('removes already-guessed recording identities from autocomplete', () => {
    expect(searchGuessTrackChoices(POOL, 'alpha', [POOL[0].recordingKey]).some((x) => x.key === 'a1')).toBe(false)
  })

  it('suggests nothing until the player types, so the list cannot cover Skip', () => {
    expect(searchGuessTrackChoices(POOL, '')).toEqual([])
    expect(searchGuessTrackChoices(POOL, '   ')).toEqual([])
  })

  it('treats remastered copies and featuring credits as one recording, but keeps live takes apart', () => {
    const plain = guessTrackRecordingKey('Heroes', ['David Bowie'])
    expect(guessTrackRecordingKey('Heroes - 2017 Remaster', ['David Bowie'])).toBe(plain)
    expect(guessTrackRecordingKey('Heroes (Remastered 1999)', ['David Bowie feat. Someone'])).toBe(plain)
    expect(guessTrackRecordingKey('Heroes (Live)', ['David Bowie'])).not.toBe(plain)
    const entries = [
      guessTrackMusicEntry(musicTrack(1, 'Heroes'))!,
      guessTrackMusicEntry(musicTrack(2, 'Heroes - 2017 Remaster'))!
    ]
    expect(guessTrackIdentityCount(entries)).toBe(1)
    const question = buildGuessTrackQuestions(entries, 1, 3)[0]
    expect(question.validKeys.sort()).toEqual(['music-1', 'music-2'])
    // One autocomplete row, under the plain title.
    expect(guessTrackChoices(entries).map((item) => item.title)).toEqual(['Heroes'])
  })

  it('labels themes with their sequence and keeps one row per anime for a shared theme', () => {
    const song = (themeId: number, mediaId: number, animeTitle: string, slug: string | null): QuizSong => ({
      themeId,
      slug,
      type: 'OP',
      title: 'Shared Song',
      audioUrl: 'https://example.test/a.webm',
      audioPath: null,
      mediaId,
      animeTitle,
      coverPath: null,
      status: null,
      artists: ['Singer'],
      year: 2019,
      genres: []
    })
    const first = guessTrackThemeEntry(song(1, 10, 'Show A', 'OP2'))!
    const second = guessTrackThemeEntry(song(2, 11, 'Show B', null))!
    expect(first.answerLabel).toBe('Shared Song — Show A (OP2)')
    expect(second.answerLabel).toBe('Shared Song — Show B')
    expect(first.year).toBe(2019)
    expect(guessTrackChoices([first, second])).toHaveLength(2)
  })

  it('flags a wrong pick from the same anime or artist as a near miss', () => {
    const answer = entry('x1', 'Answer', 'Artist X', 'artist-x')
    expect(guessTrackNearMiss(entry('x2', 'Other', 'Artist X', 'artist-x'), [answer])).toBe(true)
    expect(guessTrackNearMiss(entry('y1', 'Other', 'Artist Y', 'artist-y'), [answer])).toBe(false)
    const state = submitGuessTrack(initialGuessTrackRound(), POOL[1], [POOL[0].key], true).state
    expect(state.attempts[0].near).toBe(true)
  })

  it('uses the 1/2/4/7/11/16 ladder and scores attempts from 6 to 1', () => {
    expect(GUESS_TRACK_CLIP_SECONDS).toEqual([1, 2, 4, 7, 11, 16])
    expect(Array.from({ length: 6 }, (_, i) => guessTrackPoints(i))).toEqual([6, 5, 4, 3, 2, 1])
    let state = initialGuessTrackRound()
    const seen = [guessTrackClipSeconds(state)]
    for (let i = 0; i < 5; i++) {
      state = skipGuessTrack(state).state
      seen.push(guessTrackClipSeconds(state))
    }
    expect(seen).toEqual([1, 2, 4, 7, 11, 16])
  })

  it('moves wrong answers and skips forward, ladders the hints, and fails at six', () => {
    const right = { ...POOL[0], year: 1977 }
    let state = initialGuessTrackRound()
    for (let i = 0; i < 2; i++) state = skipGuessTrack(state).state
    expect(guessTrackHints(right, state)).toEqual([])
    state = submitGuessTrack(state, POOL[1], [right.key]).state
    expect(state.status).toBe('playing')
    expect(guessTrackHints(right, state)).toEqual(['Released 1977'])
    expect(guessTrackHints({ ...right, year: null }, state)).toEqual(['Artist starts with “A”'])
    state = skipGuessTrack(state).state
    expect(guessTrackHints(right, state)).toEqual(['Released 1977'])
    state = skipGuessTrack(state).state
    expect(guessTrackHints(right, state)).toEqual(['Released 1977', 'Artist: Artist A'])
    const final = skipGuessTrack(state)
    expect(final.outcome).toBe('failed')
    expect(final.state.status).toBe('failed')
    expect(final.state.points).toBe(0)
  })

  it('scores a correct answer by its attempt and rejects repeated guesses without spending one', () => {
    const right = POOL[0]
    const wrong = POOL[1]
    const afterWrong = submitGuessTrack(initialGuessTrackRound(), wrong, [right.key]).state
    const repeated = submitGuessTrack(afterWrong, wrong, [right.key])
    expect(repeated.outcome).toBe('repeated')
    expect(repeated.state.attempts).toHaveLength(1)
    const solved = submitGuessTrack(repeated.state, right, [right.key])
    expect(solved.outcome).toBe('correct')
    expect(solved.state.points).toBe(5)
  })

  it('finds where sound starts after leading silence, and plays from 0 when nothing is audible', () => {
    const rate = 1000
    const samples = new Float32Array(rate * 3)
    for (let i = 1500; i < samples.length; i++) samples[i] = 0.3 * Math.sin(i)
    expect(leadingSilenceSeconds([samples], rate)).toBeCloseTo(1.45, 2)
    // Sound on the second channel only still counts.
    expect(leadingSilenceSeconds([new Float32Array(rate * 3), samples], rate)).toBeCloseTo(1.45, 2)
    expect(leadingSilenceSeconds([new Float32Array(rate * 3)], rate)).toBe(0)
    const immediate = new Float32Array(rate).fill(0.5)
    expect(leadingSilenceSeconds([immediate], rate)).toBe(0)
  })

  it('returns the first Unicode character for music hints', () => {
    expect(guessTrackArtistInitial(' 宇多田ヒカル')).toBe('宇')
  })
})
