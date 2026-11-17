import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync
} from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

let db: Database.Database
let userData: string
let booksRoot: string
let kindleRoot: string
let space: { free: number; total: number } | null
let connected = true
let twoKindles = false

vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({
  app: { getPath: () => userData },
  shell: { showItemInFolder: vi.fn() },
  dialog: { showOpenDialog: vi.fn() }
}))
vi.mock('../src/main/files', () => ({
  booksRootDir: () => booksRoot,
  mangaRootDir: () => join(booksRoot, '..', 'manga'),
  absoluteMediaPath: () => null
}))
// A mass-storage Kindle at a scratch folder, so FilesystemUploader writes it.
vi.mock('../src/main/kindle/kindleDevice', async () => {
  const real = await vi.importActual<typeof import('../src/main/kindle/kindleDevice')>(
    '../src/main/kindle/kindleDevice'
  )
  return {
    ...real,
    detectDevices: async () => {
      if (!connected) return []
      const dev = new real.FilesystemDevice(kindleRoot, 'Kindle Paperwhite')
      dev.freeSpace = async () => space
      return twoKindles ? [dev, new real.FilesystemDevice(kindleRoot, 'Kindle Oasis')] : [dev]
    }
  }
})

import * as send from '../src/main/kindle/kindleSend'
import * as kindleRepo from '../src/main/repos/kindleRepo'
import { claimKindle, releaseKindle } from '../src/main/kindle/kindleBusy'

const GiB = 1024 ** 3

beforeEach(() => {
  db = createTestDb()
  userData = mkdtempSync(join(tmpdir(), 'navihub-ksend-user-'))
  booksRoot = mkdtempSync(join(tmpdir(), 'navihub-ksend-books-'))
  kindleRoot = mkdtempSync(join(tmpdir(), 'navihub-ksend-kindle-'))
  mkdirSync(join(kindleRoot, 'documents'))
  writeFileSync(join(kindleRoot, 'documents', 'Mine.epub'), 'the user own book')
  space = { free: 8 * GiB, total: 16 * GiB }
  connected = true
  twoKindles = false
})
afterEach(() => {
  for (const d of [userData, booksRoot, kindleRoot]) rmSync(d, { recursive: true, force: true })
})

// A library book with one local EPUB volume.
function libraryBook(
  title: string,
  bytes = 5000
): { mediaId: number; chapterId: number; file: Buffer } {
  const mediaId = Number(
    db
      .prepare(`INSERT INTO media_item (media_type, title, local_dir) VALUES ('book', ?, ?)`)
      .run(title, title).lastInsertRowid
  )
  mkdirSync(join(booksRoot, title), { recursive: true })
  const file = Buffer.alloc(bytes, 5)
  writeFileSync(join(booksRoot, title, `${title}.epub`), file)
  const chapterId = Number(
    db
      .prepare(
        `INSERT INTO manga_chapter (media_id, dir_path, title, page_count) VALUES (?, ?, ?, 10)`
      )
      .run(mediaId, `${title}/${title}.epub`, title).lastInsertRowid
  )
  return { mediaId, chapterId, file }
}

function madeBook(name: string, bytes = 3000): Buffer {
  const dir = join(userData, 'kindle', 'generated')
  mkdirSync(dir, { recursive: true })
  const file = Buffer.alloc(bytes, 9)
  writeFileSync(join(dir, name), file)
  return file
}

async function finished(): Promise<ReturnType<typeof send.status>> {
  for (let i = 0; i < 200 && send.status().running; i++) await new Promise((r) => setTimeout(r, 10))
  return send.status()
}

const navihub = (): string => join(kindleRoot, 'documents', 'NaviHUB')

