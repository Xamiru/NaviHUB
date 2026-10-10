// The Settings page's map: its tabs, every card on them, and the search over
// those cards. Kept out of the page so the guard test can hold it against the
// card titles actually rendered (tests/settingsCatalog.test.ts) and so the
// search is testable without rendering eight tabs.

import { APP_THEME_OPTIONS } from '@shared/appTheme'
import { MEDIA_CONFIGS } from './mediaConfig'

export const SETTINGS_TABS = [
  { key: 'appearance', label: 'Appearance' },
  { key: 'library', label: 'Library & tracking' },
  { key: 'keys', label: 'Accounts & keys' },
  { key: 'storage', label: 'Folders & storage' },
  { key: 'learning', label: 'Learning' },
  { key: 'defaults', label: 'Readers & quizzes' },
  { key: 'tools', label: 'Tools' },
  { key: 'about', label: 'Backup & about' }
] as const

export type SettingsTab = (typeof SETTINGS_TABS)[number]['key']

// Tab keys before the 2026-10-10 regroup. They live on in `?tab=` links,
// task routes and history-scoped page state, so they keep resolving.
const LEGACY_TAB_ALIASES: Record<string, SettingsTab> = {
  general: 'appearance',
  statuses: 'library',
  data: 'storage',
  japanese: 'learning',
  ai: 'tools',
  integrations: 'tools',
  system: 'about'
}

export function resolveSettingsTab(raw: string | null | undefined): SettingsTab | null {
  if (!raw) return null
  if (SETTINGS_TABS.some((tab) => tab.key === raw)) return raw as SettingsTab
  return LEGACY_TAB_ALIASES[raw] ?? null
}

export function settingsTabLabel(tab: SettingsTab): string {
  return SETTINGS_TABS.find((t) => t.key === tab)?.label ?? tab
}

export interface SettingsCard {
  // The card's visible title, exactly as rendered; it is also its anchor.
  title: string
  tab: SettingsTab
  keywords?: readonly string[]
}

const THEME_WORDS = APP_THEME_OPTIONS.map((option) => option.label)

