import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// Jackett search client: pure URL builders + JSON mapping, and the IO paths
// (settings guard, friendly network/auth errors) with mocked http — the
// gachaNews.test.ts recipe, no network.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

const fetchWithRetry = vi.fn()
vi.mock('../src/main/http', () => ({
  fetchWithRetry: (...args: unknown[]) => fetchWithRetry(...args)
}))

// execFile is mocked so the ensure tests never touch the real systemd unit.
const execFile = vi.fn()
vi.mock('child_process', () => ({
  execFile: (...args: unknown[]) => execFile(...args)
}))

import {
  cancelSearch,
  DEFAULT_JACKETT_START_CMD,
  ensureJackettRunning,
  isLocalHost,
  jackettCapsUrl,
  jackettIndexersUrl,
  jackettSearchUrl,
  parseIndexerList,
  parseJackettResults,
  parseStartCommand,
  searchStatus,
  searchTorrents,
  startSearch,
  testJackett
} from '../src/main/jackett'
import { set as setSetting } from '../src/main/repos/settingsRepo'

function seedConfig(): void {
  setSetting('jackett.url', 'http://localhost:9117')
  setSetting('jackett.api_key', 'k3y')
}

beforeEach(() => {
  db = createTestDb()
  fetchWithRetry.mockReset()
  execFile.mockReset()
  // Default: the start command succeeds (cb(err, stdout, stderr)).
  execFile.mockImplementation((_bin, _args, _opts, cb) => cb(null, '', ''))
})

describe('jackettSearchUrl', () => {
  it('builds the aggregate JSON endpoint with encoded query and repeated categories', () => {
    const url = jackettSearchUrl('http://localhost:9117', 'k3y', 'steins;gate 0', [5070, 7030])
    expect(url).toContain('http://localhost:9117/api/v2.0/indexers/all/results?')
    expect(url).toContain('apikey=k3y')
    expect(url).toContain('Query=steins%3Bgate+0')
    expect(url.match(/Category%5B%5D=/g)).toHaveLength(2)
    expect(url).toContain('Category%5B%5D=5070')
    expect(url).toContain('Category%5B%5D=7030')
  })

  it('omits the category param entirely for [] and strips trailing slashes', () => {
    const url = jackettSearchUrl('http://localhost:9117///', 'k', 'q', [])
    expect(url).toContain('http://localhost:9117/api/v2.0/')
    expect(url).not.toContain('Category')
  })
})

describe('jackettCapsUrl', () => {
  it('targets the Torznab caps endpoint', () => {
    const url = jackettCapsUrl('http://localhost:9117', 'k3y')
    expect(url).toContain('/api/v2.0/indexers/all/results/torznab/api')
    expect(url).toContain('t=caps')
  })
})

