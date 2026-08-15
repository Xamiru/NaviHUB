// The task registry: one normalized row per long-running main-process job, so
// the renderer can see everything at once, pause it and cancel it.
//
// THE DESIGN DECISION, because it explains every odd thing below: this
// registry does NOT replace the ~18 bespoke *Status channels, and no subsystem
// pushes a second copy of its progress into it. Each subsystem keeps writing
// only its own status object and registers a pure `project()` that READS it.
// One source of truth, ~10 lines per subsystem, and a bug in a projection can
// only produce a wrong row on the Tasks page — it structurally cannot break a
// working panel (the alternative was rewriting 18 UI surfaces with no renderer
// tests to catch the fallout).
//
// Imports logBus only — no electron, no fs, no timers. Retention is evaluated
// lazily inside list(); achievementWatcher.ts owns the app's one main-side
// interval and this must not add a second.
import { log } from './logBus'
import type { LogLevel, TaskKind, TaskSnapshot, TaskState } from '@shared/types'

export interface TaskControls {
  cancel?: () => void
  pause?: () => void
  resume?: () => void
  // Why pause is unavailable, surfaced as the disabled button's tooltip.
  pauseNote?: string | null
  // A SIGSTOPped child stops instantly; a cooperative loop only pauses at its
  // next iteration boundary and reports 'paused' itself when it actually blocks.
  pauseIsInstant?: boolean
}

// What a subsystem's status object maps onto. Every field optional: a
// projection reports only what it knows.
export interface TaskProjection {
  state?: TaskState
  detail?: string | null
  percent?: number | null
  done?: number
  total?: number
  error?: string | null
}

export interface TaskInit {
  kind: TaskKind
  label: string
  route?: string | null
  // Torrent searches fire on every keystroke-ish interaction; without this
  // they would fill the finished list. Evicted after a minute, one per kind.
  ephemeral?: boolean
  controls?: TaskControls
  // Return null once this run is stale (a newer run took the module's slot) —
  // the registry then settles the row 'cancelled: superseded by a newer run'.
  // A projection must therefore NEVER return null for a run that is still
  // going; report its state instead.
  project?: () => TaskProjection | null
}

export interface TaskHandle {
  readonly id: string
  progress(patch: TaskProjection): void
  log(level: LogLevel, message: string): void
  setControls(controls: TaskControls): void
  // Cheap reads for a cooperative loop's gate.
  pauseRequested(): boolean
  cancelRequested(): boolean
  // False once settled — mirrors the `status.id !== id` staleness guards the
  // subsystems already keep.
  isCurrent(): boolean
  settle(outcome: { state: 'done' | 'cancelled' | 'error'; error?: string | null }): void
}

// Thrown by a job that noticed its own cancel flag. Settles the task
// 'cancelled' rather than 'error' — a deliberate stop must never be painted
// red — and REJECTS to the caller rather than resolving undefined, because
// callers like ImportDialog do `const item = await …` and then read item.id.
// The message is written for a human: the renderer's global
// unhandledrejection net toasts it, which after clicking Stop is the right
// feedback rather than a spurious failure.
export class TaskCancelledError extends Error {
  constructor(label: string) {
    super(`Cancelled: ${label}`)
    this.name = 'TaskCancelledError'
  }
}

// Controls for a job that has nothing to signal — its loop polls
// handle.cancelRequested() instead. The registry's own flag IS the mechanism,
// so the control only has to exist for canCancel to be true.
export function flagCancel(pauseNote?: string): TaskControls {
  return { cancel: () => undefined, pauseNote: pauseNote ?? null }
}

type TerminalState = 'done' | 'cancelled' | 'error'
const TERMINAL_STATES: ReadonlySet<string> = new Set<TerminalState>(['done', 'cancelled', 'error'])

function isTerminal(state: TaskState): state is TerminalState {
  return TERMINAL_STATES.has(state)
}

