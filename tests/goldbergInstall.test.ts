import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import {
  decideLaunchCheck,
  looksLikeGoldbergDll,
  mergeGoldbergList
} from '../src/main/achievementsCore'

// One-click achievement saving writes into someone's game folder, so this file
// is organised by the rules at the top of goldbergInstall.ts (R1–R7), run
// against a real temporary folder, plus a forced failure at EVERY file step
// of install and Restore.

let db: Database.Database
let root: string

// Fault injection: every mutating fs call goes through `hook`, which records
// it and can make the Nth one throw (antivirus, a locked file, a full disk).
type Op = { op: string; path: string }
let ops: Op[] = []
let failAt = -1
function hook(op: string, path: string): void {
  ops.push({ op, path })
  if (ops.length - 1 === failAt) throw Object.assign(new Error(`EBUSY: ${op} failed`), { code: 'EBUSY' })
}
vi.mock('fs', async (importOriginal) => {
  const real = await importOriginal<typeof import('fs')>()
  const wrap =
    <A extends unknown[]>(op: string, fn: (...a: A) => unknown) =>
    (...a: A) => {
      hook(op, String(a[0]))
      return fn(...a)
    }
  const mocked = {
    renameSync: wrap('rename', real.renameSync as (...a: unknown[]) => unknown),
    copyFileSync: wrap('copy', real.copyFileSync as (...a: unknown[]) => unknown),
    writeFileSync: wrap('write', real.writeFileSync as (...a: unknown[]) => unknown),
    unlinkSync: wrap('unlink', real.unlinkSync as (...a: unknown[]) => unknown),
    rmdirSync: wrap('rmdir', real.rmdirSync as (...a: unknown[]) => unknown),
    mkdirSync: wrap('mkdir', real.mkdirSync as (...a: unknown[]) => unknown)
  }
  return { ...real, ...mocked, default: { ...real, ...mocked } }
})
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))

const repo = await import('../src/main/repos/achievementRepo')
const gb = await import('../src/main/goldbergInstall')

const GOLDBERG_DLL = Buffer.concat([Buffer.from('MZ\0\0'), Buffer.from('GSE Saves', 'latin1')])
const CRACK_DLL = Buffer.from('MZ\0\0 some other emulator')
// A release list with a stat-driven entry gbe_fork unlocks from its progress block.
const RELEASE_LIST = [
  {
    name: 'trophy_001',
    displayName: 'Lou?',
    hidden: '1',
    icon: 'achievement_images/a.jpg',
    icongray: 'achievement_images/a_gray.jpg'
  },
  {
    name: 'trophy_053',
    displayName: 'Heavy Lifter',
    progress: { min_val: 0, max_val: 2000, value: { operation: 'statval', operand1: 'cargo_kg' } }
  }
]

function snapshot(dir: string): Record<string, string> {
  const out: Record<string, string> = {}
  const walk = (d: string, prefix: string): void => {
    for (const e of readdirSync(d, { withFileTypes: true })) {
      const rel = prefix ? `${prefix}/${e.name}` : e.name
      if (e.isDirectory()) {
        out[`${rel}/`] = ''
        walk(join(d, e.name), rel)
      } else out[rel] = readFileSync(join(d, e.name)).toString('base64')
    }
  }
  walk(dir, '')
  return out
}

// A game folder, optionally with the release's own list, tracked with three ids.
function setup(opts: { dll?: Buffer | null; release?: unknown } = {}): { mediaId: number; game: string } {
  const game = join(root, 'DS2')
  mkdirSync(game, { recursive: true })
  const dll = opts.dll === undefined ? GOLDBERG_DLL : opts.dll
  if (dll) writeFileSync(join(game, 'steam_api64.dll'), dll)
  writeFileSync(join(game, 'ds2.exe'), 'exe')
  if (opts.release !== undefined) {
    mkdirSync(join(game, 'steam_settings'))
    writeFileSync(join(game, 'steam_settings', 'achievements.json'), JSON.stringify(opts.release))
  }
  const mediaId = Number(
    db
      .prepare(`INSERT INTO media_item (media_type, title, exe_path) VALUES ('game', 'DS2', ?)`)
      .run(join(game, 'ds2.exe')).lastInsertRowid
  )
  const row = (apiName: string, name: string) => ({
    apiName,
    name,
    description: null,
    hidden: false,
    iconPath: null,
    iconGrayPath: null,
    points: null,
    globalPct: null
  })
  repo.upsertSchema(mediaId, 'steam', '3280350', [
    row('trophy_001', 'Lou?'),
    row('trophy_011', 'Keep Lou Safe'),
    row('trophy_053', 'Heavy Lifter')
  ])
  ops = []
  return { mediaId, game }
}

