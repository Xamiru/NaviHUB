import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import AdmZip from 'adm-zip'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { createTestDb } from './helpers'
import { contentRoot, filesUnder, planInstall, safeFolderName, type TreeEntry } from '../src/main/modLayoutCore'
import { checkListing, extractZip, isStrictlyInside, listTree, parseSevenZipListing, unsafeEntryReason } from '../src/main/safeExtract'

// The mod install path end to end, with GameBanana and the network replaced
// by fixtures and every file in a temp folder: plan, extract, confirm, the
// ledger, disable/enable and an uninstall that leaves changed files alone.

let db: Database.Database
let root: string
const gb = vi.hoisted(() => ({ detail: vi.fn(), zip: Buffer.alloc(0) }))

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({
  app: { getPath: (k: string) => (k === 'userData' ? join(root, 'userData') : '/nonexistent') },
  dialog: { showOpenDialog: vi.fn() }
}))
vi.mock('../src/main/gamebanana', () => ({
  GB_USER_AGENT: 'test',
  modDetail: (id: number) => gb.detail(id)
}))
vi.mock('../src/main/http', () => ({
  fetchWithRetry: async () => {
    const res = new Response(gb.zip, { status: 200, headers: { 'content-length': String(gb.zip.length) } })
    Object.defineProperty(res, 'url', { value: 'https://filecache36.gamebanana.com/mods/mod.zip' })
    return res
  }
}))

import * as emulation from '../src/main/emulation'
import * as mods from '../src/main/mods'

function tree(paths: string[]): TreeEntry[] {
  const out = new Map<string, TreeEntry>()
  for (const p of paths) {
    const parts = p.split('/')
    for (let i = 1; i < parts.length; i++) out.set(parts.slice(0, i).join('/'), { path: parts.slice(0, i).join('/'), isDir: true })
    out.set(p, { path: p, isDir: p.endsWith('/') })
  }
  return [...out.values()].map((e) => ({ ...e, path: e.path.replace(/\/$/, '') }))
}

const TID = '0100F2C0115B6000'

describe('planInstall', () => {
  it('finds Switch mod roots and offers each variant', () => {
    const plan = planInstall('eden', tree(['60fps/exefs/main.pchtxt', '30fps/exefs/main.pchtxt', 'readme.txt']), TID, 'FPS Mod')
    expect(plan).toMatchObject({ kind: 'folder', targetSubdir: ['load', TID], folderName: 'FPS Mod' })
    if (plan.kind !== 'folder') throw new Error()
    expect(plan.variants.map((v) => v.label).sort()).toEqual(['30fps', '60fps'])
    const ryu = planInstall('ryubing', tree(['romfs/Model/a.bfres']), TID, 'Skin')
    expect(ryu).toMatchObject({ targetSubdir: ['mods', 'contents', TID], variants: [{ root: '' }] })
  })

  it('needs the right code for each console and says so', () => {
    expect(planInstall('eden', tree(['romfs/a']), null, 'M')).toMatchObject({ kind: 'unsupported' })
    expect(planInstall('dolphin', tree(['tex/a.png']), 'bad', 'M')).toMatchObject({ kind: 'unsupported', reason: expect.stringMatching(/game id/) })
    expect(planInstall('pcsx2', tree(['a/b.png']), 'SLUS20312', 'M')).toMatchObject({ kind: 'unsupported' })
    expect(planInstall('duckstation', tree(['a.png']), 'SLUS-00707', 'M')).toMatchObject({ kind: 'unsupported' })
  })

  it('files Dolphin and PCSX2 textures under the game code, inside the pack’s own folder', () => {
    const dolphin = planInstall('dolphin', tree(['Pack/GZ2E01/tex1_1.png']), 'GZ2E01', 'HD')
    expect(dolphin).toMatchObject({ targetSubdir: ['Load', 'Textures', 'GZ2E01'], variants: [{ root: 'Pack/GZ2E01' }] })
    const pcsx2 = planInstall('pcsx2', tree(['SLUS-20312/replacements/a.png']), 'SLUS-20312', 'HD')
    expect(pcsx2).toMatchObject({ targetSubdir: ['textures', 'SLUS-20312', 'replacements'], variants: [{ root: 'SLUS-20312/replacements' }] })
    const pnach = planInstall('pcsx2', tree(['cheats/ABCD1234.pnach']), null, 'Widescreen')
    expect(pnach).toEqual({
      kind: 'files',
      targetSubdir: ['patches'],
      variants: [{ root: '', label: 'Widescreen', files: ['cheats/ABCD1234.pnach'] }]
    })
    // The same patch name in two folders is two variants, never a collision.
    const twin = planInstall('pcsx2', tree(['60fps/SLUS-20312_1.pnach', 'widescreen/SLUS-20312_1.pnach']), null, 'Patches')
    expect(twin).toMatchObject({ kind: 'files', variants: [{ label: '60fps', files: ['60fps/SLUS-20312_1.pnach'] }, { label: 'widescreen' }] })
  })

  it('places Cemu graphic packs, Dolphin graphics mods and PPSSPP textures', () => {
    expect(planInstall('cemu', tree(['BotW_60/rules.txt']), null, 'x')).toMatchObject({ targetSubdir: ['graphicPacks'], variants: [{ root: 'BotW_60' }] })
    expect(planInstall('dolphin', tree(['Bloom/metadata.json']), null, 'x')).toMatchObject({ targetSubdir: ['Load', 'GraphicMods'] })
    expect(planInstall('ppsspp', tree(['ULUS10041/textures.ini', 'ULUS10041/a.png']), 'ULUS10041', 'x')).toMatchObject({
      targetSubdir: ['PSP', 'TEXTURES'],
      folderName: 'ULUS10041',
      exactName: true
    })
  })

  it('unwraps a lone top folder and makes safe folder names', () => {
    expect(contentRoot(tree(['Wrapper/a.png', 'Wrapper/b.png']))).toBe('Wrapper')
    expect(contentRoot(tree(['a.png', 'b.png']))).toBe('')
    expect(filesUnder(tree(['Wrapper/x/a.png']), 'Wrapper')).toEqual([{ from: 'Wrapper/x/a.png', rel: 'x/a.png' }])
    expect(safeFolderName('Mod: "Best" / v1.0...')).toBe('Mod Best v1.0')
    expect(safeFolderName('CON')).toBe('Mod')
    expect(safeFolderName('???')).toBe('Mod')
    expect(safeFolderName('a'.repeat(59) + '.bcd')).toBe('a'.repeat(59))
  })
})

