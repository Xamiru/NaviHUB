import { unlinkSync } from 'fs'
import { getSqlite } from './db/connection'
import {
  absoluteMediaPath,
  copyImageInto,
  downloadImageTo,
  pickImageFiles,
  sanitizeFileBase
} from './files'
import { fetchWithRetry } from './http'
import { fetchBackdrops } from './tmdb'
import type {
  ImageKind,
  MediaImage,
  WallpaperSearchPage,
  WallpaperSearchResult
} from '@shared/types'

// Wallpapers + fan art for a media item. Files live in a browsable on-disk
// layout under pictures.dir — "<Title> (<type>)/<wallpapers|fanart>/<file>" —
// and rows in media_image point at them via the virtual "pictures/" prefix.
// Sources: Wallhaven search (all types) and TMDB official backdrops (movie/tv
// imported from TMDB), plus manual adds (file picker / pasted URL).

/* eslint-disable @typescript-eslint/no-explicit-any */

const WALLHAVEN_API = 'https://wallhaven.cc/api/v1/search'
const TMDB_IMG = 'https://image.tmdb.org/t/p'

// ---------------- pure helpers (unit-tested) ----------------

// purity=100 pins results to SFW only — a deliberate invariant, not a default.
// categories=111 = general + anime + people.
export function wallhavenSearchUrl(query: string, page: number): string {
  const url = new URL(WALLHAVEN_API)
  url.searchParams.set('q', query)
  url.searchParams.set('categories', '111')
  url.searchParams.set('purity', '100')
  url.searchParams.set('page', String(Math.max(1, Math.floor(page))))
  return url.toString()
}

// Raw Wallhaven search JSON -> one page of results. Tolerates malformed/empty
// payloads by returning an empty page rather than throwing mid-dialog.
export function parseWallhaven(json: any): WallpaperSearchPage {
  const data = Array.isArray(json?.data) ? json.data : []
  const results: WallpaperSearchResult[] = data
    .filter((w: any) => typeof w?.path === 'string' && w.path)
    .map((w: any) => ({
      source: 'wallhaven' as const,
      id: String(w.id ?? w.path),
      thumbUrl: w.thumbs?.large ?? w.thumbs?.original ?? w.path,
      fullUrl: w.path,
      width: Number.isFinite(w.dimension_x) ? w.dimension_x : null,
      height: Number.isFinite(w.dimension_y) ? w.dimension_y : null
    }))
  const page = Number.isFinite(json?.meta?.current_page) ? json.meta.current_page : 1
  const lastPage = Number.isFinite(json?.meta?.last_page) ? json.meta.last_page : page
  return { results, page, lastPage }
}

// TMDB backdrop file paths (from tmdb.fetchBackdrops) -> search results with
// w780 thumbs and full-res originals.
export function tmdbBackdropResults(
  backdrops: { filePath: string; width: number | null; height: number | null }[]
): WallpaperSearchResult[] {
  return backdrops.map((b) => ({
    source: 'tmdb' as const,
    id: b.filePath,
    thumbUrl: `${TMDB_IMG}/w780${b.filePath}`,
    fullUrl: `${TMDB_IMG}/original${b.filePath}`,
    width: b.width,
    height: b.height
  }))
}

// ---------------- searches ----------------

export async function searchWallhaven(query: string, page = 1): Promise<WallpaperSearchPage> {
  const res = await fetchWithRetry(wallhavenSearchUrl(query, page), {
    headers: { Accept: 'application/json' }
  })
  if (!res.ok) throw new Error(`Wallhaven search failed (${res.status})`)
  return parseWallhaven(await res.json())
}

export async function searchTmdbBackdrops(mediaId: number): Promise<WallpaperSearchPage> {
  const media = getMedia(mediaId)
  if (media.media_type !== 'movie' && media.media_type !== 'tv')
    throw new Error('TMDB backdrops are only available for movies and TV shows')
  if (media.external_source !== 'tmdb' || !media.external_id)
    throw new Error('This title has no TMDB id — import it from TMDB first')
  const backdrops = await fetchBackdrops(media.media_type, media.external_id)
  return { results: tmdbBackdropResults(backdrops), page: 1, lastPage: 1 }
}

// ---------------- library ops ----------------

interface MediaRow {
  id: number
  title: string
  media_type: string
  external_source: string | null
  external_id: string | null
}

function getMedia(mediaId: number): MediaRow {
  const row = getSqlite()
    .prepare(
      'SELECT id, title, media_type, external_source, external_id FROM media_item WHERE id=?'
    )
    .get(mediaId) as MediaRow | undefined
  if (!row) throw new Error('Media not found')
  return row
}

// "<Title> (<type>)/wallpapers" — the (<type>) suffix keeps an anime and its
// manga adaptation (same title) in separate folders.
function subdirFor(media: MediaRow, kind: ImageKind): string {
  const folder = `${sanitizeFileBase(media.title, 'untitled')} (${media.media_type})`
  return `${folder}/${kind === 'wallpaper' ? 'wallpapers' : 'fanart'}`
}

