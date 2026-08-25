import { describe, expect, it } from 'vitest'
import type { AchievementRow } from '../src/shared/types'
import {
  filterTrophies,
  selectTrophies,
  sortTrophies,
  summarizeTrophies,
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
      protectsHiddenDescription: true
    })
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
