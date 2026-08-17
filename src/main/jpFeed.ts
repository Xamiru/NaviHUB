import { setImmediate as yieldToLoop } from 'timers/promises'
import { getSqlite } from './db/connection'
import { getDictDb } from './dict/dictDb'
import { baselineSize, knownWordSet, tiersForWords } from './repos/coverageRepo'
import { tokenize } from './tokenizer'
import { isLearnableWord } from './seriesText'
import type { JpFeed, JpFeedItem, JpFeedRequest, JpToken } from '@shared/types'
import { shuffle } from '@shared/shuffle'

// The i+1 sentence feed (MorphMan's "1T" mechanic over the user's own SRS
// tiers): sentence-bank sentences where every word is known except EXACTLY
// one — comprehensible input on tap, with the one unknown a click away from
// being mined.
//
// CORRECTNESS TRAP, do not "simplify" this away: sentence_fts.keywords is the
// union of BASE + SURFACE forms per sentence (sentences.ts:sentenceKeywords),
// so counting set-misses over keywords OVER-COUNTS unknowns — a known 食べる
// plus its surface 食べた reads as one phantom unknown. The feed is therefore
// two-phase: a cheap coarse keyword prefilter (upper bound, band [0..3]) and
// an exact kuromoji pass on the survivors only, where a token is known iff
// base OR surface is in the set. tests/jpFeed.test.ts pins this.

const COARSE_MAX_UNKNOWNS = 3
const SURVIVOR_CAP = 4000
const PER_WORD_CAP = 3
const DEFAULT_LIMIT = 200

// ---- pure seams (exported for tests) ----

// Distinct learnable keyword tokens not in the known set — an UPPER BOUND on
// the sentence's true unknown count (base/surface conflation).
export function coarseUnknowns(keywords: string, known: Set<string>): number {
  const unknowns = new Set<string>()
  for (const token of keywords.split(' ')) {
    if (!token || known.has(token)) continue
    if (!isLearnableWord(token)) continue
    unknowns.add(token)
  }
  return unknowns.size
}

// Exact classification over kuromoji tokens: a token is known when its BASE or
// its SURFACE is in the set; unknowns are distinct learnable bases.
export function classifySentence(
  tokens: JpToken[],
  known: Set<string>
): { unknowns: string[]; surfaces: Map<string, string> } {
  const unknowns: string[] = []
  const surfaces = new Map<string, string>()
  for (const tok of tokens) {
    if (!tok.wordLike) continue
    const base = tok.base || tok.surface
    if (!isLearnableWord(base)) continue
    if (known.has(base) || known.has(tok.surface)) continue
    if (!surfaces.has(base)) {
      unknowns.push(base)
      surfaces.set(base, tok.surface)
    }
  }
  return { unknowns, surfaces }
}

export interface FeedSentenceRow {
  id: number
  jp: string
  en: string
  attribution: string | null
  keywords: string
}

export interface FeedDeps {
  loadSentences(): FeedSentenceRow[]
  tokenize(text: string): Promise<JpToken[]>
  known: Set<string>
  tiersFor(words: string[]): Map<string, 'known' | 'learning' | 'unstarted' | 'unknown'>
  freqRanks(words: string[]): Map<string, number>
  audioFor(jps: string[]): Map<string, string>
}

