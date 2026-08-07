import { getSqlite } from './db/connection'
import { fetchWithRetry } from './http'
import type { HltbTimes } from '@shared/types'

// HowLongToBeat main/extra/completionist play times for games and VNs.
//
// HLTB has no official API; this mirrors what their own site JS does (as of
// mid-2026 — the endpoint name changes every so often, so expect to re-derive
// it from their app bundle if lookups start failing):
//   1. GET  /api/bleed/init?t=<now>  ->  { token, hpKey, hpVal }
//   2. POST /api/bleed  with x-auth-token/x-hp-key/x-hp-val headers, the hp
//      pair echoed into the body, and a search payload; 403 means the token
//      expired -> re-init once and retry.
// The token is bound server-side to IP + User-Agent, so the same UA constant
// must go out on every request. Every failure path returns null/[] — a missing
// time estimate must never break an import.
const BASE = 'https://howlongtobeat.com'
const UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'

interface Creds {
  token: string
  hpKey: string
  hpVal: string
}

let creds: Creds | null = null

function baseHeaders(): Record<string, string> {
  return { 'User-Agent': UA, Referer: `${BASE}/` }
}

async function initCreds(): Promise<Creds | null> {
  try {
    const res = await fetchWithRetry(`${BASE}/api/bleed/init?t=${Date.now()}`, {
      headers: baseHeaders(),
      timeoutMs: 15_000
    })
    if (!res.ok) return null
    const j = (await res.json()) as Partial<Creds>
    creds = j?.token && j?.hpKey && j?.hpVal
      ? { token: j.token, hpKey: j.hpKey, hpVal: j.hpVal }
      : null
    return creds
  } catch {
    return null
  }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
async function search(query: string): Promise<any[]> {
  const terms = query.trim().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  let c = creds ?? (await initCreds())
  if (!c) return []

  for (let attempt = 0; attempt < 2; attempt++) {
    // Payload mirrors the site's search component; the hp key/val pair is a
    // honeypot check that must appear both as headers and as a body field.
    const body: Record<string, unknown> = {
      searchType: 'games',
      searchTerms: terms,
      searchPage: 1,
      size: 20,
      searchOptions: {
        games: {
          userId: 0,
          platform: '',
          sortCategory: 'popular',
          rangeCategory: 'main',
          rangeTime: { min: null, max: null },
          gameplay: { perspective: '', flow: '', genre: '', difficulty: '' },
          rangeYear: { min: '', max: '' },
          modifier: ''
        },
        users: { sortCategory: 'postcount' },
        lists: { sortCategory: 'follows' },
        filter: '',
        sort: 0,
        randomizer: 0
      },
      useCache: true,
      [c.hpKey]: c.hpVal
    }
    try {
      const res = await fetchWithRetry(`${BASE}/api/bleed`, {
        method: 'POST',
        headers: {
          ...baseHeaders(),
          'Content-Type': 'application/json',
          'x-auth-token': c.token,
          'x-hp-key': c.hpKey,
          'x-hp-val': c.hpVal
        },
        body: JSON.stringify(body),
        timeoutMs: 15_000
      })
      if (res.status === 403 && attempt === 0) {
        c = await initCreds()
        if (!c) return []
        continue
      }
      if (!res.ok) return []
      const j = await res.json()
      return Array.isArray(j?.data) ? j.data : []
    } catch {
      return []
    }
  }
  return []
}

// Loose title key: lowercase, accents stripped, punctuation collapsed — so
// "Steins;Gate" matches "Steins Gate" and "Pokémon" matches "Pokemon".
function norm(s: string): string {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

// Results come back popularity-sorted, so the first is already a decent guess;
// an exact title/alias match (and a release year within ±1) beats popularity.
function pickBest(results: any[], title: string, year: number | null): any | null {
  const target = norm(title)
  let best: any = null
  let bestScore = -1
  for (const g of results) {
    let score = 0
    if (norm(String(g.game_name ?? '')) === target) score += 4
    else if (
      typeof g.game_alias === 'string' &&
      g.game_alias.split(/\s*,\s*/).some((a: string) => norm(a) === target)
    )
      score += 3
    if (year && typeof g.release_world === 'number' && Math.abs(g.release_world - year) <= 1)
      score += 2
    if (score > bestScore) {
      bestScore = score
      best = g
    }
  }
  return best
}

// HLTB reports seconds; the DB stores minutes (same unit VNDB uses).
function mins(sec: unknown): number | null {
  return typeof sec === 'number' && sec > 0 ? Math.round(sec / 60) : null
}

function toTimes(g: any): HltbTimes {
  return {
    id: Number(g.game_id) || 0,
    name: String(g.game_name ?? ''),
    main: mins(g.comp_main),
    mainExtra: mins(g.comp_plus),
    completionist: mins(g.comp_100),
    allStyles: mins(g.comp_all),
    mainCount: Number(g.comp_main_count) || 0,
    mainExtraCount: Number(g.comp_plus_count) || 0,
    completionistCount: Number(g.comp_100_count) || 0,
    allStylesCount: Number(g.comp_all_count) || 0
  }
}

// HLTB's Main Story time as whole hours — the authoritative game length for
// media_item.total_units (games store hours). allStyles covers titles where
// HLTB has no per-style split; max(1,…) keeps a sub-30-minute game from
// rounding to a 0-hour length.
export function hltbLengthHours(t: HltbTimes): number | null {
  const min = t.main ?? t.allStyles
  return min != null ? Math.max(1, Math.round(min / 60)) : null
}

// Best-effort lookup by title (+ release year). Falls back to the pre-colon
// part of the title ("Persona 5: The Phantom X" -> "Persona 5") when the full
// title finds nothing. Null on no match or any network trouble.
export async function fetchPlaytimes(
  title: string,
  year: number | null = null
): Promise<HltbTimes | null> {
  if (!title.trim()) return null
  let results = await search(title)
  if (!results.length && title.includes(':')) {
    const short = title.split(':')[0].trim()
    if (short && short !== title) results = await search(short)
  }
  const best = pickBest(results, title, year)
  return best ? toTimes(best) : null
}

// The detail page's "fetch from HLTB" button: look the item's title up, stash
// the times under metadata.hltb (merged, so other keys survive), return them.
// For games it also makes HLTB the authoritative length (total_units, hours) —
// the button is how existing rows with RAWG's crowd-average length get fixed.
// A miss never writes: the previous length always survives.
export async function fetchForMedia(mediaId: number): Promise<HltbTimes | null> {
  const db = getSqlite()
  const row = db
    .prepare('SELECT media_type, title, title_original, release_date FROM media_item WHERE id = ?')
    .get(mediaId) as
    | {
        media_type: string
        title: string
        title_original: string | null
        release_date: string | null
      }
    | undefined
  if (!row) return null

  const year = row.release_date ? Number(row.release_date.slice(0, 4)) || null : null
  const times =
    (await fetchPlaytimes(row.title, year)) ??
    (row.title_original && row.title_original !== row.title
      ? await fetchPlaytimes(row.title_original, year)
      : null)
  if (!times) return null

  const metaRow = db.prepare('SELECT metadata FROM media_item WHERE id = ?').get(mediaId) as
    | { metadata: string | null }
    | undefined
  let meta: Record<string, unknown> = {}
  if (metaRow?.metadata) {
    try {
      meta = JSON.parse(metaRow.metadata) || {}
    } catch {
      meta = {}
    }
  }
  meta.hltb = times
  db.prepare('UPDATE media_item SET metadata = ? WHERE id = ?').run(JSON.stringify(meta), mediaId)

  // Games only: VN lengths stay VNDB's community minutes (different unit, and
  // already good data).
  const hours = hltbLengthHours(times)
  if (row.media_type === 'game' && hours != null) {
    db.prepare('UPDATE media_item SET total_units = ? WHERE id = ?').run(hours, mediaId)
  }
  return times
}
