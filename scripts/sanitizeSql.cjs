/*
 * The personal-data wipe applied to an exported copy of the NaviHUB database.
 * Shared by the CLI exporter, the in-app exporter and tests. No caller may run
 * this against the live DB.
 */

const MEDIA_SECTIONS = ['anime', 'manga', 'visual_novel', 'game', 'movie', 'tv', 'book']

const DEFAULT_EXPORT_OPTIONS = Object.freeze({
  sections: Object.freeze([...MEDIA_SECTIONS, 'wrestling']),
  includeAssets: true,
  includeThemeAudio: true,
  includeSpotifyPlaylists: false,
  includeProgress: false,
  includeRatings: false,
  includeLists: false
})

function normalizeExportOptions(input = {}) {
  const requested = Array.isArray(input.sections) ? input.sections : DEFAULT_EXPORT_OPTIONS.sections
  const sections = [
    ...new Set(requested.filter((value) => [...MEDIA_SECTIONS, 'wrestling'].includes(value)))
  ]
  if (sections.length === 0) throw new Error('Select at least one library section')
  return {
    sections,
    includeAssets: input.includeAssets !== false,
    includeThemeAudio: input.includeThemeAudio !== false,
    includeSpotifyPlaylists: input.includeSpotifyPlaylists === true,
    includeProgress: input.includeProgress === true,
    includeRatings: input.includeRatings === true,
    includeLists: input.includeLists === true
  }
}

const FIXED_WIPES = [
  // Football is always excluded: the archive combines personal annotations,
  // machine paths and provider datasets that are not redistributable.
  'DELETE FROM football_media_link',
  'DELETE FROM football_external_link',
  'DELETE FROM football_favorite',
  'DELETE FROM football_match_journal',
  'DELETE FROM football_assertion',
  'DELETE FROM football_coverage',
  'DELETE FROM football_conflict',
  'DELETE FROM football_article',
  'DELETE FROM football_source_ref',
  'DELETE FROM football_import_run',
  'DELETE FROM football_lineup',
  'DELETE FROM football_event',
  'DELETE FROM football_standing',
  'DELETE FROM football_honour',
  'DELETE FROM football_tenure',
  'DELETE FROM football_media',
  'DELETE FROM football_match',
  'DELETE FROM football_stage',
  'DELETE FROM football_season',
  'DELETE FROM football_era',
  'DELETE FROM football_alias',
  'DELETE FROM football_person',
  'DELETE FROM football_team',
  'DELETE FROM football_competition',
  'DELETE FROM jp_tutor_error',
  'DELETE FROM jp_tutor_day',
  'DELETE FROM jp_ghost',
  'DELETE FROM jp_review_log',
  'DELETE FROM jp_card',
  'DELETE FROM jp_lesson',
  'DELETE FROM jp_course',
  'DELETE FROM jp_coverage_word',
  'DELETE FROM jp_coverage',
  'DELETE FROM music_play_log',
  'DELETE FROM music_spotify_download_queue_selection',
  'DELETE FROM music_spotify_download_queue',
  'DELETE FROM music_spotify_entity_track',
  'DELETE FROM music_spotify_entity_release',
  'DELETE FROM music_spotify_entity_snapshot',
  'DELETE FROM music_playlist_track',
  'DELETE FROM music_track',
  'DELETE FROM music_album',
  'DELETE FROM music_artist',
  'DELETE FROM manga_chapter',
  'DELETE FROM video_file',
  'DELETE FROM video_cache',
  'DELETE FROM wrestling_video',
  'DELETE FROM slideshow_item',
  'DELETE FROM media_image',
  'DELETE FROM quiz_session',
  'DELETE FROM game_session',
  'DELETE FROM achievement_unlock',
  'DELETE FROM gacha_build',
  'DELETE FROM gacha_unit',
  'DELETE FROM gacha_currency',
  'DELETE FROM gacha_banner',
  'DELETE FROM gacha_news',
  'DELETE FROM gacha_meta',
  'DELETE FROM gacha_chat_message',
  'DELETE FROM gacha_chat_thread',
  'DELETE FROM gacha_goal',
  'DELETE FROM gacha_coach_note',
  'DELETE FROM gacha_coach_doc',
  'DELETE FROM checklist_log',
  'DELETE FROM checklist_task',
  'DELETE FROM en_review_log',
  'DELETE FROM en_word',
  'DELETE FROM en_writing',
  'DELETE FROM prog_progress',
  'DELETE FROM prog_attempt',
  'DELETE FROM prog_cli_miss',
  'DELETE FROM prog_solve',
  // Legacy table retained by old live databases.
  'DELETE FROM sync_batch',
  `DELETE FROM settings WHERE key IN
     ('tmdb.api_key','rawg.api_key','igdb.client_id','igdb.client_secret','omdb.api_key','ytdlp.path','spotdl.path',
      'music.dir','manga.dir','books.dir','audio.dir','pictures.dir','slideshow.dir','video.dir','wrestling.dir','football.dir',
      'ffmpeg.path','ffprobe.path','mokuro.path',
      'gemini.api_key','anthropic.api_key',
      'steam.web_api_key','ra.username','ra.api_key','football.api_key','football.api_quota',
      'vertex.project_id','vertex.region','vertex.credentials_path',
      'sync.token','sync.device','sync.port',
      'jackett.url','jackett.api_key','jackett.start_cmd',
      'qbittorrent.url','qbittorrent.username','qbittorrent.password',
      'github.token','checklist.seeded','jp.knownBaseline')
     OR key LIKE 'japanese.seeded%' OR key LIKE 'franchise.%'
     OR key LIKE 'football.entitlement.%'`
]

