import { describe, expect, it } from 'vitest'
import { createHash } from 'crypto'
import { isLuaTable, luaArray, parseLuaLiteral } from '../src/main/kindle/luaLiteral'
import {
  aggregateReadingDays,
  annotationFingerprint,
  bookPathForSidecar,
  deviceFileName,
  freeFileName,
  hasChanges,
  hashStored,
  isNaviHubDevicePath,
  linkCandidates,
  mergeDeviceBooks,
  mergeForMedia,
  normalizeSidecar,
  onHoldStatus,
  partialMd5,
  isComicPath,
  isComicRead,
  parseKindleUnit,
  planBook,
  planManga,
  seriesKeyFor,
  splitLooseComics,
  statsProgressOf,
  suggestLinks,
  summarizeSeries,
  titleScore,
  type KoAnnotation,
  type KoSidecar,
  type SeriesFile,
  type PlanBookInput,
  type PlanMedia
} from '../src/main/kindle/kindleCore'

// A sidecar in the shape KOReader 2024+ writes (dump() of a Lua table).
const NEW_SIDECAR = `-- /mnt/us/documents/NaviHUB/Dune.sdr/metadata.epub.lua
return {
    ["annotations"] = {
        [1] = {
            ["chapter"] = "Book One: Dune",
            ["datetime"] = "2026-10-20 21:14:03",
            ["drawer"] = "lighten",
            ["pageno"] = 12,
            ["pos0"] = "/body/DocFragment[3]/body/p[2]/text().0",
            ["pos1"] = "/body/DocFragment[3]/body/p[2]/text().42",
            ["text"] = "I must not fear.\\
Fear is the mind-killer.",
        },
        [2] = {
            ["chapter"] = "Book One: Dune",
            ["datetime"] = "2026-10-21 08:00:00",
            ["page"] = "/body/DocFragment[5]/body/p[1]/text().0",
            ["pageno"] = 40,
            ["text"] = "in Book One: Dune",
        },
        [3] = {
            ["chapter"] = "Book One: Dune",
            ["datetime"] = "2026-10-22 09:30:00",
            ["note"] = "Paul's \\"test\\"",
            ["pos0"] = "/body/DocFragment[4]/body/p[9]/text().3",
            ["pos1"] = "/body/DocFragment[4]/body/p[9]/text().30",
            ["text"] = "\\227\\129\\130 the spice must flow",
        },
    },
    ["doc_path"] = "/mnt/us/documents/NaviHUB/Dune.epub",
    ["doc_props"] = {
        ["authors"] = "Frank Herbert",
        ["title"] = "Dune",
    },
    ["partial_md5_checksum"] = "0123456789ABCDEF0123456789abcdef",
    ["percent_finished"] = 0.4251,
    ["summary"] = {
        ["modified"] = "2026-10-22",
        ["status"] = "reading",
    },
}
`

describe('parseLuaLiteral', () => {
  it('reads nested tables, numbers, booleans and escapes', () => {
    const v = parseLuaLiteral(
      `return { a = 1, ["b"] = -2.5e1, [3] = true, c = { "x", 'y', [[long
string]] }, d = nil, e = math.huge, f = 0x1F, -- comment
      g = "tab\\tnl\\nq\\"\\65\\x42\\u{3042}" }`
    )
    expect(isLuaTable(v)).toBe(true)
    if (!isLuaTable(v)) return
    expect(v.a).toBe(1)
    expect(v.b).toBe(-25)
    expect(v['3']).toBe(true)
    expect(luaArray(v.c)).toEqual(['x', 'y', 'long\nstring'])
    expect('d' in v).toBe(false)
    expect(v.e).toBe(Infinity)
    expect(v.f).toBe(31)
    expect(v.g).toBe('tab\tnl\nq"ABあ')
  })

  it('decodes \\ddd escapes as UTF-8 bytes', () => {
    expect(parseLuaLiteral('"\\227\\129\\130"')).toBe('あ')
  })

  it('keeps __proto__ an ordinary key', () => {
    const v = parseLuaLiteral('{ ["__proto__"] = { polluted = true } }')
    expect(isLuaTable(v) && isLuaTable(v.__proto__)).toBe(true)
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })

  it('refuses anything that is not a literal', () => {
    expect(() => parseLuaLiteral('return os.execute("rm -rf /")')).toThrow()
    expect(() => parseLuaLiteral('{ a = 1 + 2 }')).toThrow()
    expect(() => parseLuaLiteral('{ a = 1 } trailing')).toThrow()
    expect(() => parseLuaLiteral('"unterminated')).toThrow()
    expect(() => parseLuaLiteral('{'.repeat(100) + '}'.repeat(100))).toThrow(/too deep/)
  })
})

