import { getSqlite } from './db/connection'
import { fetchWithRetry } from './http'
import { downloadImage } from './files'
import * as tasks from './tasks'
import { cooperativeGate, type PauseGate } from './taskControls'
import type { MusicArtResult, MusicArtStatus } from '@shared/types'

// Online fallback for album covers / artist photos the scanner couldn't find
// locally. Zero API keys: Deezer's public API covers both albums and artists;
// the iTunes Search API is the album fallback. Guiding rule: no art beats
// wrong art — fuzzy matches are rejected, and every attempt (found or not)
// stamps art_checked_at so the bulk job never refetch-loops on misses.

// ---------------------------------------------------------------------------
// Pure matching helpers (exported for tests).
// ---------------------------------------------------------------------------

// Lowercase, strip diacritics/punctuation, collapse spaces, and drop trailing
// edition suffixes like "(Deluxe Edition)" / "[2009 Remaster]" so a folder
// named "OK Computer" matches Deezer's "OK Computer (Deluxe)".
export function normalizeForMatch(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s*[([][^)\]]*(deluxe|remaster|edition|expanded|bonus|anniversary)[^)\]]*[)\]]\s*$/i, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

export interface AlbumCandidate {
  artist: string
  album: string
  coverUrl: string | null
}

// Best confident cover among search results: the artist must match exactly
// (or contain the wanted name — "feat." noise), the album on equality or
// prefix/containment. Anything fuzzier is rejected.
export function pickBestAlbumMatch(
  candidates: AlbumCandidate[],
  wantArtist: string,
  wantAlbum: string
): { coverUrl: string } | null {
  const nArtist = normalizeForMatch(wantArtist)
  const nAlbum = normalizeForMatch(wantAlbum)
  if (!nArtist || !nAlbum) return null
  for (const c of candidates) {
    if (!c.coverUrl) continue
    const ca = normalizeForMatch(c.artist)
    const cb = normalizeForMatch(c.album)
    const artistOk = ca === nArtist || ca.includes(nArtist) || nArtist.includes(ca)
    const albumOk = cb === nAlbum || cb.startsWith(nAlbum) || nAlbum.startsWith(cb)
    if (artistOk && albumOk) return { coverUrl: c.coverUrl }
  }
  return null
}

export function pickBestArtistMatch(
  candidates: { name: string; pictureUrl: string | null }[],
  wantName: string
): { pictureUrl: string } | null {
  const want = normalizeForMatch(wantName)
  if (!want) return null
  for (const c of candidates) {
    if (c.pictureUrl && normalizeForMatch(c.name) === want) return { pictureUrl: c.pictureUrl }
  }
  return null
}

// ---------------------------------------------------------------------------
// Providers.
// ---------------------------------------------------------------------------

async function getJson(url: string): Promise<unknown | null> {
  try {
    const res = await fetchWithRetry(url)
    if (!res.ok) return null
    return await res.json()
  } catch {
    return null
  }
}

async function deezerAlbums(artist: string, album: string): Promise<AlbumCandidate[]> {
  const exact = await getJson(
    `https://api.deezer.com/search/album?q=${encodeURIComponent(`artist:"${artist}" album:"${album}"`)}`
  )
  let data = (exact as { data?: unknown[] })?.data ?? []
  if (data.length === 0) {
    const loose = await getJson(
      `https://api.deezer.com/search/album?q=${encodeURIComponent(`${artist} ${album}`)}`
    )
    data = (loose as { data?: unknown[] })?.data ?? []
  }
  return data.map((d) => {
    const r = d as { title?: string; cover_xl?: string; artist?: { name?: string } }
    return { artist: r.artist?.name ?? '', album: r.title ?? '', coverUrl: r.cover_xl ?? null }
  })
}

async function itunesAlbums(artist: string, album: string): Promise<AlbumCandidate[]> {
  const json = await getJson(
    `https://itunes.apple.com/search?term=${encodeURIComponent(`${artist} ${album}`)}&entity=album&limit=5`
  )
  const results = (json as { results?: unknown[] })?.results ?? []
  return results.map((d) => {
    const r = d as { artistName?: string; collectionName?: string; artworkUrl100?: string }
    return {
      artist: r.artistName ?? '',
      album: r.collectionName ?? '',
      // iTunes serves arbitrary sizes by rewriting the dimension in the URL.
      coverUrl: r.artworkUrl100 ? r.artworkUrl100.replace('100x100', '600x600') : null
    }
  })
}

async function deezerArtists(name: string): Promise<{ name: string; pictureUrl: string | null }[]> {
  const json = await getJson(`https://api.deezer.com/search/artist?q=${encodeURIComponent(name)}`)
  const data = (json as { data?: unknown[] })?.data ?? []
  return data.map((d) => {
    const r = d as { name?: string; picture_xl?: string }
    return { name: r.name ?? '', pictureUrl: r.picture_xl ?? null }
  })
}

// ---------------------------------------------------------------------------
// Fetch + apply.
// ---------------------------------------------------------------------------

async function findAlbumCoverUrl(artist: string, album: string): Promise<string | null> {
  const deezer = pickBestAlbumMatch(await deezerAlbums(artist, album), artist, album)
  if (deezer) return deezer.coverUrl
  const itunes = pickBestAlbumMatch(await itunesAlbums(artist, album), artist, album)
  return itunes?.coverUrl ?? null
}

