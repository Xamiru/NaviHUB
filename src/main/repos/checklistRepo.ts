// Daily / weekly checklist. Built-in items are code (@shared/checklist); this
// repo owns the tables behind the board — which items are on it
// (checklist_task), how its rules changed over time (checklist_rule), the
// user's own items (checklist_custom), skipped periods (checklist_skip) and
// what happened (checklist_log).
//
// Every function that needs "today" takes it as an explicit LOCAL 'YYYY-MM-DD'
// parameter: ipc.ts supplies it from the system clock, tests supply a fixed
// date. A `day` parameter is a day the user chose to view or edit; it is
// validated against today here. Nothing in this file — and nothing in the
// renderer — ever derives today on its own.

import { getSqlite } from '../db/connection'
import { JP_QUIZ_KINDS } from './japaneseRepo'
import * as mediaRepo from './mediaRepo'
import * as settingsRepo from './settingsRepo'
import {
  addDays,
  checklistDef,
  checklistStreak,
  customIdOf,
  customKey,
  dayState,
  isDueOn,
  isValidDay,
  itemPeriodState,
  normalizeDays,
  periodKeyFor,
  periodRange,
  weekDays,
  weeklyKey
} from '@shared/checklist'
import { advanceProgress, isUnitProgress, parseStatuses, startSession } from '@shared/mediaProgress'
import type { ChecklistDef, ChecklistDetectSource } from '@shared/checklist'
import type {
  ChecklistCadence,
  ChecklistCustomInput,
  ChecklistDayCell,
  ChecklistLogEntry,
  ChecklistPeriodState,
  ChecklistStatus,
  ChecklistSuggestion,
  ChecklistTaskStatus,
  MediaProgressLogged,
  MediaType
} from '@shared/types'

const HISTORY_DAYS = 364 // 52 weeks, the CalendarHeatmap's span — also how far back edits reach
const RATE_DAYS = 30
const RATE_WEEKS = 13
const STRIP_WEEKS = 7
const REST_DAY = 0 // checklist_skip.task_id for a whole skipped day

// A built-in def, or a custom item dressed as one.
type ItemDef = Omit<ChecklistDef, 'group'> & { customId: number | null; note: string | null }

interface TaskRow {
  id: number
  task_key: string
  cadence: ChecklistCadence
  target: number | null
  days: number | null
  sort_order: number
  removed_at: string | null
  created_day: string
}

interface Rule {
  from: string
  target: number | null
  days: number | null
  active: boolean
}

interface CustomRow {
  id: number
  label: string
  unit: string | null
  target: number
  note: string | null
}

interface LogRow {
  id: number
  media_id: number | null
  payload: string | null
  amount: number
  created_at: string
  live_title: string | null
}

