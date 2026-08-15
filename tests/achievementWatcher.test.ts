import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// The live watcher without a game, an emulator or a timer: pollOnce is driven
// directly with injected IO. Covers the detection path (read → diff → write →
// notify), the mtime short-circuit that makes a 5 s interval free, the final
// sweep at session end, and the quit killer.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

const notifications: { title: string; body: string; icon: unknown }[] = []
vi.mock('electron', () => ({
  Notification: class {
    static isSupported = (): boolean => true
    constructor(private opts: { title: string; body: string; icon?: unknown }) {}
    show(): void {
      notifications.push({ title: this.opts.title, body: this.opts.body, icon: this.opts.icon })
    }
  },
  nativeImage: { createFromPath: (p: string) => ({ isEmpty: () => !p.includes('dl-') }) }
}))

vi.mock('../src/main/files', () => ({ absoluteMediaPath: (p: string) => `/userData/${p}` }))

let raRows: { raGameId: string; apiName: string; unlockedAtMs: number | null }[] = []
let raThrows = false
vi.mock('../src/main/retroAchievements', () => ({
  recentUnlocks: async () => {
    if (raThrows) throw new Error('offline')
    return raRows
  }
}))

const watcher = await import('../src/main/achievementWatcher')
const repo = await import('../src/main/repos/achievementRepo')

const ENV = { appData: '/roaming', publicDir: '/public', localAppData: '/local' }
const GOLDBERG = '/roaming/Goldberg SteamEmu Saves/440/achievements.json'

let files: Record<string, string> = {}
let mtime = 1_000_000
const io = {
  exists: (p: string) => p in files,
  readFile: (p: string) => files[p] ?? '',
  mtimeMs: (p: string) => (p in files ? mtime : null),
  listDirs: () => []
}
const deps = { io, env: ENV, now: () => 1_700_000_000_000 }

function earned(...names: string[]): string {
  return JSON.stringify(
    Object.fromEntries(names.map((n) => [n, { earned: true, earned_time: 1600000000 }]))
  )
}

function setupGame(provider: 'steam' | 'ra' = 'steam'): number {
  const id = Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, exe_path)
         VALUES ('game', 'Test Game', 'C:\\Games\\tf.exe')`
      )
      .run().lastInsertRowid
  )
  repo.upsertSchema(
    id,
    provider,
    provider === 'steam' ? '440' : '4321',
    ['ACH_A', 'ACH_B'].map((apiName) => ({
      apiName,
      name: apiName,
      description: `do ${apiName}`,
      hidden: false,
      iconPath: 'media/dl-icon.jpg',
      iconGrayPath: null,
      points: null,
      globalPct: 5
    }))
  )
  return id
}

beforeEach(() => {
  db = createTestDb()
  files = {}
  mtime = 1_000_000
  raRows = []
  raThrows = false
  notifications.length = 0
  watcher.__resetForTests()
})

describe('startWatch', () => {
  it('does nothing for a game with no tracking set up', async () => {
    const id = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title) VALUES ('game', 'Untracked')`)
        .run().lastInsertRowid
    )
    watcher.startWatch(id)
    expect(watcher.getWatchStatus()).toBeNull()
    expect(await watcher.pollOnce(deps)).toEqual([])
  })

  it('reports a running watch once a tracked game launches', () => {
    watcher.startWatch(setupGame())
    expect(watcher.getWatchStatus()).toMatchObject({ running: true, provider: 'steam', seq: 0 })
  })

  it('reads what is already on disk on the first tick', async () => {
    // An unlock earned between the last sweep and this launch must not be
    // skipped just because the file predates the session.
    const id = setupGame()
    files[GOLDBERG] = earned('ACH_A')
    watcher.startWatch(id)
    expect((await watcher.pollOnce(deps)).map((r) => r.apiName)).toEqual(['ACH_A'])
  })
})

