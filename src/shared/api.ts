// The typed surface exposed on window.api. Both preload (which implements the
// bridge) and the renderer (which consumes it) import this so they never drift.

import type {
  ChecklistCadence,
  ChecklistStatus,
  MediaItem,
  MediaType,
  MediaItemInput,
  MediaListFilter,
  MediaListFacets,
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
  ThemeSongCounts,
  ThemeSongEntry,
  ThemeSongFilter,
  ImageKind,
  MediaImage,
  JackettEnsureResult,
  TorrentAddInput,
  TorrentSearchStatus,
  TorrentServiceTestResult,
  WallpaperSearchPage,
  WallpaperSearchResult,
  QuizHistory,
  QuizKind,
  QuizSessionInput,
  QuizSong,
  QuizSongFilter,
  TournamentEntry,
  TournamentSource,
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
  EnDictEntry,
  EnWord,
  EnWordInput,
  ProgLessonProgress,
  DictInfo,
  DictEntry,
  DictImportStatus,
  DictImportSummary,
  SentenceExample,
  SentenceBankInfo,
  SentenceImportSummary,
  KanjiStrokes,
  StrokeSetInfo,
  StrokeImportSummary,
  KanjiInfo,
  JpLessonQuizPool,
  JpQuizItem,
  JpQuizScope,
  PrepDeckStatus,
  PrepDeckSummary,
  CoreDeckStatus,
  CoreDeckSummary,
  JpCoverageDetail,
  JpCoverageListRow,
  JpCoverageScanStatus,
  JpTextAnalysis,
  JpReviewOutcome,
  JpReviewQueue,
  JpLeech,
  JpRoadmap,
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
  UpdateStatus,
  UpdateTestResult,
  GachaBanner,
  GachaBannerInput,
  GachaBuildInput,
  GachaCurrency,
  GachaGameId,
  GachaGameOverview,
  GachaNewsFetchResult,
  GachaNewsPage,
  GachaCatalogImportResult,
  GachaBackupImportResult,
  GachaUnit,
  GachaUnitDetail,
  GachaUnitFilter,
  GachaUnitInput,
  GachaChatThread,
  GachaChatMessage,
  GachaCoachStatus,
  GachaCoachDueCounts,
  GachaGoal,
  GachaGoalInput,
  GachaCoachNote,
  GachaCoachDoc,
  MusicAlbumDetail,
  MusicAlbumSummary,
  MusicArtist,
  MusicArtistDetail,
  MusicArtResult,
  MusicArtStatus,
  MusicDeleteResult,
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
  MediaProgressLogged,
  SyncStatus,
  YtDlpDetectResult
} from './types'