// What the log payload caches so an entry (and its undo) survives the media row
// being deleted or edited afterwards. A session log's prior has status only.
interface LogPayload {
  title?: string
  prior?: { progress?: number; status: string | null; rewatchCount?: number }
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

// ---- definitions ----

function customDef(row: CustomRow): ItemDef {
  return {
    key: customKey(row.id),
    label: row.label,
    hint: row.note ?? '',
    kind: 'manual',
    defaultCadence: 'daily',
    target: row.target,
    unit: row.unit ?? undefined,
    customId: row.id,
    note: row.note
  }
}

function builtInDef(def: ChecklistDef): ItemDef {
  return { ...def, customId: null, note: null }
}

function loadCustomDefs(): Map<string, ItemDef> {
  const rows = getSqlite()
    .prepare('SELECT id, label, unit, target, note FROM checklist_custom')
    .all() as CustomRow[]
  return new Map(rows.map((r) => [customKey(r.id), customDef(r)]))
}

function resolveDef(key: string, custom?: Map<string, ItemDef>): ItemDef | undefined {
  const builtIn = checklistDef(key)
  if (builtIn) return builtInDef(builtIn)
  const id = customIdOf(key)
  if (id == null) return undefined
  if (custom) return custom.get(key)
  const row = getSqlite()
    .prepare('SELECT id, label, unit, target, note FROM checklist_custom WHERE id = ?')
    .get(id) as CustomRow | undefined
  return row && customDef(row)
}

function defOrThrow(key: string): ItemDef {
  const def = resolveDef(key)
  if (!def) throw new Error(`Unknown checklist item: ${key}`)
  return def
}

function targetOf(override: number | null, def: ItemDef): number {
  return override != null && override > 0 ? override : def.target
}

// ---- days ----

function earliestEditable(today: string): string {
  return addDays(today, -(HISTORY_DAYS - 1))
}

// The day a write applies to. Omitted means today; anything else must be a
// real day inside the editable window and not after today.
function editDay(today: string, day?: string | null): string {
  if (day == null || day === today) return today
  if (!isValidDay(day) || day > today || day < earliestEditable(today)) {
    throw new Error(`Cannot edit the checklist for ${String(day)}`)
  }
  return day
}

// The day a read shows. A stale or malformed choice falls back to today.
function viewDay(today: string, day?: string | null): string {
  if (day == null || !isValidDay(day) || day > today || day < earliestEditable(today)) return today
  return day
}

// ---- rules ----

function taskRow(id: number): TaskRow | undefined {
  return getSqlite()
    .prepare(
      `SELECT id, task_key, cadence, target, days, sort_order, removed_at,
              date(created_at, 'localtime') AS created_day
       FROM checklist_task WHERE id = ?`
    )
    .get(id) as TaskRow | undefined
}

// A task with no rule rows yet is judged by its own row: on the board from the
// period it was created in, with its current target and schedule.
function fallbackRules(task: TaskRow): Rule[] {
  return [
    {
      from: periodKeyFor(task.cadence, task.created_day),
      target: task.target,
      days: task.days,
      active: task.removed_at == null
    }
  ]
}

function loadRules(): Map<number, Rule[]> {
  const rows = getSqlite()
    .prepare(
      'SELECT task_id, from_day, target, days, active FROM checklist_rule ORDER BY task_id, from_day'
    )
    .all() as {
    task_id: number
    from_day: string
    target: number | null
    days: number | null
    active: number
  }[]
  const out = new Map<number, Rule[]>()
  for (const r of rows) {
    let list = out.get(r.task_id)
    if (!list) out.set(r.task_id, (list = []))
    list.push({ from: r.from_day, target: r.target, days: r.days, active: r.active === 1 })
  }
  return out
}

function rulesFor(task: TaskRow, all: Map<number, Rule[]>): Rule[] {
  return all.get(task.id) ?? fallbackRules(task)
}

// The rule in force for a period: the latest one starting on or before it.
function ruleAt(rules: Rule[], period: string): Rule | undefined {
  let found: Rule | undefined
  for (const r of rules) {
    if (r.from <= period) found = r
    else break
  }
  return found
}

// Every board change goes through here: it records the new rule from the
// current period on (the old one keeps judging earlier periods), then updates
// the row's current-value cache. The first change on a task with no rule rows
// first writes the baseline its fallback implied.
function changeTask(
  id: number,
  today: string,
  patch: { target?: number | null; days?: number | null; active?: boolean }
): void {
  const db = getSqlite()
  db.transaction(() => {
    const task = taskRow(id)
    if (!task) throw new Error(`Checklist item ${id} not found`)
    const from = periodKeyFor(task.cadence, today)
    const hasRules = db.prepare('SELECT 1 FROM checklist_rule WHERE task_id = ? LIMIT 1').get(id)
    const upsert = db.prepare(
      `INSERT INTO checklist_rule (task_id, from_day, target, days, active) VALUES (?, ?, ?, ?, ?)
       ON CONFLICT(task_id, from_day) DO UPDATE SET
         target = excluded.target, days = excluded.days, active = excluded.active`
    )
    if (!hasRules) {
      const base = fallbackRules(task)[0]
      if (base.from < from) upsert.run(id, base.from, base.target, base.days, base.active ? 1 : 0)
    }
    const next = {
      target: patch.target !== undefined ? patch.target : task.target,
      days: patch.days !== undefined ? patch.days : task.days,
      active: patch.active ?? task.removed_at == null
    }
    upsert.run(id, from, next.target, next.days, next.active ? 1 : 0)
    db.prepare(
      `UPDATE checklist_task SET target = ?, days = ?,
         removed_at = CASE WHEN ? THEN NULL ELSE COALESCE(removed_at, datetime('now')) END
       WHERE id = ?`
    ).run(next.target, next.days, next.active ? 1 : 0, id)
  })()
}

// ---- board ----

// Adds an item, or puts a removed one back with its id, target and schedule
// (and so its whole history) intact.
export function addTask(key: string, cadence: ChecklistCadence, today: string): number {
  const db = getSqlite()
  defOrThrow(key)
  return db.transaction((): number => {
    const existing = db
      .prepare('SELECT id, removed_at FROM checklist_task WHERE task_key = ? AND cadence = ?')
      .get(key, cadence) as { id: number; removed_at: string | null } | undefined
    if (existing && existing.removed_at == null) return existing.id
    const next = (
      db
        .prepare(
          `SELECT COALESCE(MAX(sort_order), -1) + 1 AS next FROM checklist_task
           WHERE cadence = ? AND removed_at IS NULL`
        )
        .get(cadence) as { next: number }
    ).next
    if (existing) {
      db.prepare('UPDATE checklist_task SET sort_order = ? WHERE id = ?').run(next, existing.id)
      changeTask(existing.id, today, { active: true })
      return existing.id
    }
    return Number(
      db
        .prepare('INSERT INTO checklist_task (task_key, cadence, sort_order) VALUES (?, ?, ?)')
        .run(key, cadence, next).lastInsertRowid
    )
  })()
}

// A soft delete: past periods stay judged by the rules that were in force, and
// re-adding the item later picks its history back up.
export function removeTask(id: number, today: string): void {
  changeTask(id, today, { active: false })
}

// null clears the override and falls back to the def's target.
export function setTarget(id: number, target: number | null, today: string): void {
  const clean = target != null && Number.isFinite(target) && target > 0 ? Math.floor(target) : null
  changeTask(id, today, { target: clean })
}

// Daily items only: the weekdays the item is due. null = every day.
export function setDays(id: number, days: number | null, today: string): void {
  const task = taskRow(id)
  if (!task) throw new Error(`Checklist item ${id} not found`)
  if (task.cadence !== 'daily') throw new Error('Only daily items have a weekday schedule')
  changeTask(id, today, { days: normalizeDays(days) })
}

export function reorder(cadence: ChecklistCadence, orderedIds: number[]): void {
  const db = getSqlite()
  const upd = db.prepare('UPDATE checklist_task SET sort_order = ? WHERE id = ? AND cadence = ?')
  db.transaction(() => {
    orderedIds.forEach((id, i) => upd.run(i, id, cadence))
  })()
}

// ---- custom items ----

function cleanText(value: unknown, max: number): string | null {
  if (typeof value !== 'string') return null
  const t = value.trim().replace(/\s+/g, ' ')
  return t ? t.slice(0, max) : null
}

function cleanCustom(input: Omit<ChecklistCustomInput, 'target'>): {
  label: string
  unit: string | null
  note: string | null
} {
  const label = cleanText(input.label, 80)
  if (!label) throw new Error('A checklist item needs a name')
  return { label, unit: cleanText(input.unit, 16), note: cleanText(input.note, 300) }
}

export function createCustom(
  input: ChecklistCustomInput,
  cadence: ChecklistCadence,
  days: number | null,
  today: string
): number {
  const db = getSqlite()
  const clean = cleanCustom(input)
  const target =
    Number.isFinite(input.target) && input.target >= 1 ? Math.min(Math.floor(input.target), 100_000) : 1
  return db.transaction((): number => {
    const customId = Number(
      db
        .prepare('INSERT INTO checklist_custom (label, unit, target, note) VALUES (?, ?, ?, ?)')
        .run(clean.label, clean.unit, target, clean.note).lastInsertRowid
    )
    const taskId = addTask(customKey(customId), cadence, today)
    const mask = cadence === 'daily' ? normalizeDays(days) : null
    if (mask != null) db.prepare('UPDATE checklist_task SET days = ? WHERE id = ?').run(mask, taskId)
    return taskId
  })()
}

// Name, unit and note only: the target is a board rule (setTarget), so
// changing it never rewrites the days already judged.
export function updateCustom(id: number, input: Omit<ChecklistCustomInput, 'target'>): void {
  const clean = cleanCustom(input)
  const res = getSqlite()
    .prepare('UPDATE checklist_custom SET label = ?, unit = ?, note = ? WHERE id = ?')
    .run(clean.label, clean.unit, clean.note, id)
  if (res.changes === 0) throw new Error(`Custom checklist item ${id} not found`)
}

// Permanent: the item, its board rows, rules, skips and every logged entry.
export function deleteCustom(id: number): void {
  const db = getSqlite()
  const key = customKey(id)
  db.transaction(() => {
    const taskIds = (
      db.prepare('SELECT id FROM checklist_task WHERE task_key = ?').all(key) as { id: number }[]
    ).map((r) => r.id)
    const delRules = db.prepare('DELETE FROM checklist_rule WHERE task_id = ?')
    const delSkips = db.prepare('DELETE FROM checklist_skip WHERE task_id = ?')
    for (const taskId of taskIds) {
      delRules.run(taskId)
      delSkips.run(taskId)
    }
    db.prepare('DELETE FROM checklist_task WHERE task_key = ?').run(key)
    db.prepare('DELETE FROM checklist_log WHERE task_key = ?').run(key)
    db.prepare('DELETE FROM checklist_custom WHERE id = ?').run(id)
  })()
}

// ---- skips ----

// taskId null = the whole day is a rest day. A weekly item's skip covers its
// week. Unlimited, and the heatmap shows every one.
export function skip(
  taskId: number | null,
  _cadence: ChecklistCadence, // kept for the IPC contract; the row's cadence rules
  skipped: boolean,
  today: string,
  day?: string | null
): void {
  const at = editDay(today, day)
  // The row decides the cadence: evaluate() reads skips by the task's own
  // cadence, so a stale board must not write a row nothing will ever read.
  let id = REST_DAY
  let rowCadence: ChecklistCadence = 'daily'
  if (taskId != null) {
    const task = taskRow(taskId)
    if (!task) throw new Error('That checklist item no longer exists')
    id = task.id
    rowCadence = task.cadence
  }
  const period = taskId == null ? at : periodKeyFor(rowCadence, at)
  const db = getSqlite()
  if (skipped) {
    db.prepare(
      'INSERT OR IGNORE INTO checklist_skip (task_id, cadence, period_key) VALUES (?, ?, ?)'
    ).run(id, rowCadence, period)
  } else {
    db.prepare('DELETE FROM checklist_skip WHERE task_id = ? AND cadence = ? AND period_key = ?').run(
      id,
      rowCadence,
      period
    )
  }
}

// ---- actions ----

// The board item a media-page log should credit: one due today first, then a
// weekly one, then a daily one off its schedule — board order within each.
function mediaLogTaskFor(
  mediaType: MediaType,
  today: string,
  kind: 'mediaLog' | 'mediaSession' = 'mediaLog'
): { key: string; cadence: ChecklistCadence } | undefined {
  const rows = getSqlite()
    .prepare(
      `SELECT task_key, cadence, days FROM checklist_task WHERE removed_at IS NULL
       ORDER BY sort_order ASC, id ASC`
    )
    .all() as { task_key: string; cadence: ChecklistCadence; days: number | null }[]
  const matching = rows.filter((row) => {
    const def = checklistDef(row.task_key)
    return def?.kind === kind && def.mediaType === mediaType
  })
  const rank = (r: (typeof matching)[number]): number =>
    r.cadence === 'weekly' ? 1 : isDueOn(r.days, today) ? 0 : 2
  const best = [...matching].sort((a, b) => rank(a) - rank(b))[0]
  return best && { key: best.task_key, cadence: best.cadence }
}

function insertLog(
  task: { key: string; cadence: ChecklistCadence },
  day: string,
  mediaId: number | null,
  payload: LogPayload | null,
  amount = 1
): number {
  return Number(
    getSqlite()
      .prepare(
        `INSERT INTO checklist_log (task_key, cadence, period_key, media_id, payload, amount)
         VALUES (?, ?, ?, ?, ?, ?)`
      )
      .run(
        task.key,
        task.cadence,
        periodKeyFor(task.cadence, day),
        mediaId,
        payload ? JSON.stringify(payload) : null,
        amount
      ).lastInsertRowid
  )
}

// The app's ONE "I watched/read another one" write, shared by the checklist's
// Log button and the log button on every media detail page. It advances the
// media row (@shared/mediaProgress owns the rules, rewatches included) and
// records a checklist credit against `task` — or, when the caller is a media
// page with no task in hand, against whatever mediaLog item for that type is
// on the board (one due today first). No matching item just means no credit:
// the media row still moves.
//
// `opts.noRewatch` suppresses ONLY the rewatch wrap, for callers that back-fill
// in bulk rather than reporting a fresh viewing — the TV season toggle, which
// fires once per newly-ticked episode. The Seasons tab shipped empty on shows
// finished long ago, so "Mark season watched" on one of them would otherwise
// knock it back to Watching, reset progress to 1 and bump rewatch_count, none
// of which unmarking restores. An unfinished title still advances normally.
//
// `opts.day` credits an earlier day the user stepped back to on the board; the
// media row still moves now, since the viewing is new to it.
export function logProgress(
  mediaId: number,
  today: string,
  task?: { key: string; cadence: ChecklistCadence },
  opts: { noRewatch?: boolean; day?: string | null } = {}
): MediaProgressLogged {
  const db = getSqlite()
  const day = editDay(today, opts.day)
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
      target = mediaLogTaskFor(media.media_type, today)
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
    const next = held ? { ...advanced, ...prior, startedRewatch: false } : advanced
    if (!held) {
      mediaRepo.update(mediaId, {
        progress: next.progress,
        status: next.status,
        rewatchCount: next.rewatchCount
      })
    }

    // No `prior` when the row was held: undoing the credit should delete the
    // log row and leave progress alone, since logging it never moved it.
    const logId = target
      ? insertLog(target, day, mediaId, held ? { title: media.title } : { title: media.title, prior })
      : null
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

// A reading session on a book or visual novel. It never counts a unit or
// finishes the title (startSession); undo restores only the status it lifted.
export function logSession(
  taskKey: string,
  cadence: ChecklistCadence,
  mediaId: number,
  today: string,
  day?: string | null
): { logId: number; title: string; status: string | null } {
  const db = getSqlite()
  const at = editDay(today, day)
  return db.transaction(() => {
    const def = defOrThrow(taskKey)
    if (def.kind !== 'mediaSession' || !def.mediaType) {
      throw new Error(`Checklist item ${taskKey} does not log reading sessions`)
    }
    const media = db
      .prepare('SELECT id, title, media_type, status FROM media_item WHERE id = ?')
      .get(mediaId) as
      | { id: number; title: string; media_type: MediaType; status: string | null }
      | undefined
    if (!media) throw new Error(`Media ${mediaId} not found`)
    if (media.media_type !== def.mediaType) throw new Error(`Media ${mediaId} is not a ${def.mediaType}`)
    const status = startSession(media.status, statusesFor(media.media_type))
    if (status !== media.status) mediaRepo.update(mediaId, { status })
    const logId = insertLog({ key: taskKey, cadence }, at, mediaId, {
      title: media.title,
      ...(status !== media.status ? { prior: { status: media.status } } : {})
    })
    return { logId, title: media.title, status }
  })()
}

// Episode ticks (video_file / tv_episode) keep what their logProgress did in
// the row's progress_undo, so un-ticking takes it back and tick/untick/tick
// nets one step rather than stacking. prior/after are null when the media row
// did not move (a held noRewatch tick) — then only the board credit is undone.
interface Tracking {
  progress: number
  status: string | null
  rewatchCount: number
}
interface EpisodeProgressUndo {
  logId: number | null
  prior: Tracking | null
  after: Tracking | null
}

function readTracking(mediaId: number): Tracking | undefined {
  const row = getSqlite()
    .prepare('SELECT progress, status, rewatch_count FROM media_item WHERE id = ?')
    .get(mediaId) as { progress: number; status: string | null; rewatch_count: number } | undefined
  return row && { progress: row.progress, status: row.status, rewatchCount: row.rewatch_count }
}

function sameTracking(a: Tracking, b: Tracking): boolean {
  return a.progress === b.progress && a.status === b.status && a.rewatchCount === b.rewatchCount
}

// logProgress for an episode tick; returns the footprint to store on the row.
export function logEpisodeProgress(
  mediaId: number,
  today: string,
  opts: { noRewatch?: boolean } = {}
): string {
  const tx = getSqlite().transaction((): string => {
    const before = readTracking(mediaId)
    const res = logProgress(mediaId, today, undefined, opts)
    const after = { progress: res.progress, status: res.status, rewatchCount: res.rewatchCount }
    const moved = before !== undefined && !sameTracking(before, after)
    const undo: EpisodeProgressUndo = {
      logId: res.logId,
      prior: moved ? before : null,
      after: moved ? after : null
    }
    return JSON.stringify(undo)
  })
  return tx()
}

// Un-tick: drop the tick's board credit, then restore the media row exactly
// when nothing has moved it since, or step progress back one when later ticks
// or edits have.
export function retractEpisodeProgress(mediaId: number, footprint: string): void {
  let undo: EpisodeProgressUndo
  try {
    undo = JSON.parse(footprint) as EpisodeProgressUndo
  } catch {
    return
  }
  const db = getSqlite()
  const tx = db.transaction(() => {
    if (undo.logId != null) {
      // Already undone on the board, which restored the row itself.
      if (db.prepare('DELETE FROM checklist_log WHERE id = ?').run(undo.logId).changes === 0) return
    }
    if (!undo.prior || !undo.after) return
    const now = readTracking(mediaId)
    if (!now) return
    if (sameTracking(now, undo.after)) {
      mediaRepo.update(mediaId, {
        progress: undo.prior.progress,
        status: undo.prior.status,
        rewatchCount: undo.prior.rewatchCount
      })
    } else if (now.progress > 0) {
      mediaRepo.update(mediaId, { progress: now.progress - 1 })
    }
  })
  tx()
}

// Credit the board WITHOUT touching media_item.progress.
//
// logProgress above is "I consumed one more unit" — it advances progress and,
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
    const target = mediaLogTaskFor(media.media_type, today)
    if (!target) return null
    return insertLog(target, today, mediaId, { title: media.title })
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
      // A deleted media row just makes this a zero-row UPDATE. A session's
      // prior carries status only.
      mediaRepo.update(row.media_id, {
        status: prior.status,
        ...(prior.progress != null ? { progress: prior.progress } : {}),
        ...(prior.rewatchCount != null ? { rewatchCount: prior.rewatchCount } : {})
      })
    }
  })
  tx()
}

