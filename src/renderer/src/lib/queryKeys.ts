import type {
  WrestlingEventFilter,
  CreditRole,
  GachaGameId,
  GachaUnitFilter,
  ImageKind,
  JpFeedRequest,
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
    timeStats: ['media', 'timeStats'] as const,
    // Same rationale — logging an episode should refresh the roadmap milestones.
    jpMilestones: ['media', 'jpMilestones'] as const,
    resumePoints: ['media', 'resumePoints'] as const,
    activityHeatmap: ['media', 'activityHeatmap'] as const,
    // Under ['media'] on purpose: ticking an episode logs media progress, so the
    // detail page's own invalidation has to reach the season grid too.
    tvSeasons: (mediaId: number) => ['media', 'tvSeasons', mediaId] as const
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
    history: (kind: QuizKind) => ['quiz', 'history', kind] as const,
    // A longer window of the same history (under the history(kind) prefix so
    // one invalidation refreshes both).
    historyAll: (kind: QuizKind) => ['quiz', 'history', kind, 'all'] as const
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
  franchise: {
    // Curated franchise pages: the art cache map + its download poll. The
    // canon itself is bundled data (@shared/franchises) — no query needed.
    all: ['franchise'] as const,
    artMap: (id: string) => ['franchise', 'artMap', id] as const,
    heroMap: ['franchise', 'heroMap'] as const,
    artStatus: ['franchise', 'artStatus'] as const
  },
  pictures: {
    // Wallpapers + fan art per media item, plus the Browse dialog's searches.
    all: ['pictures'] as const,
    list: (mediaId: number, kind: ImageKind) => ['pictures', 'list', mediaId, kind] as const,
    // Prefix of list() — invalidates BOTH kinds for one item, which the
    // background/slideshow toggles need (flagging a wallpaper clears a marker
    // that may be sitting on a fan-art tile).
    lists: (mediaId: number) => ['pictures', 'list', mediaId] as const,
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
    // A .cbz/.epub opened from outside the library ("open with"), keyed by its
    // session token rather than a chapter id.
    adhocPages: (token: string) => ['manga', 'adhocPages', token] as const,
    ocrStatus: (chapterId: number) => ['manga', 'ocrStatus', chapterId] as const,
    ocrPage: (chapterId: number, pageIndex: number) =>
      ['manga', 'ocrPage', chapterId, pageIndex] as const,
    // The in-app mokuro run poll + per-chapter sidecar presence. Both live
    // under the ['manga'] prefix on purpose: MangaChaptersSection's refresh()
    // invalidates qk.manga.all, which kicks these too.
    ocrRunStatus: ['manga', 'ocrRunStatus'] as const,
    ocrOverview: (mediaId: number) => ['manga', 'ocrOverview', mediaId] as const
  },
  video: {
    // Local video player: attached episodes, the playback contract, and parsed
    // subtitle cues. Progress/watched writes invalidate the `all` prefix —
    // watched state is denormalized into both the episode list and the source.
    all: ['video'] as const,
    library: (mediaId: number) => ['video', 'library', mediaId] as const,
    source: (kind: string, ref: string) => ['video', 'source', kind, ref] as const,
    scanStatus: ['video', 'scanStatus'] as const,
    prepareStatus: ['video', 'prepareStatus'] as const,
    cacheStats: ['video', 'cacheStats'] as const,
    // One subtitle track's parsed cues, keyed by its navimg URL (immutable).
    cues: (url: string) => ['video', 'cues', url] as const
  },
  japanese: {
    all: ['japanese'] as const,
    // "You may be confusing X with Y" (stats page) — under the ['japanese']
    // prefix so reviews/card edits invalidate it.
    confusables: ['japanese', 'confusables'] as const,
    // The i+1 sentence feed; main caches by knowledge fingerprint, the page
    // pins staleTime so mining mid-session never triggers a rebuild.
    feed: (req: JpFeedRequest) => ['japanese', 'feed', req] as const,
    courses: ['japanese', 'courses'] as const,
    // The JLPT ladder on the roadmap. Under the ['japanese'] prefix so a review
    // session's invalidation moves the level bars too.
    jlptLadder: ['japanese', 'jlptLadder'] as const,
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
  english: {
    // English dictionary (/english). Saving/removing a word invalidates the
    // `all` prefix; lookups are keyed by query like qk.dict.lookup.
    all: ['english'] as const,
    lookup: (query: string) => ['english', 'lookup', query] as const,
    words: (search: string) => ['english', 'words', search] as const,
    // Installed offline dictionary (WordNet). Import/remove invalidate the
    // `all` prefix, which also drops cached lookups (results changed source).
    dictInfo: ['english', 'dictInfo'] as const,
    // Installed frequency pack (powers the vocab/spelling band sources).
    freqInfo: ['english', 'freqInfo'] as const,
    // SRS deck (/english/review): queue + the hub/review header stats.
    reviewQueue: ['english', 'reviewQueue'] as const,
    srsStats: ['english', 'srsStats'] as const,
    // Writing practice history (/english/writing).
    writings: ['english', 'writings'] as const,
    // Graded corrections tallied by category — drives the mechanics weighting.
    errorTally: ['english', 'errorTally'] as const,
    deck: ['english', 'deck'] as const,
    leeches: ['english', 'leeches'] as const
  },
  programming: {
    // Programming learn section (/programming): lesson completion only — the
    // course/cheatsheet content is code, never fetched.
    all: ['programming'] as const,
    progress: ['programming', 'progress'] as const,
    attempts: ['programming', 'attempts'] as const,
    cliMisses: ['programming', 'cliMisses'] as const,
    solves: ['programming', 'solves'] as const,
    sqlExpected: (key: string) => ['programming', 'sqlExpected', key] as const
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
    strokeSet: ['dict', 'strokeSet'] as const,
    // KRADFILE components. kanjiByComponents callers pass a SORTED copy of the
    // parts array or every toggle-order permutation caches separately.
    kradSet: ['dict', 'kradSet'] as const,
    kradComponents: ['dict', 'kradComponents'] as const,
    kanjiByComponents: (parts: string[]) => ['dict', 'kanjiByComponents', parts] as const,
    // Grammar library (hanabira N5-N1 points).
    grammarBank: ['dict', 'grammarBank'] as const,
    grammarList: ['dict', 'grammarList'] as const,
    grammarPoint: (id: number) => ['dict', 'grammarPoint', id] as const,
    // Audio packs.
    sentenceAudioBank: ['dict', 'sentenceAudioBank'] as const,
    pairSet: ['dict', 'pairSet'] as const,
    minimalPairs: ['dict', 'minimalPairs'] as const,
    // Visually-similar kanji chips (kradfile × KANJIDIC, computed on demand).
    similar: (char: string) => ['dict', 'similar', char] as const,
    imeCandidates: (kana: string) => ['dict', 'imeCandidates', kana] as const
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
  wrestling: {
    // Wiki + personal layer. Ratings/favorites are denormalized into every
    // row-returning query, so mutations invalidate the `all` prefix — the
    // music/gacha posture.
    all: ['wrestling'] as const,
    overview: ['wrestling', 'overview'] as const,
    events: (filter: WrestlingEventFilter) => ['wrestling', 'events', filter] as const,
    event: (id: number) => ['wrestling', 'event', id] as const,
    match: (id: number) => ['wrestling', 'match', id] as const,
    chronology: (id: number) => ['wrestling', 'chronology', id] as const,
    yearCounts: (promotion: string) => ['wrestling', 'yearCounts', promotion] as const,
    allYears: ['wrestling', 'allYears'] as const,
    wrestler: (id: number) => ['wrestling', 'wrestler', id] as const,
    wrestlerMatches: (id: number) => ['wrestling', 'wrestlerMatches', id] as const,
    searchWrestlers: (q: string) => ['wrestling', 'searchWrestlers', q] as const,
    topRated: (limit: number) => ['wrestling', 'topRated', limit] as const,
    // Callers pass a SORTED title list or every ordering caches separately.
    links: (titles: string[]) => ['wrestling', 'links', titles] as const,
    files: (eventId: number) => ['wrestling', 'files', eventId] as const,
    loose: ['wrestling', 'loose'] as const,
    recent: ['wrestling', 'recent'] as const,
    importStatus: ['wrestling', 'importStatus'] as const
  },
  update: {
    // In-app updater (Settings → Tools). Status polls while checking/downloading.
    all: ['update'] as const,
    status: ['update', 'status'] as const
  },
  games: {
    // Game/VN launcher + playtime tracking. sessionStatus polls while a
    // tracked session runs (useGameSession).
    all: ['games'] as const,
    sessionStatus: ['games', 'sessionStatus'] as const,
    overview: (mediaId: number) => ['games', 'overview', mediaId] as const,
    installed: ['games', 'installed'] as const
  },
  achievements: {
    // Steam-emulator + RetroAchievements tracking. `watch` polls only while a
    // game session is running (useAchievementWatch).
    all: ['achievements'] as const,
    list: (mediaId: number) => ['achievements', 'list', mediaId] as const,
    watch: ['achievements', 'watch'] as const,
    overview: ['achievements', 'overview'] as const,
    recent: (limit: number) => ['achievements', 'recent', limit] as const,
    cardSummaries: ['achievements', 'cardSummaries'] as const,
    resolveSteam: (mediaId: number) => ['achievements', 'resolveSteam', mediaId] as const,
    raConsoles: ['achievements', 'raConsoles'] as const,
    raSearch: (query: string, consoleId: string) =>
      ['achievements', 'raSearch', query, consoleId] as const
  },
  gamesCatalog: {
    // The offline RAWG catalog's install state (ImportDialog's catalog pill).
    all: ['gamesCatalog'] as const,
    status: ['gamesCatalog', 'status'] as const
  },
  bulk: {
    // The /bulk page's run status poll. Previews are deliberately NOT a query
    // (a plain await in the button handler — an enabled query would refire the
    // whole multi-page crawl on remount), so no preview key exists.
    all: ['bulk'] as const,
    status: ['bulk', 'status'] as const
  },
  activity: ['activity'] as const,
  tasks: {
    // The main-process task registry (one row per long-running job). Mounted
    // app-wide by the Topbar pill, so this poll never gates to false — it drops
    // to a lazy heartbeat instead, because it is the DISCOVERY surface: a job
    // started from the native menu, or from a dialog that forgot to kick(),
    // must still appear.
    all: ['tasks'] as const,
    list: ['tasks', 'list'] as const
  },
  logs: {
    // Cursor-paged log tail. The cursor is deliberately NOT part of the key: it
    // lives in a ref and the queryFn appends to component state (the
    // useTorrentSearch idiom). Keying by cursor would mint a fresh cache entry
    // every second and grow the cache without bound.
    all: ['logs'] as const,
    tail: ['logs', 'tail'] as const
  },
  search: (q: string) => ['search', q] as const,
  // External import-source search: the source key ('anilist', 'tmdb', …) is the
  // namespace itself, so these have no shared `all` prefix to invalidate.
  importSearch: (sourceKey: string, query: string) => [sourceKey, 'search', query] as const
}
