import { describe, expect, it } from 'vitest'
import { buildIndex } from '../src/main/history/historyIndex'
import { article, mapPolities, onThisDay, type LibraryPort } from '../src/main/history/historyViews'
import type { CatalogEntry } from '../src/shared/history/model'
import { territoryOf } from '../src/shared/history/mapGeometry'
import {
  defineEvent,
  definePerson,
  definePlace,
  definePolity,
  defineTheme,
  type HistoryPolity,
  type HistoryTheme
} from '../src/shared/history/schema'
import { errorsOnly, validateCatalog } from '../src/shared/history/validate'
import { fixture, q } from './historyFixture'

// States and themes: the polity kind's links (capitals, predecessors, the
// empire a colony belonged to, offices, events, map units) and a theme's thread.

const c = (page: string) => [{ source: 'book-a', loc: { page } }]
const date = (d: string, page = '1') => ({ alts: [{ value: { d }, cites: c(page) }] })

function catalog(): CatalogEntry[] {
  const tehran = definePlace({
    id: 'tehran',
    names: [{ text: 'Tehran', lang: 'en', role: 'primary' }],
    researched: '2026-10-12',
    placeType: 'city',
    regions: ['iran']
  })
  const old = definePolity({
    id: 'old-state',
    names: [{ text: 'Old State', lang: 'en', role: 'primary' }],
    researched: '2026-10-12',
    polityType: 'kingdom',
    start: date('1789'),
    end: date('1925'),
    regions: ['iran'],
    prominence: 1,
    sections: []
  })
  const state = definePolity({
    id: 'new-state',
    names: [{ text: 'New State', lang: 'en', role: 'primary' }],
    researched: '2026-10-12',
    polityType: 'kingdom',
    start: date('1925'),
    regions: ['iran'],
    prominence: 1,
    capitals: [{ ref: 'place:tehran', start: date('1925'), cites: c('2') }],
    predecessors: [{ ref: 'polity:old-state' }],
    cshapes: [{ set: 'world', code: 630 }],
    sections: [{ kind: 'overview', quotes: [q('x1')] }]
  })
  const colony = definePolity({
    id: 'a-colony',
    names: [{ text: 'A Colony', lang: 'en', role: 'primary' }],
    researched: '2026-10-12',
    polityType: 'protectorate',
    start: date('1930'),
    regions: ['mena'],
    prominence: 3,
    partOf: [{ ref: 'polity:new-state', start: date('1930'), cites: c('3') }],
    sections: []
  })
  const ruler = definePerson({
    id: 'a-ruler',
    names: [{ text: 'A Ruler', lang: 'en', role: 'primary' }],
    researched: '2026-10-12',
    regions: ['iran'],
    roles: ['monarch'],
    offices: [{ title: 'Shah', polity: 'polity:new-state', start: date('1926'), end: date('1941'), cites: c('4') }],
    sections: []
  })
  const war = defineEvent({
    id: 'a-war',
    names: [{ text: 'A War', lang: 'en', role: 'primary' }],
    researched: '2026-10-12',
    type: 'war',
    start: date('1941'),
    regions: ['iran'],
    prominence: 2,
    sides: [{ key: 'a', name: 'New State', polity: 'polity:new-state', cites: c('5') }],
    polities: [{ ref: 'polity:old-state' }],
    sections: [{ kind: 'overview', quotes: [q('w1')] }]
  })
  const theme = defineTheme({
    id: 'a-theme',
    names: [{ text: 'A Theme', lang: 'en', role: 'primary' }],
    researched: '2026-10-12',
    regions: ['iran'],
    thread: [{ ref: 'polity:old-state' }, { ref: 'event:a-war', quote: q('t1'), date: date('1941', '6') }],
    sections: []
  })
  return [
    ...fixture(),
    { path: 'places/tehran.ts', entity: tehran },
    { path: 'polities/old-state.ts', entity: old },
    { path: 'polities/new-state.ts', entity: state },
    { path: 'polities/a-colony.ts', entity: colony },
    { path: 'people/a-ruler.ts', entity: ruler },
    { path: 'events/a-war.ts', entity: war },
    { path: 'themes/a-theme.ts', entity: theme }
  ]
}

const lock = (entries: CatalogEntry[]) => ({ ids: entries.map((e) => `${e.entity.kind}:${e.entity.id}`), redirects: {} })
const empty: LibraryPort = { byExternal: () => new Map(), byIds: () => new Map(), cast: () => new Map() }
const ctx = { marks: new Map(), cached: () => null, library: empty, personalLinks: [], archive: [], fileExists: () => false, note: null }