function periodSum(taskKey: string, cadence: ChecklistCadence, periodKey: string): number {
  return (
    getSqlite()
      .prepare(
        `SELECT COALESCE(SUM(amount), 0) AS n FROM checklist_log
         WHERE task_key = ? AND cadence = ? AND period_key = ?`
      )
      .get(taskKey, cadence, periodKey) as { n: number }
  ).n
}

// Ticking a manual item. Clamped at its target, so a checkbox can't stack up
// invisible rows — see credit() for the un-clamped form.
export function tick(
  taskKey: string,
  cadence: ChecklistCadence,
  today: string,
  day?: string | null
): number {
  const db = getSqlite()
  const at = editDay(today, day)
  const def = defOrThrow(taskKey)
  const row = db
    .prepare('SELECT target FROM checklist_task WHERE task_key = ? AND cadence = ?')
    .get(taskKey, cadence) as { target: number | null } | undefined
  const periodKey = periodKeyFor(cadence, at)
  if (periodSum(taskKey, cadence, periodKey) >= targetOf(row?.target ?? null, def)) {
    return (
      db
        .prepare(
          `SELECT id FROM checklist_log WHERE task_key = ? AND cadence = ? AND period_key = ?
           ORDER BY id DESC LIMIT 1`
        )
        .get(taskKey, cadence, periodKey) as { id: number }
    ).id
  }
  return credit(taskKey, cadence, today, 1, at)
}

