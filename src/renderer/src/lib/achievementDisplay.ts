import type {
  AchievementGameProgress,
  AchievementRarity,
  AchievementRow,
  AchievementTracking
} from '@shared/types'

export type TrophyFilter =
  | 'all'
  | 'earned'
  | 'locked'
  | 'ultra-rare'
  | 'in-progress'
  | 'hidden'
  | 'manual'
export type TrophySort = 'default' | 'unlock-date' | 'rarity' | 'name'

export interface TrophySummary {
  total: number
  earned: number
  locked: number
  ultraRare: number
  inProgress: number
  hidden: number
  manual: number
  completionPct: number
  earnedPoints: number | null
}

export const RARITY_LABEL: Record<AchievementRarity, string> = {
  common: 'Common',
  uncommon: 'Uncommon',
  rare: 'Rare',
  'ultra-rare': 'Ultra rare'
}

// "4.2% of players" when the provider reports a share, the tier otherwise.
export function rarityText(globalPct: number | null, rarity: AchievementRarity | null): string | null {
  if (globalPct != null) return `${globalPct.toFixed(1)}% of players`
  return rarity ? RARITY_LABEL[rarity] : null
}

// What the tab says about where its list came from. The community page pairs
// names by rank, and a set fetched before the source was kept is unknown —
// both are worth a re-fetch now that Steam's exact keyless list comes first.
export function schemaSourceInfo(tracking: Pick<AchievementTracking, 'provider' | 'schemaSource'>): {
  label: string
  suggestRefetch: boolean
} {
  switch (tracking.schemaSource) {
    case 'local':
      return { label: 'list from the game’s own files', suggestRefetch: false }
    case 'public-api':
      return { label: 'exact list from Steam', suggestRefetch: false }
    case 'webapi':
      return { label: 'exact list from the Steam Web API', suggestRefetch: false }
    case 'community':
      return { label: 'Steam community page, names matched by rank', suggestRefetch: true }
    case 'ra':
      return { label: 'list from RetroAchievements', suggestRefetch: false }
    default:
      // RetroAchievements has one source, so an unrecorded RA set still knows it.
      return tracking.provider === 'ra'
        ? { label: 'list from RetroAchievements', suggestRefetch: false }
        : { label: 'list source not recorded', suggestRefetch: true }
  }
}

export interface TrophyDisplayDecision {
  unlocked: boolean
  iconPath: string | null
  dimLockedArt: boolean
  description: string
  protectsHiddenDescription: boolean
  // The protected text itself, for a reveal the user asks for; null when the
  // provider never supplied one (nothing to reveal).
  hiddenDescription: string | null
}

export function summarizeTrophies(rows: readonly AchievementRow[]): TrophySummary {
  const earned = rows.filter((row) => row.unlockedAt != null)
  const pointRows = earned.filter((row) => row.points != null)
  return {
    total: rows.length,
    earned: earned.length,
    locked: rows.length - earned.length,
    ultraRare: rows.filter((row) => row.rarity === 'ultra-rare').length,
    inProgress: rows.filter((row) => row.unlockedAt == null && row.progress != null).length,
    hidden: rows.filter((row) => row.hidden).length,
    manual: rows.filter((row) => row.unlockedAt != null && row.unlockSource === 'manual').length,
    completionPct: rows.length ? Math.round((earned.length / rows.length) * 100) : 0,
    earnedPoints: pointRows.length
      ? pointRows.reduce((total, row) => total + (row.points ?? 0), 0)
      : null
  }
}

export function trophyDisplayDecision(row: AchievementRow): TrophyDisplayDecision {
  const unlocked = row.unlockedAt != null
  const protectsHiddenDescription = row.hidden && !unlocked
  return {
    unlocked,
    iconPath: unlocked ? row.iconPath : (row.iconGrayPath ?? row.iconPath),
    dimLockedArt: !unlocked && row.iconGrayPath == null && row.iconPath != null,
    description: protectsHiddenDescription ? 'Hidden achievement' : (row.description ?? ''),
    protectsHiddenDescription,
    hiddenDescription: protectsHiddenDescription ? (row.description ?? null) : null
  }
}

export function filterTrophies(
  rows: readonly AchievementRow[],
  filter: TrophyFilter
): AchievementRow[] {
  if (filter === 'earned') return rows.filter((row) => row.unlockedAt != null)
  if (filter === 'locked') return rows.filter((row) => row.unlockedAt == null)
  if (filter === 'ultra-rare') return rows.filter((row) => row.rarity === 'ultra-rare')
  if (filter === 'in-progress') {
    return rows.filter((row) => row.unlockedAt == null && row.progress != null)
  }
  if (filter === 'hidden') return rows.filter((row) => row.hidden)
  if (filter === 'manual') {
    return rows.filter((row) => row.unlockedAt != null && row.unlockSource === 'manual')
  }
  return [...rows]
}

