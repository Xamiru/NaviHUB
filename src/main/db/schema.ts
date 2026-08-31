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
    // Wide hero art for the detail page (AniList bannerImage / TMDB backdrop).
    bannerPath: text('banner_path'),
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
    // Game/VN launcher: absolute path to the title's executable. Written only
    // by src/main/gameLaunch.ts.
    exePath: text('exe_path'),
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
// game_session — one finished play session of a game/VN launched from the app
// (gameLaunch.ts). Source of truth for tracked time; media_item.progress moves
// by the delta of the rounded cumulative on each insert.
// ---------------------------------------------------------------------------
export const gameSession = sqliteTable(
  'game_session',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    startedAt: text('started_at').notNull(), // UTC
    endedAt: text('ended_at').notNull(), // UTC
    duration: integer('duration').notNull() // seconds
  },
  (t) => ({
    byMedia: index('idx_game_session_media').on(t.mediaId),
    byStarted: index('idx_game_session_started').on(t.startedAt)
  })
)

// ---------------------------------------------------------------------------
// achievement_game / achievement / achievement_unlock — Steam-emulator and
// RetroAchievements tracking (achievements.ts, achievementWatcher.ts). The
// achievement_game row is opt-in and never auto-created, so it doubles as the
// durable "was launchable once" marker after an exe is unlinked.
// ---------------------------------------------------------------------------
export const achievementGame = sqliteTable('achievement_game', {
  mediaId: integer('media_id')
    .primaryKey()
    .references(() => mediaItem.id, { onDelete: 'cascade' }),
  provider: text('provider').notNull(), // 'steam' | 'ra'
  providerGameId: text('provider_game_id').notNull(),
  schemaFetchedAt: text('schema_fetched_at'),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`)
})

export const achievement = sqliteTable(
  'achievement',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    apiName: text('api_name').notNull(),
    name: text('name').notNull(),
    description: text('description'),
    hidden: integer('hidden', { mode: 'boolean' }).notNull().default(false),
    iconPath: text('icon_path'),
    iconGrayPath: text('icon_gray_path'),
    points: integer('points'), // RA only
    globalPct: real('global_pct'),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    byMedia: index('idx_achievement_media').on(t.mediaId),
    uniq: unique('uniq_achievement_api_name').on(t.mediaId, t.apiName)
  })
)

// Row present = unlocked. Personal; dropped on export.
export const achievementUnlock = sqliteTable(
  'achievement_unlock',
  {
    achievementId: integer('achievement_id')
      .primaryKey()
      .references(() => achievement.id, { onDelete: 'cascade' }),
    unlockedAt: text('unlocked_at').notNull(), // UTC
    source: text('source').notNull() // 'emu' | 'ra' | 'manual'
  },
  (t) => ({
    byTime: index('idx_achievement_unlock_time').on(t.unlockedAt)
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
    gender: text('gender'),
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
    // Personal: the Songs page's heart (wiped on export, kept across re-imports).
    favorite: integer('favorite', { mode: 'boolean' }).notNull().default(false),
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
    // 1 = the item's detail-page backdrop; at most one per media_id.
    isBackground: integer('is_background').notNull().default(0),
    createdAt: text('created_at').notNull()
  },
  (t) => ({
    byMedia: index('idx_media_image_media').on(t.mediaId, t.kind)
  })
)

// ---------------------------------------------------------------------------
// slideshow_item — images copied into the Windows desktop slideshow folder
// (slideshow.dir). file_name is the copy's name in that folder, not a navimg
// path. Personal; wiped on export.
// ---------------------------------------------------------------------------
export const slideshowItem = sqliteTable('slideshow_item', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  imageId: integer('image_id')
    .notNull()
    .unique()
    .references(() => mediaImage.id, { onDelete: 'cascade' }),
  fileName: text('file_name').notNull(),
  addedAt: text('added_at').notNull()
})

// The TMDB episode catalogue for a TV show — see init.sql for why it is separate
// from video_file and why specials are excluded.
export const tvEpisode = sqliteTable(
  'tv_episode',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    season: integer('season').notNull(),
    number: integer('number').notNull(),
    absolute: integer('absolute'),
    title: text('title'),
    overview: text('overview'),
    airDate: text('air_date'),
    runtime: integer('runtime'),
    watchedAt: text('watched_at'),
    createdAt: text('created_at').notNull()
  },
  (t) => ({
    byMedia: index('idx_tv_episode_media').on(t.mediaId, t.season, t.number)
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
// tier_list + tier_row + tier_item — TierMaker-style boards. Same kind scoping
// as list; tier_item.row_id NULL = the unranked pool, and deleting a row drops
// its items back into the pool (SET NULL) rather than deleting them.
// ---------------------------------------------------------------------------
export const tierList = sqliteTable(
  'tier_list',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    description: text('description'),
    entityKind: text('entity_kind').notNull(),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({ byKind: index('idx_tier_list_kind').on(t.entityKind) })
)

export const tierRow = sqliteTable(
  'tier_row',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    listId: integer('list_id')
      .notNull()
      .references(() => tierList.id, { onDelete: 'cascade' }),
    label: text('label').notNull(),
    color: text('color').notNull().default('#7f7f7f'),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({ byList: index('idx_tier_row_list').on(t.listId) })
)

export const tierItem = sqliteTable(
  'tier_item',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    listId: integer('list_id')
      .notNull()
      .references(() => tierList.id, { onDelete: 'cascade' }),
    rowId: integer('row_id').references(() => tierRow.id, { onDelete: 'set null' }),
    entityId: integer('entity_id').notNull(),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    byList: index('idx_tier_item_list').on(t.listId),
    byRow: index('idx_tier_item_row').on(t.rowId),
    uniq: unique('uniq_tier_item').on(t.listId, t.entityId)
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
    // First page as a virtual path, for the Volumes grid thumbnail.
    coverPath: text('cover_path'),
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

export const videoFile = sqliteTable(
  'video_file',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    mediaId: integer('media_id')
      .notNull()
      .references(() => mediaItem.id, { onDelete: 'cascade' }),
    filePath: text('file_path').notNull(),
    title: text('title').notNull(),
    number: real('number'),
    season: integer('season'),
    sortOrder: integer('sort_order').notNull().default(0),
    fileMtime: integer('file_mtime'),
    fileSize: integer('file_size'),
    duration: real('duration'),
    width: integer('width'),
    height: integer('height'),
    videoCodec: text('video_codec'),
    audioCodec: text('audio_codec'),
    container: text('container'),
    playability: text('playability'),
    resumeSeconds: real('resume_seconds'),
    watchedAt: text('watched_at'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byMedia: index('idx_video_file_media').on(t.mediaId),
    uniq: unique('uniq_video_file_path').on(t.mediaId, t.filePath)
  })
)

export const videoCache = sqliteTable(
  'video_cache',
  {
    cacheKey: text('cache_key').primaryKey(),
    fileName: text('file_name').notNull(),
    sourcePath: text('source_path').notNull(),
    action: text('action').notNull(),
    bytes: integer('bytes').notNull(),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    lastUsedAt: text('last_used_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byUsed: index('idx_video_cache_used').on(t.lastUsedAt)
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
    audioPath: text('audio_path'),
    imagePath: text('image_path'),
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
    byDue: index('idx_jp_card_due').on(t.status, t.dueAt),
    byFront: index('idx_jp_card_front').on(t.front)
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

export const jpTutorDay = sqliteTable(
  'jp_tutor_day',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    day: text('day').notNull().unique(),
    phaseId: text('phase_id').notNull(),
    startedAt: text('started_at').notNull(),
    endedAt: text('ended_at').notNull(),
    plannedMinutes: integer('planned_minutes').notNull(),
    completedMinutes: integer('completed_minutes').notNull(),
    completedBlocks: integer('completed_blocks').notNull(),
    totalBlocks: integer('total_blocks').notNull(),
    strongest: text('strongest'),
    tomorrowFocus: text('tomorrow_focus').notNull(),
    tasksJson: text('tasks_json').notNull(),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({ byEnded: index('idx_jp_tutor_day_ended').on(t.endedAt) })
)

export const jpTutorError = sqliteTable(
  'jp_tutor_error',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    day: text('day').notNull(),
    skill: text('skill').notNull(),
    label: text('label').notNull(),
    detail: text('detail').notNull(),
    sourceKind: text('source_kind'),
    sourceSessionId: integer('source_session_id'),
    score: integer('score'),
    threshold: integer('threshold'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    resolvedAt: text('resolved_at')
  },
  (t) => ({
    byOpen: index('idx_jp_tutor_error_open').on(t.resolvedAt, t.createdAt),
    sourceOnce: unique().on(t.day, t.skill, t.label, t.sourceSessionId)
  })
)

// Series comprehension coverage: a scan's text facts only. The known/learning
// split is recomputed against jp_card at read time, so these rows never go
// stale as the user learns. media_id deliberately carries no FK.
export const jpCoverage = sqliteTable('jp_coverage', {
  mediaId: integer('media_id').primaryKey(),
  scannedAt: text('scanned_at')
    .notNull()
    .default(sql`(datetime('now'))`),
  chaptersScanned: integer('chapters_scanned').notNull(),
  tokenCount: integer('token_count').notNull(),
  uniqueWords: integer('unique_words').notNull()
})

export const jpCoverageWord = sqliteTable(
  'jp_coverage_word',
  {
    mediaId: integer('media_id').notNull(),
    word: text('word').notNull(),
    count: integer('count').notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.mediaId, t.word] }),
    byWord: index('idx_jp_coverage_word_word').on(t.word)
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
    spotifyId: text('spotify_id'),
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
    uniqDir: unique('uniq_music_artist_dir').on(t.dirPath),
    uniqSpotify: unique('idx_music_artist_spotify').on(t.spotifyId)
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
    spotifyId: text('spotify_id'),
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
    uniqDir: unique('uniq_music_album_dir').on(t.dirPath),
    uniqSpotify: unique('idx_music_album_spotify').on(t.spotifyId)
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

export const musicSpotifyPlaylist = sqliteTable('music_spotify_playlist', {
  playlistId: integer('playlist_id')
    .primaryKey()
    .references(() => musicPlaylist.id, { onDelete: 'cascade' }),
  spotifyId: text('spotify_id').notNull().unique(),
  sourceUrl: text('source_url').notNull(),
  importedAt: text('imported_at')
    .notNull()
    .default(sql`(datetime('now'))`)
})

export const musicSpotifyPlaylistItem = sqliteTable(
  'music_spotify_playlist_item',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    playlistId: integer('playlist_id')
      .notNull()
      .references(() => musicPlaylist.id, { onDelete: 'cascade' }),
    spotifyTrackId: text('spotify_track_id').notNull(),
    position: integer('position').notNull(),
    title: text('title').notNull(),
    artistsJson: text('artists_json').notNull(),
    primaryArtist: text('primary_artist').notNull(),
    albumArtist: text('album_artist'),
    albumTitle: text('album_title').notNull(),
    duration: real('duration'),
    coverPath: text('cover_path'),
    spotifyUrl: text('spotify_url').notNull(),
    discNo: integer('disc_no'),
    trackNo: integer('track_no'),
    year: integer('year'),
    rawJson: text('raw_json').notNull(),
    matchedTrackId: integer('matched_track_id').references(() => musicTrack.id, {
      onDelete: 'set null'
    }),
    addedAt: text('added_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byPlaylist: index('idx_music_spotify_item_playlist').on(t.playlistId),
    byMatch: index('idx_music_spotify_item_match').on(t.matchedTrackId),
    uniq: unique('uniq_music_spotify_item').on(t.playlistId, t.spotifyTrackId)
  })
)

export const musicSpotifyEntitySnapshot = sqliteTable(
  'music_spotify_entity_snapshot',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    artistId: integer('artist_id').references(() => musicArtist.id, { onDelete: 'cascade' }),
    albumId: integer('album_id').references(() => musicAlbum.id, { onDelete: 'cascade' }),
    provider: text('provider').notNull(),
    providerEntityId: text('provider_entity_id').notNull(),
    sourceName: text('source_name').notNull(),
    catalogueState: text('catalogue_state').notNull().default('complete'),
    refreshedAt: text('refreshed_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    uniqArtist: unique('uniq_music_spotify_entity_snapshot_artist').on(t.artistId),
    uniqAlbum: unique('uniq_music_spotify_entity_snapshot_album').on(t.albumId)
  })
)

export const musicSpotifyEntityRelease = sqliteTable(
  'music_spotify_entity_release',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    snapshotId: integer('snapshot_id')
      .notNull()
      .references(() => musicSpotifyEntitySnapshot.id, { onDelete: 'cascade' }),
    providerReleaseId: text('provider_release_id').notNull(),
    spotifyAlbumId: text('spotify_album_id'),
    position: integer('position').notNull().default(0),
    title: text('title').notNull(),
    albumArtist: text('album_artist').notNull(),
    year: integer('year'),
    albumType: text('album_type'),
    metadataState: text('metadata_state').notNull().default('indexed'),
    resolutionError: text('resolution_error')
  },
  (t) => ({
    bySnapshot: index('idx_music_spotify_entity_release_snapshot').on(t.snapshotId),
    bySpotify: index('idx_music_spotify_entity_release_spotify').on(t.spotifyAlbumId),
    uniq: unique('uniq_music_spotify_entity_release').on(t.snapshotId, t.providerReleaseId)
  })
)

export const musicSpotifyEntityTrack = sqliteTable(
  'music_spotify_entity_track',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    releaseId: integer('release_id')
      .notNull()
      .references(() => musicSpotifyEntityRelease.id, { onDelete: 'cascade' }),
    providerTrackId: text('provider_track_id').notNull(),
    spotifyTrackId: text('spotify_track_id'),
    position: integer('position').notNull().default(0),
    title: text('title').notNull(),
    artistsJson: text('artists_json').notNull(),
    primaryArtist: text('primary_artist').notNull(),
    albumTitle: text('album_title').notNull(),
    duration: real('duration'),
    discNo: integer('disc_no'),
    trackNo: integer('track_no'),
    spotifyUrl: text('spotify_url'),
    rawJson: text('raw_json'),
    matchedTrackId: integer('matched_track_id').references(() => musicTrack.id, {
      onDelete: 'set null'
    })
  },
  (t) => ({
    byRelease: index('idx_music_spotify_entity_track_release').on(t.releaseId),
    byMatch: index('idx_music_spotify_entity_track_match').on(t.matchedTrackId),
    uniq: unique('uniq_music_spotify_entity_track').on(t.releaseId, t.providerTrackId)
  })
)

export const musicSpotifyDownloadQueue = sqliteTable(
  'music_spotify_download_queue',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    sourceKind: text('source_kind').notNull(),
    snapshotId: integer('snapshot_id').references(() => musicSpotifyEntitySnapshot.id, {
      onDelete: 'cascade'
    }),
    playlistId: integer('playlist_id').references(() => musicSpotifyPlaylist.playlistId, {
      onDelete: 'cascade'
    }),
    position: integer('position').notNull().default(0),
    state: text('state').notNull().default('queued'),
    allowMismatch: integer('allow_mismatch', { mode: 'boolean' }).notNull().default(false),
    continueAfter: integer('continue_after', { mode: 'boolean' }).notNull().default(false),
    lastError: text('last_error'),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`),
    completedAt: text('completed_at')
  },
  (t) => ({
    byOrder: index('idx_music_spotify_download_queue_order').on(t.state, t.position, t.id),
    uniqSnapshot: unique('uniq_music_spotify_download_queue_snapshot').on(t.snapshotId),
    uniqPlaylist: unique('uniq_music_spotify_download_queue_playlist').on(t.playlistId)
  })
)