// Manual credit toward an item: `amount` units (minutes, sets…). This is what
// makes a `detected` item possible to finish when the activity happened
// outside the app — the credit adds on top of whatever was detected, and is
// undoable on its own.
export function credit(
  taskKey: string,
  cadence: ChecklistCadence,
  today: string,
  amount = 1,
  day?: string | null
): number {
  const def = defOrThrow(taskKey)
  // A media item is finished by picking a title, which writes the media_id and
  // the prior-state payload undo needs. Crediting one by hand would mark the
  // board done with nothing logged and nothing to restore.
  if (def.kind === 'mediaLog' || def.kind === 'mediaSession') {
    throw new Error(`Checklist item ${taskKey} is logged by picking a title, not credited by hand`)
  }
  const n = Math.floor(Number(amount))
  if (!Number.isFinite(n) || n < 1 || n > 100_000) throw new Error('Credit must be a positive amount')
  return insertLog({ key: taskKey, cadence }, editDay(today, day), null, null, n)
}

export function untick(
  taskKey: string,
  cadence: ChecklistCadence,
  today: string,
  day?: string | null
): void {
  getSqlite()
    .prepare(
      `DELETE FROM checklist_log WHERE id = (
         SELECT id FROM checklist_log WHERE task_key = ? AND cadence = ? AND period_key = ?
         ORDER BY id DESC LIMIT 1
       )`
    )
    .run(taskKey, cadence, periodKeyFor(cadence, editDay(today, day)))
}

