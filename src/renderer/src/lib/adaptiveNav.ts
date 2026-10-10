import { WRESTLING_PROMOTIONS } from '@shared/wrestling'
import { MEDIA_CONFIGS } from './mediaConfig'

export type ArchiveArea = 'home' | 'library' | 'local' | 'archives' | 'learn' | 'quiz' | 'system'

// Rail order, top to bottom. System sits apart at the foot of the rail.
export const RAIL_AREAS: ArchiveArea[] = ['home', 'library', 'local', 'archives', 'learn', 'quiz']

export const AREA_LABELS: Record<ArchiveArea, string> = {
  home: 'Home',
  library: 'Library',
  local: 'Local',
  archives: 'Archives',
  learn: 'Learn',
  quiz: 'Quiz',
  system: 'System'
}

export interface ArchiveNavItem {
  to: string
  label: string
  visibilityKey?: string
  // Subheading inside a drawer or the expanded list; consecutive items share one.
  group?: string
}

export interface ArchiveContext {
  title: string
  descriptor: string
  items: ArchiveNavItem[]
}

const HOME_ITEMS: ArchiveNavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/checklist', label: 'Checklist', visibilityKey: 'checklist' },
  { to: '/stats', label: 'Stats', visibilityKey: 'stats' }
]

const LIBRARY_DRAWER_ITEMS: ArchiveNavItem[] = [
  ...MEDIA_CONFIGS.filter((cfg) => !cfg.hideFromSidebar).map((cfg) => ({
    to: cfg.basePath,
    label: cfg.sidebarLabel ?? cfg.plural,
    visibilityKey: cfg.key,
    group: 'Media'
  })),
  { to: '/people', label: 'Voice Actors', group: 'Connections' },
  { to: '/actors', label: 'Actors', group: 'Connections' },
  { to: '/studios', label: 'Studios', group: 'Connections' },
  { to: '/lists', label: 'Lists', visibilityKey: 'lists', group: 'Organise' },
  { to: '/tags', label: 'Tags', visibilityKey: 'tags', group: 'Organise' }
]

const LOCAL_DRAWER_ITEMS: ArchiveNavItem[] = [
  { to: '/music', label: 'Music', visibilityKey: 'music' },
  { to: '/pictures', label: 'Pictures', visibilityKey: 'pictures' }
]

const ARCHIVES_DRAWER_ITEMS: ArchiveNavItem[] = [
  { to: '/franchises', label: 'Franchises' },
  { to: '/history', label: 'History', visibilityKey: 'history' },
  { to: '/wrestling', label: 'Wrestling', visibilityKey: 'wrestling' },
  { to: '/football', label: 'Football', visibilityKey: 'football' }
]

const LEARN_DRAWER_ITEMS: ArchiveNavItem[] = [
  { to: '/japanese', label: 'Japanese', visibilityKey: 'japanese' },
  { to: '/english', label: 'English', visibilityKey: 'english' },
  { to: '/programming', label: 'Programming', visibilityKey: 'programming' }
]

// Quiz is a direct rail link, not a drawer; this list exists for the expanded
// sidebar and for the hidden-section filter.
const QUIZ_ITEMS: ArchiveNavItem[] = [{ to: '/quiz', label: 'Quiz', visibilityKey: 'quiz' }]

const SYSTEM_DRAWER_ITEMS: ArchiveNavItem[] = [
  { to: '/bulk', label: 'Bulk Import', group: 'Get content' },
  { to: '/torrents', label: 'Torrents', group: 'Get content' },
  { to: '/tasks', label: 'Tasks', group: 'Upkeep' },
  { to: '/tasks/logs', label: 'Logs', group: 'Upkeep' },
  { to: '/settings', label: 'Settings', group: 'Upkeep' }
]

const DRAWER_ITEMS: Record<ArchiveArea, ArchiveNavItem[]> = {
  home: HOME_ITEMS,
  library: LIBRARY_DRAWER_ITEMS,
  local: LOCAL_DRAWER_ITEMS,
  archives: ARCHIVES_DRAWER_ITEMS,
  learn: LEARN_DRAWER_ITEMS,
  quiz: QUIZ_ITEMS,
  system: SYSTEM_DRAWER_ITEMS
}

