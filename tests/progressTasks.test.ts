import { beforeEach, describe, expect, it } from 'vitest'
import {
  TaskCancelledError,
  beginActivity,
  endActivity,
  getActivity,
  imageProgress,
  updateActivity,
  withActivity
} from '../src/main/progress'
import * as tasks from '../src/main/tasks'
import { currentActivitySignal } from '../src/main/activityContext'
import { __reset as resetLog } from '../src/main/logBus'

// progress.ts is the adapter that turns all 17 withActivity call sites in
// ipc.ts into registry tasks with no edits at any of them. The critical
// property under test is that it did NOT change ActivityStatus — the Topbar
// pill and the ImportDialog bar read that shape and have no tests of their own.

beforeEach(() => {
  tasks.__reset()
  resetLog()
  endActivity() // make sure a failed test can't leak the slot into the next one
  tasks.__reset()
})

describe('ActivityStatus is unchanged (Topbar pill / ImportDialog regression)', () => {
  it('is idle with the exact idle shape', () => {
    expect(getActivity()).toEqual({
      active: false,
      label: '',
      phase: 'fetching',
      done: 0,
      total: 0
    })
  })

  it('begin/update/imageProgress/end drive the same fields as before', () => {
    beginActivity('Importing from AniList')
    expect(getActivity()).toEqual({
      active: true,
      label: 'Importing from AniList',
      phase: 'fetching',
      done: 0,
      total: 0
    })

    updateActivity({ phase: 'writing' })
    expect(getActivity().phase).toBe('writing')

    imageProgress(12, 40)
    expect(getActivity()).toEqual({
      active: true,
      label: 'Importing from AniList',
      phase: 'images',
      done: 12,
      total: 40
    })

    endActivity()
    expect(getActivity().active).toBe(false)
  })

  it('updates while idle stay no-ops', () => {
    updateActivity({ phase: 'images', done: 5, total: 5 })
    imageProgress(1, 2)
    expect(getActivity().active).toBe(false)
    expect(tasks.list()).toEqual([])
  })
})

describe('withActivity creates a task', () => {
  it('settles done on success and returns the value', async () => {
    const result = await withActivity('Importing from TMDB', async () => 'ok')
    expect(result).toBe('ok')

    const [row] = tasks.list()
    expect(row!.kind).toBe('import')
    expect(row!.label).toBe('Importing from TMDB')
    expect(row!.state).toBe('done')
    // The slot is released either way — that's what the old finally guaranteed.
    expect(getActivity().active).toBe(false)
  })

  it('settles error and still rethrows, with the slot released', async () => {
    await expect(
      withActivity('Importing from VNDB', async () => {
        throw new Error('host unreachable')
      })
    ).rejects.toThrow('host unreachable')

    const [row] = tasks.list()
    expect(row!.state).toBe('error')
    expect(row!.error).toBe('host unreachable')
    expect(getActivity().active).toBe(false)
  })

  it('forwards phase and image counts onto the task', async () => {
    let row: ReturnType<typeof tasks.list>[number] | undefined
    await withActivity('Importing from Steam', async () => {
      imageProgress(3, 6)
      row = tasks.list()[0]
    })
    expect(row!.detail).toBe('images')
    expect(row!.done).toBe(3)
    expect(row!.total).toBe(6)
    expect(row!.percent).toBe(50)
  })

  it('concurrent imports each get their own task row, and each settles', async () => {
    // The activity SLOT is single (a second begin takes it over — unchanged),
    // but the registry is what makes two overlapping imports visible at all.
    // Regression: settling "whatever holds the slot" closed the WRONG task and
    // left the other running forever.
    const slow = withActivity('Importing from AniList', async () => {
      await new Promise((r) => setTimeout(r, 5))
      return 1
    })
    const fast = await withActivity('Importing from TMDB', async () => 2)
    expect(fast).toBe(2)
    // The fast one finishing must not have settled the slow one.
    expect(tasks.list().find((r) => r.label === 'Importing from AniList')!.state).toBe('running')

    await slow
    expect(
      tasks
        .list()
        .map((r) => [r.label, r.state])
        .sort()
    ).toEqual([
      ['Importing from AniList', 'done'],
      ['Importing from TMDB', 'done']
    ])
  })

  it('an inner import cannot settle the outer task that started before it', async () => {
    const outer = beginActivity('Bulk import: anime')
    await withActivity('Importing from AniList', async () => 1)

    // The inner withActivity settles only the task IT created. The outer one
    // is still live — which is why a caller that brackets itself must hold its
    // own handle and settle through it (bulkImport / wrestling do exactly
    // that) rather than trusting the shared slot to still be theirs.
    expect(outer.isCurrent()).toBe(true)
    expect(tasks.list().find((r) => r.label === 'Importing from AniList')!.state).toBe('done')

    outer.settle({ state: 'done' })
    expect(outer.isCurrent()).toBe(false)
  })
})

