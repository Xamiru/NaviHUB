import { app, dialog } from 'electron'
import { join, extname, dirname, basename, relative, isAbsolute } from 'path'
import { existsSync, mkdirSync, writeFileSync } from 'fs'
import { readdir, stat, unlink, rm, rmdir } from 'fs/promises'
import { createHash } from 'crypto'
import { getSqlite } from './db/connection'
import { get as getSetting, set as setSetting } from './repos/settingsRepo'
import { musicRootDir, absoluteMediaPath } from './files'
import * as tasks from './tasks'
import { claimMusicMaintenance, releaseMusicMaintenance } from './musicMaintenance'
import { resolveAllSpotifyItems } from './repos/musicSpotifyRepo'
import type { MusicDeleteResult, MusicScanStatus, MusicScanSummary } from '@shared/types'

// ---------------------------------------------------------------------------
// Pure scanning helpers (exported for tests — no electron/db access).
// The library layout is <root>/<Artist>/<Album>/<tracks>; the folder structure
// is authoritative for artist/album identity, tags only refine track fields.
// ---------------------------------------------------------------------------

const AUDIO_EXTS = new Set(['.mp3', '.flac', '.m4a', '.aac', '.ogg', '.opus', '.wav'])
// Priority order: an exact "cover" beats "folder" beats "front".
const COVER_NAMES = [
  'cover.jpg',
  'cover.jpeg',
  'cover.png',
  'folder.jpg',
  'folder.jpeg',
  'folder.png',
  'front.jpg',
  'front.png'
]
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

export interface ScannedFile {
  relPath: string // "Radiohead/OK Computer/01 Airbag.mp3" (forward slashes)
  albumDir: string // "Radiohead/OK Computer" (== artistDir for loose singles)
  fileName: string
  mtimeMs: number
}

export interface ScannedAlbumFolder {
  artistDir: string // "Radiohead"
  artistName: string
  albumDir: string
  albumTitle: string
  coverFile: string | null // relPath of a cover.jpg-style file in the album folder
  files: ScannedFile[]
}

function isAudioFile(name: string): boolean {
  return !name.startsWith('.') && AUDIO_EXTS.has(extname(name).toLowerCase())
}

// Case-insensitive priority match against COVER_NAMES.
export function findCoverFile(fileNames: string[]): string | null {
  const lower = new Map(fileNames.map((n) => [n.toLowerCase(), n]))
  for (const want of COVER_NAMES) {
    const hit = lower.get(want)
    if (hit) return hit
  }
  return null
}

// Track number + title from a filename (fallback when tags are missing).
// "07 - Paranoid Android.mp3" -> { trackNo: 7, title: 'Paranoid Android' }.
// A leading disc-track pair like "2-07" yields trackNo 7.
export function parseTrackFileName(name: string): { trackNo: number | null; title: string } {
  const stem = name.slice(0, name.length - extname(name).length)
  const discTrack = stem.match(/^(\d{1,2})[-.](\d{1,3})[\s.\-_]+(.+)$/)
  if (discTrack) return { trackNo: parseInt(discTrack[2], 10), title: discTrack[3].trim() }
  const plain = stem.match(/^(\d{1,3})[\s.\-_]+(.+)$/)
  if (plain) return { trackNo: parseInt(plain[1], 10), title: plain[2].trim() }
  return { trackNo: null, title: stem.trim() }
}

