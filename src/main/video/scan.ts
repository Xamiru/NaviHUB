import { dialog } from 'electron'
import { dirname, extname, isAbsolute, join, relative } from 'path'
import { existsSync } from 'fs'
import { readdir, stat } from 'fs/promises'
import { getSqlite } from '../db/connection'
import { get as getSetting, set as setSetting } from '../repos/settingsRepo'
import * as tasks from '../tasks'
import { VIDEO_SCOPES, type VideoScope } from './scope'
import { episodeTitle, isVideoFile, looksLikeSample, parseEpisodeName } from './names'
import type {
  MediaType,
  ScannedVideo,
  VideoAttachResult,
  VideoFile,
  VideoLibrary,
  VideoPlanAction,
  VideoScanStatus
} from '@shared/types'

// The local video library: episodes attached PER TITLE, exactly like manga.
// media_item.local_dir holds the attached folder (an anime row is never also a
// manga row, so the column is shared), file_path is relative to the video root.
//
// Everything ffprobe-shaped is injected (see Prober) so tests exercise the real
// SQL with no binary — the music.ts:TagReader pattern.

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

// ---------------------------------------------------------------------------
// Walk
// ---------------------------------------------------------------------------

// Every video under the attached folder, natural-sorted with numbered episodes
// first. Async readdir on purpose: sync bursts here block the main process (and
// with it keyboard input) on big or slow libraries — see walkMusicRoot.
export async function scanSeriesDir(absDir: string): Promise<ScannedVideo[]> {
  const found: ScannedVideo[] = []
  const walk = async (dir: string, rel: string, depth: number): Promise<void> => {
    if (depth > 4) return
    let entries: import('fs').Dirent[]
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    for (const e of entries) {
      if (e.name.startsWith('.') || e.isSymbolicLink()) continue
      const childRel = rel === '' ? e.name : `${rel}/${e.name}`
      if (e.isDirectory()) {
        // Sidecar subtitle folders are read on demand by subtitles.ts, never
        // walked for videos.
        if (/^(subs?|subtitles)$/i.test(e.name)) continue
        await walk(join(dir, e.name), childRel, depth + 1)
        continue
      }
      if (!e.isFile() || !isVideoFile(e.name) || looksLikeSample(e.name)) continue
      let mtimeMs = 0
      let size = 0
      try {
        const st = await stat(join(dir, e.name))
        mtimeMs = Math.floor(st.mtimeMs)
        size = st.size
      } catch {
        continue
      }
      const parsed = parseEpisodeName(e.name)
      found.push({
        filePath: childRel,
        title: episodeTitle(parsed),
        number: parsed.number,
        season: parsed.season,
        mtimeMs,
        size
      })
    }
  }
  await walk(absDir, '', 0)
  found.sort((a, b) => {
    const as = a.season ?? 0
    const bs = b.season ?? 0
    if (as !== bs) return as - bs
    const an = a.number ?? Infinity
    const bn = b.number ?? Infinity
    if (an !== bn) return an - bn
    return collator.compare(a.filePath, b.filePath)
  })
  return found
}

// ---------------------------------------------------------------------------
// Probe seam
// ---------------------------------------------------------------------------

export interface VideoProbeResult {
  duration: number | null
  width: number | null
  height: number | null
  videoCodec: string | null
  audioCodec: string | null
  playability: VideoPlanAction | null
}

// Injected so tests never spawn ffprobe. The real implementation lands with the
// ffmpeg tier; until then (and whenever ffprobe isn't installed) it returns null
// for everything and .mp4/.webm still play.
export type Prober = (absPath: string) => Promise<VideoProbeResult | null>

const nullProber: Prober = async () => null
let activeProber: Prober = nullProber

export function setProber(p: Prober): void {
  activeProber = p
}

// ---------------------------------------------------------------------------
// Scan status (polled — this app has no push channel)
// ---------------------------------------------------------------------------

// Written but not currently read: the video:scanStatus channel was removed as
// dead. Kept because it is exactly what a progress poll needs — a large
// video-folder scan is still the one scan in the app with no progress UI.
const scanState: VideoScanStatus = {
  running: false,
  phase: 'idle',
  done: 0,
  total: 0,
  error: null
}


