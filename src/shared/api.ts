// The typed surface exposed on window.api. Both preload (which implements the
// bridge) and the renderer (which consumes it) import this so they never drift.

import type {
  MediaItem,
  MediaType,
  MediaItemInput,
  MediaListFilter,
  MediaDetail,
  LibraryTimeStats,
  Person,
  PersonCredit,
  Company,
  Character,
  Tag,
  TagWithCounts,
  SettingsMap,
  CastEntry,
  CharacterAppearance,
  CreditRole,
  GlobalSearchResults,
  ImportSearchResult,
  ImportSummary,
  ThemeImportSummary,
  ImageKind,
  MediaImage,
  WallpaperSearchPage,
  WallpaperSearchResult,
  QuizHistory,
  QuizKind,
  QuizSessionInput,
  QuizSong,
  QuizSongFilter,
  HltbTimes,
  ListDetail,
  ListInput,
  ListKind,
  ListSummary,
  JpCardInput,
  JpCourseDetail,
  JpCourseInput,
  JpCourseSummary,
  JpLessonDetail,
  JpLessonInput,
  JpMiningInbox,
  DictInfo,
  DictEntry,
  DictImportStatus,
  DictImportSummary,
  KanjiInfo,
  JpQuizItem,
  JpQuizScope,
  JpReviewOutcome,
  JpReviewQueue,
  JpStats,
  JpStatsDetail,
  SrsGrade,
  MangaAttachResult,
  MangaLibrary,
  MangaPages,
  ChapterOcrStatus,
  MokuroPageOcr,
  JpToken,
  ActivityStatus,
  GachaBanner,
  GachaBannerInput,
  GachaBuildInput,
  GachaCurrency,
  GachaGameId,
  GachaGameOverview,
  GachaNewsFetchResult,
  GachaNewsPage,
  GachaUnit,
  GachaUnitDetail,
  GachaUnitFilter,
  GachaUnitInput,
  MusicAlbumDetail,
  MusicAlbumSummary,
  MusicArtist,
  MusicArtistDetail,
  MusicArtResult,
  MusicArtStatus,
  MusicDownloadEvent,
  MusicDownloadInput,
  MusicLibraryStats,
  MusicPlaylistDetail,
  MusicPlaylistSummary,
  MusicScanStatus,
  MusicScanSummary,
  MusicSearchResults,
  MusicStatsDetail,
  MusicTrack,
  YtDlpDetectResult
} from './types'

