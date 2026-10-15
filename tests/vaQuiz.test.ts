import { describe, expect, it } from 'vitest'
import type { QuizVaItem } from '../src/shared/types'
import {
  buildVaNameQuestions,
  buildVaQuizQuestions,
  countBuildableVaSources,
  isWellKnownVaRole,
  vaAppearanceKey,
  vaPersonKey
} from '../src/shared/vaQuiz'

function role(
  characterId: number,
  mediaId: number,
  personIds: number[],
  options: {
    gender?: string | null
    importance?: number | null
    castRank?: number | null
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
    // Well known by default: a show's top-ten characters.
    castRank: options.castRank === undefined ? 0 : options.castRank,
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

  it('deals a full round from a sampled large pool, reproducibly', () => {
    const pool = Array.from({ length: 2000 }, (_, i) =>
      role(i + 1, i + 1, [1000 + (i % 400)], {
        gender: i % 2 ? 'male' : 'female',
        year: 1990 + (i % 30)
      })
    )
    const round = buildVaQuizQuestions(pool, 20, 'large')
    expect(round).toHaveLength(20)
    expect(new Set(round.map((question) => vaAppearanceKey(question.source))).size).toBe(20)
    expect(buildVaQuizQuestions(pool, 20, 'large')).toEqual(round)
    expect(countBuildableVaSources(pool)).toBe(2000)
  })
})

describe('well-known characters', () => {
  it('keeps a show\'s top ten, and main characters when no rank was imported', () => {
    expect(isWellKnownVaRole({ castRank: 9, importance: 1 })).toBe(true)
    expect(isWellKnownVaRole({ castRank: 10, importance: 0 })).toBe(false)
    expect(isWellKnownVaRole({ castRank: null, importance: 0 })).toBe(true)
    expect(isWellKnownVaRole({ castRank: null, importance: 1 })).toBe(false)
  })

  it('never uses an obscure character as source, answer or option', () => {
    const pool = [
      role(1, 1, [10]),
      role(2, 2, [10]),
      role(3, 3, [20]),
      role(4, 4, [30]),
      role(5, 5, [40]),
      role(6, 6, [10], { castRank: 25, name: 'Extra' })
    ]
    for (const question of buildVaQuizQuestions(pool, 2, 4)) {
      const names = [question.source, ...question.options].map((item) => item.characterName)
      expect(names).not.toContain('Extra')
    }
  })
})

describe('name the voice actor', () => {
  const voiced = (characterId: number, mediaId: number, personId: number, gender = 'female') => ({
    ...role(characterId, mediaId, [personId], { gender }),
    personPhotos: [`people/${personId}.webp`]
  })

  it('asks for one valid voice actor among four photographed, same-voice-gender options', () => {
    const pool = [
      voiced(1, 1, 10), voiced(2, 2, 10),
      voiced(3, 3, 20), voiced(4, 4, 20),
      voiced(5, 5, 30), voiced(6, 6, 30),
      voiced(7, 7, 40), voiced(8, 8, 40),
      voiced(9, 9, 50, 'male'), voiced(10, 10, 50, 'male')
    ]
    const questions = buildVaNameQuestions(pool, 4, 11)
    expect(questions).toHaveLength(4)
    for (const question of questions) {
      expect(question.options).toHaveLength(4)
      expect(question.options.filter((option) => question.validKeys.includes(vaPersonKey(option.personId)))).toHaveLength(1)
      expect(question.options.every((option) => option.photoPath.startsWith('people/'))).toBe(true)
      // The male-voiced actor is never a wrong option for a female character.
      if (question.source.gender === 'female') {
        expect(question.options.map((option) => option.personId)).not.toContain(50)
      }
      // The reveal names the voice actor's other character.
      expect(question.otherRoles).toHaveLength(1)
    }
    // Four questions, four different voice actors.
    expect(new Set(questions.map((question) => question.answer.personId)).size).toBe(4)
    expect(buildVaNameQuestions(pool, 4, 11)).toEqual(questions)
  })

  it('skips voice actors without a photo', () => {
    const pool = [
      voiced(1, 1, 10), voiced(2, 2, 20), voiced(3, 3, 30), voiced(4, 4, 40),
      { ...role(5, 5, [99]), personPhotos: [null] }
    ]
    for (const question of buildVaNameQuestions(pool, 3, 2)) {
      expect(question.options.map((option) => option.personId)).not.toContain(99)
      expect(question.answer.personId).not.toBe(99)
    }
  })
})
