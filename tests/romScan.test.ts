import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { mkdirSync, mkdtempSync, rmSync, utimesSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { createTestDb } from './helpers'
import { cleanRomName, dropCueTracks, matchKey, matchScan, type LibraryGame } from '../src/main/romScanCore'
import { portTitleKey, portsForTitle, isPortExe, NATIVE_PORTS } from '../src/shared/emulation/nativePorts'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({
  app: { getPath: () => '/nonexistent-documents' },
  dialog: { showOpenDialog: vi.fn() }
}))

import * as emulation from '../src/main/emulation'

describe('cleanRomName / matchKey', () => {
  it('strips release tags, discs and versions', () => {
    expect(cleanRomName('Legend of Zelda, The - Ocarina of Time (USA) (Rev 1) [!].z64')).toBe(
      'Legend of Zelda, The - Ocarina of Time'
    )
    expect(cleanRomName('Final_Fantasy_VII (Disc 1).cue')).toBe('Final Fantasy VII')
    expect(cleanRomName('Zelda TotK [0100F2C0115B6000][v0].nsp')).toBe('Zelda TotK')
  })

  it('matches the library title whatever the article does', () => {
    expect(matchKey('Legend of Zelda, The - Ocarina of Time')).toBe(
      matchKey('The Legend of Zelda: Ocarina of Time')
    )
    expect(matchKey('Ratchet & Clank')).toBe(matchKey('Ratchet and Clank'))
  })
})

describe('matchScan', () => {
  const game = (mediaId: number, title: string, platforms: LibraryGame['platforms'] = [], linked: string[] = []): LibraryGame => ({
    mediaId,
    title,
    platforms,
    linkedPaths: new Set(linked)
  })

  it('suggests the one game whose title and console fit', () => {
    const rows = matchScan(
      [{ path: 'D:\\PS2\\Okami (USA).iso', fileName: 'Okami (USA).iso', platforms: ['ps2'], gameCode: 'SLUS-21115' }],
      [game(1, 'Okami', ['ps2']), game(2, 'Okami', ['ps4'])]
    )
    expect(rows[0]).toMatchObject({ suggested: 1, candidates: [1], platform: 'ps2' })
  })

  it('lists ambiguous names without preselecting, and suggests a game once', () => {
    const rows = matchScan(
      [
        { path: 'D:\\a\\Doom.iso', fileName: 'Doom.iso', platforms: ['ps1'], gameCode: null },
        { path: 'D:\\b\\FF7 (Disc 1).cue', fileName: 'Final Fantasy VII (Disc 1).cue', platforms: ['ps1'], gameCode: null },
        { path: 'D:\\b\\FF7 (Disc 2).cue', fileName: 'Final Fantasy VII (Disc 2).cue', platforms: ['ps1'], gameCode: null }
      ],
      [game(1, 'Doom'), game(2, 'DOOM'), game(3, 'Final Fantasy VII')]
    )
    expect(rows.find((r) => r.file.fileName === 'Doom.iso')).toMatchObject({ suggested: null, candidates: [1, 2] })
    const discs = rows.filter((r) => r.file.fileName.startsWith('Final'))
    expect(discs.map((r) => r.suggested)).toEqual([3, null])
  })

  it('never re-suggests a file that is already linked', () => {
    const rows = matchScan(
      [{ path: 'D:\\GC\\Melee.iso', fileName: 'Super Smash Bros. Melee.iso', platforms: ['gc'], gameCode: 'GALE01' }],
      [game(1, 'Super Smash Bros. Melee', [], ['d:\\gc\\melee.iso'])]
    )
    expect(rows[0]).toMatchObject({ alreadyLinked: true, suggested: null })
  })

  it('drops a CUE sheet’s BIN tracks', () => {
    expect(
      dropCueTracks(['D:\\PS1\\Spyro\\Spyro.cue', 'D:\\PS1\\Spyro\\Spyro (Track 1).bin', 'D:\\GEN\\Sonic.bin'])
    ).toEqual(['D:\\PS1\\Spyro\\Spyro.cue', 'D:\\GEN\\Sonic.bin'])
    // Cartridge BINs beside an unrelated CUE stay.
    expect(
      dropCueTracks(['D:\\Sega\\Sonic CD.cue', 'D:\\Sega\\Sonic CD.bin', 'D:\\Sega\\Streets of Rage 2.bin'])
    ).toEqual(['D:\\Sega\\Sonic CD.cue', 'D:\\Sega\\Streets of Rage 2.bin'])
  })
})

