// This machine's personal layer over the curated History content: reading
// marks, private notes, the user's own title links, archive files and the
// entities written in the in-app editor. Refs are content `kind:slug`
// strings, so nothing here has a foreign key to the content; a ref whose
// entity was removed is simply never asked for again.

import { getSqlite } from '../db/connection'
import type { HistoryEntity } from '@shared/history/schema'
import type {
  HistoryMark,
  HistoryNote,
  HistoryNoteKind,
  HistoryUserEntity
} from '@shared/types'

// ---- marks ----

interface MarkRow {
  ref: string
  read_at: string | null
  favorite: number
}

export function marks(): Map<string, HistoryMark> {
  const rows = getSqlite().prepare('SELECT ref, read_at, favorite FROM history_mark').all() as MarkRow[]
  return new Map(rows.map((r) => [r.ref, { read: r.read_at, favorite: r.favorite === 1 }]))
}

export function mark(ref: string): HistoryMark {
  const r = getSqlite().prepare('SELECT ref, read_at, favorite FROM history_mark WHERE ref = ?').get(ref) as
    | MarkRow
    | undefined
  return { read: r?.read_at ?? null, favorite: r?.favorite === 1 }
}

/** `read` stamps or clears the read date; `favorite` toggles the flag. */
export function setMark(ref: string, field: 'read' | 'favorite', value: boolean): HistoryMark {
  const db = getSqlite()
  db.prepare('INSERT OR IGNORE INTO history_mark (ref) VALUES (?)').run(ref)
  if (field === 'read') {
    db.prepare(
      `UPDATE history_mark SET read_at = CASE WHEN ? THEN COALESCE(read_at, datetime('now')) ELSE NULL END,
       updated_at = datetime('now') WHERE ref = ?`
    ).run(value ? 1 : 0, ref)
  } else {
    db.prepare("UPDATE history_mark SET favorite = ?, updated_at = datetime('now') WHERE ref = ?").run(value ? 1 : 0, ref)
  }
  db.prepare('DELETE FROM history_mark WHERE ref = ? AND read_at IS NULL AND favorite = 0').run(ref)
  return mark(ref)
}

// ---- notes ----

interface NoteRow {
  ref: string
  body: string
  kind: HistoryNoteKind
  updated_at: string
}

const toNote = (r: NoteRow): HistoryNote => ({ ref: r.ref, body: r.body, kind: r.kind, updatedAt: r.updated_at })

export function note(ref: string): HistoryNote | null {
  const r = getSqlite().prepare('SELECT * FROM history_note WHERE ref = ?').get(ref) as NoteRow | undefined
  return r ? toNote(r) : null
}

export function notes(kind?: HistoryNoteKind): HistoryNote[] {
  const db = getSqlite()
  const rows = (
    kind
      ? db.prepare('SELECT * FROM history_note WHERE kind = ? ORDER BY updated_at DESC').all(kind)
      : db.prepare('SELECT * FROM history_note ORDER BY updated_at DESC').all()
  ) as NoteRow[]
  return rows.map(toNote)
}

/** An empty body removes the note. */
export function saveNote(ref: string, body: string, kind: HistoryNoteKind): HistoryNote | null {
  const db = getSqlite()
  const text = body.trim()
  if (!text) {
    db.prepare('DELETE FROM history_note WHERE ref = ?').run(ref)
    return null
  }
  db.prepare(
    `INSERT INTO history_note (ref, body, kind) VALUES (?, ?, ?)
     ON CONFLICT(ref) DO UPDATE SET body = excluded.body, kind = excluded.kind, updated_at = datetime('now')`
  ).run(ref, text, kind)
  return note(ref)
}

// ---- the user's own title links ----

export interface PersonalMediaLinkRow {
  id: number
  ref: string
  mediaId: number
  kind: string
}

export function personalLinks(): PersonalMediaLinkRow[] {
  return getSqlite()
    .prepare('SELECT id, ref, media_id AS mediaId, kind FROM history_media_link ORDER BY id')
    .all() as PersonalMediaLinkRow[]
}

export function personalLinksForMedia(mediaId: number): PersonalMediaLinkRow[] {
  return getSqlite()
    .prepare('SELECT id, ref, media_id AS mediaId, kind FROM history_media_link WHERE media_id = ? ORDER BY id')
    .all(mediaId) as PersonalMediaLinkRow[]
}