describe('pollOnce: the Steam emulator path', () => {
  it('records a new unlock and raises exactly one notification', async () => {
    const id = setupGame()
    watcher.startWatch(id)
    files[GOLDBERG] = earned('ACH_A')

    const fresh = await watcher.pollOnce(deps)

    expect(fresh.map((r) => r.apiName)).toEqual(['ACH_A'])
    expect(repo.summaryFor(id).unlocked).toBe(1)
    expect(notifications).toHaveLength(1)
    expect(notifications[0].title).toContain('ACH_A')
    expect(notifications[0].body).toBe('do ACH_A')
    expect(notifications[0].icon).toBeTruthy()
  })

  it('publishes the unlock to the poll status, seq climbing per event', async () => {
    const id = setupGame()
    watcher.startWatch(id)
    files[GOLDBERG] = earned('ACH_A', 'ACH_B')
    mtime += 1
    await watcher.pollOnce(deps)

    const status = watcher.getWatchStatus()
    expect(status?.seq).toBe(2)
    expect(status?.recent.map((e) => e.seq)).toEqual([1, 2])
    expect(status?.recent[0]).toMatchObject({ mediaId: id, mediaTitle: 'Test Game', rarity: 'rare' })
  })

  it('never announces the same achievement twice', async () => {
    watcher.startWatch(setupGame())
    files[GOLDBERG] = earned('ACH_A')
    await watcher.pollOnce(deps)
    mtime += 1 // file rewritten, same contents
    const second = await watcher.pollOnce(deps)

    expect(second).toEqual([])
    expect(notifications).toHaveLength(1)
  })

  it('skips the parse entirely while nothing has been rewritten', async () => {
    watcher.startWatch(setupGame())
    files[GOLDBERG] = earned('ACH_A')
    await watcher.pollOnce(deps)

    // Same mtime: the file cannot have changed, so a second unlock appearing in
    // it is deliberately not seen until the mtime moves.
    files[GOLDBERG] = earned('ACH_A', 'ACH_B')
    expect(await watcher.pollOnce(deps)).toEqual([])

    mtime += 1
    expect((await watcher.pollOnce(deps)).map((r) => r.apiName)).toEqual(['ACH_B'])
  })

  it('does nothing when no emulator file exists at all', async () => {
    watcher.startWatch(setupGame())
    expect(await watcher.pollOnce(deps)).toEqual([])
    expect(notifications).toHaveLength(0)
  })

  it('survives a file caught mid-write', async () => {
    watcher.startWatch(setupGame())
    files[GOLDBERG] = '{"ACH_A": {"earned": tr'
    await expect(watcher.pollOnce(deps)).resolves.toEqual([])
  })

  it('is inert once nothing is being watched', async () => {
    files[GOLDBERG] = earned('ACH_A')
    expect(await watcher.pollOnce(deps)).toEqual([])
  })
})

describe('pollOnce: the RetroAchievements path', () => {
  it('records only unlocks belonging to the game being played', async () => {
    const id = setupGame('ra')
    watcher.startWatch(id)
    raRows = [
      { raGameId: '4321', apiName: 'ACH_A', unlockedAtMs: 1600000000000 },
      { raGameId: '9999', apiName: 'ACH_B', unlockedAtMs: 1600000000000 }
    ]
    const fresh = await watcher.pollOnce(deps)
    expect(fresh.map((r) => r.apiName)).toEqual(['ACH_A'])
    expect(repo.summaryFor(id).unlocked).toBe(1)
  })

  it('keeps the session alive and explains itself when RA is unreachable', async () => {
    watcher.startWatch(setupGame('ra'))
    raThrows = true
    expect(await watcher.pollOnce(deps)).toEqual([])
    const status = watcher.getWatchStatus()
    expect(status?.running).toBe(true)
    expect(status?.message).toMatch(/offline/)
  })

  it('clears the failure message once RA answers again', async () => {
    watcher.startWatch(setupGame('ra'))
    raThrows = true
    await watcher.pollOnce(deps)
    raThrows = false
    await watcher.pollOnce(deps)
    expect(watcher.getWatchStatus()?.message).toBeNull()
  })
})

