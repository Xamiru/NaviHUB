import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import {
  decideLaunchCheck,
  parseUnlockFileFull
} from '../src/main/achievementsCore'
import { emuStateOf, scanUnlocks } from '../src/main/emuScan'
import type { EmuFileIO } from '../src/main/emuScan'

// The 2026-10 corrections, driven by a real Death Stranding 2 report: names
// rank-paired across a near-tie, unlocks the emulator later re-locked
// (phantoms), progress counters, and the emulator dropping unlocks for
// achievements its list did not contain.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
const repo = await import('../src/main/repos/achievementRepo')

const ENV = { appData: '/roaming', publicDir: '/public', localAppData: '/local' }
const GSE = '/roaming/GSE Saves/3280350/achievements.json'

function fakeIO(files: Record<string, string>): EmuFileIO {
  return {
    exists: (p) => p in files,
    readFile: (p) => files[p] ?? '',
    mtimeMs: (p) => (p in files ? 5000 : null),
    listDirs: () => []
  }
}

// The user's GSE file, trimmed: two earned, one plain locked, two counters.
const DS2_FILE = JSON.stringify({
  trophy_001: { earned: true, earned_time: 1789585666 },
  trophy_021: { earned: true, earned_time: 1787324972 },
  trophy_036: { earned: false, earned_time: 0 },
  trophy_053: { earned: false, earned_time: 0, max_progress: 2000, progress: 820 },
  trophy_054: { earned: false, earned_time: 0, max_progress: 80, progress: 41 }
})

describe('parseUnlockFileFull', () => {
  it('reads earned, explicitly locked and progress entries from a GSE file', () => {
    const r = parseUnlockFileFull('goldberg-json', DS2_FILE)
    expect(r.complete).toBe(true)
    expect(r.unlocks.map((u) => u.apiName).sort()).toEqual(['trophy_001', 'trophy_021'])
    expect(r.locked.sort()).toEqual(['trophy_036', 'trophy_053', 'trophy_054'])
    expect(r.progress).toEqual([
      { apiName: 'trophy_053', current: 820, max: 2000 },
      { apiName: 'trophy_054', current: 41, max: 80 }
    ])
  })

  it('marks a torn read incomplete and concludes nothing from it', () => {
    const torn = DS2_FILE.slice(0, DS2_FILE.length / 2)
    expect(parseUnlockFileFull('goldberg-json', torn)).toEqual({
      unlocks: [],
      locked: [],
      progress: [],
      complete: false
    })
    expect(parseUnlockFileFull('goldberg-json', '').complete).toBe(false)
  })

  it('reads CODEX sections, and never takes container bookkeeping as locked', () => {
    const ini = [
      '[SteamAchievements]',
      '00000=ACH_A',
      'Count=0',
      '[ACH_A]',
      'Achieved=1',
      'UnlockTime=1690000000',
      '[ACH_B]',
      'Achieved=0',
      'CurProgress=3',
      'MaxProgress=10',
      '[ACH_C]',
      'Achieved='
    ].join('\n')
    const r = parseUnlockFileFull('ini', ini)
    expect(r.unlocks.map((u) => u.apiName)).toEqual(['ACH_A'])
    // ACH_C's flag was cut off mid-write: neither earned nor locked.
    expect(r.locked).toEqual(['ACH_B'])
    expect(r.progress).toEqual([{ apiName: 'ACH_B', current: 3, max: 10 }])
  })
})

describe('scanUnlocks merge', () => {
  it('lets an earned flag in one file beat a locked flag in another', () => {
    const io = fakeIO({
      [GSE]: JSON.stringify({ A: { earned: false }, B: { earned: false } }),
      '/roaming/Goldberg SteamEmu Saves/3280350/achievements.json': JSON.stringify({
        A: { earned: true, earned_time: 1700000000 }
      })
    })
    const scan = scanUnlocks('3280350', null, io, ENV)
    expect(scan.unlocks.map((u) => u.apiName)).toEqual(['A'])
    expect(scan.locked).toEqual(['B'])
    expect(scan.complete).toBe(true)
  })

  it('is incomplete when any file is torn', () => {
    const io = fakeIO({
      [GSE]: '{"A": {"earned": tr',
      '/roaming/Goldberg SteamEmu Saves/3280350/achievements.json': '{}'
    })
    expect(scanUnlocks('3280350', null, io, ENV).complete).toBe(false)
  })

  it('is incomplete when there are no files at all', () => {
    expect(scanUnlocks('3280350', null, fakeIO({}), ENV).complete).toBe(false)
  })
})

