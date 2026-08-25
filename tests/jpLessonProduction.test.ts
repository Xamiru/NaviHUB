import { describe, expect, it } from 'vitest'
import { buildLessonProductionPrompts } from '../src/shared/japanese/lessonProduction'
import type { JpQuizItem } from '../src/shared/types'

const card = (overrides: Partial<JpQuizItem>): JpQuizItem => ({
  front: '食べる', back: 'eat', reading: 'たべる',
  exampleJp: null, exampleEn: null, exampleReading: null,
  ...overrides
} as JpQuizItem)

describe('buildLessonProductionPrompts', () => {
  it('prefers a vetted example sentence over isolated vocabulary', () => {
    const out = buildLessonProductionPrompts([
      card({ exampleJp: '朝ご飯を食べる。', exampleEn: 'I eat breakfast.', exampleReading: 'あさごはんをたべる。' })
    ], 'vocab')
    expect(out[0]).toMatchObject({ promptEn: 'I eat breakfast.', modelJp: '朝ご飯を食べる。' })
  })

  it('skips generated grammar clozes because they are not model answers', () => {
    expect(buildLessonProductionPrompts([card({ front: '彼は___。', back: 'ている — ongoing action' })], 'grammar')).toEqual([])
  })

  it('does not duplicate the dedicated kanji-writing drill', () => {
    expect(buildLessonProductionPrompts([card({})], 'kanji')).toEqual([])
  })
})