// Retention, evaluated lazily in list().
const FINISHED_MS = 30 * 60_000
const EPHEMERAL_MS = 60_000
const FINISHED_CAP = 40

interface TaskRecord {
  id: string
  // Monotonic creation order. Load-bearing as a SORT TIE-BREAK: a burst of
  // quick tasks settles within the same millisecond, and ordering by
  // startedAt/endedAt alone would then be arbitrary — which the retention
  // prune turns into "keeps the wrong 40".
  seq: number
  kind: TaskKind
  label: string
  route: string | null
  ephemeral: boolean
  detail: string | null
  state: TaskState
  percent: number | null
  done: number
  total: number
  error: string | null
  startedAt: number
  endedAt: number | null
  // Pause-aware elapsed: accumulated paused time, plus the open interval.
  pausedMs: number
  pausedAt: number | null
  controls: TaskControls
  project: (() => TaskProjection | null) | null
  pauseWanted: boolean
  cancelWanted: boolean
}

const tasks: TaskRecord[] = []
let counter = 0

export function create(init: TaskInit): TaskHandle {
  const now = Date.now()
  const seq = ++counter
  const rec: TaskRecord = {
    id: `${init.kind}-${seq}`,
    seq,
    kind: init.kind,
    label: init.label,
    route: init.route ?? null,
    ephemeral: init.ephemeral ?? false,
    detail: null,
    state: 'running',
    percent: null,
    done: 0,
    total: 0,
    error: null,
    startedAt: now,
    endedAt: null,
    pausedMs: 0,
    pausedAt: null,
    controls: init.controls ?? {},
    project: init.project ?? null,
    pauseWanted: false,
    cancelWanted: false
  }
  tasks.push(rec)
  log('info', 'task', `started: ${rec.label}`, rec.id)
  return handleFor(rec)
}

// For the awaited `const state = { running: boolean, … }` family (music scan,
// art fetch, dictionary import, the JP deck builders): creates the task, runs
// fn, settles from the outcome. The projection still reads the caller's own
// state object, so nothing about how that subsystem reports progress changes.
export async function runTask<T>(init: TaskInit, fn: (handle: TaskHandle) => Promise<T>): Promise<T> {
  const handle = create(init)
  try {
    const result = await fn(handle)
    handle.settle({ state: handle.cancelRequested() ? 'cancelled' : 'done' })
    return result
  } catch (err) {
    // A job that threw BECAUSE it was cancelled settles 'cancelled', not
    // 'error' — the Tasks page must not paint a deliberate stop red.
    handle.settle(
      err instanceof TaskCancelledError || handle.cancelRequested()
        ? { state: 'cancelled' }
        : { state: 'error', error: err instanceof Error ? err.message : String(err) }
    )
    throw err
  }
}

function handleFor(rec: TaskRecord): TaskHandle {
  return {
    id: rec.id,
    progress: (patch) => apply(rec, patch),
    log: (level, message) => log(level, 'task', message, rec.id),
    setControls: (controls) => {
      rec.controls = controls
    },
    pauseRequested: () => rec.pauseWanted,
    cancelRequested: () => rec.cancelWanted,
    isCurrent: () => !isTerminal(rec.state),
    settle: (outcome) => settle(rec, outcome.state, outcome.error ?? null)
  }
}

function apply(rec: TaskRecord, patch: TaskProjection): void {
  if (isTerminal(rec.state)) return
  if (patch.detail !== undefined) rec.detail = patch.detail
  if (patch.percent !== undefined) rec.percent = patch.percent
  if (patch.done !== undefined) rec.done = patch.done
  if (patch.total !== undefined) rec.total = patch.total
  if (patch.error !== undefined) rec.error = patch.error
  if (patch.state !== undefined && patch.state !== rec.state) {
    if (isTerminal(patch.state)) {
      settle(rec, patch.state, patch.error ?? rec.error)
      return
    }
    setState(rec, patch.state)
  }
}

