// Daily / weekly checklist. The catalog of possible items is code
// (@shared/checklist); this repo owns the two tables behind it — which items
// are enabled (checklist_task) and what happened (checklist_log).
//
// Every function that needs "today" takes it as an explicit LOCAL 'YYYY-MM-DD'
// parameter (coachRepo precedent): ipc.ts supplies it from the system clock,
// tests supply a fixed date. Nothing here — and nothing in the renderer — ever
// derives today on its own.

import { getSqlite } from '../db/connection'
import { computeStreaks } from './musicRepo'
import * as mediaRepo from './mediaRepo'
import * as settingsRepo from './settingsRepo'
import {
  addDays,
  checklistDef,
  parseStatuses,
  periodKeyFor,
  periodRange
} from '@shared/checklist'
import type { ChecklistDef, ChecklistDetectSource } from '@shared/checklist'
import type {
  ChecklistCadence,
  ChecklistLogEntry,
  ChecklistStatus,
  ChecklistTaskStatus,
  MediaType
} from '@shared/types'

const HISTORY_DAYS = 364 // 52 weeks, the CalendarHeatmap's span

interface TaskRow {
  id: number
  task_key: string
  cadence: ChecklistCadence
  sort_order: number
  created_day: string
}

interface LogRow {
  id: number
  media_id: number | null
  payload: string | null
  created_at: string
  live_title: string | null
}

// What the log payload caches so an entry (and its undo) survives the media row
// being deleted or edited afterwards.
interface LogPayload {
  title?: string
  prior?: { progress: number; status: string | null }
}

function defOrThrow(key: string): ChecklistDef {
  const def = checklistDef(key)
  if (!def) throw new Error(`Unknown checklist item: ${key}`)
  return def
}

function parsePayload(raw: string | null): LogPayload {
  if (!raw) return {}
  try {
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? (parsed as LogPayload) : {}
  } catch {
    return {}
  }
}

function statusesFor(mediaType: MediaType): string[] {
  return parseStatuses(settingsRepo.get(`${mediaType}.statuses`), mediaType)
}

// ---- board ----

export function addTask(key: string, cadence: ChecklistCadence): number {
  const db = getSqlite()
  defOrThrow(key)
  const next = (
    db
      .prepare(
        'SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM checklist_task WHERE cadence = ?'
      )
      .get(cadence) as { next: number }
  ).next
  db.prepare(
    'INSERT OR IGNORE INTO checklist_task (task_key, cadence, sort_order) VALUES (?, ?, ?)'
  ).run(key, cadence, next)
  return (
    db
      .prepare('SELECT id FROM checklist_task WHERE task_key = ? AND cadence = ?')
      .get(key, cadence) as { id: number }
  ).id
}

// Log rows deliberately survive: re-adding the item later keeps its history.
export function removeTask(id: number): void {
  getSqlite().prepare('DELETE FROM checklist_task WHERE id = ?').run(id)
}

// ---- actions ----

// Logging an episode/film IS the tracking action: it writes the media row and
// records what that row looked like beforehand, so undoLog can put it back.
export function logMedia(
  taskKey: string,
  cadence: ChecklistCadence,
  mediaId: number,
  today: string
): number {
  const db = getSqlite()
  const def = defOrThrow(taskKey)
  if (def.kind !== 'mediaLog' || !def.mediaType) {
    throw new Error(`Checklist item ${taskKey} does not log media`)
  }
  const tx = db.transaction(() => {
    const media = db
      .prepare(
        'SELECT id, title, media_type, status, progress, total_units FROM media_item WHERE id = ?'
      )
      .get(mediaId) as
      | {
          id: number
          title: string
          media_type: string
          status: string | null
          progress: number
          total_units: number | null
        }
      | undefined
    if (!media) throw new Error(`Media ${mediaId} not found`)
    if (media.media_type !== def.mediaType) {
      throw new Error(`Media ${mediaId} is not a ${def.mediaType}`)
    }

    const prior = { progress: media.progress, status: media.status }
    const statuses = statusesFor(def.mediaType)
    const inProgress = statuses[0] ?? null
    const completed = statuses[1] ?? null
    const planned = statuses.length ? statuses[statuses.length - 1] : null

    if (def.mediaAction === 'incrementProgress') {
      const next = media.progress + 1
      let status = media.status
      if (!status || status === planned) status = inProgress
      if (media.total_units && next >= media.total_units && completed) status = completed
      mediaRepo.update(mediaId, { progress: next, status })
    } else if (def.mediaAction === 'markWatched' && completed) {
      // Movies are noProgress — total_units is runtime minutes, so only the
      // status moves.
      mediaRepo.update(mediaId, { status: completed })
    }

    const payload: LogPayload = { title: media.title, prior }
    const info = db
      .prepare(
        `INSERT INTO checklist_log (task_key, cadence, period_key, media_id, payload)
         VALUES (?, ?, ?, ?, ?)`
      )
      .run(taskKey, cadence, periodKeyFor(cadence, today), mediaId, JSON.stringify(payload))
    return Number(info.lastInsertRowid)
  })
  return tx()
}