describe('normalizeSidecar', () => {
  it('reads progress, status, identity and highlights from a 2024+ sidecar', () => {
    const s = normalizeSidecar(
      parseLuaLiteral(NEW_SIDECAR),
      'documents/NaviHUB/Dune.sdr/metadata.epub.lua'
    )!
    expect(s.bookPath).toBe('documents/NaviHUB/Dune.epub')
    expect(s.partialMd5).toBe('0123456789abcdef0123456789abcdef')
    expect(s.title).toBe('Dune')
    expect(s.authors).toBe('Frank Herbert')
    expect(s.percent).toBeCloseTo(0.4251)
    expect(s.status).toBe('reading')
    // The page bookmark (text, but no selection) is skipped.
    expect(s.annotations).toHaveLength(2)
    expect(s.annotations[0].text).toBe('I must not fear.\nFear is the mind-killer.')
    expect(s.annotations[0].chapter).toBe('Book One: Dune')
    expect(s.annotations[1].note).toBe('Paul\'s "test"')
    expect(s.annotations[1].text).toBe('あ the spice must flow')
  })

  it('reads legacy highlight and bookmark tables, taking edited notes only', () => {
    const legacy = `return {
      ["highlight"] = {
        [7] = { [1] = { ["text"] = "Old highlight", ["datetime"] = "2023-01-01 10:00:00",
                        ["chapter"] = "One", ["pos0"] = "/x.0", ["pos1"] = "/x.9" } },
        [9] = { [1] = { ["text"] = "Second", ["datetime"] = "2023-01-02 10:00:00" } },
      },
      ["bookmarks"] = {
        [1] = { ["datetime"] = "2023-01-01 10:00:00", ["text"] = "My own note", ["highlighted"] = true },
        [2] = { ["datetime"] = "2023-01-02 10:00:00",
                ["text"] = "Page 9 Second @ 2023-01-02 10:00:00", ["highlighted"] = true },
      },
      ["summary"] = { ["status"] = "complete" },
    }`
    const s = normalizeSidecar(parseLuaLiteral(legacy), 'documents/Old.sdr/metadata.pdf.lua')!
    expect(s.bookPath).toBe('documents/Old.pdf')
    expect(s.status).toBe('complete')
    expect(s.annotations.map((a) => [a.text, a.note])).toEqual([
      ['Old highlight', 'My own note'],
      ['Second', null]
    ])
  })

  it('maps the three sidecar locations to the book path', () => {
    expect(bookPathForSidecar('documents/a/B c.sdr/metadata.epub.lua')).toBe('documents/a/B c.epub')
    expect(bookPathForSidecar('koreader/docsettings/mnt/us/documents/a/B.sdr/metadata.cbz.lua')).toBe(
      'documents/a/B.cbz'
    )
    expect(bookPathForSidecar('koreader/hashdocsettings/01/0123.sdr/metadata.epub.lua')).toBeNull()
    expect(bookPathForSidecar('documents/../x.sdr/metadata.epub.lua')).toBeNull()
  })

  it('names a CBZ from its statistics block when doc_props is empty', () => {
    const s = normalizeSidecar(
      parseLuaLiteral(
        '{ ["doc_props"] = {}, ["stats"] = { ["title"] = "Monster - Chapter 001", ["authors"] = "N/A" } }'
      ),
      'documents/Downloads/Monster/Monster - Chapter 001.sdr/metadata.cbz.lua'
    )!
    expect(s.title).toBe('Monster - Chapter 001')
    expect(s.authors).toBeNull()
    expect(s.bookPath).toBe('documents/Downloads/Monster/Monster - Chapter 001.cbz')
  })

  it('ignores a doc_path outside the user storage', () => {
    const s = normalizeSidecar(
      parseLuaLiteral('{ ["doc_path"] = "/etc/passwd" }'),
      'documents/B.sdr/metadata.epub.lua'
    )!
    expect(s.bookPath).toBe('documents/B.epub')
  })
})

describe('partialMd5', () => {
  it('hashes 1 KiB samples at 0, 1 KiB, 4 KiB, 16 KiB … and stops past the end', async () => {
    const file = Buffer.alloc(20_000)
    for (let i = 0; i < file.length; i++) file[i] = (i * 31) % 251
    const read = async (offset: number, length: number): Promise<Buffer> =>
      file.subarray(offset, Math.min(file.length, offset + length))
    const expected = createHash('md5')
      .update(file.subarray(0, 1024))
      .update(file.subarray(1024, 2048))
      .update(file.subarray(4096, 5120))
      .update(file.subarray(16384, 17408))
      .digest('hex')
    expect(await partialMd5(read)).toBe(expected)
  })
})

