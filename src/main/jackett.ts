import { get as getSetting } from './repos/settingsRepo'
import { fetchWithRetry } from './http'
import type { TorrentSearchResponse, TorrentSearchResult, TorrentServiceTestResult } from '@shared/types'

// Torrent search against a locally-running Jackett instance. NaviHUB does no
// torrenting itself — Jackett aggregates the user's indexers, qBittorrent
// (qbittorrent.ts) downloads. Search uses the JSON aggregate endpoint (the one
// Jackett's own dashboard calls); the Torznab XML endpoint is touched only by
// the Settings probe (t=caps answers instantly without querying any indexer).

/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------------- pure helpers (unit-tested) ----------------

export function jackettSearchUrl(base: string, apiKey: string, query: string, cats: number[]): string {
  const url = new URL(`${base.replace(/\/+$/, '')}/api/v2.0/indexers/all/results`)
  url.searchParams.set('apikey', apiKey)
  url.searchParams.set('Query', query)
  for (const c of cats) url.searchParams.append('Category[]', String(c))
  return url.toString()
}

export function jackettCapsUrl(base: string, apiKey: string): string {
  const url = new URL(`${base.replace(/\/+$/, '')}/api/v2.0/indexers/all/results/torznab/api`)
  url.searchParams.set('apikey', apiKey)
  url.searchParams.set('t', 'caps')
  return url.toString()
}

// Raw Jackett aggregate JSON -> results + per-indexer failures. Tolerates
// malformed payloads by returning an empty response rather than throwing
// mid-dialog (parseWallhaven contract). Rows without a magnet OR link are
// kept — the renderer disables Add but Details may still be useful.
export function parseJackettResults(json: any): TorrentSearchResponse {
  const rows = Array.isArray(json?.Results) ? json.Results : []
  const results: TorrentSearchResult[] = rows
    .filter((r: any) => typeof r?.Title === 'string' && r.Title)
    .map((r: any) => ({
      id: String(r.Guid ?? r.Link ?? r.Title),
      title: r.Title,
      tracker: typeof r.Tracker === 'string' && r.Tracker ? r.Tracker : 'unknown',
      category: typeof r.CategoryDesc === 'string' && r.CategoryDesc ? r.CategoryDesc : null,
      sizeBytes: Number.isFinite(r.Size) && r.Size > 0 ? r.Size : null,
      seeders: Number.isFinite(r.Seeders) ? r.Seeders : null,
      peers: Number.isFinite(r.Peers) ? r.Peers : null,
      grabs: Number.isFinite(r.Grabs) ? r.Grabs : null,
      publishDate: typeof r.PublishDate === 'string' && r.PublishDate ? r.PublishDate : null,
      magnetUri: typeof r.MagnetUri === 'string' && r.MagnetUri ? r.MagnetUri : null,
      link: typeof r.Link === 'string' && r.Link ? r.Link : null,
      detailsUrl: typeof r.Details === 'string' && r.Details ? r.Details : null
    }))
  const indexers = Array.isArray(json?.Indexers) ? json.Indexers : []
  const indexerErrors: string[] = indexers
    .filter((i: any) => typeof i?.Error === 'string' && i.Error)
    .map((i: any) => `${i.Name ?? i.ID ?? 'indexer'}: ${i.Error}`)
  return { results, indexerErrors }
}

// ---------------- IO ----------------

function requireConfig(): { base: string; apiKey: string } {
  const base = getSetting('jackett.url')?.trim() ?? ''
  const apiKey = getSetting('jackett.api_key')?.trim() ?? ''
  if (!base || !apiKey)
    throw new Error('Jackett is not configured — set its URL and API key in Settings → Tools.')
  return { base, apiKey }
}

export async function searchTorrents(query: string, categories: number[]): Promise<TorrentSearchResponse> {
  const { base, apiKey } = requireConfig()
  let res: Response
  try {
    // Interactive button-triggered call: fail fast (rateLimitWaits 0, single
    // retry) so a dead host errors in seconds, not a 3-retry backoff.
    res = await fetchWithRetry(
      jackettSearchUrl(base, apiKey, query, categories),
      { headers: { Accept: 'application/json' }, timeoutMs: 20_000, rateLimitWaits: 0 },
      1
    )
  } catch {
    throw new Error(`Can't reach Jackett at ${base} — is it running?`)
  }
  if (res.status === 401 || res.status === 403)
    throw new Error('Jackett rejected the API key — check Settings → Tools.')
  if (!res.ok) throw new Error(`Jackett search failed (${res.status})`)
  return parseJackettResults(await res.json())
}

// Settings "Save & test" probe. Never throws — the result renders inline.
export async function testJackett(): Promise<TorrentServiceTestResult> {
  let base = ''
  try {
    const cfg = requireConfig()
    base = cfg.base
    const res = await fetchWithRetry(
      jackettCapsUrl(base, cfg.apiKey),
      { timeoutMs: 10_000, rateLimitWaits: 0 },
      1
    )
    const body = await res.text()
    // Jackett reports a bad API key as a Torznab <error code="100"> payload.
    if (!res.ok || body.includes('<error '))
      return { ok: false, message: 'Jackett rejected the request — check the API key.' }
    return { ok: true, message: 'Jackett reachable, API key accepted.' }
  } catch (e) {
    // requireConfig's message is user-facing; a fetch failure gets a friendly one.
    if (base) return { ok: false, message: `Can't reach Jackett at ${base} — is it running?` }
    return { ok: false, message: e instanceof Error ? e.message : 'Jackett test failed.' }
  }
}