// Undo restores the snapshot taken when the entry was logged — including any
// edit made to the media row in between, which is the accepted trade-off for a
// one-click undo.
export function undoLog(logId: number): void {
  const db = getSqlite()
  const tx = db.transaction(() => {
    const row = db.prepare('SELECT media_id, payload FROM checklist_log WHERE id = ?').get(logId) as
      | { media_id: number | null; payload: string | null }
      | undefined
    if (!row) return
    db.prepare('DELETE FROM checklist_log WHERE id = ?').run(logId)
    const prior = parsePayload(row.payload).prior
    if (row.media_id != null && prior) {
      // A deleted media row just makes this a zero-row UPDATE.
      mediaRepo.update(row.media_id, { progress: prior.progress, status: prior.status })
    }
  })
  tx()
}

function periodCount(taskKey: string, cadence: ChecklistCadence, periodKey: string): number {
  return (
    getSqlite()
      .prepare(
        'SELECT COUNT(*) AS n FROM checklist_log WHERE task_key = ? AND cadence = ? AND period_key = ?'
      )
      .get(taskKey, cadence, periodKey) as { n: number }
  ).n
}

export function tick(taskKey: string, cadence: ChecklistCadence, today: string): number {
  const db = getSqlite()
  const def = defOrThrow(taskKey)
  const periodKey = periodKeyFor(cadence, today)
  if (periodCount(taskKey, cadence, periodKey) >= def.target) {
    return (
      db
        .prepare(
          `SELECT id FROM checklist_log WHERE task_key = ? AND cadence = ? AND period_key = ?
           ORDER BY id DESC LIMIT 1`
        )
        .get(taskKey, cadence, periodKey) as { id: number }
    ).id
  }
  const info = db
    .prepare('INSERT INTO checklist_log (task_key, cadence, period_key) VALUES (?, ?, ?)')
    .run(taskKey, cadence, periodKey)
  return Number(info.lastInsertRowid)
}

export function untick(taskKey: string, cadence: ChecklistCadence, today: string): void {
  getSqlite()
    .prepare(
      `DELETE FROM checklist_log WHERE id = (
         SELECT id FROM checklist_log WHERE task_key = ? AND cadence = ? AND period_key = ?
         ORDER BY id DESC LIMIT 1
       )`
    )
    .run(taskKey, cadence, periodKeyFor(cadence, today))
}

// ---- detection ----

// Every source stores UTC timestamps, so days are grouped through
// date(col,'localtime') — the japaneseRepo.stats() idiom.
const DETECT_SQL: Record<ChecklistDetectSource, { count: string; perDay: string }> = {
  jpReviews: {
    count: `SELECT COUNT(DISTINCT card_id) AS n FROM jp_review_log
            WHERE date(reviewed_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(reviewed_at, 'localtime') AS day, COUNT(DISTINCT card_id) AS n
             FROM jp_review_log GROUP BY day`
  },
  jpLesson: {
    count: `SELECT COUNT(*) AS n FROM jp_lesson
            WHERE learned = 1 AND learned_at IS NOT NULL
              AND date(learned_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(learned_at, 'localtime') AS day, COUNT(*) AS n FROM jp_lesson
             WHERE learned = 1 AND learned_at IS NOT NULL GROUP BY day`
  },
  mangaChapter: {
    count: `SELECT COUNT(*) AS n FROM manga_chapter
            WHERE read_at IS NOT NULL AND date(read_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(read_at, 'localtime') AS day, COUNT(*) AS n FROM manga_chapter
             WHERE read_at IS NOT NULL GROUP BY day`
  },
  quizRound: {
    count: `SELECT COUNT(*) AS n FROM quiz_session
            WHERE date(played_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(played_at, 'localtime') AS day, COUNT(*) AS n FROM quiz_session
             GROUP BY day`
  }
}

function detectedCount(source: ChecklistDetectSource, start: string, end: string): number {
  return (getSqlite().prepare(DETECT_SQL[source].count).get(start, end) as { n: number }).n
}

function dayCounts(sql: string, params: unknown[] = []): Map<string, number> {
  const rows = getSqlite().prepare(sql).all(...params) as { day: string; n: number }[]
  const out = new Map<string, number>()
  for (const r of rows) if (r.day) out.set(r.day, r.n)
  return out
}

// ---- the one read ----

