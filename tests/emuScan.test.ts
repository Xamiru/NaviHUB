import { describe, expect, it } from 'vitest'
import {
  exeDirOf,
  existingUnlockFiles,
  findLocalSteamSchema,
  scanUnlocks,
  steamSettingsDir
} from '../src/main/emuScan'
import type { EmuFileIO } from '../src/main/emuScan'

// The IO half of emulator scanning, driven entirely through an injected
// EmuFileIO — no Windows, no emulator, no files on disk.

const ENV = { appData: '/roaming', publicDir: '/public', localAppData: '/local' }

function fakeIO(files: Record<string, string>, dirs: Record<string, string[]> = {}): EmuFileIO {
  let clock = 1000
  const mtimes = new Map<string, number>()
  for (const path of Object.keys(files)) mtimes.set(path, (clock += 1000))
  return {
    exists: (p) => p in files,
    readFile: (p) => files[p] ?? '',
    mtimeMs: (p) => mtimes.get(p) ?? null,
    listDirs: (p) => dirs[p] ?? []
  }
}

const goldberg = '/roaming/Goldberg SteamEmu Saves/440/achievements.json'
const codex = '/public/Documents/Steam/CODEX/440/achievements.ini'

describe('existingUnlockFiles', () => {
  it('keeps only the candidates that exist', () => {
    const io = fakeIO({ [goldberg]: '{}' })
    const found = existingUnlockFiles('440', null, io, ENV)
    expect(found.map((f) => f.path)).toEqual([goldberg])
  })

  it('finds nothing when no emulator has written anything', () => {
    expect(existingUnlockFiles('440', null, fakeIO({}), ENV)).toEqual([])
  })

  it('expands the profile glob into the directories that are really there', () => {
    const ali = '/game/Profile/Player1/Stats/achievements.ini'
    const io = fakeIO({ [ali]: '[ACH_A]\nAchieved=1' }, { '/game/Profile': ['Player1', 'Player2'] })
    const found = existingUnlockFiles('440', '/game', io, ENV)
    expect(found.map((f) => f.path)).toEqual([ali])
  })

  it('drops the glob candidate entirely when the profile folder is empty', () => {
    const io = fakeIO({}, { '/game/Profile': [] })
    expect(existingUnlockFiles('440', '/game', io, ENV)).toEqual([])
  })
})

describe('scanUnlocks', () => {
  it('reads a Goldberg file and reports which emulator it came from', () => {
    const io = fakeIO({
      [goldberg]: JSON.stringify({ ACH_A: { earned: true, earned_time: 1600000000 } })
    })
    const scan = scanUnlocks('440', null, io, ENV)
    expect(scan.files).toBe(1)
    expect(scan.emus).toEqual(['Goldberg'])
    expect(scan.unlocks).toEqual([{ apiName: 'ACH_A', unlockedAtMs: 1600000000000 }])
  })

  it('merges two emulators that both wrote for the same game', () => {
    const io = fakeIO({
      [goldberg]: JSON.stringify({ ACH_A: { earned: true, earned_time: 1600000000 } }),
      [codex]: '[ACH_B]\nAchieved=1\nUnlockTime=1700000000'
    })
    const scan = scanUnlocks('440', null, io, ENV)
    expect(scan.files).toBe(2)
    expect(scan.emus.sort()).toEqual(['CODEX', 'Goldberg'])
    expect(scan.unlocks.map((u) => u.apiName).sort()).toEqual(['ACH_A', 'ACH_B'])
  })

  it('keeps the earliest timestamp when both files claim the same achievement', () => {
    const io = fakeIO({
      [goldberg]: JSON.stringify({ ACH_A: { earned: true, earned_time: 1700000000 } }),
      [codex]: '[ACH_A]\nAchieved=1\nUnlockTime=1600000000'
    })
    expect(scanUnlocks('440', null, io, ENV).unlocks).toEqual([
      { apiName: 'ACH_A', unlockedAtMs: 1600000000000 }
    ])
  })

  it('prefers a real timestamp over one file that recorded none', () => {
    const io = fakeIO({
      [goldberg]: JSON.stringify({ ACH_A: { earned: true, earned_time: 0 } }),
      [codex]: '[ACH_A]\nAchieved=1\nUnlockTime=1600000000'
    })
    expect(scanUnlocks('440', null, io, ENV).unlocks).toEqual([
      { apiName: 'ACH_A', unlockedAtMs: 1600000000000 }
    ])
  })

  it('reports the newest mtime, which is what the watcher diffs against', () => {
    const io = fakeIO({ [goldberg]: '{}', [codex]: '' })
    const scan = scanUnlocks('440', null, io, ENV)
    expect(scan.newestMtimeMs).toBe(3000)
  })

  it('survives a file that is mid-write, reporting no unlocks rather than throwing', () => {
    const io = fakeIO({ [goldberg]: '{"ACH_A": {"earned": tr' })
    const scan = scanUnlocks('440', null, io, ENV)
    expect(scan.files).toBe(1)
    expect(scan.unlocks).toEqual([])
  })

  it('reports nothing at all when no file exists', () => {
    expect(scanUnlocks('440', null, fakeIO({}), ENV)).toEqual({
      emus: [],
      files: 0,
      unlocks: [],
      newestMtimeMs: null
    })
  })
})

describe('path helpers', () => {
  it('takes the folder an executable sits in, under either path flavor', () => {
    expect(exeDirOf('/games/thing/game.exe')).toBe('/games/thing')
    // The stored paths are Windows paths and this test runs on Linux — the
    // posix dirname of a backslash path is ".", which used to be a silent miss.
    expect(exeDirOf('C:\\Games\\Thing\\game.exe')).toBe('C:\\Games\\Thing')
    expect(exeDirOf(null)).toBeNull()
    expect(exeDirOf('   ')).toBeNull()
  })

  it('finds a crack’s steam_settings schema beside the exe or up to two folders above', () => {
    const files: Record<string, string> = {
      'C:\\G\\steam_settings\\achievements.json': '[{"name":"A"}]'
    }
    const io = { ...fakeIO({}), exists: (p: string) => p in files, readFile: (p: string) => files[p] ?? '' }
    expect(findLocalSteamSchema('C:\\G', io)?.dir).toBe('C:\\G\\steam_settings')
    expect(findLocalSteamSchema('C:\\G\\bin\\x64', io)?.dir).toBe('C:\\G\\steam_settings')
    expect(findLocalSteamSchema('C:\\G\\a\\b\\c', io)).toBeNull() // three levels: too far
    expect(findLocalSteamSchema(null, io)).toBeNull()
  })

  it('ignores an empty steam_settings/achievements.json', () => {
    const io = { ...fakeIO({}), exists: () => true, readFile: () => '   ' }
    expect(findLocalSteamSchema('/g', io)).toBeNull()
  })

  it('names the folder Goldberg reads its config from', () => {
    expect(steamSettingsDir('/games/thing')).toBe('/games/thing/steam_settings')
  })
})
