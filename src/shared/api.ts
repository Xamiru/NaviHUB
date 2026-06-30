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
  ThemeImportSummary
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
  themes: {
    // Fetch an anime's OP/ED songs (+ audio + artists) from AnimeThemes.
    import(mediaId: number): Promise<ThemeImportSummary>
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
