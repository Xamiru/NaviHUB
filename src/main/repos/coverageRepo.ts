import { getSqlite } from '../db/connection'
import { getDictDb } from '../dict/dictDb'
import * as settingsRepo from './settingsRepo'
import { isLearnableWord } from '../seriesText'
import type {
  JpCoverageDetail,
  JpCoverageListRow,
  JpTierCounts,
  JpWordTier,
  MediaType
} from '@shared/types'

// Series comprehension: what share of a series' words the user actually knows.
//
// The snapshot holds only text facts (per-word counts). Every knowledge-derived
// number is computed here at read time by joining those words against jp_card,
// so a score updates the moment a card graduates — no invalidation, no stale
// percentages, no rescan needed unless the series itself gains chapters.

// The deck is not the whole of what you know. Without a baseline, a learner who
// already reads some Japanese is told they understand 3% of a series they can
// mostly follow, and jpFeed's exactly-one-unknown filter finds nothing for
// months. `jp.knownBaseline` = "assume the top N frequency words are known"
// (0 = off, the default, so no number ever changes silently).
//
// The word list lives in dictionaries.db, a SEPARATE database, so it cannot be
// joined directly. It is materialized into a TEMP table instead — per
// connection, never written to navihub.db, so there is no schema change, no
// migration and nothing new to strip on export.
const BASELINE_KEY = 'jp.knownBaseline'
let builtFor: { db: unknown; size: number } | null = null

export function baselineSize(): number {
  const n = Number(settingsRepo.get(BASELINE_KEY))
  return Number.isFinite(n) && n > 0 ? Math.floor(n) : 0
}

function ensureBaseline(): void {
  const db = getSqlite()
  const n = baselineSize()
  db.exec('CREATE TEMP TABLE IF NOT EXISTS jp_known_baseline (word TEXT PRIMARY KEY)')
  // Keyed on the CONNECTION as well as the size. A TEMP table belongs to its
  // connection, so a reopened database (closeDatabase then a lazy getSqlite, and
  // every test's fresh in-memory db) starts empty while a module-level cache
  // still claims it is built — but keying on the row count instead made the
  // guard unsatisfiable whenever the baseline was on and the frequency pack was
  // absent (0 words is the correct answer, and `have > 0` can never hold), so
  // every call rebuilt: a DELETE plus a cross-database GROUP BY, up to eight
  // times for one analyzeText paste. Identity of the handle settles both.
  if (builtFor?.db === db && builtFor.size === n) return
  db.exec('DELETE FROM jp_known_baseline')
  if (n > 0) {
    const ins = db.prepare('INSERT OR IGNORE INTO jp_known_baseline (word) VALUES (?)')
    const words = topFrequencyWords(n)
    db.transaction(() => {
      for (const w of words) ins.run(w)
    })()
  }
  builtFor = { db, size: n }
}

// Called when the installed frequency data changes: the pack itself is not part
// of the cache key (its size is unrelated to the setting), so an import or a
// removal would otherwise keep serving the old words until the next restart.
export function invalidateBaseline(): void {
  builtFor = null
}

// Highest-priority installed frequency bank, top N by rank. Returns [] when no
// frequency pack is installed — the baseline then simply does nothing.
function topFrequencyWords(n: number): string[] {
  try {
    const dictDb = getDictDb()
    const src = dictDb
      .prepare(
        `SELECT f.dict_id AS id FROM freq f JOIN dict d ON d.id = f.dict_id
         GROUP BY f.dict_id ORDER BY d.priority DESC, d.id DESC LIMIT 1`
      )
      .get() as { id: number } | undefined
    if (!src) return []
    return (
      dictDb
        .prepare(
          `SELECT expression, MIN(rank) AS rank FROM freq WHERE dict_id = ?
           GROUP BY expression ORDER BY rank ASC LIMIT ?`
        )
        .all(src.id, n) as { expression: string }[]
    ).map((r) => r.expression)
  } catch {
    return [] /* no dictionaries.db yet */
  }
}

// Tier of each distinct card front, worst-to-best collapsed with MAX so a word
// that exists in both a learned and an unlearned lesson counts as the better:
//   3 known      — lesson learned AND the card graduated out of learning steps
//   2 learning   — lesson learned, card still new/learning
//   1 unstarted  — a card exists but its lesson isn't learned yet
// A word with no card at all is absent from this CTE and counts as unknown.
//
// The `unstarted` tier is load-bearing: buildPrepDeck creates hundreds of cards
// in UNLEARNED lessons, so counting "a card exists" as known would make every
// prep deck instantly report ~100% comprehension.
// Call before any query using tierCte(). MAX over the union keeps the
// worst-to-best collapse: a baseline word that also has a card takes whichever
// tier is higher, so the baseline can only ever raise a word, never lower it.
function tierCte(): string {
  ensureBaseline()
  return `
  WITH tiers AS (
    SELECT word, MAX(tier) AS tier FROM (
      SELECT c.front AS word,
             CASE WHEN l.learned = 1 AND c.status = 'review' THEN 3
                  WHEN l.learned = 1 THEN 2
                  ELSE 1 END AS tier
      FROM jp_card c JOIN jp_lesson l ON l.id = c.lesson_id
      UNION ALL
      SELECT word, 3 AS tier FROM jp_known_baseline
    )
    GROUP BY word
  )
`
}

