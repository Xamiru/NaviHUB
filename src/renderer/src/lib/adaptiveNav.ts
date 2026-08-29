import { GACHA_GAMES } from '@shared/gacha'
import { WRESTLING_PROMOTIONS } from '@shared/wrestling'
import { MEDIA_CONFIGS } from './mediaConfig'

export type ArchiveArea = 'home' | 'library' | 'play' | 'learn' | 'system'

export interface ArchiveNavItem {
  to: string
  label: string
  visibilityKey?: string
}

export interface ArchiveContext {
  title: string
  items: ArchiveNavItem[]
}

const HOME_ITEMS: ArchiveNavItem[] = [
  { to: '/', label: 'Home' },
  { to: '/checklist', label: 'Checklist', visibilityKey: 'checklist' },
  { to: '/stats', label: 'Stats', visibilityKey: 'stats' }
]

const MEDIA_DRAWER_ITEMS: ArchiveNavItem[] = [
  ...MEDIA_CONFIGS.filter((cfg) => !cfg.hideFromSidebar).map((cfg) => ({
    to: cfg.basePath,
    label: cfg.sidebarLabel ?? cfg.plural,
    visibilityKey: cfg.key
  })),
  { to: '/music', label: 'Music', visibilityKey: 'music' },
  { to: '/wrestling', label: 'Wrestling', visibilityKey: 'wrestling' },
  { to: '/lists', label: 'Lists', visibilityKey: 'lists' },
  { to: '/tags', label: 'Tags', visibilityKey: 'tags' },
  { to: '/watch', label: 'Watch' }
]

const PLAY_DRAWER_ITEMS: ArchiveNavItem[] = [
  { to: '/quiz', label: 'Quiz', visibilityKey: 'quiz' },
  { to: '/gacha', label: 'Gacha', visibilityKey: 'gacha' }
]

const LEARN_DRAWER_ITEMS: ArchiveNavItem[] = [
  { to: '/japanese', label: 'Japanese', visibilityKey: 'japanese' },
  { to: '/english', label: 'English', visibilityKey: 'english' },
  { to: '/programming', label: 'Programming', visibilityKey: 'programming' }
]

const SYSTEM_DRAWER_ITEMS: ArchiveNavItem[] = [
  { to: '/tasks', label: 'Tasks' },
  { to: '/tasks/logs', label: 'Logs' },
  { to: '/bulk', label: 'Bulk Import' },
  { to: '/torrents', label: 'Torrents' },
  { to: '/settings', label: 'Settings' }
]

