import { describe, expect, it } from 'vitest'
import {
  archiveAreaForPath,
  archiveContextForPath,
  bestArchiveRoute,
  drawerItemsForArea
} from '../src/renderer/src/lib/adaptiveNav'

describe('adaptive archive navigation', () => {
  it.each([
    ['/', 'home'],
    ['/checklist', 'home'],
    ['/anime/42', 'library'],
    ['/watch', 'library'],
    ['/quiz/song', 'play'],
    ['/gacha/fgo', 'play'],
    ['/japanese/review', 'learn'],
    ['/programming/sql', 'learn'],
    ['/tasks/logs', 'system'],
    ['/settings', 'system']
  ] as const)('classifies %s as %s', (path, area) => {
    expect(archiveAreaForPath(path)).toBe(area)
  })

  it('keeps every drawer destination unique', () => {
    for (const area of ['home', 'library', 'play', 'learn', 'system'] as const) {
      const routes = drawerItemsForArea(area).map((item) => item.to)
      expect(new Set(routes).size).toBe(routes.length)
    }
  })

  it('switches contextual navigation with the active section', () => {
    expect(archiveContextForPath('/music/liked').title).toBe('Sonic archive')
    expect(archiveContextForPath('/english/review').title).toBe('English mistake ledger')
    expect(archiveContextForPath('/programming/sql').items).toContainEqual({
      to: '/programming/sql',
      label: 'SQL Sandbox'
    })
  })

  it('chooses the longest matching route for nested contextual tabs', () => {
    expect(bestArchiveRoute('/tasks/logs', ['/tasks', '/tasks/logs', '/settings'])).toBe(
      '/tasks/logs'
    )
    expect(bestArchiveRoute('/games/42', ['/games', '/games/installed'])).toBe('/games')
    expect(bestArchiveRoute('/search', ['/', '/checklist'])).toBeNull()
  })
})
