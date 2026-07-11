import { sql } from 'drizzle-orm'
import {
  sqliteTable,
  text,
  integer,
  real,
  index,
  unique,
  uniqueIndex,
  primaryKey
} from 'drizzle-orm/sqlite-core'

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
    // Universal "times consumed" counter (watched/read/played), per media type.
    rewatchCount: integer('rewatch_count').notNull().default(0),
    notes: text('notes'),
    favorite: integer('favorite', { mode: 'boolean' }).notNull().default(false),
    // extensibility / future AniList import
    metadata: text('metadata', { mode: 'json' }),
    externalSource: text('external_source'),
    externalId: text('external_id'),
    // Manga reader: attached series folder relative to the manga library root
    // (settings key manga.dir). Written only by src/main/manga.ts.
    localDir: text('local_dir'),
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
    // media_id is covered by the unique index; only character_id needs its own.
    byCharacter: index('idx_media_character_character').on(t.characterId),
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
  (t) => ({
    // media_id (and media_id+tag_id) is covered by the unique index; the reverse
    // tag_id browse needs its own.
    byTag: index('idx_media_tag_tag').on(t.tagId),
    uniq: unique('uniq_media_tag').on(t.mediaId, t.tagId)
  })
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
// media_image — wallpapers + fan art attached to a media item. Files live under
// pictures.dir (virtual "pictures/" prefix in file_path); rows are personal and
// stripped on library export. source_url is NULL for locally-picked files.
// ---------------------------------------------------------------------------
export const mediaImage = sqliteTable(
  'media_image',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    kind: text('kind').notNull(), // 'wallpaper' | 'fanart'
    filePath: text('file_path').notNull(),
    sourceUrl: text('source_url'),
    source: text('source'), // 'wallhaven' | 'tmdb' | 'url' | 'file'
    width: integer('width'),
    height: integer('height'),
    sortOrder: integer('sort_order'),
    createdAt: text('created_at').notNull()
  },
  (t) => ({
    byMedia: index('idx_media_image_media').on(t.mediaId, t.kind)
  })
)

// ---------------------------------------------------------------------------
// media_relation — links between titles (anime seasons, manga source, etc.),
// stored by the related work's AniList id so links resolve regardless of the
// order titles are imported; related_title powers the "not imported yet" hint.
// ---------------------------------------------------------------------------
export const mediaRelation = sqliteTable(
  'media_relation',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    relationType: text('relation_type').notNull(),
    relatedSource: text('related_source').notNull(),
    relatedExternalId: text('related_external_id').notNull(),
    relatedType: text('related_type'),
    relatedTitle: text('related_title'),
    sortOrder: integer('sort_order')
  },
  (t) => ({
    byMedia: index('idx_media_relation_media').on(t.mediaId),
    byRelated: index('idx_media_relation_related').on(t.relatedSource, t.relatedExternalId),
    uniq: unique('uniq_media_relation').on(t.mediaId, t.relatedSource, t.relatedExternalId)
  })
)

// ---------------------------------------------------------------------------
// settings — key/value for customization (statuses, score scale, theme…)
// ---------------------------------------------------------------------------
export const settings = sqliteTable('settings', {
  key: text('key').primaryKey(),
  value: text('value').notNull()
})

// ---------------------------------------------------------------------------
// list + list_item — user-curated ordered collections (Letterboxd-style).
// entity_kind is fixed per list; list_item.entity_id targets the kind's table
// (polymorphic, so no FK). ranked toggles visible numbering.
// ---------------------------------------------------------------------------
export const list = sqliteTable(
  'list',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    description: text('description'),
    entityKind: text('entity_kind').notNull(),
    ranked: integer('ranked').notNull().default(0),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({ byKind: index('idx_list_kind').on(t.entityKind) })
)

export const listItem = sqliteTable(
  'list_item',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    listId: integer('list_id')
      .notNull()
      .references(() => list.id, { onDelete: 'cascade' }),
    entityId: integer('entity_id').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    note: text('note'),
    addedAt: text('added_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byList: index('idx_list_item_list').on(t.listId),
    uniq: unique('uniq_list_item').on(t.listId, t.entityId)
  })
)

// ---------------------------------------------------------------------------
// manga_chapter — a locally-readable chapter of a manga media_item, discovered
// by scanning the attached series folder (media_item.local_dir). dir_path is
// relative to the manga library root; '' = the series folder itself holds the
// pages (flat series). Pages are listed from disk at read-time; only the count
// is cached here.
// ---------------------------------------------------------------------------
export const mangaChapter = sqliteTable(
  'manga_chapter',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    dirPath: text('dir_path').notNull(),
    title: text('title').notNull(),
    number: real('number'),
    pageCount: integer('page_count').notNull().default(0),
    sortOrder: integer('sort_order').notNull().default(0),
    lastReadPage: integer('last_read_page'),
    readAt: text('read_at'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byMedia: index('idx_manga_chapter_media').on(t.mediaId),
    uniq: unique('uniq_manga_chapter_dir').on(t.mediaId, t.dirPath)
  })
)

