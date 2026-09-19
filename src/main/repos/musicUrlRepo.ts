import { getSqlite } from '../db/connection'
import type { MusicDownloadInput, MusicUrlQueueItem, SpotifyDownloadQueueCard } from '@shared/types'

export function addUrlJob(input: MusicDownloadInput): number {
  const db = getSqlite()
  const existing = db.prepare(`SELECT q.id FROM music_url_job j JOIN music_spotify_download_queue q ON q.id=j.queue_id WHERE j.input_json=? AND q.state!='completed'`).get(JSON.stringify(input)) as { id: number } | undefined
  if (existing) return existing.id
  return db.transaction(() => {
    const id = Number(db.prepare(`INSERT INTO music_spotify_download_queue(source_kind,position) VALUES('url',(SELECT COALESCE(MAX(position),-1)+1 FROM music_spotify_download_queue))`).run().lastInsertRowid)
    db.prepare('INSERT INTO music_url_job(queue_id,input_json) VALUES(?,?)').run(id, JSON.stringify(input))
    return id
  })()
}
export function urlJob(id: number): { input: MusicDownloadInput; complete: boolean } {
  const row = getSqlite().prepare('SELECT * FROM music_url_job WHERE queue_id=?').get(id) as { input_json: string; enumeration_complete: number } | undefined
  if (!row) throw new Error('That URL download no longer exists')
  return { input: JSON.parse(row.input_json), complete: Boolean(row.enumeration_complete) }
}
export function urlItems(id: number): MusicUrlQueueItem[] {
  return (getSqlite().prepare('SELECT * FROM music_url_item WHERE queue_id=? ORDER BY position,id').all(id) as Record<string, unknown>[]).map((r) => ({
    id: Number(r.id), url: String(r.source_url), title: String(r.title), phase: r.phase as MusicUrlQueueItem['phase'],
    outputPath: r.output_path as string | null, localTrackId: r.local_track_id as number | null, error: r.error as string | null
  }))
}
export function saveEnumeration(id: number, rows: { url: string; title: string }[], complete: boolean): void {
  const db = getSqlite()
  db.transaction(() => {
    const insert = db.prepare('INSERT INTO music_url_item(queue_id,source_url,title,position,occurrence) VALUES(?,?,?,?,?) ON CONFLICT(queue_id,source_url,occurrence) DO UPDATE SET title=excluded.title,position=excluded.position')
    const occurrences = new Map<string, number>()
    const keep: number[] = []
    const find = db.prepare('SELECT id FROM music_url_item WHERE queue_id=? AND source_url=? AND occurrence=?')
    rows.forEach((row, i) => {
      const occurrence = occurrences.get(row.url) ?? 0
      occurrences.set(row.url, occurrence + 1)
      insert.run(id, row.url, row.title, i, occurrence)
      keep.push((find.get(id, row.url, occurrence) as { id: number }).id)
    })
    if (complete && !rows.length) throw new Error('A complete URL playlist must contain at least one item')
    if (complete) db.prepare(`DELETE FROM music_url_item WHERE queue_id=? AND id NOT IN (${keep.map(() => '?').join(',')})`).run(id, ...keep)
    db.prepare('UPDATE music_url_job SET enumeration_complete=? WHERE queue_id=?').run(Number(complete), id)
  })()
}
export function updateUrlItem(id: number, phase: MusicUrlQueueItem['phase'], error: string | null = null, path?: string, trackId?: number): void {
  getSqlite().prepare('UPDATE music_url_item SET phase=?,error=?,output_path=COALESCE(?,output_path),local_track_id=COALESCE(?,local_track_id) WHERE id=?')
    .run(phase, error, path ?? null, trackId ?? null, id)
}
export function urlCard(row: Record<string, unknown>): SpotifyDownloadQueueCard {
  const { input, complete } = urlJob(Number(row.id))
  const items = urlItems(Number(row.id))
  return {
    id: Number(row.id), sourceKind: 'url', entityKind: null, entityId: null, playlistId: null,
    title: input.album, subtitle: `${input.artist} · URL download`, route: '/music/downloads', sourceUrl: input.url,
    state: row.state as SpotifyDownloadQueueCard['state'], allowMismatch: false, continueAfter: Boolean(row.continue_after),
    error: row.last_error as string | null, createdAt: String(row.created_at), updatedAt: String(row.updated_at), completedAt: row.completed_at as string | null,
    trackCount: items.length, missingCount: items.filter((item) => item.phase !== 'ready' || item.localTrackId == null).length || (complete ? 0 : 1),
    missingEstimatedBytes: 0, selections: [], urlItems: items, enumerationComplete: complete
  }
}
