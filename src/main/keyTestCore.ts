// Pure half of Settings → Accounts & keys "Test": which request proves a key
// works, and what the provider's answer means. No network, no settings, no
// electron — keyTest.ts does the IO. Every probe is free and spends no quota
// (no search, no generation, no import).

import type { KeyTestResult } from '@shared/types'
import type { TestableKey } from '@shared/keyTests'
import { HARDCOVER_ENDPOINT, authorizationHeader } from './hardcoverCore'

export interface KeyProbe {
  service: string
  url: string
  method: 'GET' | 'POST'
  headers: Record<string, string>
  body?: string
}

// A stable public id the fanart.tv probe can ask about (TMDB movie 550).
const FANART_PROBE_TMDB_ID = '550'

export function probeFor(
  key: TestableKey,
  secret: string,
  extra: { raUsername?: string } = {}
): KeyProbe {
  const json = { Accept: 'application/json' }
  const q = encodeURIComponent(secret)
  switch (key) {
    case 'tmdb.api_key':
      return {
        service: 'TMDB',
        url: `https://api.themoviedb.org/3/configuration?api_key=${q}`,
        method: 'GET',
        headers: json
      }
    case 'omdb.api_key':
      return {
        service: 'OMDb',
        url: `https://www.omdbapi.com/?i=tt0111161&apikey=${q}`,
        method: 'GET',
        headers: json
      }
    case 'hardcover.token':
      return {
        service: 'Hardcover',
        url: HARDCOVER_ENDPOINT,
        method: 'POST',
        headers: {
          ...json,
          'Content-Type': 'application/json',
          Authorization: authorizationHeader(secret)
        },
        body: JSON.stringify({ query: 'query Me { me { username } }' })
      }
    case 'fanarttv.api_key':
      return {
        service: 'fanart.tv',
        url: `https://webservice.fanart.tv/v3/movies/${FANART_PROBE_TMDB_ID}?api_key=${q}`,
        method: 'GET',
        headers: json
      }
    case 'football.api_key':
      // /status is free and does not count against the daily quota.
      return {
        service: 'API-Football',
        url: 'https://v3.football.api-sports.io/status',
        method: 'GET',
        headers: { ...json, 'x-apisports-key': secret }
      }
    case 'steam.web_api_key':
      return {
        service: 'Steam',
        url: `https://api.steampowered.com/ISteamWebAPIUtil/GetSupportedAPIList/v1/?key=${q}`,
        method: 'GET',
        headers: json
      }
    case 'steamgriddb.api_key':
      return {
        service: 'SteamGridDB',
        url: 'https://www.steamgriddb.com/api/v2/search/autocomplete/test',
        method: 'GET',
        headers: { ...json, Authorization: `Bearer ${secret}` }
      }
    case 'ra.api_key':
      return {
        service: 'RetroAchievements',
        url:
          'https://retroachievements.org/API/API_GetConsoleIDs.php' +
          `?z=${encodeURIComponent(extra.raUsername ?? '')}&y=${q}`,
        method: 'GET',
        headers: json
      }
    case 'gemini.api_key':
      return {
        service: 'Gemini',
        url: 'https://generativelanguage.googleapis.com/v1beta/models?pageSize=1',
        method: 'GET',
        headers: { ...json, 'x-goog-api-key': secret }
      }
    case 'anthropic.api_key':
      return {
        service: 'Anthropic',
        url: 'https://api.anthropic.com/v1/models?limit=1',
        method: 'GET',
        headers: { ...json, 'x-api-key': secret, 'anthropic-version': '2023-06-01' }
      }
  }
}

function hasErrors(errors: unknown): boolean {
  if (Array.isArray(errors)) return errors.length > 0
  return !!errors && typeof errors === 'object' && Object.keys(errors).length > 0
}

// The provider's answer → a sentence for the card. Never echoes the key.
export function interpretProbe(
  key: TestableKey,
  service: string,
  status: number,
  body: unknown
): KeyTestResult {
  if (status === 401 || status === 403) {
    return { ok: false, message: `${service} rejected this key.` }
  }
  if (status === 429) {
    return { ok: false, message: `${service} is rate-limiting requests. Try again in a minute.` }
  }
  // Google answers a malformed or revoked key with 400 API_KEY_INVALID.
  if (status === 400 && key === 'gemini.api_key') {
    return { ok: false, message: `${service} rejected this key.` }
  }
  if (status < 200 || status >= 300) {
    return { ok: false, message: `${service} answered with HTTP ${status}. Try again later.` }
  }
  const data = (body ?? {}) as Record<string, any>
  if (key === 'omdb.api_key' && data.Response === 'False') {
    return { ok: false, message: `${service} rejected this key.` }
  }
  if (key === 'hardcover.token' && hasErrors(data.errors)) {
    return { ok: false, message: `${service} rejected this token.` }
  }
  if (key === 'football.api_key') {
    if (hasErrors(data.errors)) return { ok: false, message: `${service} rejected this key.` }
    const requests = data.response?.requests
    if (requests && typeof requests.current === 'number' && typeof requests.limit_day === 'number') {
      return {
        ok: true,
        message: `Key works. ${requests.current} of ${requests.limit_day} requests used today.`
      }
    }
  }
  if (key === 'steamgriddb.api_key' && data.success === false) {
    return { ok: false, message: `${service} rejected this key.` }
  }
  if (key === 'ra.api_key' && !Array.isArray(body)) {
    return { ok: false, message: `${service} rejected this username and key.` }
  }
  if (key === 'hardcover.token') {
    const me = Array.isArray(data.data?.me) ? data.data.me[0] : data.data?.me
    if (me?.username) return { ok: true, message: `Token works (signed in as ${me.username}).` }
  }
  return { ok: true, message: 'Key works.' }
}
