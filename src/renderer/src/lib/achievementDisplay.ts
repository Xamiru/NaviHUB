import type { AchievementRow } from '@shared/types'

export type TrophyFilter = 'all' | 'earned' | 'locked' | 'ultra-rare'
export type TrophySort = 'default' | 'unlock-date' | 'rarity' | 'name'

export interface TrophySummary {
  total: number
  earned: number
  locked: number
  ultraRare: number
  completionPct: number
  earnedPoints: number | null
}

export interface TrophyDisplayDecision {
  unlocked: boolean
  iconPath: string | null
  dimLockedArt: boolean
  description: string
  protectsHiddenDescription: boolean
}

export function summarizeTrophies(rows: readonly AchievementRow[]): TrophySummary {
  const earned = rows.filter((row) => row.unlockedAt != null)
  const pointRows = earned.filter((row) => row.points != null)
  return {
    total: rows.length,
    earned: earned.length,
    locked: rows.length - earned.length,
    ultraRare: rows.filter((row) => row.rarity === 'ultra-rare').length,
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
    protectsHiddenDescription
  }
}

export function filterTrophies(
  rows: readonly AchievementRow[],
  filter: TrophyFilter
): AchievementRow[] {
  if (filter === 'earned') return rows.filter((row) => row.unlockedAt != null)
  if (filter === 'locked') return rows.filter((row) => row.unlockedAt == null)
  if (filter === 'ultra-rare') return rows.filter((row) => row.rarity === 'ultra-rare')
  return [...rows]
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
  sort: TrophySort
): AchievementRow[] {
  return sortTrophies(filterTrophies(rows, filter), sort)
}