export function drawerItemsForArea(area: ArchiveArea): ArchiveNavItem[] {
  return DRAWER_ITEMS[area]
}

// The rail areas that are a single destination render as a link, never a drawer.
export function directRouteForArea(area: ArchiveArea): string | null {
  return area === 'quiz' ? '/quiz' : null
}

export function bestArchiveRoute(pathname: string, routes: string[]): string | null {
  return (
    routes
      .filter((route) =>
        route === '/' ? pathname === '/' : pathname === route || pathname.startsWith(`${route}/`)
      )
      .sort((a, b) => b.length - a.length)[0] ?? null
  )
}

// Routes with no drawer entry of their own, and the entry that stands for them.
const DRAWER_PARENTS: [string, string][] = [
  ['/now-playing', '/music'],
  ['/actors', '/movies'],
  ['/directors', '/movies'],
  ['/authors', '/books'],
  ['/artists', '/anime'],
  ['/mangaka', '/manga']
]

export function drawerRouteForPath(pathname: string, routes: string[]): string | null {
  const direct = bestArchiveRoute(pathname, routes)
  if (direct) return direct

  const parent = DRAWER_PARENTS.find(
    ([route, target]) =>
      (pathname === route || pathname.startsWith(`${route}/`)) && routes.includes(target)
  )
  if (parent) return parent[1]

  const media = MEDIA_CONFIGS.find(
    (cfg) => pathname === cfg.basePath || pathname.startsWith(`${cfg.basePath}/`)
  )
  if (!media?.hideFromSidebar) return null

  const siblingKeys = new Set(media.listTabs?.map((tab) => tab.key) ?? [])
  return (
    MEDIA_CONFIGS.find(
      (cfg) => !cfg.hideFromSidebar && siblingKeys.has(cfg.key) && routes.includes(cfg.basePath)
    )?.basePath ?? null
  )
}

function underAny(pathname: string, routes: string[]): boolean {
  return routes.some((route) => pathname === route || pathname.startsWith(`${route}/`))
}

export function archiveAreaForPath(pathname: string): ArchiveArea {
  if (underAny(pathname, ['/settings', '/tasks', '/bulk', '/torrents'])) return 'system'
  if (underAny(pathname, ['/japanese', '/english', '/programming'])) return 'learn'
  if (underAny(pathname, ['/franchises', '/history', '/wrestling', '/football'])) return 'archives'
  if (underAny(pathname, ['/music', '/pictures', '/now-playing'])) return 'local'
  if (underAny(pathname, ['/quiz'])) return 'quiz'
  if (
    underAny(pathname, MEDIA_CONFIGS.map((cfg) => cfg.basePath)) ||
    underAny(pathname, LIBRARY_DRAWER_ITEMS.map((item) => item.to)) ||
    underAny(pathname, ['/actors', '/directors', '/authors', '/artists', '/mangaka', '/characters', '/read'])
  ) {
    return 'library'
  }
  return 'home'
}