describe('aggregateReadingDays', () => {
  const md5 = 'a'.repeat(32)

  it('groups the per-day rows by book and drops days after today', () => {
    const { byMd5, future } = aggregateReadingDays(
      [
        { md5: md5.toUpperCase(), day: '2026-10-21', seconds: 45, pages: 1 },
        { md5, day: '2026-10-20', seconds: 180, pages: 2 },
        { md5, day: '2026-11-20', seconds: 45, pages: 1 },
        { md5: null, day: '2026-10-20', seconds: 99, pages: 1 },
        { md5, day: '2026-10-19', seconds: 0, pages: 0 },
        { md5, day: 'garbage', seconds: 10, pages: 1 }
      ],
      '2026-10-25'
    )
    expect(byMd5.get(md5)).toEqual([
      { day: '2026-10-20', seconds: 180, pages: 2 },
      { day: '2026-10-21', seconds: 45, pages: 1 }
    ])
    expect(future).toBe(1)
  })
})

describe('title matching', () => {
  it('scores exact, contained and shared-word titles', () => {
    expect(titleScore('Dune', 'dune')).toBe(1)
    expect(titleScore('The Hobbit.epub', 'The Hobbit')).toBe(1)
    expect(titleScore('Dune Messiah', 'Dune Messiah: Book Two')).toBe(0.85)
    expect(titleScore('ノルウェイの森 上', 'ノルウェイの森')).toBe(0.85)
    expect(titleScore('Pride and Prejudice', 'War and Peace')).toBe(0)
  })

  it('suggests the best library matches, best first', () => {
    const c = linkCandidates([
      { id: 1, title: 'Dune' },
      { id: 2, title: 'Dune Messiah' },
      { id: 3, title: 'Neuromancer' }
    ])
    expect(suggestLinks('Dune', c).map((s) => s.mediaId)).toEqual([1, 2])
    expect(suggestLinks('Something else', c)).toEqual([])
  })
})

describe('file names', () => {
  it('makes a name legal on FAT, NTFS and MTP', () => {
    expect(deviceFileName('Re:Zero / Vol. 1?', 'EPUB')).toBe('Re Zero Vol. 1.epub')
    expect(deviceFileName('CON', 'epub')).toBe('CON book.epub')
    // At most 200 UTF-8 bytes: 120 Japanese characters would be 360.
    const jp = deviceFileName('漢'.repeat(120), 'epub')
    expect(Buffer.byteLength(jp, 'utf8')).toBeLessThanOrEqual(205)
    expect(jp).toBe(`${'漢'.repeat(66)}.epub`)
    // A leading dot would hide the file on the Kindle.
    expect(deviceFileName('.hack//Sign', 'epub')).toBe('hack Sign.epub')
    // Truncated by code point, never splitting a surrogate pair, and cleaned
    // of a trailing dot or space the truncation exposes.
    const astral = deviceFileName(`${'a'.repeat(119)}\u{20000}tail`, 'epub')
    expect(astral).toBe(`${'a'.repeat(119)}\u{20000}.epub`)
    expect(deviceFileName(`${'b'.repeat(119)}. more`, 'epub')).toBe(`${'b'.repeat(119)}.epub`)
    expect(deviceFileName('...', 'epub')).toBe('Book.epub')
    expect(deviceFileName('x'.repeat(300), 'cbz')).toBe(`${'x'.repeat(120)}.cbz`)
  })

  it('never reuses a taken name, case-insensitively', () => {
    expect(freeFileName('Dune.epub', ['dune.EPUB', 'Dune (2).epub'])).toBe('Dune (3).epub')
    expect(freeFileName('Dune.epub', [])).toBe('Dune.epub')
  })

  it('allows writes only inside documents/NaviHUB', () => {
    expect(isNaviHubDevicePath('documents/NaviHUB/Dune.epub')).toBe(true)
    expect(isNaviHubDevicePath('documents/NaviHUB')).toBe(false)
    expect(isNaviHubDevicePath('documents/NaviHUB/../Other.epub')).toBe(false)
    expect(isNaviHubDevicePath('documents/Other.epub')).toBe(false)
    expect(isNaviHubDevicePath('documents/NaviHUBX/a.epub')).toBe(false)
  })
})

describe('mergeForMedia', () => {
  it('merges two files of one book: furthest percent, strongest status, summed days, distinct highlights', () => {
    const base = {
      sidecarPath: 'x',
      bookPath: null,
      partialMd5: null,
      title: null,
      authors: null
    }
    const shared = ann({ text: 'Shared' })
    const merged = mergeForMedia([
      {
        key: '1',
        md5: '1'.repeat(32),
        devicePath: null,
        title: 'A',
        authors: null,
        sidecar: { ...base, percent: 0.3, status: 'reading', annotations: [shared] },
        days: [{ day: '2026-10-20', seconds: 2400, pages: 10 }]
      },
      {
        key: '2',
        md5: '2'.repeat(32),
        devicePath: null,
        title: 'A',
        authors: null,
        sidecar: {
          ...base,
          percent: 0.6,
          status: 'complete',
          annotations: [shared, ann({ text: 'Only here', datetime: '2026-10-22 10:00:00' })]
        },
        days: [{ day: '2026-10-20', seconds: 1800, pages: 4 }]
      }
    ])
    // Two linked files are different content (volumes, editions): neither
    // one's position or finished status is the book's.
    expect(merged.sidecar?.percent).toBeNull()
    expect(merged.sidecar?.status).toBeNull()
    expect(merged.sidecar?.annotations.map((a) => a.text)).toEqual(['Shared', 'Only here'])
    expect(merged.days).toEqual([{ day: '2026-10-20', seconds: 4200, pages: 14 }])
  })
})

