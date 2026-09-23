import { getSqlite } from '../db/connection'
import { choice, dateValue, textValue } from './hobbyValidation'
import type { GameRun, GameRunInput, GameRunHistory, GameRunNoteInput } from '@shared/types'

function game(mediaId: number): void {
  if (
    !getSqlite().prepare("SELECT 1 FROM media_item WHERE id=? AND media_type='game'").get(mediaId)
  )
    throw new Error('Game not found')
}
function run(mediaId: number, id: number): void {
  game(mediaId)
  if (
    !getSqlite()
      .prepare('SELECT 1 FROM game_playthrough WHERE id=? AND media_id=?')
      .get(id, mediaId)
  )
    throw new Error('Playthrough not found for this game')
}
export function activeId(mediaId: number): number | null {
  const row = getSqlite()
    .prepare("SELECT id FROM game_playthrough WHERE media_id=? AND state='active'")
    .get(mediaId) as { id: number } | undefined
  return row?.id ?? null
}
export function list(mediaId: number): GameRun[] {
  game(mediaId)
  return getSqlite()
    .prepare(
      `SELECT r.id, r.media_id AS mediaId, r.title, r.kind, r.state,
    r.difficulty, r.build, r.objective, r.stopped_at AS stoppedAt, r.notes,
    r.created_at AS createdAt, r.updated_at AS updatedAt,
    COUNT(s.id) AS sessionCount, COALESCE(SUM(s.duration),0) AS totalSeconds
    FROM game_playthrough r LEFT JOIN game_playthrough_session l ON l.run_id=r.id
    LEFT JOIN game_session s ON s.id=l.session_id WHERE r.media_id=? GROUP BY r.id
    ORDER BY CASE r.state WHEN 'active' THEN 0 WHEN 'paused' THEN 1 ELSE 2 END, r.id DESC`
    )
    .all(mediaId) as GameRun[]
}
export function save(mediaId: number, id: number | null, input: GameRunInput): number {
  game(mediaId)
  if (id != null) run(mediaId, id)
  const title = textValue(input.title, 'playthrough name', 200, true)
  const kind = choice(input.kind, ['first', 'replay', 'newGamePlus'], 'playthrough kind')
  const state = choice(input.state, ['active', 'paused', 'completed'], 'playthrough state')
  const fields = [
    title,
    kind,
    state,
    textValue(input.difficulty, 'difficulty', 200),
    textValue(input.build, 'build', 2000),
    textValue(input.objective, 'objective', 2000),
    textValue(input.stoppedAt, 'last stop', 2000),
    textValue(input.notes, 'notes')
  ]
  const db = getSqlite()
  return db.transaction(() => {
    if (state === 'active')
      db.prepare(
        "UPDATE game_playthrough SET state='paused', updated_at=datetime('now') WHERE media_id=? AND state='active' AND id!=?"
      ).run(mediaId, id ?? -1)
    if (id != null) {
      db.prepare(
        `UPDATE game_playthrough SET title=?,kind=?,state=?,difficulty=?,build=?,objective=?,
        stopped_at=?,notes=?,updated_at=datetime('now') WHERE id=? AND media_id=?`
      ).run(...fields, id, mediaId)
      return id
    }
    return Number(
      db
        .prepare(
          `INSERT INTO game_playthrough(title,kind,state,difficulty,build,objective,stopped_at,notes,media_id)
      VALUES(?,?,?,?,?,?,?,?,?)`
        )
        .run(...fields, mediaId).lastInsertRowid
    )
  })()
}
export function remove(mediaId: number, id: number): void {
  run(mediaId, id)
  // Links and notes cascade; the underlying play sessions and their totals survive.
  getSqlite().prepare('DELETE FROM game_playthrough WHERE id=? AND media_id=?').run(id, mediaId)
}
export function assignSession(mediaId: number, sessionId: number, runId: number | null): void {
  game(mediaId)
  const db = getSqlite()
  if (!db.prepare('SELECT 1 FROM game_session WHERE id=? AND media_id=?').get(sessionId, mediaId))
    throw new Error('Session not found for this game')
  if (runId == null)
    db.prepare('DELETE FROM game_playthrough_session WHERE session_id=?').run(sessionId)
  else {
    run(mediaId, runId)
    db.prepare(
      `INSERT INTO game_playthrough_session(session_id,run_id) VALUES(?,?)
      ON CONFLICT(session_id) DO UPDATE SET run_id=excluded.run_id`
    ).run(sessionId, runId)
  }
}
export function history(mediaId: number, runId: number | null, page = 0): GameRunHistory {
  game(mediaId)
  if (runId != null) run(mediaId, runId)
  if (!Number.isInteger(page) || page < 0 || page > 100000) throw new Error('Invalid history page')
  const db = getSqlite()
  const filter = runId == null ? '' : ' AND l.run_id=?'
  const params = runId == null ? [mediaId] : [mediaId, runId]
  const from = `FROM game_session s LEFT JOIN game_playthrough_session l ON l.session_id=s.id
    LEFT JOIN game_playthrough r ON r.id=l.run_id WHERE s.media_id=?${filter}`
  const noteFilter = runId == null ? 'r.media_id=?' : 'r.media_id=? AND n.run_id=?'
  const noteFrom = `FROM game_playthrough_note n JOIN game_playthrough r ON r.id=n.run_id WHERE ${noteFilter}`
  return {
    sessions: db
      .prepare(
        `SELECT s.id,s.started_at AS startedAt,s.ended_at AS endedAt,s.duration,
      l.run_id AS runId,r.title AS runTitle ${from} ORDER BY s.started_at DESC,s.id DESC LIMIT 50 OFFSET ?`
      )
      .all(...params, page * 50) as GameRunHistory['sessions'],
    sessionTotal: (db.prepare(`SELECT COUNT(*) AS n ${from}`).get(...params) as { n: number }).n,
    notes: db
      .prepare(
        `SELECT n.id,n.run_id AS runId,n.entry_date AS entryDate,n.body ${noteFrom}
      ORDER BY n.entry_date DESC,n.id DESC LIMIT 50 OFFSET ?`
      )
      .all(...params, page * 50) as GameRunHistory['notes'],
    noteTotal: (db.prepare(`SELECT COUNT(*) AS n ${noteFrom}`).get(...params) as { n: number }).n
  }
}
export function saveNote(
  mediaId: number,
  runId: number,
  id: number | null,
  input: GameRunNoteInput
): number {
  run(mediaId, runId)
  const date = dateValue(input.entryDate, true)
  const body = textValue(input.body, 'journal entry', 10000, true)
  const db = getSqlite()
  if (id != null) {
    if (
      !db
        .prepare('UPDATE game_playthrough_note SET entry_date=?,body=? WHERE id=? AND run_id=?')
        .run(date, body, id, runId).changes
    )
      throw new Error('Journal entry not found')
    return id
  }
  return Number(
    db
      .prepare('INSERT INTO game_playthrough_note(run_id,entry_date,body) VALUES(?,?,?)')
      .run(runId, date, body).lastInsertRowid
  )
}
export function removeNote(mediaId: number, runId: number, id: number): void {
  run(mediaId, runId)
  getSqlite().prepare('DELETE FROM game_playthrough_note WHERE id=? AND run_id=?').run(id, runId)
}