export const musicSpotifyDownloadQueueSelection = sqliteTable(
  'music_spotify_download_queue_selection',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    queueId: integer('queue_id')
      .notNull()
      .references(() => musicSpotifyDownloadQueue.id, { onDelete: 'cascade' }),
    releaseId: integer('release_id').references(() => musicSpotifyEntityRelease.id, {
      onDelete: 'cascade'
    }),
    playlistItemId: integer('playlist_item_id').references(() => musicSpotifyPlaylistItem.id, {
      onDelete: 'cascade'
    }),
    position: integer('position').notNull().default(0)
  },
  (t) => ({
    byQueue: index('idx_music_spotify_download_queue_selection_queue').on(
      t.queueId,
      t.position,
      t.id
    ),
    uniqRelease: unique('uniq_music_spotify_download_queue_selection_release').on(
      t.queueId,
      t.releaseId
    ),
    uniqPlaylistItem: unique('uniq_music_spotify_download_queue_selection_playlist_item').on(
      t.queueId,
      t.playlistItemId
    )
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

// ---------------------------------------------------------------------------
// Gacha coach — FGO LLM coaching chat (threads/messages/goals/notes/docs).
// ---------------------------------------------------------------------------
export const gachaChatThread = sqliteTable(
  'gacha_chat_thread',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    game: text('game').notNull(),
    title: text('title'),
    archivedAt: text('archived_at'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byGame: index('idx_gacha_chat_thread_game').on(t.game, t.archivedAt)
  })
)

export const gachaChatMessage = sqliteTable(
  'gacha_chat_message',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    threadId: integer('thread_id')
      .notNull()
      .references(() => gachaChatThread.id, { onDelete: 'cascade' }),
    role: text('role').notNull(),
    text: text('text'),
    apiBlocks: text('api_blocks', { mode: 'json' }),
    actions: text('actions', { mode: 'json' }),
    attachments: text('attachments', { mode: 'json' }),
    usageIn: integer('usage_in'),
    usageOut: integer('usage_out'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byThread: index('idx_gacha_chat_message_thread').on(t.threadId, t.id)
  })
)