describe('decideLaunchCheck', () => {
  const base = { missing: 3, total: 3, settingsDir: '/g/steam_settings' }

  it('warns only for a Goldberg DLL whose list is missing or incomplete', () => {
    expect(decideLaunchCheck({ ...base, emulator: 'goldberg', list: 'missing' })).toEqual({
      problem: 'missing',
      missing: 3,
      total: 3,
      dir: '/g/steam_settings'
    })
    expect(decideLaunchCheck({ ...base, emulator: 'goldberg', list: 'incomplete', missing: 1 }))
      .toMatchObject({ problem: 'incomplete', missing: 1 })
  })

  it('stays quiet when there is nothing it could fix', () => {
    expect(decideLaunchCheck({ ...base, emulator: 'goldberg', list: 'complete', missing: 0 })).toBeNull()
    // Another crack keeps no list; no DLL means no folder to write to.
    expect(decideLaunchCheck({ ...base, emulator: 'other', list: 'missing' })).toBeNull()
    expect(decideLaunchCheck({ ...base, emulator: 'none', list: 'missing' })).toBeNull()
    expect(decideLaunchCheck({ ...base, emulator: 'goldberg', list: 'missing', total: 0 })).toBeNull()
  })
})

// ---------------- repo ----------------

function addGame(): number {
  const r = db
    .prepare(`INSERT INTO media_item (media_type, title, exe_path) VALUES ('game', 'DS2', 'C:\\Games\\DS2\\ds2.exe')`)
    .run()
  return Number(r.lastInsertRowid)
}

const ach = (apiName: string, over: Partial<repo.AchievementInput> = {}): repo.AchievementInput => ({
  apiName,
  name: `name ${apiName}`,
  description: `desc ${apiName}`,
  hidden: false,
  iconPath: `media/dl-${apiName}.jpg`,
  iconGrayPath: null,
  points: null,
  globalPct: null,
  ...over
})

const state = (over: Partial<repo.EmuState>): repo.EmuState => ({
  locked: [],
  progress: [],
  complete: true,
  earned: [],
  ...over
})

const unlocked = (mediaId: number): string[] =>
  repo
    .listInProviderOrder(mediaId)
    .filter((r) => r.unlockedAt)
    .map((r) => r.apiName)
    .sort()

beforeEach(() => {
  db = createTestDb()
})

