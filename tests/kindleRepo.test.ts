import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import * as kindleRepo from '../src/main/repos/kindleRepo'
import * as quoteRepo from '../src/main/repos/quoteRepo'
import {
  planBook,
  planManga,
  type KoAnnotation,
  type KoSidecar,
  type ReadingDay,
  type SeriesFile
} from '../src/main/kindle/kindleCore'
import type { KindleApplySelection } from '../src/shared/types'

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

const TODAY = '2026-10-29'
const MD5 = 'e'.repeat(32)

beforeEach(() => {
  db = createTestDb()
})

function addBook(title: string, over: { status?: string; progress?: number; total?: number | null } = {}): number {
  return Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, status, progress, total_units) VALUES ('book', ?, ?, ?, ?)`
      )
      .run(title, over.status ?? 'Plan to Read', over.progress ?? 0, over.total === undefined ? 300 : over.total)
      .lastInsertRowid
  )
}

// On the board since the start of the year unless told otherwise; past days
// are judged by the item's rule history, so a later start credits nothing
// before it.
function boardBookSession(since = '2026-01-01 00:00:00'): void {
  db.prepare(`INSERT INTO checklist_task (task_key, cadence, created_at) VALUES ('book-session', 'daily', ?)`).run(
    since
  )
}

function ann(text: string, at: string, note: string | null = null): KoAnnotation {
  return { text, note, chapter: 'Chapter 1', datetime: at, pos0: null, pos1: null, page: null }
}

function sidecar(over: Partial<KoSidecar> = {}): KoSidecar {
  return {
    bookPath: 'documents/Dune.epub',
    partialMd5: MD5,
    title: 'Dune',
    authors: null,
    percent: 0.5,
    status: 'reading',
    annotations: [ann('Fear is the mind-killer.', '2026-10-20 10:00:00', 'litany')],
    ...over
  }
}

const DAYS: ReadingDay[] = [
  { day: '2026-10-27', seconds: 1800, pages: 12 },
  { day: '2026-10-28', seconds: 120, pages: 1 }
]

function plan(mediaId: number, s: KoSidecar | null = sidecar(), days = DAYS) {
  const input = kindleRepo.planInput(mediaId, s, days)!
  const creditable = kindleRepo.creditableDays(days.map((d) => d.day), TODAY)
  return planBook(input, TODAY, (day) => creditable.has(day))
}

function everything(mediaId: number, p: ReturnType<typeof plan>): KindleApplySelection {
  return {
    scanId: 'x',
    progress: [mediaId],
    status: [mediaId],
    quotes: p.quotes.map((q) => q.key),
    reading: [mediaId]
  }
}

describe('kindleRepo links', () => {
  it('links only books, keeps sent links, and unlinks only manual ones', () => {
    const book = addBook('Dune')
    const anime = Number(
      db.prepare(`INSERT INTO media_item (media_type, title) VALUES ('anime', 'Dune')`).run().lastInsertRowid
    )
    expect(() => kindleRepo.link(MD5, anime, null)).toThrow(/Only books/)
    expect(() => kindleRepo.link('nope', book, null)).toThrow()
    kindleRepo.link(MD5, book, 'documents/Dune.epub')
    expect(kindleRepo.links().get(MD5)).toMatchObject({ mediaId: book, origin: 'linked' })
    kindleRepo.unlink(MD5)
    expect(kindleRepo.links().size).toBe(0)

    db.prepare(`INSERT INTO kindle_book (partial_md5, media_id, device_path, origin) VALUES (?, ?, ?, 'sent')`).run(
      MD5,
      book,
      'documents/NaviHUB/Dune.epub'
    )
    expect(() => kindleRepo.link(MD5, book, null)).toThrow(/sent from NaviHUB/)
    // Unlinking a sent book forgets its library book but not the file record,
    // and relinking keeps it 'sent'.
    kindleRepo.unlink(MD5)
    expect(kindleRepo.links().size).toBe(0)
    expect(db.prepare('SELECT origin, device_path FROM kindle_book').get()).toEqual({
      origin: 'sent',
      device_path: 'documents/NaviHUB/Dune.epub'
    })
    kindleRepo.link(MD5, book, 'documents/elsewhere.epub')
    expect(kindleRepo.links().get(MD5)).toMatchObject({ origin: 'sent', devicePath: 'documents/NaviHUB/Dune.epub' })
    expect(() => kindleRepo.unlink('f'.repeat(32))).toThrow(/not linked/)
  })

  it('unlinks a device book when its library book is deleted', () => {
    const book = addBook('Dune')
    kindleRepo.link(MD5, book, null)
    db.prepare('DELETE FROM media_item WHERE id = ?').run(book)
    expect(kindleRepo.links().size).toBe(0)
    expect(db.prepare('SELECT media_id FROM kindle_book').get()).toEqual({ media_id: null })
  })
})

describe('kindleRepo apply', () => {
  it('applies progress, status, quotes and reading days, and a second run changes nothing', () => {
    boardBookSession()
    const book = addBook('Dune')
    const p = plan(book)
    const r = kindleRepo.apply([p], everything(book, p), TODAY)
    expect(r).toMatchObject({
      progressUpdated: 1,
      statusUpdated: 1,
      quotesAdded: 1,
      readingDays: 2,
      checklistCredits: 1
    })
    expect(db.prepare('SELECT status, progress FROM media_item WHERE id = ?').get(book)).toEqual({
      status: 'Reading',
      progress: 150
    })
    const quotes = quoteRepo.list({})
    expect(quotes).toHaveLength(1)
    expect(quotes[0]).toMatchObject({
      text: 'Fear is the mind-killer.',
      note: 'litany',
      locator: 'Chapter 1',
      origin: 'book',
      mediaId: book
    })
    const logs = db
      .prepare(`SELECT period_key, media_id FROM checklist_log WHERE task_key = 'book-session'`)
      .all()
    expect(logs).toEqual([{ period_key: '2026-10-27', media_id: book }])
    expect(kindleRepo.bookReading(book)).toMatchObject({ seconds: 1920, days: 2, lastDay: '2026-10-28' })

    const again = plan(book)
    expect(again.progress).toBeNull()
    expect(again.status).toBeNull()
    expect(again.quotes).toEqual([])
    expect(again.days).toEqual([])
  })

  it('applies only what was selected', () => {
    const book = addBook('Dune')
    const p = plan(book)
    const r = kindleRepo.apply([p], { scanId: 'x', progress: [book], status: [], quotes: [], reading: [] }, TODAY)
    expect(r).toMatchObject({ progressUpdated: 1, statusUpdated: 0, quotesAdded: 0, readingDays: 0 })
    expect(db.prepare('SELECT status FROM media_item WHERE id = ?').get(book)).toEqual({ status: 'Plan to Read' })
    // The unselected highlight is still offered next time.
    expect(plan(book).quotes).toHaveLength(1)
  })

  it('does not credit the checklist when the daily item is off the board', () => {
    const book = addBook('Dune')
    const p = plan(book)
    const r = kindleRepo.apply([p], everything(book, p), TODAY)
    expect(r.checklistCredits).toBe(0)
    expect(db.prepare(`SELECT COUNT(*) AS n FROM checklist_log`).get()).toEqual({ n: 0 })
  })

  it('credits only days the daily item was on the board, by its rule history', () => {
    boardBookSession('2026-10-28 12:00:00')
    const book = addBook('Dune')
    const p = plan(book, sidecar(), [
      { day: '2026-10-27', seconds: 1800, pages: 12 },
      { day: '2026-10-28', seconds: 1800, pages: 12 }
    ])
    expect(p.days.map((d) => [d.day, d.credit])).toEqual([
      ['2026-10-27', false],
      ['2026-10-28', true]
    ])
  })

  it('a checklist credit never changes the status the user left unticked', () => {
    boardBookSession()
    const book = addBook('Dune')
    const p = plan(book)
    const r = kindleRepo.apply([p], { scanId: 'x', progress: [], status: [], quotes: [], reading: [book] }, TODAY)
    expect(r.checklistCredits).toBe(1)
    expect(db.prepare('SELECT status FROM media_item WHERE id = ?').get(book)).toEqual({ status: 'Plan to Read' })
  })

  it('never re-imports a highlight whose quote was deleted', () => {
    const book = addBook('Dune')
    const p = plan(book)
    kindleRepo.apply([p], everything(book, p), TODAY)
    const id = quoteRepo.list({})[0].id!
    quoteRepo.remove(id)
    const again = plan(book)
    expect(again.quotes).toEqual([])
    expect(again.skippedDeleted).toBe(1)
  })

  it('updates a device-edited note but keeps the user\'s own edit', () => {
    const book = addBook('Dune')
    const p = plan(book)
    kindleRepo.apply([p], everything(book, p), TODAY)
    const id = quoteRepo.list({})[0].id!
    quoteRepo.setFavorite(id, true)

    const edited = sidecar({ annotations: [ann('Fear is the mind-killer.', '2026-10-20 10:00:00', 'litany v2')] })
    const p2 = plan(book, edited)
    expect(p2.quotes).toMatchObject([{ kind: 'update', note: 'litany v2' }])
    kindleRepo.apply([p2], everything(book, p2), TODAY)
    const q = quoteRepo.get(id)!
    expect(q.note).toBe('litany v2')
    expect(q.favorite).toBe(true)

    db.prepare(`UPDATE quote SET note = 'mine' WHERE id = ?`).run(id)
    const p3 = plan(book, sidecar({ annotations: [ann('Fear is the mind-killer.', '2026-10-20 10:00:00', 'v3')] }))
    expect(p3.quotes).toEqual([])
  })
})

describe('kindleRepo undo', () => {
  it('puts back status, progress, quotes, days and the checklist credit', () => {
    boardBookSession()
    const book = addBook('Dune')
    const p = plan(book)
    kindleRepo.apply([p], everything(book, p), TODAY)
    expect(kindleRepo.lastImport()?.undone).toBe(false)

    expect(kindleRepo.undoLast()).toEqual({ restored: 4, kept: 0 })
    expect(db.prepare('SELECT status, progress FROM media_item WHERE id = ?').get(book)).toEqual({
      status: 'Plan to Read',
      progress: 0
    })
    expect(quoteRepo.list({})).toHaveLength(0)
    expect(db.prepare('SELECT COUNT(*) AS n FROM kindle_reading_day').get()).toEqual({ n: 0 })
    expect(db.prepare('SELECT COUNT(*) AS n FROM checklist_log').get()).toEqual({ n: 0 })
    expect(kindleRepo.lastImport()?.undone).toBe(true)
    expect(() => kindleRepo.undoLast()).toThrow(/no Kindle import/)
    // Undone highlights are offered again.
    expect(plan(book).quotes).toHaveLength(1)
  })

  it('never deletes a quote the user favorited, and keeps the tombstone of one they deleted', () => {
    const book = addBook('Dune')
    const p = plan(
      book,
      sidecar({
        annotations: [ann('Kept line', '2026-10-20 10:00:00'), ann('Deleted line', '2026-10-21 10:00:00')]
      })
    )
    kindleRepo.apply([p], everything(book, p), TODAY)
    const byText = new Map(quoteRepo.list({}).map((q) => [q.text, q.id!]))
    quoteRepo.setFavorite(byText.get('Kept line')!, true)
    quoteRepo.remove(byText.get('Deleted line')!)

    const r = kindleRepo.undoLast()
    expect(r.kept).toBe(2) // the favorited quote, and the one already deleted
    expect(quoteRepo.list({}).map((q) => q.text)).toEqual(['Kept line'])
    const again = plan(
      book,
      sidecar({
        annotations: [ann('Kept line', '2026-10-20 10:00:00'), ann('Deleted line', '2026-10-21 10:00:00')]
      })
    )
    expect(again.quotes).toEqual([])
    expect(again.skippedDeleted).toBe(1)
  })

  it('keeps furigana added after a note-only update, and a credit the user removed by hand', () => {
    boardBookSession()
    const book = addBook('Dune')
    const first = plan(book)
    kindleRepo.apply([first], everything(book, first), TODAY)
    const id = quoteRepo.list({})[0].id!

    const p2 = plan(book, sidecar({ annotations: [ann('Fear is the mind-killer.', '2026-10-20 10:00:00', 'v2')] }), [
      { day: '2026-10-26', seconds: 1800, pages: 12 }
    ])
    kindleRepo.apply([p2], everything(book, p2), TODAY)
    db.prepare(`UPDATE quote SET furigana = 'x' WHERE id = ?`).run(id)
    const log = db.prepare(`SELECT id FROM checklist_log WHERE period_key = '2026-10-26'`).get() as { id: number }
    db.prepare('DELETE FROM checklist_log WHERE id = ?').run(log.id)

    const r = kindleRepo.undoLast()
    expect(r.kept).toBe(2)
    expect(db.prepare('SELECT furigana, note FROM quote WHERE id = ?').get(id)).toEqual({ furigana: 'x', note: 'v2' })
    // The hand-removed day stays marked, so it is never credited again.
    expect(plan(book, sidecar(), [{ day: '2026-10-26', seconds: 1800, pages: 12 }]).days).toEqual([])
  })

  it('credits one checklist day however many books were read that day', () => {
    boardBookSession()
    const a = addBook('Dune')
    const b = addBook('Neuromancer')
    db.prepare(
      `INSERT INTO checklist_log (task_key, cadence, period_key, media_id) VALUES ('book-session', 'daily', '2026-10-25', ?)`
    ).run(b)
    const p = plan(a, sidecar(), [
      { day: '2026-10-25', seconds: 1800, pages: 3 },
      { day: '2026-10-26', seconds: 1800, pages: 3 }
    ])
    expect(p.days.map((d) => [d.day, d.credit])).toEqual([
      ['2026-10-25', false],
      ['2026-10-26', true]
    ])
  })

  it('keeps anything the user changed after the import', () => {
    const book = addBook('Dune')
    const p = plan(book)
    kindleRepo.apply([p], everything(book, p), TODAY)
    const id = quoteRepo.list({})[0].id!
    db.prepare(`UPDATE quote SET note = 'my note' WHERE id = ?`).run(id)
    db.prepare(`UPDATE media_item SET progress = 200 WHERE id = ?`).run(book)

    const r = kindleRepo.undoLast()
    expect(r.kept).toBe(2)
    expect(quoteRepo.get(id)?.note).toBe('my note')
    expect(db.prepare('SELECT progress FROM media_item WHERE id = ?').get(book)).toEqual({ progress: 200 })
  })
})

// ---- manga series ----

function addManga(title: string, over: { status?: string; progress?: number; total?: number | null; dir?: string } = {}): number {
  return Number(
    db
      .prepare(
        `INSERT INTO media_item (media_type, title, status, progress, total_units, local_dir)
         VALUES ('manga', ?, ?, ?, ?, ?)`
      )
      .run(title, over.status ?? 'Plan to Read', over.progress ?? 0, over.total ?? null, over.dir ?? null)
      .lastInsertRowid
  )
}

const READ_CHAPTERS: SeriesFile[] = [1, 2, 3].map((n) => ({ unit: { kind: 'chapter', number: n }, read: true }))

describe('kindleRepo manga series', () => {
  it('links a series folder only to a manga, relinks, and unlinks', () => {
    const manga = addManga('Record of Ragnarok', { dir: 'Shuumatsu no Valkyrie' })
    const book = addBook('Dune')
    expect(() => kindleRepo.linkSeries('Shuumatsu no Valkyrie', book)).toThrow(/Only manga/)
    expect(() => kindleRepo.linkSeries('../escape', manga)).toThrow(/Not a Kindle series/)
    kindleRepo.linkSeries('Shuumatsu no Valkyrie', manga)
    expect(kindleRepo.seriesLinks().get('Shuumatsu no Valkyrie')?.mediaId).toBe(manga)
    const other = addManga('Other')
    kindleRepo.linkSeries('Shuumatsu no Valkyrie', other)
    expect(kindleRepo.seriesLinks().get('Shuumatsu no Valkyrie')?.mediaId).toBe(other)
    kindleRepo.unlinkSeries('Shuumatsu no Valkyrie')
    expect(kindleRepo.seriesLinks().size).toBe(0)
    expect(() => kindleRepo.unlinkSeries('Shuumatsu no Valkyrie')).toThrow(/not linked/)
  })

  it('offers both the title and the local folder name as candidates', () => {
    addManga('Record of Ragnarok', { dir: 'Shuumatsu no Valkyrie' })
    expect(kindleRepo.mangaCandidates().map((c) => c.match ?? c.title)).toEqual([
      'Record of Ragnarok',
      'Shuumatsu no Valkyrie'
    ])
  })

  it('forgets the link when the manga is deleted', () => {
    const manga = addManga('Berserk')
    kindleRepo.linkSeries('Berserk', manga)
    db.prepare('DELETE FROM media_item WHERE id = ?').run(manga)
    expect(kindleRepo.seriesLinks().size).toBe(0)
  })

  it('applies chapter progress and reading days without a checklist credit, and undoes them', () => {
    boardBookSession()
    const manga = addManga('Berserk', { progress: 1 })
    const input = kindleRepo.mangaPlanInput(manga, READ_CHAPTERS, DAYS)!
    const p = planManga(input, TODAY)
    const result = kindleRepo.apply([p], { scanId: 'x', progress: [manga], status: [manga], quotes: [], reading: [manga] }, TODAY)
    expect(result).toMatchObject({ progressUpdated: 1, statusUpdated: 1, readingDays: 2, checklistCredits: 0 })
    expect(db.prepare('SELECT status, progress FROM media_item WHERE id = ?').get(manga)).toEqual({
      status: 'Reading',
      progress: 3
    })
    expect(db.prepare('SELECT COUNT(*) AS n FROM checklist_log').get()).toEqual({ n: 0 })
    expect(kindleRepo.bookReading(manga).seconds).toBe(1920)

    // A second plan from the same device data changes nothing.
    expect(planManga(kindleRepo.mangaPlanInput(manga, READ_CHAPTERS, DAYS)!, TODAY)).toMatchObject({
      progress: null,
      status: null,
      days: []
    })

    kindleRepo.undoLast()
    expect(db.prepare('SELECT status, progress FROM media_item WHERE id = ?').get(manga)).toEqual({
      status: 'Plan to Read',
      progress: 1
    })
    expect(kindleRepo.bookReading(manga).seconds).toBe(0)
  })

  it('plans only manga', () => {
    expect(kindleRepo.mangaPlanInput(addBook('Dune'), READ_CHAPTERS, [])).toBeNull()
  })
})

describe('kindleRepo device presence', () => {
  beforeEach(() => {
    db = createTestDb()
  })

  it('marks a linked book gone from the device as removed, and restores it when seen again', () => {
    const book = addBook('Dune')
    kindleRepo.link(MD5, book, 'documents/Dune.epub')
    expect(kindleRepo.bookReading(book).onDevice).toBe(true)
    kindleRepo.reconcileOnDevice(new Set(), new Set())
    expect(kindleRepo.bookReading(book).onDevice).toBe(false)
    // Seen again by its path (an unopened copy has no fingerprint yet).
    kindleRepo.reconcileOnDevice(new Set(), new Set(['documents/Dune.epub']))
    expect(kindleRepo.bookReading(book).onDevice).toBe(true)
  })
})