export interface NaviApi {
  media: {
    list(filter: MediaListFilter): Promise<MediaItem[]>
    get(id: number): Promise<MediaDetail | null>
    create(input: MediaItemInput): Promise<number>
    update(id: number, input: Partial<MediaItemInput>): Promise<void>
    remove(id: number): Promise<void>
    removeCharacter(mediaId: number, characterId: number): Promise<void>
    statusCounts(mediaType: string): Promise<Record<string, number>>
    timeStats(): Promise<LibraryTimeStats>
  }
  people: {
    // role filters the browse list to people with that kind of credit (and
    // sorts by how many they have); mediaType further scopes it to one media
    // type (so movie Directors don't include anime directors). Omit both for
    // the pickers (any person).
    list(search?: string, role?: CreditRole, mediaType?: MediaType | MediaType[]): Promise<Person[]>
    get(id: number): Promise<Person | null>
    credits(id: number): Promise<PersonCredit[]>
    upsert(input: Partial<Person> & { name: string }): Promise<number>
    remove(id: number): Promise<void>
  }
  companies: {
    list(search?: string, mediaType?: MediaType | MediaType[]): Promise<Company[]>
    get(id: number): Promise<Company | null>
    media(id: number): Promise<MediaItem[]>
    upsert(input: Partial<Company> & { name: string }): Promise<number>
    remove(id: number): Promise<void>
  }
  characters: {
    list(search?: string): Promise<Character[]>
    get(id: number): Promise<Character | null>
    cast(id: number): Promise<CastEntry[]>
    roles(id: number): Promise<CharacterAppearance[]>
    upsert(input: Partial<Character> & { name: string }): Promise<number>
    remove(id: number): Promise<void>
  }
  credits: {
    add(input: {
      mediaId: number
      personId: number
      characterId?: number | null
      role: CreditRole
      language?: string | null
    }): Promise<number>
    remove(creditId: number): Promise<void>
  }
  mediaCompanies: {
    add(input: { mediaId: number; companyId: number; role: string }): Promise<number>
    remove(id: number): Promise<void>
  }
  tags: {
    list(): Promise<Tag[]>
    get(id: number): Promise<Tag | null>
    // Browse pages: all tags with per-type usage counts, and everything
    // (cross-type) carrying one tag.
    listWithCounts(): Promise<TagWithCounts[]>
    media(id: number): Promise<MediaItem[]>
    upsert(input: { name: string; category?: string | null }): Promise<number>
    remove(id: number): Promise<void>
  }
  search: {
    global(query: string): Promise<GlobalSearchResults>
  }
  quiz: {
    // The pool of playable anime theme songs for the song quiz, narrowed by the
    // given filter (OP/ED, list statuses). Game logic runs in the renderer.
    songPool(filter: QuizSongFilter): Promise<QuizSong[]>
    // Finished-round history: pages log a session at game end; setup screens
    // show the personal best + recent rounds.
    logSession(input: QuizSessionInput): Promise<number>
    history(kind: QuizKind): Promise<QuizHistory>
  }
  hltb: {
    // Looks the item's title up on HowLongToBeat and stores the main / extra /
    // completionist times under metadata.hltb. Null when no match was found
    // (games imported via RAWG get this automatically at import time).
    fetch(mediaId: number): Promise<HltbTimes | null>
  }
  lists: {
    // Curated, ordered, type-scoped collections. `kind` filters the index.
    list(kind?: ListKind | null): Promise<ListSummary[]>
    get(id: number): Promise<ListDetail | null>
    create(input: ListInput): Promise<number>
    update(
      id: number,
      input: { title?: string; description?: string | null; ranked?: boolean }
    ): Promise<void>
    remove(id: number): Promise<void>
    addItem(listId: number, entityId: number, note?: string | null): Promise<number>
    removeItem(itemId: number): Promise<void>
    removeItemByEntity(listId: number, entityId: number): Promise<void>
    updateItem(itemId: number, patch: { note?: string | null }): Promise<void>
    reorder(listId: number, orderedItemIds: number[]): Promise<void>
    forEntity(
      kind: ListKind,
      entityId: number
    ): Promise<{ id: number; title: string; contains: boolean }[]>
  }
  anilist: {
    search(query: string): Promise<ImportSearchResult[]>
    import(anilistId: number): Promise<ImportSummary>
  }
  anilistManga: {
    search(query: string): Promise<ImportSearchResult[]>
    import(anilistId: number): Promise<ImportSummary>
  }
  tmdb: {
    search(query: string): Promise<ImportSearchResult[]>
    import(tmdbId: number): Promise<ImportSummary>
  }
  tmdbTv: {
    search(query: string): Promise<ImportSearchResult[]>
    import(tmdbId: number): Promise<ImportSummary>
  }
  vndb: {
    search(query: string): Promise<ImportSearchResult[]>
    import(vndbId: number): Promise<ImportSummary>
  }
  rawg: {
    search(query: string): Promise<ImportSearchResult[]>
    import(rawgId: number): Promise<ImportSummary>
  }
  themes: {
    // Fetch an anime's OP/ED songs (+ audio + artists) from AnimeThemes.
    import(mediaId: number): Promise<ThemeImportSummary>
  }
  pictures: {
    // Wallpapers + fan art per media item; files live under pictures.dir.
    list(mediaId: number, kind: ImageKind): Promise<MediaImage[]>
    // Browse-dialog searches (main-process — renderer CSP blocks remote fetch).
    searchWallhaven(query: string, page: number): Promise<WallpaperSearchPage>
    searchTmdb(mediaId: number): Promise<WallpaperSearchPage>
    // Download a picked search result / pasted URL into pictures.dir + record it.
    addFromSearch(mediaId: number, kind: ImageKind, result: WallpaperSearchResult): Promise<MediaImage>
    addFromUrl(mediaId: number, kind: ImageKind, url: string): Promise<MediaImage>
    // Native multi-select picker; copies into pictures.dir. [] when cancelled.
    addFromFiles(mediaId: number, kind: ImageKind): Promise<MediaImage[]>
    // Removes the row and deletes its file on disk.
    remove(imageId: number): Promise<void>
  }
  japanese: {
    // Standalone Japanese-learning section: courses → lessons → cards, with a
    // built-in SRS (src/shared/srs.ts). Only cards from lessons marked learned
    // surface in reviewQueue and quizPool.
    listCourses(): Promise<JpCourseSummary[]>
    getCourse(id: number): Promise<JpCourseDetail | null>
    createCourse(input: JpCourseInput): Promise<number>
    updateCourse(id: number, input: Partial<JpCourseInput>): Promise<void>
    removeCourse(id: number): Promise<void>
    getLesson(id: number): Promise<JpLessonDetail | null>
    createLesson(input: JpLessonInput): Promise<number>
    updateLesson(id: number, patch: { title?: string; body?: string | null }): Promise<void>
    removeLesson(id: number): Promise<void>
    setLessonLearned(id: number, learned: boolean): Promise<void>
    createCard(lessonId: number, input: JpCardInput): Promise<number>
    updateCard(id: number, patch: Partial<JpCardInput>): Promise<void>
    removeCard(id: number): Promise<void>
    reviewQueue(newLimit: number): Promise<JpReviewQueue>
    submitReview(cardId: number, grade: SrsGrade): Promise<JpReviewOutcome>
    quizPool(scope: JpQuizScope): Promise<JpQuizItem[]>
    stats(): Promise<JpStats>
    // Review history (heatmap/streaks/grades) + due forecast for the stats page.
    statsDetail(): Promise<JpStatsDetail>
    // Vocab mining: find-or-create the capture course/lesson.
    ensureMiningInbox(): Promise<JpMiningInbox>
    // Morphological analysis (kuromoji) of an OCR'd text block; [] on failure
    // so callers fall back to manual selection.
    tokenize(text: string): Promise<JpToken[]>
    // Which of the given card fronts already exist anywhere in jp_card — the
    // reader marks them as already-mined.
    minedFronts(fronts: string[]): Promise<string[]>
  }
  // Offline Yomitan dictionaries (see src/main/dict/). Lookups run offline first
  // and fall back to jisho.org; every result is a DictEntry. Nothing throws.
  dict: {
    list(): Promise<DictInfo[]>
    lookup(query: string): Promise<DictEntry[]>
    kanji(text: string): Promise<KanjiInfo[]>
    // Download + import a freely-hosted preset (JMdict / KANJIDIC).
    importPreset(key: 'jmdict-en' | 'kanjidic-en'): Promise<DictImportSummary>
    // Native picker + import of any Yomitan .zip; null when cancelled.
    importZip(): Promise<DictImportSummary | null>
    // Live status of the running download/import (polled while it runs).
    importStatus(): Promise<DictImportStatus>
    remove(id: number): Promise<void>
  }
  manga: {
    // Local manga reader: chapters are page-image folders under the manga
    // library root (settings key manga.dir), attached to a manga media_item.
    attachFolder(mediaId: number): Promise<MangaAttachResult>
    rescan(mediaId: number): Promise<MangaAttachResult>
    detach(mediaId: number): Promise<void>
    chapters(mediaId: number): Promise<MangaLibrary>
    pages(chapterId: number): Promise<MangaPages | null>
    markProgress(chapterId: number, page: number): Promise<void>
    markChapterRead(chapterId: number, read: boolean): Promise<void>
    // Mokuro OCR sidecars (null / hasOcr:false when the user hasn't run mokuro).
    ocrStatus(chapterId: number): Promise<ChapterOcrStatus>
    ocrPage(chapterId: number, pageIndex: number): Promise<MokuroPageOcr | null>
  }
  music: {
    // Standalone local-music library (<root>/<Artist>/<Album>/<tracks>).
    // Scanning: pickRoot opens a folder dialog (null when cancelled), scan
    // rescans the stored root; both are long-running — poll scanStatus while
    // the promise is pending.
    pickRoot(): Promise<MusicScanSummary | null>
    scan(): Promise<MusicScanSummary>
    scanStatus(): Promise<MusicScanStatus>
    // browse
    artists(search?: string): Promise<MusicArtist[]>
    albums(search?: string): Promise<MusicAlbumSummary[]>
    artist(id: number): Promise<MusicArtistDetail | null>
    album(id: number): Promise<MusicAlbumDetail | null>
    tracks(filter: { search?: string; likedOnly?: boolean }): Promise<MusicTrack[]>
    artistTracks(artistId: number): Promise<MusicTrack[]>
    search(query: string): Promise<MusicSearchResults>
    stats(): Promise<MusicLibraryStats>
    // playlists
    playlists(): Promise<MusicPlaylistSummary[]>
    playlist(id: number): Promise<MusicPlaylistDetail | null>
    createPlaylist(input: { title: string; description?: string | null }): Promise<number>
    updatePlaylist(
      id: number,
      patch: { title?: string; description?: string | null }
    ): Promise<void>
    removePlaylist(id: number): Promise<void>
    addPlaylistTracks(playlistId: number, trackIds: number[]): Promise<void>
    removePlaylistTrack(itemId: number): Promise<void>
    removePlaylistTrackByTrack(playlistId: number, trackId: number): Promise<void>
    reorderPlaylist(playlistId: number, orderedItemIds: number[]): Promise<void>
    playlistsForTrack(
      trackId: number
    ): Promise<{ id: number; title: string; contains: boolean }[]>
    // liked + play history
    setLiked(trackId: number, liked: boolean): Promise<void>
    logPlay(trackId: number): Promise<void>
    recent(limit?: number): Promise<MusicTrack[]>
    // The /music/stats payload: tiles/charts/top lists for the last N local
    // days, or all time (null). One invoke per period selection.
    statsDetail(days: number | null): Promise<MusicStatsDetail>
    // yt-dlp downloads (one at a time; poll downloadStatus for progress)
    downloadStart(input: MusicDownloadInput): Promise<{ id: string }>
    downloadCancel(id: string): Promise<void>
    downloadStatus(): Promise<MusicDownloadEvent | null>
    downloadDetect(): Promise<YtDlpDetectResult>
    // online art fallback (Deezer/iTunes, no API keys)
    artFetchAlbum(albumId: number): Promise<MusicArtResult>
    artFetchArtist(artistId: number): Promise<MusicArtResult>
    artClearAlbum(albumId: number): Promise<void>
    artClearArtist(artistId: number): Promise<void>
    artFetchMissing(): Promise<MusicArtStatus>
    artCancel(): Promise<void>
    artStatus(): Promise<MusicArtStatus>
  }
  gacha: {
    // Standalone gacha tracker; the game list and per-game kinds/currencies
    // live in src/shared/gacha.ts. Online work happens ONLY via the fetch*
    // methods (button-triggered) — everything else is local CRUD.
    overview(): Promise<GachaGameOverview[]>
    units(game: GachaGameId, filter?: GachaUnitFilter): Promise<GachaUnit[]>
    unit(id: number): Promise<GachaUnitDetail | null>
    createUnit(input: GachaUnitInput): Promise<number>
    updateUnit(id: number, patch: Partial<GachaUnitInput>): Promise<void>
    removeUnit(id: number): Promise<void>
    createBuild(unitId: number, input: GachaBuildInput): Promise<number>
    updateBuild(id: number, patch: Partial<GachaBuildInput>): Promise<void>
    removeBuild(id: number): Promise<void>
    currencies(game: GachaGameId): Promise<GachaCurrency[]>
    setCurrency(game: GachaGameId, key: string, amount: number): Promise<void>
    banners(game: GachaGameId): Promise<GachaBanner[]>
    createBanner(input: GachaBannerInput): Promise<number>
    updateBanner(id: number, patch: Partial<GachaBannerInput>): Promise<void>
    removeBanner(id: number): Promise<void>
    // news() reads the local cache; fetchNews() pulls the game's subreddit
    // hot feed (the button — never automatic) and replaces the cached feed.
    news(game: GachaGameId): Promise<GachaNewsPage>
    fetchNews(game: GachaGameId): Promise<GachaNewsFetchResult>
    // Downloads a pasted portrait/banner URL into userData/media (the renderer
    // CSP blocks remote fetch; content-addressed like media covers).
    downloadImage(url: string): Promise<string | null>
    // Hero art for a game's hub card + dashboard header; null clears it.
    setGameImage(game: GachaGameId, relPath: string | null): Promise<void>
  }
  app: {
    // Opens an http(s) URL in the system browser (gacha news links). Never
    // navigates the app window; non-http(s) URLs are rejected in main.
    openExternal(url: string): Promise<void>
  }
  activity: {
    // The current long-running main-process task (imports, theme fetches);
    // poll while one runs to drive progress UI. active:false when idle.
    status(): Promise<ActivityStatus>
  }
  settings: {
    all(): Promise<SettingsMap>
    get(key: string): Promise<string | null>
    set(key: string, value: string): Promise<void>
  }
  files: {
    // Opens a native picker, copies the chosen image into userData/media,
    // returns the stored relative path (or null if cancelled).
    pickImage(): Promise<string | null>
    // Resolves a stored relative path to a file:// URL the renderer can show.
    resolveUrl(relPath: string | null): Promise<string | null>
  }
}
