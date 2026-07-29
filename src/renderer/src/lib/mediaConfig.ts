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
  key: 'anilist' | 'anilistManga' | 'tmdb' | 'tmdbTv' | 'vndb' | 'rawg'
  label: string // "AniList" / "TMDB" / "VNDB" / "RAWG"
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
  progressFieldLabel: string // "Progress (episodes watched)" / "Progress (minutes)"
  totalFieldLabel: string // "Total episodes" / "Runtime (min)"
  // Per-type label for the universal times-consumed counter (rewatch_count),
  // shown on every form + detail page.
  timesConsumedLabel: string // "Times watched" / "Times read" / "Times played"
  // Progress counts discrete units toward totalUnits (episodes/chapters), so a
  // completed status fills progress to the total and progress is capped at it.
  // Off for time-based progress (VN minutes, game hours — playing past the
  // average is normal).
  unitProgress?: boolean
  // Label for the detail page's one-click progress log, e.g. "+1 episode".
  // Omit on types where a single sitting isn't a countable unit (VN minutes,
  // game hours) — the button then only offers the "again" pass.
  logUnitLabel?: string
  // Movies have no unit progress (you don't track partial episodes/chapters) —
  // hide the progress field entirely. Runtime lives in totalFieldLabel and the
  // watch count in timesConsumedLabel. Defaults to showing progress.
  noProgress?: boolean
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
  // Label for the detail page's type-specific media tab (Theme Songs /
  // Chapters / Playtime). Absent = no media tab (movies, TV).
  mediaTabLabel?: string
  // HowLongToBeat-style play-time panel (games + VNs) — shows length estimate
  // boxes on the detail page plus a manual HLTB fetch/refresh button.
  hasPlaytimes?: boolean
  // Local manga reader (manga only) — shows the Chapters section (attach a
  // local folder, read in-app) on the detail page.
  hasLocalReader?: boolean
  // Fan Art section on the detail page (everything except movies/TV, where
  // official TMDB backdrops cover the need). Wallpapers show for ALL types.
  hasFanArt?: boolean
  // Seasonal browse page (anime) — year picker + Winter/Spring/Summer/Fall
  // shelves at `${basePath}/seasonal`, linked from the sidebar + list header.
  hasSeasonal?: boolean
}

// Roles that represent "playing/voicing a character" (vs. crew). Used to split
// a person's credits and to exclude cast from the crew section.
export const CAST_ROLES: CreditRole[] = ['voice_actor', 'actor']

// Minutes displayed HowLongToBeat-style: under an hour as "45m", then hours
// rounded to the nearest half ("31½ h"). Used by the VN card/progress stats
// (VN lengths are stored in minutes) and the play-time boxes on detail pages.
export function fmtMinutesAsHours(minutes: number): string {
  if (minutes < 60) return `${minutes}m`
  const halves = Math.round(minutes / 30)
  const h = Math.floor(halves / 2)
  return halves % 2 ? `${h}½ h` : `${h} h`
}

// Statuses that mean "finished the whole thing" across the per-type presets
// ("Completed" / "Watched"). Statuses are user-editable, so match by name.
export function isCompletedStatus(status: string | null | undefined): boolean {
  return !!status && /^(completed|watched)$/i.test(status.trim())
}

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
  timesConsumedLabel: 'Times watched',
  unitProgress: true,
  logUnitLabel: 'episode',
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
    { to: '/anime/seasonal', label: 'Seasonal', icon: '❆' },
    { to: '/anime/songs', label: 'Songs', icon: '♫' },
    { to: '/people', label: 'Voice Actors', icon: '☻', role: 'voice_actor' },
    { to: '/artists', label: 'Artists', icon: '♪', role: 'artist' },
    { to: '/studios', label: 'Studios', icon: '⌂' }
  ],
  importSource: { key: 'anilist', label: 'AniList', placeholder: 'Search AniList (e.g. Frieren)…' },
  hasThemes: true,
  mediaTabLabel: 'Theme Songs',
  hasFanArt: true,
  hasSeasonal: true
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
  timesConsumedLabel: 'Times read',
  unitProgress: true,
  logUnitLabel: 'chapter',
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
  },
  hasLocalReader: true,
  mediaTabLabel: 'Chapters',
  hasFanArt: true
}

