import { fetchWithRetry } from './http'
import { getDictDb } from './dict/dictDb'
import { hasEnglishDict, morphyCandidates, type EnPos } from './dict/wordnet'
import type { EnDictDef, EnDictEntry, EnDictMeaning } from '@shared/types'

// English→English lookups for the /english dictionary page.
//
// Offline first (WordNet, installed via Settings → Dictionaries), falling back
// to the Free Dictionary API — the same shape as dict/lookup.ts:lookupWord.
// A real online failure throws: the renderer's QueryCache.onError toast is the
// right surface for "the dictionary is down"; only an unknown word (404) is an
// empty result.

const API = 'https://api.dictionaryapi.dev/api/v2/entries/en'

/* eslint-disable @typescript-eslint/no-explicit-any */

const strOrNull = (v: unknown): string | null =>
  typeof v === 'string' && v.trim() ? v.trim() : null

const strArray = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((s): s is string => typeof s === 'string' && s.trim() !== '') : []

// Exported for tests: maps the raw API payload (an array of entries) into the
// renderer shape, dropping anything without a word or at least one definition.
export function parseEnglishEntries(json: unknown): EnDictEntry[] {
  if (!Array.isArray(json)) return []
  const out: EnDictEntry[] = []
  for (const d of json as any[]) {
    const word = strOrNull(d?.word)
    if (!word) continue
    // The top-level phonetic is often missing while one of the phonetics[]
    // variants still carries text.
    const phonetic =
      strOrNull(d?.phonetic) ??
      (Array.isArray(d?.phonetics)
        ? (d.phonetics.map((p: any) => strOrNull(p?.text)).find(Boolean) ?? null)
        : null)
    const meanings: EnDictMeaning[] = []
    for (const m of Array.isArray(d?.meanings) ? d.meanings : []) {
      const definitions: EnDictDef[] = []
      for (const def of Array.isArray(m?.definitions) ? m.definitions : []) {
        const definition = strOrNull(def?.definition)
        if (!definition) continue
        definitions.push({
          definition,
          example: strOrNull(def?.example),
          synonyms: strArray(def?.synonyms)
        })
      }
      if (definitions.length === 0) continue
      meanings.push({
        partOfSpeech: strOrNull(m?.partOfSpeech) ?? '',
        definitions,
        synonyms: strArray(m?.synonyms)
      })
    }
    if (meanings.length === 0) continue
    out.push({ word, phonetic, meanings, source: 'online' })
  }
  return out
}

// ---- offline (WordNet) ----

const POS_LABEL: Record<EnPos, string> = {
  n: 'noun',
  v: 'verb',
  a: 'adjective',
  r: 'adverb'
}
// The order senses are shown in, matching how print dictionaries lead.
const POS_ORDER: EnPos[] = ['n', 'v', 'a', 'r']

interface LemmaRow {
  lemma: string
  pos: EnPos
  offsets: number[]
}

const parseJsonArray = <T,>(raw: unknown): T[] => {
  try {
    const v = JSON.parse(String(raw))
    return Array.isArray(v) ? (v as T[]) : []
  } catch {
    return []
  }
}

// Every base form worth trying for a query: the word itself, WordNet's
// irregular-form table (ran → run), and Morphy's suffix rules. Exported for
// tests.
export function candidatesFor(query: string): string[] {
  const q = query.toLowerCase().trim()
  if (!q) return []
  const out = new Set<string>([q])
  try {
    const rows = getDictDb()
      .prepare('SELECT lemmas FROM en_exc WHERE form = ?')
      .all(q) as { lemmas: string }[]
    for (const r of rows) for (const l of parseJsonArray<string>(r.lemmas)) out.add(l)
  } catch {
    // No dictionary installed / table missing: suffix rules still apply.
  }
  for (const c of morphyCandidates(q)) out.add(c)
  return [...out]
}