const listOf = (game: string): { name: string }[] =>
  JSON.parse(readFileSync(join(game, 'steam_settings', 'achievements.json'), 'utf8'))

beforeEach(() => {
  db = createTestDb()
  root = mkdtempSync(join(tmpdir(), 'navihub-gb-'))
  ops = []
  failAt = -1
})
afterEach(() => {
  failAt = -1
  rmSync(root, { recursive: true, force: true })
})

describe('R1: never touches a DLL', () => {
  it('install and Restore leave every DLL byte-identical, and never name one in a write', () => {
    const { mediaId, game } = setup({ release: RELEASE_LIST })
    gb.installConfig(mediaId)
    gb.restore(mediaId)
    expect(readFileSync(join(game, 'steam_api64.dll'))).toEqual(GOLDBERG_DLL)
    expect(ops.filter((o) => /\.dll/i.test(o.path))).toEqual([])
  })
})

describe('R2: writes only three files in steam_settings, only for Goldberg', () => {
  it('creates exactly the list, its backup and the manifest', () => {
    const { mediaId, game } = setup({ release: RELEASE_LIST })
    const before = snapshot(game)
    gb.installConfig(mediaId)
    const added = Object.keys(snapshot(game)).filter((k) => !(k in before))
    expect(added.sort()).toEqual([
      'steam_settings/.navihub-goldberg.json',
      'steam_settings/achievements.json.navihub-backup'
    ])
    expect(ops.every((o) => o.path.startsWith(join(game, 'steam_settings')))).toBe(true)
  })

  it('writes nothing at all when the DLL is not Goldberg, or when there is none', () => {
    for (const dll of [CRACK_DLL, null]) {
      db = createTestDb()
      rmSync(join(root, 'DS2'), { recursive: true, force: true })
      const { mediaId, game } = setup({ dll })
      const before = snapshot(game)
      expect(() => gb.installConfig(mediaId)).toThrow()
      expect(snapshot(game)).toEqual(before)
      expect(ops).toEqual([])
    }
  })

  it('writes nothing when no achievement set has been fetched', () => {
    const { mediaId, game } = setup()
    db.prepare('DELETE FROM achievement').run()
    const before = snapshot(game)
    expect(() => gb.installConfig(mediaId)).toThrow(/No achievements/)
    expect(snapshot(game)).toEqual(before)
  })
})

