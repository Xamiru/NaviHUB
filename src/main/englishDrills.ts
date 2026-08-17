import { getSqlite } from './db/connection'
import { getDictDb } from './dict/dictDb'
import type {
  EnBand,
  EnSpellingItem,
  EnSpellingPoolRequest,
  EnVocabMode,
  EnVocabPoolRequest,
  EnVocabQuestion
} from '@shared/types'
import { shuffle } from '@shared/shuffle'

// Question pools for the English vocab/spelling tests (the jpDrills.ts
// pattern: navihub.db for the user's saved words, dictionaries.db for the
// WordNet + frequency packs, joined in JS). Pools are sampled fresh per round
// in a plain await from the Start handler — never cached in the query client.

// OpenSubtitles rank bands. Ranks below 4k are deliberately never quizzed —
// the learner reads at C1, so common words are noise. The 50k tail skews
// literary/rare, which is exactly the C2 gap.
export const EN_BANDS: Record<EnBand, [number, number]> = {
  upper: [4000, 10000], // B2/C1 boundary — the spelling drill's default
  advanced: [10000, 25000], // C1 — the vocab MCQ's default
  rare: [25000, 50000] // C2/literary
}

const POS_LABEL: Record<string, string> = {
  n: 'noun',
  v: 'verb',
  a: 'adjective',
  r: 'adverb'
}

const parseJsonArray = <T,>(raw: unknown): T[] => {
  try {
    const v = JSON.parse(String(raw))
    return Array.isArray(v) ? (v as T[]) : []
  } catch {
    return []
  }
}

// ---- candidate filtering (pure, exported for tests) ----

// Is this (lemma, first-sense synset) quizzable? en_lemma.lemma is LOWERCASED
// at import, so the proper-noun check must read the synset's `words`, which
// keep the data files' casing ("London" stays capitalized there).
export function quizzableCandidate(lemma: string, synsetWords: string[]): boolean {
  if (!/^[a-z][a-z-]{2,}$/.test(lemma)) return false // no spaces/apostrophes, 3+ chars
  const inSynset = synsetWords.find((w) => w.toLowerCase() === lemma)
  if (inSynset && /^[A-Z]/.test(inSynset)) return false
  return true
}

// One quizzable word with its first (most frequent) WordNet sense.
export interface EnCandidate {
  word: string
  pos: string | null // POS label ('noun'...), null for saved words without one
  def: string
  ipa: string | null
  rank: number | null
  synonyms: string[] // other members of the first synset (band source only)
}

// ---- pure pool assembly (exported for tests; rng injectable) ----

// Distractors: same POS first, nearest frequency rank (with jitter so the
// same neighbours don't recur every round), topped up from any POS.
function pickDistractors(
  target: EnCandidate,
  pool: EnCandidate[],
  field: 'def' | 'word',
  rng: () => number
): string[] {
  const others = pool.filter((c) => c.word !== target.word && c.def !== target.def)
  const samePos = others.filter((c) => c.pos === target.pos)
  const ranked = (list: EnCandidate[]): EnCandidate[] =>
    [...list].sort((a, b) => {
      const da = Math.abs((a.rank ?? 0) - (target.rank ?? 0)) + rng() * 3000
      const db = Math.abs((b.rank ?? 0) - (target.rank ?? 0)) + rng() * 3000
      return da - db
    })
  const picked: EnCandidate[] = []
  for (const c of [...ranked(samePos), ...ranked(others)]) {
    if (picked.length >= 3) break
    if (picked.some((p) => p[field] === c[field])) continue
    if (c[field] === target[field]) continue
    picked.push(c)
  }
  return picked.map((c) => c[field])
}

export function buildVocabPool(
  candidates: EnCandidate[],
  mode: EnVocabMode,
  limit: number,
  rng: () => number = Math.random
): EnVocabQuestion[] {
  // Dedupe by word (a word can reach here once per POS row).
  const byWord = new Map<string, EnCandidate>()
  for (const c of candidates) if (!byWord.has(c.word)) byWord.set(c.word, c)
  let pool = [...byWord.values()]
  if (mode === 'synonyms') pool = pool.filter((c) => c.synonyms.length > 0)
  if (pool.length < 8) return []

  const out: EnVocabQuestion[] = []
  for (const c of shuffle(pool, rng)) {
    if (out.length >= limit) break
    let answer: string
    let distractors: string[]
    let prompt: string
    if (mode === 'word2def') {
      prompt = c.word
      answer = c.def
      distractors = pickDistractors(c, pool, 'def', rng)
    } else if (mode === 'def2word') {
      prompt = c.def
      answer = c.word
      distractors = pickDistractors(c, pool, 'word', rng)
    } else {
      prompt = c.word
      answer = c.synonyms[Math.floor(rng() * c.synonyms.length)]
      // Other candidates' words are same-POS/nearby-rank non-synonyms.
      distractors = pickDistractors(c, pool, 'word', rng).filter(
        (w) => !c.synonyms.includes(w) && w !== c.word
      )
    }
    if (distractors.length < 3) continue
    out.push({
      word: c.word,
      pos: c.pos,
      def: c.def,
      ipa: c.ipa,
      rank: c.rank,
      prompt,
      answer,
      distractors: distractors.slice(0, 3)
    })
  }
  return out
}

