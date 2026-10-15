import { describe, expect, it } from 'vitest'
import { higherLowerCopy, higherLowerValue } from '../src/shared/higherLowerQuiz'
import { buildChallengeQuestions, type ChallengeMediaCandidate } from '../src/shared/quizChallenges'

function title(id: number, name: string, year: number, communityScore: number | null = null): ChallengeMediaCandidate {
  return {
    id,
    title: name,
    mediaType: 'anime',
    coverPath: `media/${id}.jpg`,
    artPaths: [],
    releaseDate: `${year}-04-01`,
    totalUnits: 12,
    score: null,
    communityScore,
    genres: [],
    relations: [],
    people: [],
    studios: []
  }
}

describe('Higher or Lower community rating', () => {
  it('reads the rounded community score and words the question as a rating', () => {
    const source = { releaseDate: null, totalUnits: null, score: null }
    expect(higherLowerValue({ ...source, communityScore: 81.6 }, 'communityScore')).toBe(82)
    expect(higherLowerValue({ ...source, communityScore: null }, 'communityScore')).toBeNull()
    const copy = higherLowerCopy('movie', 'communityScore')
    expect(copy.question('A', 'B')).toBe('Is A rated higher or lower than B?')
    expect(copy.formatValue(74)).toBe('74 / 100')
  })

  it('deals rating comparisons from titles that have a score', () => {
    const pool = [title(1, 'Alpha', 2001, 70), title(2, 'Bravo', 2002, 85), title(3, 'Charlie', 2003, 62), title(4, 'Delta', 2004, null)]
    const questions = buildChallengeQuestions(
      { kind: 'higherLower', seed: 3, length: 4, options: { higherLowerMetric: 'communityScore', higherLowerMediaType: 'anime' } },
      pool
    )
    expect(questions.length).toBeGreaterThan(0)
    for (const question of questions) {
      if (question.kind !== 'higherLower') throw new Error('wrong kind')
      expect([question.reference.key, question.challenger.key]).not.toContain('4')
    }
  })
})

describe('Higher or Lower release years', () => {
  it('never compares two entries of one franchise', () => {
    const pool = [
      title(1, 'Saga', 2001),
      title(2, 'Saga Season 2', 2003),
      title(3, 'Saga: The Movie', 2005),
      title(4, 'Elsewhere', 2007),
      title(5, 'Another', 2009)
    ]
    for (let seed = 0; seed < 15; seed++) {
      const questions = buildChallengeQuestions(
        { kind: 'higherLower', seed, length: 6, options: { higherLowerMetric: 'releaseDate', higherLowerMediaType: 'anime' } },
        pool
      )
      for (const question of questions) {
        if (question.kind !== 'higherLower') continue
        const both = [question.reference.label, question.challenger.label]
        expect(both.filter((label) => label.startsWith('Saga')).length).toBeLessThanOrEqual(1)
      }
    }
  })
})
