import { unlinkSync } from 'fs'
import { basename, extname } from 'path'
import { getSqlite } from './db/connection'
import {
  absoluteMediaPath,
  copyImageInto,
  copyIntoSlideshow,
  downloadImage,
  downloadImageTo,
  importImageFile,
  pickImageFiles,
  removeSlideshowCopy,
  sanitizeFileBase
} from './files'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { probeImageDims } from './imageDims'
import { fetchBackdrops } from './tmdb'
import * as settingsRepo from './repos/settingsRepo'
import * as links from './repos/externalLinkRepo'
import * as art from './artSources'
import type {
  ImageKind,
  MediaImage,
  MediaType,
  SlideshowSource,
  WallpaperSearchPage,
  WallpaperSearchResult,
  WallpaperSource,
  WallpaperSourceInfo
} from '@shared/types'

// Wallpapers + fan art for a media item, or for the Pictures gallery's
// Unsorted bucket (media_id NULL). Files live in a browsable on-disk layout
// under pictures.dir — "<Title> (<type>)/<wallpapers|fanart>/<file>", or
// "Unsorted/<wallpapers|fanart>/<file>" — and rows in media_image point at them
// via the virtual "pictures/" prefix.
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
    headers: { Accept: 'application/json' },
    maxResponseBytes: MAX_API_RESPONSE_BYTES
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

// Which Browse sources a title gets, in tab order. Title-searchable sources
// carry the title as their prefilled query; id-bound ones (TMDB, VNDB, the
// AniList banner, Steam/SteamGridDB for a Steam import) carry null. Fan art
// for anime-style media opens on Danbooru, everything else on Wallhaven.
const BOORU_TYPES = new Set(['anime', 'manga', 'visual_novel', 'game'])

function steamAppOf(mediaId: number, m: { external_source: string | null; external_id: string | null }): string | null {
  return m.external_source === 'steam' && m.external_id ? m.external_id : links.linkedId(mediaId, 'steam')
}

export function listSources(mediaId: number | null, kind: ImageKind): WallpaperSourceInfo[] {
  // Unsorted art has no title to search by or id to bind to, so it gets the
  // two free-text sources with an empty query.
  if (mediaId == null) {
    return kind === 'fanart'
      ? [
          { source: 'danbooru', label: 'Danbooru', query: '', needsKey: null },
          { source: 'wallhaven', label: 'Wallhaven', query: '', needsKey: null }
        ]
      : [
          { source: 'wallhaven', label: 'Wallhaven', query: '', needsKey: null },
          { source: 'danbooru', label: 'Danbooru', query: '', needsKey: null }
        ]
  }
  const m = getMedia(mediaId)
  const type = m.media_type
  const id = m.external_id
  const hasKey = (key: string): boolean => !!settingsRepo.get(key)?.trim()
  const out: WallpaperSourceInfo[] = []
  const add = (source: WallpaperSource, label: string, query: string | null, needsKey: string | null = null) =>
    out.push({ source, label, query, needsKey })

  const booru = BOORU_TYPES.has(type)
  if (booru && kind === 'fanart') add('danbooru', 'Danbooru', m.title)
  add('wallhaven', 'Wallhaven', m.title)
  if (booru && kind === 'wallpaper') add('danbooru', 'Danbooru', m.title)
  if ((type === 'movie' || type === 'tv') && m.external_source === 'tmdb' && id) {
    add('tmdb', 'TMDB backdrops', null)
    add('fanarttv', 'fanart.tv', null, hasKey('fanarttv.api_key') ? null : 'fanart.tv')
  }
  if ((type === 'anime' || type === 'manga') && m.external_source === 'anilist' && id) {
    add('anilist', 'AniList banner', null)
  }
  if (type === 'visual_novel' && m.external_source === 'vndb' && id) add('vndb', 'VNDB screenshots', null)
  if (type === 'game') {
    // A RAWG-era or catalog game may know its Steam app through its links.
    const steamQuery = steamAppOf(mediaId, m) ? null : m.title
    add('steam', 'Steam', steamQuery)
    add('steamgriddb', 'SteamGridDB', steamQuery, hasKey('steamgriddb.api_key') ? null : 'SteamGridDB')
  }
  return out
}