// ---- detection ----

// Each source is one timestamp column the app already writes. Every source
// stores UTC timestamps, so periods are grouped through date(col,'localtime')
// — the japaneseRepo.stats() idiom. A week groups by its Saturday:
// date(d,'-6 days','weekday 6') is the Saturday on or before d.
//
// Every read is bounded below by the history window's start, passed in from
// today, so the scan stops growing with history and tests can pin the date.
interface DetectSpec {
  table: string
  at: string
  value: string
  where?: string
  params?: unknown[]
}

const DETECT: Record<ChecklistDetectSource, DetectSpec> = {
  // Each review direction of a card is its own card (as introducedToday counts).
  jpReviews: { table: 'jp_review_log', at: 'reviewed_at', value: "COUNT(DISTINCT card_id || ':' || direction)" },
  jpLesson: {
    table: 'jp_lesson',
    at: 'learned_at',
    value: 'COUNT(*)',
    where: 'learned = 1 AND learned_at IS NOT NULL'
  },
  enReviews: { table: 'en_review_log', at: 'reviewed_at', value: 'COUNT(DISTINCT word_id)' },
  quizRound: { table: 'quiz_session', at: 'played_at', value: 'COUNT(*)' },
  gameSession: { table: 'game_session', at: 'started_at', value: 'COUNT(*)' },
  progLesson: { table: 'prog_progress', at: 'completed_at', value: 'COUNT(*)' },
  // Whole minutes across the period's sessions.
  gameMinutes: {
    table: 'game_session',
    at: 'started_at',
    value: 'CAST(COALESCE(SUM(duration), 0) / 60 AS INTEGER)'
  },
  jpDrill: {
    table: 'quiz_session',
    at: 'played_at',
    value: 'COUNT(*)',
    where: `kind IN (${JP_QUIZ_KINDS.map(() => '?').join(',')})`,
    params: JP_QUIZ_KINDS
  },
  jpTutor: { table: 'jp_tutor_day', at: 'ended_at', value: 'COUNT(*)' },
  // Every English quiz kind is named english… (QuizKind in shared/types.ts).
  enDrill: { table: 'quiz_session', at: 'played_at', value: 'COUNT(*)', where: "kind LIKE 'english%'" },
  enWriting: { table: 'en_writing', at: 'created_at', value: 'COUNT(*)' },
  // prog_solve keeps one row per exercise, stamped at the first solve.
  progSolve: { table: 'prog_solve', at: 'solved_at', value: 'COUNT(*)' }
}

