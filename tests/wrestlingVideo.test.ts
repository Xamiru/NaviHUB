import { describe, it, expect, beforeEach, vi } from 'vitest'
import Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({ dialog: { showOpenDialog: vi.fn() }, app: { getPath: () => '/tmp' } }))
vi.mock('../src/main/files', () => ({
  videoRootDir: () => '/video-root',
  wrestlingRootDir: () => '/wrestling-root'
}))

import * as scan from '../src/main/video/scan'
import { VIDEO_SCOPES } from '../src/main/video/scope'
import * as repo from '../src/main/repos/wrestlingRepo'

const WRESTLING = VIDEO_SCOPES.wrestling

function makeEvent(name = 'WrestleMania X-Seven'): number {
  return repo.saveEvent({
    promotion: 'wwe',
    name,
    wikiTitle: name,
    matches: [
      {
        sortOrder: 0,
        title: 'A vs. B',
        resultText: null,
        stipulation: null,
        championship: null,
        durationSeconds: null,
        outcome: 'decision',
        cardSlot: null,
        participants: []
      }
    ]
  })
}

// The scanner is shared with the media library, so these tests are really
// asking one thing: does the wrestling SCOPE address the right table, the right
// owner column and the right root?
beforeEach(() => {
  db = createTestDb()
})

describe('the wrestling video scope', () => {
  it('writes rows against wrestling_video and the event, not media_item', () => {
    const eventId = makeEvent()
    db.prepare(
      `INSERT INTO wrestling_video (event_id, file_path, title, sort_order)
       VALUES (?, ?, ?, 0)`
    ).run(eventId, 'WM17/main.mkv', 'Main event')

    const rows = scan.rowsFor(WRESTLING, eventId)
    expect(rows).toHaveLength(1)
    expect(repo.videosFor(eventId)[0]).toMatchObject({
      eventId,
      filePath: 'WM17/main.mkv',
      title: 'Main event'
    })
    // The media scope must not see it.
    expect(scan.rowsFor(VIDEO_SCOPES.video, eventId)).toHaveLength(0)
  })

  it('resolves the owner to the event page, with no media identity', () => {
    const eventId = makeEvent()
    expect(WRESTLING.owner(eventId)).toEqual({
      title: 'WrestleMania X-Seven',
      backPath: `/wrestling/event/${eventId}`,
      // Load-bearing: an event is NOT a media_item, so nothing downstream may
      // treat this id as one — see the markWatched checklist guard in ipc.ts.
      mediaId: null,
      mediaType: null
    })
    expect(WRESTLING.owner(9999)).toBeNull()
  })

  it('reads and writes resume position through the scope', () => {
    const eventId = makeEvent()
    const fileId = Number(
      db
        .prepare(
          `INSERT INTO wrestling_video (event_id, file_path, title, sort_order)
           VALUES (?, ?, ?, 0)`
        )
        .run(eventId, 'WM17/main.mkv', 'Main event').lastInsertRowid
    )
    scan.markProgressIn(WRESTLING, fileId, 1234)
    expect(scan.scopedFileById(WRESTLING, fileId)).toMatchObject({
      ownerId: eventId,
      resumeSeconds: 1234
    })
  })

  it('reports the previous and next file on the card', () => {
    const eventId = makeEvent()
    const ids = ['a.mkv', 'b.mkv', 'c.mkv'].map((f, i) =>
      Number(
        db
          .prepare(
            `INSERT INTO wrestling_video (event_id, file_path, title, sort_order)
             VALUES (?, ?, ?, ?)`
          )
          .run(eventId, f, f, i).lastInsertRowid
      )
    )
    expect(scan.neighboursIn(WRESTLING, ids[1])).toEqual({
      prev: { fileId: ids[0], title: 'a.mkv' },
      next: { fileId: ids[2], title: 'c.mkv' }
    })
    expect(scan.neighboursIn(WRESTLING, ids[0]).prev).toBeNull()
    expect(scan.neighboursIn(WRESTLING, ids[2]).next).toBeNull()
  })

  it('reports the owner id on watched, so the caller can refuse to log it', () => {
    const eventId = makeEvent()
    const fileId = Number(
      db
        .prepare(
          `INSERT INTO wrestling_video (event_id, file_path, title, sort_order)
           VALUES (?, ?, ?, 0)`
        )
        .run(eventId, 'a.mkv', 'a').lastInsertRowid
    )
    expect(scan.markWatchedIn(WRESTLING, fileId, true)).toEqual({ ownerId: eventId, firstTime: true })
    // Second time is no longer a first transition — the checklist credit in
    // ipc.ts hangs off exactly this flag.
    expect(scan.markWatchedIn(WRESTLING, fileId, true)?.firstTime).toBe(false)
  })

  it('drops the files but keeps the wiki row when a folder is detached', () => {
    const eventId = makeEvent()
    db.prepare(
      `INSERT INTO wrestling_video (event_id, file_path, title, sort_order) VALUES (?, ?, ?, 0)`
    ).run(eventId, 'a.mkv', 'a')
    db.prepare('UPDATE wrestling_event SET local_dir = ? WHERE id = ?').run('WM17', eventId)

    scan.detachIn(WRESTLING, eventId)
    expect(repo.videosFor(eventId)).toHaveLength(0)
    expect(scan.localDirFor(WRESTLING, eventId)).toBeNull()
    // The event and its card are reference data and must survive.
    expect(repo.getEvent(eventId)?.matches).toHaveLength(1)
  })

  it('cascades files away with the event', () => {
    const eventId = makeEvent()
    db.prepare(
      `INSERT INTO wrestling_video (event_id, file_path, title, sort_order) VALUES (?, ?, ?, 0)`
    ).run(eventId, 'a.mkv', 'a')
    db.prepare('DELETE FROM wrestling_event WHERE id = ?').run(eventId)
    expect(
      db.prepare('SELECT COUNT(*) AS n FROM wrestling_video').get() as { n: number }
    ).toEqual({ n: 0 })
  })
})
