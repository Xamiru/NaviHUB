import { beforeEach, describe, expect, it, vi } from 'vitest'
import * as tasks from '../src/main/tasks'
import type { TaskProjection } from '../src/main/tasks'
import { __reset as resetLog, readLog } from '../src/main/logBus'

// tasks.ts imports logBus only — no electron, no fs, no timers — so this file
// needs no mocks at all. `list(now)` takes an injectable clock so retention can
// be tested without fake timers fighting the module's own Date.now() calls.

beforeEach(() => {
  tasks.__reset()
  resetLog()
})

describe('lifecycle', () => {
  it('starts running and settles done', () => {
    const h = tasks.create({ kind: 'import', label: 'Importing from AniList' })
    let [row] = tasks.list()
    expect(row!.state).toBe('running')
    expect(row!.kind).toBe('import')
    expect(row!.endedAt).toBeNull()

    h.settle({ state: 'done' })
    ;[row] = tasks.list()
    expect(row!.state).toBe('done')
    expect(row!.endedAt).not.toBeNull()
  })

  it('mints ids that are never reused', () => {
    const a = tasks.create({ kind: 'import', label: 'a' })
    const b = tasks.create({ kind: 'import', label: 'b' })
    expect(a.id).not.toBe(b.id)
    a.settle({ state: 'done' })
    const c = tasks.create({ kind: 'import', label: 'c' })
    expect(c.id).not.toBe(a.id)
  })

  it('settle is idempotent and the first outcome wins', () => {
    const h = tasks.create({ kind: 'musicScan', label: 'Scanning music' })
    h.settle({ state: 'error', error: 'no such directory' })
    h.settle({ state: 'done' })
    const [row] = tasks.list()
    expect(row!.state).toBe('error')
    expect(row!.error).toBe('no such directory')
  })

  it('ignores progress after settling', () => {
    const h = tasks.create({ kind: 'import', label: 'x' })
    h.settle({ state: 'done' })
    h.progress({ done: 5, total: 10, detail: 'late' })
    const [row] = tasks.list()
    expect(row!.detail).toBeNull()
    expect(row!.done).toBe(0)
  })

  it('isCurrent goes false once settled — the staleness guard subsystems need', () => {
    const h = tasks.create({ kind: 'import', label: 'x' })
    expect(h.isCurrent()).toBe(true)
    h.settle({ state: 'cancelled' })
    expect(h.isCurrent()).toBe(false)
  })

  it('logs start and finish against the task id', () => {
    const h = tasks.create({ kind: 'import', label: 'Importing from TMDB' })
    h.settle({ state: 'done' })
    const lines = readLog({ afterSeq: 0.5, taskId: h.id }).entries.map((e) => e.message)
    expect(lines).toEqual(['started: Importing from TMDB', 'done: Importing from TMDB'])
  })
})