export function status(today: string): ChecklistStatus {
  const db = getSqlite()
  const week = periodRange('weekly', today)

  // date(created_at,'localtime') is what gates a task out of days that predate
  // it in the streak/history pass below.
  const rows = db
    .prepare(
      `SELECT id, task_key, cadence, sort_order, date(created_at, 'localtime') AS created_day
       FROM checklist_task ORDER BY sort_order ASC, id ASC`
    )
    .all() as TaskRow[]

  // A key the catalog no longer knows about is skipped rather than fatal.
  const tasks = rows
    .map((row) => ({ row, def: checklistDef(row.task_key) }))
    .filter((t): t is { row: TaskRow; def: ChecklistDef } => !!t.def)

  const hydrate = ({ row, def }: { row: TaskRow; def: ChecklistDef }): ChecklistTaskStatus => {
    const range = periodRange(row.cadence, today)
    let progress = 0
    let entries: ChecklistLogEntry[] = []
    if (def.kind === 'detected' && def.source) {
      progress = detectedCount(def.source, range.start, range.end)
    } else {
      const logs = db
        .prepare(
          `SELECT l.id, l.media_id, l.payload, l.created_at, m.title AS live_title
           FROM checklist_log l
           LEFT JOIN media_item m ON m.id = l.media_id
           WHERE l.task_key = ? AND l.cadence = ? AND l.period_key = ?
           ORDER BY l.id ASC`
        )
        .all(row.task_key, row.cadence, periodKeyFor(row.cadence, today)) as LogRow[]
      progress = logs.length
      entries = logs.map((l) => ({
        id: l.id,
        mediaId: l.media_id,
        title: l.live_title ?? parsePayload(l.payload).title ?? null,
        createdAt: l.created_at
      }))
    }
    return {
      id: row.id,
      key: def.key,
      cadence: row.cadence,
      label: def.label,
      kind: def.kind,
      route: def.route ?? null,
      mediaType: def.mediaType ?? null,
      target: def.target,
      progress,
      done: progress >= def.target,
      entries
    }
  }

  const daily = tasks.filter((t) => t.row.cadence === 'daily').map(hydrate)
  const weekly = tasks.filter((t) => t.row.cadence === 'weekly').map(hydrate)

  const dailyTasks = tasks.filter((t) => t.row.cadence === 'daily')
  const { streak, history } = dailyHistory(dailyTasks, today)

  return { today, week, daily, weekly, streak, history }
}

// Streak + heatmap are judged against the CURRENT daily board: a day counts as
// complete when every daily item that already existed then (created_at <= day)
// hit its target. Per-item day counts come from whole-history GROUP BYs — the
// same scan class as japaneseRepo.statsDetail, over personal-sized tables.
function dailyHistory(
  dailyTasks: { row: TaskRow; def: ChecklistDef }[],
  today: string
): { streak: { current: number; longest: number }; history: { day: string; count: number }[] } {
  if (dailyTasks.length === 0) return { streak: { current: 0, longest: 0 }, history: [] }

  const logRows = getSqlite()
    .prepare(
      `SELECT task_key, period_key AS day, COUNT(*) AS n FROM checklist_log
       WHERE cadence = 'daily' GROUP BY task_key, day`
    )
    .all() as { task_key: string; day: string; n: number }[]
  const logByTask = new Map<string, Map<string, number>>()
  for (const r of logRows) {
    let m = logByTask.get(r.task_key)
    if (!m) logByTask.set(r.task_key, (m = new Map()))
    m.set(r.day, r.n)
  }

  const detectDays = new Map<ChecklistDetectSource, Map<string, number>>()
  for (const t of dailyTasks) {
    if (t.def.kind === 'detected' && t.def.source && !detectDays.has(t.def.source)) {
      detectDays.set(t.def.source, dayCounts(DETECT_SQL[t.def.source].perDay))
    }
  }

  const countFor = (t: { row: TaskRow; def: ChecklistDef }, day: string): number => {
    if (t.def.kind === 'detected' && t.def.source) {
      return detectDays.get(t.def.source)?.get(day) ?? 0
    }
    return logByTask.get(t.row.task_key)?.get(day) ?? 0
  }

  const earliest = dailyTasks.reduce(
    (min, t) => (t.row.created_day && t.row.created_day < min ? t.row.created_day : min),
    today
  )
  const windowStart = addDays(today, -(HISTORY_DAYS - 1))
  const start = earliest < windowStart ? windowStart : earliest

  const history: { day: string; count: number }[] = []
  const completeDaysDesc: string[] = []
  for (let day = start; day <= today; day = addDays(day, 1)) {
    const active = dailyTasks.filter((t) => t.row.created_day <= day)
    let done = 0
    for (const t of active) if (countFor(t, day) >= t.def.target) done++
    history.push({ day, count: done })
    if (active.length > 0 && done === active.length) completeDaysDesc.unshift(day)
  }

  return { streak: computeStreaks(completeDaysDesc, today), history }
}
