import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

const repo = await import('../src/main/repos/achievementRepo')

function addGame(title = 'Test Game', exePath: string | null = 'C:\\Games\\x.exe'): number {
  const r = db
    .prepare(
      `INSERT INTO media_item (media_type, title, exe_path, external_source, external_id)
       VALUES ('game', ?, ?, 'steam', '1091500')`
    )
    .run(title, exePath)
  return Number(r.lastInsertRowid)
}

const ach = (apiName: string, over: Partial<repo.AchievementInput> = {}): repo.AchievementInput => ({
  apiName,
  name: apiName.toLowerCase(),
  description: null,
  hidden: false,
  iconPath: `media/dl-${apiName}.jpg`,
  iconGrayPath: null,
  points: null,
  globalPct: null,
  ...over
})

beforeEach(() => {
  db = createTestDb()
})

describe('eligibility (exe linked now or ever)', () => {
  it('accepts a game with an exe linked right now', () => {
    expect(repo.isEligible(addGame())).toBe(true)
  })

  it('rejects a game that never had one', () => {
    expect(repo.isEligible(addGame('Never Linked', null))).toBe(false)
  })

  it('still accepts a game whose exe was unlinked, on the strength of a session', () => {
    const id = addGame('Played Then Unlinked', null)
    db.prepare(
      `INSERT INTO game_session (media_id, started_at, ended_at, duration)
       VALUES (?, datetime('now'), datetime('now'), 3600)`
    ).run(id)
    expect(repo.isEligible(id)).toBe(true)
  })

  it('still accepts a game that is already tracked, whatever happened to the exe', () => {
    const id = addGame('Tracked', null)
    repo.setAssociation(id, 'steam', '1091500')
    expect(repo.isEligible(id)).toBe(true)
  })

  it('is false for a media id that does not exist', () => {
    expect(repo.isEligible(9999)).toBe(false)
  })
})

describe('upsertSchema', () => {
  it('stores the set and marks the fetch time', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B')])
    const tracking = repo.getTracking(id)
    expect(tracking?.provider).toBe('steam')
    expect(tracking?.providerGameId).toBe('1091500')
    expect(tracking?.schemaFetchedAt).toBeTruthy()
    expect(repo.listForMedia(id).map((a) => a.apiName)).toEqual(['A', 'B'])
  })

  it('is idempotent — a second identical fetch changes nothing', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B')])
    const firstIds = repo.listForMedia(id).map((a) => a.id)
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B')])
    expect(repo.listForMedia(id).map((a) => a.id)).toEqual(firstIds)
  })

  it('refreshes canonical fields on a re-fetch', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A', { name: 'Old', globalPct: 50 })])
    repo.upsertSchema(id, 'steam', '1091500', [ach('A', { name: 'New', globalPct: 2 })])
    const [row] = repo.listForMedia(id)
    expect(row.name).toBe('New')
    expect(row.globalPct).toBe(2)
    expect(row.rarity).toBe('ultra-rare')
  })

  it('keeps existing art when a re-fetch could not re-download it', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A', { iconPath: 'media/dl-good.jpg' })])
    repo.upsertSchema(id, 'steam', '1091500', [ach('A', { iconPath: null })])
    expect(repo.listForMedia(id)[0].iconPath).toBe('media/dl-good.jpg')
  })

  it('prunes achievements the provider dropped', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B'), ach('C')])
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('C')])
    expect(repo.listForMedia(id).map((a) => a.apiName)).toEqual(['A', 'C'])
  })

  it('PRESERVES unlocks across a re-fetch — the whole point of the stable id', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B')])
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: 1600000000000 }], 'emu', Date.now())

    repo.upsertSchema(id, 'steam', '1091500', [ach('A', { name: 'renamed' }), ach('B'), ach('C')])

    const rows = repo.listForMedia(id)
    const a = rows.find((r) => r.apiName === 'A')
    expect(a?.unlockedAt).toBeTruthy()
    expect(a?.unlockSource).toBe('emu')
    expect(repo.summaryFor(id)).toMatchObject({ unlocked: 1, total: 3 })
  })

  it('drops the unlock only when its achievement genuinely leaves the set', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B')])
    repo.insertUnlocks(id, [{ apiName: 'B', unlockedAtMs: null }], 'emu', Date.now())
    repo.upsertSchema(id, 'steam', '1091500', [ach('A')])
    expect(repo.summaryFor(id)).toMatchObject({ unlocked: 0, total: 1 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM achievement_unlock').get()).toEqual({ n: 0 })
  })
})