// Walks <root>/<Artist>/<Album>/** collecting audio files. Audio up to 2 levels
// below an album folder still belongs to that album (CD1/CD2 subfolders). Loose
// audio directly in an artist folder becomes a synthetic "Singles" album whose
// albumDir is the artist dir itself (stable across rescans). Audio directly at
// the root is skipped and counted so the scan summary can surface it.
//
// Async fs on purpose: this runs on the Electron main process, which also
// routes keyboard/mouse input to the window. A sync walk (readdirSync +
// statSync per file) over a big library — worse on an HDD or network mount —
// blocked the event loop for minutes and froze typing app-wide.
export async function walkMusicRoot(
  absRoot: string,
  cancelled: () => boolean = () => false
): Promise<{
  albums: ScannedAlbumFolder[]
  skippedRootFiles: number
}> {
  const albums: ScannedAlbumFolder[] = []
  let skippedRootFiles = 0
  const checkpoint = (): void => {
    if (cancelled()) throw new tasks.TaskCancelledError('Scanning music library')
  }

  checkpoint()
  // A failed read is incomplete coverage, never evidence that tracks vanished.
  const rootEntries = await readdir(absRoot, { withFileTypes: true })
  checkpoint()
  skippedRootFiles = rootEntries.filter((e) => e.isFile() && isAudioFile(e.name)).length

  const statFile = async (
    abs: string,
    rel: string,
    albumDir: string
  ): Promise<ScannedFile> => ({
    relPath: rel, albumDir, fileName: basename(rel), mtimeMs: (await stat(abs)).mtimeMs
  })
  // Stats a directory's audio files concurrently (bounded by libuv's pool);
  // callers sort by relPath afterwards, so completion order doesn't matter.
  const statAll = (
    names: string[],
    absDir: string,
    relDir: string,
    albumDir: string
  ): Promise<ScannedFile[]> =>
    Promise.all(
      names.map((n) => statFile(join(absDir, n), `${relDir}/${n}`, albumDir))
    )

  // Audio files in `dir` and up to `depth` more levels down, all owned by albumDir.
  const collectAudio = async (
    absDir: string,
    relDir: string,
    albumDir: string,
    depth: number
  ): Promise<ScannedFile[]> => {
    checkpoint()
    const entries = await readdir(absDir, { withFileTypes: true })
    checkpoint()
    const files = await statAll(
      entries.filter((e) => e.isFile() && isAudioFile(e.name)).map((e) => e.name),
      absDir,
      relDir,
      albumDir
    )
    for (const e of entries) {
      if (e.isDirectory() && !e.isSymbolicLink() && !e.name.startsWith('.') && depth > 0) {
        files.push(
          ...(await collectAudio(join(absDir, e.name), `${relDir}/${e.name}`, albumDir, depth - 1))
        )
      }
    }
    return files
  }

  const artistDirs = rootEntries
    .filter((e) => e.isDirectory() && !e.isSymbolicLink() && !e.name.startsWith('.'))
    .map((e) => e.name)
    .sort((a, b) => collator.compare(a, b))

  for (const artist of artistDirs) {
    checkpoint()
    const absArtist = join(absRoot, artist)
    const artistEntries = await readdir(absArtist, { withFileTypes: true })
    const artistFileNames = artistEntries.filter((e) => e.isFile()).map((e) => e.name)

    // Loose tracks directly under the artist -> synthetic "Singles" album.
    const loose = await statAll(artistFileNames.filter(isAudioFile), absArtist, artist, artist)
    if (loose.length > 0) {
      const cover = findCoverFile(artistFileNames)
      albums.push({
        artistDir: artist,
        artistName: artist,
        albumDir: artist,
        albumTitle: 'Singles',
        coverFile: cover ? `${artist}/${cover}` : null,
        files: loose.sort((a, b) => collator.compare(a.relPath, b.relPath))
      })
    }

    const albumDirs = artistEntries
      .filter((e) => e.isDirectory() && !e.isSymbolicLink() && !e.name.startsWith('.'))
      .map((e) => e.name)
      .sort((a, b) => collator.compare(a, b))
    for (const album of albumDirs) {
      checkpoint()
      const albumDir = `${artist}/${album}`
      const absAlbum = join(absArtist, album)
      const files = (await collectAudio(absAlbum, albumDir, albumDir, 2)).sort((a, b) =>
        collator.compare(a.relPath, b.relPath)
      )
      if (files.length === 0) continue
      const albumFileNames = (await readdir(absAlbum, { withFileTypes: true }))
        .filter((e) => e.isFile())
        .map((e) => e.name)
      const cover = findCoverFile(albumFileNames)
      albums.push({
        artistDir: artist,
        artistName: artist,
        albumDir,
        albumTitle: album,
        coverFile: cover ? `${albumDir}/${cover}` : null,
        files
      })
    }
  }
  return { albums, skippedRootFiles }
}