function mediaContext(pathname: string): ArchiveContext | null {
  if (
    /^\/(people|actors|directors|authors|mangaka|artists|studios|characters)\/[^/]+/.test(pathname)
  ) {
    return {
      title: 'Connections',
      descriptor: 'Connected archive',
      items: [
        { to: '/people', label: 'Voice Actors' },
        { to: '/actors', label: 'Actors' },
        { to: '/directors', label: 'Directors' },
        { to: '/authors', label: 'Authors' },
        { to: '/mangaka', label: 'Mangaka' },
        { to: '/artists', label: 'Artists' },
        { to: '/studios', label: 'Studios' }
      ]
    }
  }
  if (
    pathname.startsWith('/anime') ||
    ['/people', '/artists', '/studios', '/characters'].some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    return {
      title: 'Anime',
      descriptor: 'Archive directory',
      items: [
        { to: '/anime', label: 'Anime' },
        { to: '/anime/seasonal', label: 'Seasonal' },
        { to: '/anime/songs', label: 'Songs' },
        { to: '/people', label: 'Voice Actors' },
        { to: '/artists', label: 'Artists' },
        { to: '/studios', label: 'Studios' }
      ]
    }
  }
  if (pathname.startsWith('/manga') || pathname.startsWith('/mangaka')) {
    return {
      title: 'Manga',
      descriptor: 'Archive directory',
      items: [
        { to: '/manga', label: 'Manga' },
        { to: '/mangaka', label: 'Mangaka' }
      ]
    }
  }
  if (pathname.startsWith('/visual-novels')) {
    return {
      title: 'Visual novels',
      descriptor: 'Archive directory',
      items: [{ to: '/visual-novels', label: 'Visual Novels' }, { to: '/visual-novels/discover', label: 'Discover' }, { to: '/franchises', label: 'Franchises' }]
    }
  }
  if (pathname.startsWith('/games')) {
    return {
      title: 'Games',
      descriptor: 'Archive directory',
      items: [
        { to: '/games', label: 'Games' },
        { to: '/games/installed', label: 'Installed' },
        { to: '/games/achievements', label: 'Achievements' },
        { to: '/franchises', label: 'Franchises' }
      ]
    }
  }
  if (pathname.startsWith('/books') || pathname.startsWith('/authors')) {
    return {
      title: 'Books',
      descriptor: 'Archive directory',
      items: [
        { to: '/books', label: 'Books' },
        { to: '/authors', label: 'Authors' }
      ]
    }
  }
  if (
    pathname.startsWith('/movies') ||
    pathname.startsWith('/tv') ||
    pathname.startsWith('/actors') ||
    pathname.startsWith('/directors')
  ) {
    return {
      title: 'Movies & TV',
      descriptor: 'Screen archive',
      items: [
        { to: '/movies', label: 'Movies' },
        { to: '/tv', label: 'TV Shows' },
        { to: '/actors', label: 'Actors' },
        { to: '/directors', label: 'Directors' }
      ]
    }
  }
  return null
}