// The one place pause bookkeeping happens, so elapsedSec can never drift.
function setState(rec: TaskRecord, next: TaskState): void {
  if (rec.state === next) return
  if (next === 'paused' && rec.pausedAt == null) rec.pausedAt = Date.now()
  if (next !== 'paused' && rec.pausedAt != null) {
    rec.pausedMs += Date.now() - rec.pausedAt
    rec.pausedAt = null
  }
  rec.state = next
}

function settle(rec: TaskRecord, state: 'done' | 'cancelled' | 'error', error: string | null): void {
  if (isTerminal(rec.state)) return // idempotent
  setState(rec, state)
  rec.endedAt = Date.now()
  rec.error = error
  if (state === 'done') rec.percent = rec.percent == null && rec.total === 0 ? null : 100
  // Drop the closures: they capture subsystem state we should stop reading, and
  // a settled task must never look cancellable.
  rec.controls = {}
  rec.project = null
  rec.pauseWanted = false
  rec.cancelWanted = false
  const suffix = error ? `: ${error}` : ''
  log(state === 'error' ? 'error' : 'info', 'task', `${state}: ${rec.label}${suffix}`, rec.id)
}

// Pulls each live task's projection, prunes, and snapshots. Called by
// tasks:list — this IS the tick; there is no timer.
export function list(now = Date.now()): TaskSnapshot[] {
  refresh()
  prune(now)
  const live: TaskRecord[] = []
  const finished: TaskRecord[] = []
  for (const rec of tasks) (isTerminal(rec.state) ? finished : live).push(rec)
  // Live oldest-first so a row never jumps position as new work starts;
  // finished newest-first so the last thing that happened is at the top.
  live.sort((a, b) => a.startedAt - b.startedAt || a.seq - b.seq)
  finished.sort((a, b) => (b.endedAt ?? 0) - (a.endedAt ?? 0) || b.seq - a.seq)
  return [...live, ...finished].map((rec) => snapshot(rec, now))
}

export function get(id: string, now = Date.now()): TaskSnapshot | null {
  refresh()
  const rec = tasks.find((t) => t.id === id)
  return rec ? snapshot(rec, now) : null
}

function refresh(): void {
  for (const rec of tasks) {
    if (rec.project == null || isTerminal(rec.state)) continue
    let projected: TaskProjection | null
    try {
      projected = rec.project()
    } catch (err) {
      // One bad projection degrades its own row to the last known values. It
      // must never take out tasks:list for everything else.
      log('warn', 'task', `projection failed: ${err instanceof Error ? err.message : String(err)}`, rec.id)
      rec.project = null
      continue
    }
    // null = a newer run owns the module's slot. SETTLE it rather than just
    // dropping the closure: a row left 'running' is never terminal, so prune()
    // and clearFinished() both skip it forever, `tasks` grows unbounded, and
    // useTasks pins its poll at the active interval for the rest of the
    // session. Same wording bulkImport uses when it settles its own superseded
    // run — this is the fallback for the subsystems that don't.
    if (projected == null) {
      settle(rec, 'cancelled', 'superseded by a newer run')
      continue
    }
    apply(rec, projected)
  }
}

function prune(now: number): void {
  const dropped = new Set<TaskRecord>()
  const seenEphemeral = new Set<TaskKind>()
  // Newest-ended first, so "keep one ephemeral per kind" keeps the newest.
  const finished = tasks
    .filter((t) => isTerminal(t.state))
    .sort((a, b) => (b.endedAt ?? 0) - (a.endedAt ?? 0) || b.seq - a.seq)
  let kept = 0
  for (const rec of finished) {
    const age = now - (rec.endedAt ?? now)
    const stale = rec.ephemeral ? age > EPHEMERAL_MS : age > FINISHED_MS
    const supersededEphemeral = rec.ephemeral && seenEphemeral.has(rec.kind)
    if (stale || supersededEphemeral || kept >= FINISHED_CAP) {
      dropped.add(rec)
      continue
    }
    if (rec.ephemeral) seenEphemeral.add(rec.kind)
    kept++
  }
  if (dropped.size === 0) return
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (dropped.has(tasks[i]!)) tasks.splice(i, 1)
  }
}