describe('mergeDeviceBooks', () => {
  it('joins sidecars, statistics and files, one record per book', () => {
    const md5 = 'b'.repeat(32)
    const books = mergeDeviceBooks(
      [
        {
          sidecarPath: 'documents/A.sdr/metadata.epub.lua',
          bookPath: 'documents/A.epub',
          partialMd5: md5,
          title: null,
          authors: null,
          percent: 0.5,
          status: 'reading',
          annotations: []
        }
      ],
      [
        { md5, title: 'A from stats', authors: 'Someone', pages: 40, maxPage: 40 },
        { md5: 'c'.repeat(32), title: 'Deleted book', authors: null }
      ],
      [{ path: 'documents/A.epub' }, { path: 'documents/Unopened.cbz' }],
      new Map([[md5, [{ day: '2026-10-20', seconds: 600, pages: 5 }]]])
    )
    expect(books.map((b) => [b.title, b.md5 != null, b.days.length])).toEqual([
      ['A', true, 1],
      ['Deleted book', true, 0],
      ['Unopened', false, 0]
    ])
    expect(books[0].authors).toBe('Someone')
    expect(books[0].statsProgress).toBe(1)
    expect(books[1].statsProgress).toBeNull()
  })
})

// ---- the planner ----

const STATUSES = ['Reading', 'Completed', 'On Hold', 'Dropped', 'Plan to Read']

function media(over: Partial<PlanMedia> = {}): PlanMedia {
  return { id: 7, title: 'Dune', status: 'Plan to Read', progress: 0, totalUnits: 400, statuses: STATUSES, ...over }
}

function ann(over: Partial<KoAnnotation> = {}): KoAnnotation {
  return {
    text: 'A line',
    note: null,
    chapter: 'One',
    datetime: '2026-10-20 10:00:00',
    pos0: '/a.0',
    pos1: '/a.5',
    page: null,
    ...over
  }
}

function input(over: Partial<PlanBookInput> = {}, sidecarOver = {}): PlanBookInput {
  return {
    media: media(),
    sidecar: {
      bookPath: 'documents/NaviHUB/Dune.epub',
      partialMd5: 'd'.repeat(32),
      title: 'Dune',
      authors: null,
      percent: 0.25,
      status: 'reading',
      annotations: [],
      ...sidecarOver
    },
    days: [],
    annotations: new Map(),
    storedDays: new Map(),
    loggedDays: new Set(),
    ...over
  }
}

describe('onHoldStatus', () => {
  it('finds on hold by name, else the default third position, else none', () => {
    expect(onHoldStatus(['Reading', 'Completed', 'Paused', 'Dropped', 'Plan'])).toBe('Paused')
    expect(onHoldStatus(['Reading', 'Completed', 'Waiting', 'Dropped', 'Plan'])).toBe('Waiting')
    expect(onHoldStatus(['Reading', 'Completed', 'Dropped', 'Plan to Read'])).toBeNull()
    expect(onHoldStatus(['Reading', 'Completed', 'Plan to Read'])).toBeNull()
  })
})

