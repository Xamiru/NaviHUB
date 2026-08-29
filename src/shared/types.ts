// Shared types — the contract between the main process (DB) and the renderer (UI).
// Kept framework-free so both sides can import it.

export type MediaType = 'anime' | 'manga' | 'visual_novel' | 'game' | 'movie' | 'tv' | 'book'

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
  // Wide hero art for the detail page (AniList bannerImage / TMDB backdrop).
  // NULL on every row imported before 2026-08 until it is re-imported.
  bannerPath: string | null
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
  gender: string | null
  imagePath: string | null
  description: string | null
}

export interface Tag {
  id: number
  name: string
  category: string | null
}

// Tag with per-media-type usage counts, for the /tags browse page.
export interface TagWithCounts extends Tag {
  counts: { mediaType: MediaType; count: number }[]
  total: number
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

export type MediaSort =
  | 'title'
  | 'score'
  | 'communityScore'
  | 'updated'
  | 'added'
  | 'release'
  | 'progress'
  | 'units'
  | 'timesConsumed'
  | 'random'

// Airing seasons, lowercase — mirrors the Season union in @shared/season.ts
// (types.ts stays leaf-level, so the string is re-declared instead of imported).
export type SeasonKey = 'winter' | 'spring' | 'summer' | 'fall'

// Every field is optional and null/empty means "unconstrained" — the renderer
// omits a filter by clearing it, and the repo skips any clause it doesn't see.
// Numeric bounds are inclusive. `status`/`tagId` are the legacy single-value
// forms, still honored so HomePage-style callers don't have to change.
export interface MediaListFilter {
  mediaType: MediaType
  status?: string | null
  statuses?: string[] | null
  search?: string | null
  sort?: MediaSort
  sortDir?: 'asc' | 'desc'
  tagId?: number | null
  tagIds?: number[] | null
  // 'any' = has at least one of the tags (default), 'all' = has every one.
  tagMode?: 'any' | 'all'
  favorite?: boolean | null
  // No personal score yet. Mutually exclusive with scoreMin/scoreMax.
  unrated?: boolean | null
  scoreMin?: number | null
  scoreMax?: number | null
  // Normalized 0-100 external rating (AniList / Metacritic / VNDB / IMDb×10).
  communityMin?: number | null
  communityMax?: number | null
  yearMin?: number | null
  yearMax?: number | null
  // total_units — episodes / chapters / runtime minutes / hours, per media type.
  unitsMin?: number | null
  unitsMax?: number | null
  seasons?: SeasonKey[] | null
  // sort:'random' only — seeds the shuffle so it stays stable across refetches.
  seed?: number | null
}

// Data-derived bounds for the list page's range sliders, so each media type
// gets sliders that span its own library rather than hardcoded guesses.
export interface MediaListFacets {
  yearMin: number | null
  yearMax: number | null
  unitsMax: number | null
  total: number
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
// Wrestling entities are list-able too: "Top 25 matches ever" is the canonical
// wrestling-fan artifact, and ranked lists already exist — rebuilding them
// inside the section would be pure duplication.
export type ListKind =
  | 'media'
  | 'person'
  | 'character'
  | 'company'
  | 'wrestlingEvent'
  | 'wrestlingMatch'
  | 'wrestlingWrestler'

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

// ---- Tier lists (TierMaker-style boards) ----

// A tier list scopes one ListKind onto labeled color rows plus an unranked
// pool. Same kind system as List; rows live in tier_row, placements in
// tier_item (row_id NULL = pool).
export interface TierList {
  id: number
  title: string
  description: string | null
  kind: ListKind
  createdAt: string
  updatedAt: string
}

export interface TierRowData {
  id: number
  label: string
  color: string // '#rrggbb'
}

// A resolved tile: tier_item joined with its entity, normalized like ListEntry.
export interface TierEntry {
  itemId: number // tier_item.id
  entityId: number
  name: string
  subtitle: string | null
  imagePath: string | null
  mediaType: MediaType | null // kind === 'media' only, for the route
}

export interface TierRowGroup {
  row: TierRowData
  items: TierEntry[]
}

export interface TierBoard extends TierList {
  rows: TierRowGroup[]
  pool: TierEntry[]
}

export interface TierListSummary extends TierList {
  itemCount: number // includes pool items
  previewImages: (string | null)[] // ranked items first, then the pool
}

export interface TierListInput {
  title: string
  description?: string | null
  kind: ListKind // required on create; immutable afterwards. New boards seed S–F.
}

export interface TierRowInput {
  label: string
  color: string
}

// One container's ordering for persistBoard: a row id, or null for the pool,
// with its item ids in display order. The whole board is written in one
// transaction per drag.
export interface TierPlacement {
  rowId: number | null
  itemIds: number[]
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
  favorite: boolean // hearted on the Songs page / detail row
  artists: Person[]
}

// ---- Theme song library (/anime/songs) ----
// One song flattened with the anime it belongs to, for the cross-library Songs
// page. Shaped like QuizSong (the quiz's own pool) plus the personal favorite
// flag and the artist ids the rows link to.
export interface ThemeSongEntry {
  themeId: number
  slug: string | null
  type: string | null // "OP" | "ED"
  title: string | null
  audioUrl: string | null
  audioPath: string | null
  favorite: boolean
  mediaId: number
  animeTitle: string
  coverPath: string | null
  status: string | null
  artists: { id: number; name: string }[]
}

// The Songs page's filter. `media` is the SAME MediaListFilter the anime list
// page builds (statuses, tags, ranges, sort, seed…) so both pages narrow the
// library identically — the song-level fields below are layered on top of it.
export interface ThemeSongFilter {
  media: MediaListFilter // mediaType is always 'anime'
  search?: string | null // song title, artist or anime title
  songType?: 'OP' | 'ED' | null // null/omit = both
  favoriteOnly?: boolean | null // hearted songs only
  // Songs with no audio at all can't be queued; the page hides them by default.
  playableOnly?: boolean | null
}

// Unfiltered library totals for the Songs page header ("N of M").
export interface ThemeSongCounts {
  total: number
  playable: number
  favorites: number
}

// A related title on the detail page: another season, or the manga/novel a title
// was adapted from. `media` is set when the related work is in the library (so
// the card links to it); otherwise only the AniList title/type is known and it's
// shown greyed out as a hint of what to import next.
// The unified /stats activity grid: one bucket per dated log the app keeps,
// plus their day-wise sum. Bounded to the 52 weeks the grid renders.
export type ActivitySourceKey =
  | 'jpReviews'
  | 'enReviews'
  | 'progress'
  | 'music'
  | 'quiz'
  | 'games'

export interface ActivityHeatmap {
  combined: { day: string; count: number }[]
  sources: { key: ActivitySourceKey; label: string; days: { day: string; count: number }[] }[]
}

// One saved reading/watching position, for Home's "pick up where you left off".
// `position` is a page index for a chapter and whole seconds for a video;
// `dirPath` is what readerPath() reads to choose the image or book reader.
export interface ResumePoint {
  kind: 'chapter' | 'video'
  refId: number // manga_chapter.id or video_file.id
  media: MediaItem
  dirPath: string
  partTitle: string
  position: number
  total: number | null
  updatedAt: string
}

export interface MediaRelation {
  relationType: string // 'PREQUEL' | 'SEQUEL' | 'SIDE_STORY' | 'SOURCE' | …
  media: MediaItem | null // the local item, or null if not imported yet
  title: string // display title (local title if imported, else AniList title)
  mediaType: MediaType | null // the related work's type ('anime' | 'manga' | …)
}

// ---- Japanese: the JLPT ladder (shared/jlptLevels.ts owns the rules) ----

export interface JpJlptLadder {
  levels: import('./jlptLevels').JlptLevelProgress[]
  // The easiest level not yet cleared; null when no course carries a level.
  current: import('./jlptLevels').JlptLevel | null
  // Cards whose next review is at least a week out, across every level.
  passed: number
  cards: number
  // Cards in courses whose label names no JLPT tier — counted so the page can
  // say so rather than quietly leaving them out of every total.
  unlevelled: number
}

// ---- TV episode catalogue (the detail page's Seasons tab) ----

export interface TvEpisode {
  id: number
  season: number
  number: number
  absolute: number | null // 1-based position across the whole show
  title: string | null
  overview: string | null
  airDate: string | null
  runtime: number | null // minutes
  watchedAt: string | null
  // The local file for this episode, matched from video_file by season+number —
  // null when you don't have it. Lets the grid offer Play without a second query.
  fileId: number | null
}

export interface TvSeason {
  season: number
  episodes: TvEpisode[]
  watched: number
  // Episodes whose air_date is in the future — the grid greys them and the
  // "mark season watched" action ignores them.
  unaired: number
}

export interface MediaDetail extends MediaItem {
  // Wide art the detail-page hero actually paints, resolved server-side:
  // banner_path (imported), else the first fan art / wallpaper on the Art tab,
  // else null — at which point the hero blurs the cover instead. Kept separate
  // from bannerPath so the renderer never re-implements the fallback order.
  heroPath: string | null
  // The Art-tab image flagged as this item's full-page backdrop, or null.
  // Independent of heroPath: the same image may be both, and setting a backdrop
  // never changes the hero strip.
  backgroundPath: string | null
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

// ---- wallpapers / fan art ----

// The two Art-tab grids. A page background is NOT a third kind — it is the
// is_background flag on one of these rows (2026-08-17), so the image keeps its
// place in the grid and is not duplicated on disk.
export type ImageKind = 'wallpaper' | 'fanart'

// A wallpaper or fan-art image attached to a media item. The file lives under
// pictures.dir (virtual "pictures/" prefix) — filePath feeds straight to mediaUrl().
export interface MediaImage {
  id: number
  mediaId: number
  kind: ImageKind
  filePath: string // 'pictures/<title folder>/<wallpapers|fanart>/<file>'
  sourceUrl: string | null // original remote URL (null for picked local files)
  source: string | null // 'wallhaven' | 'tmdb' | 'url' | 'file'
  width: number | null
  height: number | null
  // This image is the media item's full-page detail backdrop (at most one per
  // item) — MediaDetail.backgroundPath is the same file, resolved server-side.
  isBackground: boolean
  // A copy of this image sits in the Windows desktop-slideshow folder
  // (slideshow.dir). Membership is a slideshow_item row, not a file scan.
  inSlideshow: boolean
}

// One result in the wallpaper Browse dialog. thumbUrl is shown in the grid
// (remote, allowed by CSP img-src); fullUrl is what gets downloaded on pick.
export interface WallpaperSearchResult {
  source: 'wallhaven' | 'tmdb'
  id: string // wallhaven id / tmdb file_path (seeds the saved file's base name)
  thumbUrl: string
  fullUrl: string
  width: number | null
  height: number | null
}

export interface WallpaperSearchPage {
  results: WallpaperSearchResult[]
  page: number
  lastPage: number
}

// ---- franchises ----
// The curated franchise data itself ships in the bundle (@shared/franchises);
// the only backend surface is the art cache (src/main/franchiseArt.ts),
// polled with this status while a batch download runs.

export interface FranchiseArtStatus {
  running: boolean
  franchiseId: string | null
  done: number
  total: number
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
  year: number | null // release year (seasonYear || release-date year) — distractor affinity
  genres: string[] // tag names — distractor affinity (shared-genre wrong answers are plausible)
}

// Narrows the song quiz pool. Omit a field (or pass null) to leave it unfiltered.
export interface QuizSongFilter {
  songType?: 'OP' | 'ED' | null // null/omit = both OP and ED
  statuses?: string[] | null // null/empty = any anime status
  eras?: string[] | null // era keys from @shared/era; null/empty = any decade
}

// Narrows the library MCQ pools (cast / VA / synopsis). Both knobs are
// optional; null/empty means unfiltered. mediaTypes only bites on the
// synopsis pool today, but every pool accepts it so the UIs can grow alike.
export interface QuizLibFilter {
  statuses?: string[] | null // null/empty = any status ("Watched" vs "All")
  mediaTypes?: string[] | null // null/empty = any media type
  scope?: QuizConsumptionScope // consumed restricts local-page questions to read progress
}

export interface QuizSynopsisFilter extends QuizLibFilter {
  completedStatuses?: string[] | null
  includeSafeUnseen?: boolean // non-completed titles only when no earlier entry is known
  requireCover?: boolean
}

export interface QuizMangaPanelFilter {
  scope?: QuizConsumptionScope
  seed?: number
}

// One cast-quiz seed: a photographed actor paired with one eligible movie/TV
// credit. Movie seeds are top-ten billed; TV seeds are uncapped. validMediaIds
// retains every in-scope screen credit so a real appearance is never a wrong
// option even when that edge is not itself eligible to seed a movie question.
export interface QuizCastItem {
  personId: number
  personName: string
  photoPath: string | null
  mediaId: number
  mediaTitle: string
  mediaType: Extract<MediaType, 'movie' | 'tv'>
  coverPath: string | null
  year: number | null
  genres: string[]
  billingOrder: number | null
  validMediaIds: number[]
}

// One anime character appearance with every Japanese VA credited for it.
// The same character may appear in several titles, but questions always match
// it to a genuinely different character in a different title.
export interface QuizVaItem {
  characterId: number
  characterName: string
  characterImagePath: string | null
  gender: string | null
  mediaId: number
  mediaTitle: string
  year: number | null
  importance: number | null
  personIds: number[]
  personNames: string[]
}

// One synopsis-quiz seed: any library title with enough description text to
// be recognizable but not trivially short.
export interface QuizSynopsisItem {
  mediaId: number
  mediaType: MediaType
  title: string
  titleOriginal: string | null
  coverPath: string | null
  synopsis: string
  status: string | null
  year: number | null
  genres: string[]
  relationAliases: string[]
  characterNames: string[]
  hasEarlierRelation: boolean
}

// One manga-panel question seed: a servable page (the same virtual path shape
// the reader uses — folders and CBZ entries alike) plus the series it belongs
// to. year/genres drive distractor affinity like every other library pool.
export interface QuizMangaPanelItem {
  mediaId: number
  title: string
  coverPath: string | null
  year: number | null
  genres: string[]
  pageRelPath: string // "manga/<dir>/<file>" or "manga/<dir>/<Vol 1.cbz>/<entry>"
}

// ---- quiz history (finished rounds of any quiz mode) ----
export type QuizKind =
  | 'song'
  | 'songArcade' // song quiz arcade run: lives + speed points (best = most points)
  | 'songReverse' // song quiz reverse: hear clips, pick which belongs to the shown anime
  | 'guessTrackTheme' // progressive intro clips from anime themes (best = points)
  | 'guessTrackMusic' // progressive intro clips from the local music library (best = points)
  | 'character' // legacy character-portrait sessions; new rounds use cast
  | 'cast' // actor photo -> credited movie/TV title
  | 'va' // anime character -> different-title character sharing a Japanese VA
  | 'synopsis' // description excerpt -> which title
  | 'mangaPanel' // a page from a locally-linked manga -> which series
  | 'imageReveal' // progressively reveal a cover/banner/art image (best = points)
  | 'silhouette' // character silhouette -> character/title
  | 'connections' // shared person/studio between two titles
  | 'chronology' // order four related titles by release date
  | 'higherLower' // endless metric comparison (best = most correct)
  | 'libraryGrid' // 3x3 movie/TV fact intersections (best = points)
  | 'movieChainEasy' // connect movie/TV titles across two credited-person links
  | 'movieChainNormal' // connect movie/TV titles across three credited-person links
  | 'movieChainHard' // connect movie/TV titles across four credited-person links
  | 'songRelay' // couch-party song relay; no solo personal best
  | 'japanese'
  | 'kana'
  | 'kanji'
  | 'conjugation'
  | 'writing'
  | 'jlpt'
  | 'tournament'
  | 'cli'
  | 'programming'
  | 'pitch' // pitch-pattern quiz (Kanjium data)
  | 'pairs' // minimal-pairs listening drill
  | 'components' // build-a-kanji from kradfile components
  | 'grammar' // N5-N1 grammar cloze drill (grammar pack)
  | 'names' // JMnedict name-reading drill
  | 'numbers' // generated numbers & counters typing drill
  | 'dictation' // Tatoeba audio dictation
  | 'listening' // knowledge-matched Tatoeba gist + transcript + shadowing
  | 'shiritori' // word chain vs the dictionary
  | 'englishVocab' // WordNet+frequency MCQ (word/def/synonyms)
  | 'englishSpelling' // typed spelling drill (definition + IPA -> word)
  | 'englishReading' // authored passage comprehension
  | 'englishMechanics' // articles/punctuation/boundaries/confusables/register
  | 'lookalike' // pick the right kanji among visual look-alikes
  | 'transitivity' // transitive/intransitive pair discrimination
  | 'homophone' // same-reading word discrimination
  | 'loanword' // katakana loanword recognition
  | 'keigo' // honorific/humble/polite transform drill
  | 'leech' // leech isolation drill (no SRS writes)
  | 'speak' // pitch production drill (record + contour match)
  | 'regexGolf' // regex golf rounds (puzzles solved / played; per-puzzle bests live in prog_solve)
  | 'englishCloze' // Use of English: open cloze (typed function word)
  | 'englishWordForm' // Use of English: word formation (typed derived form)
  | 'englishTransform' // Use of English: key-word transformations (typed 3-6 words)
  | 'englishPunctuate' // Punctuate-it game (place marks and apostrophes)
  | 'englishSpotError' // Spot-the-error game (click the wrong word)
  | 'englishMatch' // collocation / phrasal-verb match game
  | 'particles' // sentence-bank particle fill (MC over は/が/を/に/で…)
  | 'scramble' // sentence-bank chunk reordering (graded against the original)
  | 'contextReading' // typed reading of a kanji word inside a bank sentence
  | 'kanaRace' // 60 s arcade: kana → romaji, per keystroke (best = most correct)
  | 'readingRace' // 60 s arcade: kanji word → reading, per keystroke
  | 'conjRace' // 60 s arcade: conjugation sprint, Enter to submit
  | 'jpReading' // graded reading passages N5-N2 (per-passage bests via settings.passageKey)

export type QuizPlayMode = 'solo' | 'party'
export type QuizConsumptionScope = 'consumed' | 'all'
export type QuizScorePolicy = 'accuracy' | 'points' | 'party' | 'tournament'

export interface QuizAvailabilityRequest {
  statuses?: string[] | null
  scope?: QuizConsumptionScope
}

export interface QuizAvailability {
  song: number
  guessTrack: number
  guessTrackOptions: QuizGuessTrackAvailability
  cast: number
  va: number
  synopsis: number
  mangaPanel: number
  imageReveal: number
  silhouette: number
  connections: number
  chronology: number
  higherLower: number
  higherLowerOptions: QuizHigherLowerAvailability[]
  libraryGrid: number
  movieChain: number
  screenGameOptions: QuizScreenGameAvailability[]
}

export type QuizScreenMediaMode = 'movie' | 'tv' | 'both'
export type QuizMovieChainDifficulty = 'easy' | 'normal' | 'hard'

export interface QuizScreenGameAvailability {
  mediaMode: QuizScreenMediaMode
  libraryGrid: number
  movieChain: Record<QuizMovieChainDifficulty, number>
}

export interface QuizGuessTrackAvailability {
  themes: number
  music: number
}

export type QuizHigherLowerMetric = 'releaseDate' | 'totalUnits' | 'personalScore'

export interface QuizHigherLowerAvailability {
  mediaType: MediaType
  releaseDate: number
  totalUnits: number
  personalScore: number
}

export type QuizChallengeKind =
  | 'imageReveal'
  | 'silhouette'
  | 'connections'
  | 'chronology'
  | 'higherLower'
  | 'libraryGrid'
  | 'movieChain'

export interface QuizChallengeRequest {
  kind: QuizChallengeKind
  seed: number
  scope?: QuizConsumptionScope
  statuses?: string[] | null
  length: number
  options?: {
    imageSource?: 'covers' | 'art'
    silhouetteMode?: 'character' | 'title'
    higherLowerMetric?: QuizHigherLowerMetric
    higherLowerMediaType?: MediaType
    higherLowerReferenceId?: number
    higherLowerExcludeIds?: number[]
    higherLowerIndependent?: boolean
    screenMediaMode?: QuizScreenMediaMode
    movieChainDifficulty?: QuizMovieChainDifficulty
  }
}

export interface QuizChallengeChoice {
  key: string
  label: string
  imagePath?: string | null
}

interface QuizChallengeBase {
  id: string
  kind: QuizChallengeKind
  prompt: string
  choices: QuizChallengeChoice[]
  validKeys: string[]
}

export interface QuizImageRevealQuestion extends QuizChallengeBase {
  kind: 'imageReveal'
  imagePath: string
}

export interface QuizSilhouetteQuestion extends QuizChallengeBase {
  kind: 'silhouette'
  imagePath: string
  reveal: string
}

export interface QuizConnectionsQuestion extends QuizChallengeBase {
  kind: 'connections'
  titleA: QuizChallengeChoice
  titleB: QuizChallengeChoice
  reveal: string
}

export interface QuizChronologyQuestion extends QuizChallengeBase {
  kind: 'chronology'
  entries: Array<QuizChallengeChoice & { releaseDate: string }>
  connectionLabel: string
  validKeys: string[] // oldest to newest
}

export interface QuizHigherLowerQuestion extends QuizChallengeBase {
  kind: 'higherLower'
  reference: QuizChallengeChoice
  challenger: QuizChallengeChoice
  metric: QuizHigherLowerMetric
  mediaType: MediaType
  referenceValue: number
  challengerValue: number
}

export type QuizLibraryGridClueKind =
  | 'actor'
  | 'director'
  | 'genre'
  | 'company'
  | 'decade'

export interface QuizScreenTitle {
  key: string
  label: string
  aliases: string[]
  imagePath: string
  releaseYear: number | null
  mediaType: 'movie' | 'tv'
}

export interface QuizLibraryGridClue {
  key: string
  kind: QuizLibraryGridClueKind
  label: string
}

export interface QuizLibraryGridCell {
  key: string
  row: number
  column: number
  validKeys: string[]
  revealKey: string
  hintChoices: string[]
}

export interface QuizLibraryGridQuestion extends QuizChallengeBase {
  kind: 'libraryGrid'
  rows: QuizLibraryGridClue[]
  columns: QuizLibraryGridClue[]
  cells: QuizLibraryGridCell[]
  titles: QuizScreenTitle[]
}

export interface QuizMovieChainConnector {
  personId: number
  name: string
  leftRoles: string[]
  rightRoles: string[]
}

export interface QuizMovieChainEdge {
  leftKey: string
  rightKey: string
  connectors: QuizMovieChainConnector[]
}

export interface QuizMovieChainQuestion extends QuizChallengeBase {
  kind: 'movieChain'
  start: QuizScreenTitle
  target: QuizScreenTitle
  titles: QuizScreenTitle[]
  edges: QuizMovieChainEdge[]
  difficulty: QuizMovieChainDifficulty
  optimalDistance: number
  maxMoves: number
}

export type QuizChallengeQuestion =
  | QuizImageRevealQuestion
  | QuizSilhouetteQuestion
  | QuizConnectionsQuestion
  | QuizChronologyQuestion
  | QuizHigherLowerQuestion
  | QuizLibraryGridQuestion
  | QuizMovieChainQuestion

export type QuizPartyParticipants = 2 | 3 | 4 | 'teams'
export interface QuizPartyConfig {
  participants: QuizPartyParticipants
  kind: QuizKind
  scope: QuizConsumptionScope
  seed: number
}
export interface QuizPartyScore {
  label: string
  score: number
}
export interface QuizPartyTurn {
  question: number
  owner: number
  phase: 'owner' | 'steal' | 'reveal' | 'done'
}
export interface QuizPartySteal {
  side: number
  seconds: 5
  attempted: boolean
}
export interface QuizPartyResult {
  kind: QuizKind
  participants: string[]
  scores: QuizPartyScore[]
  winners: string[]
  questionCount: number
  scope: QuizConsumptionScope
  seed: number
}

export interface QuizSessionInput {
  kind: QuizKind
  score: number
  total: number
  bestStreak: number
  settings?: Record<string, unknown> | null // round options snapshot
}

export interface QuizSession {
  id: number
  kind: QuizKind
  score: number
  total: number
  bestStreak: number
  settings: Record<string, unknown> | null
  playedAt: string
}

export interface QuizHistory {
  recent: QuizSession[] // newest first
  best: QuizSession | null // policy-ranked solo best among rounds with total >= 5
  bestStreak: number // max streak across all sessions
  totalSessions: number
}

// ---- tournament mode (world-cup bracket over library entities) ----

export type TournamentFormat = 'knockout' | 'groups'
export interface TournamentGroupStanding {
  contender: number
  played: number
  wins: number
}
export interface TournamentGroupMatch {
  a: number
  b: number
  winner: number | null
}
export interface TournamentGroup {
  id: number
  contenders: number[]
  matches: TournamentGroupMatch[]
  standings: TournamentGroupStanding[]
}
export interface TournamentTiebreak {
  groupId: number
  contenders: number[]
  needed: 1 | 2
  places: Array<1 | 2>
}
export interface TournamentQualifier {
  contender: number
  groupId: number
  place: 1 | 2
}

// Where a tournament's contender pool comes from. The repo resolves each
// variant to a normalized TournamentEntry list; the renderer shuffles and
// caps it, so the repo always returns the whole matching set.
export type TournamentSource =
  | { kind: 'music'; scope: 'all' | 'liked' }
  | { kind: 'music'; scope: 'playlist' | 'artist' | 'album'; id: number }
  | { kind: 'themes'; filter?: QuizSongFilter | null }
  | { kind: 'characters'; mediaId?: number | null; statuses?: string[] | null }
  | { kind: 'media'; mediaType: MediaType; status?: string | null }
  | { kind: 'people'; role?: CreditRole | null } // null/omit = anyone with credits
  | { kind: 'list'; listId: number } // a custom list (any entity kind)

export type TournamentEntryKind = 'music' | 'theme' | 'media' | 'character' | 'person' | 'company'

// One contender, normalized across every source so the bracket UI is
// source-agnostic. Audio fields are null for image-only kinds.
export interface TournamentEntry {
  key: string // unique within a pool: '<entryKind>-<rowId>'
  entryKind: TournamentEntryKind
  name: string
  subtitle: string | null // artist / anime title / native name / release year
  imagePath: string | null // virtual-prefixed path for CoverImage
  audioPath: string | null // local playable path, resolvable via files.resolveUrl
  audioUrl: string | null // remote stream fallback (theme songs)
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

// One finished play session of a game/VN launched from the app (game_session
// row). Timestamps are UTC; duration is wall-clock process lifetime.
export interface GameSessionRow {
  id: number
  mediaId: number
  startedAt: string
  endedAt: string
  durationSec: number
}

// The Playtime tab's launcher panel in one invoke. `supported` is false off
// Windows (linking still works there; launching throws). exe_path deliberately
// rides here instead of MediaItem — the local_dir posture: machine-local state
// stays out of the shared media shape.
export interface GameLaunchOverview {
  supported: boolean
  exePath: string | null
  totalSeconds: number
  sessionCount: number
  sessions: GameSessionRow[]
  // Tracked seconds per Monday-based week, oldest first, empty weeks included —
  // the Playtime tab's chart. Rides the same invoke rather than a second
  // channel; it is one GROUP BY over a table that is already being read.
  weeks: { weekStart: string; seconds: number }[]
}

// The tracked-session poll (gameLaunch.ts). Terminal states persist until the
// next launch so the renderer can stop polling and still show the outcome.
// elapsedSec is wall clock computed at poll time. On 'ended': durationSec is
// set, and either discarded (under the minimum — no row written) or
// progressDelta (whole hours/minutes added to media_item.progress).
export interface GameLaunchStatus {
  id: string
  state: 'running' | 'ended' | 'error'
  mediaId: number
  mediaType: string // 'game' | 'visual_novel' — picks the progress unit label
  title: string
  startedAt: string
  elapsedSec: number
  durationSec: number | null
  discarded: boolean
  progressDelta: number | null
  message: string | null
}

// ---- Achievements ----
// Tracking is opt-in per title and only offered for games that have (or once
// had) a linked executable. Steam titles are tracked by reading the unlock
// files cracked games' Steam emulators write; retro titles through a
// RetroAchievements account. 'steam' | 'ra' and 'emu' | 'ra' | 'manual' are
// stored in the DB — frozen key strings.

export type AchievementProvider = 'steam' | 'ra'
export type AchievementUnlockSource = 'emu' | 'ra' | 'manual'
export type AchievementRarity = 'common' | 'uncommon' | 'rare' | 'ultra-rare'

export interface AchievementRow {
  id: number
  apiName: string
  name: string
  description: string | null
  hidden: boolean
  iconPath: string | null // media/… relative, unlocked art
  iconGrayPath: string | null // media/… relative, locked art
  points: number | null // RA only — Steam has no score, and none is invented
  globalPct: number | null
  rarity: AchievementRarity | null // derived main-side from globalPct
  unlockedAt: string | null // null = locked
  unlockSource: AchievementUnlockSource | null
}

export interface AchievementTracking {
  provider: AchievementProvider
  providerGameId: string // Steam appid, or RA game id
  schemaFetchedAt: string | null
}

export interface AchievementSummary {
  unlocked: number
  total: number
  points: number | null // earned RA points; null for Steam sets
}

// The detail tab in one invoke. `eligible` is the exe-linked-now-or-ever rule;
// when it is false the tab explains that instead of offering setup.
export interface AchievementListPayload {
  eligible: boolean
  tracking: AchievementTracking | null
  summary: AchievementSummary
  achievements: AchievementRow[]
}

// A title's Steam appid guess for the setup dialog. `exact` marks the appid
// already stored on a Steam-imported row, which needs no confirmation.
export interface SteamAppCandidate {
  appid: string
  name: string
  coverUrl: string | null
  exact: boolean
}

export interface RaGameCandidate {
  gameId: string
  title: string
  consoleName: string | null
  iconUrl: string | null
}

export interface AchievementSetupResult {
  total: number
  unlocked: number // includes anything a retroactive emulator sweep found
  importedFromFiles: number
  filesFound: number
  // Where the Steam list came from — the crack's own steam_settings file, the
  // Web API (only with a key), or the public community page. Absent for RA.
  schemaSource?: 'local' | 'webapi' | 'community'
  // Community-page achievements that could not be paired with an api name and
  // were dropped (they cannot be tracked without one).
  unmatched?: number
}

// One unlock as it happened, for the popup + the global feed.
export interface AchievementUnlockEvent {
  seq: number
  achievementId: number
  mediaId: number
  mediaTitle: string
  // VNs are trackable too, so every link out of a feed row has to resolve the
  // type rather than assume /games.
  mediaType: MediaType
  name: string
  description: string | null
  iconPath: string | null
  rarity: AchievementRarity | null
  points: number | null
  unlockedAt: string
}

// Polled while a game session runs (achievementWatcher.ts). The renderer fires
// its in-app toast off `recent`, deduped by seq, and the in-game overlay window
// (achPopup.ts → #/achpop) polls the same object for its Xbox-style cards.
// `test`/`testId` carry the "Test popup & sound" request from the Achievements
// page: the overlay renders ONE fake card per testId (the main window's toast
// hook deliberately ignores them); main drops the pair after a short TTL.
export interface AchievementWatchStatus {
  running: boolean
  mediaId: number | null
  provider: AchievementProvider | null
  seq: number
  recent: AchievementUnlockEvent[]
  message: string | null
  test?: AchievementUnlockEvent | null
  testId?: number
}

export interface AchievementGameProgress {
  mediaId: number
  title: string
  mediaType: MediaType
  coverPath: string | null
  provider: AchievementProvider
  unlocked: number
  total: number
}

export interface AchievementsOverview {
  recent: AchievementUnlockEvent[]
  games: AchievementGameProgress[]
  rarest: AchievementUnlockEvent[]
  totals: { unlocked: number; total: number; games: number }
}

// A game playable from the app (Installed page): exe linked right now.
export interface InstalledGame {
  mediaId: number
  title: string
  mediaType: MediaType
  coverPath: string | null
  exePath: string
  totalSeconds: number
  lastPlayedAt: string | null
  achievements: { unlocked: number; total: number } | null
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
// `id` is a string for sources with non-numeric ids (Open Library "OL…W").
// The offline games catalog's install state (gamesCatalog.ts).
export interface GamesCatalogStatus {
  installed: boolean
  gameCount: number
  snapshot: string | null // dataset date, e.g. '2026-06-27'
}

export interface ImportSearchResult {
  id: number | string
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

// ---- Bulk import (/bulk) ----
// Sort/filter vocabulary lives in @shared/bulkImport.ts (BULK_SOURCES); these
// are the wire shapes. Preview returns the resolved top-N list; the renderer
// sends back the SELECTION to import, so what you saw is what runs.
export interface BulkListParams {
  source: import('./bulkImport').BulkSourceKey
  sort: string
  count: number
  yearFrom?: number | null
  yearTo?: number | null
  genre?: string | null
  // Anime only: AniList season filter (winter|spring|summer|fall + year).
  season?: string | null
  seasonYear?: number | null
}

// Preview returns only titles NOT already in the library — the crawl skips
// owned rows without counting them, so a top-100 preview is always 100 new
// titles (or fewer only when the source list itself runs dry).
export interface BulkPreviewItem {
  sourceId: number
  title: string
  year: number | null
  coverUrl: string | null
  // Source-native community score on its own scale (AniList 0-100, VNDB 10-100,
  // TMDB 0-10, catalog Metacritic 0-100 or RAWG 0-5 depending on sort).
  score: number | null
}

export interface BulkStartPayload {
  source: import('./bulkImport').BulkSourceKey
  items: { sourceId: number; title: string }[]
}

export interface BulkRunStatus {
  id: number
  state: 'idle' | 'running' | 'done' | 'cancelled' | 'error'
  label: string
  done: number
  total: number
  imported: number
  skipped: number
  failed: number
  // Current title while running; the failure/resume hint on 'error'.
  message: string | null
}

// ---- Library Refresh (selectable-aspect bulk re-import) ----

export interface RefreshPreview {
  total: number // titles the run would touch
  // Rows of the chosen types whose external_source no importer serves any more
  // (legacy 'rawg'/'igdb' games), reported rather than silently dropped.
  unsupported: number
}

export interface RefreshRunStatus {
  id: number
  state: 'idle' | 'running' | 'done' | 'cancelled' | 'error'
  label: string
  done: number
  total: number
  refreshed: number
  skipped: number
  failed: number
  // Current title while running; the bail-out hint on 'error'.
  message: string | null
  // Named so a failed title can be retried by hand rather than re-running 400.
  failures: { id: number; title: string; error: string }[]
}

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
  sourceMediaId: number | null // mined cards: the manga/VN/anime it came from
  audioPath: string | null // sentence audio clipped from a video ("jpaudio/mining/…")
  imagePath: string | null // the frame it was mined on ("media/mining/…")
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
  audioPath?: string | null
  imagePath?: string | null
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
// A queued card plus its lesson's kind/title — the typed-review mode derives a
// grammar cloze target from the lesson title (@shared/cloze).
export interface JpReviewCard extends JpCard {
  lessonKind: JpLessonKind
  lessonTitle: string
}

export interface JpReviewQueue {
  due: JpReviewCard[]
  fresh: JpReviewCard[]
}

// A card that keeps lapsing (jp_card.lapses >= LEECH_LAPSES). Read-time only —
// no leech table exists.
export interface JpLeech {
  id: number
  front: string
  reading: string | null
  back: string
  lapses: number
  agains: number // Again grades since the last reset (learning-step misses)
  ease: number
  status: SrsStatus
  intervalDays: number
  lessonId: number
  lessonTitle: string
  courseId: number
  courseTitle: string
}

// ---- Roadmap ----
// The study path: seeded courses in difficulty (step) order, everything else
// (mined inbox, prep decks, core decks, user courses) unscheduled.

export interface JpRoadmapCourse extends JpCourseSummary {
  seenCardCount: number // cards past 'new'
  dueCardCount: number // same due definition as stats()
}

export interface JpRoadmap {
  steps: JpRoadmapCourse[]
  unscheduled: JpRoadmapCourse[]
  frontierCourseId: number | null // first step course with lessons left
  nextLesson: {
    id: number
    title: string
    kind: JpLessonKind
    courseId: number
    courseTitle: string
  } | null
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

// Pool for the end-of-lesson self-check quiz: the lesson's own cards plus
// distractor cards drawn from the SAME course's other lessons (any learned
// state — the check runs BEFORE the lesson is marked learned).
export interface JpLessonQuizPool {
  items: JpQuizItem[]
  distractors: JpQuizItem[]
}

export interface JpStats {
  dueCount: number
  newAvailableCount: number
  learnedLessons: number
  totalLessons: number
  totalCards: number
  reviewsToday: number
  // Cards whose FIRST jp_review_log row is today (localtime) — the honest
  // "new cards introduced today" count. Ghost answers write no log rows, so
  // they can't inflate it.
  introducedToday: number
}

// Everything the Japanese stats page needs in one invoke: review history off
// jp_review_log (heatmap, streaks, grade breakdown) + the due forecast off
// jp_card.due_at. Days are local-calendar 'YYYY-MM-DD' strings.
export interface JpStatsDetail {
  reviewsPerDay: { day: string; count: number }[] // last 365 days, sparse
  streak: { current: number; longest: number }
  gradeCounts: Record<SrsGrade, number>
  totalReviews: number
  firstReviewAt: string | null // UTC timestamp of the earliest log row
  dueForecast: { day: string; due: number }[] // next 30 days; overdue folds into today
  // True retention: Anki's default counts Hard as a pass (lenient); the strict
  // number is Good/Easy only. null until any reviews exist in the window.
  // Mature-only retention is NOT computable honestly — the log doesn't record
  // the card's pre-review status (upgrade path: a flagged column, not taken).
  retention: {
    strict: number | null
    lenient: number | null
    strict30: number | null
    lenient30: number | null
  }
  // The "N hours of Japanese" retrospective, derived passively — never a
  // manually-logged number (the AJATT lesson).
  journey: {
    distinctCardsReviewed: number
    wordsMined: number
    lessonsLearned: number
    chaptersRead: number
    quizRounds: number
  }
  // Mined cards grouped by the title they were captured from, biggest first.
  // title falls back to 'Unknown' for a source that has since been deleted.
  miningSources: { mediaId: number; title: string; mediaType: MediaType | null; count: number }[]
}

// Ghost reviews: a lapsed review-state card echoes into future sessions until
// answered correctly GHOST_STEPS times (independent of its real SM-2 state).
export interface JpGhostCard extends JpReviewCard {
  ghostRemaining: number
}
export interface JpGhostOutcome {
  remaining: number
  dissolved: boolean
}

// "You may be confusing X with Y": static overlap analysis over lapsing cards
// (same reading / shared kanji / similar components).
export interface JpConfusableCardRef {
  id: number
  front: string
  reading: string | null
  back: string
  lapses: number
}
export interface JpConfusablePair {
  a: JpConfusableCardRef
  b: JpConfusableCardRef
  reasons: ('reading' | 'kanji' | 'components')[]
}

// ---- i+1 sentence feed ----
export interface JpFeedRequest {
  includeLearning: boolean // count learning-tier cards as known
  unknowns: 0 | 1 // 0 = pure reading flood, 1 = exactly one new word
  limit?: number
}
export interface JpFeedItem {
  sentenceId: number
  jp: string
  en: string
  audioPath: string | null
  attribution: string | null
  unknownWord: string | null // base form; null in flood mode
  unknownSurface: string | null // as it appears in jp — the highlight target
  unknownTier: 'unknown' | 'unstarted' | 'learning' | null
  unknownRank: number | null // corpus frequency rank when available
}
export interface JpFeed {
  items: JpFeedItem[]
  scanned: number // sentences considered in the coarse pass
  eligible: number // sentences surviving the exact pass
  builtAt: string
  fromCache: boolean
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
  // True when every def comes from a names dictionary (JMnedict) — the
  // renderer groups these under a collapsed Names section.
  isName?: boolean
  // Corpus frequency rank when a frequency dictionary is installed (lower =
  // more common). Always null on the jisho.org fallback path.
  frequency: DictFrequency | null
}

// A word's rank in one installed frequency dictionary.
export interface DictFrequency {
  rank: number
  display: string | null // bank-supplied display form, e.g. "12345㋕"
  dictTitle: string
}

// A kanji's readings and meanings from a KANJIDIC-style dictionary.
export interface KanjiInfo {
  character: string
  onyomi: string[]
  kunyomi: string[]
  meanings: string[]
  stats: Record<string, string> // grade, strokes, jlpt, freq, …
  dictTitle: string
  components: string[] // kradfile decomposition; [] when the pack is absent
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
  freqCount: number // frequency dictionaries have no terms of their own
  pitchCount: number // pitch-accent dictionaries (Kanjium) have only these
  importedAt: string
}

// Live status of a dictionary download/import, polled by the renderer while an
// import runs (module-level state in the importer, like the music scan). The
// sentence bank and stroke set share this status and its one-at-a-time gate.
export interface DictImportStatus {
  running: boolean
  phase:
    | 'idle'
    | 'downloading'
    | 'reading'
    | 'terms'
    | 'kanji'
    | 'pitch'
    | 'frequency'
    | 'tags'
    | 'sentences'
    | 'strokes'
    | 'english' // WordNet lemmas/synsets
    | 'pronunciations' // CMUdict
    | 'components' // kradfile kanji decompositions
    | 'grammar' // N5-N1 grammar points
    | 'audio' // Tatoeba per-sentence clips (done/total = files)
    | 'pairs' // minimal-pairs clips
    | 'finalizing'
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
  freqCount: number
}

// ---- Example sentences (Tatoeba pairs, imported by dict/sentences.ts) ----

export interface SentenceExample {
  jp: string
  en: string
  attribution: string | null // kept verbatim to honour the CC-BY licence
  // navimg-relative clip path when the sentence-audio pack has a recording of
  // this exact sentence (joined on jp text), else null.
  audioPath: string | null
}

// ---- Sentence games (/japanese/sentences) ----
// Pools are generated in main from the installed sentence bank + kuromoji;
// nothing is authored. Plain awaits at Start (never cached).
export interface SentenceGamePoolRequest {
  limit: number
  maxChars?: number // default 30
}
export interface ParticleQuizItem {
  jp: string
  en: string
  blanked: string // jp with the particle replaced by the cloze BLANK
  answer: string
  options: string[] // 4, shuffled, never a conflict partner of the answer
  audioPath: string | null
}
export interface ScrambleQuizItem {
  jp: string
  en: string
  chunks: string[] // in the ORIGINAL order (the renderer shuffles for the tray)
  punct: string // sentence-final punctuation, re-appended on reveal
  audioPath: string | null
}
export interface ContextReadingItem {
  jp: string
  en: string
  target: { surface: string; start: number; end: number }
  readings: string[] // [0] = kuromoji's, all confirmed against JMdict for this expression
  gloss: string | null
  audioPath: string | null
}

// Arcade reading race: a kanji-bearing word with every reading that counts.
export interface ReadingRaceRequest {
  source: 'cards' | 'frequency' | 'both'
  limit: number
}
export interface ReadingRaceWord {
  term: string
  readings: string[]
  gloss: string | null
  fromCards: boolean
}

// ---- JLPT checkpoint (/japanese/test) ----
// Built from the offline packs. `source: 'packs'` distinguishes it from the
// legacy seeded-course sampler the page falls back to.
export type JlptLevel = 'N5' | 'N4' | 'N3' | 'N2' | 'N1'
export type JlptSectionKey = 'grammar' | 'vocab' | 'kanji' | 'reading'
export interface JlptQuestion {
  section: JlptSectionKey
  heading: string
  prompt: string
  promptHint: string | null // reading / English gloss shown under the prompt
  options: string[]
  correct: number
  reveal: { front: string; reading: string | null; back: string }
}
export interface JlptSection {
  key: JlptSectionKey
  label: string
  wanted: number
  questions: JlptQuestion[]
  note: string | null // honesty note ("level approximated by word frequency")
}
export interface JlptTest {
  level: JlptLevel
  source: 'packs'
  sections: JlptSection[]
}

export interface SentenceBankInfo {
  sentenceCount: number
  importedAt: string
}

export interface SentenceImportSummary {
  sentenceCount: number
}

// ---- KanjiVG stroke order ----
// Paths are SVG `d` attributes in KanjiVG's 109x109 coordinate space; the
// viewBox constant is shared by the diagram renderer and the writing drill's
// stroke matcher so both normalize into the same space.
export const KANJIVG_VIEWBOX = '0 0 109 109'
export const KANJIVG_SIZE = 109

export interface KanjiStrokes {
  character: string
  strokes: string[] // ordered SVG path `d` strings
}

export interface StrokeSetInfo {
  revision: string | null
  charCount: number
  importedAt: string
}

export interface StrokeImportSummary {
  charCount: number
  revision: string | null
}

// ---- Kanjium pitch accents (imported into the pitch table) ----

export interface KanjiumImportSummary {
  pitchCount: number
}

// One word's attested pitch positions, for the pitch-pattern quiz pool.
export interface PitchWordEntry {
  expression: string
  reading: string // '' when identical to the expression
  positions: number[] // every attested downstep position, primary first
}

// A pitch-quiz question candidate assembled in main (jp_card × pitch, topped
// up from frequency rows).
export interface PitchPoolItem {
  term: string
  reading: string
  positions: number[]
  fromCards: boolean // came from the user's learned cards vs the freq top-up
}

// ---- KRADFILE kanji components ----

export interface KradSetInfo {
  revision: string | null
  kanjiCount: number
  componentCount: number
  importedAt: string
}

export interface KradImportSummary {
  kanjiCount: number
  componentCount: number
}

export interface KradComponent {
  component: string
  strokes: number | null
  kanjiCount: number // how many kanji contain it (drives the picker grid)
}

export interface KanjiComponents {
  kanji: string
  components: { char: string; strokes: number | null }[]
}

// One build-a-kanji question assembled in main: real components + decoys.
export interface ComponentQuizItem {
  kanji: string
  meaning: string | null
  reading: string | null
  components: { char: string; strokes: number | null }[]
  decoys: { char: string; strokes: number | null }[]
}

// ---- Grammar library (hanabira N5-N1 points) ----

export interface GrammarBankInfo {
  pointCount: number
  importedAt: string
}

export interface GrammarImportSummary {
  pointCount: number
}

export interface GrammarExample {
  jp: string
  romaji: string | null
  en: string
  // Pre-computed at import via @shared/cloze: the sentence with the grammar
  // point blanked, and the blanked string. null = not clozeable (reference
  // display only, never enters the drill).
  clozeJp: string | null
  clozeAnswer: string | null
}

export interface GrammarPointSummary {
  id: number
  level: string // 'N5'..'N1'
  title: string
  meaning: string // short explanation
}

export interface GrammarPoint extends GrammarPointSummary {
  explanation: string | null // long explanation
  formation: string | null
  examples: GrammarExample[]
}

// Result of staging grammar points as lessons. `skipped` counts points whose
// cards were already there, so staging is safe to re-run.
export interface GrammarDeckResult {
  lessonId: number
  added: number
  skipped: number
}

// ---- JMnedict name sampling (names drill) ----

export type NameKind = 'surname' | 'given' | 'both'

export interface NameQuizItem {
  expression: string
  kind: 'surname' | 'given'
  readings: string[] // every attested reading, most common first
}

// ---- Tatoeba sentence audio ----

export interface SentenceAudioBankInfo {
  clipCount: number
  importedAt: string
}

export interface SentenceAudioImportSummary {
  clipCount: number
  skippedUnlicensed: number
  skippedUnmatched: number
  failed: number
}

// One playable sentence for the dictation drill.
export interface AudioSentence {
  jp: string
  en: string
  audioPath: string // navimg-relative (jpaudio/tatoeba/…)
  attribution: string | null // per-clip contributor credit (license requires it)
}

export interface JpListeningRequest {
  mode: 'known' | 'one'
  includeLearning: boolean
  limit: number
  maxChars?: number
}

// A playable sentence matched against the learner's current known-word set.
// `unknown*` is populated only in one-new-word mode.
export interface JpListeningItem extends AudioSentence {
  unknownWord: string | null
  unknownSurface: string | null
}

// ---- Minimal pairs (kotu.io backup pack) ----

export interface PairSetInfo {
  revision: string | null
  pairCount: number
  importedAt: string
}

export interface PairImportSummary {
  pairCount: number
  clipCount: number
}

// One recorded variant of a pair word.
export interface MinimalPairItem {
  pron: string // kana pronunciation as recorded
  position: number // downstep position of this recording
  moraCount: number
  audioPath: string // navimg-relative (jpaudio/pairs/…)
}

export interface MinimalPair {
  pairId: string
  buckets: string[] // pattern buckets ('pitch0'…'pitch4', 'devoiced')
  kana: string // the shared segmental string
  items: MinimalPairItem[]
}

// One conversion candidate for the on-screen keyboard's IME bar: pick it to
// commit `text`. 'exact' = reading matches the buffer, 'prediction' = the
// buffer is a prefix of the reading.
export interface ImeCandidate {
  text: string
  reading: string
  gloss: string | null
  kind: 'exact' | 'prediction'
}

// ---- Confusables wave (similar kanji, look-alike/homophone/transitivity/loanword drills) ----

// One visually-similar candidate for a kanji (kradfile × KANJIDIC scoring).
export interface SimilarKanji {
  character: string
  score: number
  sharedComponents: string[]
  strokes: number | null
}

// Look-alike drill question: pick the RIGHT kanji among visual neighbors.
export interface LookalikeQuizItem {
  kanji: string
  meaning: string | null
  reading: string | null
  decoys: string[] // 3 look-alike characters
}

// Transitivity drill question; the renderer joins pairKey back to
// @shared/transitivity for options and the reveal.
export interface TransitivityQuestion {
  pairKey: string
  side: 'trans' | 'intrans' // which member the sentence uses
  jp: string
  surface: string // the conjugated form blanked out of jp
  en: string
  source: 'tatoeba' | 'authored'
}

export interface HomophoneGroupMember {
  expression: string
  gloss: string
  rank: number | null
}

// Homophone drill question: same reading, pick the right spelling.
export interface HomophoneQuizItem {
  reading: string
  target: string // the correct expression
  options: HomophoneGroupMember[] // 2-4, includes the target
  group: HomophoneGroupMember[] // the FULL group, for the reveal
  jp: string | null // sentence with the target rendered as kana (sentence mode)
  en: string | null
  mode: 'sentence' | 'gloss'
}

// Katakana loanword drill item.
export interface LoanwordQuizItem {
  word: string
  gloss: string
  rank: number | null
}

// ---- Series prep decks ----
// Builds a "words you'll meet in this series" vocab course by tokenizing a
// series' mokuro OCR / EPUB text, frequency-ranking it, dropping words already
// in jp_card, and glossing the rest from the offline dictionaries.

export interface PrepDeckStatus {
  running: boolean
  phase: 'idle' | 'reading' | 'glossing' | 'writing'
  done: number // reading: chapters processed; glossing: words glossed
  total: number
  error: string | null
}

export interface PrepDeckSummary {
  courseId: number
  courseTitle: string
  words: number
  chaptersScanned: number
  uniqueWordsSeen: number
}

// ---- Series comprehension + text analysis ----
// How much of a series (or a pasted text) the user can already read. Tiers are
// derived from jp_card at read time, never stored — see repos/coverageRepo.ts.

// 'unstarted' = a card exists but its lesson isn't learned yet (prep decks
// create hundreds of these); it counts toward neither known nor unknown.
export type JpWordTier = 'known' | 'learning' | 'unstarted' | 'unknown'

export interface JpTierCounts {
  uniqueCount: number
  tokenCount: number
}

// One cumulative step of the jpdb-style projection: "learn the top
// `learnWords` not-yet-known words of this series → running-text coverage
// becomes `share`". Same denominator as the tiers (tested invariant).
export interface JpCoverageStep {
  learnWords: number
  share: number
}

export interface JpCoverageDetail {
  mediaId: number
  scannedAt: string
  chaptersScanned: number
  tokenCount: number
  uniqueWords: number
  tiers: Record<JpWordTier, JpTierCounts>
  topUnknown: { word: string; count: number }[]
  projection: JpCoverageStep[]
}

export interface JpCoverageListRow {
  mediaId: number
  title: string // '(deleted)' when the media item is gone
  coverPath: string | null
  mediaType: MediaType | null
  scannedAt: string
  tokenCount: number
  uniqueWords: number
  tiers: Record<JpWordTier, JpTierCounts>
}

export interface JpCoverageScanStatus {
  running: boolean
  mediaId: number | null
  done: number // chapters processed
  total: number
  error: string | null
}

export interface JpAnalyzedToken {
  surface: string
  base: string
  tier: JpWordTier | 'nonword' // particles, punctuation and Latin runs
}

export interface JpTextAnalysis {
  paragraphs: JpAnalyzedToken[][]
  stats: {
    tokenCount: number
    uniqueWords: number
    tiers: Record<JpWordTier, JpTierCounts>
  }
  unknown: { word: string; count: number; reading: string | null; gloss: string | null }[]
}

// ---- Core frequency deck ----

export interface CoreDeckStatus {
  running: boolean
  phase: 'idle' | 'selecting' | 'glossing' | 'writing'
  done: number
  total: number
  error: string | null
}

export interface CoreDeckSummary {
  courseId: number
  courseTitle: string
  words: number
  ranksScanned: number
  skippedKnown: number
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
  // First page, as a navimg-able virtual path — the Volumes grid thumbnail.
  // null for EPUBs and for series not rescanned since covers were added.
  coverPath: string | null
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

// One table-of-contents entry of an EPUB book: a human chapter title mapped
// onto the spine document ("page") it starts at.
export interface EpubTocEntry {
  label: string
  page: number
}

export interface MangaPages {
  chapterId: number
  mediaId: number
  title: string
  number: number | null
  pages: MangaPage[]
  // EPUB chapters only: pages are the book's spine documents (XHTML served
  // via navimg://), and toc maps chapter titles onto page indices.
  isBook?: boolean
  toc?: EpubTocEntry[]
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
  // File name of the first page, for the Volumes grid thumbnail. null for
  // EPUBs, whose "pages" are XHTML spine documents rather than images.
  coverPage: string | null
}

// ---- "Open with NaviHUB" ----
// A file handed to the app by the OS (startup argv, a second-instance launch,
// macOS open-file). It is ad-hoc: read through a session token, never scanned,
// never attached to a media item, nothing persisted.

export type OpenKind = 'video' | 'book' | 'manga' | 'audio'

export interface OpenTarget {
  kind: OpenKind
  token: string // the "open/<token>" segment; carries the original extension
  relPath: string // "open/<token>" — feed to mediaUrl()
  title: string // the file's base name, for the window/player label
  route: string // where the renderer should go; '' for audio (no page)
}

// ---- Local video player ----
// Episodes/films attached to an anime/movie/tv media_item, plus the playback
// contract the player page consumes. The player is SOURCE-AGNOSTIC: it speaks
// only VideoSource, so a library row and an ad-hoc "open this file" session
// drive exactly the same page.

// Which video to play. 'file' is a video_file row (progress is persisted);
// 'adhoc' is a session token minted by the native picker (nothing persists —
// see files.ts:registerOpenedFile).
// Which library a playable file came from. 'file' is the media library
// (video_file), 'wrestling' the wrestling collection (wrestling_video), 'adhoc'
// a file opened from the OS with no row at all. Everything downstream of
// resolving it — playability tiering, the ffmpeg cache, subtitles, mining — is
// path-only and scope-blind.
export type VideoSourceRef =
  | { kind: 'file'; fileId: number }
  | { kind: 'wrestling'; fileId: number }
  | { kind: 'adhoc'; token: string }

// How Chromium can get at this file. 'direct' plays the source as-is;
// 'cached' plays an already-converted copy; 'needsPrepare' requires an ffmpeg
// pass first; 'unsupported' can't be played (and says why in `reason`).
export type VideoPlayAction = 'direct' | 'cached' | 'needsPrepare' | 'unsupported'
export type VideoPlanAction = 'direct' | 'remux' | 'transcode' | 'unsupported'

export interface VideoFile {
  id: number
  mediaId: number
  filePath: string // relative to the video root, e.g. "Frieren/S01E03.mkv"
  title: string
  number: number | null
  season: number | null
  sortOrder: number
  duration: number | null // seconds; null until ffprobe has seen it
  width: number | null
  height: number | null
  videoCodec: string | null
  audioCodec: string | null
  container: string | null
  playability: VideoPlanAction | null
  resumeSeconds: number | null
  watchedAt: string | null // non-null = watched
}

export interface VideoLibrary {
  localDir: string | null // attached folder (relative to root); null = not attached
  files: VideoFile[]
}

export interface VideoAttachResult {
  ok: boolean
  error?: string
  fileCount?: number
}

export interface VideoScanStatus {
  running: boolean
  phase: 'idle' | 'walking' | 'probing' | 'writing'
  done: number
  total: number
  error: string | null
}

// One selectable subtitle track. Sidecar files and tracks extracted out of a
// container are delivered identically — as a navimg:// URL the renderer fetches
// and parses with @shared/subtitles. A native <track> is deliberately never
// used: it renders text the renderer can't reach, which defeats word mining.
export interface VideoSubtitleTrack {
  id: string // 'sidecar:<hash>' | 'embedded:<streamIndex>'
  label: string
  lang: 'ja' | 'en' | 'other'
  format: 'srt' | 'vtt' | 'ass'
  url: string | null // null = textual but not yet extracted (needs ffmpeg)
  signs: boolean
  forced: boolean
  textual: boolean // false = a bitmap track (PGS/VobSub) that can never be text
}

export interface VideoAudioTrack {
  index: number // absolute ffprobe stream index
  label: string
  lang: string | null
  codec: string
  channels: number | null
  isDefault: boolean
}

export interface VideoSource {
  ref: VideoSourceRef
  title: string
  seriesTitle: string | null
  mediaId: number | null // null for ad-hoc and wrestling — mining still works
  mediaType: MediaType | null // with mediaId, enough to link back to the detail page
  // Where the player's Back should go, built in main so a new scope needs no
  // player change (the openFile.ts:routeFor precedent). null = the picker.
  backPath: string | null
  fileId: number | null
  action: VideoPlayAction
  url: string | null // navimg:// URL for <video src>; null when a prepare is needed
  reason: string | null // human sentence for needsPrepare/unsupported
  warnings: string[]
  plan: VideoPlanAction | null
  durationSeconds: number | null
  resumeSeconds: number | null
  watchedAt: string | null
  audioTracks: VideoAudioTrack[]
  subtitles: VideoSubtitleTrack[]
  prev: { fileId: number; title: string } | null
  next: { fileId: number; title: string } | null
}

export interface VideoPrepareStatus {
  id: string
  sourceLabel: string
  state: 'probing' | 'converting' | 'finalizing' | 'done' | 'error' | 'cancelled'
  action: 'remux' | 'transcode' | null
  percent: number | null
  speed: number | null
  etaSec: number | null
  outputRelPath: string | null // "videocache/<key>.mp4"; only when done
  message: string | null
}

export interface VideoToolsResult {
  ffmpeg: boolean
  ffprobe: boolean
  ffmpegVersion: string | null
}

export interface VideoCacheStats {
  entries: number
  bytes: number
  capBytes: number
}

// Scanner output for one discovered video (filePath relative to the ATTACHED
// folder). The probe half is filled in separately and stays null without
// ffprobe — a .mp4 still plays.
export interface ScannedVideo {
  filePath: string
  title: string
  number: number | null
  season: number | null
  mtimeMs: number
  size: number
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

// Sidecar presence per chapter, for the Chapters tab ("which volumes are
// minable" chips + the Run OCR button's missing count). ocrEligible is false
// for EPUB chapters — they are text already, mokuro never applies.
export interface ChapterOcrOverview {
  chapterId: number
  hasSidecar: boolean
  ocrEligible: boolean
}

// One in-app mokuro run over every eligible-but-missing volume of a series
// (mokuroRun.ts). Polled via manga:ocrRunStatus; terminal states persist until
// the next run so the renderer can stop polling and still show the outcome.
export interface MangaOcrRunStatus {
  id: string
  state: 'starting' | 'running' | 'done' | 'error' | 'cancelled'
  volumeIndex: number | null // "volume 2 of 5" (1-based)
  volumeCount: number | null
  volumeTitle: string | null
  percent: number | null // within the current volume, from mokuro's page bar
  okCount: number | null // volumes processed successfully (final summary)
  message: string | null
}

export interface MokuroDetectResult {
  ok: boolean
  version: string | null
  error: string | null
}

// One token from morphological analysis (kuromoji) of an OCR'd text block.
export interface JpToken {
  surface: string
  base: string // dictionary form (食べた → 食べる); falls back to surface
  reading: string | null // hiragana
  pos: string // top-level POS: 名詞 / 動詞 / 助詞 / …
  posDetail: string | null // kuromoji pos_detail_1 (係助詞 / 格助詞 / 接尾 / 非自立 / 代名詞 / 数 …), null when '*'
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
  spotifyId: string | null
  spotifyUrl: string | null
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
  spotifyId: string | null
  spotifyUrl: string | null
  tracks: MusicTrack[]
}

export interface MusicPlaylistSummary {
  id: number
  title: string
  description: string | null
  trackCount: number
  previewCovers: (string | null)[] // first 4 album covers, playlist order
  updatedAt: string
  source: 'local' | 'spotify'
  playableCount: number
  missingCount: number
}

export interface MusicPlaylistEntry {
  kind: 'local'
  itemId: number
  position: number
  track: MusicTrack
}

export interface MusicSpotifyPlaylistEntry {
  kind: 'spotify'
  itemId: number
  position: number
  spotifyTrackId: string
  title: string
  artists: string[]
  primaryArtist: string
  albumArtist: string | null
  albumTitle: string
  duration: number | null
  coverPath: string | null
  spotifyUrl: string
  trackNo: number | null
  discNo: number | null
  year: number | null
  matchedTrack: MusicTrack | null
}

export type MusicPlaylistItem = MusicPlaylistEntry | MusicSpotifyPlaylistEntry

export interface MusicSpotifySource {
  spotifyId: string
  sourceUrl: string
  importedAt: string
}

export interface MusicPlaylistDetail {
  id: number
  title: string
  description: string | null
  createdAt: string
  updatedAt: string
  items: MusicPlaylistItem[]
  source: MusicSpotifySource | null
  playableCount: number
  missingCount: number
}

export interface SpotifyImportResult {
  playlistId: number
  existing: boolean
  title: string
  imported: number
  matched: number
  missing: number
  duplicates: number
  skipped: number
}

export interface SpotifyDownloadInput {
  playlistId: number
  itemIds?: number[]
}

export type SpotifyEntityKind = 'artist' | 'album'

export interface SpotifyEntityInspectInput {
  kind: SpotifyEntityKind
  entityId: number
  url?: string
  candidateKey?: string
  refresh?: boolean
}

export interface SpotifyEntityCandidate {
  candidateKey: string
  name: string
  secondary: string | null
  year: number | null
  exact: boolean
}

export interface SpotifyReleasePreview {
  releaseId: number
  spotifyAlbumId: string | null
  spotifyUrl: string | null
  title: string
  albumArtist: string
  year: number | null
  albumType: 'album' | 'single' | 'compilation' | null
  trackCount: number
  localCount: number
  missingCount: number
  duration: number
  estimatedBytes: number
  missingDuration: number
  missingEstimatedBytes: number
  preselected: boolean
  metadataState: 'indexed' | 'resolved' | 'error'
  resolutionError: string | null
}

export interface SpotifyEntityInspection {
  snapshotId: number
  kind: SpotifyEntityKind
  entityId: number
  sourceId: string | null
  sourceUrl: string | null
  sourceName: string
  provider: 'itunes' | 'spotdl'
  refreshedAt: string
  catalogueState: 'complete' | 'partial'
  matchesCurrentEntity: boolean
  mismatchMessage: string | null
  duplicateCount: number
  skippedCount: number
  releases: SpotifyReleasePreview[]
}

export type SpotifyEntityState =
  | { state: 'empty'; inspection: null; jobId: null; error: null }
  | { state: 'building'; inspection: null; jobId: string; error: null }
  | { state: 'ready'; inspection: SpotifyEntityInspection; jobId: null; error: null }
  | { state: 'error'; inspection: null; jobId: null; error: string }

export interface SpotifyEntityInspectionStatus {
  running: boolean
  jobId: string | null
  kind: SpotifyEntityKind | null
  entityId: number | null
  phase: 'idle' | 'candidateSearch' | 'catalogue' | 'spotifyFallback' | 'matching' | 'cancelling' | 'done' | 'error'
  message: string | null
  foundCount: number | null
  cancelled: boolean
  startedAt: number | null
  elapsedMs: number
  provider: 'itunes' | 'spotdl' | null
}

export interface SpotifyEntityDownloadInput {
  snapshotId: number
  releaseIds: number[]
  allowMismatch?: boolean
}

export type SpotifyDownloadQueueCardState =
  | 'queued'
  | 'running'
  | 'paused'
  | 'failed'
  | 'completed'

export interface SpotifyDownloadQueueSelection {
  id: number
  kind: 'release' | 'playlistItem'
  sourceId: number
  title: string
  subtitle: string | null
  trackCount: number
  missingCount: number
  duration: number
  missingEstimatedBytes: number
  metadataState: 'indexed' | 'resolved' | 'error' | null
  error: string | null
}

export interface SpotifyDownloadQueueCard {
  id: number
  sourceKind: 'entity' | 'playlist'
  entityKind: SpotifyEntityKind | null
  entityId: number | null
  playlistId: number | null
  title: string
  subtitle: string | null
  route: string
  sourceUrl: string | null
  state: SpotifyDownloadQueueCardState
  allowMismatch: boolean
  continueAfter: boolean
  error: string | null
  createdAt: string
  updatedAt: string
  completedAt: string | null
  trackCount: number
  missingCount: number
  missingEstimatedBytes: number
  selections: SpotifyDownloadQueueSelection[]
}

export interface SpotifyDownloadQueueSnapshot {
  pending: SpotifyDownloadQueueCard[]
  completed: SpotifyDownloadQueueCard[]
  pendingSources: number
  pendingTracks: number
  pendingEstimatedBytes: number
  activeCardId: number | null
}

export interface SpotifyDownloadQueueAddResult {
  jobId: number | null
  addedSelections: number
  missingCount: number
}

export interface SpotifyDownloadQueueStartInput {
  jobId?: number
  prioritize?: boolean
  resume?: boolean
}

export interface SpotifyEntityRef {
  kind: SpotifyEntityKind
  entityId: number
}

export interface SpotdlDetectResult {
  ok: boolean
  version: string | null
  ffmpeg: boolean
  error: string | null
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

// Result of a destructive delete (track/album/artist) that removed files from
// disk. `tracks` = number of track rows (and their files) removed.
export interface MusicDeleteResult {
  tracks: number
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
  taskId?: string | null
  status: 'starting' | 'resolving' | 'downloading' | 'processing' | 'pausing' | 'paused' | 'cancelling' | 'done' | 'error' | 'cancelled'
  percent: number | null
  itemIndex: number | null // "item 3 of 12" for playlist/album URLs
  itemCount: number | null
  title: string | null // current file being downloaded
  message: string | null // error text / phase note
  source?: 'url' | 'spotify' | 'spotifyEntity' | 'spotifyQueue'
  playlistId?: number | null
  entityKind?: SpotifyEntityKind
  entityId?: number | null
  route?: string | null
  resolvedCount?: number
  failedCount?: number
  phase?: string | null
  releaseIndex?: number | null
  releaseCount?: number | null
  releaseTitle?: string | null
  startedAt?: number | null
  queueCardId?: number | null
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
  cancelled: boolean
  done: number
  total: number
  updated: number
  missing: number
  failed: number
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

// ---- Task registry ----
// One normalized row per long-running main-process job (src/main/tasks.ts).
// Every subsystem keeps its OWN rich *Status channel — this is a read-side
// projection over them plus the pause/cancel controls, so the Tasks page can
// show everything at once without any per-feature panel changing.
// Guarded by tests/taskKindSync.test.ts.
export type TaskKind =
  | 'import' // any withActivity import (AniList, TMDB, VNDB, Steam, themes, …)
  | 'bulkImport'
  | 'libraryRefresh'
  | 'wrestlingImport'
  | 'musicDownload'
  | 'musicMetadata'
  | 'mangaOcr'
  | 'videoPrepare'
  | 'appUpdate'
  | 'musicScan'
  | 'mangaRescan'
  | 'videoScan'
  | 'musicArt'
  | 'dictImport'
  | 'prepDeck'
  | 'coreDeck'
  | 'coverageScan'
  | 'torrentSearch'
  | 'franchiseArt'
  | 'libraryExport'
// Achievement fetches deliberately have NO kind of their own: they run through
// withActivity in ipc.ts, so they are 'import' rows with a clear label
// ("Fetching achievements"). Adding a kind nothing creates would be a lie the
// guard test catches.

// 'pausing' and 'cancelling' are not decoration: a loop job only checks its
// gate between items, so a pause requested mid-title can take as long as one
// fetchWithRetry timeout to bite. Showing 'paused' immediately would be a lie.
// A SIGSTOPped child process goes straight to 'paused'.
export type TaskState =
  | 'running'
  | 'pausing'
  | 'paused'
  | 'cancelling'
  | 'done'
  | 'cancelled'
  | 'error'

export interface TaskSnapshot {
  id: string // `${kind}-${n}`, never reused within a process
  kind: TaskKind
  label: string // "Importing from AniList"
  detail: string | null // current title / phase / file
  state: TaskState
  percent: number | null // 0..100; null = indeterminate
  done: number
  total: number
  startedAt: number // epoch ms
  endedAt: number | null
  // Computed in main and PAUSE-AWARE (time spent paused is excluded), so the
  // renderer never runs a clock of its own.
  elapsedSec: number
  error: string | null
  canCancel: boolean
  // False omits the control; the full Tasks page renders pauseNote as readable
  // copy so unsupported pause is not communicated only through a tooltip.
  canPause: boolean
  pauseNote: string | null
  route: string | null // renderer hash route to the owning surface
}

export type LibraryExportSection = MediaType | 'wrestling'
export type LibraryExportFormat = 'folder' | 'zip'

export interface LibraryExportOptions {
  sections: LibraryExportSection[]
  includeAssets: boolean
  includeThemeAudio: boolean
  includeSpotifyPlaylists: boolean
  includeProgress: boolean
  includeRatings: boolean
  includeLists: boolean
  format: LibraryExportFormat
}

export interface LibraryExportPreview {
  sectionCounts: Record<LibraryExportSection, number>
  selectedCount: number
  spotifyPlaylistCount: number
  assetFileCount: number
  estimatedBytes: number
  missingAssetCount: number
}

export type LibraryExportPhase =
  | 'idle'
  | 'choosing'
  | 'snapshotting'
  | 'sanitizing'
  | 'copying'
  | 'packing'
  | 'finalizing'
  | 'done'
  | 'cancelled'
  | 'error'

export interface LibraryExportStatus {
  id: string | null
  running: boolean
  phase: LibraryExportPhase
  message: string | null
  done: number
  total: number
  percent: number | null
  outputPath: string | null
  error: string | null
  missingAssetCount: number
}

export interface LibraryExportStartResult {
  started: boolean
  id: string | null
}

// ---- Structured logs ----
// The app writes no console output by design (tests/noConsole.test.ts locks
// that). Everything worth reading goes through src/main/logBus.ts into a
// bounded in-memory ring AND a rolling file under userData/logs/, and the
// renderer reads it with a cursor — there is no push channel.
export type LogLevel = 'debug' | 'info' | 'warn' | 'error'

// Closed union, guarded by tests/logSourceSync.test.ts. Per-task filtering is
// by taskId, NOT by adding a source per subsystem — that's what keeps this
// list short enough to render as filter chips.
//   app   startup, quit, unhandled rejections
//   db    migrations that genuinely ALTERed something
//   http  fetch retries, rate-limit waits, final failures
//   task  task registry lifecycle (started / finished / cancelled / failed)
//   proc  child-process output (yt-dlp, ffmpeg, mokuro)
//   ipc   an IPC handler threw
export type LogSource = 'app' | 'db' | 'http' | 'task' | 'proc' | 'ipc'

export interface LogEntry {
  // Strictly increasing, never reused — the renderer holds it as a cursor, so
  // an index-based id would rewind every time the ring wrapped.
  seq: number
  ts: number // epoch ms
  level: LogLevel
  source: LogSource
  taskId: string | null
  message: string // already redacted at ingest
}

// Cursor read, generalising the offset paging jackett.searchStatus already
// uses. Omit afterSeq to SEED: main answers with the newest `limit` entries
// rather than the oldest, so a freshly-opened viewer is instantly current.
export interface LogTailRequest {
  afterSeq?: number
  taskId?: string
  minLevel?: LogLevel
  limit?: number // default 500, clamped to 2000
}

export interface LogPage {
  entries: LogEntry[] // oldest-first; the renderer reverses for display
  nextSeq: number // pass back as afterSeq
  oldestSeq: number
  // Entries evicted from the ring before this cursor could read them, so a gap
  // in the viewer is never silent.
  dropped: number
}

// ---- In-app updates ----
// Why a build can't self-update. Kept as one value (not scattered ifs) so the
// decision is pure and testable; 'ok' means updating is available here.
//   dev      — not packaged; electron-updater has no app-update.yml to read
//   portable — the Windows portable .exe target is unsupported by design
//   no-token — the repo is private, so a github.token setting is required
export type UpdateEnvironment = 'ok' | 'dev' | 'portable' | 'no-token'

// electron-updater is EventEmitter-based, but this app has no push channel, so
// src/main/updater.ts collapses its events into this ONE object that the
// renderer polls via `update:status`. Terminal states (upToDate/ready/error)
// persist until the next check, which is what lets the renderer stop polling
// and still render the outcome. `environment` is orthogonal to `state`: a dev
// build is 'idle' + 'dev', never a special state.
export interface UpdateStatus {
  id: string
  state: 'idle' | 'checking' | 'available' | 'downloading' | 'ready' | 'upToDate' | 'error'
  currentVersion: string
  environment: UpdateEnvironment
  percent: number | null
  version: string | null // the release being offered / downloaded
  message: string | null // error text, or why this build can't update
}

// Result of the Settings "Save & test" button — resolves rather than rejecting
// so the card can render it inline (mirrors TorrentServiceTestResult).
export interface UpdateTestResult {
  ok: boolean
  message: string
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

// Japanese-roadmap immersion milestones, counted from the real library.
// "Completed" resolves positionally from the user's status settings (index 1),
// so renamed statuses keep working. Novels = manga-type items backed by an
// EPUB chapter (light novels read in the book reader); everything else
// manga-type counts as manga.
export interface JpMilestones {
  animeCompleted: number
  mangaCompleted: number
  novelsCompleted: number
}

// ---- Gacha tracker ----
// Standalone section for live-service gacha games. The game list and each
// game's unit kinds / currencies / display labels live in src/shared/gacha.ts;
// these are the DB row shapes (tables are game-agnostic).

export type GachaGameId = 'hsr' | 'fgo' | 'e7' | 'wuwa'

export interface GachaUnit {
  id: number
  game: GachaGameId
  kind: string // keys into the game's unitKinds config (frozen vocabulary)
  name: string
  rarity: number | null
  element: string | null // facet 1; labeled (or hidden) per kind config
  role: string | null // facet 2 (Path / Class / weapon type)
  imagePath: string | null
  owned: boolean
  favorite: boolean
  level: number | null
  // Extra copies consumed, 0-based (HSR eidolon, FGO NP-1, E7 imprint, WuWa
  // sequence). Display formatting comes from the kind config, never the DB.
  dupes: number
  obtainedAt: string | null
  notes: string | null
  data: Record<string, unknown> | null // per-game detail-phase payload
  externalSource: string | null // future catalog importers
  externalId: string | null
  createdAt: string
  updatedAt: string
}

export interface GachaBuild {
  id: number
  unitId: number
  name: string
  sortOrder: number
  data: Record<string, unknown> | null // freeform now; detail phases structure it
  notes: string | null
  createdAt: string
  updatedAt: string
}

export interface GachaUnitDetail extends GachaUnit {
  builds: GachaBuild[]
}

export interface GachaUnitInput {
  game: GachaGameId
  kind: string
  name: string
  rarity?: number | null
  element?: string | null
  role?: string | null
  imagePath?: string | null
  owned?: boolean
  favorite?: boolean
  level?: number | null
  dupes?: number
  obtainedAt?: string | null
  notes?: string | null
  data?: Record<string, unknown> | null
}

export interface GachaUnitFilter {
  kind?: string
  search?: string
  ownedOnly?: boolean
}

export interface GachaBuildInput {
  name: string
  data?: Record<string, unknown> | null
  notes?: string | null
}

export interface GachaCurrency {
  game: GachaGameId
  key: string // keys into the game's currencies config
  amount: number
  updatedAt: string
}

export interface GachaBanner {
  id: number
  game: GachaGameId
  name: string
  kind: string | null
  featured: string | null // display string; a link table may replace it later
  startAt: string | null // 'YYYY-MM-DD'; null while unannounced
  endAt: string | null // null = open-ended
  imagePath: string | null
  notes: string | null
  externalSource: string | null // future banner fetchers
  externalId: string | null
  createdAt: string
  updatedAt: string
}

export interface GachaBannerInput {
  game: GachaGameId
  name: string
  kind?: string | null
  featured?: string | null
  startAt?: string | null
  endAt?: string | null
  imagePath?: string | null
  notes?: string | null
}

export interface GachaNewsItem {
  id: number
  game: GachaGameId
  title: string
  url: string | null
  summary: string | null
  // Remote https thumbnail rendered directly (CSP img-src allows https:);
  // never downloaded — news is ephemeral.
  imageUrl: string | null
  publishedAt: string | null
  author: string | null // reddit username (no u/ prefix)
  externalId: string // fetchers always supply one (post id) for the upsert
  fetchedAt: string
}

export type GachaNewsUpsert = Omit<GachaNewsItem, 'id' | 'game' | 'fetchedAt'>

export interface GachaNewsPage {
  fetchedAt: string | null // last successful fetch; null before the first
  items: GachaNewsItem[]
}

export interface GachaNewsFetchResult {
  added: number
  total: number
}

// Result of a catalog import (toast copy). imagesFailed counts faces that
// failed to download — those rows keep any prior image_path.
export interface GachaCatalogImportResult {
  total: number
  created: number
  updated: number
  imagesFailed: number
}

// Result of an app-backup ownership import (Chaldea). unmatched = backup
// entries with no catalog row (e.g. JP-only units against the NA catalog).
export interface GachaBackupImportResult {
  servants: number
  craftEssences: number
  unmatched: number
}

// One ownership change from an app backup, keyed to a catalog row by
// (kind, externalId). dataMerge is shallow-merged over the row's existing data.
export interface GachaOwnershipPatch {
  kind: string
  externalId: string
  dupes: number
  level?: number | null
  dataMerge?: Record<string, unknown>
}

// Hub page card data, one per configured game.
export interface GachaGameOverview {
  game: GachaGameId
  unitCount: number // owned roster entries across all kinds
  currencies: GachaCurrency[]
  activeBanners: number
  imagePath: string | null // user-set hero art (gacha_meta 'image')
}

// ---- Gacha coach (FGO LLM coaching chat) ----
// The coach can act in the app via tools; every LLM call is user-triggered
// (send / import). Reminders (goals/tasks) render from the DB with no API call.

export interface GachaChatAction {
  tool: string // e.g. 'add_unit'
  label: string // e.g. 'Added Mash — 4★ Shielder'
}

export interface GachaChatMessage {
  id: number
  threadId: number
  role: 'user' | 'assistant'
  text: string
  // The tool-action chips shown under this message (assistant turns only).
  actions: GachaChatAction[]
  // media/ relative paths of screenshots the user attached (display only).
  attachments: string[]
  usageIn: number | null
  usageOut: number | null
  createdAt: string
}

export interface GachaChatThread {
  id: number
  game: GachaGameId
  title: string | null
  archivedAt: string | null
  createdAt: string
  updatedAt: string
}

// The current (or just-finished) coach turn, polled by the renderer — no push
// IPC. phase is 'thinking' | 'writing' | 'tool:<name>'.
export interface GachaCoachStatus {
  turnId: number
  threadId: number
  game: GachaGameId
  running: boolean
  phase: string
  partialText: string
  actions: GachaChatAction[]
  error: string | null
  startedAt: string
}

export interface GachaGoal {
  id: number
  game: GachaGameId
  kind: 'goal' | 'task'
  title: string
  notes: string | null
  status: 'active' | 'done' | 'dropped'
  dueAt: string | null // 'YYYY-MM-DD'
  recur: 'daily' | 'weekly' | null
  createdBy: 'user' | 'coach'
  doneAt: string | null
  sortOrder: number
  createdAt: string
  updatedAt: string
}

export interface GachaGoalInput {
  kind?: 'goal' | 'task'
  title: string
  notes?: string | null
  dueAt?: string | null
  recur?: 'daily' | 'weekly' | null
  createdBy?: 'user' | 'coach'
}

export interface GachaCoachNote {
  id: number
  game: GachaGameId
  content: string
  createdBy: 'user' | 'coach'
  createdAt: string
  updatedAt: string
}

export interface GachaCoachDoc {
  id: number
  game: GachaGameId
  title: string
  content: string
  summary: string | null
  createdAt: string
}

export type GachaCoachDueCounts = Partial<Record<GachaGameId, number>>

// ---- Torrents (Jackett search + qBittorrent hand-off) ----

export interface TorrentSearchResult {
  id: string // Guid ?? Link ?? Title — stable row key for React + pending map
  title: string
  tracker: string // Jackett indexer display name
  category: string | null // CategoryDesc, e.g. "TV/Anime"
  sizeBytes: number | null
  seeders: number | null
  peers: number | null
  grabs: number | null
  publishDate: string | null // ISO string as Jackett sends it
  magnetUri: string | null
  link: string | null // Jackett-proxied .torrent download URL
  detailsUrl: string | null // tracker page — opened via app.openExternal
}

export interface TorrentSearchResponse {
  results: TorrentSearchResult[]
  indexerErrors: string[] // "IndexerName: message" — partial failures, non-fatal
}

export interface TorrentAddInput {
  magnetUri: string | null
  link: string | null
}

export interface TorrentServiceTestResult {
  ok: boolean
  message: string // "qBittorrent v5.0.2" / "Invalid API key" / "Can't reach …"
}

// "Start Jackett" button: was it already up, did we have to start it, and how
// did that go. `running` is the only thing the UI gates on.
export interface JackettEnsureResult {
  running: boolean
  started: boolean // true when this call ran the start command
  message: string
}

// Progressive search: one job fans out across every configured indexer and the
// renderer polls this while `running`. `results` holds ONLY the rows after the
// offset the poller asked for — a full library search returns >1000 rows and
// re-sending them every 400ms would be wasteful.
export interface TorrentSearchStatus {
  id: string
  query: string
  running: boolean
  indexerTotal: number
  indexerDone: number
  totalResults: number
  results: TorrentSearchResult[]
  errors: string[]
}

// Client-side narrowing of accumulated results. null/empty = unconstrained,
// matching the MediaListFilter convention.
export interface TorrentFilter {
  text: string // all whitespace-separated words must appear in the title
  exclude: string // any of these words disqualifies a row
  minSeeders: number | null
  minBytes: number | null
  maxBytes: number | null
  trackers: string[] // [] = every tracker
}

// ---- Daily / weekly checklist ----
// The catalog of possible items is code (src/shared/checklist.ts); these types
// describe one hydrated board. Every date here is a LOCAL 'YYYY-MM-DD' string
// computed in the main process — the renderer only formats them, it never
// derives "today" itself.

export type ChecklistCadence = 'daily' | 'weekly'

// mediaLog: the checklist performs the tracking action (log an episode/film).
// detected: completion is read from existing activity tables (SRS, quizzes…),
//   and can also be credited by hand when the activity happened outside the app.
// manual: a plain tick, nothing to detect.
export type ChecklistKind = 'mediaLog' | 'detected' | 'manual'

// What one progress log did, so the caller can say "rewatch #3 started" instead
// of silently resetting a finished title's progress to 1.
export interface MediaProgressLogged {
  logId: number | null // null when no checklist item covers this media type
  title: string
  startedRewatch: boolean
  rewatchCount: number
  progress: number
  status: string | null
}

// One logged event in the current period. `title` falls back to the snapshot
// cached in the log payload when the media row has since been deleted.
export interface ChecklistLogEntry {
  id: number
  mediaId: number | null
  title: string | null
  createdAt: string
}

// One enabled board row, fully hydrated: def facts are re-sent so the page can
// render straight from this payload.
export interface ChecklistTaskStatus {
  id: number // checklist_task.id — the remove target
  key: string
  cadence: ChecklistCadence
  label: string
  kind: ChecklistKind
  route: string | null // detected: where clicking the row goes
  mediaType: MediaType | null // mediaLog: which picker to open
  target: number // the board's override, or the def's default
  defaultTarget: number // what "reset" goes back to
  detected: number // the auto-counted part of `progress` (0 for other kinds)
  progress: number // detected + logged, within the current period
  done: boolean
  entries: ChecklistLogEntry[] // logged episodes / ticks / hand-added credits
}

export interface ChecklistStatus {
  today: string
  week: { start: string; end: string } // Saturday..Friday
  daily: ChecklistTaskStatus[]
  weekly: ChecklistTaskStatus[]
  streak: { current: number; longest: number } // fully-complete daily boards
  history: { day: string; count: number }[] // dailies completed per day
}

// ---- English dictionary (/english: dictionaryapi.dev lookup + saved words) ----

export interface EnDictDef {
  definition: string
  example: string | null
  synonyms: string[]
}

export interface EnDictMeaning {
  partOfSpeech: string
  definitions: EnDictDef[]
  synonyms: string[] // meaning-level synonyms (beyond the per-definition ones)
}

export interface EnDictEntry {
  word: string
  phonetic: string | null // IPA, e.g. /ˈsʌn.sɛt/
  meanings: EnDictMeaning[]
  source: 'offline' | 'online' // offline = installed WordNet, online = dictionaryapi.dev
}

// The installed offline English dictionary (WordNet + CMUdict), or null when
// lookups still go online. Mirrors SentenceBankInfo.
export interface EnglishDictInfo {
  source: string // 'wordnet'
  version: string | null
  lemmaCount: number
  synsetCount: number
  pronCount: number
  importedAt: string
}

export interface EnWordInput {
  word: string
  phonetic?: string | null
  pos?: string | null
  meaning: string
  example?: string | null
}

export interface EnWord {
  id: number
  word: string
  phonetic: string | null
  pos: string | null
  meaning: string
  example: string | null
  createdAt: string
  // SRS state — every saved word is a card in the /english/review deck.
  status: SrsStatus
  learningStep: number
  dueAt: string | null
  intervalDays: number
  ease: number
  reps: number
  lapses: number
  lastReviewedAt: string | null
}

// Deck page row: the saved word plus its frequency rank (null without the
// frequency pack, or for phrases/proper nouns the pack does not list).
export interface EnDeckWord extends EnWord {
  rank: number | null
}

export interface EnReviewQueue {
  due: EnWord[]
  fresh: EnWord[] // 'new' cards, oldest saves first
}

export interface EnReviewOutcome {
  wordId: number
  status: SrsStatus
  intervalDays: number
  dueAt: string
}

export interface EnSrsStats {
  dueCount: number
  newCount: number
  totalCount: number
  reviewedToday: number // distinct words reviewed today (local)
}

// ---- English tests (/english/vocab, /english/spelling) ----
// Pools built in main (src/main/englishDrills.ts) from the WordNet +
// frequency packs in dictionaries.db, or from the user's saved words.

export type EnBand = 'upper' | 'advanced' | 'rare'
export type EnVocabMode = 'word2def' | 'def2word' | 'synonyms'
export type EnPoolSource = { kind: 'band'; band: EnBand } | { kind: 'myWords' }

export interface EnVocabPoolRequest {
  mode: EnVocabMode
  source: EnPoolSource
  limit: number
}

// One ready question; the renderer shuffles answer + distractors into options.
export interface EnVocabQuestion {
  word: string
  pos: string | null
  def: string
  ipa: string | null
  rank: number | null // frequency rank (null for myWords)
  prompt: string
  answer: string
  distractors: string[] // exactly 3
}

export interface EnSpellingPoolRequest {
  source: EnPoolSource
  limit: number
}

export interface EnSpellingItem {
  word: string
  def: string
  ipa: string | null
  pos: string | null
  rank: number | null
}

// The installed English frequency pack (OpenSubtitles ranks), or null.
export interface EnFreqInfo {
  source: string // 'opensubtitles'
  revision: string | null
  wordCount: number
  importedAt: string
}

// ---- English writing practice (/english/writing) ----

export interface EnWritingCorrection {
  before: string
  after: string
  why: string
  // Constrained to the six EnMechanicsCategory keys so the error log is a
  // tally over a controlled vocabulary rather than a keyword-match guess.
  // null when the model returned something outside the set.
  category: string | null
}

// Tally of graded writing corrections by mechanics category — "your last 20
// submissions: 14 comma splices, 9 article slips".
export interface EnErrorTally {
  submissions: number
  corrections: number
  byCategory: { category: string; count: number }[]
}

export interface EnWritingFeedback {
  // null = the model returned nothing usable for that dimension. Reported as
  // "—" rather than 0, and excluded from the row's mean: a missing score is
  // not a bad score, and it must not cost the learner their graded essay.
  scores: {
    grammar: number | null // 0-10
    vocabulary: number | null
    coherence: number | null
    register: number | null
  }
  corrections: EnWritingCorrection[]
  modelRewrite: string
  overall: string
}

export interface EnWritingEntry {
  id: number
  promptKey: string
  promptTitle: string
  submission: string
  feedback: EnWritingFeedback
  score: number | null // mean of the four rubric scores
  createdAt: string
}

// ---- Programming learn section (/programming) ----
// Content lives in src/shared/programming/; the DB only stores completion.

export interface ProgLessonProgress {
  lessonKey: string // FROZEN '<courseKey>/<lessonKey>'
  completedAt: string
}

// One finished lesson self-check (every question answered). Append-only.
export interface ProgAttempt {
  lessonKey: string
  score: number
  total: number
  at: string
}

// The CLI drill's weak-command memory, keyed by cheatsheet entry.
export interface ProgCliMiss {
  cmdKey: string // FROZEN '<sheetKey>/<answers[0]>'
  misses: number
  lastAt: string
}
export interface ProgCliRoundInput {
  missed: string[] // cmd keys missed at least once this round
  correct: string[] // cmd keys answered right first try
}

// Solved sandbox exercises / golf puzzles. `kind` values are FROZEN.
export type ProgSolveKind = 'sql' | 'regex'
export interface ProgSolve {
  kind: ProgSolveKind
  key: string
  best: number | null // regex: shortest pattern length; sql: null
  answer: string | null // the winning pattern / the accepted SQL
  solvedAt: string
}
export interface ProgSolveInput {
  kind: ProgSolveKind
  key: string
  best?: number | null
  answer?: string | null
}

// The SQL sandbox: one query against the seeded in-memory dataset.
export interface SqlRunInput {
  exerciseKey: string
  sql: string
}
export type SqlCell = string | number | null
export interface SqlTable {
  columns: string[]
  rows: SqlCell[][]
  truncated: boolean
}
export type SqlMismatch = 'columns' | 'rowCount' | 'rows' | 'order' | null
export interface SqlRunResult extends SqlTable {
  ms: number
  correct: boolean
  mismatch: SqlMismatch
  expectedColumns: string[]
  error: string | null // validation / SQL error / timeout — rows empty when set
}

// ---- Wrestling section (/wrestling) ----
// A Wikipedia-sourced wiki (events / matches / wrestlers / stables) plus a
// local collection of video files attached per event. Promotion vocabulary is
// code — src/shared/wrestling.ts; the tables are promotion-agnostic.

export type WrestlingPromotionId = 'wwe' | 'wcw' | 'ecw' | 'tna' | 'roh' | 'njpw' | 'aew'

// How a match ended. 'decision' covers every match with a winning side (pin,
// submission, DQ, countout, rumble); the distinction the wiki actually needs is
// "is there a winner", and the prose in `resultText` keeps the detail.
export type WrestlingOutcome = 'decision' | 'draw' | 'nocontest' | 'unknown'

// Where a match sat on the card. null = main card; the values mirror the
// results template's noteN= markers.
export type WrestlingCardSlot = 'pre' | 'dark' | null

export interface WrestlingEvent {
  id: number
  promotion: WrestlingPromotionId
  name: string
  wikiTitle: string | null // canonical article title — the dedup key
  series: string | null
  eventDate: string | null // ISO yyyy-mm-dd
  venue: string | null
  city: string | null
  attendance: number | null
  buyrate: string | null
  tagline: string | null
  posterPath: string | null
  // Cleaned lead prose as MARKDOWN, with wikilinks normalized to
  // [label](wiki:Target_Title) at import. That form already parses with the
  // existing shared/markdown.ts alternation, so only the renderer's link
  // resolver is new. Targets MUST be underscored — parseInline's href class is
  // [^)\s]+, so a space silently degrades the link to plain text.
  lead: string | null
  localDir: string | null // attached folder, relative to the wrestling root
  favorite: boolean
  matchCount: number
  videoCount: number
}

export interface WrestlingParticipant {
  wrestlerId: number
  name: string
  side: number // 0 = winning side when the match had one
  won: boolean
  isChampion: boolean // the (c) marker
  teamName: string | null
  sortOrder: number
}

export interface WrestlingMatch {
  id: number
  // null = a LOOSE match: a standalone rip with no PPV behind it, which names
  // its own show and date instead.
  eventId: number | null
  showLabel: string | null
  matchDate: string | null
  sortOrder: number
  title: string // denormalized "X vs. Y" — lists, search, and list_item display
  resultText: string | null // original results cell, markup stripped
  stipulation: string | null
  championship: string | null
  durationSeconds: number | null
  outcome: WrestlingOutcome
  method: string | null // "pinfall", "submission", … null when the cell didn't say
  cardSlot: WrestlingCardSlot
  cardLabel: string | null // the results table's |caption ("Night 1")
  rating: number | null // personal 0-5 stars; null = unrated
  favorite: boolean
  videoId: number | null
  participants: WrestlingParticipant[]
}

export interface WrestlingWrestler {
  id: number
  name: string
  wikiTitle: string | null
  realName: string | null
  birthDate: string | null
  debutYear: number | null
  billedFrom: string | null
  height: string | null
  photoPath: string | null
  bio: string | null
  detailFetchedAt: string | null // null = stub created from a link, never fetched
  favorite: boolean
  matchCount: number
}

// One organisation's worth of honours, as the article groups them.
export interface WrestlingHonourGroup {
  org: string
  items: string[]
}

// A wrestler's win/loss record over the matches we hold. Draws and no-contests
// count in neither column, which is why they are reported separately.
export interface WrestlingRecord {
  wins: number
  losses: number
  draws: number
  total: number
}

export interface WrestlingWrestlerDetail extends WrestlingWrestler {
  honours: WrestlingHonourGroup[]
  record: WrestlingRecord
  championships: string[] // distinct titles held in matches they won
}

export interface WrestlingStable {
  id: number
  name: string
  wikiTitle: string | null
  promotion: WrestlingPromotionId | null
  lead: string | null
  imagePath: string | null
  favorite: boolean
  members: { wrestlerId: number; name: string; sortOrder: number }[]
}

// A local video attached to an event. Mirrors VideoFile's shape minus the
// media/season fields; playback goes through the shared video pipeline.
export interface WrestlingVideo {
  id: number
  eventId: number | null
  filePath: string // relative to the wrestling root
  title: string
  number: number | null
  sortOrder: number
  duration: number | null
  width: number | null
  height: number | null
  videoCodec: string | null
  audioCodec: string | null
  container: string | null
  playability: VideoPlanAction | null
  resumeSeconds: number | null
  // Set automatically when a file plays to the end. Deliberately has NO toggle
  // in the UI (the user asked for no watched-marks) — it exists to drive the
  // event page's "continue where you left off" row.
  watchedAt: string | null
}

export interface WrestlingEventDetail extends WrestlingEvent {
  matches: WrestlingMatch[]
  videos: WrestlingVideo[]
}

// A match carrying its event's identity — the cross-event browse rows
// (a wrestler's career, the top-rated list).
export interface WrestlingMatchWithEvent extends WrestlingMatch {
  eventName: string
  eventDate: string | null
}

export type WrestlingFavoriteKind = 'event' | 'match' | 'wrestler' | 'stable'

// Wikipedia's two chronologies, derived from the library rather than from the
// article's own lastevent/nextevent links so a neighbour is never a dead link
// to an event that was never imported.
export interface WrestlingNeighbour {
  id: number
  name: string
  eventDate: string | null
}

export interface WrestlingChronology {
  prev: WrestlingNeighbour | null // previous show this promotion ran
  next: WrestlingNeighbour | null
  seriesName: string | null // "WrestleMania", "Starrcade"
  seriesPrev: WrestlingNeighbour | null // the same show, a year earlier
  seriesNext: WrestlingNeighbour | null
}

// One resolved wiki link. Lead prose carries [label](wiki:Target_Title); this
// says whether that target is something we actually hold, so the renderer can
// link it or grey it out (the RelatedSection resolved-vs-greyed precedent).
// Shaped as the generic form an app-wide wiki would reuse unchanged.
export interface WrestlingLinkTarget {
  title: string // the wiki: target, underscored, exactly as it appeared
  kind: 'event' | 'wrestler' | null // null = we don't have it
  id: number | null
}

export interface WrestlingOverview {
  promotions: {
    promotion: WrestlingPromotionId
    eventCount: number
    firstYear: number | null
    lastYear: number | null
    ownedCount: number // events with at least one attached local file
  }[]
  totals: { events: number; matches: number; wrestlers: number; rated: number }
}

// Creating/editing a loose match: the file is picked in main, the rest is
// what the user types.
export interface WrestlingLooseMatchInput {
  title: string
  showLabel?: string | null
  matchDate?: string | null
  stipulation?: string | null
  wrestlerIds?: number[] // side 0 first; winner is whoever `winnerIds` names
  winnerIds?: number[]
}

export interface WrestlingEventFilter {
  promotion?: WrestlingPromotionId | null
  search?: string | null
  yearFrom?: number | null
  yearTo?: number | null
  favoriteOnly?: boolean
  ownedOnly?: boolean // has at least one attached video
  sort?: 'date' | 'dateAsc' | 'name' | 'rating'
  limit?: number
  offset?: number
}

// Import runner status — the musicDownload/bulkImport singleton shape, polled
// via wrestling:importStatus (there is no push channel).
export interface WrestlingImportStatus {
  id: number
  state: 'idle' | 'running' | 'done' | 'error' | 'cancelled'
  phase: 'enumerating' | 'fetching' | 'writing' | 'wrestlers'
  promotion: WrestlingPromotionId | null
  done: number
  total: number
  events: number
  matches: number
  wrestlers: number
  failed: number
  message: string | null
}

// ---- player bridge (OS media controls + pop-out widget) ----

// What a remote surface (widget pill, Windows thumbbar) may ask the main
// window's player to do. Tagged rather than a bare string union so the one
// verb that carries a value can't be sent without it. Seek stays in-app.
export type PlayerCommand =
  | { kind: 'toggle' }
  | { kind: 'next' }
  | { kind: 'previous' }
  | { kind: 'volume'; value: number } // 0..1

// Compact now-playing state the main window publishes for remote surfaces.
// Deliberately position-free: the pill has no scrubber, so track changes are
// the only IPC traffic. Metadata here is ALREADY display-masked (quiz- tracks
// arrive as "Song Quiz" with no artist/cover — see lib/playerMeta.ts).
export interface PlayerSnapshot {
  trackId: string
  title: string
  artist: string
  coverPath: string | null // navimg-relative; null when masked or coverless
  isPlaying: boolean
  hasNext: boolean
  hasPrev: boolean
  volume: number // 0..1, mirrors the in-app slider
}