describe('History states and themes', () => {
  it('validates states, office and side links and a theme thread', () => {
    const entries = catalog()
    expect(errorsOnly(validateCatalog(entries, lock(entries)))).toEqual([])
  })

  it('rejects a state preceding itself, a capital that is not a place and a repeated thread entry', () => {
    const entries = structuredClone(catalog())
    const s = entries.find((e) => e.entity.id === 'new-state')!.entity as HistoryPolity
    s.predecessors = [{ ref: 'polity:new-state' }]
    s.capitals![0].ref = 'polity:old-state'
    const t = entries.find((e) => e.entity.id === 'a-theme')!.entity as HistoryTheme
    t.thread.push({ ref: 'event:a-war' })
    const codes = errorsOnly(validateCatalog(entries, lock(entries))).map((i) => i.code)
    expect(codes).toEqual(expect.arrayContaining(['self-ref', 'bad-ref', 'duplicate-thread']))
  })

  it('builds a state page with rulers, successors, dependencies, events and themes', () => {
    const index = buildIndex(catalog())
    const view = article(index, 'polity:new-state', ctx)!
    expect(view.rulers).toEqual([expect.objectContaining({ person: 'person:a-ruler', title: 'Shah' })])
    expect(view.dependencies).toEqual(['polity:a-colony'])
    expect(view.events).toEqual(['event:a-war'])
    expect(view.refs['place:tehran'].title).toBe('Tehran')
    const old = article(index, 'polity:old-state', ctx)!
    expect(old.successors).toEqual(['polity:new-state'])
    expect(old.events).toEqual(['event:a-war'])
    expect(old.themes).toEqual(['theme:a-theme'])
    const theme = article(index, 'theme:a-theme', ctx)!
    expect(theme.refs['event:a-war'].title).toBe('A War')
  })

  it('lists the map units that have a state page', () => {
    expect(mapPolities(buildIndex(catalog()))).toEqual([
      { set: 'world', code: 630, from: null, to: null, ref: 'polity:new-state', title: 'New State' }
    ])
  })

  it('draws a state territory from the border versions its links cover', () => {
    const data = {
      quantum: 0.01,
      shapes: [[[5000, 3000, 100, 0, 0, 100]], [[5000, 3000, 200, 0, 0, 200]]],
      units: [
        { set: 'world' as const, name: 'Iran', code: 630, from: 1886, to: 1940, shape: 0, label: [0, 0] as [number, number], capital: null, capitalAt: null },
        { set: 'world' as const, name: 'Iran', code: 630, from: 1940, to: 2020, shape: 1, label: [0, 0] as [number, number], capital: null, capitalAt: null },
        { set: 'world' as const, name: 'Iraq', code: 645, from: 1932, to: 2020, shape: 1, label: [0, 0] as [number, number], capital: null, capitalAt: null }
      ]
    }
    const all = territoryOf(data, [{ set: 'world', code: 630 }])
    expect(all.map((t) => [t.from, t.to])).toEqual([
      [1886, 1940],
      [1940, 2020]
    ])
    expect(all[0].path).toMatch(/^M/)
    expect(all[0].box[2]).toBeGreaterThan(0)
    expect(territoryOf(data, [{ set: 'world', code: 630, from: 1950 }]).map((t) => [t.from, t.to])).toEqual([[1950, 2020]])
  })
})

describe('History on this day', () => {
  it('lists events with a day-precise date on the month and day, leads first', () => {
    const index = buildIndex(catalog())
    // The fixture revolution starts 1978-01-07 and has a course stage on 1978-09-08.
    expect(onThisDay(index, 1, 7, () => null).map((h) => [h.info.ref, h.year, h.what])).toEqual([['event:sample-revolution', 1978, 'began']])
    expect(onThisDay(index, 9, 8, () => null).map((h) => h.what)).toEqual(['stage'])
    // A year-only start (a-war, 1941) never matches a day.
    expect(onThisDay(index, 1, 1, () => null)).toEqual([])
  })
})

describe('History other sources (further reading)', () => {
  it('lists works by perspective without footnoting them, and checks them', () => {
    const entries = structuredClone(catalog())
    const war = entries.find((e) => e.entity.id === 'a-war')!.entity as { furtherReading?: unknown[] }
    war.furtherReading = [{ source: 'book-fa', perspective: 'iranian' }]
    expect(errorsOnly(validateCatalog(entries, lock(entries)))).toEqual([])
    const view = article(buildIndex(entries), 'event:a-war', ctx)!
    expect(view.furtherReading).toEqual([{ source: 'book-fa', perspective: 'iranian' }])
    expect(view.sources['book-fa']).toBeDefined()
    expect(view.sourceOrder).not.toContain('book-fa')
    war.furtherReading = [
      { source: 'missing', perspective: 'iranian' },
      { source: 'book-fa', perspective: 'martian' },
      { source: 'book-fa', perspective: 'iranian' }
    ]
    const codes = errorsOnly(validateCatalog(entries, lock(entries))).map((i) => i.code)
    expect(codes).toEqual(expect.arrayContaining(['dangling-source', 'bad-enum', 'duplicate-reading']))
  })
})
