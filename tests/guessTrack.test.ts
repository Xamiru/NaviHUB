import { describe, expect, it } from 'vitest'
import type { GuessTrackEntry } from '../src/shared/guessTrack'
import {
  GUESS_TRACK_CLIP_SECONDS,
  buildGuessTrackQuestions,
  guessTrackArtistInitial,
  guessTrackClipSeconds,
  guessTrackGroups,
  guessTrackHintVisible,
  guessTrackIdentityCount,
  guessTrackPoints,
  initialGuessTrackRound,
  normalizeGuessTrackText,
  searchGuessTrackChoices,
  skipGuessTrack,
  submitGuessTrack
} from '../src/shared/guessTrack'

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
    balanceKey
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
    expect(searchGuessTrackChoices(POOL, '', [POOL[0].recordingKey]).some((x) => x.key === 'a1')).toBe(false)
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

  it('moves wrong answers and skips forward, reveals the hint after four misses, and fails at six', () => {
    const right = POOL[0]
    let state = initialGuessTrackRound()
    for (let i = 0; i < 3; i++) state = skipGuessTrack(state).state
    expect(guessTrackHintVisible(state)).toBe(false)
    state = submitGuessTrack(state, POOL[1], [right.key]).state
    expect(state.status).toBe('playing')
    expect(guessTrackHintVisible(state)).toBe(true)
    state = skipGuessTrack(state).state
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

  it('returns the first Unicode character for music hints', () => {
    expect(guessTrackArtistInitial(' 宇多田ヒカル')).toBe('宇')
  })
})