describe('cancellation', () => {
  it('every import is cancellable, with no importer edits at all', () => {
    beginActivity('Importing from AniList')
    const [row] = tasks.list()
    // The control exists purely so canCancel is true — the mechanism is the
    // registry's own flag, read at the checkpoints below.
    expect(row!.canCancel).toBe(true)
    expect(row!.canPause).toBe(false)
    expect(row!.pauseNote).toMatch(/cannot be paused/)

    expect(() => imageProgress(1, 4)).not.toThrow()

    tasks.cancel(row!.id)
    // downloadImages calls imageProgress after EVERY image, so a stop lands
    // within one image rather than at the end of the fetch — which is what
    // makes this work without touching a single importer.
    expect(() => imageProgress(2, 4)).toThrow(/Cancelled: Importing from AniList/)
    expect(() => updateActivity({ phase: 'writing' })).toThrow(/Cancelled/)
    endActivity()
  })

  it('a cancelled import settles cancelled, not error', async () => {
    const run = withActivity('Importing from TMDB', async () => {
      const [row] = tasks.list()
      tasks.cancel(row!.id)
      imageProgress(1, 2) // throws TaskCancelledError
      return 'unreachable'
    })
    await expect(run).rejects.toThrow(/Cancelled/)
    const [row] = tasks.list()
    expect(row!.state).toBe('cancelled')
    // Painting a deliberate stop red is the thing to avoid.
    expect(row!.error).toBeNull()
    expect(getActivity().active).toBe(false)
  })

  it('does not report done when cancellation arrives after the final checkpoint', async () => {
    const run = withActivity('Importing from TMDB', async () => {
      const [row] = tasks.list()
      tasks.cancel(row!.id)
      return 'completed after stop'
    })

    await expect(run).rejects.toThrow('Cancelled: Importing from TMDB')
    expect(tasks.list()[0]!.state).toBe('cancelled')
    expect(getActivity().active).toBe(false)
  })

  it('aborts the current activity signal as soon as Stop is requested', async () => {
    let signal: AbortSignal | undefined
    const run = withActivity('Importing from TMDB', async () => {
      signal = currentActivitySignal()
      const [row] = tasks.list()
      tasks.cancel(row!.id)
      await new Promise<void>((_resolve, reject) => {
        if (signal?.aborted) reject(new Error('request aborted'))
      })
    })
    await expect(run).rejects.toThrow('Cancelled: Importing from TMDB')
    expect(signal?.aborted).toBe(true)
    expect(tasks.list()[0]!.state).toBe('cancelled')
  })

  it('settles cancelled — not error — when the cancel error propagates', () => {
    beginActivity('Importing from AniList')
    const err = new TaskCancelledError('Importing from AniList')
    endActivity(err)
    const [row] = tasks.list()
    expect(row!.state).toBe('cancelled')
    // A deliberate stop must never be painted as a failure.
    expect(row!.error).toBeNull()
  })

  it('carries a message written for the user, since the toast net shows it', () => {
    expect(new TaskCancelledError('Importing from AniList').message).toBe(
      'Cancelled: Importing from AniList'
    )
  })
})

describe('attachTo', () => {
  it('reuses the caller’s task instead of creating a duplicate row', () => {
    // bulkImport and wrestling/importRun bracket themselves so the inner
    // per-title progress reaches the pill; they must not also mint a task.
    const own = tasks.create({ kind: 'bulkImport', label: 'Bulk import: anime' })
    beginActivity('Importing from AniList', { attachTo: own })

    expect(tasks.list()).toHaveLength(1)
    expect(tasks.list()[0]!.label).toBe('Bulk import: anime')

    imageProgress(2, 4)
    expect(tasks.list()[0]!.done).toBe(2)
  })

  it('endActivity does NOT settle a task it does not own', () => {
    const own = tasks.create({ kind: 'bulkImport', label: 'Bulk import: anime' })
    beginActivity('Importing from AniList', { attachTo: own })
    endActivity()

    expect(tasks.list()[0]!.state).toBe('running')
    expect(own.isCurrent()).toBe(true)
    expect(getActivity().active).toBe(false)
  })

  // The bulk run holds the slot; a dialog import started mid-run takes it. When
  // the bulk run then finishes, "settle whatever is in the slot" would mark the
  // dialog import done while it is still fetching AND blank the activity state
  // its progress bar reads — so endActivity takes the handle back.
  it('endActivity(err, own) is a no-op once a newer activity holds the slot', () => {
    const bulk = tasks.create({ kind: 'bulkImport', label: 'Bulk import: anime' })
    const slot = beginActivity('Bulk import: anime', { attachTo: bulk })

    // A dialog import takes the slot mid-run.
    beginActivity('Importing from TMDB')
    const dialogTask = tasks.list().find((t) => t.label === 'Importing from TMDB')!

    endActivity(undefined, slot)

    expect(tasks.list().find((t) => t.id === dialogTask.id)!.state).toBe('running')
    expect(getActivity().active).toBe(true)
    expect(getActivity().label).toBe('Importing from TMDB')
  })

  it('endActivity(err, own) still settles when the caller DOES still hold the slot', () => {
    const slot = beginActivity('Importing from AniList')
    endActivity(undefined, slot)

    expect(tasks.list()[0]!.state).toBe('done')
    expect(getActivity().active).toBe(false)
  })
})