describe('insertUnlocks', () => {
  it('returns only the achievements that were not already unlocked', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B')])
    const first = repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: null }], 'emu', Date.now())
    expect(first.map((r) => r.apiName)).toEqual(['A'])

    const second = repo.insertUnlocks(
      id,
      [
        { apiName: 'A', unlockedAtMs: null },
        { apiName: 'B', unlockedAtMs: null }
      ],
      'emu',
      Date.now()
    )
    expect(second.map((r) => r.apiName)).toEqual(['B'])
  })

  it('keeps the EARLIEST timestamp when a file is rewritten with a fresh date', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A')])
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: 1600000000000 }], 'emu', Date.now())
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: 1700000000000 }], 'emu', Date.now())
    const stored = db
      .prepare('SELECT unlocked_at FROM achievement_unlock')
      .get() as { unlocked_at: string }
    expect(stored.unlocked_at).toBe('2020-09-13 12:26:40')
  })

  it('falls back to the caller time when the emulator wrote none', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A')])
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: null }], 'emu', 1600000000000)
    const stored = db
      .prepare('SELECT unlocked_at FROM achievement_unlock')
      .get() as { unlocked_at: string }
    expect(stored.unlocked_at).toBe('2020-09-13 12:26:40')
  })

  it('ignores api names the set does not contain (a stale emulator file)', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A')])
    const out = repo.insertUnlocks(id, [{ apiName: 'GHOST', unlockedAtMs: null }], 'emu', Date.now())
    expect(out).toEqual([])
    expect(repo.summaryFor(id).unlocked).toBe(0)
  })

  it('records the rest of the batch when one timestamp is out of range', () => {
    // The regression: datetime(?, 'unixepoch') returns NULL past year 9999 and
    // unlocked_at is NOT NULL, so an unclamped value aborted the transaction
    // and threw away every good unlock beside it.
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B')])
    const out = repo.insertUnlocks(
      id,
      [
        { apiName: 'A', unlockedAtMs: 1_690_000_000_000_000_000 },
        { apiName: 'B', unlockedAtMs: 1600000000000 }
      ],
      'emu',
      1600000000000
    )
    expect(out.map((r) => r.apiName).sort()).toEqual(['A', 'B'])
    expect(repo.summaryFor(id).unlocked).toBe(2)
  })

  it('survives an out-of-range fallback too', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A')])
    expect(() =>
      repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: null }], 'emu', 9.9e18)
    ).not.toThrow()
    expect(repo.summaryFor(id).unlocked).toBe(1)
  })

  it('does nothing at all for an empty list', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A')])
    expect(repo.insertUnlocks(id, [], 'emu', Date.now())).toEqual([])
  })
})

describe('manual unlocking', () => {
  it('toggles a single achievement both ways', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A')])
    const [row] = repo.listForMedia(id)

    repo.setManual(row.id, true)
    expect(repo.listForMedia(id)[0].unlockSource).toBe('manual')

    repo.setManual(row.id, false)
    expect(repo.listForMedia(id)[0].unlockedAt).toBeNull()
  })

  it('will not overwrite a tracked unlock with a manual one', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A')])
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: 1600000000000 }], 'emu', Date.now())
    const [row] = repo.listForMedia(id)
    repo.setManual(row.id, true)
    expect(repo.listForMedia(id)[0].unlockSource).toBe('emu')
  })
})

