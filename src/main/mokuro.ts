import { join, dirname, basename, extname } from 'path'
import { existsSync, readdirSync, readFileSync, statSync } from 'fs'
import { getSqlite } from './db/connection'
import { mangaRootDir } from './files'
import { isArchiveFile } from './archive'
import { listChapterPages } from './manga'
import type { ChapterOcrStatus, MokuroBlock, MokuroPageOcr } from '@shared/types'

// Mokuro (github.com/kha-white/mokuro) OCR sidecar support. The user runs
// mokuro on a raw manga folder themselves; this module finds its output next
// to a chapter, parses it, and maps its pages onto the chapter's page images.
// Defensive throughout: anything malformed → null, never throw.

// ---------------------------------------------------------------------------
// Pure parsing (exported for tests — no fs access).
// ---------------------------------------------------------------------------

function parseBlock(b: unknown): MokuroBlock | null {
  if (!b || typeof b !== 'object') return null
  const o = b as Record<string, unknown>
  const box = o.box
  if (!Array.isArray(box) || box.length !== 4 || box.some((n) => typeof n !== 'number')) return null
  const lines = Array.isArray(o.lines) ? o.lines.filter((l) => typeof l === 'string' && l !== '') : []
  if (lines.length === 0) return null
  return {
    box: box as [number, number, number, number],
    vertical: o.vertical === true,
    fontSize: typeof o.font_size === 'number' ? o.font_size : null,
    lines: lines as string[]
  }
}

function parsePageObj(p: unknown): MokuroPageOcr | null {
  if (!p || typeof p !== 'object') return null
  const o = p as Record<string, unknown>
  if (typeof o.img_width !== 'number' || typeof o.img_height !== 'number') return null
  const blocks = Array.isArray(o.blocks)
    ? o.blocks.map(parseBlock).filter((b): b is MokuroBlock => b !== null)
    : []
  return { imgWidth: o.img_width, imgHeight: o.img_height, blocks }
}

export interface MokuroVolumePage {
  imgPath: string
  ocr: MokuroPageOcr
}

// A .mokuro volume file: { version, title, volume, pages: [{img_path, ...}] }.
export function parseMokuroVolume(raw: string): MokuroVolumePage[] | null {
  let data: unknown
  try {
    data = JSON.parse(raw)
  } catch {
    return null
  }
  if (!data || typeof data !== 'object') return null
  const pages = (data as Record<string, unknown>).pages
  if (!Array.isArray(pages)) return null
  const out: MokuroVolumePage[] = []
  for (const p of pages) {
    const ocr = parsePageObj(p)
    const imgPath = (p as Record<string, unknown>)?.img_path
    if (ocr && typeof imgPath === 'string') out.push({ imgPath, ocr })
  }
  return out.length > 0 ? out : null
}

// A legacy per-page _ocr JSON: { version, img_width, img_height, blocks }.
export function parsePageJson(raw: string): MokuroPageOcr | null {
  try {
    return parsePageObj(JSON.parse(raw))
  } catch {
    return null
  }
}

function pageKey(name: string): string {
  const base = basename(name)
  return base.slice(0, base.length - extname(base).length).normalize('NFC').toLowerCase()
}

// Maps mokuro volume pages onto the chapter's ordered page files, by filename
// without extension. If NOTHING matches by name but the counts are exactly
// equal, fall back to matching by order (images renamed after mokuro ran).
export function matchPages(
  volumePages: MokuroVolumePage[],
  chapterPageFiles: string[]
): (MokuroPageOcr | null)[] {
  const byKey = new Map<string, MokuroPageOcr>()
  for (const p of volumePages) byKey.set(pageKey(p.imgPath), p.ocr)
  const matched = chapterPageFiles.map((f) => byKey.get(pageKey(f)) ?? null)
  if (matched.some((m) => m !== null)) return matched
  if (volumePages.length === chapterPageFiles.length) return volumePages.map((p) => p.ocr)
  return matched
}

// ---------------------------------------------------------------------------
// Sidecar discovery + cache.
// ---------------------------------------------------------------------------

export type Sidecar = { kind: 'volume'; path: string } | { kind: 'ocrDir'; path: string }

