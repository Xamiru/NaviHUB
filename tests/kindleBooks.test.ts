import { mkdtempSync, readFileSync, rmSync } from 'fs'
import { tmpdir } from 'os'
import { join } from 'path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import { buildEpub, stableBookId, xmlEscape, type EpubBook } from '../src/main/kindle/epubBuild'
import { quotesBook, readingsBook } from '../src/main/kindle/epubContent'
import { JP_PASSAGES } from '../src/shared/japanese/readings'
import { parseEpub } from '../src/main/epub'
import { listArchiveEntries, readArchiveEntry } from '../src/main/archive'
import type { SavedQuote } from '../src/shared/types'

let db: Database.Database
let userData: string
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('electron', () => ({
  app: { getPath: () => userData },
  shell: { showItemInFolder: vi.fn() }
}))

const NOW = new Date('2026-11-12T09:30:00.000Z')
const ID = 'urn:uuid:00000000-0000-5000-a000-000000000000'

beforeEach(() => {
  db = createTestDb()
  userData = mkdtempSync(join(tmpdir(), 'navihub-kbooks-'))
})
afterEach(() => rmSync(userData, { recursive: true, force: true }))

function quote(over: Partial<SavedQuote>): SavedQuote {
  return {
    key: 'q-1',
    id: 1,
    origin: 'manual',
    text: 'A line',
    furigana: null,
    translation: null,
    locator: null,
    note: null,
    favorite: false,
    themes: [],
    mediaId: null,
    mediaType: null,
    sourceTitle: null,
    coverPath: null,
    backgroundPath: null,
    speakerKind: null,
    speakerId: null,
    speakerName: null,
    speakerImagePath: null,
    createdAt: '2026-11-01',
    ...over
  }
}

const SMALL: EpubBook = {
  id: ID,
  title: 'T <&> "x"',
  author: 'NaviHUB',
  language: 'ja',
  modified: '2026-11-12T09:30:00Z',
  chapters: [{ title: 'One', blocks: [{ kind: 'p', parts: [{ text: '漢字', ruby: 'かんじ' }, { text: ' <b>not bold</b>' }] }] }]
}