function snapshot(rec: TaskRecord, now: number): TaskSnapshot {
  const openPause = rec.pausedAt == null ? 0 : now - rec.pausedAt
  const wall = (rec.endedAt ?? now) - rec.startedAt - rec.pausedMs - openPause
  return {
    id: rec.id,
    kind: rec.kind,
    label: rec.label,
    detail: rec.detail,
    state: rec.state,
    percent: rec.percent,
    done: rec.done,
    total: rec.total,
    startedAt: rec.startedAt,
    endedAt: rec.endedAt,
    elapsedSec: Math.max(0, Math.round(wall / 1000)),
    error: rec.error,
    canCancel: typeof rec.controls.cancel === 'function',
    canPause: typeof rec.controls.pause === 'function' && typeof rec.controls.resume === 'function',
    pauseNote: rec.controls.pauseNote ?? null,
    route: rec.route
  }
}

// ---- control dispatch ----

function live(id: string): TaskRecord | null {
  const rec = tasks.find((t) => t.id === id)
  return rec && !isTerminal(rec.state) ? rec : null
}

export function cancel(id: string): void {
  const rec = live(id)
  if (!rec || typeof rec.controls.cancel !== 'function') return
  rec.cancelWanted = true
  // A paused job must be released before it can notice the cancel — for a
  // child process taskControls sends SIGCONT first, for a loop the gate's
  // cancel() releases the waiter. Reflect that here too.
  rec.pauseWanted = false
  setState(rec, 'cancelling')
  log('info', 'task', `cancel requested: ${rec.label}`, rec.id)
  try {
    rec.controls.cancel()
  } catch (err) {
    log('warn', 'task', `cancel failed: ${err instanceof Error ? err.message : String(err)}`, rec.id)
  }
}

export function pause(id: string): void {
  const rec = live(id)
  if (!rec || typeof rec.controls.pause !== 'function') return
  if (rec.state === 'pausing' || rec.state === 'paused' || rec.state === 'cancelling') return
  rec.pauseWanted = true
  // Instant for a SIGSTOPped child; a loop reports 'paused' itself once its
  // gate actually blocks, which can be a whole item away.
  setState(rec, rec.controls.pauseIsInstant ? 'paused' : 'pausing')
  log('info', 'task', `pause requested: ${rec.label}`, rec.id)
  try {
    rec.controls.pause()
  } catch (err) {
    log('warn', 'task', `pause failed: ${err instanceof Error ? err.message : String(err)}`, rec.id)
    rec.pauseWanted = false
    setState(rec, 'running')
  }
}

export function resume(id: string): void {
  const rec = live(id)
  if (!rec || typeof rec.controls.resume !== 'function') return
  if (rec.state !== 'paused' && rec.state !== 'pausing') return
  rec.pauseWanted = false
  setState(rec, 'running')
  log('info', 'task', `resumed: ${rec.label}`, rec.id)
  try {
    rec.controls.resume()
  } catch (err) {
    log('warn', 'task', `resume failed: ${err instanceof Error ? err.message : String(err)}`, rec.id)
  }
}

export function clearFinished(): void {
  for (let i = tasks.length - 1; i >= 0; i--) {
    if (isTerminal(tasks[i]!.state)) tasks.splice(i, 1)
  }
}

// FIRST in the before-quit registry: stamps everything still live before the
// killers run, so a job that gets SIGKILLed on the way out reads as "cancelled
// (app quit)" rather than as a failure the user should worry about.
export function settleAllOnQuit(): void {
  for (const rec of tasks) {
    if (!isTerminal(rec.state)) settle(rec, 'cancelled', 'app quit')
  }
}

// Test seam (the task list and counter are module state).
export function __reset(): void {
  tasks.length = 0
  counter = 0
}
