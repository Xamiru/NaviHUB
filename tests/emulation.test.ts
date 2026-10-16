import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { createTestDb } from './helpers'

// Emulator registration, game-file linking and the launch spec against the
// real schema and real files in a temp folder. Pickers are not exercised —
// they only hand a path to the functions tested here.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({
  app: { getPath: () => '/nonexistent-documents' },
  dialog: { showOpenDialog: vi.fn() }
}))

import * as emulation from '../src/main/emulation'
import * as achievementRepo from '../src/main/repos/achievementRepo'

let dir: string

function addGame(title = 'Game', exePath: string | null = null): number {
  return Number(
    db
      .prepare("INSERT INTO media_item (media_type, title, exe_path) VALUES ('game', ?, ?)")
      .run(title, exePath).lastInsertRowid
  )
}

function file(name: string, content: Buffer | string = 'x'): string {
  const p = join(dir, name)
  writeFileSync(p, content)
  return p
}

function gcImage(id: string): Buffer {
  const h = Buffer.alloc(0x400)
  h.write(id, 0, 'latin1')
  h.writeUInt32BE(0xc2339f3d, 0x1c)
  return h
}

beforeEach(() => {
  db = createTestDb()
  dir = mkdtempSync(join(tmpdir(), 'navihub-emu-'))
})

afterEach(() => {
  rmSync(dir, { recursive: true, force: true })
})

describe('registerEmulator', () => {
  it('detects the preset and becomes the default for its platforms', () => {
    const exe = file('Dolphin.exe')
    const info = emulation.registerEmulator(exe)
    expect(info).toMatchObject({ presetKey: 'dolphin', name: 'Dolphin', exeExists: true, verified: true })
    expect(info.platforms).toEqual(['gc', 'wii'])
    expect(info.defaultFor.sort()).toEqual(['gc', 'wii'])

    // A second emulator for the same platform leaves the default alone.
    const other = emulation.registerEmulator(file('RetroArch.exe'))
    emulation.updateEmulator(other.id, { platforms: ['gc'] })
    expect(emulation.listEmulators().find((e) => e.id === info.id)?.defaultFor.sort()).toEqual(['gc', 'wii'])
  })

  it('reuses an emulator already registered at the same path', () => {
    const exe = file('pcsx2-qt.exe')
    const a = emulation.registerEmulator(exe)
    const b = emulation.registerEmulator(exe)
    expect(b.id).toBe(a.id)
    expect(emulation.listEmulators()).toHaveLength(1)
  })

  it('validates edited arguments and resets to the preset on null', () => {
    const { id } = emulation.registerEmulator(file('pcsx2-qt.exe'))
    expect(emulation.updateEmulator(id, { args: ['-nogui', '{rom}'] })).toMatchObject({
      args: ['-nogui', '{rom}'],
      argsCustom: true
    })
    expect(() => emulation.updateEmulator(id, { args: ['{rom}', '{rom}'] })).toThrow(/once/)
    expect(emulation.updateEmulator(id, { args: null })).toMatchObject({ argsCustom: false })
  })
})

