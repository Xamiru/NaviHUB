import { existsSync } from 'fs'
import { getSqlite } from './db/connection'
import { absoluteMediaPath, moveImageInto } from './files'
import { probeImageDims } from './imageDims'
import * as settingsRepo from './repos/settingsRepo'
import * as tasks from './tasks'
import {
  IMAGE_SELECT,
  SLIDESHOW_SOURCE_SETTING,
  addToSlideshow,
  getImage,
  getSlideshowSource,
  mediaOrUnsorted,
  parseSlideshowSource,
  removeFromSlideshow,
  rowToImage,
  subdirFor
} from './pictures'
import type {
  ImageKind,
  MediaImage,
  PictureAlbum,
  PictureGalleryFilter,
  PictureTag,
  SlideshowSource,
  SlideshowSyncResult
} from '@shared/types'

// The Pictures gallery's personal layer over media_image: the cross-title
// gallery read, favorites, albums, tags, moving images between titles and
// Unsorted, and the slideshow folder as a mirror of favorites or one album.
// pictures.ts keeps the per-title Art-tab operations and the sources.

/* eslint-disable @typescript-eslint/no-explicit-any */

// ---- gallery read ------------------------------------------------------------

// Landscape and portrait leave a small square band, so a 1000x980 scan does
// not count as either. Images with unknown dimensions match no orientation.
const ORIENTATION_SQL = {
  landscape: 'i.width > i.height * 1.05',
  portrait: 'i.height > i.width * 1.05',
  square: 'i.width > 0 AND i.height > 0 AND i.width BETWEEN i.height * 0.95 AND i.height * 1.05'
} as const

export function listGallery(filter: PictureGalleryFilter = {}): MediaImage[] {
  const where: string[] = []
  const params: unknown[] = []
  let join = ''
  if (filter.albumId != null) {
    join = ' JOIN picture_album_item ai ON ai.image_id = i.id AND ai.album_id = ?'
    params.push(filter.albumId)
  }
  if (filter.unsorted) where.push('i.media_id IS NULL')
  else if (filter.mediaId != null) {
    where.push('i.media_id = ?')
    params.push(filter.mediaId)
  }
  if (filter.mediaType) {
    where.push('m.media_type = ?')
    params.push(filter.mediaType)
  }
  if (filter.kind) {
    where.push('i.kind = ?')
    params.push(filter.kind)
  }
  if (filter.favorites) where.push('i.is_favorite = 1')
  if (filter.inSlideshow) where.push('s.image_id IS NOT NULL')
  if (filter.orientation) where.push(ORIENTATION_SQL[filter.orientation])
  for (const tagId of filter.tagIds ?? []) {
    where.push('EXISTS (SELECT 1 FROM picture_tag_link t WHERE t.image_id = i.id AND t.tag_id = ?)')
    params.push(tagId)
  }
  const order =
    filter.albumId != null
      ? 'ai.sort_order, ai.added_at, i.id'
      : filter.sort === 'oldest'
        ? 'i.created_at, i.id'
        : filter.sort === 'title'
          ? 'm.title IS NULL, m.title COLLATE NOCASE, i.kind DESC, i.sort_order, i.id'
          : 'i.created_at DESC, i.id DESC'
  const sql = `${IMAGE_SELECT}${join}${where.length ? ` WHERE ${where.join(' AND ')}` : ''} ORDER BY ${order}`
  return (getSqlite().prepare(sql).all(...params) as any[]).map(rowToImage)
}

// Rows added before dimensions were probed on insert (file and URL adds) get
// them here, a bounded batch per gallery load. 0 records "tried, unreadable"
// so a broken file is not re-read on every visit; a missing file (an
// unmounted drive) is left for a later visit instead. The id cursor moves past
// those rows, so they cannot hold back the readable ones. Returns rows written.
let dimsCursor = 0
export function backfillDims(limit = 200): number {
  const db = getSqlite()
  const rows = db
    .prepare(
      'SELECT id, file_path FROM media_image WHERE (width IS NULL OR height IS NULL) AND id > ? ORDER BY id LIMIT ?'
    )
    .all(dimsCursor, limit) as { id: number; file_path: string }[]
  dimsCursor = rows.length < limit ? 0 : rows[rows.length - 1].id
  const update = db.prepare('UPDATE media_image SET width=?, height=? WHERE id=?')
  let written = 0
  for (const r of rows) {
    const abs = absoluteMediaPath(r.file_path)
    if (!existsSync(abs)) continue
    const found = probeImageDims(abs)
    update.run(found?.width ?? 0, found?.height ?? 0, r.id)
    written += 1
  }
  return written
}

