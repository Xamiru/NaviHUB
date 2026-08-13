import { getSqlite } from './db/connection'
import { downloadImages } from './files'
import { updateActivity } from './progress'
import { fetchWithRetry, sleep } from './http'
import * as settingsRepo from './repos/settingsRepo'
import type {
  BulkListParams,
  BulkPreviewItem,
  ImportSearchResult,
  ImportSummary,
  MediaType
} from '@shared/types'
import { bulkSourceCfg } from '@shared/bulkImport'

// The Movie Database (TMDB) — the free, standard source for movie + TV data.
// Requires a personal API key (free from themoviedb.org), stored in settings
// under `tmdb.api_key`. Letterboxd/IMDb have no usable public API; TMDB is what
// Letterboxd itself is built on. Movies and TV share this client; TV omits crew
// (directors aren't tracked for TV) but shares the actor pool with movies.
const BASE = 'https://api.themoviedb.org/3'
const IMG = 'https://image.tmdb.org/t/p'
const SOURCE = 'tmdb'

function apiKey(): string {
  const key = settingsRepo.get('tmdb.api_key')?.trim()
  if (!key) {
    throw new Error('Add your TMDB API key in Settings before importing.')
  }
  return key
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function tmdbGet(path: string, params: Record<string, string> = {}): Promise<any> {
  const url = new URL(`${BASE}${path}`)
  url.searchParams.set('api_key', apiKey())
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetchWithRetry(url.toString(), { headers: { Accept: 'application/json' } })
  if (res.status === 401) throw new Error('Invalid TMDB API key — check it in Settings.')
  if (!res.ok) throw new Error(`TMDB request failed (${res.status})`)
  return res.json()
}

function posterUrl(path: string | null | undefined, size = 'w500'): string | null {
  return path ? `${IMG}/${size}${path}` : null
}
function profileUrl(path: string | null | undefined): string | null {
  return path ? `${IMG}/w185${path}` : null
}

// Official backdrops for a movie/show (the wallpaper Browse dialog's TMDB tab).
// Lives here so the API-key handling stays in one module; pictures.ts turns the
// file paths into thumb (w780) / full (original) image URLs.
export async function fetchBackdrops(
  mediaType: 'movie' | 'tv',
  tmdbId: string
): Promise<{ filePath: string; width: number | null; height: number | null }[]> {
  const data = await tmdbGet(`/${mediaType}/${tmdbId}/images`)
  return (data.backdrops ?? [])
    .filter((b: any) => b?.file_path)
    .map((b: any) => ({
      filePath: b.file_path as string,
      width: Number.isFinite(b.width) ? b.width : null,
      height: Number.isFinite(b.height) ? b.height : null
    }))
}
function yearOf(date: string | null | undefined): number | null {
  if (!date) return null
  const y = Number(date.slice(0, 4))
  return Number.isFinite(y) ? y : null
}

// ---------------- OMDb (IMDb rating + Rotten Tomatoes) ----------------
// Optional enrichment: if an OMDb key is set, we look a title up by its IMDb id
// (TMDB gives us that) and stash IMDb / Rotten Tomatoes / Metascore into the
// media item's metadata, shown beside the user's own score. Never fatal — any
// failure just skips enrichment.
function omdbKey(): string | null {
  return settingsRepo.get('omdb.api_key')?.trim() || null
}

async function fetchOmdb(imdbId: string | null | undefined): Promise<Record<string, number> | null> {
  const key = omdbKey()
  if (!key || !imdbId) return null
  try {
    const url = new URL('https://www.omdbapi.com/')
    url.searchParams.set('apikey', key)
    url.searchParams.set('i', imdbId)
    const res = await fetchWithRetry(url.toString())
    if (!res.ok) return null
    const d = await res.json()
    if (d.Response === 'False') return null
    const patch: Record<string, number> = {}
    const rating = parseFloat(d.imdbRating)
    if (Number.isFinite(rating)) patch.imdbRating = rating
    const votes = parseInt(String(d.imdbVotes ?? '').replace(/,/g, ''), 10)
    if (Number.isFinite(votes)) patch.imdbVotes = votes
    const rt = (d.Ratings ?? []).find((x: any) => x.Source === 'Rotten Tomatoes')
    if (rt) {
      const v = parseInt(rt.Value, 10)
      if (Number.isFinite(v)) patch.rottenTomatoes = v
    }
    const ms = parseInt(d.Metascore, 10)
    if (Number.isFinite(ms)) patch.metascore = ms
    return Object.keys(patch).length ? patch : null
  } catch {
    return null
  }
}

// ---------------- Search ----------------
export async function search(query: string): Promise<ImportSearchResult[]> {
  if (!query.trim()) return []
  const data = await tmdbGet('/search/movie', { query, include_adult: 'false' })
  return (data?.results ?? []).slice(0, 12).map((m: any) => ({
    id: m.id,
    title: m.title || m.original_title || 'Untitled',
    native: m.original_title && m.original_title !== m.title ? m.original_title : null,
    year: yearOf(m.release_date),
    format: 'Movie',
    episodes: null,
    coverUrl: posterUrl(m.poster_path, 'w185')
  }))
}

export async function searchTv(query: string): Promise<ImportSearchResult[]> {
  if (!query.trim()) return []
  const data = await tmdbGet('/search/tv', { query, include_adult: 'false' })
  return (data?.results ?? []).slice(0, 12).map((m: any) => ({
    id: m.id,
    title: m.name || m.original_name || 'Untitled',
    native: m.original_name && m.original_name !== m.name ? m.original_name : null,
    year: yearOf(m.first_air_date),
    format: 'TV',
    episodes: null,
    coverUrl: posterUrl(m.poster_path, 'w185')
  }))
}

// ---------------- Top lists (the /bulk page) ----------------
// /discover with server-side sort + filters, 20 results a page (page <= 500).
// "Top rated" needs a vote floor or a 10.0-rated film with 3 votes tops the
// list; TV gets a lower floor (episode-vote pools run smaller than movies').
const DISCOVER_SORTS: Record<string, string> = {
  popular: 'popularity.desc',
  rated: 'vote_average.desc'
}

// Pure + exported for tests.
export function buildDiscoverParams(
  kind: 'movie' | 'tv',
  params: BulkListParams,
  page: number
): Record<string, string> {
  const sort = DISCOVER_SORTS[params.sort]
  if (!sort) throw new Error(`Unknown TMDB sort: ${params.sort}`)
  const dateField = kind === 'movie' ? 'primary_release_date' : 'first_air_date'
  const out: Record<string, string> = {
    sort_by: sort,
    include_adult: 'false',
    page: String(page)
  }
  if (params.sort === 'rated') out['vote_count.gte'] = kind === 'movie' ? '300' : '150'
  if (params.yearFrom) out[`${dateField}.gte`] = `${params.yearFrom}-01-01`
  if (params.yearTo) out[`${dateField}.lte`] = `${params.yearTo}-12-31`
  if (params.genre) {
    const id = bulkSourceCfg(kind).genreIds?.[params.genre]
    if (!id) throw new Error(`Unknown TMDB genre: ${params.genre}`)
    out.with_genres = String(id)
  }
  // TV bulk lists exclude daily filler (user directive: "no late night shows
  // and such"): News 10763, Soap 10766, Talk 10767. Server-side, so excluded
  // rows never consume page slots.
  if (kind === 'tv') out.without_genres = TV_EXCLUDED_GENRE_IDS.join(',')
  return out
}

export const TV_EXCLUDED_GENRE_IDS = [10763, 10766, 10767] // News, Soap, Talk

// Anime is tracked in the Anime section via AniList — a TV bulk list must not
// re-import it as TMDB rows (user directive). TMDB has no "anime" genre; the
// working definition is Animation (16) with Japanese original language, which
// keeps western animation and Japanese live-action in.
const TMDB_ANIMATION_GENRE_ID = 16
export function isTmdbAnime(m: { genre_ids?: number[]; original_language?: string }): boolean {
  return (
    (m.genre_ids ?? []).includes(TMDB_ANIMATION_GENRE_ID) && String(m.original_language) === 'ja'
  )
}

// Standing user directive (the old bulk-import.cjs --exclude-langs flag, now
// always on): Indian releases dominate TMDB's popularity lists via regional
// traffic, and the user wants none on a bulk shelf. Discover has no
// without_original_language param, so rows are dropped by original_language
// after the fetch — the paging loop keeps crawling until count is filled.
// Importing an individual title through the normal dialog is unaffected.
export const EXCLUDED_ORIGINAL_LANGS = new Set([
  'hi', // Hindi
  'ta', // Tamil
  'te', // Telugu
  'ml', // Malayalam
  'kn', // Kannada
  'bn', // Bengali
  'mr', // Marathi
  'pa', // Punjabi
  'gu' // Gujarati
])

// `keep` + page cap: see anilist.topList — dropped rows (already in the
// library, excluded languages, TV anime) don't count toward `count`, so the
// list is always topped up with new titles.
export async function discoverTop(
  kind: 'movie' | 'tv',
  params: BulkListParams,
  pageDelayMs = 300,
  keep: (item: BulkPreviewItem) => boolean = () => true
): Promise<BulkPreviewItem[]> {
  const out: BulkPreviewItem[] = []
  const maxPage = Math.min(500, Math.max(25, Math.ceil(params.count / 20) * 5)) // 500 = TMDB's hard limit
  for (let page = 1; page <= maxPage; page++) {
    let data: Awaited<ReturnType<typeof tmdbGet>>
    try {
      data = await tmdbGet(`/discover/${kind}`, buildDiscoverParams(kind, params, page))
    } catch (e) {
      // A page mid-crawl failing must not discard everything already fetched —
      // return the partial list (the anilist.topList posture).
      if (out.length > 0) return out
      throw e
    }
    const results = data?.results ?? []
    for (const m of results) {
      if (EXCLUDED_ORIGINAL_LANGS.has(String(m.original_language ?? ''))) continue
      if (kind === 'tv' && isTmdbAnime(m)) continue
      const item: BulkPreviewItem = {
        sourceId: m.id,
        title: (kind === 'movie' ? m.title || m.original_title : m.name || m.original_name) || 'Untitled',
        year: yearOf(kind === 'movie' ? m.release_date : m.first_air_date),
        coverUrl: posterUrl(m.poster_path, 'w185'),
        score: typeof m.vote_average === 'number' ? m.vote_average : null
      }
      if (!keep(item)) continue
      out.push(item)
      if (out.length >= params.count) return out
    }
    if (results.length === 0 || page >= (data?.total_pages ?? 1)) return out
    if (pageDelayMs > 0) await sleep(pageDelayMs)
  }
  return out
}

// ---------------- Shared persistence ----------------
const MAX_CAST = 30 // casts can be huge; keep the top-billed.

// Maps a TMDB crew job to one of our internal credit roles (or null to skip —
// we only keep the headline crew, not every grip and gaffer).
function mapCrewJob(job: string | null): string | null {
  const j = (job ?? '').toLowerCase()
  if (j === 'director') return 'director'
  if (j === 'screenplay' || j === 'writer' || j === 'story' || j === 'author') return 'writer'
  if (j === 'original music composer' || j === 'music') return 'composer'
  return null
}

// Synchronous on purpose: images are pre-downloaded (files.downloadImages) so
// these can run inside the import transaction; `photo`/`img` is the stored
// relative path, or null.
function upsertCompany(db: any, node: any): number {
  const ext = String(node.id)
  const row = db
    .prepare('SELECT id FROM company WHERE external_source=? AND external_id=?')
    .get(SOURCE, ext) as { id: number } | undefined
  if (row) return row.id
  const info = db
    .prepare('INSERT INTO company (name, type, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(node.name, 'studio', SOURCE, ext)
  return Number(info.lastInsertRowid)
}

function upsertPerson(db: any, node: any, photo: string | null): number {
  const ext = String(node.id)
  const row = db
    .prepare('SELECT id, photo_path FROM person WHERE external_source=? AND external_id=?')
    .get(SOURCE, ext) as { id: number; photo_path: string | null } | undefined
  if (row) {
    if (!row.photo_path && photo) {
      db.prepare('UPDATE person SET photo_path=? WHERE id=?').run(photo, row.id)
    }
    return row.id
  }
  const info = db
    .prepare('INSERT INTO person (name, photo_path, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(node.name ?? 'Unknown', photo, SOURCE, ext)
  return Number(info.lastInsertRowid)
}

// A TMDB "character" is keyed by the cast credit_id (stable per role), since
// TMDB has no global character entities like AniList.
function upsertCharacter(db: any, name: string, creditId: string, img: string | null): number {
  const row = db
    .prepare('SELECT id, image_path FROM character WHERE external_source=? AND external_id=?')
    .get(SOURCE, creditId) as { id: number; image_path: string | null } | undefined
  if (row) {
    if (!row.image_path && img) {
      db.prepare('UPDATE character SET image_path=? WHERE id=?').run(img, row.id)
    }
    return row.id
  }
  const info = db
    .prepare('INSERT INTO character (name, image_path, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(name, img, SOURCE, creditId)
  return Number(info.lastInsertRowid)
}

interface NormalizedTitle {
  externalId: string
  mediaType: Extract<MediaType, 'movie' | 'tv'>
  title: string
  native: string | null
  synopsis: string | null
  posterPath: string | null // raw TMDB poster path
  totalUnits: number | null
  releaseDate: string | null
  companies: any[] // TMDB company/network nodes
  genres: any[] // {name}
  cast: any[] // TMDB cast edges
  crew: any[] // TMDB crew edges (empty for TV)
  extraMeta?: Record<string, number> | null // OMDb scores merged into metadata
}

// The authoritative import shared by movies + TV: refreshes canonical fields but
// preserves personal tracking, and prunes cast no longer present (mirrors AniList).
// Two phases like the AniList importer: every download first, then all DB writes
// in one transaction so a failed import can't leave a half-written title.
async function persistTitle(n: NormalizedTitle): Promise<ImportSummary> {
  const castEdges: any[] = [...n.cast]
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, MAX_CAST)

  const coverUrl = posterUrl(n.posterPath, 'w500')
  const images = await downloadImages([
    coverUrl,
    ...castEdges.map((e) => profileUrl(e.profile_path)),
    ...n.crew.filter((e) => mapCrewJob(e.job)).map((e) => profileUrl(e.profile_path))
  ])
  const img = (url: string | null): string | null => (url ? (images.get(url) ?? null) : null)

  const db = getSqlite()
  updateActivity({ phase: 'writing' })
  return db.transaction((): ImportSummary => {
    const coverPath = img(coverUrl)

    // ---- media (preserve personal tracking on re-import) ----
    const existing = db
      .prepare('SELECT id FROM media_item WHERE external_source = ? AND external_id = ?')
      .get(SOURCE, n.externalId) as { id: number } | undefined

    let mediaId: number
    const created = !existing
    if (existing) {
      mediaId = existing.id
      db.prepare(
        `UPDATE media_item SET title=?, title_original=?, synopsis=?, cover_path=COALESCE(?, cover_path),
         total_units=?, release_date=?, updated_at=datetime('now') WHERE id=?`
      ).run(n.title, n.native, n.synopsis, coverPath, n.totalUnits, n.releaseDate, mediaId)
    } else {
      const info = db
        .prepare(
          `INSERT INTO media_item
           (media_type, title, title_original, synopsis, cover_path, total_units, release_date,
            external_source, external_id)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          n.mediaType,
          n.title,
          n.native,
          n.synopsis,
          coverPath,
          n.totalUnits,
          n.releaseDate,
          SOURCE,
          n.externalId
        )
      mediaId = Number(info.lastInsertRowid)
    }

    // ---- OMDb scores (IMDb / Rotten Tomatoes) -> metadata, merged so re-import
    // keeps any other metadata keys. Shown beside the user's own score. ----
    if (n.extraMeta) {
      const metaRow = db.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId) as
        | { metadata: string | null }
        | undefined
      let metaObj: Record<string, unknown> = {}
      if (metaRow?.metadata) {
        try {
          metaObj = JSON.parse(metaRow.metadata) || {}
        } catch {
          metaObj = {}
        }
      }
      for (const [k, v] of Object.entries(n.extraMeta)) if (v != null) metaObj[k] = v
      db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(
        Object.keys(metaObj).length ? JSON.stringify(metaObj) : null,
        mediaId
      )
    }

    // ---- production companies / networks (cap a few) ----
    let studios = 0
    for (const node of n.companies.slice(0, 3)) {
      const companyId = upsertCompany(db, node)
      db.prepare(
        'INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)'
      ).run(mediaId, companyId, 'production_studio')
      studios++
    }

    // ---- genres -> tags ----
    for (const g of n.genres) {
      const existingTag = db.prepare('SELECT id FROM tag WHERE name=?').get(g.name) as
        | { id: number }
        | undefined
      const tagId = existingTag
        ? existingTag.id
        : Number(
            db.prepare('INSERT INTO tag (name, category) VALUES (?, ?)').run(g.name, 'genre').lastInsertRowid
          )
      db.prepare('INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(mediaId, tagId)
    }

    // ---- cast (actor playing a character), top-billed first ----
    let cast = 0
    let order = 0
    const keptCharacterIds = new Set<number>()
    for (const edge of castEdges) {
      const characterName = (edge.character ?? '').trim()
      if (!characterName) continue // skip uncredited / nameless roles
      const profile = img(profileUrl(edge.profile_path))
      const personId = upsertPerson(db, edge, profile)
      const characterId = upsertCharacter(db, characterName, String(edge.credit_id), profile)
      keptCharacterIds.add(characterId)
      const sortOrder = order++
      db.prepare(
        `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)
         ON CONFLICT(media_id, character_id) DO UPDATE SET sort_order = excluded.sort_order`
      ).run(mediaId, characterId, sortOrder)
      const dup = db
        .prepare('SELECT id FROM credit WHERE media_id=? AND person_id=? AND character_id IS ? AND role=?')
        .get(mediaId, personId, characterId, 'actor') as { id: number } | undefined
      if (dup) {
        db.prepare('UPDATE credit SET importance=? WHERE id=?').run(sortOrder, dup.id)
      } else {
        db.prepare(
          'INSERT INTO credit (media_id, person_id, character_id, role, importance) VALUES (?, ?, ?, ?, ?)'
        ).run(mediaId, personId, characterId, 'actor', sortOrder)
      }
      cast++
    }

    // ---- prune TMDB characters no longer in the imported set (authoritative) ----
    const linked = db
      .prepare(
        `SELECT mc.character_id AS cid FROM media_character mc
         JOIN character ch ON ch.id = mc.character_id
         WHERE mc.media_id = ? AND ch.external_source = ?`
      )
      .all(mediaId, SOURCE) as { cid: number }[]
    for (const { cid } of linked) {
      if (!keptCharacterIds.has(cid)) {
        db.prepare('DELETE FROM credit WHERE media_id = ? AND character_id = ?').run(mediaId, cid)
        db.prepare('DELETE FROM media_character WHERE media_id = ? AND character_id = ?').run(mediaId, cid)
      }
    }
    // Characters about to be swept may sit on user lists (list_item has no FK to
    // enforce this — repos clean up on manual delete, so imports must too).
    db.prepare(
      `DELETE FROM list_item
       WHERE list_id IN (SELECT id FROM list WHERE entity_kind = 'character')
       AND entity_id IN (SELECT id FROM character WHERE external_source = ?
                         AND id NOT IN (SELECT character_id FROM media_character))`
    ).run(SOURCE)
    db.prepare(
      `DELETE FROM character WHERE external_source = ?
       AND id NOT IN (SELECT character_id FROM media_character)`
    ).run(SOURCE)

    // ---- crew (director, writer, composer) — skipped for TV (empty array) ----
    let staff = 0
    const seenCrew = new Set<string>()
    for (const edge of n.crew) {
      const role = mapCrewJob(edge.job)
      if (!role) continue
      const personId = upsertPerson(db, edge, img(profileUrl(edge.profile_path)))
      const key = `${personId}:${role}`
      if (seenCrew.has(key)) continue
      seenCrew.add(key)
      const dup = db
        .prepare('SELECT id FROM credit WHERE media_id=? AND person_id=? AND role=? AND character_id IS NULL')
        .get(mediaId, personId, role)
      if (!dup) {
        db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)').run(
          mediaId,
          personId,
          role
        )
      }
      staff++
    }

    return { mediaId, title: n.title, studios, cast, staff, created }
  })()
}

// ---------------- Import ----------------
// opts.skipOmdb is the bulk path: OMDb free keys allow 1000 requests/day, which
// one big bulk run would burn through. Detail-page re-import enriches later.
export async function importMovie(
  tmdbId: number,
  opts: { skipOmdb?: boolean } = {}
): Promise<ImportSummary> {
  const m = await tmdbGet(`/movie/${tmdbId}`, { append_to_response: 'credits' })
  if (!m?.id) throw new Error('Movie not found on TMDB')
  const title = m.title || m.original_title || 'Untitled'
  return persistTitle({
    externalId: String(m.id),
    mediaType: 'movie',
    title,
    native: m.original_title && m.original_title !== title ? m.original_title : null,
    synopsis: m.overview || null,
    posterPath: m.poster_path ?? null,
    totalUnits: m.runtime ?? null,
    releaseDate: m.release_date || null,
    companies: m.production_companies ?? [],
    genres: m.genres ?? [],
    cast: m.credits?.cast ?? [],
    crew: m.credits?.crew ?? [],
    extraMeta: opts.skipOmdb ? null : await fetchOmdb(m.imdb_id) // TMDB movies carry imdb_id directly
  })
}

export async function importTv(
  tmdbId: number,
  opts: { skipOmdb?: boolean } = {}
): Promise<ImportSummary> {
  // external_ids gives us the IMDb id (TV details omit it otherwise) for OMDb.
  const m = await tmdbGet(`/tv/${tmdbId}`, { append_to_response: 'aggregate_credits,external_ids' })
  if (!m?.id) throw new Error('TV show not found on TMDB')
  const title = m.name || m.original_name || 'Untitled'
  // Networks first, then production companies, for the "Networks" section.
  const companies = [...(m.networks ?? []), ...(m.production_companies ?? [])]
  // Per-episode runtime (minutes) → metadata.epDuration for /stats time estimates.
  // episode_run_time is an array of typical lengths; average it, else fall back to
  // the most recent aired episode's runtime. May be absent for some shows.
  const runTimes: number[] = (m.episode_run_time ?? []).filter((n: unknown) => typeof n === 'number' && n > 0)
  const epDuration = runTimes.length
    ? Math.round(runTimes.reduce((a, b) => a + b, 0) / runTimes.length)
    : (m.last_episode_to_air?.runtime ?? null)
  const omdb = opts.skipOmdb ? null : await fetchOmdb(m.external_ids?.imdb_id)
  const extraMeta =
    epDuration && epDuration > 0 ? { ...(omdb ?? {}), epDuration } : omdb
  return persistTitle({
    externalId: String(m.id),
    mediaType: 'tv',
    title,
    native: m.original_name && m.original_name !== title ? m.original_name : null,
    synopsis: m.overview || null,
    posterPath: m.poster_path ?? null,
    totalUnits: m.number_of_episodes ?? null,
    releaseDate: m.first_air_date || null,
    companies,
    genres: m.genres ?? [],
    // TV uses aggregate_credits: a person's character lives in a `roles[]` array
    // (aggregated across episodes), not a single `character` field as on movies.
    // The plain /tv credits endpoint only returns ~main regulars, so this is the
    // full billed cast. Flatten each person's primary role into a movie-shaped edge.
    cast: (m.aggregate_credits?.cast ?? []).map((c: any) => {
      const primary = c.roles?.[0] ?? {}
      return {
        id: c.id,
        name: c.name,
        profile_path: c.profile_path,
        order: c.order,
        character: primary.character ?? '',
        credit_id: primary.credit_id ?? `agg_${c.id}`
      }
    }),
    crew: [], // TV directors aren't tracked — actors are shared with movies.
    extraMeta
  })
}
