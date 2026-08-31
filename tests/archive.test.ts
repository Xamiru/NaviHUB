import { mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import os from 'node:os'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'
import AdmZip from 'adm-zip'
import {
  isArchiveFile,
  splitArchivePath,
  mimeFor,
  listArchivePages,
  openArchiveEntryStream,
  readArchiveEntry
} from '../src/main/archive'

let root: string
beforeEach(() => {
  root = mkdtempSync(join(os.tmpdir(), 'navihub-archive-'))
})
afterEach(() => {
  rmSync(root, { recursive: true, force: true })
})

// adm-zip (dev-only dep) writes the fixtures; the real yauzl code reads them.
function makeCbz(name: string, entries: Record<string, string>): string {
  const zip = new AdmZip()
  for (const [entry, content] of Object.entries(entries)) {
    zip.addFile(entry, Buffer.from(content))
  }
  const p = join(root, name)
  zip.writeZip(p)
  return p
}

describe('path helpers', () => {
  it('recognizes archive files by extension', () => {
    expect(isArchiveFile('Vol 1.cbz')).toBe(true)
    expect(isArchiveFile('Vol 1.CBZ')).toBe(true)
    expect(isArchiveFile('ch.zip')).toBe(true)
    expect(isArchiveFile('page.png')).toBe(false)
  })

  it('splits archive page paths at the archive segment', () => {
    expect(splitArchivePath('manga/Series/Vol 1.cbz/0001.png')).toEqual({
      archiveRel: 'manga/Series/Vol 1.cbz',
      entryName: '0001.png'
    })
    expect(splitArchivePath('manga/Series/Vol 1.cbz/Vol 1/0001.png')).toEqual({
      archiveRel: 'manga/Series/Vol 1.cbz',
      entryName: 'Vol 1/0001.png'
    })
    // the archive itself (nothing after it) is not an entry path
    expect(splitArchivePath('manga/Series/Vol 1.cbz')).toBeNull()
    expect(splitArchivePath('manga/Series/Ch 001/0001.png')).toBeNull()
  })

  it('maps image mime types', () => {
    expect(mimeFor('a.PNG')).toBe('image/png')
    expect(mimeFor('a.jpg')).toBe('image/jpeg')
    expect(mimeFor('a.bin')).toBe('application/octet-stream')
  })
})

describe('listArchivePages / readArchiveEntry', () => {
  it('lists image entries natural-sorted, skipping junk', async () => {
    const cbz = makeCbz('Vol 1.cbz', {
      '10.png': 'j',
      '2.png': 'b',
      '1.png': 'a',
      'info.txt': 'meta',
      '__MACOSX/1.png': 'junk',
      '.hidden.png': 'junk'
    })
    expect(await listArchivePages(cbz)).toEqual(['1.png', '2.png', '10.png'])
  })

  it('keeps nested entry paths (pages inside a folder in the zip)', async () => {
    const cbz = makeCbz('Vol 2.cbz', { 'Vol 2/0002.png': 'b', 'Vol 2/0001.png': 'a' })
    expect(await listArchivePages(cbz)).toEqual(['Vol 2/0001.png', 'Vol 2/0002.png'])
  })

  it('reads a single entry by name (decompressed content round-trips)', async () => {
    const cbz = makeCbz('Vol 3.cbz', { '0001.png': 'PNGDATA-page-one', '0002.png': 'page-two' })
    const buf = await readArchiveEntry(cbz, '0001.png')
    expect(buf?.toString()).toBe('PNGDATA-page-one')
    expect(await readArchiveEntry(cbz, 'missing.png')).toBeNull()
  })

  it('opens protocol entries as streams without buffering the whole page', async () => {
    const cbz = makeCbz('Stream.cbz', { '0001.png': 'streamed-page' })
    const opened = await openArchiveEntryStream(cbz, '0001.png')
    expect(opened?.size).toBe(Buffer.byteLength('streamed-page'))
    const chunks: Buffer[] = []
    for await (const chunk of opened!.stream) chunks.push(Buffer.from(chunk))
    expect(Buffer.concat(chunks).toString()).toBe('streamed-page')
  })

  it('returns []/null for a corrupt or missing archive', async () => {
    const bad = join(root, 'bad.cbz')
    writeFileSync(bad, 'this is not a zip')
    expect(await listArchivePages(bad)).toEqual([])
    expect(await readArchiveEntry(bad, 'x.png')).toBeNull()
    expect(await listArchivePages(join(root, 'nope.cbz'))).toEqual([])
  })

  it('picks up a replaced archive (mtime cache invalidation)', async () => {
    const cbz = makeCbz('Vol 4.cbz', { '0001.png': 'a' })
    expect(await listArchivePages(cbz)).toEqual(['0001.png'])
    // rewrite with more pages and a bumped mtime
    const zip = new AdmZip()
    zip.addFile('0001.png', Buffer.from('a'))
    zip.addFile('0002.png', Buffer.from('b'))
    zip.writeZip(cbz)
    const later = new Date(Date.now() + 2000)
    const { utimesSync } = await import('node:fs')
    utimesSync(cbz, later, later)
    expect(await listArchivePages(cbz)).toEqual(['0001.png', '0002.png'])
  })
})
