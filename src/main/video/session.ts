import { statSync } from 'fs'
import type { ChildProcessWithoutNullStreams } from 'child_process'
import { buildConvertArgs, type PlaybackPlan } from './playability'
import { progressEta, progressPercent, type FfProgress } from './progressParse'
import { runFfmpeg } from './ffmpeg'
import * as cache from './cache'
import * as tasks from '../tasks'
import { processControls } from '../taskControls'
import type { TaskControls } from '../tasks'
import type { TaskState, VideoPrepareStatus } from '@shared/types'

// One conversion at a time, reported through a polled status object — the
// musicDownload.ts shape verbatim, because this app has no push channel.

// Total by construction, so a new prepare state can't leave a Tasks row live
// forever.
const PREPARE_STATE: Record<NonNullable<VideoPrepareStatus>['state'], TaskState> = {
  probing: 'running',
  converting: 'running',
  finalizing: 'running',
  done: 'done',
  error: 'error',
  cancelled: 'cancelled'
}

let counter = 0
let active: {
  id: string
  proc: ChildProcessWithoutNullStreams
  cancelled: boolean
  partPath: string
} | null = null
let status: VideoPrepareStatus | null = null

export function getPrepareStatus(): VideoPrepareStatus | null {
  return status ? { ...status } : null
}

export function isBusy(): boolean {
  return active != null
}

export interface PrepareInput {
  absPath: string
  sourceLabel: string
  plan: PlaybackPlan
  durationSec: number | null
  maxHeight?: number | null
}

// Fire-and-poll: returns as soon as ffmpeg is spawned. Throws synchronously for
// anything the caller can fix (already busy, nothing to convert), so the UI can
// show a real message instead of a status that never starts.
export function startPrepare(input: PrepareInput): { id: string } {
  if (active) throw new Error('Another video is already being prepared.')
  if (input.plan.action !== 'remux' && input.plan.action !== 'transcode') {
    throw new Error('This file does not need converting.')
  }
  const container = input.plan.container ?? 'mp4'

  let st: { mtimeMs: number; size: number }
  try {
    const s = statSync(input.absPath)
    st = { mtimeMs: s.mtimeMs, size: s.size }
  } catch {
    throw new Error('That file is no longer on disk.')
  }

  const key = cache.cacheKey({
    absPath: input.absPath,
    mtimeMs: st.mtimeMs,
    size: st.size,
    plan: input.plan
  })
  const { fileName, partPath } = cache.partPathFor(key, container)

  // A stream copy is roughly the source size; a transcode is usually smaller.
  // Rough is fine — this only decides what to evict, before anything is written.
  cache.evictToCap(st.size, key)

  counter += 1
  const id = `vid-${counter}`
  const action = input.plan.action
  status = {
    id,
    sourceLabel: input.sourceLabel,
    state: 'converting',
    action,
    percent: 0,
    speed: null,
    etaSec: null,
    outputRelPath: null,
    message: input.plan.reason
  }

  // Task registry row. PreparePanel keeps reading the status object above for
  // the things only it needs (speed, ETA, the output path); this is the
  // normalized view for the Tasks page.
  const task = tasks.create({
    kind: 'videoPrepare',
    label: `${action === 'remux' ? 'Remuxing' : 'Transcoding'}: ${input.sourceLabel}`,
    controls: prepareControls(id),
    project: () =>
      status?.id === id
        ? {
            state: PREPARE_STATE[status.state],
            detail: status.speed ? `${status.state} at ${status.speed}` : status.state,
            percent: status.percent,
            error: status.state === 'error' ? status.message : null
          }
        : null
  })

  const args = buildConvertArgs({
    input: input.absPath,
    output: partPath,
    plan: input.plan,
    maxHeight: input.maxHeight
  })

  const onProgress = (p: FfProgress): void => {
    // Stale-run guard: a cancelled-then-restarted job must not be able to write
    // into the newer run's status.
    if (!status || status.id !== id) return
    const pct = progressPercent(p, input.durationSec)
    // +faststart rewrites the whole file after encoding finishes. Without a
    // distinct state here a 20GB remux sits at 100% looking hung for minutes.
    status.state = p.ended || pct === 100 ? 'finalizing' : 'converting'
    status.percent = pct
    status.speed = p.speed
    status.etaSec = progressEta(p, input.durationSec)
  }

  // task.id so ffmpeg's stderr is attributable to this conversion in the log.
  const { proc, done } = runFfmpeg(args, onProgress, task.id)
  active = { id, proc, cancelled: false, partPath }

  void done.then(({ code, stderr }) => {
    const wasCancelled = active?.id === id && active.cancelled
    if (active?.id === id) active = null
    if (!status || status.id !== id) return

    if (wasCancelled) {
      cache.abort(partPath)
      status.state = 'cancelled'
      status.message = 'Cancelled.'
      return
    }
    if (code !== 0) {
      // Any non-zero exit or spawn failure: the .part goes, so a truncated file
      // can never be picked up as a cache hit.
      cache.abort(partPath)
      status.state = 'error'
      status.percent = null
      status.message =
        code == null
          ? `Could not run "${stderr}" — install ffmpeg or set its path in Settings.`
          : stderr || `ffmpeg exited with code ${code}`
      return
    }
    try {
      const entry = cache.commit({
        key,
        fileName,
        partPath,
        sourcePath: input.absPath,
        action
      })
      status.state = 'done'
      status.percent = 100
      status.outputRelPath = entry.relPath
      status.message = null
    } catch (err) {
      cache.abort(partPath)
      status.state = 'error'
      status.message = err instanceof Error ? err.message : String(err)
    }
  })

  return { id }
}

// Pause (SIGSTOP) + cancel for this conversion's ffmpeg. Shared by the task row
// and cancelPrepare so the SIGCONT-before-SIGTERM ordering lives in one place.
// Note ffmpeg's own speed/ETA read wrong for a few seconds after a resume — its
// wall clock kept running while stopped — so the row's 'paused' state, not a
// stalled percentage, is what the UI should trust.
function prepareControls(id: string): TaskControls {
  return processControls(() => (active?.id === id ? active.proc : null), {
    onCancel: () => {
      if (active?.id === id) active.cancelled = true
    }
  })
}

export function cancelPrepare(id: string): void {
  if (!active || active.id !== id) return
  prepareControls(id).cancel?.()
}

// Joins killActiveMusicDownload / abortActiveCoachTurn / killActiveUpdate in
// the before-quit list.
export function killActivePrepare(): void {
  if (!active) return
  active.cancelled = true
  try {
    active.proc.kill('SIGKILL')
  } catch {
    // Already gone.
  }
  cache.abort(active.partPath)
  active = null
}
