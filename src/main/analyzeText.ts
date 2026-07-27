import { setImmediate as yieldToLoop } from 'timers/promises'
import { getDictDb } from './dict/dictDb'
import { tokenize } from './tokenizer'
import { isLearnableWord } from './seriesText'
import { glossFor } from './prepDeck'
import * as coverageRepo from './repos/coverageRepo'
import type { JpAnalyzedToken, JpTextAnalysis, JpTierCounts, JpWordTier } from '@shared/types'

// "How much of THIS can I read?" for arbitrary pasted text — the per-series
// comprehension score applied to anything: a tweet, a news article, a chapter
// someone linked. Tokenize, tier every word against jp_card, and hand back
// everything the page needs in one round trip (the existing japanese:tokenize
// channel is sized for OCR blocks and knows nothing about what you've learned).

// A full light-novel volume is ~150-300k characters; above this the tokenizer
// cost stops being something you can wait on inside one IPC reply.
const MAX_CHARS = 200_000
const GLOSS_LIMIT = 100
// Nobody mines the 500th unknown word, and a light-novel paste yields tens of
// thousands — sending them all would cross IPC and mount as DOM rows for no use.
const UNKNOWN_LIMIT = 500

const EMPTY_TIERS = (): Record<JpWordTier, JpTierCounts> => ({
  known: { uniqueCount: 0, tokenCount: 0 },
  learning: { uniqueCount: 0, tokenCount: 0 },
  unstarted: { uniqueCount: 0, tokenCount: 0 },
  unknown: { uniqueCount: 0, tokenCount: 0 }
})

export async function analyzeText(text: string): Promise<JpTextAnalysis> {
  const empty: JpTextAnalysis = {
    paragraphs: [],
    stats: { tokenCount: 0, uniqueWords: 0, tiers: EMPTY_TIERS() },
    unknown: []
  }
  if (!text || !text.trim()) return empty
  if (text.length > MAX_CHARS) {
    throw new Error(`Text too long — paste up to ${MAX_CHARS.toLocaleString()} characters`)
  }

  // Tokenize paragraph by paragraph, yielding between them: kuromoji is
  // synchronous, so this is what keeps a big paste from freezing the app.
  const rawParagraphs = text.split(/\n+/).filter((p) => p.trim())
  const tokenized: { surface: string; base: string; countable: boolean }[][] = []
  const counts = new Map<string, number>()
  for (const para of rawParagraphs) {
    const toks = await tokenize(para)
    const row = toks.map((t) => {
      const base = t.base || t.surface
      const countable = t.wordLike && isLearnableWord(base)
      if (countable) counts.set(base, (counts.get(base) ?? 0) + 1)
      return { surface: t.surface, base, countable }
    })
    tokenized.push(row)
    await yieldToLoop()
  }

  const words = [...counts.keys()]
  const tiers = coverageRepo.tiersForWords(words)

  const paragraphs: JpAnalyzedToken[][] = tokenized.map((row) =>
    row.map((t) => ({
      surface: t.surface,
      base: t.base,
      tier: t.countable ? tiers.get(t.base) ?? 'unknown' : ('nonword' as const)
    }))
  )

  const stats = EMPTY_TIERS()
  let tokenCount = 0
  for (const [word, count] of counts) {
    const tier = tiers.get(word) ?? 'unknown'
    stats[tier].uniqueCount += 1
    stats[tier].tokenCount += count
    tokenCount += count
  }

  // Gloss only the head of the unknown list — the same per-word dictionary cost
  // a prep deck already pays, and nobody mines the 300th unknown word.
  const unknownWords = [...counts.entries()]
    .filter(([w]) => (tiers.get(w) ?? 'unknown') === 'unknown')
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  let dictDb: ReturnType<typeof getDictDb> | null = null
  try {
    dictDb = getDictDb()
  } catch {
    dictDb = null // no dictionary installed: ranks/glosses stay null, never throw
  }
  const unknown = unknownWords.slice(0, UNKNOWN_LIMIT).map(([word, count], i) => {
    let reading: string | null = null
    let gloss: string | null = null
    if (dictDb && i < GLOSS_LIMIT) {
      try {
        const g = glossFor(dictDb, word)
        if (g) {
          reading = g.reading && g.reading !== word ? g.reading : null
          gloss = g.gloss
        }
      } catch {
        // a missing dictionary must never fail the whole analysis
      }
    }
    return { word, count, reading, gloss }
  })

  return {
    paragraphs,
    stats: { tokenCount, uniqueWords: counts.size, tiers: stats },
    unknown
  }
}
