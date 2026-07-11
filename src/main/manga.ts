import { dialog } from 'electron'
import { join, extname, basename, dirname, relative, isAbsolute } from 'path'
import { existsSync, readdirSync } from 'fs'
import { readdir } from 'fs/promises'
import { getSqlite } from './db/connection'
import { get as getSetting, set as setSetting } from './repos/settingsRepo'
import { mangaRootDir } from './files'
import { isArchiveFile, listArchivePages } from './archive'
import { isEpubFile, epubSpineCount, listEpubPages, epubToc } from './epub'
import { mediaUrl } from '@shared/mediaUrl'
import type {
  MangaAttachResult,
  MangaChapter,
  MangaLibrary,
  MangaPages,
  ScannedChapter
} from '@shared/types'

// ---------------------------------------------------------------------------
// Pure scanning helpers (exported for tests — no electron/db access).
// ---------------------------------------------------------------------------

const IMAGE_EXTS = new Set(['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif', '.bmp'])
const collator = new Intl.Collator(undefined, { numeric: true, sensitivity: 'base' })

// Chapter number from a folder name. Explicit chapter markers win ("ch 12",
// "Chapter 12.5", "第12話"); a bare number is the fallback, but only after
// volume markers ("Vol.3", "第3巻") are stripped so "Vol 3" alone is NOT a
// chapter number while "Vol.3 Ch.25" is 25.
export function parseChapterNumber(name: string): number | null {
  const marker = name.match(/ch(?:apter)?\.?\s*(\d+(?:\.\d+)?)/i) ?? name.match(/第\s*(\d+(?:\.\d+)?)\s*話/)
  if (marker) return parseFloat(marker[1])
  const stripped = name
    .replace(/v(?:ol(?:ume)?)?\.?\s*\d+(?:\.\d+)?/gi, ' ')
    .replace(/第\s*\d+(?:\.\d+)?\s*巻/g, ' ')
  const bare = stripped.match(/(\d+(?:\.\d+)?)/)
  return bare ? parseFloat(bare[1]) : null
}

function isImageFile(name: string): boolean {
  return !name.startsWith('.') && IMAGE_EXTS.has(extname(name).toLowerCase())
}

// Natural-sorted page names inside a chapter path — image files for a folder
// chapter, image entry names for a .cbz/.zip chapter, spine document entry
// paths (reading order) for a .epub book. This is the format seam: every page
// read goes through here.
export async function listChapterPages(absPath: string): Promise<string[]> {
  if (isArchiveFile(absPath)) return listArchivePages(absPath)
  if (isEpubFile(absPath)) return listEpubPages(absPath)
  let entries: import('fs').Dirent[]
  try {
    entries = readdirSync(absPath, { withFileTypes: true })
  } catch {
    return []
  }
  return entries
    .filter((e) => e.isFile() && isImageFile(e.name))
    .map((e) => e.name)
    .sort((a, b) => collator.compare(a, b))
}

// Walks a series folder and returns every "chapter" found: any directory that
// DIRECTLY contains at least one page image, every .cbz/.zip archive, and
// every .epub book (light novels live in the manga section; a book's "pages"
// are its spine documents). Tolerates mixed layouts — a flat series (pages at
// the top level, dirPath ''), nested chapter folders, loose archives and
// books can coexist. dirPath is relative to absDir with forward slashes.
export async function scanSeriesDir(absDir: string, seriesTitle: string): Promise<ScannedChapter[]> {
  const found: ScannedChapter[] = []
  const walk = async (dir: string, rel: string, depth: number): Promise<void> => {
    if (depth > 5) return
    let entries: import('fs').Dirent[]
    try {
      // Async on purpose: readdirSync bursts here block the main process (and
      // with it keyboard input) on big/slow libraries — see walkMusicRoot.
      entries = await readdir(dir, { withFileTypes: true })
    } catch {
      return
    }
    const pageCount = entries.filter((e) => e.isFile() && isImageFile(e.name)).length
    if (pageCount > 0) {
      const name = rel === '' ? seriesTitle : basename(dir)
      found.push({
        dirPath: rel,
        title: name,
        number: rel === '' ? null : parseChapterNumber(name),
        pageCount
      })
    }
    for (const e of entries) {
      if (e.isFile() && isArchiveFile(e.name)) {
        const stem = e.name.slice(0, e.name.length - extname(e.name).length)
        const archivePages = await listArchivePages(join(dir, e.name))
        if (archivePages.length > 0) {
          found.push({
            dirPath: rel === '' ? e.name : `${rel}/${e.name}`,
            title: stem,
            number: parseChapterNumber(stem),
            pageCount: archivePages.length
          })
        }
        continue
      }
      if (e.isFile() && isEpubFile(e.name)) {
        const stem = e.name.slice(0, e.name.length - extname(e.name).length)
        const spineCount = await epubSpineCount(join(dir, e.name))
        if (spineCount > 0) {
          found.push({
            dirPath: rel === '' ? e.name : `${rel}/${e.name}`,
            title: stem,
            number: parseChapterNumber(stem),
            pageCount: spineCount
          })
        }
        continue
      }
      if (!e.isDirectory() || e.isSymbolicLink() || e.name.startsWith('.')) continue
      if (e.name === '_ocr') continue // mokuro legacy output, never pages
      await walk(join(dir, e.name), rel === '' ? e.name : `${rel}/${e.name}`, depth + 1)
    }
  }
  await walk(absDir, '', 0)
  found.sort((a, b) => {
    const an = a.number ?? Infinity
    const bn = b.number ?? Infinity
    if (an !== bn) return an - bn
    return collator.compare(a.dirPath, b.dirPath)
  })
  return found
}