// ---------------------------------------------------------------------------
// Japanese learning — standalone section (courses → lessons → cards). A lesson
// is 'grammar' (body = explanation, cards = example sentences) or 'vocab'
// (cards = vocabulary entries). Cards carry SRS state inline; only learned
// lessons' cards surface in reviews and quizzes.
// ---------------------------------------------------------------------------
export const jpCourse = sqliteTable('jp_course', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  // display label ("N5") + recommended study-order step (1 = start here)
  level: text('level'),
  difficulty: integer('difficulty'),
  sortOrder: integer('sort_order').notNull().default(0),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(datetime('now'))`)
})

export const jpLesson = sqliteTable(
  'jp_lesson',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    courseId: integer('course_id')
      .notNull()
      .references(() => jpCourse.id, { onDelete: 'cascade' }),
    kind: text('kind').notNull(),
    title: text('title').notNull(),
    body: text('body'),
    sortOrder: integer('sort_order').notNull().default(0),
    learned: integer('learned').notNull().default(0),
    learnedAt: text('learned_at'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({ byCourse: index('idx_jp_lesson_course').on(t.courseId) })
)

export const jpCard = sqliteTable(
  'jp_card',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    lessonId: integer('lesson_id')
      .notNull()
      .references(() => jpLesson.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').notNull().default(0),
    front: text('front').notNull(),
    reading: text('reading'),
    back: text('back').notNull(),
    pos: text('pos'),
    notes: text('notes'),
    exampleJp: text('example_jp'),
    exampleReading: text('example_reading'),
    exampleEn: text('example_en'),
    onyomi: text('onyomi'),
    kunyomi: text('kunyomi'),
    // media_item.id a mined card came from; no FK — reads tolerate deletion
    sourceMediaId: integer('source_media_id'),
    // SRS state; written only by submitReview (see src/shared/srs.ts)
    status: text('status').notNull().default('new'),
    learningStep: integer('learning_step').notNull().default(0),
    dueAt: text('due_at'),
    intervalDays: real('interval_days').notNull().default(0),
    ease: real('ease').notNull().default(2.5),
    reps: integer('reps').notNull().default(0),
    lapses: integer('lapses').notNull().default(0),
    lastReviewedAt: text('last_reviewed_at'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byLesson: index('idx_jp_card_lesson').on(t.lessonId),
    byDue: index('idx_jp_card_due').on(t.status, t.dueAt)
  })
)

export const jpReviewLog = sqliteTable(
  'jp_review_log',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    cardId: integer('card_id')
      .notNull()
      .references(() => jpCard.id, { onDelete: 'cascade' }),
    grade: text('grade').notNull(),
    reviewedAt: text('reviewed_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    intervalDays: real('interval_days').notNull(),
    ease: real('ease').notNull()
  },
  (t) => ({
    byCard: index('idx_jp_review_log_card').on(t.cardId),
    byTime: index('idx_jp_review_log_time').on(t.reviewedAt)
  })
)

// ---------------------------------------------------------------------------
// Music library — standalone local-music section (fully separate from
// media_item / person; anime OP/EDs stay in theme_song). Rows are written only
// by the scanner (src/main/music.ts); identity is the path relative to the
// music root (settings key music.dir), so rescans preserve user state
// (liked_at, play_count, playlist membership).
// ---------------------------------------------------------------------------
export const musicArtist = sqliteTable(
  'music_artist',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    dirPath: text('dir_path').notNull(),
    coverPath: text('cover_path'),
    artCheckedAt: text('art_checked_at'),
    artSourceUrl: text('art_source_url'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byName: index('idx_music_artist_name').on(t.name),
    uniqDir: unique('uniq_music_artist_dir').on(t.dirPath)
  })
)

export const musicAlbum = sqliteTable(
  'music_album',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    artistId: integer('artist_id')
      .notNull()
      .references(() => musicArtist.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    dirPath: text('dir_path').notNull(),
    year: integer('year'),
    coverPath: text('cover_path'),
    artCheckedAt: text('art_checked_at'),
    artSourceUrl: text('art_source_url'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byArtist: index('idx_music_album_artist').on(t.artistId),
    byTitle: index('idx_music_album_title').on(t.title),
    uniqDir: unique('uniq_music_album_dir').on(t.dirPath)
  })
)

export const musicTrack = sqliteTable(
  'music_track',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    albumId: integer('album_id')
      .notNull()
      .references(() => musicAlbum.id, { onDelete: 'cascade' }),
    // denormalized: track lists & search never need a double join
    artistId: integer('artist_id')
      .notNull()
      .references(() => musicArtist.id, { onDelete: 'cascade' }),
    filePath: text('file_path').notNull(),
    fileMtime: integer('file_mtime'),
    title: text('title').notNull(),
    trackNo: integer('track_no'),
    discNo: integer('disc_no'),
    duration: real('duration'),
    tagArtist: text('tag_artist'),
    // user state: preserved across rescans (the scanner never writes these)
    likedAt: text('liked_at'),
    playCount: integer('play_count').notNull().default(0),
    lastPlayedAt: text('last_played_at'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byAlbum: index('idx_music_track_album').on(t.albumId),
    byArtist: index('idx_music_track_artist').on(t.artistId),
    byTitle: index('idx_music_track_title').on(t.title),
    byLiked: index('idx_music_track_liked').on(t.likedAt),
    byPlayed: index('idx_music_track_played').on(t.lastPlayedAt),
    uniqPath: unique('uniq_music_track_path').on(t.filePath)
  })
)

export const musicPlaylist = sqliteTable('music_playlist', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  description: text('description'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(datetime('now'))`)
})