describe('session end', () => {
  it('takes one final look, because emulators flush as the game exits', async () => {
    const id = setupGame()
    watcher.startWatch(id)
    files[GOLDBERG] = earned('ACH_A')

    await watcher.stopWatch(deps)

    expect(repo.summaryFor(id).unlocked).toBe(1)
    expect(notifications).toHaveLength(1)
  })

  it('stops watching but keeps the unlocks visible to the poll', async () => {
    watcher.startWatch(setupGame())
    files[GOLDBERG] = earned('ACH_A')
    await watcher.stopWatch(deps)

    const status = watcher.getWatchStatus()
    expect(status?.running).toBe(false)
    expect(status?.recent).toHaveLength(1)
  })

  it('is safe to call when nothing is running', async () => {
    await expect(watcher.stopWatch(deps)).resolves.toBeUndefined()
  })

  it('does not kill a NEW session that started while its sweep was in flight', async () => {
    // gameLaunch clears `active` before awaiting stopWatch, so the user can
    // launch again inside that window. A RetroAchievements sweep awaits the
    // network, so this window is seconds wide — nulling the watch
    // unconditionally left the new session detecting nothing all game.
    const first = setupGame('ra')
    watcher.startWatch(first)

    let release: () => void = () => {}
    const blocked = new Promise<void>((r) => (release = r))
    const sweep = watcher.stopWatch({
      ...deps,
      raRecent: async () => {
        await blocked
        return []
      }
    })

    const second = setupGame()
    watcher.startWatch(second)
    release()
    await sweep

    expect(watcher.getWatchStatus()).toMatchObject({ running: true, mediaId: second })
    files[GOLDBERG] = earned('ACH_A')
    expect((await watcher.pollOnce(deps)).map((r) => r.apiName)).toEqual(['ACH_A'])
  })

  it('sweeps the game that actually exited, not the one just launched', async () => {
    const first = setupGame('ra')
    watcher.startWatch(first)
    raRows = [{ raGameId: '4321', apiName: 'ACH_A', unlockedAtMs: 1600000000000 }]

    let release: () => void = () => {}
    const blocked = new Promise<void>((r) => (release = r))
    const sweep = watcher.stopWatch({
      ...deps,
      raRecent: async () => {
        await blocked
        return raRows
      }
    })
    const second = setupGame()
    watcher.startWatch(second)
    release()
    await sweep

    expect(repo.summaryFor(first).unlocked).toBe(1)
    expect(repo.summaryFor(second).unlocked).toBe(0)
  })
})

describe('launching an untracked game', () => {
  it('clears the previous watch instead of leaving it reporting the wrong title', () => {
    watcher.startWatch(setupGame())
    const untracked = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title) VALUES ('game', 'Untracked')`)
        .run().lastInsertRowid
    )

    watcher.startWatch(untracked)

    expect(watcher.getWatchStatus()?.running).toBeFalsy()
  })

  // getWatchStatus() is non-null whenever `recent` is, so leaving the previous
  // game's unlocks and error message behind makes the renderer attribute both
  // to the game now running.
  it('clears the previous game’s unlocks and message, not just the watch', async () => {
    const tracked = setupGame()
    watcher.startWatch(tracked)
    files[GOLDBERG] = earned('ACH_A')
    await watcher.pollOnce(deps)
    expect(watcher.getWatchStatus()?.recent).toHaveLength(1)

    const untracked = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title) VALUES ('game', 'Untracked')`)
        .run().lastInsertRowid
    )
    watcher.startWatch(untracked)

    expect(watcher.getWatchStatus()).toBeNull()
  })

  it('does not sweep the previous game’s files on the next stop', async () => {
    const tracked = setupGame()
    watcher.startWatch(tracked)
    const untracked = Number(
      db
        .prepare(`INSERT INTO media_item (media_type, title) VALUES ('game', 'Untracked')`)
        .run().lastInsertRowid
    )
    watcher.startWatch(untracked)

    files[GOLDBERG] = earned('ACH_A')
    await watcher.stopWatch(deps)

    expect(repo.summaryFor(tracked).unlocked).toBe(0)
  })
})