export function lookupOffline(query: string): EnDictEntry[] {
  const db = getDictDb()
  const candidates = candidatesFor(query)
  if (candidates.length === 0) return []

  const placeholders = candidates.map(() => '?').join(', ')
  const rows = db
    .prepare(`SELECT lemma, pos, offsets FROM en_lemma WHERE lemma IN (${placeholders})`)
    .all(...candidates) as { lemma: string; pos: string; offsets: string }[]
  if (rows.length === 0) return []

  const lemmas: LemmaRow[] = rows.map((r) => ({
    lemma: r.lemma,
    pos: r.pos as EnPos,
    offsets: parseJsonArray<number>(r.offsets)
  }))

  // One entry per matched headword; the queried spelling first, then any other
  // base forms the morphology reached.
  const q = query.toLowerCase().trim()
  const byLemma = new Map<string, LemmaRow[]>()
  for (const row of lemmas) {
    const list = byLemma.get(row.lemma) ?? []
    list.push(row)
    byLemma.set(row.lemma, list)
  }
  const ordered = [...byLemma.entries()].sort(([a], [b]) =>
    a === q ? -1 : b === q ? 1 : a.localeCompare(b)
  )

  // Batch-load every synset the matched lemmas point at (one query, not one per
  // sense), then every pronunciation.
  const wanted = new Map<string, { def: string; examples: string[]; words: string[] }>()
  const keys: { pos: EnPos; offset: number }[] = []
  for (const row of lemmas) for (const off of row.offsets) keys.push({ pos: row.pos, offset: off })
  if (keys.length > 0) {
    const clause = keys.map(() => '(pos = ? AND offset = ?)').join(' OR ')
    const params: unknown[] = []
    for (const k of keys) params.push(k.pos, k.offset)
    const synRows = db
      .prepare(`SELECT pos, offset, def, examples, words FROM en_synset WHERE ${clause}`)
      .all(...params) as Record<string, unknown>[]
    for (const s of synRows) {
      wanted.set(`${s.pos}:${s.offset}`, {
        def: s.def as string,
        examples: parseJsonArray<string>(s.examples),
        words: parseJsonArray<string>(s.words)
      })
    }
  }

  const pronOf = (word: string): string | null => {
    const row = db.prepare('SELECT ipa FROM en_pron WHERE word = ?').get(word) as
      | { ipa: string }
      | undefined
    return row ? `/${row.ipa}/` : null
  }

  const entries: EnDictEntry[] = []
  for (const [lemma, posRows] of ordered) {
    const meanings: EnDictMeaning[] = []
    for (const pos of POS_ORDER) {
      const row = posRows.find((r) => r.pos === pos)
      if (!row) continue
      const definitions: EnDictDef[] = []
      for (const offset of row.offsets) {
        const syn = wanted.get(`${pos}:${offset}`)
        if (!syn) continue
        definitions.push({
          definition: syn.def,
          example: syn.examples[0] ?? null,
          // The rest of the synset IS the synonym set.
          synonyms: syn.words.filter((w) => w.toLowerCase() !== lemma)
        })
      }
      if (definitions.length === 0) continue
      // No meaning-level synonyms offline: each definition already carries its
      // own synset, and unioning them across senses reads as nonsense (a
      // "mouse" is not both a rodent and a black eye at once).
      meanings.push({ partOfSpeech: POS_LABEL[pos], definitions, synonyms: [] })
    }
    if (meanings.length === 0) continue
    entries.push({ word: lemma, phonetic: pronOf(lemma), meanings, source: 'offline' })
  }
  return entries
}

// ---- online (dictionaryapi.dev) ----

async function lookupOnline(term: string): Promise<EnDictEntry[]> {
  // Interactive search box: fail fast instead of stalling the spinner.
  const res = await fetchWithRetry(`${API}/${encodeURIComponent(term)}`, {
    timeoutMs: 15_000,
    rateLimitWaits: 0
  })
  if (res.status === 404) return [] // unknown word, not an error
  if (!res.ok) throw new Error(`Dictionary lookup failed (HTTP ${res.status})`)
  return parseEnglishEntries(await res.json())
}

export async function lookup(term: string): Promise<EnDictEntry[]> {
  const q = term.trim().toLowerCase()
  if (!q) return []
  if (hasEnglishDict()) {
    try {
      const offline = lookupOffline(q)
      if (offline.length > 0) return offline
    } catch {
      // A broken offline DB must not block the online path.
    }
  }
  return lookupOnline(q)
}
