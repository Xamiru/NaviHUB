import { getSqlite } from '../db/connection'
import { normalizeMusicTags } from '@shared/musicPersonal'
import type { MusicTrackPersonal } from '@shared/types'

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
function trackExists(id: number): void {
  if (!getSqlite().prepare('SELECT 1 FROM music_track WHERE id=?').get(id))
    throw new Error('Track not found')
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
/** Track ids marked as standout on one album, for the album page's markers. */
export function standouts(albumId: number): number[] {
  return (getSqlite().prepare(
    `SELECT p.track_id AS id FROM music_track_personal p JOIN music_track t ON t.id=p.track_id
     WHERE t.album_id=? AND p.standout=1`
  ).all(albumId) as { id: number }[]).map((row) => row.id)
}
export function tags(): string[] {
  return (
    getSqlite()
      .prepare(
        `SELECT DISTINCT value AS tag FROM music_track_personal p,json_each(p.tags_json) ORDER BY tag`
      )
      .all() as { tag: string }[]
  ).map((r) => r.tag)
}