// ---- candidate fetching ----

// Band words: frequency rows joined to WordNet lemmas, first sense resolved
// via a batched synset load (the lookupOffline idiom), IPA joined in bulk.
function fetchBandCandidates(band: EnBand, n: number): EnCandidate[] {
  const db = getDictDb()
  const freqBank = db
    .prepare("SELECT id FROM en_freq_set WHERE source = 'opensubtitles'")
    .get() as { id: number } | undefined
  if (!freqBank) return []
  const [lo, hi] = EN_BANDS[band]
  const rows = db
    .prepare(
      `SELECT f.word, f.rank, l.pos, l.offsets
       FROM en_freq f JOIN en_lemma l ON l.lemma = f.word
       WHERE f.bank_id = ? AND f.rank BETWEEN ? AND ?
       ORDER BY RANDOM() LIMIT ?`
    )
    .all(freqBank.id, lo, hi, n) as { word: string; rank: number; pos: string; offsets: string }[]
  if (rows.length === 0) return []

  // First (most frequent) sense per row, batch-loaded in chunks.
  const keys = rows
    .map((r) => ({ row: r, offset: parseJsonArray<number>(r.offsets)[0] }))
    .filter((k) => typeof k.offset === 'number')
  const synsets = new Map<string, { def: string; words: string[] }>()
  for (let i = 0; i < keys.length; i += 400) {
    const slice = keys.slice(i, i + 400)
    const clause = slice.map(() => '(pos = ? AND offset = ?)').join(' OR ')
    const params: unknown[] = []
    for (const k of slice) params.push(k.row.pos, k.offset)
    const synRows = db
      .prepare(`SELECT pos, offset, def, words FROM en_synset WHERE ${clause}`)
      .all(...params) as Record<string, unknown>[]
    for (const s of synRows) {
      synsets.set(`${s.pos}:${s.offset}`, {
        def: s.def as string,
        words: parseJsonArray<string>(s.words)
      })
    }
  }

  const ipaByWord = new Map<string, string>()
  const words = [...new Set(rows.map((r) => r.word))]
  for (let i = 0; i < words.length; i += 500) {
    const slice = words.slice(i, i + 500)
    const placeholders = slice.map(() => '?').join(',')
    const ipaRows = db
      .prepare(`SELECT word, ipa FROM en_pron WHERE word IN (${placeholders})`)
      .all(...slice) as { word: string; ipa: string }[]
    for (const r of ipaRows) if (!ipaByWord.has(r.word)) ipaByWord.set(r.word, r.ipa)
  }

  const out: EnCandidate[] = []
  for (const k of keys) {
    const syn = synsets.get(`${k.row.pos}:${k.offset}`)
    if (!syn || !syn.def.trim()) continue
    if (!quizzableCandidate(k.row.word, syn.words)) continue
    const ipa = ipaByWord.get(k.row.word)
    out.push({
      word: k.row.word,
      pos: POS_LABEL[k.row.pos] ?? k.row.pos,
      def: syn.def,
      ipa: ipa ? `/${ipa}/` : null,
      rank: k.row.rank,
      synonyms: syn.words
        .map((w) => w.toLowerCase())
        .filter((w) => w !== k.row.word && /^[a-z][a-z-]{2,}$/.test(w))
    })
  }
  return out
}

// The user's saved words (meaning as the definition). No ranks, no synonyms —
// the synonyms mode isn't offered for this source.
function fetchMyWordCandidates(): EnCandidate[] {
  const rows = getSqlite()
    .prepare('SELECT word, phonetic, pos, meaning FROM en_word')
    .all() as { word: string; phonetic: string | null; pos: string | null; meaning: string }[]
  return rows.map((r) => ({
    word: r.word,
    pos: r.pos,
    def: r.meaning,
    ipa: r.phonetic,
    rank: null,
    synonyms: []
  }))
}

// ---- pools (the IPC entry points) ----

export function vocabQuizPool(req: EnVocabPoolRequest): EnVocabQuestion[] {
  const limit = Math.max(1, Math.min(200, req.limit))
  const candidates =
    req.source.kind === 'band'
      ? fetchBandCandidates(req.source.band, limit * 4)
      : fetchMyWordCandidates()
  if (req.source.kind === 'myWords' && req.mode === 'synonyms') return []
  return buildVocabPool(candidates, req.mode, limit)
}

export function spellingPool(req: EnSpellingPoolRequest): EnSpellingItem[] {
  const limit = Math.max(1, Math.min(200, req.limit))
  const candidates =
    req.source.kind === 'band'
      ? fetchBandCandidates(req.source.band, limit * 2)
      : fetchMyWordCandidates()
  const byWord = new Map<string, EnCandidate>()
  for (const c of candidates) if (!byWord.has(c.word)) byWord.set(c.word, c)
  return [...byWord.values()].slice(0, limit).map((c) => ({
    word: c.word,
    def: c.def,
    ipa: c.ipa,
    pos: c.pos,
    rank: c.rank
  }))
}
