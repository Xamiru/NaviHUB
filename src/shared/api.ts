// The typed surface exposed on window.api. Both preload (which implements the
// bridge) and the renderer (which consumes it) import this so they never drift.

import type {
  MediaItem,
  MediaType,
  MediaItemInput,
  MediaListFilter,
  MediaDetail,
  Person,
  PersonCredit,
  Company,
  Character,
  Tag,
  SettingsMap,
  CastEntry,
  CharacterAppearance,
  CreditRole,
  GlobalSearchResults,
  ImportSearchResult,
  ImportSummary,
  ThemeImportSummary,
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
  JishoResult,
  JpQuizItem,
  JpQuizScope,
  JpReviewOutcome,
  JpReviewQueue,
  JpStats,
  SrsGrade,
  MangaAttachResult,
  MangaLibrary,
  MangaPages,
  ChapterOcrStatus,
  MokuroPageOcr,
  JpToken
} from './types'

export interface NaviApi {
  media: {
    list(filter: MediaListFilter): Promise<MediaItem[]>
    get(id: number): Promise<MediaDetail | null>
    create(input: MediaItemInput): Promise<number>
    update(id: number, input: Partial<MediaItemInput>): Promise<void>
    remove(id: number): Promise<void>
    removeCharacter(mediaId: number, characterId: number): Promise<void>
    setStatusCounts(mediaType: string): Promise<Record<string, number>>
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
    // Vocab mining: find-or-create the capture course/lesson, and dictionary
    // lookups via jisho.org (empty array on any failure — never throws).
    ensureMiningInbox(): Promise<JpMiningInbox>
    jishoLookup(term: string): Promise<JishoResult[]>
    // Morphological analysis (kuromoji) of an OCR'd text block; [] on failure
    // so callers fall back to manual selection.
    tokenize(text: string): Promise<JpToken[]>
    // Which of the given card fronts already exist anywhere in jp_card — the
    // reader marks them as already-mined.
    minedFronts(fronts: string[]): Promise<string[]>
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