const EMPTY_TIERS = (): Record<JpWordTier, JpTierCounts> => ({
  known: { uniqueCount: 0, tokenCount: 0 },
  learning: { uniqueCount: 0, tokenCount: 0 },
  unstarted: { uniqueCount: 0, tokenCount: 0 },
  unknown: { uniqueCount: 0, tokenCount: 0 }
})

const TIER_NAMES: Record<number, JpWordTier> = { 3: 'known', 2: 'learning', 1: 'unstarted', 0: 'unknown' }

function tiersFromRows(rows: { tier: number | null; uniq: number; tokens: number }[]): Record<
  JpWordTier,
  JpTierCounts
> {
  const out = EMPTY_TIERS()
  for (const r of rows) {
    const name = TIER_NAMES[r.tier ?? 0] ?? 'unknown'
    out[name] = { uniqueCount: r.uniq, tokenCount: r.tokens }
  }
  return out
}

export interface CoverageScanInput {
  counts: Map<string, number>
  tokenCount: number
  chaptersScanned: number
}

// Replaces a series' snapshot in one transaction. Only learnable words get
// rows — particles and Latin noise are not vocabulary and would swamp the
// counts — and `unique_words`/`token_count` record THAT same set, so every
// percentage and the total it is shown against share one denominator.
export function saveScan(mediaId: number, input: CoverageScanInput): void {
  const db = getSqlite()
  const words = [...input.counts.entries()].filter(([w]) => isLearnableWord(w))
  const learnableTokens = words.reduce((n, [, count]) => n + count, 0)
  const tx = db.transaction(() => {
    db.prepare('DELETE FROM jp_coverage_word WHERE media_id = ?').run(mediaId)
    db.prepare(
      `INSERT INTO jp_coverage (media_id, scanned_at, chapters_scanned, token_count, unique_words)
       VALUES (?, datetime('now'), ?, ?, ?)
       ON CONFLICT(media_id) DO UPDATE SET
         scanned_at = excluded.scanned_at,
         chapters_scanned = excluded.chapters_scanned,
         token_count = excluded.token_count,
         unique_words = excluded.unique_words`
    ).run(mediaId, input.chaptersScanned, learnableTokens, words.length)
    const ins = db.prepare('INSERT INTO jp_coverage_word (media_id, word, count) VALUES (?, ?, ?)')
    for (const [word, count] of words) ins.run(mediaId, word, count)
  })
  tx()
}