// Priority: sibling "<chapter name>.mokuro" → a sole *.mokuro inside the
// chapter folder → legacy "<parent>/_ocr/<chapter name>/" per-page JSONs.
// A .cbz/.zip chapter matches on its stem ("Vol 1.cbz" → "Vol 1.mokuro" /
// "_ocr/Vol 1/") — mokuro ran on the folder before it was zipped, so its
// output sits beside the archive. Sidecars inside the archive aren't read.
export function findSidecar(chapterPath: string): Sidecar | null {
  const isArchive = isArchiveFile(chapterPath)
  const base = basename(chapterPath)
  const stem = isArchive ? base.slice(0, base.length - extname(base).length) : base
  const sibling = join(dirname(chapterPath), `${stem}.mokuro`)
  if (existsSync(sibling)) return { kind: 'volume', path: sibling }
  if (!isArchive) {
    try {
      const inside = readdirSync(chapterPath).filter((f) => extname(f).toLowerCase() === '.mokuro')
      if (inside.length === 1) return { kind: 'volume', path: join(chapterPath, inside[0]) }
    } catch {
      return null
    }
  }
  const ocrDir = join(dirname(chapterPath), '_ocr', stem)
  if (existsSync(ocrDir)) return { kind: 'ocrDir', path: ocrDir }
  return null
}

export interface ChapterOcr {
  pages: (MokuroPageOcr | null)[]
  matchedPages: number
  totalPages: number
}

// Parsed chapters are cached by directory and invalidated on sidecar mtime, so
// running mokuro while the app is open just needs the chapter re-opened.
const CACHE_MAX = 4
const cache = new Map<
  string,
  { sourcePath: string; mtimeMs: number; pageFingerprint: string; ocr: ChapterOcr }
>()

function pageFingerprint(pageFiles: string[]): string {
  // Page order and membership both affect the OCR-to-page mapping. Keep this
  // as a value rather than retaining the caller's mutable array reference.
  return pageFiles.join('\0')
}

export function getChapterOcr(chapterDir: string, pageFiles: string[]): ChapterOcr | null {
  const sidecar = findSidecar(chapterDir)
  if (!sidecar) return null
  let mtimeMs: number
  try {
    mtimeMs = statSync(sidecar.path).mtimeMs
  } catch {
    return null
  }
  const hit = cache.get(chapterDir)
  const fingerprint = pageFingerprint(pageFiles)
  if (
    hit &&
    hit.sourcePath === sidecar.path &&
    hit.mtimeMs === mtimeMs &&
    hit.pageFingerprint === fingerprint
  )
    return hit.ocr

  let pages: (MokuroPageOcr | null)[]
  if (sidecar.kind === 'volume') {
    let volume: MokuroVolumePage[] | null
    try {
      volume = parseMokuroVolume(readFileSync(sidecar.path, 'utf-8'))
    } catch {
      return null
    }
    if (!volume) return null
    pages = matchPages(volume, pageFiles)
  } else {
    pages = pageFiles.map((f) => {
      const jsonPath = join(sidecar.path, `${pageKey(f)}.json`)
      try {
        return parsePageJson(readFileSync(jsonPath, 'utf-8'))
      } catch {
        return null
      }
    })
  }
  const ocr: ChapterOcr = {
    pages,
    matchedPages: pages.filter((p) => p !== null).length,
    totalPages: pageFiles.length
  }
  if (ocr.matchedPages === 0) return null

  cache.set(chapterDir, { sourcePath: sidecar.path, mtimeMs, pageFingerprint: fingerprint, ocr })
  if (cache.size > CACHE_MAX) {
    const oldest = cache.keys().next().value
    if (oldest !== undefined) cache.delete(oldest)
  }
  return ocr
}

// ---------------------------------------------------------------------------
// IPC-facing: resolve a chapter row to its directory + page files.
// ---------------------------------------------------------------------------

async function chapterOcrById(chapterId: number): Promise<{ ocr: ChapterOcr | null; totalPages: number }> {
  const row = getSqlite()
    .prepare('SELECT dir_path FROM manga_chapter WHERE id = ?')
    .get(chapterId) as { dir_path: string } | undefined
  if (!row) return { ocr: null, totalPages: 0 }
  const abs = join(mangaRootDir(), row.dir_path)
  const pageFiles = await listChapterPages(abs)
  return { ocr: getChapterOcr(abs, pageFiles), totalPages: pageFiles.length }
}

export async function status(chapterId: number): Promise<ChapterOcrStatus> {
  const { ocr, totalPages } = await chapterOcrById(chapterId)
  if (!ocr) return { hasOcr: false, matchedPages: 0, totalPages }
  return { hasOcr: true, matchedPages: ocr.matchedPages, totalPages: ocr.totalPages }
}

export async function page(chapterId: number, pageIndex: number): Promise<MokuroPageOcr | null> {
  const { ocr } = await chapterOcrById(chapterId)
  return ocr?.pages[pageIndex] ?? null
}
