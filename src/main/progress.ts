import type { ActivityStatus } from '@shared/types'
import * as tasks from './tasks'
import { TaskCancelledError } from './tasks'
import type { TaskHandle } from './tasks'
import { runWithActivitySignal } from './activityContext'

// Re-exported: importers and ipc.ts reason about cancellation through this
// module, not the registry.
export { TaskCancelledError }

// One global slot for the current long-running main-process activity (an
// import, a theme-song fetch). The renderer polls `activity:status` — the
// app's convention for progress (no push events). Single-user app: activities
// don't overlap in practice; a second begin simply takes over the slot.
//
// This module is ALSO the adapter that puts all 17 withActivity call sites in
// ipc.ts into the task registry, with no edits at any of them: begin creates a
// task, update/imageProgress forward to it, end settles it. The ActivityStatus
// shape below is deliberately untouched, so activity:status, useActivity() and
// the ImportDialog bar keep working byte-for-byte.
const state: ActivityStatus = { active: false, label: '', phase: 'fetching', done: 0, total: 0 }

let handle: TaskHandle | null = null
// False when a caller passed its own handle (bulkImport, wrestling): that
// caller owns the settle, so endActivity must not close its task.
let ownsHandle = false

export function getActivity(): ActivityStatus {
  return { ...state }
}

// Returns the task behind this activity. withActivity captures it so it can
// settle ITS OWN task: two overlapping imports share the single slot, so
// settling "whatever is in the slot now" would close the wrong one and leave
// the other running forever.
export function beginActivity(
  label: string,
  opts: { attachTo?: TaskHandle; onCancel?: () => void } = {}
): TaskHandle {
  Object.assign(state, { active: true, label, phase: 'fetching', done: 0, total: 0 })
  handle =
    opts.attachTo ??
    tasks.create({
      kind: 'import',
      label,
      // Cancel with NO importer edits at all: the registry only needs a
      // control registered, and the checkpoints in updateActivity /
      // imageProgress below do the rest. downloadImages calls imageProgress
      // after every image — the long phase of an import — so a cancel lands
      // within one image rather than at the end of the fetch.
      //
      // No pause: an import holds no resumable state between phases, and a
      // half-paused one would sit on open HTTP connections for as long as the
      // user left it.
      controls: {
        cancel: () => opts.onCancel?.(),
        pauseNote: 'Imports cannot be paused — stop and re-run instead'
      }
    })
  ownsHandle = opts.attachTo == null
  return handle
}

export function updateActivity(
  patch: Partial<Pick<ActivityStatus, 'phase' | 'done' | 'total'>>
): void {
  if (!state.active) return
  Object.assign(state, patch)
  handle?.progress({ detail: state.phase, done: state.done, total: state.total })
  throwIfCancelled()
}

// Called by files.downloadImages after every finished image, so every importer
// gets image-download progress for free (it's the long phase of an import) —
// and, since the cancel check rides along, cancel lands within one image
// without a single importer having to know about it.
export function imageProgress(done: number, total: number): void {
  if (!state.active) return
  Object.assign(state, { phase: 'images', done, total })
  handle?.progress({
    detail: 'images',
    done,
    total,
    percent: total > 0 ? Math.round((done / total) * 100) : null
  })
  throwIfCancelled()
}

// Thrown out of updateActivity/imageProgress when the task behind the current
// activity has been cancelled. Every importer already calls those, so this is
// what gives 20 importers a working Stop button with zero edits to any of them.
function throwIfCancelled(): void {
  if (handle?.cancelRequested()) throw new TaskCancelledError(state.label)
}

// The slot-owning form, for the callers that bracket themselves
// (bulkImport.ts, wrestling/importRun.ts). Pass back the handle beginActivity
// returned: a dialog import started mid-run takes the slot, and settling or
// clearing "whatever is in the slot now" would mark that still-running import
// done and blank the progress bar it is using.
export function endActivity(err?: unknown, own?: TaskHandle): void {
  if (own != null && handle !== own) return
  if (ownsHandle && handle) settleHandle(handle, err)
  clearSlot()
}

function settleHandle(target: TaskHandle, err?: unknown): void {
  if (err instanceof TaskCancelledError) target.settle({ state: 'cancelled' })
  else if (err) target.settle({ state: 'error', error: errText(err) })
  else target.settle({ state: 'done' })
}

function clearSlot(): void {
  handle = null
  ownsHandle = false
  Object.assign(state, { active: false, label: '', phase: 'fetching', done: 0, total: 0 })
}

function errText(err: unknown): string {
  return err instanceof Error ? err.message : String(err)
}

// Wraps a long-running task in begin/end so the ipc.ts handlers stay
// one-liners and the slot can never be left dangling on a throw.
export async function withActivity<T>(label: string, fn: () => Promise<T>): Promise<T> {
  const controller = new AbortController()
  const own = beginActivity(label, { onCancel: () => controller.abort() })
  try {
    const result = await runWithActivitySignal(controller.signal, fn)
    if (own.cancelRequested()) throw new TaskCancelledError(label)
    finishOwn(own)
    return result
  } catch (err) {
    // Settles the task 'cancelled' rather than 'error' when the user asked for
    // it — the Tasks page must not paint a deliberate stop red.
    const outcome = own.cancelRequested() ? new TaskCancelledError(label) : err
    finishOwn(own, outcome)
    throw outcome
  }
}

// Settles the task THIS call created, and releases the slot only if it still
// holds it. Two overlapping imports would otherwise close each other's task
// (and the first to finish would blank the pill the second is still using).
function finishOwn(own: TaskHandle, err?: unknown): void {
  settleHandle(own, err)
  if (handle === own) clearSlot()
}
