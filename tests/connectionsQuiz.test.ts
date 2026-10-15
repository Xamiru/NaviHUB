import { describe, expect, it } from 'vitest'
import { buildChallengeQuestions, type ChallengeMediaCandidate } from '../src/shared/quizChallenges'
import { isVoiceRole, screenPeople } from '../src/shared/voiceRoles'

type Person = ChallengeMediaCandidate['people'][number]

const actor = (id: number, billingOrder: number): Person => ({
  id,
  name: `Person ${id}`,
  role: 'actor',
  characterName: `Role ${id}`,
  billingOrder
})
const director = (id: number): Person => ({ id, name: `Person ${id}`, role: 'director' })

function title(id: number, name: string, people: Person[], genres: string[] = ['Drama']): ChallengeMediaCandidate {
  return {
    id,
    title: name,
    mediaType: 'movie',
    coverPath: `media/${id}.jpg`,
    artPaths: [],
    releaseDate: '2010-01-01',
    totalUnits: null,
    score: null,
    genres,
    relations: [],
    people,
    studios: []
  }
}

// Unrelated titles that only supply wrong options.
const FILLER = [
  title(90, 'Filler Alpha', [actor(901, 0)]),
  title(91, 'Filler Bravo', [actor(911, 0)]),
  title(92, 'Filler Charlie', [actor(921, 0)])
]

const connections = (pool: ChallengeMediaCandidate[], seed = 1) =>
  buildChallengeQuestions({ kind: 'connections', seed, length: 10 }, pool).flatMap((question) =>
    question.kind === 'connections' ? [question] : []
  )

describe('voice roles', () => {
  it('treats actor credits on animated titles as voice roles, never directors', () => {
    expect(isVoiceRole(['Animation', 'Family'], 'actor')).toBe(true)
    expect(isVoiceRole(['animation'], 'director')).toBe(false)
    expect(isVoiceRole(['Drama'], 'actor')).toBe(false)
    const cartoon = title(1, 'Cartoon', [actor(1, 0), director(2)], ['Animation'])
    expect(screenPeople(cartoon).map((person) => person.id)).toEqual([2])
  })
})

describe('Connections deal', () => {
  it('never links two titles through a voice role, but still through a director', () => {
    const live = title(1, 'Live Action', [actor(10, 0), director(20)])
    const cartoon = title(2, 'Cartoon Feature', [actor(10, 0), director(20)], ['Animation'])
    const [question] = connections([live, cartoon, ...FILLER])
    expect(question.validKeys).toEqual(['20'])
    // The voice actor is in both titles, so they can never be a wrong option.
    expect(question.choices.map((choice) => choice.key)).not.toContain('10')
  })

  it('skips pairs from the same franchise', () => {
    const first = title(1, 'Saga', [actor(10, 0), actor(11, 1)])
    const sequel = title(2, 'Saga 2', [actor(10, 0), actor(11, 1)])
    expect(connections([first, sequel, ...FILLER])).toEqual([])
  })

  it('shows the most prominent shared person and takes wrong options from each title', () => {
    const a = title(1, 'North Story', [actor(10, 0), actor(11, 8), actor(12, 1), actor(13, 2)])
    const b = title(2, 'South Tale', [actor(10, 3), actor(11, 9), actor(14, 1), actor(15, 2)])
    for (let seed = 0; seed < 15; seed++) {
      const [question] = connections([a, b, ...FILLER], seed)
      expect(new Set(question.validKeys)).toEqual(new Set(['10', '11']))
      const keys = question.choices.map((choice) => choice.key)
      // Person 10 (billed 1st and 4th) is shown, not person 11 (9th and 10th).
      expect(keys).toContain('10')
      expect(keys).not.toContain('11')
      expect(keys.some((key) => ['12', '13'].includes(key))).toBe(true)
      expect(keys.some((key) => ['14', '15'].includes(key))).toBe(true)
    }
  })
})
