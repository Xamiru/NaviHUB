import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'
import {
  archiveAreaForPath,
  archiveContextForPath,
  bestArchiveRoute,
  drawerRouteForPath,
  drawerItemsForArea
} from '../src/renderer/src/lib/adaptiveNav'

const sidebarSource = readFileSync(
  fileURLToPath(new URL('../src/renderer/src/components/Sidebar.tsx', import.meta.url)),
  'utf8'
)

describe('adaptive archive navigation', () => {
  it.each([
    ['/', 'home'],
    ['/checklist', 'home'],
    ['/anime/42', 'library'],
    ['/tv', 'library'],
    ['/tv/42/edit', 'library'],
    ['/football/match/42', 'library'],
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

  it('keeps every operational destination inside one System drawer', () => {
    const items = drawerItemsForArea('system')
    expect(items).toEqual([
      { to: '/tasks', label: 'Tasks' },
      { to: '/tasks/logs', label: 'Logs' },
      { to: '/bulk', label: 'Bulk Import' },
      { to: '/torrents', label: 'Torrents' },
      { to: '/settings', label: 'Settings' }
    ])
    const routes = items.map((item) => item.to)
    expect(drawerRouteForPath('/tasks/active', routes)).toBe('/tasks')
    expect(drawerRouteForPath('/tasks/logs', routes)).toBe('/tasks/logs')
    expect(drawerRouteForPath('/settings', routes)).toBe('/settings')
  })

  it('does not render Tasks as a permanent sidebar rail destination', () => {
    expect(sidebarSource).not.toMatch(/<NavLink\s+to="\/tasks"/)
  })

  it('switches contextual navigation with the active section', () => {
    expect(archiveContextForPath('/music/liked')).toMatchObject({
      title: 'Music',
      descriptor: 'Sonic archive'
    })
    expect(archiveContextForPath('/music/downloads').items).toContainEqual({
      to: '/music/downloads',
      label: 'Downloads'
    })
    expect(archiveContextForPath('/english/review')).toMatchObject({
      title: 'English',
      descriptor: 'Mistake ledger'
    })
    expect(archiveContextForPath('/programming/sql').items).toContainEqual({
      to: '/programming/sql',
      label: 'SQL Sandbox'
    })
    expect(archiveContextForPath('/japanese/output').items).toContainEqual({
      to: '/japanese/tutor',
      label: 'Tutor'
    })
  })

  it('uses the consolidated quiz context while direct game routes remain hub-owned', () => {
    expect(archiveContextForPath('/quiz/chronology').items).toEqual([
      { to: '/quiz', label: 'Quiz Home' },
      { to: '/quiz/party', label: 'Party' },
      { to: '/quiz/song', label: 'Songs' },
      { to: '/quiz/images', label: 'Images' },
      { to: '/quiz/connections', label: 'Connections' },
      { to: '/quiz/tournament', label: 'Tournament' }
    ])
  })

  it('keeps Football inside one compact archive context', () => {
    expect(archiveContextForPath('/football/match/42')).toEqual({
      title: 'Football',
      descriptor: 'History archive',
      items: [
        { to: '/football', label: 'Overview' },
        { to: '/football/current', label: 'Current' },
        { to: '/football/competitions', label: 'Competitions' },
        { to: '/football/teams', label: 'Teams' },
        { to: '/football/people', label: 'People' },
        { to: '/football/media', label: 'Media' },
        { to: '/football/quiz', label: 'Quiz' },
        { to: '/football/sync', label: 'Sync' }
      ]
    })
  })

  it.each([
    ['/people', 'Anime'],
    ['/people/42', 'Connections'],
    ['/artists', 'Anime'],
    ['/studios/7', 'Connections'],
    ['/characters/9', 'Connections'],
    ['/mangaka', 'Manga'],
    ['/authors', 'Books'],
    ['/actors', 'Movies & TV'],
    ['/directors', 'Movies & TV']
  ])('keeps relationship route %s in %s', (path, title) => {
    expect(archiveContextForPath(path).title).toBe(title)
  })

  it('uses neutral context for cross-library entity details', () => {
    const context = archiveContextForPath('/authors/12')
    expect(context.descriptor).toBe('Connected archive')
    expect(context.items).toContainEqual({ to: '/authors', label: 'Authors' })
  })

  it('keeps relationship tabs owned by their natural archive', () => {
    const animeLabels = archiveContextForPath('/people').items.map((item) => item.label)
    expect(animeLabels).toEqual([
      'Anime',
      'Seasonal',
      'Songs',
      'Voice Actors',
      'Artists',
      'Studios'
    ])
    expect(archiveContextForPath('/visual-novels').items).toEqual([
      { to: '/visual-novels', label: 'Visual Novels' }
    ])
  })

  it('maps hidden TV routes to the visible Movies / TV drawer destination', () => {
    const routes = drawerItemsForArea('library').map((item) => item.to)
    expect(drawerRouteForPath('/tv', routes)).toBe('/movies')
    expect(drawerRouteForPath('/tv/42/edit', routes)).toBe('/movies')
  })

  it('chooses the longest matching route for nested contextual tabs', () => {
    expect(bestArchiveRoute('/tasks/logs', ['/tasks', '/tasks/logs', '/settings'])).toBe(
      '/tasks/logs'
    )
    expect(bestArchiveRoute('/games/42', ['/games', '/games/installed'])).toBe('/games')
    expect(bestArchiveRoute('/search', ['/', '/checklist'])).toBeNull()
  })
})