// ---------------------------------------------------------------------------
// Tag parsing. The reader is injectable so tests (and the mtime fast path)
// never touch music-metadata or real audio files.
// ---------------------------------------------------------------------------

export interface ParsedTrack extends ScannedFile {
  title: string
  trackNo: number | null
  discNo: number | null
  duration: number | null
  tagArtist: string | null
  year: number | null
  picture: { data: Uint8Array; format: string } | null
}

export type TagReader = (
  file: ScannedFile,
  needPicture: boolean
) => Promise<Partial<Omit<ParsedTrack, keyof ScannedFile>>>

// music-metadata is ESM-only while the main bundle is CJS; the dynamic import
// is preserved by Rollup so it loads fine at runtime and stays out of tests.
let mm: typeof import('music-metadata') | null = null
const realTagReader: TagReader = async (file, needPicture) => {
  try {
    mm ??= await import('music-metadata')
    const meta = await mm.parseFile(join(musicRootDir(), file.relPath), { duration: true })
    const pic = needPicture ? meta.common.picture?.[0] : undefined
    return {
      title: meta.common.title?.trim() || undefined,
      trackNo: meta.common.track?.no ?? undefined,
      discNo: meta.common.disk?.no ?? undefined,
      duration: meta.format.duration ?? undefined,
      tagArtist: meta.common.artist?.trim() || undefined,
      year: meta.common.year ?? undefined,
      picture: pic ? { data: pic.data, format: pic.format } : undefined
    }
  } catch {
    return {} // unreadable tags -> filename fallback below
  }
}

// Parses every file through `reader` with a small concurrency pool, filling
// gaps from the filename. Order of the result matches the input order.
export async function parseFiles(
  files: ScannedFile[],
  reader: TagReader,
  needPicture: (f: ScannedFile) => boolean,
  onProgress?: (done: number) => void
): Promise<ParsedTrack[]> {
  const out: ParsedTrack[] = new Array(files.length)
  let next = 0
  let done = 0
  const worker = async (): Promise<void> => {
    while (next < files.length) {
      const i = next++
      const file = files[i]
      const tags = await reader(file, needPicture(file))
      const fromName = parseTrackFileName(file.fileName)
      out[i] = {
        ...file,
        title: tags.title ?? fromName.title,
        trackNo: tags.trackNo ?? fromName.trackNo,
        discNo: tags.discNo ?? null,
        duration: tags.duration ?? null,
        tagArtist: tags.tagArtist ?? null,
        year: tags.year ?? null,
        picture: tags.picture ?? null
      }
      done += 1
      onProgress?.(done)
    }
  }
  await Promise.all(Array.from({ length: Math.min(8, files.length) }, worker))
  return out
}

// ---------------------------------------------------------------------------
// DB sync — one transaction, modeled on manga.syncChapters. Upserts are keyed
// by dir_path/file_path so user state (liked_at, play_count, last_played_at,
// playlist membership) survives rescans untouched; vanished files are pruned
// and FK cascades clean up playlist rows.
// ---------------------------------------------------------------------------

const CHUNK = 500 // stay far below SQLite's bind-parameter ceiling

export interface SyncCounts {
  artists: number
  albums: number
  tracks: number
  added: number
  removed: number
}