export function homePick(): MediaImage | null {
  const row = getSqlite()
    .prepare(`${IMAGE_SELECT} WHERE i.is_favorite = 1 ORDER BY random() LIMIT 1`)
    .get()
  return row ? rowToImage(row) : null
}

// ---- favorites and moves -----------------------------------------------------

export async function setFavorite(imageIds: number[], favorite: boolean): Promise<void> {
  const db = getSqlite()
  const update = db.prepare('UPDATE media_image SET is_favorite=? WHERE id=?')
  db.transaction(() => {
    for (const id of imageIds) update.run(favorite ? 1 : 0, id)
  })()
  if (getSlideshowSource() === 'favorites') await syncSlideshow()
}

// Moves images to another title or to Unsorted (mediaId null), and/or to the
// other kind (kind null keeps each image's own). The file moves first; a row is
// only rewritten once its file is in the new folder. A move to another title
// drops the background flag, which belongs to the old title's page.
export function moveImages(
  imageIds: number[],
  mediaId: number | null,
  kind: ImageKind | null
): MediaImage[] {
  const db = getSqlite()
  const target = mediaOrUnsorted(mediaId)
  const nextOrder = db.prepare(
    'SELECT COALESCE(MAX(sort_order), -1) + 1 AS n FROM media_image WHERE media_id IS ? AND kind=?'
  )
  const update = db.prepare(
    `UPDATE media_image SET media_id=?, kind=?, file_path=?, sort_order=?,
            is_background = CASE WHEN media_id IS ? THEN is_background ELSE 0 END
      WHERE id=?`
  )
  const moved: MediaImage[] = []
  for (const id of imageIds) {
    const image = getImage(id)
    const toKind = kind ?? image.kind
    if (image.mediaId === mediaId && image.kind === toKind) {
      moved.push(image)
      continue
    }
    const filePath = moveImageInto(image.filePath, subdirFor(target, toKind))
    const { n } = nextOrder.get(mediaId, toKind) as { n: number }
    update.run(mediaId, toKind, filePath, n, mediaId, id)
    moved.push(getImage(id))
  }
  return moved
}

// ---- albums --------------------------------------------------------------------

function cleanName(name: string, what: string): string {
  const clean = name.replace(/\s+/g, ' ').trim().slice(0, 80)
  if (!clean) throw new Error(`Give the ${what} a name`)
  return clean
}

export function listAlbums(): PictureAlbum[] {
  const rows = getSqlite()
    .prepare(
      `SELECT a.id, a.name, a.created_at,
              (SELECT COUNT(*) FROM picture_album_item x WHERE x.album_id = a.id) AS count,
              (SELECT i.file_path FROM picture_album_item x
                 JOIN media_image i ON i.id = x.image_id
                WHERE x.album_id = a.id
                ORDER BY x.sort_order, x.added_at, i.id LIMIT 1) AS cover_path
         FROM picture_album a
        ORDER BY a.name COLLATE NOCASE, a.id`
    )
    .all() as any[]
  return rows.map((r) => ({
    id: r.id,
    name: r.name,
    count: r.count,
    coverPath: r.cover_path ?? null,
    createdAt: r.created_at
  }))
}

export function getAlbum(albumId: number): PictureAlbum {
  const album = listAlbums().find((a) => a.id === albumId)
  if (!album) throw new Error('Album not found')
  return album
}

export async function createAlbum(name: string, imageIds: number[] = []): Promise<PictureAlbum> {
  const info = getSqlite()
    .prepare('INSERT INTO picture_album (name) VALUES (?)')
    .run(cleanName(name, 'album'))
  const id = Number(info.lastInsertRowid)
  if (imageIds.length) await addToAlbum(id, imageIds)
  return getAlbum(id)
}

export function renameAlbum(albumId: number, name: string): void {
  const info = getSqlite()
    .prepare('UPDATE picture_album SET name=? WHERE id=?')
    .run(cleanName(name, 'album'), albumId)
  if (info.changes !== 1) throw new Error('Album not found')
}

