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
  startedAt: string | null
  finishedAt: string | null
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
  startedAt?: string | null
  finishedAt?: string | null
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

export interface MediaDetail extends MediaItem {
  tags: Tag[]
  companies: MediaCompanyLink[]
  cast: CastEntry[] // still used for staff (non voice-actor credits)
  characters: MediaCharacterEntry[] // the character-centric cast list
  themes: ThemeSong[] // anime OP/ED songs (empty for other types)
}

// Result of importing an anime's theme songs from AnimeThemes.moe.
export interface ThemeImportSummary {
  mediaId: number
  songs: number
  artists: number
  audioDownloaded: number
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