export async function fetchAlbumArt(albumId: number): Promise<MusicArtResult> {
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT al.title, ar.name AS artist_name FROM music_album al
       JOIN music_artist ar ON ar.id = al.artist_id WHERE al.id = ?`
    )
    .get(albumId) as { title: string; artist_name: string } | undefined
  if (!row) return { updated: false, path: null, sourceUrl: null, reason: 'not_found' }

  const url = await findAlbumCoverUrl(row.artist_name, row.title)
  const stamp = db.prepare(
    `UPDATE music_album SET art_checked_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`
  )
  if (!url) {
    stamp.run(albumId)
    return { updated: false, path: null, sourceUrl: null, reason: 'not_found' }
  }
  const path = await downloadImage(url)
  if (!path) {
    // network hiccup — don't stamp art_checked_at, so the bulk job retries
    return { updated: false, path: null, sourceUrl: url, reason: 'download_failed' }
  }
  db.prepare(
    `UPDATE music_album SET cover_path = ?, art_source_url = ?, art_checked_at = datetime('now'),
     updated_at = datetime('now') WHERE id = ?`
  ).run(path, url, albumId)
  return { updated: true, path, sourceUrl: url, reason: 'ok' }
}

export async function fetchArtistImage(artistId: number): Promise<MusicArtResult> {
  const db = getSqlite()
  const row = db.prepare('SELECT name FROM music_artist WHERE id = ?').get(artistId) as
    | { name: string }
    | undefined
  if (!row) return { updated: false, path: null, sourceUrl: null, reason: 'not_found' }

  const match = pickBestArtistMatch(await deezerArtists(row.name), row.name)
  const stamp = db.prepare(
    `UPDATE music_artist SET art_checked_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`
  )
  if (!match) {
    stamp.run(artistId)
    return { updated: false, path: null, sourceUrl: null, reason: 'not_found' }
  }
  const path = await downloadImage(match.pictureUrl)
  if (!path) {
    return { updated: false, path: null, sourceUrl: match.pictureUrl, reason: 'download_failed' }
  }
  db.prepare(
    `UPDATE music_artist SET cover_path = ?, art_source_url = ?, art_checked_at = datetime('now'),
     updated_at = datetime('now') WHERE id = ?`
  ).run(path, match.pictureUrl, artistId)
  return { updated: true, path, sourceUrl: match.pictureUrl, reason: 'ok' }
}

// Clearing also resets art_checked_at so a later bulk run tries again. Local
// folder/embedded art will simply be restored by the next scan.
export function clearAlbumArt(albumId: number): void {
  getSqlite()
    .prepare(
      `UPDATE music_album SET cover_path = NULL, art_source_url = NULL, art_checked_at = NULL,
       updated_at = datetime('now') WHERE id = ?`
    )
    .run(albumId)
}

export function clearArtistArt(artistId: number): void {
  getSqlite()
    .prepare(
      `UPDATE music_artist SET cover_path = NULL, art_source_url = NULL, art_checked_at = NULL,
       updated_at = datetime('now') WHERE id = ?`
    )
    .run(artistId)
}

// ---------------------------------------------------------------------------
// Bulk "fetch missing art" job — sequential + throttled, cancellable, resumable
// (already-checked rows are excluded by the WHERE, so a killed job just
// continues where it left off next run). Status is polled like the scanner's.
// ---------------------------------------------------------------------------

const artState: MusicArtStatus = { running: false, done: 0, total: 0, updated: 0 }
// Cooperative pause/cancel between albums. Resumable by design — already-checked
// rows are excluded by the WHERE — so stopping loses nothing.
let gate: PauseGate | null = null

export function getArtStatus(): MusicArtStatus {
  return { ...artState }
}

export function cancelArtFetch(): void {
  gate?.controls.cancel?.()
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

export async function fetchMissingArt(): Promise<MusicArtStatus> {
  if (artState.running) throw new Error('Art fetch already running')
  // `handle` is assigned by runTask before it invokes the body, so the gate's
  // paused/resumed callbacks below can reach it — they only ever fire from
  // inside the loop. The gate itself must exist first, because `controls` is
  // read when the task is created.
  let handle: tasks.TaskHandle
  const runGate = cooperativeGate(
    () => handle.progress({ state: 'paused' }),
    () => handle.progress({ state: 'running' })
  )
  gate = runGate
  return tasks.runTask(
    {
      kind: 'musicArt',
      label: 'Fetching missing music art',
      route: '/music',
      controls: runGate.controls,
      project: () => ({ done: artState.done, total: artState.total })
    },
    (h) => {
      handle = h
      return fetchMissingArtInner(runGate)
    }
  )
}

async function fetchMissingArtInner(runGate: PauseGate): Promise<MusicArtStatus> {
  const db = getSqlite()
  const albums = db
    .prepare(
      'SELECT id FROM music_album WHERE cover_path IS NULL AND art_checked_at IS NULL ORDER BY id'
    )
    .all() as { id: number }[]
  const artists = db
    .prepare(
      'SELECT id FROM music_artist WHERE cover_path IS NULL AND art_checked_at IS NULL ORDER BY id'
    )
    .all() as { id: number }[]

  Object.assign(artState, { running: true, done: 0, total: albums.length + artists.length, updated: 0 })
  try {
    for (const { id } of albums) {
      // Guarded await — see bulkImport: an unconditional one adds a microtask
      // hop per item and shifts when a cancel takes effect.
      if (runGate.paused) await runGate.wait()
      if (runGate.cancelled) break
      const res = await fetchAlbumArt(id)
      artState.done += 1
      if (res.updated) artState.updated += 1
      await sleep(200)
    }
    for (const { id } of artists) {
      if (runGate.paused) await runGate.wait()
      if (runGate.cancelled) break
      const res = await fetchArtistImage(id)
      artState.done += 1
      if (res.updated) artState.updated += 1
      await sleep(200)
    }
  } finally {
    artState.running = false
  }
  return { ...artState }
}