describe('parseJackettResults', () => {
  const fullRow = {
    Guid: 'http://tracker/guid/1',
    Title: 'Some Show S01 1080p',
    Tracker: 'Nyaa.si',
    CategoryDesc: 'TV/Anime',
    Size: 1234567890,
    Seeders: 42,
    Peers: 7,
    Grabs: 100,
    PublishDate: '2026-07-01T10:00:00Z',
    MagnetUri: 'magnet:?xt=urn:btih:abc',
    Link: 'http://localhost:9117/dl/nyaa/1.torrent',
    Details: 'https://nyaa.si/view/1'
  }

  it('maps a complete row', () => {
    const out = parseJackettResults({ Results: [fullRow], Indexers: [] })
    expect(out.results).toHaveLength(1)
    expect(out.results[0]).toEqual({
      id: 'http://tracker/guid/1',
      title: 'Some Show S01 1080p',
      tracker: 'Nyaa.si',
      category: 'TV/Anime',
      sizeBytes: 1234567890,
      seeders: 42,
      peers: 7,
      grabs: 100,
      publishDate: '2026-07-01T10:00:00Z',
      magnetUri: 'magnet:?xt=urn:btih:abc',
      link: 'http://localhost:9117/dl/nyaa/1.torrent',
      detailsUrl: 'https://nyaa.si/view/1'
    })
    expect(out.indexerErrors).toEqual([])
  })

  it('keeps magnet-less and link-less rows but drops Title-less ones', () => {
    const out = parseJackettResults({
      Results: [
        { ...fullRow, Guid: 'g2', MagnetUri: null }, // link only — fine
        { ...fullRow, Guid: 'g3', MagnetUri: '', Link: null }, // neither — kept, Add disabled in UI
        { ...fullRow, Guid: 'g4', Title: '' } // no title — dropped
      ]
    })
    expect(out.results.map((r) => r.id)).toEqual(['g2', 'g3'])
    expect(out.results[0].magnetUri).toBeNull()
    expect(out.results[1].magnetUri).toBeNull()
    expect(out.results[1].link).toBeNull()
  })

  it('collects per-indexer errors', () => {
    const out = parseJackettResults({
      Results: [],
      Indexers: [
        { ID: 'nyaa', Name: 'Nyaa.si', Error: null },
        { ID: 'privado', Name: 'Privado', Error: 'Login failed' }
      ]
    })
    expect(out.indexerErrors).toEqual(['Privado: Login failed'])
  })

  it('returns an empty response for shapeless payloads', () => {
    expect(parseJackettResults({})).toEqual({ results: [], indexerErrors: [] })
    expect(parseJackettResults(null)).toEqual({ results: [], indexerErrors: [] })
    expect(parseJackettResults({ Results: 'nope' })).toEqual({ results: [], indexerErrors: [] })
  })
})

describe('searchTorrents', () => {
  it('throws the configure message without fetching when settings are missing', async () => {
    await expect(searchTorrents('q', [])).rejects.toThrow(/not configured/i)
    expect(fetchWithRetry).not.toHaveBeenCalled()
  })

  it('hits the built URL and parses the response', async () => {
    seedConfig()
    fetchWithRetry.mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({ Results: [], Indexers: [] })
    })
    const out = await searchTorrents('konosuba', [5070])
    expect(String(fetchWithRetry.mock.calls[0][0])).toContain('Query=konosuba')
    expect(out).toEqual({ results: [], indexerErrors: [] })
  })

  it('maps 401 to an API-key message', async () => {
    seedConfig()
    fetchWithRetry.mockResolvedValue({ ok: false, status: 401 })
    await expect(searchTorrents('q', [])).rejects.toThrow(/API key/i)
  })

  it('maps a network failure to a friendly unreachable message', async () => {
    seedConfig()
    fetchWithRetry.mockRejectedValue(new TypeError('fetch failed'))
    await expect(searchTorrents('q', [])).rejects.toThrow(/Can't reach Jackett/i)
  })
})

