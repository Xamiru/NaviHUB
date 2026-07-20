import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mkdirSync, mkdtempSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import { join } from 'node:path'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import type { SyncOp, SyncOpsRequest } from '../src/shared/types'

let db: Database.Database
let userData = ''

vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db,
  getDbPath: () => join(userData, 'no-such.db')
}))
// sync.ts pulls app from electron (temp dir for snapshots, userData for the
// cover manifest, version for /info) — replaced so it runs under plain Node.
vi.mock('electron', () => ({
  app: {
    getPath: (name: string) => (name === 'userData' ? userData : os.tmpdir()),
    getVersion: () => '0.0.0-test'
  }
}))

import { applyOpsBatch, validateOpsRequest } from '../src/main/syncOps'
import {
  fileRoutePath,
  getSyncStatus,
  newPairingCode,
  startSyncServer,
  stopSyncServer,
  tokenMatches,
  unpair
} from '../src/main/sync'
import { SYNC_PROTOCOL_VERSION } from '../src/shared/types'

const TS = '2026-07-16 10:00:00'
const LATER = '2026-07-16 11:00:00'
const FUTURE = '2999-01-01 00:00:00'

beforeEach(() => {
  db = createTestDb()
  userData = mkdtempSync(join(os.tmpdir(), 'navihub-sync-'))
})

function batch(ops: SyncOp[], batchId = 'batch-0001'): SyncOpsRequest {
  return { batchId, device: 'test phone', ops }
}

function addAnime(title: string): number {
  return Number(
    db
      .prepare(`INSERT INTO media_item (media_type, title) VALUES ('anime', ?)`)
      .run(title).lastInsertRowid
  )
}

function addCard(front = '猫'): number {
  const courseId = Number(
    db.prepare(`INSERT INTO jp_course (title) VALUES ('Test course')`).run().lastInsertRowid
  )
  const lessonId = Number(
    db
      .prepare(`INSERT INTO jp_lesson (course_id, kind, title, learned) VALUES (?, 'vocab', 'L1', 1)`)
      .run(courseId).lastInsertRowid
  )
  return Number(
    db
      .prepare(`INSERT INTO jp_card (lesson_id, front, back) VALUES (?, ?, 'cat')`)
      .run(lessonId, front).lastInsertRowid
  )
}

function addTrack(filePath = 'A/B/01 Song.mp3'): number {
  const artistId = Number(
    db.prepare(`INSERT INTO music_artist (name, dir_path) VALUES ('A', 'A')`).run().lastInsertRowid
  )
  const albumId = Number(
    db
      .prepare(`INSERT INTO music_album (artist_id, title, dir_path) VALUES (?, 'B', 'A/B')`)
      .run(artistId).lastInsertRowid
  )
  return Number(
    db
      .prepare(
        `INSERT INTO music_track (album_id, artist_id, file_path, title, duration)
         VALUES (?, ?, ?, 'Song', 180)`
      )
      .run(albumId, artistId, filePath).lastInsertRowid
  )
}

function addChapter(mediaId: number, pageCount = 20, dirPath = 'Berserk/c001'): number {
  return Number(
    db
      .prepare(
        `INSERT INTO manga_chapter (media_id, dir_path, title, number, page_count)
         VALUES (?, ?, 'c001', 1, ?)`
      )
      .run(mediaId, dirPath, pageCount).lastInsertRowid
  )
}

// ---------------------------------------------------------------------------
// validateOpsRequest — the trust boundary for client JSON.
// ---------------------------------------------------------------------------