// ---------------------------------------------------------------------------
// Repo — chapters attached to a media_item.
// dir_path in the DB is relative to the manga library root ("Berserk/Ch 001");
// a flat series stores the series folder itself as its single chapter's path.
// ---------------------------------------------------------------------------

function rowToChapter(r: Record<string, unknown>): MangaChapter {
  return {
    id: r.id as number,
    mediaId: r.media_id as number,
    dirPath: r.dir_path as string,
    title: r.title as string,
    number: (r.number as number) ?? null,
    pageCount: r.page_count as number,
    sortOrder: r.sort_order as number,
    lastReadPage: (r.last_read_page as number) ?? null,
    readAt: (r.read_at as string) ?? null
  }
}

function localDirOf(mediaId: number): string | null {
  const row = getSqlite().prepare('SELECT local_dir FROM media_item WHERE id = ?').get(mediaId) as
    | { local_dir: string | null }
    | undefined
  return row?.local_dir ?? null
}

export function chapters(mediaId: number): MangaLibrary {
  const rows = getSqlite()
    .prepare('SELECT * FROM manga_chapter WHERE media_id = ? ORDER BY sort_order, id')
    .all(mediaId) as Record<string, unknown>[]
  return { localDir: localDirOf(mediaId), chapters: rows.map(rowToChapter) }
}

// Upserts the scanned chapters for a media item in one transaction: refreshes
// title/number/page_count/sort_order on surviving rows (never touching reading
// state), inserts new ones, deletes rows whose folder vanished. Because rows
// are matched by dir_path, a rescan preserves last_read_page/read_at for free.
function syncChapters(mediaId: number, localDir: string, scanned: ScannedChapter[]): void {
  const db = getSqlite()
  const tx = db.transaction(() => {
    const keep: string[] = []
    const upsert = db.prepare(
      `INSERT INTO manga_chapter (media_id, dir_path, title, number, page_count, sort_order)
       VALUES (?, ?, ?, ?, ?, ?)
       ON CONFLICT(media_id, dir_path) DO UPDATE SET
         title = excluded.title,
         number = excluded.number,
         page_count = excluded.page_count,
         sort_order = excluded.sort_order,
         updated_at = datetime('now')`
    )
    scanned.forEach((c, i) => {
      const dirPath = c.dirPath === '' ? localDir : `${localDir}/${c.dirPath}`
      keep.push(dirPath)
      upsert.run(mediaId, dirPath, c.title, c.number, c.pageCount, i)
    })
    if (keep.length === 0) {
      db.prepare('DELETE FROM manga_chapter WHERE media_id = ?').run(mediaId)
    } else {
      db.prepare(
        `DELETE FROM manga_chapter WHERE media_id = ?
         AND dir_path NOT IN (${keep.map(() => '?').join(', ')})`
      ).run(mediaId, ...keep)
    }
    db.prepare(`UPDATE media_item SET local_dir = ?, updated_at = datetime('now') WHERE id = ?`).run(
      localDir,
      mediaId
    )
  })
  tx()
}

export async function attachFolder(mediaId: number): Promise<MangaAttachResult> {
  const media = getSqlite().prepare('SELECT title FROM media_item WHERE id = ?').get(mediaId) as
    | { title: string }
    | undefined
  if (!media) return { ok: false, error: 'Media item not found' }

  const res = await dialog.showOpenDialog({
    title: 'Choose the series folder',
    defaultPath: getSetting('manga.dir')?.trim() || undefined,
    properties: ['openDirectory']
  })
  if (res.canceled || res.filePaths.length === 0) return { ok: false }
  const picked = res.filePaths[0]

  // First attach bootstraps the library root as the picked folder's parent;
  // afterwards every attached series must live under that root so stored paths
  // stay relative and the library stays relocatable.
  let root = getSetting('manga.dir')?.trim()
  if (!root) {
    root = dirname(picked)
    setSetting('manga.dir', root)
  }
  const rel = relative(root, picked)
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
    return {
      ok: false,
      error: `Folder must be inside the manga library root (${root} — change it in Settings)`
    }
  }
  const localDir = rel.split('\\').join('/')

  const scanned = await scanSeriesDir(picked, media.title)
  if (scanned.length === 0)
    return { ok: false, error: 'No page images or EPUB books found in that folder' }
  syncChapters(mediaId, localDir, scanned)
  return { ok: true, chapterCount: scanned.length }
}