describe('projection', () => {
  it('pulls the subsystem status on every list()', () => {
    let status = { done: 1, total: 10, title: 'Bocchi' }
    tasks.create({
      kind: 'bulkImport',
      label: 'Bulk import',
      project: () => ({ done: status.done, total: status.total, detail: status.title })
    })

    expect(tasks.list()[0]!.done).toBe(1)
    status = { done: 7, total: 10, title: 'Chainsaw Man' }
    const row = tasks.list()[0]!
    expect(row.done).toBe(7)
    expect(row.detail).toBe('Chainsaw Man')
  })

  it('auto-settles when the projection reports a terminal state', () => {
    let state: TaskProjection['state'] = 'running'
    const project = vi.fn((): TaskProjection => ({ state }))
    tasks.create({ kind: 'mangaOcr', label: 'OCR', project })

    tasks.list()
    state = 'done'
    expect(tasks.list()[0]!.state).toBe('done')

    // And it stops being called — the subsystem's slot is no longer ours.
    const callsAfterSettle = project.mock.calls.length
    tasks.list()
    expect(project.mock.calls.length).toBe(callsAfterSettle)
  })

  it('SETTLES a run that goes stale (a newer run took the slot)', () => {
    let stale = false
    const project = vi.fn((): TaskProjection | null => (stale ? null : { done: 3 }))
    tasks.create({ kind: 'musicDownload', label: 'Download', project })

    expect(tasks.list()[0]!.done).toBe(3)
    stale = true
    tasks.list()
    // Not merely un-projected: a row left 'running' is never terminal, so
    // prune() and clearFinished() would both skip it for the rest of the
    // session and useTasks would hold its poll at the active interval.
    expect(tasks.list()[0]!.state).toBe('cancelled')
    expect(tasks.list()[0]!.error).toBe('superseded by a newer run')
    const calls = project.mock.calls.length
    tasks.list()
    expect(project.mock.calls.length).toBe(calls)
    // Last known values are kept rather than blanked.
    expect(tasks.list()[0]!.done).toBe(3)
  })

  it('a superseded run is then evictable, unlike a row stuck at running', () => {
    let stale = false
    tasks.create({
      kind: 'torrentSearch',
      label: 'Torrent search: hunter',
      project: (): TaskProjection | null => (stale ? null : { done: 1 })
    })
    tasks.list()
    stale = true
    tasks.list()
    tasks.clearFinished()
    expect(tasks.list()).toHaveLength(0)
  })

  it('a throwing projection degrades ONE row and never breaks the list', () => {
    tasks.create({
      kind: 'videoPrepare',
      label: 'Converting',
      project: () => {
        throw new Error('status object exploded')
      }
    })
    tasks.create({ kind: 'import', label: 'Importing', project: () => ({ done: 4, total: 4 }) })

    const rows = tasks.list()
    expect(rows).toHaveLength(2)
    expect(rows.find((r) => r.kind === 'import')!.done).toBe(4)
    expect(rows.find((r) => r.kind === 'videoPrepare')!.state).toBe('running')
    expect(readLog({ afterSeq: 0.5 }).entries.some((e) => e.message.includes('projection failed')))
      .toBe(true)
  })
})