describe('planBook', () => {
  const today = '2026-10-29'
  const yes = (): boolean => true

  it('moves progress forward from the percentage and starts a planned book', () => {
    const p = planBook(input(), today, yes)
    expect(p.progress).toEqual({ from: 0, to: 100, total: 400 })
    expect(p.status).toEqual({ from: 'Plan to Read', to: 'Reading', reason: 'started' })
  })

  it('never moves progress backwards', () => {
    const p = planBook(input({ media: media({ status: 'Reading', progress: 300 }) }), today, yes)
    expect(p.progress).toBeNull()
    expect(p.status).toBeNull()
  })

  it('completes only on KOReader\'s finished status, at the full page count', () => {
    const at99 = planBook(input({}, { percent: 0.995 }), today, yes)
    expect(at99.status?.to).toBe('Reading')
    const done = planBook(input({}, { status: 'complete', percent: 0.9 }), today, yes)
    expect(done.status).toEqual({ from: 'Plan to Read', to: 'Completed', reason: 'finished' })
    expect(done.progress).toEqual({ from: 0, to: 400, total: 400 })
  })

  it('offers KOReader on hold (stored as abandoned) as on hold, unticked by default', () => {
    const p = planBook(input({ media: media({ status: 'Reading' }) }, { status: 'abandoned', percent: 0 }), today, yes)
    expect(p.status).toEqual({ from: 'Reading', to: 'On Hold', reason: 'abandoned' })
    expect(p.statusDefaultOn).toBe(false)
  })

  it('flags a re-read of a completed book and changes nothing', () => {
    const p = planBook(input({ media: media({ status: 'Completed', progress: 400 }) }), today, yes)
    expect(p.rereading).toBe(true)
    expect(p.progress).toBeNull()
    expect(p.status).toBeNull()
  })

  it('leaves progress alone when the book has no page count', () => {
    const p = planBook(input({ media: media({ totalUnits: null }) }), today, yes)
    expect(p.progress).toBeNull()
  })

  it('imports new highlights and never brings back a deleted one', () => {
    const a1 = ann()
    const a2 = ann({ datetime: '2026-10-21 10:00:00', text: 'Deleted later' })
    const p = planBook(
      input(
        {
          annotations: new Map([
            [
              annotationFingerprint(a2),
              { quoteId: 5, quote: null, importedTextHash: hashStored('Deleted later'), importedNoteHash: hashStored(null) }
            ]
          ])
        },
        { annotations: [a1, a2] }
      ),
      today,
      yes
    )
    expect(p.quotes.map((q) => [q.kind, q.text, q.locator])).toEqual([['new', 'A line', 'One']])
    expect(p.skippedDeleted).toBe(1)
  })

  it('keys a highlight independently of the others on the device', () => {
    const a = ann({ text: 'A', pos0: '/a.0' })
    const b = ann({ text: 'B', pos0: '/b.0' })
    expect(annotationFingerprint(b)).not.toBe(annotationFingerprint(a))
    const both = planBook(input({}, { annotations: [a, b] }), today, yes)
    const onlyB = planBook(input({}, { annotations: [b] }), today, yes)
    expect(onlyB.quotes[0].key).toBe(both.quotes[1].key)
  })

  it('does not list a re-read alone, and only new reading starts a planned book', () => {
    const reread = planBook(input({ media: media({ status: 'Completed', progress: 400 }) }), today, yes)
    expect(reread.rereading).toBe(true)
    expect(hasChanges(reread)).toBe(false)
    const stored = planBook(
      input(
        {
          days: [{ day: '2026-10-20', seconds: 600, pages: 3 }],
          storedDays: new Map([['2026-10-20', { seconds: 600, credited: true }]])
        },
        { percent: null }
      ),
      today,
      yes
    )
    expect(stored.status).toBeNull()
  })

  it('keeps two highlights made in the same second', () => {
    const p = planBook(
      input({}, { annotations: [ann({ text: 'First', pos0: '/a.0' }), ann({ text: 'Second', pos0: '/b.0' })] }),
      today,
      yes
    )
    expect(p.quotes.map((q) => q.text)).toEqual(['First', 'Second'])
    expect(new Set(p.quotes.map((q) => q.key)).size).toBe(2)
  })

  it('updates a device-edited note only when the user has not edited it', () => {
    const a = ann({ note: 'new device note' })
    const state = (quoteNote: string | null) =>
      new Map([
        [
          annotationFingerprint(a),
          {
            quoteId: 9,
            quote: { text: 'A line', note: quoteNote },
            importedTextHash: hashStored('A line'),
            importedNoteHash: hashStored('old note')
          }
        ]
      ])
    const untouched = planBook(input({ annotations: state('old note') }, { annotations: [a] }), today, yes)
    expect(untouched.quotes).toMatchObject([{ kind: 'update', note: 'new device note', setNote: true, setText: false }])
    const edited = planBook(input({ annotations: state('my own words') }, { annotations: [a] }), today, yes)
    expect(edited.quotes).toEqual([])
  })

  it('credits each reading day of 5+ minutes once, inside the checklist window', () => {
    const p = planBook(
      input({
        media: media({ status: 'Reading', progress: 100 }),
        days: [
          { day: '2025-01-01', seconds: 3600, pages: 10 }, // outside the window
          { day: '2026-10-20', seconds: 200, pages: 2 }, // under 5 minutes
          { day: '2026-10-21', seconds: 900, pages: 6 },
          { day: '2026-10-22', seconds: 900, pages: 6 }, // already logged by hand
          { day: '2026-10-23', seconds: 900, pages: 6 }, // already credited, unchanged
          { day: '2026-10-24', seconds: 1200, pages: 6 }, // stored lower: raised
          { day: '2026-11-01', seconds: 900, pages: 6 } // after today
        ],
        storedDays: new Map([
          ['2026-10-23', { seconds: 900, credited: true }],
          ['2026-10-24', { seconds: 600, credited: true }]
        ]),
        loggedDays: new Set(['2026-10-22'])
      }),
      today,
      yes
    )
    expect(p.days.map((d) => [d.day, d.seconds, d.credit])).toEqual([
      ['2025-01-01', 3600, false],
      ['2026-10-20', 200, false],
      ['2026-10-21', 900, true],
      ['2026-10-22', 900, false],
      ['2026-10-24', 1200, false]
    ])
    expect(p.reading?.credits).toBe(1)
    const noBoard = planBook(input({ days: [{ day: '2026-10-21', seconds: 900, pages: 6 }] }), today, () => false)
    expect(noBoard.days[0].credit).toBe(false)
    const offSchedule = planBook(
      input({ days: [{ day: '2026-10-21', seconds: 900, pages: 6 }, { day: '2026-10-22', seconds: 900, pages: 6 }] }),
      today,
      (day) => day === '2026-10-22'
    )
    expect(offSchedule.days.map((d) => d.credit)).toEqual([false, true])
  })
})