// ---------------------------------------------------------------------------
// Rows
// ---------------------------------------------------------------------------

function rowToFile(r: Record<string, unknown>): VideoFile {
  return {
    id: r.id as number,
    mediaId: r.media_id as number,
    filePath: r.file_path as string,
    title: r.title as string,
    number: (r.number as number | null) ?? null,
    season: (r.season as number | null) ?? null,
    sortOrder: r.sort_order as number,
    duration: (r.duration as number | null) ?? null,
    width: (r.width as number | null) ?? null,
    height: (r.height as number | null) ?? null,
    videoCodec: (r.video_codec as string | null) ?? null,
    audioCodec: (r.audio_codec as string | null) ?? null,
    container: (r.container as string | null) ?? null,
    playability: (r.playability as VideoPlanAction | null) ?? null,
    resumeSeconds: (r.resume_seconds as number | null) ?? null,
    watchedAt: (r.watched_at as string | null) ?? null
  }
}

function localDirOf(scope: VideoScope, ownerId: number): string | null {
  const row = getSqlite()
    .prepare(`SELECT local_dir FROM ${scope.ownerTable} WHERE id = ?`)
    .get(ownerId) as { local_dir: string | null } | undefined
  return row?.local_dir ?? null
}

// Raw rows for one owner, in card/episode order.
export function rowsFor(scope: VideoScope, ownerId: number): Record<string, unknown>[] {
  return getSqlite()
    .prepare(
      `SELECT * FROM ${scope.table} WHERE ${scope.ownerCol} = ? ORDER BY sort_order, id`
    )
    .all(ownerId) as Record<string, unknown>[]
}

export function localDirFor(scope: VideoScope, ownerId: number): string | null {
  return localDirOf(scope, ownerId)
}

export function files(mediaId: number): VideoLibrary {
  return {
    localDir: localDirOf(VIDEO_SCOPES.video, mediaId),
    files: rowsFor(VIDEO_SCOPES.video, mediaId).map(rowToFile)
  }
}

// A file row normalized across scopes — what the player needs, with the owner
// column read through the scope so `source()` never learns which table it came
// from.
export interface ScopedFileRow {
  id: number
  ownerId: number | null
  filePath: string
  title: string
  sortOrder: number
  duration: number | null
  resumeSeconds: number | null
  watchedAt: string | null
}

export function scopedFileById(scope: VideoScope, fileId: number): ScopedFileRow | null {
  const r = getSqlite().prepare(`SELECT * FROM ${scope.table} WHERE id = ?`).get(fileId) as
    | Record<string, unknown>
    | undefined
  if (!r) return null
  return {
    id: r.id as number,
    ownerId: (r[scope.ownerCol] ?? null) as number | null,
    filePath: r.file_path as string,
    title: r.title as string,
    sortOrder: r.sort_order as number,
    duration: (r.duration as number | null) ?? null,
    resumeSeconds: (r.resume_seconds as number | null) ?? null,
    watchedAt: (r.watched_at as string | null) ?? null
  }
}

export function fileById(fileId: number): VideoFile | null {
  const row = getSqlite().prepare('SELECT * FROM video_file WHERE id = ?').get(fileId) as
    | Record<string, unknown>
    | undefined
  return row ? rowToFile(row) : null
}

