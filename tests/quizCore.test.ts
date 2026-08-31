import { describe, expect, it } from 'vitest'
import {
  answerIsCorrect,
  balancedDeckAvoiding,
  balancedDeal,
  compareQuizResults,
  isNewQuizBest,
  quizMinimumRecordSize,
  quizSeed,
  seededRng,
  shuffledDeckAvoiding
} from '../src/shared/quizCore'

describe('quiz seeded dealing', () => {
  it('reproduces a random stream from a string seed', () => {
    const a = seededRng('party-42')
    const b = seededRng('party-42')
    expect(Array.from({ length: 8 }, () => a())).toEqual(Array.from({ length: 8 }, () => b()))
    expect(quizSeed('party-42')).not.toBe(quizSeed('party-43'))
  })

  it('balances prolific identities before repeating one', () => {
    const rows = [
      ...Array.from({ length: 8 }, (_, i) => ({ show: 'a', i })),
      { show: 'b', i: 8 },
      { show: 'c', i: 9 }
    ]
    const dealt = balancedDeal(rows, 3, (r) => r.show, seededRng(5))
    expect(new Set(dealt.map((r) => r.show))).toEqual(new Set(['a', 'b', 'c']))
  })

  it('does not repeat the previous item across a deck boundary', () => {
    const values = [1, 2, 3, 4]
    for (let seed = 0; seed < 30; seed++) {
      const deck = shuffledDeckAvoiding(values, 3, (a, b) => a === b, seededRng(seed))
      expect(deck.at(-1)).not.toBe(3)
    }
  })

  it('builds a pop-consumed deck that balances identities and avoids the previous identity', () => {
    const values = [
      ...Array.from({ length: 8 }, (_, i) => ({ show: 'a', i })),
      { show: 'b', i: 8 },
      { show: 'c', i: 9 }
    ]
    const deck = balancedDeckAvoiding(values, (value) => value.show, values[0], seededRng(7))
    const first = [deck.pop(), deck.pop(), deck.pop()].map((value) => value?.show)
    expect(first[0]).not.toBe('a')
    expect(new Set(first)).toEqual(new Set(['a', 'b', 'c']))
  })
})

describe('quiz answers and records', () => {
  it('accepts any explicitly valid answer key', () => {
    expect(answerIsCorrect(['media-1', 'media-2'], 'media-2')).toBe(true)
    expect(answerIsCorrect(['media-1', 'media-2'], 'media-3')).toBe(false)
    expect(answerIsCorrect(['media-1'], null)).toBe(false)
  })

  it('ranks accuracy ties by longer round and points by score', () => {
    const short = { id: 1, score: 4, total: 5, settings: { correct: 4 } }
    const long = { id: 2, score: 8, total: 10, settings: { correct: 8 } }
    expect(compareQuizResults(long, short, 'accuracy')).toBeGreaterThan(0)
    expect(
      compareQuizResults(
        { id: 3, score: 2500, total: 20, settings: { correct: 10 } },
        { id: 2, score: 2000, total: 10, settings: { correct: 9 } },
        'points'
      )
    ).toBeGreaterThan(0)
  })

  it('treats an exact tie as a newer best but ignores short rounds', () => {
    const previous = {
      id: 10,
      kind: 'song' as const,
      score: 4,
      total: 5,
      bestStreak: 4,
      settings: null,
      playedAt: '2026-01-01 00:00:00'
    }
    expect(
      isNewQuizBest({ score: 4, total: 5, settings: { correct: 4 } }, previous, 'accuracy')
    ).toBe(true)
    expect(
      isNewQuizBest({ score: 1, total: 1, settings: { correct: 1 } }, previous, 'accuracy')
    ).toBe(false)
  })

  it('allows one completed board for dedicated screen-game records', () => {
    expect(quizMinimumRecordSize('movieChainNormal')).toBe(1)
    expect(quizMinimumRecordSize('libraryle')).toBe(1)
    expect(quizMinimumRecordSize('mysteryCareer')).toBe(1)
    expect(quizMinimumRecordSize('linkWall')).toBe(1)
    expect(quizMinimumRecordSize('libraryGrid')).toBe(5)
    expect(
      isNewQuizBest(
        { score: 900, total: 1, settings: { correct: 1 } },
        null,
        'points',
        'movieChainNormal'
      )
    ).toBe(true)
  })
})
