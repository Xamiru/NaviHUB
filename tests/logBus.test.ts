import { beforeEach, describe, expect, it } from 'vitest'
import { __reset, log, onEntry, readLog } from '../src/main/logBus'

// No mocks at all: logBus imports only logCore, which is the property that
// keeps http.ts and db/connection.ts testable without an electron stub.

beforeEach(() => {
  __reset()
})

describe('readLog seeding', () => {
  it('answers a cursor-less request with the NEWEST entries, not the oldest', () => {
    for (let i = 1; i <= 20; i++) log('info', 'app', `line ${i}`)
    const page = readLog({ limit: 5 })
    expect(page.entries.map((e) => e.message)).toEqual([
      'line 16',
      'line 17',
      'line 18',
      'line 19',
      'line 20'
    ])
    // Cursor jumps to the head, so the viewer is instantly current rather than
    // spending four polls replaying history.
    expect(page.nextSeq).toBe(20)
    expect(page.dropped).toBe(0)
  })

  it('returns an empty page against an empty ring', () => {
    expect(readLog({})).toEqual({ entries: [], nextSeq: 0, oldestSeq: 0, dropped: 0 })
  })
})

describe('readLog cursor paging', () => {
  it('returns only entries after the cursor, and advances it', () => {
    log('info', 'app', 'a')
    log('info', 'app', 'b')
    const first = readLog({})
    expect(first.nextSeq).toBe(2)

    log('info', 'app', 'c')
    const second = readLog({ afterSeq: first.nextSeq })
    expect(second.entries.map((e) => e.message)).toEqual(['c'])
    expect(second.nextSeq).toBe(3)

    // Nothing new: an empty page that does not rewind the cursor.
    const third = readLog({ afterSeq: second.nextSeq })
    expect(third.entries).toEqual([])
    expect(third.nextSeq).toBe(3)
  })

  it('advances past filtered-out entries so they are not rescanned forever', () => {
    log('error', 'app', 'boom')
    const first = readLog({ minLevel: 'error' })
    for (let i = 0; i < 50; i++) log('debug', 'app', `noise ${i}`)

    const page = readLog({ afterSeq: first.nextSeq, minLevel: 'error' })
    expect(page.entries).toEqual([])
    // The cursor tracks the last SCANNED seq, not the last returned one.
    expect(page.nextSeq).toBe(51)
  })

  it('honours limit and resumes exactly where it stopped', () => {
    for (let i = 1; i <= 10; i++) log('info', 'app', `line ${i}`)
    const page = readLog({ afterSeq: 0.5, limit: 3 })
    expect(page.entries.map((e) => e.message)).toEqual(['line 1', 'line 2', 'line 3'])
    const next = readLog({ afterSeq: page.nextSeq, limit: 3 })
    expect(next.entries.map((e) => e.message)).toEqual(['line 4', 'line 5', 'line 6'])
  })

  it('clamps an absurd limit', () => {
    for (let i = 0; i < 10; i++) log('info', 'app', `line ${i}`)
    expect(readLog({ afterSeq: 0.5, limit: 999_999 }).entries.length).toBe(10)
    expect(readLog({ afterSeq: 0.5, limit: 0 }).entries.length).toBe(1)
  })
})

describe('readLog dropped counting', () => {
  it('reports how many entries the ring evicted past a stale cursor', () => {
    // The ring caps at 3000; overflow it well past a cursor parked at 1.
    for (let i = 1; i <= 3200; i++) log('info', 'app', `line ${i}`)
    const page = readLog({ afterSeq: 1, limit: 10 })
    expect(page.oldestSeq).toBe(201)
    // Entries 2..200 are gone: 199 of them.
    expect(page.dropped).toBe(199)
    expect(page.entries[0]!.message).toBe('line 201')
  })

  it('reports no drops for a cursor the ring still covers', () => {
    for (let i = 1; i <= 20; i++) log('info', 'app', `line ${i}`)
    expect(readLog({ afterSeq: 10 }).dropped).toBe(0)
  })
})

describe('readLog filters', () => {
  it('filters by minimum level', () => {
    log('debug', 'app', 'd')
    log('info', 'app', 'i')
    log('warn', 'http', 'w')
    log('error', 'http', 'e')
    const page = readLog({ afterSeq: 0.5, minLevel: 'warn' })
    expect(page.entries.map((e) => e.message)).toEqual(['w', 'e'])
  })

  it('filters by task id', () => {
    log('info', 'task', 'started', 'import-1')
    log('info', 'proc', 'reading metadata', 'musicMetadata-2')
    log('info', 'task', 'finished', 'import-1')
    const page = readLog({ afterSeq: 0.5, taskId: 'import-1' })
    expect(page.entries.map((e) => e.message)).toEqual(['started', 'finished'])
  })
})

describe('ingest', () => {
  it('redacts at ingest so the ring AND every sink are clean', () => {
    const seen: string[] = []
    onEntry((e) => seen.push(e.message))
    log('warn', 'http', 'GET https://api.test/x?api_key=hunter2 failed')

    expect(seen).toEqual(['GET https://api.test/x?api_key=*** failed'])
    expect(readLog({}).entries[0]!.message).toBe('GET https://api.test/x?api_key=*** failed')
  })

  it('stamps strictly increasing sequence numbers', () => {
    for (let i = 0; i < 5; i++) log('info', 'app', 'x')
    expect(readLog({ afterSeq: 0.5 }).entries.map((e) => e.seq)).toEqual([1, 2, 3, 4, 5])
  })

  it('a throwing sink cannot break the caller', () => {
    onEntry(() => {
      throw new Error('disk full')
    })
    expect(() => log('info', 'app', 'still fine')).not.toThrow()
    expect(readLog({}).entries).toHaveLength(1)
  })

  it('unsubscribes cleanly', () => {
    const seen: string[] = []
    const off = onEntry((e) => seen.push(e.message))
    log('info', 'app', 'one')
    off()
    log('info', 'app', 'two')
    expect(seen).toEqual(['one'])
  })
})