export interface NaviApi {
  media: {
    list(filter: MediaListFilter): Promise<MediaItem[]>
    get(id: number): Promise<MediaDetail | null>
    create(input: MediaItemInput): Promise<number>
    update(id: number, input: Partial<MediaItemInput>): Promise<void>
    // "I watched/read another one": advances progress with status promotion,
    // and wraps a finished title into a fresh rewatch pass instead of running
    // past its total. Also credits today's checklist if an item covers this
    // media type. @shared/mediaProgress owns the rules.
    logProgress(id: number): Promise<MediaProgressLogged>
    remove(id: number): Promise<void>
    removeCharacter(mediaId: number, characterId: number): Promise<void>
    statusCounts(mediaType: string): Promise<Record<string, number>>
    facets(mediaType: string): Promise<MediaListFacets>
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
    // Normalized contender pool for tournament mode, resolved from one library
    // source. Returns the whole matching set; the renderer shuffles and caps.
    tournamentPool(source: TournamentSource): Promise<TournamentEntry[]>
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
  checklist: {
    // Daily/weekly recurring board (/checklist). The item catalog lives in
    // src/shared/checklist.ts; "today" and every period key are computed in
    // main from local dates, so no method takes a date.
    status(): Promise<ChecklistStatus>
    addTask(key: string, cadence: ChecklistCadence): Promise<number>
    removeTask(id: number): Promise<void>
    // null clears a per-board target override.
    setTarget(id: number, target: number | null): Promise<void>
    reorder(cadence: ChecklistCadence, orderedIds: number[]): Promise<void>
    // mediaLog items: logging performs the tracking write (episode +1 /
    // rewatch / mark watched) and records what to restore on undo.
    logMedia(
      taskKey: string,
      cadence: ChecklistCadence,
      mediaId: number
    ): Promise<MediaProgressLogged>
    undoLog(logId: number): Promise<void>
    tick(taskKey: string, cadence: ChecklistCadence): Promise<number>
    untick(taskKey: string, cadence: ChecklistCadence): Promise<void>
    // One manual credit toward a detected item — un-clamped, undoable, and the
    // reason nothing on the board can be impossible to finish.
    credit(taskKey: string, cadence: ChecklistCadence): Promise<number>
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
    // The Songs page (/anime/songs): every theme in the library, narrowed by
    // the SAME MediaListFilter the anime list page builds plus song-level
    // filters. Returns the whole matching set — the page queues it as-is.
    list(filter: ThemeSongFilter): Promise<ThemeSongEntry[]>
    // Unfiltered totals for the header ("N of M playable · K favorites").
    counts(): Promise<ThemeSongCounts>
    setFavorite(themeId: number, favorite: boolean): Promise<void>
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
  torrents: {
    // Progressive Jackett search (main-process — renderer CSP blocks remote
    // fetch): start a job that fans out per indexer, then poll searchStatus
    // with the number of results already held. cancelSearch keeps what's found.
    startSearch(query: string, categories: number[]): Promise<{ id: string }>
    searchStatus(offset: number): Promise<TorrentSearchStatus | null>
    cancelSearch(id: string): Promise<void>
    // Hand a result to qBittorrent (magnet preferred, Jackett link fallback).
    add(input: TorrentAddInput): Promise<void>
    // Settings "Save & test" probes — never reject, result renders inline.
    testJackett(): Promise<TorrentServiceTestResult>
    testQbittorrent(): Promise<TorrentServiceTestResult>
    // Probe Jackett and, if it's down and local, run its start command and
    // wait for it to bind. Never rejects.
    ensureJackett(): Promise<JackettEnsureResult>
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
    // End-of-lesson self-check: lesson cards + same-course distractors,
    // available before the lesson is marked learned.
    lessonQuizPool(lessonId: number): Promise<JpLessonQuizPool>
    // Series prep deck: frequency-scan an attached series' OCR/EPUB text and
    // write a "words you'll meet" course. Long-running; poll prepDeckStatus.
    buildPrepDeck(mediaId: number): Promise<PrepDeckSummary>
    prepDeckStatus(): Promise<PrepDeckStatus>
    // Core frequency deck: the next N most frequent words not yet in any deck,
    // sourced from an installed frequency dictionary. Poll coreDeckStatus.
    buildCoreDeck(limit: number): Promise<CoreDeckSummary>
    coreDeckStatus(): Promise<CoreDeckStatus>
    // Comprehension: scan a series' text once, then read the score any time —
    // known/learning splits are recomputed against jp_card on every read.
    scanCoverage(mediaId: number): Promise<JpCoverageDetail>
    coverageScanStatus(): Promise<JpCoverageScanStatus>
    coverage(mediaId: number): Promise<JpCoverageDetail | null>
    coverageList(): Promise<JpCoverageListRow[]>
    // Same tiering applied to arbitrary pasted text (one round trip: tokenize,
    // tier against jp_card, gloss the top unknowns).
    analyzeText(text: string): Promise<JpTextAnalysis>
    // The study path: stepped courses + unscheduled decks + "you are here".
    roadmap(): Promise<JpRoadmap>
    // Cards that keep lapsing (>= LEECH_LAPSES), and a full SRS reset for one.
    listLeeches(): Promise<JpLeech[]>
    resetCard(id: number): Promise<void>
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
    // Download + import a freely-hosted preset (JMdict / KANJIDIC / frequency).
    importPreset(
      key: 'jmdict-en' | 'kanjidic-en' | 'jpdb-freq' | 'bccwj-freq'
    ): Promise<DictImportSummary>
    // Native picker + import of any Yomitan .zip; null when cancelled.
    importZip(): Promise<DictImportSummary | null>
    // Live status of the running download/import (polled while it runs). Shared
    // by the dictionary, sentence-bank and stroke-set imports.
    importStatus(): Promise<DictImportStatus>
    remove(id: number): Promise<void>
    // Offline example sentences (Tatoeba pairs). [] when no bank is installed.
    sentences(term: string, limit?: number): Promise<SentenceExample[]>
    importSentences(): Promise<SentenceImportSummary>
    sentenceBank(): Promise<SentenceBankInfo | null>
    removeSentences(): Promise<void>
    // KanjiVG stroke order; null when the pack isn't installed or the character
    // isn't covered — every consumer degrades to "no diagram".
    strokes(char: string): Promise<KanjiStrokes | null>
    importStrokes(): Promise<StrokeImportSummary>
    strokeSet(): Promise<StrokeSetInfo | null>
    removeStrokes(): Promise<void>
  }
  // English→English dictionary (/english): dictionaryapi.dev lookups (main
  // process — renderer CSP blocks remote fetch) + a flat saved-word list.
  english: {
    // [] for an unknown word; throws on a real network/API failure.
    lookup(query: string): Promise<EnDictEntry[]>
    // Idempotent: re-saving an identical (word, meaning) returns the existing id.
    saveWord(input: EnWordInput): Promise<number>
    listWords(search?: string): Promise<EnWord[]>
    removeWord(id: number): Promise<void>
  }
  // Programming learn section (/programming). Content is code
  // (src/shared/programming/); only lesson completion crosses IPC, keyed by
  // the frozen '<courseKey>/<lessonKey>' strings.
  programming: {
    progress(): Promise<ProgLessonProgress[]>
    complete(lessonKey: string): Promise<void>
    uncomplete(lessonKey: string): Promise<void>
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
    // Destructive: also deletes the underlying files from disk (artist delete
    // removes the whole artist folder). Gated behind a confirm in the renderer.
    deleteTracks(trackIds: number[]): Promise<MusicDeleteResult>
    deleteAlbum(albumId: number): Promise<MusicDeleteResult>
    deleteArtist(artistId: number): Promise<MusicDeleteResult>
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
    // ---- catalog import (config-gated by GachaGameCfg.catalog) ----
    // importCatalog seeds every servant/CE as an owned=0 row with art (runs in
    // withActivity — the image batch drives the activity pill). importChaldea
    // opens a native picker for the app's userdata.json and marks ownership;
    // returns null when the picker is canceled.
    importCatalog(game: GachaGameId): Promise<GachaCatalogImportResult>
    importChaldea(game: GachaGameId): Promise<GachaBackupImportResult | null>
    // ---- FGO coach (config-gated by GachaGameCfg.coach) ----
    // The coach chats + acts via tools. LLM calls happen ONLY on coachSend /
    // importCoachDoc (both user actions); everything else is local reads/writes.
    coachStatus(): Promise<GachaCoachStatus | null>
    coachSend(
      game: GachaGameId,
      text: string,
      attachments: string[]
    ): Promise<{ turnId: number; threadId: number }>
    coachCancel(): Promise<void>
    coachThread(game: GachaGameId): Promise<GachaChatThread>
    coachThreads(game: GachaGameId): Promise<GachaChatThread[]>
    coachNewThread(game: GachaGameId): Promise<GachaChatThread>
    coachMessages(threadId: number): Promise<GachaChatMessage[]>
    // Screenshot paste → saved into userData/media, returns the rel path.
    saveAttachment(bytes: Uint8Array, ext: string): Promise<string>
    // goals & recurring tasks (reminders — no LLM call)
    goals(game: GachaGameId): Promise<GachaGoal[]>
    createGoal(game: GachaGameId, input: GachaGoalInput): Promise<number>
    updateGoal(id: number, patch: Partial<GachaGoalInput>): Promise<void>
    completeGoal(id: number): Promise<void>
    dropGoal(id: number): Promise<void>
    dueCounts(): Promise<GachaCoachDueCounts>
    // coach memory notes
    coachNotes(game: GachaGameId): Promise<GachaCoachNote[]>
    removeCoachNote(id: number): Promise<void>
    // imported prior chats
    coachDocs(game: GachaGameId): Promise<GachaCoachDoc[]>
    importCoachDoc(game: GachaGameId, input: { title: string; content: string }): Promise<number>
    removeCoachDoc(id: number): Promise<void>
  }
  sync: {
    // LAN sync server for the Android companion app (src/main/sync.ts). Online
    // is button-only: it listens ONLY between start() and stop(), and pairing
    // mode (start(true)) shows a 6-digit code that the phone must echo back.
    // Poll status() with refetchInterval while running, like music downloads.
    start(pairing?: boolean): Promise<SyncStatus>
    stop(): Promise<SyncStatus>
    status(): Promise<SyncStatus>
    // Forgets the paired phone (clears its token); re-pair to sync again.
    unpair(): Promise<SyncStatus>
  }
  app: {
    // Opens an http(s) URL in the system browser (gacha news links). Never
    // navigates the app window; non-http(s) URLs are rejected in main.
    openExternal(url: string): Promise<void>
    // Native picker for a .txt/.md file (importing a prior LLM chat).
    pickTextFile(): Promise<{ name: string; content: string } | null>
    // Applies the UI scale (Electron zoom factor) to every window immediately
    // and returns the clamped value. Persist it separately as 'ui.scale' —
    // that's what gets re-applied on the next launch.
    setUiScale(scale: number): Promise<number>
  }
  activity: {
    // The current long-running main-process task (imports, theme fetches);
    // poll while one runs to drive progress UI. active:false when idle.
    status(): Promise<ActivityStatus>
  }
  updates: {
    // In-app updates from GitHub Releases (src/main/updater.ts). Online work is
    // button-only — nothing checks automatically. The mutations all resolve the
    // fresh status (like the sync trio) and the renderer polls status() with
    // refetchInterval while a check/download runs, like music downloads.
    status(): Promise<UpdateStatus>
    check(): Promise<UpdateStatus>
    download(): Promise<UpdateStatus>
    cancel(): Promise<UpdateStatus>
    // Quits and relaunches into the downloaded update — resolves only on failure.
    install(): Promise<void>
    // Verifies the saved github.token against the Releases API. Resolves a
    // result (never rejects) so the Settings card renders it inline.
    testToken(): Promise<UpdateTestResult>
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
