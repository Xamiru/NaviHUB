// Shared types — the contract between the main process (DB) and the renderer (UI).
// Kept framework-free so both sides can import it.

export type MediaType = 'anime' | 'manga' | 'visual_novel' | 'game' | 'movie' | 'tv'

export type CompanyType = 'studio' | 'publisher' | 'developer' | 'other'

export type CreditRole =
  | 'voice_actor'
  | 'actor'
  | 'director'
  | 'writer'
  | 'composer'
  | 'mangaka'
  | 'artist'
  | 'staff'

export type MediaCompanyRole =
  | 'animation_studio'
  | 'production_studio'
  | 'producer'
  | 'publisher'
  | 'developer'
  | 'other'

// ---- Core records (mirror the DB rows) ----

export interface MediaItem {
  id: number
  mediaType: MediaType
  title: string
  titleOriginal: string | null
  synopsis: string | null
  coverPath: string | null
  releaseDate: string | null
  totalUnits: number | null
  // personal tracking
  status: string | null
  score: number | null
  progress: number
  // Times consumed (watched/read/played) — the universal counter across types.
  rewatchCount: number
  notes: string | null
  favorite: boolean
  // extensibility / future import
  metadata: Record<string, unknown> | null
  externalSource: string | null
  externalId: string | null
  createdAt: string
  updatedAt: string
}

export interface Person {
  id: number
  name: string
  nameNative: string | null
  photoPath: string | null
  bio: string | null
  birthday: string | null
  externalSource: string | null
  externalId: string | null
}

export interface Company {
  id: number
  name: string
  nameNative: string | null
  type: CompanyType
  logoPath: string | null
  externalSource: string | null
  externalId: string | null
}

export interface Character {
  id: number
  name: string
  nameNative: string | null
  imagePath: string | null
  description: string | null
}

export interface Tag {
  id: number
  name: string
  category: string | null
}

// ---- Input payloads ----

export interface MediaItemInput {
  mediaType: MediaType
  title: string
  titleOriginal?: string | null
  synopsis?: string | null
  coverPath?: string | null
  releaseDate?: string | null
  totalUnits?: number | null
  status?: string | null
  score?: number | null
  progress?: number
  rewatchCount?: number
  notes?: string | null
  favorite?: boolean
  metadata?: Record<string, unknown> | null
  tagIds?: number[]
}

export interface MediaListFilter {
  mediaType: MediaType
  status?: string | null
  search?: string | null
  sort?: 'title' | 'score' | 'updated' | 'release'
  sortDir?: 'asc' | 'desc'
  tagId?: number | null
  favorite?: boolean | null
}

// Grouped results for the global search bar.
export interface GlobalSearchResults {
  media: MediaItem[]
  people: Person[]
  companies: Company[]
  characters: Character[]
}

// ---- Lists (user-curated collections) ----

// A list is type-scoped: it holds one kind of entity. 'company' == studios.
export type ListKind = 'media' | 'person' | 'character' | 'company'

export interface List {
  id: number
  title: string
  description: string | null
  kind: ListKind
  ranked: boolean
  createdAt: string
  updatedAt: string
}

// A resolved list entry: the list_item joined with the entity it points to,
// normalized so any kind renders the same way.
export interface ListEntry {
  itemId: number // list_item.id
  sortOrder: number
  note: string | null
  entityId: number
  name: string // media title or entity name
  subtitle: string | null // media type label / native name / company type
  imagePath: string | null
  mediaType: MediaType | null // set only when kind === 'media', for the route
}

export interface ListSummary extends List {
  itemCount: number
  previewImages: (string | null)[] // a few cover/photo paths for the index card
}

export interface ListDetail extends List {
  items: ListEntry[]
}

export interface ListInput {
  title: string
  description?: string | null
  kind: ListKind // required on create; immutable afterwards
  ranked?: boolean
}

// ---- Composite view models ----

export interface CastEntry {
  creditId: number
  person: Person
  character: Character | null
  role: CreditRole
  language: string | null
}

export interface MediaCompanyLink {
  id: number // the media_company row id (used to remove the link)
  role: MediaCompanyRole
  company: Company
}

// A character in a work, with all voice actors who played them (young/adult,
// different languages…). One entry per character, in the source's order.
export interface MediaCharacterEntry {
  character: Character
  voices: { creditId: number; person: Person; language: string | null }[]
}

