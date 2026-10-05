import { existsSync, readFileSync } from 'fs'
import { getSqlite } from './db/connection'
import { absoluteMediaPath } from './files'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { logWarn } from './logBus'
import { writeLyricsIndex } from './musicLyricsIndex'
import { stripAlbumYearPrefix } from './musicSpotifyMatch'
import * as tasks from './tasks'
import { cooperativeGate, type PauseGate } from './taskControls'
import { runWithActivitySignal } from './activityContext'
import { formatLrc, parseLrc } from '@shared/lyrics'
import type { MusicLyrics, MusicLyricsStatus } from '@shared/types'

// Lyrics for library tracks. Local always wins: a sidecar .lrc file beside the
// audio is read on every request; embedded tags and LRCLIB are looked up once,
// on demand, and stored so the lyrics stay available offline. A bulk sweep
// fills every track with nothing stored; it also runs after each download run.

const LRCLIB = 'https://lrclib.net/api'
const LRCLIB_UA = 'NaviHUB/0.2 (https://github.com/Xamiru/NaviHUB)'
const DURATION_TOLERANCE_S = 5
// Consecutive lookup failures after which a sweep treats the service as unreachable.
const MAX_CONSECUTIVE_FAILURES = 3

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
  const stored = result
  const db = getSqlite()
  db.transaction(() => {
    db.prepare(
      `INSERT INTO music_track_lyrics (track_id, state, synced, plain, source, fetched_at)
       VALUES (?, ?, ?, ?, ?, datetime('now'))
       ON CONFLICT(track_id) DO UPDATE SET state = excluded.state, synced = excluded.synced,
         plain = excluded.plain, source = excluded.source, fetched_at = excluded.fetched_at`
    ).run(trackId, stored.state, stored.synced, stored.plain, stored.source)
    writeLyricsIndex(db, trackId, stored.synced, stored.plain)
  })()
  return getLyrics(trackId)
}

// ---------------------------------------------------------------------------
// Bulk sweep
// ---------------------------------------------------------------------------

const sweepState: MusicLyricsStatus = {
  running: false,
  cancelled: false,
  done: 0,
  total: 0,
  found: 0,
  missing: 0,
  failed: 0,
  error: null
}
let sweepAgain = false

export function getLyricsStatus(): MusicLyricsStatus {
  return { ...sweepState }
}

let gate: PauseGate | null = null

export function cancelLyricsFetch(): void {
  gate?.controls.cancel?.()
}

/** Looks up every track with nothing stored. Failed lookups stay unchecked for the next sweep. */
export async function fetchMissingLyrics(
  readEmbedded: EmbeddedLyricsReader = realEmbeddedReader
): Promise<MusicLyricsStatus> {
  if (sweepState.running) throw new Error('Lyrics download already running')
  let handle: tasks.TaskHandle
  const runGate = cooperativeGate(
    () => handle.progress({ state: 'paused' }),
    () => handle.progress({ state: 'running' })
  )
  gate = runGate
  return tasks.runTask(
    {
      kind: 'musicLyrics',
      label: 'Downloading missing lyrics',
      route: '/music',
      controls: runGate.controls,
      project: () => ({ done: sweepState.done, total: sweepState.total })
    },
    (h) => {
      handle = h
      return runWithActivitySignal(runGate.signal, () => fetchMissingLyricsInner(runGate, readEmbedded))
    }
  )
}

/** Downloads added tracks: sweep now, or once more when the running sweep finishes. */
export function queueLyricsSweep(): void {
  if (sweepState.running) {
    sweepAgain = true
    return
  }
  void fetchMissingLyrics().catch((error) => {
    logWarn('task', `lyrics sweep failed: ${error instanceof Error ? error.message : String(error)}`)
  })
}

function uncheckedTrackIds(): number[] {
  return (
    getSqlite()
      .prepare(
        `SELECT t.id FROM music_track t
         LEFT JOIN music_track_lyrics l ON l.track_id = t.id
         WHERE l.track_id IS NULL ORDER BY t.id`
      )
      .all() as { id: number }[]
  ).map((row) => row.id)
}

function trackExists(trackId: number): boolean {
  return !!getSqlite().prepare('SELECT 1 FROM music_track WHERE id = ?').get(trackId)
}

async function fetchMissingLyricsInner(
  runGate: PauseGate,
  readEmbedded: EmbeddedLyricsReader
): Promise<MusicLyricsStatus> {
  Object.assign(sweepState, {
    running: true,
    cancelled: false,
    done: 0,
    total: 0,
    found: 0,
    missing: 0,
    failed: 0,
    error: null
  })
  // Sidecar and failed tracks stay unchecked in the DB; this set keeps one run from retrying them.
  const attempted = new Set<number>()
  let failures = 0
  try {
    do {
      sweepAgain = false
      const ids = uncheckedTrackIds().filter((id) => !attempted.has(id))
      sweepState.total += ids.length
      for (const id of ids) {
        if (runGate.paused) await runGate.wait()
        if (runGate.cancelled) break
        attempted.add(id)
        try {
          const result = await fetchLyrics(id, readEmbedded)
          failures = 0
          if (result.state === 'missing') sweepState.missing += 1
          else sweepState.found += 1
        } catch (error) {
          if (runGate.cancelled) break
          if (trackExists(id)) {
            sweepState.failed += 1
            failures += 1
            if (failures >= MAX_CONSECUTIVE_FAILURES) {
              const reason = error instanceof Error ? error.message : String(error)
              sweepState.error = `Lyrics download stopped: ${reason}`
              break
            }
          }
        }
        sweepState.done += 1
      }
    } while (sweepAgain && !runGate.cancelled && !sweepState.error)
  } finally {
    sweepState.running = false
    sweepState.cancelled = runGate.cancelled
    if (gate === runGate) gate = null
  }
  if (sweepState.error) throw new Error(sweepState.error)
  return { ...sweepState }
}