describe('quit killer', () => {
  it('sweeps the emulator file before the database closes', () => {
    const id = setupGame()
    watcher.startWatch(id)
    files[GOLDBERG] = earned('ACH_A')

    // The real filesystem has nothing here, so inject through the module's own
    // default path by pre-populating instead: the killer is synchronous and
    // takes no deps, which is the point — quit does not await.
    watcher.stopAchievementWatcher()

    expect(watcher.getWatchStatus()?.running).toBeFalsy()
  })

  it('leaves no watch behind, so a later poll is inert', async () => {
    watcher.startWatch(setupGame())
    watcher.stopAchievementWatcher()
    files[GOLDBERG] = earned('ACH_A')
    expect(await watcher.pollOnce(deps)).toEqual([])
  })

  it('is safe with no session in flight', () => {
    expect(() => watcher.stopAchievementWatcher()).not.toThrow()
  })
})

describe('write failures and bursts', () => {
  // The watermark is what makes a 5 s interval free, but committing it before
  // the write means a failed write is never retried: every later tick — and
  // stopWatch's final sweep — takes the mtime short-circuit instead.
  it('does not advance the mtime watermark when the write throws', async () => {
    watcher.startWatch(setupGame())
    files[GOLDBERG] = earned('ACH_A')

    const good = db
    // Stands in for the SQLITE_BUSY this path actually hits (a concurrent
    // import transaction holding the write lock).
    db = {
      prepare: () => {
        throw new Error('database is locked')
      },
      transaction: () => {
        throw new Error('database is locked')
      }
    } as unknown as Database.Database
    await expect(watcher.pollOnce(deps)).rejects.toThrow('database is locked')
    db = good

    // Same file, same mtime: the retry must still write.
    expect(await watcher.pollOnce(deps)).toHaveLength(1)
    expect(repo.summaryFor(1).unlocked).toBe(1)
  })

  it('collapses a first-tick burst into ONE notification', async () => {
    const id = setupGame()
    const names = ['A1', 'A2', 'A3', 'A4', 'A5']
    repo.upsertSchema(
      id,
      'steam',
      '440',
      names.map((apiName) => ({
        apiName,
        name: apiName,
        description: null,
        hidden: false,
        iconPath: null,
        iconGrayPath: null,
        points: null,
        globalPct: null
      }))
    )
    watcher.startWatch(id)
    // startWatch sets lastMtimeMs: null on purpose, so tick 1 ingests the WHOLE
    // file — a fortnight of playing outside NaviHUB arrives at once.
    files[GOLDBERG] = earned(...names)

    expect(await watcher.pollOnce(deps)).toHaveLength(5)
    expect(notifications).toHaveLength(1)
    expect(notifications[0]!.title).toBe('5 achievements unlocked')
    // Only the OS popups collapse; the in-app list still gets every event.
    expect(watcher.getWatchStatus()?.recent).toHaveLength(5)
  })

  it('still notifies individually for a normal handful', async () => {
    watcher.startWatch(setupGame())
    files[GOLDBERG] = earned('ACH_A', 'ACH_B')

    expect(await watcher.pollOnce(deps)).toHaveLength(2)
    expect(notifications).toHaveLength(2)
    expect(notifications[0]!.title).toContain('Achievement unlocked')
  })

  // stopAchievementWatcher() runs immediately before closeDatabase(); an RA
  // sweep already awaiting the network would otherwise write afterwards and
  // make getSqlite() reopen the database during shutdown.
  it('drops an in-flight RA sweep once quit has started', async () => {
    const id = setupGame('ra')
    watcher.startWatch(id)
    raRows = [{ raGameId: '4321', apiName: 'ACH_A', unlockedAtMs: 1_700_000_000_000 }]

    let release = (): void => {}
    const blocked = new Promise<void>((r) => {
      release = r
    })
    const sweep = watcher.pollOnce({
      ...deps,
      raRecent: async () => {
        await blocked
        return raRows
      }
    })

    watcher.stopAchievementWatcher()
    release()

    expect(await sweep).toEqual([])
    expect(repo.summaryFor(id).unlocked).toBe(0)
  })
})