export function addPersonalLink(ref: string, mediaId: number, kind: string): number {
  const db = getSqlite()
  db.prepare('INSERT OR IGNORE INTO history_media_link (ref, media_id, kind) VALUES (?, ?, ?)').run(ref, mediaId, kind)
  const row = db
    .prepare('SELECT id FROM history_media_link WHERE ref = ? AND media_id = ? AND kind = ?')
    .get(ref, mediaId, kind) as { id: number }
  return row.id
}

export function removePersonalLink(id: number): void {
  getSqlite().prepare('DELETE FROM history_media_link WHERE id = ?').run(id)
}

// ---- archive files ----

export interface ArchiveRow {
  id: number
  ref: string
  kind: 'video' | 'audio' | 'image' | 'document'
  relPath: string
  title: string
  credit: string | null
  license: string | null
  page: string | null
  suggestionKey: string | null
  sha256: string | null
  bytes: number | null
  createdAt: string
}

const ARCHIVE_COLS = `id, ref, kind, rel_path AS relPath, title, credit, license, page,
  suggestion_key AS suggestionKey, sha256, bytes, created_at AS createdAt`

export function archiveRows(): ArchiveRow[] {
  return getSqlite().prepare(`SELECT ${ARCHIVE_COLS} FROM history_archive ORDER BY id`).all() as ArchiveRow[]
}

export function archiveForRef(ref: string): ArchiveRow[] {
  return getSqlite()
    .prepare(`SELECT ${ARCHIVE_COLS} FROM history_archive WHERE ref = ? ORDER BY id`)
    .all(ref) as ArchiveRow[]
}

export function archiveRow(id: number): ArchiveRow | null {
  return (getSqlite().prepare(`SELECT ${ARCHIVE_COLS} FROM history_archive WHERE id = ?`).get(id) as ArchiveRow) ?? null
}

export function addArchive(row: Omit<ArchiveRow, 'id' | 'createdAt'>): number {
  const info = getSqlite()
    .prepare(
      `INSERT INTO history_archive (ref, kind, rel_path, title, credit, license, page, suggestion_key, sha256, bytes)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      row.ref,
      row.kind,
      row.relPath,
      row.title,
      row.credit,
      row.license,
      row.page,
      row.suggestionKey,
      row.sha256,
      row.bytes
    )
  return Number(info.lastInsertRowid)
}

export function removeArchive(id: number): ArchiveRow | null {
  const row = archiveRow(id)
  if (row) getSqlite().prepare('DELETE FROM history_archive WHERE id = ?').run(id)
  return row
}

// ---- personal entities ----

interface EntityRow {
  id: string
  kind: string
  json: string
}

/** Rows that fail to parse are skipped rather than taking the section down. */
export function userEntities(): HistoryUserEntity[] {
  const rows = getSqlite().prepare('SELECT id, kind, json FROM history_user_entity ORDER BY id').all() as EntityRow[]
  const out: HistoryUserEntity[] = []
  for (const r of rows) {
    try {
      const e = JSON.parse(r.json) as HistoryUserEntity
      if (e && e.id === r.id && e.kind === r.kind) out.push(e)
    } catch {
      // A corrupt row is ignored; the editor can overwrite it.
    }
  }
  return out
}

export function userEntity(id: string): HistoryUserEntity | null {
  return userEntities().find((e) => e.id === id) ?? null
}

export function saveUserEntity(entity: HistoryUserEntity): void {
  getSqlite()
    .prepare(
      `INSERT INTO history_user_entity (id, kind, json) VALUES (?, ?, ?)
       ON CONFLICT(id) DO UPDATE SET kind = excluded.kind, json = excluded.json, updated_at = datetime('now')`
    )
    .run(entity.id, entity.kind, JSON.stringify(entity))
}

export function removeUserEntity(id: string): void {
  const db = getSqlite()
  db.transaction(() => {
    db.prepare('DELETE FROM history_user_entity WHERE id = ?').run(id)
  })()
}

/** A fresh `my-` id: the slug of the name plus a counter when taken. */
export function nextUserId(kind: HistoryEntity['kind'], name: string): string {
  const base =
    'my-' +
    (name
      .normalize('NFKD')
      .replace(/\p{M}/gu, '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '')
      .slice(0, 60) || kind)
  const taken = new Set(
    (getSqlite().prepare("SELECT id FROM history_user_entity WHERE id LIKE 'my-%'").all() as { id: string }[]).map(
      (r) => r.id
    )
  )
  if (!taken.has(base)) return base
  for (let i = 2; ; i++) if (!taken.has(`${base}-${i}`)) return `${base}-${i}`
}

