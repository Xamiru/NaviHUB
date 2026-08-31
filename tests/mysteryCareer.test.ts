import { describe, expect, it } from 'vitest'
import {
  buildMysteryCareerQuestion,
  mysteryCareerScore,
  mysteryCareerTargetCount,
  searchCareerPeople,
  type MysteryCareerCandidate
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
