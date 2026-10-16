import { describe, expect, it } from 'vitest'
import type { AchievementGameProgress, AchievementRow } from '../src/shared/types'
import {
  archiveStats,
  filterTrophies,
  rarityText,
  schemaSourceInfo,
  searchTrophies,
  sortGameSets,
  formatProgress,
  selectTrophies,
  sortTrophies,
  summarizeTrophies,
  swapCandidates,
  trophyDisplayDecision
} from '../src/renderer/src/lib/achievementDisplay'

function row(patch: Partial<AchievementRow> = {}): AchievementRow {
  return {
    id: 1,
    apiName: 'one',
    name: 'One',
    description: 'Visible description',
    hidden: false,
    iconPath: 'media/earned.png',
    iconGrayPath: 'media/locked.png',
    points: null,
    globalPct: 40,
    rarity: 'uncommon',
    unlockedAt: null,
    unlockSource: null,
    nameStatus: 'ok',
    progress: null,
    ...patch
  }
}

describe('achievement display helpers', () => {
  const rows = [
    row({ id: 1, name: 'Beta', unlockedAt: '2026-01-01 00:00:00', globalPct: 20, rarity: 'rare' }),
    row({ id: 2, name: 'Alpha', unlockedAt: null, globalPct: 2, rarity: 'ultra-rare' }),
    row({ id: 3, name: 'Gamma', unlockedAt: '2026-03-01 00:00:00', globalPct: 70, rarity: 'common', points: 10 })
  ]

  it('filters earned, locked and ultra rare rows without mutating the input', () => {
    expect(filterTrophies(rows, 'earned').map((item) => item.id)).toEqual([1, 3])
    expect(filterTrophies(rows, 'locked').map((item) => item.id)).toEqual([2])
    expect(filterTrophies(rows, 'ultra-rare').map((item) => item.id)).toEqual([2])
    expect(rows.map((item) => item.id)).toEqual([1, 2, 3])
  })

  it('sorts by newest unlock, real rarity percentage and name', () => {
    expect(sortTrophies(rows, 'unlock-date').map((item) => item.id)).toEqual([3, 1, 2])
    expect(sortTrophies(rows, 'rarity').map((item) => item.id)).toEqual([2, 1, 3])
    expect(sortTrophies(rows, 'name').map((item) => item.id)).toEqual([2, 1, 3])
    expect(sortTrophies(rows, 'default').map((item) => item.id)).toEqual([1, 2, 3])
  })

  it('combines filtering and sorting deterministically', () => {
    expect(selectTrophies(rows, 'earned', 'name').map((item) => item.id)).toEqual([1, 3])
  })

  it('summarizes completion and only counts earned points', () => {
    expect(summarizeTrophies(rows)).toEqual({
      total: 3,
      earned: 2,
      locked: 1,
      ultraRare: 1,
      inProgress: 0,
      hidden: 0,
      manual: 0,
      completionPct: 67,
      earnedPoints: 10
    })
  })

  it('protects a hidden locked description and prefers provider locked art', () => {
    expect(trophyDisplayDecision(row({ hidden: true }))).toEqual({
      unlocked: false,
      iconPath: 'media/locked.png',
      dimLockedArt: false,
      description: 'Hidden achievement',
      protectsHiddenDescription: true,
      hiddenDescription: 'Visible description'
    })
    expect(trophyDisplayDecision(row({ hidden: true, description: null })).hiddenDescription).toBeNull()
  })

  it('reveals hidden descriptions after unlock and dims unlocked art used as fallback', () => {
    expect(
      trophyDisplayDecision(
        row({ hidden: true, unlockedAt: '2026-01-01 00:00:00', iconGrayPath: null })
      )
    ).toMatchObject({
      unlocked: true,
      iconPath: 'media/earned.png',
      dimLockedArt: false,
      description: 'Visible description',
      protectsHiddenDescription: false
    })
    expect(trophyDisplayDecision(row({ iconGrayPath: null }))).toMatchObject({
      unlocked: false,
      iconPath: 'media/earned.png',
      dimLockedArt: true
    })
  })
})

describe('name and progress helpers', () => {
  it('orders swap candidates by closeness of global percentage', () => {
    const target = row({ id: 1, globalPct: 42.5 })
    const rows = [target, row({ id: 2, globalPct: 90 }), row({ id: 3, globalPct: 42.4 }), row({ id: 4, globalPct: null })]
    expect(swapCandidates(rows, target).map((r) => r.id)).toEqual([3, 2, 4])
  })

  it('formats and clamps a progress counter', () => {
    expect(formatProgress({ current: 820, max: 2000 }).pct).toBe(41)
    expect(formatProgress({ current: 5, max: 2 }).pct).toBe(100)
    expect(formatProgress({ current: 1, max: 0 }).pct).toBe(0)
  })
})

