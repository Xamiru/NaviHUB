import type { MediaSummary, MediaType, CreditRole, MediaCompanyRole } from '@shared/types'

// One config object per media type drives the shared list / detail / form pages
// and the sidebar, so adding a media type is mostly a matter of adding an entry
// here. Anime and movies are live; the rest will follow the same shape.

export interface ChildNav {
  to: string
  label: string
  // Person browse pages pass a role so the list filters + ranks by it.
  role?: CreditRole
}

export interface ImportSourceCfg {
  key:
    | 'anilist'
    | 'anilistManga'
    | 'tmdb'
    | 'tmdbTv'
    | 'vndb'
    | 'rawg'
    | 'igdb'
    | 'steam'
    | 'rawgCatalog'
    | 'openlibrary'
  label: string // "AniList" / "TMDB" / "VNDB" / "RAWG" / "Open Library"
  placeholder: string
  // Noun for a result's unit count in the search dialog ("352 pages"); "ep" default.
  unitNoun?: string
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
  formatProgressStat: (m: MediaSummary) => string
  formatCardSub: (m: MediaSummary) => string
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
  // Additional sources shown as pills in ImportDialog (games: Steam for
  // current PC releases + the offline catalog for console/back-catalog).
  // importSource stays the default/first; the gates on list/detail pages only
  // check importSource, so a type with extras needs no other changes.
  importSources?: ImportSourceCfg[]
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
  // Local video player (anime, movies, TV) — shows a Video tab holding the
  // Episodes section (attach a folder, open files in the system video player).
  // Its own tab rather than folding into the media tab: ?tab=media keeps
  // meaning Theme Songs / Chapters, and movies/TV have no media tab at all.
  hasVideoLibrary?: boolean
  // Label for that tab — 'Episodes' for anime/TV, 'Video' for a single film.
  videoTabLabel?: string
  // Fan Art section on the detail page (everything except movies/TV, where
  // official TMDB backdrops cover the need). Wallpapers show for ALL types.
  hasFanArt?: boolean
  // Seasonal browse page (anime) — year picker + Winter/Spring/Summer/Fall
  // shelves at `${basePath}/seasonal`, linked from the sidebar + list header.
  hasSeasonal?: boolean
  // Launch-from-app + playtime tracking (games + VNs) — shows the launcher
  // section (link an executable, Play, session history) on the Playtime tab.
  hasGameLaunch?: boolean
  // Art-led detail header (2026-08). 'banner' hangs the cover off a shallow
  // strip of wide art (anime, VNs — the cover is the recognisable thing);
  // 'backdrop' puts the title and actions on top of a tall still. Absent = the
  // plain two-column header, which is what types whose detail page is carried
  // by a data tab keep (manga/books read, games play, movies/TV watch). See
  // components/MediaHero.tsx.
  detailHero?: 'banner' | 'backdrop'
  // Achievements tab on the detail page + the completion chip on list cards
  // (games + VNs — the same types that can link an executable, since tracking
  // is only offered where one is or once was linked).
  hasAchievements?: boolean
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

// Completion is the second configured status slot. Requiring the configured
// list makes it impossible for a caller to silently fall back to English
// labels after the user renames a status.
export function isCompletedStatus(
  status: string | null | undefined,
  statuses: readonly string[]
): boolean {
  return !!status && status === statuses[1]
}

// Status meaning is positional throughout the app: the last configured value
// is planned, regardless of what the user renamed it to. Quiz "watched" /
// "reading" scopes include every non-planned state and must not infer that
// distinction from English labels.
export function statusesExceptPlanned(statuses: string[]): string[] {
  return statuses.slice(0, -1)
}

export const ANIME: MediaConfig = {
  key: 'anime',
  singular: 'Anime',
  plural: 'Anime',
  basePath: '/anime',
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
    { to: '/anime/seasonal', label: 'Seasonal' },
    { to: '/anime/songs', label: 'Songs' },
    { to: '/people', label: 'Voice Actors', role: 'voice_actor' },
    { to: '/artists', label: 'Artists', role: 'artist' },
    { to: '/studios', label: 'Studios' }
  ],
  importSource: { key: 'anilist', label: 'AniList', placeholder: 'Search AniList (e.g. Frieren)…' },
  hasThemes: true,
  mediaTabLabel: 'Theme Songs',
  hasVideoLibrary: true,
  videoTabLabel: 'Episodes',
  hasFanArt: true,
  hasSeasonal: true,
  detailHero: 'banner'
}

