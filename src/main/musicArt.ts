import { getSqlite } from './db/connection'
import { fetchWithRetry, sleep } from './http'
import { downloadImage } from './files'
import * as tasks from './tasks'
import { cooperativeGate, type PauseGate } from './taskControls'
import type { MusicArtResult, MusicArtStatus } from '@shared/types'

// Online fallback for art the scanner could not find locally. Albums prefer an
// exact MusicBrainz release group and Cover Art Archive front image. Remembered
// Spotify ids give identity-safe fallbacks; Deezer/iTunes remain strict-name
// fallbacks. Temporary provider failures are never cached as permanent misses.

export function normalizeForMatch(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()
}

// MusicBrainz uses Lucene syntax even after URL encoding. Escape syntax inside
// quoted field values so names such as AC/DC, !!!, +44, or titles containing a
// quote cannot change or invalidate the query.
export function escapeMusicBrainzQueryValue(value: string): string {
  return value
    .replace(/([+\-!(){}\[\]^"~*?:\\/])/g, '\\$1')
    .replace(/&&|\|\|/g, '\\$&')
}

export function musicBrainzCreditName(
  credits: { name?: string; joinphrase?: string; artist?: { name?: string } }[] | undefined
): string {
  return (credits ?? [])
    .map((credit) => `${credit.name ?? credit.artist?.name ?? ''}${credit.joinphrase ?? ''}`)
    .join('')
    .trim()
}

export interface AlbumCandidate {
  artist: string
  album: string
  coverUrl: string | null
}

export function pickBestAlbumMatch(
  candidates: AlbumCandidate[],
  wantArtist: string,
  wantAlbum: string
): { coverUrl: string } | null {
  const artist = normalizeForMatch(wantArtist)
  const album = normalizeForMatch(wantAlbum)
  if (!artist || !album) return null
  const urls = new Set(
    candidates
      .filter(
        (candidate) =>
          candidate.coverUrl &&
          normalizeForMatch(candidate.artist) === artist &&
          normalizeForMatch(candidate.album) === album
      )
      .map((candidate) => candidate.coverUrl as string)
  )
  return urls.size === 1 ? { coverUrl: [...urls][0] } : null
}

export function pickBestArtistMatch(
  candidates: { name: string; pictureUrl: string | null }[],
  wantName: string
): { pictureUrl: string } | null {
  const want = normalizeForMatch(wantName)
  if (!want) return null
  const urls = new Set(
    candidates
      .filter((candidate) => candidate.pictureUrl && normalizeForMatch(candidate.name) === want)
      .map((candidate) => candidate.pictureUrl as string)
  )
  return urls.size === 1 ? { pictureUrl: [...urls][0] } : null
}

export interface MusicBrainzReleaseGroupCandidate {
  id: string
  artist: string
  album: string
  score: number
  year: number | null
}

export function pickMusicBrainzReleaseGroup(
  candidates: MusicBrainzReleaseGroupCandidate[],
  wantArtist: string,
  wantAlbum: string,
  wantYear: number | null
): MusicBrainzReleaseGroupCandidate | null {
  const artist = normalizeForMatch(wantArtist)
  const album = normalizeForMatch(wantAlbum)
  let exact = candidates.filter(
    (candidate) =>
      candidate.score === 100 &&
      normalizeForMatch(candidate.artist) === artist &&
      normalizeForMatch(candidate.album) === album
  )
  if (exact.length > 1 && wantYear != null) {
    const sameYear = exact.filter((candidate) => candidate.year === wantYear)
    if (sameYear.length === 1) exact = sameYear
  }
  return new Set(exact.map((candidate) => candidate.id)).size === 1 ? exact[0] : null
}

type ProviderResult<T> = { kind: 'ok'; value: T } | { kind: 'miss' } | { kind: 'error' }

async function getJson(
  url: string,
  init?: RequestInit,
  missingStatuses: number[] = []
): Promise<ProviderResult<unknown>> {
  try {
    const res = await fetchWithRetry(url, { ...init, timeoutMs: 20_000 })
    if (missingStatuses.includes(res.status)) return { kind: 'miss' }
    if (!res.ok) return { kind: 'error' }
    return { kind: 'ok', value: await res.json() }
  } catch {
    return { kind: 'error' }
  }
}

async function deezerAlbums(artist: string, album: string): Promise<ProviderResult<AlbumCandidate[]>> {
  const query = async (q: string): Promise<ProviderResult<AlbumCandidate[]>> => {
    const result = await getJson(`https://api.deezer.com/search/album?q=${encodeURIComponent(q)}`)
    if (result.kind !== 'ok') return result
    const data = (result.value as { data?: unknown[] })?.data
    if (!Array.isArray(data)) return { kind: 'error' }
    return {
      kind: 'ok',
      value: data.map((item) => {
        const row = item as { title?: string; cover_xl?: string; artist?: { name?: string } }
        return {
          artist: row.artist?.name ?? '',
          album: row.title ?? '',
          coverUrl: row.cover_xl ?? null
        }
      })
    }
  }
  const exact = await query(`artist:"${artist}" album:"${album}"`)
  if (exact.kind !== 'ok' || exact.value.length > 0) return exact
  return query(`${artist} ${album}`)
}

async function itunesAlbums(artist: string, album: string): Promise<ProviderResult<AlbumCandidate[]>> {
  const result = await getJson(
    `https://itunes.apple.com/search?term=${encodeURIComponent(`${artist} ${album}`)}&entity=album&limit=5`
  )
  if (result.kind !== 'ok') return result
  const data = (result.value as { results?: unknown[] })?.results
  if (!Array.isArray(data)) return { kind: 'error' }
  return {
    kind: 'ok',
    value: data.map((item) => {
      const row = item as { artistName?: string; collectionName?: string; artworkUrl100?: string }
      return {
        artist: row.artistName ?? '',
        album: row.collectionName ?? '',
        coverUrl: row.artworkUrl100 ? row.artworkUrl100.replace('100x100', '600x600') : null
      }
    })
  }
}

async function deezerArtists(
  name: string
): Promise<ProviderResult<{ name: string; pictureUrl: string | null }[]>> {
  const result = await getJson(`https://api.deezer.com/search/artist?q=${encodeURIComponent(name)}`)
  if (result.kind !== 'ok') return result
  const data = (result.value as { data?: unknown[] })?.data
  if (!Array.isArray(data)) return { kind: 'error' }
  return {
    kind: 'ok',
    value: data.map((item) => {
      const row = item as { name?: string; picture_xl?: string }
      return { name: row.name ?? '', pictureUrl: row.picture_xl ?? null }
    })
  }
}

async function spotifyImage(
  kind: 'artist' | 'album',
  spotifyId: string | null
): Promise<ProviderResult<string>> {
  if (!spotifyId) return { kind: 'miss' }
  const source = `https://open.spotify.com/${kind}/${spotifyId}`
  const result = await getJson(
    `https://open.spotify.com/oembed?url=${encodeURIComponent(source)}`,
    undefined,
    [404]
  )
  if (result.kind !== 'ok') return result
  const url = (result.value as { thumbnail_url?: unknown })?.thumbnail_url
  return typeof url === 'string' && url ? { kind: 'ok', value: url } : { kind: 'miss' }
}

const MUSICBRAINZ_UA = 'NaviHUB/0.2 (https://github.com/AmirHTaee/NaviHUB)'
const MUSICBRAINZ_INTERVAL_MS = process.env.NODE_ENV === 'test' ? 0 : 1100
let musicBrainzQueue: Promise<void> = Promise.resolve()
let lastMusicBrainzRequest = 0

async function musicBrainzJson(url: string): Promise<ProviderResult<unknown>> {
  const before = musicBrainzQueue
  let release: () => void = () => undefined
  musicBrainzQueue = new Promise<void>((resolve) => {
    release = resolve
  })
  await before
  try {
    const wait = MUSICBRAINZ_INTERVAL_MS - (Date.now() - lastMusicBrainzRequest)
    if (wait > 0) await sleep(wait)
    const result = await getJson(url, { headers: { 'User-Agent': MUSICBRAINZ_UA } })
    lastMusicBrainzRequest = Date.now()
    return result
  } finally {
    release()
  }
}

async function musicBrainzReleaseGroups(
  artist: string,
  album: string
): Promise<ProviderResult<MusicBrainzReleaseGroupCandidate[]>> {
  const query = `releasegroup:"${escapeMusicBrainzQueryValue(album)}" AND artist:"${escapeMusicBrainzQueryValue(artist)}"`
  const result = await musicBrainzJson(
    `https://musicbrainz.org/ws/2/release-group/?query=${encodeURIComponent(query)}&fmt=json&limit=5`
  )
  if (result.kind !== 'ok') return result
  const groups = (result.value as { 'release-groups'?: unknown[] })?.['release-groups']
  if (!Array.isArray(groups)) return { kind: 'error' }
  return {
    kind: 'ok',
    value: groups.map((item) => {
      const row = item as {
        id?: string
        title?: string
        score?: number
        'first-release-date'?: string
        'artist-credit'?: {
          name?: string
          joinphrase?: string
          artist?: { name?: string }
        }[]
      }
      const year = Number(row['first-release-date']?.slice(0, 4))
      return {
        id: row.id ?? '',
        album: row.title ?? '',
        artist: musicBrainzCreditName(row['artist-credit']),
        score: Number(row.score ?? 0),
        year: Number.isInteger(year) ? year : null
      }
    })
  }
}

async function coverArtArchive(releaseGroupId: string): Promise<ProviderResult<string>> {
  const result = await getJson(
    `https://coverartarchive.org/release-group/${releaseGroupId}`,
    { headers: { 'User-Agent': MUSICBRAINZ_UA } },
    [404]
  )
  if (result.kind !== 'ok') return result
  const images = (result.value as { images?: unknown[] })?.images
  if (!Array.isArray(images)) return { kind: 'error' }
  const front = images.find((item) => (item as { front?: unknown }).front === true) as
    | { image?: string; thumbnails?: Record<string, string> }
    | undefined
  const url = front?.thumbnails?.['1200'] ?? front?.image
  return url ? { kind: 'ok', value: url } : { kind: 'miss' }
}

interface ArtLookup {
  url: string | null
  transientFailure: boolean
}

async function findAlbumCoverUrl(
  artist: string,
  album: string,
  year: number | null,
  spotifyId: string | null
): Promise<ArtLookup> {
  let transientFailure = false
  const groups = await musicBrainzReleaseGroups(artist, album)
  if (groups.kind === 'error') transientFailure = true
  if (groups.kind === 'ok') {
    const group = pickMusicBrainzReleaseGroup(groups.value, artist, album, year)
    if (group) {
      const cover = await coverArtArchive(group.id)
      if (cover.kind === 'ok') return { url: cover.value, transientFailure }
      if (cover.kind === 'error') transientFailure = true
    }
  }

  const spotify = await spotifyImage('album', spotifyId)
  if (spotify.kind === 'ok') return { url: spotify.value, transientFailure }
  if (spotify.kind === 'error') transientFailure = true

  const deezer = await deezerAlbums(artist, album)
  if (deezer.kind === 'ok') {
    const match = pickBestAlbumMatch(deezer.value, artist, album)
    if (match) return { url: match.coverUrl, transientFailure }
  } else if (deezer.kind === 'error') transientFailure = true

  const itunes = await itunesAlbums(artist, album)
  if (itunes.kind === 'ok') {
    const match = pickBestAlbumMatch(itunes.value, artist, album)
    if (match) return { url: match.coverUrl, transientFailure }
  } else if (itunes.kind === 'error') transientFailure = true
  return { url: null, transientFailure }
}

export async function fetchAlbumArt(albumId: number): Promise<MusicArtResult> {
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT al.title, al.year, al.spotify_id, ar.name AS artist_name FROM music_album al
       JOIN music_artist ar ON ar.id = al.artist_id WHERE al.id = ?`
    )
    .get(albumId) as
    | { title: string; year: number | null; spotify_id: string | null; artist_name: string }
    | undefined
  if (!row) return { updated: false, path: null, sourceUrl: null, reason: 'not_found' }

  const lookup = await findAlbumCoverUrl(row.artist_name, row.title, row.year, row.spotify_id)
  const stamp = db.prepare(
    `UPDATE music_album SET art_checked_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`
  )
  if (!lookup.url) {
    if (!lookup.transientFailure) stamp.run(albumId)
    return {
      updated: false,
      path: null,
      sourceUrl: null,
      reason: lookup.transientFailure ? 'download_failed' : 'not_found'
    }
  }
  const path = await downloadImage(lookup.url)
  if (!path) return { updated: false, path: null, sourceUrl: lookup.url, reason: 'download_failed' }
  db.prepare(
    `UPDATE music_album SET cover_path = ?, art_source_url = ?, art_checked_at = datetime('now'),
     updated_at = datetime('now') WHERE id = ?`
  ).run(path, lookup.url, albumId)
  return { updated: true, path, sourceUrl: lookup.url, reason: 'ok' }
}

export async function fetchArtistImage(artistId: number): Promise<MusicArtResult> {
  const db = getSqlite()
  const row = db.prepare('SELECT name, spotify_id FROM music_artist WHERE id = ?').get(artistId) as
    | { name: string; spotify_id: string | null }
    | undefined
  if (!row) return { updated: false, path: null, sourceUrl: null, reason: 'not_found' }

  let transientFailure = false
  const spotify = await spotifyImage('artist', row.spotify_id)
  let url = spotify.kind === 'ok' ? spotify.value : null
  if (spotify.kind === 'error') transientFailure = true
  if (!url) {
    const deezer = await deezerArtists(row.name)
    if (deezer.kind === 'ok') url = pickBestArtistMatch(deezer.value, row.name)?.pictureUrl ?? null
    if (deezer.kind === 'error') transientFailure = true
  }

  const stamp = db.prepare(
    `UPDATE music_artist SET art_checked_at = datetime('now'), updated_at = datetime('now') WHERE id = ?`
  )
  if (!url) {
    if (!transientFailure) stamp.run(artistId)
    return {
      updated: false,
      path: null,
      sourceUrl: null,
      reason: transientFailure ? 'download_failed' : 'not_found'
    }
  }
  const path = await downloadImage(url)
  if (!path) return { updated: false, path: null, sourceUrl: url, reason: 'download_failed' }
  db.prepare(
    `UPDATE music_artist SET cover_path = ?, art_source_url = ?, art_checked_at = datetime('now'),
     updated_at = datetime('now') WHERE id = ?`
  ).run(path, url, artistId)
  return { updated: true, path, sourceUrl: url, reason: 'ok' }
}

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

const artState: MusicArtStatus = {
  running: false,
  cancelled: false,
  done: 0,
  total: 0,
  updated: 0,
  missing: 0,
  failed: 0
}
let gate: PauseGate | null = null

export function getArtStatus(): MusicArtStatus {
  return { ...artState }
}

export function cancelArtFetch(): void {
  gate?.controls.cancel?.()
}

export async function fetchMissingArt(): Promise<MusicArtStatus> {
  if (artState.running) throw new Error('Art fetch already running')
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
      `SELECT id FROM music_album WHERE cover_path IS NULL
       ORDER BY art_checked_at IS NULL DESC, id`
    )
    .all() as { id: number }[]
  const artists = db
    .prepare(
      `SELECT id FROM music_artist WHERE cover_path IS NULL
       ORDER BY art_checked_at IS NULL DESC, id`
    )
    .all() as { id: number }[]

  Object.assign(artState, {
    running: true,
    cancelled: false,
    done: 0,
    total: albums.length + artists.length,
    updated: 0,
    missing: 0,
    failed: 0
  })
  try {
    for (const { id } of albums) {
      if (runGate.paused) await runGate.wait()
      if (runGate.cancelled) break
      const result = await fetchAlbumArt(id)
      artState.done += 1
      if (result.updated) artState.updated += 1
      else if (result.reason === 'download_failed') artState.failed += 1
      else artState.missing += 1
    }
    for (const { id } of artists) {
      if (runGate.paused) await runGate.wait()
      if (runGate.cancelled) break
      const result = await fetchArtistImage(id)
      artState.done += 1
      if (result.updated) artState.updated += 1
      else if (result.reason === 'download_failed') artState.failed += 1
      else artState.missing += 1
    }
  } finally {
    artState.running = false
    artState.cancelled = runGate.cancelled
  }
  return { ...artState }
}
