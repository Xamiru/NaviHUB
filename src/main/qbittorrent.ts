import { get as getSetting } from './repos/settingsRepo'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import type { TorrentAddInput, TorrentServiceTestResult } from '@shared/types'

// Hand-off to a locally-running qBittorrent via its WebUI API. Session flow:
// POST /api/v2/auth/login (form-encoded) yields an SID cookie; /torrents/add
// carries it back plus a Referer (qBittorrent's CSRF check). Credentials are
// optional — with "Bypass authentication for clients on localhost" enabled in
// qBittorrent we skip login entirely. A 403 on add drops the session and
// re-logs in ONCE (hltb.ts re-auth model); never loop logins — qBittorrent
// temporarily IP-bans repeated failures.

// ---------------- pure helpers (unit-tested) ----------------

export function extractSid(setCookie: string | null): string | null {
  const m = setCookie?.match(/SID=([^;,\s]+)/)
  return m ? m[1] : null
}

// Magnet preferred (tracker-independent); Jackett's proxied .torrent link works
// as fallback because qBittorrent fetches it itself and both are LAN-local.
export function pickAddUrl(magnetUri: string | null, link: string | null): string | null {
  return magnetUri?.trim() || link?.trim() || null
}

// ---------------- session ----------------

let sid: string | null = null

export function resetQbSession(): void {
  sid = null
}

interface QbConfig {
  base: string
  username: string
  password: string
}

function config(): QbConfig {
  const base = (getSetting('qbittorrent.url')?.trim() ?? '').replace(/\/+$/, '')
  if (!base) throw new Error('qBittorrent is not configured — set its URL in Settings → Tools.')
  return {
    base,
    username: getSetting('qbittorrent.username')?.trim() ?? '',
    password: getSetting('qbittorrent.password') ?? ''
  }
}

const FORM = 'application/x-www-form-urlencoded'

async function login(cfg: QbConfig): Promise<void> {
  let res: Response
  try {
    res = await fetchWithRetry(
      `${cfg.base}/api/v2/auth/login`,
      {
        method: 'POST',
        headers: { 'Content-Type': FORM, Referer: cfg.base },
        body: new URLSearchParams({ username: cfg.username, password: cfg.password }).toString(),
        timeoutMs: 15_000,
        rateLimitWaits: 0,
        maxResponseBytes: MAX_API_RESPONSE_BYTES
      },
      1
    )
  } catch {
    throw new Error(`Can't reach qBittorrent at ${cfg.base} — is it running?`)
  }
  const body = (await res.text()).trim()
  const got = extractSid(res.headers.get('set-cookie'))
  if (!res.ok || body !== 'Ok.' || !got)
    throw new Error('qBittorrent login failed — check username and password in Settings.')
  sid = got
}

// ---------------- ops ----------------

export async function addTorrent(input: TorrentAddInput): Promise<void> {
  const url = pickAddUrl(input.magnetUri, input.link)
  if (!url) throw new Error('This result has no magnet or download link')
  const cfg = config()
  const hasCreds = !!cfg.username || !!cfg.password

  for (let attempt = 0; ; attempt++) {
    if (hasCreds && !sid) await login(cfg)
    let res: Response
    try {
      res = await fetchWithRetry(
        `${cfg.base}/api/v2/torrents/add`,
        {
          method: 'POST',
          headers: {
            'Content-Type': FORM,
            Referer: cfg.base,
            ...(sid ? { Cookie: `SID=${sid}` } : {})
          },
          body: new URLSearchParams({ urls: url }).toString(),
          timeoutMs: 15_000,
          rateLimitWaits: 0,
          maxResponseBytes: MAX_API_RESPONSE_BYTES
        },
        1
      )
    } catch {
      throw new Error(`Can't reach qBittorrent at ${cfg.base} — is it running?`)
    }
    if (res.status === 403) {
      sid = null
      if (hasCreds && attempt === 0) continue // stale session — re-login once
      throw new Error(
        'qBittorrent requires login — set username/password in Settings → Tools, or enable "Bypass authentication for clients on localhost" in qBittorrent.'
      )
    }
    const body = (await res.text()).trim()
    if (!res.ok) throw new Error(`qBittorrent add failed (${res.status})`)
    if (body === 'Fails.')
      throw new Error('qBittorrent rejected the torrent — it may already be added, or the link is invalid.')
    return // 'Ok.' (some versions answer 200 with an empty body — treat as success)
  }
}

// Settings "Save & test" probe. Never throws — the result renders inline.
export async function testQbittorrent(): Promise<TorrentServiceTestResult> {
  try {
    const cfg = config()
    const hasCreds = !!cfg.username || !!cfg.password
    if (hasCreds && !sid) await login(cfg)
    let res: Response
    try {
      res = await fetchWithRetry(
        `${cfg.base}/api/v2/app/version`,
        {
          headers: sid ? { Cookie: `SID=${sid}`, Referer: cfg.base } : { Referer: cfg.base },
          timeoutMs: 10_000,
          rateLimitWaits: 0,
          maxResponseBytes: MAX_API_RESPONSE_BYTES
        },
        1
      )
    } catch {
      return { ok: false, message: `Can't reach qBittorrent at ${cfg.base} — is it running?` }
    }
    if (res.status === 403) {
      sid = null
      return {
        ok: false,
        message:
          'qBittorrent requires login — set username/password, or enable "Bypass authentication for clients on localhost".'
      }
    }
    if (!res.ok) return { ok: false, message: `qBittorrent answered ${res.status}.` }
    return { ok: true, message: `qBittorrent ${(await res.text()).trim()}` }
  } catch (e) {
    return { ok: false, message: e instanceof Error ? e.message : 'qBittorrent test failed.' }
  }
}
