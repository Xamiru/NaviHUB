import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import { describe, expect, it } from 'vitest'
import {
  archiveAreaForPath,
  archiveContextForPath,
  bestArchiveRoute,
  drawerRouteForPath,
  drawerItemsForArea,
  directRouteForArea,
  RAIL_AREAS
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
    ['/franchises/science-adventure', 'archives'],
    ['/visual-novels/discover', 'library'],
    ['/wrestling/journeys/1', 'archives'],
    ['/tv', 'library'],
    ['/tv/42/edit', 'library'],
    ['/football/match/42', 'archives'],
    ['/pictures/albums/3', 'local'],
    ['/music/liked', 'local'],
    ['/now-playing', 'local'],
    ['/people/42', 'library'],
    ['/characters/9', 'library'],
    ['/read/7', 'library'],
    ['/quiz/song', 'quiz'],
    ['/japanese/review', 'learn'],
    ['/programming/sql', 'learn'],
    ['/history', 'archives'],
    ['/history/event/1953-iranian-coup', 'archives'],
    ['/historyx', 'home'],
    ['/tasks/logs', 'system'],
    ['/settings', 'system']
  ] as const)('classifies %s as %s', (path, area) => {
    expect(archiveAreaForPath(path)).toBe(area)
  })

  it('keeps every drawer destination unique', () => {
    for (const area of [...RAIL_AREAS, 'system'] as const) {
      const routes = drawerItemsForArea(area).map((item) => item.to)
      expect(new Set(routes).size).toBe(routes.length)
    }
  })

  it('keeps every operational destination inside one System drawer', () => {
    const items = drawerItemsForArea('system')
    expect(items).toEqual([
      { to: '/bulk', label: 'Bulk Import', group: 'Get content' },
      { to: '/torrents', label: 'Torrents', group: 'Get content' },
      { to: '/tasks', label: 'Tasks', group: 'Upkeep' },
      { to: '/tasks/logs', label: 'Logs', group: 'Upkeep' },
      { to: '/settings', label: 'Settings', group: 'Upkeep' }
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
    expect(archiveContextForPath('/music/liked').items).not.toContainEqual({ to: '/music/journal', label: 'Journal' })
    expect(archiveContextForPath('/music/smart/7').items).toContainEqual({ to: '/music/smart', label: 'Smart Playlists' })
    expect(archiveContextForPath('/music/downloads').items).toContainEqual({
      to: '/music/downloads',
      label: 'Downloads'
    })
    expect(archiveContextForPath('/pictures/albums/3')).toMatchObject({
      title: 'Pictures',
      items: [
        { to: '/pictures', label: 'Gallery' },
        { to: '/pictures/albums', label: 'Albums' }
      ]
    })
    expect(archiveContextForPath('/english/review')).toMatchObject({
      title: 'English',
      descriptor: 'Mistake ledger'
    })
    expect(archiveContextForPath('/english/repair').items).toContainEqual({
      to: '/english/repair', label: 'Rule repair'
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

  it('gives History one context across its timeline, articles and sources', () => {
    const ctx = archiveContextForPath('/history/person/mohammad-mosaddegh')
    expect(ctx).toMatchObject({ title: 'History', descriptor: 'World chronicle' })
    expect(ctx.items.map((i) => i.to)).toEqual(['/history', '/history/map', '/history/themes', '/history/sources', '/history/my', '/history/corrections'])
    expect(drawerItemsForArea('archives').map((i) => i.to)).toContain('/history')
    expect(drawerItemsForArea('learn').map((i) => i.to)).not.toContain('/history')
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
        { to: '/football', label: 'Home' },
        { to: '/football/current', label: 'Matchday' },
        { to: '/football/competitions', label: 'History' },
        { to: '/football/media', label: 'My Archive' },
        { to: '/football/quiz', label: 'Quiz' }
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
      { to: '/visual-novels', label: 'Visual Novels' },
      { to: '/visual-novels/discover', label: 'Discover' },
      { to: '/franchises', label: 'Franchises' }
    ])
  })

  it('maps hidden TV routes to the visible Movies & TV drawer destination', () => {
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

it('exposes hobby-depth destinations through shared navigation', () => {
  expect(archiveContextForPath('/visual-novels/42').items.map((i) => i.to)).toContain('/visual-novels/discover')
  expect(archiveContextForPath('/wrestling/journeys').items.map((i) => i.to)).toContain('/wrestling/journeys')
  expect(archiveContextForPath('/wrestling/clips').items.map((i) => i.to)).toContain('/wrestling/clips')
  expect(archiveContextForPath('/franchises/science-adventure').title).toBe('Franchises')
  expect(drawerItemsForArea('archives').map((i) => i.to)).toContain('/franchises')
})

it('groups drawers by kind and keeps no single-item drawer', () => {
  const groups = (area: Parameters<typeof drawerItemsForArea>[0]) => [
    ...new Set(drawerItemsForArea(area).map((i) => i.group))
  ]
  expect(groups('library')).toEqual(['Media', 'Connections', 'Organise'])
  expect(groups('system')).toEqual(['Get content', 'Upkeep'])
  expect(drawerItemsForArea('local').map((i) => i.to)).toEqual(['/music', '/pictures'])
  expect(drawerItemsForArea('archives').map((i) => i.to)).toEqual([
    '/franchises',
    '/history',
    '/wrestling',
    '/football'
  ])
  for (const area of RAIL_AREAS) {
    if (directRouteForArea(area)) continue
    expect(drawerItemsForArea(area).length).toBeGreaterThan(1)
  }
  expect(directRouteForArea('quiz')).toBe('/quiz')
})

it('reaches Checklist and Stats from the compact rail through the Home drawer', () => {
  expect(directRouteForArea('home')).toBeNull()
  expect(drawerItemsForArea('home').map((i) => i.to)).toEqual(['/', '/checklist', '/stats'])
})

describe('navigation against the real route table', () => {
  const app = readFileSync(
    fileURLToPath(new URL('../src/renderer/src/App.tsx', import.meta.url)),
    'utf8'
  )
  const routes = [...app.matchAll(/path="([^"]+)"/g)].map((m) => m[1]).filter((p) => p !== '*')
  const concrete = (route: string) => route.replace(/:[a-zA-Z]+/g, '7')
  const routed = routes.map((r) => new RegExp(`^${r.replace(/:[a-zA-Z]+/g, '[^/]+')}$`))
  // Chromeless readers, Home's own pages, search and redirect-only legacy URLs.
  const homeOrChromeless = /^\/($|search|stats|checklist|read\/|guides)/

  it('links every drawer and Topbar destination to a routed page', () => {
    const items = [...RAIL_AREAS, 'system' as const].flatMap((area) => drawerItemsForArea(area))
    for (const route of routes) items.push(...archiveContextForPath(concrete(route)).items)
    const dead = [...new Set(items.map((item) => item.to))].filter(
      (to) => !routed.some((re) => re.test(to))
    )
    expect(dead).toEqual([])
  })

  it('places every routed page in a sidebar area with a highlighted drawer entry', () => {
    const orphans = routes
      .filter((route) => !homeOrChromeless.test(route))
      .map(concrete)
      .filter((path) => {
        const area = archiveAreaForPath(path)
        const entry = drawerRouteForPath(path, drawerItemsForArea(area).map((i) => i.to))
        // A character has no directory page; Library stays lit on the rail.
        if (path.startsWith('/characters/')) return area !== 'library'
        return area === 'home' || entry === null
      })
    expect(orphans).toEqual([])
  })
})