export const gachaGoal = sqliteTable(
  'gacha_goal',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    game: text('game').notNull(),
    kind: text('kind').notNull().default('goal'),
    title: text('title').notNull(),
    notes: text('notes'),
    status: text('status').notNull().default('active'),
    dueAt: text('due_at'),
    recur: text('recur'),
    createdBy: text('created_by').notNull().default('user'),
    doneAt: text('done_at'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byGame: index('idx_gacha_goal_game').on(t.game, t.status, t.dueAt)
  })
)

export const gachaCoachNote = sqliteTable(
  'gacha_coach_note',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    game: text('game').notNull(),
    content: text('content').notNull(),
    createdBy: text('created_by').notNull().default('coach'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byGame: index('idx_gacha_coach_note_game').on(t.game)
  })
)

export const gachaCoachDoc = sqliteTable(
  'gacha_coach_doc',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    game: text('game').notNull(),
    title: text('title').notNull(),
    content: text('content').notNull(),
    summary: text('summary'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byGame: index('idx_gacha_coach_doc_game').on(t.game)
  })
)

// ---------------------------------------------------------------------------
// Daily / weekly checklist — enabled board rows + the activity log behind them.
// The item catalog itself is code (src/shared/checklist.ts), not a table.
// ---------------------------------------------------------------------------
export const checklistTask = sqliteTable(
  'checklist_task',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    taskKey: text('task_key').notNull(),
    cadence: text('cadence').notNull(),
    target: integer('target'),
    sortOrder: integer('sort_order').notNull().default(0),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    uniq: unique('uniq_checklist_task').on(t.taskKey, t.cadence)
  })
)