// An anime opening/ending song with its performers. audioPath is a locally
// stored copy (preferred for playback); audioUrl is the remote .ogg fallback.
export interface ThemeSong {
  id: number
  slug: string | null // "OP1", "ED2"
  type: string | null // "OP" | "ED"
  sequence: number | null
  title: string | null
  audioUrl: string | null
  audioPath: string | null
  artists: Person[]
}

// A related title on the detail page: another season, or the manga/novel a title
// was adapted from. `media` is set when the related work is in the library (so
// the card links to it); otherwise only the AniList title/type is known and it's
// shown greyed out as a hint of what to import next.
export interface MediaRelation {
  relationType: string // 'PREQUEL' | 'SEQUEL' | 'SIDE_STORY' | 'SOURCE' | …
  media: MediaItem | null // the local item, or null if not imported yet
  title: string // display title (local title if imported, else AniList title)
  mediaType: MediaType | null // the related work's type ('anime' | 'manga' | …)
}

export interface MediaDetail extends MediaItem {
  tags: Tag[]
  companies: MediaCompanyLink[]
  cast: CastEntry[] // still used for staff (non voice-actor credits)
  characters: MediaCharacterEntry[] // the character-centric cast list
  themes: ThemeSong[] // anime OP/ED songs (empty for other types)
  relations: MediaRelation[] // seasons + manga/novel source (empty for others)
}

// Result of importing an anime's theme songs from AnimeThemes.moe.
export interface ThemeImportSummary {
  mediaId: number
  songs: number
  artists: number
  audioDownloaded: number
}

// One playable song in the song quiz pool: a theme flattened with the anime it
// belongs to. Only themes with audio (local or remote) are returned.
export interface QuizSong {
  themeId: number
  slug: string | null // "OP1", "ED2"
  type: string | null // "OP" | "ED"
  title: string | null
  audioUrl: string | null
  audioPath: string | null
  mediaId: number
  animeTitle: string
  coverPath: string | null
  status: string | null
  artists: string[] // performer names, shown on the reveal card
}

// Narrows the song quiz pool. Omit a field (or pass null) to leave it unfiltered.
export interface QuizSongFilter {
  songType?: 'OP' | 'ED' | null // null/omit = both OP and ED
  statuses?: string[] | null // null/empty = any anime status
}

// HowLongToBeat play-time estimates for a game or VN, stored (all in minutes)
// under metadata.hltb by the HLTB lookup. `name` is the matched HLTB entry's
// title — shown when it differs from ours so a bad match is easy to spot.
export interface HltbTimes {
  id: number
  name: string
  main: number | null
  mainExtra: number | null
  completionist: number | null
  allStyles: number | null
  mainCount?: number
  mainExtraCount?: number
  completionistCount?: number
  allStylesCount?: number
}

// One row of a voice actor's filmography (powers the VA -> anime page)
export interface PersonCredit {
  creditId: number
  media: MediaItem
  character: Character | null
  role: CreditRole
  language: string | null
}

// A character's appearance in one work, with everyone who voiced them there
// (a character can have multiple VAs in the same show, e.g. young/adult).
export interface CharacterAppearance {
  media: MediaItem
  voices: { creditId: number; person: Person; language: string | null }[]
}

export type SettingsMap = Record<string, string>

// ---- External import (AniList for anime, TMDB for movies) ----
// One result shape covers both sources. For movies, `native` is the original
// title, `format` is e.g. "Movie", and `episodes` is left null.
export interface ImportSearchResult {
  id: number
  title: string
  native: string | null
  year: number | null
  format: string | null
  episodes: number | null
  coverUrl: string | null
}

export interface ImportSummary {
  mediaId: number
  title: string
  studios: number
  cast: number
  staff: number
  created: boolean
}

// Back-compat aliases (the AniList client predates the generic names).
export type AniListSearchResult = ImportSearchResult
export type AniListImportSummary = ImportSummary

// ---- Japanese learning ----
// Standalone section: courses → lessons → cards. A lesson is 'grammar'
// (body = explanation text, cards = example sentences), 'vocab' (cards =
// vocabulary entries) or 'kanji' (cards = characters with on/kun readings).
// Cards carry their SRS scheduling state (src/shared/srs.ts); only cards from
// lessons marked learned surface in reviews and quizzes.

