import { describe, expect, it } from 'vitest'
import { tokenize } from '../src/main/tokenizer'

// One real end-to-end run: the ~1s dictionary load is acceptable in the suite
// and proves the dict files resolve from node_modules.
describe('tokenizer', () => {
  it('returns [] for blank input', async () => {
    expect(await tokenize('')).toEqual([])
    expect(await tokenize('   ')).toEqual([])
  })

  it('tokenizes with dictionary base forms and word flags', async () => {
    const tokens = await tokenize('また食べていたのか')
    // conjugated verb resolves to its dictionary form
    const taberu = tokens.find((t) => t.base === '食べる')
    expect(taberu).toBeDefined()
    expect(taberu!.reading).toBe('たべ')
    // particles are flagged non-words
    const ka = tokens.find((t) => t.surface === 'か')
    expect(ka).toBeDefined()
    expect(ka!.wordLike).toBe(false)
    // readings come back as hiragana
    for (const t of tokens) {
      if (t.reading) expect(t.reading).not.toMatch(/[ァ-ヶ]/)
    }
  }, 30_000)
})