export const checklistLog = sqliteTable(
  'checklist_log',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    taskKey: text('task_key').notNull(),
    cadence: text('cadence').notNull(),
    periodKey: text('period_key').notNull(),
    mediaId: integer('media_id'),
    payload: text('payload'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byTask: index('idx_checklist_log_task').on(t.taskKey, t.cadence, t.periodKey)
  })
)

// ---------------------------------------------------------------------------
// English dictionary — saved (word, chosen definition) rows. Not part of the
// jp_* SRS: a plain personal word list.
// ---------------------------------------------------------------------------
export const enWord = sqliteTable(
  'en_word',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    word: text('word').notNull(),
    phonetic: text('phonetic'),
    pos: text('pos'),
    meaning: text('meaning').notNull(),
    example: text('example'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    // SRS state; written only by submitReview (see src/shared/srs.ts)
    status: text('status').notNull().default('new'),
    learningStep: integer('learning_step').notNull().default(0),
    dueAt: text('due_at'),
    intervalDays: real('interval_days').notNull().default(0),
    ease: real('ease').notNull().default(2.5),
    reps: integer('reps').notNull().default(0),
    lapses: integer('lapses').notNull().default(0),
    lastReviewedAt: text('last_reviewed_at')
  },
  // idx_en_word_due is deliberately ABSENT here, matching init.sql:804: it must
  // be created only by runMigrations (connection.ts:140), after the 8 SRS
  // columns are ensured. Creating it alongside the table is the exact shape
  // that crashed live pre-SRS databases on the English-SRS release.
  (t) => ({
    byWord: index('idx_en_word_word').on(t.word)
  })
)

export const enReviewLog = sqliteTable(
  'en_review_log',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    wordId: integer('word_id')
      .notNull()
      .references(() => enWord.id, { onDelete: 'cascade' }),
    grade: text('grade').notNull(),
    reviewedAt: text('reviewed_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    intervalDays: real('interval_days').notNull(),
    ease: real('ease').notNull()
  },
  (t) => ({
    byWord: index('idx_en_review_log_word').on(t.wordId),
    byTime: index('idx_en_review_log_time').on(t.reviewedAt)
  })
)

// English writing practice: one row per graded submission. feedback = JSON
// EnWritingFeedback; prompt content is code (src/shared/english/).
export const enWriting = sqliteTable(
  'en_writing',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    promptKey: text('prompt_key').notNull(),
    promptTitle: text('prompt_title').notNull(),
    submission: text('submission').notNull(),
    feedback: text('feedback').notNull(),
    score: real('score'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byTime: index('idx_en_writing_time').on(t.createdAt)
  })
)

// ---------------------------------------------------------------------------
// Programming learn section — lesson completion only; the course/lesson content
// itself is code (src/shared/programming/), not a table.
// ---------------------------------------------------------------------------
export const progProgress = sqliteTable('prog_progress', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  lessonKey: text('lesson_key').notNull().unique(),
  completedAt: text('completed_at')
    .notNull()
    .default(sql`(datetime('now'))`)
})

export const progAttempt = sqliteTable(
  'prog_attempt',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    lessonKey: text('lesson_key').notNull(),
    score: integer('score').notNull(),
    total: integer('total').notNull(),
    at: text('at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byLesson: index('idx_prog_attempt_lesson').on(t.lessonKey)
  })
)

export const progCliMiss = sqliteTable('prog_cli_miss', {
  cmdKey: text('cmd_key').primaryKey(),
  misses: integer('misses').notNull().default(0),
  lastAt: text('last_at')
    .notNull()
    .default(sql`(datetime('now'))`)
})

export const progSolve = sqliteTable(
  'prog_solve',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    kind: text('kind').notNull(),
    key: text('key').notNull(),
    best: integer('best'),
    answer: text('answer'),
    solvedAt: text('solved_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    kindKey: uniqueIndex('prog_solve_kind_key').on(t.kind, t.key)
  })
)

