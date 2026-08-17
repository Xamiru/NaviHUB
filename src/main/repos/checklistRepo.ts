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
import { addDays, checklistDef, periodKeyFor, periodRange } from '@shared/checklist'
import { advanceProgress, isUnitProgress, parseStatuses } from '@shared/mediaProgress'
import type { ChecklistDef, ChecklistDetectSource } from '@shared/checklist'
import type {
  ChecklistCadence,
  ChecklistLogEntry,
  ChecklistStatus,
  ChecklistTaskStatus,
  MediaProgressLogged,
  MediaType
} from '@shared/types'

const HISTORY_DAYS = 364 // 52 weeks, the CalendarHeatmap's span

interface TaskRow {
  id: number
  task_key: string
  cadence: ChecklistCadence
  target: number | null
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
  prior?: { progress: number; status: string | null; rewatchCount?: number }
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

function targetFor(row: { target: number | null }, def: ChecklistDef): number {
  return row.target != null && row.target > 0 ? row.target : def.target
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

// null clears the override and falls back to the def's target.
export function setTarget(id: number, target: number | null): void {
  const clean = target != null && target > 0 ? Math.floor(target) : null
  getSqlite().prepare('UPDATE checklist_task SET target = ? WHERE id = ?').run(clean, id)
}

export function reorder(cadence: ChecklistCadence, orderedIds: number[]): void {
  const db = getSqlite()
  const upd = db.prepare('UPDATE checklist_task SET sort_order = ? WHERE id = ? AND cadence = ?')
  db.transaction(() => {
    orderedIds.forEach((id, i) => upd.run(i, id, cadence))
  })()
}

// ---- actions ----

// The app's ONE "I watched/read another one" write, shared by the checklist's
// Log button and the log button on every media detail page. It advances the
// media row (@shared/mediaProgress owns the rules, rewatches included) and
// records a checklist credit against `task` — or, when the caller is a media
// page with no task in hand, against whatever mediaLog item for that type is
// on the board (daily before weekly). No matching item just means no credit:
// the media row still moves.
//
// `opts.noRewatch` suppresses ONLY the rewatch wrap, for callers that back-fill
// in bulk rather than reporting a fresh viewing — the TV season toggle, which
// fires once per newly-ticked episode. The Seasons tab shipped empty on shows
// finished long ago, so "Mark season watched" on one of them would otherwise
// knock it back to Watching, reset progress to 1 and bump rewatch_count, none
// of which unmarking restores. An unfinished title still advances normally.
export function logProgress(
  mediaId: number,
  today: string,
  task?: { key: string; cadence: ChecklistCadence },
  opts: { noRewatch?: boolean } = {}
): MediaProgressLogged {
  const db = getSqlite()
  const tx = db.transaction((): MediaProgressLogged => {
    const media = db
      .prepare(
        `SELECT id, title, media_type, status, progress, total_units, rewatch_count
         FROM media_item WHERE id = ?`
      )
      .get(mediaId) as
      | {
          id: number
          title: string
          media_type: MediaType
          status: string | null
          progress: number
          total_units: number | null
          rewatch_count: number
        }
      | undefined
    if (!media) throw new Error(`Media ${mediaId} not found`)

    let target = task
    if (target) {
      const def = defOrThrow(target.key)
      if (def.kind !== 'mediaLog' || !def.mediaType) {
        throw new Error(`Checklist item ${target.key} does not log media`)
      }
      if (media.media_type !== def.mediaType) {
        throw new Error(`Media ${mediaId} is not a ${def.mediaType}`)
      }
    } else {
      target = mediaLogTaskFor(media.media_type)
    }

    const prior = {
      progress: media.progress,
      status: media.status,
      rewatchCount: media.rewatch_count
    }
    const advanced = advanceProgress(
      {
        progress: media.progress,
        status: media.status,
        totalUnits: media.total_units,
        rewatchCount: media.rewatch_count
      },
      statusesFor(media.media_type),
      isUnitProgress(media.media_type)
    )
    // Suppressed wrap: the board still gets its credit, the media row does not
    // move at all. Holding it exactly where it was is the point — the title is
    // already finished, and this caller is recording history, not a new pass.
    const held = opts.noRewatch === true && advanced.startedRewatch
    const next = held
      ? { ...advanced, ...prior, startedRewatch: false }
      : advanced
    if (!held) {
      mediaRepo.update(mediaId, {
        progress: next.progress,
        status: next.status,
        rewatchCount: next.rewatchCount
      })
    }

    let logId: number | null = null
    if (target) {
      // No `prior` when the row was held: undoing the credit should delete the
      // log row and leave progress alone, since logging it never moved it.
      const payload: LogPayload = held ? { title: media.title } : { title: media.title, prior }
      logId = Number(
        db
          .prepare(
            `INSERT INTO checklist_log (task_key, cadence, period_key, media_id, payload)
             VALUES (?, ?, ?, ?, ?)`
          )
          .run(
            target.key,
            target.cadence,
            periodKeyFor(target.cadence, today),
            mediaId,
            JSON.stringify(payload)
          ).lastInsertRowid
      )
    }
    return {
      logId,
      title: media.title,
      startedRewatch: next.startedRewatch,
      rewatchCount: next.rewatchCount,
      progress: next.progress,
      status: next.status
    }
  })
  return tx()
}

// Credit the board WITHOUT touching media_item.progress.
//
// logProgress below is "I consumed one more unit" — it advances progress and,
// on a finished title, wraps into a fresh pass. That is right for a button the
// user presses, and wrong for the manga reader, which fires automatically when
// you turn the last page: re-reading chapter 1 of a completed series must not
// silently reset it to 1. There, manga.ts:syncMediaProgress owns progress (it
// only ever raises, to the highest chapter number actually read) and this
// records the fact that reading happened.
//
// No `prior` in the payload, so undoing the credit removes the row and leaves
// progress alone — which is correct, since logging it never moved progress.
export function creditMediaLog(mediaId: number, today: string): number | null {
  const db = getSqlite()
  const tx = db.transaction((): number | null => {
    const media = db
      .prepare('SELECT id, title, media_type FROM media_item WHERE id = ?')
      .get(mediaId) as { id: number; title: string; media_type: MediaType } | undefined
    if (!media) return null
    const target = mediaLogTaskFor(media.media_type)
    if (!target) return null
    const payload: LogPayload = { title: media.title }
    return Number(
      db
        .prepare(
          `INSERT INTO checklist_log (task_key, cadence, period_key, media_id, payload)
           VALUES (?, ?, ?, ?, ?)`
        )
        .run(
          target.key,
          target.cadence,
          periodKeyFor(target.cadence, today),
          mediaId,
          JSON.stringify(payload)
        ).lastInsertRowid
    )
  })
  return tx()
}

// The board item a media-page log should credit: daily first, then weekly, in
// board order.
function mediaLogTaskFor(mediaType: MediaType): { key: string; cadence: ChecklistCadence } | undefined {
  const rows = getSqlite()
    .prepare(
      `SELECT task_key, cadence FROM checklist_task
       ORDER BY CASE cadence WHEN 'daily' THEN 0 ELSE 1 END, sort_order ASC, id ASC`
    )
    .all() as { task_key: string; cadence: ChecklistCadence }[]
  for (const row of rows) {
    const def = checklistDef(row.task_key)
    if (def?.kind === 'mediaLog' && def.mediaType === mediaType) {
      return { key: row.task_key, cadence: row.cadence }
    }
  }
  return undefined
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
      mediaRepo.update(row.media_id, {
        progress: prior.progress,
        status: prior.status,
        ...(prior.rewatchCount != null ? { rewatchCount: prior.rewatchCount } : {})
      })
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

// Ticking a manual item. Clamped at its target, so a checkbox can't stack up
// invisible rows — see credit() for the un-clamped form.
export function tick(taskKey: string, cadence: ChecklistCadence, today: string): number {
  const db = getSqlite()
  const def = defOrThrow(taskKey)
  const row = db
    .prepare('SELECT target FROM checklist_task WHERE task_key = ? AND cadence = ?')
    .get(taskKey, cadence) as { target: number | null } | undefined
  const periodKey = periodKeyFor(cadence, today)
  if (periodCount(taskKey, cadence, periodKey) >= targetFor(row ?? { target: null }, def)) {
    return (
      db
        .prepare(
          `SELECT id FROM checklist_log WHERE task_key = ? AND cadence = ? AND period_key = ?
           ORDER BY id DESC LIMIT 1`
        )
        .get(taskKey, cadence, periodKey) as { id: number }
    ).id
  }
  return credit(taskKey, cadence, today)
}

// One manual credit toward an item. This is what makes a `detected` item
// possible to finish when the activity happened outside the app — the credit
// adds on top of whatever was detected, and is undoable on its own.
export function credit(taskKey: string, cadence: ChecklistCadence, today: string): number {
  const def = defOrThrow(taskKey)
  // A mediaLog item is finished by picking a title (logProgress), which writes
  // the media_id and prior-state payload undo needs. Crediting one by hand
  // would mark the board done with no episode logged and nothing to restore.
  if (def.kind === 'mediaLog') {
    throw new Error(`Checklist item ${taskKey} is logged by picking a title, not credited by hand`)
  }
  const info = getSqlite()
    .prepare('INSERT INTO checklist_log (task_key, cadence, period_key) VALUES (?, ?, ?)')
    .run(taskKey, cadence, periodKeyFor(cadence, today))
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
//
// Every perDay query is bounded to the rendered window. The heatmap draws 52
// weeks either way, so an unbounded GROUP BY read all of history on every
// checklist:status call and grew forever while the output did not — the same
// bound japaneseRepo.statsDetail already applies.
const HEATMAP_WINDOW = `>= date('now', 'localtime', '-364 days')`

const DETECT_SQL: Record<ChecklistDetectSource, { count: string; perDay: string }> = {
  jpReviews: {
    count: `SELECT COUNT(DISTINCT card_id) AS n FROM jp_review_log
            WHERE date(reviewed_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(reviewed_at, 'localtime') AS day, COUNT(DISTINCT card_id) AS n
             FROM jp_review_log WHERE date(reviewed_at, 'localtime') ${HEATMAP_WINDOW}
             GROUP BY day`
  },
  jpLesson: {
    count: `SELECT COUNT(*) AS n FROM jp_lesson
            WHERE learned = 1 AND learned_at IS NOT NULL
              AND date(learned_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(learned_at, 'localtime') AS day, COUNT(*) AS n FROM jp_lesson
             WHERE learned = 1 AND learned_at IS NOT NULL
               AND date(learned_at, 'localtime') ${HEATMAP_WINDOW}
             GROUP BY day`
  },
  enReviews: {
    count: `SELECT COUNT(DISTINCT word_id) AS n FROM en_review_log
            WHERE date(reviewed_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(reviewed_at, 'localtime') AS day, COUNT(DISTINCT word_id) AS n
             FROM en_review_log WHERE date(reviewed_at, 'localtime') ${HEATMAP_WINDOW}
             GROUP BY day`
  },
  quizRound: {
    count: `SELECT COUNT(*) AS n FROM quiz_session
            WHERE date(played_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(played_at, 'localtime') AS day, COUNT(*) AS n FROM quiz_session
             WHERE date(played_at, 'localtime') ${HEATMAP_WINDOW} GROUP BY day`
  },
  gameSession: {
    count: `SELECT COUNT(*) AS n FROM game_session
            WHERE date(started_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(started_at, 'localtime') AS day, COUNT(*) AS n FROM game_session
             WHERE date(started_at, 'localtime') ${HEATMAP_WINDOW} GROUP BY day`
  },
  progLesson: {
    count: `SELECT COUNT(*) AS n FROM prog_progress
            WHERE date(completed_at, 'localtime') BETWEEN ? AND ?`,
    perDay: `SELECT date(completed_at, 'localtime') AS day, COUNT(*) AS n FROM prog_progress
             WHERE date(completed_at, 'localtime') ${HEATMAP_WINDOW} GROUP BY day`
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
      `SELECT id, task_key, cadence, target, sort_order,
              date(created_at, 'localtime') AS created_day
       FROM checklist_task ORDER BY sort_order ASC, id ASC`
    )
    .all() as TaskRow[]

  // A key the catalog no longer knows about is skipped rather than fatal.
  const tasks = rows
    .map((row) => ({ row, def: checklistDef(row.task_key) }))
    .filter((t): t is { row: TaskRow; def: ChecklistDef } => !!t.def)

  const hydrate = ({ row, def }: { row: TaskRow; def: ChecklistDef }): ChecklistTaskStatus => {
    const range = periodRange(row.cadence, today)
    // Log rows mean different things per kind: the logged episodes/films for a
    // mediaLog item, the ticks for a manual one, and hand-added credits on top
    // of detection for a detected one. All three are undoable the same way.
    const logs = db
      .prepare(
        `SELECT l.id, l.media_id, l.payload, l.created_at, m.title AS live_title
         FROM checklist_log l
         LEFT JOIN media_item m ON m.id = l.media_id
         WHERE l.task_key = ? AND l.cadence = ? AND l.period_key = ?
         ORDER BY l.id ASC`
      )
      .all(row.task_key, row.cadence, periodKeyFor(row.cadence, today)) as LogRow[]
    const detected = def.kind === 'detected' && def.source
      ? detectedCount(def.source, range.start, range.end)
      : 0
    const progress = detected + logs.length
    const target = targetFor(row, def)
    return {
      id: row.id,
      key: def.key,
      cadence: row.cadence,
      label: def.label,
      kind: def.kind,
      route: def.route ?? null,
      mediaType: def.mediaType ?? null,
      target,
      defaultTarget: def.target,
      detected,
      progress,
      done: progress >= target,
      entries: logs.map((l) => ({
        id: l.id,
        mediaId: l.media_id,
        title: l.live_title ?? parsePayload(l.payload).title ?? null,
        createdAt: l.created_at
      }))
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

  // Mirrors hydrate(): detected activity plus any hand-added credits.
  const countFor = (t: { row: TaskRow; def: ChecklistDef }, day: string): number => {
    const detected =
      t.def.kind === 'detected' && t.def.source ? (detectDays.get(t.def.source)?.get(day) ?? 0) : 0
    return detected + (logByTask.get(t.row.task_key)?.get(day) ?? 0)
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
    for (const t of active) if (countFor(t, day) >= targetFor(t.row, t.def)) done++
    history.push({ day, count: done })
    if (active.length > 0 && done === active.length) completeDaysDesc.unshift(day)
  }

  return { streak: computeStreaks(completeDaysDesc, today), history }
}
