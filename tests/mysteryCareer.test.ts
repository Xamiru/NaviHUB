import { seededRng } from '../src/shared/quizCore'
import { describe, expect, it } from 'vitest'
import {
  buildMysteryCareerQuestion,
  mysteryCareerScore,
  mysteryCareerTargetCount,
  searchCareerPeople,
  type MysteryCareerCandidate,
  careerClues,
  careerCreditProminence
} from '../src/shared/mysteryCareer'

function candidates(): MysteryCareerCandidate[] {
  return Array.from({ length: 8 }, (_, index) => ({
    key: String(index + 1),
    label: `Film ${index + 1}`,
    aliases: [],
    imagePath: `media/${index + 1}.jpg`,
    releaseYear: 2000 + index,
    mediaType: index % 2 ? 'tv' : 'movie',
    people: [
      { id: 1, name: 'Alex Target', role: 'actor', billingOrder: index < 6 ? 0 : 10 },
      { id: index + 10, name: `Person ${index}`, role: index % 2 ? 'director' : 'actor', billingOrder: 0 },
      { id: ((index + 1) % 8) + 10, name: `Person ${(index + 1) % 8}`, role: 'director', billingOrder: null }
    ]
  }))
}

describe('Mystery Career', () => {
  it('builds deterministic careers from top-ten actors and uncapped directors', () => {
    const first = buildMysteryCareerQuestion(candidates(), 27, 'both')
    const second = buildMysteryCareerQuestion(candidates(), 27, 'both')
    expect(first).toEqual(second)
    expect(first?.credits).toHaveLength(6)
    expect(first?.people.find((person) => person.key === '1')).toBeDefined()
    expect(mysteryCareerTargetCount(candidates(), 'both')).toBeGreaterThan(0)
  })

  it('ranks normalized person searches and excludes repeated guesses', () => {
    const people = [
      { key: '1', label: 'Álex Target', roles: ['actor'] as const },
      { key: '2', label: 'Target Alex', roles: ['director'] as const }
    ]
    expect(searchCareerPeople(people, 'alex')[0].key).toBe('1')
    expect(searchCareerPeople(people, 'alex', ['1']).map((person) => person.key)).toEqual(['2'])
  })

  it('scores six attempts from 600 down to 100', () => {
    expect(mysteryCareerScore(true, 1, 6)).toBe(600)
    expect(mysteryCareerScore(true, 6, 6)).toBe(100)
    expect(mysteryCareerScore(false, 1, 6)).toBe(0)
  })
})

describe('Mystery Career clue order', () => {
  it('scores leads above deep roles, directing in between, and rated titles a little higher', () => {
    expect(careerCreditProminence('actor', 0, null)).toBeGreaterThan(careerCreditProminence('director', null, null))
    expect(careerCreditProminence('director', null, null)).toBeGreaterThan(careerCreditProminence('actor', 6, null))
    expect(careerCreditProminence('actor', 3, 90)).toBeGreaterThan(careerCreditProminence('actor', 3, 40))
  })

  it('reveals the least known credits first and always ends on the two best known', () => {
    const credit = (key: string, prominence: number) => ({
      title: { key, label: key, aliases: [], imagePath: `media/${key}.jpg`, releaseYear: 2000, mediaType: 'movie' as const },
      roles: ['Main cast'],
      prominence
    })
    const pool = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => credit(`t${n}`, n))
    for (let seed = 0; seed < 10; seed++) {
      const clues = careerClues(pool, seededRng(seed))
      expect(clues).toHaveLength(6)
      expect(clues.slice(-2).map((clue) => clue.title.key)).toEqual(['t9', 't10'])
      const order = clues.map((clue) => Number(clue.title.key.slice(1)))
      expect(order).toEqual([...order].sort((a, b) => a - b))
      expect(clues[0]).not.toHaveProperty('prominence')
    }
  })
})