// Manga shares anime's AniList source and character-centric layout, but has no
// voice actors (just characters) and its "crew" are the mangaka (author/artist).
export const MANGA: MediaConfig = {
  key: 'manga',
  singular: 'Manga',
  plural: 'Manga',
  basePath: '/manga',
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
  children: [{ to: '/mangaka', label: 'Mangaka', role: 'mangaka' }],
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
  children: [{ to: '/people', label: 'Voice Actors', role: 'voice_actor' }],
  importSource: { key: 'vndb', label: 'VNDB', placeholder: 'Search VNDB (e.g. Steins;Gate)…' },
  hasPlaytimes: true,
  mediaTabLabel: 'Playtime',
  hasFanArt: true,
  hasGameLaunch: true,
  hasAchievements: true,
  detailHero: 'banner'
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
  statusesKey: 'game.statuses',
  defaultStatuses: ['Playing', 'Completed', 'On Hold', 'Dropped', 'Plan to Play'],
  progressFieldLabel: 'Progress (hours played)',
  // HLTB Main Story hours since 2026-08 (RAWG's crowd average is the fallback).
  totalFieldLabel: 'Length (hours)',
  timesConsumedLabel: 'Times played',
  progressStatLabel: 'Playtime',
  formatProgressStat: (m) =>
    m.totalUnits != null ? `${m.progress} / ~${m.totalUnits} h` : `${m.progress} h`,
  // Length + Metacritic ("~25 h · MC 92") — every games source writes
  // metadata.metacritic, and the user wants it visible per card.
  formatCardSub: (m) => {
    const mc = m.metadata?.['metacritic']
    return [
      m.totalUnits != null ? `~${m.totalUnits} h` : null,
      typeof mc === 'number' && mc > 0 ? `MC ${mc}` : null
    ]
      .filter(Boolean)
      .join(' · ')
  },
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
  children: [
    { to: '/games/installed', label: 'Installed' },
    { to: '/games/achievements', label: 'Achievements' },
    { to: '/games/franchises', label: 'Franchises' },
    { to: '/people', label: 'Voice Actors', role: 'voice_actor' }
  ],
  importSource: { key: 'steam', label: 'Steam', placeholder: 'Search Steam (e.g. Persona 5)…' },
  importSources: [
    { key: 'steam', label: 'Steam', placeholder: 'Search Steam (e.g. Persona 5)…' },
    {
      key: 'rawgCatalog',
      label: 'Catalog (offline)',
      placeholder: 'Search the offline catalog (consoles too)…'
    }
  ],
  hasPlaytimes: true,
  mediaTabLabel: 'Playtime',
  hasFanArt: true,
  hasGameLaunch: true,
  hasAchievements: true
}

export const MOVIE: MediaConfig = {
  key: 'movie',
  singular: 'Movie',
  plural: 'Movies',
  basePath: '/movies',
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
    { to: '/actors', label: 'Actors', role: 'actor' },
    { to: '/directors', label: 'Directors', role: 'director' }
  ],
  sidebarLabel: 'Movies / TV', // short enough not to wrap in the mono sidebar
  hasVideoLibrary: true,
  videoTabLabel: 'Video',
  listTabs: [
    { key: 'movie', label: 'Movies' },
    { key: 'tv', label: 'TV Shows' }
  ],
  importSource: { key: 'tmdb', label: 'TMDB', placeholder: 'Search TMDB (e.g. Inception)…' },
}

// TV shares Movies' section, actor pool, and TMDB source, but lists separately
// and has no crew (directors aren't tracked for TV). Episode-based like anime.
export const TV: MediaConfig = {
  key: 'tv',
  singular: 'TV Show',
  plural: 'TV Shows',
  basePath: '/tv',
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
  hasVideoLibrary: true,
  // 'Files' rather than 'Episodes': the Seasons tab below is where episodes are
  // tracked, and two tabs called Episodes would be a coin toss.
  videoTabLabel: 'Files',
  // The TMDB episode catalogue as a season accordion + tick grid.
  mediaTabLabel: 'Seasons',
  listTabs: [
    { key: 'movie', label: 'Movies' },
    { key: 'tv', label: 'TV Shows' }
  ],
  importSource: { key: 'tmdbTv', label: 'TMDB', placeholder: 'Search TMDB TV (e.g. Breaking Bad)…' }
}

// Books track pages, not sittings: progress = current page (hand-edited or from
// a physical bookmark), total_units = page count from Open Library. No
// unitProgress — "+1 page" is not a meaningful log action, so the detail-page
// log button falls back to mark-completed / read-again. Local EPUBs attach via
// the manga chapter machinery under the books.dir root (each .epub = a volume).
export const BOOK: MediaConfig = {
  key: 'book',
  singular: 'Book',
  plural: 'Books',
  basePath: '/books',
  statusesKey: 'book.statuses',
  defaultStatuses: ['Reading', 'Completed', 'On Hold', 'Dropped', 'Plan to Read'],
  progressFieldLabel: 'Progress (pages read)',
  totalFieldLabel: 'Total pages',
  timesConsumedLabel: 'Times read',
  progressStatLabel: 'Progress',
  formatProgressStat: (m) =>
    `${m.totalUnits != null ? `${m.progress} / ${m.totalUnits}` : m.progress} p`,
  formatCardSub: (m) => `${m.totalUnits != null ? `${m.progress}/${m.totalUnits}` : m.progress} p`,
  // Like manga: characters exist only as hand-added entries, nobody voices them.
  castRole: 'voice_actor',
  castSectionTitle: 'Characters',
  castPersonLabel: 'Character',
  castShowLanguage: false,
  castLayout: 'character-only',
  crewTitle: 'Authors',
  companyTitle: 'Publishers',
  companyRoles: [
    { value: 'publisher', label: 'Publisher' },
    { value: 'other', label: 'Other' }
  ],
  companyDefaultRole: 'publisher',
  companyPickerPlaceholder: 'Add publisher…',
  children: [{ to: '/authors', label: 'Authors', role: 'writer' }],
  importSource: {
    key: 'openlibrary',
    label: 'Open Library',
    placeholder: 'Search Open Library (e.g. The Hobbit)…',
    unitNoun: 'pages'
  },
  hasLocalReader: true,
  mediaTabLabel: 'Volumes',
  hasFanArt: true
}

// Media types with a live UI, in sidebar order.
export const MEDIA_CONFIGS: MediaConfig[] = [ANIME, MANGA, VISUAL_NOVEL, GAME, BOOK, MOVIE, TV]

const BY_KEY: Record<string, MediaConfig> = Object.fromEntries(
  MEDIA_CONFIGS.map((c) => [c.key, c])
)

export function configFor(key: MediaType): MediaConfig {
  return BY_KEY[key] ?? ANIME
}

// Detail-page route for a media item, by its type (used by shared entity pages
// that link back to the work — a person/character/company can span types).
export function pathForMedia(m: Pick<MediaSummary, 'id' | 'mediaType'>): string {
  return `${configFor(m.mediaType).basePath}/${m.id}`
}
