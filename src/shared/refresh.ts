import type { MediaType } from './types'

// Library Refresh — vocabulary as code (the @shared/bulkImport.ts idiom).
//
// A refresh re-runs a title's own importer but writes only the ASPECTS you
// picked. Aspect keys are FROZEN: they ride IPC payloads and the remembered
// selection, so renaming one silently drops it from a saved choice.
//
// The rule the whole feature turns on lives in the importers, not here: a
// partial refresh writes media_item columns (and tv_episode when asked) and
// touches nothing else — no characters, credits, companies, genres, relations
// or staff — because those code paths PRUNE, and two of the three character
// prunes sweep orphans source-globally rather than per media id.

export type RefreshAspect = 'cover' | 'banner' | 'episodes' | 'text'

export interface RefreshAspectDef {
  key: RefreshAspect
  label: string
  hint: string
  // Types whose source can actually serve this aspect. VNDB, Steam and Open
  // Library write no banner_path at all, and only TV has an episode catalogue.
  types: MediaType[]
}

const ALL_TYPES: MediaType[] = ['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv', 'book']

export const REFRESH_ASPECTS: RefreshAspectDef[] = [
  {
    key: 'cover',
    label: 'Cover art',
    hint: 'Re-pull the poster from the source',
    types: ALL_TYPES
  },
  {
    key: 'banner',
    label: 'Hero art',
    hint: 'AniList banners and TMDB backdrops — the wide art on detail pages',
    types: ['anime', 'manga', 'movie', 'tv']
  },
  {
    key: 'episodes',
    label: 'Episodes',
    hint: 'The season/episode catalogue. One request per season, so the slow one',
    types: ['tv']
  },
  {
    key: 'text',
    label: 'Text and scores',
    hint: 'Title, synopsis, dates, counts and community scores',
    types: ALL_TYPES
  }
]

// Which importer owns a row. Keyed by external_source rather than media_type
// because the row is what decides: a game may be a live 'steam' row or a legacy
// 'rawg'/'igdb' one, and RAWG's API is dead — those rows are NOT refreshable
// and are reported as skipped rather than failed.
export const REFRESHABLE_SOURCES = ['anilist', 'tmdb', 'vndb', 'steam', 'openlibrary'] as const
export type RefreshableSource = (typeof REFRESHABLE_SOURCES)[number]

export function isRefreshableSource(source: string | null | undefined): source is RefreshableSource {
  return !!source && (REFRESHABLE_SOURCES as readonly string[]).includes(source)
}

export interface RefreshRequest {
  types: MediaType[]
  aspects: RefreshAspect[]
  // Default true: only titles MISSING at least one chosen aspect. Untick to
  // force every title through, which is the "I changed my source" case.
  onlyMissing: boolean
}

// The aspects worth offering for the current type selection — the UI greys out
// the rest rather than silently ignoring a tick the run could never honour.
export function aspectsForTypes(types: MediaType[]): RefreshAspect[] {
  return REFRESH_ASPECTS.filter((a) => types.some((t) => a.types.includes(t))).map((a) => a.key)
}

// The aspects that actually apply to ONE type, so the runner can hand each
// importer a selection it can serve (asking VNDB for a banner is a no-op, but
// an explicit one).
export function aspectsForType(aspects: RefreshAspect[], type: MediaType): RefreshAspect[] {
  const supported = new Set(REFRESH_ASPECTS.filter((a) => a.types.includes(type)).map((a) => a.key))
  return aspects.filter((a) => supported.has(a))
}

// SQL fragment per aspect for the onlyMissing filter, against media_item `m`.
// `text` has no honest "is it missing" test — a synopsis can be legitimately
// absent at the source — so it uses the closest proxy and is documented as such
// in the UI: a title with neither synopsis nor unit count.
export const MISSING_SQL: Record<RefreshAspect, string> = {
  cover: 'm.cover_path IS NULL',
  banner: 'm.banner_path IS NULL',
  episodes: 'NOT EXISTS (SELECT 1 FROM tv_episode e WHERE e.media_id = m.id)',
  text: '(m.synopsis IS NULL OR m.total_units IS NULL)'
}

// A title qualifies when ANY chosen aspect is missing — you asked for four
// things, so a title lacking one of them is worth the request.
export function missingClause(aspects: RefreshAspect[]): string {
  const parts = aspects.map((a) => MISSING_SQL[a])
  return parts.length ? `(${parts.join(' OR ')})` : '1=1'
}