export async function rescan(mediaId: number): Promise<MangaAttachResult> {
  const localDir = localDirOf(mediaId)
  if (!localDir) return { ok: false, error: 'No folder attached' }
  const abs = join(mangaRootDir(), localDir)
  if (!existsSync(abs)) {
    return { ok: false, error: `Folder not found: ${abs} — is the manga root set correctly?` }
  }
  const media = getSqlite().prepare('SELECT title FROM media_item WHERE id = ?').get(mediaId) as {
    title: string
  }
  const scanned = await scanSeriesDir(abs, media.title)
  if (scanned.length === 0)
    return { ok: false, error: 'No page images or EPUB books found in the folder' }
  syncChapters(mediaId, localDir, scanned)
  return { ok: true, chapterCount: scanned.length }
}

export function detach(mediaId: number): void {
  const db = getSqlite()
  const tx = db.transaction(() => {
    db.prepare('DELETE FROM manga_chapter WHERE media_id = ?').run(mediaId)
    db.prepare(
      `UPDATE media_item SET local_dir = NULL, updated_at = datetime('now') WHERE id = ?`
    ).run(mediaId)
  })
  tx()
}

// Chapter row + its page list from disk (natural-sorted), as navimg URLs.
// For a .epub chapter the "pages" are its spine documents (served as XHTML
// out of the zip) and the book's table of contents rides along. page_count is
// opportunistically corrected if the folder changed on disk.
export async function pages(chapterId: number): Promise<MangaPages | null> {
  const db = getSqlite()
  const row = db.prepare('SELECT * FROM manga_chapter WHERE id = ?').get(chapterId) as
    | Record<string, unknown>
    | undefined
  if (!row) return null
  const ch = rowToChapter(row)
  const abs = join(mangaRootDir(), ch.dirPath)
  const files = await listChapterPages(abs)
  if (files.length !== ch.pageCount) {
    db.prepare(
      `UPDATE manga_chapter SET page_count = ?, updated_at = datetime('now') WHERE id = ?`
    ).run(files.length, chapterId)
    ch.pageCount = files.length
  }
  const isBook = isEpubFile(ch.dirPath)
  return {
    chapterId: ch.id,
    mediaId: ch.mediaId,
    title: ch.title,
    number: ch.number,
    pages: files.map((f) => {
      const relPath = `manga/${ch.dirPath}/${f}`
      // relPath is never empty, so mediaUrl can't return null here.
      return { relPath, url: mediaUrl(relPath)! }
    }),
    ...(isBook ? { isBook: true, toc: await epubToc(abs) } : {})
  }
}

// Raises media_item.progress (chapters read) to match the local read state.
// Candidate = highest read chapter number when numbers were parsed, else the
// count of read chapters. Never lowers progress — AniList-imported counts and
// chapters read outside the app must survive.
function syncMediaProgress(mediaId: number): void {
  const db = getSqlite()
  const agg = db
    .prepare(
      `SELECT COUNT(*) AS readCount, MAX(number) AS maxNumber
       FROM manga_chapter WHERE media_id = ? AND read_at IS NOT NULL`
    )
    .get(mediaId) as { readCount: number; maxNumber: number | null }
  const candidate = agg.maxNumber != null ? Math.floor(agg.maxNumber) : agg.readCount
  db.prepare(
    `UPDATE media_item SET progress = ?, updated_at = datetime('now')
     WHERE id = ? AND progress < ?`
  ).run(candidate, mediaId, candidate)
}

export function markProgress(chapterId: number, page: number): void {
  const db = getSqlite()
  const row = db
    .prepare('SELECT media_id, page_count, read_at FROM manga_chapter WHERE id = ?')
    .get(chapterId) as { media_id: number; page_count: number; read_at: string | null } | undefined
  if (!row) return
  const finished = row.page_count > 0 && page >= row.page_count - 1
  db.prepare(
    `UPDATE manga_chapter SET last_read_page = ?,
       read_at = CASE WHEN ? THEN COALESCE(read_at, datetime('now')) ELSE read_at END,
       updated_at = datetime('now')
     WHERE id = ?`
  ).run(page, finished ? 1 : 0, chapterId)
  if (finished && !row.read_at) syncMediaProgress(row.media_id)
}

export function markChapterRead(chapterId: number, read: boolean): void {
  const db = getSqlite()
  const row = db.prepare('SELECT media_id FROM manga_chapter WHERE id = ?').get(chapterId) as
    | { media_id: number }
    | undefined
  if (!row) return
  if (read) {
    db.prepare(
      `UPDATE manga_chapter SET read_at = COALESCE(read_at, datetime('now')),
         updated_at = datetime('now') WHERE id = ?`
    ).run(chapterId)
  } else {
    db.prepare(
      `UPDATE manga_chapter SET read_at = NULL, last_read_page = NULL,
         updated_at = datetime('now') WHERE id = ?`
    ).run(chapterId)
  }
  syncMediaProgress(row.media_id)
}