describe('buildEpub', () => {
  it('puts an uncompressed mimetype first', () => {
    const entries = buildEpub(SMALL)
    expect(entries[0]).toEqual({ name: 'mimetype', data: 'application/epub+zip', store: true })
    expect(entries.slice(1).every((e) => !e.store)).toBe(true)
  })

  it('escapes every text, so content never becomes markup', () => {
    const chapter = buildEpub(SMALL).find((e) => e.name === 'OEBPS/chapter-001.xhtml')!.data
    expect(chapter).toContain('<ruby>漢字<rt>かんじ</rt></ruby>')
    expect(chapter).toContain('&lt;b&gt;not bold&lt;/b&gt;')
    expect(chapter).not.toContain('<b>')
    const opf = buildEpub(SMALL).find((e) => e.name === 'OEBPS/content.opf')!.data
    expect(opf).toContain('<dc:title>T &lt;&amp;&gt; &quot;x&quot;</dc:title>')
    expect(xmlEscape('a\u0000b\u000bc')).toBe('abc')
  })

  it('never ships a script or a remote resource', () => {
    for (const e of buildEpub(SMALL)) {
      expect(e.data).not.toMatch(/<script/i)
      expect(e.data).not.toMatch(/(src|href)="https?:/i)
    }
  })

  it('refuses an empty book, and gives a stable id per name', () => {
    expect(() => buildEpub({ ...SMALL, chapters: [] })).toThrow()
    const hash = (s: string): string => require('crypto').createHash('sha1').update(s).digest('hex')
    expect(stableBookId('quotes', hash)).toBe(stableBookId('quotes', hash))
    expect(stableBookId('quotes', hash)).not.toBe(stableBookId('jp-readings-N5', hash))
    expect(stableBookId('quotes', hash)).toMatch(/^urn:uuid:[0-9a-f]{8}-[0-9a-f]{4}-5[0-9a-f]{3}-a[0-9a-f]{3}-[0-9a-f]{12}$/)
  })
})

describe('book content', () => {
  it('groups quotes by source, keeps readings and notes, and puts unsourced last', () => {
    const book = quotesBook(
      [
        quote({ text: 'Fear is the mind-killer.', sourceTitle: 'Dune', locator: 'Book One', note: 'litany' }),
        quote({ text: 'No source here.' }),
        quote({ text: '時は金なり', furigana: '時[とき]は金[かね]なり', translation: 'Time is money', sourceTitle: 'Aesop' })
      ],
      { grouping: 'source', favoritesOnly: false },
      NOW,
      ID
    )
    expect(book.chapters.map((c) => c.title)).toEqual(['Aesop', 'Dune', 'Without a source'])
    const aesop = buildEpub(book).find((e) => e.name === 'OEBPS/chapter-001.xhtml')!.data
    expect(aesop).toContain('<ruby>時<rt>とき</rt></ruby>')
    expect(aesop).toContain('Time is money')
    const dune = buildEpub(book).find((e) => e.name === 'OEBPS/chapter-002.xhtml')!.data
    expect(dune).toContain('— Book One')
    expect(dune).toContain('Note: litany')
  })

  it('groups by theme with the source in each line, and filters favorites', () => {
    const quotes = [
      quote({ text: 'a', themes: ['Courage', 'Fear'], sourceTitle: 'Dune', favorite: true }),
      quote({ text: 'b', themes: [] })
    ]
    const byTheme = quotesBook(quotes, { grouping: 'theme', favoritesOnly: false }, NOW, ID)
    expect(byTheme.chapters.map((c) => c.title)).toEqual(['Courage', 'Fear', 'Without a theme'])
    expect(buildEpub(byTheme)[6].data).toContain('— Dune')
    const favorites = quotesBook(quotes, { grouping: 'source', favoritesOnly: true }, NOW, ID)
    expect(favorites.title).toBe('My Favorite Quotes')
    expect(favorites.chapters).toHaveLength(1)
    expect(() => quotesBook([], { grouping: 'source', favoritesOnly: false }, NOW, ID)).toThrow(/No quotes/)
  })

  it('makes one chapter per passage of a level, answers after the questions', () => {
    const n5 = JP_PASSAGES.filter((p) => p.level === 'N5')
    const book = readingsBook(JP_PASSAGES, 'N5', NOW, ID)
    expect(book.chapters).toHaveLength(n5.length)
    expect(book.language).toBe('ja')
    const first = buildEpub(book).find((e) => e.name === 'OEBPS/chapter-001.xhtml')!.data
    expect(first).toContain('<rt>')
    expect(first.indexOf('Questions')).toBeLessThan(first.indexOf('Answers'))
    // The title is shown without its furigana notation.
    expect(book.chapters[0].title).not.toMatch(/\[/)
  })
})

describe('making a book file', () => {
  it('writes an EPUB that the app reads back, and never overwrites', async () => {
    const books = await import('../src/main/kindle/kindleBooks')
    const made = await books.makeBook({ kind: 'jpReadings', level: 'N5' })
    expect(made.fileName).toMatch(/^Japanese Graded Readings N5 \d{4}-\d{2}-\d{2}\.epub$/)
    const abs = join(books.generatedDir(), made.fileName)

    const entries = (await listArchiveEntries(abs))!
    expect(entries[0]).toBe('mimetype')
    expect((await readArchiveEntry(abs, 'mimetype'))!.toString()).toBe('application/epub+zip')
    // The stored mimetype sits at a fixed offset: "PK..." then the name at byte 30.
    expect(readFileSync(abs).subarray(30, 38).toString()).toBe('mimetype')
    const info = await parseEpub(abs)
    expect(info?.title).toBe('Japanese Graded Readings N5')
    expect(info?.spine.length).toBe(JP_PASSAGES.filter((p) => p.level === 'N5').length)

    const again = await books.makeBook({ kind: 'jpReadings', level: 'N5' })
    expect(again.fileName).not.toBe(made.fileName)
    expect((await books.listBooks()).map((b) => b.fileName).sort()).toEqual([made.fileName, again.fileName].sort())
  })

  it('makes the quote book from the library', async () => {
    const quoteRepo = await import('../src/main/repos/quoteRepo')
    quoteRepo.save({ text: 'Fear is the mind-killer.', sourceTitle: 'Dune', origin: 'manual' })
    const books = await import('../src/main/kindle/kindleBooks')
    const made = await books.makeBook({ kind: 'quotes', grouping: 'source', favoritesOnly: false })
    const info = await parseEpub(join(books.generatedDir(), made.fileName))
    expect(info?.title).toBe('My Quotes')
  })

  it('accepts only known requests, and reveals only listed files', async () => {
    const books = await import('../src/main/kindle/kindleBooks')
    await expect(books.makeBook({ kind: 'jpReadings', level: 'N9' } as never)).rejects.toThrow(/level/)
    await expect(books.makeBook({ kind: 'other' } as never)).rejects.toThrow(/Unknown book/)
    await expect(books.revealBook('../../etc/passwd')).rejects.toThrow(/no longer there/)
  })
})