describe('validateOpsRequest', () => {
  it('rejects malformed envelopes', () => {
    expect(() => validateOpsRequest(null)).toThrow(/object/)
    expect(() => validateOpsRequest({ batchId: 'x', device: 'p', ops: [] })).toThrow(/batchId/)
    expect(() => validateOpsRequest({ batchId: 'batch-0001', device: '', ops: [] })).toThrow(
      /device/
    )
    expect(() => validateOpsRequest({ batchId: 'batch-0001', device: 'p', ops: {} })).toThrow(
      /array/
    )
  })

  it('rejects bad ops with an index-precise message', () => {
    const good: SyncOp = { kind: 'quiz.session', ts: TS, session: { kind: 'song', score: 1, total: 2, bestStreak: 1 } }
    expect(() => validateOpsRequest(batch([good, { kind: 'nope', ts: TS } as unknown as SyncOp]))).toThrow(
      /ops\[1\].*unknown op kind/
    )
    expect(() =>
      validateOpsRequest(batch([{ kind: 'media.update', mediaId: 1, title: 'x', ts: 'yesterday', fields: {} } as SyncOp]))
    ).toThrow(/ts/)
    expect(() =>
      validateOpsRequest(
        batch([{ kind: 'media.update', mediaId: 1, title: 'x', ts: TS, fields: { score: 'ten' } } as unknown as SyncOp])
      )
    ).toThrow(/score/)
  })

  it('accepts a well-formed batch', () => {
    const req = validateOpsRequest(
      batch([{ kind: 'media.update', mediaId: 1, title: 'Berserk', ts: TS, fields: { progress: 3 } }])
    )
    expect(req.ops).toHaveLength(1)
  })
})

// ---------------------------------------------------------------------------
// Op replay against the real schema.
// ---------------------------------------------------------------------------

describe('media.update replay', () => {
  it('applies personal fields and bumps updated_at', () => {
    const id = addAnime('Berserk')
    db.prepare(`UPDATE media_item SET updated_at = ? WHERE id = ?`).run('2020-01-01 00:00:00', id)
    const res = applyOpsBatch(
      batch([
        {
          kind: 'media.update',
          mediaId: id,
          title: 'Berserk',
          ts: TS,
          fields: { status: 'Watching', score: 9, progress: 12, favorite: true, notes: 'good' }
        }
      ])
    )
    expect(res.applied).toBe(1)
    expect(res.skipped).toEqual([])
    const row = db.prepare('SELECT * FROM media_item WHERE id = ?').get(id) as Record<string, unknown>
    expect(row.status).toBe('Watching')
    expect(row.score).toBe(9)
    expect(row.progress).toBe(12)
    expect(row.favorite).toBe(1)
    expect(row.notes).toBe('good')
    expect(String(row.updated_at) > '2020-01-01 00:00:00').toBe(true)
  })

  it('skips when the PC row is newer, missing, or a different title', () => {
    const id = addAnime('Berserk')
    db.prepare(`UPDATE media_item SET updated_at = ? WHERE id = ?`).run(FUTURE, id)
    const res = applyOpsBatch(
      batch([
        { kind: 'media.update', mediaId: id, title: 'Berserk', ts: TS, fields: { progress: 5 } },
        { kind: 'media.update', mediaId: 999, title: 'Berserk', ts: TS, fields: { progress: 5 } },
        { kind: 'media.update', mediaId: id, title: 'Vinland Saga', ts: TS, fields: { progress: 5 } }
      ])
    )
    expect(res.applied).toBe(0)
    expect(res.skipped.map((s) => s.index)).toEqual([0, 1, 2])
    expect(res.skipped[0].reason).toMatch(/newer/)
    expect(res.skipped[1].reason).toMatch(/no longer exists/)
    expect(res.skipped[2].reason).toMatch(/Berserk/)
    const row = db.prepare('SELECT progress FROM media_item WHERE id = ?').get(id) as { progress: number }
    expect(row.progress).toBe(0)
  })
})