export async function searchSource(
  mediaId: number | null,
  source: WallpaperSource,
  query: string,
  page = 1
): Promise<WallpaperSearchPage> {
  if (mediaId == null) {
    if (source === 'wallhaven') return searchWallhaven(query, page)
    if (source === 'danbooru') return art.searchDanbooru(query, page)
    throw new Error('Unsorted pictures can only browse Wallhaven and Danbooru')
  }
  const m = getMedia(mediaId)
  const steamId = steamAppOf(mediaId, m)
  switch (source) {
    case 'wallhaven':
      return searchWallhaven(query, page)
    case 'tmdb':
      return searchTmdbBackdrops(mediaId)
    case 'danbooru':
      return art.searchDanbooru(query, page)
    case 'anilist':
      return art.anilistBanner(requireId(m, 'anilist'))
    case 'vndb':
      return art.vndbScreenshots(requireId(m, 'vndb'))
    case 'fanarttv':
      if (m.media_type !== 'movie' && m.media_type !== 'tv')
        throw new Error('fanart.tv art is only available for movies and TV shows')
      return art.fanartTv(m.media_type, requireId(m, 'tmdb'))
    case 'steam':
      return art.steamArt(steamId, query || m.title)
    case 'steamgriddb':
      return art.steamGridDbHeroes(steamId, query || m.title)
  }
}

function requireId(m: MediaRow, source: string): string {
  if (m.external_source !== source || !m.external_id)
    throw new Error(`This title was not imported from ${source}`)
  return m.external_id
}

// ---------------- library ops ----------------

export interface MediaRow {
  id: number
  title: string
  media_type: string
  external_source: string | null
  external_id: string | null
}

