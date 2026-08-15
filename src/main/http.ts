// Shared fetch wrapper for the external-API importers (AniList, TMDB, VNDB).
// Mirrors the retry behavior scripts/bulk-import.cjs already had, so the live
// app no longer fails on the first 429:
//   - 429: wait out `retry-after` (default 60s) and try again — rate limits are
//     expected during character-heavy imports and don't count as attempts.
//     Interactive button-triggered fetches can opt out (`rateLimitWaits: 0`) to
//     get the 429 back immediately instead of stalling their busy state —
//     Reddit sends 429 with NO retry-after, which would mean a 60s hang.
//   - 5xx / network errors: retry up to `retries` times with short backoff.
//   - other 4xx: returned to the caller immediately (bad key, not found, …).
//
// Every retry, rate-limit wait and final failure is logged (source 'http') —
// this is the one place that knows a stalled import is actually a host being
// slow rather than the app hanging. URLs carry API keys; logBus redacts at
// ingest, so they are passed through raw here.
import { logError, logWarn } from './logBus'

const MAX_RATE_LIMIT_WAITS = 5 // safety valve against a stuck 429 loop
const DEFAULT_TIMEOUT_MS = 30_000

export async function fetchWithRetry(
  url: string,
  init?: RequestInit & { timeoutMs?: number; rateLimitWaits?: number },
  retries = 3
): Promise<Response> {
  const { timeoutMs = DEFAULT_TIMEOUT_MS, rateLimitWaits: maxWaits = MAX_RATE_LIMIT_WAITS, ...rest } =
    init ?? {}
  let rateLimitWaits = 0
  let attempt = 0
  while (true) {
    let res: Response
    try {
      // Per-attempt timeout (a caller-provided signal wins) — without one, a
      // stalled host hangs the import and the activity pill forever.
      res = await fetch(url, {
        ...rest,
        signal: rest.signal ?? AbortSignal.timeout(timeoutMs)
      })
    } catch (err) {
      if (attempt < retries) {
        logWarn('http', `retry ${attempt + 1}/${retries} after ${errText(err)}: ${url}`)
        await sleep(1000 * 2 ** attempt)
        attempt++
        continue
      }
      logError('http', `failed after ${retries} retries (${errText(err)}): ${url}`)
      throw err
    }
    if (res.status === 429 && rateLimitWaits < maxWaits) {
      // Bounded by rateLimitWaits only — a 429 wait must not eat the retry budget.
      rateLimitWaits++
      const retryAfter = Number(res.headers.get('retry-after')) || 60
      logWarn(
        'http',
        `429 rate limited, waiting ${retryAfter}s (${rateLimitWaits}/${maxWaits}): ${url}`
      )
      await sleep((retryAfter + 1) * 1000)
      continue
    }
    if (res.status >= 500 && attempt < retries) {
      logWarn('http', `retry ${attempt + 1}/${retries} after HTTP ${res.status}: ${url}`)
      await sleep(1000 * 2 ** attempt)
      attempt++
      continue
    }
    if (res.status >= 400) logWarn('http', `HTTP ${res.status}: ${url}`)
    return res
  }
}

function errText(err: unknown): string {
  if (err instanceof Error) return err.name === 'TimeoutError' ? 'timeout' : err.message
  return String(err)
}

// Shared by the throttled crawlers (bulk import, steam backfill) too.
export function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}
