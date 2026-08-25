import { setImmediate as yieldToLoop } from 'timers/promises'
import { getDictDb } from './dict/dictDb'
import { tokenize } from './tokenizer'
import { knownWordSet } from './repos/coverageRepo'
import { classifySentence, coarseUnknowns } from './jpFeed'
import type { JpListeningItem, JpListeningRequest, JpToken } from '@shared/types'

// Guided listening uses the existing Tatoeba sentence-audio pack, but samples
// against the learner's actual known-word set instead of drawing arbitrary
// sentences like dictation. The SQL randomizes candidates; the exact kuromoji
// pass then keeps either all-known or exactly-one-unknown sentences.

const CANDIDATE_CAP = 2000
const DEFAULT_MAX_CHARS = 45

export interface ListeningRow {
  jp: string
  en: string
  keywords: string
  audioPath: string
  attribution: string | null
}

export interface ListeningDeps {
  known: Set<string>
  tokenize(text: string): Promise<JpToken[]>
}

export async function buildListeningPool(
  req: JpListeningRequest,
  rows: ListeningRow[],
  deps: ListeningDeps
): Promise<JpListeningItem[]> {
  const limit = Math.max(1, Math.min(30, req.limit))
  const wantedUnknowns = req.mode === 'known' ? 0 : 1
  const band: [number, number] = wantedUnknowns === 0 ? [0, 2] : [1, 3]
  const out: JpListeningItem[] = []

  let processed = 0
  for (const row of rows) {
    if (++processed % 100 === 0) await yieldToLoop()
    const coarse = coarseUnknowns(row.keywords, deps.known)
    if (coarse < band[0] || coarse > band[1]) continue
    const tokens = await deps.tokenize(row.jp)
    if (tokens.length === 0) continue
    const { unknowns, surfaces } = classifySentence(tokens, deps.known)
    if (unknowns.length !== wantedUnknowns) continue
    const unknownWord = unknowns[0] ?? null
    out.push({
      jp: row.jp,
      en: row.en,
      audioPath: row.audioPath,
      attribution: row.attribution,
      unknownWord,
      unknownSurface: unknownWord ? (surfaces.get(unknownWord) ?? unknownWord) : null
    })
    if (out.length >= limit) break
  }
  return out
}

function candidateRows(maxChars: number): ListeningRow[] {
  try {
    const rows = getDictDb()
      .prepare(
        `SELECT sa.jp, sa.path, sa.attribution, sa.license,
                (SELECT s.en FROM sentence s JOIN sentence_bank b ON b.id = s.bank_id
                 WHERE s.jp = sa.jp LIMIT 1) AS en,
                (SELECT f.keywords FROM sentence_fts f JOIN sentence s ON s.id = f.sentence_id
                 JOIN sentence_bank b ON b.id = s.bank_id
                 WHERE s.jp = sa.jp LIMIT 1) AS keywords
         FROM sentence_audio sa JOIN audio_bank ab ON ab.id = sa.bank_id
         WHERE length(sa.jp) <= ?
         ORDER BY RANDOM() LIMIT ?`
      )
      .all(maxChars, CANDIDATE_CAP) as {
      jp: string
      path: string
      attribution: string | null
      license: string
      en: string | null
      keywords: string | null
    }[]
    return rows
      .filter((r): r is typeof r & { en: string } => !!r.en)
      .map((r) => ({
        jp: r.jp,
        en: r.en,
        keywords: r.keywords ?? '',
        audioPath: r.path,
        attribution: r.attribution ? `${r.attribution} (${r.license})` : r.license
      }))
  } catch {
    return []
  }
}

export function listeningPool(req: JpListeningRequest): Promise<JpListeningItem[]> {
  const maxChars = Math.max(10, Math.min(80, req.maxChars ?? DEFAULT_MAX_CHARS))
  return buildListeningPool(req, candidateRows(maxChars), {
    known: knownWordSet(req.includeLearning ? 2 : 3),
    tokenize
  })
}