describe('jp replay', () => {
  const state = {
    status: 'review' as const,
    learningStep: 0,
    intervalDays: 4,
    ease: 2.5,
    reps: 3,
    lapses: 0,
    dueAt: '2026-07-20 10:00:00'
  }

  it('applies the phone-computed SRS state with the review-time timestamps', () => {
    const cardId = addCard()
    const res = applyOpsBatch(
      batch([{ kind: 'jp.review', cardId, front: '猫', ts: TS, grade: 'good', state }])
    )
    expect(res.applied).toBe(1)
    const card = db.prepare('SELECT * FROM jp_card WHERE id = ?').get(cardId) as Record<string, unknown>
    expect(card.status).toBe('review')
    expect(card.interval_days).toBe(4)
    expect(card.due_at).toBe('2026-07-20 10:00:00')
    expect(card.last_reviewed_at).toBe(TS)
    const log = db.prepare('SELECT * FROM jp_review_log').all() as Record<string, unknown>[]
    expect(log).toHaveLength(1)
    expect(log[0].grade).toBe('good')
    expect(log[0].reviewed_at).toBe(TS)
  })

  it('keeps a newer PC review state but still records the log row', () => {
    const cardId = addCard()
    db.prepare(`UPDATE jp_card SET last_reviewed_at = ?, status = 'review', interval_days = 30 WHERE id = ?`).run(
      FUTURE,
      cardId
    )
    const res = applyOpsBatch(
      batch([{ kind: 'jp.review', cardId, front: '猫', ts: TS, grade: 'again', state }])
    )
    expect(res.applied).toBe(1)
    const card = db.prepare('SELECT interval_days FROM jp_card WHERE id = ?').get(cardId) as {
      interval_days: number
    }
    expect(card.interval_days).toBe(30) // PC state kept
    expect(db.prepare('SELECT COUNT(*) AS n FROM jp_review_log').get()).toEqual({ n: 1 })
  })

  it('skips a card whose front changed and marks lessons learned with the phone time', () => {
    const cardId = addCard('犬')
    const lessonId = (db.prepare('SELECT lesson_id FROM jp_card WHERE id = ?').get(cardId) as {
      lesson_id: number
    }).lesson_id
    db.prepare('UPDATE jp_lesson SET learned = 0, learned_at = NULL WHERE id = ?').run(lessonId)
    const res = applyOpsBatch(
      batch([
        { kind: 'jp.review', cardId, front: '猫', ts: TS, grade: 'good', state },
        { kind: 'jp.lessonLearned', lessonId, ts: TS, learned: true },
        { kind: 'jp.lessonLearned', lessonId: 999, ts: TS, learned: true }
      ])
    )
    expect(res.applied).toBe(1)
    expect(res.skipped.map((s) => s.kind)).toEqual(['jp.review', 'jp.lessonLearned'])
    const lesson = db.prepare('SELECT learned, learned_at FROM jp_lesson WHERE id = ?').get(lessonId) as {
      learned: number
      learned_at: string
    }
    expect(lesson.learned).toBe(1)
    expect(lesson.learned_at).toBe(TS)
  })
})

describe('music replay', () => {
  it('sets liked_at from the phone time and falls back to file_path on id drift', () => {
    const trackId = addTrack()
    // Simulate a rescan that recreated the row under a new id.
    const res = applyOpsBatch(
      batch([
        { kind: 'music.setLiked', trackId: trackId + 500, filePath: 'A/B/01 Song.mp3', ts: TS, liked: true }
      ])
    )
    expect(res.applied).toBe(1)
    const row = db.prepare('SELECT liked_at FROM music_track WHERE id = ?').get(trackId) as {
      liked_at: string
    }
    expect(row.liked_at).toBe(TS)
  })

  it('logs plays at the phone time and never moves last_played_at backwards', () => {
    const trackId = addTrack()
    db.prepare('UPDATE music_track SET last_played_at = ? WHERE id = ?').run(LATER, trackId)
    const res = applyOpsBatch(
      batch([{ kind: 'music.logPlay', trackId, filePath: 'A/B/01 Song.mp3', ts: TS }])
    )
    expect(res.applied).toBe(1)
    const row = db
      .prepare('SELECT play_count, last_played_at FROM music_track WHERE id = ?')
      .get(trackId) as { play_count: number; last_played_at: string }
    expect(row.play_count).toBe(1)
    expect(row.last_played_at).toBe(LATER) // op is older — keep the newer PC play
    const log = db.prepare('SELECT played_at, duration FROM music_play_log').all() as Record<
      string,
      unknown
    >[]
    expect(log).toEqual([{ played_at: TS, duration: 180 }])
  })

  it('skips a track that no longer exists anywhere', () => {
    const res = applyOpsBatch(
      batch([{ kind: 'music.setLiked', trackId: 1, filePath: 'gone.mp3', ts: TS, liked: true }])
    )
    expect(res.applied).toBe(0)
    expect(res.skipped[0].reason).toMatch(/no longer exists/)
  })
})

