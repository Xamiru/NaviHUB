import { describe, expect, it } from 'vitest'
import { buildIndex } from '../src/main/history/historyIndex'
import {
  article,
  backlinks,
  decade,
  overview,
  search,
  sourceRows,
  sourceView,
  type LibraryPort,
  type ViewContext
} from '../src/main/history/historyViews'
import { defineEvent, definePerson } from '../src/shared/history/schema'
import type { HistoryMark, HistoryUserEntity } from '../src/shared/types'
import { fixture, q } from './historyFixture'

// The pure History views over the shared fixture catalog, with a fake library
// in which Argo (tmdb movie 68734) is owned as media id 7 and credits an actor
// as the character the fixture's portrayal names.

const library: LibraryPort = {
  byExternal: (keys) =>
    new Map(
      keys
        .filter((k) => k.source === 'tmdb' && k.externalId === '68734')
        .map((k) => [
          `${k.source}|${k.mediaType}|${k.externalId}`,
          { id: 7, title: 'Argo', mediaType: 'movie' as const, year: 2012, cover: 'media/argo.jpg', status: 'Completed', source: 'tmdb', externalId: '68734' }
        ])
    ),
  byIds: (ids) =>
    new Map(
      ids
        .filter((id) => id === 9)
        .map((id) => [id, { id, title: 'Persepolis', mediaType: 'movie' as const, year: 2007, cover: null, status: null, source: 'tmdb', externalId: '2011' }])
    ),
  cast: (ids) =>
    new Map(
      ids.map((id) => [
        id,
        id === 7
          ? [
              { characterId: 3, characterName: 'SOMEONE', personId: 40, personName: 'An Actor', photo: null },
              { characterId: 4, characterName: 'Someone else', personId: 41, personName: 'Other', photo: null }
            ]
          : []
      ])
    )
}

function ctx(over: Partial<ViewContext> = {}): ViewContext {
  return {
    marks: new Map<string, HistoryMark>(),
    cached: (url) => (url.endsWith('cached.jpg') ? 'media/dl-x.jpg' : null),
    library,
    personalLinks: [],
    archive: [],
    fileExists: () => true,
    ...over
  }
}

const elsewhere = defineEvent({
  id: 'faraway-war',
  names: [{ text: 'Faraway War', lang: 'en', role: 'primary' }],
  researched: '2026-10-12',
  type: 'war',
  start: { alts: [{ value: { d: '1978-06' }, cites: [{ source: 'book-a', loc: { page: '1' } }] }] },
  regions: ['east-asia'],
  prominence: 2,
  sections: [{ kind: 'overview', quotes: [q('f1')] }],
  hero: {
    url: 'https://upload.wikimedia.org/x/cached.jpg',
    credit: { institution: 'A Museum' },
    license: { id: 'public-domain' }
  }
})

const mine = definePerson({
  id: 'my-grandfather',
  names: [{ text: 'My Grandfather', lang: 'en', role: 'primary' }],
  researched: '2026-10-12',
  born: { alts: [{ value: { d: '1950' }, cites: [{ source: 'book-a', loc: { page: '2' } }] }] },
  regions: ['iran'],
  roles: ['other'],
  sections: []
}) as HistoryUserEntity

const index = buildIndex([...fixture(), { path: 'events/faraway-war.ts', entity: elsewhere }], [mine])

describe('History index', () => {
  it('counts quotes once and marks personal entities', () => {
    // 3 event quotes + 1 person + 5 interpretation + 1 accuracy + 1 elsewhere
    expect(index.quoteCount).toBe(11)
    expect(index.personal.has('person:my-grandfather')).toBe(true)
    expect(index.events.map((e) => e.ref)).toEqual(['event:sample-revolution', 'event:faraway-war'])
  })
})

describe('History overview and decade', () => {
  it('summarises the timeline, decades and read state', () => {
    const marks = new Map([['event:sample-revolution', { read: '2026-10-12', favorite: false }]])
    const o = overview(index, { marks })
    expect(o.items.find((i) => i.ref === 'event:sample-revolution')).toMatchObject({ read: true, lane: 'iran', prominence: 1 })
    expect(o.decades).toEqual([{ start: 1970, events: 2, read: 1 }])
    expect(o.counts).toMatchObject({ events: 2, people: 2, sources: 4, read: 1, personal: 1 })
  })

  it('builds a decade front page with owned and missing titles', () => {
    const d = decade(index, 1970, ctx())
    expect(d.lead.map((r) => r.ref)).toEqual(['event:sample-revolution', 'event:faraway-war'])
    expect(d.born.map((r) => r.ref)).toEqual([])
    expect(d.media).toHaveLength(1)
    expect(d.media[0]).toMatchObject({ title: 'Argo', library: { id: 7 }, kind: 'set-during' })
    expect(decade(index, 1950, ctx()).born.map((r) => r.ref)).toEqual(['person:my-grandfather'])
  })

  it('lists events from an earlier decade that run into this one', () => {
    // The fixture revolution starts and ends inside the 1970s, so nothing
    // continues there; a 1975-1983 war continues into the 1980s and no further.
    expect(decade(index, 1970, ctx()).continuing).toEqual([])
    const long = defineEvent({
      ...elsewhere,
      id: 'long-war',
      names: [{ text: 'Long War', lang: 'en', role: 'primary' }],
      start: { alts: [{ value: { d: '1975' }, cites: [{ source: 'book-a', loc: { page: '1' } }] }] },
      end: { alts: [{ value: { d: '1983' }, cites: [{ source: 'book-a', loc: { page: '2' } }] }] }
    })
    const withLong = buildIndex([...fixture(), { path: 'events/long-war.ts', entity: long }])
    const d80 = decade(withLong, 1980, ctx())
    expect(d80.continuing.map((r) => r.ref)).toEqual(['event:long-war'])
    expect(d80.lead).toEqual([])
    expect(decade(withLong, 1990, ctx()).continuing).toEqual([])
  })
})

