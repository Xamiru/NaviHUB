import type {
  CreditRole,
  JpQuizScope,
  ListKind,
  MediaListFilter,
  MediaType,
  QuizSongFilter
} from '@shared/types'

// Central registry of every React Query key in the app.
//
// TanStack Query matches invalidations by key PREFIX: invalidating qk.media.all
// (['media']) also refetches qk.media.detail(42) (['media', 'detail', 42]) and
// the home-page key (['media', { … }]). So each group's `all` key MUST remain a
// prefix of every specific key in that group — reshape them together or not at
// all.

// People / companies / characters share one key shape ([ns], [ns, 'get', id],
// [ns, 'list', …]). EntityListView picks the namespace at runtime, so the shared
// part is a factory keyed by the namespace string.
export type EntityNamespace = 'people' | 'companies' | 'characters'

const entity = (ns: EntityNamespace) => ({
  all: [ns] as const,
  get: (id: number) => [ns, 'get', id] as const,
  list: (search: string, role: CreditRole | null, mediaType: MediaType | MediaType[] | null) =>
    [ns, 'list', search, role, mediaType] as const
})

export const qk = {
  media: {
    all: ['media'] as const,
    list: (filter: MediaListFilter) => ['media', filter] as const,
    detail: (mediaId: number) => ['media', 'detail', mediaId] as const,
    home: (mediaType: MediaType) => ['media', { mediaType, home: true }] as const
  },
  mediaCounts: {
    all: ['media-counts'] as const,
    byType: (mediaType: MediaType) => ['media-counts', mediaType] as const
  },
  lists: {
    all: ['lists'] as const,
    index: (kind: ListKind | null) => ['lists', kind] as const,
    detail: (listId: number) => ['lists', 'detail', listId] as const,
    forEntity: (kind: ListKind, entityId: number) => ['lists', 'forEntity', kind, entityId] as const
  },
  entity,
  people: {
    ...entity('people'),
    credits: (personId: number) => ['people', 'credits', personId] as const
  },
  companies: {
    ...entity('companies'),
    media: (companyId: number) => ['companies', 'media', companyId] as const
  },
  characters: {
    ...entity('characters'),
    roles: (characterId: number) => ['characters', 'roles', characterId] as const
  },
  tags: {
    all: ['tags'] as const
  },
  settings: {
    all: ['settings'] as const
  },
  quiz: {
    songPool: (filter: QuizSongFilter) => ['quiz', 'songPool', filter] as const
  },
  manga: {
    // Local manga reader: attached chapters + page lists + mokuro OCR.
    all: ['manga'] as const,
    chapters: (mediaId: number) => ['manga', 'chapters', mediaId] as const,
    pages: (chapterId: number) => ['manga', 'pages', chapterId] as const,
    ocrStatus: (chapterId: number) => ['manga', 'ocrStatus', chapterId] as const,
    ocrPage: (chapterId: number, pageIndex: number) =>
      ['manga', 'ocrPage', chapterId, pageIndex] as const
  },
  japanese: {
    all: ['japanese'] as const,
    courses: ['japanese', 'courses'] as const,
    // Mining page: the flattened vocab-lesson list + ensured inbox target.
    mineTargets: ['japanese', 'mineTargets'] as const,
    course: (id: number) => ['japanese', 'course', id] as const,
    lesson: (id: number) => ['japanese', 'lesson', id] as const,
    stats: ['japanese', 'stats'] as const,
    quizPool: (scope: JpQuizScope) => ['japanese', 'quizPool', scope] as const,
    // Manga reader mining: tokenized OCR block text + already-mined word check.
    tokens: (text: string) => ['japanese', 'tokens', text] as const,
    minedFronts: (fronts: string[]) => ['japanese', 'minedFronts', fronts] as const
  },
  music: {
    // Local music library. Mutations (scan, like, playlist edits) invalidate
    // the `all` prefix; the polled statuses sit under it too but refetch on
    // their own intervals while something runs.
    all: ['music'] as const,
    artists: (search: string) => ['music', 'artists', search] as const,
    albums: (search: string) => ['music', 'albums', search] as const,
    artist: (id: number) => ['music', 'artist', id] as const,
    album: (id: number) => ['music', 'album', id] as const,
    tracks: (filter: { search?: string; likedOnly?: boolean }) =>
      ['music', 'tracks', filter] as const,
    search: (q: string) => ['music', 'search', q] as const,
    playlists: ['music', 'playlists'] as const,
    playlist: (id: number) => ['music', 'playlist', id] as const,
    playlistsForTrack: (trackId: number) => ['music', 'playlistsForTrack', trackId] as const,
    recent: ['music', 'recent'] as const,
    statsDetail: (days: number | null) => ['music', 'statsDetail', days] as const,
    statsDetailAll: ['music', 'statsDetail'] as const, // prefix, for invalidation
    stats: ['music', 'stats'] as const,
    scanStatus: ['music', 'scanStatus'] as const,
    downloadStatus: ['music', 'downloadStatus'] as const,
    artStatus: ['music', 'artStatus'] as const
  },
  activity: ['activity'] as const,
  search: (q: string) => ['search', q] as const,
  // External import-source search: the source key ('anilist', 'tmdb', …) is the
  // namespace itself, so these have no shared `all` prefix to invalidate.
  importSearch: (sourceKey: string, query: string) => [sourceKey, 'search', query] as const
}
