import { downloadImages } from './files'
import { fetchWithRetry, MAX_API_RESPONSE_BYTES } from './http'
import { updateActivity } from './progress'
import * as settingsRepo from './repos/settingsRepo'
import * as achievementRepo from './repos/achievementRepo'
import { normTitle } from './steam'
import type { AchievementSetupResult, RaGameCandidate } from '@shared/types'

// RetroAchievements — the achievement provider for emulated games. Unlike the
// Steam side there is nothing to read off disk: RA-enabled emulators report
// unlocks to retroachievements.org against the user's account, so both the
// achievement set AND the unlock history come from their API.
//
// Auth is two query params on every call (z = username, y = Web API key), both
// from Settings. Points are shown here because RA actually awards them — the
// Steam side stays pointless rather than inventing a score.

/* eslint-disable @typescript-eslint/no-explicit-any */

const API = 'https://retroachievements.org/API'
const BADGE = 'https://media.retroachievements.org/Badge'

type RaCatalogRow = RaGameCandidate & { norm: string }
const gameListCache = new Map<string, Promise<RaCatalogRow[]>>()

export function raCredentials(): { username: string; key: string } {
  const username = settingsRepo.get('ra.username')?.trim()
  const key = settingsRepo.get('ra.api_key')?.trim()
  if (!username || !key) {
    throw new Error(
      'RetroAchievements needs a username and Web API key. Both are on your RA profile under ' +
        'Settings > Keys — paste them into Settings > API keys here.'
    )
  }
  return { username, key }
}

export function hasRaCredentials(): boolean {
  return !!settingsRepo.get('ra.username')?.trim() && !!settingsRepo.get('ra.api_key')?.trim()
}

async function raGet(endpoint: string, params: Record<string, string>): Promise<any> {
  const { username, key } = raCredentials()
  const url = new URL(`${API}/${endpoint}`)
  url.searchParams.set('z', username)
  url.searchParams.set('y', key)
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, v)
  const res = await fetchWithRetry(url.toString(), {
    headers: { Accept: 'application/json' },
    timeoutMs: 20_000,
    maxResponseBytes: MAX_API_RESPONSE_BYTES
  })
  if (res.status === 401 || res.status === 403) {
    throw new Error('RetroAchievements rejected the credentials — check them in Settings.')
  }
  if (!res.ok) throw new Error(`RetroAchievements request failed (${res.status})`)
  return res.json()
}

// RA timestamps are UTC but arrive without a zone marker, so Date.parse would
// read them as local time and shift every unlock by the machine's offset.
export function parseRaDate(raw: string | null | undefined): number | null {
  if (!raw?.trim()) return null
  const ms = Date.parse(`${raw.trim().replace(' ', 'T')}Z`)
  return Number.isFinite(ms) ? ms : null
}

