import { existsSync, readFileSync } from 'fs'
import { getSqlite } from './db/connection'
import { absoluteMediaPath } from './files'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { stripAlbumYearPrefix } from './musicSpotifyMatch'
import { formatLrc, parseLrc } from '@shared/lyrics'
import type { MusicLyrics } from '@shared/types'

// Lyrics for library tracks. Local always wins: a sidecar .lrc file beside the
// audio is read on every request; embedded tags and LRCLIB are looked up once,
// on demand, and stored so the lyrics stay available offline.

const LRCLIB = 'https://lrclib.net/api'
const LRCLIB_UA = 'NaviHUB/0.2 (https://github.com/Xamiru/NaviHUB)'
const DURATION_TOLERANCE_S = 5

interface TrackInfo {
  id: number
  file_path: string
  title: string
  duration: number | null
  artist_name: string
  album_title: string
}

type Stored = Pick<MusicLyrics, 'state' | 'synced' | 'plain' | 'source'>

export interface EmbeddedLyricsTag {
  text?: string
  syncText?: { text: string; timestamp?: number }[]
}
export type EmbeddedLyricsReader = (absPath: string) => Promise<EmbeddedLyricsTag[] | undefined>

export interface LrclibRow {
  instrumental?: boolean
  plainLyrics?: string | null
  syncedLyrics?: string | null
  duration?: number
}

// ---------------------------------------------------------------------------
// Pure decisions
// ---------------------------------------------------------------------------

/** Text that carries LRC time tags is synced; anything else is plain lyrics. */
export function classifyLyricsText(text: string): Pick<Stored, 'synced' | 'plain'> | null {
  const trimmed = text.trim()
  if (!trimmed) return null
  return parseLrc(trimmed).length ? { synced: trimmed, plain: null } : { synced: null, plain: trimmed }
}

/** SYLT timestamps are milliseconds; USLT text may itself be LRC. */
export function lyricsFromEmbedded(tags: EmbeddedLyricsTag[] | undefined): Stored | null {
  for (const tag of tags ?? []) {
    const timed = (tag.syncText ?? []).filter((line) => line.timestamp != null)
    if (timed.length) {
      const synced = formatLrc(timed.map((line) => ({ time: (line.timestamp as number) / 1000, text: line.text.trim() })))
      return { state: 'found', synced, plain: null, source: 'embedded' }
    }
  }
  for (const tag of tags ?? []) {
    const text = tag.text ?? (tag.syncText ?? []).map((line) => line.text).join('\n')
    const classified = classifyLyricsText(text)
    if (classified) return { state: 'found', ...classified, source: 'embedded' }
  }
  return null
}

export function lyricsFromLrclib(row: LrclibRow): Stored {
  if (row.instrumental) return { state: 'instrumental', synced: null, plain: null, source: 'lrclib' }
  const synced = row.syncedLyrics?.trim() || null
  const plain = row.plainLyrics?.trim() || null
  if (!synced && !plain) return { state: 'missing', synced: null, plain: null, source: 'lrclib' }
  return { state: 'found', synced, plain, source: 'lrclib' }
}

/** First search hit with lyrics (synced preferred) whose length agrees with the file. */
export function pickLrclibResult(rows: LrclibRow[], duration: number | null): LrclibRow | null {
  const usable = rows.filter((row) =>
    (row.instrumental || row.syncedLyrics?.trim() || row.plainLyrics?.trim()) &&
    (duration == null || row.duration == null || Math.abs(row.duration - duration) <= DURATION_TOLERANCE_S)
  )
  return usable.find((row) => row.syncedLyrics?.trim()) ?? usable[0] ?? null
}

export function lrclibGetUrl(track: Pick<TrackInfo, 'title' | 'artist_name' | 'album_title' | 'duration'>): string {
  const params = new URLSearchParams({
    track_name: track.title,
    artist_name: track.artist_name,
    album_name: stripAlbumYearPrefix(track.album_title)
  })
  if (track.duration != null) params.set('duration', String(Math.round(track.duration)))
  return `${LRCLIB}/get?${params}`
}