describe('R3 + R4: the game always has a list, and the original is never lost', () => {
  // Every mutating step of a first install over a release list, failed in turn.
  it('survives a failure at every install step, then a retry and a Restore finish cleanly', () => {
    const probe = setup({ release: RELEASE_LIST })
    gb.installConfig(probe.mediaId)
    const steps = ops.length
    expect(steps).toBeGreaterThan(3)

    for (let k = 0; k < steps; k++) {
      db = createTestDb()
      rmSync(join(root, 'DS2'), { recursive: true, force: true })
      const { mediaId, game } = setup({ release: RELEASE_LIST })
      const initial = snapshot(game)
      const original = readFileSync(join(game, 'steam_settings', 'achievements.json'), 'utf8')
      failAt = k
      expect(() => gb.installConfig(mediaId), `step ${k}`).toThrow(/EBUSY/)
      failAt = -1
      // R3: a list is in place, and it is the original or a complete new one.
      const now = readFileSync(join(game, 'steam_settings', 'achievements.json'), 'utf8')
      expect(now === original || listOf(game).length === 3, `step ${k}`).toBe(true)
      // R4: the original is still there or safely backed up.
      const backup = join(game, 'steam_settings', 'achievements.json.navihub-backup')
      expect(now === original || readFileSync(backup, 'utf8') === original, `step ${k}`).toBe(true)
      // No stray temp files.
      expect(Object.keys(snapshot(game)).some((p) => p.endsWith('.navihub-tmp')), `step ${k}`).toBe(false)

      expect(gb.installConfig(mediaId).list).toBe('complete')
      gb.restore(mediaId)
      expect(snapshot(game), `step ${k}`).toEqual(initial)
    }
  })

  it('survives a failure at every Restore step, and a second Restore finishes', () => {
    const probe = setup({ release: RELEASE_LIST })
    gb.installConfig(probe.mediaId)
    ops = []
    gb.restore(probe.mediaId)
    const steps = ops.length

    for (let k = 0; k < steps; k++) {
      db = createTestDb()
      rmSync(join(root, 'DS2'), { recursive: true, force: true })
      const { mediaId, game } = setup({ release: RELEASE_LIST })
      const initial = snapshot(game)
      const original = readFileSync(join(game, 'steam_settings', 'achievements.json'), 'utf8')
      gb.installConfig(mediaId)
      ops = []
      failAt = k
      expect(() => gb.restore(mediaId), `step ${k}`).toThrow(/EBUSY/)
      failAt = -1
      const list = join(game, 'steam_settings', 'achievements.json')
      expect(existsSync(list), `step ${k}`).toBe(true)
      const backup = list + '.navihub-backup'
      const now = readFileSync(list, 'utf8')
      expect(now === original || readFileSync(backup, 'utf8') === original, `step ${k}`).toBe(true)

      gb.restore(mediaId)
      expect(snapshot(game), `step ${k}`).toEqual(initial)
    }
  })

  it("backs up a game update's new list instead of overwriting it, and Restore brings that back", () => {
    const { mediaId, game } = setup({ release: RELEASE_LIST })
    gb.installConfig(mediaId)
    // A game update replaces NaviHUB's list with a newer list of its own.
    const updated = [...RELEASE_LIST, { name: 'trophy_dlc', displayName: 'DLC' }]
    writeFileSync(join(game, 'steam_settings', 'achievements.json'), JSON.stringify(updated))
    gb.installConfig(mediaId)
    const settings = join(game, 'steam_settings')
    expect(JSON.parse(readFileSync(join(settings, 'achievements.json.navihub-backup'), 'utf8'))).toEqual(updated)
    expect(listOf(game).map((e) => e.name)).toContain('trophy_dlc')
    gb.restore(mediaId)
    expect(JSON.parse(readFileSync(join(settings, 'achievements.json'), 'utf8'))).toEqual(updated)
  })

  it("backs up a list copied in by hand into a folder that had none", () => {
    const { mediaId, game } = setup()
    gb.installConfig(mediaId)
    writeFileSync(join(game, 'steam_settings', 'achievements.json'), JSON.stringify(RELEASE_LIST))
    gb.installConfig(mediaId)
    gb.restore(mediaId)
    expect(listOf(game)).toEqual(RELEASE_LIST)
  })

  it('a rewrite after fixing a name keeps the ORIGINAL backup', () => {
    const { mediaId, game } = setup({ release: RELEASE_LIST })
    gb.installConfig(mediaId)
    const [a, b] = repo.listInProviderOrder(mediaId)
    repo.swapNames(a.id, b.id)
    gb.installConfig(mediaId)
    expect(JSON.parse(readFileSync(join(game, 'steam_settings', 'achievements.json.navihub-backup'), 'utf8'))).toEqual(RELEASE_LIST)
  })
})

describe('R5: the release entries are kept exactly', () => {
  it('keeps progress blocks and icons, adds what is missing, updates only hand-fixed names', () => {
    const { mediaId, game } = setup({ release: RELEASE_LIST })
    const [a, b] = repo.listInProviderOrder(mediaId) // trophy_001, trophy_011
    repo.swapNames(a.id, b.id) // trophy_001 is now "Keep Lou Safe", by hand
    gb.installConfig(mediaId)
    const list = listOf(game) as Record<string, unknown>[]
    // The swap moved the hidden flag too (trophy_011 was not hidden).
    expect(list[0]).toEqual({ ...RELEASE_LIST[0], displayName: 'Keep Lou Safe', description: '', hidden: '0' })
    expect(list[1]).toEqual(RELEASE_LIST[1])
    expect(list[2]).toMatchObject({ name: 'trophy_011', displayName: 'Lou?' })
  })
})

