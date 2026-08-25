import { describe, expect, it } from 'vitest'
import { buildChallengeQuestions, type ChallengeMediaCandidate } from '../src/shared/quizChallenges'
import type { QuizChallengeKind } from '../src/shared/types'

const media: ChallengeMediaCandidate[] = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: `Title ${i + 1}`,
  mediaType: 'anime',
  coverPath: `media/${i + 1}.jpg`,
  artPaths: [`pictures/${i + 1}.jpg`],
  releaseDate: `${2000 + i}-01-01`,
  totalUnits: 12 + i,
  score: 5 + i / 2,
  genres: i < 3 ? ['Action'] : ['Drama'],
  relations: [],
  people: i < 4 ? [{ id: 1, name: 'Shared Person', role: 'director' }] : [{ id: i + 2, name: `Person ${i}`, role: 'staff' }],
  studios: [{ id: 1, name: 'Shared Studio', role: 'animation_studio' }]
}))

const characters = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  name: `Character ${i + 1}`,
  imagePath: `media/c${i + 1}.jpg`,
  media: [{ id: i + 1, title: `Title ${i + 1}` }]
}))

describe('central quiz challenge builders', () => {
  it('is reproducible and every displayed MCQ has one displayed valid answer', () => {
    const kinds: QuizChallengeKind[] = ['imageReveal', 'silhouette', 'connections', 'oddOneOut', 'higherLower']
    for (const kind of kinds) {
      const request = { kind, seed: 44, scope: 'consumed' as const, length: 3 }
      const first = buildChallengeQuestions(request, media, characters)
      expect(buildChallengeQuestions(request, media, characters)).toEqual(first)
      for (const question of first) {
        expect(question.choices.filter((choice) => question.validKeys.includes(choice.key))).toHaveLength(1)
        expect(new Set(question.choices.map((choice) => choice.key)).size).toBe(question.choices.length)
      }
    }
  })

  it('builds chronology questions with four distinct dates and an exact order', () => {
    const [question] = buildChallengeQuestions({ kind: 'chronology', seed: 8, length: 1 }, media)
    expect(question.kind).toBe('chronology')
    if (question.kind !== 'chronology') return
    expect(question.entries).toHaveLength(4)
    expect(new Set(question.entries.map((entry) => entry.releaseDate)).size).toBe(4)
    const dates = question.validKeys.map((key) => question.entries.find((entry) => entry.key === key)!.releaseDate)
    expect(dates).toEqual([...dates].sort())
  })

  it('rejects higher/lower ties before dealing', () => {
    const tied = media.map((item) => ({ ...item, totalUnits: 12 }))
    const questions = buildChallengeQuestions({ kind: 'higherLower', seed: 2, length: 20, options: { higherLowerMetric: 'totalUnits' } }, tied)
    expect(questions).toHaveLength(0)
  })
})