// The two-phase pool builder, pure of SQL/electron via injected deps.
export async function buildFeed(req: JpFeedRequest, deps: FeedDeps): Promise<Omit<JpFeed, 'fromCache' | 'builtAt'>> {
  const limit = Math.max(1, Math.min(500, req.limit ?? DEFAULT_LIMIT))
  const rows = deps.loadSentences()

  // Coarse pass: keyword upper bound. Flood mode (unknowns=0) still needs the
  // exact pass — a known base's unfamiliar surface fakes an unknown, so the
  // coarse band is [0..2] there rather than exactly 0.
  const band: [number, number] = req.unknowns === 0 ? [0, 2] : [1, COARSE_MAX_UNKNOWNS]
  const survivors: { row: FeedSentenceRow; coarse: number }[] = []
  for (const row of rows) {
    const u = coarseUnknowns(row.keywords, deps.known)
    if (u >= band[0] && u <= band[1]) survivors.push({ row, coarse: u })
  }
  survivors.sort((a, b) => a.coarse - b.coarse || a.row.jp.length - b.row.jp.length)
  const capped = survivors.slice(0, SURVIVOR_CAP)

  // Exact pass: kuromoji over survivors only. Tokenizer failure ([]) skips the
  // sentence — the feed goes empty rather than wrong.
  interface Eligible {
    row: FeedSentenceRow
    unknownWord: string | null
    unknownSurface: string | null
  }
  const eligible: Eligible[] = []
  let processed = 0
  for (const { row } of capped) {
    processed++
    if (processed % 200 === 0) await yieldToLoop()
    const tokens = await deps.tokenize(row.jp)
    if (tokens.length === 0) continue
    const { unknowns, surfaces } = classifySentence(tokens, deps.known)
    if (req.unknowns === 0) {
      if (unknowns.length === 0) eligible.push({ row, unknownWord: null, unknownSurface: null })
    } else if (unknowns.length === 1) {
      eligible.push({
        row,
        unknownWord: unknowns[0],
        unknownSurface: surfaces.get(unknowns[0]) ?? unknowns[0]
      })
    }
  }

  // Rank: learn common words first (freq rank of the unknown), shorter
  // sentences break ties; at most PER_WORD_CAP sentences per unknown word.
  const unknownWords = [...new Set(eligible.map((e) => e.unknownWord).filter((w): w is string => !!w))]
  const ranks = deps.freqRanks(unknownWords)
  const tiers = deps.tiersFor(unknownWords)
  let items: Eligible[]
  if (req.unknowns === 0) {
    items = shuffle(eligible).slice(0, limit)
  } else {
    const perWord = new Map<string, number>()
    items = []
    const sorted = [...eligible].sort((a, b) => {
      const ra = ranks.get(a.unknownWord!) ?? 999999
      const rb = ranks.get(b.unknownWord!) ?? 999999
      return ra - rb || a.row.jp.length - b.row.jp.length
    })
    for (const e of sorted) {
      if (items.length >= limit) break
      const n = perWord.get(e.unknownWord!) ?? 0
      if (n >= PER_WORD_CAP) continue
      perWord.set(e.unknownWord!, n + 1)
      items.push(e)
    }
  }

  const audio = deps.audioFor(items.map((e) => e.row.jp))
  const out: JpFeedItem[] = items.map((e) => {
    // By construction an unknown word is never tier 'known' (it missed the
    // set) — but tiersForWords' type doesn't know that; collapse defensively.
    const rawTier = e.unknownWord ? (tiers.get(e.unknownWord) ?? 'unknown') : null
    return {
      sentenceId: e.row.id,
      jp: e.row.jp,
      en: e.row.en,
      audioPath: audio.get(e.row.jp) ?? null,
      attribution: e.row.attribution,
      unknownWord: e.unknownWord,
      unknownSurface: e.unknownSurface,
      unknownTier: rawTier === 'known' ? 'learning' : rawTier,
      unknownRank: e.unknownWord ? (ranks.get(e.unknownWord) ?? null) : null
    }
  })
  return { items: out, scanned: rows.length, eligible: eligible.length }
}

// ---- IO wiring + cache ----

// A feed build costs ~2-3s (110k-row scan + up to 4k kuromoji sentences), so
// results are cached per request-params against a cheap knowledge fingerprint;
// any card/lesson change rebuilds on the next fetch. Plain awaited invoke —
// the page shows a loading state, no status object.
const cache = new Map<string, { fingerprint: string; feed: JpFeed }>()