function writeMusicRows(
  albums: ScannedAlbumFolder[],
  parsed: ParsedTrack[],
  coverByAlbumDir: Map<string, string | null>,
  completeSnapshot: boolean
): SyncCounts {
  const db = getSqlite()
  const byAlbum = new Map<string, ParsedTrack[]>()
  for (const t of parsed) {
    const arr = byAlbum.get(t.albumDir) ?? []
    arr.push(t)
    byAlbum.set(t.albumDir, arr)
  }

  const counts: SyncCounts = { artists: 0, albums: 0, tracks: 0, added: 0, removed: 0 }
  const tx = db.transaction(() => {
    const existingPaths = new Set(
      (db.prepare('SELECT file_path FROM music_track').all() as { file_path: string }[]).map(
        (r) => r.file_path
      )
    )

    const upsertArtist = db.prepare(
      `INSERT INTO music_artist (name, dir_path) VALUES (?, ?)
       ON CONFLICT(dir_path) DO UPDATE SET name = excluded.name, updated_at = datetime('now')`
    )
    const artistIdByDir = new Map<string, number>()
    const getArtistId = db.prepare('SELECT id FROM music_artist WHERE dir_path = ?')
    for (const a of albums) {
      if (artistIdByDir.has(a.artistDir)) continue
      upsertArtist.run(a.artistName, a.artistDir)
      artistIdByDir.set(a.artistDir, (getArtistId.get(a.artistDir) as { id: number }).id)
    }

    // cover_path: local art (folder file / extracted embed) wins; when the scan
    // found none, COALESCE keeps whatever is there (e.g. online-fetched art).
    const upsertAlbum = db.prepare(
      `INSERT INTO music_album (artist_id, title, dir_path, year, cover_path)
       VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(dir_path) DO UPDATE SET
         artist_id = excluded.artist_id,
         title = excluded.title,
         year = COALESCE(excluded.year, music_album.year),
         cover_path = COALESCE(excluded.cover_path, music_album.cover_path),
         updated_at = datetime('now')`
    )
    const getAlbumId = db.prepare('SELECT id FROM music_album WHERE dir_path = ?')
    const albumIdByDir = new Map<string, number>()
    for (const a of albums) {
      const tracks = byAlbum.get(a.albumDir) ?? []
      if (tracks.length === 0) continue
      const year = tracks.find((t) => t.year != null)?.year ?? null
      upsertAlbum.run(
        artistIdByDir.get(a.artistDir),
        a.albumTitle,
        a.albumDir,
        year,
        coverByAlbumDir.get(a.albumDir) ?? null
      )
      albumIdByDir.set(a.albumDir, (getAlbumId.get(a.albumDir) as { id: number }).id)
    }

    const upsertTrack = db.prepare(
      `INSERT INTO music_track
         (album_id, artist_id, file_path, file_mtime, title, track_no, disc_no, duration, tag_artist)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(file_path) DO UPDATE SET
         album_id = excluded.album_id,
         artist_id = excluded.artist_id,
         file_mtime = excluded.file_mtime,
         title = excluded.title,
         track_no = excluded.track_no,
         disc_no = excluded.disc_no,
         duration = excluded.duration,
         tag_artist = excluded.tag_artist,
         updated_at = datetime('now')`
    )
    const seen: string[] = []
    for (const a of albums) {
      const albumId = albumIdByDir.get(a.albumDir)
      if (albumId == null) continue
      const artistId = artistIdByDir.get(a.artistDir)
      for (const t of byAlbum.get(a.albumDir) ?? []) {
        // A "feat." tag differing from the folder artist is display-worthy;
        // a tag equal to the folder name is noise.
        const tagArtist = t.tagArtist && t.tagArtist !== a.artistName ? t.tagArtist : null
        upsertTrack.run(
          albumId,
          artistId,
          t.relPath,
          Math.round(t.mtimeMs),
          t.title,
          t.trackNo,
          t.discNo,
          t.duration,
          tagArtist
        )
        seen.push(t.relPath)
        if (!existingPaths.has(t.relPath)) counts.added += 1
      }
    }

    if (completeSnapshot) {
    // Prune vanished tracks (chunked NOT IN), then empty albums/artists.
    if (seen.length === 0) {
      counts.removed = existingPaths.size
      db.prepare('DELETE FROM music_track').run()
    } else {
      const seenSet = new Set(seen)
      const gone = [...existingPaths].filter((p) => !seenSet.has(p))
      counts.removed = gone.length
      for (let i = 0; i < gone.length; i += CHUNK) {
        const chunk = gone.slice(i, i + CHUNK)
        db.prepare(
          `DELETE FROM music_track WHERE file_path IN (${chunk.map(() => '?').join(', ')})`
        ).run(...chunk)
      }
    }
    db.prepare(
      'DELETE FROM music_album WHERE id NOT IN (SELECT DISTINCT album_id FROM music_track)'
    ).run()
    db.prepare(
      'DELETE FROM music_artist WHERE id NOT IN (SELECT DISTINCT artist_id FROM music_album)'
    ).run()

    }
    counts.tracks = (db.prepare('SELECT COUNT(*) AS n FROM music_track').get() as { n: number }).n
    counts.albums = (db.prepare('SELECT COUNT(*) AS n FROM music_album').get() as { n: number }).n
    counts.artists = (db.prepare('SELECT COUNT(*) AS n FROM music_artist').get() as { n: number }).n
  })
  tx()
  return counts
}

