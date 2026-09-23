import { getSqlite } from '../db/connection'
import { choice, textValue } from './hobbyValidation'
import { soundtrackTracks } from './musicRepo'
import type {
  MusicTrack,
  SoundtrackInput,
  SoundtrackLink,
  SoundtrackOwner,
  SoundtrackTarget
} from '@shared/types'
const entities = {
  album: { table: 'music_album', title: 'title' },
  track: { table: 'music_track', title: 'title' },
  media: { table: 'media_item', title: 'title' },
  wrestler: { table: 'wrestling_wrestler', title: 'name' }
} as const
function requireOwner(owner: SoundtrackOwner): void {
  const kind = choice(owner.kind, ['album', 'track', 'media', 'wrestler'] as const, 'Link kind')
  if (
    !Number.isSafeInteger(owner.id) ||
    owner.id <= 0 ||
    !getSqlite().prepare(`SELECT id FROM ${entities[kind].table} WHERE id=?`).get(owner.id)
  )
    throw new Error('Linked item no longer exists')
}
export function search(kind: SoundtrackOwner['kind'], query: string): SoundtrackTarget[] {
  choice(kind, ['album', 'track', 'media', 'wrestler'] as const, 'Link kind')
  const q = `%${textValue(query, 'Search', 200)}%`
  const db = getSqlite()
  if (kind === 'album')
    return db
      .prepare(
        `SELECT 'album' AS kind,a.id,a.title,ar.name AS detail,NULL AS mediaType,a.id AS albumId FROM music_album a JOIN music_artist ar ON ar.id=a.artist_id WHERE a.title LIKE ? OR ar.name LIKE ? ORDER BY a.title LIMIT 40`
      )
      .all(q, q) as SoundtrackTarget[]
  if (kind === 'track')
    return db
      .prepare(
        `SELECT 'track' AS kind,t.id,t.title,ar.name || ' / ' || a.title AS detail,NULL AS mediaType,a.id AS albumId FROM music_track t JOIN music_album a ON a.id=t.album_id JOIN music_artist ar ON ar.id=t.artist_id WHERE t.title LIKE ? OR a.title LIKE ? ORDER BY t.title LIMIT 40`
      )
      .all(q, q) as SoundtrackTarget[]
  if (kind === 'media')
    return db
      .prepare(
        `SELECT 'media' AS kind,id,title,media_type AS detail,media_type AS mediaType,NULL AS albumId FROM media_item WHERE title LIKE ? OR title_original LIKE ? ORDER BY title LIMIT 40`
      )
      .all(q, q) as SoundtrackTarget[]
  return db
    .prepare(
      `SELECT 'wrestler' AS kind,id,name AS title,'Wrestler' AS detail,NULL AS mediaType,NULL AS albumId FROM wrestling_wrestler WHERE name LIKE ? ORDER BY name LIMIT 40`
    )
    .all(q) as SoundtrackTarget[]
}
const select = `SELECT l.*,COALESCE(t.title,a.title) AS music_title,COALESCE(l.album_id,t.album_id) AS music_album_id,
  COALESCE(m.title,w.name) AS target_title,m.media_type FROM soundtrack_link l LEFT JOIN music_album a ON a.id=l.album_id
  LEFT JOIN music_track t ON t.id=l.track_id LEFT JOIN media_item m ON m.id=l.media_id LEFT JOIN wrestling_wrestler w ON w.id=l.wrestler_id`
function map(row: Record<string, unknown>): SoundtrackLink {
  return {
    id: row.id as number,
    music: row.album_id
      ? { kind: 'album', id: row.album_id as number }
      : { kind: 'track', id: row.track_id as number },
    target: row.media_id
      ? { kind: 'media', id: row.media_id as number }
      : { kind: 'wrestler', id: row.wrestler_id as number },
    label: row.label as string,
    notes: row.notes as string,
    musicTitle: row.music_title as string,
    albumId: row.music_album_id as number,
    targetTitle: row.target_title as string,
    mediaType: row.media_type as SoundtrackLink['mediaType']
  }
}
export function list(owner: SoundtrackOwner): SoundtrackLink[] {
  requireOwner(owner)
  const where = owner.kind === 'album' ? '(l.album_id=? OR t.album_id=?)' : `l.${owner.kind}_id=?`
  const args = owner.kind === 'album' ? [owner.id, owner.id] : [owner.id]
  return (
    getSqlite()
      .prepare(`${select} WHERE ${where} ORDER BY l.id`)
      .all(...args) as Record<string, unknown>[]
  ).map(map)
}
export function save(id: number | null, input: SoundtrackInput): number {
  choice(input.music.kind, ['album', 'track'] as const, 'Music kind')
  choice(input.target.kind, ['media', 'wrestler'] as const, 'Target kind')
  requireOwner(input.music)
  requireOwner(input.target)
  const db = getSqlite()
  const label = textValue(input.label, 'Relationship label', 150)
  const notes = textValue(input.notes, 'Link notes', 10000)
  const values = [
    input.music.kind === 'album' ? input.music.id : null,
    input.music.kind === 'track' ? input.music.id : null,
    input.target.kind === 'media' ? input.target.id : null,
    input.target.kind === 'wrestler' ? input.target.id : null,
    label,
    notes
  ]
  if (id !== null) {
    if (!db.prepare('SELECT id FROM soundtrack_link WHERE id=?').get(id))
      throw new Error('Link no longer exists')
    db.prepare(
      'UPDATE soundtrack_link SET album_id=?,track_id=?,media_id=?,wrestler_id=?,label=?,notes=? WHERE id=?'
    ).run(...values, id)
    return id
  }
  const exists = db
    .prepare(
      'SELECT id FROM soundtrack_link WHERE album_id IS ? AND track_id IS ? AND media_id IS ? AND wrestler_id IS ?'
    )
    .get(...values.slice(0, 4))
  if (exists) throw new Error('These items are already linked. Edit the existing link.')
  return Number(
    db
      .prepare(
        'INSERT INTO soundtrack_link(album_id,track_id,media_id,wrestler_id,label,notes) VALUES(?,?,?,?,?,?)'
      )
      .run(...values).lastInsertRowid
  )
}
export function remove(id: number): void {
  getSqlite().prepare('DELETE FROM soundtrack_link WHERE id=?').run(id)
}
export function tracks(id: number): MusicTrack[] {
  const row = getSqlite()
    .prepare('SELECT album_id,track_id FROM soundtrack_link WHERE id=?')
    .get(id) as { album_id: number | null; track_id: number | null } | undefined
  if (!row) throw new Error('Soundtrack link no longer exists')
  return soundtrackTracks(row.album_id ? 'album' : 'track', row.album_id ?? row.track_id!)
}
