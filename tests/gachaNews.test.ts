import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'
import type { GachaGameId } from '../src/shared/types'

// Gacha news = the game's subreddit hot feed, parsed from Reddit's Atom RSS
// (the unauthenticated JSON API 403s). Pure feed→items mapping + the
// fetch→replace flow with mocked http (rawgImport.test.ts style, no network).

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

const fetchWithRetry = vi.fn()
vi.mock('../src/main/http', () => ({
  fetchWithRetry: (...args: unknown[]) => fetchWithRetry(...args)
}))

import { fetchNews, parseSubredditFeed } from '../src/main/gacha'
import * as gachaRepo from '../src/main/repos/gachaRepo'

// Trimmed from a real r/HonkaiStarRail hot.rss response: a self post with
// escaped content HTML + thumbnail, an image post (no md block, no thumb),
// and a broken entry that must be skipped.
const fixture =
  '<?xml version="1.0" encoding="UTF-8"?>' +
  '<feed xmlns="http://www.w3.org/2005/Atom" xmlns:media="http://search.yahoo.com/mrss/">' +
  '<category term="HonkaiStarRail" label="r/HonkaiStarRail"/>' +
  '<title>Honkai: Star Rail</title><updated>2026-07-09T21:36:24+00:00</updated>' +
  '<entry>' +
  '<author><name>/u/CinderPerfected</name><uri>https://www.reddit.com/user/CinderPerfected</uri></author>' +
  '<content type="html">&lt;table&gt;&lt;tr&gt;&lt;td&gt; &lt;!-- SC_OFF --&gt;' +
  '&lt;div class=&quot;md&quot;&gt;&lt;p&gt;The Special Program for Version 4.4 is starting! Watch it &amp;amp; grab codes.&lt;/p&gt;&lt;/div&gt;' +
  '&lt;!-- SC_ON --&gt; submitted by &lt;a href=&quot;x&quot;&gt;/u/CinderPerfected&lt;/a&gt;&lt;/td&gt;&lt;/tr&gt;&lt;/table&gt;</content>' +
  '<id>t3_1umbcf8</id>' +
  '<media:thumbnail url="https://preview.redd.it/x.jpeg?width=640&amp;crop=smart" />' +
  '<link href="https://www.reddit.com/r/HonkaiStarRail/comments/1umbcf8/megathread/" />' +
  '<updated>2026-07-03T11:00:13+00:00</updated><published>2026-07-03T11:00:13+00:00</published>' +
  '<title>Version 4.4 &quot;Special Program&quot; Megathread</title>' +
  '</entry>' +
  '<entry>' +
  '<author><name>/u/artfan</name></author>' +
  '<content type="html">&lt;table&gt;image post, no md block&lt;/table&gt;</content>' +
  '<id>t3_zzz999</id>' +
  '<link href="https://www.reddit.com/r/HonkaiStarRail/comments/zzz999/fanart/" />' +
  '<published>2026-07-09T08:00:00+00:00</published>' +
  '<title>Fanart &amp; sketches</title>' +
  '</entry>' +
  '<entry><id>t3_broken</id><title></title></entry>' +
  '</feed>'

beforeEach(() => {
  db = createTestDb()
  fetchWithRetry.mockReset()
})

describe('parseSubredditFeed', () => {
  it('maps Atom entries to news items', () => {
    const items = parseSubredditFeed(fixture)
    expect(items).toHaveLength(2)
    expect(items[0]).toEqual({
      externalId: 't3_1umbcf8',
      title: 'Version 4.4 "Special Program" Megathread',
      url: 'https://www.reddit.com/r/HonkaiStarRail/comments/1umbcf8/megathread/',
      summary: 'The Special Program for Version 4.4 is starting! Watch it & grab codes.',
      imageUrl: 'https://preview.redd.it/x.jpeg?width=640&crop=smart',
      publishedAt: new Date('2026-07-03T11:00:13+00:00').toISOString(),
      author: 'CinderPerfected'
    })
    // Image post: no md block → no summary; no media:thumbnail → no image.
    expect(items[1]).toMatchObject({
      externalId: 't3_zzz999',
      title: 'Fanart & sketches',
      summary: null,
      imageUrl: null,
      author: 'artfan'
    })
  })

  it('dedups repeated post ids', () => {
    const doubled = fixture.replace('</feed>', '') + fixture.split('<entry>').slice(1).join('<entry>')
    const items = parseSubredditFeed(doubled)
    expect(items.map((i) => i.externalId)).toEqual(['t3_1umbcf8', 't3_zzz999'])
  })

  it('returns [] for shapeless payloads', () => {
    expect(parseSubredditFeed('')).toEqual([])
    expect(parseSubredditFeed('<html>blocked</html>')).toEqual([])
  })
})

describe('fetchNews', () => {
  it('throws for an unknown game id', async () => {
    await expect(fetchNews('nope' as GachaGameId)).rejects.toThrow(/unknown gacha game/i)
    expect(fetchWithRetry).not.toHaveBeenCalled()
  })

  it('fetches the configured subreddit and replaces the cached feed', async () => {
    fetchWithRetry.mockResolvedValue({ ok: true, text: async () => fixture })

    const first = await fetchNews('fgo') // every game is fetchable now
    expect(String(fetchWithRetry.mock.calls[0][0])).toContain('/r/grandorder/hot.rss')
    expect(first).toEqual({ added: 2, total: 2 })

    const page = gachaRepo.listNews('fgo')
    expect(page.items.map((n) => n.externalId)).toEqual(['t3_1umbcf8', 't3_zzz999'])
    expect(page.fetchedAt).not.toBeNull()

    // Same feed again → nothing new, still 2 rows.
    const second = await fetchNews('fgo')
    expect(second).toEqual({ added: 0, total: 2 })
    expect(gachaRepo.listNews('fgo').items).toHaveLength(2)
  })

  it('surfaces a non-OK response and writes nothing', async () => {
    fetchWithRetry.mockResolvedValue({ ok: false, status: 403, text: async () => '' })
    await expect(fetchNews('hsr')).rejects.toThrow(/403/)
    expect(gachaRepo.listNews('hsr').items).toHaveLength(0)
    expect(gachaRepo.listNews('hsr').fetchedAt).toBeNull()
  })

  it('never wipes the cached feed on an empty/unparseable response', async () => {
    fetchWithRetry.mockResolvedValue({ ok: true, text: async () => fixture })
    await fetchNews('hsr')
    fetchWithRetry.mockResolvedValue({ ok: true, text: async () => '<feed></feed>' })
    await expect(fetchNews('hsr')).rejects.toThrow(/empty feed/i)
    expect(gachaRepo.listNews('hsr').items).toHaveLength(2)
  })
})
