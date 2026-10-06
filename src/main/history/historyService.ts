// The History section's main-process entry point. It is the one module that
// loads the committed content catalog, so ipc.ts and searchRepo reach it only
// through a cached dynamic import (tests/performanceBoundaries.test.ts): the
// content never parses at launch. Everything here wires real lookups into the
// pure index and view builders.

import { existsSync } from 'fs'
import { loadCatalogEntries } from '@shared/history/catalog'
import { buildCatalog, lookup, type CatalogEntry } from '@shared/history/model'
import { HISTORY_SCHEMA_VERSION, primaryName, refOf, type ArchiveSuggestion, type HistoryEntity } from '@shared/history/schema'
import { validateEntity } from '@shared/history/validate'
import type {
  HistoryArticleView,
  HistoryDecade,
  HistoryImage,
  HistoryMark,
  HistoryMediaBacklink,
  HistoryNote,
  HistoryNoteKind,
  HistoryNoteRow,
  HistoryMapPin,
  HistoryOverview,
  HistorySaveResult,
  HistorySearchHit,
  HistorySourceRow,
  HistorySourceView,
  HistoryUserEntity
} from '@shared/types'
import { absoluteMediaPath, cachedDownload } from '../files'
import * as repo from '../repos/historyRepo'
import { buildIndex, refInfo, type HistoryIndex } from './historyIndex'
import { ensureImages } from './historyImages'
import * as views from './historyViews'
import { library, libraryItem } from './library'

let entries: CatalogEntry[] | null = null
let cached: HistoryIndex | null = null

function index(): HistoryIndex {
  if (!cached) {
    entries ??= loadCatalogEntries()
    cached = buildIndex(entries, repo.userEntities())
  }
  return cached
}

/** Personal entities changed: rebuild on next read. */
function invalidate(): void {
  cached = null
}

const cachedUrl = (url: string): string | null => cachedDownload(url)

function fileExists(relPath: string): boolean {
  try {
    return existsSync(absoluteMediaPath(relPath))
  } catch {
    return false
  }
}

function context(): views.ViewContext {
  return {
    marks: repo.marks(),
    cached: cachedUrl,
    library,
    personalLinks: repo.personalLinks(),
    archive: repo.archiveRows(),
    fileExists
  }
}

export function overview(): HistoryOverview {
  const o = views.overview(index(), { marks: repo.marks(), cached: cachedUrl })
  // The timeline's medallions: the lead events' pictures, through the paced
  // queue behind any page that asked first. Cached once, so this is a no-op
  // after the first visit.
  const lead = o.items.filter((i) => i.prominence === 1 && i.image && !i.image.cached).map((i) => i.image!.url)
  ensureImages(lead, 'Caching timeline images', Date.now(), { back: true })
  return o
}

export function decade(start: number): HistoryDecade {
  const d = views.decade(index(), start, context())
  ensureImages(views.decadeImageUrls(index(), start), `Caching ${start}s images`)
  return d
}

export function article(ref: string): HistoryArticleView | null {
  const view = views.article(index(), ref, { ...context(), note: repo.note(ref) })
  if (view) {
    const urls = [view.hero?.url, ...Object.values(view.refs).map((r) => r.image?.url), ...view.media.map((m) => m.poster)]
    ensureImages(urls.filter((u): u is string => !!u), 'Caching History images')
  }
  return view
}

export function sources(): HistorySourceRow[] {
  return views.sourceRows(index())
}

/** The uncached image URLs of rows a page shows (pages never load remote URLs themselves). */
function missingImages(rows: Array<{ image: HistoryImage | null }>): string[] {
  return rows.filter((r) => r.image && !r.image.cached).map((r) => r.image!.url)
}

export function source(id: string): HistorySourceView | null {
  const view = views.sourceView(index(), id, cachedUrl)
  if (view) ensureImages(missingImages(view.citedBy), 'Caching History images')
  return view
}

