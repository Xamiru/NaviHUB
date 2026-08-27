import { describe, expect, it } from 'vitest'
import { redactQuizAliases, redactQuizNames, synopsisExcerpt } from '../src/shared/quizText'

describe('quiz synopsis text', () => {
  it('redacts title aliases case-insensitively', () => {
    expect(redactQuizAliases('Frieren follows FRIEREN north.', ['Frieren'])).toBe(
      '[title omitted] follows [title omitted] north.'
    )
  })

  it('redacts short standalone titles without changing fragments inside words', () => {
    expect(redactQuizAliases('It is there with Her, Up, and L.', ['It', 'Her', 'Up', 'L'])).toBe(
      '[title omitted] is there with [title omitted], [title omitted], and [title omitted].'
    )
  })

  it('does not erase the one-letter English articles', () => {
    expect(redactQuizAliases('A hero and I remain.', ['A', 'I'])).toBe('A hero and I remain.')
  })

  it('redacts CJK aliases even when followed by particles', () => {
    expect(redactQuizAliases('葬送のフリーレンは旅を続ける。', ['葬送のフリーレン'])).toBe(
      '[title omitted]は旅を続ける。'
    )
  })

  it('redacts every available character-name alias', () => {
    expect(redactQuizNames('Lelouch meets ルルーシュ.', ['Lelouch', 'ルルーシュ'])).toBe(
      '[name omitted] meets [name omitted].'
    )
  })

  it('prefers a complete sentence near the excerpt boundary', () => {
    const first = `${'A'.repeat(190)}. `
    const result = synopsisExcerpt(`${first}${'B'.repeat(300)}`, [], 320)
    expect(result).toBe(first.trim())
  })
})
