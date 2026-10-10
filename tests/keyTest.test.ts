import { beforeEach, describe, expect, it, vi } from 'vitest'
import { TESTABLE_KEYS, type TestableKey } from '../src/shared/keyTests'
import { interpretProbe, probeFor } from '../src/main/keyTestCore'
import { redact } from '../src/main/logCore'

const settings = vi.hoisted(() => new Map<string, string>())
const fetchMock = vi.hoisted(() => vi.fn())
vi.mock('../src/main/repos/settingsRepo', () => ({ get: (key: string) => settings.get(key) ?? null }))
vi.mock('../src/main/http', () => ({ fetchWithRetry: fetchMock }))

import { testKey } from '../src/main/keyTest'

const SECRET = 'sekret-123'

function reply(status: number, body: unknown) {
  return { status, json: async () => body }
}

beforeEach(() => {
  settings.clear()
  fetchMock.mockReset()
})

describe('key test probes', () => {
  it.each(TESTABLE_KEYS.map((key) => [key]))('%s uses HTTPS and a fixed, quota-free endpoint', (key) => {
    const probe = probeFor(key as TestableKey, SECRET, { raUsername: 'me' })
    expect(probe.url.startsWith('https://')).toBe(true)
    // Wherever the key travels, the log redactor removes it.
    expect(redact(`${probe.url} ${JSON.stringify(probe.headers)}`)).not.toContain(SECRET)
  })

  it('never puts the key in a result message', () => {
    for (const key of TESTABLE_KEYS) {
      for (const [status, body] of [[200, {}], [401, {}], [400, {}], [500, null], [429, null]] as const) {
        expect(interpretProbe(key, 'Svc', status, body).message).not.toContain(SECRET)
      }
    }
  })

  it('reads provider-specific failures inside a 200', () => {
    expect(interpretProbe('omdb.api_key', 'OMDb', 200, { Response: 'False', Error: 'Invalid API key!' }).ok).toBe(false)
    expect(interpretProbe('hardcover.token', 'Hardcover', 200, { errors: [{ message: 'bad' }] }).ok).toBe(false)
    expect(interpretProbe('football.api_key', 'API-Football', 200, { errors: { token: 'Error/Missing application key' } }).ok).toBe(false)
    expect(interpretProbe('ra.api_key', 'RetroAchievements', 200, { message: 'Unauthenticated.' }).ok).toBe(false)
    expect(interpretProbe('gemini.api_key', 'Gemini', 400, { error: { status: 'INVALID_ARGUMENT' } }).ok).toBe(false)
  })

  it('reports useful detail when the key works', () => {
    expect(
      interpretProbe('football.api_key', 'API-Football', 200, {
        errors: [],
        response: { requests: { current: 12, limit_day: 100 } }
      })
    ).toEqual({ ok: true, message: 'Key works. 12 of 100 requests used today.' })
    expect(interpretProbe('hardcover.token', 'Hardcover', 200, { data: { me: [{ username: 'navi' }] } }).message).toContain('navi')
    expect(interpretProbe('ra.api_key', 'RetroAchievements', 200, [{ ID: 1, Name: 'Genesis' }]).ok).toBe(true)
    expect(interpretProbe('tmdb.api_key', 'TMDB', 401, {}).message).toBe('TMDB rejected this key.')
  })
})

describe('testKey', () => {
  it('needs a saved key and, for RetroAchievements, a username', async () => {
    expect(await testKey('tmdb.api_key')).toEqual({ ok: false, message: 'No key is saved yet.' })
    settings.set('ra.api_key', SECRET)
    expect((await testKey('ra.api_key')).message).toBe('Save the RetroAchievements username first.')
    expect(fetchMock).not.toHaveBeenCalled()
  })

  it('sends one attempt with no rate-limit wait and interprets the answer', async () => {
    settings.set('tmdb.api_key', SECRET)
    fetchMock.mockResolvedValue(reply(200, { images: {} }))
    expect(await testKey('tmdb.api_key')).toEqual({ ok: true, message: 'Key works.' })
    const [url, init, retries] = fetchMock.mock.calls[0]
    expect(url).toContain('/3/configuration')
    expect(init).toMatchObject({ rateLimitWaits: 0, timeoutMs: 15_000 })
    expect(retries).toBe(0)
  })

  it('turns a network failure into a reachability message', async () => {
    settings.set('steam.web_api_key', SECRET)
    fetchMock.mockRejectedValue(new Error('ENOTFOUND'))
    expect(await testKey('steam.web_api_key')).toEqual({
      ok: false,
      message: 'Could not reach Steam. Check the connection.'
    })
  })
})