export function mapPins(): HistoryMapPin[] {
  const pins = views.mapPins(index(), { marks: repo.marks(), cached: cachedUrl })
  // Every pin's hover card shows its picture: a background prefetch behind any
  // page that asked first, as for the timeline's medallions.
  ensureImages(missingImages(pins), 'Caching map images', Date.now(), { back: true })
  return pins
}

export function search(q: string): HistorySearchHit[] {
  return views.search(index(), q, cachedUrl)
}

export function backlinks(mediaId: number): HistoryMediaBacklink[] {
  const item = libraryItem(mediaId)
  if (!item) return []
  // A title without an importer id can still carry the user's own links.
  const title = { mediaType: item.mediaType, source: item.source ?? '', externalId: item.externalId ?? '' }
  return views.backlinks(index(), title, repo.personalLinksForMedia(mediaId), cachedUrl)
}

// ---- personal layer ----

export function setMark(ref: string, field: 'read' | 'favorite', value: boolean): HistoryMark {
  return repo.setMark(ref, field, value)
}

export function saveNote(ref: string, body: string, kind: HistoryNoteKind): HistoryNote | null {
  return repo.saveNote(ref, body, kind)
}

export function notes(kind?: HistoryNoteKind): HistoryNoteRow[] {
  const idx = index()
  const rows = repo.notes(kind).map((n) => ({ ...n, target: refInfo(idx, n.ref, cachedUrl) }))
  ensureImages(missingImages(rows.map((r) => r.target)), 'Caching History images')
  return rows
}

export function linkMedia(ref: string, mediaId: number, kind: string): number {
  return repo.addPersonalLink(ref, mediaId, kind)
}

export function unlinkMedia(id: number): void {
  repo.removePersonalLink(id)
}

export function userEntities(): HistoryUserEntity[] {
  return repo.userEntities()
}

export function userEntity(id: string): HistoryUserEntity | null {
  return repo.userEntity(id)
}

function today(): string {
  const d = new Date()
  const pad = (n: number): string => String(n).padStart(2, '0')
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`
}

/**
 * Saves a personal entity after the same validation committed content gets.
 * A new entity (empty id) receives a `my-` id from its name.
 */
export function saveUserEntity(input: HistoryUserEntity): HistorySaveResult {
  const name = 'names' in input ? primaryName(input) : input.kind === 'source' ? input.title : input.kind
  const id = input.id && input.id.startsWith('my-') ? input.id : repo.nextUserId(input.kind, name)
  const entity = (
    input.kind === 'source'
      ? { ...input, v: HISTORY_SCHEMA_VERSION, id }
      : { ...input, v: HISTORY_SCHEMA_VERSION, id, researched: today() }
  ) as HistoryUserEntity
  const others = [...(entries ??= loadCatalogEntries()).map((e) => e.entity), ...repo.userEntities().filter((e) => e.id !== id)]
  const catalog = buildCatalog([...others, entity as HistoryEntity])
  const issues = validateEntity(entity as HistoryEntity, catalog).map((i) => ({
    severity: i.severity,
    code: i.code,
    message: i.message
  }))
  if (issues.some((i) => i.severity === 'error')) return { ok: false, id: null, issues }
  repo.saveUserEntity(entity)
  invalidate()
  return { ok: true, id, issues }
}

/** Also removes the entry's archive rows and copied files, which no page could reach afterwards. */
export async function removeUserEntity(id: string): Promise<void> {
  if (!id.startsWith('my-')) return
  const entity = repo.userEntity(id)
  if (entity) await (await import('./historyJobs')).removeArchiveForRef(refOf(entity.kind, id))
  repo.removeUserEntity(id)
  invalidate()
}

/** A research suggestion by its page ref and id, for the download job. */
export function suggestion(ref: string, id: string): ArchiveSuggestion | null {
  const e = lookup(index().catalog, ref)
  if (!e || (e.kind !== 'event' && e.kind !== 'person')) return null
  return e.archive?.find((a) => a.id === id) ?? null
}
