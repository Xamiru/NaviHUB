import { execFile } from 'child_process'
import { get as getSetting } from './repos/settingsRepo'
import { fetchWithRetry } from './http'
import * as tasks from './tasks'
import { indexersForCategories } from '@shared/torrents'
import type {
  JackettEnsureResult,
  TorrentSearchResponse,
  TorrentSearchResult,
  TorrentSearchStatus,
  TorrentServiceTestResult
} from '@shared/types'

// A configured Jackett indexer + the standard Torznab categories it advertises.
export interface IndexerInfo {
  id: string
  name: string
  categories: number[]
}

// Torrent search against a locally-running Jackett instance. NaviHUB does no
// torrenting itself — Jackett aggregates the user's indexers, qBittorrent
// (qbittorrent.ts) downloads. Search uses the JSON aggregate endpoint (the one
// Jackett's own dashboard calls); the Torznab XML endpoint is touched only by
// the Settings probe (t=caps answers instantly without querying any indexer).

/* eslint-disable @typescript-eslint/no-explicit-any */

// ---------------- pure helpers (unit-tested) ----------------

// `indexer` is a Jackett indexer id, or 'all' for its aggregate endpoint.
export function jackettSearchUrl(
  base: string,
  apiKey: string,
  query: string,
  cats: number[],
  indexer = 'all'
): string {
  const url = new URL(`${base.replace(/\/+$/, '')}/api/v2.0/indexers/${indexer}/results`)
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

// Torznab t=indexers is the ONLY indexer list reachable with just the API key —
// Jackett's /api/v2.0/indexers admin endpoint 302s to its login page even when
// no admin password is set (verified against a live 59-indexer instance).
export function jackettIndexersUrl(base: string, apiKey: string): string {
  const url = new URL(`${base.replace(/\/+$/, '')}/api/v2.0/indexers/all/results/torznab/api`)
  url.searchParams.set('apikey', apiKey)
  url.searchParams.set('t', 'indexers')
  url.searchParams.set('configured', 'true')
  return url.toString()
}

// <indexer id="nyaasi"><title>Nyaa.si</title>…<categories><category id="5000">
// <subcat id="5070"/></category></categories></indexer> — hand-rolled tag scan
// (epub.ts approach, no XML dep). The advertised category ids drive per-media
// indexer scoping (indexersForCategories). Malformed input yields [], which
// makes the caller fall back to the aggregate endpoint.
export function parseIndexerList(xml: string): IndexerInfo[] {
  const out: IndexerInfo[] = []
  const seen = new Set<string>()
  for (const block of xml.split(/<indexer\b/i).slice(1)) {
    const id = block.match(/^[^>]*\bid="([^"]+)"/)?.[1]
    if (!id || seen.has(id)) continue
    seen.add(id)
    const name = block.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim()
    // Both <category id> and <subcat id>; dedupe, numbers only.
    const categories = [
      ...new Set(
        [...block.matchAll(/<(?:category|subcat)\b[^>]*\bid="(\d+)"/gi)].map((m) => Number(m[1]))
      )
    ]
    out.push({ id, name: name || id, categories })
  }
  return out
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

export async function searchTorrents(
  query: string,
  categories: number[],
  indexer = 'all'
): Promise<TorrentSearchResponse> {
  const { base, apiKey } = requireConfig()
  let res: Response
  try {
    // Interactive call: rateLimitWaits 0 + one retry so a dead host errors in
    // seconds. The timeout is per-indexer generous — a slow tracker must not
    // kill its own results, and the fan-out keeps the UI busy meanwhile.
    res = await fetchWithRetry(
      jackettSearchUrl(base, apiKey, query, categories, indexer),
      { headers: { Accept: 'application/json' }, timeoutMs: 60_000, rateLimitWaits: 0 },
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

// ---------------- progressive search ----------------

// Jackett's aggregate endpoint blocks until the SLOWEST of the user's indexers
// answers (measured: 16.7s across 59 indexers) — so instead one job fans out
// per indexer and results land as each returns, qBittorrent-style. Status is a
// module-level object the renderer polls (musicDownload pattern; the app has
// no push channel). Workers guard on the job id, so starting a new search or
// cancelling makes stale ones drop their results.

const SEARCH_POOL = 16 // concurrent indexer requests

interface SearchJob {
  id: string
  query: string
  running: boolean
  // Separate from `running`, which a finished fan-out clears too: without this
  // the projection cannot tell a search the user stopped from one that
  // completed, and a deliberate Stop settles green as "done".
  cancelled: boolean
  indexerTotal: number
  indexerDone: number
  results: TorrentSearchResult[]
  errors: string[]
}

let job: SearchJob | null = null
let jobCounter = 0

export function startSearch(query: string, categories: number[]): { id: string } {
  requireConfig() // throws before we hand back an id the UI would poll
  const id = `search-${++jobCounter}`
  job = {
    id,
    query,
    running: true,
    cancelled: false,
    indexerTotal: 0,
    indexerDone: 0,
    results: [],
    errors: []
  }
  // ephemeral: a session's worth of searches would otherwise fill the finished
  // list. Projected from the job's counters directly, NEVER from searchStatus(0)
  // — that copies the whole >1000-row result array on every ~1Hz poll.
  tasks.create({
    kind: 'torrentSearch',
    label: `Torrent search: ${query}`,
    route: '/torrents',
    ephemeral: true,
    controls: { cancel: () => cancelSearch(id), pauseNote: 'Searches cannot be paused' },
    project: () => {
      if (job?.id !== id) return null
      if (!job.running)
        return {
          state: job.cancelled ? 'cancelled' : 'done',
          done: job.indexerDone,
          total: job.indexerTotal
        }
      return {
        detail: `${job.results.length} results`,
        done: job.indexerDone,
        total: job.indexerTotal
      }
    }
  })
  void runSearch(id, query, categories)
  return { id }
}

async function runSearch(id: string, query: string, categories: number[]): Promise<void> {
  const { base, apiKey } = requireConfig()

  let indexers: IndexerInfo[] = []
  try {
    const res = await fetchWithRetry(
      jackettIndexersUrl(base, apiKey),
      { timeoutMs: 10_000, rateLimitWaits: 0 },
      1
    )
    if (res.ok) indexers = parseIndexerList(await res.text())
  } catch {
    /* fall back to the aggregate endpoint below */
  }
  if (job?.id !== id) return

  // Scope the fan-out to indexers that advertise a requested category (an anime
  // search skips audiobook-/movie-only indexers); an empty category set ("All
  // categories") queries everyone. Older/locked-down Jacketts that won't list
  // indexers still work as one aggregate request — just not progressively.
  const scoped = indexersForCategories(indexers, categories)
  const targets: IndexerInfo[] =
    scoped.length > 0 ? scoped : [{ id: 'all', name: 'All indexers', categories: [] }]
  job.indexerTotal = targets.length

  let next = 0
  const worker = async (): Promise<void> => {
    while (job?.id === id && job.running) {
      const i = next++
      if (i >= targets.length) return
      const target = targets[i]
      try {
        const page = await searchTorrents(query, categories, target.id)
        if (job?.id !== id) return
        job.results.push(...page.results)
        job.errors.push(...page.indexerErrors)
      } catch (e) {
        if (job?.id !== id) return
        job.errors.push(`${target.name}: ${e instanceof Error ? e.message : 'failed'}`)
      } finally {
        if (job?.id === id) job.indexerDone++
      }
    }
  }
  await Promise.all(Array.from({ length: Math.min(SEARCH_POOL, targets.length) }, worker))
  if (job?.id === id) job.running = false
}

// `offset` = how many results the poller already has; only newer rows are sent
// (a broad search returns >1000 rows and polls run every ~400ms).
export function searchStatus(offset = 0): TorrentSearchStatus | null {
  if (!job) return null
  return {
    id: job.id,
    query: job.query,
    running: job.running,
    indexerTotal: job.indexerTotal,
    indexerDone: job.indexerDone,
    totalResults: job.results.length,
    results: job.results.slice(Math.max(0, offset)),
    errors: [...job.errors]
  }
}

// Stops the fan-out but KEEPS what's already found (qBittorrent's Stop button).
export function cancelSearch(id: string): void {
  if (job?.id !== id) return
  job.running = false
  job.cancelled = true
}

// ---------------- "Start Jackett" ----------------

// The user's Jackett is a systemd unit. --no-ask-password is load-bearing: a
// spawned process has no TTY or askpass helper, so a polkit challenge would
// hang the button forever instead of failing with a message. Override with the
// jackett.start_cmd setting (argv-style, run WITHOUT a shell).
export const DEFAULT_JACKETT_START_CMD = 'systemctl start --no-ask-password jackett.service'

export function parseStartCommand(cmd: string): string[] {
  return cmd.trim().split(/\s+/).filter(Boolean)
}

// Starting a service only makes sense for a Jackett on this machine.
export function isLocalHost(base: string): boolean {
  try {
    const h = new URL(base).hostname
    return h === 'localhost' || h === '127.0.0.1' || h === '::1' || h === '[::1]'
  } catch {
    return false
  }
}

// Any HTTP answer means the server is listening — this probe deliberately
// needs no API key, so it works before Jackett is fully configured.
async function jackettUp(base: string): Promise<boolean> {
  try {
    await fetchWithRetry(base, { timeoutMs: 2500, rateLimitWaits: 0 }, 0)
    return true
  } catch {
    return false
  }
}

function runStartCommand(argv: string[]): Promise<void> {
  return new Promise((resolve, reject) => {
    execFile(argv[0], argv.slice(1), { timeout: 15_000 }, (err, _stdout, stderr) => {
      if (err) reject(new Error(stderr?.trim() || err.message))
      else resolve()
    })
  })
}

const sleep = (ms: number): Promise<void> => new Promise((r) => setTimeout(r, ms))

// Probe first, start only if it's actually down, then poll — Jackett is a
// .NET service that takes a few seconds to bind after systemd returns.
export async function ensureJackettRunning(): Promise<JackettEnsureResult> {
  const base = getSetting('jackett.url')?.trim() ?? ''
  if (!base)
    return { running: false, started: false, message: 'Set the Jackett URL in Settings → Tools first.' }
  if (await jackettUp(base))
    return { running: true, started: false, message: 'Jackett is already running.' }
  if (!isLocalHost(base))
    return {
      running: false,
      started: false,
      message: `Jackett at ${base} isn't on this machine — start it there.`
    }

  const cmd = getSetting('jackett.start_cmd')?.trim() || DEFAULT_JACKETT_START_CMD
  const argv = parseStartCommand(cmd)
  if (argv.length === 0)
    return { running: false, started: false, message: 'The Jackett start command is empty.' }
  try {
    await runStartCommand(argv)
  } catch (e) {
    return {
      running: false,
      started: false,
      message: `Couldn't run "${cmd}" — ${e instanceof Error ? e.message : 'start failed'}`
    }
  }

  // Measured cold start on the dev machine: ~13s from `systemctl start` to a
  // bound port, so the budget is deliberately generous.
  for (let i = 0; i < 45; i++) {
    await sleep(1000)
    if (await jackettUp(base)) return { running: true, started: true, message: 'Jackett started.' }
  }
  return {
    running: false,
    started: true,
    message: `Ran "${cmd}" but Jackett still isn't answering at ${base}.`
  }
}
