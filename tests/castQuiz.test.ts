import { describe, expect, it } from 'vitest'
import { balancedCastDeal, buildCastQuizQuestions } from '../src/shared/castQuiz'
import { seededRng } from '../src/shared/quizCore'
import type { QuizCastItem } from '../src/shared/types'

function item(
  personId: number,
  mediaId: number,
  validMediaIds: number[] = [mediaId]
): QuizCastItem {
  return {
    personId,
    personName: `Actor ${personId}`,
    photoPath: `people/${personId}.webp`,
    mediaId,
    mediaTitle: `Title ${mediaId}`,
    mediaType: mediaId % 2 ? 'movie' : 'tv',
    coverPath: `media/${mediaId}.webp`,
    year: 2000 + mediaId,
    genres: ['Drama'],
    billingOrder: 0,
    validMediaIds
  }
}

describe('cast quiz questions', () => {
  const pool = [
    item(1, 1, [1, 2]),
    item(1, 2, [1, 2]),
    item(2, 2),
    item(3, 3),
    item(4, 4),
    item(5, 5),
    item(6, 6)
  ]

  it('is seed-reproducible with four unique options and exactly one displayed match', () => {
    const a = buildCastQuizQuestions(pool, 5, 42)
    const b = buildCastQuizQuestions(pool, 5, 42)
    expect(a).toEqual(b)
    expect(a).toHaveLength(5)
    for (const question of a) {
      const optionIds = question.options.map((option) => option.mediaId)
      expect(new Set(optionIds).size).toBe(4)
      expect(optionIds.filter((id) => question.actor.validMediaIds.includes(id))).toEqual([
        question.actor.mediaId
      ])
    }
  })

  it('balances both actors and titles while alternatives remain', () => {
    const dealt = balancedCastDeal(pool, 4, seededRng(7))
    expect(new Set(dealt.map((value) => value.personId)).size).toBe(4)
    expect(new Set(dealt.map((value) => value.mediaId)).size).toBe(4)
  })

  it('drops an actor-title seed that cannot produce three factual distractors', () => {
    const prolific = item(10, 1, [1, 2, 3, 4])
    const questions = buildCastQuizQuestions(
      [prolific, item(2, 2), item(3, 3), item(4, 4)],
      3,
      1
    )
    expect(questions.every((question) => question.actor.personId !== 10)).toBe(true)
  })
})
