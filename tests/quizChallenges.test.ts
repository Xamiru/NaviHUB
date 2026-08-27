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
  gender: 'female',
  imagePath: `media/c${i + 1}.jpg`,
  media: [{ id: i + 1, title: `Title ${i + 1}` }]
}))

describe('central quiz challenge builders', () => {
  it('is reproducible and every displayed MCQ has one displayed valid answer', () => {
    const kinds: QuizChallengeKind[] = ['imageReveal', 'silhouette', 'connections', 'higherLower']
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

  it('builds chronology questions with four distinct years and an exact order', () => {
    const [question] = buildChallengeQuestions({ kind: 'chronology', seed: 8, length: 1 }, media)
    expect(question.kind).toBe('chronology')
    if (question.kind !== 'chronology') return
    expect(question.entries).toHaveLength(4)
    expect(new Set(question.entries.map((entry) => entry.releaseDate.slice(0, 4))).size).toBe(4)
    const dates = question.validKeys.map((key) => question.entries.find((entry) => entry.key === key)!.releaseDate)
    expect(dates).toEqual([...dates].sort())
    expect(question.connectionLabel).toBe('Shared company: Shared Studio')
  })

  it('prefers franchise chronology, creates multiple unique sets, and rejects same-year ordering', () => {
    const franchise = Array.from({ length: 6 }, (_, index): ChallengeMediaCandidate => ({
      ...media[0],
      id: 200 + index,
      title: `Franchise ${index + 1}`,
      releaseDate: index === 5 ? '2004-09-01' : `${2000 + index}-01-01`,
      relations: ['franchise-a'],
      studios: [{ id: 9, name: 'Fallback Studio', role: 'production' }],
      people: []
    }))
    const questions = buildChallengeQuestions(
      { kind: 'chronology', seed: 31, length: 5 },
      franchise
    )
    expect(questions.length).toBeGreaterThan(1)
    expect(questions.every((question) => question.kind === 'chronology')).toBe(true)
    expect(questions.every((question) =>
      question.kind === 'chronology' && question.connectionLabel === 'Same franchise'
    )).toBe(true)
    const sets = questions.map((question) => question.choices.map((choice) => choice.key).sort().join(':'))
    expect(new Set(sets).size).toBe(sets.length)
    for (const question of questions) {
      if (question.kind !== 'chronology') continue
      expect(new Set(question.entries.map((entry) => entry.releaseDate.slice(0, 4))).size).toBe(4)
    }
  })

  it('requires covers for every chronology entry', () => {
    const missingCover = media.slice(0, 4).map((item, index) => ({
      ...item,
      coverPath: index === 0 ? null : item.coverPath
    }))
    expect(
      buildChallengeQuestions({ kind: 'chronology', seed: 8, length: 2 }, missingCover)
    ).toEqual([])
  })

  it('rejects higher/lower ties before dealing', () => {
    const tied = media.map((item) => ({ ...item, totalUnits: 12 }))
    const questions = buildChallengeQuestions({ kind: 'higherLower', seed: 2, length: 20, options: { higherLowerMetric: 'totalUnits' } }, tied)
    expect(questions).toHaveLength(0)
  })

  it('keeps higher/lower inside the selected category with covers and explicit copy', () => {
    const mixed = [
      ...media.slice(0, 4),
      ...media.slice(4).map((item, index) => ({
        ...item,
        id: 100 + index,
        mediaType: 'movie',
        title: `Movie ${index + 1}`,
        totalUnits: 90 + index * 10
      })),
      { ...media[0], id: 999, mediaType: 'movie', title: 'No cover', coverPath: null, totalUnits: 200 }
    ]
    const questions = buildChallengeQuestions({
      kind: 'higherLower',
      seed: 91,
      length: 8,
      options: {
        higherLowerMetric: 'totalUnits',
        higherLowerMediaType: 'movie',
        higherLowerIndependent: true
      }
    }, mixed)
    expect(questions).toHaveLength(8)
    for (const question of questions) {
      expect(question.kind).toBe('higherLower')
      if (question.kind !== 'higherLower') continue
      expect(question.mediaType).toBe('movie')
      expect(question.prompt).toContain('longer or shorter')
      expect(question.reference.imagePath).toBeTruthy()
      expect(question.challenger.imagePath).toBeTruthy()
      expect(question.reference.key).not.toBe(question.challenger.key)
      expect(question.referenceValue).not.toBe(question.challengerValue)
    }
  })

  it('continues a solo chain from the requested reference without repeating recent challengers', () => {
    const questions = buildChallengeQuestions({
      kind: 'higherLower',
      seed: 18,
      length: 1,
      options: {
        higherLowerMetric: 'releaseDate',
        higherLowerMediaType: 'anime',
        higherLowerReferenceId: 3,
        higherLowerExcludeIds: [1, 2]
      }
    }, media)
    expect(questions).toHaveLength(1)
    const question = questions[0]
    expect(question.kind).toBe('higherLower')
    if (question.kind !== 'higherLower') return
    expect(question.reference.key).toBe('3')
    expect(['1', '2', '3']).not.toContain(question.challenger.key)
  })

  it('keeps image-reveal distractors within one media type and always deals four', () => {
    const mixed = media.map((item, index) => ({
      ...item,
      mediaType: index < 4 ? 'anime' : 'movie'
    }))
    const questions = buildChallengeQuestions(
      { kind: 'imageReveal', seed: 19, length: 8, options: { imageSource: 'covers' } },
      mixed
    )
    expect(questions).toHaveLength(8)
    for (const question of questions) {
      expect(question.choices).toHaveLength(4)
      const answer = mixed.find((item) => question.validKeys.includes(String(item.id)))!
      expect(
        question.choices.every((choice) =>
          mixed.find((item) => item.id === Number(choice.key))?.mediaType === answer.mediaType
        )
      ).toBe(true)
    }
  })

  it('does not create image questions for a type with fewer than four title options', () => {
    const tooSmall = media.slice(0, 3)
    expect(
      buildChallengeQuestions(
        { kind: 'imageReveal', seed: 2, length: 3, options: { imageSource: 'covers' } },
        tooSmall
      )
    ).toEqual([])
  })

  it('builds Connections only from top-ten movie and TV actors', () => {
    const title = (
      id: number,
      mediaType: string,
      people: ChallengeMediaCandidate['people']
    ): ChallengeMediaCandidate => ({
      ...media[0],
      id,
      title: `Screen ${id}`,
      mediaType,
      coverPath: `media/screen-${id}.jpg`,
      people
    })
    const actor = (
      id: number,
      characterName: string,
      billingOrder: number,
      role = 'actor'
    ) => ({ id, name: `Actor ${id}`, role, characterName, billingOrder })
    const pool = [
      title(101, 'movie', [actor(1, 'Movie Lead', 0), actor(2, 'Movie Extra', 10)]),
      title(102, 'tv', [actor(1, 'TV Lead', 9), actor(2, 'TV Extra', 20)]),
      title(103, 'movie', [actor(3, 'Decoy A', 0)]),
      title(104, 'tv', [actor(4, 'Decoy B', 1)]),
      title(105, 'movie', [actor(5, 'Decoy C', 2)]),
      title(106, 'anime', [actor(1, 'Anime Role', 0)]),
      title(107, 'movie', [actor(6, 'Director', 0, 'director')])
    ]

    const questions = buildChallengeQuestions(
      { kind: 'connections', seed: 17, length: 5 },
      pool
    )
    expect(questions).toHaveLength(1)
    const [question] = questions
    expect(question.kind).toBe('connections')
    if (question.kind !== 'connections') return
    expect([question.titleA.key, question.titleB.key].sort()).toEqual(['101', '102'])
    expect(question.choices).toHaveLength(4)
    expect(question.validKeys).toEqual(['1'])
    expect(question.choices.map((choice) => choice.key)).not.toContain('2')
    expect(question.reveal).toContain('Screen 101: Movie Lead')
    expect(question.reveal).toContain('Screen 102: TV Lead')
    expect(question.reveal).not.toContain('Anime Role')
  })

  it('deduplicates title pairs and excludes every alternate valid actor from distractors', () => {
    const make = (id: number, actorIds: number[]): ChallengeMediaCandidate => ({
      ...media[0],
      id,
      title: `Film ${id}`,
      mediaType: id % 2 ? 'movie' : 'tv',
      people: actorIds.map((actorId) => ({
        id: actorId,
        name: `Actor ${actorId}`,
        role: 'actor',
        characterName: `Role ${actorId}-${id}`,
        billingOrder: actorId - 1
      }))
    })
    const pool = [make(1, [1, 2]), make(2, [1, 2]), make(3, [3]), make(4, [4]), make(5, [5])]
    const questions = buildChallengeQuestions({ kind: 'connections', seed: 5, length: 10 }, pool)
    expect(questions).toHaveLength(1)
    const [question] = questions
    expect(question.kind).toBe('connections')
    if (question.kind !== 'connections') return
    expect(new Set(question.validKeys)).toEqual(new Set(['1', '2']))
    expect(question.choices.filter((choice) => question.validKeys.includes(choice.key))).toHaveLength(1)
    expect(question.choices).toHaveLength(4)
  })

  it('mixes directors with actor distractors instead of revealing the role category', () => {
    const make = (
      id: number,
      people: ChallengeMediaCandidate['people']
    ): ChallengeMediaCandidate => ({
      ...media[0],
      id,
      title: `Movie ${id}`,
      mediaType: 'movie',
      people
    })
    const director = { id: 20, name: 'Shared Director', role: 'director' }
    const actor = (id: number) => ({
      id,
      name: `Actor ${id}`,
      role: 'actor',
      characterName: `Role ${id}`,
      billingOrder: 0
    })
    const questions = buildChallengeQuestions(
      { kind: 'connections', seed: 3, length: 1 },
      [make(20, [director]), make(21, [director]), make(22, [actor(21)]), make(23, [actor(22)]), make(24, [actor(23)])]
    )
    expect(questions).toHaveLength(1)
    const [question] = questions
    expect(question.kind).toBe('connections')
    if (question.kind !== 'connections') return
    expect(question.validKeys).toEqual(['20'])
    expect(new Set(question.choices.map((choice) => choice.key))).toEqual(
      new Set(['20', '21', '22', '23'])
    )
    expect(question.reveal).toContain('Movie 20: director')
    expect(question.reveal).toContain('Movie 21: director')
  })
})
