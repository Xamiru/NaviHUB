import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { mkdtempSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { createTestDb } from './helpers'

// The game-folder scan job end to end against real files: a console page's
// scan keeps only that console's files.

let db: Database.Database
let dir: string
const showOpenDialog = vi.fn()
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({
  app: { getPath: () => '/nonexistent-documents' },
  dialog: { showOpenDialog: (...a: unknown[]) => showOpenDialog(...a) }
}))

import * as romScan from '../src/main/romScan'

async function finished(): Promise<NonNullable<ReturnType<typeof romScan.status>>> {
  for (let i = 0; i < 200; i++) {
    const s = romScan.status()
    if (s && s.state !== 'scanning') return s
    await new Promise((r) => setTimeout(r, 10))
  }
  throw new Error('scan did not finish')
}

beforeEach(() => {
  db = createTestDb()
  dir = mkdtempSync(join(tmpdir(), 'navihub-romscan-'))
  for (const title of ['Metroid Fusion', 'Super Mario 64']) {
    db.prepare("INSERT INTO media_item (media_type, title) VALUES ('game', ?)").run(title)
  }
  writeFileSync(join(dir, 'Metroid Fusion (USA).gba'), 'x')
  writeFileSync(join(dir, 'Super Mario 64 (USA).z64'), 'x')
  showOpenDialog.mockResolvedValue({ canceled: false, filePaths: [dir] })
})

afterEach(() => rmSync(dir, { recursive: true, force: true }))

describe('romScan.start', () => {
  it('scans for every console without a filter', async () => {
    await romScan.start()
    const s = await finished()
    expect(s.platform).toBeNull()
    expect(s.results.map((r) => r.platform).sort()).toEqual(['gba', 'n64'])
  })

  it('keeps only the chosen console when started from its page', async () => {
    await romScan.start('n64')
    const s = await finished()
    expect(s.platform).toBe('n64')
    expect(s.results.map((r) => r.fileName)).toEqual(['Super Mario 64 (USA).z64'])
    // The other console's file is not even counted.
    expect(s.found).toBe(1)
  })

  it('rejects an unknown console before opening the picker', async () => {
    showOpenDialog.mockClear()
    await expect(romScan.start('amiga')).rejects.toThrow(/Unknown console/)
    expect(showOpenDialog).not.toHaveBeenCalled()
  })
})

describe('a console page scan of files several consoles share', () => {
  let untagged: number
  let pspGame: number
  beforeEach(() => {
    const game = db.prepare("INSERT INTO media_item (media_type, title) VALUES ('game', ?)")
    untagged = Number(game.run('Persona 3').lastInsertRowid)
    pspGame = Number(game.run('Patapon').lastInsertRowid)
    const tag = Number(db.prepare("INSERT INTO tag (name, category) VALUES ('PSP', 'platform')").run().lastInsertRowid)
    db.prepare('INSERT INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(pspGame, tag)
    // Unreadable headers: only the extension and the library can place them.
    writeFileSync(join(dir, 'Persona 3.iso'), 'x')
    writeFileSync(join(dir, 'Patapon.iso'), 'x')
  })

  it('leaves out a file whose library game belongs to another console', async () => {
    await romScan.start('ps2')
    const s = await finished()
    expect(s.results.map((r) => [r.fileName, r.platform, r.suggestedMediaId])).toEqual([
      ['Persona 3.iso', 'ps2', untagged]
    ])
  })

  it('links a file only to a game its row offered', async () => {
    await romScan.start('ps2')
    const s = await finished()
    const res = await romScan.accept([{ resultId: s.results[0].id, mediaId: pspGame }])
    expect(res.linked).toBe(0)
    expect(res.failed[0]).toMatch(/not one of its matches/)
    expect(db.prepare('SELECT COUNT(*) AS n FROM game_rom').get()).toEqual({ n: 0 })
  })
})