export function archiveContextForPath(pathname: string): ArchiveContext {
  if (pathname === '/history' || pathname.startsWith('/history/')) {
    return {
      title: 'History',
      descriptor: 'World chronicle',
      items: [
        { to: '/history', label: 'Timeline' },
        { to: '/history/map', label: 'Map' },
        { to: '/history/themes', label: 'Themes' },
        { to: '/history/sources', label: 'Sources' },
        { to: '/history/my', label: 'My additions' },
        { to: '/history/corrections', label: 'Corrections' }
      ]
    }
  }
  if (pathname.startsWith('/football')) {
    return {
      title: 'Football',
      descriptor: 'History archive',
      items: [
        { to: '/football', label: 'Home' },
        { to: '/football/current', label: 'Matchday' },
        { to: '/football/competitions', label: 'History' },
        { to: '/football/media', label: 'My Archive' },
        { to: '/football/quiz', label: 'Quiz' }
      ]
    }
  }
  if (pathname.startsWith('/japanese')) {
    return {
      title: 'Japanese',
      descriptor: 'Knowledge map',
      items: [
        { to: '/japanese', label: 'Today' },
        { to: '/japanese/tutor', label: 'Tutor' },
        { to: '/japanese/roadmap', label: 'Roadmap' },
        { to: '/japanese/review', label: 'Review' },
        { to: '/japanese/dictionary', label: 'Dictionary' },
        { to: '/japanese/kana', label: 'Drills' },
        { to: '/japanese/guide', label: 'Guide' }
      ]
    }
  }
  if (pathname.startsWith('/english')) {
    return {
      title: 'English',
      descriptor: 'Mistake ledger',
      items: [
        { to: '/english', label: 'Overview' },
        { to: '/english/dictionary', label: 'Dictionary' },
        { to: '/english/review', label: 'Review' },
        { to: '/english/deck', label: 'Deck' },
        { to: '/english/repair', label: 'Rule repair' },
        { to: '/english/writing', label: 'Writing' }
      ]
    }
  }
  if (pathname.startsWith('/programming')) {
    return {
      title: 'Programming',
      descriptor: 'Skill graph',
      items: [
        { to: '/programming', label: 'Skill Graph' },
        { to: '/programming/cheatsheets', label: 'Cheatsheets' },
        { to: '/programming/practice', label: 'CLI Practice' },
        { to: '/programming/sql', label: 'SQL Sandbox' },
        { to: '/programming/regex-golf', label: 'Regex Golf' }
      ]
    }
  }
  if (pathname.startsWith('/quiz')) {
    return {
      title: 'Quiz',
      descriptor: 'Challenge broadcast',
      items: [
        { to: '/quiz', label: 'Quiz Home' },
        { to: '/quiz/party', label: 'Party' },
        { to: '/quiz/song', label: 'Songs' },
        { to: '/quiz/images', label: 'Images' },
        { to: '/quiz/connections', label: 'Connections' },
        { to: '/quiz/tournament', label: 'Tournament' }
      ]
    }
  }
  if (pathname.startsWith('/wrestling')) {
    return {
      title: 'Wrestling',
      descriptor: 'Chronology',
      items: [
        { to: '/wrestling', label: 'Chronology' },
        { to: '/wrestling/rated', label: 'Rated' },
        { to: '/wrestling/journeys', label: 'Journeys' },
        { to: '/wrestling/collection', label: 'Collection' },
        { to: '/wrestling/clips', label: 'Clips' },
        ...WRESTLING_PROMOTIONS.slice(0, 4).map((promotion) => ({
          to: `/wrestling/p/${promotion.id}`,
          label: promotion.short
        }))
      ]
    }
  }
  if (pathname.startsWith('/music') || pathname.startsWith('/now-playing')) {
    return {
      title: 'Music',
      descriptor: 'Sonic archive',
      items: [
        { to: '/music', label: 'Library' },
        { to: '/music/smart', label: 'Smart Playlists' },
        { to: '/music/downloads', label: 'Downloads' },
        { to: '/music/liked', label: 'Liked' },
        { to: '/music/stats', label: 'Listening Stats' },
        { to: '/now-playing', label: 'Now Playing' }
      ]
    }
  }
  if (pathname.startsWith('/pictures')) {
    return {
      title: 'Pictures',
      descriptor: 'Image archive',
      items: [
        { to: '/pictures', label: 'Gallery' },
        { to: '/pictures/albums', label: 'Albums' }
      ]
    }
  }
  if (pathname.startsWith('/lists') || pathname.startsWith('/tags')) {
    return {
      title: 'Collections',
      descriptor: 'Curated archive',
      items: [
        { to: '/lists', label: 'Lists' },
        { to: '/tags', label: 'Tags' }
      ]
    }
  }
  if (
    pathname.startsWith('/tasks') ||
    pathname.startsWith('/bulk') ||
    pathname.startsWith('/torrents') ||
    pathname.startsWith('/settings')
  ) {
    return {
      title: 'System',
      descriptor: 'Tasks and settings',
      items: SYSTEM_DRAWER_ITEMS.map(({ to, label }) => ({ to, label }))
    }
  }

  if (pathname === '/franchises' || pathname.startsWith('/franchises/')) {
    return {
      title: 'Franchises',
      descriptor: 'Series across media',
      items: [
        { to: '/franchises', label: 'All franchises' },
        { to: '/anime', label: 'Anime' },
        { to: '/visual-novels', label: 'Visual Novels' },
        { to: '/games', label: 'Games' },
        { to: '/movies', label: 'Movies' },
        { to: '/books', label: 'Books' },
        { to: '/manga', label: 'Manga' }
      ]
    }
  }

  const media = mediaContext(pathname)
  if (media) return media

  return { title: 'Home', descriptor: 'Archive broadcast', items: HOME_ITEMS }
}