describe('filters, search and labels', () => {
  const rows = [
    row({ id: 1, name: 'Grinder', progress: { current: 3, max: 10 } }),
    row({ id: 2, name: 'Secret room', hidden: true, description: 'Find the vault' }),
    row({ id: 3, name: 'Opened', hidden: true, description: 'Open the vault', unlockedAt: '2026-01-01 00:00:00' }),
    row({ id: 4, name: 'By hand', unlockedAt: '2026-01-02 00:00:00', unlockSource: 'manual' })
  ]

  it('filters in-progress, hidden and hand-marked rows', () => {
    expect(filterTrophies(rows, 'in-progress').map((r) => r.id)).toEqual([1])
    expect(filterTrophies(rows, 'hidden').map((r) => r.id)).toEqual([2, 3])
    expect(filterTrophies(rows, 'manual').map((r) => r.id)).toEqual([4])
    expect(summarizeTrophies(rows)).toMatchObject({ inProgress: 1, hidden: 2, manual: 1 })
  })

  it('searches names and shown text, never a locked hidden description', () => {
    expect(searchTrophies(rows, 'vault').map((r) => r.id)).toEqual([3])
    expect(searchTrophies(rows, '  SECRET ').map((r) => r.id)).toEqual([2])
    expect(searchTrophies(rows, '').map((r) => r.id)).toEqual([1, 2, 3, 4])
    expect(selectTrophies(rows, 'hidden', 'name', 'vault').map((r) => r.id)).toEqual([3])
  })

  it('words rarity as a share of players, or the tier when no share is known', () => {
    expect(rarityText(4.25, 'rare')).toBe('4.3% of players')
    expect(rarityText(null, 'ultra-rare')).toBe('Ultra rare')
    expect(rarityText(null, null)).toBeNull()
  })

  it('says where a list came from and when a re-fetch would make it exact', () => {
    expect(schemaSourceInfo({ provider: 'steam', schemaSource: 'public-api' })).toMatchObject({ suggestRefetch: false })
    expect(schemaSourceInfo({ provider: 'steam', schemaSource: 'community' })).toMatchObject({ suggestRefetch: true })
    expect(schemaSourceInfo({ provider: 'steam', schemaSource: null }).suggestRefetch).toBe(true)
    expect(schemaSourceInfo({ provider: 'ra', schemaSource: null }).suggestRefetch).toBe(false)
    expect(schemaSourceInfo({ provider: 'steam', schemaSource: 'local' }).suggestRefetch).toBe(false)
  })
})

describe('archive helpers', () => {
  function game(patch: Partial<AchievementGameProgress>): AchievementGameProgress {
    return {
      mediaId: 1,
      title: 'Game',
      mediaType: 'game',
      coverPath: null,
      provider: 'steam',
      unlocked: 0,
      total: 10,
      lastUnlockedAt: null,
      ...patch
    }
  }
  const games = [
    game({ mediaId: 1, title: 'Huge', unlocked: 10, total: 1000, lastUnlockedAt: '2026-03-01 00:00:00' }),
    game({ mediaId: 2, title: 'done', unlocked: 10, total: 10, lastUnlockedAt: '2026-01-01 00:00:00' }),
    game({ mediaId: 3, title: 'Alpha', unlocked: 5, total: 10 }),
    game({ mediaId: 4, title: 'Unfetched', unlocked: 0, total: 0 })
  ]

  it('sorts by completion, newest unlock or title', () => {
    expect(sortGameSets(games, 'completion').map((g) => g.mediaId)).toEqual([2, 3, 1, 4])
    expect(sortGameSets(games, 'recent').map((g) => g.mediaId)).toEqual([1, 2, 3, 4])
    expect(sortGameSets(games, 'title').map((g) => g.mediaId)).toEqual([3, 2, 1, 4])
  })

  it('averages completion per fetched set and counts the perfect ones', () => {
    // (1% + 100% + 50%) / 3 — the 1000-achievement set does not swamp it.
    expect(archiveStats(games)).toEqual({ averagePct: 50, perfect: 1 })
    expect(archiveStats([])).toEqual({ averagePct: 0, perfect: 0 })
  })
})
