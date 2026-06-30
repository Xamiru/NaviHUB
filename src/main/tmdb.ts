import { getSqlite } from './db/connection'
import { downloadImage } from './files'
import * as settingsRepo from './repos/settingsRepo'
import type { ImportSearchResult, ImportSummary, MediaType } from '@shared/types'

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
  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } })
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
    const res = await fetch(url.toString())
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

async function upsertCompany(db: any, node: any): Promise<number> {
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

async function upsertPerson(db: any, node: any): Promise<number> {
  const ext = String(node.id)
  const row = db
    .prepare('SELECT id, photo_path FROM person WHERE external_source=? AND external_id=?')
    .get(SOURCE, ext) as { id: number; photo_path: string | null } | undefined
  if (row) {
    if (!row.photo_path && node.profile_path) {
      const p = await downloadImage(profileUrl(node.profile_path))
      if (p) db.prepare('UPDATE person SET photo_path=? WHERE id=?').run(p, row.id)
    }
    return row.id
  }
  const photo = await downloadImage(profileUrl(node.profile_path))
  const info = db
    .prepare('INSERT INTO person (name, photo_path, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(node.name ?? 'Unknown', photo, SOURCE, ext)
  return Number(info.lastInsertRowid)
}

// A TMDB "character" is keyed by the cast credit_id (stable per role), since
// TMDB has no global character entities like AniList.
async function upsertCharacter(
  db: any,
  name: string,
  creditId: string,
  profilePath?: string | null
): Promise<number> {
  const row = db
    .prepare('SELECT id, image_path FROM character WHERE external_source=? AND external_id=?')
    .get(SOURCE, creditId) as { id: number; image_path: string | null } | undefined
  if (row) {
    if (!row.image_path && profilePath) {
      const p = await downloadImage(profileUrl(profilePath))
      if (p) db.prepare('UPDATE character SET image_path=? WHERE id=?').run(p, row.id)
    }
    return row.id
  }
  const img = await downloadImage(profileUrl(profilePath))
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
async function persistTitle(n: NormalizedTitle): Promise<ImportSummary> {
  const db = getSqlite()
  const coverPath = await downloadImage(posterUrl(n.posterPath, 'w500'))

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
    const companyId = await upsertCompany(db, node)
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
  const castEdges: any[] = [...n.cast]
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
    .slice(0, MAX_CAST)

  let cast = 0
  let order = 0
  const keptCharacterIds = new Set<number>()
  for (const edge of castEdges) {
    const characterName = (edge.character ?? '').trim()
    if (!characterName) continue // skip uncredited / nameless roles
    const personId = await upsertPerson(db, edge)
    const characterId = await upsertCharacter(db, characterName, String(edge.credit_id), edge.profile_path)
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
    const personId = await upsertPerson(db, edge)
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
}

// ---------------- Import ----------------
export async function importMovie(tmdbId: number): Promise<ImportSummary> {
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
    extraMeta: await fetchOmdb(m.imdb_id) // TMDB movies carry imdb_id directly
  })
}

export async function importTv(tmdbId: number): Promise<ImportSummary> {
  // external_ids gives us the IMDb id (TV details omit it otherwise) for OMDb.
  const m = await tmdbGet(`/tv/${tmdbId}`, { append_to_response: 'aggregate_credits,external_ids' })
  if (!m?.id) throw new Error('TV show not found on TMDB')
  const title = m.name || m.original_name || 'Untitled'
  // Networks first, then production companies, for the "Networks" section.
  const companies = [...(m.networks ?? []), ...(m.production_companies ?? [])]
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
    extraMeta: await fetchOmdb(m.external_ids?.imdb_id)
  })
}
