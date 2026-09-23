import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// Play-session recording against the real schema: the atomic insert+fold
// transaction, the rounded-cumulative delta across consecutive sessions, the
// aggregate overview read, exe-path persistence and the CASCADE lifetime.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

import * as repo from '../src/main/repos/gameSessionRepo'

function addMedia(mediaType: string, progress = 0): number {
  return Number(
    db
      .prepare('INSERT INTO media_item (media_type, title, progress) VALUES (?, ?, ?)')
      .run(mediaType, 'T', progress).lastInsertRowid
  )
}

const progressOf = (id: number): number =>
  (db.prepare('SELECT progress FROM media_item WHERE id = ?').get(id) as { progress: number })
    .progress

// Epoch base — any fixed moment works, timestamps are stored UTC.
const T0 = 1_754_000_000

beforeEach(() => {
  db = createTestDb()
})

describe('recordSession', () => {
  it('inserts the row and folds progress in one step', () => {
    const id = addMedia('game', 30)
    const res = repo.recordSession(id, T0, T0 + 7200, 7200)
    expect(res).toEqual({ progressDelta: 2, progressAfter: 32 })
    expect(progressOf(id)).toBe(32)

    const row = db.prepare('SELECT * FROM game_session WHERE media_id = ?').get(id) as Record<
      string,
      unknown
    >
    expect(row.duration).toBe(7200)
    // Stored as UTC datetime text, the app-wide timestamp format.
    expect(row.started_at).toMatch(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)
  })

  it('consecutive short game sessions accumulate via the rounded cumulative', () => {
    const id = addMedia('game', 0)
    const deltas: number[] = []
    for (let i = 0; i < 10; i++) {
      deltas.push(repo.recordSession(id, T0 + i * 2000, T0 + i * 2000 + 1200, 1200).progressDelta)
    }
    // Ten 20-minute sessions ≈ 3 h; per-session naive rounding would give 0.
    expect(progressOf(id)).toBe(3)
    expect(deltas.reduce((a, b) => a + b, 0)).toBe(3)
  })

  it('VN sessions fold to minutes', () => {
    const id = addMedia('visual_novel', 120)
    const res = repo.recordSession(id, T0, T0 + 605, 605)
    expect(res.progressAfter).toBe(130)
  })

  it('throws on a missing media row and writes nothing', () => {
    expect(() => repo.recordSession(999, T0, T0 + 3600, 3600)).toThrow()
    expect(db.prepare('SELECT COUNT(*) AS n FROM game_session').get()).toEqual({ n: 0 })
  })
})

describe('overview', () => {
  it('aggregates tracked time and count without returning session rows', () => {
    const id = addMedia('game')
    for (let i = 0; i < 25; i++) {
      repo.recordSession(id, T0 + i * 10_000, T0 + i * 10_000 + 100 + i, 100 + i)
    }
    const ov = repo.overview(id)
    expect(ov.sessionCount).toBe(25)
    expect(ov.totalSeconds).toBe(
      Array.from({ length: 25 }, (_, i) => 100 + i).reduce((a, b) => a + b, 0)
    )
    expect(ov).not.toHaveProperty('sessions')
  })

  it('reports the linked exe and empty totals for an untracked title', () => {
    const id = addMedia('game')
    repo.setExePath(id, 'C:\\Games\\x.exe')
    const ov = repo.overview(id)
    expect(ov).toMatchObject({
      exePath: 'C:\\Games\\x.exe',
      totalSeconds: 0,
      sessionCount: 0
    })
  })
})

describe('setExePath', () => {
  it('round-trips a path and clears with null', () => {
    const id = addMedia('game')
    repo.setExePath(id, 'C:\\Games\\P5R\\P5R.exe')
    expect(repo.launchInfo(id)).toEqual({
      title: 'T',
      mediaType: 'game',
      exePath: 'C:\\Games\\P5R\\P5R.exe'
    })
    repo.setExePath(id, null)
    expect(repo.launchInfo(id)?.exePath).toBeNull()
  })
})

describe('lifetime', () => {
  it('sessions die with the media row (CASCADE)', () => {
    const id = addMedia('game')
    repo.recordSession(id, T0, T0 + 3600, 3600)
    db.prepare('DELETE FROM media_item WHERE id = ?').run(id)
    expect(db.prepare('SELECT COUNT(*) AS n FROM game_session').get()).toEqual({ n: 0 })
  })
})
