// Matches curated franchise entries against the user's game library. Pure and
// deterministic so tests/franchiseMatch.test.ts can exercise it directly.
//
// Two passes, each library item consumed at most once:
//   1. external ids — exact (external_source, external_id) equality, the
//      strong signal (steam appids etc. are authored into the data files).
//   2. normalized title equality against the entry title + its aliases, vs
//      the item's title + titleOriginal. EQUALITY ONLY, never substrings:
//      a substring rule would match "Final Fantasy VII" against "Final
//      Fantasy VII Remake", and remakes are separate canon entries.

import type { MediaItem } from '../types'
import type { FranchiseEntry } from './types'

// Lowercase, strip trademark glyphs and diacritics, collapse every non-
// alphanumeric run to a single space. "Yakuza 0™" / "YAKUZA: 0" / "yakuza 0"
// all meet at 'yakuza 0'. Numerals are left alone — Roman vs Arabic variants
// ("Final Fantasy 7") are handled by explicit aliases, not clever rewriting.
export function normalizeGameTitle(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/[™®©]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export function matchLibrary(
  entries: FranchiseEntry[],
  items: MediaItem[]
): Map<string, MediaItem> {
  const matched = new Map<string, MediaItem>()
  const taken = new Set<number>()

  // Pass 1 — external ids.
  const byExternal = new Map<string, MediaItem>()
  for (const it of items) {
    if (it.externalSource && it.externalId) {
      const key = `${it.externalSource}:${it.externalId}`
      // First row wins on duplicates (stable: api.media.list default order).
      if (!byExternal.has(key)) byExternal.set(key, it)
    }
  }
  for (const entry of entries) {
    for (const ref of entry.externalIds ?? []) {
      const hit = byExternal.get(`${ref.source}:${ref.id}`)
      if (hit && !taken.has(hit.id)) {
        matched.set(entry.id, hit)
        taken.add(hit.id)
        break
      }
    }
  }

  // Pass 2 — normalized titles, over the items still unclaimed.
  const byTitle = new Map<string, MediaItem>()
  for (const it of items) {
    if (taken.has(it.id)) continue
    for (const raw of [it.title, it.titleOriginal]) {
      if (!raw) continue
      const key = normalizeGameTitle(raw)
      if (key && !byTitle.has(key)) byTitle.set(key, it)
    }
  }
  for (const entry of entries) {
    if (matched.has(entry.id)) continue
    for (const candidate of [entry.title, ...(entry.aliases ?? [])]) {
      const hit = byTitle.get(normalizeGameTitle(candidate))
      if (hit && !taken.has(hit.id)) {
        matched.set(entry.id, hit)
        taken.add(hit.id)
        break
      }
    }
  }

  return matched
}