describe('Send to Kindle', () => {
  it('previews names and space without writing anything', async () => {
    const book = libraryBook('Dune')
    madeBook('My Quotes 2026-11-17.epub')
    const p = await send.preview([
      { kind: 'chapter', chapterId: book.chapterId },
      { kind: 'made', fileName: 'My Quotes 2026-11-17.epub' }
    ])
    expect(p.refusal).toBeNull()
    expect(p.files.map((f) => f.deviceName)).toEqual(['Dune.epub', 'My Quotes 2026-11-17.epub'])
    expect(p.freeAfter).toBe(8 * GiB - 8000)
    expect(existsSync(navihub())).toBe(false)
  })

  it('refuses when no Kindle is connected or space would run low', async () => {
    const book = libraryBook('Dune')
    connected = false
    expect((await send.preview([{ kind: 'chapter', chapterId: book.chapterId }])).refusal).toMatch(
      /No Kindle/
    )
    connected = true
    // The send would leave less than the 1.6 GiB (10%) reserve.
    space = { free: Math.ceil(1.6 * GiB) + 1000, total: 16 * GiB }
    expect((await send.preview([{ kind: 'chapter', chapterId: book.chapterId }])).refusal).toMatch(
      /keep less than/
    )
    await expect(send.start([{ kind: 'chapter', chapterId: book.chapterId }])).rejects.toThrow(
      /keep less than/
    )
    expect(existsSync(navihub())).toBe(false)
  })

  it('sends, verifies, records the ledger and links a library book', async () => {
    const book = libraryBook('Dune')
    const made = madeBook('My Quotes 2026-11-17.epub')
    await send.start([
      { kind: 'chapter', chapterId: book.chapterId },
      { kind: 'made', fileName: 'My Quotes 2026-11-17.epub' }
    ])
    const s = await finished()
    expect(s).toMatchObject({
      running: false,
      total: 2,
      done: 2,
      sent: ['Dune.epub', 'My Quotes 2026-11-17.epub'],
      failed: []
    })
    expect(readFileSync(join(navihub(), 'Dune.epub'))).toEqual(book.file)
    expect(readFileSync(join(navihub(), 'My Quotes 2026-11-17.epub'))).toEqual(made)
    expect(readFileSync(join(kindleRoot, 'documents', 'Mine.epub'), 'utf8')).toBe(
      'the user own book'
    )
    expect(kindleRepo.recentSends().map((r) => [r.title, r.status])).toEqual([
      ['My Quotes 2026-11-17', 'sent'],
      ['Dune', 'sent']
    ])
    // The library book is linked as sent, so a check ties it up by itself.
    const link = db.prepare(`SELECT media_id, device_path, origin FROM kindle_book`).all()
    expect(link).toEqual([
      { media_id: book.mediaId, device_path: 'documents/NaviHUB/Dune.epub', origin: 'sent' }
    ])
  })

  it('never replaces a book already on the Kindle: a second send gets a new name', async () => {
    const book = libraryBook('Dune')
    await send.start([{ kind: 'chapter', chapterId: book.chapterId }])
    await finished()
    await send.start([{ kind: 'chapter', chapterId: book.chapterId }])
    expect((await finished()).sent).toEqual(['Dune (2).epub'])
    expect(readdirSync(navihub()).sort()).toEqual(['Dune (2).epub', 'Dune.epub'])
  })

  it('accepts only real items', async () => {
    await expect(send.preview([{ kind: 'made', fileName: '../../etc/passwd' }])).rejects.toThrow(
      /no longer/
    )
    await expect(send.preview([{ kind: 'chapter', chapterId: 99 }])).rejects.toThrow(
      /no local EPUB/
    )
    await expect(send.preview([{ kind: 'other' } as never])).rejects.toThrow(/Unknown/)
    // A manga chapter is not a book to send.
    const manga = Number(
      db.prepare(`INSERT INTO media_item (media_type, title) VALUES ('manga', 'M')`).run()
        .lastInsertRowid
    )
    const ch = Number(
      db
        .prepare(`INSERT INTO manga_chapter (media_id, dir_path, title) VALUES (?, 'M/1.cbz', '1')`)
        .run(manga).lastInsertRowid
    )
    await expect(send.preview([{ kind: 'chapter', chapterId: ch }])).rejects.toThrow(
      /no local EPUB/
    )
  })

  it('finds an upload the app never finished and settles it on the device', async () => {
    const book = libraryBook('Dune', 4000)
    // A send that was cut off: its ledger row is still pending and a
    // truncated copy sits under its name.
    const sha = require('crypto').createHash('sha256').update(book.file).digest('hex')
    const cut = kindleRepo.recordPendingSend({
      mediaId: book.mediaId,
      title: 'Dune',
      devicePath: 'documents/NaviHUB/Dune.epub',
      device: 'Kindle Paperwhite',
      bytes: 4000,
      sha256: sha,
      partialMd5: 'a'.repeat(32)
    })
    mkdirSync(navihub())
    writeFileSync(join(navihub(), 'Dune.epub'), book.file.subarray(0, 100))
    // One that actually completed before the app died.
    const whole = kindleRepo.recordPendingSend({
      mediaId: book.mediaId,
      title: 'Dune',
      devicePath: 'documents/NaviHUB/Dune (2).epub',
      device: 'Kindle Paperwhite',
      bytes: 4000,
      sha256: sha,
      partialMd5: 'b'.repeat(32)
    })
    writeFileSync(join(navihub(), 'Dune (2).epub'), book.file)

    expect(send.unfinished().map((u) => u.id)).toEqual([cut, whole])
    expect(await send.resolveUnfinished(cut)).toBe('removed')
    expect(await send.resolveUnfinished(whole)).toBe('complete')
    expect(readdirSync(navihub())).toEqual(['Dune (2).epub'])
    expect(send.unfinished()).toEqual([])
    expect(kindleRepo.sendRow(cut)?.status).toBe('removed')
    expect(kindleRepo.sendRow(whole)?.status).toBe('sent')
    await expect(send.resolveUnfinished(cut)).rejects.toThrow(/already settled/)
  })

  it('refuses a second send started before the first resolves, and a send during a check', async () => {
    const book = libraryBook('Dune')
    const first = send.start([{ kind: 'chapter', chapterId: book.chapterId }])
    await expect(send.start([{ kind: 'chapter', chapterId: book.chapterId }])).rejects.toThrow(/already running/)
    await first
    expect((await finished()).sent).toEqual(['Dune.epub'])

    claimKindle('check')
    try {
      await expect(send.start([{ kind: 'chapter', chapterId: book.chapterId }])).rejects.toThrow(/being checked/)
      expect((await send.preview([{ kind: 'chapter', chapterId: book.chapterId }])).refusal).toMatch(/busy/)
    } finally {
      releaseKindle('check')
    }
    // A refused start releases nothing it did not hold, and a later one runs.
    await send.start([{ kind: 'chapter', chapterId: book.chapterId }])
    expect((await finished()).sent).toEqual(['Dune (2).epub'])
  })

  it('never touches a later, complete send that reused an unfinished name', async () => {
    const old = libraryBook('Dune', 4000)
    const sha = (b: Buffer): string => require('crypto').createHash('sha256').update(b).digest('hex')
    // Cut off long ago; the user deleted its partial file on the Kindle.
    const cut = kindleRepo.recordPendingSend({
      mediaId: old.mediaId,
      title: 'Dune',
      devicePath: 'documents/NaviHUB/Dune.epub',
      device: 'Kindle Paperwhite',
      bytes: 4000,
      sha256: sha(old.file),
      partialMd5: 'a'.repeat(32)
    })
    // A later send of a different file then took the free name.
    await send.start([{ kind: 'chapter', chapterId: libraryBook('Dune2', 6000).chapterId }])
    await finished()
    const later = kindleRepo.recentSends()[0]
    db.prepare(`UPDATE kindle_send SET device_path = 'documents/NaviHUB/Dune.epub' WHERE id = ?`).run(later.id)
    const { renameSync } = require('fs')
    renameSync(join(navihub(), 'Dune2.epub'), join(navihub(), 'Dune.epub'))
    const before = readFileSync(join(navihub(), 'Dune.epub'))

    expect(await send.resolveUnfinished(cut)).toBe('superseded')
    expect(readFileSync(join(navihub(), 'Dune.epub'))).toEqual(before)
    expect(kindleRepo.sendRow(cut)?.status).toBe('removed')
  })

  it('writes nothing while two Kindles are connected', async () => {
    const book = libraryBook('Dune')
    twoKindles = true
    expect((await send.preview([{ kind: 'chapter', chapterId: book.chapterId }])).refusal).toMatch(
      /More than one Kindle/
    )
    await expect(send.start([{ kind: 'chapter', chapterId: book.chapterId }])).rejects.toThrow(/More than one Kindle/)
    expect(existsSync(navihub())).toBe(false)
  })

  it('cleans up only on the Kindle the send went to', async () => {
    const book = libraryBook('Dune', 4000)
    const sha = require('crypto').createHash('sha256').update(book.file).digest('hex')
    const id = kindleRepo.recordPendingSend({
      mediaId: book.mediaId,
      title: 'Dune',
      devicePath: 'documents/NaviHUB/Dune.epub',
      device: 'Kindle Oasis',
      bytes: 4000,
      sha256: sha,
      partialMd5: 'c'.repeat(32)
    })
    mkdirSync(navihub())
    writeFileSync(join(navihub(), 'Dune.epub'), 'another Kindle, another file')
    await expect(send.resolveUnfinished(id)).rejects.toThrow(/went to Kindle Oasis/)
    expect(readFileSync(join(navihub(), 'Dune.epub'), 'utf8')).toBe('another Kindle, another file')
    expect(kindleRepo.sendRow(id)?.status).toBe('pending')
  })
})

