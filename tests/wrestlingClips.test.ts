import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
let root: string
const m = vi.hoisted(() => ({
  pick: vi.fn(),
  open: vi.fn(),
  stat: vi.fn(),
  exists: vi.fn(),
  unlink: vi.fn(),
  hasFfmpeg: vi.fn(),
  run: vi.fn(),
  window: { id: 1 }
}))
vi.mock('electron', () => ({
  BrowserWindow: { getFocusedWindow: () => m.window },
  dialog: { showOpenDialog: m.pick },
  shell: { openPath: m.open }
}))
vi.mock('fs', async () => ({
  ...(await vi.importActual<typeof import('fs')>('fs')),
  statSync: m.stat,
  existsSync: m.exists,
  mkdirSync: vi.fn(),
  unlinkSync: m.unlink
}))
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/repos/settingsRepo', () => ({
  get: () => root,
  set: (_key: string, value: string) => {
    root = value
  }
}))
vi.mock('../src/main/files', () => ({
  mediaRoot: () => '/data/media',
  absoluteMediaPath: (path: string) =>
    path.startsWith('media/') ? `/data/${path}` : `${root}/${path.replace(/^wrestling\//, '')}`
}))
vi.mock('../src/main/video/ffmpeg', () => ({
  hasFfmpeg: m.hasFfmpeg,
  probeFile: async () => ({ durationSec: 300 }),
  runFfmpegOnce: m.run
}))

import * as repo from '../src/main/repos/wrestlingClipRepo'
import * as clips from '../src/main/wrestling/clips'
import * as listRepo from '../src/main/repos/listRepo'
import { frameArgs, frameSeekSeconds } from '../src/main/wrestling/clipFrame'

let eventId: number
let matchId: number
let austinId: number
let rockId: number

function seed(): void {
  eventId = Number(
    db
      .prepare(`INSERT INTO wrestling_event (promotion, name, event_date) VALUES ('wwe', 'WrestleMania X-Seven', '2001-04-01')`)
      .run().lastInsertRowid
  )
  matchId = Number(
    db
      .prepare(`INSERT INTO wrestling_match (event_id, title) VALUES (?, 'Stone Cold vs. The Rock')`)
      .run(eventId).lastInsertRowid
  )
  austinId = Number(db.prepare(`INSERT INTO wrestling_wrestler (name, photo_path) VALUES ('Steve Austin', 'media/austin.jpg')`).run().lastInsertRowid)
  rockId = Number(db.prepare(`INSERT INTO wrestling_wrestler (name) VALUES ('The Rock')`).run().lastInsertRowid)
  const part = db.prepare('INSERT INTO wrestling_match_participant (match_id, wrestler_id, side) VALUES (?, ?, ?)')
  part.run(matchId, austinId, 0)
  part.run(matchId, rockId, 1)
}

beforeEach(() => {
  vi.clearAllMocks()
  db = createTestDb()
  root = '/library'
  m.stat.mockReturnValue({ isFile: () => true })
  m.exists.mockReturnValue(true)
  m.open.mockResolvedValue('')
  m.hasFfmpeg.mockResolvedValue(true)
  m.run.mockResolvedValue(null)
  m.pick.mockResolvedValue({ canceled: false, filePaths: ['/library/Clips/austin_3-16.mkv'] })
  seed()
})
afterEach(() => db.close())

