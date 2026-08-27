import { describe, expect, it } from 'vitest'
import {
  buildChallengeQuestions,
  type ChallengeCharacterCandidate,
  type ChallengeMediaCandidate
} from '../src/shared/quizChallenges'
import { SILHOUETTE_STYLE } from '../src/shared/silhouetteQuiz'

const media: ChallengeMediaCandidate[] = [
  ...Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    title: `Anime ${index + 1}`,
    mediaType: 'anime',
    coverPath: null,
    artPaths: [],
    releaseDate: `${2010 + index}-01-01`,
    totalUnits: 12,
    score: 8,
    genres: index < 3 ? ['Action'] : ['Drama'],
    relations: [],
    people: [],
    studios: []
  })),
  {
    id: 99,
    title: 'Live Action',
    mediaType: 'movie',
    coverPath: null,
    artPaths: [],
    releaseDate: '2014-01-01',
    totalUnits: null,
    score: 7,
    genres: ['Action'],
    relations: [],
    people: [],
    studios: []
  }
]

const characters: ChallengeCharacterCandidate[] = [
  ...Array.from({ length: 6 }, (_, index) => ({
    id: index + 1,
    name: `Heroine ${index + 1}`,
    gender: 'female',
    imagePath: `media/character-${index + 1}.jpg`,
    media: [{ id: index + 1, title: `Anime ${index + 1}` }]
  })),
  {
    id: 20,
    name: 'Returning Heroine',
    gender: 'female',
    imagePath: 'media/returning.jpg',
    media: [{ id: 1, title: 'Anime 1' }, { id: 2, title: 'Anime 2' }]
  },
  {
    id: 99,
    name: 'Movie Character',
    gender: 'female',
    imagePath: 'media/movie.jpg',
    media: [{ id: 99, title: 'Live Action' }]
  }
]

describe('silhouette quiz', () => {
  it('uses an obscured portrait treatment instead of a solid black rectangle', () => {
    expect(SILHOUETTE_STYLE.filter).toContain('blur(')
    expect(SILHOUETTE_STYLE.filter).toContain('contrast(')
    expect(SILHOUETTE_STYLE.filter).not.toBe('brightness(0)')
  })

  it('builds anime-only character questions with unique same-gender names from other titles', () => {
    const questions = buildChallengeQuestions(
      { kind: 'silhouette', seed: 33, length: 6, options: { silhouetteMode: 'character' } },
      media,
      characters
    )
    expect(questions).toHaveLength(6)
    for (const question of questions) {
      expect(question.kind).toBe('silhouette')
      expect(question.choices).toHaveLength(4)
      expect(new Set(question.choices.map((choice) => choice.label.toLowerCase())).size).toBe(4)
      expect(question.choices.some((choice) => choice.label === 'Movie Character')).toBe(false)
    }
  })

  it('never displays an alternate valid anime as a wrong title', () => {
    const questions = buildChallengeQuestions(
      { kind: 'silhouette', seed: 8, length: 20, options: { silhouetteMode: 'title' } },
      media,
      characters
    )
    const returning = questions.find((question) => question.reveal.startsWith('Returning Heroine'))
    expect(returning).toBeDefined()
    const displayedValid = returning!.choices.filter((choice) => returning!.validKeys.includes(choice.key))
    expect(displayedValid).toHaveLength(1)
    expect(returning!.choices).toHaveLength(4)
    expect(returning!.choices.some((choice) => choice.label === 'Live Action')).toBe(false)
  })
})
