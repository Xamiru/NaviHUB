import { statSync } from 'fs'
import { extname } from 'path'
import { listArchiveEntries, readArchiveEntry } from './archive'
import { resolveEpubHref } from '@shared/epubPaths'
import type { EpubTocEntry } from '@shared/types'

// EPUB (light novel) support for the manga section. An EPUB is a zip with a
// standard skeleton: META-INF/container.xml points at an OPF package file,
// whose <manifest> lists every entry and whose <spine> gives the reading
// order of the XHTML documents. Those spine documents become the book's
// "pages" (manga_chapter.page_count / last_read_page), and the nav/NCX table
// of contents maps human chapter titles onto spine positions.
//
// Parsing is a deliberately small hand-rolled tag/attribute scan (no XML dep):
// OPF/nav files are machine-generated, and everything here is covered by
// tests/epub.test.ts against real-shaped fixtures. All functions return
// null/[] on malformed input — a broken book must never break a scan.

export function isEpubFile(name: string): boolean {
  return extname(name).toLowerCase() === '.epub'
}

export interface EpubInfo {
  title: string | null
  spine: string[] // zip entry paths of the reading-order documents
  toc: EpubTocEntry[]
}

// ---- tiny XML helpers (attribute-order agnostic, namespace tolerant) ----

function decodeEntities(s: string): string {
  return s
    .replace(/&#x([0-9a-fA-F]+);/g, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

// All source strings of "<name …>" tags (self-closing or not), matching an
// optional namespace prefix (<opf:item>, <ncx:navPoint>, …).
function findTags(xml: string, name: string): string[] {
  const re = new RegExp(`<(?:[\\w-]+:)?${name}\\b[^>]*>`, 'gi')
  return xml.match(re) ?? []
}

// Attributes of one tag source, namespace prefixes stripped from names.
function tagAttrs(tag: string): Record<string, string> {
  const attrs: Record<string, string> = {}
  const re = /([\w:-]+)\s*=\s*(?:"([^"]*)"|'([^']*)')/g
  let m: RegExpExecArray | null
  while ((m = re.exec(tag))) {
    const name = m[1].toLowerCase().replace(/^[\w-]+:/, '')
    attrs[name] = decodeEntities(m[2] ?? m[3] ?? '')
  }
  return attrs
}

// Inner XML of the first "<name …>…</name>" block (namespace tolerant).
function tagBlock(xml: string, name: string): string | null {
  const m = xml.match(new RegExp(`<(?:[\\w-]+:)?${name}\\b[^>]*>([\\s\\S]*?)</(?:[\\w-]+:)?${name}>`, 'i'))
  return m ? m[1] : null
}

function stripTags(s: string): string {
  return decodeEntities(s.replace(/<[^>]*>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim()
}

// ---- parsing ----

async function readText(absPath: string, entryName: string): Promise<string | null> {
  const buf = await readArchiveEntry(absPath, entryName)
  return buf ? buf.toString('utf8') : null
}

// Resolve an href against its containing document, preferring a path that
// actually exists in the archive (decoded vs raw both tried).
function resolveExisting(base: string, href: string, entries: Set<string>): string | null {
  const resolved = resolveEpubHref(base, href)
  if (!resolved) return null
  if (entries.has(resolved)) return resolved
  // Some books don't URL-encode entry names that contain %, spaces etc. — the
  // decoded form then misses; retry without per-segment decoding.
  const raw = resolveEpubHref(base, href.replace(/%/g, '%25'))
  if (raw && entries.has(raw)) return raw
  // Never return a path which is not in the archive. A phantom manifest or
  // spine target would otherwise be persisted as a page and fail later in the
  // reader, where it is much harder to explain or recover from.
  return null
}

async function parseEpubUncached(absPath: string): Promise<EpubInfo | null> {
  const entryList = await listArchiveEntries(absPath)
  if (!entryList) return null
  const entries = new Set(entryList)

  // container.xml → OPF path (fallback: first *.opf entry in the zip).
  let opfPath: string | null = null
  const container = await readText(absPath, 'META-INF/container.xml')
  if (container) {
    for (const tag of findTags(container, 'rootfile')) {
      const p = tagAttrs(tag)['full-path']
      if (p && entries.has(p)) {
        opfPath = p
        break
      }
    }
  }
  if (!opfPath) opfPath = entryList.find((e) => e.toLowerCase().endsWith('.opf')) ?? null
  if (!opfPath) return null
  const opf = await readText(absPath, opfPath)
  if (!opf) return null

  // Manifest: id → { path, mediaType, properties }
  const manifest = new Map<string, { path: string; mediaType: string; properties: string }>()
  const manifestXml = tagBlock(opf, 'manifest') ?? opf
  for (const tag of findTags(manifestXml, 'item')) {
    const a = tagAttrs(tag)
    if (!a.id || !a.href) continue
    const path = resolveExisting(opfPath, a.href, entries)
    if (!path) continue
    manifest.set(a.id, {
      path,
      mediaType: (a['media-type'] ?? '').toLowerCase(),
      properties: a.properties ?? ''
    })
  }

  // Spine: ordered document entry paths (html/xhtml only — the reader fetches
  // these as text; linear="no" auxiliary docs are skipped).
  const spine: string[] = []
  const spineXml = tagBlock(opf, 'spine') ?? ''
  for (const tag of findTags(spineXml, 'itemref')) {
    const a = tagAttrs(tag)
    if (!a.idref || a.linear === 'no') continue
    const item = manifest.get(a.idref)
    if (!item) continue
    if (item.mediaType.includes('html') || /\.x?html?$/i.test(item.path)) spine.push(item.path)
  }
  if (spine.length === 0) return null

  const titleBlock = tagBlock(opf, 'title')
  const title = titleBlock ? stripTags(titleBlock) || null : null

  const spineIndex = new Map(spine.map((p, i) => [p, i]))
  const toc =
    (await parseNavToc(absPath, manifest, entries, spineIndex)) ??
    (await parseNcxToc(absPath, opf, manifest, entries, spineIndex)) ??
    []

  return { title, spine, toc }
}

// EPUB3 nav document: the <nav epub:type="toc"> block's anchors.
async function parseNavToc(
  absPath: string,
  manifest: Map<string, { path: string; mediaType: string; properties: string }>,
  entries: Set<string>,
  spineIndex: Map<string, number>
): Promise<EpubTocEntry[] | null> {
  const navItem = [...manifest.values()].find((i) => i.properties.split(/\s+/).includes('nav'))
  if (!navItem) return null
  const nav = await readText(absPath, navItem.path)
  if (!nav) return null
  // The toc <nav> block: match on epub:type="toc" (attr order varies).
  const navBlocks = nav.match(/<nav\b[^>]*>[\s\S]*?<\/nav>/gi) ?? []
  const tocBlock =
    navBlocks.find((b) => /epub:type\s*=\s*["'][^"']*\btoc\b/i.test(b.slice(0, b.indexOf('>') + 1))) ??
    navBlocks[0]
  if (!tocBlock) return null
  const out: EpubTocEntry[] = []
  const anchorRe = /<a\b([^>]*)>([\s\S]*?)<\/a>/gi
  let m: RegExpExecArray | null
  while ((m = anchorRe.exec(tocBlock))) {
    const href = tagAttrs(`<a ${m[1]}>`).href
    const label = stripTags(m[2])
    if (!href || !label) continue
    const target = resolveExisting(navItem.path, href, entries)
    const page = target != null ? spineIndex.get(target) : undefined
    if (page !== undefined) out.push({ label, page })
  }
  return dedupeToc(out)
}

// EPUB2 NCX fallback: <navPoint> → <text> label + <content src>.
async function parseNcxToc(
  absPath: string,
  opf: string,
  manifest: Map<string, { path: string; mediaType: string; properties: string }>,
  entries: Set<string>,
  spineIndex: Map<string, number>
): Promise<EpubTocEntry[] | null> {
  const spineTag = findTags(opf, 'spine')[0]
  const tocId = spineTag ? tagAttrs(spineTag).toc : undefined
  const ncxItem =
    (tocId && manifest.get(tocId)) ??
    [...manifest.values()].find((i) => i.mediaType === 'application/x-dtbncx+xml')
  if (!ncxItem) return null
  const ncx = await readText(absPath, ncxItem.path)
  if (!ncx) return null
  const out: EpubTocEntry[] = []
  const pointRe = /<navPoint\b[^>]*>([\s\S]*?)(?=<navPoint\b|<\/navMap>)/gi
  let m: RegExpExecArray | null
  while ((m = pointRe.exec(ncx))) {
    const label = tagBlock(m[1], 'text')
    const contentTag = findTags(m[1], 'content')[0]
    const src = contentTag ? tagAttrs(contentTag).src : undefined
    if (!label || !src) continue
    const target = resolveExisting(ncxItem.path, src, entries)
    const page = target != null ? spineIndex.get(target) : undefined
    if (page !== undefined) out.push({ label: stripTags(label), page })
  }
  return out.length ? dedupeToc(out) : null
}

// Sort by position and keep the first label per spine document (several TOC
// entries can point into the same document via fragments).
function dedupeToc(toc: EpubTocEntry[]): EpubTocEntry[] {
  const seen = new Set<number>()
  return toc
    .sort((a, b) => a.page - b.page)
    .filter((t) => {
      if (seen.has(t.page)) return false
      seen.add(t.page)
      return true
    })
}

// ---- mtime-invalidated cache (mokuro.ts pattern) ----

const CACHE_MAX = 4
const cache = new Map<string, { mtimeMs: number; promise: Promise<EpubInfo | null> }>()

export function parseEpub(absPath: string): Promise<EpubInfo | null> {
  let mtimeMs: number
  try {
    mtimeMs = statSync(absPath).mtimeMs
  } catch {
    return Promise.resolve(null)
  }
  const hit = cache.get(absPath)
  if (hit && hit.mtimeMs === mtimeMs) return hit.promise
  const promise = parseEpubUncached(absPath).catch(() => null)
  cache.set(absPath, { mtimeMs, promise })
  if (cache.size > CACHE_MAX) {
    const oldest = cache.keys().next().value
    if (oldest !== undefined) cache.delete(oldest)
  }
  return promise
}

// The scanner's page count for a .epub chapter (0 = unreadable, skip it).
export async function epubSpineCount(absPath: string): Promise<number> {
  return (await parseEpub(absPath))?.spine.length ?? 0
}

// Spine entry paths, for listChapterPages' format seam.
export async function listEpubPages(absPath: string): Promise<string[]> {
  return (await parseEpub(absPath))?.spine ?? []
}

export async function epubToc(absPath: string): Promise<EpubTocEntry[]> {
  return (await parseEpub(absPath))?.toc ?? []
}
