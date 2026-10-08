import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { createThrottle } from './requestThrottle'
import {
  BANGUMI_GAME_TYPE,
  imageOf,
  parseCharacters,
  parseReading,
  parseRelations,
  parseStaff,
  type BgmCharacter,
  type BgmReading,
  type BgmRelation,
  type BgmStaff
} from './bangumiCore'

// IO half of the Bangumi (bgm.tv) client. Keyless public API; Bangumi asks
// clients to identify themselves, and every request — imports, enrichment,
// the library upgrade — shares this one throttle.

const API = 'https://api.bgm.tv/v0'
const USER_AGENT = 'Xamiru/NaviHUB (personal media hub; https://github.com/Xamiru/NaviHUB)'

export const bangumiThrottle = createThrottle(1000)

/* eslint-disable @typescript-eslint/no-explicit-any */

// null = the subject/person does not exist for an anonymous client (deleted,
// merged, or adult-only) — a definitive miss, not an error.
async function bgm(path: string, init: { method?: string; body?: unknown } = {}): Promise<any | null> {
  await bangumiThrottle.take()
  const res = await fetchWithRetry(`${API}${path}`, {
    method: init.method ?? 'GET',
    headers: {
      Accept: 'application/json',
      'User-Agent': USER_AGENT,
      ...(init.body ? { 'Content-Type': 'application/json' } : {})
    },
    body: init.body ? JSON.stringify(init.body) : undefined,
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Bangumi request failed (${res.status})`)
  return res.json()
}

export async function subjectCharacters(subjectId: number): Promise<BgmCharacter[] | null> {
  const json = await bgm(`/subjects/${subjectId}/characters`)
  return json == null ? null : parseCharacters(json)
}

export async function subjectStaff(subjectId: number): Promise<BgmStaff[] | null> {
  const json = await bgm(`/subjects/${subjectId}/persons`)
  return json == null ? null : parseStaff(json)
}

export async function subjectRelations(subjectId: number): Promise<BgmRelation[] | null> {
  const json = await bgm(`/subjects/${subjectId}/subjects`)
  return json == null ? null : parseRelations(json)
}

export async function personReading(personId: number): Promise<BgmReading | null> {
  const json = await bgm(`/persons/${personId}`)
  return json == null ? null : parseReading(json.infobox)
}

export interface BgmSubjectHit {
  id: number
  name: string
  date: string | null
  coverUrl: string | null
}

// Candidates only — a search hit is never linked without the user's choice
// (Bangumi ranks re-releases above originals).
export async function searchGames(keyword: string): Promise<BgmSubjectHit[]> {
  const q = keyword.trim()
  if (!q) return []
  const json = await bgm('/search/subjects?limit=10', {
    method: 'POST',
    body: { keyword: q, filter: { type: [BANGUMI_GAME_TYPE], nsfw: false } }
  })
  const out: BgmSubjectHit[] = []
  for (const s of Array.isArray(json?.data) ? json.data : []) {
    const id = Number(s?.id)
    if (!Number.isInteger(id) || id <= 0 || typeof s?.name !== 'string') continue
    out.push({
      id,
      name: s.name,
      date: typeof s.date === 'string' && s.date ? s.date : null,
      coverUrl: imageOf(s.images)
    })
  }
  return out
}

export async function subjectCover(subjectId: number): Promise<string | null> {
  const json = await bgm(`/subjects/${subjectId}`)
  return json == null ? null : imageOf(json.images)
}
