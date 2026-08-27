import { describe, expect, it } from 'vitest'
import type { QuizVaItem } from '../src/shared/types'
import {
  buildVaQuizQuestions,
  countBuildableVaSources,
  vaAppearanceKey
} from '../src/shared/vaQuiz'

function role(
  characterId: number,
  mediaId: number,
  personIds: number[],
  options: {
    gender?: string | null
    importance?: number | null
    year?: number | null
    name?: string
    title?: string
  } = {}
): QuizVaItem {
  return {
    characterId,
    characterName: options.name ?? `Character ${characterId}`,
    characterImagePath: `characters/${characterId}.webp`,
    gender: options.gender === undefined ? 'female' : options.gender,
    mediaId,
    mediaTitle: options.title ?? `Anime ${mediaId}`,
    year: options.year ?? 2020,
    importance: options.importance ?? 1,
    personIds,
    personNames: personIds.map((id) => `VA ${id}`)
  }
}

describe('same-VA question builder', () => {
  it('shows exactly one cross-title match and gender-matches every distractor', () => {
    const source = role(1, 1, [10], { gender: 'male', name: 'Source' })
    const answer = role(2, 2, [10], { gender: 'female', name: 'Answer' })
    const alternateValid = role(3, 3, [10], { gender: 'female' })
    const pool = [
      source,
      answer,
      alternateValid,
      role(4, 4, [20], { gender: 'female', importance: 1, year: 2021 }),
      role(5, 5, [30], { gender: 'female', importance: 1, year: 2019 }),
      role(6, 6, [40], { gender: 'female', importance: 0, year: 2020 }),
      role(7, 7, [50], { gender: 'male' }),
      role(8, 8, [60], { gender: 'female', importance: 3, year: 1980 })
    ]

    const [question] = buildVaQuizQuestions(pool, 1, 42)
    expect(question).toBeTruthy()
    expect(question.options).toHaveLength(4)
    expect(new Set(question.options.map((item) => item.mediaTitle)).size).toBe(4)
    expect(question.answer.mediaId).not.toBe(question.source.mediaId)
    expect(question.answer.characterId).not.toBe(question.source.characterId)
    expect(
      question.options.filter((item) =>
        item.personIds.some((personId) => question.source.personIds.includes(personId))
      )
    ).toHaveLength(1)
    expect(
      question.options
        .filter((item) => item !== question.answer)
        .every((item) => item.gender === question.answer.gender)
    ).toBe(true)
    expect(
      question.options
        .filter((item) => item !== question.answer)
        .map((item) => item.characterId)
        .sort((a, b) => a - b)
    ).toEqual([4, 5, 6])
    expect(question.validKeys).toEqual([vaAppearanceKey(question.answer)])
  })

  it('falls back to role and era affinity when the answer gender is unknown', () => {
    const pool = [
      role(1, 1, [10], { gender: null }),
      role(2, 2, [10], { gender: null }),
      role(3, 3, [20], { gender: 'male' }),
      role(4, 4, [30], { gender: 'female' }),
      role(5, 5, [40], { gender: 'nonbinary' })
    ]
    const [question] = buildVaQuizQuestions(pool, 1, 7)
    expect(question.options).toHaveLength(4)
    expect(new Set(question.options.map((item) => item.gender))).toEqual(
      new Set([null, 'male', 'female', 'nonbinary'])
    )
  })

  it('is seeded, balances shared VAs, and refuses same-title-only links', () => {
    const pool = [
      role(1, 1, [10]),
      role(2, 2, [10]),
      role(3, 3, [20]),
      role(4, 4, [20]),
      role(5, 5, [30]),
      role(6, 6, [30])
    ]
    const first = buildVaQuizQuestions(pool, 6, 99)
    const second = buildVaQuizQuestions(pool, 6, 99)
    expect(second).toEqual(first)
    expect(first).toHaveLength(6)
    expect(new Set(first.map((question) => vaAppearanceKey(question.source))).size).toBe(6)
    const counts = new Map<number, number>()
    for (const question of first) {
      const person = question.sharedPersonIds[0]
      counts.set(person, (counts.get(person) ?? 0) + 1)
    }
    expect([...counts.values()].sort()).toEqual([2, 2, 2])

    const sameTitle = [
      role(20, 20, [100], { title: 'One Anime' }),
      role(21, 20, [100], { title: 'One Anime' }),
      role(22, 22, [200]),
      role(23, 23, [300]),
      role(24, 24, [400])
    ]
    expect(countBuildableVaSources(sameTitle)).toBe(0)
    expect(buildVaQuizQuestions(sameTitle, 1, 1)).toEqual([])
  })
})
