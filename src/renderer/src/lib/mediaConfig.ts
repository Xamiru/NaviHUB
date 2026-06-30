import type { MediaItem, MediaType, CreditRole, MediaCompanyRole } from '@shared/types'

// One config object per media type drives the shared list / detail / form pages
// and the sidebar, so adding a media type is mostly a matter of adding an entry
// here. Anime and movies are live; the rest will follow the same shape.

export interface ChildNav {
  to: string
  label: string
  icon: string
  // Person browse pages pass a role so the list filters + ranks by it.
  role?: CreditRole
}

export interface ImportSourceCfg {
  key: 'anilist' | 'anilistManga' | 'tmdb' | 'tmdbTv'
  label: string // "AniList" / "TMDB"
  placeholder: string
}

// A tab shown on the list page that links to a sibling media type's list (e.g.
// Movies ⇄ TV Shows, which share a section and an actor pool but list separately).
export interface ListTab {
  key: MediaType
  label: string
}

export interface MediaConfig {
  key: MediaType
  singular: string // "Anime" / "Movie"
  plural: string // "Anime" / "Movies"
  basePath: string // "/anime" / "/movies"
  icon: string
  // statuses
  statusesKey: string // settings key, e.g. "anime.statuses"
  defaultStatuses: string[]
  // form labels
  progressFieldLabel: string // "Progress (episodes watched)" / "Times watched"
  totalFieldLabel: string // "Total episodes" / "Runtime (min)"
  // detail / card display
  progressStatLabel: string // "Progress" / "Runtime"
  formatProgressStat: (m: MediaItem) => string
  formatCardSub: (m: MediaItem) => string
  // cast (character + the person who plays/voices them)
  castRole: CreditRole // 'voice_actor' / 'actor'
  castSectionTitle: string // "Characters" / "Cast"
  castPersonLabel: string // "Voice actor" / "Actor"
  castShowLanguage: boolean
  // Card layout for the cast section. 'character' shows two portraits
  // (character + the voice actor) as anime needs; 'actor' shows a single actor
  // portrait with the role as a subtitle (movies/TV, where the character image
  // is just the actor's photo, so two pictures would be redundant);
  // 'character-only' shows just the character portrait + name (manga, which has
  // characters but nobody voices/plays them).
  castLayout: 'character' | 'actor' | 'character-only'
  // crew / staff
  crewTitle: string // "Staff" / "Crew"
  hasCrew?: boolean // false hides the crew section + skips crew on import (TV)
  // companies
  companyTitle: string // "Studios" / "Production"
  companyRoles: { value: MediaCompanyRole; label: string }[]
  companyDefaultRole: MediaCompanyRole
  companyPickerPlaceholder: string
  // sidebar dropdown
  children: ChildNav[]
  sidebarLabel?: string // overrides `plural` as the sidebar section title
  hideFromSidebar?: boolean // routed but not shown as its own sidebar section (TV)
  // list-page tabs to sibling types (Movies ⇄ TV Shows); omit for standalone types
  listTabs?: ListTab[]
  // external import
  importSource?: ImportSourceCfg
  // OP/ED theme songs (anime only) — shows the Theme Songs section + import.
  hasThemes?: boolean
}

// Roles that represent "playing/voicing a character" (vs. crew). Used to split
// a person's credits and to exclude cast from the crew section.
export const CAST_ROLES: CreditRole[] = ['voice_actor', 'actor']

export const ANIME: MediaConfig = {
  key: 'anime',
  singular: 'Anime',
  plural: 'Anime',
  basePath: '/anime',
  icon: '▶',
  statusesKey: 'anime.statuses',
  defaultStatuses: ['Watching', 'Completed', 'On Hold', 'Dropped', 'Plan to Watch'],
  progressFieldLabel: 'Progress (episodes watched)',
  totalFieldLabel: 'Total episodes',
  progressStatLabel: 'Progress',
  formatProgressStat: (m) => `${m.totalUnits != null ? `${m.progress} / ${m.totalUnits}` : m.progress} ep`,
  formatCardSub: (m) => `${m.totalUnits != null ? `${m.progress}/${m.totalUnits}` : m.progress} ep`,
  castRole: 'voice_actor',
  castSectionTitle: 'Characters',
  castPersonLabel: 'Voice actor',
  castShowLanguage: true,
  castLayout: 'character',
  crewTitle: 'Staff',
  companyTitle: 'Studios',
  companyRoles: [
    { value: 'animation_studio', label: 'Animation Studio' },
    { value: 'producer', label: 'Producer' },
    { value: 'other', label: 'Other' }
  ],
  companyDefaultRole: 'animation_studio',
  companyPickerPlaceholder: 'Add studio / company…',
  children: [
    { to: '/people', label: 'Voice Actors', icon: '☻', role: 'voice_actor' },
    { to: '/artists', label: 'Artists', icon: '♪', role: 'artist' },
    { to: '/studios', label: 'Studios', icon: '⌂' }
  ],
  importSource: { key: 'anilist', label: 'AniList', placeholder: 'Search AniList (e.g. Frieren)…' },
  hasThemes: true
}

