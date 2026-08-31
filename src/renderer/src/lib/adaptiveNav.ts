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
  descriptor: string
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
  { to: '/football', label: 'Football', visibilityKey: 'football' },
  { to: '/lists', label: 'Lists', visibilityKey: 'lists' },
  { to: '/tags', label: 'Tags', visibilityKey: 'tags' }
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
        { to: '/studios', label: 'Studios' },
        { to: '/characters', label: 'Characters' }
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
      items: [{ to: '/visual-novels', label: 'Visual Novels' }]
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
        { to: '/games/franchises', label: 'Franchises' }
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
  if (pathname.startsWith('/gacha')) {
    return {
      title: 'Gacha',
      descriptor: 'Operations board',
      items: [
        { to: '/gacha', label: 'Operations' },
        ...GACHA_GAMES.map((game) => ({ to: `/gacha/${game.id}`, label: game.short }))
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
      title: 'Music',
      descriptor: 'Sonic archive',
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
    return { title: 'System', descriptor: 'Tasks and settings', items: SYSTEM_DRAWER_ITEMS }
  }

  const media = mediaContext(pathname)
  if (media) return media

  return { title: 'Home', descriptor: 'Archive broadcast', items: HOME_ITEMS }
}