function periodCounts(
  source: ChecklistDetectSource,
  cadence: ChecklistCadence,
  since: string
): Map<string, number> {
  const spec = DETECT[source]
  const day = `date(${spec.at}, 'localtime')`
  const group = cadence === 'weekly' ? `date(${spec.at}, 'localtime', '-6 days', 'weekday 6')` : day
  const rows = getSqlite()
    .prepare(
      `SELECT ${group} AS period, ${spec.value} AS n FROM ${spec.table}
       WHERE ${spec.where ? `${spec.where} AND ` : ''}${day} >= ?
       GROUP BY period`
    )
    .all(...(spec.params ?? []), since) as { period: string | null; n: number }[]
  const out = new Map<string, number>()
  for (const r of rows) if (r.period) out.set(r.period, r.n)
  return out
}

// ---- the one read ----

interface Item {
  task: TaskRow
  def: ItemDef
  rules: Rule[]
}

function suggestionsFor(def: ItemDef): ChecklistSuggestion[] {
  if (!def.mediaType) return []
  // A film is logged once; a suggestion would only ever offer a rewatch.
  if (def.kind === 'mediaLog' && !isUnitProgress(def.mediaType)) return []
  const statuses = statusesFor(def.mediaType)
  const completed = statuses[1] ?? null
  const db = getSqlite()
  const recent = db
    .prepare(
      `SELECT m.id, m.title, m.cover_path, m.status, m.progress, m.total_units
       FROM checklist_log l JOIN media_item m ON m.id = l.media_id
       WHERE l.task_key = ? AND m.media_type = ?
       GROUP BY m.id ORDER BY MAX(l.id) DESC LIMIT 6`
    )
    .all(def.key, def.mediaType) as {
    id: number
    title: string
    cover_path: string | null
    status: string | null
    progress: number
    total_units: number | null
  }[]
  // A finished title would wrap into a new pass on one click: leave it to the
  // picker, which labels that.
  const open = recent.filter(
    (m) =>
      m.status !== completed &&
      !(def.kind === 'mediaLog' && m.total_units != null && m.total_units > 0 && m.progress >= m.total_units)
  )
  const inProgress = statuses[0]
    ? (db
        .prepare(
          `SELECT id, title, cover_path FROM media_item WHERE media_type = ? AND status = ?
           ORDER BY updated_at DESC, id DESC LIMIT 3`
        )
        .all(def.mediaType, statuses[0]) as { id: number; title: string; cover_path: string | null }[])
    : []
  const out: ChecklistSuggestion[] = []
  const seen = new Set<number>()
  for (const m of [...open, ...inProgress]) {
    if (seen.has(m.id)) continue
    seen.add(m.id)
    out.push({ mediaId: m.id, title: m.title, coverPath: m.cover_path })
    if (out.length === 3) break
  }
  return out
}