export function getMedia(mediaId: number): MediaRow {
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
const KIND_DIRS: Record<ImageKind, string> = {
  wallpaper: 'wallpapers',
  fanart: 'fanart'
}

export const UNSORTED_LABEL = 'Unsorted'

export function subdirFor(media: MediaRow | null, kind: ImageKind): string {
  const folder = media
    ? `${sanitizeFileBase(media.title, 'untitled')} (${media.media_type})`
    : UNSORTED_LABEL
  return `${folder}/${KIND_DIRS[kind]}`
}

// null = Unsorted; a number must name an existing title.
export function mediaOrUnsorted(mediaId: number | null): MediaRow | null {
  return mediaId == null ? null : getMedia(mediaId)
}

// Every read of an image row goes through this: the per-image state the Art
// tab and the gallery show (background, slideshow, favorite, tags, owning
// title) must ride along with the row, or each tile would need its own query.
export const IMAGE_SELECT = `SELECT i.id, i.media_id, i.kind, i.file_path, i.source_url, i.source,
          i.width, i.height, i.is_background, i.is_favorite, i.created_at,
          m.title AS media_title, m.media_type,
          s.file_name AS slideshow_file,
          (SELECT group_concat(l.tag_id) FROM picture_tag_link l WHERE l.image_id = i.id) AS tag_ids
     FROM media_image i
     LEFT JOIN media_item m ON m.id = i.media_id
     LEFT JOIN slideshow_item s ON s.image_id = i.id`

export function rowToImage(r: any): MediaImage {
  return {
    id: r.id,
    mediaId: r.media_id,
    mediaTitle: r.media_title ?? null,
    mediaType: (r.media_type as MediaType | null) ?? null,
    kind: r.kind as ImageKind,
    filePath: r.file_path,
    sourceUrl: r.source_url,
    source: r.source,
    // 0 = probed and unreadable (see backfillDims); the renderer treats it
    // like null.
    width: r.width || null,
    height: r.height || null,
    isBackground: r.is_background === 1,
    isFavorite: r.is_favorite === 1,
    inSlideshow: r.slideshow_file != null,
    tagIds: r.tag_ids ? String(r.tag_ids).split(',').map(Number) : [],
    createdAt: r.created_at
  }
}

export function listImages(mediaId: number, kind: ImageKind): MediaImage[] {
  const rows = getSqlite()
    .prepare(`${IMAGE_SELECT} WHERE i.media_id=? AND i.kind=? ORDER BY i.sort_order, i.id`)
    .all(mediaId, kind) as any[]
  return rows.map(rowToImage)
}

export function getImage(imageId: number): MediaImage {
  const row = getSqlite().prepare(`${IMAGE_SELECT} WHERE i.id=?`).get(imageId)
  if (!row) throw new Error('Image not found')
  return rowToImage(row)
}

function insertImage(
  mediaId: number | null,
  kind: ImageKind,
  filePath: string,
  sourceUrl: string | null,
  source: string,
  width: number | null,
  height: number | null
): MediaImage {
  const db = getSqlite()
  // File and URL adds arrive without dimensions; the gallery's justified rows
  // need them, so read the header now. 0 records "tried, unreadable".
  if (!width || !height) {
    const found = probeImageDims(absoluteMediaPath(filePath))
    width = found?.width ?? 0
    height = found?.height ?? 0
  }
  const nextOrder = db
    .prepare('SELECT COALESCE(MAX(sort_order), -1) + 1 AS n FROM media_image WHERE media_id IS ? AND kind=?')
    .get(mediaId, kind) as { n: number }
  const info = db
    .prepare(
      `INSERT INTO media_image (media_id, kind, file_path, source_url, source, width, height, sort_order)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(mediaId, kind, filePath, sourceUrl, source, width, height, nextOrder.n)
  const row = db.prepare(`${IMAGE_SELECT} WHERE i.id=?`).get(Number(info.lastInsertRowid))
  return rowToImage(row)
}

// Shared download-then-insert path for Browse picks and pasted URLs. Dedupe is
// soft and per (media, kind, source_url): re-adding an image you already have
// returns the existing row without touching the network.
async function addDownloaded(
  mediaId: number | null,
  kind: ImageKind,
  url: string,
  baseName: string | null,
  source: string,
  width: number | null,
  height: number | null
): Promise<MediaImage> {
  const media = mediaOrUnsorted(mediaId)
  const existing = getSqlite()
    .prepare(`${IMAGE_SELECT} WHERE i.media_id IS ? AND i.kind=? AND i.source_url=?`)
    .get(mediaId, kind, url)
  if (existing) return rowToImage(existing)
  const filePath = await downloadImageTo(url, subdirFor(media, kind), baseName)
  if (!filePath) throw new Error('Image download failed — check the URL and your connection.')
  return insertImage(mediaId, kind, filePath, url, source, width, height)
}

export async function addFromSearch(
  mediaId: number | null,
  kind: ImageKind,
  result: WallpaperSearchResult
): Promise<MediaImage> {
  const stem = result.id.replace(/^\//, '').replace(/\.\w+$/, '').replace(/[^\w-]+/g, '-')
  const baseName = `${result.source}-${stem}`
  return addDownloaded(mediaId, kind, result.fullUrl, baseName, result.source, result.width, result.height)
}

function parseImageUrl(url: string): URL {
  let parsed: URL
  try {
    parsed = new URL(url.trim())
  } catch {
    throw new Error('That is not a valid URL')
  }
  if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:')
    throw new Error('Only http(s) image URLs are supported')
  return parsed
}

export async function addFromUrl(
  mediaId: number | null,
  kind: ImageKind,
  url: string
): Promise<MediaImage> {
  const parsed = parseImageUrl(url)
  const base = parsed.pathname.split('/').filter(Boolean).pop() ?? ''
  const baseName = base ? base.replace(/\.\w+$/, '') : null
  return addDownloaded(mediaId, kind, parsed.toString(), baseName, 'url', null, null)
}

export async function addFromFiles(mediaId: number | null, kind: ImageKind): Promise<MediaImage[]> {
  const media = mediaOrUnsorted(mediaId)
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

// Sources for a hand-picked cover/photo (imageOverrideRepo.setManual). Both
// land content-addressed in media/picked/, apart from the re-downloadable cache. An Art-tab
// image is COPIED, not referenced: removing its tile deletes the pictures/ file.
export async function importImageFromUrl(url: string): Promise<string> {
  const rel = await downloadImage(parseImageUrl(url).toString(), 'picked')
  if (!rel) throw new Error('Image download failed — check the URL and your connection.')
  return rel
}

export function importImageFromArt(imageId: number): string {
  const rel = importImageFile(absoluteMediaPath(getImage(imageId).filePath), 'picked')
  if (!rel) throw new Error('That image file is missing or unreadable.')
  return rel
}

// Deletes the row AND its file: unlike shared content-addressed covers, a
// pictures/ file exists solely for this row. File deletion is best-effort —
// a missing/locked file must not leave the row behind.
export function removeImage(imageId: number): void {
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT i.file_path, s.file_name AS slideshow_file
         FROM media_image i LEFT JOIN slideshow_item s ON s.image_id = i.id
        WHERE i.id=?`
    )
    .get(imageId) as { file_path: string; slideshow_file: string | null } | undefined
  if (!row) return
  // slideshow_item cascades with the row; its COPY in the slideshow folder does
  // not, and Windows would keep showing a wallpaper the user just deleted.
  db.prepare('DELETE FROM media_image WHERE id=?').run(imageId)
  if (row.slideshow_file) removeSlideshowCopy(row.slideshow_file)
  if (row.file_path.startsWith('pictures/')) {
    try {
      unlinkSync(absoluteMediaPath(row.file_path))
    } catch {
      /* already gone or unwritable — row removal is what matters */
    }
  }
}

// ---- desktop slideshow -----------------------------------------------------
// The copy's name in the slideshow folder. Readable on purpose: the folder is a
// flat pile of images from every title, and the user browses it in Explorer.
export function slideshowFileName(title: string, filePath: string): string {
  const base = basename(filePath)
  // Split on the REAL extension before defaulting it — slicing by '.jpg'.length
  // against an extension-less name would eat four characters of the stem.
  const found = extname(base)
  const stem = sanitizeFileBase(base.slice(0, base.length - found.length), 'image')
  return `${sanitizeFileBase(title, 'untitled')} - ${stem}${found || '.jpg'}`
}

// Adds or removes the image's copy in the slideshow folder. The file is copied
// BEFORE the row is written, so a failed copy leaves no row claiming a file that
// is not there; removal is best-effort, so a copy the user deleted by hand in
// Explorer still un-toggles cleanly (that is also the repair path — remove, then
// add again).
export function toggleSlideshow(imageId: number): MediaImage {
  if (getSlideshowSource() !== 'manual')
    throw new Error('The slideshow follows Favorites or an album. Switch it to Manual to pick images one by one.')
  const image = getImage(imageId)
  if (image.inSlideshow) removeFromSlideshow(imageId)
  else addToSlideshow(imageId)
  return getImage(imageId)
}

// The two halves of the toggle, shared with the mirrored sync in
// pictureLibrary.ts. addToSlideshow throws when the copy fails.
export function addToSlideshow(imageId: number): void {
  const db = getSqlite()
  const row = db
    .prepare(
      `SELECT i.file_path, m.title FROM media_image i
         LEFT JOIN media_item m ON m.id = i.media_id
        WHERE i.id=?`
    )
    .get(imageId) as { file_path: string; title: string | null } | undefined
  if (!row) throw new Error('Image not found')
  const fileName = copyIntoSlideshow(
    absoluteMediaPath(row.file_path),
    slideshowFileName(row.title ?? UNSORTED_LABEL, row.file_path)
  )
  db.prepare('INSERT OR IGNORE INTO slideshow_item (image_id, file_name) VALUES (?, ?)').run(
    imageId,
    fileName
  )
}

export function removeFromSlideshow(imageId: number): void {
  const db = getSqlite()
  const row = db.prepare('SELECT file_name FROM slideshow_item WHERE image_id=?').get(imageId) as
    | { file_name: string }
    | undefined
  if (!row) return
  removeSlideshowCopy(row.file_name)
  db.prepare('DELETE FROM slideshow_item WHERE image_id=?').run(imageId)
}

// What feeds the slideshow folder: hand-toggled images, or a mirror of the
// favorites or one album. An album that no longer exists reads as manual.
export const SLIDESHOW_SOURCE_SETTING = 'pictures.slideshowSource'

export function parseSlideshowSource(raw: string | null | undefined): SlideshowSource {
  if (raw === 'favorites') return 'favorites'
  const m = /^album:(\d+)$/.exec(raw ?? '')
  return m ? `album:${Number(m[1])}` : 'manual'
}

export function getSlideshowSource(): SlideshowSource {
  const source = parseSlideshowSource(settingsRepo.get(SLIDESHOW_SOURCE_SETTING))
  if (source.startsWith('album:')) {
    const exists = getSqlite()
      .prepare('SELECT 1 FROM picture_album WHERE id=?')
      .get(Number(source.slice('album:'.length)))
    if (!exists) return 'manual'
  }
  return source
}

// Drops every slideshow copy belonging to a media item. Called before the item
// is deleted: the rows would cascade, but the files sit in a folder Windows is
// actively cycling through.
export function forgetSlideshowForMedia(mediaId: number): void {
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT s.file_name FROM slideshow_item s
         JOIN media_image i ON i.id = s.image_id
        WHERE i.media_id=?`
    )
    .all(mediaId) as { file_name: string }[]
  for (const r of rows) removeSlideshowCopy(r.file_name)
  db.prepare(
    'DELETE FROM slideshow_item WHERE image_id IN (SELECT id FROM media_image WHERE media_id=?)'
  ).run(mediaId)
}

// ---- detail-page background ------------------------------------------------
// At most one image per media item carries the flag, which is why this clears
// the whole item before setting one. imageId null = clear.
export function setBackground(mediaId: number, imageId: number | null): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare('UPDATE media_image SET is_background=0 WHERE media_id=? AND is_background=1').run(
      mediaId
    )
    if (imageId != null) {
      const info = db
        .prepare('UPDATE media_image SET is_background=1 WHERE id=? AND media_id=?')
        .run(imageId, mediaId)
      if (info.changes !== 1) throw new Error('Image not found')
    }
  })()
}