// Deleting the album the slideshow mirrors switches the slideshow to Manual and
// leaves its current copies in place, as switching to Manual by hand does.
export function deleteAlbum(albumId: number): void {
  if (getSlideshowSource() === `album:${albumId}`) settingsRepo.set(SLIDESHOW_SOURCE_SETTING, 'manual')
  getSqlite().prepare('DELETE FROM picture_album WHERE id=?').run(albumId)
}

async function resyncIfMirrored(albumId: number): Promise<void> {
  if (getSlideshowSource() === `album:${albumId}`) await syncSlideshow()
}

export async function addToAlbum(albumId: number, imageIds: number[]): Promise<void> {
  const db = getSqlite()
  if (!db.prepare('SELECT 1 FROM picture_album WHERE id=?').get(albumId)) throw new Error('Album not found')
  const next = db.prepare(
    'SELECT COALESCE(MAX(sort_order), -1) + 1 AS n FROM picture_album_item WHERE album_id=?'
  )
  const insert = db.prepare(
    'INSERT OR IGNORE INTO picture_album_item (album_id, image_id, sort_order) VALUES (?, ?, ?)'
  )
  db.transaction(() => {
    for (const id of imageIds) insert.run(albumId, id, (next.get(albumId) as { n: number }).n)
  })()
  await resyncIfMirrored(albumId)
}

export async function removeFromAlbum(albumId: number, imageIds: number[]): Promise<void> {
  const db = getSqlite()
  const del = db.prepare('DELETE FROM picture_album_item WHERE album_id=? AND image_id=?')
  db.transaction(() => {
    for (const id of imageIds) del.run(albumId, id)
  })()
  await resyncIfMirrored(albumId)
}

// orderedIds is the album's full new order; ids not in the album are ignored.
export function reorderAlbum(albumId: number, orderedIds: number[]): void {
  const db = getSqlite()
  const update = db.prepare('UPDATE picture_album_item SET sort_order=? WHERE album_id=? AND image_id=?')
  db.transaction(() => {
    orderedIds.forEach((id, i) => update.run(i, albumId, id))
  })()
}

// ---- tags ------------------------------------------------------------------------

export function listTags(): PictureTag[] {
  return getSqlite()
    .prepare(
      `SELECT t.id, t.name, COUNT(l.image_id) AS count
         FROM picture_tag t LEFT JOIN picture_tag_link l ON l.tag_id = t.id
        GROUP BY t.id ORDER BY t.name COLLATE NOCASE`
    )
    .all() as PictureTag[]
}

function tagIdFor(name: string): number {
  const db = getSqlite()
  const clean = cleanName(name, 'tag')
  db.prepare('INSERT OR IGNORE INTO picture_tag (name) VALUES (?)').run(clean)
  return (db.prepare('SELECT id FROM picture_tag WHERE name=?').get(clean) as { id: number }).id
}

export function tagImages(imageIds: number[], name: string): PictureTag {
  const db = getSqlite()
  const tagId = tagIdFor(name)
  const link = db.prepare('INSERT OR IGNORE INTO picture_tag_link (image_id, tag_id) VALUES (?, ?)')
  db.transaction(() => {
    for (const id of imageIds) link.run(id, tagId)
  })()
  return listTags().find((t) => t.id === tagId) as PictureTag
}

// Tags exist only through their images: one left with none is deleted, so the
// filter never offers a tag that matches nothing.
export function untagImages(imageIds: number[], tagId: number): void {
  const db = getSqlite()
  const unlink = db.prepare('DELETE FROM picture_tag_link WHERE image_id=? AND tag_id=?')
  db.transaction(() => {
    for (const id of imageIds) unlink.run(id, tagId)
    db.prepare(
      'DELETE FROM picture_tag WHERE id=? AND NOT EXISTS (SELECT 1 FROM picture_tag_link WHERE tag_id=?)'
    ).run(tagId, tagId)
  })()
}

