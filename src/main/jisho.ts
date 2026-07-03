import { fetchWithRetry } from './http'
import type { JishoResult } from '@shared/types'

// Dictionary lookups for the vocab-mining page, via jisho.org's free JSON API
// (no key). Like hltb.ts, every failure path returns an empty result — a
// dictionary miss must never surface as an exception in the renderer.

const API = 'https://jisho.org/api/v1/search/words'
const UA =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

/* eslint-disable @typescript-eslint/no-explicit-any */

// Exported for tests: maps one raw Jisho entry, or null if it has no usable
// Japanese form.
export function mapEntry(d: any): JishoResult | null {
  const jp = d?.japanese?.[0]
  const word = jp?.word ?? jp?.reading
  if (!word) return null
  const meanings = (d?.senses ?? [])
    .slice(0, 2)
    .map((s: any) => (s?.english_definitions ?? []).join(', '))
    .filter(Boolean)
    .join('; ')
  if (!meanings) return null
  return {
    slug: d?.slug ?? word,
    word,
    reading: jp?.reading ?? null,
    meanings,
    pos: d?.senses?.[0]?.parts_of_speech?.[0] ?? null,
    isCommon: !!d?.is_common,
    jlpt: d?.jlpt?.[0] ?? null
  }
}

export async function lookup(term: string): Promise<JishoResult[]> {
  const q = term.trim()
  if (!q) return []
  try {
    const res = await fetchWithRetry(`${API}?keyword=${encodeURIComponent(q)}`, {
      headers: { 'User-Agent': UA },
      signal: AbortSignal.timeout(15_000)
    })
    if (!res.ok) return []
    const json: any = await res.json()
    if (!Array.isArray(json?.data)) return []
    return json.data
      .map(mapEntry)
      .filter((r: JishoResult | null): r is JishoResult => r !== null)
      .slice(0, 5)
  } catch {
    return []
  }
}