export type JpLessonKind = 'grammar' | 'vocab' | 'kanji'

export type SrsGrade = 'again' | 'hard' | 'good' | 'easy'

export type SrsStatus = 'new' | 'learning' | 'review'

export interface JpCourse {
  id: number
  title: string
  description: string | null
  level: string | null // display label, e.g. "N5", "N4–N3"
  difficulty: number | null // recommended study-order step (1 = start here)
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface JpCourseSummary extends JpCourse {
  lessonCount: number
  learnedLessonCount: number
  cardCount: number
}

export interface JpLesson {
  id: number
  courseId: number
  kind: JpLessonKind
  title: string
  body: string | null
  sortOrder: number
  learned: boolean
  learnedAt: string | null
}

export interface JpLessonSummary extends JpLesson {
  cardCount: number
}

export interface JpCourseDetail extends JpCourse {
  lessons: JpLessonSummary[]
}

export interface JpCard {
  id: number
  lessonId: number
  sortOrder: number
  front: string // vocab: term (kanji/kana) · grammar: JP sentence · kanji: character
  reading: string | null // kana reading of `front` (kanji: primary reading)
  back: string // vocab: meaning · grammar: translation · kanji: meaning
  pos: string | null // part of speech (vocab only)
  notes: string | null
  exampleJp: string | null // kanji cards use example_* for an example word
  exampleReading: string | null
  exampleEn: string | null
  onyomi: string | null // kanji cards: on'yomi, comma-separated
  kunyomi: string | null // kanji cards: kun'yomi, comma-separated
  sourceMediaId: number | null // mined cards: the manga/VN it came from
  // Resolved from source_media_id at read time (LEFT JOIN; null if the media
  // item was deleted). Read-only — never part of JpCardInput.
  sourceTitle: string | null
  sourceMediaType: MediaType | null
  sourceCoverPath: string | null
  // SRS state (read-only outside submitReview)
  status: SrsStatus
  learningStep: number
  dueAt: string | null
  intervalDays: number
  ease: number
  reps: number
  lapses: number
  lastReviewedAt: string | null
}

export interface JpLessonDetail extends JpLesson {
  courseTitle: string
  cards: JpCard[]
}

export interface JpCourseInput {
  title: string
  description?: string | null
  level?: string | null
  difficulty?: number | null
}

export interface JpCardInput {
  front: string
  reading?: string | null
  back: string
  pos?: string | null
  notes?: string | null
  exampleJp?: string | null
  exampleReading?: string | null
  exampleEn?: string | null
  onyomi?: string | null
  kunyomi?: string | null
  sourceMediaId?: number | null
}

export interface JpLessonInput {
  courseId: number
  kind: JpLessonKind // required on create; immutable afterwards
  title: string
  body?: string | null
  cards?: JpCardInput[] // inserted with the lesson in one transaction
}

// A review session's queue: cards already in rotation that are due, plus up to
// `newLimit` not-yet-introduced cards (both from learned lessons only).
export interface JpReviewQueue {
  due: JpCard[]
  fresh: JpCard[]
}

// What submitReview reports back — enough for the UI to show the outcome.
export interface JpReviewOutcome {
  cardId: number
  status: SrsStatus
  intervalDays: number
  dueAt: string
}

// Narrows the multiple-choice quiz pool. Omit/null = unfiltered.
export interface JpQuizScope {
  courseId?: number | null
  kind?: JpLessonKind | null
}

// One quizzable item: a card flattened with its lesson context.
export interface JpQuizItem extends JpCard {
  lessonKind: JpLessonKind
  lessonTitle: string
}

export interface JpStats {
  dueCount: number
  newAvailableCount: number
  learnedLessons: number
  totalLessons: number
  totalCards: number
  reviewsToday: number
}

// One dictionary hit from jisho.org, mapped for the mining page.
export interface JishoResult {
  slug: string
  word: string // japanese[0].word, falling back to the kana reading
  reading: string | null
  meanings: string // first senses' english_definitions, joined
  pos: string | null
  isCommon: boolean
  jlpt: string | null // e.g. 'jlpt-n5'
}

// The auto-created capture target for mined words (course "Mining inbox" →
// vocab lesson "Mined words", created learned so cards enter SRS immediately).
export interface JpMiningInbox {
  courseId: number
  lessonId: number
}

// ---- Offline Japanese dictionaries (Yomitan format) ----
// Imported Yomitan dictionary zips (JMdict, KANJIDIC, pitch accent, DOJG, …)
// live in a separate userData/dictionaries.db. Lookups run offline first and
// fall back to jisho.org, but every result — offline or online — is mapped into
// the DictEntry shape below so the three surfaces (dictionary page, mining
// autofill, manga-reader panel) consume one type.

// A Yomitan structured-content node tree: a plain string, an array of nodes, or
// an HTML-ish element object. Kept loose because dictionaries nest arbitrarily.
export type StructuredNode =
  | string
  | StructuredNode[]
  | {
      tag: string
      content?: StructuredNode
      style?: Record<string, unknown>
      href?: string
      lang?: string
      // Other Yomitan attributes (data, colSpan, …) are ignored by our renderer.
      [k: string]: unknown
    }

// One glossary item as stored in a term bank: a bare string, a structured tree,
// a tagged text node, or an image (images are not rendered).
export type GlossaryItem =
  | string
  | { type: 'structured-content'; content: StructuredNode }
  | { type: 'text'; text: string }
  | { type: 'image'; [k: string]: unknown }

// A single dictionary's definition of one term.
export interface DictDef {
  dictId: number
  dictTitle: string
  tags: string[] // resolved definition tags (e.g. "noun", "usually kana")
  glossary: GlossaryItem[]
}

// Pitch-accent info for a reading (downstep position; 0 = heiban/no drop).
export interface PitchInfo {
  reading: string
  position: number
  devoice?: number[]
  nasal?: number[]
}

// One merged dictionary entry: a headword + reading with every dictionary's
// definitions grouped under it, plus pitch and common/JLPT tags.
export interface DictEntry {
  expression: string
  reading: string // '' when identical to the expression
  defs: DictDef[]
  pitches: PitchInfo[]
  tags: string[] // term-level tags (common markers, JLPT, …)
  isCommon: boolean
  matchedForm: string // the candidate that actually hit (deinflection transparency)
  source: 'offline' | 'jisho'
}

// A kanji's readings and meanings from a KANJIDIC-style dictionary.
export interface KanjiInfo {
  character: string
  onyomi: string[]
  kunyomi: string[]
  meanings: string[]
  stats: Record<string, string> // grade, strokes, jlpt, freq, …
  dictTitle: string
}

// A row in the installed-dictionaries registry (Settings list).
export interface DictInfo {
  id: number
  title: string
  revision: string | null
  format: number | null
  priority: number
  termCount: number
  kanjiCount: number
  importedAt: string
}

// Live status of a dictionary download/import, polled by the renderer while an
// import runs (module-level state in the importer, like the music scan).
export interface DictImportStatus {
  running: boolean
  phase: 'idle' | 'downloading' | 'reading' | 'terms' | 'kanji' | 'pitch' | 'tags' | 'finalizing'
  done: number // downloading: bytes; other phases: rows written in the phase
  total: number // downloading: content-length (0 if unknown); else rows in phase
  dictTitle: string | null // known once index.json is read
  error: string | null
}

// Outcome of a completed import.
export interface DictImportSummary {
  title: string
  termCount: number
  kanjiCount: number
  pitchCount: number
}

// ---- Local manga reader ----
// Chapters are folders of page images under the manga library root (settings
// key manga.dir), attached to a manga media_item and scanned into manga_chapter
// rows. Pages are listed from disk at read-time.

export interface MangaChapter {
  id: number
  mediaId: number
  dirPath: string // relative to the manga root, e.g. "Berserk/Ch 001"
  title: string
  number: number | null
  pageCount: number
  sortOrder: number
  lastReadPage: number | null // 0-based; null = never opened
  readAt: string | null // non-null = completed
}

export interface MangaLibrary {
  localDir: string | null // attached series folder (relative to root); null = not attached
  chapters: MangaChapter[]
}

export interface MangaPage {
  relPath: string // "manga/<dirPath>/<file>"
  url: string // navimg:// URL, usable directly as <img src>
}

export interface MangaPages {
  chapterId: number
  mediaId: number
  title: string
  number: number | null
  pages: MangaPage[]
}

export interface MangaAttachResult {
  ok: boolean
  error?: string
  chapterCount?: number
}

// Scanner output for one discovered chapter (dirPath relative to the SERIES
// folder, '' = the series folder itself holds the pages).
export interface ScannedChapter {
  dirPath: string
  title: string
  number: number | null
  pageCount: number
}

// ---- Mokuro OCR sidecars ----
// The user runs mokuro (github.com/kha-white/mokuro) on raw manga; the reader
// picks up its output and overlays tappable text boxes on the page.

export interface MokuroBlock {
  box: [number, number, number, number] // xmin, ymin, xmax, ymax in source-image px
  vertical: boolean
  fontSize: number | null
  lines: string[]
}

export interface MokuroPageOcr {
  imgWidth: number
  imgHeight: number
  blocks: MokuroBlock[]
}

export interface ChapterOcrStatus {
  hasOcr: boolean
  matchedPages: number
  totalPages: number
}

// One token from morphological analysis (kuromoji) of an OCR'd text block.
export interface JpToken {
  surface: string
  base: string // dictionary form (食べた → 食べる); falls back to surface
  reading: string | null // hiragana
  pos: string // top-level POS: 名詞 / 動詞 / 助詞 / …
  wordLike: boolean // false for particles, aux verbs, punctuation
}

// ---- Music library ----
// Standalone local-music section: <music root>/<Artist>/<Album>/<tracks> on
// disk, scanned into music_* tables. Completely separate from media_item /
// person (anime OP/EDs stay in theme_song).

export interface MusicArtist {
  id: number
  name: string
  coverPath: string | null
  albumCount: number
  trackCount: number
}

export interface MusicAlbumSummary {
  id: number
  artistId: number
  artistName: string
  title: string
  year: number | null
  coverPath: string | null
  trackCount: number
}

export interface MusicTrack {
  id: number
  albumId: number
  albumTitle: string
  artistId: number
  artistName: string
  // Raw artist tag when it differs from the folder artist (feat./compilations);
  // display-only, the folder artist stays authoritative.
  tagArtist: string | null
  filePath: string // relative to the music root ("Artist/Album/01 Song.mp3")
  title: string
  trackNo: number | null
  discNo: number | null
  duration: number | null // seconds
  likedAt: string | null
  playCount: number
  lastPlayedAt: string | null
  coverPath: string | null // the album's cover
}

export interface MusicArtistDetail {
  id: number
  name: string
  coverPath: string | null
  trackCount: number
  albums: MusicAlbumSummary[]
  topTracks: MusicTrack[] // by play count; empty until something is played
}

export interface MusicAlbumDetail {
  id: number
  artistId: number
  artistName: string
  title: string
  year: number | null
  coverPath: string | null
  tracks: MusicTrack[]
}

export interface MusicPlaylistSummary {
  id: number
  title: string
  description: string | null
  trackCount: number
  previewCovers: (string | null)[] // first 4 album covers, playlist order
  updatedAt: string
}

export interface MusicPlaylistEntry {
  itemId: number
  position: number
  track: MusicTrack
}

export interface MusicPlaylistDetail {
  id: number
  title: string
  description: string | null
  createdAt: string
  updatedAt: string
  items: MusicPlaylistEntry[]
}

export interface MusicSearchResults {
  artists: MusicArtist[]
  albums: MusicAlbumSummary[]
  tracks: MusicTrack[]
}

export interface MusicLibraryStats {
  artists: number
  albums: number
  tracks: number
  totalDuration: number // seconds
}

// Scanner progress, polled by the renderer while a scan runs.
export interface MusicScanStatus {
  running: boolean
  phase: 'idle' | 'walking' | 'tags' | 'writing'
  done: number // files tag-parsed so far
  total: number // files needing tag parsing (mtime-unchanged ones are skipped)
  error: string | null
}

export interface MusicScanSummary {
  artists: number
  albums: number
  tracks: number
  added: number
  removed: number
  skippedRootFiles: number // audio directly in the root (not Artist/Album) is ignored
  durationMs: number
}

// ---- Music downloads (yt-dlp) ----

export interface MusicDownloadInput {
  url: string
  artist: string
  album: string
  format: 'opus' | 'm4a' | 'mp3'
}

// Live status of the (single) active or last-finished download; polled.
export interface MusicDownloadEvent {
  id: string
  status: 'starting' | 'downloading' | 'processing' | 'done' | 'error' | 'cancelled'
  percent: number | null
  itemIndex: number | null // "item 3 of 12" for playlist/album URLs
  itemCount: number | null
  title: string | null // current file being downloaded
  message: string | null // error text / phase note
}

export interface YtDlpDetectResult {
  ok: boolean
  version: string | null
  versionOld: boolean // yt-dlp releases are dates; >~90 days = extractor rot risk
  ffmpeg: boolean
  error: string | null
}

// ---- Music online art fallback ----

export interface MusicArtResult {
  updated: boolean
  path: string | null
  sourceUrl: string | null
  reason: 'ok' | 'not_found' | 'low_confidence' | 'download_failed' | null
}

export interface MusicArtStatus {
  running: boolean
  done: number
  total: number
  updated: number
}

// ---- Global activity (import progress) ----
// One slot for the current long-running main-process task (imports, theme
// fetches). Polled by the renderer (Topbar pill + ImportDialog bar).
export interface ActivityStatus {
  active: boolean
  label: string // e.g. "Importing from AniList"
  phase: 'fetching' | 'images' | 'audio' | 'writing'
  done: number // progress within the phase (images/audio only)
  total: number
}

// ---- Music stats page ----
// One aggregated payload for /music/stats. Period stats (days != null) come
// from music_play_log (recording starts when the log ships); all-time falls
// back to the play_count counters so the page works before the log has data.

export interface MusicStatsTopTrack {
  track: MusicTrack
  plays: number // period: log count; all-time: play_count
}

export interface MusicStatsTopArtist {
  id: number
  name: string
  coverPath: string | null
  plays: number
  seconds: number // approximate listening time
}

export interface MusicStatsTopAlbum {
  id: number
  artistId: number
  artistName: string
  title: string
  year: number | null
  coverPath: string | null
  plays: number
}

export interface MusicStatsDetail {
  days: number | null // echo of the request; null = all time
  logStartedAt: string | null // MIN(music_play_log.played_at) UTC; null = log empty
  tiles: {
    plays: number
    seconds: number // approximate listening time (duration snapshots)
    distinctTracks: number
    distinctArtists: number
  }
  streak: { current: number; longest: number } // whole-log, period-independent
  playsPerDay: { day: string; plays: number; seconds: number }[] // local YYYY-MM-DD, asc, sparse
  playsByHour: { hour: number; plays: number }[] // 0-23 local, sparse
  playsByWeekday: { weekday: number; plays: number }[] // 0=Sun … 6=Sat, sparse
  topTracks: MusicStatsTopTrack[]
  topArtists: MusicStatsTopArtist[]
  topAlbums: MusicStatsTopAlbum[]
  // artists whose first-ever logged play falls inside the window ([] all-time)
  newArtists: { id: number; name: string; coverPath: string | null; firstPlayedAt: string }[]
  library: {
    artists: number
    albums: number
    tracks: number
    totalSeconds: number
    avgTrackSeconds: number | null
    likedTracks: number
    likedSeconds: number
    decades: { decade: number; albums: number; tracks: number }[]
    deepestArtists: { id: number; name: string; coverPath: string | null; tracks: number }[]
  }
}

// ---- Library time stats (the /stats page) ----
// All time values are MINUTES, normalized across types (see mediaRepo.timeStats).

export interface TimeStatsItem {
  id: number
  mediaType: MediaType
  title: string
  coverPath: string | null
  minutes: number
  // Raw tracking fields so the renderer can format a per-type detail line
  // ("24 ep × 2 watches", "180 ch", "132 h played") with mediaConfig knowledge.
  progress: number
  totalUnits: number | null
  rewatchCount: number
}

export interface TimeStatsByType {
  mediaType: MediaType
  minutes: number
  estimated: boolean // anime/tv/manga (and completed-but-unlogged game/vn fallbacks)
  itemCount: number
  topItems: TimeStatsItem[] // top 5 by minutes desc
}

export interface LibraryTimeStats {
  totalMinutes: number
  consumedCount: number // items that actually contributed (progress/rewatch/completed)
  libraryCount: number // all media_item rows across the six types
  byType: TimeStatsByType[] // all six types, zeros included; renderer filters
  longest: TimeStatsItem | null // single biggest time sink overall
  mostRevisited: (TimeStatsItem & { times: number }) | null // max rewatch_count, null if < 2
}
