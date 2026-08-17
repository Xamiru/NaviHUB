import type { MediaItem, Person, Company, Character, Tag } from '@shared/types'

// SQLite returns snake_case rows with 0/1 for booleans and JSON-as-text.
// These mappers convert a raw row into the typed camelCase shape the UI uses.

/* eslint-disable @typescript-eslint/no-explicit-any */

// One corrupt metadata blob must not break every list/detail/search that maps
// the row — treat unparseable JSON as no metadata.
function safeParseMetadata(text: string): Record<string, unknown> | null {
  try {
    return JSON.parse(text)
  } catch {
    return null
  }
}

export function mapMedia(r: any): MediaItem {
  return {
    id: r.id,
    mediaType: r.media_type,
    title: r.title,
    titleOriginal: r.title_original ?? null,
    synopsis: r.synopsis ?? null,
    coverPath: r.cover_path ?? null,
    bannerPath: r.banner_path ?? null,
    releaseDate: r.release_date ?? null,
    totalUnits: r.total_units ?? null,
    status: r.status ?? null,
    score: r.score ?? null,
    progress: r.progress ?? 0,
    rewatchCount: r.rewatch_count ?? 0,
    notes: r.notes ?? null,
    favorite: !!r.favorite,
    metadata: r.metadata ? safeParseMetadata(r.metadata) : null,
    externalSource: r.external_source ?? null,
    externalId: r.external_id ?? null,
    createdAt: r.created_at,
    updatedAt: r.updated_at
  }
}

export function mapPerson(r: any): Person {
  return {
    id: r.id,
    name: r.name,
    nameNative: r.name_native ?? null,
    photoPath: r.photo_path ?? null,
    bio: r.bio ?? null,
    birthday: r.birthday ?? null,
    externalSource: r.external_source ?? null,
    externalId: r.external_id ?? null
  }
}

export function mapCompany(r: any): Company {
  return {
    id: r.id,
    name: r.name,
    nameNative: r.name_native ?? null,
    type: r.type,
    logoPath: r.logo_path ?? null,
    externalSource: r.external_source ?? null,
    externalId: r.external_id ?? null
  }
}

export function mapCharacter(r: any): Character {
  return {
    id: r.id,
    name: r.name,
    nameNative: r.name_native ?? null,
    imagePath: r.image_path ?? null,
    description: r.description ?? null
  }
}

export function mapTag(r: any): Tag {
  return { id: r.id, name: r.name, category: r.category ?? null }
}