// Manga shares anime's AniList source and character-centric layout, but has no
// voice actors (just characters) and its "crew" are the mangaka (author/artist).
export const MANGA: MediaConfig = {
  key: 'manga',
  singular: 'Manga',
  plural: 'Manga',
  basePath: '/manga',
  icon: '▤',
  statusesKey: 'manga.statuses',
  defaultStatuses: ['Reading', 'Completed', 'On Hold', 'Dropped', 'Plan to Read'],
  progressFieldLabel: 'Progress (chapters read)',
  totalFieldLabel: 'Total chapters',
  progressStatLabel: 'Progress',
  formatProgressStat: (m) =>
    `${m.totalUnits != null ? `${m.progress} / ${m.totalUnits}` : m.progress} ch`,
  formatCardSub: (m) => `${m.totalUnits != null ? `${m.progress}/${m.totalUnits}` : m.progress} ch`,
  // Manga characters have no voice actor; castRole is unused (no cast credits are
  // created) but must be a valid role.
  castRole: 'voice_actor',
  castSectionTitle: 'Characters',
  castPersonLabel: 'Character',
  castShowLanguage: false,
  castLayout: 'character-only',
  crewTitle: 'Mangaka',
  companyTitle: 'Publishers',
  companyRoles: [
    { value: 'publisher', label: 'Publisher' },
    { value: 'other', label: 'Other' }
  ],
  companyDefaultRole: 'publisher',
  companyPickerPlaceholder: 'Add publisher…',
  children: [{ to: '/mangaka', label: 'Mangaka', icon: '✎', role: 'mangaka' }],
  importSource: {
    key: 'anilistManga',
    label: 'AniList',
    placeholder: 'Search AniList manga (e.g. Berserk)…'
  }
}

export const MOVIE: MediaConfig = {
  key: 'movie',
  singular: 'Movie',
  plural: 'Movies',
  basePath: '/movies',
  icon: '⬚',
  statusesKey: 'movie.statuses',
  defaultStatuses: ['Watching', 'Watched', 'On Hold', 'Dropped', 'Want to Watch'],
  progressFieldLabel: 'Times watched',
  totalFieldLabel: 'Runtime (min)',
  progressStatLabel: 'Runtime',
  formatProgressStat: (m) => (m.totalUnits != null ? `${m.totalUnits} min` : '—'),
  formatCardSub: (m) => (m.totalUnits != null ? `${m.totalUnits} min` : ''),
  castRole: 'actor',
  castSectionTitle: 'Cast',
  castPersonLabel: 'Actor',
  castShowLanguage: false,
  castLayout: 'actor',
  crewTitle: 'Crew',
  companyTitle: 'Production',
  companyRoles: [
    { value: 'production_studio', label: 'Studio' },
    { value: 'producer', label: 'Producer' },
    { value: 'other', label: 'Other' }
  ],
  companyDefaultRole: 'production_studio',
  companyPickerPlaceholder: 'Add production company…',
  children: [
    { to: '/actors', label: 'Actors', icon: '☻', role: 'actor' },
    { to: '/directors', label: 'Directors', icon: '✪', role: 'director' }
  ],
  sidebarLabel: 'Movies / TV Shows',
  listTabs: [
    { key: 'movie', label: 'Movies' },
    { key: 'tv', label: 'TV Shows' }
  ],
  importSource: { key: 'tmdb', label: 'TMDB', placeholder: 'Search TMDB (e.g. Inception)…' }
}

// TV shares Movies' section, actor pool, and TMDB source, but lists separately
// and has no crew (directors aren't tracked for TV). Episode-based like anime.
export const TV: MediaConfig = {
  key: 'tv',
  singular: 'TV Show',
  plural: 'TV Shows',
  basePath: '/tv',
  icon: '▦',
  statusesKey: 'tv.statuses',
  defaultStatuses: ['Watching', 'Watched', 'On Hold', 'Dropped', 'Want to Watch'],
  progressFieldLabel: 'Progress (episodes watched)',
  totalFieldLabel: 'Total episodes',
  progressStatLabel: 'Progress',
  formatProgressStat: (m) =>
    `${m.totalUnits != null ? `${m.progress} / ${m.totalUnits}` : m.progress} ep`,
  formatCardSub: (m) => `${m.totalUnits != null ? `${m.progress}/${m.totalUnits}` : m.progress} ep`,
  castRole: 'actor',
  castSectionTitle: 'Cast',
  castPersonLabel: 'Actor',
  castShowLanguage: false,
  castLayout: 'actor',
  crewTitle: 'Crew',
  hasCrew: false,
  companyTitle: 'Networks',
  companyRoles: [
    { value: 'production_studio', label: 'Studio / Network' },
    { value: 'producer', label: 'Producer' },
    { value: 'other', label: 'Other' }
  ],
  companyDefaultRole: 'production_studio',
  companyPickerPlaceholder: 'Add network / company…',
  children: [],
  hideFromSidebar: true,
  listTabs: [
    { key: 'movie', label: 'Movies' },
    { key: 'tv', label: 'TV Shows' }
  ],
  importSource: { key: 'tmdbTv', label: 'TMDB', placeholder: 'Search TMDB TV (e.g. Breaking Bad)…' }
}

// Media types with a live UI, in sidebar order.
export const MEDIA_CONFIGS: MediaConfig[] = [ANIME, MANGA, MOVIE, TV]

const BY_KEY: Record<string, MediaConfig> = Object.fromEntries(
  MEDIA_CONFIGS.map((c) => [c.key, c])
)

export function configFor(key: MediaType): MediaConfig {
  return BY_KEY[key] ?? ANIME
}

// Detail-page route for a media item, by its type (used by shared entity pages
// that link back to the work — a person/character/company can span types).
export function pathForMedia(m: Pick<MediaItem, 'id' | 'mediaType'>): string {
  return `${configFor(m.mediaType).basePath}/${m.id}`
}
