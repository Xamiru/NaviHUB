import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import {
  AvailabilityCache,
  MIN_REBUILD_GAP_MS,
  RETRY_AFTER_FAILURE_MS,
  parseStoredFile,
  serializeStoredFile,
  type AvailabilityCacheIo,
  type StoredAvailability
} from '../src/main/quizAvailabilityCacheCore'

let db: Database.Database
vi.mock('../src/main/db/sqliteHandle', () => ({ getSqlite: () => db }))

import * as quizRepo from '../src/main/repos/quizRepo'

type Counts = { song: number }

function harness(stored: Record<string, StoredAvailability<Counts>> = {}) {
  const state = {
    fingerprint: 'a',
    now: 0,
    fingerprintReads: 0,
    saved: [] as Record<string, StoredAvailability<Counts>>[],
    errors: [] as string[]
  }
  const io: AvailabilityCacheIo<Counts> = {
    fingerprint: async () => {
      state.fingerprintReads++
      return state.fingerprint
    },
    now: () => state.now,
    load: () => stored,
    save: (entries) => state.saved.push(structuredClone(entries)),
    onError: (key) => state.errors.push(key)
  }
  return { cache: new AvailabilityCache<Counts>(io), state }
}

// Lets a settled rebuild finish its then/catch/finally chain.
const settle = () => new Promise((resolve) => setTimeout(resolve, 0))