// ---------------------------------------------------------------------------
// Ghost reviews — echoes of lapsed cards (see japaneseRepo ghostQueue). No FK
// by design; cleanup is manual (the jp_card.source_media_id precedent).
// ---------------------------------------------------------------------------
export const jpGhost = sqliteTable('jp_ghost', {
  cardId: integer('card_id').primaryKey(),
  remaining: integer('remaining').notNull().default(3),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`)
})

// ---------------------------------------------------------------------------
// Wrestling — a Wikipedia-sourced wiki (events / matches / wrestlers / stables)
// plus a local collection of files attached per event. Deliberately NOT
// media_item rows: this is reference data at a scale a personal library
// shouldn't absorb. Promotion vocabulary is code (src/shared/wrestling.ts).
// ---------------------------------------------------------------------------
export const wrestlingEvent = sqliteTable(
  'wrestling_event',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    promotion: text('promotion').notNull(),
    name: text('name').notNull(),
    // Canonical article title AFTER redirect resolution — the dedup key.
    wikiTitle: text('wiki_title').unique(),
    series: text('series'),
    eventDate: text('event_date'),
    venue: text('venue'),
    city: text('city'),
    attendance: integer('attendance'),
    buyrate: text('buyrate'),
    tagline: text('tagline'),
    posterPath: text('poster_path'),
    lead: text('lead'),
    localDir: text('local_dir'),
    favorite: integer('favorite').notNull().default(0),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byPromo: index('idx_wrestling_event_promo').on(t.promotion, t.eventDate)
  })
)

export const wrestlingMatch = sqliteTable(
  'wrestling_match',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // Nullable: a loose match is one you own with no PPV behind it.
    eventId: integer('event_id').references(() => wrestlingEvent.id, { onDelete: 'cascade' }),
    showLabel: text('show_label'),
    matchDate: text('match_date'),
    sortOrder: integer('sort_order').notNull().default(0),
    // Denormalized "X vs. Y" — list_item renders through a fixed name column.
    title: text('title').notNull(),
    resultText: text('result_text'),
    stipulation: text('stipulation'),
    championship: text('championship'),
    durationSeconds: integer('duration_seconds'),
    outcome: text('outcome').notNull().default('unknown'),
    // How it ended ("pinfall", "submission"), from the results cell's own tail.
    method: text('method'),
    cardSlot: text('card_slot'),
    // The results table's |caption ("Night 1") — a multi-night event is two
    // adjacent tables flattened into one card.
    cardLabel: text('card_label'),
    // Personal layer: 0-5 stars, survives re-import.
    rating: real('rating'),
    favorite: integer('favorite').notNull().default(0),
    // Soft link to wrestling_video — no FK, so a detach can't cascade the wiki row.
    videoId: integer('video_id'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byEvent: index('idx_wrestling_match_event').on(t.eventId, t.sortOrder),
    byRating: index('idx_wrestling_match_rating').on(t.rating)
  })
)

export const wrestlingWrestler = sqliteTable(
  'wrestling_wrestler',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    wikiTitle: text('wiki_title').unique(),
    realName: text('real_name'),
    birthDate: text('birth_date'),
    debutYear: integer('debut_year'),
    billedFrom: text('billed_from'),
    height: text('height'),
    photoPath: text('photo_path'),
    bio: text('bio'),
    // null = stub created from a card link, never fetched.
    detailFetchedAt: text('detail_fetched_at'),
    favorite: integer('favorite').notNull().default(0),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byName: index('idx_wrestling_wrestler_name').on(t.name)
  })
)

// The redirect memo for events AND wrestlers: every title ever seen -> its
// canonical article title. Not keyed to a row, because aliases are learned
// before the rows they point at exist.
export const wrestlingAlias = sqliteTable('wrestling_alias', {
  aliasTitle: text('alias_title').primaryKey(),
  canonicalTitle: text('canonical_title').notNull()
})

export const wrestlingMatchParticipant = sqliteTable(
  'wrestling_match_participant',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    matchId: integer('match_id')
      .notNull()
      .references(() => wrestlingMatch.id, { onDelete: 'cascade' }),
    wrestlerId: integer('wrestler_id')
      .notNull()
      .references(() => wrestlingWrestler.id, { onDelete: 'cascade' }),
    // 0 = winning side when the match had one.
    side: integer('side').notNull().default(0),
    won: integer('won').notNull().default(0),
    isChampion: integer('is_champion').notNull().default(0),
    teamName: text('team_name'),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    byMatch: index('idx_wrestling_participant_match').on(t.matchId),
    byWrestler: index('idx_wrestling_participant_wrestler').on(t.wrestlerId)
  })
)

// Championships and accomplishments, straight off the wrestler's article.
export const wrestlingHonour = sqliteTable(
  'wrestling_honour',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    wrestlerId: integer('wrestler_id')
      .notNull()
      .references(() => wrestlingWrestler.id, { onDelete: 'cascade' }),
    org: text('org').notNull(),
    title: text('title').notNull(),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({ byWrestler: index('idx_wrestling_honour_wrestler').on(t.wrestlerId) })
)

export const wrestlingStable = sqliteTable('wrestling_stable', {
  id: integer('id').primaryKey({ autoIncrement: true }),
  name: text('name').notNull(),
  wikiTitle: text('wiki_title').unique(),
  promotion: text('promotion'),
  lead: text('lead'),
  imagePath: text('image_path'),
  favorite: integer('favorite').notNull().default(0),
  createdAt: text('created_at')
    .notNull()
    .default(sql`(datetime('now'))`),
  updatedAt: text('updated_at')
    .notNull()
    .default(sql`(datetime('now'))`)
})

export const wrestlingStableMember = sqliteTable(
  'wrestling_stable_member',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    stableId: integer('stable_id')
      .notNull()
      .references(() => wrestlingStable.id, { onDelete: 'cascade' }),
    wrestlerId: integer('wrestler_id')
      .notNull()
      .references(() => wrestlingWrestler.id, { onDelete: 'cascade' }),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    uniq: unique('uniq_wrestling_stable_member').on(t.stableId, t.wrestlerId)
  })
)

// Mirrors video_file's column grouping: identity + freshness / ffprobe
// snapshot / user state the scanner never writes. Personal → dropped on export.
export const wrestlingVideo = sqliteTable(
  'wrestling_video',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    // NULL for a loose match's file.
    eventId: integer('event_id').references(() => wrestlingEvent.id, { onDelete: 'cascade' }),
    filePath: text('file_path').notNull(),
    title: text('title').notNull(),
    number: real('number'),
    // Unused for wrestling — kept so the generalized scanner shares one upsert
    // with video_file rather than forking it.
    season: integer('season'),
    sortOrder: integer('sort_order').notNull().default(0),
    fileMtime: integer('file_mtime'),
    fileSize: integer('file_size'),
    duration: real('duration'),
    width: integer('width'),
    height: integer('height'),
    videoCodec: text('video_codec'),
    audioCodec: text('audio_codec'),
    container: text('container'),
    playability: text('playability'),
    resumeSeconds: real('resume_seconds'),
    watchedAt: text('watched_at'),
    createdAt: text('created_at')
      .notNull()
      .default(sql`(datetime('now'))`),
    updatedAt: text('updated_at')
      .notNull()
      .default(sql`(datetime('now'))`)
  },
  (t) => ({
    byEvent: index('idx_wrestling_video_event').on(t.eventId),
    uniq: unique('uniq_wrestling_video_path').on(t.eventId, t.filePath)
  })
)

// ---------------------------------------------------------------------------
// Football Archive — standalone historical graph, source-integrity evidence,
// and a small private journal/media layer. Every table is export-excluded.
// ---------------------------------------------------------------------------
export const footballCompetition = sqliteTable(
  'football_competition',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    key: text('key').notNull().unique(),
    name: text('name').notNull(),
    shortName: text('short_name'),
    country: text('country'),
    scope: text('scope').notNull(),
    format: text('format').notNull(),
    startYear: integer('start_year'),
    lineageNote: text('lineage_note'),
    summary: text('summary'),
    currentSeasonId: integer('current_season_id'),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
  }
)

export const footballEra = sqliteTable(
  'football_era',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    competitionId: integer('competition_id')
      .notNull()
      .references(() => footballCompetition.id, { onDelete: 'cascade' }),
    name: text('name').notNull(),
    startSeason: text('start_season'),
    endSeason: text('end_season'),
    pointsWin: integer('points_win'),
    pointsDraw: integer('points_draw'),
    rankRules: text('rank_rules'),
    narrative: text('narrative'),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    byCompetition: index('idx_football_era_competition').on(t.competitionId, t.sortOrder),
    uniq: unique('uniq_football_era').on(t.competitionId, t.name, t.startSeason)
  })
)

export const footballSeason = sqliteTable(
  'football_season',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    competitionId: integer('competition_id')
      .notNull()
      .references(() => footballCompetition.id, { onDelete: 'cascade' }),
    key: text('key').notNull(),
    label: text('label').notNull(),
    startDate: text('start_date'),
    endDate: text('end_date'),
    status: text('status').notNull().default('complete'),
    editionNumber: integer('edition_number'),
    teamCount: integer('team_count'),
    championVerified: integer('champion_verified').notNull().default(0),
    narrative: text('narrative'),
    dataRevision: text('data_revision'),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
  },
  (t) => ({
    byCompetition: index('idx_football_season_competition').on(t.competitionId, t.startDate),
    uniq: unique('uniq_football_season_key').on(t.competitionId, t.key)
  })
)

export const footballStage = sqliteTable(
  'football_stage',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    seasonId: integer('season_id')
      .notNull()
      .references(() => footballSeason.id, { onDelete: 'cascade' }),
    parentId: integer('parent_id'),
    key: text('key').notNull(),
    name: text('name').notNull(),
    kind: text('kind').notNull(),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    bySeason: index('idx_football_stage_season').on(t.seasonId, t.sortOrder),
    uniq: unique('uniq_football_stage_key').on(t.seasonId, t.key)
  })
)

export const footballTeam = sqliteTable(
  'football_team',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    shortName: text('short_name'),
    country: text('country'),
    foundedYear: integer('founded_year'),
    isNational: integer('is_national').notNull().default(0),
    bio: text('bio'),
    imagePath: text('image_path'),
    enrichmentState: text('enrichment_state').notNull().default('not_requested'),
    enrichedAt: text('enriched_at'),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
  },
  (t) => ({ byName: index('idx_football_team_name').on(t.name) })
)

export const footballPerson = sqliteTable(
  'football_person',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    name: text('name').notNull(),
    role: text('role').notNull(),
    birthDate: text('birth_date'),
    deathDate: text('death_date'),
    nationality: text('nationality'),
    bio: text('bio'),
    imagePath: text('image_path'),
    enrichmentState: text('enrichment_state').notNull().default('not_requested'),
    enrichedAt: text('enriched_at'),
    quizPack: integer('quiz_pack').notNull().default(0),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
  },
  (t) => ({ byName: index('idx_football_person_name').on(t.name) })
)

export const footballTenure = sqliteTable(
  'football_tenure',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    personId: integer('person_id')
      .notNull()
      .references(() => footballPerson.id, { onDelete: 'cascade' }),
    teamId: integer('team_id')
      .notNull()
      .references(() => footballTeam.id, { onDelete: 'cascade' }),
    role: text('role').notNull(),
    startDate: text('start_date'),
    endDate: text('end_date'),
    loan: integer('loan').notNull().default(0),
    appearances: integer('appearances'),
    goals: integer('goals'),
    verified: integer('verified').notNull().default(0),
    complete: integer('complete').notNull().default(0),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    byPerson: index('idx_football_tenure_person').on(t.personId, t.role, t.sortOrder),
    byTeam: index('idx_football_tenure_team').on(t.teamId, t.role)
  })
)

export const footballMatch = sqliteTable(
  'football_match',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    seasonId: integer('season_id')
      .notNull()
      .references(() => footballSeason.id, { onDelete: 'cascade' }),
    stageId: integer('stage_id').references(() => footballStage.id, { onDelete: 'set null' }),
    homeTeamId: integer('home_team_id')
      .notNull()
      .references(() => footballTeam.id, { onDelete: 'restrict' }),
    awayTeamId: integer('away_team_id')
      .notNull()
      .references(() => footballTeam.id, { onDelete: 'restrict' }),
    kickoffAt: text('kickoff_at'),
    matchDate: text('match_date').notNull(),
    round: text('round'),
    status: text('status').notNull().default('scheduled'),
    homeScore: integer('home_score'),
    awayScore: integer('away_score'),
    homeHalftime: integer('home_halftime'),
    awayHalftime: integer('away_halftime'),
    homeExtraTime: integer('home_extra_time'),
    awayExtraTime: integer('away_extra_time'),
    homePenalties: integer('home_penalties'),
    awayPenalties: integer('away_penalties'),
    aggregateHome: integer('aggregate_home'),
    aggregateAway: integer('aggregate_away'),
    awarded: integer('awarded').notNull().default(0),
    venue: text('venue'),
    city: text('city'),
    attendance: integer('attendance'),
    referee: text('referee'),
    eventCoverage: text('event_coverage').notNull().default('not_supplied'),
    lineupCoverage: text('lineup_coverage').notNull().default('not_supplied'),
    conflicted: integer('conflicted').notNull().default(0),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
  },
  (t) => ({
    bySeason: index('idx_football_match_season').on(t.seasonId, t.matchDate),
    byHome: index('idx_football_match_home').on(t.homeTeamId, t.matchDate),
    byAway: index('idx_football_match_away').on(t.awayTeamId, t.matchDate)
  })
)

export const footballLineup = sqliteTable(
  'football_lineup',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    matchId: integer('match_id')
      .notNull()
      .references(() => footballMatch.id, { onDelete: 'cascade' }),
    teamId: integer('team_id')
      .notNull()
      .references(() => footballTeam.id, { onDelete: 'cascade' }),
    personId: integer('person_id')
      .notNull()
      .references(() => footballPerson.id, { onDelete: 'cascade' }),
    role: text('role').notNull().default('player'),
    starter: integer('starter').notNull().default(0),
    shirt: integer('shirt'),
    position: text('position'),
    captain: integer('captain').notNull().default(0),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    byMatch: index('idx_football_lineup_match').on(t.matchId, t.teamId, t.sortOrder),
    byPerson: index('idx_football_lineup_person').on(t.personId),
    uniq: unique('uniq_football_lineup').on(t.matchId, t.teamId, t.personId, t.role)
  })
)

export const footballEvent = sqliteTable(
  'football_event',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    matchId: integer('match_id')
      .notNull()
      .references(() => footballMatch.id, { onDelete: 'cascade' }),
    teamId: integer('team_id').references(() => footballTeam.id, { onDelete: 'set null' }),
    personId: integer('person_id').references(() => footballPerson.id, {
      onDelete: 'set null'
    }),
    relatedPersonId: integer('related_person_id').references(() => footballPerson.id, {
      onDelete: 'set null'
    }),
    type: text('type').notNull(),
    detail: text('detail'),
    minute: integer('minute'),
    extraMinute: integer('extra_minute'),
    ownGoal: integer('own_goal').notNull().default(0),
    penalty: integer('penalty').notNull().default(0),
    scoreHome: integer('score_home'),
    scoreAway: integer('score_away'),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    byMatch: index('idx_football_event_match').on(t.matchId, t.sortOrder),
    byPerson: index('idx_football_event_person').on(t.personId)
  })
)

export const footballStanding = sqliteTable(
  'football_standing',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    seasonId: integer('season_id')
      .notNull()
      .references(() => footballSeason.id, { onDelete: 'cascade' }),
    stageId: integer('stage_id').references(() => footballStage.id, { onDelete: 'cascade' }),
    teamId: integer('team_id')
      .notNull()
      .references(() => footballTeam.id, { onDelete: 'cascade' }),
    rank: integer('rank'),
    rankOfficial: integer('rank_official').notNull().default(0),
    played: integer('played').notNull(),
    won: integer('won').notNull(),
    drawn: integer('drawn').notNull(),
    lost: integer('lost').notNull(),
    goalsFor: integer('goals_for').notNull(),
    goalsAgainst: integer('goals_against').notNull(),
    goalDifference: integer('goal_difference').notNull(),
    points: integer('points').notNull(),
    deduction: integer('deduction').notNull().default(0),
    note: text('note')
  },
  (t) => ({
    bySeason: index('idx_football_standing_season').on(t.seasonId, t.stageId, t.rank),
    uniq: unique('uniq_football_standing').on(t.seasonId, t.stageId, t.teamId)
  })
)

export const footballHonour = sqliteTable(
  'football_honour',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    competitionId: integer('competition_id')
      .notNull()
      .references(() => footballCompetition.id, { onDelete: 'cascade' }),
    seasonId: integer('season_id').references(() => footballSeason.id, { onDelete: 'cascade' }),
    teamId: integer('team_id').references(() => footballTeam.id, { onDelete: 'cascade' }),
    personId: integer('person_id').references(() => footballPerson.id, { onDelete: 'cascade' }),
    title: text('title').notNull(),
    placement: text('placement').notNull(),
    verified: integer('verified').notNull().default(0),
    shared: integer('shared').notNull().default(0),
    sortOrder: integer('sort_order').notNull().default(0)
  },
  (t) => ({
    bySeason: index('idx_football_honour_season').on(t.seasonId, t.placement),
    byTeam: index('idx_football_honour_team').on(t.teamId),
    byPerson: index('idx_football_honour_person').on(t.personId)
  })
)

export const footballAlias = sqliteTable(
  'football_alias',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    entityKind: text('entity_kind').notNull(),
    entityId: integer('entity_id').notNull(),
    source: text('source').notNull(),
    alias: text('alias').notNull(),
    normalized: text('normalized').notNull(),
    externalId: text('external_id')
  },
  (t) => ({
    byLookup: index('idx_football_alias_lookup').on(t.entityKind, t.source, t.normalized),
    uniq: unique('uniq_football_alias').on(t.entityKind, t.source, t.normalized, t.externalId)
  })
)

export const footballSourceRef = sqliteTable(
  'football_source_ref',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    entityKind: text('entity_kind').notNull(),
    entityId: integer('entity_id').notNull(),
    source: text('source').notNull(),
    externalId: text('external_id').notNull(),
    sourceUrl: text('source_url'),
    revision: text('revision'),
    checksum: text('checksum'),
    rawFingerprint: text('raw_fingerprint'),
    fetchedAt: text('fetched_at')
  },
  (t) => ({
    byEntity: index('idx_football_source_ref_entity').on(t.entityKind, t.entityId),
    uniq: unique('uniq_football_source_ref').on(t.entityKind, t.source, t.externalId)
  })
)

export const footballAssertion = sqliteTable(
  'football_assertion',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    entityKind: text('entity_kind').notNull(),
    entityId: integer('entity_id').notNull(),
    facet: text('facet').notNull(),
    value: text('value'),
    source: text('source').notNull(),
    sourceRefId: integer('source_ref_id').references(() => footballSourceRef.id, {
      onDelete: 'set null'
    }),
    status: text('status').notNull().default('accepted'),
    confidence: real('confidence'),
    observedAt: text('observed_at')
  },
  (t) => ({
    byEntity: index('idx_football_assertion_entity').on(t.entityKind, t.entityId, t.facet),
    uniq: unique('uniq_football_assertion').on(
      t.entityKind,
      t.entityId,
      t.facet,
      t.source,
      t.value
    )
  })
)

export const footballCoverage = sqliteTable(
  'football_coverage',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    competitionId: integer('competition_id').references(() => footballCompetition.id, {
      onDelete: 'cascade'
    }),
    seasonId: integer('season_id').references(() => footballSeason.id, { onDelete: 'cascade' }),
    source: text('source').notNull(),
    facet: text('facet').notNull(),
    state: text('state').notNull(),
    itemCount: integer('item_count'),
    expectedCount: integer('expected_count'),
    note: text('note'),
    revision: text('revision'),
    checkedAt: text('checked_at').notNull().default(sql`(datetime('now'))`)
  },
  (t) => ({
    bySeason: index('idx_football_coverage_season').on(t.seasonId, t.facet),
    uniq: unique('uniq_football_coverage').on(
      t.competitionId,
      t.seasonId,
      t.source,
      t.facet
    )
  })
)

export const footballConflict = sqliteTable(
  'football_conflict',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    entityKind: text('entity_kind').notNull(),
    entityId: integer('entity_id'),
    facet: text('facet').notNull(),
    sourceA: text('source_a').notNull(),
    valueA: text('value_a'),
    sourceB: text('source_b').notNull(),
    valueB: text('value_b'),
    status: text('status').notNull().default('open'),
    resolution: text('resolution'),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
    resolvedAt: text('resolved_at')
  },
  (t) => ({ byStatus: index('idx_football_conflict_status').on(t.status, t.entityKind) })
)

export const footballImportRun = sqliteTable(
  'football_import_run',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    kind: text('kind').notNull(),
    source: text('source').notNull(),
    competitionKey: text('competition_key'),
    seasonKey: text('season_key'),
    state: text('state').notNull(),
    version: text('version'),
    etag: text('etag'),
    checksum: text('checksum'),
    rawFingerprint: text('raw_fingerprint'),
    requestCount: integer('request_count').notNull().default(0),
    itemCount: integer('item_count').notNull().default(0),
    startedAt: text('started_at').notNull(),
    finishedAt: text('finished_at'),
    message: text('message')
  },
  (t) => ({ bySource: index('idx_football_import_run_source').on(t.source, t.startedAt) })
)

export const footballArticle = sqliteTable(
  'football_article',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    entityKind: text('entity_kind').notNull(),
    entityId: integer('entity_id').notNull(),
    title: text('title').notNull(),
    body: text('body'),
    sourceUrl: text('source_url').notNull(),
    revision: text('revision'),
    license: text('license'),
    attribution: text('attribution'),
    state: text('state').notNull().default('not_requested'),
    fetchedAt: text('fetched_at')
  },
  (t) => ({
    byEntity: index('idx_football_article_entity').on(t.entityKind, t.entityId),
    uniq: unique('uniq_football_article').on(t.entityKind, t.entityId, t.sourceUrl)
  })
)

export const footballFavorite = sqliteTable(
  'football_favorite',
  {
    entityKind: text('entity_kind').notNull(),
    entityId: integer('entity_id').notNull(),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`)
  },
  (t) => ({ pk: primaryKey({ columns: [t.entityKind, t.entityId] }) })
)

