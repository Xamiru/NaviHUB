// Bulk-import vocabulary — the catalog of "top N" lists the /bulk page offers,
// as code (the CHECKLIST_DEFS idiom). Sort `key` strings are
// FROZEN: the main process switches on them and the renderer persists them.
// Books are deliberately absent: Open Library has no usable "top" lists, and
// its work ids are strings (every source here crosses IPC as a number).

export type BulkSourceKey = 'anime' | 'manga' | 'game' | 'visual_novel' | 'movie' | 'tv'

export interface BulkSortCfg {
  key: string
  label: string
}

export interface BulkSourceCfg {
  key: BulkSourceKey
  label: string
  sorts: BulkSortCfg[]
  // Genre filter: AniList and the games catalog filter by NAME; TMDB needs its
  // numeric genre ids, so movie/tv carry a name→id map instead of a plain list.
  hasGenre: boolean
  genres?: string[]
  genreIds?: Record<string, number>
  // Season filter (Winter/Spring/Summer/Fall + year) — anime only.
  hasSeason: boolean
  // AniList format and country-of-origin filters. Keys are FROZEN (persisted by
  // the renderer); anilist.ts maps each to AniList's enum values.
  formats?: BulkSortCfg[]
  countries?: BulkSortCfg[]
  maxCount: number
  // Needs the offline games catalog installed before preview works.
  offline?: boolean
}

// AniList's fixed public genre list (both anime and manga).
const ANILIST_GENRES = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Ecchi',
  'Fantasy',
  'Horror',
  'Mahou Shoujo',
  'Mecha',
  'Music',
  'Mystery',
  'Psychological',
  'Romance',
  'Sci-Fi',
  'Slice of Life',
  'Sports',
  'Supernatural',
  'Thriller'
]

// LaunchBox's genre vocabulary as it appears in the games catalog's `genres`
// JSON: every genre on at least ~500 works in the 2026-10 pack.
const CATALOG_GENRES = [
  'Action',
  'Adventure',
  "Beat 'em Up",
  'Board Game',
  'Casino',
  'Compilation',
  'Construction and Management Simulation',
  'Education',
  'Fighting',
  'Flight Simulator',
  'Horror',
  'Life Simulation',
  'MMO',
  'Music',
  'Party',
  'Pinball',
  'Platform',
  'Puzzle',
  'Quiz',
  'Racing',
  'Role-Playing',
  'Sandbox',
  'Shooter',
  'Sports',
  'Stealth',
  'Strategy',
  'Vehicle Simulation',
  'Visual Novel'
]

// TMDB's official genre-id maps. Movie and TV differ (TV merges Action into
// "Action & Adventure", has no Horror, etc.) — two maps on purpose.
const TMDB_MOVIE_GENRES: Record<string, number> = {
  Action: 28,
  Adventure: 12,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Fantasy: 14,
  History: 36,
  Horror: 27,
  Music: 10402,
  Mystery: 9648,
  Romance: 10749,
  'Science Fiction': 878,
  Thriller: 53,
  War: 10752,
  Western: 37
}

const TMDB_TV_GENRES: Record<string, number> = {
  'Action & Adventure': 10759,
  Animation: 16,
  Comedy: 35,
  Crime: 80,
  Documentary: 99,
  Drama: 18,
  Family: 10751,
  Kids: 10762,
  Mystery: 9648,
  Reality: 10764,
  'Sci-Fi & Fantasy': 10765,
  'War & Politics': 10768,
  Western: 37
}

// 'list' is the user's own AniList list (a username instead of a ranking):
// new titles import with their AniList status, score and progress.
const ANILIST_SORTS: BulkSortCfg[] = [
  { key: 'popular', label: 'Most popular' },
  { key: 'rated', label: 'Top rated' },
  { key: 'trending', label: 'Trending' },
  { key: 'list', label: 'Your AniList list' }
]

export const ANIME_FORMATS: BulkSortCfg[] = [
  { key: 'tv', label: 'TV series' },
  { key: 'movie', label: 'Movies' },
  { key: 'ova', label: 'OVA and ONA' },
  { key: 'special', label: 'Specials' }
]

export const MANGA_FORMATS: BulkSortCfg[] = [
  { key: 'manga', label: 'Manga' },
  { key: 'novel', label: 'Light novels' },
  { key: 'one_shot', label: 'One-shots' }
]

export const ANILIST_COUNTRIES: BulkSortCfg[] = [
  { key: 'JP', label: 'Japan' },
  { key: 'KR', label: 'Korea' },
  { key: 'CN', label: 'China' },
  { key: 'TW', label: 'Taiwan' }
]

export const BULK_SOURCES: BulkSourceCfg[] = [
  {
    key: 'anime',
    label: 'Anime',
    sorts: ANILIST_SORTS,
    hasGenre: true,
    genres: ANILIST_GENRES,
    hasSeason: true,
    formats: ANIME_FORMATS,
    countries: ANILIST_COUNTRIES,
    maxCount: 2000
  },
  {
    key: 'manga',
    label: 'Manga',
    sorts: ANILIST_SORTS,
    hasGenre: true,
    genres: ANILIST_GENRES,
    hasSeason: false,
    formats: MANGA_FORMATS,
    countries: ANILIST_COUNTRIES,
    maxCount: 2000
  },
  {
    key: 'game',
    label: 'Games',
    sorts: [
      { key: 'popular', label: 'Most popular' },
      { key: 'metacritic', label: 'Top Metacritic' },
      { key: 'rating', label: 'Top user rating' },
      { key: 'newest', label: 'Newest' }
    ],
    hasGenre: true,
    genres: CATALOG_GENRES,
    hasSeason: false,
    maxCount: 10_000,
    offline: true
  },
  {
    key: 'visual_novel',
    label: 'Visual novels',
    sorts: [
      { key: 'rated', label: 'Top rated' },
      { key: 'voted', label: 'Most voted' }
    ],
    // VNDB "genres" are freeform tags — too rough for a clean filter. Year only.
    hasGenre: false,
    hasSeason: false,
    maxCount: 2000
  },
  {
    key: 'movie',
    label: 'Movies',
    sorts: [
      { key: 'popular', label: 'Most popular' },
      { key: 'rated', label: 'Top rated' }
    ],
    hasGenre: true,
    genreIds: TMDB_MOVIE_GENRES,
    hasSeason: false,
    maxCount: 2000
  },
  {
    key: 'tv',
    label: 'TV shows',
    sorts: [
      { key: 'popular', label: 'Most popular' },
      { key: 'rated', label: 'Top rated' }
    ],
    hasGenre: true,
    genreIds: TMDB_TV_GENRES,
    hasSeason: false,
    maxCount: 2000
  }
]

export function bulkSourceCfg(key: BulkSourceKey): BulkSourceCfg {
  const cfg = BULK_SOURCES.find((s) => s.key === key)
  if (!cfg) throw new Error(`Unknown bulk source: ${key}`)
  return cfg
}