describe('manga replay', () => {
  it('applies reading progress; finishing stamps read_at with the phone time and raises media progress', () => {
    const mediaId = addAnime('Berserk')
    const chapterId = addChapter(mediaId, 20)
    let res = applyOpsBatch(
      batch([{ kind: 'manga.progress', chapterId, dirPath: 'Berserk/c001', ts: TS, lastReadPage: 5 }])
    )
    expect(res.applied).toBe(1)
    let ch = db.prepare('SELECT last_read_page, read_at FROM manga_chapter WHERE id = ?').get(chapterId) as {
      last_read_page: number
      read_at: string | null
    }
    expect(ch.last_read_page).toBe(5)
    expect(ch.read_at).toBeNull()

    res = applyOpsBatch(
      batch(
        [{ kind: 'manga.progress', chapterId, dirPath: 'Berserk/c001', ts: TS, lastReadPage: 19 }],
        'batch-0002'
      )
    )
    expect(res.applied).toBe(1)
    ch = db.prepare('SELECT last_read_page, read_at FROM manga_chapter WHERE id = ?').get(chapterId) as {
      last_read_page: number
      read_at: string | null
    }
    expect(ch.read_at).toBe(TS)
    const media = db.prepare('SELECT progress FROM media_item WHERE id = ?').get(mediaId) as {
      progress: number
    }
    expect(media.progress).toBe(1) // chapter number 1 read
  })

  it('setRead=false clears read state; chapter resolves by dir_path after reattach', () => {
    const mediaId = addAnime('Berserk')
    const chapterId = addChapter(mediaId, 20)
    db.prepare('UPDATE manga_chapter SET read_at = ?, last_read_page = 19 WHERE id = ?').run(TS, chapterId)
    const res = applyOpsBatch(
      batch([
        // Stale id (reattach renumbered) — dir_path resolves it.
        { kind: 'manga.setRead', chapterId: chapterId + 500, dirPath: 'Berserk/c001', ts: LATER, read: false }
      ])
    )
    expect(res.applied).toBe(1)
    const ch = db.prepare('SELECT last_read_page, read_at FROM manga_chapter WHERE id = ?').get(chapterId) as {
      last_read_page: number | null
      read_at: string | null
    }
    expect(ch.read_at).toBeNull()
    expect(ch.last_read_page).toBeNull()
  })
})

describe('list + quiz replay', () => {
  it('adds and removes list items, skipping dead lists and dead entities', () => {
    const mediaId = addAnime('Berserk')
    const listId = Number(
      db.prepare(`INSERT INTO list (title, entity_kind) VALUES ('Favs', 'media')`).run().lastInsertRowid
    )
    let res = applyOpsBatch(
      batch([
        { kind: 'list.addItem', listId, entityId: mediaId, ts: TS, note: 'peak' },
        { kind: 'list.addItem', listId, entityId: 999, ts: TS },
        { kind: 'list.addItem', listId: 999, entityId: mediaId, ts: TS }
      ])
    )
    expect(res.applied).toBe(1)
    expect(res.skipped.map((s) => s.reason)).toEqual([
      expect.stringMatching(/media entry no longer exists/),
      expect.stringMatching(/list no longer exists/)
    ])
    expect(db.prepare('SELECT COUNT(*) AS n FROM list_item').get()).toEqual({ n: 1 })

    res = applyOpsBatch(
      batch([{ kind: 'list.removeItem', listId, entityId: mediaId, ts: TS }], 'batch-0002')
    )
    expect(res.applied).toBe(1)
    expect(db.prepare('SELECT COUNT(*) AS n FROM list_item').get()).toEqual({ n: 0 })
  })

  it('records quiz sessions at the phone play time', () => {
    const res = applyOpsBatch(
      batch([
        {
          kind: 'quiz.session',
          ts: TS,
          session: { kind: 'kana', score: 18, total: 20, bestStreak: 9, settings: { rows: 'all' } }
        }
      ])
    )
    expect(res.applied).toBe(1)
    const row = db.prepare('SELECT * FROM quiz_session').get() as Record<string, unknown>
    expect(row.kind).toBe('kana')
    expect(row.played_at).toBe(TS)
    expect(JSON.parse(String(row.settings))).toEqual({ rows: 'all' })
  })
})