export function status(today: string, day?: string | null): ChecklistStatus {
  const db = getSqlite()
  const view = viewDay(today, day)
  const windowStart = earliestEditable(today)
  const weekWindowStart = weeklyKey(windowStart)

  // Removed rows stay in: their rules still judge the periods they were on
  // the board for. Only the visible board filters them out.
  const taskRows = db
    .prepare(
      `SELECT id, task_key, cadence, target, days, sort_order, removed_at,
              date(created_at, 'localtime') AS created_day
       FROM checklist_task ORDER BY sort_order ASC, id ASC`
    )
    .all() as TaskRow[]
  const custom = loadCustomDefs()
  const allRules = loadRules()
  // A key the catalog no longer knows about is skipped rather than fatal.
  const items: Item[] = []
  for (const task of taskRows) {
    const def = resolveDef(task.task_key, custom)
    if (def) items.push({ task, def, rules: rulesFor(task, allRules) })
  }

  const skipRows = db
    .prepare('SELECT task_id, cadence, period_key FROM checklist_skip WHERE period_key >= ?')
    .all(weekWindowStart) as { task_id: number; cadence: string; period_key: string }[]
  const skips = new Set(skipRows.map((r) => `${r.task_id}|${r.cadence}|${r.period_key}`))
  const isRestDay = (d: string): boolean => skips.has(`${REST_DAY}|daily|${d}`)

  const logRows = db
    .prepare(
      `SELECT task_key, cadence, period_key, SUM(amount) AS n FROM checklist_log
       WHERE period_key >= ? GROUP BY task_key, cadence, period_key`
    )
    .all(weekWindowStart) as { task_key: string; cadence: string; period_key: string; n: number }[]
  const logged = new Map(logRows.map((r) => [`${r.task_key}|${r.cadence}|${r.period_key}`, r.n]))

  const detectCache = new Map<string, Map<string, number>>()
  const detectedIn = (source: ChecklistDetectSource, cadence: ChecklistCadence, period: string): number => {
    const cacheKey = `${source}|${cadence}`
    let counts = detectCache.get(cacheKey)
    if (!counts) {
      counts = periodCounts(source, cadence, cadence === 'weekly' ? weekWindowStart : windowStart)
      detectCache.set(cacheKey, counts)
    }
    return counts.get(period) ?? 0
  }

  const currentPeriod = (c: ChecklistCadence): string => periodKeyFor(c, today)

  const evaluate = (
    item: Item,
    period: string
  ): {
    state: ChecklistPeriodState
    rule: Rule | undefined
    detected: number
    credited: number
    target: number
    due: boolean
    skipped: boolean
  } => {
    const { task, def } = item
    const weekly = task.cadence === 'weekly'
    const rule = ruleAt(item.rules, period)
    const active = !!rule && rule.active
    const due = weekly || isDueOn(rule?.days ?? null, period)
    const skipped =
      skips.has(`${task.id}|${task.cadence}|${period}`) || (!weekly && isRestDay(period))
    const detected =
      def.kind === 'detected' && def.source ? detectedIn(def.source, task.cadence, period) : 0
    const credited = logged.get(`${task.task_key}|${task.cadence}|${period}`) ?? 0
    const target = targetOf(rule?.target ?? null, def)
    const cur = currentPeriod(task.cadence)
    const state = itemPeriodState({
      active,
      due,
      skipped,
      progress: detected + credited,
      target,
      current: period === cur,
      future: period > cur
    })
    return { state, rule, detected, credited, target, due, skipped }
  }

  // Ascending periods for an item, from the window start to the current one.
  const periodsOf = (cadence: ChecklistCadence): string[] => {
    const out: string[] = []
    const step = cadence === 'weekly' ? 7 : 1
    const end = currentPeriod(cadence)
    for (let p = cadence === 'weekly' ? weekWindowStart : windowStart; p <= end; p = addDays(p, step)) {
      out.push(p)
    }
    return out
  }
  const dayPeriods = periodsOf('daily')
  const weekPeriods = periodsOf('weekly')

  const hydrate = (item: Item): ChecklistTaskStatus => {
    const { task, def } = item
    const weekly = task.cadence === 'weekly'
    const period = periodKeyFor(task.cadence, view)
    const now = evaluate(item, period)

    // Log rows mean different things per kind: the logged titles for a media
    // item, the ticks for a manual one, and hand-added credits on top of
    // detection for a detected one. All are undoable the same way.
    const logs = db
      .prepare(
        `SELECT l.id, l.media_id, l.payload, l.amount, l.created_at, m.title AS live_title
         FROM checklist_log l
         LEFT JOIN media_item m ON m.id = l.media_id
         WHERE l.task_key = ? AND l.cadence = ? AND l.period_key = ?
         ORDER BY l.id ASC`
      )
      .all(task.task_key, task.cadence, period) as LogRow[]
    const entries: ChecklistLogEntry[] = logs.map((l) => ({
      id: l.id,
      mediaId: l.media_id,
      title: l.live_title ?? parsePayload(l.payload).title ?? null,
      amount: l.amount,
      createdAt: l.created_at
    }))

    const history = (weekly ? weekPeriods : dayPeriods).map((p) => evaluate(item, p).state)
    const rateWindow = history.slice(-(weekly ? RATE_WEEKS : RATE_DAYS))
    const rateDone = rateWindow.filter((s) => s === 'done').length
    const rateMissed = rateWindow.filter((s) => s === 'missed').length

    const stripPeriods = weekly
      ? Array.from({ length: STRIP_WEEKS }, (_, i) => addDays(period, -7 * (STRIP_WEEKS - 1 - i)))
      : weekDays(view)
    const strip = stripPeriods.map((p) => ({ period: p, state: evaluate(item, p).state }))

    return {
      id: task.id,
      key: def.key,
      cadence: task.cadence,
      label: def.label,
      hint: def.hint,
      note: def.note,
      unit: def.unit ?? null,
      kind: def.kind,
      customId: def.customId,
      route: def.route ?? null,
      mediaType: def.mediaType ?? null,
      // The viewed period's rule: today it matches the row, an earlier day keeps
      // the target it had then.
      target: now.target,
      defaultTarget: def.target,
      days: task.days,
      due: now.due,
      skipped: now.skipped,
      detected: now.detected,
      credited: now.credited,
      progress: now.detected + now.credited,
      done: now.detected + now.credited >= now.target,
      state: now.state,
      entries,
      streak: checklistStreak(history),
      rate: { done: rateDone, due: rateDone + rateMissed },
      strip,
      suggestions: view === today ? suggestionsFor(def) : []
    }
  }

  const visible = items.filter((i) => i.task.removed_at == null)
  const daily = visible.filter((i) => i.task.cadence === 'daily').map(hydrate)
  const weekly = visible.filter((i) => i.task.cadence === 'weekly').map(hydrate)

  // Whole days, judged by every daily item on the board on that day — removed
  // ones included, through their rules.
  const dailyItems = items.filter((i) => i.task.cadence === 'daily')
  const dayCell = (d: string): ChecklistDayCell => {
    const states = dailyItems.map((i) => evaluate(i, d).state)
    const counted = states.filter((s) => s === 'done' || s === 'missed' || s === 'pending')
    return {
      day: d,
      state: dayState(states, { restDay: isRestDay(d), current: d === today, future: d > today }),
      done: counted.filter((s) => s === 'done').length,
      due: counted.length
    }
  }

  const firstActive = dailyItems
    .flatMap((i) => i.rules.filter((r) => r.active).map((r) => r.from))
    .reduce<string | null>((min, d) => (min == null || d < min ? d : min), null)
  const history: ChecklistStatus['history'] = []
  const dayStates: ChecklistPeriodState[] = []
  if (firstActive != null && firstActive <= today) {
    const start = firstActive < windowStart ? windowStart : firstActive
    for (const d of dayPeriods) {
      if (d < start) continue
      const cell = dayCell(d)
      dayStates.push(cell.state)
      history.push({ day: d, count: cell.done, skipped: cell.state === 'skipped' })
    }
  }

  const weekCells = weekDays(view).map(dayCell)
  const viewCell = weekCells.find((c) => c.day === view)!

  return {
    today,
    day: view,
    week: periodRange('weekly', view),
    restDay: isRestDay(view),
    summary: { done: viewCell.done, due: viewCell.due },
    daily,
    weekly,
    streak: checklistStreak(dayStates),
    weekDays: weekCells,
    history
  }
}
