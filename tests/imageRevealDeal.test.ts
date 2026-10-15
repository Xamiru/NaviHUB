import { describe, expect, it } from 'vitest'
import { buildChallengeQuestions, type ChallengeMediaCandidate } from '../src/shared/quizChallenges'
import { takeWithFranchiseCap, titleFranchiseKey } from '../src/shared/franchiseKey'
import { searchTitleChoices } from '../src/shared/titleSearch'

function item(id: number, title: string, mediaType = 'anime'): ChallengeMediaCandidate {
  return {
    id,
    title,
    mediaType,
    coverPath: `media/${id}.jpg`,
    artPaths: [],
    releaseDate: '2015-01-01',
    totalUnits: 12,
    score: 7,
    genres: ['Action'],
    relations: [],
    people: [],
    studios: []
  }
}

const SHOW = [item(1, 'Show'), item(2, 'Show Season 2'), item(3, 'Show Season 3'), item(4, 'Show II')]
const OTHERS = ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot'].map((title, i) => item(10 + i, title))
const GAMES = ['Quest', 'Racer', 'Shooter', 'Puzzle', 'Arena'].map((title, i) => item(30 + i, title, 'game'))

describe('Image Reveal deal', () => {
  it('lets no franchise fill more than two of the four options', () => {
    for (let seed = 0; seed < 25; seed++) {
      const questions = buildChallengeQuestions(
        { kind: 'imageReveal', seed, length: 10, options: { imageSource: 'covers' } },
        [...SHOW, ...OTHERS]
      )
      for (const question of questions) {
        const franchises = question.choices.map((choice) =>
          titleFranchiseKey([...SHOW, ...OTHERS].find((m) => String(m.id) === choice.key)!.title)
        )
        expect(franchises.filter((key) => key === 'show').length).toBeLessThanOrEqual(2)
      }
    }
  })

  it('spreads a round across franchises before repeating one', () => {
    const questions = buildChallengeQuestions(
      { kind: 'imageReveal', seed: 3, length: 7, options: { imageSource: 'covers' } },
      [...SHOW, ...OTHERS]
    )
    const showAnswers = questions.filter((question) => SHOW.some((m) => question.validKeys.includes(String(m.id))))
    // Seven franchises (Show + six others), seven questions: Show answers once.
    expect(showAnswers).toHaveLength(1)
  })

  it('filters to one media type and carries the type and a focal point', () => {
    const questions = buildChallengeQuestions(
      { kind: 'imageReveal', seed: 9, length: 5, options: { imageSource: 'covers', imageMediaType: 'game' } },
      [...OTHERS, ...GAMES]
    )
    expect(questions).toHaveLength(5)
    for (const question of questions) {
      if (question.kind !== 'imageReveal') throw new Error('wrong kind')
      expect(question.mediaType).toBe('game')
      expect(question.focus.x).toBeGreaterThanOrEqual(15)
      expect(question.focus.x).toBeLessThanOrEqual(85)
    }
  })

  it('tops up from a capped franchise only when nothing else is left', () => {
    const ranked = ['a1', 'a2', 'a3', 'b1']
    expect(takeWithFranchiseCap(ranked, 3, (value) => value[0], 'a')).toEqual(['a1', 'b1', 'a2'])
  })
})

describe('typed title search', () => {
  const choices = [
    { key: '1', label: 'Attack on Titan', aliases: ['Shingeki no Kyojin'] },
    { key: '2', label: 'Titan Quest', aliases: [] },
    { key: '3', label: 'Cowboy Bebop', aliases: [] }
  ]

  it('suggests nothing for an empty query and ranks prefixes before word and alias matches', () => {
    expect(searchTitleChoices(choices, '  ')).toEqual([])
    expect(searchTitleChoices(choices, 'titan').map((choice) => choice.key)).toEqual(['2', '1'])
    expect(searchTitleChoices(choices, 'shingeki').map((choice) => choice.key)).toEqual(['1'])
    expect(searchTitleChoices(choices, 'bébop').map((choice) => choice.key)).toEqual(['3'])
  })
})