export const musicPlaylistTrack = sqliteTable(
  'music_playlist_track',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    playlistId: integer('playlist_id')
      .notNull()
      .references(() => musicPlaylist.id, { onDelete: 'cascade' }),
    trackId: integer('track_id')
      .notNull()
      .references(() => musicTrack.id, { onDelete: 'cascade' }),
    position: integer('position').notNull().default(0),
    addedAt: text('added_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byTrack: index('idx_music_playlist_track_track').on(t.trackId),
    uniq: unique('uniq_music_playlist_track').on(t.playlistId, t.trackId)
  })
)

export const musicPlayLog = sqliteTable(
  'music_play_log',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    trackId: integer('track_id')
      .notNull()
      .references(() => musicTrack.id, { onDelete: 'cascade' }),
    playedAt: text('played_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    duration: real('duration')
  },
  (t) => ({
    byTrack: index('idx_music_play_log_track').on(t.trackId),
    byPlayed: index('idx_music_play_log_played').on(t.playedAt)
  })
)

export const quizSession = sqliteTable(
  'quiz_session',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    kind: text('kind').notNull(),
    score: integer('score').notNull(),
    total: integer('total').notNull(),
    bestStreak: integer('best_streak').notNull().default(0),
    settings: text('settings'),
    playedAt: text('played_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byKind: index('idx_quiz_session_kind').on(t.kind, t.playedAt)
  })
)

// ---------------------------------------------------------------------------
// Gacha tracker — standalone section (game list/config in src/shared/gacha.ts).
// ---------------------------------------------------------------------------
export const gachaUnit = sqliteTable(
  'gacha_unit',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    game: text('game').notNull(),
    kind: text('kind').notNull(),
    name: text('name').notNull(),
    rarity: integer('rarity'),
    element: text('element'),
    role: text('role'),
    imagePath: text('image_path'),
    owned: integer('owned', { mode: 'boolean' }).notNull().default(true),
    favorite: integer('favorite', { mode: 'boolean' }).notNull().default(false),
    level: integer('level'),
    // Extra copies consumed, 0-based (eidolon / NP-1 / imprint / sequence).
    dupes: integer('dupes').notNull().default(0),
    obtainedAt: text('obtained_at'),
    notes: text('notes'),
    data: text('data', { mode: 'json' }),
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
    byGame: index('idx_gacha_unit_game').on(t.game, t.kind),
    uniqExternal: uniqueIndex('idx_gacha_unit_external').on(
      t.game,
      t.kind,
      t.externalSource,
      t.externalId
    )
  })
)

export const gachaBuild = sqliteTable(
  'gacha_build',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    unitId: integer('unit_id')
      .notNull()
      .references(() => gachaUnit.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    sortOrder: integer('sort_order').notNull().default(0),
    data: text('data', { mode: 'json' }),
    notes: text('notes'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byUnit: index('idx_gacha_build_unit').on(t.unitId)
  })
)

export const gachaCurrency = sqliteTable(
  'gacha_currency',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    game: text('game').notNull(),
    key: text('key').notNull(),
    amount: integer('amount').notNull().default(0),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    uniq: unique('uniq_gacha_currency').on(t.game, t.key)
  })
)

export const gachaBanner = sqliteTable(
  'gacha_banner',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    game: text('game').notNull(),
    name: text('name').notNull(),
    kind: text('kind'),
    featured: text('featured'),
    startAt: text('start_at'),
    endAt: text('end_at'),
    imagePath: text('image_path'),
    notes: text('notes'),
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
    byGame: index('idx_gacha_banner_game').on(t.game, t.startAt)
  })
)

export const gachaNews = sqliteTable(
  'gacha_news',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    game: text('game').notNull(),
    title: text('title').notNull(),
    url: text('url'),
    summary: text('summary'),
    imageUrl: text('image_url'),
    publishedAt: text('published_at'),
    author: text('author'),
    sortOrder: integer('sort_order').notNull().default(0),
    externalId: text('external_id').notNull(),
    fetchedAt: text('fetched_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byGame: index('idx_gacha_news_game').on(t.game, t.publishedAt),
    uniq: unique('uniq_gacha_news').on(t.game, t.externalId)
  })
)

export const gachaMeta = sqliteTable(
  'gacha_meta',
  {
    game: text('game').notNull(),
    key: text('key').notNull(),
    value: text('value').notNull(),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    pk: primaryKey({ columns: [t.game, t.key] })
  })
)