describe('History article', () => {
  it('resolves references, footnote order, interpretations and media', () => {
    const view = article(index, 'event:sample-revolution', { ...ctx(), note: null })!
    expect(view.solarHijri).toBe(true)
    expect(view.sourceOrder).toEqual(['book-a', 'web-page', 'book-fa', 'book-fa-en'])
    expect(view.refs['person:sample-person']).toMatchObject({ title: 'Sample Person', kind: 'person', missing: false })
    expect(view.interpretations.map((i) => i.id)).toEqual(['sample-revolution-causes'])
    expect(view.meanwhile.map((r) => r.ref)).toEqual(['event:faraway-war'])
    expect(view.meanwhile[0].image).toMatchObject({ cached: 'media/dl-x.jpg', credit: 'A Museum', license: 'Public domain' })
    const argo = view.media[0]
    expect(argo.portrayals[0].actors).toEqual([{ personId: 40, name: 'An Actor', characterId: 3, photo: null }])
  })

  it('merges research suggestions with downloaded and attached files', () => {
    const view = article(index, 'event:sample-revolution', {
      ...ctx({
        archive: [
          { id: 1, ref: 'event:sample-revolution', kind: 'audio', relPath: 'history/a.mp3', title: 'A recording', credit: null, license: 'public-domain', page: null, suggestionKey: 'event:sample-revolution#a1', bytes: 5 },
          { id: 2, ref: 'event:sample-revolution', kind: 'image', relPath: 'history/gone.jpg', title: 'Mine', credit: null, license: null, page: null, suggestionKey: null, bytes: null }
        ],
        fileExists: (p) => p !== 'history/gone.jpg'
      }),
      note: null
    })!
    expect(view.archive.map((a) => [a.key, a.origin, a.state])).toEqual([
      ['event:sample-revolution#a1', 'research', 'local'],
      ['file-2', 'user', 'missing']
    ])
    expect(view.archive[0].date).toBe('September 1978')
  })

  it('lists the events a person took part in and the titles portraying them', () => {
    const view = article(index, 'person:sample-person', { ...ctx(), note: null })!
    expect(view.appearsIn).toEqual([{ ref: 'event:sample-revolution', role: 'leader', side: 'state' }])
    expect(view.media.map((m) => m.title)).toEqual(['Argo'])
    expect(view.solarHijri).toBe(true)
    expect(article(index, 'source:book-a', { ...ctx(), note: null })).toBeNull()
    expect(article(index, 'event:nope', { ...ctx(), note: null })).toBeNull()
  })
})

describe('History sources, search and backlinks', () => {
  it('counts citations per source and attributes interpretation quotes to their subject', () => {
    expect(sourceRows(index).find((r) => r.id === 'book-a')!.cited).toBeGreaterThan(10)
    const v = sourceView(index, 'web-page', () => null)!
    expect(v.citedBy.map((c) => [c.ref, c.quotes])).toEqual([['event:sample-revolution', 2]])
    expect(sourceView(index, 'book-fa', () => null)!.translations.map((s) => s.id)).toEqual(['book-fa-en'])
  })

  it('searches names in any script', () => {
    expect(search(index, 'sample rev', () => null)[0]).toMatchObject({ ref: 'event:sample-revolution', kind: 'event' })
    expect(search(index, 'نام', () => null)[0].ref).toBe('event:sample-revolution')
  })

  it('finds the curated and personal links of a library title', () => {
    const links = backlinks(
      index,
      { mediaType: 'movie', source: 'tmdb', externalId: '68734' },
      [{ id: 3, ref: 'person:sample-person', mediaId: 7, kind: 'features-person' }],
      () => null
    )
    expect(links.map((l) => [l.target.ref, l.kind, l.origin])).toEqual([
      ['event:sample-revolution', 'set-during', 'curated'],
      ['person:sample-person', 'features-person', 'personal']
    ])
  })
})
