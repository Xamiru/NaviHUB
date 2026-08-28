import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { fetchWithRetry } from '../src/main/http'

// Scripted fetch: each call pops the next status off the queue.
function stubFetch(statuses: (number | 'network')[], headers: Record<string, string> = {}): {
  calls: number
} {
  const state = { calls: 0 }
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => {
      const status = statuses[Math.min(state.calls, statuses.length - 1)]
      state.calls++
      if (status === 'network') throw new TypeError('fetch failed')
      return new Response('', { status, headers })
    })
  )
  return state
}

beforeEach(() => {
  vi.useFakeTimers()
})

afterEach(() => {
  vi.useRealTimers()
  vi.unstubAllGlobals()
})

async function settled<T>(p: Promise<T>): Promise<T> {
  // Drain every pending sleep in the retry loop.
  await vi.runAllTimersAsync()
  return p
}

describe('fetchWithRetry', () => {
  it('does not let 429 waits consume the 5xx retry budget', async () => {
    // One rate-limit wait, then three 5xx retries must all still be available.
    const state = stubFetch([429, 500, 500, 500, 200], { 'retry-after': '1' })
    const res = await settled(fetchWithRetry('http://x', undefined, 3))
    expect(res.status).toBe(200)
    expect(state.calls).toBe(5)
  })

  it('gives up on 429 after the safety valve and returns the response', async () => {
    const state = stubFetch([429], { 'retry-after': '1' })
    const res = await settled(fetchWithRetry('http://x'))
    expect(res.status).toBe(429)
    expect(state.calls).toBe(6) // 5 waits + the final returned response
  })

  it('waits retry-after (+1s) on 429, not the 60s default', async () => {
    stubFetch([429, 200], { 'retry-after': '2' })
    const p = fetchWithRetry('http://x')
    await vi.advanceTimersByTimeAsync(3000) // (2+1)s covers the single wait
    const res = await p
    expect(res.status).toBe(200)
  })

  it('retries network errors with backoff up to the retry budget', async () => {
    const state = stubFetch(['network', 'network', 200])
    const res = await settled(fetchWithRetry('http://x', undefined, 3))
    expect(res.status).toBe(200)
    expect(state.calls).toBe(3)
  })

  it('returns non-retryable 4xx immediately', async () => {
    const state = stubFetch([404])
    const res = await fetchWithRetry('http://x')
    expect(res.status).toBe(404)
    expect(state.calls).toBe(1)
  })

  it('returns 429 immediately when rateLimitWaits is 0 (interactive fetches)', async () => {
    // No retry-after header — the default path would sleep 60s; the opt-out
    // must hand the 429 straight back (gacha subreddit fetch relies on this).
    const state = stubFetch([429])
    const res = await fetchWithRetry('http://x', { rateLimitWaits: 0 })
    expect(res.status).toBe(429)
    expect(state.calls).toBe(1)
  })

  it('aborts an active request through the internal task signal without retrying', async () => {
    const controller = new AbortController()
    const fetchMock = vi.fn((_url: string, init: RequestInit) =>
      new Promise<Response>((_resolve, reject) => {
        init.signal?.addEventListener('abort', () => reject(new Error('aborted')), { once: true })
      })
    )
    vi.stubGlobal('fetch', fetchMock)
    const pending = fetchWithRetry('http://slow', { taskSignal: controller.signal }, 3)
    await Promise.resolve()
    controller.abort()
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
    expect(fetchMock).toHaveBeenCalledOnce()
  })

  it('aborts a retry wait instead of starting another request', async () => {
    const controller = new AbortController()
    const state = stubFetch([500, 200])
    const pending = fetchWithRetry('http://retrying', { taskSignal: controller.signal }, 3)
    await Promise.resolve()
    controller.abort()
    await expect(pending).rejects.toMatchObject({ name: 'AbortError' })
    expect(state.calls).toBe(1)
  })
})