export function lrclibSearchUrl(track: Pick<TrackInfo, 'title' | 'artist_name'>): string {
  return `${LRCLIB}/search?${new URLSearchParams({ track_name: track.title, artist_name: track.artist_name })}`
}

// ---------------------------------------------------------------------------
// IO
// ---------------------------------------------------------------------------

let mm: typeof import('music-metadata') | null = null
const realEmbeddedReader: EmbeddedLyricsReader = async (absPath) => {
  mm ??= await import('music-metadata')
  const meta = await mm.parseFile(absPath, { skipCovers: true, duration: false })
  return meta.common.lyrics
}

function trackInfo(trackId: number): TrackInfo {
  const row = getSqlite()
    .prepare(
      `SELECT t.id, t.file_path, t.title, t.duration, ar.name AS artist_name, al.title AS album_title
       FROM music_track t
       JOIN music_album al ON al.id = t.album_id
       JOIN music_artist ar ON ar.id = t.artist_id
       WHERE t.id = ?`
    )
    .get(trackId) as TrackInfo | undefined
  if (!row) throw new Error('This track is no longer in the music library')
  return row
}

function sidecarLyrics(track: TrackInfo): Stored | null {
  const audio = absoluteMediaPath(`music/${track.file_path}`)
  if (!audio) return null
  const base = audio.replace(/\.[^./\\]+$/, '')
  for (const candidate of [`${base}.lrc`, `${base}.LRC`]) {
    if (!existsSync(candidate)) continue
    const classified = classifyLyricsText(readFileSync(candidate, 'utf8'))
    if (classified) return { state: 'found', ...classified, source: 'file' }
  }
  return null
}

export function getLyrics(trackId: number): MusicLyrics {
  const track = trackInfo(trackId)
  const local = sidecarLyrics(track)
  if (local) return { trackId, ...local }
  const stored = getSqlite()
    .prepare('SELECT state, synced, plain, source FROM music_track_lyrics WHERE track_id = ?')
    .get(trackId) as Stored | undefined
  return stored
    ? { trackId, ...stored }
    : { trackId, state: 'unchecked', synced: null, plain: null, source: null }
}

async function lrclibJson(url: string): Promise<unknown | null> {
  const res = await fetchWithRetry(url, {
    headers: { 'User-Agent': LRCLIB_UA },
    timeoutMs: 15_000,
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`The lyrics service is unavailable right now (HTTP ${res.status}). Try again later.`)
  return res.json()
}

/** Explicit lookup (the lyrics panel's first open, or Search again). Network errors are not stored. */
export async function fetchLyrics(
  trackId: number,
  readEmbedded: EmbeddedLyricsReader = realEmbeddedReader
): Promise<MusicLyrics> {
  const track = trackInfo(trackId)
  if (sidecarLyrics(track)) return getLyrics(trackId)
  let result: Stored | null = null
  const audio = absoluteMediaPath(`music/${track.file_path}`)
  if (audio) {
    try {
      result = lyricsFromEmbedded(await readEmbedded(audio))
    } catch {
      result = null // unreadable tags fall through to LRCLIB
    }
  }
  if (!result) {
    const exact = await lrclibJson(lrclibGetUrl(track))
    if (exact) {
      result = lyricsFromLrclib(exact as LrclibRow)
    } else {
      const rows = await lrclibJson(lrclibSearchUrl(track))
      const hit = Array.isArray(rows) ? pickLrclibResult(rows as LrclibRow[], track.duration) : null
      result = hit ? lyricsFromLrclib(hit) : { state: 'missing', synced: null, plain: null, source: 'lrclib' }
    }
  }
  getSqlite()
    .prepare(
      `INSERT INTO music_track_lyrics (track_id, state, synced, plain, source, fetched_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(track_id) DO UPDATE SET state = excluded.state, synced = excluded.synced,
         plain = excluded.plain, source = excluded.source, fetched_at = excluded.fetched_at`
    )
    .run(trackId, result.state, result.synced, result.plain, result.source)
  return getLyrics(trackId)
}