describe('native ports', () => {
  it('match library titles regardless of punctuation and article', () => {
    expect(portsForTitle('Legend of Zelda, The: Ocarina of Time').map((p) => p.id)).toEqual(['ship-of-harkinian'])
    expect(portsForTitle("The Legend of Zelda: Majora's Mask").map((p) => p.id)).toEqual([
      '2-ship-2-harkinian',
      'zelda64-recomp'
    ])
    expect(portsForTitle('Halo')).toEqual([])
    expect(portTitleKey('Jak & Daxter')).toBe(portTitleKey('Jak and Daxter'))
  })

  it('recognise their own linked program', () => {
    const soh = NATIVE_PORTS.find((p) => p.id === 'ship-of-harkinian')!
    expect(isPortExe(soh, 'C:\\Ports\\SoH\\soh.exe')).toBe(true)
    expect(isPortExe(soh, 'C:\\Emu\\pcsx2-qt.exe')).toBe(false)
  })

  it('have unique frozen ids and https homepages', () => {
    expect(new Set(NATIVE_PORTS.map((p) => p.id)).size).toBe(NATIVE_PORTS.length)
    for (const p of NATIVE_PORTS) expect(p.homepage).toMatch(/^https:\/\//)
  })
})

describe('session screenshots and stats', () => {
  let dir: string
  beforeEach(() => {
    db = createTestDb()
    dir = mkdtempSync(join(tmpdir(), 'navihub-shots-'))
  })
  afterEach(() => rmSync(dir, { recursive: true, force: true }))

  it('finds images written during the session in the folder and per-game subfolders', async () => {
    const exe = join(dir, 'Dolphin.exe')
    writeFileSync(exe, 'x')
    const shots = join(dir, 'shots')
    mkdirSync(join(shots, 'GZ2E01'), { recursive: true })
    const { id } = emulation.registerEmulator(exe)
    emulation.updateEmulator(id, { screenshotDir: shots })
    const start = Date.now() - 60_000
    const end = Date.now() - 30_000
    const during = join(shots, 'GZ2E01', 'GZ2E01-1.png')
    const before = join(shots, 'old.png')
    writeFileSync(during, 'png')
    writeFileSync(before, 'png')
    utimesSync(during, new Date(start + 5_000), new Date(start + 5_000))
    utimesSync(before, new Date(start - 5_000), new Date(start - 5_000))
    expect(await emulation.findSessionShots(id, start, end)).toEqual([during])
  })

  it('groups emulated sessions by console and emulator', () => {
    const media = Number(db.prepare("INSERT INTO media_item (media_type, title) VALUES ('game','G')").run().lastInsertRowid)
    const ins = db.prepare(
      "INSERT INTO game_session (media_id, started_at, ended_at, duration, via, platform) VALUES (?, '2026-10-16', '2026-10-16', ?, ?, ?)"
    )
    ins.run(media, 3600, 'emu:pcsx2', 'ps2')
    ins.run(media, 1800, 'emu:pcsx2', 'ps2')
    ins.run(media, 600, 'native', null)
    ins.run(media, 900, null, null)
    expect(emulation.stats()).toEqual({
      byPlatform: [{ platform: 'ps2', seconds: 5400, sessions: 2, games: 1 }],
      byEmulator: [{ presetKey: 'pcsx2', seconds: 5400, sessions: 2 }]
    })
  })
})
