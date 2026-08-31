import { statSync } from 'fs'
import { extname } from 'path'
import type { Readable } from 'stream'
import yauzl from 'yauzl'

// CBZ/ZIP chapter support for the manga reader. yauzl reads the central
// directory and streams single entries via random access, so a 300MB volume
// never sits in memory — the protocol handler serves one page at a time
// straight out of the archive.

export const ARCHIVE_EXTS = new Set(['.cbz', '.zip'])
// Everything the protocol handler can stream entries out of. EPUBs are zips
// too, but deliberately NOT in ARCHIVE_EXTS — the scanner must treat a .epub
// as a book (src/main/epub.ts), never as a CBZ of its embedded images.
const ZIPLIKE_EXTS = new Set([...ARCHIVE_EXTS, '.epub'])
export const MAX_ARCHIVE_ENTRY_BYTES = 128 * 1024 * 1024

export function isArchiveFile(name: string): boolean {
  return ARCHIVE_EXTS.has(extname(name).toLowerCase())
}

// A page URL inside an archive looks like "manga/Series/Vol 1.cbz/0001.png"
// (or "manga/Series/Vol 1.epub/OEBPS/ch1.xhtml" for books). Splits it at the
// archive segment; null when the path has no archive segment or nothing
// follows it (that's the archive itself, not an entry).
export function splitArchivePath(
  relPath: string
): { archiveRel: string; entryName: string } | null {
  const parts = relPath.split('/')
  for (let i = 0; i < parts.length - 1; i++) {
    if (ZIPLIKE_EXTS.has(extname(parts[i]).toLowerCase())) {
      return { archiveRel: parts.slice(0, i + 1).join('/'), entryName: parts.slice(i + 1).join('/') }
    }
  }
  return null
}

const MIME: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.avif': 'image/avif',
  '.bmp': 'image/bmp'
}

// Extra types served out of EPUBs (spine documents, styles the renderer may
// fetch, embedded fonts/SVG covers). Scripts are deliberately absent — book
// JS is never executed. Kept separate from MIME: listArchivePages keys off
// MIME to decide what counts as a CBZ page image.
const EPUB_MIME: Record<string, string> = {
  '.xhtml': 'application/xhtml+xml',
  '.html': 'text/html',
  '.htm': 'text/html',
  '.css': 'text/css',
  '.svg': 'image/svg+xml',
  '.ttf': 'font/ttf',
  '.otf': 'font/otf',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
}

// Audio served by the protocol handler's plain-file path (music library, theme
// songs). Kept separate from MIME: listArchivePages keys off MIME to decide
// what counts as a CBZ page image, and audio must never count.
const AUDIO_MIME: Record<string, string> = {
  '.mp3': 'audio/mpeg',
  '.flac': 'audio/flac',
  '.m4a': 'audio/mp4',
  '.aac': 'audio/aac',
  '.ogg': 'audio/ogg',
  '.opus': 'audio/ogg',
  '.wav': 'audio/wav'
}

// Local video files and their sidecar subtitle tracks. Kept separate from MIME
// for the same reason as the two maps above (listArchivePages keys off MIME to
// decide what counts as a CBZ page), and consulted BEFORE audio because .webm
// is a video container that happens to also carry audio-only files — a video
// .webm served as audio/webm never gets a picture. Nothing in the app produces
// an audio .webm (music.ts:AUDIO_EXTS excludes it, AnimeThemes serves .ogg, and
// yt-dlp is constrained to opus|m4a|mp3), and <audio> plays video/webm anyway.
//
// Chromium can only DECODE mp4/webm; the rest are here so the ffmpeg tier can
// stream a source file for probing and the player can name what it found.
const VIDEO_MIME: Record<string, string> = {
  '.mp4': 'video/mp4',
  '.m4v': 'video/mp4',
  '.mov': 'video/quicktime',
  '.webm': 'video/webm',
  '.mkv': 'video/x-matroska',
  '.avi': 'video/x-msvideo',
  '.ogv': 'video/ogg',
  '.ts': 'video/mp2t',
  '.m2ts': 'video/mp2t',
  '.wmv': 'video/x-ms-wmv',
  '.flv': 'video/x-flv',
  '.mpg': 'video/mpeg',
  '.mpeg': 'video/mpeg',
  '.srt': 'text/plain; charset=utf-8',
  '.vtt': 'text/vtt; charset=utf-8',
  '.ass': 'text/plain; charset=utf-8',
  '.ssa': 'text/plain; charset=utf-8'
}

