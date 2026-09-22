import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createTestDb } from './helpers'

// qBittorrent hand-off client: SID cookie session (login -> add -> 403
// re-login once), bypass-auth-for-localhost mode (no creds, no login), and
// the 'Ok.'/'Fails.' body contract — all with mocked http, no daemon.

let db: Database.Database
vi.mock('../src/main/db/connection', () => ({
  getSqlite: () => db
}))

const fetchWithRetry = vi.fn()
vi.mock('../src/main/http', () => ({
  MAX_API_RESPONSE_BYTES: 32 * 1024 * 1024,
  fetchWithRetry: (...args: unknown[]) => fetchWithRetry(...args)
}))

import {
  addTorrent,
  extractSid,
  pickAddUrl,
  resetQbSession,
  testQbittorrent
} from '../src/main/qbittorrent'
import { set as setSetting } from '../src/main/repos/settingsRepo'

const MAGNET = { magnetUri: 'magnet:?xt=urn:btih:abc', link: null }

function seedConfig(withCreds = true): void {
  setSetting('qbittorrent.url', 'http://localhost:8080')
  if (withCreds) {
    setSetting('qbittorrent.username', 'admin')
    setSetting('qbittorrent.password', 'hunter2')
  }
}

function res(over: Record<string, unknown> = {}) {
  return {
    ok: true,
    status: 200,
    headers: { get: () => null },
    text: async () => 'Ok.',
    ...over
  }
}

function loginRes(sid = 'abc123') {
  return res({
    headers: { get: (k: string) => (k.toLowerCase() === 'set-cookie' ? `SID=${sid}; path=/; HttpOnly` : null) }
  })
}

const calledUrls = () => fetchWithRetry.mock.calls.map((c) => String(c[0]))
const initOf = (i: number) => fetchWithRetry.mock.calls[i][1] as RequestInit

beforeEach(() => {
  db = createTestDb()
  fetchWithRetry.mockReset()
  resetQbSession()
})

describe('extractSid', () => {
  it('pulls the SID out of a typical Set-Cookie header', () => {
    expect(extractSid('SID=abc123; path=/; HttpOnly')).toBe('abc123')
  })
  it('handles folded multi-cookie strings and misses', () => {
    expect(extractSid('other=1, SID=zzz9; path=/')).toBe('zzz9')
    expect(extractSid('other=1')).toBeNull()
    expect(extractSid(null)).toBeNull()
  })
})

describe('pickAddUrl', () => {
  it('prefers the magnet, falls back to the link', () => {
    expect(pickAddUrl('magnet:?x', 'http://dl')).toBe('magnet:?x')
    expect(pickAddUrl(null, 'http://dl')).toBe('http://dl')
    expect(pickAddUrl('  ', 'http://dl')).toBe('http://dl')
    expect(pickAddUrl(null, null)).toBeNull()
  })
})