// Upserts the scanned files in ONE transaction. Matched by (media_id,
// file_path), so a rescan refreshes title/number/probe data while
// resume_seconds and watched_at — which the scanner never writes — survive.
function syncVideos(
  scope: VideoScope,
  ownerId: number,
  localDir: string,
  scanned: ScannedVideo[],
  probes: Map<string, VideoProbeResult | null>
): void {
  const db = getSqlite()
  const tx = db.transaction(() => {
    const keep: string[] = []
    const upsert = db.prepare(
      `INSERT INTO ${scope.table}
         (${scope.ownerCol}, file_path, title, number, season, sort_order,
          file_mtime, file_size, duration, width, height,
          video_codec, audio_codec, container, playability)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(${scope.ownerCol}, file_path) DO UPDATE SET
         title = excluded.title,
         number = excluded.number,
         season = excluded.season,
         sort_order = excluded.sort_order,
         file_mtime = excluded.file_mtime,
         file_size = excluded.file_size,
         duration = COALESCE(excluded.duration, ${scope.table}.duration),
         width = COALESCE(excluded.width, ${scope.table}.width),
         height = COALESCE(excluded.height, ${scope.table}.height),
         video_codec = COALESCE(excluded.video_codec, ${scope.table}.video_codec),
         audio_codec = COALESCE(excluded.audio_codec, ${scope.table}.audio_codec),
         container = excluded.container,
         playability = COALESCE(excluded.playability, ${scope.table}.playability),
         updated_at = datetime('now')`
    )
    scanned.forEach((v, i) => {
      const filePath = `${localDir}/${v.filePath}`
      keep.push(filePath)
      const p = probes.get(v.filePath) ?? null
      upsert.run(
        ownerId,
        filePath,
        v.title,
        v.number,
        v.season,
        i,
        v.mtimeMs,
        v.size,
        p?.duration ?? null,
        p?.width ?? null,
        p?.height ?? null,
        p?.videoCodec ?? null,
        p?.audioCodec ?? null,
        extname(v.filePath).toLowerCase() || null,
        p?.playability ?? null
      )
    })
    if (keep.length === 0) {
      db.prepare(`DELETE FROM ${scope.table} WHERE ${scope.ownerCol} = ?`).run(ownerId)
    } else {
      db.prepare(
        `DELETE FROM ${scope.table} WHERE ${scope.ownerCol} = ?
         AND file_path NOT IN (${keep.map(() => '?').join(', ')})`
      ).run(ownerId, ...keep)
    }
    db.prepare(
      `UPDATE ${scope.ownerTable} SET local_dir = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(localDir, ownerId)
  })
  tx()
}

// Probes only what changed. A file whose mtime and size still match its row is
// left alone — re-probing a 200-episode library on every rescan would spawn 200
// processes for nothing.
async function probeChanged(
  scope: VideoScope,
  ownerId: number,
  localDir: string,
  scanned: ScannedVideo[]
): Promise<Map<string, VideoProbeResult | null>> {
  const db = getSqlite()
  const existing = new Map<string, { file_mtime: number | null; file_size: number | null }>()
  for (const r of db
    .prepare(
      `SELECT file_path, file_mtime, file_size FROM ${scope.table} WHERE ${scope.ownerCol} = ?`
    )
    .all(ownerId) as { file_path: string; file_mtime: number | null; file_size: number | null }[]) {
    existing.set(r.file_path, { file_mtime: r.file_mtime, file_size: r.file_size })
  }
  const stale = scanned.filter((v) => {
    const prev = existing.get(`${localDir}/${v.filePath}`)
    return !prev || prev.file_mtime !== v.mtimeMs || prev.file_size !== v.size
  })

  const out = new Map<string, VideoProbeResult | null>()
  if (stale.length === 0 || activeProber === nullProber) return out

  scanState.phase = 'probing'
  scanState.done = 0
  scanState.total = stale.length
  const root = scope.root()
  const workers = Math.min(4, stale.length)
  let cursor = 0
  await Promise.all(
    Array.from({ length: workers }, async () => {
      for (;;) {
        const i = cursor
        cursor += 1
        if (i >= stale.length) return
        const v = stale[i]
        try {
          out.set(v.filePath, await activeProber(join(root, localDir, v.filePath)))
        } catch {
          out.set(v.filePath, null)
        }
        scanState.done += 1
      }
    })
  )
  return out
}

async function runScan(
  scope: VideoScope,
  ownerId: number,
  localDir: string,
  absDir: string
): Promise<VideoAttachResult> {
  // scanState was already maintained here but nothing read it (the
  // video:scanStatus channel was removed as dead). This is what finally gives
  // the app's one dark scan a progress surface.
  return tasks.runTask(
    {
      kind: 'videoScan',
      label: `Scanning ${scope.label}: ${localDir}`,
      project: () => ({ detail: scanState.phase, done: scanState.done, total: scanState.total })
    },
    () => runScanInner(scope, ownerId, localDir, absDir)
  )
}

async function runScanInner(
  scope: VideoScope,
  ownerId: number,
  localDir: string,
  absDir: string
): Promise<VideoAttachResult> {
  scanState.running = true
  scanState.phase = 'walking'
  scanState.done = 0
  scanState.total = 0
  scanState.error = null
  try {
    const scanned = await scanSeriesDir(absDir)

    // Destructive-sync guard (music.ts:startScan). A walk that finds nothing
    // while rows exist means the folder moved or a drive is unmounted — pruning
    // here would silently wipe every resume position and watched flag.
    if (scanned.length === 0) {
      const count = getSqlite()
        .prepare(`SELECT COUNT(*) AS n FROM ${scope.table} WHERE ${scope.ownerCol} = ?`)
        .get(ownerId) as { n: number }
      if (count.n > 0) {
        return {
          ok: false,
          error: `No video files found in ${absDir}, but ${count.n} are on record — refusing to clear them. Is the drive mounted?`
        }
      }
      return { ok: false, error: 'No video files found in that folder' }
    }

    const probes = await probeChanged(scope, ownerId, localDir, scanned)
    scanState.phase = 'writing'
    syncVideos(scope, ownerId, localDir, scanned, probes)
    return { ok: true, fileCount: scanned.length }
  } catch (err) {
    scanState.error = err instanceof Error ? err.message : String(err)
    return { ok: false, error: scanState.error }
  } finally {
    scanState.running = false
    scanState.phase = 'idle'
  }
}

export async function attachFolderIn(
  scope: VideoScope,
  ownerId: number
): Promise<VideoAttachResult> {
  if (!scope.owner(ownerId)) return { ok: false, error: 'Not found' }

  const res = await dialog.showOpenDialog({
    title: 'Choose the folder holding this title\u2019s video files',
    defaultPath: getSetting(scope.settingKey)?.trim() || undefined,
    properties: ['openDirectory']
  })
  if (res.canceled || res.filePaths.length === 0) return { ok: false }
  const picked = res.filePaths[0]

  // First attach bootstraps the library root as the picked folder's parent;
  // afterwards every attached title must live under that root so stored paths
  // stay relative and the library stays relocatable. Same contract as manga.
  let root = getSetting(scope.settingKey)?.trim()
  if (!root) {
    root = dirname(picked)
    setSetting(scope.settingKey, root)
  }
  const rel = relative(root, picked)
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
    return {
      ok: false,
      error: `Folder must be inside the ${scope.label} library root (${root} — change it in Settings)`
    }
  }
  return runScan(scope, ownerId, rel.split('\\').join('/'), picked)
}

export async function rescanIn(scope: VideoScope, ownerId: number): Promise<VideoAttachResult> {
  const localDir = localDirOf(scope, ownerId)
  if (!localDir) return { ok: false, error: 'No folder attached' }
  const abs = join(scope.root(), localDir)
  if (!existsSync(abs)) {
    return {
      ok: false,
      error: `Folder not found: ${abs} — is the ${scope.label} root set correctly?`
    }
  }
  return runScan(scope, ownerId, localDir, abs)
}

export function detachIn(scope: VideoScope, ownerId: number): void {
  const db = getSqlite()
  const tx = db.transaction(() => {
    db.prepare(`DELETE FROM ${scope.table} WHERE ${scope.ownerCol} = ?`).run(ownerId)
    db.prepare(
      `UPDATE ${scope.ownerTable} SET local_dir = NULL, updated_at = datetime('now') WHERE id = ?`
    ).run(ownerId)
  })
  tx()
}

// The media-library surface, unchanged for every existing caller.
export const attachFolder = (mediaId: number): Promise<VideoAttachResult> =>
  attachFolderIn(VIDEO_SCOPES.video, mediaId)
export const rescan = (mediaId: number): Promise<VideoAttachResult> =>
  rescanIn(VIDEO_SCOPES.video, mediaId)
export const detach = (mediaId: number): void => detachIn(VIDEO_SCOPES.video, mediaId)

// ---------------------------------------------------------------------------
// Progress
// ---------------------------------------------------------------------------

export function markProgressIn(scope: VideoScope, fileId: number, seconds: number): void {
  getSqlite()
    .prepare(
      `UPDATE ${scope.table} SET resume_seconds = ?, updated_at = datetime('now') WHERE id = ?`
    )
    .run(Math.max(0, seconds), fileId)
}

export const markProgress = (fileId: number, seconds: number): void =>
  markProgressIn(VIDEO_SCOPES.video, fileId, seconds)

// Flips the file's watched flag and reports whether this was the FIRST such
// transition. It deliberately does NOT touch media_item.progress: the caller
// hands a first-time transition to checklistRepo.logProgress, which is the
// app's single definition of "I watched another one" (status promotion, the
// rewatch wrap, and the checklist credit all live there).
//
// A manga-style syncMediaProgress alongside it would be worse than redundant —
// it floors progress at the highest watched episode NUMBER, so the moment
// logProgress wrapped a finished series into a rewatch (progress → 1) the sync
// would slam it back to 12 and the rewatch would be invisible.
export function markWatchedIn(
  scope: VideoScope,
  fileId: number,
  watched: boolean
): { ownerId: number; firstTime: boolean } | null {
  const db = getSqlite()
  const row = db
    .prepare(`SELECT ${scope.ownerCol} AS owner_id, watched_at FROM ${scope.table} WHERE id = ?`)
    .get(fileId) as { owner_id: number; watched_at: string | null } | undefined
  if (!row) return null
  if (watched) {
    db.prepare(
      `UPDATE ${scope.table} SET watched_at = COALESCE(watched_at, datetime('now')),
         updated_at = datetime('now') WHERE id = ?`
    ).run(fileId)
  } else {
    db.prepare(
      `UPDATE ${scope.table} SET watched_at = NULL, resume_seconds = NULL,
         updated_at = datetime('now') WHERE id = ?`
    ).run(fileId)
  }
  return { ownerId: row.owner_id, firstTime: watched && !row.watched_at }
}

export function markWatched(
  fileId: number,
  watched: boolean
): { mediaId: number; firstTime: boolean } | null {
  const r = markWatchedIn(VIDEO_SCOPES.video, fileId, watched)
  return r ? { mediaId: r.ownerId, firstTime: r.firstTime } : null
}

// Neighbours in the attached folder's order, for the player's prev/next.
export function neighboursIn(
  scope: VideoScope,
  fileId: number
): {
  prev: { fileId: number; title: string } | null
  next: { fileId: number; title: string } | null
} {
  const db = getSqlite()
  const row = db
    .prepare(`SELECT ${scope.ownerCol} AS owner_id, sort_order FROM ${scope.table} WHERE id = ?`)
    .get(fileId) as { owner_id: number | null; sort_order: number } | undefined
  // A loose file has no owner and therefore no card to step through.
  if (!row || row.owner_id == null) return { prev: null, next: null }
  const pick = (order: 'DESC' | 'ASC', cmp: '<' | '>'): { fileId: number; title: string } | null => {
    const r = db
      .prepare(
        `SELECT id, title FROM ${scope.table}
         WHERE ${scope.ownerCol} = ? AND (sort_order, id) ${cmp} (?, ?)
         ORDER BY sort_order ${order}, id ${order} LIMIT 1`
      )
      .get(row.owner_id, row.sort_order, fileId) as { id: number; title: string } | undefined
    return r ? { fileId: r.id, title: r.title } : null
  }
  return { prev: pick('DESC', '<'), next: pick('ASC', '>') }
}

export const neighbours = (fileId: number): ReturnType<typeof neighboursIn> =>
  neighboursIn(VIDEO_SCOPES.video, fileId)

export function seriesOf(mediaId: number): { title: string; mediaType: MediaType } | null {
  const row = getSqlite()
    .prepare('SELECT title, media_type FROM media_item WHERE id = ?')
    .get(mediaId) as { title: string; media_type: MediaType } | undefined
  return row ? { title: row.title, mediaType: row.media_type } : null
}
