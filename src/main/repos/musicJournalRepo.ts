import { getSqlite } from '../db/connection'
import { choice, dateValue, textValue } from './hobbyValidation'
import { normalizeMusicTags } from '@shared/musicPersonal'
import type {
  MusicAlbumPersonal,
  MusicAlbumPersonalInput,
  MusicTrackPersonal,
  MusicListenInput,
  MusicListen,
  MusicJournalFilter,
  MusicJournalAlbum
} from '@shared/types'

export function validRating(value: number | null): number | null {
  if (value === null) return null
  if (typeof value !== 'number' || !Number.isFinite(value) || value < 0 || value > 10)
    throw new Error('Rating must be between 0 and 10')
  return value
}
export function validTags(tags: string[]): string[] {
  if (
    !Array.isArray(tags) ||
    tags.length > 30 ||
    tags.some((tag) => typeof tag !== 'string' || tag.length > 60 || tag.includes(','))
  )
    throw new Error('Use up to 30 tags, each under 60 characters, without commas')
  return normalizeMusicTags(tags)
}
export function validPage(page: number): number {
  if (!Number.isInteger(page) || page < 0 || page > 100000) throw new Error('Invalid page')
  return page
}
function albumExists(id: number): void {
  if (!getSqlite().prepare('SELECT 1 FROM music_album WHERE id=?').get(id))
    throw new Error('Album not found')
}
function trackExists(id: number): void {
  if (!getSqlite().prepare('SELECT 1 FROM music_track WHERE id=?').get(id))
    throw new Error('Track not found')
}
export function album(id: number): MusicAlbumPersonal {
  albumExists(id)
  const db = getSqlite()
  const p = db
    .prepare('SELECT rating,shelf,review,tags_json FROM music_album_personal WHERE album_id=?')
    .get(id) as
    | {
        rating: number | null
        shelf: MusicAlbumPersonal['shelf']
        review: string
        tags_json: string
      }
    | undefined
  const tracks = db
    .prepare(
      `SELECT p.track_id AS trackId,p.standout,p.tags_json FROM music_track_personal p
    JOIN music_track t ON t.id=p.track_id WHERE t.album_id=?`
    )
    .all(id) as { trackId: number; standout: number; tags_json: string }[]
  return {
    albumId: id,
    rating: p?.rating ?? null,
    shelf: p?.shelf ?? null,
    review: p?.review ?? '',
    tags: JSON.parse(p?.tags_json ?? '[]'),
    tracks: tracks.map((t) => ({
      trackId: t.trackId,
      standout: !!t.standout,
      tags: JSON.parse(t.tags_json)
    }))
  }
}
export function saveAlbum(id: number, input: MusicAlbumPersonalInput): void {
  albumExists(id)
  const rating = validRating(input.rating)
  const shelf =
    input.shelf === null
      ? null
      : choice(input.shelf, ['want', 'exploring', 'revisit'], 'album shelf')
  const review = textValue(input.review, 'album review')
  const tags = validTags(input.tags)
  getSqlite()
    .prepare(
      `INSERT INTO music_album_personal(album_id,rating,shelf,review,tags_json) VALUES(?,?,?,?,?)
    ON CONFLICT(album_id) DO UPDATE SET rating=excluded.rating,shelf=excluded.shelf,review=excluded.review,tags_json=excluded.tags_json`
    )
    .run(id, rating, shelf, review, JSON.stringify(tags))
}
export function track(id: number): MusicTrackPersonal {
  trackExists(id)
  const row = getSqlite()
    .prepare('SELECT standout,tags_json FROM music_track_personal WHERE track_id=?')
    .get(id) as { standout: number; tags_json: string } | undefined
  return { trackId: id, standout: !!row?.standout, tags: JSON.parse(row?.tags_json ?? '[]') }
}
export function saveTrack(input: MusicTrackPersonal): void {
  trackExists(input.trackId)
  if (typeof input.standout !== 'boolean') throw new Error('Invalid standout choice')
  const tags = validTags(input.tags)
  getSqlite()
    .prepare(
      `INSERT INTO music_track_personal(track_id,standout,tags_json) VALUES(?,?,?)
    ON CONFLICT(track_id) DO UPDATE SET standout=excluded.standout,tags_json=excluded.tags_json`
    )
    .run(input.trackId, input.standout ? 1 : 0, JSON.stringify(tags))
}
export function listens(albumId: number, page = 0): { items: MusicListen[]; total: number } {
  albumExists(albumId)
  const db = getSqlite()
  return {
    items: db
      .prepare(
        `SELECT id,album_id AS albumId,listened_on AS listenedOn,rating,notes FROM music_listen
      WHERE album_id=? ORDER BY listened_on DESC,id DESC LIMIT 50 OFFSET ?`
      )
      .all(albumId, validPage(page) * 50) as MusicListen[],
    total: (
      db.prepare('SELECT COUNT(*) AS n FROM music_listen WHERE album_id=?').get(albumId) as {
        n: number
      }
    ).n
  }
}
export function saveListen(albumId: number, id: number | null, input: MusicListenInput): number {
  albumExists(albumId)
  const fields = [
    dateValue(input.listenedOn, true),
    validRating(input.rating),
    textValue(input.notes, 'listening notes')
  ]
  const db = getSqlite()
  if (id != null) {
    if (
      !db
        .prepare('UPDATE music_listen SET listened_on=?,rating=?,notes=? WHERE id=? AND album_id=?')
        .run(...fields, id, albumId).changes
    )
      throw new Error('Listening entry not found')
    return id
  }
  return Number(
    db
      .prepare('INSERT INTO music_listen(listened_on,rating,notes,album_id) VALUES(?,?,?,?)')
      .run(...fields, albumId).lastInsertRowid
  )
}
export function removeListen(albumId: number, id: number): void {
  albumExists(albumId)
  getSqlite().prepare('DELETE FROM music_listen WHERE id=? AND album_id=?').run(id, albumId)
}
export function tags(): string[] {
  return (
    getSqlite()
      .prepare(
        `SELECT DISTINCT value AS tag FROM (
    SELECT value FROM music_album_personal p,json_each(p.tags_json)
    UNION SELECT value FROM music_track_personal p,json_each(p.tags_json)) ORDER BY tag`
      )
      .all() as { tag: string }[]
  ).map((r) => r.tag)
}
export function list(input: MusicJournalFilter): { items: MusicJournalAlbum[]; total: number } {
  const search = textValue(input.search, 'search', 300).toLowerCase()
  const shelf = choice(input.shelf, ['all', 'rated', 'want', 'exploring', 'revisit'], 'shelf')
  const filters = [
    '(p.album_id IS NOT NULL OR EXISTS(SELECT 1 FROM music_listen l WHERE l.album_id=a.id))'
  ]
  const params: (string | number)[] = []
  if (shelf === 'rated') filters.push('p.rating IS NOT NULL')
  else if (shelf !== 'all') {
    filters.push('p.shelf=?')
    params.push(shelf)
  }
  if (search) {
    filters.push('(instr(lower(a.title),?)>0 OR instr(lower(ar.name),?)>0)')
    params.push(search, search)
  }
  const from = `FROM music_album a JOIN music_artist ar ON ar.id=a.artist_id
    LEFT JOIN music_album_personal p ON p.album_id=a.id WHERE ${filters.join(' AND ')}`
  const db = getSqlite()
  const rows = db
    .prepare(
      `SELECT a.id,a.artist_id AS artistId,ar.name AS artistName,a.title,a.year,a.cover_path AS coverPath,
    (SELECT COUNT(*) FROM music_track t WHERE t.album_id=a.id) AS trackCount,
    p.rating,p.shelf,COALESCE(p.review,'') AS review,COALESCE(p.tags_json,'[]') AS tagsJson,
    (SELECT COUNT(*) FROM music_listen l WHERE l.album_id=a.id) AS listenCount,
    (SELECT MAX(listened_on) FROM music_listen l WHERE l.album_id=a.id) AS lastListenedOn
    ${from} ORDER BY lastListenedOn DESC,p.rating DESC,a.title COLLATE NOCASE,a.id LIMIT 50 OFFSET ?`
    )
    .all(...params, validPage(input.page) * 50) as (Omit<MusicJournalAlbum, 'tags'> & {
    tagsJson: string
  })[]
  return {
    items: rows.map(({ tagsJson, ...r }) => ({ ...r, tags: JSON.parse(tagsJson) })),
    total: (db.prepare(`SELECT COUNT(*) AS n ${from}`).get(...params) as { n: number }).n
  }
}
