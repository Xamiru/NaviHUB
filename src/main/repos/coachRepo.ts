// Gacha coach persistence: chat threads/messages, goals & recurring tasks,
// coach memory notes, and imported-chat docs. Raw prepared SQL like every repo.
// LLM calls live in src/main/gachaCoach.ts; this file only touches the DB.

import { getSqlite } from '../db/connection'
import { GACHA_GAMES } from '@shared/gacha'
import type {
  GachaChatMessage,
  GachaChatThread,
  GachaCoachDoc,
  GachaCoachDueCounts,
  GachaCoachNote,
  GachaGameId,
  GachaGoal,
  GachaGoalInput
} from '@shared/types'

function parseArr<T>(value: unknown): T[] {
  try {
    const v = value ? JSON.parse(value as string) : []
    return Array.isArray(v) ? v : []
  } catch {
    return []
  }
}

// ---- threads ----

function mapThread(r: Record<string, unknown>): GachaChatThread {
  return {
    id: r.id as number,
    game: r.game as GachaGameId,
    title: (r.title as string) ?? null,
    archivedAt: (r.archived_at as string) ?? null,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string
  }
}

// The game's single active thread, creating one on first use.
export function activeThread(game: GachaGameId): GachaChatThread {
  const db = getSqlite()
  const row = db
    .prepare('SELECT * FROM gacha_chat_thread WHERE game = ? AND archived_at IS NULL ORDER BY id DESC LIMIT 1')
    .get(game) as Record<string, unknown> | undefined
  if (row) return mapThread(row)
  const info = db.prepare('INSERT INTO gacha_chat_thread (game) VALUES (?)').run(game)
  return mapThread(
    db.prepare('SELECT * FROM gacha_chat_thread WHERE id = ?').get(Number(info.lastInsertRowid)) as Record<
      string,
      unknown
    >
  )
}

// Archive the active thread and start a fresh one.
export function newThread(game: GachaGameId): GachaChatThread {
  const db = getSqlite()
  db.prepare(
    "UPDATE gacha_chat_thread SET archived_at = datetime('now') WHERE game = ? AND archived_at IS NULL"
  ).run(game)
  const info = db.prepare('INSERT INTO gacha_chat_thread (game) VALUES (?)').run(game)
  return mapThread(
    db.prepare('SELECT * FROM gacha_chat_thread WHERE id = ?').get(Number(info.lastInsertRowid)) as Record<
      string,
      unknown
    >
  )
}

// Archived threads, newest first (the active one is excluded).
export function listThreads(game: GachaGameId): GachaChatThread[] {
  return (
    getSqlite()
      .prepare(
        'SELECT * FROM gacha_chat_thread WHERE game = ? AND archived_at IS NOT NULL ORDER BY id DESC'
      )
      .all(game) as Record<string, unknown>[]
  ).map(mapThread)
}

export function setThreadTitle(id: number, title: string): void {
  getSqlite().prepare('UPDATE gacha_chat_thread SET title = ? WHERE id = ?').run(title, id)
}

function touchThread(threadId: number): void {
  getSqlite()
    .prepare("UPDATE gacha_chat_thread SET updated_at = datetime('now') WHERE id = ?")
    .run(threadId)
}

// ---- messages ----

function mapMessage(r: Record<string, unknown>): GachaChatMessage {
  return {
    id: r.id as number,
    threadId: r.thread_id as number,
    role: r.role as 'user' | 'assistant',
    text: (r.text as string) ?? '',
    actions: parseArr(r.actions),
    attachments: parseArr(r.attachments),
    usageIn: (r.usage_in as number) ?? null,
    usageOut: (r.usage_out as number) ?? null,
    createdAt: r.created_at as string
  }
}

export function listMessages(threadId: number): GachaChatMessage[] {
  return (
    getSqlite()
      .prepare('SELECT * FROM gacha_chat_message WHERE thread_id = ? ORDER BY id ASC')
      .all(threadId) as Record<string, unknown>[]
  ).map(mapMessage)
}

// api_blocks is the verbatim Anthropic content-block array (JSON) used for
// replay; the mapped GachaChatMessage never exposes it (display-only surface).
export interface AppendMessageRow {
  threadId: number
  role: 'user' | 'assistant'
  text: string
  apiBlocks: unknown[]
  actions?: { tool: string; label: string }[]
  attachments?: string[]
  usageIn?: number | null
  usageOut?: number | null
}

