import { getSqlite } from '../db/connection'
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
const TIER_CTE = `
  WITH tiers AS (
    SELECT c.front AS word,
           MAX(CASE WHEN l.learned = 1 AND c.status = 'review' THEN 3
                    WHEN l.learned = 1 THEN 2
                    ELSE 1 END) AS tier
    FROM jp_card c JOIN jp_lesson l ON l.id = c.lesson_id
    GROUP BY c.front
  )
`

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
      `${TIER_CTE}
       SELECT t.tier AS tier, COUNT(*) AS uniq, SUM(w.count) AS tokens
       FROM jp_coverage_word w LEFT JOIN tiers t ON t.word = w.word
       WHERE w.media_id = ? GROUP BY t.tier`
    )
    .all(mediaId) as { tier: number | null; uniq: number; tokens: number }[]

  const topUnknown = db
    .prepare(
      `${TIER_CTE}
       SELECT w.word, w.count FROM jp_coverage_word w LEFT JOIN tiers t ON t.word = w.word
       WHERE w.media_id = ? AND t.tier IS NULL
       ORDER BY w.count DESC, w.word LIMIT 50`
    )
    .all(mediaId) as { word: string; count: number }[]

  return {
    mediaId: row.media_id,
    scannedAt: row.scanned_at,
    chaptersScanned: row.chapters_scanned,
    tokenCount: row.token_count,
    uniqueWords: row.unique_words,
    tiers: tiersFromRows(tierRows),
    topUnknown
  }
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
      `${TIER_CTE}
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
      .prepare(`${TIER_CTE} SELECT word, tier FROM tiers WHERE word IN (${placeholders})`)
      .all(...slice) as { word: string; tier: number }[]
    for (const r of rows) out.set(r.word, TIER_NAMES[r.tier] ?? 'unknown')
  }
  return out
}