// ---- manga ----

describe('manga series on the device', () => {
  it('groups comic files by their folder under documents/', () => {
    expect(isComicPath('documents/Berserk/Berserk - Vol 01.cbz')).toBe(true)
    expect(isComicPath('documents/Dune.epub')).toBe(false)
    expect(seriesKeyFor('documents/Berserk/Berserk - Vol 01.cbz')).toBe('Berserk')
    expect(seriesKeyFor('documents/Manga/Berserk/x.cbz')).toBe('Manga/Berserk')
    // A comic directly in documents/ is its own series.
    expect(seriesKeyFor('documents/Re Zero (Novel).cbz')).toBe('Re Zero (Novel)')
    // Outside documents/, unsafe, or in the folder Send to Kindle owns.
    expect(seriesKeyFor('koreader/x.cbz')).toBeNull()
    expect(seriesKeyFor('documents/../x.cbz')).toBeNull()
    expect(seriesKeyFor('documents/NaviHUB/Berserk/x.cbz')).toBeNull()
  })

  // Names as they are in the user's Kindle-ready mirror.
  it.each([
    ['Solanin - Ch 004.cbz', 'Solanin', { kind: 'chapter', number: 4 }],
    ['Berserk - Vol 03 Ch 012.cbz', 'Berserk', { kind: 'chapter', number: 12, volume: 3 }],
    ['Berserk - Vol 03 Ch 012 Part 2.cbz', 'Berserk', { kind: 'chapter', number: 12, volume: 3 }],
    ['Ajin - Ch 010.5.cbz', 'Ajin', { kind: 'chapter', number: 10.5 }],
    ['Berserk - Vol 33 Ch 287.297.cbz', 'Berserk', { kind: 'chapter', number: 297, volume: 33 }],
    ['Onepunch-Man - Ch 187.005.cbz', 'Onepunch-Man', { kind: 'chapter', number: 187.005 }],
    ['NANA - Chapter 21.cbz', 'NANA', { kind: 'chapter', number: 21 }],
    ['Berserk - Vol 01.cbz', 'Berserk', { kind: 'volume', number: 1 }],
    ['Freesia - Vol 2 Part 1.cbz', 'Freesia', { kind: 'volume', number: 2 }],
    ['012.cbz', 'Any', { kind: 'chapter', number: 12 }],
    ['Weekly Shonen Jump 2019-01.cbz', 'Weekly Shonen Jump', { kind: 'other' }],
    ['Berserk - berserk_artbook Berserk Artbook.cbz', 'Berserk', { kind: 'other' }],
    ["Zero no Tsukaima - Zero's Familiar - Tabitha's Adventure - Vol 2.cbz", 'Zero no Tsukaima', { kind: 'volume', number: 2 }]
  ])('reads %s as %o', (file, series, unit) => {
    expect(parseKindleUnit(file, series)).toEqual(unit)
  })

  it('falls back to the statistics only when a comic sidecar has no position', () => {
    const side = (over: Partial<KoSidecar>): KoSidecar => ({
      partialMd5: null,
      bookPath: null,
      title: null,
      authors: null,
      percent: null,
      status: null,
      annotations: [],
      ...over
    })
    expect(statsProgressOf(47, 47)).toBe(1)
    expect(statsProgressOf(47, 17)).toBeCloseTo(17 / 47)
    expect(statsProgressOf(null, 17)).toBeNull()
    expect(statsProgressOf(0, 3)).toBeNull()
    // Steel Ball Run on the user's device: a sidecar with no percent_finished.
    expect(isComicRead(side({}), 1)).toBe(true)
    expect(isComicRead(side({}), 17 / 47)).toBe(false)
    expect(isComicRead(null, 1)).toBe(true)
    // A sidecar position always wins over the statistics.
    expect(isComicRead(side({ percent: 0.2 }), 1)).toBe(false)
  })

  it('keeps a series whole when it has a subfolder of extras', () => {
    const series = new Map([
      ['Berserk', ['documents/Berserk/Berserk - Vol 01.cbz', 'documents/Berserk/Berserk - Vol 02.cbz']],
      ['Berserk/Extras', ['documents/Berserk/Extras/Artbook.cbz']]
    ])
    expect([...splitLooseComics(series, (p) => p).keys()].sort()).toEqual(['Berserk', 'Berserk/Extras'])
  })

  it('makes each loose comic beside series folders a series of its own', () => {
    const series = new Map([
      ['Downloads', ['documents/Downloads/Stray One.cbz', 'documents/Downloads/Stray Two.cbz']],
      ['Downloads/Monster', ['documents/Downloads/Monster/Monster - Chapter 001.cbz']],
      ['Solo', ['documents/Solo/Solo - Ch 001.cbz']]
    ])
    expect([...splitLooseComics(series, (p) => p).keys()].sort()).toEqual([
      'Downloads/Monster',
      'Downloads/Stray One',
      'Downloads/Stray Two',
      'Solo'
    ])
  })

  it('counts a file read when finished or read to the last page', () => {
    const side = (over: Partial<KoSidecar>): KoSidecar => ({
      partialMd5: null,
      bookPath: null,
      title: null,
      authors: null,
      percent: null,
      status: null,
      annotations: [],
      ...over
    })
    expect(isComicRead(null)).toBe(false)
    expect(isComicRead(side({ status: 'complete', percent: 0.2 }))).toBe(true)
    expect(isComicRead(side({ percent: 1 }))).toBe(true)
    expect(isComicRead(side({ percent: 0.9 }))).toBe(false)
  })

  it('counts a chapter only when every part of it is read', () => {
    const f = (kind: 'chapter' | 'volume', number: number, read: boolean): SeriesFile => ({
      unit: { kind, number },
      read
    })
    const summary = summarizeSeries([
      f('chapter', 1, true),
      f('chapter', 2, true),
      f('chapter', 3, true),
      f('chapter', 3, false), // part 2 of chapter 3 unread
      f('volume', 1, true),
      f('volume', 2, false),
      f('volume', 3, true),
      { unit: { kind: 'other' }, read: true }
    ])
    expect(summary).toEqual({ files: 8, lastChapter: 2, lastFinished: false, chaptersRead: 2, numbering: 'series', volumesRead: [1, 3] })
  })

  it('counts chapters in order when their numbers restart in each volume', () => {
    // "20th Century Boys - Vol 01 Ch 001" ... "Vol 02 Ch 001": numbers restart.
    const f = (volume: number, number: number, read: boolean): SeriesFile => ({
      unit: { kind: 'chapter', number, volume },
      read
    })
    const summary = summarizeSeries([f(1, 1, true), f(1, 2, true), f(2, 1, true), f(2, 2, false), f(3, 1, false)])
    expect(summary).toMatchObject({ numbering: 'per-volume', lastChapter: 3, chaptersRead: 3 })
    // Restarting numbers beside whole-volume files: no position is counted.
    expect(
      summarizeSeries([f(1, 1, true), f(2, 1, true), { unit: { kind: 'volume', number: 3 }, read: true }])
    ).toMatchObject({ numbering: 'unclear', lastChapter: null })
    // Series-wide numbers beside their volume stay as they are.
    expect(summarizeSeries([f(1, 1, true), f(1, 2, true), f(2, 3, true)])).toMatchObject({
      numbering: 'series',
      lastChapter: 3
    })
  })

  it('suggests a manga by its local folder name, once per manga', () => {
    const candidates = linkCandidates([
      { id: 222, title: 'Record of Ragnarok' },
      { id: 222, title: 'Record of Ragnarok', match: 'Shuumatsu no Valkyrie' },
      { id: 218, title: 'Berserk' },
      { id: 218, title: 'Berserk', match: 'Berserk' }
    ])
    expect(suggestLinks('Shuumatsu no Valkyrie', candidates)).toEqual([
      { mediaId: 222, title: 'Record of Ragnarok', score: 1 }
    ])
    expect(suggestLinks('Berserk', candidates)).toHaveLength(1)
  })
})

