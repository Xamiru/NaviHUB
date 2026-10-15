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
  // '#' keeps the number from reading as a sequel number (one franchise each).
  title = `${mediaType} #${mediaId}`,
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

describe('synopsis cleanup and franchise options', () => {
  it('strips source credits, rewrite credits and trailing notes from the excerpt', () => {
    const noisy = item(1, 'anime', 'Quiet Story', {
      synopsis:
        'A girl moves to a seaside town and joins the radio club. (Source: Crunchyroll)\n\n[Written by MAL Rewrite]\n\nNote: Episode 1 has an airtime of 48 minutes.'
    })
    const pool = [noisy, item(2, 'anime'), item(3, 'anime'), item(4, 'anime')]
    const question = buildSynopsisQuizQuestions(pool, 4, 5).find((q) => q.answer.mediaId === 1)!
    expect(question.excerpt).toBe('A girl moves to a seaside town and joins the radio club.')
  })

  it('never offers another entry of the answer franchise, nor two from one franchise', () => {
    const pool = [
      item(1, 'anime', 'Titan Saga'),
      item(2, 'anime', 'Titan Saga Season 2'),
      item(3, 'anime', 'Titan Saga: The Final'),
      item(4, 'anime', 'Spin-off', { relationAliases: ['Titan Saga'] }),
      item(5, 'anime', 'Other Show'),
      item(6, 'anime', 'Other Show II'),
      item(7, 'anime', 'Third Show'),
      item(8, 'anime', 'Fourth Show')
    ]
    for (let seed = 0; seed < 20; seed++) {
      for (const question of buildSynopsisQuizQuestions(pool, 4, seed)) {
        if (question.answer.mediaId !== 1) continue
        const titles = question.options.map((option) => option.title)
        expect(titles).not.toContain('Titan Saga Season 2')
        expect(titles).not.toContain('Titan Saga: The Final')
        expect(titles).not.toContain('Spin-off')
        expect(titles.filter((title) => title.startsWith('Other Show')).length).toBeLessThanOrEqual(1)
      }
    }
  })
})