describe('safe extraction', () => {
  beforeEach(() => {
    root = mkdtempSync(join(tmpdir(), 'navihub-mod-'))
  })
  afterEach(() => rmSync(root, { recursive: true, force: true }))

  it('rejects names that could leave the folder', () => {
    for (const bad of ['../evil.dll', 'a/../../evil', '/etc/passwd', 'C:\\Windows\\x', '\\\\server\\share', 'a\\..\\..\\b', 'con:x']) {
      expect(unsafeEntryReason(bad)).not.toBeNull()
    }
    expect(unsafeEntryReason('romfs/Model/a.bfres')).toBeNull()
    expect(unsafeEntryReason('textures/..hidden.png')).toBeNull()
    expect(isStrictlyInside('/a/b', '/a/b/..hidden.png', 'linux')).toBe(true)
    expect(isStrictlyInside('/a/b', '/a/c', 'linux')).toBe(false)
    expect(isStrictlyInside('/a/b', '/a/b', 'linux')).toBe(false)
  })

  it('extracts a normal zip and refuses a zip-slip entry before writing anything outside', async () => {
    const good = new AdmZip()
    good.addFile('Mod/romfs/a.txt', Buffer.from('hello'))
    const goodPath = join(root, 'good.zip')
    good.writeZip(goodPath)
    const dest = join(root, 'out')
    mkdirSync(dest)
    await extractZip(goodPath, dest, () => false)
    expect(readFileSync(join(dest, 'Mod', 'romfs', 'a.txt'), 'utf8')).toBe('hello')
    expect(await listTree(dest)).toEqual([
      { path: 'Mod', isDir: true },
      { path: 'Mod/romfs', isDir: true },
      { path: 'Mod/romfs/a.txt', isDir: false }
    ])

    const evil = new AdmZip()
    evil.addFile('ok.txt', Buffer.from('x'))
    evil.addFile('placeholder.txt', Buffer.from('x'))
    const evilPath = join(root, 'evil.zip')
    // adm-zip normalises names on add, so write the traversal name into the raw bytes.
    const raw = evil.toBuffer()
    const patched = Buffer.from(raw.toString('latin1').replaceAll('placeholder.txt', '../../escape.tx'), 'latin1')
    writeFileSync(evilPath, patched)
    const dest2 = join(root, 'out2')
    mkdirSync(dest2)
    // yauzl refuses it first; our own name check is the second line of defence.
    await expect(extractZip(evilPath, dest2, () => false)).rejects.toThrow(/climbs out|invalid relative path/)
    expect(existsSync(join(root, 'escape.tx'))).toBe(false)
  })

  it('validates a 7-Zip listing before extraction', () => {
    const listing = [
      '7-Zip 24.08',
      '----------',
      'Path = Mod/romfs/a.bin',
      'Folder = -',
      'Size = 10',
      'Attributes = A -rw-r--r--',
      '',
      'Path = Mod',
      'Folder = +',
      'Size = 0',
      'Attributes = D drwxr-xr-x',
      '',
      'Path = Mod/link',
      'Folder = -',
      'Size = 4',
      'Attributes = A lrwxrwxrwx',
      ''
    ].join('\n')
    const entries = parseSevenZipListing(listing)
    expect(entries.map((e) => [e.path, e.isDir, e.link])).toEqual([
      ['Mod/romfs/a.bin', false, false],
      ['Mod', true, false],
      ['Mod/link', false, true]
    ])
    expect(() => checkListing(entries)).toThrow(/link/)
    expect(() => checkListing([{ path: '..\\x', isDir: false, link: false, size: 1 }])).toThrow(/climbs out/)
    expect(() => checkListing(entries.slice(0, 2))).not.toThrow()
  })
})

