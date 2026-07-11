// Button-triggered online fetching for the Gacha section — the renderer's
// Fetch buttons are the ONLY trigger (never automatic).
//
// News = each game's subreddit hot feed. Reddit's unauthenticated JSON API
// (www/old/api .reddit.com *.json) answers 403 to non-browser clients, but the
// Atom feed (…/hot.rss) stays open — so this parses Atom with a hand-rolled,
// test-covered tag scan (no XML dep; same approach as src/main/epub.ts).
// Convention: ALL network first, then one repo transaction (import pattern).

import { fetchWithRetry } from './http'
import * as gachaRepo from './repos/gachaRepo'
import { gachaGame } from '@shared/gacha'
import type { GachaGameId, GachaNewsFetchResult, GachaNewsUpsert } from '@shared/types'

const USER_AGENT = 'NaviHUB/0.1 (local personal media hub)'

function truncate(text: string, max: number): string {
  return text.length <= max ? text : `${text.slice(0, max - 1).trimEnd()}…`
}

// One pass of XML/HTML entity decoding. The feed double-escapes the content
// HTML (&amp;#39; inside the XML), so callers run it once per layer.
function unescapeXml(s: string): string {
  return s
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&#x([0-9a-f]+);/gi, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}

function tagContent(xml: string, tag: string): string | null {
  const m = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)</${tag}>`))
  return m ? m[1] : null
}

function attrOf(xml: string, tag: string, attr: string): string | null {
  const m = xml.match(new RegExp(`<${tag}\\b[^>]*\\b${attr}="([^"]*)"`))
  return m ? m[1] : null
}

// Pure Atom-feed → news-items mapper, exported for fixture tests. Skips
// entries missing the essentials; dedups by post id.
export function parseSubredditFeed(atom: string): GachaNewsUpsert[] {
  const entries = atom.split('<entry>').slice(1)
  const items: GachaNewsUpsert[] = []
  const seen = new Set<string>()
  for (const e of entries) {
    const id = tagContent(e, 'id')?.trim()
    const rawTitle = tagContent(e, 'title')
    const url = attrOf(e, 'link', 'href')
    if (!id || !rawTitle?.trim() || !url || seen.has(id)) continue
    seen.add(id)

    // Self-text lives in the escaped content HTML as <div class="md">…</div>;
    // pure image/link posts have no md block → no summary.
    let summary: string | null = null
    const contentHtml = tagContent(e, 'content')
    if (contentHtml) {
      const md = unescapeXml(contentHtml).match(/<div class="md">([\s\S]*?)<\/div>/)
      if (md) {
        const text = unescapeXml(md[1].replace(/<[^>]+>/g, ' '))
          .replace(/\s+/g, ' ')
          .trim()
        if (text) summary = truncate(text, 280)
      }
    }

    const author = tagContent(e, 'name')
    const published = tagContent(e, 'published') ?? tagContent(e, 'updated')
    const publishedMs = published ? Date.parse(published) : NaN
    const thumb = attrOf(e, 'media:thumbnail', 'url')

    items.push({
      externalId: id,
      title: unescapeXml(rawTitle).trim(),
      url: unescapeXml(url),
      summary,
      imageUrl: thumb ? unescapeXml(thumb) : null,
      publishedAt: Number.isFinite(publishedMs) ? new Date(publishedMs).toISOString() : null,
      author: author ? unescapeXml(author).trim().replace(/^\/?u\//, '') : null
    })
  }
  return items
}

export async function fetchNews(game: GachaGameId): Promise<GachaNewsFetchResult> {
  const cfg = gachaGame(game)
  if (!cfg) throw new Error(`Unknown gacha game: ${game}`)
  const url = `https://www.reddit.com/r/${cfg.subreddit}/hot.rss?limit=30`
  // rateLimitWaits: 0 — Reddit 429s bursts (e.g. fetching two games back to
  // back) WITHOUT a retry-after header; the default wait would hang the
  // button's busy state for 60s. Fail fast with a clear message instead.
  const res = await fetchWithRetry(url, {
    headers: { 'User-Agent': USER_AGENT, Accept: 'application/atom+xml' },
    timeoutMs: 15_000,
    rateLimitWaits: 0
  })
  if (res.status === 429)
    throw new Error(`Reddit is rate-limiting right now — wait a moment and fetch again`)
  if (!res.ok) throw new Error(`r/${cfg.subreddit} feed request failed (${res.status})`)
  const items = parseSubredditFeed(await res.text())
  // Guard the replace: a parse dud must never wipe the cached feed.
  if (items.length === 0) throw new Error(`r/${cfg.subreddit} returned an empty feed`)
  const result = gachaRepo.replaceNews(game, items)
  gachaRepo.setMeta(game, 'news.fetchedAt', new Date().toISOString())
  return result
}
// Banner fetchers arrive with the per-game detail phases (same shape:
// button-triggered, network-then-transaction).
