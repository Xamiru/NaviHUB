import { getDictDb } from './dictDb'
import { toHiragana, toKatakana } from '@shared/kana'
import { flattenGlossary } from '@shared/dictContent'
import type { GlossaryItem, ImeCandidate } from '@shared/types'

// IME-ordered conversion candidates for the on-screen Japanese keyboard: the
// composed kana buffer in, ranked kanji spellings out. Deliberately NOT
// lookup.ts's lookupWord — that is ordered for dictionary display and does
// deinflection/prefix-trims a conversion candidate list must not.
//
// Two tiers: exact reading matches (frequency-ranked), then frequency-gated
// prefix predictions. The raw kana/katakana script chips are the RENDERER's
// job — main never returns them, which is also the graceful-degradation story
// (no dictionary → [] → the keyboard still commits kana).

const COMMON_TAGS = new Set(['P', 'news1', 'ichi1', 'spec1', 'gai1'])
const PREDICTION_LIMIT = 200 // ranked BEFORE limiting — headroom over the 16 we return

interface TermRow {
  expression: string
  reading: string
  glossary: string
  term_tags: string | null
  score: number
  dictPriority: number
  rank: number | null
}

function toCandidate(row: TermRow, kind: ImeCandidate['kind']): ImeCandidate {
  let gloss: string | null = null
  try {
    gloss = flattenGlossary(JSON.parse(row.glossary) as GlossaryItem[], 80) || null
  } catch {
    /* keep null */
  }
  return {
    text: row.expression,
    reading: toHiragana(row.reading || row.expression),
    gloss,
    kind
  }
}

function isCommon(row: TermRow): boolean {
  return (row.term_tags ?? '').split(/\s+/).some((t) => COMMON_TAGS.has(t))
}

// Best-first order: freq rank (nulls last) → common tag → dict priority → score.
function compareRows(a: TermRow, b: TermRow): number {
  const ra = a.rank ?? Number.MAX_SAFE_INTEGER
  const rb = b.rank ?? Number.MAX_SAFE_INTEGER
  if (ra !== rb) return ra - rb
  const ca = isCommon(a) ? 1 : 0
  const cb = isCommon(b) ? 1 : 0
  if (ca !== cb) return cb - ca
  if (a.dictPriority !== b.dictPriority) return b.dictPriority - a.dictPriority
  return b.score - a.score
}

// Keep the best row per expression, in rank order.
function dedupe(rows: TermRow[], exclude: Set<string>): TermRow[] {
  const out: TermRow[] = []
  const seen = new Set(exclude)
  for (const row of rows.slice().sort(compareRows)) {
    if (seen.has(row.expression)) continue
    seen.add(row.expression)
    out.push(row)
  }
  return out
}

// The one SELECT both tiers share — a schema change edits exactly one string.
function termQuery(where: string, tail = ''): string {
  return `SELECT t.expression, t.reading, t.glossary, t.term_tags, t.score,
                 d.priority AS dictPriority,
                 (SELECT MIN(f.rank) FROM freq f WHERE f.expression = t.expression) AS rank
          FROM term t JOIN dict d ON d.id = t.dict_id
          WHERE d.priority >= 0 AND ${where} ${tail}`
}

// Exclusive upper bound for an index-range prefix scan: LIKE on these columns
// can never use the index (SQLite's LIKE optimization needs case_sensitive_like
// on for a BINARY-collated column), but `col >= prefix AND col < end` does.
function rangeEnd(prefix: string): string {
  const cps = Array.from(prefix)
  const last = cps[cps.length - 1].codePointAt(0)!
  return cps.slice(0, -1).join('') + String.fromCodePoint(last + 1)
}

export function readingCandidates(kana: string, limit = 16): ImeCandidate[] {
  const hira = toHiragana((kana ?? '').trim())
  if (!hira) return []
  const kata = toKatakana(hira)
  try {
    const db = getDictDb()
    // Exact reading matches. reading = '' means the expression IS the reading
    // (kana-only words); JMnedict sits at negative priority — a conversion bar
    // must never bury 今日 under obscure name readings.
    const exact = db
      .prepare(
        termQuery(`(t.reading IN (?, ?) OR (t.reading = '' AND t.expression IN (?, ?)))`)
      )
      .all(hira, kata, hira, kata) as TermRow[]

    // The renderer already offers the two script chips — skip those spellings.
    const scriptForms = new Set([hira, kata])
    const out = dedupe(exact, scriptForms).map((r) => toCandidate(r, 'exact'))

    // Prefix predictions fill the remaining slots — freq-gated (an obscure
    // word predicted from two kana is noise) and only once there's a real
    // prefix to extend. Index-range scans instead of LIKE, ranked BEFORE the
    // LIMIT so truncation can never drop a common word for an arbitrary one.
    if (out.length < limit && Array.from(hira).length >= 2) {
      const predicted = db
        .prepare(
          termQuery(
            `((t.reading >= @h AND t.reading < @hEnd) OR (t.reading >= @k AND t.reading < @kEnd)
               OR (t.reading = '' AND ((t.expression >= @h AND t.expression < @hEnd)
                                    OR (t.expression >= @k AND t.expression < @kEnd))))
             AND NOT (t.reading IN (@h, @k) OR (t.reading = '' AND t.expression IN (@h, @k)))
             AND EXISTS (SELECT 1 FROM freq f WHERE f.expression = t.expression)`,
            `ORDER BY rank LIMIT ${PREDICTION_LIMIT}`
          )
        )
        .all({ h: hira, hEnd: rangeEnd(hira), k: kata, kEnd: rangeEnd(kata) }) as TermRow[]
      const taken = new Set([...scriptForms, ...out.map((c) => c.text)])
      for (const row of dedupe(predicted, taken)) {
        if (out.length >= limit) break
        out.push(toCandidate(row, 'prediction'))
      }
    }
    return out.slice(0, limit)
  } catch {
    return []
  }
}