function rowToImage(r: any): MediaImage {
  return {
    id: r.id,
    mediaId: r.media_id,
    kind: r.kind as ImageKind,
    filePath: r.file_path,
    sourceUrl: r.source_url,
    source: r.source,
    width: r.width,
    height: r.height
  }
}

export function listImages(mediaId: number, kind: ImageKind): MediaImage[] {
  const rows = getSqlite()
    .prepare(
      `SELECT id, media_id, kind, file_path, source_url, source, width, height
         FROM media_image WHERE media_id=? AND kind=?
        ORDER BY sort_order, id`
    )
    .all(mediaId, kind) as any[]
  return rows.map(rowToImage)
}

function insertImage(
  mediaId: number,
  kind: ImageKind,
  filePath: string,
  sourceUrl: string | null,
  source: string,
  width: number | null,
  height: number | null
): MediaImage {
  const db = getSqlite()
  const nextOrder = db
    .prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS n FROM media_image WHERE media_id=? AND kind=?')
    .get(mediaId, kind) as { n: number }
  const info = db
    .prepare(
      `INSERT INTO media_image (media_id, kind, file_path, source_url, source, width, height, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(mediaId, kind, filePath, sourceUrl, source, width, height, nextOrder.n)
  const row = db
    .prepare(
      'SELECT id, media_id, kind, file_path, source_url, source, width, height FROM media_image WHERE id=?'
    )
    .get(Number(info.lastInsertRowid))
  return rowToImage(row)
}

// Shared download-then-insert path for Browse picks and pasted URLs. Dedupe is
// soft and per (media, kind, source_url): re-adding an image you already have
// returns the existing row without touching the network.
async function addDownloaded(
  mediaId: number,
  kind: ImageKind,
  url: string,
  baseName: string | null,
  source: string,
  width: number | null,
  height: number | null
): Promise<MediaImage> {
  const media = getMedia(mediaId)
  const existing = getSqlite()
    .prepare(
      `SELECT id, media_id, kind, file_path, source_url, source, width, height
         FROM media_image WHERE media_id=? AND kind=? AND source_url=?`
    )
    .get(mediaId, kind, url)
  if (existing) return rowToImage(existing)
  const filePath = await downloadImageTo(url, subdirFor(media, kind), baseName)
  if (!filePath) throw new Error('Image download failed — check the URL and your connection.')
  return insertImage(mediaId, kind, filePath, url, source, width, height)
}

export async function addFromSearch(
  mediaId: number,
  kind: ImageKind,
  result: WallpaperSearchResult
): Promise<MediaImage> {
  const baseName =
    result.source === 'wallhaven'
      ? `wallhaven-${result.id}`
      : `tmdb-${result.id.replace(/^\//, '').replace(/\.\w+$/, '')}`
  return addDownloaded(mediaId, kind, result.fullUrl, baseName, result.source, result.width, result.height)
}

export async function addFromUrl(mediaId: number, kind: ImageKind, url: string): Promise<MediaImage> {
  let parsed: URL
  try {
    parsed = new URL(url.trim())
  } catch {
    throw new Error('That is not a valid URL')
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:')
    throw new Error('Only http(s) image URLs are supported')
  const base = parsed.pathname.split('/').filter(Boolean).pop() ?? ''
  const baseName = base ? base.replace(/\.\w+$/, '') : null
  return addDownloaded(mediaId, kind, parsed.toString(), baseName, 'url', null, null)
}

export async function addFromFiles(mediaId: number, kind: ImageKind): Promise<MediaImage[]> {
  const media = getMedia(mediaId)
  const picked = await pickImageFiles()
  if (picked.length === 0) return []
  const subdir = subdirFor(media, kind)
  const added: MediaImage[] = []
  for (const src of picked) {
    const filePath = copyImageInto(src, subdir)
    if (!filePath) continue // unreadable file — skip rather than abort the batch
    added.push(insertImage(mediaId, kind, filePath, null, 'file', null, null))
  }
  return added
}

// Deletes the row AND its file: unlike shared content-addressed covers, a
// pictures/ file exists solely for this row. File deletion is best-effort —
// a missing/locked file must not leave the row behind.
export function removeImage(imageId: number): void {
  const db = getSqlite()
  const row = db.prepare('SELECT file_path FROM media_image WHERE id=?').get(imageId) as
    | { file_path: string }
    | undefined
  if (!row) return
  db.prepare('DELETE FROM media_image WHERE id=?').run(imageId)
  if (row.file_path.startsWith('pictures/')) {
    try {
      unlinkSync(absoluteMediaPath(row.file_path))
    } catch {
      /* already gone or unwritable — row removal is what matters */
    }
  }
}