// Visual novels come from VNDB (AniList has no VN data). Structurally they're
// like anime — characters with voice actors, plus developers as the "studio" —
// so they reuse the character/voice-actor layout. Voice actors are deliberately
// SHARED with anime (same seiyuu), so the VA browse child points at the same
// /people page (widened to anime + VN in App.tsx).
export const VISUAL_NOVEL: MediaConfig = {
  key: 'visual_novel',
  singular: 'Visual Novel',
  plural: 'Visual Novels',
  basePath: '/visual-novels',
  icon: '✦',
  statusesKey: 'visual_novel.statuses',
  defaultStatuses: ['Playing', 'Completed', 'On Hold', 'Dropped', 'Plan to Play'],
  progressFieldLabel: 'Progress (minutes)',
  totalFieldLabel: 'Length (minutes)',
  timesConsumedLabel: 'Times played',
  progressStatLabel: 'Progress',
  formatProgressStat: (m) =>
    m.totalUnits != null
      ? `${fmtMinutesAsHours(m.progress)} / ${fmtMinutesAsHours(m.totalUnits)}`
      : fmtMinutesAsHours(m.progress),
  formatCardSub: (m) => (m.totalUnits != null ? fmtMinutesAsHours(m.totalUnits) : ''),
  castRole: 'voice_actor',
  castSectionTitle: 'Characters',
  castPersonLabel: 'Voice actor',
  castShowLanguage: true,
  castLayout: 'character',
  crewTitle: 'Staff',
  companyTitle: 'Developers',
  companyRoles: [
    { value: 'developer', label: 'Developer' },
    { value: 'publisher', label: 'Publisher' },
    { value: 'other', label: 'Other' }
  ],
  companyDefaultRole: 'developer',
  companyPickerPlaceholder: 'Add developer / publisher…',
  children: [{ to: '/people', label: 'Voice Actors', icon: '☻', role: 'voice_actor' }],
  importSource: { key: 'vndb', label: 'VNDB', placeholder: 'Search VNDB (e.g. Steins;Gate)…' },
  hasPlaytimes: true,
  mediaTabLabel: 'Playtime',
  hasFanArt: true
}

// Games come from RAWG (metadata, cover, developers/publishers, genres — it has
// no cast data, so characters and voice actors are added by hand). Structurally
// they mirror visual novels: characters voiced by seiyuu, so the cast layout is
// character + VA, and the VA pool is SHARED with anime/VN — a Japanese game's
// voice actor resolves to the same person page as their anime roles (the
// /people route is widened to include games in App.tsx).
export const GAME: MediaConfig = {
  key: 'game',
  singular: 'Game',
  plural: 'Games',
  basePath: '/games',
  icon: '❖',
  statusesKey: 'game.statuses',
  defaultStatuses: ['Playing', 'Completed', 'On Hold', 'Dropped', 'Plan to Play'],
  progressFieldLabel: 'Progress (hours played)',
  totalFieldLabel: 'Average length (hours)',
  timesConsumedLabel: 'Times played',
  progressStatLabel: 'Playtime',
  formatProgressStat: (m) =>
    m.totalUnits != null ? `${m.progress} / ~${m.totalUnits} h` : `${m.progress} h`,
  formatCardSub: (m) => (m.totalUnits != null ? `~${m.totalUnits} h` : ''),
  castRole: 'voice_actor',
  castSectionTitle: 'Characters',
  castPersonLabel: 'Voice actor',
  castShowLanguage: true,
  castLayout: 'character',
  crewTitle: 'Staff',
  companyTitle: 'Developers',
  companyRoles: [
    { value: 'developer', label: 'Developer' },
    { value: 'publisher', label: 'Publisher' },
    { value: 'other', label: 'Other' }
  ],
  companyDefaultRole: 'developer',
  companyPickerPlaceholder: 'Add developer / publisher…',
  children: [{ to: '/people', label: 'Voice Actors', icon: '☻', role: 'voice_actor' }],
  importSource: { key: 'rawg', label: 'RAWG', placeholder: 'Search RAWG (e.g. Persona 5)…' },
  hasPlaytimes: true,
  mediaTabLabel: 'Playtime',
  hasFanArt: true
}

export const MOVIE: MediaConfig = {
  key: 'movie',
  singular: 'Movie',
  plural: 'Movies',
  basePath: '/movies',
  icon: '⬚',
  statusesKey: 'movie.statuses',
  defaultStatuses: ['Watching', 'Watched', 'On Hold', 'Dropped', 'Want to Watch'],
  progressFieldLabel: 'Progress', // unused: movies hide progress (noProgress)
  totalFieldLabel: 'Runtime (min)',
  timesConsumedLabel: 'Times watched',
  noProgress: true,
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
  sidebarLabel: 'Movies / TV', // short enough not to wrap in the mono sidebar
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
  timesConsumedLabel: 'Times watched',
  unitProgress: true,
  logUnitLabel: 'episode',
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
export const MEDIA_CONFIGS: MediaConfig[] = [ANIME, MANGA, VISUAL_NOVEL, GAME, MOVIE, TV]

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
