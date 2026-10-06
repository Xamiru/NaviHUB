import { describe, expect, it } from 'vitest'
import { buildCatalog, type CatalogEntry, type IdLock } from '../src/shared/history/model'
import {
  definePerson,
  defineSource,
  type HistoryEvent,
  type HistoryInterpretation,
  type HistoryMedia,
  type HistorySource,
  type Quote
} from '../src/shared/history/schema'
import { errorsOnly, validateCatalog, validateEntity } from '../src/shared/history/validate'
import { fixture, q } from './historyFixture'

// Each test breaks exactly one rule of the clean fixture catalog and expects
// exactly that rule's code.

const lockFor = (entries: CatalogEntry[]): IdLock => ({
  ids: entries.map((e) => `${e.entity.kind}:${e.entity.id}`),
  redirects: {}
})

const codes = (entries: CatalogEntry[], lock?: IdLock): string[] =>
  errorsOnly(validateCatalog(entries, lock)).map((i) => i.code)

function mutate<T>(entries: CatalogEntry[], id: string, fn: (e: T) => void): CatalogEntry[] {
  const copy = structuredClone(entries)
  fn(copy.find((x) => x.entity.id === id)!.entity as T)
  return copy
}

describe('History validator', () => {
  it('accepts the clean fixture with no errors or warnings', () => {
    const entries = fixture()
    expect(validateCatalog(entries, lockFor(entries))).toEqual([])
  })

  it.each<[string, string, (e: never) => void]>([
    ['uncited', 'sample-revolution', (e: HistoryEvent) => (e.start.alts[0].cites = [])],
    ['no-locator', 'sample-revolution', (e: HistoryEvent) => (e.sections[0].quotes[0].cite.loc = {})],
    ['dangling-source', 'sample-revolution', (e: HistoryEvent) => (e.sections[0].quotes[0].cite.source = 'missing')],
    ['no-provenance', 'sample-revolution', (e: HistoryEvent) => (e.sections[0].quotes[0].provenance = { via: 'web', at: '2026-10-12' })],
    [
      'finding-aid-cited',
      'sample-revolution',
      (e: HistoryEvent) =>
        (e.sections[0].quotes[0].provenance = { via: 'web', at: '2026-10-12', url: 'https://en.wikipedia.org/wiki/X' })
    ],
    ['finding-aid-cited', 'web-page', (e: HistorySource) => (e.url = 'https://www.wikidata.org/wiki/Q1')],
    ['finding-aid-cited', 'web-page', (e: HistorySource) => (e.url = 'https://commons.wikimedia.org/wiki/File:X.pdf')],
    ['no-ai-source', 'web-page', (e: HistorySource) => (e.url = 'https://openstax.org/books/world-history-volume-2/pages/1-1')],
    [
      'no-ai-source',
      'sample-revolution',
      (e: HistoryEvent) =>
        (e.sections[0].quotes[0].provenance = { via: 'web', at: '2026-10-12', url: 'https://openstax.org/books/x' })
    ],
    ['no-accessed', 'web-page', (e: HistorySource) => delete e.accessed],
    [
      'unpublished-translation',
      'sample-revolution',
      (e: HistoryEvent) => (e.sections[0].quotes[1].translation!.cite.source = 'book-a')
    ],
    ['no-reception', 'sample-revolution-causes', (e: HistoryInterpretation) => delete e.positions[2].reception],
    ['official-holder', 'sample-revolution-causes', (e: HistoryInterpretation) => (e.positions[1].holders = [{ kind: 'scholar', name: 'X' }])],
    [
      'unquoted-standing',
      'sample-revolution-causes',
      (e: HistoryInterpretation) => delete (e.positions[0].standing as { quote?: Quote }).quote
    ],
    ['dangling-ref', 'sample-revolution', (e: HistoryEvent) => (e.partOf = [{ ref: 'event:missing' }])],
    ['bad-ref', 'sample-revolution', (e: HistoryEvent) => (e.places = [{ ref: 'person:sample-person' }])],
    ['date-order', 'sample-revolution', (e: HistoryEvent) => (e.end!.alts[0].value.d = '1970')],
    ['bad-date', 'sample-revolution', (e: HistoryEvent) => (e.start.alts[0].value.d = '1978-02-30')],
    ['primary-name', 'sample-revolution', (e: HistoryEvent) => (e.names[1].role = 'primary')],
    ['uncited', 'sample-revolution', (e: HistoryEvent) => delete e.names[2].cites],
    ['bad-enum', 'sample-revolution', (e: HistoryEvent) => (e.regions = ['atlantis' as never])],
    ['duplicate-quote', 'sample-revolution', (e: HistoryEvent) => (e.course![0].quote.id = 'q1')],
    ['dangling-side', 'sample-revolution', (e: HistoryEvent) => (e.participants![0].side = 'rebels')],
    ['bad-figure', 'sample-revolution', (e: HistoryEvent) => (e.figures![0].value.alts[1].value.max = 10)],
    ['no-license', 'sample-revolution', (e: HistoryEvent) => delete (e.archive![0] as { license?: unknown }).license],
    ['bad-url', 'sample-revolution', (e: HistoryEvent) => (e.archive![0].url = 'http://insecure.example.org/a.mp3')],
    ['bad-slug', 'tmdb-movie-68734', (e: HistoryMedia) => (e.title.externalId = '1')],
    ['bad-ref', 'tmdb-movie-68734', (e: HistoryMedia) => (e.links[0].kind = 'features-person')]
  ])('reports %s', (code, id, fn) => {
    expect(codes(mutate(fixture(), id, fn))).toEqual([code])
  })

  it('checks file placement and duplicate ids', () => {
    const entries = fixture()
    entries[0].path = 'sources/wrong-name.ts'
    expect(codes(entries)).toEqual(['bad-path'])
    const moved = fixture()
    moved[0].path = 'events/book-a.ts'
    expect(codes(moved)).toEqual(['bad-path'])
    const dup = fixture()
    dup.push({ path: 'sources/book-a.ts', entity: dup[0].entity })
    expect(codes(dup)).toEqual(['duplicate-id'])
  })

  it('reserves the my- prefix for personal entities', () => {
    const entries = fixture()
    const person = entries.find((e) => e.entity.id === 'sample-person')!
    expect(codes([...entries, { path: 'people/my-thing.ts', entity: { ...person.entity, id: 'my-thing' } }])).toEqual([
      'reserved-slug'
    ])
  })

  it('warns about sources nothing cites', () => {
    const entries = fixture()
    entries.push({
      path: 'sources/unused.ts',
      entity: defineSource({ id: 'unused', type: 'book', title: 'Unused', lang: 'en', contributors: [{ name: 'X', role: 'author' }], date: '2000' })
    })
    const issues = validateCatalog(entries)
    expect(issues).toEqual([expect.objectContaining({ severity: 'warning', code: 'orphan-source', ref: 'source:unused' })])
  })

  it('enforces the frozen-slug lock', () => {
    const entries = fixture()
    const lock = lockFor(entries)
    expect(codes(entries, { ...lock, ids: lock.ids.slice(1) })).toEqual(['unlocked-id'])
    expect(codes(entries, { ...lock, ids: [...lock.ids, 'event:removed'] })).toEqual(['removed-id'])
    expect(
      codes(entries, { ids: [...lock.ids, 'event:old-name'], redirects: { 'event:old-name': 'event:sample-revolution' } })
    ).toEqual([])
    expect(codes(entries, { ids: [...lock.ids, 'event:gone'], redirects: { 'event:gone': 'event:nowhere' } })).toEqual([
      'dangling-redirect'
    ])
    expect(
      codes(entries, {
        ids: [...lock.ids, 'event:a', 'event:b'],
        redirects: { 'event:a': 'event:b', 'event:b': 'event:sample-revolution' }
      })
    ).toEqual(['redirect-chain'])
  })

  it('validates a single personal entity against the catalog', () => {
    const catalog = buildCatalog(fixture().map((e) => e.entity))
    const mine = definePerson({
      id: 'my-1',
      names: [{ text: 'Mine', lang: 'en', role: 'primary' }],
      researched: '2026-10-12',
      regions: ['iran'],
      roles: ['writer'],
      sections: [{ kind: 'overview', quotes: [q('x1')] }]
    })
    expect(validateEntity(mine, catalog)).toEqual([])
    mine.sections[0].quotes[0].cite.source = 'not-there'
    expect(validateEntity(mine, catalog).map((i) => i.code)).toEqual(['dangling-source'])
  })
})