// Only a complete filesystem snapshot may prune missing rows.
export function syncLibrary(
  albums: ScannedAlbumFolder[], parsed: ParsedTrack[], covers: Map<string, string | null>
): SyncCounts {
  return writeMusicRows(albums, parsed, covers, true)
}

/** Index known output files without walking or pruning the rest of the library. */
export async function indexMusicFiles(
  paths: string[], owner: string, reader: TagReader = realTagReader
): Promise<void> {
  claimMusicMaintenance(owner)
  try {
    const albums = new Map<string, ScannedAlbumFolder>()
    for (const relPath of [...new Set(paths)]) {
      const abs = absoluteMediaPath(`music/${relPath}`)
      if (!abs || isAbsolute(relPath) || relPath.split(/[\\/]/).includes('..')) {
        throw new Error('Downloaded audio must be inside the music folder')
      }
      if (!isAudioFile(relPath)) continue
      const parts = relPath.replace(/\\/g, '/').split('/')
      if (parts.length < 3) throw new Error('Audio must be inside Artist/Album folders')
      const albumDir = parts.slice(0, 2).join('/')
      const fileStat = await stat(abs)
      if (!fileStat.isFile()) continue
      const album = albums.get(albumDir) ?? {
        artistDir: parts[0], artistName: parts[0], albumDir, albumTitle: parts[1],
        coverFile: null, files: []
      }
      album.files.push({ relPath, albumDir, fileName: basename(abs), mtimeMs: fileStat.mtimeMs })
      albums.set(albumDir, album)
    }
    const folders = [...albums.values()]
    const parsed = await parseFiles(folders.flatMap((a) => a.files), reader, () => true)
    const covers = new Map<string, string | null>()
    for (const album of folders) {
      const existingCover = getSqlite().prepare('SELECT cover_path FROM music_album WHERE dir_path=?')
        .get(album.albumDir) as { cover_path: string | null } | undefined
      if (existingCover?.cover_path) continue
      const pic = parsed.find((track) => track.albumDir === album.albumDir && track.picture)?.picture
      if (pic) {
        const name = `${createHash('sha1').update(album.albumDir).digest('hex').slice(0, 16)}${extForPicture(pic.format)}`
        const dest = join(musicCoversDir(), name)
        if (!existsSync(dest)) writeFileSync(dest, Buffer.from(pic.data))
        covers.set(album.albumDir, `media/music-covers/${name}`)
      }
    }
    if (folders.length) {
      writeMusicRows(folders, parsed, covers, false)
      resolveAllSpotifyItems(parsed.map((track) => track.title))
    }
  } finally {
    releaseMusicMaintenance(owner)
  }
}

// ---------------------------------------------------------------------------
// Scan orchestration + status (polled by the renderer at 500ms while running).
// ---------------------------------------------------------------------------

const scanState: MusicScanStatus = { running: false, phase: 'idle', done: 0, total: 0, error: null }

export function getScanStatus(): MusicScanStatus {
  return { ...scanState }
}

function musicCoversDir(): string {
  const dir = join(app.getPath('userData'), 'media', 'music-covers')
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true })
  return dir
}