describe('controls', () => {
  it('derives canCancel / canPause from what was registered', () => {
    tasks.create({ kind: 'import', label: 'no controls' })
    tasks.create({ kind: 'appUpdate', label: 'cancel only', controls: { cancel: () => {} } })
    tasks.create({
      kind: 'musicDownload',
      label: 'both',
      controls: { cancel: () => {}, pause: () => {}, resume: () => {} }
    })
    const [a, b, c] = tasks.list()
    expect([a!.canCancel, a!.canPause]).toEqual([false, false])
    expect([b!.canCancel, b!.canPause]).toEqual([true, false])
    expect([c!.canCancel, c!.canPause]).toEqual([true, true])
  })

  it('surfaces pauseNote so a disabled button can say why', () => {
    tasks.create({
      kind: 'musicDownload',
      label: 'win32',
      controls: { cancel: () => {}, pauseNote: 'Pause is unavailable on Windows' }
    })
    const [row] = tasks.list()
    expect(row!.canPause).toBe(false)
    expect(row!.pauseNote).toBe('Pause is unavailable on Windows')
  })

  it('cancel dispatches, flags the handle, and moves to cancelling', () => {
    const cancel = vi.fn()
    const h = tasks.create({ kind: 'bulkImport', label: 'Bulk', controls: { cancel } })
    tasks.cancel(h.id)
    expect(cancel).toHaveBeenCalledOnce()
    expect(h.cancelRequested()).toBe(true)
    expect(tasks.list()[0]!.state).toBe('cancelling')
  })

  it('cancel clears a pending pause so a paused job can actually stop', () => {
    const h = tasks.create({
      kind: 'bulkImport',
      label: 'Bulk',
      controls: { cancel: () => {}, pause: () => {}, resume: () => {} }
    })
    tasks.pause(h.id)
    expect(h.pauseRequested()).toBe(true)
    tasks.cancel(h.id)
    expect(h.pauseRequested()).toBe(false)
    expect(h.cancelRequested()).toBe(true)
  })

  it('pause on a cooperative job reports "pausing" until the gate blocks', () => {
    const h = tasks.create({
      kind: 'musicArt',
      label: 'Art',
      controls: { pause: () => {}, resume: () => {} }
    })
    tasks.pause(h.id)
    expect(tasks.list()[0]!.state).toBe('pausing')
    // The loop's gate reports when it has really stopped.
    h.progress({ state: 'paused' })
    expect(tasks.list()[0]!.state).toBe('paused')
  })

  it('pause on a child process is instant', () => {
    const h = tasks.create({
      kind: 'mangaOcr',
      label: 'OCR',
      controls: { pause: () => {}, resume: () => {}, pauseIsInstant: true }
    })
    tasks.pause(h.id)
    expect(tasks.list()[0]!.state).toBe('paused')
  })

  it('resume returns to running and clears the flag', () => {
    const resume = vi.fn()
    const h = tasks.create({
      kind: 'musicArt',
      label: 'Art',
      controls: { pause: () => {}, resume }
    })
    tasks.pause(h.id)
    tasks.resume(h.id)
    expect(resume).toHaveBeenCalledOnce()
    expect(h.pauseRequested()).toBe(false)
    expect(tasks.list()[0]!.state).toBe('running')
  })

  it('is a no-op on a task with no such control, and on a settled task', () => {
    const cancel = vi.fn()
    const h = tasks.create({ kind: 'import', label: 'x', controls: { cancel } })
    tasks.pause(h.id) // no pause registered
    expect(tasks.list()[0]!.state).toBe('running')

    h.settle({ state: 'done' })
    tasks.cancel(h.id)
    expect(cancel).not.toHaveBeenCalled()
    expect(tasks.list()[0]!.state).toBe('done')
  })

  it('a settled task drops its controls so it can never look actionable', () => {
    const h = tasks.create({
      kind: 'musicDownload',
      label: 'x',
      controls: { cancel: () => {}, pause: () => {}, resume: () => {} }
    })
    h.settle({ state: 'done' })
    const [row] = tasks.list()
    expect(row!.canCancel).toBe(false)
    expect(row!.canPause).toBe(false)
  })

  it('a throwing pause control rolls the state back rather than sticking', () => {
    const h = tasks.create({
      kind: 'musicArt',
      label: 'x',
      controls: {
        pause: () => {
          throw new Error('nope')
        },
        resume: () => {}
      }
    })
    tasks.pause(h.id)
    expect(tasks.list()[0]!.state).toBe('running')
    expect(h.pauseRequested()).toBe(false)
  })
})

describe('elapsed', () => {
  it('excludes time spent paused', () => {
    const t0 = 1_000_000
    vi.spyOn(Date, 'now').mockReturnValue(t0)
    const h = tasks.create({
      kind: 'musicArt',
      label: 'Art',
      controls: { pause: () => {}, resume: () => {}, pauseIsInstant: true }
    })

    vi.spyOn(Date, 'now').mockReturnValue(t0 + 10_000)
    tasks.pause(h.id) // 10s of work so far
    vi.spyOn(Date, 'now').mockReturnValue(t0 + 40_000)
    // Still paused: the counter must not have advanced.
    expect(tasks.list(t0 + 40_000)[0]!.elapsedSec).toBe(10)

    tasks.resume(h.id) // 30s paused, excluded
    vi.spyOn(Date, 'now').mockReturnValue(t0 + 45_000)
    expect(tasks.list(t0 + 45_000)[0]!.elapsedSec).toBe(15)
    vi.restoreAllMocks()
  })
})