function tableOf(sql) {
  return sql.match(/(?:DELETE FROM|UPDATE)\s+(\w+)/i)?.[1] ?? null
}

function sanitizeDb(db, input) {
  const options = normalizeExportOptions(input)
  const hasTableStmt = db.prepare(`SELECT 1 FROM sqlite_master WHERE type='table' AND name=?`)
  const hasTable = (name) => !!hasTableStmt.get(name)
  const run = (sql, ...args) => {
    const table = tableOf(sql)
    if (!table || hasTable(table)) db.prepare(sql).run(...args)
  }

  db.pragma('foreign_keys = ON')
  db.transaction(() => {
    if (hasTable('media_item')) {
      const media = options.sections.filter((section) => MEDIA_SECTIONS.includes(section))
      const holes = media.map(() => '?').join(',')
      run(
        media.length
          ? `DELETE FROM media_item WHERE media_type NOT IN (${holes})`
          : 'DELETE FROM media_item',
        ...media
      )
    }

    if (!options.sections.includes('wrestling')) {
      for (const sql of [
        'DELETE FROM wrestling_stable_member',
        'DELETE FROM wrestling_honour',
        'DELETE FROM wrestling_match_participant',
        'DELETE FROM wrestling_match',
        'DELETE FROM wrestling_stable',
        'DELETE FROM wrestling_wrestler',
        'DELETE FROM wrestling_alias',
        'DELETE FROM wrestling_event'
      ]) run(sql)
    }

    run(
      `UPDATE media_item SET local_dir=NULL, exe_path=NULL${
        options.includeProgress ? '' : ', status=NULL, progress=0, rewatch_count=0'
      }${options.includeRatings ? '' : ', score=NULL, notes=NULL, favorite=0'}`
    )
    if (!options.includeProgress) run('UPDATE tv_episode SET watched_at=NULL')

    run('UPDATE wrestling_event SET local_dir=NULL, poster_path=NULL')
    run('UPDATE wrestling_match SET video_id=NULL')
    if (!options.includeRatings) {
      run('UPDATE wrestling_event SET favorite=0')
      run('UPDATE wrestling_match SET rating=NULL, favorite=0')
      run('UPDATE wrestling_wrestler SET favorite=0')
      run('UPDATE wrestling_stable SET favorite=0')
      run('UPDATE theme_song SET favorite=0')
    }

    if (
      options.includeSpotifyPlaylists &&
      hasTable('music_playlist') &&
      hasTable('music_spotify_playlist')
    ) {
      run('UPDATE music_spotify_playlist_item SET matched_track_id=NULL')
      run(
        'DELETE FROM music_playlist WHERE id NOT IN (SELECT playlist_id FROM music_spotify_playlist)'
      )
    } else {
      run('DELETE FROM music_spotify_playlist_item')
      run('DELETE FROM music_spotify_playlist')
      run('DELETE FROM music_playlist')
    }

    if (!options.includeLists) {
      for (const sql of [
        'DELETE FROM list_item',
        'DELETE FROM list',
        'DELETE FROM tier_item',
        'DELETE FROM tier_row',
        'DELETE FROM tier_list'
      ]) run(sql)
    }

    for (const sql of FIXED_WIPES) run(sql)

    // Remove graph rows that were only reachable from excluded media. Do this
    // after media deletion has cascaded its credit/link rows.
    pruneGraph(db, hasTable)

    if (options.includeLists) filterPolymorphicCollections(db, hasTable)

    if (!options.includeAssets) {
      for (const sql of [
        'UPDATE media_item SET cover_path=NULL, banner_path=NULL',
        'UPDATE person SET photo_path=NULL',
        'UPDATE company SET logo_path=NULL',
        'UPDATE character SET image_path=NULL',
        'UPDATE achievement SET icon_path=NULL, icon_gray_path=NULL',
        'UPDATE music_spotify_playlist_item SET cover_path=NULL',
        'UPDATE wrestling_wrestler SET photo_path=NULL',
        'UPDATE wrestling_stable SET image_path=NULL'
      ]) run(sql)
    }
    if (!options.includeThemeAudio) run('UPDATE theme_song SET audio_path=NULL')
  })()

  return options
}