export const SETTINGS_CATALOG: readonly SettingsCard[] = [
  // Appearance
  { title: 'Theme', tab: 'appearance', keywords: ['appearance', 'colour', 'color', 'style', ...THEME_WORDS] },
  { title: 'Signal clarity', tab: 'appearance', keywords: ['effects', 'atmosphere', 'lain'] },
  { title: 'UI scale', tab: 'appearance', keywords: ['zoom', 'size', 'text size'] },
  { title: 'Menu bar', tab: 'appearance', keywords: ['window menu', 'file menu'] },
  { title: 'Sidebar', tab: 'appearance', keywords: ['navigation', 'hide sections', 'rail'] },

  // Library & tracking
  { title: 'Score scale', tab: 'library', keywords: ['rating', 'points'] },
  { title: 'Time stats estimates', tab: 'library', keywords: ['hours', 'episode length', 'stats'] },
  {
    title: 'Library list defaults',
    tab: 'library',
    keywords: ['sort', 'order', 'layout', 'grid', 'covers', 'list view', 'default']
  },
  ...MEDIA_CONFIGS.map((cfg) => ({
    title: `${cfg.singular} statuses`,
    tab: 'library' as const,
    keywords: ['status', 'tracking', 'watching', 'completed', 'planned', cfg.plural]
  })),

  // Accounts & keys
  { title: 'TMDB API key', tab: 'keys', keywords: ['movies', 'tv', 'themoviedb', 'credentials'] },
  { title: 'OMDb API key', tab: 'keys', keywords: ['imdb', 'rotten tomatoes', 'movies'] },
  { title: 'Hardcover API token', tab: 'keys', keywords: ['books', 'goodreads'] },
  { title: 'fanart.tv API key', tab: 'keys', keywords: ['art', 'wallpapers', 'logos'] },
  { title: 'API-Football key', tab: 'keys', keywords: ['football', 'soccer', 'matchday'] },
  { title: 'Steam Web API key', tab: 'keys', keywords: ['games', 'achievements'] },
  { title: 'SteamGridDB API key', tab: 'keys', keywords: ['games', 'art', 'grids', 'heroes'] },
  { title: 'RetroAchievements username', tab: 'keys', keywords: ['ra', 'emulator', 'achievements'] },
  { title: 'RetroAchievements Web API key', tab: 'keys', keywords: ['ra', 'emulator', 'achievements'] },
  { title: 'Gemini API key', tab: 'keys', keywords: ['ai', 'google', 'ai studio', 'writing feedback'] },
  { title: 'Anthropic API key', tab: 'keys', keywords: ['ai', 'claude', 'writing feedback'] },

  // Folders & storage
  { title: 'Anime music folder', tab: 'storage', keywords: ['theme songs', 'openings', 'audio'] },
  { title: 'Manga library folder', tab: 'storage', keywords: ['cbz', 'comics'] },
  { title: 'Books library folder', tab: 'storage', keywords: ['epub', 'ebooks'] },
  { title: 'Video library folder', tab: 'storage', keywords: ['episodes', 'films', 'mkv'] },
  { title: 'Wrestling library folder', tab: 'storage', keywords: ['ppv', 'matches'] },
  { title: 'Football media folder', tab: 'storage', keywords: ['clips', 'highlights'] },
  { title: 'Music library folder', tab: 'storage', keywords: ['songs', 'albums', 'mp3', 'flac'] },
  { title: 'Pictures folder', tab: 'storage', keywords: ['wallpapers', 'fan art', 'move'] },
  { title: 'Media folder', tab: 'storage', keywords: ['covers', 'images', 'photos', 'move'] },
  { title: 'History archive folder', tab: 'storage', keywords: ['history', 'attachments', 'move'] },
  { title: 'Slideshow folder', tab: 'storage', keywords: ['windows', 'desktop background'] },
  {
    title: 'Storage usage',
    tab: 'storage',
    keywords: ['disk space', 'size', 'cache', 'thumbnails', 'subtitles', 'data folder', 'logs']
  },
  {
    title: 'Database maintenance',
    tab: 'storage',
    keywords: ['integrity', 'check', 'compact', 'vacuum', 'repair', 'shrink']
  },

  // Learning
  { title: 'Assumed known words', tab: 'learning', keywords: ['japanese', 'baseline', 'vocabulary'] },
  {
    title: 'Japanese study defaults',
    tab: 'learning',
    keywords: ['daily', 'new cards', 'srs', 'kana keyboard', 'romaji', 'flick']
  },
  {
    title: 'Japanese dictionaries',
    tab: 'learning',
    keywords: ['jmdict', 'kanjidic', 'pitch', 'tatoeba', 'kanjivg', 'frequency', 'offline']
  },
  { title: 'English dictionary', tab: 'learning', keywords: ['wordnet', 'frequency', 'offline'] },

  // Readers & quizzes
  {
    title: 'Manga reader defaults',
    tab: 'defaults',
    keywords: ['reading direction', 'double page', 'spread', 'fit', 'webtoon']
  },
  {
    title: 'Book reader defaults',
    tab: 'defaults',
    keywords: ['epub', 'font', 'text size', 'theme', 'sepia', 'vertical', 'tategaki']
  },
  {
    title: 'Quiz defaults',
    tab: 'defaults',
    keywords: ['timer', 'countdown', 'song quiz', 'clip', 'snippet', 'auto next']
  },

  // Tools
  { title: 'AI model', tab: 'tools', keywords: ['gemini', 'claude', 'vertex', 'writing feedback', 'provider'] },
  { title: 'yt-dlp (music downloads)', tab: 'tools', keywords: ['youtube', 'downloader', 'deno'] },
  {
    title: 'Playlist and catalogue downloads',
    tab: 'tools',
    keywords: ['spotify', 'youtube music', 'cookies']
  },
  { title: 'ffmpeg (video library tools)', tab: 'tools', keywords: ['video', 'subtitles', 'ffprobe'] },
  { title: 'mokuro (manga OCR)', tab: 'tools', keywords: ['ocr', 'manga', 'japanese'] },
  { title: 'Jackett (torrent search)', tab: 'tools', keywords: ['torrents', 'indexers'] },
  { title: 'qBittorrent (torrent hand-off)', tab: 'tools', keywords: ['torrents', 'download client'] },

  // Backup & about
  {
    title: 'Backup and restore',
    tab: 'about',
    keywords: ['backup', 'restore', 'transfer', 'move library', 'pc', 'laptop', 'safety copy', 'undo']
  },
  {
    title: 'Library export',
    tab: 'about',
    keywords: ['export', 'share', 'portable', 'zip', 'privacy', 'transfer']
  },
  { title: 'Updates', tab: 'about', keywords: ['version', 'release', 'upgrade'] },
  {
    title: 'About NaviHUB',
    tab: 'about',
    keywords: ['version', 'electron', 'data folder', 'log folder', 'build']
  },
  {
    title: 'Keyboard shortcuts',
    tab: 'about',
    keywords: ['keys', 'hotkeys', 'keyboard', 'ctrl', 'tabs', 'player', 'reader']
  }
]

export { settingSlug } from './settingSlug'

// Crude English stemming, enough that "dictionary" finds "dictionaries" and
// "keys" finds "key". Applied to both sides, so it only has to be consistent.
function stem(word: string): string {
  if (word.length > 4 && word.endsWith('ies')) return `${word.slice(0, -3)}y`
  if (word.length > 3 && word.endsWith('s') && !word.endsWith('ss')) return word.slice(0, -1)
  return word
}

function words(text: string): string[] {
  return text
    .toLocaleLowerCase()
    .split(/[^a-z0-9.]+/)
    .filter(Boolean)
    .map(stem)
}

// Every query word must appear in the card's title, keywords or tab label.
export function matchesSettingsCard(card: SettingsCard, query: string): boolean {
  const needles = words(query)
  if (needles.length === 0) return true
  const haystack = words([card.title, settingsTabLabel(card.tab), ...(card.keywords ?? [])].join(' '))
  return needles.every((needle) => haystack.some((word) => word.includes(needle)))
}

export function searchSettings(query: string): SettingsCard[] {
  if (!query.trim()) return []
  const hits = SETTINGS_CATALOG.filter((card) => matchesSettingsCard(card, query))
  // A title hit outranks a keyword-only hit; ties keep page order.
  const needle = query.trim().toLocaleLowerCase()
  return hits
    .map((card, index) => ({ card, index, title: card.title.toLocaleLowerCase().includes(needle) }))
    .sort((a, b) => Number(b.title) - Number(a.title) || a.index - b.index)
    .map((entry) => entry.card)
}