export function coverageForMedia(mediaId: number): JpCoverageDetail | null {
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT media_id, scanned_at, chapters_scanned, token_count, unique_words
       FROM jp_coverage WHERE media_id = ?`
    )
    .get(mediaId) as
    | {
        media_id: number
        scanned_at: string
        chapters_scanned: number
        token_count: number
        unique_words: number
      }
    | undefined
  if (!row) return null

  const tierRows = db
    .prepare(
      `${tierCte()}
       SELECT t.tier AS tier, COUNT(*) AS uniq, SUM(w.count) AS tokens
       FROM jp_coverage_word w LEFT JOIN tiers t ON t.word = w.word
       WHERE w.media_id = ? GROUP BY t.tier`
    )
    .all(mediaId) as { tier: number | null; uniq: number; tokens: number }[]

  const topUnknown = db
    .prepare(
      `${tierCte()}
       SELECT w.word, w.count FROM jp_coverage_word w LEFT JOIN tiers t ON t.word = w.word
       WHERE w.media_id = ? AND t.tier IS NULL
       ORDER BY w.count DESC, w.word LIMIT 50`
    )
    .all(mediaId) as { word: string; count: number }[]

  const tiers = tiersFromRows(tierRows)

  // jpdb-style projection: "learn the top N not-yet-KNOWN words (by in-series
  // count) → running-text coverage becomes X". Candidates are every tier below
  // known — learning/unstarted words will graduate anyway; the projection asks
  // what knowing them buys. Shares use the SAME denominator as `tiers` (the
  // tested invariant).
  const projectionCandidates = db
    .prepare(
      `${tierCte()}
       SELECT w.count AS count FROM jp_coverage_word w LEFT JOIN tiers t ON t.word = w.word
       WHERE w.media_id = ? AND (t.tier IS NULL OR t.tier < 3)
       ORDER BY w.count DESC, w.word LIMIT 500`
    )
    .all(mediaId) as { count: number }[]
  const totalTokens =
    tiers.known.tokenCount +
    tiers.learning.tokenCount +
    tiers.unstarted.tokenCount +
    tiers.unknown.tokenCount
  const projection: { learnWords: number; share: number }[] = []
  if (totalTokens > 0) {
    let cum = 0
    let idx = 0
    for (const step of [10, 20, 50, 100, 200, 500]) {
      if (idx >= projectionCandidates.length) break
      while (idx < step && idx < projectionCandidates.length) {
        cum += projectionCandidates[idx].count
        idx++
      }
      projection.push({
        learnWords: idx,
        share: Math.min(1, (tiers.known.tokenCount + cum) / totalTokens)
      })
      if (idx < step) break // ran out of candidates before the step size
    }
  }

  return {
    mediaId: row.media_id,
    scannedAt: row.scanned_at,
    chaptersScanned: row.chapters_scanned,
    tokenCount: row.token_count,
    uniqueWords: row.unique_words,
    tiers,
    topUnknown,
    projection
  }
}

// The known-word set for the i+1 feed: every distinct card front at or above
// `minTier` (3 = known only, 2 = known + learning).
export function knownWordSet(minTier: 2 | 3): Set<string> {
  const db = getSqlite()
  const rows = db
    .prepare(`${tierCte()} SELECT word FROM tiers WHERE tier >= ?`)
    .all(minTier) as { word: string }[]
  return new Set(rows.map((r) => r.word))
}

// Every scanned series, best-understood first — the "what can I read next" list.
// LEFT JOINs media_item so a deleted series still lists (title falls back).
export function coverageList(): JpCoverageListRow[] {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT c.media_id, c.scanned_at, c.token_count, c.unique_words,
              m.title, m.cover_path, m.media_type
       FROM jp_coverage c LEFT JOIN media_item m ON m.id = c.media_id`
    )
    .all() as {
    media_id: number
    scanned_at: string
    token_count: number
    unique_words: number
    title: string | null
    cover_path: string | null
    media_type: string | null
  }[]
  if (rows.length === 0) return []

  const tierRows = db
    .prepare(
      `${tierCte()}
       SELECT w.media_id, t.tier AS tier, COUNT(*) AS uniq, SUM(w.count) AS tokens
       FROM jp_coverage_word w LEFT JOIN tiers t ON t.word = w.word
       GROUP BY w.media_id, t.tier`
    )
    .all() as { media_id: number; tier: number | null; uniq: number; tokens: number }[]

  const byMedia = new Map<number, { tier: number | null; uniq: number; tokens: number }[]>()
  for (const r of tierRows) {
    const list = byMedia.get(r.media_id) ?? []
    list.push(r)
    byMedia.set(r.media_id, list)
  }

  const out: JpCoverageListRow[] = rows.map((r) => ({
    mediaId: r.media_id,
    title: r.title ?? '(deleted)',
    coverPath: r.cover_path ?? null,
    mediaType: (r.media_type as MediaType | null) ?? null,
    scannedAt: r.scanned_at,
    tokenCount: r.token_count,
    uniqueWords: r.unique_words,
    tiers: tiersFromRows(byMedia.get(r.media_id) ?? [])
  }))

  const knownShare = (row: JpCoverageListRow): number => {
    const counted =
      row.tiers.known.tokenCount +
      row.tiers.learning.tokenCount +
      row.tiers.unstarted.tokenCount +
      row.tiers.unknown.tokenCount
    return counted > 0 ? row.tiers.known.tokenCount / counted : 0
  }
  return out.sort((a, b) => knownShare(b) - knownShare(a) || a.title.localeCompare(b.title))
}

export function removeScan(mediaId: number): void {
  const db = getSqlite()
  const tx = db.transaction(() => {
    db.prepare('DELETE FROM jp_coverage_word WHERE media_id = ?').run(mediaId)
    db.prepare('DELETE FROM jp_coverage WHERE media_id = ?').run(mediaId)
  })
  tx()
}

// Tier of each of the given words — the analyzer's one round trip.
export function tiersForWords(words: string[]): Map<string, JpWordTier> {
  const out = new Map<string, JpWordTier>()
  if (words.length === 0) return out
  const db = getSqlite()
  for (let i = 0; i < words.length; i += 500) {
    const slice = words.slice(i, i + 500)
    const placeholders = slice.map(() => '?').join(',')
    const rows = db
      .prepare(`${tierCte()} SELECT word, tier FROM tiers WHERE word IN (${placeholders})`)
      .all(...slice) as { word: string; tier: number }[]
    for (const r of rows) out.set(r.word, TIER_NAMES[r.tier] ?? 'unknown')
  }
  return out
}