function filterPolymorphicCollections(db, hasTable) {
  const kinds = {
    media: 'media_item',
    person: 'person',
    character: 'character',
    company: 'company',
    wrestlingEvent: 'wrestling_event',
    wrestlingMatch: 'wrestling_match',
    wrestlingWrestler: 'wrestling_wrestler',
    footballCompetition: 'football_competition',
    footballTeam: 'football_team',
    footballPerson: 'football_person',
    footballMatch: 'football_match'
  }
  if (hasTable('list') && hasTable('list_item')) {
    for (const [kind, table] of Object.entries(kinds)) {
      if (!hasTable(table)) continue
      db.prepare(
        `DELETE FROM list_item WHERE list_id IN (SELECT id FROM list WHERE entity_kind=?)
         AND entity_id NOT IN (SELECT id FROM ${table})`
      ).run(kind)
    }
    db.prepare('DELETE FROM list WHERE id NOT IN (SELECT DISTINCT list_id FROM list_item)').run()
  }
  if (hasTable('tier_list') && hasTable('tier_item')) {
    for (const [kind, table] of Object.entries(kinds)) {
      if (!hasTable(table)) continue
      db.prepare(
        `DELETE FROM tier_item WHERE list_id IN (SELECT id FROM tier_list WHERE entity_kind=?)
         AND entity_id NOT IN (SELECT id FROM ${table})`
      ).run(kind)
    }
    db.prepare('DELETE FROM tier_list WHERE id NOT IN (SELECT DISTINCT list_id FROM tier_item)').run()
  }
}

function pruneGraph(db, hasTable) {
  const prune = (target, sources) => {
    if (!hasTable(target)) return
    const available = sources.filter(([table]) => hasTable(table)).map(([, query]) => query)
    if (available.length === 0) db.prepare(`DELETE FROM ${target}`).run()
    else db.prepare(`DELETE FROM ${target} WHERE id NOT IN (${available.join(' UNION ')})`).run()
  }
  prune('person', [
    ['credit', 'SELECT person_id FROM credit'],
    ['theme_artist', 'SELECT person_id FROM theme_artist']
  ])
  prune('character', [
    ['media_character', 'SELECT character_id FROM media_character'],
    ['credit', 'SELECT character_id FROM credit WHERE character_id IS NOT NULL']
  ])
  prune('company', [['media_company', 'SELECT company_id FROM media_company']])
  prune('tag', [['media_tag', 'SELECT tag_id FROM media_tag']])
}

// Kept for the sanitizer coverage guard and callers that inspect the default
// policy. This is the CLI's existing safe behavior.
const SANITIZE_STATEMENTS = FIXED_WIPES

module.exports = {
  MEDIA_SECTIONS,
  DEFAULT_EXPORT_OPTIONS,
  SANITIZE_STATEMENTS,
  normalizeExportOptions,
  sanitizeDb
}
