import { fetchWithRetry } from './http'
import type { EnDictDef, EnDictEntry, EnDictMeaning } from '@shared/types'

// English→English lookups for the /english dictionary page, via the Free
// Dictionary API (dictionaryapi.dev, no key). Unlike jisho.ts, a real failure
// here throws — the renderer's QueryCache.onError toast is the right surface
// for "the dictionary is down"; only an unknown word (404) is an empty result.

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
    out.push({ word, phonetic, meanings })
  }
  return out
}

export async function lookup(term: string): Promise<EnDictEntry[]> {
  const q = term.trim().toLowerCase()
  if (!q) return []
  // Interactive search box: fail fast instead of stalling the spinner.
  const res = await fetchWithRetry(`${API}/${encodeURIComponent(q)}`, {
    timeoutMs: 15_000,
    rateLimitWaits: 0
  })
  if (res.status === 404) return [] // unknown word, not an error
  if (!res.ok) throw new Error(`Dictionary lookup failed (HTTP ${res.status})`)
  return parseEnglishEntries(await res.json())
}