describe('addTorrent', () => {
  it('throws without any magnet or link, before touching config or network', async () => {
    await expect(addTorrent({ magnetUri: null, link: null })).rejects.toThrow(/no magnet/i)
    expect(fetchWithRetry).not.toHaveBeenCalled()
  })

  it('throws the configure message when no URL is set', async () => {
    await expect(addTorrent(MAGNET)).rejects.toThrow(/not configured/i)
    expect(fetchWithRetry).not.toHaveBeenCalled()
  })

  it('logs in once (form-encoded), adds with the SID cookie, and reuses the session', async () => {
    seedConfig()
    fetchWithRetry
      .mockResolvedValueOnce(loginRes())
      .mockResolvedValueOnce(res())
      .mockResolvedValueOnce(res())

    await addTorrent(MAGNET)
    expect(calledUrls()).toEqual([
      'http://localhost:8080/api/v2/auth/login',
      'http://localhost:8080/api/v2/torrents/add'
    ])
    const login = initOf(0)
    expect(login.method).toBe('POST')
    expect((login.headers as Record<string, string>)['Content-Type']).toBe(
      'application/x-www-form-urlencoded'
    )
    expect(String(login.body)).toBe('username=admin&password=hunter2')
    const add = initOf(1)
    expect((add.headers as Record<string, string>).Cookie).toBe('SID=abc123')
    expect((add.headers as Record<string, string>).Referer).toBe('http://localhost:8080')
    expect(String(add.body)).toContain('urls=magnet')

    // Second add reuses the cached SID — no second login.
    await addTorrent(MAGNET)
    expect(calledUrls()).toHaveLength(3)
    expect(calledUrls()[2]).toContain('/torrents/add')
  })

  it('re-logs in exactly once on a stale-session 403, then gives up', async () => {
    seedConfig()
    fetchWithRetry
      .mockResolvedValueOnce(loginRes('old'))
      .mockResolvedValueOnce(res({ ok: false, status: 403, text: async () => '' }))
      .mockResolvedValueOnce(loginRes('new'))
      .mockResolvedValueOnce(res())
    await addTorrent(MAGNET)
    expect(calledUrls().filter((u) => u.includes('/auth/login'))).toHaveLength(2)
    expect((initOf(3).headers as Record<string, string>).Cookie).toBe('SID=new')

    // 403 twice in a row -> error, no login loop.
    fetchWithRetry.mockReset()
    resetQbSession()
    fetchWithRetry
      .mockResolvedValueOnce(loginRes())
      .mockResolvedValueOnce(res({ ok: false, status: 403, text: async () => '' }))
      .mockResolvedValueOnce(loginRes())
      .mockResolvedValueOnce(res({ ok: false, status: 403, text: async () => '' }))
    await expect(addTorrent(MAGNET)).rejects.toThrow(/requires login|Bypass/i)
    expect(calledUrls().filter((u) => u.includes('/auth/login'))).toHaveLength(2)
  })

  it('skips login entirely in bypass mode (no credentials configured)', async () => {
    seedConfig(false)
    fetchWithRetry.mockResolvedValueOnce(res())
    await addTorrent(MAGNET)
    expect(calledUrls()).toEqual(['http://localhost:8080/api/v2/torrents/add'])
    expect((initOf(0).headers as Record<string, string>).Cookie).toBeUndefined()
  })

  it('explains both fixes on 403 without credentials', async () => {
    seedConfig(false)
    fetchWithRetry.mockResolvedValue(res({ ok: false, status: 403, text: async () => '' }))
    await expect(addTorrent(MAGNET)).rejects.toThrow(/Bypass authentication/i)
    expect(calledUrls().filter((u) => u.includes('/auth/login'))).toHaveLength(0)
  })

  it("maps a 'Fails.' body to the duplicate/invalid message", async () => {
    seedConfig(false)
    fetchWithRetry.mockResolvedValue(res({ text: async () => 'Fails.' }))
    await expect(addTorrent(MAGNET)).rejects.toThrow(/already be added/i)
  })

  it("rejects on a failed login ('Fails.' body / no SID) without attempting the add", async () => {
    seedConfig()
    fetchWithRetry.mockResolvedValue(res({ text: async () => 'Fails.' }))
    await expect(addTorrent(MAGNET)).rejects.toThrow(/login failed/i)
    expect(calledUrls()).toEqual(['http://localhost:8080/api/v2/auth/login'])
  })

  it('treats an empty 200 body as success (older qBittorrent versions)', async () => {
    seedConfig(false)
    fetchWithRetry.mockResolvedValue(res({ text: async () => '' }))
    await expect(addTorrent(MAGNET)).resolves.toBeUndefined()
  })
})

describe('testQbittorrent', () => {
  it('reports the version on success (with login)', async () => {
    seedConfig()
    fetchWithRetry
      .mockResolvedValueOnce(loginRes())
      .mockResolvedValueOnce(res({ text: async () => 'v5.0.2' }))
    expect(await testQbittorrent()).toEqual({ ok: true, message: 'qBittorrent v5.0.2' })
  })

  it('never throws — unreachable/unconfigured come back as messages', async () => {
    expect((await testQbittorrent()).ok).toBe(false) // not configured
    seedConfig(false)
    fetchWithRetry.mockRejectedValue(new TypeError('fetch failed'))
    const out = await testQbittorrent()
    expect(out.ok).toBe(false)
    expect(out.message).toMatch(/Can't reach qBittorrent/i)
  })
})