export function drawerItemsForArea(area: ArchiveArea): ArchiveNavItem[] {
  if (area === 'home') return HOME_ITEMS
  if (area === 'library') return MEDIA_DRAWER_ITEMS
  if (area === 'play') return PLAY_DRAWER_ITEMS
  if (area === 'learn') return LEARN_DRAWER_ITEMS
  return SYSTEM_DRAWER_ITEMS
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

export function drawerRouteForPath(pathname: string, routes: string[]): string | null {
  const direct = bestArchiveRoute(pathname, routes)
  if (direct) return direct

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

export function archiveAreaForPath(pathname: string): ArchiveArea {
  if (
    pathname.startsWith('/settings') ||
    pathname.startsWith('/tasks') ||
    pathname.startsWith('/bulk') ||
    pathname.startsWith('/torrents')
  ) {
    return 'system'
  }
  if (
    pathname.startsWith('/japanese') ||
    pathname.startsWith('/english') ||
    pathname.startsWith('/programming')
  ) {
    return 'learn'
  }
  if (pathname.startsWith('/quiz') || pathname.startsWith('/gacha')) return 'play'
  if (
    MEDIA_CONFIGS.some(
      (cfg) => pathname === cfg.basePath || pathname.startsWith(`${cfg.basePath}/`)
    ) ||
    MEDIA_DRAWER_ITEMS.some(
      (item) => pathname === item.to || pathname.startsWith(`${item.to}/`)
    ) ||
    [
      '/people',
      '/actors',
      '/directors',
      '/authors',
      '/artists',
      '/mangaka',
      '/studios',
      '/characters',
      '/now-playing',
      '/read'
    ].some((path) => pathname === path || pathname.startsWith(`${path}/`))
  ) {
    return 'library'
  }
  return 'home'
}

function mediaContext(pathname: string): ArchiveContext | null {
  if (
    pathname.startsWith('/anime') ||
    ['/people', '/artists', '/studios', '/characters'].some(
      (route) => pathname === route || pathname.startsWith(`${route}/`)
    )
  ) {
    return {
      title: 'Anime archive',
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
      title: 'Manga archive',
      items: [
        { to: '/manga', label: 'Manga' },
        { to: '/mangaka', label: 'Mangaka' }
      ]
    }
  }
  if (pathname.startsWith('/visual-novels')) {
    return {
      title: 'Visual novel archive',
      items: [{ to: '/visual-novels', label: 'Visual Novels' }]
    }
  }
  if (pathname.startsWith('/games')) {
    return {
      title: 'Game archive',
      items: [
        { to: '/games', label: 'Games' },
        { to: '/games/installed', label: 'Installed' },
        { to: '/games/achievements', label: 'Achievements' },
        { to: '/games/franchises', label: 'Franchises' }
      ]
    }
  }
  if (pathname.startsWith('/books') || pathname.startsWith('/authors')) {
    return {
      title: 'Book archive',
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
      title: 'Screen archive',
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
  if (pathname.startsWith('/japanese')) {
    return {
      title: 'Japanese knowledge map',
      items: [
        { to: '/japanese', label: 'Today' },
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
      title: 'English mistake ledger',
      items: [
        { to: '/english', label: 'Overview' },
        { to: '/english/dictionary', label: 'Dictionary' },
        { to: '/english/review', label: 'Review' },
        { to: '/english/deck', label: 'Deck' },
        { to: '/english/writing', label: 'Writing' }
      ]
    }
  }
  if (pathname.startsWith('/programming')) {
    return {
      title: 'Programming skill graph',
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
      title: 'Challenge broadcast',
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
  if (pathname.startsWith('/gacha')) {
    return {
      title: 'Gacha operations board',
      items: [
        { to: '/gacha', label: 'Operations' },
        ...GACHA_GAMES.map((game) => ({ to: `/gacha/${game.id}`, label: game.short }))
      ]
    }
  }
  if (pathname.startsWith('/wrestling')) {
    return {
      title: 'Wrestling chronology',
      items: [
        { to: '/wrestling', label: 'Chronology' },
        { to: '/wrestling/rated', label: 'Rated' },
        { to: '/wrestling/collection', label: 'Collection' },
        ...WRESTLING_PROMOTIONS.slice(0, 4).map((promotion) => ({
          to: `/wrestling/p/${promotion.id}`,
          label: promotion.short
        }))
      ]
    }
  }
  if (pathname.startsWith('/music') || pathname.startsWith('/now-playing')) {
    return {
      title: 'Sonic archive',
      items: [
        { to: '/music', label: 'Library' },
        { to: '/music/downloads', label: 'Downloads' },
        { to: '/music/liked', label: 'Liked' },
        { to: '/music/stats', label: 'Listening Stats' },
        { to: '/now-playing', label: 'Now Playing' }
      ]
    }
  }
  if (pathname.startsWith('/lists') || pathname.startsWith('/tags')) {
    return {
      title: 'Curated collections',
      items: [
        { to: '/lists', label: 'Lists' },
        { to: '/tags', label: 'Tags' }
      ]
    }
  }
  if (pathname.startsWith('/watch')) {
    return {
      title: 'Transcript-first watch',
      items: [
        { to: '/watch', label: 'Watch' },
        { to: '/wrestling/collection', label: 'Wrestling Video' }
      ]
    }
  }
  if (
    pathname.startsWith('/tasks') ||
    pathname.startsWith('/bulk') ||
    pathname.startsWith('/torrents') ||
    pathname.startsWith('/settings')
  ) {
    return { title: 'Task canvas', items: SYSTEM_DRAWER_ITEMS }
  }

  const media = mediaContext(pathname)
  if (media) return media

  return { title: 'Archive broadcast', items: HOME_ITEMS }
}