describe('planManga', () => {
  const MANGA_STATUSES = ['Reading', 'Completed', 'On Hold', 'Dropped', 'Plan to Read']
  const chapters = (...read: boolean[]): SeriesFile[] =>
    read.map((r, i) => ({ unit: { kind: 'chapter', number: i + 1 }, read: r, finished: r }))
  const input = (
    over: Partial<PlanMedia> = {},
    files: SeriesFile[] = chapters(true, true, true),
    days: Array<{ day: string; seconds: number; pages: number }> = []
  ) => ({
    media: { id: 20, title: 'Berserk', status: 'Plan to Read', progress: 0, totalUnits: null, statuses: MANGA_STATUSES, ...over },
    files,
    days,
    storedDays: new Map()
  })

  it('raises chapter progress to the highest read chapter and starts the series', () => {
    const plan = planManga(input({ progress: 1 }), '2026-11-12')
    expect(plan.kind).toBe('manga')
    expect(plan.progress).toEqual({ from: 1, to: 3, total: null })
    expect(plan.status).toEqual({ from: 'Plan to Read', to: 'Reading', reason: 'started' })
  })

  it('never lowers progress, and offers nothing past a known total', () => {
    expect(planManga(input({ status: 'Reading', progress: 5 }), '2026-11-12').progress).toBeNull()
    const beyond = planManga(input({ status: 'Reading', totalUnits: 2 }), '2026-11-12')
    expect(beyond.progress).toBeNull()
    expect(hasChanges(beyond)).toBe(false)
  })

  it('completes a series already at its total when the last chapter is finished', () => {
    // Progress set to the total by hand; nothing to raise, but the status follows.
    const plan = planManga(input({ status: 'Reading', progress: 3, totalUnits: 3 }), '2026-11-12')
    expect(plan.progress).toBeNull()
    expect(plan.status).toEqual({ from: 'Reading', to: 'Completed', reason: 'finished' })
  })

  it('completes only when the chapters reach a known total', () => {
    const done = planManga(input({ status: 'Reading', totalUnits: 3 }), '2026-11-12')
    expect(done.status).toEqual({ from: 'Reading', to: 'Completed', reason: 'finished' })
    const open = planManga(input({ status: 'Reading' }), '2026-11-12')
    expect(open.status).toBeNull()
  })

  it('needs KOReader\'s finished status on the last chapter to complete', () => {
    // Chapter 3 read to 99 percent counts as read but was never marked finished.
    const files: SeriesFile[] = [
      ...chapters(true, true),
      { unit: { kind: 'chapter', number: 3 }, read: true, finished: false }
    ]
    const plan = planManga(input({ status: 'Reading', totalUnits: 3 }, files), '2026-11-12')
    expect(plan.progress).toEqual({ from: 0, to: 3, total: 3 })
    expect(plan.status).toBeNull()
  })

  it('leaves a completed series alone', () => {
    const plan = planManga(input({ status: 'Completed', progress: 1, totalUnits: 3 }), '2026-11-12')
    expect(plan.progress).toBeNull()
    expect(plan.status).toBeNull()
  })

  it('offers a counted chapter, and the status it implies, unticked', () => {
    const files: SeriesFile[] = [
      { unit: { kind: 'chapter', number: 1, volume: 1 }, read: true },
      { unit: { kind: 'chapter', number: 1, volume: 2 }, read: true }
    ]
    const plan = planManga(input({}, files), '2026-11-12')
    expect(plan).toMatchObject({
      progress: { from: 0, to: 2, total: null },
      progressDefaultOn: false,
      chapterNumbering: 'per-volume',
      statusDefaultOn: false
    })
    expect(planManga(input({ progress: 1 }), '2026-11-12')).toMatchObject({
      progressDefaultOn: true,
      chapterNumbering: 'series',
      statusDefaultOn: true
    })
  })

  it('reports volumes without turning them into chapters', () => {
    const vols: SeriesFile[] = [
      { unit: { kind: 'volume', number: 1 }, read: true },
      { unit: { kind: 'volume', number: 2 }, read: true }
    ]
    const plan = planManga(input({ status: 'Reading' }, vols), '2026-11-12')
    expect(plan.progress).toBeNull()
    expect(plan.volumesRead).toEqual([1, 2])
  })

  it('records reading days but never credits the checklist', () => {
    const plan = planManga(
      input({ status: 'Reading', progress: 3 }, chapters(true), [{ day: '2026-11-10', seconds: 1200, pages: 40 }]),
      '2026-11-12'
    )
    expect(plan.days).toEqual([{ day: '2026-11-10', seconds: 1200, pages: 40, credit: false }])
    expect(plan.reading?.credits).toBe(0)
  })
})

describe('reading-day bounds', () => {
  it('caps a day at 24 hours', () => {
    const md5 = 'd'.repeat(32)
    const { byMd5 } = aggregateReadingDays(
      [
        { md5, day: '2026-11-10', seconds: 80000, pages: 3 },
        { md5, day: '2026-11-10', seconds: 80000, pages: 2 }
      ],
      '2026-11-17'
    )
    expect(byMd5.get(md5)).toEqual([{ day: '2026-11-10', seconds: 86400, pages: 5 }])
  })
})