describe('applyEmuScan', () => {
  const names = ['t1', 't2', 't3', 't4', 't5']
  const T = Date.UTC(2026, 8, 18, 10, 0, 0)
  // An entry the files still give with the time the app stored: the same unlock.
  const same = (apiName: string) => ({ apiName, unlockedAtMs: T })
  // An entry earned again on a fresh profile: a new, later time.
  const fresh = (apiName: string) => ({ apiName, unlockedAtMs: T + 30 * 86_400_000 })

  function seeded(): number {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '3280350', names.map((n) => ach(n)))
    // The app recorded t1..t4 from the emulator earlier, with the file's time.
    repo.insertUnlocks(id, ['t1', 't2', 't3', 't4'].map(same), 'emu', T)
    return id
  }

  it('withdraws emulator unlocks the files now mark not earned (the DS2 phantoms)', () => {
    const id = seeded()
    const res = repo.applyEmuScan(
      id,
      [same('t1'), same('t2')],
      state({ earned: [same('t1'), same('t2')], locked: ['t3', 't4', 't5'] }),
      Date.now()
    )
    expect(res.removed).toBe(2)
    expect(unlocked(id)).toEqual(['t1', 't2'])
  })

  it('never withdraws a manual unlock', () => {
    const id = seeded()
    const t5 = repo.listInProviderOrder(id).find((r) => r.apiName === 't5')!
    repo.setManual(t5.id, true)
    repo.applyEmuScan(id, [], state({ earned: ['t1', 't2', 't3'].map(same), locked: ['t4', 't5'] }), Date.now())
    expect(unlocked(id)).toEqual(['t1', 't2', 't3', 't5'])
  })

  it('withdraws nothing from a reset profile that marks everything not earned', () => {
    const id = seeded()
    const res = repo.applyEmuScan(
      id,
      [fresh('t5')],
      state({ earned: [fresh('t5')], locked: ['t1', 't2', 't3', 't4'] }),
      Date.now()
    )
    expect(res.removed).toBe(0)
    expect(unlocked(id)).toEqual(['t1', 't2', 't3', 't4', 't5'])
  })

  it('keeps old unlocks when a new profile re-earns some of them (new times confirm nothing)', () => {
    const id = addGame()
    const ten = Array.from({ length: 10 }, (_, i) => `a${i}`)
    repo.upsertSchema(id, 'steam', '3280350', ten.map((n) => ach(n)))
    repo.insertUnlocks(id, ten.map(same), 'emu', T)
    // Reinstall: 6 earned again (new times), the other 4 marked not earned.
    const res = repo.applyEmuScan(
      id,
      ten.slice(0, 6).map(fresh),
      state({ earned: ten.slice(0, 6).map(fresh), locked: ten.slice(6) }),
      Date.now()
    )
    expect(res.removed).toBe(0)
    expect(unlocked(id)).toHaveLength(10)
  })

  it('confirms nothing from entries that carry no time', () => {
    const id = seeded()
    const untimed = (apiName: string) => ({ apiName, unlockedAtMs: null })
    const res = repo.applyEmuScan(id, [], state({ earned: ['t1', 't2'].map(untimed), locked: ['t3'] }), Date.now())
    expect(res.removed).toBe(0)
  })

  it('withdraws nothing on an incomplete read', () => {
    const id = seeded()
    const res = repo.applyEmuScan(id, [], state({ complete: false, earned: ['t1', 't2', 't3'].map(same), locked: ['t4'] }), Date.now())
    expect(res.removed).toBe(0)
    expect(unlocked(id)).toHaveLength(4)
  })

  it('stores counters, shows them only on locked achievements, and never clears them', () => {
    const id = seeded()
    repo.applyEmuScan(
      id,
      [],
      state({ progress: [{ apiName: 't5', current: 820, max: 2000 }, { apiName: 't1', current: 1, max: 2 }] }),
      Date.now()
    )
    const rows = repo.listInProviderOrder(id)
    expect(rows.find((r) => r.apiName === 't5')!.progress).toEqual({ current: 820, max: 2000 })
    expect(rows.find((r) => r.apiName === 't1')!.progress).toBeNull()
    // An INI read mid-rewrite holds only some sections: what it lacks stays.
    repo.applyEmuScan(id, [], state({ progress: [] }), Date.now())
    expect(repo.listInProviderOrder(id).find((r) => r.apiName === 't5')!.progress).toEqual({ current: 820, max: 2000 })
    // A newer counter updates it.
    repo.applyEmuScan(id, [], state({ progress: [{ apiName: 't5', current: 900, max: 2000 }] }), Date.now())
    expect(repo.listInProviderOrder(id).find((r) => r.apiName === 't5')!.progress).toEqual({ current: 900, max: 2000 })
  })

  it('works from a real scan via emuStateOf', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '3280350', ['trophy_001', 'trophy_021', 'trophy_036', 'trophy_053', 'trophy_054'].map((n) => ach(n)))
    // Like the user's library: the two real unlocks (stored with the file's
    // own times) plus one phantom.
    repo.insertUnlocks(
      id,
      [
        { apiName: 'trophy_001', unlockedAtMs: 1789585666_000 },
        { apiName: 'trophy_021', unlockedAtMs: 1787324972_000 },
        { apiName: 'trophy_053', unlockedAtMs: Date.UTC(2026, 8, 29) }
      ],
      'emu',
      Date.now()
    )
    const scan = scanUnlocks('3280350', null, fakeIO({ [GSE]: DS2_FILE }), ENV)
    const res = repo.applyEmuScan(id, scan.unlocks, emuStateOf(scan), 5000)
    expect(res.removed).toBe(1)
    expect(unlocked(id)).toEqual(['trophy_001', 'trophy_021'])
  })

  it("keeps provider order coherent when a crack's partial list refetches without pruning", () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1', ['a', 'b', 'c', 'd', 'e'].map((n) => ach(n)))
    // The local list knows only d and b, in that order.
    repo.replaceSchemaWithUnlocks(id, 'steam', '1', [ach('d'), ach('b')], [], 'emu', Date.now(), {
      exactNames: false,
      prune: false
    })
    expect(repo.listInProviderOrder(id).map((r) => r.apiName)).toEqual(['d', 'b', 'a', 'c', 'e'])
  })
})

