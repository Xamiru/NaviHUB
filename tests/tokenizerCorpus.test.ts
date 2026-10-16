import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'

vi.mock('electron', () => ({ app: { getPath: () => '/tmp' } }))

import { kuromojiBackend, tokenize } from '../src/main/tokenizer'
import type { JpToken } from '../src/shared/types'

// The manga/VN corpus (tests/fixtures/jpTokenizerCorpus.json): for each line,
// the content words a learner would mine from it. Recall = share of those found
// among the tokens' dictionary forms. This pins the casual-speech layer above
// raw kuromoji and above a floor, so a regression shows up as a number.
const corpus = JSON.parse(
  readFileSync(fileURLToPath(new URL('./fixtures/jpTokenizerCorpus.json', import.meta.url)), 'utf8')
) as { lines: [string, string, [string, string][]][] }

const hira = (s: string): string =>
  s.replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60)).replace(/ー/g, '')

// A word counts as found when a token's dictionary form is it (written or in
// kana), or — for an uninflected token — its reading is; an honorific お/ご on
// the token (お待ち, ご存じ) does not hide the word.
function found(tokens: JpToken[], [written, kana]: [string, string]): boolean {
  const k = hira(kana)
  return tokens.some((t) => {
    const bases = [t.base, t.base.replace(/^[おご御]/, '')]
    if (bases.some((b) => b === written || hira(b) === k)) return true
    return t.base === t.surface && !!t.reading && hira(t.reading).replace(/^[おご]/, '') === k
  })
}

async function score(run: (text: string) => Promise<JpToken[]>) {
  let hit = 0
  let total = 0
  const misses: string[] = []
  const byCategory: Record<string, { hit: number; total: number }> = {}
  for (const [cat, text, expected] of corpus.lines) {
    const tokens = await run(text)
    const c = (byCategory[cat] ??= { hit: 0, total: 0 })
    for (const word of expected) {
      total++
      c.total++
      if (found(tokens, word)) {
        hit++
        c.hit++
      } else misses.push(`${text} → ${word[0]} (${tokens.map((t) => `${t.surface}/${t.base}`).join(' ')})`)
    }
  }
  return { recall: hit / total, hit, total, misses, byCategory }
}

describe('tokenizer corpus', () => {
  it('the casual-speech layer beats raw kuromoji and keeps its floor', async () => {
    const raw = await score((t) => kuromojiBackend.tokenize(t))
    const casual = await score(tokenize)
    if (process.env.TOKENIZER_REPORT) {
      console.log(JSON.stringify({ raw: { ...raw, misses: raw.misses.length }, casual }, null, 1))
    }
    expect(casual.recall).toBeGreaterThanOrEqual(raw.recall)
    expect(casual.recall).toBeGreaterThan(0.9) // 91.2% on 2026-10-16
  }, 30_000)
})