// Renaming onto an existing tag's name merges the two.
export function renameTag(tagId: number, name: string): void {
  const db = getSqlite()
  const clean = cleanName(name, 'tag')
  const other = db.prepare('SELECT id FROM picture_tag WHERE name=? AND id<>?').get(clean, tagId) as
    | { id: number }
    | undefined
  db.transaction(() => {
    if (other) {
      db.prepare(
        'INSERT OR IGNORE INTO picture_tag_link (image_id, tag_id) SELECT image_id, ? FROM picture_tag_link WHERE tag_id=?'
      ).run(other.id, tagId)
      db.prepare('DELETE FROM picture_tag WHERE id=?').run(tagId)
    } else {
      db.prepare('UPDATE picture_tag SET name=? WHERE id=?').run(clean, tagId)
    }
  })()
}

export function deleteTag(tagId: number): void {
  getSqlite().prepare('DELETE FROM picture_tag WHERE id=?').run(tagId)
}

// ---- slideshow mirror ------------------------------------------------------------
// With a non-manual source the slideshow folder holds exactly that set. A sync
// diffs slideshow_item against the source, removes what left it and copies in
// what joined. Syncs run one at a time; a large one (switching the source) is a
// cancellable task, a single favorite toggle just runs.

const TASK_THRESHOLD = 10
const syncState = { running: false, done: 0, total: 0 }
let syncCancel = false
// Set once at quit and never cleared, so a sync queued behind the cancelled
// one cannot start against the closing database.
let quitting = false
let syncChain: Promise<unknown> = Promise.resolve()

export function setSlideshowSource(source: SlideshowSource): Promise<SlideshowSyncResult> {
  const parsed = parseSlideshowSource(source)
  if (parsed !== source) throw new Error('Unknown slideshow source')
  if (parsed.startsWith('album:')) getAlbum(Number(parsed.slice('album:'.length)))
  settingsRepo.set(SLIDESHOW_SOURCE_SETTING, parsed)
  return syncSlideshow()
}

export function syncSlideshow(): Promise<SlideshowSyncResult> {
  const run = syncChain.then(runSync, runSync)
  syncChain = run.catch(() => undefined)
  return run
}

// The before-quit killer: a running sync stops before its next copy, so it
// never writes into a closed database.
export function cancelSlideshowSync(): void {
  syncCancel = true
  quitting = true
}

function desiredIds(source: SlideshowSource): number[] {
  const db = getSqlite()
  if (source === 'favorites') {
    return (db.prepare('SELECT id FROM media_image WHERE is_favorite = 1').all() as { id: number }[]).map(
      (r) => r.id
    )
  }
  return (
    db
      .prepare('SELECT image_id FROM picture_album_item WHERE album_id=? ORDER BY sort_order')
      .all(Number(source.slice('album:'.length))) as { image_id: number }[]
  ).map((r) => r.image_id)
}

async function runSync(): Promise<SlideshowSyncResult> {
  syncCancel = quitting
  const result: SlideshowSyncResult = { added: 0, removed: 0, failed: 0 }
  if (quitting) return result
  const source = getSlideshowSource()
  if (source === 'manual') return result
  const desired = new Set(desiredIds(source))
  const current = (
    getSqlite().prepare('SELECT image_id FROM slideshow_item').all() as { image_id: number }[]
  ).map((r) => r.image_id)
  const have = new Set(current)
  const toRemove = current.filter((id) => !desired.has(id))
  const toAdd = [...desired].filter((id) => !have.has(id))
  const total = toRemove.length + toAdd.length
  if (total === 0) return result

  const label = 'Syncing the slideshow folder'
  const work = async (): Promise<SlideshowSyncResult> => {
    Object.assign(syncState, { running: true, done: 0, total })
    try {
      for (const id of toRemove) {
        removeFromSlideshow(id)
        result.removed += 1
        syncState.done += 1
      }
      for (const id of toAdd) {
        if (syncCancel) throw new tasks.TaskCancelledError(label)
        try {
          addToSlideshow(id)
          result.added += 1
        } catch {
          result.failed += 1
        }
        syncState.done += 1
        // Copies are synchronous; yield between them so a long sync never
        // freezes the window.
        await new Promise((resolve) => setImmediate(resolve))
      }
      return result
    } finally {
      syncState.running = false
    }
  }
  if (total < TASK_THRESHOLD) return work()
  return tasks.runTask(
    {
      kind: 'pictureSlideshow',
      label,
      route: '/pictures',
      controls: {
        cancel: () => {
          syncCancel = true
        },
        pauseNote: 'The slideshow sync cannot be paused'
      },
      project: () => ({ done: syncState.done, total: syncState.total })
    },
    work
  )
}
