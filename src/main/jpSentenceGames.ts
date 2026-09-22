import { getDictDb } from './dict/dictDb'
import { sampleSentences } from './dict/sentences'
import { tokenize } from './tokenizer'
import {
  blankAt,
  chunkTokens,
  contextCandidates,
  eligibleParticles,
  particleOptions,
  stripFinalPunct
} from '@shared/japanese/sentenceGames'
import { flattenGlossary } from '@shared/dictContent'
import { shuffle } from '@shared/shuffle'
import type {
  ContextReadingItem,
  GlossaryItem,
  ParticleQuizItem,
  ScrambleQuizItem,
  SentenceGamePoolRequest
} from '@shared/types'

// Pools for /japanese/sentences, generated from the sentence bank + kuromoji
// (kept out of jpDrills.ts, which is long enough). Each samples ~4× the asked
// number of short sentences, tokenizes them, keeps the ones that yield a
// question and stops at `limit`. [] on any failure — no bank, tokenizer down —
// and the page shows its EmptyState. The JMdict check below is direct SQL so
// this pool accepts only exact dictionary forms.

const DEFAULT_MAX = 30
const MIN_CHARS = 6

async function candidates(req: SentenceGamePoolRequest, factor = 4) {
  const rows = sampleSentences({
    minChars: MIN_CHARS,
    maxChars: req.maxChars ?? DEFAULT_MAX,
    limit: Math.max(8, req.limit * factor)
  })
  const out = []
  for (const s of rows) {
    const tokens = await tokenize(s.jp)
    if (tokens.length === 0) continue
    out.push({ s, tokens })
  }
  return out
}

export async function particlePool(req: SentenceGamePoolRequest): Promise<ParticleQuizItem[]> {
  const out: ParticleQuizItem[] = []
  for (const { s, tokens } of await candidates(req)) {
    if (out.length >= req.limit) break
    const idx = eligibleParticles(tokens)
    if (idx.length === 0) continue
    const i = idx[Math.floor(Math.random() * idx.length)] // uniform, so は isn't always chosen
    const { blanked, answer } = blankAt(tokens, i)
    out.push({
      jp: s.jp,
      en: s.en,
      blanked,
      answer,
      options: particleOptions(answer),
      audioPath: s.audioPath
    })
  }
  return out
}

export async function scramblePool(req: SentenceGamePoolRequest): Promise<ScrambleQuizItem[]> {
  const out: ScrambleQuizItem[] = []
  for (const { s, tokens } of await candidates(req)) {
    if (out.length >= req.limit) break
    const { chunks, punct } = stripFinalPunct(chunkTokens(tokens))
    if (chunks.length < 3 || chunks.length > 6) continue
    if (new Set(chunks).size < 3) continue
    out.push({ jp: s.jp, en: s.en, chunks, punct, audioPath: s.audioPath })
  }
  return out
}

// JMdict readings for an expression (any dict with priority >= 0, so JMnedict
// names never vouch for a reading). Empty when the packs are absent.
function dictReadings(expression: string): { readings: string[]; gloss: string | null } {
  try {
    const rows = getDictDb()
      .prepare(
        `SELECT DISTINCT t.reading, t.glossary FROM term t
         JOIN dict d ON d.id = t.dict_id
         WHERE d.priority >= 0 AND t.expression = ? AND t.reading != ''
         ORDER BY t.score DESC, t.id ASC LIMIT 12`
      )
      .all(expression) as { reading: string; glossary: string }[]
    const readings = [...new Set(rows.map((r) => r.reading))]
    let gloss: string | null = null
    if (rows[0]) {
      try {
        gloss = flattenGlossary(JSON.parse(rows[0].glossary) as GlossaryItem[], 80) || null
      } catch {
        gloss = null
      }
    }
    return { readings, gloss }
  } catch {
    return { readings: [], gloss: null }
  }
}

export async function contextReadingPool(req: SentenceGamePoolRequest): Promise<ContextReadingItem[]> {
  const out: ContextReadingItem[] = []
  for (const { s, tokens } of await candidates(req)) {
    if (out.length >= req.limit) break
    const cands = shuffle(contextCandidates(tokens))
    for (const c of cands) {
      const { readings, gloss } = dictReadings(c.surface)
      // The tokenizer's reading must be one JMdict attests for this exact
      // expression — a mismatch means kuromoji guessed, so skip the word.
      if (!readings.includes(c.reading)) continue
      out.push({
        jp: s.jp,
        en: s.en,
        target: { surface: c.surface, start: c.start, end: c.end },
        readings: [c.reading, ...readings.filter((r) => r !== c.reading)],
        gloss,
        audioPath: s.audioPath
      })
      break
    }
  }
  return out
}