describe('summaries and ordering', () => {
  it('sums earned RA points and leaves Steam sets pointless', () => {
    const id = addGame()
    repo.upsertSchema(id, 'ra', '4321', [
      ach('A', { points: 10 }),
      ach('B', { points: 25 }),
      ach('C', { points: 5 })
    ])
    repo.insertUnlocks(
      id,
      [
        { apiName: 'A', unlockedAtMs: null },
        { apiName: 'B', unlockedAtMs: null }
      ],
      'ra',
      Date.now()
    )
    expect(repo.summaryFor(id)).toEqual({ unlocked: 2, total: 3, points: 35 })

    const steam = addGame('Steam Game')
    repo.upsertSchema(steam, 'steam', '1', [ach('A')])
    expect(repo.summaryFor(steam).points).toBeNull()
  })

  it('lists unlocked achievements before locked ones', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B'), ach('C')])
    repo.insertUnlocks(id, [{ apiName: 'C', unlockedAtMs: null }], 'emu', Date.now())
    expect(repo.listForMedia(id).map((a) => a.apiName)).toEqual(['C', 'A', 'B'])
  })

  // The Goldberg emitter writes a POSITIONAL array, so it must NOT inherit the
  // UI's unlocked-first bias: that maps achievement indices differently from
  // real Steam, and reshuffles the generated file every time one is earned.
  it('keeps the provider order, unlocked or not, for the config emitter', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B'), ach('C')])
    repo.insertUnlocks(id, [{ apiName: 'C', unlockedAtMs: null }], 'emu', Date.now())

    expect(repo.listInProviderOrder(id).map((a) => a.apiName)).toEqual(['A', 'B', 'C'])
    // Earning another one must not move anything.
    repo.insertUnlocks(id, [{ apiName: 'B', unlockedAtMs: null }], 'emu', Date.now())
    expect(repo.listInProviderOrder(id).map((a) => a.apiName)).toEqual(['A', 'B', 'C'])
  })

  it('reports the unlocked api names as a set for the watcher diff', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A'), ach('B')])
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: null }], 'emu', Date.now())
    expect([...repo.unlockedApiNames(id)]).toEqual(['A'])
  })

  it('builds the detail payload in one call', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1091500', [ach('A')])
    const payload = repo.listPayload(id)
    expect(payload.eligible).toBe(true)
    expect(payload.tracking?.providerGameId).toBe('1091500')
    expect(payload.achievements).toHaveLength(1)
  })

  it('reports an untracked but eligible game as such', () => {
    const payload = repo.listPayload(addGame())
    expect(payload).toMatchObject({ eligible: true, tracking: null })
    expect(payload.summary).toEqual({ unlocked: 0, total: 0, points: null })
  })
})

describe('cross-game views', () => {
  it('counts each tracked game once for the card chips', () => {
    const a = addGame('A Game')
    const b = addGame('B Game')
    repo.upsertSchema(a, 'steam', '1', [ach('X'), ach('Y')])
    repo.upsertSchema(b, 'steam', '2', [ach('X')])
    repo.insertUnlocks(a, [{ apiName: 'X', unlockedAtMs: null }], 'emu', Date.now())
    expect(repo.cardSummaries()).toEqual({
      [a]: { unlocked: 1, total: 2 },
      [b]: { unlocked: 0, total: 1 }
    })
  })

  it('carries each unlock’s media type, so a VN links to /visual-novels not /games', () => {
    const vn = Number(
      db
        .prepare(
          `INSERT INTO media_item (media_type, title, exe_path)
           VALUES ('visual_novel', 'A VN', 'C:\\vn.exe')`
        )
        .run().lastInsertRowid
    )
    repo.upsertSchema(vn, 'steam', '1', [ach('A')])
    repo.insertUnlocks(vn, [{ apiName: 'A', unlockedAtMs: null }], 'emu', Date.now())
    expect(repo.recentUnlocks(5)[0].mediaType).toBe('visual_novel')
    expect(repo.overview().rarest.every((r) => r.mediaType)).toBe(true)
  })

  it('feeds recent unlocks newest first, carrying the game title', () => {
    const id = addGame('Feed Game')
    repo.upsertSchema(id, 'steam', '1', [ach('A'), ach('B')])
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: 1600000000000 }], 'emu', Date.now())
    repo.insertUnlocks(id, [{ apiName: 'B', unlockedAtMs: 1700000000000 }], 'emu', Date.now())
    const feed = repo.recentUnlocks(10)
    expect(feed.map((e) => e.name)).toEqual(['b', 'a'])
    expect(feed[0].mediaTitle).toBe('Feed Game')
  })

  it('ranks the rarest unlocks and never counts an unfetched percentage as rare', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1', [
      ach('COMMON', { globalPct: 60 }),
      ach('RARE', { globalPct: 1.2 }),
      ach('UNKNOWN', { globalPct: null })
    ])
    repo.insertUnlocks(
      id,
      [
        { apiName: 'COMMON', unlockedAtMs: null },
        { apiName: 'RARE', unlockedAtMs: null },
        { apiName: 'UNKNOWN', unlockedAtMs: null }
      ],
      'emu',
      Date.now()
    )
    const { rarest, totals } = repo.overview()
    expect(rarest.map((r) => r.name)).toEqual(['rare', 'common'])
    expect(rarest[0].rarity).toBe('ultra-rare')
    expect(totals).toEqual({ unlocked: 3, total: 3, games: 1 })
  })

  it('orders the overview by completion, most complete first', () => {
    const a = addGame('Half')
    const b = addGame('Full')
    repo.upsertSchema(a, 'steam', '1', [ach('X'), ach('Y')])
    repo.upsertSchema(b, 'steam', '2', [ach('X')])
    repo.insertUnlocks(a, [{ apiName: 'X', unlockedAtMs: null }], 'emu', Date.now())
    repo.insertUnlocks(b, [{ apiName: 'X', unlockedAtMs: null }], 'emu', Date.now())
    expect(repo.overview().games.map((g) => g.title)).toEqual(['Full', 'Half'])
  })

  it('keeps a tracked game in the overview even before its set is fetched', () => {
    const id = addGame('Associated Only')
    repo.setAssociation(id, 'steam', '1091500')
    const { games } = repo.overview()
    expect(games).toHaveLength(1)
    expect(games[0]).toMatchObject({ mediaId: id, total: 0, unlocked: 0 })
  })
})