describe('testJackett', () => {
  it('reports ok for a clean caps response', async () => {
    seedConfig()
    fetchWithRetry.mockResolvedValue({ ok: true, status: 200, text: async () => '<caps></caps>' })
    expect((await testJackett()).ok).toBe(true)
  })

  it('rejects a Torznab error payload (bad API key)', async () => {
    seedConfig()
    fetchWithRetry.mockResolvedValue({
      ok: true,
      status: 200,
      text: async () => '<error code="100" description="Invalid API Key" />'
    })
    const out = await testJackett()
    expect(out.ok).toBe(false)
    expect(out.message).toMatch(/API key/i)
  })

  it('never throws — missing config and network failures come back as messages', async () => {
    expect((await testJackett()).ok).toBe(false)
    seedConfig()
    fetchWithRetry.mockRejectedValue(new TypeError('fetch failed'))
    const out = await testJackett()
    expect(out.ok).toBe(false)
    expect(out.message).toMatch(/Can't reach Jackett/i)
  })
})

// Trimmed from a real Jackett t=indexers response — both indexers advertise
// the anime category (5070, nested under 5000) so the [5070] fan-out test below
// keeps hitting both.
const INDEXER_XML = `<?xml version="1.0" encoding="UTF-8"?>
<indexers>
  <indexer id="anilibria" configured="true">
    <title>Anilibria</title>
    <description>russian anime</description>
    <caps><categories>
      <category id="5000" name="TV"><subcat id="5070" name="TV/Anime" /></category>
    </categories></caps>
  </indexer>
  <indexer id="nyaasi" configured="true">
    <title>Nyaa.si</title>
    <caps><categories>
      <category id="5000" name="TV"><subcat id="5070" name="TV/Anime" /></category>
    </categories></caps>
  </indexer>
</indexers>`

describe('parseIndexerList', () => {
  it('pulls id + title + advertised category ids out of the list', () => {
    expect(parseIndexerList(INDEXER_XML)).toEqual([
      { id: 'anilibria', name: 'Anilibria', categories: [5000, 5070] },
      { id: 'nyaasi', name: 'Nyaa.si', categories: [5000, 5070] }
    ])
  })

  it('falls back to the id when a title is missing, dedups, and tolerates no categories', () => {
    const xml = '<indexers><indexer id="solo"></indexer><indexer id="solo"></indexer></indexers>'
    expect(parseIndexerList(xml)).toEqual([{ id: 'solo', name: 'solo', categories: [] }])
  })

  it('returns [] for shapeless payloads (caller falls back to the aggregate)', () => {
    expect(parseIndexerList('')).toEqual([])
    expect(parseIndexerList('<html>login</html>')).toEqual([])
  })
})

describe('progressive search', () => {
  // Resolve a fetch by URL so per-indexer calls can return different rows.
  function routeFetch(handler: (url: string) => unknown): void {
    fetchWithRetry.mockImplementation(async (url: string) => handler(String(url)))
  }
  const resultsFor = (title: string) => ({
    ok: true,
    status: 200,
    json: async () => ({ Results: [{ Title: title, Guid: title, Tracker: 'T' }], Indexers: [] })
  })
  const indexerListRes = { ok: true, status: 200, text: async () => INDEXER_XML }

  // Waits for the fan-out to finish (all promises are already resolved mocks).
  async function settle(): Promise<void> {
    for (let i = 0; i < 30 && searchStatus()?.running !== false; i++)
      await new Promise((r) => setTimeout(r, 5))
  }

  it('throws before handing back a job id when Jackett is unconfigured', () => {
    expect(() => startSearch('q', [])).toThrow(/not configured/i)
  })

  it('fans out per indexer and accumulates results as they land', async () => {
    seedConfig()
    routeFetch((url) => {
      if (url.includes('t=indexers')) return indexerListRes
      if (url.includes('/indexers/anilibria/')) return resultsFor('from-anilibria')
      if (url.includes('/indexers/nyaasi/')) return resultsFor('from-nyaasi')
      throw new Error(`unexpected url ${url}`)
    })

    const { id } = startSearch('frieren', [5070])
    expect(searchStatus()).toMatchObject({ id, running: true })
    await settle()

    const done = searchStatus()!
    expect(done.running).toBe(false)
    expect(done.indexerTotal).toBe(2)
    expect(done.indexerDone).toBe(2)
    expect(done.totalResults).toBe(2)
    expect(done.results.map((r) => r.title).sort()).toEqual(['from-anilibria', 'from-nyaasi'])
    // Each indexer was queried on its own endpoint, with the category.
    const searchUrls = fetchWithRetry.mock.calls.map((c) => String(c[0])).filter((u) => !u.includes('t=indexers'))
    expect(searchUrls).toHaveLength(2)
    expect(searchUrls.every((u) => u.includes('Category%5B%5D=5070'))).toBe(true)
  })

  it('scopes the fan-out to indexers advertising a requested category', async () => {
    seedConfig()
    // anime + audiobook indexers; an anime search must skip the audiobook one.
    const mixedList = {
      ok: true,
      status: 200,
      text: async () =>
        `<indexers>
          <indexer id="nyaasi"><title>Nyaa.si</title><caps><categories>
            <category id="5000"><subcat id="5070"/></category></categories></caps></indexer>
          <indexer id="audiobookbay"><title>ABB</title><caps><categories>
            <category id="3000"/></categories></caps></indexer>
        </indexers>`
    }
    routeFetch((url) => (url.includes('t=indexers') ? mixedList : resultsFor('row')))

    startSearch('some anime', [5070])
    await settle()

    expect(searchStatus()!.indexerTotal).toBe(1) // audiobookbay skipped
    const searched = fetchWithRetry.mock.calls
      .map((c) => String(c[0]))
      .filter((u) => !u.includes('t=indexers'))
    expect(searched).toHaveLength(1)
    expect(searched[0]).toContain('/indexers/nyaasi/')
    expect(searched.some((u) => u.includes('/indexers/audiobookbay/'))).toBe(false)
  })

  it('queries every indexer when no category is requested (All categories)', async () => {
    seedConfig()
    routeFetch((url) => (url.includes('t=indexers') ? indexerListRes : resultsFor('row')))
    startSearch('q', [])
    await settle()
    expect(searchStatus()!.indexerTotal).toBe(2) // both, unscoped
  })

  it('only returns rows past the offset the poller already has', async () => {
    seedConfig()
    routeFetch((url) => (url.includes('t=indexers') ? indexerListRes : resultsFor('row')))
    startSearch('q', [])
    await settle()

    expect(searchStatus(0)!.results).toHaveLength(2)
    expect(searchStatus(1)!.results).toHaveLength(1)
    expect(searchStatus(2)!.results).toHaveLength(0)
    // totalResults always reports the full count, regardless of offset.
    expect(searchStatus(2)!.totalResults).toBe(2)
  })

  it("records a failing indexer without losing the others' results", async () => {
    seedConfig()
    routeFetch((url) => {
      if (url.includes('t=indexers')) return indexerListRes
      if (url.includes('/indexers/anilibria/')) return { ok: false, status: 500 }
      return resultsFor('good')
    })
    startSearch('q', [])
    await settle()

    const s = searchStatus()!
    expect(s.totalResults).toBe(1)
    expect(s.indexerDone).toBe(2)
    expect(s.errors.join(' ')).toMatch(/Anilibria/)
  })

  it('falls back to the aggregate endpoint when the indexer list is unavailable', async () => {
    seedConfig()
    routeFetch((url) => {
      if (url.includes('t=indexers')) return { ok: false, status: 302 } // Jackett's login redirect
      return resultsFor('aggregate-row')
    })
    startSearch('q', [])
    await settle()

    const s = searchStatus()!
    expect(s.indexerTotal).toBe(1)
    expect(s.totalResults).toBe(1)
    const searched = fetchWithRetry.mock.calls.map((c) => String(c[0])).find((u) => !u.includes('t=indexers'))
    expect(searched).toContain('/indexers/all/results')
  })

  it('keeps the results already found when cancelled', async () => {
    seedConfig()
    routeFetch((url) => (url.includes('t=indexers') ? indexerListRes : resultsFor('row')))
    const { id } = startSearch('q', [])
    await settle()

    cancelSearch(id)
    const s = searchStatus()!
    expect(s.running).toBe(false)
    expect(s.totalResults).toBe(2) // not wiped
  })

  it('drops a stale job so its rows never reach a newer search', async () => {
    seedConfig()
    routeFetch((url) => (url.includes('t=indexers') ? indexerListRes : resultsFor('old')))
    const first = startSearch('old query', [])
    routeFetch((url) => (url.includes('t=indexers') ? indexerListRes : resultsFor('new')))
    const second = startSearch('new query', [])
    await settle()

    const s = searchStatus()!
    expect(s.id).toBe(second.id)
    expect(s.query).toBe('new query')
    expect(s.results.every((r) => r.title === 'new')).toBe(true)
    // Cancelling the superseded job must not touch the live one.
    cancelSearch(first.id)
    expect(searchStatus()!.running).toBe(false) // already settled, but still job 2
    expect(searchStatus()!.id).toBe(second.id)
  })
})

describe('jackettIndexersUrl', () => {
  it('asks for the configured indexers with the API key only', () => {
    const url = jackettIndexersUrl('http://localhost:9117', 'k3y')
    expect(url).toContain('/api/v2.0/indexers/all/results/torznab/api')
    expect(url).toContain('t=indexers')
    expect(url).toContain('configured=true')
    expect(url).toContain('apikey=k3y')
  })
})

describe('parseStartCommand', () => {
  it('splits argv-style, with no shell involved', () => {
    expect(parseStartCommand(DEFAULT_JACKETT_START_CMD)).toEqual([
      'systemctl',
      'start',
      '--no-ask-password',
      'jackett.service'
    ])
    expect(parseStartCommand('  spaced   out  ')).toEqual(['spaced', 'out'])
    expect(parseStartCommand('   ')).toEqual([])
  })
})

describe('isLocalHost', () => {
  it('recognises loopback hosts only', () => {
    expect(isLocalHost('http://localhost:9117')).toBe(true)
    expect(isLocalHost('http://127.0.0.1:9117')).toBe(true)
    expect(isLocalHost('http://192.168.1.50:9117')).toBe(false)
    expect(isLocalHost('not a url')).toBe(false)
  })
})

describe('ensureJackettRunning', () => {
  it('reports an unconfigured URL without starting anything', async () => {
    const out = await ensureJackettRunning()
    expect(out).toMatchObject({ running: false, started: false })
    expect(out.message).toMatch(/Settings/i)
    expect(execFile).not.toHaveBeenCalled()
  })

  it('does nothing when Jackett already answers', async () => {
    seedConfig()
    fetchWithRetry.mockResolvedValue({ ok: true, status: 200 })
    const out = await ensureJackettRunning()
    expect(out).toEqual({
      running: true,
      started: false,
      message: 'Jackett is already running.'
    })
    expect(execFile).not.toHaveBeenCalled()
  })

  it('runs the default start command and reports success once it binds', async () => {
    seedConfig()
    // Down on the first probe, up on the next.
    fetchWithRetry
      .mockRejectedValueOnce(new TypeError('fetch failed'))
      .mockResolvedValue({ ok: true, status: 200 })
    const out = await ensureJackettRunning()
    expect(execFile.mock.calls[0][0]).toBe('systemctl')
    expect(execFile.mock.calls[0][1]).toEqual(['start', '--no-ask-password', 'jackett.service'])
    expect(out).toEqual({ running: true, started: true, message: 'Jackett started.' })
  })

  it('honours a custom start command', async () => {
    seedConfig()
    setSetting('jackett.start_cmd', '/home/x/Jackett/jackett_launcher.sh --quiet')
    fetchWithRetry
      .mockRejectedValueOnce(new TypeError('fetch failed'))
      .mockResolvedValue({ ok: true, status: 200 })
    await ensureJackettRunning()
    expect(execFile.mock.calls[0][0]).toBe('/home/x/Jackett/jackett_launcher.sh')
    expect(execFile.mock.calls[0][1]).toEqual(['--quiet'])
  })

  it('refuses to start a Jackett that lives on another machine', async () => {
    setSetting('jackett.url', 'http://192.168.1.50:9117')
    setSetting('jackett.api_key', 'k')
    fetchWithRetry.mockRejectedValue(new TypeError('fetch failed'))
    const out = await ensureJackettRunning()
    expect(out.running).toBe(false)
    expect(out.message).toMatch(/isn't on this machine/i)
    expect(execFile).not.toHaveBeenCalled()
  })

  it("surfaces the start command's stderr when it fails", async () => {
    seedConfig()
    fetchWithRetry.mockRejectedValue(new TypeError('fetch failed'))
    execFile.mockImplementation((_bin, _args, _opts, cb) =>
      cb(new Error('exit 1'), '', 'Failed to start jackett.service: Access denied')
    )
    const out = await ensureJackettRunning()
    expect(out).toMatchObject({ running: false, started: false })
    expect(out.message).toMatch(/Access denied/)
  })
})
