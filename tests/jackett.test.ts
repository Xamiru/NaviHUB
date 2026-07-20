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

import {
  jackettCapsUrl,
  jackettSearchUrl,
  parseJackettResults,
  searchTorrents,
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