// Fingerprints what changes the KNOWN SET, not what changes any card row.
// MAX(updated_at) used to be in here, and submitReview writes updated_at on
// every single grade — so one review invalidated the whole feed and the next
// visit re-loaded sentence_fts and re-tokenized up to 4000 sentences (~2-3s).
// A card only enters/leaves the known set by being created, deleted, or
// crossing into 'review' status, and a lesson by being marked learned.
function knowledgeFingerprint(): string {
  const db = getSqlite()
  const cards = db
    .prepare(
      `SELECT COUNT(*) AS c,
              COUNT(*) FILTER (WHERE status = 'review') AS r
       FROM jp_card`
    )
    .get() as { c: number; r: number }
  const learned = db.prepare(`SELECT COUNT(*) AS n FROM jp_lesson WHERE learned = 1`).get() as {
    n: number
  }
  // The baseline belongs here too: knownWordSet() UNIONs the assumed-known
  // frequency words in at tier 3, so without this, turning "Assumed known
  // words" on in Settings left the feed serving its pre-baseline cache — on the
  // one page the setting exists to fix.
  return `${cards.c}|${cards.r}|${learned.n}|${baselineSize()}`
}

function realDeps(req: JpFeedRequest): FeedDeps {
  const dictDb = getDictDb()
  return {
    loadSentences: () => {
      try {
        return dictDb
          .prepare(
            `SELECT f.sentence_id AS id, f.keywords, s.jp, s.en, s.attribution
             FROM sentence_fts f
             JOIN sentence s ON s.id = f.sentence_id
             JOIN sentence_bank b ON b.id = s.bank_id`
          )
          .all() as FeedSentenceRow[]
      } catch {
        return []
      }
    },
    tokenize,
    known: knownWordSet(req.includeLearning ? 2 : 3),
    tiersFor: (words) => tiersForWords(words),
    freqRanks: (words) => {
      const out = new Map<string, number>()
      if (words.length === 0) return out
      try {
        const src = dictDb
          .prepare(
            `SELECT f.dict_id AS id FROM freq f JOIN dict d ON d.id = f.dict_id
             GROUP BY f.dict_id ORDER BY d.priority DESC, d.id DESC LIMIT 1`
          )
          .get() as { id: number } | undefined
        if (!src) return out
        for (let i = 0; i < words.length; i += 500) {
          const slice = words.slice(i, i + 500)
          const rows = dictDb
            .prepare(
              `SELECT expression, MIN(rank) AS rank FROM freq
               WHERE dict_id = ? AND expression IN (${slice.map(() => '?').join(',')})
               GROUP BY expression`
            )
            .all(src.id, ...slice) as { expression: string; rank: number }[]
          for (const r of rows) out.set(r.expression, r.rank)
        }
      } catch {
        /* no freq dict */
      }
      return out
    },
    audioFor: (jps) => {
      const out = new Map<string, string>()
      if (jps.length === 0) return out
      try {
        for (let i = 0; i < jps.length; i += 500) {
          const slice = jps.slice(i, i + 500)
          const rows = dictDb
            .prepare(
              `SELECT sa.jp, sa.path FROM sentence_audio sa
               JOIN audio_bank ab ON ab.id = sa.bank_id
               WHERE sa.jp IN (${slice.map(() => '?').join(',')})`
            )
            .all(...slice) as { jp: string; path: string }[]
          for (const r of rows) out.set(r.jp, r.path)
        }
      } catch {
        /* no audio pack */
      }
      return out
    }
  }
}

export async function getFeed(req: JpFeedRequest): Promise<JpFeed> {
  const paramsKey = `${req.includeLearning}|${req.unknowns}|${req.limit ?? DEFAULT_LIMIT}`
  const fingerprint = knowledgeFingerprint()
  const cached = cache.get(paramsKey)
  if (cached && cached.fingerprint === fingerprint) {
    return { ...cached.feed, fromCache: true }
  }
  const built = await buildFeed(req, realDeps(req))
  const feed: JpFeed = { ...built, builtAt: new Date().toISOString(), fromCache: false }
  cache.set(paramsKey, { fingerprint, feed })
  return feed
}