describe('batch dedup', () => {
  it('re-POSTing a batch returns the stored outcome without double-applying', () => {
    const trackId = addTrack()
    const req = batch([
      { kind: 'music.logPlay', trackId, filePath: 'A/B/01 Song.mp3', ts: TS },
      { kind: 'music.setLiked', trackId: 12345, filePath: 'gone.mp3', ts: TS, liked: true }
    ])
    const first = applyOpsBatch(req)
    expect(first).toMatchObject({ applied: 1, alreadyApplied: false })
    expect(first.skipped).toHaveLength(1)

    const second = applyOpsBatch(req)
    expect(second).toMatchObject({ applied: 1, alreadyApplied: true })
    expect(second.skipped).toEqual(first.skipped)
    const row = db.prepare('SELECT play_count FROM music_track WHERE id = ?').get(trackId) as {
      play_count: number
    }
    expect(row.play_count).toBe(1)
  })
})

// ---------------------------------------------------------------------------
// Server pure helpers.
// ---------------------------------------------------------------------------

describe('sync server helpers', () => {
  it('tokenMatches requires a real stored token and an exact bearer', () => {
    const token = 'a'.repeat(64)
    expect(tokenMatches(`Bearer ${token}`, token)).toBe(true)
    expect(tokenMatches(`Bearer ${token}x`, token)).toBe(false)
    expect(tokenMatches(`Bearer ${token}`, '')).toBe(false)
    expect(tokenMatches(`Bearer short`, 'short')).toBe(false) // unpaired sentinel
    expect(tokenMatches(undefined, token)).toBe(false)
    expect(tokenMatches(token, token)).toBe(false) // missing Bearer prefix
  })

  it('fileRoutePath allows only clean media/ paths', () => {
    expect(fileRoutePath('media/dl-abc.jpg')).toBe('media/dl-abc.jpg')
    expect(fileRoutePath('media/music-covers/x.png')).toBe('media/music-covers/x.png')
    expect(fileRoutePath('media\\music-covers\\x.png')).toBe('media/music-covers/x.png')
    expect(fileRoutePath('media/../navihub.db')).toBeNull()
    expect(fileRoutePath('manga/vol1/p1.png')).toBeNull()
    expect(fileRoutePath('/etc/passwd')).toBeNull()
    expect(fileRoutePath('media//x.png')).toBeNull()
    expect(fileRoutePath(null)).toBeNull()
  })

  it('pairing codes are 6 digits', () => {
    for (let i = 0; i < 20; i += 1) expect(newPairingCode()).toMatch(/^\d{6}$/)
  })
})

// ---------------------------------------------------------------------------
// Server end-to-end over loopback (ephemeral port via sync.port = 0).
// ---------------------------------------------------------------------------