describe('installedGames', () => {
  it('lists only titles with an exe linked right now', () => {
    addGame('Linked')
    addGame('Unlinked', null)
    expect(repo.installedGames().map((g) => g.title)).toEqual(['Linked'])
  })

  it('carries playtime, last played and the achievement counts', () => {
    const id = addGame('Played')
    db.prepare(
      `INSERT INTO game_session (media_id, started_at, ended_at, duration)
       VALUES (?, '2026-08-01 10:00:00', '2026-08-01 11:00:00', 3600)`
    ).run(id)
    repo.upsertSchema(id, 'steam', '1', [ach('A'), ach('B')])
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: null }], 'emu', Date.now())

    const [row] = repo.installedGames()
    expect(row).toMatchObject({
      totalSeconds: 3600,
      lastPlayedAt: '2026-08-01 10:00:00',
      achievements: { unlocked: 1, total: 2 }
    })
  })

  it('reports no achievements rather than a zero bar for untracked games', () => {
    addGame('Untracked')
    expect(repo.installedGames()[0].achievements).toBeNull()
  })

  it('sorts played titles first, newest session leading', () => {
    const old = addGame('Old')
    const recent = addGame('Recent')
    addGame('Never Played')
    db.prepare(
      `INSERT INTO game_session (media_id, started_at, ended_at, duration)
       VALUES (?, '2026-01-01 10:00:00', '2026-01-01 11:00:00', 3600)`
    ).run(old)
    db.prepare(
      `INSERT INTO game_session (media_id, started_at, ended_at, duration)
       VALUES (?, '2026-08-01 10:00:00', '2026-08-01 11:00:00', 3600)`
    ).run(recent)
    expect(repo.installedGames().map((g) => g.title)).toEqual(['Recent', 'Old', 'Never Played'])
  })

  it('includes visual novels, which launch the same way', () => {
    db.prepare(
      `INSERT INTO media_item (media_type, title, exe_path) VALUES ('visual_novel', 'A VN', 'C:\\vn.exe')`
    ).run()
    expect(repo.installedGames().map((g) => g.mediaType)).toContain('visual_novel')
  })
})

describe('lifetime', () => {
  it('disabling tracking removes the set, the unlocks and the association', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1', [ach('A')])
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: null }], 'emu', Date.now())

    repo.disable(id)

    expect(repo.getTracking(id)).toBeNull()
    expect(repo.listForMedia(id)).toEqual([])
    expect(db.prepare('SELECT COUNT(*) AS n FROM achievement_unlock').get()).toEqual({ n: 0 })
  })

  it('everything dies with the title (CASCADE), leaving no orphans', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1', [ach('A')])
    repo.insertUnlocks(id, [{ apiName: 'A', unlockedAtMs: null }], 'emu', Date.now())

    db.prepare('DELETE FROM media_item WHERE id = ?').run(id)

    expect(db.prepare('SELECT COUNT(*) AS n FROM achievement').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM achievement_game').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM achievement_unlock').get()).toEqual({ n: 0 })
  })
})