export function appendMessage(row: AppendMessageRow): number {
  const info = getSqlite()
    .prepare(
      `INSERT INTO gacha_chat_message
         (thread_id, role, text, api_blocks, actions, attachments, usage_in, usage_out)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      row.threadId,
      row.role,
      row.text,
      JSON.stringify(row.apiBlocks ?? []),
      row.actions && row.actions.length ? JSON.stringify(row.actions) : null,
      row.attachments && row.attachments.length ? JSON.stringify(row.attachments) : null,
      row.usageIn ?? null,
      row.usageOut ?? null
    )
  touchThread(row.threadId)
  return Number(info.lastInsertRowid)
}

// The replay window for the API call: the last `max` rows' api_blocks as
// {role, content} messages, sliced to START on a user row (the API requires
// the first message to be 'user').
export function historyWindow(
  threadId: number,
  max = 30
): { role: 'user' | 'assistant'; content: unknown[] }[] {
  const rows = getSqlite()
    .prepare('SELECT role, api_blocks FROM gacha_chat_message WHERE thread_id = ? ORDER BY id DESC LIMIT ?')
    .all(threadId, max) as { role: 'user' | 'assistant'; api_blocks: string }[]
  rows.reverse()
  const msgs = rows.map((r) => ({ role: r.role, content: parseArr<unknown>(r.api_blocks) }))
  while (msgs.length && msgs[0].role !== 'user') msgs.shift()
  return msgs
}

// ---- goals & tasks ----

function mapGoal(r: Record<string, unknown>): GachaGoal {
  return {
    id: r.id as number,
    game: r.game as GachaGameId,
    kind: r.kind as 'goal' | 'task',
    title: r.title as string,
    notes: (r.notes as string) ?? null,
    status: r.status as 'active' | 'done' | 'dropped',
    dueAt: (r.due_at as string) ?? null,
    recur: (r.recur as 'daily' | 'weekly') ?? null,
    createdBy: r.created_by as 'user' | 'coach',
    doneAt: (r.done_at as string) ?? null,
    sortOrder: r.sort_order as number,
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string
  }
}

// Active goals/tasks by default (settled ones only when asked), ordered with
// dated items first (soonest due), then undated.
export function listGoals(game: GachaGameId, includeSettled = false): GachaGoal[] {
  const where = includeSettled ? 'game = ?' : "game = ? AND status = 'active'"
  return (
    getSqlite()
      .prepare(
        `SELECT * FROM gacha_goal WHERE ${where}
         ORDER BY (status='active') DESC, due_at IS NULL, due_at ASC, sort_order ASC, id ASC`
      )
      .all(game) as Record<string, unknown>[]
  ).map(mapGoal)
}

export function createGoal(game: GachaGameId, input: GachaGoalInput): number {
  const info = getSqlite()
    .prepare(
      `INSERT INTO gacha_goal (game, kind, title, notes, due_at, recur, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
    .run(
      game,
      input.kind ?? 'goal',
      input.title,
      input.notes ?? null,
      input.dueAt ?? null,
      input.recur ?? null,
      input.createdBy ?? 'user'
    )
  return Number(info.lastInsertRowid)
}

export function updateGoal(id: number, patch: Partial<GachaGoalInput>): void {
  const sets: string[] = []
  const values: unknown[] = []
  const set = (col: string, value: unknown): void => {
    sets.push(`${col} = ?`)
    values.push(value)
  }
  if (patch.kind !== undefined) set('kind', patch.kind)
  if (patch.title !== undefined) set('title', patch.title)
  if (patch.notes !== undefined) set('notes', patch.notes ?? null)
  if (patch.dueAt !== undefined) set('due_at', patch.dueAt ?? null)
  if (patch.recur !== undefined) set('recur', patch.recur ?? null)
  if (!sets.length) return
  sets.push(`updated_at = datetime('now')`)
  getSqlite()
    .prepare(`UPDATE gacha_goal SET ${sets.join(', ')} WHERE id = ?`)
    .run(...values, id)
}

// Roll a recurring due date forward from TODAY (not the stale due date) so an
// overdue daily completed today becomes due tomorrow, not five stale steps on.
export function rollForward(dueAt: string | null, recur: 'daily' | 'weekly', today: string): string {
  const base = today
  const d = new Date(`${base}T00:00:00Z`)
  d.setUTCDate(d.getUTCDate() + (recur === 'weekly' ? 7 : 1))
  void dueAt
  return d.toISOString().slice(0, 10)
}

// Completing a recurring task rolls its due date forward and keeps it active;
// a one-off goal/task is marked done.
export function completeGoal(id: number, today: string): void {
  const db = getSqlite()
  const row = db.prepare('SELECT recur, due_at FROM gacha_goal WHERE id = ?').get(id) as
    | { recur: 'daily' | 'weekly' | null; due_at: string | null }
    | undefined
  if (!row) return
  if (row.recur) {
    db.prepare("UPDATE gacha_goal SET due_at = ?, updated_at = datetime('now') WHERE id = ?").run(
      rollForward(row.due_at, row.recur, today),
      id
    )
  } else {
    db.prepare(
      "UPDATE gacha_goal SET status = 'done', done_at = datetime('now'), updated_at = datetime('now') WHERE id = ?"
    ).run(id)
  }
}

export function dropGoal(id: number): void {
  getSqlite()
    .prepare("UPDATE gacha_goal SET status = 'dropped', updated_at = datetime('now') WHERE id = ?")
    .run(id)
}

// Per-game count of active goals/tasks due today or overdue — drives the
// reminder badges (no LLM call).
export function dueCounts(today: string): GachaCoachDueCounts {
  const rows = getSqlite()
    .prepare(
      `SELECT game, COUNT(*) AS n FROM gacha_goal
       WHERE status = 'active' AND due_at IS NOT NULL AND due_at <= ?
       GROUP BY game`
    )
    .all(today) as { game: GachaGameId; n: number }[]
  const out: GachaCoachDueCounts = {}
  for (const r of rows) out[r.game] = r.n
  return out
}

// ---- coach notes ----

function mapNote(r: Record<string, unknown>): GachaCoachNote {
  return {
    id: r.id as number,
    game: r.game as GachaGameId,
    content: r.content as string,
    createdBy: r.created_by as 'user' | 'coach',
    createdAt: r.created_at as string,
    updatedAt: r.updated_at as string
  }
}

export function listNotes(game: GachaGameId): GachaCoachNote[] {
  return (
    getSqlite()
      .prepare('SELECT * FROM gacha_coach_note WHERE game = ? ORDER BY id DESC')
      .all(game) as Record<string, unknown>[]
  ).map(mapNote)
}

export function createNote(game: GachaGameId, content: string, createdBy: 'user' | 'coach'): number {
  const info = getSqlite()
    .prepare('INSERT INTO gacha_coach_note (game, content, created_by) VALUES (?, ?, ?)')
    .run(game, content, createdBy)
  return Number(info.lastInsertRowid)
}

export function removeNote(id: number): void {
  getSqlite().prepare('DELETE FROM gacha_coach_note WHERE id = ?').run(id)
}

// ---- imported docs ----

function mapDoc(r: Record<string, unknown>): GachaCoachDoc {
  return {
    id: r.id as number,
    game: r.game as GachaGameId,
    title: r.title as string,
    content: r.content as string,
    summary: (r.summary as string) ?? null,
    createdAt: r.created_at as string
  }
}

export function listDocs(game: GachaGameId): GachaCoachDoc[] {
  return (
    getSqlite()
      .prepare('SELECT * FROM gacha_coach_doc WHERE game = ? ORDER BY id DESC')
      .all(game) as Record<string, unknown>[]
  ).map(mapDoc)
}

export function createDoc(game: GachaGameId, title: string, content: string): number {
  const info = getSqlite()
    .prepare('INSERT INTO gacha_coach_doc (game, title, content) VALUES (?, ?, ?)')
    .run(game, title, content)
  return Number(info.lastInsertRowid)
}

export function setDocSummary(id: number, summary: string): void {
  getSqlite().prepare('UPDATE gacha_coach_doc SET summary = ? WHERE id = ?').run(summary, id)
}

export function removeDoc(id: number): void {
  getSqlite().prepare('DELETE FROM gacha_coach_doc WHERE id = ?').run(id)
}

// Used by the context builder + tests (the FGO game id is validated against config).
export function isGachaGame(game: string): game is GachaGameId {
  return GACHA_GAMES.some((g) => g.id === game)
}