describe('sync server http', () => {
  afterEach(async () => {
    await stopSyncServer()
  })

  async function startOnEphemeralPort(pairing: boolean): Promise<string> {
    db.prepare(`INSERT OR REPLACE INTO settings (key, value) VALUES ('sync.port', '0')`).run()
    const status = await startSyncServer(pairing)
    expect(status.running).toBe(true)
    return `http://127.0.0.1:${status.port}`
  }

  async function pairedBase(): Promise<{ base: string; token: string }> {
    const base = await startOnEphemeralPort(true)
    const code = getSyncStatus().pairingCode!
    const res = await fetch(`${base}/pair`, {
      method: 'POST',
      body: JSON.stringify({ code, device: 'pixel' })
    })
    expect(res.status).toBe(200)
    const { token } = (await res.json()) as { token: string }
    return { base, token }
  }

  it('rejects everything without a token, and pairing mints one', async () => {
    const base = await startOnEphemeralPort(false)
    expect((await fetch(`${base}/info`)).status).toBe(401)
    // Pairing unarmed → refused.
    expect(
      (await fetch(`${base}/pair`, { method: 'POST', body: JSON.stringify({ code: '000000', device: 'x' }) }))
        .status
    ).toBe(403)

    await startSyncServer(true) // arm pairing on the running server
    const code = getSyncStatus().pairingCode!
    expect(code).toMatch(/^\d{6}$/)
    const wrong = await fetch(`${base}/pair`, {
      method: 'POST',
      body: JSON.stringify({ code: '999999', device: 'x' })
    })
    expect(wrong.status).toBe(403)

    const ok = await fetch(`${base}/pair`, {
      method: 'POST',
      body: JSON.stringify({ code, device: 'pixel' })
    })
    expect(ok.status).toBe(200)
    const paired = (await ok.json()) as { token: string; protocol: number }
    expect(paired.protocol).toBe(SYNC_PROTOCOL_VERSION)
    expect(getSyncStatus().pairingCode).toBeNull() // disarmed after success
    expect(getSyncStatus().pairedDevice).toBe('pixel')

    const info = await fetch(`${base}/info`, {
      headers: { authorization: `Bearer ${paired.token}` }
    })
    expect(info.status).toBe(200)
    expect(await info.json()).toMatchObject({ app: 'navihub', protocol: SYNC_PROTOCOL_VERSION })

    unpair()
    expect(
      (await fetch(`${base}/info`, { headers: { authorization: `Bearer ${paired.token}` } })).status
    ).toBe(401)
  })

  it('disarms pairing after 5 wrong codes', async () => {
    const base = await startOnEphemeralPort(true)
    for (let i = 0; i < 5; i += 1) {
      await fetch(`${base}/pair`, {
        method: 'POST',
        body: JSON.stringify({ code: '000001', device: 'x' })
      })
    }
    expect(getSyncStatus().pairingCode).toBeNull()
  })

  it('applies ops over http and reports the result', async () => {
    const { base, token } = await pairedBase()
    const id = addAnime('Berserk')
    db.prepare(`UPDATE media_item SET updated_at = '2020-01-01 00:00:00' WHERE id = ?`).run(id)
    const res = await fetch(`${base}/ops`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: JSON.stringify(
        batch([{ kind: 'media.update', mediaId: id, title: 'Berserk', ts: TS, fields: { score: 8 } }])
      )
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toMatchObject({ applied: 1, alreadyApplied: false })
    const row = db.prepare('SELECT score FROM media_item WHERE id = ?').get(id) as { score: number }
    expect(row.score).toBe(8)
    expect(getSyncStatus().lastSync).toMatchObject({ device: 'test phone', applied: 1, skipped: 0 })

    const bad = await fetch(`${base}/ops`, {
      method: 'POST',
      headers: { authorization: `Bearer ${token}` },
      body: '{"batchId": 7}'
    })
    expect(bad.status).toBe(400)
  })

  it('serves the cover manifest and files with range support, guarding the path', async () => {
    const { base, token } = await pairedBase()
    const auth = { authorization: `Bearer ${token}` }
    mkdirSync(join(userData, 'media'), { recursive: true })
    writeFileSync(join(userData, 'media', 'dl-test.png'), Buffer.from('0123456789'))
    writeFileSync(join(userData, 'media', 'theme.ogg'), Buffer.from('not a cover'))

    const manifest = (await (await fetch(`${base}/manifest?scope=covers`, { headers: auth })).json()) as {
      files: { path: string; size: number }[]
    }
    expect(manifest.files).toEqual([{ path: 'media/dl-test.png', size: 10 }])

    const whole = await fetch(`${base}/file?path=media/dl-test.png`, { headers: auth })
    expect(whole.status).toBe(200)
    expect(Buffer.from(await whole.arrayBuffer()).toString()).toBe('0123456789')

    const part = await fetch(`${base}/file?path=media/dl-test.png`, {
      headers: { ...auth, range: 'bytes=2-4' }
    })
    expect(part.status).toBe(206)
    expect(Buffer.from(await part.arrayBuffer()).toString()).toBe('234')

    expect((await fetch(`${base}/file?path=media/../secret`, { headers: auth })).status).toBe(400)
    expect((await fetch(`${base}/file?path=media/missing.png`, { headers: auth })).status).toBe(404)
  })

  it('streams a valid SQLite snapshot of the live DB', async () => {
    const { base, token } = await pairedBase()
    addAnime('Berserk')
    const res = await fetch(`${base}/snapshot`, { headers: { authorization: `Bearer ${token}` } })
    expect(res.status).toBe(200)
    const bytes = Buffer.from(await res.arrayBuffer())
    expect(bytes.length).toBeGreaterThan(0)
    expect(bytes.subarray(0, 15).toString()).toBe('SQLite format 3')
  })
})
