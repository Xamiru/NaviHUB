// MediaWiki API client for the wrestling wiki importer. IO only — every
// parsing decision lives in the pure wikitext.ts next door, so tests exercise
// the hard logic with no network (the video/playability.ts split).
//
// No API key exists or is needed. Wikipedia's User-Agent policy asks for a
// descriptive agent (the openlibrary.ts posture); an anonymous default UA gets
// throttled or blocked.
//
// Two facts make a 2,500-event crawl cheap rather than an overnight job, both
// verified against the live API:
//
//  * `titles=A|B|…` accepts 50 pages per request, so the whole of WWE is ~50
//    round trips for content, not 2,500.
//  * `&redirects=1` reports the from→to mapping, which is the ONLY thing that
//    keeps wrestler rows deduped: cards link [[Steve Austin]],
//    [["Stone Cold" Steve Austin]] and [[Stone Cold Steve Austin]]
//    interchangeably, and all three are redirects to one article.

import { fetchWithRetry, sleep } from '../http'
import type { WrestlingPromotionCfg } from '@shared/wrestling'

const API = 'https://en.wikipedia.org/w/api.php'
const UA = 'NaviHUB/0.1 (personal media tracker; wrestling wiki import)'

// The API's own cap for a titles= batch on an anonymous connection.
export const TITLES_PER_REQUEST = 50

// Polite spacing between requests. Wikipedia asks for serial requests rather
// than a fixed rate; 200ms serial is well inside what the API tolerates and
// still crawls WWE in about a minute.
const REQUEST_DELAY_MS = 200

export interface WikiPage {
  title: string // canonical title, AFTER redirect resolution
  wikitext: string
}