describe('name fixes', () => {
  it('swaps the display half and leaves unlocks on their ids', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1', [ach('trophy_011', { name: 'Pizza Chef' }), ach('trophy_043', { name: 'Keep Lou Safe' })])
    repo.insertUnlocks(id, [{ apiName: 'trophy_011', unlockedAtMs: null }], 'emu', Date.now())
    const [a, b] = repo.listInProviderOrder(id)
    repo.swapNames(a.id, b.id)
    const after = repo.listInProviderOrder(id)
    expect(after.map((r) => [r.apiName, r.name, r.description, r.nameStatus, !!r.unlockedAt])).toEqual([
      ['trophy_011', 'Keep Lou Safe', 'desc trophy_043', 'manual', true],
      ['trophy_043', 'Pizza Chef', 'desc trophy_011', 'manual', false]
    ])
  })

  it('refuses to swap across games', () => {
    const g1 = addGame()
    const g2 = addGame()
    repo.upsertSchema(g1, 'steam', '1', [ach('a')])
    repo.upsertSchema(g2, 'steam', '2', [ach('b')])
    const [a] = repo.listInProviderOrder(g1)
    const [b] = repo.listInProviderOrder(g2)
    expect(() => repo.swapNames(a.id, b.id)).toThrow(/same game/)
  })

  it('keeps a fixed name through a non-exact refetch, and yields to an exact one', () => {
    const id = addGame()
    // The user swaps it by hand; a later rank-paired refetch must not undo that.
    repo.upsertSchema(id, 'steam', '1', [ach('x', { name: 'Guess' }), ach('y', { name: 'Other' })], false)
    const [x, y] = repo.listInProviderOrder(id)
    repo.swapNames(x.id, y.id)
    repo.upsertSchema(id, 'steam', '1', [ach('x', { name: 'Guess' }), ach('y', { name: 'Other' })], false)
    expect(repo.listInProviderOrder(id)[0]).toMatchObject({ name: 'Other', nameStatus: 'manual' })
    repo.upsertSchema(id, 'steam', '1', [ach('x', { name: 'Exact' }), ach('y', { name: 'Exact y' })], true)
    expect(repo.listInProviderOrder(id)[0]).toMatchObject({ name: 'Exact', nameStatus: 'ok' })
  })
})

describe('setManualMany', () => {
  it('marks several earned with one date and never overwrites a tracked unlock', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1', [ach('a'), ach('b'), ach('c')])
    repo.insertUnlocks(id, [{ apiName: 'a', unlockedAtMs: Date.UTC(2026, 7, 21) }], 'emu', Date.now())
    const ids = repo.listInProviderOrder(id).map((r) => r.id)
    const changed = repo.setManualMany([...ids, ids[1]], Date.UTC(2026, 8, 1, 12))
    expect(changed).toBe(2)
    const rows = repo.listInProviderOrder(id)
    expect(rows.map((r) => [r.apiName, r.unlockSource, r.unlockedAt])).toEqual([
      ['a', 'emu', '2026-08-21 00:00:00'],
      ['b', 'manual', '2026-09-01 12:00:00'],
      ['c', 'manual', '2026-09-01 12:00:00']
    ])
  })
})

describe('second review regressions', () => {
  it('a re-fetch never gives a hand-swapped name to a second row', () => {
    const id = addGame()
    const fetchRows = (pairs: [string, string][]) => pairs.map(([apiName, name]) => ach(apiName, { name }))
    repo.upsertSchema(id, 'steam', '1', fetchRows([['x', 'A'], ['y', 'B'], ['z', 'C']]), false)
    const [x, y] = repo.listInProviderOrder(id)
    repo.swapNames(x.id, y.id) // x=B, y=A
    // The next rank pairing shifts: it now offers B to z.
    repo.upsertSchema(id, 'steam', '1', fetchRows([['x', 'A'], ['y', 'C'], ['z', 'B']]), false)
    const names = repo.listInProviderOrder(id).map((r) => r.name)
    expect(names[0]).toBe('B')
    expect(new Set(names).size).toBe(3)
  })

  it('clamps a future bulk date to now', () => {
    const id = addGame()
    repo.upsertSchema(id, 'steam', '1', [ach('a')])
    const [a] = repo.listInProviderOrder(id)
    repo.setManualMany([a.id], Date.UTC(2099, 0, 1))
    const at = Date.parse(repo.listInProviderOrder(id)[0].unlockedAt!.replace(' ', 'T') + 'Z')
    expect(at).toBeLessThanOrEqual(Date.now())
  })
})
