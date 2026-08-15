import { describe, expect, it } from 'vitest'
import {
  FRANCHISES,
  franchiseCfg,
  franchiseArtUrls,
  metaScoreFor,
  normalizeGameTitle
} from '../src/shared/franchises'
import type { MediaItem } from '../src/shared/types'

// Structural integrity of the curated franchise data. Ids are frozen
// vocabulary (persisted UI state, route params), entries must actually be in
// release order (the Release view renders the array as-is), and every art URL
// must be a real https URL — 'https://TODO' placeholders may not ship.

describe('franchise catalog', () => {
  it('has unique franchise ids and resolvable lookups', () => {
    const ids = FRANCHISES.map((f) => f.id)
    expect(new Set(ids).size).toBe(ids.length)
    for (const id of ids) expect(franchiseCfg(id)?.id).toBe(id)
    expect(franchiseCfg('nope')).toBeNull()
  })

  it('has valid accent colors', () => {
    for (const f of FRANCHISES) expect(f.color).toMatch(/^#[0-9a-f]{6}$/i)
  })

  it('has unique entry and character ids across ALL franchises', () => {
    const entryIds = FRANCHISES.flatMap((f) => f.entries.map((e) => e.id))
    const charIds = FRANCHISES.flatMap((f) => f.characters.map((c) => c.id))
    expect(new Set(entryIds).size).toBe(entryIds.length)
    expect(new Set(charIds).size).toBe(charIds.length)
  })

  it('lists entries in release order (year, then releaseDate)', () => {
    for (const f of FRANCHISES) {
      for (let i = 1; i < f.entries.length; i++) {
        const a = f.entries[i - 1]
        const b = f.entries[i]
        const ok =
          a.year < b.year ||
          (a.year === b.year && (a.releaseDate ?? '') <= (b.releaseDate ?? ''))
        expect(ok, `${f.id}: ${a.id} must precede ${b.id}`).toBe(true)
      }
    }
  })

  it('keeps chrono indexes unique, and all-or-none per franchise', () => {
    for (const f of FRANCHISES) {
      const chronos = f.entries.map((e) => e.chrono).filter((c) => c != null)
      expect(new Set(chronos).size).toBe(chronos.length)
      // Either a full story order or none at all — a partial one would sort
      // arbitrarily in the Story view.
      expect(
        chronos.length === 0 || chronos.length === f.entries.length,
        `${f.id}: partial chrono`
      ).toBe(true)
    }
  })

  it('points every character appearance at a real entry of the same franchise', () => {
    for (const f of FRANCHISES) {
      const entryIds = new Set(f.entries.map((e) => e.id))
      for (const c of f.characters)
        for (const ref of c.appearsIn)
          expect(entryIds.has(ref), `${f.id}/${c.id}: unknown entry '${ref}'`).toBe(true)
    }
  })

  it('has verified https art URLs everywhere (no placeholders)', () => {
    for (const f of FRANCHISES) {
      for (const url of franchiseArtUrls(f)) {
        expect(url).toMatch(/^https:\/\//)
        expect(url, `${f.id}: unfilled art URL`).not.toContain('TODO')
      }
    }
  })

  it('keeps mc within Metacritic range and years sane', () => {
    for (const f of FRANCHISES) {
      for (const e of f.entries) {
        if (e.mc != null) {
          expect(e.mc).toBeGreaterThanOrEqual(1)
          expect(e.mc).toBeLessThanOrEqual(100)
        }
        expect(e.year).toBeGreaterThanOrEqual(1980)
        expect(e.year).toBeLessThanOrEqual(2027)
        if (e.releaseDate) expect(e.releaseDate.slice(0, 4)).toBe(String(e.year))
      }
    }
  })

  it('never lets one title/alias normalize into another entry of the same franchise', () => {
    // The false-positive guard: within a franchise every match candidate must
    // be unique, or one library row could light up two rows (or the wrong one).
    for (const f of FRANCHISES) {
      const seen = new Map<string, string>()
      for (const e of f.entries) {
        for (const cand of [e.title, ...(e.aliases ?? [])]) {
          const norm = normalizeGameTitle(cand)
          expect(
            seen.has(norm),
            `${f.id}: '${cand}' (${e.id}) collides with ${seen.get(norm)}`
          ).toBe(false)
          seen.set(norm, e.id)
        }
      }
    }
  })
})

describe('metaScoreFor', () => {
  const item = (metadata: Record<string, unknown> | null): MediaItem =>
    ({ metadata }) as MediaItem
  const entry = FRANCHISES[0].entries.find((e) => e.mc != null)!

  it('prefers the library row metadata over the hardcoded fallback', () => {
    expect(metaScoreFor(entry, item({ metacritic: 88 }))).toBe(88)
    expect(metaScoreFor(entry, item({ igdbRating: 77.4 }))).toBe(77)
  })

  it('falls back to the curated mc when unowned or unscored', () => {
    expect(metaScoreFor(entry, null)).toBe(entry.mc)
    expect(metaScoreFor(entry, item(null))).toBe(entry.mc)
    expect(metaScoreFor(entry, item({ metacritic: 0 }))).toBe(entry.mc)
  })

  it('returns null when neither exists', () => {
    const bare = { ...entry, mc: undefined }
    expect(metaScoreFor(bare, null)).toBeNull()
  })
})