describe('ordering', () => {
  it('lists live oldest-first, then finished newest-first', () => {
    const a = tasks.create({ kind: 'import', label: 'a' })
    const b = tasks.create({ kind: 'import', label: 'b' })
    const c = tasks.create({ kind: 'import', label: 'c' })
    a.settle({ state: 'done' })
    b.settle({ state: 'done' })
    expect(tasks.list().map((r) => r.label)).toEqual(['c', 'b', 'a'])
  })
})

describe('retention', () => {
  const MIN = 60_000

  it('keeps live tasks forever and drops finished ones after 30 minutes', () => {
    const live = tasks.create({ kind: 'import', label: 'live' })
    const done = tasks.create({ kind: 'import', label: 'done' })
    done.settle({ state: 'done' })
    const t = Date.now()

    expect(tasks.list(t + 29 * MIN).map((r) => r.label)).toEqual(['live', 'done'])
    expect(tasks.list(t + 31 * MIN).map((r) => r.label)).toEqual(['live'])
    expect(live.isCurrent()).toBe(true)
  })

  it('caps the finished list at 40', () => {
    for (let i = 0; i < 50; i++) {
      tasks.create({ kind: 'import', label: `run ${i}` }).settle({ state: 'done' })
    }
    const rows = tasks.list()
    expect(rows).toHaveLength(40)
    // The newest survive.
    expect(rows[0]!.label).toBe('run 49')
    expect(rows.some((r) => r.label === 'run 0')).toBe(false)
  })

  it('evicts ephemeral tasks after a minute', () => {
    tasks
      .create({ kind: 'torrentSearch', label: 'search: bocchi', ephemeral: true })
      .settle({ state: 'done' })
    const t = Date.now()
    expect(tasks.list(t + 30_000)).toHaveLength(1)
    expect(tasks.list(t + 90_000)).toHaveLength(0)
  })

  it('keeps only the newest finished ephemeral task per kind', () => {
    for (const q of ['a', 'b', 'c']) {
      tasks
        .create({ kind: 'torrentSearch', label: `search: ${q}`, ephemeral: true })
        .settle({ state: 'done' })
    }
    // A non-ephemeral kind alongside it is unaffected.
    tasks.create({ kind: 'import', label: 'import' }).settle({ state: 'done' })

    const rows = tasks.list()
    expect(rows.filter((r) => r.kind === 'torrentSearch').map((r) => r.label)).toEqual([
      'search: c'
    ])
    expect(rows.some((r) => r.kind === 'import')).toBe(true)
  })

  it('clearFinished removes settled rows and leaves live ones', () => {
    tasks.create({ kind: 'import', label: 'live' })
    tasks.create({ kind: 'import', label: 'done' }).settle({ state: 'done' })
    tasks.clearFinished()
    expect(tasks.list().map((r) => r.label)).toEqual(['live'])
  })
})

describe('settleAllOnQuit', () => {
  it('stamps every live task cancelled so a SIGKILL never reads as a failure', () => {
    const a = tasks.create({ kind: 'musicDownload', label: 'download' })
    const b = tasks.create({ kind: 'import', label: 'import' })
    b.settle({ state: 'error', error: 'real failure' })

    tasks.settleAllOnQuit()

    const rows = tasks.list()
    expect(rows.find((r) => r.label === 'download')!.state).toBe('cancelled')
    expect(rows.find((r) => r.label === 'download')!.error).toBe('app quit')
    // An already-settled failure keeps its own outcome.
    expect(rows.find((r) => r.label === 'import')!.state).toBe('error')
    expect(a.isCurrent()).toBe(false)
  })
})

describe('get', () => {
  it('returns a fresh projection for one task, or null', () => {
    let done = 0
    const h = tasks.create({ kind: 'import', label: 'x', project: () => ({ done }) })
    done = 9
    expect(tasks.get(h.id)!.done).toBe(9)
    expect(tasks.get('import-999')).toBeNull()
  })
})