function extForPicture(format: string): string {
  const f = format.toLowerCase()
  if (f.includes('png')) return '.png'
  if (f.includes('webp')) return '.webp'
  return '.jpg'
}

export async function startScan(
  reader: TagReader = realTagReader,
  maintenanceOwner = 'music scan'
): Promise<MusicScanSummary> {
  if (scanState.running) throw new Error('A scan is already running')
  claimMusicMaintenance(maintenanceOwner)
  // The scan itself is untouched — runTask only wraps it in a registry row
  // whose projection reads the same scanState the Music page already polls.
  try {
    return await tasks.runTask(
      {
        kind: 'musicScan',
        label: 'Scanning music library',
        route: '/music',
        controls: tasks.flagCancel('Scans cannot be paused — stop and re-run instead'),
        project: () => ({ detail: scanState.phase, done: scanState.done, total: scanState.total })
      },
      (handle) => scanLibrary(reader, handle)
    )
  } finally {
    releaseMusicMaintenance(maintenanceOwner)
  }
}

async function scanLibrary(reader: TagReader, handle: tasks.TaskHandle): Promise<MusicScanSummary> {
  const startedAt = Date.now()
  Object.assign(scanState, { running: true, phase: 'walking', done: 0, total: 0, error: null })
  try {
    const root = musicRootDir()
    if (!existsSync(root)) {
      throw new Error(`Music folder not found: ${root} — set it in Settings or pick one`)
    }
    const { albums, skippedRootFiles } = await walkMusicRoot(root, handle.cancelRequested)
    const db = getSqlite()

    // Zero files with a non-empty library means the folder is wrong or the drive
    // is unmounted — bail BEFORE syncLibrary would prune every track (cascading
    // into playlists, likes and play history). A first scan of a genuinely empty
    // library still proceeds and reports zeros.
    if (albums.length === 0) {
      const existingCount = (
        db.prepare('SELECT COUNT(*) AS n FROM music_track').get() as { n: number }
      ).n
      if (existingCount > 0) {
        throw new Error(
          `No audio files found in ${root} — keeping the existing library (${existingCount} tracks). ` +
            (skippedRootFiles > 0
              ? `${skippedRootFiles} loose file(s) sit at the root; use Artist/Album folders.`
              : 'Is the drive mounted / is the folder right?')
        )
      }
    }

    // mtime fast path: unchanged files are rebuilt from their DB row instead of
    // re-reading tags, so a rescan after a download parses only the new files.
    const existing = new Map(
      (
        db
          .prepare(
            'SELECT file_path, file_mtime, title, track_no, disc_no, duration, tag_artist FROM music_track'
          )
          .all() as {
          file_path: string
          file_mtime: number | null
          title: string
          track_no: number | null
          disc_no: number | null
          duration: number | null
          tag_artist: string | null
        }[]
      ).map((r) => [r.file_path, r])
    )
    const albumCover = new Map(
      (
        db.prepare('SELECT dir_path, cover_path FROM music_album').all() as {
          dir_path: string
          cover_path: string | null
        }[]
      ).map((r) => [r.dir_path, r.cover_path])
    )

    const missingCovers = new Set<string>()
    const covers = [...albumCover]
    let nextCover = 0
    await Promise.all(Array.from({ length: Math.min(8, covers.length) }, async () => {
      while (nextCover < covers.length) {
        if (handle.cancelRequested()) throw new tasks.TaskCancelledError('Scanning music library')
        const [dir, path] = covers[nextCover++]
        if (!path) continue
        try {
          await stat(absoluteMediaPath(path))
        } catch (error) {
          if ((error as NodeJS.ErrnoException).code !== 'ENOENT') throw error
          missingCovers.add(dir)
          albumCover.set(dir, null)
        }
      }
    }))
    const needsEmbed = new Set(
      albums.filter((a) => !a.coverFile && !albumCover.get(a.albumDir)).map((a) => a.albumDir)
    )
    const firstFileOfAlbum = new Map(albums.map((a) => [a.albumDir, a.files[0]?.relPath]))

    const allFiles = albums.flatMap((a) => a.files)
    const toParse: ScannedFile[] = []
    const unchanged: ParsedTrack[] = []
    for (const f of allFiles) {
      const row = existing.get(f.relPath)
      const needsPicture = missingCovers.has(f.albumDir) && needsEmbed.has(f.albumDir) &&
        firstFileOfAlbum.get(f.albumDir) === f.relPath
      if (row && row.file_mtime != null && Math.round(f.mtimeMs) === row.file_mtime && !needsPicture) {
        unchanged.push({
          ...f,
          title: row.title,
          trackNo: row.track_no,
          discNo: row.disc_no,
          duration: row.duration,
          tagArtist: row.tag_artist,
          year: null,
          picture: null
        })
      } else {
        toParse.push(f)
      }
    }

    Object.assign(scanState, { phase: 'tags', done: 0, total: toParse.length })
    const freshlyParsed = await parseFiles(
      toParse,
      reader,
      (f) => needsEmbed.has(f.albumDir) && firstFileOfAlbum.get(f.albumDir) === f.relPath,
      (done) => {
        scanState.done = done
        // Tag parsing is the long phase, so this is where a stop has to bite.
        // Throwing before any DB write means a cancelled scan changes nothing.
        if (handle.cancelRequested()) throw new tasks.TaskCancelledError('Scanning music library')
      }
    )
    const parsed = [...unchanged, ...freshlyParsed]

    // Resolve cover per album: folder file > extracted embed > keep existing (COALESCE in sync).
    scanState.phase = 'writing'
    const coverByAlbumDir = new Map<string, string | null>()
    for (const a of albums) {
      if (a.coverFile) {
        coverByAlbumDir.set(a.albumDir, `music/${a.coverFile}`)
        continue
      }
      const pic = freshlyParsed.find((t) => t.albumDir === a.albumDir && t.picture)?.picture
      if (pic && needsEmbed.has(a.albumDir)) {
        const name = `${createHash('sha1').update(a.albumDir).digest('hex').slice(0, 16)}${extForPicture(pic.format)}`
        const dest = join(musicCoversDir(), name)
        if (!existsSync(dest)) writeFileSync(dest, Buffer.from(pic.data))
        coverByAlbumDir.set(a.albumDir, `media/music-covers/${name}`)
      } else {
        coverByAlbumDir.set(a.albumDir, null)
      }
    }

    const counts = db.transaction(() => {
      const clearMissing = db.prepare('UPDATE music_album SET cover_path=NULL WHERE dir_path=?')
      for (const dir of missingCovers) clearMissing.run(dir)
      return syncLibrary(albums, parsed, coverByAlbumDir)
    })()
    resolveAllSpotifyItems()
    return { ...counts, skippedRootFiles, durationMs: Date.now() - startedAt }
  } catch (e) {
    scanState.error = e instanceof Error ? e.message : String(e)
    throw e
  } finally {
    scanState.running = false
    scanState.phase = 'idle'
  }
}