export const footballMatchJournal = sqliteTable('football_match_journal', {
  matchId: integer('match_id')
    .primaryKey()
    .references(() => footballMatch.id, { onDelete: 'cascade' }),
  watchedAt: text('watched_at'),
  rating: real('rating'),
  note: text('note'),
  updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
})

export const footballMedia = sqliteTable(
  'football_media',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    title: text('title').notNull(),
    kind: text('kind').notNull(),
    localPath: text('local_path'),
    url: text('url'),
    note: text('note'),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`),
    updatedAt: text('updated_at').notNull().default(sql`(datetime('now'))`)
  },
  (t) => ({ byKind: index('idx_football_media_kind').on(t.kind, t.createdAt) })
)

export const footballMediaLink = sqliteTable(
  'football_media_link',
  {
    mediaId: integer('media_id')
      .notNull()
      .references(() => footballMedia.id, { onDelete: 'cascade' }),
    entityKind: text('entity_kind').notNull(),
    entityId: integer('entity_id').notNull()
  },
  (t) => ({
    pk: primaryKey({ columns: [t.mediaId, t.entityKind, t.entityId] }),
    byEntity: index('idx_football_media_link_entity').on(t.entityKind, t.entityId)
  })
)

export const footballExternalLink = sqliteTable(
  'football_external_link',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    entityKind: text('entity_kind').notNull(),
    entityId: integer('entity_id').notNull(),
    provider: text('provider').notNull(),
    label: text('label'),
    url: text('url').notNull(),
    createdAt: text('created_at').notNull().default(sql`(datetime('now'))`)
  },
  (t) => ({
    byEntity: index('idx_football_external_link_entity').on(t.entityKind, t.entityId),
    uniq: unique('uniq_football_external_link').on(t.entityKind, t.entityId, t.provider, t.url)
  })
)

// Type-only mirror of the FTS5 virtual table declared in init.sql. Repositories
// use raw SQL; Drizzle never creates or queries this projection.
export const globalSearchFts = sqliteTable('global_search_fts', {
  kind: text('kind').notNull(),
  entityId: integer('entity_id').notNull(),
  name: text('name'),
  altName: text('alt_name')
})
