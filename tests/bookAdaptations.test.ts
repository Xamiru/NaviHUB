import { beforeEach, describe, expect, it, vi } from 'vitest'
import {
  acceptLinkedItem,
  adaptationEdge,
  foldName,
  parseAdaptations,
  pickWork,
  titleMatches,
  workSearchQuery
} from '../src/main/bookAdaptationsCore'
import { adaptationsOf, findBookItem } from '../src/main/bookAdaptations'

// Book → screen adaptations through Wikidata: the pure matching rules, then the
// IO half against URL-keyed fixtures (Wikipedia pageprops, CirrusSearch,
// wbgetentities).

const claim = (value: unknown) => ({ mainsnak: { datavalue: { value } }, rank: 'normal' })
const item = (id: string) => claim({ id })

const DUNE = {
  labels: { en: { value: 'Dune' } },
  claims: { P31: [item('Q7725634')], P50: [item('Q7934')] }
}

describe('matching', () => {
  it('folds names and titles', () => {
    expect(foldName('J. R. R. Tolkien')).toBe(foldName('J.R.R. Tolkien'))
    expect(foldName('Les Misérables')).toBe('lesmiserables')
    expect(titleMatches('Dune', 'Dune: Book One')).toBe(true)
    expect(titleMatches('Dune Messiah', 'Dune')).toBe(false)
  })

  it('builds the written-work search', () => {
    expect(workSearchQuery('Say "hi"')).toMatch(/^"Say hi" haswbstatement:P31=Q7725634\|P31=Q8261/)
  })

  it('picks the first candidate with the title and one of the authors', () => {
    const entities = {
      Q1: { labels: { en: { value: 'Dune' } }, claims: { P50: [item('Q99')] } },
      Q190192: DUNE,
      Q3: DUNE
    }
    const authors = { Q7934: 'Frank Herbert', Q99: 'Someone Else' }
    expect(pickWork(['Q1', 'Q190192', 'Q3'], entities, authors, 'Dune', ['Frank Herbert'])).toBe('Q190192')
    expect(pickWork(['Q1'], entities, authors, 'Dune', ['Frank Herbert'])).toBeNull()
    expect(pickWork(['Q190192'], entities, authors, 'Dune', [])).toBeNull()
  })

  it('rejects a Wikipedia link that lands on a person', () => {
    const person = { labels: { en: { value: 'Frank Herbert' } }, claims: { P31: [item('Q5')] } }
    expect(acceptLinkedItem(person, {}, 'Dune', ['Frank Herbert'])).toBe(false)
    expect(acceptLinkedItem(DUNE, {}, 'Dune', [])).toBe(true)
    const series = { labels: { en: { value: 'Dune series' } }, claims: { P50: [item('Q7934')] } }
    expect(acceptLinkedItem(series, { Q7934: 'Frank Herbert' }, 'Dune', ['Frank Herbert'])).toBe(true)
  })

  it('reads one library key per adapting item', () => {
    const list = parseAdaptations({
      Q114819: { labels: { en: { value: 'Dune (1984 film)' } }, claims: { P4947: [claim('841')] } },
      Q987305: { labels: { en: { value: 'Frank Herbert’s Dune' } }, claims: { P4983: [claim('19566')] } },
      Q5: { labels: { en: { value: 'Anime' } }, claims: { P8729: [claim('123')] } },
      Q6: { labels: { en: { value: 'Board game' } }, claims: {} },
      Q7: { labels: { en: { value: 'Both' } }, claims: { P4947: [claim('5')], P4983: [claim('6')] } },
      Q8: { labels: { en: { value: 'Deprecated' } }, claims: { P4947: [{ ...claim('7'), rank: 'deprecated' }] } }
    })
    expect(list).toEqual([
      { kind: 'anime', externalId: '123', title: 'Anime' },
      { kind: 'movie', externalId: '5', title: 'Both' },
      { kind: 'movie', externalId: '841', title: 'Dune (1984 film)' },
      { kind: 'tv', externalId: '19566', title: 'Frank Herbert’s Dune' }
    ])
    expect(adaptationEdge(list[0])).toEqual({ relatedSource: 'anilist', relatedType: 'anime' })
    expect(adaptationEdge(list[3])).toEqual({ relatedSource: 'tmdb', relatedType: 'tv' })
  })
})

// ---- IO half ----
let responses: (url: URL) => unknown
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 1,
  fetchWithRetry: async (raw: string) => {
    const body = responses(new URL(raw))
    if (body === undefined) return { ok: false, status: 404, json: async () => ({}) }
    return { ok: true, status: 200, json: async () => body }
  }
}))

function wikidata(url: URL): unknown {
  const p = url.searchParams
  if (url.hostname === 'en.wikipedia.org') {
    return p.get('titles') === 'Dune (novel)' ? { query: { pages: { '1': { pageprops: { wikibase_item: 'Q190192' } } } } } : { query: { pages: {} } }
  }
  if (p.get('list') === 'search') {
    if (p.get('srsearch') === 'haswbstatement:P144=Q190192') return { query: { search: [{ title: 'Q114819' }] } }
    if (p.get('srsearch')?.startsWith('"Dune"')) return { query: { search: [{ title: 'Q190192' }] } }
    return { query: { search: [] } }
  }
  if (p.get('action') === 'wbgetentities') {
    const all: Record<string, unknown> = {
      Q190192: DUNE,
      Q7934: { labels: { en: { value: 'Frank Herbert' } } },
      Q114819: { labels: { en: { value: 'Dune (1984 film)' } }, claims: { P4947: [claim('841')] } }
    }
    const ids = (p.get('ids') ?? '').split('|')
    return { entities: Object.fromEntries(ids.map((id) => [id, all[id] ?? { missing: '' }])) }
  }
  return undefined
}

beforeEach(() => {
  responses = wikidata
})

describe('findBookItem / adaptationsOf', () => {
  it('follows the Wikipedia article (xref)', async () => {
    expect(await findBookItem({ title: 'Dune', authors: ['Frank Herbert'], wikipediaTitle: 'Dune (novel)' })).toEqual({
      qid: 'Q190192',
      method: 'xref'
    })
  })

  it('falls back to title + author search (exact)', async () => {
    expect(await findBookItem({ title: 'Dune', authors: ['Frank Herbert'], wikipediaTitle: null })).toEqual({
      qid: 'Q190192',
      method: 'exact'
    })
    expect(await findBookItem({ title: 'Dune', authors: ['Nobody'], wikipediaTitle: null })).toBeNull()
    expect(await findBookItem({ title: 'Dune', authors: [], wikipediaTitle: null })).toBeNull()
  })

  it('lists adaptations with library keys', async () => {
    expect(await adaptationsOf('Q190192')).toEqual([{ kind: 'movie', externalId: '841', title: 'Dune (1984 film)' }])
    expect(await adaptationsOf('Q42')).toEqual([])
    expect(await adaptationsOf('not-a-qid')).toEqual([])
  })
})
