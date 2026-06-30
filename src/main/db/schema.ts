import { sql } from 'drizzle-orm'
import { sqliteTable, text, integer, real, index, unique } from 'drizzle-orm/sqlite-core'

// ---------------------------------------------------------------------------
// media_item — any tracked work (anime now; VN/game/movie/tv ready).
// Canonical fields + personal tracking are merged for a single-user app.
// ---------------------------------------------------------------------------
export const mediaItem = sqliteTable(
  'media_item',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaType: text('media_type').notNull(),
    title: text('title').notNull(),
    titleOriginal: text('title_original'),
    synopsis: text('synopsis'),
    coverPath: text('cover_path'),
    releaseDate: text('release_date'),
    totalUnits: integer('total_units'),
    // personal tracking
    status: text('status'),
    score: real('score'),
    progress: integer('progress').notNull().default(0),
    startedAt: text('started_at'),
    finishedAt: text('finished_at'),
    rewatchCount: integer('rewatch_count').notNull().default(0),
    notes: text('notes'),
    favorite: integer('favorite', { mode: 'boolean' }).notNull().default(false),
    // extensibility / future AniList import
    metadata: text('metadata', { mode: 'json' }),
    externalSource: text('external_source'),
    externalId: text('external_id'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byType: index('idx_media_type').on(t.mediaType),
    byExternal: index('idx_media_external').on(t.externalSource, t.externalId)
  })
)

// ---------------------------------------------------------------------------
// person — voice actors, directors, authors, actors…
// ---------------------------------------------------------------------------
export const person = sqliteTable(
  'person',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    nameNative: text('name_native'),
    photoPath: text('photo_path'),
    bio: text('bio'),
    birthday: text('birthday'),
    externalSource: text('external_source'),
    externalId: text('external_id')
  },
  (t) => ({ byName: index('idx_person_name').on(t.name) })
)

// ---------------------------------------------------------------------------
// company — studios / publishers / developers
// ---------------------------------------------------------------------------
export const company = sqliteTable(
  'company',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    nameNative: text('name_native'),
    type: text('type').notNull().default('studio'),
    logoPath: text('logo_path'),
    externalSource: text('external_source'),
    externalId: text('external_id')
  },
  (t) => ({ byName: index('idx_company_name').on(t.name) })
)

// ---------------------------------------------------------------------------
// character
// ---------------------------------------------------------------------------
export const character = sqliteTable(
  'character',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    nameNative: text('name_native'),
    imagePath: text('image_path'),
    description: text('description'),
    externalSource: text('external_source'),
    externalId: text('external_id')
  },
  (t) => ({ byName: index('idx_character_name').on(t.name) })
)

// ---------------------------------------------------------------------------
// credit ⭐ — links person -> media (optionally via character).
// This single table powers the voice-actor -> anime graph.
// ---------------------------------------------------------------------------
export const credit = sqliteTable(
  'credit',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    personId: integer('person_id')
      .notNull()
      .references(() => person.id, { onDelete: 'cascade' }),
    characterId: integer('character_id').references(() => character.id, {
      onDelete: 'set null'
    }),
    role: text('role').notNull().default('voice_actor'),
    language: text('language'),
    // Character importance for this credit (0=main, 1=supporting, 2=background).
    importance: integer('importance')
  },
  (t) => ({
    byMedia: index('idx_credit_media').on(t.mediaId),
    byPerson: index('idx_credit_person').on(t.personId),
    byCharacter: index('idx_credit_character').on(t.characterId)
  })
)

// ---------------------------------------------------------------------------
// media_company — links media <-> company with a role
// ---------------------------------------------------------------------------
export const mediaCompany = sqliteTable(
  'media_company',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    companyId: integer('company_id')
      .notNull()
      .references(() => company.id, { onDelete: 'cascade' }),
    role: text('role').notNull().default('animation_studio')
  },
  (t) => ({
    byMedia: index('idx_mc_media').on(t.mediaId),
    byCompany: index('idx_mc_company').on(t.companyId),
    uniq: unique('uniq_media_company_role').on(t.mediaId, t.companyId, t.role)
  })
)

// ---------------------------------------------------------------------------
// media_character — links media <-> character
// ---------------------------------------------------------------------------
export const mediaCharacter = sqliteTable(
  'media_character',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    characterId: integer('character_id')
      .notNull()
      .references(() => character.id, { onDelete: 'cascade' }),
    // Position in the source's character list (AniList order); NULL for manual.
    sortOrder: integer('sort_order')
  },
  (t) => ({
    uniq: unique('uniq_media_character').on(t.mediaId, t.characterId)
  })
)

// ---------------------------------------------------------------------------
// tag + media_tag — many-to-many genres/themes/custom tags
// ---------------------------------------------------------------------------
export const tag = sqliteTable(
  'tag',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    category: text('category')
  },
  (t) => ({ uniqName: unique('uniq_tag_name').on(t.name) })
)

export const mediaTag = sqliteTable(
  'media_tag',
  {
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    tagId: integer('tag_id')
      .notNull()
      .references(() => tag.id, { onDelete: 'cascade' })
  },
  (t) => ({ uniq: unique('uniq_media_tag').on(t.mediaId, t.tagId) })
)

// ---------------------------------------------------------------------------
// theme_song — an anime's OP/ED songs (AnimeThemes.moe). audio_url is the remote
// .ogg; audio_path is the locally-downloaded copy (if any).
// ---------------------------------------------------------------------------
export const themeSong = sqliteTable(
  'theme_song',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    slug: text('slug'),
    type: text('type'),
    sequence: integer('sequence'),
    title: text('title'),
    audioUrl: text('audio_url'),
    audioPath: text('audio_path'),
    sortOrder: integer('sort_order'),
    externalSource: text('external_source'),
    externalId: text('external_id')
  },
  (t) => ({
    byMedia: index('idx_theme_media').on(t.mediaId),
    uniqExternal: unique('uniq_theme_external').on(t.externalSource, t.externalId)
  })
)

// ---------------------------------------------------------------------------
// theme_artist — the singer(s)/band(s) behind a theme song. Artists are person
// rows (external_source 'animethemes'), reusing the people browse/detail pages.
// ---------------------------------------------------------------------------
export const themeArtist = sqliteTable(
  'theme_artist',
  {
    themeSongId: integer('theme_song_id')
      .notNull()
      .references(() => themeSong.id, { onDelete: 'cascade' }),
    personId: integer('person_id')
      .notNull()
      .references(() => person.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order')
  },
  (t) => ({
    bySong: index('idx_theme_artist_song').on(t.themeSongId),
    byPerson: index('idx_theme_artist_person').on(t.personId),
    uniq: unique('uniq_theme_artist').on(t.themeSongId, t.personId)
  })
)

// ---------------------------------------------------------------------------
// settings — key/value for customization (statuses, score scale, theme…)
// ---------------------------------------------------------------------------
export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull()
})
