import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import {
  acceptLinkedItem,
  adaptationSearchQuery,
  claimItemIds,
  englishLabel,
  entitiesOf,
  isQid,
  parseAdaptations,
  pickWork,
  searchHitIds,
  wikipediaItemId,
  workSearchQuery,
  type Adaptation
} from './bookAdaptationsCore'

// The IO half of the book → adaptation bridge (bookAdaptationsCore.ts has the
// rules). Every request goes to Wikipedia or Wikidata, so fetchWithRetry adds
// the Wikimedia agent and spaces it through the shared Wikimedia throttle.

const WIKIDATA_API = 'https://www.wikidata.org/w/api.php'
const WIKIPEDIA_API = 'https://en.wikipedia.org/w/api.php'

/* eslint-disable @typescript-eslint/no-explicit-any */
async function getJson(base: string, params: Record<string, string>): Promise<any> {
  const url = new URL(base)
  for (const [k, v] of Object.entries({ ...params, format: 'json', formatversion: '1' })) {
    url.searchParams.set(k, v)
  }
  const res = await fetchWithRetry(url.toString(), {
    headers: { Accept: 'application/json' },
    timeoutMs: 20_000,
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (!res.ok) throw new Error(`Wikidata request failed (${res.status})`)
  return res.json()
}

async function entities(ids: string[], props = 'labels|claims'): Promise<Record<string, any>> {
  const out: Record<string, any> = {}
  for (let i = 0; i < ids.length; i += 50) {
    const json = await getJson(WIKIDATA_API, {
      action: 'wbgetentities',
      ids: ids.slice(i, i + 50).join('|'),
      props,
      languages: 'en'
    })
    Object.assign(out, entitiesOf(json))
  }
  return out
}

async function authorLabelsOf(items: any[]): Promise<Record<string, string>> {
  const ids = [...new Set(items.flatMap((e) => claimItemIds(e, 'P50')))].slice(0, 50)
  if (!ids.length) return {}
  const labels: Record<string, string> = {}
  for (const [id, e] of Object.entries(await entities(ids, 'labels'))) {
    const label = englishLabel(e)
    if (label) labels[id] = label
  }
  return labels
}

export interface BookItemMatch {
  qid: string
  method: 'xref' | 'exact'
}

export async function findBookItem(book: {
  title: string
  authors: string[]
  wikipediaTitle: string | null
}): Promise<BookItemMatch | null> {
  if (book.wikipediaTitle) {
    const page = await getJson(WIKIPEDIA_API, {
      action: 'query',
      prop: 'pageprops',
      ppprop: 'wikibase_item',
      redirects: '1',
      titles: book.wikipediaTitle
    })
    const qid = wikipediaItemId(page)
    if (qid) {
      const item = (await entities([qid]))[qid]
      if (acceptLinkedItem(item, await authorLabelsOf([item]), book.title, book.authors)) {
        return { qid, method: 'xref' }
      }
    }
  }
  if (!book.authors.length) return null
  const search = await getJson(WIKIDATA_API, {
    action: 'query',
    list: 'search',
    srsearch: workSearchQuery(book.title),
    srlimit: '10',
    srnamespace: '0'
  })
  const candidates = searchHitIds(search)
  if (!candidates.length) return null
  const items = await entities(candidates)
  const qid = pickWork(candidates, items, await authorLabelsOf(Object.values(items)), book.title, book.authors)
  return qid ? { qid, method: 'exact' } : null
}

export async function adaptationsOf(qid: string): Promise<Adaptation[]> {
  if (!isQid(qid)) return []
  const search = await getJson(WIKIDATA_API, {
    action: 'query',
    list: 'search',
    srsearch: adaptationSearchQuery(qid),
    srlimit: '50',
    srnamespace: '0'
  })
  const ids = searchHitIds(search)
  if (!ids.length) return []
  return parseAdaptations(await entities(ids))
}