function deferred<T>() {
  let resolve!: (value: T) => void
  let reject!: (err: unknown) => void
  const promise = new Promise<T>((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

describe('AvailabilityCache', () => {
  it('waits for the first build, then serves it without rebuilding', async () => {
    const { cache, state } = harness()
    const compute = vi.fn(async () => ({ song: 3 }))
    expect(await cache.read('k', compute)).toEqual({ song: 3 })
    expect(await cache.read('k', compute)).toEqual({ song: 3 })
    expect(compute).toHaveBeenCalledTimes(1)
    expect(state.saved.at(-1)).toEqual({ k: { fingerprint: 'a', value: { song: 3 } } })
  })

  it('serves the stale result at once while one background rebuild runs', async () => {
    const { cache, state } = harness()
    await cache.read('k', async () => ({ song: 1 }))
    state.fingerprint = 'b'
    state.now += MIN_REBUILD_GAP_MS
    const pending = deferred<Counts>()
    const compute = vi.fn(() => pending.promise)
    expect(await cache.read('k', compute)).toEqual({ song: 1, refreshing: true })
    expect(await cache.read('k', compute)).toEqual({ song: 1, refreshing: true })
    expect(compute).toHaveBeenCalledTimes(1)
    pending.resolve({ song: 2 })
    await pending.promise
    await settle()
    expect(await cache.read('k', compute)).toEqual({ song: 2 })
    expect(compute).toHaveBeenCalledTimes(1)
  })

  it('rebuilds a result loaded from disk once per session', async () => {
    const { cache } = harness({ k: { fingerprint: 'a', value: { song: 5 } } })
    const compute = vi.fn(async () => ({ song: 6 }))
    expect(await cache.read('k', compute)).toEqual({ song: 5, refreshing: true })
    await vi.waitFor(async () => expect(await cache.read('k', compute)).toEqual({ song: 6 }))
    expect(compute).toHaveBeenCalledTimes(1)
  })

  it('a write during a rebuild leads to another rebuild', async () => {
    const { cache, state } = harness({ k: { fingerprint: 'a', value: { song: 1 } } })
    const first = deferred<Counts>()
    const compute = vi.fn(() => first.promise)
    await cache.read('k', compute)
    state.fingerprint = 'b'
    first.resolve({ song: 2 })
    await first.promise
    await settle()
    const second = vi.fn(async () => ({ song: 3 }))
    // The rebuild recorded fingerprint 'a'; the library is now at 'b'. The
    // next rebuild waits out the gap, and the renderer keeps polling.
    expect(await cache.read('k', second)).toEqual({ song: 2, refreshing: true })
    expect(second).not.toHaveBeenCalled()
    state.now += MIN_REBUILD_GAP_MS
    expect(await cache.read('k', second)).toEqual({ song: 2, refreshing: true })
    expect(second).toHaveBeenCalledTimes(1)
  })

  it('a failed background rebuild keeps the old value, stops refreshing and retries later', async () => {
    const { cache, state } = harness({ k: { fingerprint: 'a', value: { song: 1 } } })
    const failing = vi.fn(async () => {
      throw new Error('timeout')
    })
    expect(await cache.read('k', failing)).toEqual({ song: 1, refreshing: true })
    await vi.waitFor(() => expect(state.errors).toEqual(['k']))
    await settle()
    expect(await cache.read('k', failing)).toEqual({ song: 1 })
    expect(failing).toHaveBeenCalledTimes(1)
    // The entry loaded from disk was never verified, so it is retried.
    state.now += RETRY_AFTER_FAILURE_MS
    const working = vi.fn(async () => ({ song: 7 }))
    expect(await cache.read('k', working)).toEqual({ song: 1, refreshing: true })
    await vi.waitFor(async () => expect(await cache.read('k', working)).toEqual({ song: 7 }))
    expect(working).toHaveBeenCalledTimes(1)
  })

  it('spaces rebuilds while the library keeps changing, without re-fingerprinting', async () => {
    const { cache, state } = harness()
    const compute = vi.fn(async () => ({ song: compute.mock.calls.length }))
    await cache.read('k', compute)
    expect(compute).toHaveBeenCalledTimes(1)
    state.fingerprint = 'b'
    expect(await cache.read('k', compute)).toEqual({ song: 1, refreshing: true })
    const reads = state.fingerprintReads
    // Polls inside the gap answer from what is known: stale, waiting.
    for (let i = 0; i < 4; i++) {
      state.now += 1_000
      state.fingerprint = `c${i}`
      expect(await cache.read('k', compute)).toEqual({ song: 1, refreshing: true })
    }
    expect(state.fingerprintReads).toBe(reads)
    expect(compute).toHaveBeenCalledTimes(1)
    state.now += MIN_REBUILD_GAP_MS
    await cache.read('k', compute)
    await settle()
    expect(compute).toHaveBeenCalledTimes(2)
  })

  it('serves a matching verified entry without a rebuild', async () => {
    const { cache, state } = harness()
    const compute = vi.fn(async () => ({ song: 1 }))
    await cache.read('k', compute)
    state.now += 10 * MIN_REBUILD_GAP_MS
    expect(await cache.read('k', compute)).toEqual({ song: 1 })
    expect(compute).toHaveBeenCalledTimes(1)
  })

  it('a failed first build rejects like the uncached read did', async () => {
    const { cache } = harness()
    await expect(cache.read('k', async () => { throw new Error('boom') })).rejects.toThrow('boom')
    expect(await cache.read('k', async () => ({ song: 4 }))).toEqual({ song: 4 })
  })
})

describe('stored file', () => {
  it('round-trips and drops another release, damage and malformed entries', () => {
    const entries = { k: { fingerprint: 'f', value: { song: 2 } } }
    const raw = serializeStoredFile(entries, '1.0/1')
    expect(parseStoredFile(raw, '1.0/1')).toEqual(entries)
    expect(parseStoredFile(raw, '1.1/1')).toEqual({})
    expect(parseStoredFile('{not json', '1.0/1')).toEqual({})
    expect(
      parseStoredFile(
        JSON.stringify({ stamp: '1.0/1', entries: { a: { fingerprint: 3, value: {} }, b: { fingerprint: 'x', value: null } } }),
        '1.0/1'
      )
    ).toEqual({})
  })
})

describe('availabilityFingerprint', () => {
  beforeEach(() => {
    db = createTestDb()
  })

  function addTitle(status: string | null): number {
    return Number(
      db.prepare(`INSERT INTO media_item (media_type, title, status) VALUES ('movie', 'T', ?)`).run(status)
        .lastInsertRowid
    )
  }

  it('ignores writes availability never reads', () => {
    addTitle('Watched')
    const before = quizRepo.availabilityFingerprint()
    db.prepare(
      `INSERT INTO quiz_session (kind, score, total, played_at) VALUES ('cast', 3, 10, datetime('now'))`
    ).run()
    db.prepare(`INSERT OR REPLACE INTO settings (key, value) VALUES ('quiz.test', '1')`).run()
    expect(quizRepo.availabilityFingerprint()).toBe(before)
  })

  it('moves on a status change, a cover, a new credit and a theme download', () => {
    const id = addTitle('Watching')
    const steps: Array<() => void> = [
      () => db.prepare(`UPDATE media_item SET status='Watched' WHERE id=?`).run(id),
      () => db.prepare(`UPDATE media_item SET cover_path='media/x.jpg' WHERE id=?`).run(id),
      () => {
        const person = db.prepare(`INSERT INTO person (name) VALUES ('P')`).run().lastInsertRowid
        db.prepare(`INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, 'actor')`).run(id, person)
      },
      () => db.prepare(`INSERT INTO theme_song (media_id, type, title) VALUES (?, 'OP', 'S')`).run(id),
      () => db.prepare(`UPDATE theme_song SET audio_path='audio/s.ogg' WHERE media_id=?`).run(id)
    ]
    let last = quizRepo.availabilityFingerprint()
    for (const step of steps) {
      step()
      const next = quizRepo.availabilityFingerprint()
      expect(next).not.toBe(last)
      last = next
    }
  })

  it('footballAvailability matches the block inside full availability', () => {
    expect(quizRepo.footballAvailability()).toEqual(quizRepo.availability({ scope: 'all' }).football)
  })
})
