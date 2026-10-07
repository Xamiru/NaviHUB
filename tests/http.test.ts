import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import { fetchWithRetry, wikimediaThrottle } from '../src/main/http'
import { WIKIMEDIA_USER_AGENT } from '../src/shared/wikimediaAgent'

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
    // must hand the 429 straight back (interactive fetches rely on this).
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

  it('bounds declared and observed API response bodies', async () => {
    vi.stubGlobal(
      'fetch',
      vi
        .fn()
        .mockResolvedValueOnce(
          new Response('{"ok":true}', { headers: { 'content-length': '999' } })
        )
        .mockResolvedValueOnce(
          new Response(
            new ReadableStream<Uint8Array>({
              start(controller) {
                controller.enqueue(Buffer.from('{"value":"'))
                controller.enqueue(Buffer.from('far too large"}'))
                controller.close()
              }
            })
          )
        )
    )

    const declared = await fetchWithRetry('http://x/declared', { maxResponseBytes: 32 })
    await expect(declared.json()).rejects.toThrow(/response limit/)

    const observed = await fetchWithRetry('http://x/observed', { maxResponseBytes: 16 })
    await expect(observed.json()).rejects.toThrow(/response limit/)
  })

  it('preserves native response fields while safely parsing a bounded body', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () =>
        new Response('{"value":42}', {
          status: 201,
          headers: { 'content-type': 'application/json' }
        })
      )
    )
    const response = await fetchWithRetry('http://x/data', { maxResponseBytes: 1024 })
    expect(response.status).toBe(201)
    await expect(response.json()).resolves.toEqual({ value: 42 })
  })
})

describe('Wikimedia requests', () => {
  const files = (dir: string): string[] => readdirSync(dir).flatMap((name) => {
    const path = join(dir, name)
    return statSync(path).isDirectory() ? files(path) : path.endsWith('.ts') ? [path] : []
  })
  const callers = files('src/main').filter((path) =>
    /https:\/\/[\w.]*(?:wikipedia|wikidata|wikimedia)\.org/.test(readFileSync(path, 'utf8')))

  const agentOf = (call: unknown[]): string | null =>
    new Headers((call[1] as RequestInit | undefined)?.headers).get('user-agent')

  it('identify the app with a contact on every host, whatever agent the caller passed', async () => {
    const fetchMock = vi.fn(async () => new Response('{}'))
    vi.stubGlobal('fetch', fetchMock)
    const interval = wikimediaThrottle.intervalMs
    wikimediaThrottle.intervalMs = 0
    try {
      await fetchWithRetry('https://upload.wikimedia.org/wikipedia/commons/a/ab/X.png')
      await fetchWithRetry('https://en.wikipedia.org/w/api.php', { headers: { 'User-Agent': 'NaviHUB/1.0 (personal media hub)' } })
      await fetchWithRetry('https://query.wikidata.org/sparql', { headers: { Accept: 'application/json' } })
      await fetchWithRetry('https://example.com/a.png', { headers: { 'User-Agent': 'Custom/1' } })
      await fetchWithRetry('https://notwikipedia.org.example.com/a.png')
    } finally {
      wikimediaThrottle.intervalMs = interval
    }
    const calls = fetchMock.mock.calls as unknown[][]
    expect(calls.slice(0, 3).map(agentOf)).toEqual([WIKIMEDIA_USER_AGENT, WIKIMEDIA_USER_AGENT, WIKIMEDIA_USER_AGENT])
    expect(new Headers((calls[2][1] as RequestInit).headers).get('accept')).toBe('application/json')
    expect(agentOf(calls[3])).toBe('Custom/1')
    expect(agentOf(calls[4])).toBeNull()
  })

  it('share one process-wide request budget across Wikipedia, Wikidata and Commons', async () => {
    const started: number[] = []
    vi.stubGlobal('fetch', vi.fn(async () => {
      started.push(Date.now())
      return new Response('{}')
    }))
    const t0 = Date.now()
    const requests = Promise.all([
      fetchWithRetry('https://en.wikipedia.org/w/api.php'),
      fetchWithRetry('https://www.wikidata.org/w/api.php'),
      fetchWithRetry('https://upload.wikimedia.org/x.png'),
      fetchWithRetry('https://example.com/unpaced')
    ])
    await settled(requests)
    const gaps = started.map((at) => at - t0).sort((a, b) => a - b)
    expect(gaps[0]).toBe(0)
    // Three Wikimedia hosts take consecutive slots; the unrelated host is not paced.
    expect(gaps.filter((g) => g > 0)).toHaveLength(2)
    expect(Math.max(...gaps)).toBeGreaterThanOrEqual(2 * wikimediaThrottle.intervalMs)
  })

  it('ask only for the standard thumbnail steps Wikimedia serves', () => {
    const steps = [20, 40, 60, 120, 250, 330, 500, 960, 1280, 1920, 3840]
    for (const path of callers) {
      const text = readFileSync(path, 'utf8')
      const widths = [
        ...text.matchAll(/(?:pithumbsize|iiurlwidth):\s*'(\d+)'/g),
        ...text.matchAll(/fileUrls\([^)]*?(\d+)\s*:\s*(\d+)/g),
        ...text.matchAll(/fileUrls\(\[[^\]]*\],\s*(\d+)/g)
      ].flatMap((match) => match.slice(1).filter(Boolean).map(Number))
      for (const width of widths) expect(steps, `${path} asks for ${width}px`).toContain(width)
    }
  })
})