describe('R6: the written list is complete', () => {
  it('silences the launch check, reading the same folder it writes', () => {
    const { mediaId, game } = setup()
    // A stale list one folder ABOVE the game must not be what is checked.
    mkdirSync(join(root, 'steam_settings'))
    writeFileSync(join(root, 'steam_settings', 'achievements.json'), '[{"name":"trophy_001"}]')
    expect(decideLaunchCheck(gb.goldbergState(mediaId))).toMatchObject({ problem: 'missing' })
    gb.installConfig(mediaId)
    expect(decideLaunchCheck(gb.goldbergState(mediaId))).toBeNull()
    expect(gb.goldbergState(mediaId).settingsDir).toBe(join(game, 'steam_settings'))
  })
})

describe('R7: Restore reverses exactly what setup did', () => {
  it('with an original list: puts it back byte for byte', () => {
    const { mediaId, game } = setup({ release: RELEASE_LIST })
    const before = snapshot(game)
    gb.installConfig(mediaId)
    expect(gb.goldbergState(mediaId).canRestore).toBe(true)
    expect(gb.restore(mediaId).canRestore).toBe(false)
    expect(snapshot(game)).toEqual(before)
  })

  it('with no original: removes the list, the manifest and the folder it created', () => {
    const { mediaId, game } = setup()
    const before = snapshot(game)
    gb.installConfig(mediaId)
    gb.restore(mediaId)
    expect(snapshot(game)).toEqual(before)
  })

  it('says so, rather than reporting success, when the backup was deleted outside the app', () => {
    const { mediaId, game } = setup({ release: RELEASE_LIST })
    gb.installConfig(mediaId)
    rmSync(join(game, 'steam_settings', 'achievements.json.navihub-backup'))
    expect(() => gb.restore(mediaId)).toThrow(/deleted outside NaviHUB/)
    // NaviHUB's complete list stays, and Restore is no longer offered.
    expect(listOf(game)).toHaveLength(3)
    expect(gb.goldbergState(mediaId).canRestore).toBe(false)
  })

  it('refuses a folder NaviHUB never wrote to', () => {
    const { mediaId } = setup({ release: RELEASE_LIST })
    expect(() => gb.restore(mediaId)).toThrow(/has not changed/)
  })
})

describe('mergeGoldbergList', () => {
  const t = (apiName: string, over: Partial<Parameters<typeof mergeGoldbergList>[1][number]> = {}) => ({
    apiName,
    name: `name ${apiName}`,
    description: null,
    hidden: false,
    manual: false,
    ...over
  })

  it('keeps unknown fields, odd entries and order, and never removes', () => {
    const release = [{ name: 'a', custom: { x: 1 } }, 'junk', { noName: true }, { name: 'gone' }]
    expect(mergeGoldbergList(release, [t('a')])).toEqual(release)
  })

  it('appends tracked ids the release lacks, once each', () => {
    const out = mergeGoldbergList([{ name: 'a' }], [t('a'), t('b'), t('b')])
    expect(out).toEqual([
      { name: 'a' },
      { name: 'b', displayName: 'name b', description: '', hidden: '0', icon: '', icongray: '' }
    ])
  })

  it('updates only the display text and hidden flag of hand-fixed names, keeping other languages', () => {
    const release = [{ name: 'a', displayName: { english: 'Old', german: 'Alt' }, icon: 'i.jpg', hidden: 0 }]
    expect(mergeGoldbergList(release, [t('a', { manual: true, name: 'New', description: 'D', hidden: true })])).toEqual([
      { name: 'a', displayName: { english: 'New', german: 'Alt' }, description: 'D', icon: 'i.jpg', hidden: 1 }
    ])
  })

  it('treats a release that is not an array as empty', () => {
    expect(mergeGoldbergList({ not: 'a list' }, [t('a')])).toHaveLength(1)
    expect(mergeGoldbergList(null, [])).toEqual([])
  })
})

describe('looksLikeGoldbergDll', () => {
  it('recognises gbe_fork and original Goldberg, in either string encoding', () => {
    expect(looksLikeGoldbergDll(GOLDBERG_DLL)).toBe(true)
    expect(looksLikeGoldbergDll(Buffer.from('Goldberg SteamEmu Saves', 'utf16le'))).toBe(true)
    expect(looksLikeGoldbergDll(Buffer.from('MZ ... configs.main.ini ...'))).toBe(true)
    expect(looksLikeGoldbergDll(CRACK_DLL)).toBe(false)
  })
})
