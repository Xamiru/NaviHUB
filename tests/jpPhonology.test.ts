import { describe, expect, it } from 'vitest'
import { PHONOLOGY_UNITS, phonologyUnit } from '../src/shared/japanese/phonology'

describe('Japanese phonology foundation', () => {
  it('covers the sound-system risks a kana-only drill cannot teach', () => {
    expect(PHONOLOGY_UNITS.map((unit) => unit.id)).toEqual([
      'mora',
      'long-vowels',
      'sokuon',
      'moraic-n',
      'devoicing',
      'particles',
      'pitch',
      'connected'
    ])
  })

  it('keeps every unit practiceable and self-explanatory', () => {
    for (const unit of PHONOLOGY_UNITS) {
      expect(unit.examples.length).toBeGreaterThanOrEqual(3)
      expect(unit.questions.length).toBeGreaterThanOrEqual(3)
      expect(unit.practice.length).toBeGreaterThan(20)
      for (const question of unit.questions) {
        expect(question.options).toHaveLength(4)
        expect(question.options[question.correct]).toBeTruthy()
        expect(question.explain.length).toBeGreaterThan(5)
      }
    }
    expect(phonologyUnit('sokuon')?.title).toContain('っ')
  })
})
