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
//
// 'full' is not a partial refresh at all: it runs the ordinary import-dialog
// import (no `only`, full AniList cast), so every child block is rewritten
// authoritatively from a complete payload. It subsumes the other metadata
// aspects; ticking 'text' beside it also spends the OMDb request per movie.

export type RefreshAspect = 'cover' | 'episodes' | 'text' | 'themes' | 'full' | 'length'

export interface RefreshAspectDef {
  key: RefreshAspect
  label: string
  hint: string
  // Types whose source can actually serve this aspect. Only TV has an episode
  // catalogue, and only AniList anime have theme songs.
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
    key: 'episodes',
    label: 'Episodes',
    hint: 'The season/episode catalogue. One request per season, so the slow one',
    types: ['tv']
  },
  {
    key: 'themes',
    label: 'Anime theme songs',
    hint: 'Compare and repair OP/ED songs and missing local audio from AnimeThemes',
    types: ['anime']
  },
  {
    key: 'text',
    label: 'Text and scores',
    hint: 'Title, synopsis, dates, counts and community scores',
    types: ALL_TYPES
  },
  {
    key: 'length',
    label: 'Game length',
    hint: 'HowLongToBeat play times for any game, whatever source it came from',
    types: ['game']
  },
  {
    key: 'full',
    label: 'Full re-import',
    hint: 'Everything, including cast, tags, relations and people. AniList runs take hours',
    types: ALL_TYPES
  }
]

// Which importer owns a row. Keyed by external_source rather than media_type
// because the row is what decides: a game may be a live 'steam' row or a legacy
// 'rawg'/'igdb' one. RAWG's API is dead, but 'rawg' rows (API era and offline
// catalog alike) share the catalog's RAWG ids, so they refresh from the local
// catalog while it is installed. 'launchbox' rows come from the games catalog
// v2, which also serves the cover and cast of any game linked to it. 'igdb'
// rows are not refreshable, except for the source-free 'length' aspect.
export const REFRESHABLE_SOURCES = ['anilist', 'tmdb', 'vndb', 'steam', 'openlibrary', 'hardcover', 'rawg', 'launchbox'] as const
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
  // Retry: exactly these titles, whatever they are missing.
  mediaIds?: number[]
}

// The aspects worth offering for the current type selection — the UI greys out
// the rest rather than silently ignoring a tick the run could never honour.
export function aspectsForTypes(types: MediaType[]): RefreshAspect[] {
  return REFRESH_ASPECTS.filter((a) => types.some((t) => a.types.includes(t))).map((a) => a.key)
}

// The aspects that actually apply to ONE type, so the runner can hand each
// importer a selection it can serve (asking VNDB for episodes is a no-op, but
// an explicit one).
export function aspectsForType(aspects: RefreshAspect[], type: MediaType): RefreshAspect[] {
  const supported = new Set(REFRESH_ASPECTS.filter((a) => a.types.includes(type)).map((a) => a.key))
  return aspects.filter((a) => supported.has(a))
}

// SQL fragment per aspect for the onlyMissing filter, against media_item `m`.
// `text` has no honest "is it missing" test — a synopsis can be legitimately
// absent at the source — so it uses the closest proxies: no synopsis or unit
// count, or no community score from the source that supplies one on every
// title (TMDB rows through OMDb's IMDb rating, AniList's average). A title the
// source genuinely has no score for is picked again on each such run.
// json_extract raises on malformed JSON, so the CASE only reads valid metadata.
const scoreMissing = (source: string, key: string): string =>
  `(m.external_source = '${source}' AND (CASE WHEN json_valid(m.metadata)
     THEN json_extract(m.metadata, '$.${key}') END) IS NULL)`

export const MISSING_SQL: Record<RefreshAspect, string> = {
  cover: 'm.cover_path IS NULL',
  episodes: 'NOT EXISTS (SELECT 1 FROM tv_episode e WHERE e.media_id = m.id)',
  themes: 'NOT EXISTS (SELECT 1 FROM theme_song t WHERE t.media_id = m.id)',
  text: `(m.synopsis IS NULL OR m.total_units IS NULL OR ${scoreMissing('tmdb', 'imdbRating')}
    OR ${scoreMissing('anilist', 'averageScore')})`,
  length: `(CASE WHEN json_valid(m.metadata) THEN json_extract(m.metadata, '$.hltb') END) IS NULL`,
  // Nothing marks a title as fully re-imported, so every title qualifies. The
  // runner takes least-recently-updated rows first, so a cancelled run started
  // again reaches the untouched titles before the ones it already did.
  full: '1=1'
}

// A title qualifies when ANY chosen aspect is missing — you asked for one or more
// things, so a title lacking one of them is worth the request.
export function missingClause(aspects: RefreshAspect[]): string {
  // Filtered because a retired key (the old 'banner') can still arrive from a
  // renderer that was open across the upgrade.
  const parts = aspects.filter((a) => a in MISSING_SQL).map((a) => MISSING_SQL[a])
  return parts.length ? `(${parts.join(' OR ')})` : '1=1'
}
