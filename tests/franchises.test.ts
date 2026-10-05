import { describe, expect, it } from 'vitest'
import {
  FRANCHISES,
  communityScoreFor,
  entryMediaType,
  franchiseBackgroundKey,
  franchiseCfg,
  franchiseArtUrls,
  franchiseHeroUrls,
  franchisesForItem,
  nextRouteEntry,
  normalizeGameTitle
} from '../src/shared/franchises'
import type { MediaItem, MediaType } from '../src/shared/types'

// The external_source values each media type's importers write.
const SOURCES_BY_TYPE: Record<MediaType, string[]> = {
  anime: ['anilist'],
  manga: ['anilist'],
  visual_novel: ['vndb'],
  game: ['steam', 'igdb', 'rawg'],
  movie: ['tmdb'],
  tv: ['tmdb'],
  book: ['openlibrary']
}

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

  it('keeps chrono positive integers, with every original game in a story-ordered franchise', () => {
    for (const f of FRANCHISES) {
      // Ties are allowed (an adaptation shares its source's story slot), and an
      // entry from a separate continuity may omit it — the Story view sinks
      // those below the order. A game original without one would be an omission.
      const chronos = f.entries.map((e) => e.chrono).filter((c) => c != null)
      for (const c of chronos) expect(Number.isInteger(c) && c! >= 1).toBe(true)
      if (chronos.length === 0) continue
      for (const e of f.entries)
        if (entryMediaType(e) === 'game' && !e.spinOff)
          expect(e.chrono, `${f.id}/${e.id}: missing chrono`).toBeDefined()
    }
  })

  it('keeps route positions unique positive integers per franchise', () => {
    for (const f of FRANCHISES) {
      const routes = f.entries.map((e) => e.route).filter((r): r is number => r != null)
      expect(new Set(routes).size, `${f.id}: duplicate route position`).toBe(routes.length)
      for (const r of routes) expect(Number.isInteger(r) && r >= 1).toBe(true)
      // A route with no core stop could never offer a "Next up".
      if (routes.length)
        expect(f.entries.some((e) => e.route != null && !e.optional), `${f.id}: all-optional route`).toBe(true)
    }
  })

  it('uses a known media type and that type’s external sources', () => {
    for (const f of FRANCHISES) {
      for (const e of f.entries) {
        const allowed = SOURCES_BY_TYPE[entryMediaType(e)]
        expect(allowed, `${f.id}/${e.id}: unknown media type`).toBeDefined()
        for (const ref of e.externalIds ?? []) {
          expect(allowed, `${f.id}/${e.id}: source ${ref.source}`).toContain(ref.source)
          expect(ref.id, `${f.id}/${e.id}: blank external id`).toMatch(/^\S+$/)
        }
      }
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
      // The hero rides in the per-franchise cache set too.
      expect(franchiseArtUrls(f)).toContain(f.heroUrl)
      for (const url of franchiseArtUrls(f)) {
        expect(url).toMatch(/^https:\/\//)
        expect(url, `${f.id}: unfilled art URL`).not.toContain('TODO')
      }
    }
    const heroes = franchiseHeroUrls()
    expect(Object.keys(heroes).sort()).toEqual(FRANCHISES.map((f) => f.id).sort())
  })

  it('names the settings row the export sanitizer wipes (LIKE franchise.%)', () => {
    expect(franchiseBackgroundKey('zelda')).toBe('franchise.zelda.background')
  })

  it('keeps mc within the 0-100 range and years sane', () => {
    for (const f of FRANCHISES) {
      for (const e of f.entries) {
        if (e.mc != null) {
          expect(e.mc).toBeGreaterThanOrEqual(1)
          expect(e.mc).toBeLessThanOrEqual(100)
        }
        expect(e.year).toBeGreaterThanOrEqual(1930)
        expect(e.year).toBeLessThanOrEqual(2027)
        if (e.releaseDate) expect(e.releaseDate.slice(0, 4)).toBe(String(e.year))
      }
    }
  })

  it('never lets one title/alias normalize into another same-type entry of the franchise', () => {
    // The false-positive guard: within a franchise and media type every match
    // candidate must be unique, or one library row could light up two rows
    // (or the wrong one). Matching never crosses types, so the Steins;Gate
    // novel and anime may share a title.
    for (const f of FRANCHISES) {
      const seen = new Map<string, string>()
      for (const e of f.entries) {
        for (const cand of [e.title, ...(e.aliases ?? [])]) {
          const norm = `${entryMediaType(e)}:${normalizeGameTitle(cand)}`
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

describe('communityScoreFor', () => {
  const item = (metadata: Record<string, unknown> | null): MediaItem =>
    ({ metadata }) as MediaItem
  const entry = FRANCHISES[0].entries.find((e) => e.mc != null)!

  it('prefers the library row metadata over the hardcoded fallback', () => {
    expect(communityScoreFor(entry, item({ metacritic: 88 }))).toBe(88)
    expect(communityScoreFor(entry, item({ igdbRating: 77.4 }))).toBe(77)
  })

  it('reads every importer’s rating in mediaRepo.COMMUNITY_SQL order', () => {
    expect(communityScoreFor(entry, item({ averageScore: 83, metacritic: 70 }))).toBe(83)
    expect(communityScoreFor(entry, item({ vndbRating: 90.2 }))).toBe(90)
    expect(communityScoreFor(entry, item({ imdbRating: 8.6 }))).toBe(86)
  })

  it('falls back to the curated mc when unowned or unscored', () => {
    expect(communityScoreFor(entry, null)).toBe(entry.mc)
    expect(communityScoreFor(entry, item(null))).toBe(entry.mc)
    expect(communityScoreFor(entry, item({ metacritic: 0 }))).toBe(entry.mc)
  })

  it('returns null when neither exists', () => {
    const bare = { ...entry, mc: undefined }
    expect(communityScoreFor(bare, null)).toBeNull()
  })
})

describe('franchise routes and memberships', () => {
  const sa = franchiseCfg('science-adventure')!

  it('offers the first unfinished core route stop, skipping optional detours', () => {
    expect(nextRouteEntry(sa, () => false)?.id).toBe('sa-noah')
    const done = new Set(['sa-noah', 'sa-sg-vn'])
    // The optional Steins;Gate anime (route 3) is never "Next up".
    expect(nextRouteEntry(sa, (e) => done.has(e.id))?.id).toBe('sa-rn-vn')
    expect(nextRouteEntry(sa, () => true)).toBeNull()
    expect(nextRouteEntry(franchiseCfg('zelda')!, () => false)).toBeNull()
  })

  it('places one library row in its franchise with the next stop', () => {
    const row = {
      id: 1,
      mediaType: 'visual_novel',
      title: 'STEINS;GATE',
      titleOriginal: null,
      externalSource: 'vndb',
      externalId: '2002'
    } as MediaItem
    const [hit, ...rest] = franchisesForItem(row)
    expect(rest).toEqual([])
    expect(hit.cfg.id).toBe('science-adventure')
    expect(hit.entry.id).toBe('sa-sg-vn')
    expect(hit.next?.id).toBe('sa-sg-anime')
    // Same title, other type: the anime row, never the novel.
    expect(franchisesForItem({ ...row, mediaType: 'anime', externalSource: null, externalId: null })[0].entry.id).toBe(
      'sa-sg-anime'
    )
    expect(franchisesForItem({ ...row, mediaType: 'movie' })).toEqual([])
  })
})
