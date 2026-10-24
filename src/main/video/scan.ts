import { dialog } from 'electron'
import { basename, dirname, extname, isAbsolute, join, relative } from 'path'
import { existsSync } from 'fs'
import { readdir, stat } from 'fs/promises'
import { getSqlite } from '../db/connection'
import { get as getSetting, set as setSetting } from '../repos/settingsRepo'
import * as tasks from '../tasks'
import { VIDEO_SCOPES, type VideoPlace, type VideoScope } from './scope'
import {
  cleanTitle,
  dropSharedNumber,
  episodeTitle,
  folderSeason,
  isVideoFile,
  looksLikeSample,
  parseEpisodeName,
  VIDEO_EXTS,
  type ParsedEpisode
} from './names'
import type {
  LinkedVideoTitle,
  MediaType,
  ScannedVideo,
  VideoAttachResult,
  VideoFile,
  VideoLibrary,
  VideoPlanAction,
  VideoScanStatus
} from '@shared/types'

// The local video library: episodes attached PER TITLE, exactly like manga.
// media_item.local_dir holds the attached folder or, for a one-episode title,
// the attached file (an anime row is never also a manga row, so the column is
// shared); file_path is relative to the owner's root (scope.place).
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
//
// The media type decides the naming: a movie's files are never episodes (title
// only, no number), and a TV file with no season is season 1, which is how
// TMDB numbers the episodes the Seasons tab matches it against.
export async function scanSeriesDir(
  absDir: string,
  mediaType: MediaType | null = null
): Promise<ScannedVideo[]> {
  const found: ScannedVideo[] = []
  // `season` is the nearest subfolder that names one ("Season 2", "Specials");
  // the attached folder's own name never counts.
  const walk = async (dir: string, rel: string, depth: number, season: number | null): Promise<void> => {
    if (depth > 4) return
    let entries: import('fs').Dirent[]
    try {
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    const here: { name: string; filePath: string; mtimeMs: number; size: number }[] = []
    for (const e of entries) {
      if (e.name.startsWith('.') || e.isSymbolicLink()) continue
      const childRel = rel === '' ? e.name : `${rel}/${e.name}`
      if (e.isDirectory()) {
        // Sidecar subtitle folders are read on demand by subtitles.ts, never
        // walked for videos.
        if (/^(subs?|subtitles)$/i.test(e.name)) continue
        await walk(join(dir, e.name), childRel, depth + 1, folderSeason(e.name) ?? season)
        continue
      }
      if (!e.isFile() || !isVideoFile(e.name) || looksLikeSample(e.name)) continue
      try {
        const st = await stat(join(dir, e.name))
        here.push({ name: e.name, filePath: childRel, mtimeMs: Math.floor(st.mtimeMs), size: st.size })
      } catch {
        continue
      }
    }
    const parsed = dropSharedNumber(
      here.map((f) => f.name),
      here.map((f) => parseEpisodeName(f.name))
    )
    here.forEach((f, i) => {
      found.push({ ...nameFile(parsed[i], season, mediaType), filePath: f.filePath, mtimeMs: f.mtimeMs, size: f.size })
    })
  }
  await walk(absDir, '', 0, null)
  found.sort((a, b) => {
    const as = seasonOrder(a.season)
    const bs = seasonOrder(b.season)
    if (as !== bs) return as - bs
    const an = a.number ?? Infinity
    const bn = b.number ?? Infinity
    if (an !== bn) return an - bn
    return collator.compare(a.filePath, b.filePath)
  })
  return found
}

// Specials (season 0) play after the main run, not before episode 1.
function seasonOrder(season: number | null): number {
  if (season === 0) return Number.MAX_SAFE_INTEGER
  return season ?? 0
}

function nameFile(
  parsed: ParsedEpisode,
  folderSeason: number | null,
  mediaType: MediaType | null
): Pick<ScannedVideo, 'title' | 'number' | 'season'> {
  if (mediaType === 'movie') return { title: parsed.label, number: null, season: null }
  // The file's own marker beats its folder.
  let season = parsed.season ?? folderSeason
  if (season == null && mediaType === 'tv' && parsed.number != null) season = 1
  return { title: episodeTitle({ ...parsed, season }), number: parsed.number, season }
}

// A title linked to one file rather than a folder (a movie, an OVA): the file
// is the whole title, so it carries no episode number and no season. Null when
// the path is not a readable video file.
async function scanOneFile(absFile: string): Promise<ScannedVideo[] | null> {
  if (!isVideoFile(basename(absFile))) return null
  try {
    const st = await stat(absFile)
    if (!st.isFile()) return null
    return [
      {
        filePath: '',
        title: cleanTitle(basename(absFile)),
        number: null,
        season: null,
        mtimeMs: Math.floor(st.mtimeMs),
        size: st.size
      }
    ]
  } catch {
    return null
  }
}

// A scanned file's stored path. A single-file link's one row IS the link.
function storedPath(localDir: string, filePath: string): string {
  return filePath === '' ? localDir : `${localDir}/${filePath}`
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
// optional ffprobe helper; whenever ffprobe is absent it returns null while
// external playback remains available.
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
  const localDir = localDirOf(VIDEO_SCOPES.video, mediaId)
  const rows = rowsFor(VIDEO_SCOPES.video, mediaId).map(rowToFile)
  // A file link's one row is stored at the link path itself (storedPath).
  const linkKind =
    localDir == null ? null : rows.length === 1 && rows[0].filePath === localDir ? 'file' : 'folder'
  return { localDir, linkKind, files: rows }
}

// Every title of one type with linked video, for the Linked page. One pass over
// the type's linked files, folded per title in JS. The type filter is
// load-bearing: local_dir is also the manga and book folder column, so only the
// video types answer.
const VIDEO_MEDIA_TYPES: ReadonlySet<MediaType> = new Set<MediaType>(['anime', 'movie', 'tv'])

export function linkedTitles(mediaType: MediaType): LinkedVideoTitle[] {
  if (!VIDEO_MEDIA_TYPES.has(mediaType)) return []
  const rows = getSqlite()
    .prepare(
      `SELECT m.id, m.title, m.media_type, m.cover_path, m.status, m.local_dir,
              f.id AS file_id, f.file_path, f.title AS file_title, f.watched_at,
              f.resume_seconds, f.updated_at, f.created_at
         FROM media_item m
         LEFT JOIN video_file f ON f.media_id = m.id
        WHERE m.media_type = ? AND m.local_dir IS NOT NULL
        ORDER BY m.id, f.sort_order, f.id`
    )
    .all(mediaType) as {
    id: number
    title: string
    media_type: MediaType
    cover_path: string | null
    status: string | null
    local_dir: string
    file_id: number | null
    file_path: string | null
    file_title: string | null
    watched_at: string | null
    resume_seconds: number | null
    updated_at: string | null
    created_at: string | null
  }[]
  const later = (a: string | null, b: string | null): string | null =>
    a == null ? b : b == null ? a : a > b ? a : b
  const byId = new Map<number, LinkedVideoTitle & { firstFile: LinkedVideoTitle['nextFile']; onlyPath: string | null }>()
  for (const r of rows) {
    let t = byId.get(r.id)
    if (!t) {
      t = {
        mediaId: r.id,
        title: r.title,
        mediaType: r.media_type,
        coverPath: r.cover_path ?? null,
        status: r.status ?? null,
        localDir: r.local_dir,
        linkKind: 'folder',
        fileCount: 0,
        watchedCount: 0,
        nextFile: null,
        lastActivityAt: null,
        linkedAt: null,
        firstFile: null,
        onlyPath: null
      }
      byId.set(r.id, t)
    }
    if (r.file_id == null) continue
    const file = { id: r.file_id, title: r.file_title ?? '', resumeSeconds: r.resume_seconds ?? null }
    t.fileCount++
    t.onlyPath = t.fileCount === 1 ? r.file_path : null
    t.firstFile ??= file
    if (r.watched_at) {
      t.watchedCount++
      t.lastActivityAt = later(t.lastActivityAt, r.watched_at)
    } else {
      t.nextFile ??= file
      // A saved position on an unfinished file is activity too (resumePoints).
      if (r.resume_seconds != null && r.resume_seconds > 0) {
        t.lastActivityAt = later(t.lastActivityAt, r.updated_at)
      }
    }
    if (r.created_at && (t.linkedAt == null || r.created_at < t.linkedAt)) t.linkedAt = r.created_at
  }
  return [...byId.values()].map(({ firstFile, onlyPath, ...t }) => ({
    ...t,
    // The files() rule: a file link's one row is stored at the link path.
    linkKind: onlyPath != null && onlyPath === t.localDir ? 'file' : 'folder',
    nextFile: t.nextFile ?? firstFile
  }))
}

// A file row normalized across scopes for external launch and manual tracking.
export interface ScopedFileRow {
  id: number
  ownerId: number | null
  filePath: string
  title: string
  sortOrder: number
  duration: number | null
  videoCodec: string | null
  audioCodec: string | null
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
    videoCodec: (r.video_codec as string | null) ?? null,
    audioCodec: (r.audio_codec as string | null) ?? null,
    resumeSeconds: (r.resume_seconds as number | null) ?? null,
    watchedAt: (r.watched_at as string | null) ?? null
  }
}