describe('install, disable, enable, uninstall', () => {
  let dataDir: string
  let mediaId: number
  let romId: number

  beforeEach(async () => {
    root = mkdtempSync(join(tmpdir(), 'navihub-mod-'))
    db = createTestDb()
    dataDir = join(root, 'EdenUser')
    mkdirSync(dataDir)
    const exe = join(root, 'eden.exe')
    writeFileSync(exe, 'x')
    const emu = emulation.registerEmulator(exe)
    emulation.updateEmulator(emu.id, { dataDir })
    mediaId = Number(db.prepare("INSERT INTO media_item (media_type, title) VALUES ('game','TotK')").run().lastInsertRowid)
    const rom = await emulation.linkRom(mediaId, (() => {
      const p = join(root, `TotK [${TID}].nsp`)
      writeFileSync(p, 'x')
      return p
    })())
    romId = rom.id
    const zip = new AdmZip()
    zip.addFile('FPS Mod/60fps/exefs/main.pchtxt', Buffer.from('@enabled'))
    zip.addFile('FPS Mod/30fps/exefs/main.pchtxt', Buffer.from('@disabled'))
    gb.zip = zip.toBuffer()
    gb.detail.mockResolvedValue({
      id: 77,
      name: 'FPS Mod',
      version: '1.0',
      dateModified: 1_790_000_000,
      dateUpdated: 1_790_000_000,
      files: [{ id: 5, name: 'fps.zip', size: gb.zip.length, md5: null, avClean: true, version: '1.0' }]
    })
  })
  afterEach(() => rmSync(root, { recursive: true, force: true }))

  async function untilState(state: string): Promise<void> {
    for (let i = 0; i < 200; i++) {
      if (mods.status()?.state === state) return
      if (['error', 'cancelled'].includes(mods.status()?.state ?? '') && state !== mods.status()?.state) {
        throw new Error(`job ended: ${mods.status()?.state} ${mods.status()?.message}`)
      }
      await new Promise((r) => setTimeout(r, 10))
    }
    throw new Error(`never reached ${state}`)
  }

  it('waits for confirmation, installs the chosen variant into a new folder and records every file', async () => {
    expect(mods.targets(mediaId)).toMatchObject([{ romId, presetKey: 'eden', gameCode: TID, blocked: null }])
    const { id } = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('awaiting')
    const plan = mods.status()!.plan!
    expect(plan.destination).toBe(join(dataDir, 'load', TID))
    expect(plan.variants.map((v) => v.label).sort()).toEqual(['30fps', '60fps'])
    // Nothing outside userData exists before the user says yes.
    expect(existsSync(join(dataDir, 'load'))).toBe(false)

    const sixty = plan.variants.find((v) => v.label === '60fps')!.index
    const { installId } = await mods.confirm(id, sixty)
    const installedFile = join(dataDir, 'load', TID, 'FPS Mod', 'exefs', 'main.pchtxt')
    expect(readFileSync(installedFile, 'utf8')).toBe('@enabled')
    expect(existsSync(join(dataDir, 'load', TID, 'FPS Mod.navihub-partial'))).toBe(false)
    expect(mods.installed(mediaId)).toMatchObject([{ id: installId, name: 'FPS Mod', fileCount: 1, enabled: true, kind: 'folder' }])
    expect(existsSync(join(root, 'userData', 'modcache', 'staging', id))).toBe(false)

    // A second install of the same mod never merges into the first folder.
    const second = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('awaiting')
    await mods.confirm(second.id, sixty)
    expect(existsSync(join(dataDir, 'load', TID, 'FPS Mod (2)', 'exefs', 'main.pchtxt'))).toBe(true)
  })

  it('disables by moving its own files out and back, and uninstall keeps changed files', async () => {
    const { id } = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('awaiting')
    const { installId } = await mods.confirm(id, 0)
    const dir = join(dataDir, 'load', TID, 'FPS Mod')
    const userFile = join(dir, 'exefs', 'mine.pchtxt')
    writeFileSync(userFile, 'the user added this')

    expect(await mods.setEnabled(installId, false)).toEqual({ removed: 1, kept: [] })
    expect(existsSync(join(dir, 'exefs', 'main.pchtxt'))).toBe(false)
    expect(existsSync(userFile)).toBe(true)
    expect(existsSync(join(root, 'userData', 'modcache', 'disabled', String(installId), 'FPS Mod', 'exefs', 'main.pchtxt'))).toBe(true)
    expect(mods.installed(mediaId)[0].enabled).toBe(false)

    await mods.setEnabled(installId, true)
    const ours = join(dir, 'exefs', 'main.pchtxt')
    expect(existsSync(ours)).toBe(true)

    writeFileSync(ours, 'edited by the user, different size')
    const res = await mods.uninstall(installId)
    expect(res.removed).toBe(0)
    expect(res.kept).toEqual([ours])
    expect(existsSync(ours)).toBe(true)
    expect(existsSync(userFile)).toBe(true)
    expect(mods.installed(mediaId)).toEqual([])
  })

  it('uninstall removes untouched files and the folders it made', async () => {
    const { id } = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('awaiting')
    const { installId } = await mods.confirm(id, 0)
    expect(await mods.uninstall(installId)).toEqual({ removed: 1, kept: [] })
    expect(existsSync(join(dataDir, 'load', TID, 'FPS Mod'))).toBe(false)
    expect(existsSync(join(dataDir, 'load', TID))).toBe(true)
  })

  it('refuses a mod GameBanana no longer shows, a file not marked clean, and a game with no title id', async () => {
    gb.detail.mockResolvedValueOnce(null)
    await expect(mods.start({ mediaId, romId, modId: 77, fileId: 5 })).rejects.toThrow(/not available/)
    gb.detail.mockResolvedValueOnce({
      id: 77,
      name: 'X',
      version: null,
      dateModified: null,
      dateUpdated: null,
      files: [{ id: 5, name: 'x.zip', size: 10, md5: null, avClean: false, version: null }]
    })
    await expect(mods.start({ mediaId, romId, modId: 77, fileId: 5 })).rejects.toThrow(/virus/)
    emulation.updateRom(romId, { gameCode: null })
    const { id } = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('error')
    expect(mods.status()).toMatchObject({ id, state: 'error', message: expect.stringMatching(/title id/) })
  })

  it('a changed file stays behind on disable, and enable and uninstall still work', async () => {
    const { id } = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('awaiting')
    const { installId } = await mods.confirm(id, 0)
    const ours = join(dataDir, 'load', TID, 'FPS Mod', 'exefs', 'main.pchtxt')
    writeFileSync(ours, 'edited, different size')
    expect(await mods.setEnabled(installId!, false)).toEqual({ removed: 0, kept: [ours] })
    expect(existsSync(ours)).toBe(true)
    // Re-enabling is not blocked by the file that never moved.
    expect(await mods.setEnabled(installId!, true)).toEqual({ removed: 0, kept: [] })
    expect(mods.installed(mediaId)[0].enabled).toBe(true)
    expect(await mods.uninstall(installId!)).toEqual({ removed: 0, kept: [ours] })
  })

  it('never reuses the folder name of a disabled install', async () => {
    const first = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('awaiting')
    const { installId } = await mods.confirm(first.id, 0)
    await mods.setEnabled(installId!, false)
    expect(existsSync(join(dataDir, 'load', TID, 'FPS Mod'))).toBe(false)
    const second = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('awaiting')
    await mods.confirm(second.id, 0)
    expect(existsSync(join(dataDir, 'load', TID, 'FPS Mod (2)'))).toBe(true)
    expect(await mods.setEnabled(installId!, true)).toEqual({ removed: 1, kept: [] })
  })

  it('a new install replaces one left waiting, and installs of a deleted game stay listed', async () => {
    const first = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('awaiting')
    const second = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    expect(second.id).not.toBe(first.id)
    await untilState('awaiting')
    await mods.confirm(second.id, 0)
    db.prepare('DELETE FROM media_item WHERE id = ?').run(mediaId)
    expect(mods.installed(null)).toMatchObject([{ name: 'FPS Mod', enabled: true }])
  })

  it('cancelling while waiting drops the staging copy and writes nothing', async () => {
    const { id } = await mods.start({ mediaId, romId, modId: 77, fileId: 5 })
    await untilState('awaiting')
    await mods.cancel(id)
    expect(mods.status()?.state).toBe('cancelled')
    await expect(mods.confirm(id, 0)).rejects.toThrow(/Nothing is waiting/)
    expect(existsSync(join(dataDir, 'load'))).toBe(false)
    expect(existsSync(join(root, 'userData', 'modcache', 'staging', id))).toBe(false)
  })
})