// First-run entry point: pick the music root folder, remember it, scan it.
// Returns null when the dialog is cancelled.
export async function pickRootAndScan(): Promise<MusicScanSummary | null> {
  const res = await dialog.showOpenDialog({
    title: 'Choose your music folder (artists as subfolders)',
    defaultPath: getSetting('music.dir')?.trim() || undefined,
    properties: ['openDirectory']
  })
  if (res.canceled || res.filePaths.length === 0) return null
  setSetting('music.dir', res.filePaths[0])
  return startScan()
}

// ---------------------------------------------------------------------------
// Deletion — removes DB rows AND the underlying files from disk. Destructive
// and irreversible; the renderer gates every call behind a confirm dialog.
// file_path/dir_path are stored root-relative (no "music/" prefix), so we re-add
// it to reuse absoluteMediaPath's `..`-escape guard.
// ---------------------------------------------------------------------------

// Belt-and-braces on top of absoluteMediaPath: never touch anything that isn't
// strictly *inside* the music root (and never the root itself).
function assertInsideMusicRoot(abs: string): void {
  const rel = relative(musicRootDir(), abs)
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
    throw new Error(`Refusing to delete outside the music root: ${abs}`)
  }
}

async function unlinkTrackFile(relPath: string): Promise<boolean> {
  const abs = absoluteMediaPath(`music/${relPath}`)
  assertInsideMusicRoot(abs)
  try {
    await unlink(abs)
    return true
  } catch (e) {
    if ((e as NodeJS.ErrnoException).code === 'ENOENT') return false // already gone
    throw e
  }
}

