import { getSqlite } from '../db/connection'
import type {
  VnReadingNode,
  VnReadingNodeInput,
  VnReadingOverview,
  VnReadingResume,
  VnNoteInput,
  VnNote,
  VnNotePage
} from '@shared/types'
import { assertOrder, choice, dateValue, textValue } from './hobbyValidation'

export function requireVn(mediaId: number): { title: string; notes: string | null } {
  const row = getSqlite()
    .prepare("SELECT title, notes FROM media_item WHERE id=? AND media_type='visual_novel'")
    .get(mediaId)
  if (!row) throw new Error('Visual novel not found')
  return row as { title: string; notes: string | null }
}
export function requireNode(mediaId: number, nodeId: number | null): void {
  if (
    nodeId !== null &&
    !getSqlite()
      .prepare('SELECT id FROM vn_reading_node WHERE id=? AND media_id=?')
      .get(nodeId, mediaId)
  ) {
    throw new Error('Reading entry does not belong to this visual novel')
  }
}
const NODE_SQL = `SELECT id,parent_id AS parentId,kind,title,status,rating,notes,
  completed_on AS completedOn,sort_order AS sortOrder FROM vn_reading_node WHERE media_id=? ORDER BY sort_order,id`
export function overview(mediaId: number): VnReadingOverview {
  const media = requireVn(mediaId)
  return {
    title: media.title,
    generalNotes: media.notes,
    nodes: getSqlite().prepare(NODE_SQL).all(mediaId) as VnReadingNode[],
    resume: (getSqlite()
      .prepare(
        'SELECT node_id AS nodeId,save_slot AS saveSlot,recap FROM vn_reading_resume WHERE media_id=?'
      )
      .get(mediaId) as VnReadingResume) ?? { nodeId: null, saveSlot: '', recap: '' }
  }
}
export function saveNode(mediaId: number, id: number | null, input: VnReadingNodeInput): number {
  requireVn(mediaId)
  requireNode(mediaId, id)
  requireNode(mediaId, input.parentId)
  const kind = choice(input.kind, ['route', 'chapter', 'ending'], 'entry kind')
  const status = choice(
    input.status,
    ['planned', 'reading', 'completed', 'skipped'],
    'entry status'
  )
  const title = textValue(input.title, 'Title', 300, true)
  const notes = textValue(input.notes, 'notes')
  if (
    input.rating !== null &&
    (!Number.isFinite(input.rating) || input.rating < 0 || input.rating > 10)
  )
    throw new Error('Rating must be between 0 and 10')
  const completedOn = status === 'completed' ? dateValue(input.completedOn, true) : null
  if (input.parentId !== null) {
    const parent = getSqlite()
      .prepare('SELECT kind FROM vn_reading_node WHERE id=?')
      .get(input.parentId) as { kind: string }
    if (parent.kind !== 'route') throw new Error('The parent must be a route')
    let cursor: number | null = input.parentId
    const seen = new Set<number>()
    while (cursor !== null) {
      if (cursor === id || seen.has(cursor))
        throw new Error('A reading entry cannot contain itself')
      seen.add(cursor)
      cursor = (
        getSqlite().prepare('SELECT parent_id FROM vn_reading_node WHERE id=?').get(cursor) as {
          parent_id: number | null
        }
      ).parent_id
    }
  }
  if (
    id !== null &&
    kind !== 'route' &&
    getSqlite().prepare('SELECT id FROM vn_reading_node WHERE parent_id=? LIMIT 1').get(id)
  ) {
    throw new Error('Move this route’s children before changing its kind')
  }
  if (id !== null) {
    getSqlite()
      .prepare(
        `UPDATE vn_reading_node SET parent_id=?,kind=?,title=?,status=?,rating=?,notes=?,completed_on=? WHERE id=? AND media_id=?`
      )
      .run(input.parentId, kind, title, status, input.rating, notes, completedOn, id, mediaId)
    return id
  }
  return Number(
    getSqlite()
      .prepare(
        `INSERT INTO vn_reading_node(media_id,parent_id,kind,title,status,rating,notes,completed_on,sort_order)
    VALUES(?,?,?,?,?,?,?,?,(SELECT COALESCE(MAX(sort_order),-1)+1 FROM vn_reading_node WHERE media_id=?))`
      )
      .run(mediaId, input.parentId, kind, title, status, input.rating, notes, completedOn, mediaId)
      .lastInsertRowid
  )
}
export function removeNode(mediaId: number, id: number): void {
  requireVn(mediaId)
  requireNode(mediaId, id)
  getSqlite().prepare('DELETE FROM vn_reading_node WHERE id=? AND media_id=?').run(id, mediaId)
}
export function reorder(mediaId: number, ids: number[]): void {
  const actual = overview(mediaId).nodes.map((n) => n.id)
  assertOrder(ids, actual)
  const db = getSqlite()
  db.transaction(() => {
    const stmt = db.prepare('UPDATE vn_reading_node SET sort_order=? WHERE id=? AND media_id=?')
    ids.forEach((id, i) => stmt.run(i, id, mediaId))
  })()
}
export function saveResume(mediaId: number, input: VnReadingResume): void {
  requireVn(mediaId)
  requireNode(mediaId, input.nodeId)
  getSqlite()
    .prepare(
      `INSERT INTO vn_reading_resume(media_id,node_id,save_slot,recap) VALUES(?,?,?,?)
    ON CONFLICT(media_id) DO UPDATE SET node_id=excluded.node_id,save_slot=excluded.save_slot,recap=excluded.recap`
    )
    .run(
      mediaId,
      input.nodeId,
      textValue(input.saveSlot, 'save slot', 300),
      textValue(input.recap, 'recap')
    )
}
export function notes(mediaId: number, page = 1): VnNotePage {
  requireVn(mediaId)
  if (!Number.isSafeInteger(page) || page < 1) throw new Error('Invalid page')
  const db = getSqlite()
  return {
    notes: db
      .prepare(
        `SELECT id,node_id AS nodeId,entry_date AS entryDate,category,body,image_data AS imageData
      FROM vn_notebook WHERE media_id=? ORDER BY entry_date DESC,id DESC LIMIT 20 OFFSET ?`
      )
      .all(mediaId, (page - 1) * 20) as VnNote[],
    total: (
      db.prepare('SELECT COUNT(*) AS n FROM vn_notebook WHERE media_id=?').get(mediaId) as {
        n: number
      }
    ).n
  }
}
export function saveNote(mediaId: number, id: number | null, input: VnNoteInput): number {
  requireVn(mediaId)
  requireNode(mediaId, input.nodeId)
  const db = getSqlite()
  if (
    id !== null &&
    !db.prepare('SELECT id FROM vn_notebook WHERE id=? AND media_id=?').get(id, mediaId)
  )
    throw new Error('Notebook entry not found')
  const category = choice(
    input.category,
    ['reaction', 'theory', 'question', 'quote', 'recap'],
    'note category'
  )
  const body = textValue(input.body, 'Note', 20000, true)
  const date = dateValue(input.entryDate, true)
  // Inline raster attachments are wiped with the personal row, never copied to shared export assets.
  const image = input.imageData
  if (
    image !== null &&
    (typeof image !== 'string' ||
      image.length > 2800000 ||
      !/^data:image\/(png|jpeg|webp);base64,[A-Za-z0-9+/]+={0,2}$/.test(image))
  )
    throw new Error('Attach a PNG, JPEG or WebP image under 2 MB')
  if (id !== null) {
    db.prepare(
      'UPDATE vn_notebook SET node_id=?,entry_date=?,category=?,body=?,image_data=? WHERE id=? AND media_id=?'
    ).run(input.nodeId, date, category, body, image, id, mediaId)
    return id
  }
  return Number(
    db
      .prepare(
        'INSERT INTO vn_notebook(media_id,node_id,entry_date,category,body,image_data) VALUES(?,?,?,?,?,?)'
      )
      .run(mediaId, input.nodeId, date, category, body, image).lastInsertRowid
  )
}
export function removeNote(mediaId: number, id: number): void {
  requireVn(mediaId)
  getSqlite().prepare('DELETE FROM vn_notebook WHERE id=? AND media_id=?').run(id, mediaId)
}
