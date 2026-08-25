import { describe, expect, it } from 'vitest'
import { redactQuizAliases, synopsisExcerpt } from '../src/shared/quizText'

describe('quiz synopsis text', () => {
  it('redacts title aliases case-insensitively', () => {
    expect(redactQuizAliases('Frieren follows FRIEREN north.', ['Frieren'])).toBe(
      '[title omitted] follows [title omitted] north.'
    )
  })

  it('prefers a complete sentence near the excerpt boundary', () => {
    const first = `${'A'.repeat(190)}. `
    const result = synopsisExcerpt(`${first}${'B'.repeat(300)}`, [], 320)
    expect(result).toBe(first.trim())
  })
})