describe('wrestling clip shelf', () => {
  it('picks a file relative to the wrestling root and saves it with a frame', async () => {
    const picked = await clips.pickFile()
    expect(picked).toEqual({ localPath: 'Clips/austin_3-16.mkv', title: 'austin 3-16' })
    const saved = await clips.save({
      title: ' Austin 3:16 ',
      kind: 'promo',
      localPath: picked!.localPath,
      tags: [' Classic Promo ', 'classic promo', 'KOTR'],
      links: [
        { entityKind: 'wrestler', entityId: austinId },
        { entityKind: 'wrestler', entityId: austinId },
        { entityKind: 'promotion', promotionId: 'wwe' }
      ]
    })
    expect(saved).toMatchObject({ title: 'Austin 3:16', kind: 'promo', available: true, favorite: false })
    expect(saved.tags).toEqual(['classic promo', 'kotr'])
    expect(saved.links).toEqual([
      { entityKind: 'wrestler', entityId: austinId, label: 'Steve Austin', imagePath: 'media/austin.jpg' },
      { entityKind: 'promotion', promotionId: 'wwe', label: 'WWE', imagePath: null }
    ])
    expect(saved.framePath).toMatch(/^media\/wrestling-clips\/\d+-[0-9a-f]{10}\.jpg$/)
    const args = m.run.mock.calls[0][0] as string[]
    expect(args).toContain('file:/library/Clips/austin_3-16.mkv')
    expect(args.at(-1)).toMatch(/^file:\/data\/media\/wrestling-clips\//)
  })

  it('rejects files outside the root and paths that escape it', async () => {
    m.pick.mockResolvedValue({ canceled: false, filePaths: ['/elsewhere/clip.mkv'] })
    await expect(clips.pickFile()).rejects.toThrow(/inside the Wrestling folder/)
    await expect(
      clips.save({ title: 'x', kind: 'highlight', localPath: '../secret.mkv', links: [] })
    ).rejects.toThrow(/inside the Wrestling folder/)
    await expect(
      clips.save({ title: 'x', kind: 'highlight', localPath: 'notes.txt', links: [] })
    ).rejects.toThrow(/video file/)
    expect(repo.list()).toEqual([])
  })

  it('validates title, kind and link targets', async () => {
    const base = { localPath: 'a.mkv', links: [] }
    await expect(clips.save({ ...base, title: '  ', kind: 'promo' })).rejects.toThrow(/title/)
    await expect(clips.save({ ...base, title: 'x', kind: 'bogus' as never })).rejects.toThrow(/type/)
    await expect(
      clips.save({ ...base, title: 'x', kind: 'promo', links: [{ entityKind: 'event', entityId: 9999 }] })
    ).rejects.toThrow(/no longer exists/)
    await expect(
      clips.save({ ...base, title: 'x', kind: 'promo', links: [{ entityKind: 'promotion', promotionId: 'xyz' as never }] })
    ).rejects.toThrow(/Unknown promotion/)
  })

  it('derives match clips onto the event, its wrestlers and its promotion once each', async () => {
    const viaMatch = await clips.save({
      title: 'X-Seven main event',
      kind: 'highlight',
      localPath: 'x7.mkv',
      links: [{ entityKind: 'match', entityId: matchId }]
    })
    const direct = await clips.save({
      title: 'Austin interview',
      kind: 'interview',
      localPath: 'int.mkv',
      links: [
        { entityKind: 'wrestler', entityId: austinId },
        { entityKind: 'match', entityId: matchId }
      ]
    })
    const austin = repo.forEntity('wrestler', austinId)
    expect(austin.map((c) => [c.id, c.via])).toEqual([
      [direct.id, null],
      [viaMatch.id, 'Stone Cold vs. The Rock']
    ])
    expect(repo.forEntity('wrestler', rockId).map((c) => c.id).sort()).toEqual([viaMatch.id, direct.id].sort())
    expect(repo.forEntity('event', eventId).map((c) => c.via)).toEqual([
      'Stone Cold vs. The Rock',
      'Stone Cold vs. The Rock'
    ])
    expect(repo.forEntity('promotion', 'wwe')).toHaveLength(2)
    expect(repo.forEntity('promotion', 'wcw')).toEqual([])
    expect(repo.forEntity('match', matchId)).toHaveLength(2)
  })

  it('filters by kind, tag, favorite and search', async () => {
    const a = await clips.save({ title: 'Pipebomb', kind: 'promo', localPath: 'a.mkv', tags: ['shoot'], links: [] })
    await clips.save({ title: 'Montreal', kind: 'documentary', localPath: 'b.mkv', note: 'screwjob', links: [] })
    repo.setFavorite(a.id, true)
    expect(repo.list({ kind: 'promo' }).map((c) => c.title)).toEqual(['Pipebomb'])
    expect(repo.list({ tag: 'SHOOT' }).map((c) => c.title)).toEqual(['Pipebomb'])
    expect(repo.list({ favorite: true }).map((c) => c.title)).toEqual(['Pipebomb'])
    expect(repo.list({ search: 'screw' }).map((c) => c.title)).toEqual(['Montreal'])
    expect(repo.list({ search: 'sho' }).map((c) => c.title)).toEqual(['Pipebomb'])
    expect(repo.allTags()).toEqual([{ tag: 'shoot', count: 1 }])
  })

  it('removes the record and its frame but never the video, and leaves lists clean', async () => {
    const saved = await clips.save({ title: 'Clip', kind: 'highlight', localPath: 'c.mkv', tags: ['t'], links: [{ entityKind: 'event', entityId: eventId }] })
    const listId = listRepo.create({ title: 'Best', kind: 'wrestlingClip', ranked: false })
    listRepo.addItem(listId, saved.id)
    expect(listRepo.get(listId)?.items[0]).toMatchObject({ name: 'Clip' })
    clips.remove(saved.id)
    expect(m.unlink).toHaveBeenCalledTimes(1)
    expect(m.unlink.mock.calls[0][0]).toMatch(/^\/data\/media\/wrestling-clips\//)
    expect(db.prepare('SELECT COUNT(*) AS n FROM wrestling_clip_link').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM wrestling_clip_tag').get()).toEqual({ n: 0 })
    expect(listRepo.get(listId)?.items ?? []).toEqual([])
  })

  it('keeps going without ffmpeg and reports a missing file as unavailable', async () => {
    m.hasFfmpeg.mockResolvedValue(false)
    const saved = await clips.save({ title: 'Clip', kind: 'highlight', localPath: 'c.mkv', links: [] })
    expect(saved.framePath).toBeNull()
    expect(m.run).not.toHaveBeenCalled()
    m.stat.mockImplementation(() => {
      throw new Error('ENOENT')
    })
    expect(clips.list()[0].available).toBe(false)
    await expect(clips.open(saved.id)).rejects.toThrow(/unavailable/)
  })

  it('protects clip-linked wrestlers and drops links to a vanished match', async () => {
    const lone = Number(db.prepare(`INSERT INTO wrestling_wrestler (name) VALUES ('Unlinked')`).run().lastInsertRowid)
    const kept = Number(db.prepare(`INSERT INTO wrestling_wrestler (name) VALUES ('Clip only')`).run().lastInsertRowid)
    await clips.save({ title: 'Clip', kind: 'promo', localPath: 'c.mkv', links: [{ entityKind: 'wrestler', entityId: kept }] })
    const wrestlingRepo = await import('../src/main/repos/wrestlingRepo')
    wrestlingRepo.pruneOrphanWrestlers()
    const ids = (db.prepare('SELECT id FROM wrestling_wrestler').all() as { id: number }[]).map((r) => r.id)
    expect(ids).toContain(kept)
    expect(ids).not.toContain(lone)
  })
})

describe('clip frame arguments', () => {
  it('seeks a tenth in, capped, and prefixes both paths', () => {
    expect(frameSeekSeconds(null)).toBe(5)
    expect(frameSeekSeconds(60)).toBe(6)
    expect(frameSeekSeconds(7200)).toBe(120)
    const args = frameArgs('/v/a:b.mkv', '/o/f.jpg', 6)
    expect(args).toContain('file:/v/a:b.mkv')
    expect(args.at(-1)).toBe('file:/o/f.jpg')
    expect(() => frameArgs('-i.mkv', '/o/f.jpg', 1)).toThrow()
    expect(() => frameArgs('relative.mkv', '/o/f.jpg', 1)).toThrow()
  })
})