describe('linkRom', () => {
  it('reads the disc id, picks the platform and makes the first file preferred', async () => {
    const media = addGame('Twilight Princess')
    const rom = await emulation.linkRom(media, file('tp.iso', gcImage('GZ2E01')))
    expect(rom).toMatchObject({
      platform: 'gc',
      gameCode: 'GZ2E01',
      gameCodeSource: 'file',
      preferred: true,
      exists: true,
      effectiveEmulatorId: null
    })
  })

  it('uses the game’s platform tag when the extension is shared and the header says nothing', async () => {
    const media = addGame('Spyro')
    const tag = Number(db.prepare("INSERT INTO tag (name, category) VALUES ('PlayStation', 'platform')").run().lastInsertRowid)
    db.prepare('INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(media, tag)
    const rom = await emulation.linkRom(media, file('spyro.bin', Buffer.alloc(64)))
    expect(rom.platform).toBe('ps1')
    expect(rom.gameCode).toBeNull()
  })

  it('keeps a native executable as the way to play', async () => {
    const media = addGame('Ocarina of Time', file('soh.exe'))
    const rom = await emulation.linkRom(media, file('oot.z64'))
    expect(rom.preferred).toBe(false)
    expect(emulation.playOptions(media)).toMatchObject({ exePreset: null })
  })

  it('registers an emulator that was linked as the executable', async () => {
    const pcsx2 = file('pcsx2-qt.exe')
    const media = addGame('Shadow of the Colossus', pcsx2)
    const rom = await emulation.linkRom(media, file('sotc.chd'))
    expect(rom.platform).toBe('ps2')
    expect(rom.preferred).toBe(true)
    expect(rom.effectiveEmulatorName).toBe('PCSX2')
    expect(emulation.playOptions(media).exePreset).toBe('pcsx2')
  })

  it('refuses unknown files and option-like paths', async () => {
    const media = addGame()
    await expect(emulation.linkRom(media, file('notes.txt'))).rejects.toThrow(/recognise/)
    await expect(emulation.linkRom(media, '-x.iso')).rejects.toThrow(/option-like/)
  })

  it('validates hand-typed game codes', async () => {
    const media = addGame()
    const rom = await emulation.linkRom(media, file('game.nsp'))
    expect(emulation.updateRom(rom.id, { gameCode: '0100f2c0115b6000' })).toMatchObject({
      gameCode: '0100F2C0115B6000',
      gameCodeSource: 'manual'
    })
    expect(() => emulation.updateRom(rom.id, { gameCode: '../../etc' })).toThrow(/game code/)
  })
})

describe('review regressions', () => {
  it('relinking keeps the console the user chose', async () => {
    const media = addGame()
    const iso = file('game.iso', Buffer.alloc(64))
    const rom = await emulation.linkRom(media, iso)
    emulation.updateRom(rom.id, { platform: 'ps1' })
    const again = await emulation.linkRom(media, iso)
    expect(again.id).toBe(rom.id)
    expect(again.platform).toBe('ps1')
  })

  it('sets the default when the linked emulator was registered without one', async () => {
    const pcsx2 = file('pcsx2-qt.exe')
    const emu = emulation.registerEmulator(pcsx2)
    emulation.setDefaultEmulator('ps2', null)
    const media = addGame('SotC', pcsx2)
    const rom = await emulation.linkRom(media, file('sotc.chd'))
    expect(rom.effectiveEmulatorId).toBe(emu.id)
  })

  it('never takes a path from the renderer', () => {
    const { id } = emulation.registerEmulator(file('retroarch.exe'))
    const after = emulation.updateEmulatorFromRenderer(id, {
      corePath: 'C:\\evil.dll',
      dataDir: 'C:\\Windows',
      screenshotDir: 'C:\\x',
      name: 'RA'
    })
    expect(after).toMatchObject({ name: 'RA', corePath: null, dataDirOverride: null, screenshotDirOverride: null })
  })
})

describe('launchSpec', () => {
  it('builds the emulator command line for the preferred file and records the via', async () => {
    const exe = file('pcsx2-qt.exe')
    emulation.registerEmulator(exe)
    const media = addGame('SotC')
    const iso = file('sotc.iso', Buffer.alloc(64))
    const rom = await emulation.linkRom(media, iso)
    emulation.updateRom(rom.id, { platform: 'ps2' })
    const spec = emulation.launchSpec(media, null)
    expect(spec).toMatchObject({
      program: exe,
      args: ['-batch', '-fullscreen', '--', iso],
      via: 'emu:pcsx2',
      platform: 'ps2',
      native: false
    })
  })

  it('says what is missing instead of launching', async () => {
    const media = addGame('Melee')
    const rom = await emulation.linkRom(media, file('melee.iso', gcImage('GALE01')))
    expect(() => emulation.launchSpec(media, null)).toThrow(/No emulator plays GameCube/)
    const dolphin = emulation.registerEmulator(file('Dolphin.exe'))
    rmSync(dolphin.exePath)
    expect(() => emulation.launchSpec(media, { kind: 'rom', romId: rom.id })).toThrow(/locate it/)
    expect(() => emulation.launchSpec(media, { kind: 'native' })).toThrow(/executable/)
  })

  it('a file pinned to an emulator ignores the platform default', async () => {
    const dolphin = emulation.registerEmulator(file('Dolphin.exe'))
    const ra = emulation.registerEmulator(file('retroarch.exe'))
    emulation.updateEmulator(ra.id, { corePath: file('dolphin_libretro.dll') })
    const media = addGame()
    const rom = await emulation.linkRom(media, file('g.rvz', gcImage('GZLE01')))
    expect(emulation.launchSpec(media, null).program).toBe(dolphin.exePath)
    emulation.updateRom(rom.id, { emulatorId: ra.id })
    expect(emulation.launchSpec(media, null)).toMatchObject({ program: ra.exePath, via: 'emu:retroarch' })
  })
})

describe('installed games', () => {
  it('lists games that only have a game file linked, with its platform', async () => {
    const media = addGame('Melee')
    await emulation.linkRom(media, file('melee.iso', gcImage('GALE01')))
    const installed = achievementRepo.installedGames()
    expect(installed).toHaveLength(1)
    expect(installed[0]).toMatchObject({ mediaId: media, exePath: null, platform: 'gc' })
    expect(achievementRepo.isEligible(media)).toBe(true)
  })
})