// Best-effort: drop a directory once its last file leaves. Safe on a folder that
// still holds other tracks or leftover art (readdir non-empty → left alone).
async function rmdirIfEmpty(abs: string): Promise<void> {
  try {
    assertInsideMusicRoot(abs)
    if ((await readdir(abs)).length === 0) await rmdir(abs)
  } catch {
    /* not empty / gone / outside root — leave it */
  }
}

// Delete individual tracks: unlink each file, drop the rows (cascades play_log +
// playlist entries), then prune any album/artist folder the removals emptied.
export async function deleteTracks(trackIds: number[]): Promise<MusicDeleteResult> {
  if (!trackIds.length) return { tracks: 0 }
  const db = getSqlite()
  const ph = trackIds.map(() => '?').join(',')
  const rows = db
    .prepare(`SELECT file_path FROM music_track WHERE id IN (${ph})`)
    .all(...trackIds) as { file_path: string }[]
  const dirs = new Set<string>()
  for (const r of rows) {
    await unlinkTrackFile(r.file_path)
    dirs.add(absoluteMediaPath(`music/${dirname(r.file_path)}`))
  }
  const info = db.prepare(`DELETE FROM music_track WHERE id IN (${ph})`).run(...trackIds)
  for (const d of dirs) {
    await rmdirIfEmpty(d) // album folder
    await rmdirIfEmpty(dirname(d)) // its artist folder, if that was the last album
  }
  return { tracks: info.changes }
}

// Delete a whole album. Unlinks files PER TRACK (never a recursive rm): a
// synthetic "Singles" album's dir_path equals the artist folder, so a recursive
// wipe would take the entire artist down with it.
export async function deleteAlbum(albumId: number): Promise<MusicDeleteResult> {
  const db = getSqlite()
  const rows = db
    .prepare('SELECT file_path FROM music_track WHERE album_id = ?')
    .all(albumId) as { file_path: string }[]
  const dirs = new Set<string>()
  for (const r of rows) {
    await unlinkTrackFile(r.file_path)
    dirs.add(absoluteMediaPath(`music/${dirname(r.file_path)}`))
  }
  db.prepare('DELETE FROM music_album WHERE id = ?').run(albumId) // cascades tracks
  for (const d of dirs) {
    await rmdirIfEmpty(d)
    await rmdirIfEmpty(dirname(d))
  }
  return { tracks: rows.length }
}

// Delete an artist and everything under them. The artist folder is a distinct
// top-level directory, so a recursive rm is safe here and also clears leftover
// cover art / non-audio the per-file path would leave behind.
export async function deleteArtist(artistId: number): Promise<MusicDeleteResult> {
  const db = getSqlite()
  const artist = db.prepare('SELECT dir_path FROM music_artist WHERE id = ?').get(artistId) as
    | { dir_path: string }
    | undefined
  const trackCount = (
    db.prepare('SELECT COUNT(*) AS n FROM music_track WHERE artist_id = ?').get(artistId) as {
      n: number
    }
  ).n
  if (artist?.dir_path) {
    const abs = absoluteMediaPath(`music/${artist.dir_path}`)
    assertInsideMusicRoot(abs)
    await rm(abs, { recursive: true, force: true })
  }
  db.prepare('DELETE FROM music_artist WHERE id = ?').run(artistId) // only after filesystem success
  return { tracks: trackCount }
}