export function mimeFor(name: string): string {
  const ext = extname(name).toLowerCase()
  return (
    MIME[ext] ?? EPUB_MIME[ext] ?? VIDEO_MIME[ext] ?? AUDIO_MIME[ext] ?? 'application/octet-stream'
  )
}

interface OpenArchive {
  zipfile: yauzl.ZipFile
  entries: Map<string, yauzl.Entry>
}

// Open archives are cached (central directory parsed once, fd kept open) so
// paging through a chapter doesn't reopen the zip per page. Keyed by path,
// invalidated on mtime change, capped small — reading is one chapter at a time.
const CACHE_MAX = 3
const cache = new Map<string, { mtimeMs: number; promise: Promise<OpenArchive> }>()

function openArchive(absPath: string): Promise<OpenArchive> {
  return new Promise((resolve, reject) => {
    yauzl.open(absPath, { lazyEntries: true, autoClose: false }, (err, zipfile) => {
      if (err || !zipfile) return reject(err ?? new Error('yauzl returned no zipfile'))
      const entries = new Map<string, yauzl.Entry>()
      zipfile.on('entry', (entry: yauzl.Entry) => {
        if (!entry.fileName.endsWith('/')) entries.set(entry.fileName, entry)
        zipfile.readEntry()
      })
      zipfile.on('end', () => resolve({ zipfile, entries }))
      zipfile.on('error', reject)
      zipfile.readEntry()
    })
  })
}

function cachedArchive(absPath: string): Promise<OpenArchive> {
  const mtimeMs = statSync(absPath).mtimeMs
  const hit = cache.get(absPath)
  if (hit && hit.mtimeMs === mtimeMs) {
    // refresh LRU recency
    cache.delete(absPath)
    cache.set(absPath, hit)
    return hit.promise
  }
  if (hit) void hit.promise.then((a) => a.zipfile.close()).catch(() => {})
  const promise = openArchive(absPath)
  // a failed open must not stay cached
  promise.catch(() => cache.delete(absPath))
  cache.set(absPath, { mtimeMs, promise })
  if (cache.size > CACHE_MAX) {
    const oldest = cache.keys().next().value
    if (oldest !== undefined) {
      void cache.get(oldest)!.promise.then((a) => a.zipfile.close()).catch(() => {})
      cache.delete(oldest)
    }
  }
  return promise
}

const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

// Natural-sorted image entry names (full paths within the archive — pages are
// often nested one folder deep). Junk dirs and dotfiles skipped. [] on any
// failure, matching listChapterPages' behavior for unreadable directories.
export async function listArchivePages(absPath: string): Promise<string[]> {
  try {
    const { entries } = await cachedArchive(absPath)
    return [...entries.keys()]
      .filter((name) => {
        const base = name.split('/').pop()!
        return (
          MIME[extname(base).toLowerCase()] !== undefined &&
          !base.startsWith('.') &&
          !name.startsWith('__MACOSX/')
        )
      })
      .sort((a, b) => collator.compare(a, b))
  } catch {
    return []
  }
}

// Every entry name in the archive (any type), for callers that need to map
// internal references onto real entries (the EPUB parser). null on failure.
export async function listArchiveEntries(absPath: string): Promise<string[] | null> {
  try {
    const { entries } = await cachedArchive(absPath)
    return [...entries.keys()]
  } catch {
    return null
  }
}

export async function openArchiveEntryStream(
  absPath: string,
  entryName: string
): Promise<{ stream: Readable; size: number } | null> {
  try {
    const { zipfile, entries } = await cachedArchive(absPath)
    const entry = entries.get(entryName)
    if (!entry) return null
    if (entry.uncompressedSize > MAX_ARCHIVE_ENTRY_BYTES) return null
    const stream = await new Promise<Readable>((resolve, reject) => {
      zipfile.openReadStream(entry, (err, stream) => {
        if (err || !stream) return reject(err ?? new Error('no stream'))
        resolve(stream)
      })
    })
    return { stream, size: entry.uncompressedSize }
  } catch {
    return null
  }
}

export async function readArchiveEntry(absPath: string, entryName: string): Promise<Buffer | null> {
  try {
    const opened = await openArchiveEntryStream(absPath, entryName)
    if (!opened) return null
    return await new Promise((resolve, reject) => {
      const chunks: Buffer[] = []
      opened.stream.on('data', (c: Buffer) => chunks.push(c))
      opened.stream.on('end', () => resolve(Buffer.concat(chunks)))
      opened.stream.on('error', reject)
    })
  } catch {
    return null
  }
}
