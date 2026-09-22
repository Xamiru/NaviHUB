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
import { currentActivitySignal } from './activityContext'

const MAX_RATE_LIMIT_WAITS = 5 // safety valve against a stuck 429 loop
const DEFAULT_TIMEOUT_MS = 30_000
export const MAX_API_RESPONSE_BYTES = 32 * 1024 * 1024

async function readBoundedBody(response: Response, maxBytes: number, label: string): Promise<Buffer> {
  const declared = Number(response.headers.get('content-length'))
  if (Number.isSafeInteger(declared) && declared > maxBytes) {
    throw new Error(`${label} exceeds the ${maxBytes}-byte response limit`)
  }
  if (!response.body) return Buffer.alloc(0)

  const reader = response.body.getReader()
  const chunks: Uint8Array[] = []
  let total = 0
  try {
    while (true) {
      const { done, value } = await reader.read()
      if (done) break
      total += value.byteLength
      if (total > maxBytes) {
        await reader.cancel().catch(() => {})
        throw new Error(`${label} exceeds the ${maxBytes}-byte response limit`)
      }
      chunks.push(value)
    }
  } catch (error) {
    await reader.cancel().catch(() => {})
    throw error
  }
  return Buffer.concat(chunks, total)
}

// Fetch cannot enforce a body limit until a caller consumes the response. A
// proxy keeps the native Response surface (including url/status/headers) while
// replacing the three whole-body readers used by main-process API clients.
function boundedResponse(response: Response, maxBytes: number, label: string): Response {
  const read = (): Promise<Buffer> => readBoundedBody(response, maxBytes, label)
  return new Proxy(response, {
    get(target, property) {
      if (property === 'json') {
        return async (): Promise<unknown> => JSON.parse(new TextDecoder().decode(await read()))
      }
      if (property === 'text') {
        return async (): Promise<string> => new TextDecoder().decode(await read())
      }
      if (property === 'arrayBuffer') {
        return async (): Promise<ArrayBuffer> => {
          const bytes = await read()
          return bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer
        }
      }
      if (property === 'clone') {
        return (): Response => boundedResponse(target.clone(), maxBytes, label)
      }
      const value = Reflect.get(target, property, target)
      return typeof value === 'function' ? value.bind(target) : value
    }
  })
}

export async function fetchWithRetry(
  url: string,
  init?: RequestInit & {
    timeoutMs?: number
    rateLimitWaits?: number
    // Internal task cancellation, composed with a fresh timeout per attempt.
    // Callers still must not pass a fixed `signal` across retries.
    taskSignal?: AbortSignal
    // Applies to json(), text() and arrayBuffer() consumption. File downloads
    // stream through streamResponseToFile and deliberately set their own caps.
    maxResponseBytes?: number
  },
  retries = 3
): Promise<Response> {
  const {
    timeoutMs = DEFAULT_TIMEOUT_MS,
    rateLimitWaits: maxWaits = MAX_RATE_LIMIT_WAITS,
    taskSignal = currentActivitySignal(),
    maxResponseBytes,
    ...rest
  } = init ?? {}
  let rateLimitWaits = 0
  let attempt = 0
  while (true) {
    let res: Response
    try {
      throwIfAborted(taskSignal)
      // The task signal is composed with a NEW timeout for every attempt. It
      // can stop active I/O without turning one timeout into a deadline across
      // the entire retry loop.
      const signals = [AbortSignal.timeout(timeoutMs)]
      if (taskSignal) signals.push(taskSignal)
      if (rest.signal) signals.push(rest.signal)
      res = await fetch(url, {
        ...rest,
        signal: AbortSignal.any(signals)
      })
    } catch (err) {
      throwIfAborted(taskSignal)
      if (rest.signal?.aborted) throw err
      if (attempt < retries) {
        logWarn('http', `retry ${attempt + 1}/${retries} after ${errText(err)}: ${url}`)
        await sleep(1000 * 2 ** attempt, taskSignal)
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
      await sleep((retryAfter + 1) * 1000, taskSignal)
      continue
    }
    if (res.status >= 500 && attempt < retries) {
      logWarn('http', `retry ${attempt + 1}/${retries} after HTTP ${res.status}: ${url}`)
      await sleep(1000 * 2 ** attempt, taskSignal)
      attempt++
      continue
    }
    if (res.status >= 400) logWarn('http', `HTTP ${res.status}: ${url}`)
    return maxResponseBytes
      ? boundedResponse(res, maxResponseBytes, `Response from ${new URL(url).hostname}`)
      : res
  }
}

function errText(err: unknown): string {
  if (err instanceof Error) return err.name === 'TimeoutError' ? 'timeout' : err.message
  return String(err)
}

// Shared by the throttled crawlers (bulk import, steam backfill) too.
export function sleep(ms: number, signal?: AbortSignal): Promise<void> {
  if (!signal) return new Promise((resolve) => setTimeout(resolve, ms))
  throwIfAborted(signal)
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      signal.removeEventListener('abort', onAbort)
      resolve()
    }, ms)
    const onAbort = (): void => {
      clearTimeout(timer)
      reject(abortError())
    }
    signal.addEventListener('abort', onAbort, { once: true })
  })
}

function throwIfAborted(signal?: AbortSignal): void {
  if (signal?.aborted) throw abortError()
}

function abortError(): Error {
  const error = new Error('Request cancelled')
  error.name = 'AbortError'
  return error
}
