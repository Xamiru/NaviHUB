import { describe, expect, it } from 'vitest'
import type { QuizMangaPanelItem } from '../src/shared/types'
import { buildMangaPanelQuestions } from '../src/shared/mangaPanelQuiz'

function item(mediaId: number): QuizMangaPanelItem {
  return {
    mediaId,
    title: `Manga ${mediaId}`,
    coverPath: `media/${mediaId}.webp`,
    year: 2000 + mediaId,
    genres: mediaId % 2 ? ['Drama'] : ['Action'],
    pageRelPath: `manga/${mediaId}/page.webp`
  }
}

describe('manga panel question builder', () => {
  const pool = Array.from({ length: 8 }, (_, index) => item(index + 1))

  it('is reproducible and gives every panel four distinct title options', () => {
    const first = buildMangaPanelQuestions(pool, 42)
    expect(buildMangaPanelQuestions(pool, 42)).toEqual(first)
    expect(first).toHaveLength(pool.length)
    for (const question of first) {
      expect(question.options).toHaveLength(4)
      expect(new Set(question.options.map((option) => option.mediaId)).size).toBe(4)
      expect(question.validKeys).toEqual([`media-${question.answer.mediaId}`])
    }
  })

  it('refuses to construct unsolvable questions below four distinct manga', () => {
    expect(buildMangaPanelQuestions(pool.slice(0, 3), 42)).toEqual([])
  })
})