// Name and the description the row shows. A locked hidden achievement's text
// is not searched, so a match cannot give away what it says.
export function searchTrophies(rows: readonly AchievementRow[], query: string): AchievementRow[] {
  const q = query.trim().toLocaleLowerCase()
  if (!q) return [...rows]
  return rows.filter((row) => {
    if (row.name.toLocaleLowerCase().includes(q)) return true
    const shown = row.hidden && row.unlockedAt == null ? null : row.description
    return shown != null && shown.toLocaleLowerCase().includes(q)
  })
}

// Who a name could have been swapped with: the rest of the set, closest global
// percentage first, because a rank pairing only ever trades near-ties.
export function swapCandidates(
  rows: readonly AchievementRow[],
  target: AchievementRow
): AchievementRow[] {
  const distance = (row: AchievementRow): number =>
    row.globalPct != null && target.globalPct != null
      ? Math.abs(row.globalPct - target.globalPct)
      : Number.POSITIVE_INFINITY
  return rows
    .filter((row) => row.id !== target.id)
    .map((row, index) => ({ row, index }))
    .sort((a, b) => distance(a.row) - distance(b.row) || a.index - b.index)
    .map(({ row }) => row)
}

// "820 / 2000", with the thousands grouped and fractional counters trimmed.
export function formatProgress(progress: { current: number; max: number }): {
  label: string
  pct: number
} {
  const fmt = (n: number): string => n.toLocaleString(undefined, { maximumFractionDigits: 1 })
  const pct = progress.max > 0 ? Math.min(100, Math.max(0, (progress.current / progress.max) * 100)) : 0
  return { label: `${fmt(progress.current)} / ${fmt(progress.max)}`, pct }
}

function unlockTime(row: AchievementRow): number {
  if (!row.unlockedAt) return Number.NEGATIVE_INFINITY
  const parsed = Date.parse(row.unlockedAt.replace(' ', 'T') + (row.unlockedAt.endsWith('Z') ? '' : 'Z'))
  return Number.isNaN(parsed) ? Number.NEGATIVE_INFINITY : parsed
}

function rarityValue(row: AchievementRow): number {
  if (row.globalPct != null) return row.globalPct
  if (row.rarity === 'ultra-rare') return 5
  if (row.rarity === 'rare') return 20
  if (row.rarity === 'uncommon') return 50
  if (row.rarity === 'common') return 100
  return Number.POSITIVE_INFINITY
}

export function sortTrophies(rows: readonly AchievementRow[], sort: TrophySort): AchievementRow[] {
  const indexed = rows.map((row, index) => ({ row, index }))
  indexed.sort((a, b) => {
    let result = 0
    if (sort === 'unlock-date') result = unlockTime(b.row) - unlockTime(a.row)
    if (sort === 'rarity') result = rarityValue(a.row) - rarityValue(b.row)
    if (sort === 'name') result = a.row.name.localeCompare(b.row.name, undefined, { sensitivity: 'base' })
    return result || a.index - b.index
  })
  return indexed.map(({ row }) => row)
}

export function selectTrophies(
  rows: readonly AchievementRow[],
  filter: TrophyFilter,
  sort: TrophySort,
  query = ''
): AchievementRow[] {
  return sortTrophies(searchTrophies(filterTrophies(rows, filter), query), sort)
}

// ---- The archive page ----

export type GameSetSort = 'completion' | 'recent' | 'title'

function completion(game: AchievementGameProgress): number {
  return game.total ? game.unlocked / game.total : 0
}

// The overview arrives most complete first; the other orders are re-sorted
// here, ties broken by title so the grid never shuffles between polls.
export function sortGameSets(
  games: readonly AchievementGameProgress[],
  sort: GameSetSort
): AchievementGameProgress[] {
  const byTitle = (a: AchievementGameProgress, b: AchievementGameProgress): number =>
    a.title.localeCompare(b.title, undefined, { sensitivity: 'base' })
  return [...games].sort((a, b) => {
    if (sort === 'recent') {
      const at = a.lastUnlockedAt ?? ''
      const bt = b.lastUnlockedAt ?? ''
      return at === bt ? byTitle(a, b) : at < bt ? 1 : -1
    }
    if (sort === 'title') return byTitle(a, b)
    return completion(b) - completion(a) || byTitle(a, b)
  })
}

// Average per-game completion (one huge set cannot swamp it) and the number
// of sets finished. A set not fetched yet has nothing to complete, so it
// counts toward neither.
export function archiveStats(games: readonly AchievementGameProgress[]): {
  averagePct: number
  perfect: number
} {
  const fetched = games.filter((game) => game.total > 0)
  const averagePct = fetched.length
    ? Math.round((fetched.reduce((sum, game) => sum + completion(game), 0) / fetched.length) * 100)
    : 0
  return { averagePct, perfect: fetched.filter((game) => game.unlocked === game.total).length }
}
