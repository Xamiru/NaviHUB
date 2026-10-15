import { describe, expect, it } from 'vitest'
import { chronologyPlacement } from '../src/shared/chronologyQuiz'
import { buildChallengeQuestions, type ChallengeMediaCandidate } from '../src/shared/quizChallenges'

describe('Chronology partial scoring', () => {
  const valid = ['a', 'b', 'c', 'd']

  it('scores a perfect order 100, one swapped pair 50 and anything worse 0', () => {
    expect(chronologyPlacement(['a', 'b', 'c', 'd'], valid)).toEqual({
      placed: [true, true, true, true],
      misplaced: 0,
      points: 100
    })
    // Any single swap, adjacent or not.
    expect(chronologyPlacement(['b', 'a', 'c', 'd'], valid).points).toBe(50)
    expect(chronologyPlacement(['d', 'b', 'c', 'a'], valid)).toMatchObject({
      placed: [false, true, true, false],
      points: 50
    })
    expect(chronologyPlacement(['b', 'c', 'a', 'd'], valid)).toMatchObject({ misplaced: 3, points: 0 })
    expect(chronologyPlacement(['d', 'c', 'b', 'a'], valid).points).toBe(0)
  })
})

describe('Chronology connections', () => {
  function title(id: number, year: number, people: ChallengeMediaCandidate['people'], studio?: number): ChallengeMediaCandidate {
    return {
      id,
      title: `Picture ${String.fromCharCode(64 + id)}`,
      mediaType: 'movie',
      coverPath: `media/${id}.jpg`,
      artPaths: [],
      releaseDate: `${year}-01-01`,
      totalUnits: null,
      score: null,
      genres: [],
      relations: [],
      people,
      studios: studio ? [{ id: studio, name: `Studio ${studio}`, role: 'production' }] : []
    }
  }

  it('never connects a set through a composer or producer', () => {
    const composer = { id: 1, name: 'Score Writer', role: 'composer' }
    const pool = [1, 2, 3, 4].map((id) => title(id, 1990 + id, [composer]))
    expect(buildChallengeQuestions({ kind: 'chronology', seed: 3, length: 1 }, pool)).toEqual([])
    const director = { id: 2, name: 'Known Director', role: 'director' }
    const directed = [1, 2, 3, 4].map((id) => title(id, 1990 + id, [director]))
    const [question] = buildChallengeQuestions({ kind: 'chronology', seed: 3, length: 1 }, directed)
    expect(question.kind === 'chronology' && question.connectionLabel).toBe('Directed by Known Director')
  })
})
