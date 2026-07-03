// Shared fetch wrapper for the external-API importers (AniList, TMDB, VNDB).
// Mirrors the retry behavior scripts/bulk-import.cjs already had, so the live
// app no longer fails on the first 429:
//   - 429: wait out `retry-after` (default 60s) and try again — rate limits are
//     expected during character-heavy imports and don't count as attempts.
//   - 5xx / network errors: retry up to `retries` times with short backoff.
//   - other 4xx: returned to the caller immediately (bad key, not found, …).
const MAX_RATE_LIMIT_WAITS = 5 // safety valve against a stuck 429 loop

export async function fetchWithRetry(
  url: string,
  init?: RequestInit,
  retries = 3
): Promise<Response> {
  let rateLimitWaits = 0
  for (let attempt = 0; ; attempt++) {
    let res: Response
    try {
      res = await fetch(url, init)
    } catch (err) {
      if (attempt < retries) {
        await sleep(1000 * 2 ** attempt)
        continue
      }
      throw err
    }
    if (res.status === 429 && rateLimitWaits < MAX_RATE_LIMIT_WAITS) {
      rateLimitWaits++
      const retryAfter = Number(res.headers.get('retry-after')) || 60
      await sleep((retryAfter + 1) * 1000)
      continue
    }
    if (res.status >= 500 && attempt < retries) {
      await sleep(1000 * 2 ** attempt)
      continue
    }
    return res
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms))
}
