import { getSqlite } from '../db/connection'

// Hearted anime episodes (media_episode_favorite). Keyed by episode number, so
// a favorite exists whether or not a folder is linked and survives rescan and
// Unlink. Personal and purely a mark: it never touches watched state, progress
// or the checklist.

export function list(mediaId: number): number[] {
  return (
    getSqlite()
      .prepare('SELECT number FROM media_episode_favorite WHERE media_id = ? ORDER BY number')
      .all(mediaId) as { number: number }[]
  ).map((r) => r.number)
}

export function set(mediaId: number, number: number, favorite: boolean): void {
  if (!Number.isInteger(mediaId) || mediaId <= 0) throw new Error('Invalid title')
  if (!Number.isInteger(number) || number < 1 || number > 100_000) {
    throw new Error('Invalid episode number')
  }
  const db = getSqlite()
  if (favorite) {
    db.prepare(
      'INSERT OR IGNORE INTO media_episode_favorite (media_id, number) VALUES (?, ?)'
    ).run(mediaId, number)
  } else {
    db.prepare('DELETE FROM media_episode_favorite WHERE media_id = ? AND number = ?').run(
      mediaId,
      number
    )
  }
}