// Upserts the scanned files in ONE transaction. Matched by (media_id,
// file_path), so a rescan refreshes title/number/probe data while
// resume_seconds and watched_at — which the scanner never writes — survive.
// updated_at is left alone too: it dates the last watch or resume write, and
// resumePoints and linkedTitles read it as watch activity.
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
         playability = COALESCE(excluded.playability, ${scope.table}.playability)`
    )
    scanned.forEach((v, i) => {
      const filePath = storedPath(localDir, v.filePath)
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
        extname(filePath).toLowerCase() || null,
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
    const prev = existing.get(storedPath(localDir, v.filePath))
    return !prev || prev.file_mtime !== v.mtimeMs || prev.file_size !== v.size
  })

  const out = new Map<string, VideoProbeResult | null>()
  if (stale.length === 0 || activeProber === nullProber) return out

  scanState.phase = 'probing'
  scanState.done = 0
  scanState.total = stale.length
  const root = scope.place(ownerId).root()
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
          out.set(v.filePath, await activeProber(join(root, storedPath(localDir, v.filePath))))
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
      label: `Scanning ${scope.place(ownerId).label}: ${localDir}`,
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
    const isFile = await stat(absDir).then((st) => st.isFile(), () => false)
    const scanned = isFile
      ? ((await scanOneFile(absDir)) ?? [])
      : await scanSeriesDir(absDir, scope.place(ownerId).mediaType)

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

// The root a new link must sit under. The first link of a kind bootstraps it:
// a folder's parent, and for a file the folder holding it when other videos
// share it (a flat Movies folder), else that folder's parent (the film's own
// folder sits in the library). A movie or TV link with no root of its own
// keeps using video.dir while titles of that type are still linked under it,
// because setting a new root would strand them (pinLegacyVideoRoots normally
// writes that root out at startup). That holds for a blank video.dir too: the
// fallback is then the default folder, which place.root() resolves.
async function linkRoot(
  scope: VideoScope,
  place: VideoPlace,
  ownerId: number,
  picked: string,
  kind: 'folder' | 'file'
): Promise<string> {
  const own = getSetting(place.settingKey)?.trim()
  if (own) return own
  if (place.fallbackKey && place.mediaType) {
    const linked = getSqlite()
      .prepare(
        `SELECT 1 FROM ${scope.ownerTable} WHERE media_type = ? AND local_dir IS NOT NULL AND id <> ? LIMIT 1`
      )
      .get(place.mediaType, ownerId)
    if (linked) return place.root()
  }
  const root =
    kind === 'file' && !(await sharesFolder(picked)) ? dirname(dirname(picked)) : dirname(picked)
  setSetting(place.settingKey, root)
  return root
}

// Async like the scanner's walk: a flat Movies folder on a slow drive can
// hold thousands of entries.
async function sharesFolder(file: string): Promise<boolean> {
  try {
    const name = basename(file)
    return (await readdir(dirname(file))).some(
      (n) => n !== name && isVideoFile(n) && !looksLikeSample(n)
    )
  } catch {
    return false
  }
}

export async function attachIn(
  scope: VideoScope,
  ownerId: number,
  kind: 'folder' | 'file' = 'folder'
): Promise<VideoAttachResult> {
  if (!scope.owner(ownerId)) return { ok: false, error: 'Not found' }
  const place = scope.place(ownerId)
  const startIn =
    getSetting(place.settingKey)?.trim() ||
    (place.fallbackKey ? getSetting(place.fallbackKey)?.trim() : '') ||
    undefined

  const res = await dialog.showOpenDialog(
    kind === 'file'
      ? {
          title: 'Choose this title\u2019s video file',
          defaultPath: startIn,
          properties: ['openFile'],
          filters: [{ name: 'Video', extensions: [...VIDEO_EXTS].map((e) => e.slice(1)) }]
        }
      : {
          title: 'Choose the folder holding this title\u2019s video files',
          defaultPath: startIn,
          properties: ['openDirectory']
        }
  )
  if (res.canceled || res.filePaths.length === 0) return { ok: false }
  const picked = res.filePaths[0]
  if (kind === 'file' && !isVideoFile(basename(picked))) {
    return { ok: false, error: 'That is not a video file' }
  }

  // Every linked title must live under its root, so stored paths stay relative
  // and the library stays relocatable. Same contract as manga.
  const root = await linkRoot(scope, place, ownerId, picked, kind)
  const rel = relative(root, picked)
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
    return {
      ok: false,
      error: `${kind === 'file' ? 'The file' : 'The folder'} must be inside the ${place.label} library root (${root} \u2014 change it in Settings)`
    }
  }
  return runScan(scope, ownerId, rel.split('\\').join('/'), picked)
}

export const attachFolderIn = (scope: VideoScope, ownerId: number): Promise<VideoAttachResult> =>
  attachIn(scope, ownerId, 'folder')

export async function rescanIn(scope: VideoScope, ownerId: number): Promise<VideoAttachResult> {
  const localDir = localDirOf(scope, ownerId)
  if (!localDir) return { ok: false, error: 'No folder attached' }
  const place = scope.place(ownerId)
  const abs = join(place.root(), localDir)
  if (!existsSync(abs)) {
    return {
      ok: false,
      error: `Not found: ${abs} \u2014 is the ${place.label} root set correctly?`
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
  attachIn(VIDEO_SCOPES.video, mediaId, 'folder')
export const attachFile = (mediaId: number): Promise<VideoAttachResult> =>
  attachIn(VIDEO_SCOPES.video, mediaId, 'file')
export const rescan = (mediaId: number): Promise<VideoAttachResult> =>
  rescanIn(VIDEO_SCOPES.video, mediaId)
export const detach = (mediaId: number): void => detachIn(VIDEO_SCOPES.video, mediaId)

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

// The progress footprint of a file's tick (checklistRepo.logEpisodeProgress).
// video_file only — wrestling rows never log progress.
export function setProgressUndo(fileId: number, footprint: string | null): void {
  getSqlite().prepare('UPDATE video_file SET progress_undo = ? WHERE id = ?').run(footprint, fileId)
}

// Reads and clears the footprint, so one un-tick can retract it only once.
export function takeProgressUndo(fileId: number): string | null {
  const db = getSqlite()
  const row = db.prepare('SELECT progress_undo FROM video_file WHERE id = ?').get(fileId) as
    | { progress_undo: string | null }
    | undefined
  if (row?.progress_undo) setProgressUndo(fileId, null)
  return row?.progress_undo ?? null
}

export function markWatched(
  fileId: number,
  watched: boolean
): { mediaId: number; firstTime: boolean } | null {
  const r = markWatchedIn(VIDEO_SCOPES.video, fileId, watched)
  return r ? { mediaId: r.ownerId, firstTime: r.firstTime } : null
}

// The in-app player's resume position. It writes resume_seconds ONLY: a
// position is not progress, and media_item.progress moves solely through the
// watched transition (checklistRepo.logProgress in ipc.ts). null clears it, so
// a finished file reopens from the start.
export function markProgressIn(scope: VideoScope, fileId: number, seconds: number | null): void {
  const value = seconds == null || !Number.isFinite(seconds) || seconds < 1 ? null : seconds
  getSqlite()
    .prepare(`UPDATE ${scope.table} SET resume_seconds = ?, updated_at = datetime('now') WHERE id = ?`)
    .run(value, fileId)
}

// Previous/next file of the same owner in card order. A loose wrestling file
// has no owner and therefore nothing to step through.
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