export interface FetchPagesResult {
  pages: WikiPage[]
  // Every redirect followed, as requested-title -> canonical-title. Callers
  // persist these so later imports resolve locally instead of re-asking.
  aliases: Map<string, string>
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function apiGet(params: Record<string, string>): Promise<any> {
  const url = new URL(API)
  url.searchParams.set('format', 'json')
  url.searchParams.set('formatversion', '2')
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetchWithRetry(url.toString(), {
    headers: { Accept: 'application/json', 'User-Agent': UA },
    timeoutMs: 20_000
  })
  if (!res.ok) throw new Error(`Wikipedia request failed (${res.status})`)
  const json = await res.json()
  if (json?.error) throw new Error(`Wikipedia API error: ${json.error.code ?? 'unknown'}`)
  return json
}

function chunk<T>(items: T[], size: number): T[][] {
  const out: T[][] = []
  for (let i = 0; i < items.length; i += size) out.push(items.slice(i, i + size))
  return out
}

// Fetches article wikitext in batches, following redirects. Missing pages are
// simply absent from the result — a card linking a red-linked wrestler must not
// fail the import.
export async function fetchPages(titles: string[]): Promise<FetchPagesResult> {
  const pages: WikiPage[] = []
  const aliases = new Map<string, string>()
  const unique = [...new Set(titles.map((t) => t.trim()).filter(Boolean))]

  for (const batch of chunk(unique, TITLES_PER_REQUEST)) {
    const json = await apiGet({
      action: 'query',
      prop: 'revisions',
      rvprop: 'content',
      rvslots: 'main',
      redirects: '1',
      titles: batch.join('|')
    })
    // `normalized` (underscores/case) and `redirects` (real redirects) both map
    // a requested title onto the one we actually got back; the importer needs
    // both or half its link targets resolve to nothing.
    for (const n of json?.query?.normalized ?? []) {
      if (n?.from && n?.to) aliases.set(n.from, n.to)
    }
    for (const r of json?.query?.redirects ?? []) {
      if (r?.from && r?.to) aliases.set(r.from, r.to)
    }
    for (const p of json?.query?.pages ?? []) {
      if (p?.missing || !p?.title) continue
      const text = p?.revisions?.[0]?.slots?.main?.content
      if (typeof text !== 'string') continue
      pages.push({ title: p.title, wikitext: text })
    }
    await sleep(REQUEST_DELAY_MS)
  }

  // Collapse alias chains (normalized -> redirect target) so callers get a
  // single hop from whatever the card said to the canonical title.
  for (const [from, to] of [...aliases]) {
    let dest = to
    const seen = new Set([from])
    while (aliases.has(dest) && !seen.has(dest)) {
      seen.add(dest)
      dest = aliases.get(dest)!
    }
    aliases.set(from, dest)
  }

  return { pages, aliases }
}

// Category members of one category. `type` is 'page' for articles or 'subcat'
// for subcategories; both paginate via cmcontinue.
async function categoryMembers(category: string, type: 'page' | 'subcat'): Promise<string[]> {
  const out: string[] = []
  let cont: string | undefined
  do {
    const params: Record<string, string> = {
      action: 'query',
      list: 'categorymembers',
      cmtitle: category,
      cmtype: type,
      cmlimit: '500'
    }
    if (cont) params.cmcontinue = cont
    const json = await apiGet(params)
    for (const m of json?.query?.categorymembers ?? []) {
      if (typeof m?.title === 'string') out.push(m.title)
    }
    cont = json?.continue?.cmcontinue
    await sleep(REQUEST_DELAY_MS)
  } while (cont)
  return out
}

// Article titles that are almost certainly not events. Category trees carry a
// few list/index articles; importing them yields card-less rows.
const NON_EVENT = /^(List of|Category:|Template:|Portal:|Wikipedia:)/i

// Walks a category tree collecting article titles. Depth 2 covers both live
// shapes without special-casing: a "by year" parent (root -> year -> events)
// and a flat category (root -> events). A visited set makes the cyclic parts
// of Wikipedia's category graph safe.
export async function enumerateCategory(root: string, maxDepth = 2): Promise<string[]> {
  const titles = new Set<string>()
  const visited = new Set<string>()
  let frontier = [root]

  for (let depth = 0; depth <= maxDepth && frontier.length > 0; depth++) {
    const next: string[] = []
    for (const cat of frontier) {
      if (visited.has(cat)) continue
      visited.add(cat)
      for (const t of await categoryMembers(cat, 'page')) {
        if (!NON_EVENT.test(t)) titles.add(t)
      }
      if (depth < maxDepth) {
        for (const sub of await categoryMembers(cat, 'subcat')) {
          if (!visited.has(sub)) next.push(sub)
        }
      }
    }
    frontier = next
  }
  return [...titles]
}

export async function enumerateEvents(cfg: WrestlingPromotionCfg): Promise<string[]> {
  const all = new Set<string>()
  for (const root of cfg.rootCategories) {
    for (const t of await enumerateCategory(root)) all.add(t)
  }
  return [...all]
}

// The API now appends `?utm_source=…&utm_campaign=api&utm_content=…` to every
// image URL it returns. downloadImage is content-addressed on sha1(url), so
// leaving those on means the whole poster set re-downloads the day WMF changes
// a campaign string.
function stripTracking(url: string): string {
  const q = url.indexOf('?')
  return q < 0 ? url : url.slice(0, q)
}

// Resolves `File:…` names to downloadable URLs.
//
// This exists instead of `prop=pageimages` because pageimages does not work for
// what we need: event posters are NON-FREE fair-use images, which pageimages
// excludes entirely (an event article returns no pageimage at all), and for
// stables it returns a wrong-but-plausible picture scraped out of a navbox.
// Going through the infobox's own `|image=` filename is the only path that
// yields the actual poster.
export async function resolveFiles(fileNames: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  const unique = [
    ...new Set(
      fileNames
        .map((f) => f.trim())
        .filter(Boolean)
        .map((f) => (/^file:/i.test(f) ? f : `File:${f}`))
    )
  ]
  for (const batch of chunk(unique, TITLES_PER_REQUEST)) {
    const json = await apiGet({
      action: 'query',
      prop: 'imageinfo',
      iiprop: 'url',
      titles: batch.join('|')
    })
    // The API answers under the NORMALIZED title ("File:A_b.jpg" ->
    // "File:A b.jpg"), so the caller's own key has to be mapped back or an
    // underscored infobox filename silently resolves to no poster at all.
    const back = new Map<string, string>()
    for (const n of json?.query?.normalized ?? []) {
      if (n?.from && n?.to) back.set(n.to, n.from)
    }
    for (const p of json?.query?.pages ?? []) {
      const src = p?.imageinfo?.[0]?.url
      if (p?.title && typeof src === 'string') {
        const url = stripTracking(src)
        out.set(p.title, url)
        const asked = back.get(p.title)
        if (asked) out.set(asked, url)
      }
    }
    await sleep(REQUEST_DELAY_MS)
  }
  return out
}

// Portraits for WRESTLERS only — never events (no pageimage exists) and never
// stables (verified: Bullet Club and The Bloodline both return the same generic
// 1938 stock photo lifted from a navbox).
export async function pageImages(titles: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  const unique = [...new Set(titles.map((t) => t.trim()).filter(Boolean))]
  for (const batch of chunk(unique, TITLES_PER_REQUEST)) {
    const json = await apiGet({
      action: 'query',
      prop: 'pageimages',
      piprop: 'original',
      redirects: '1',
      titles: batch.join('|')
    })
    for (const p of json?.query?.pages ?? []) {
      const src = p?.original?.source
      if (p?.title && typeof src === 'string') out.set(p.title, stripTracking(src))
    }
    await sleep(REQUEST_DELAY_MS)
  }
  return out
}

// Resolves titles to their canonical form WITHOUT fetching content — the
// redirect/normalization mapping only. This is what actually dedups wrestlers:
// cards link [[Steve Austin]] and [[Stone Cold Steve Austin]] interchangeably,
// and the event crawl never fetches wrestler articles, so nothing else would
// ever learn that they are one person.
export async function resolveTitles(titles: string[]): Promise<Map<string, string>> {
  const out = new Map<string, string>()
  const unique = [...new Set(titles.map((t) => t.trim()).filter(Boolean))]
  for (const batch of chunk(unique, TITLES_PER_REQUEST)) {
    const json = await apiGet({ action: 'query', redirects: '1', titles: batch.join('|') })
    for (const n of json?.query?.normalized ?? []) {
      if (n?.from && n?.to) out.set(n.from, n.to)
    }
    for (const r of json?.query?.redirects ?? []) {
      if (r?.from && r?.to) out.set(r.from, r.to)
    }
    await sleep(REQUEST_DELAY_MS)
  }
  // Collapse normalized -> redirect chains into one hop.
  for (const [from, to] of [...out]) {
    let dest = to
    const seen = new Set([from])
    while (out.has(dest) && !seen.has(dest)) {
      seen.add(dest)
      dest = out.get(dest)!
    }
    out.set(from, dest)
  }
  return out
}

