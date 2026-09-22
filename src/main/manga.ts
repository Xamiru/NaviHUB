import { dialog } from 'electron'
import { join, extname, basename, dirname, relative, isAbsolute, resolve, sep } from 'path'
import { existsSync, readdirSync } from 'fs'
import { readdir } from 'fs/promises'
import { getSqlite } from './db/connection'
import { get as getSetting, set as setSetting } from './repos/settingsRepo'
import * as tasks from './tasks'
import { isUnitProgress } from '@shared/mediaProgress'
import { shuffle } from '@shared/shuffle'
import { seededRng } from '@shared/quizCore'
import { absoluteMediaPath, mangaRootDir, booksRootDir } from './files'
import { isArchiveFile, listArchiveEntries, listArchivePages } from './archive'
import { isEpubFile, epubSpineCount, listEpubPages, epubToc } from './epub'
import { GENRE_CSV_EXPR, YEAR_EXPR } from './repos/quizRepo'
import { mediaUrl } from '@shared/mediaUrl'
import type {
  MediaType,
  MangaAttachResult,
  MangaChapter,
  MangaLibrary,
  MangaPages,
  QuizMangaPanelFilter,
  QuizMangaPanelItem,
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

export class MangaScanError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'MangaScanError'
  }
}

function scanError(path: string, detail: string): MangaScanError {
  return new MangaScanError(`Could not read manga content at ${path}: ${detail}`)
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
    } catch (err) {
      throw scanError(dir, err instanceof Error ? err.message : 'directory is unreadable')
    }
    // Sorted the same way listChapterPages sorts, so the "cover" really is the
    // page the reader would open first.
    const images = entries
      .filter((e) => e.isFile() && isImageFile(e.name))
      .map((e) => e.name)
      .sort((a, b) => collator.compare(a, b))
    if (images.length > 0) {
      const name = rel === '' ? seriesTitle : basename(dir)
      found.push({
        dirPath: rel,
        title: name,
        number: rel === '' ? null : parseChapterNumber(name),
        pageCount: images.length,
        coverPage: images[0]
      })
    }
    for (const e of entries) {
      if (e.isFile() && isArchiveFile(e.name)) {
        const stem = e.name.slice(0, e.name.length - extname(e.name).length)
        const archivePath = join(dir, e.name)
        // listArchivePages deliberately collapses unreadable archives and
        // archives with no images to the same [] result. Check the central
        // directory first so a broken archive aborts the whole scan instead
        // of looking like a deleted chapter during pruning.
        if ((await listArchiveEntries(archivePath)) === null) {
          throw scanError(archivePath, 'archive is unreadable')
        }
        const archivePages = await listArchivePages(archivePath)
        if (archivePages.length > 0) {
          found.push({
            dirPath: rel === '' ? e.name : `${rel}/${e.name}`,
            title: stem,
            number: parseChapterNumber(stem),
            pageCount: archivePages.length,
            coverPage: archivePages[0] ?? null
          })
        }
        continue
      }
      if (e.isFile() && isEpubFile(e.name)) {
        const stem = e.name.slice(0, e.name.length - extname(e.name).length)
        const epubPath = join(dir, e.name)
        // A .epub with no readable spine is a scan error: continuing would
        // make syncChapters prune a previously attached book and its reading
        // state. A folder with no .epub files remains the genuine empty/no-
        // content case handled by attachFolder/rescan below.
        const epubEntries = await listArchiveEntries(epubPath)
        if (epubEntries === null) throw scanError(epubPath, 'EPUB archive is unreadable')
        const spineCount = await epubSpineCount(epubPath)
        if (spineCount === 0) throw scanError(epubPath, 'EPUB package is missing or malformed')
        if (spineCount > 0) {
          found.push({
            dirPath: rel === '' ? e.name : `${rel}/${e.name}`,
            title: stem,
            number: parseChapterNumber(stem),
            pageCount: spineCount,
            coverPage: null // spine documents are XHTML, not a thumbnail
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

function pathInsideRoot(root: string, localPath: string): string | null {
  const rootAbs = resolve(root)
  const candidate = resolve(rootAbs, localPath)
  const escaped = relative(rootAbs, candidate)
  if (escaped === '..' || escaped.startsWith(`..${sep}`) || isAbsolute(escaped)) return null
  return candidate
}

// One manga-panel quiz candidate: a linked series plus each image chapter's
// page list, already read from disk by panelPool().
export interface PanelCandidate {
  mediaId: number
  title: string
  coverPath: string | null
  year: number | null
  genres: string[]
  chapters: { dirPath: string; files: string[]; lastReadPage: number | null; readAt: string | null }[]
}

// Pure seed selection for the manga-panel quiz: shuffles the candidate
// series, takes up to `count` of them — ONE question per series, since a
// second page of the same title would give the answer away — and picks one
// uniformly random page from the flattened eligible pages of each. Exported for tests;
// panelPool() below is its thin IO half.
export function pickPanelSeeds(
  candidates: PanelCandidate[],
  count: number,
  rng: () => number = Math.random
): QuizMangaPanelItem[] {
  const out: QuizMangaPanelItem[] = []
  for (const c of shuffle(candidates, rng)) {
    if (out.length >= count) break
    const pages = c.chapters.flatMap((ch) => {
      const consumedEnd = ch.readAt != null ? ch.files.length - 1 : (ch.lastReadPage ?? -1)
      if (consumedEnd < 0) return []
      const trimEdges = ch.files.length >= 6
      const start = trimEdges ? 2 : 0
      const end = trimEdges && consumedEnd >= ch.files.length - 1 ? ch.files.length - 2 : consumedEnd
      return ch.files.slice(start, end + 1).map((file) => ({ dirPath: ch.dirPath, file }))
    })
    if (pages.length === 0) continue
    const page = pages[Math.floor(rng() * pages.length)]
    out.push({
      mediaId: c.mediaId,
      title: c.title,
      coverPath: c.coverPath,
      year: c.year,
      genres: c.genres,
      // media_type='manga' is guaranteed by the caller's SQL, so the virtual
      // prefix is always 'manga/' here (books resolve through the same module
      // but are filtered out upstream).
      pageRelPath: `manga/${page.dirPath}/${page.file}`
    })
  }
  return out
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
    coverPath: (r.cover_path as string | null) ?? null,
    sortOrder: r.sort_order as number,
    lastReadPage: (r.last_read_page as number) ?? null,
    readAt: (r.read_at as string) ?? null
  }
}

// Book-type media reuse this whole module (same manga_chapter table, same
// scanners, same readers) but live under their own library root. The media
// row's type is the single discriminator — manga_chapter carries no root
// column. Everything path-shaped below resolves through here.
interface RootInfo {
  root: string
  prefix: 'manga' | 'books'
  settingKey: 'manga.dir' | 'books.dir'
  label: 'manga' | 'books'
}

function rootInfoFor(mediaId: number): RootInfo {
  const row = getSqlite().prepare('SELECT media_type FROM media_item WHERE id = ?').get(mediaId) as
    | { media_type: string }
    | undefined
  if (row?.media_type === 'book') {
    return { root: booksRootDir(), prefix: 'books', settingKey: 'books.dir', label: 'books' }
  }
  return { root: mangaRootDir(), prefix: 'manga', settingKey: 'manga.dir', label: 'manga' }
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
function syncChapters(
  mediaId: number,
  localDir: string,
  scanned: ScannedChapter[],
  prefix: 'manga' | 'books'
): void {
  const db = getSqlite()
  const tx = db.transaction(() => {
    const keep: string[] = []
    const upsert = db.prepare(
      `INSERT INTO manga_chapter
         (media_id, dir_path, title, number, page_count, cover_path, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?)
       ON CONFLICT(media_id, dir_path) DO UPDATE SET
         title = excluded.title,
         number = excluded.number,
         page_count = excluded.page_count,
         -- COALESCE so a rescan that cannot see the pages (unreadable archive)
         -- keeps the thumbnail it already had.
         cover_path = COALESCE(excluded.cover_path, cover_path),
         sort_order = excluded.sort_order,
         updated_at = datetime('now')`
    )
    scanned.forEach((c, i) => {
      const dirPath = c.dirPath === '' ? localDir : `${localDir}/${c.dirPath}`
      keep.push(dirPath)
      upsert.run(
        mediaId,
        dirPath,
        c.title,
        c.number,
        c.pageCount,
        c.coverPage ? `${prefix}/${dirPath}/${c.coverPage}` : null,
        i
      )
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
  const info = rootInfoFor(mediaId)

  const res = await dialog.showOpenDialog({
    title: 'Choose the series folder',
    defaultPath: getSetting(info.settingKey)?.trim() || undefined,
    properties: ['openDirectory']
  })
  if (res.canceled || res.filePaths.length === 0) return { ok: false }
  const picked = res.filePaths[0]

  // First attach bootstraps the library root as the picked folder's parent;
  // afterwards every attached series must live under that root so stored paths
  // stay relative and the library stays relocatable.
  let root = getSetting(info.settingKey)?.trim()
  if (!root) {
    root = dirname(picked)
  }
  const rel = relative(root, picked)
  if (rel === '' || rel.startsWith('..') || isAbsolute(rel)) {
    return {
      ok: false,
      error: `Folder must be inside the ${info.label} library root (${root} — change it in Settings)`
    }
  }
  const localDir = rel.split('\\').join('/')

  let scanned: ScannedChapter[]
  try {
    scanned = await scanSeriesDir(picked, media.title)
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
  if (scanned.length === 0)
    return { ok: false, error: 'No page images or EPUB books found in that folder' }
  // Bootstrap only after the complete scan succeeds. A failed first attach
  // must not leave a setting pointing at a folder whose contents were never
  // successfully indexed.
  if (!getSetting(info.settingKey)?.trim()) setSetting(info.settingKey, root)
  syncChapters(mediaId, localDir, scanned, info.prefix)
  return { ok: true, chapterCount: scanned.length }
}

export async function rescan(mediaId: number): Promise<MangaAttachResult> {
  const localDir = localDirOf(mediaId)
  if (!localDir) return { ok: false, error: 'No folder attached' }
  const info = rootInfoFor(mediaId)
  const abs = pathInsideRoot(info.root, localDir)
  if (!abs) {
    return { ok: false, error: 'Attached folder is outside the configured library root' }
  }
  if (!existsSync(abs)) {
    return { ok: false, error: `Folder not found: ${abs} — is the ${info.label} root set correctly?` }
  }
  const media = getSqlite().prepare('SELECT title FROM media_item WHERE id = ?').get(mediaId) as {
    title: string
  }
  // Registry-sourced rather than projected: a rescan has no status object of
  // its own, so until now a long walk over a big series was completely dark.
  return tasks.runTask(
    {
      kind: 'mangaRescan',
      label: `Rescanning: ${media.title}`,
      route: `/manga/${mediaId}`
    },
    async (task) => {
      task.progress({ detail: localDir })
      let scanned: ScannedChapter[]
      try {
        scanned = await scanSeriesDir(abs, media.title)
      } catch (err) {
        const error = err instanceof Error ? err.message : String(err)
        task.settle({ state: 'error', error })
        return { ok: false, error }
      }
      if (scanned.length === 0) {
        // Not an exception — the caller renders this inline — but the task must
        // still not read as a success.
        task.settle({ state: 'error', error: 'No page images or EPUB books found in the folder' })
        return { ok: false, error: 'No page images or EPUB books found in the folder' }
      }
      task.progress({ detail: `${scanned.length} chapters`, done: scanned.length, total: scanned.length })
      syncChapters(mediaId, localDir, scanned, info.prefix)
      return { ok: true, chapterCount: scanned.length }
    }
  )
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
  const info = rootInfoFor(ch.mediaId)
  const abs = pathInsideRoot(info.root, ch.dirPath)
  if (!abs) return null
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
      const relPath = `${info.prefix}/${ch.dirPath}/${f}`
      // relPath is never empty, so mediaUrl can't return null here.
      return { relPath, url: mediaUrl(relPath)! }
    }),
    ...(isBook ? { isBook: true, toc: await epubToc(abs) } : {})
  }
}

// The same thing for a file the OS handed us via "open with", which has no
// chapter row and lives nowhere near the manga root. Everything below the DB
// read in pages() was already path-only, so this is that half reused verbatim
// against an `open/<token>.cbz` prefix.
//
// chapterId/mediaId come back as 0: the type wants numbers, and 0 is the
// sentinel the readers guard on before saving progress (a genuine row id is
// always >= 1). markProgress(0, …) is a no-op anyway — its SELECT finds
// nothing — so the guard is belt and braces.
export async function adhocPages(token: string): Promise<MangaPages | null> {
  const relDir = `open/${token}`
  let abs: string
  try {
    abs = absoluteMediaPath(relDir)
  } catch {
    return null
  }
  if (!existsSync(abs)) return null
  const files = await listChapterPages(abs)
  if (files.length === 0) return null
  const isBook = isEpubFile(abs)
  return {
    chapterId: 0,
    mediaId: 0,
    title: basename(abs, extname(abs)),
    number: null,
    pages: files.map((f) => {
      const relPath = `${relDir}/${f}`
      return { relPath, url: mediaUrl(relPath)! }
    }),
    ...(isBook ? { isBook: true, toc: await epubToc(abs) } : {})
  }
}

// ---------------------------------------------------------------------------
// Manga-panel quiz pool
// ---------------------------------------------------------------------------

// The manga-panel quiz pool: `length` question seeds over locally-linked
// manga. Eligibility is SQL (linked chapters + cover, EPUB chapters excluded);
// page discovery walks only the sampled series' chapter folders, so a big
// library costs `length` directory listings, not the whole root. An optional
// seed makes series and page selection reproducible. Read-only — it never
// touches page_count caches or reading state.
export async function panelPool(
  filter: QuizMangaPanelFilter = {},
  length = 10
): Promise<QuizMangaPanelItem[]> {
  const db = getSqlite()
  const where: string[] = [
    `mi.media_type = 'manga'`,
    'mi.cover_path IS NOT NULL',
    // EPUB books have spine documents, not image pages — nothing to show.
    `LOWER(mc.dir_path) NOT LIKE '%.epub'`
  ]

  const rows = db
    .prepare(
      `SELECT DISTINCT mi.id AS media_id, mi.title, mi.cover_path,
              ${YEAR_EXPR} AS year,
              ${GENRE_CSV_EXPR} AS genre_csv
       FROM media_item mi
       JOIN manga_chapter mc ON mc.media_id = mi.id
       WHERE ${where.join(' AND ')}`
    )
    .all() as Record<string, unknown>[]

  const wanted = Math.max(1, Math.min(50, Math.floor(length)))
  const rng = filter.seed == null ? Math.random : seededRng(filter.seed)
  const root = mangaRootDir()
  const candidates: PanelCandidate[] = []
  for (const r of shuffle(rows, rng)) {
    if (candidates.length >= wanted) break
    const chRows = db
      .prepare(
        `SELECT dir_path, last_read_page, read_at FROM manga_chapter
         WHERE media_id = ? AND LOWER(dir_path) NOT LIKE '%.epub'
           AND (? = 'all' OR read_at IS NOT NULL OR last_read_page IS NOT NULL)`
      )
      .all(r.media_id, filter.scope ?? 'consumed') as {
        dir_path: string
        last_read_page: number | null
        read_at: string | null
      }[]
    const chapters: PanelCandidate['chapters'] = []
    for (const ch of chRows) {
      const chapterPath = pathInsideRoot(root, ch.dir_path)
      if (!chapterPath) continue
      const files = await listChapterPages(chapterPath)
      if (files.length > 0) {
        chapters.push({
          dirPath: ch.dir_path,
          files,
          lastReadPage: filter.scope === 'all' ? files.length - 1 : ch.last_read_page,
          readAt: filter.scope === 'all' ? 'all' : ch.read_at
        })
      }
    }
    if (chapters.length === 0) continue // vanished folder / unreadable archive
    candidates.push({
      mediaId: r.media_id as number,
      title: r.title as string,
      coverPath: (r.cover_path as string) ?? null,
      year: (r.year as number | null) ?? null,
      genres: r.genre_csv ? String(r.genre_csv).split(',') : [],
      chapters
    })
  }
  return pickPanelSeeds(candidates, wanted, rng)
}

// Raises media_item.progress (chapters read) to match the local read state.
// Candidate = highest read chapter number when numbers were parsed, else the
// count of read chapters. Never lowers progress — AniList-imported counts and
// chapters read outside the app must survive.
function syncMediaProgress(mediaId: number): void {
  const db = getSqlite()
  // Book-type media track progress in PAGES (hand-managed on the detail page),
  // not chapters — a finished EPUB volume must never slam a page count down to
  // the volume count. read_at/last_read_page still persist on the chapter row.
  const media = db.prepare('SELECT media_type FROM media_item WHERE id = ?').get(mediaId) as
    | { media_type: string }
    | undefined
  if (media?.media_type === 'book') return
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

// syncMediaProgress is the SOLE writer of media_item.progress on every chapter
// path, and `firstTime` is only a signal for ipc.ts to credit the checklist —
// it never moves progress.
//
// This was briefly the other way round, with checklistRepo.logProgress owning
// the write, and all three failures came from the same mismatch: logProgress
// means "one more unit" (+1, wrapping a finished title into a fresh pass) while
// this path means "you have now read up to chapter N". Reading chapter 1 of a
// completed 150-chapter manga reset it to 1/Reading/pass 2; ticking chapter 60
// on a fresh series wrote 1 instead of 60; and un-tick then re-tick counted
// twice. The monotonic `UPDATE … WHERE progress < ?` has none of those
// problems, because it is absolute rather than incremental.
//
// Known and unchanged from before that experiment: after a deliberate "Read
// again" from the detail page wraps progress to 1, the next chapter write
// raises it back to the highest read chapter — read_at flags are pass-agnostic,
// so a fresh pass would need them cleared to hold.
export type ChapterRead = { mediaId: number; firstTime: boolean }

// Books are never credited: they track progress in PAGES and are not a
// unit-progress type. Asking the shared list rather than spelling out "not
// book" means a future page-based type is excluded by default instead of
// silently opted in.
function creditable(mediaType: string | null): boolean {
  return mediaType != null && isUnitProgress(mediaType as MediaType)
}

export function markProgress(chapterId: number, page: number): ChapterRead | undefined {
  if (!Number.isSafeInteger(chapterId) || !Number.isInteger(page) || page < 0) return
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT c.media_id, c.page_count, c.read_at, m.media_type
       FROM manga_chapter c LEFT JOIN media_item m ON m.id = c.media_id
       WHERE c.id = ?`
    )
    .get(chapterId) as
    | { media_id: number; page_count: number; read_at: string | null; media_type: string | null }
    | undefined
  if (!row) return
  if (row.page_count <= 0 || page >= row.page_count) return
  const finished = row.page_count > 0 && page >= row.page_count - 1
  db.prepare(
    `UPDATE manga_chapter SET last_read_page = ?,
       read_at = CASE WHEN ? THEN COALESCE(read_at, datetime('now')) ELSE read_at END,
       updated_at = datetime('now')
     WHERE id = ?`
  ).run(page, finished ? 1 : 0, chapterId)
  const firstTime = finished && !row.read_at && creditable(row.media_type)
  if (finished && !row.read_at) syncMediaProgress(row.media_id)
  return { mediaId: row.media_id, firstTime }
}

export function markChapterRead(chapterId: number, read: boolean): ChapterRead | undefined {
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT c.media_id, c.read_at, m.media_type
       FROM manga_chapter c LEFT JOIN media_item m ON m.id = c.media_id
       WHERE c.id = ?`
    )
    .get(chapterId) as
    | { media_id: number; read_at: string | null; media_type: string | null }
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
  const firstTime = read && !row.read_at && creditable(row.media_type)
  // Unconditional: the sync is idempotent (it only raises), so ticking,
  // un-ticking and re-ticking the same chapter all settle on the same number.
  syncMediaProgress(row.media_id)
  return { mediaId: row.media_id, firstTime }
}
