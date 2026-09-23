import { createHash } from 'crypto'
import { getSqlite } from '../db/connection'
import { requireNode, requireVn } from './vnReadingRepo'
import { dateValue, textValue } from './hobbyValidation'
import type { VnCaptureInput, VnCapture, VnCaptureSummary } from '@shared/types'
export function list(mediaId: number): VnCaptureSummary[] {
  requireVn(mediaId)
  return getSqlite()
    .prepare(
      `SELECT id,title,node_id AS nodeId,captured_on AS capturedOn,length(body) AS characters
    FROM vn_text_capture WHERE media_id=? ORDER BY id DESC`
    )
    .all(mediaId) as VnCaptureSummary[]
}
export function get(mediaId: number, id: number): VnCapture {
  requireVn(mediaId)
  const row = getSqlite()
    .prepare(
      'SELECT id,title,body,node_id AS nodeId,captured_on AS capturedOn FROM vn_text_capture WHERE id=? AND media_id=?'
    )
    .get(id, mediaId)
  if (!row) throw new Error('Text capture not found')
  return row as VnCapture
}
export function invalidate(mediaId: number): void {
  const db = getSqlite()
  db.prepare('DELETE FROM jp_coverage_word WHERE media_id=?').run(mediaId)
  db.prepare('DELETE FROM jp_coverage WHERE media_id=?').run(mediaId)
}
export function save(mediaId: number, id: number | null, input: VnCaptureInput): number {
  requireVn(mediaId)
  requireNode(mediaId, input.nodeId)
  if (id !== null) get(mediaId, id)
  const title = textValue(input.title, 'Capture title', 300, true)
  const body = textValue(input.body, 'captured text', 200000, true).replace(/\r\n?/g, '\n')
  const date = dateValue(input.capturedOn, true)
  const hash = createHash('sha256').update(body).digest('hex')
  const db = getSqlite()
  const existing = db
    .prepare('SELECT id FROM vn_text_capture WHERE media_id=? AND fingerprint=?')
    .get(mediaId, hash) as { id: number } | undefined
  if (existing && existing.id !== id)
    throw new Error(
      'This text has already been captured for this visual novel. Open the existing capture to edit it.'
    )
  return db.transaction(() => {
    invalidate(mediaId)
    if (id !== null) {
      db.prepare(
        'UPDATE vn_text_capture SET title=?,body=?,node_id=?,captured_on=?,fingerprint=? WHERE id=? AND media_id=?'
      ).run(title, body, input.nodeId, date, hash, id, mediaId)
      return id
    }
    return Number(
      db
        .prepare(
          'INSERT INTO vn_text_capture(media_id,title,body,node_id,captured_on,fingerprint) VALUES(?,?,?,?,?,?)'
        )
        .run(mediaId, title, body, input.nodeId, date, hash).lastInsertRowid
    )
  })()
}
export function remove(mediaId: number, id: number): void {
  get(mediaId, id)
  getSqlite().transaction(() => {
    invalidate(mediaId)
    getSqlite().prepare('DELETE FROM vn_text_capture WHERE id=? AND media_id=?').run(id, mediaId)
  })()
}
