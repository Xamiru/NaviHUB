import { describe, expect, it } from 'vitest'
import type { MediaType, QuizSynopsisItem } from '../src/shared/types'
import {
  buildSynopsisQuizQuestions,
  countBuildableSynopsisSources,
  isLikelyFirstEntry,
  titleAliasVariants
} from '../src/shared/synopsisQuiz'

function item(
  mediaId: number,
  mediaType: MediaType,
  title = `${mediaType} ${mediaId}`,
  extra: Partial<QuizSynopsisItem> = {}
): QuizSynopsisItem {
  return {
    mediaId,
    mediaType,
    title,
    titleOriginal: null,
    coverPath: `media/${mediaId}.webp`,
    synopsis: `${title} follows Alice through a dangerous new world. ${'A long complete description. '.repeat(20)}`,
    status: 'Completed',
    year: 2010 + mediaId,
    genres: mediaId % 2 ? ['Drama'] : ['Action'],
    relationAliases: [],
    characterNames: ['Alice'],
    hasEarlierRelation: false,
    ...extra
  }
}

describe('synopsis quiz builder', () => {
  const pool = [
    ...Array.from({ length: 6 }, (_, i) => item(i + 1, 'anime')),
    ...Array.from({ length: 6 }, (_, i) => item(i + 20, 'movie')),
    ...Array.from({ length: 3 }, (_, i) => item(i + 40, 'game'))
  ]

  it('is reproducible and balances buildable media types', () => {
    const first = buildSynopsisQuizQuestions(pool, 8, 1234)
    const again = buildSynopsisQuizQuestions(pool, 8, 1234)
    expect(again).toEqual(first)
    const counts = first.reduce<Record<string, number>>((out, question) => {
      out[question.answer.mediaType] = (out[question.answer.mediaType] ?? 0) + 1
      return out
    }, {})
    expect(counts).toEqual({ anime: 4, movie: 4 })
  })

  it('uses four unique options from exactly the answer media type', () => {
    for (const question of buildSynopsisQuizQuestions(pool, 10, 77)) {
      expect(question.options).toHaveLength(4)
      expect(new Set(question.options.map((option) => option.mediaId)).size).toBe(4)
      expect(new Set(question.options.map((option) => option.mediaType))).toEqual(
        new Set([question.answer.mediaType])
      )
      expect(question.validKeys).toEqual([`media-${question.answer.mediaId}`])
    }
  })

  it('counts only sources whose media type can supply four options', () => {
    expect(countBuildableSynopsisSources(pool)).toBe(12)
  })
})

describe('synopsis first-entry safety', () => {
  const first = item(1, 'anime', 'Code Geass')

  it('rejects known relations and common sequel markers', () => {
    expect(isLikelyFirstEntry({ ...first, hasEarlierRelation: true })).toBe(false)
    for (const title of ['Code Geass R2', 'Show Season 2', 'Show 2nd Season', 'Film Part 2', 'Film II']) {
      expect(isLikelyFirstEntry({ ...first, title })).toBe(false)
    }
  })

  it('does not treat numbers embedded in original titles as sequel markers', () => {
    expect(isLikelyFirstEntry({ ...first, title: '86' })).toBe(true)
    expect(isLikelyFirstEntry({ ...first, title: 'Mob Psycho 100' })).toBe(true)
  })

  it('derives franchise aliases from sequel and subtitle titles', () => {
    expect(titleAliasVariants(['Code Geass R2', 'Code Geass: Lelouch of the Rebellion'])).toEqual(
      expect.arrayContaining(['Code Geass R2', 'Code Geass', 'Code Geass: Lelouch of the Rebellion'])
    )
    expect(titleAliasVariants(['Steins;Gate: The Movie'])).toContain('Steins;Gate')
  })
})
