import type {
  CreditRole,
  GachaGameId,
  GachaUnitFilter,
  ImageKind,
  JpQuizScope,
  ListKind,
  MediaListFilter,
  MediaType,
  QuizKind,
  QuizSongFilter,
  ThemeSongFilter
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
    home: (mediaType: MediaType) => ['media', { mediaType, home: true }] as const,
    // Under the ['media'] prefix on purpose: every media mutation invalidates it.
    timeStats: ['media', 'timeStats'] as const
  },
  mediaCounts: {
    all: ['media-counts'] as const,
    byType: (mediaType: MediaType) => ['media-counts', mediaType] as const,
    facets: (mediaType: MediaType) => ['media-counts', 'facets', mediaType] as const
  },
  lists: {
    all: ['lists'] as const,
    index: (kind: ListKind | null) => ['lists', kind] as const,
    detail: (listId: number) => ['lists', 'detail', listId] as const,
    forEntity: (kind: ListKind, entityId: number) => ['lists', 'forEntity', kind, entityId] as const
  },
  checklist: {
    all: ['checklist'] as const,
    status: ['checklist', 'status'] as const
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
    all: ['tags'] as const,
    withCounts: ['tags', 'withCounts'] as const,
    get: (id: number) => ['tags', 'get', id] as const,
    media: (id: number) => ['tags', 'media', id] as const
  },
  settings: {
    all: ['settings'] as const
  },
  quiz: {
    all: ['quiz'] as const,
    songPool: (filter: QuizSongFilter) => ['quiz', 'songPool', filter] as const,
    history: (kind: QuizKind) => ['quiz', 'history', kind] as const
  },
  themes: {
    // Anime OP/ED library (/anime/songs). Hearting a song invalidates the `all`
    // prefix: `favorite` is denormalized into every row-returning query here and
    // into the anime detail page's theme rows.
    all: ['themes'] as const,
    list: (filter: ThemeSongFilter) => ['themes', 'list', filter] as const,
    counts: ['themes', 'counts'] as const
  },
  torrents: {
    // Jackett searches only — results are ephemeral, nothing invalidates this
    // group. `status` is the poll key while a fan-out job is running.
    all: ['torrents'] as const,
    status: (jobId: string) => ['torrents', 'status', jobId] as const
  },
  pictures: {
    // Wallpapers + fan art per media item, plus the Browse dialog's searches.
    all: ['pictures'] as const,
    list: (mediaId: number, kind: ImageKind) => ['pictures', 'list', mediaId, kind] as const,
    wallhaven: (q: string, page: number) => ['pictures', 'wallhaven', q, page] as const,
    tmdb: (mediaId: number) => ['pictures', 'tmdb', mediaId] as const
  },
  manga: {
    // Local manga reader: attached chapters + page lists + mokuro OCR.
    all: ['manga'] as const,
    chapters: (mediaId: number) => ['manga', 'chapters', mediaId] as const,
    pages: (chapterId: number) => ['manga', 'pages', chapterId] as const,
    // One EPUB spine document's raw XHTML (fetched from navimg://, immutable).
    bookDoc: (chapterId: number, page: number) => ['manga', 'bookDoc', chapterId, page] as const,
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
    roadmap: ['japanese', 'roadmap'] as const,
    leeches: ['japanese', 'leeches'] as const,
    stats: ['japanese', 'stats'] as const,
    statsDetail: ['japanese', 'statsDetail'] as const,
    quizPool: (scope: JpQuizScope) => ['japanese', 'quizPool', scope] as const,
    lessonQuizPool: (lessonId: number) => ['japanese', 'lessonQuizPool', lessonId] as const,
    prepDeckStatus: ['japanese', 'prepDeckStatus'] as const,
    coreDeckStatus: ['japanese', 'coreDeckStatus'] as const,
    // Comprehension. No key for analyzeText: its argument is up to 200KB of
    // pasted text and must never become a cache key — it runs as a plain await.
    coverage: (mediaId: number) => ['japanese', 'coverage', mediaId] as const,
    coverageList: ['japanese', 'coverageList'] as const,
    coverageScanStatus: ['japanese', 'coverageScanStatus'] as const,
    // Manga reader mining: tokenized OCR block text + already-mined word check.
    tokens: (text: string) => ['japanese', 'tokens', text] as const,
    minedFronts: (fronts: string[]) => ['japanese', 'minedFronts', fronts] as const
  },
  dict: {
    // Offline dictionaries. Import/delete invalidate the `all` prefix, which also
    // drops cached lookups (definitions changed).
    all: ['dict'] as const,
    list: ['dict', 'list'] as const,
    lookup: (query: string) => ['dict', 'lookup', query] as const,
    kanji: (text: string) => ['dict', 'kanji', text] as const,
    importStatus: ['dict', 'importStatus'] as const,
    // Example sentences + stroke order live under `dict` on purpose: installing
    // or removing a pack invalidates the prefix and drops their caches too.
    sentences: (term: string) => ['dict', 'sentences', term] as const,
    sentenceBank: ['dict', 'sentenceBank'] as const,
    strokes: (char: string) => ['dict', 'strokes', char] as const,
    strokeSet: ['dict', 'strokeSet'] as const
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
  gacha: {
    // Gacha tracker. Mutations invalidate the `all` prefix (broad on purpose,
    // music precedent — roster/currency/banner state is cheap to refetch).
    all: ['gacha'] as const,
    overview: ['gacha', 'overview'] as const,
    units: (game: GachaGameId, filter: GachaUnitFilter) =>
      ['gacha', 'units', game, filter] as const,
    unit: (id: number) => ['gacha', 'unit', id] as const,
    currencies: (game: GachaGameId) => ['gacha', 'currencies', game] as const,
    banners: (game: GachaGameId) => ['gacha', 'banners', game] as const,
    news: (game: GachaGameId) => ['gacha', 'news', game] as const,
    // FGO coach — chat, reminders, memory. coachStatus polls on its own interval.
    coachStatus: ['gacha', 'coachStatus'] as const,
    coachThread: (game: GachaGameId) => ['gacha', 'coachThread', game] as const,
    coachThreads: (game: GachaGameId) => ['gacha', 'coachThreads', game] as const,
    coachMessages: (threadId: number) => ['gacha', 'coachMessages', threadId] as const,
    goals: (game: GachaGameId) => ['gacha', 'goals', game] as const,
    coachNotes: (game: GachaGameId) => ['gacha', 'coachNotes', game] as const,
    coachDocs: (game: GachaGameId) => ['gacha', 'coachDocs', game] as const,
    dueCounts: ['gacha', 'dueCounts'] as const
  },
  sync: {
    // PC↔phone sync server (Settings card). Status polls while running.
    all: ['sync'] as const,
    status: ['sync', 'status'] as const
  },
  update: {
    // In-app updater (Settings → Tools). Status polls while checking/downloading.
    all: ['update'] as const,
    status: ['update', 'status'] as const
  },
  activity: ['activity'] as const,
  search: (q: string) => ['search', q] as const,
  // External import-source search: the source key ('anilist', 'tmdb', …) is the
  // namespace itself, so these have no shared `all` prefix to invalidate.
  importSearch: (sourceKey: string, query: string) => [sourceKey, 'search', query] as const
}