export async function consoles(): Promise<{ id: string; name: string }[]> {
  const rows: any[] = await raGet('API_GetConsoleIDs.php', { g: '1', a: '1' })
  return (rows ?? [])
    .filter((c) => c?.ID && c?.Name)
    .map((c) => ({ id: String(c.ID), name: String(c.Name) }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

function gameList(consoleId: string): Promise<RaCatalogRow[]> {
  const cached = gameListCache.get(consoleId)
  if (cached) return cached

  const pending = raGet('API_GetGameList.php', { i: consoleId, f: '1' })
    .then((rows: any[]) =>
      (rows ?? [])
        .filter((g) => g?.ID && g?.Title)
        .map((g) => ({
          gameId: String(g.ID),
          title: String(g.Title),
          consoleName: g.ConsoleName ? String(g.ConsoleName) : null,
          iconUrl: g.ImageIcon ? `https://media.retroachievements.org${g.ImageIcon}` : null,
          norm: normTitle(String(g.Title))
        }))
    )
    .catch((error) => {
      // A transient failure is retryable; never cache the rejection for the
      // rest of the app session.
      gameListCache.delete(consoleId)
      throw error
    })
  gameListCache.set(consoleId, pending)
  return pending
}

export function resetGameListCache(): void {
  gameListCache.clear()
}

// RA has no free-text search endpoint, so this pulls the console's game list
// (achievement-bearing titles only) and filters locally. The dialog also takes
// a game id directly, which is the escape hatch when a title's RA name differs
// too much to match.
export async function searchGames(query: string, consoleId: string): Promise<RaGameCandidate[]> {
  const q = normTitle(query)
  if (!q || !consoleId) return []
  return (await gameList(consoleId))
    // The reverse direction (a SHORTER RA title contained in the query) is what
    // finds "Mario Kart 64" from "Mario Kart 64 (USA)", but it needs a length
    // floor or a game literally called "3" matches every query containing a 3.
    .filter((g) => g.norm.includes(q) || (g.norm.length >= 4 && q.includes(g.norm)))
    // Closest match first: an exact normalized hit beats a substring.
    .sort((a, b) => Number(b.norm === q) - Number(a.norm === q) || a.title.localeCompare(b.title))
    .slice(0, 30)
    .map(({ gameId, title, consoleName, iconUrl }) => ({ gameId, title, consoleName, iconUrl }))
}

// The set AND the user's unlocks in one call — RA returns both, so a sync is a
// single request no matter how large the achievement list is.
export async function fetchRaGame(
  mediaId: number,
  raGameId: string
): Promise<AchievementSetupResult> {
  const id = raGameId.trim()
  if (!/^\d+$/.test(id)) throw new Error(`Not a RetroAchievements game id: ${raGameId}`)

  // Same rule as the Steam side: remember a first choice for retry, but commit
  // any replacement identity only with the complete new snapshot.
  const existing = achievementRepo.getTracking(mediaId)
  if (!existing) {
    achievementRepo.setInitialAssociation(mediaId, 'ra', id)
  }

  updateActivity({ phase: 'fetching' })
  const { username } = raCredentials()
  const game = await raGet('API_GetGameInfoAndUserProgress.php', { g: id, u: username })
  const entries: any[] = Object.values(game?.Achievements ?? {})
  if (!entries.length) {
    throw new Error(`RetroAchievements lists no achievements for game ${id}.`)
  }

  // Rarity the RA way: awarded / distinct players. Casual is the larger,
  // more representative denominator.
  const players = Number(game?.NumDistinctPlayersCasual ?? game?.NumDistinctPlayers ?? 0)
  const pctOf = (awarded: unknown): number | null => {
    const n = Number(awarded)
    if (!players || !Number.isFinite(n)) return null
    return Math.min(100, (n / players) * 100)
  }

  const badgeUrl = (badge: unknown, locked: boolean): string | null =>
    badge ? `${BADGE}/${badge}${locked ? '_lock' : ''}.png` : null

  const images = await downloadImages(
    entries.flatMap((a) => [badgeUrl(a.BadgeName, false), badgeUrl(a.BadgeName, true)])
  )

  updateActivity({ phase: 'writing' })
  const schema = entries
    .filter((a) => a?.ID)
    .sort((a, b) => Number(a.DisplayOrder ?? 0) - Number(b.DisplayOrder ?? 0))
    .map((a) => {
      const icon = badgeUrl(a.BadgeName, false)
      const gray = badgeUrl(a.BadgeName, true)
      return {
        apiName: String(a.ID),
        name: String(a.Title ?? a.ID),
        description: a.Description ? String(a.Description) : null,
        hidden: false, // RA has no hidden flag
        iconPath: (icon && images.get(icon)) || null,
        iconGrayPath: (gray && images.get(gray)) || null,
        points: Number.isFinite(Number(a.Points)) ? Number(a.Points) : null,
        globalPct: pctOf(a.NumAwarded)
      }
    })

  // Hardcore first: it is the stricter, more meaningful earn, and RA sets both
  // fields when a hardcore unlock happened.
  const unlocks = entries
    .map((a) => ({
      apiName: String(a.ID),
      // `||`, NOT `??`: RA sends an EMPTY STRING for the hardcore field on a
      // softcore-only unlock, and `??` would keep it and erase the valid
      // DateEarned beside it (parseRaDate('') is null, and the filter below is
      // the only earned/not-earned test in this path).
      unlockedAtMs: parseRaDate(a.DateEarnedHardcore || a.DateEarned)
    }))
    .filter((u) => u.unlockedAtMs != null)
  const fresh = achievementRepo.replaceSchemaWithUnlocks(
    mediaId,
    'ra',
    id,
    schema,
    unlocks,
    'ra',
    Date.now()
  )

  const summary = achievementRepo.summaryFor(mediaId)
  return {
    total: summary.total,
    unlocked: summary.unlocked,
    importedFromFiles: fresh.length,
    filesFound: 0 // nothing on disk — RA unlocks come from the account
  }
}

// The live poll during a play session: everything the account earned in the
// last `minutes`, which the watcher matches against the tracked game.
export async function recentUnlocks(
  minutes: number
): Promise<{ raGameId: string; apiName: string; unlockedAtMs: number | null }[]> {
  const { username } = raCredentials()
  const rows: any[] = await raGet('API_GetUserRecentAchievements.php', {
    u: username,
    m: String(Math.max(1, Math.floor(minutes)))
  })
  return (rows ?? [])
    .filter((r) => r?.AchievementID && r?.GameID)
    .map((r) => ({
      raGameId: String(r.GameID),
      apiName: String(r.AchievementID),
      unlockedAtMs: parseRaDate(r.Date)
    }))
}
