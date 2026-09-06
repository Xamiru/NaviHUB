#!/usr/bin/env node
/*
 * NaviHUB one-time BULK importer.
 *
 * This is NOT wired into the app — it's a standalone maintenance script you run
 * once to seed the library, then forget. It talks to the same SQLite DB the app
 * uses (~/.config/navihub/navihub.db) and writes images into the same media
 * folder, replicating the exact persist logic from src/main/anilist.ts and
 * src/main/tmdb.ts (dedup by external_source/external_id, authoritative re-import
 * with prune, personal-tracking preservation).
 *
 * IMPORTANT — how to run it:
 *   Run through Electron-as-Node so the importer uses the packaged app's
 *   Node/native runtime:
 *
 *     ELECTRON_RUN_AS_NODE=1 ./node_modules/.bin/electron scripts/bulk-import.cjs <command> [flags]
 *
 *   (Inside the VS Code / Claude Code terminal ELECTRON_RUN_AS_NODE is already set,
 *    so `./node_modules/.bin/electron scripts/bulk-import.cjs ...` is enough.)
 *
 *   >>> CLOSE THE NAVIHUB APP FIRST <<< so the two processes don't fight over writes.
 *
 * Commands:
 *   anilist-user <username> [--limit N] [--basic] [--preserve-tracking] [--skip-anime] [--skip-manga] [--delay MS]
 *       Import your whole AniList anime AND manga lists by username (public, no login).
 *       Brings over your status / score (0-10) / progress. Full detail by default
 *       (characters, voice actors, studios, staff — the VA cross-link graph; manga
 *       gets characters + mangaka, no voice actors). --basic skips cast/staff for a
 *       fast metadata+tracking seed. --skip-anime / --skip-manga do just one list.
 *
 *   anilist-top [--anime N] [--manga N] [--sort score|popularity|trending|favourites] [--basic] [--only-missing] [--delay MS]
 *       Import AniList's ranked "top" lists (NOT a user's tracked list — see
 *       anilist-user for that). --anime/--manga set how many of each (either or
 *       both; defaults to 500 anime if neither given). Adult titles are excluded.
 *       --sort score (default, mirrors AniList's Top 100) | popularity | trending
 *       | favourites. Full detail by default; --basic for a fast metadata seed.
 *       Re-import preserves the personal status/score on titles you already track.
 *       --only-missing skips titles already in the library (resume a run).
 *
 *   imdb-top [--count N] [--min-votes N] [--only-missing] [--exclude-langs hi,ta,…] [--omdb-key KEY] [--delay MS]
 *       Import the all-time greatest films, ranked the way IMDb's own Top 250 is.
 *       --only-missing resumes an interrupted run (skips titles already in the
 *       library). --exclude-langs skips movies by ORIGINAL language (ISO 639-1
 *       codes, comma-separated) and fills the count with the next ranked titles.
 *       Pulls IMDb's official ratings dataset (~25 MB, free for personal use),
 *       ranks by the weighted-rating (Bayesian) formula with a vote floor
 *       (--min-votes, default 25000), then resolves each IMDb id to TMDB by id
 *       (no fuzzy name search; non-movies are skipped). Defaults: --count 500.
 *       This is the recommended "greatest movies" command (TMDB's own lists skew
 *       to recent/hyped titles). OMDb scores apply as in tmdb-top.
 *
 *   tmdb-top [--type movie|tv] [--list top_rated|popular|trending] [--count N] [--omdb-key KEY] [--delay MS]
 *       Import a ranked list of titles from TMDB. Once app credentials are
 *       protected, provide NAVIHUB_TMDB_API_KEY to this headless command.
 *       Defaults: --type movie --list top_rated --count 50.
 *       --omdb-key adds IMDb rating + Rotten Tomatoes per title (free key from
 *       omdbapi.com; NAVIHUB_OMDB_API_KEY is the environment alternative).
 *
 *   rawg-top [--list metacritic|rating|added] [--count N] [--rawg-key KEY] [--no-hltb] [--delay MS]
 *       Import a ranked list of video games from RAWG. Pass --rawg-key for this
 *       run or provide NAVIHUB_RAWG_API_KEY. The headless script never writes
 *       plaintext credentials back to settings. Defaults: --list metacritic
 *       --count 500. DLC/special editions are skipped (exclude_additions).
 *       Each game gets developers/publishers, genres, Metacritic score, and —
 *       unless --no-hltb — HowLongToBeat play times, same as the in-app
 *       importer. RAWG has no cast data; characters/VAs stay hand-curated.
 *
 *   anime-themes [--limit N] [--no-audio] [--only-missing] [--audio-dir PATH] [--delay MS]
 *       Add opening/ending songs (+ artists + audio) to every AniList-sourced
 *       anime already in the library, from AnimeThemes.moe. Downloads each .ogg
 *       by default (a few MB each); --no-audio stores only the streaming URL.
 *       --audio-dir sets where audio is saved (e.g. a roomier drive) and remembers
 *       it for the app too. --only-missing skips anime that already have themes.
 *       Run this AFTER anilist-user so there are anime to match.
 *
 * Examples:
 *   ./node_modules/.bin/electron scripts/bulk-import.cjs anilist-user YourName
 *   ./node_modules/.bin/electron scripts/bulk-import.cjs anilist-user YourName --basic --limit 200
 *   ./node_modules/.bin/electron scripts/bulk-import.cjs tmdb-top --type movie --list top_rated --count 100
 *   ./node_modules/.bin/electron scripts/bulk-import.cjs tmdb-top --type tv --list popular --count 40
 *   ./node_modules/.bin/electron scripts/bulk-import.cjs rawg-top --rawg-key YOURKEY --count 300
 */

const path = require('path')
const os = require('os')
const fs = require('fs')
const zlib = require('zlib')
const Database = require('better-sqlite3')

/* ----------------------------- paths / db ----------------------------- */
// Mirrors Electron's app.getPath('userData') on Linux: ~/.config/<name>.
// Override with NAVIHUB_DIR if your data lives elsewhere.
const USER_DIR = process.env.NAVIHUB_DIR || path.join(os.homedir(), '.config', 'navihub')
const DB_PATH = path.join(USER_DIR, 'navihub.db')
const MEDIA_DIR = path.join(USER_DIR, 'media')

if (!fs.existsSync(DB_PATH)) {
  console.error(`✗ DB not found at ${DB_PATH}. Run the app once first (or set NAVIHUB_DIR).`)
  process.exit(1)
}
if (!fs.existsSync(MEDIA_DIR)) fs.mkdirSync(MEDIA_DIR, { recursive: true })

const db = new Database(DB_PATH)
db.pragma('journal_mode = WAL')
db.pragma('foreign_keys = ON')

// The theme tables are newer than some DBs; create them if the app hasn't yet
// (CREATE TABLE IF NOT EXISTS mirrors src/main/db/init.sql — keep in sync).
db.exec(`
  CREATE TABLE IF NOT EXISTS theme_song (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    media_id INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
    slug TEXT, type TEXT, sequence INTEGER, title TEXT,
    audio_url TEXT, audio_path TEXT, sort_order INTEGER,
    favorite INTEGER NOT NULL DEFAULT 0,
    external_source TEXT, external_id TEXT,
    UNIQUE(external_source, external_id)
  );
  CREATE INDEX IF NOT EXISTS idx_theme_media ON theme_song(media_id);
  CREATE TABLE IF NOT EXISTS theme_artist (
    theme_song_id INTEGER NOT NULL REFERENCES theme_song(id) ON DELETE CASCADE,
    person_id INTEGER NOT NULL REFERENCES person(id) ON DELETE CASCADE,
    sort_order INTEGER,
    UNIQUE(theme_song_id, person_id)
  );
  CREATE INDEX IF NOT EXISTS idx_theme_artist_song ON theme_artist(theme_song_id);
  CREATE INDEX IF NOT EXISTS idx_theme_artist_person ON theme_artist(person_id);
`)

// The standalone importer does not run the app's migration registry. Keep the
// nullable AniList character-gender column available even when this script is
// the first process opened after updating the checkout.
const characterColumns = db.prepare('PRAGMA table_info(character)').all()
if (!characterColumns.some((column) => column.name === 'gender')) {
  db.exec('ALTER TABLE character ADD COLUMN gender TEXT')
}

/* ----------------------------- utilities ----------------------------- */
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
const PROTECTED_SECRET_PREFIX = 'navihub-secret:v1:'

// Electron safeStorage is a main-process API and is intentionally unavailable
// under ELECTRON_RUN_AS_NODE. Headless maintenance commands accept explicit
// environment values instead of trying to weaken or bypass protected storage.
function maintenanceSecret(key, environmentName, required = false) {
  const fromEnvironment = process.env[environmentName]?.trim()
  if (fromEnvironment) return fromEnvironment
  const row = db.prepare('SELECT value FROM settings WHERE key = ?').get(key)
  const stored = row?.value?.trim() || ''
  if (stored.startsWith(PROTECTED_SECRET_PREFIX)) {
    if (!required) return null
    throw new Error(
      `${key} is protected by NaviHUB and cannot be decrypted by this headless command. ` +
        `Set ${environmentName} for this run.`
    )
  }
  return stored || null
}

let dlCounter = 0
// Mirrors src/main/files.ts downloadImage(): fetch a remote image into MEDIA_DIR,
// return the stored relative path ("media/dl-...") or null on any failure.
async function downloadImage(url) {
  if (!url) return null
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const urlExt = path.extname(new URL(url).pathname)
    const ext = /^\.(png|jpe?g|webp|gif|bmp)$/i.test(urlExt) ? urlExt : '.jpg'
    dlCounter += 1
    const fileName = `dl-${process.pid}-${dlCounter}${ext}`
    fs.writeFileSync(path.join(MEDIA_DIR, fileName), buf)
    return path.join('media', fileName)
  } catch {
    return null
  }
}

// Theme-song audio dir — resolved by cmdAnimeThemes from --audio-dir / the
// `audio.dir` setting / the default media dir. Files are stored under a virtual
// "audio/" prefix (see src/main/files.ts) so the location stays swappable.
let AUDIO_DIR = MEDIA_DIR
// Illegal path chars + control chars -> space (mirrors src/main/files.ts).
function sanitizeFileBase(s) {
  // eslint-disable-next-line no-control-regex
  const clean = s.replace(/[/\\:*?"<>|\x00-\x1f]+/g, ' ').replace(/\s+/g, ' ').trim().slice(0, 120)
  return clean || 'theme'
}
// Mirrors src/main/files.ts downloadAudio(): fetch a remote audio file into the
// audio dir, return the stored relative path ("audio/<file>") or null. baseName
// gives the file a readable name (e.g. "Berserk OP1 - Tell Me Why").
async function downloadAudio(url, baseName) {
  if (!url) return null
  try {
    const res = await fetch(url)
    if (!res.ok) return null
    const buf = Buffer.from(await res.arrayBuffer())
    const urlExt = path.extname(new URL(url).pathname)
    const ext = /^\.(ogg|mp3|m4a|aac|opus|webm|wav)$/i.test(urlExt) ? urlExt : '.ogg'
    if (!fs.existsSync(AUDIO_DIR)) fs.mkdirSync(AUDIO_DIR, { recursive: true })
    let fileName
    if (baseName && baseName.trim()) {
      fileName = `${sanitizeFileBase(baseName)}${ext}`
    } else {
      dlCounter += 1
      fileName = `aud-${process.pid}-${dlCounter}${ext}`
    }
    fs.writeFileSync(path.join(AUDIO_DIR, fileName), buf)
    return `audio/${fileName}`
  } catch {
    return null
  }
}

// Merge a JSON-patch into an existing metadata JSON string (null-safe). null/
// undefined patch values are skipped so we never clobber with nothing.
function mergeMeta(rawJson, patch) {
  let obj = {}
  if (rawJson) {
    try {
      obj = JSON.parse(rawJson) || {}
    } catch {
      obj = {}
    }
  }
  for (const [k, v] of Object.entries(patch)) {
    if (v == null) continue
    obj[k] = v
  }
  return Object.keys(obj).length ? JSON.stringify(obj) : null
}

// genre name -> tag id (shared by both sources).
function upsertTagAndLink(mediaId, name) {
  if (!name) return
  const existing = db.prepare('SELECT id FROM tag WHERE name=?').get(name)
  const tagId = existing
    ? existing.id
    : Number(db.prepare('INSERT INTO tag (name, category) VALUES (?, ?)').run(name, 'genre').lastInsertRowid)
  db.prepare('INSERT OR IGNORE INTO media_tag (media_id, tag_id) VALUES (?, ?)').run(mediaId, tagId)
}

// Authoritative prune (mirrors both importers): drop SOURCE-sourced characters
// linked to this media that weren't in the latest import, then sweep orphans.
function pruneCharacters(mediaId, source, keptCharacterIds) {
  const linked = db
    .prepare(
      `SELECT mc.character_id AS cid FROM media_character mc
       JOIN character ch ON ch.id = mc.character_id
       WHERE mc.media_id = ? AND ch.external_source = ?`
    )
    .all(mediaId, source)
  for (const { cid } of linked) {
    if (!keptCharacterIds.has(cid)) {
      db.prepare('DELETE FROM credit WHERE media_id = ? AND character_id = ?').run(mediaId, cid)
      db.prepare('DELETE FROM media_character WHERE media_id = ? AND character_id = ?').run(mediaId, cid)
    }
  }
  db.prepare(
    `DELETE FROM character WHERE external_source = ?
     AND id NOT IN (SELECT character_id FROM media_character)`
  ).run(source)
}

function parseFlags(argv) {
  const flags = {}
  const positional = []
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]
    if (a.startsWith('--')) {
      const key = a.slice(2)
      const next = argv[i + 1]
      if (next === undefined || next.startsWith('--')) flags[key] = true
      else {
        flags[key] = next
        i++
      }
    } else positional.push(a)
  }
  return { flags, positional }
}

/* =====================================================================
 * ANILIST  (anime) — ports src/main/anilist.ts
 * ===================================================================== */
const AL_ENDPOINT = 'https://graphql.anilist.co'
const AL_SOURCE = 'anilist'
// Manga characters get their own source so a character shared by an anime and
// its manga stays two distinct rows (and each prune stays scoped to its type).
const AL_MANGA_CHAR_SOURCE = 'anilist-manga'

async function alGql(query, variables, attempt = 0) {
  const res = await fetch(AL_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({ query, variables })
  })
  if (res.status === 429) {
    const retry = Number(res.headers.get('retry-after')) || 60
    console.log(`   …rate-limited by AniList, waiting ${retry}s`)
    await sleep((retry + 1) * 1000)
    return alGql(query, variables, attempt)
  }
  if (!res.ok) {
    if (attempt < 3) {
      await sleep(2000)
      return alGql(query, variables, attempt + 1)
    }
    throw new Error(`AniList request failed (${res.status})`)
  }
  const json = await res.json()
  if (json.errors?.length) throw new Error(json.errors[0].message ?? 'AniList error')
  return json.data
}

const alPickTitle = (t) => ({
  title: t?.english || t?.romaji || t?.native || 'Untitled',
  native: t?.native ?? null
})
function alStripHtml(s) {
  if (!s) return null
  return s.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]+>/g, '').replace(/\n{3,}/g, '\n\n').trim()
}
function alFmtDate(d) {
  if (!d?.year) return null
  return `${d.year}-${String(d.month ?? 1).padStart(2, '0')}-${String(d.day ?? 1).padStart(2, '0')}`
}
function alRankFromRole(role) {
  switch ((role ?? '').toUpperCase()) {
    case 'MAIN': return 0
    case 'SUPPORTING': return 1
    case 'BACKGROUND': return 2
    default: return 3
  }
}
function alMapStaffRole(role) {
  const r = (role ?? '').toLowerCase()
  if (r.includes('director') && !r.includes('art') && !r.includes('sound')) return 'director'
  if (r.includes('composition') || r.includes('script') || r.includes('screenplay')) return 'writer'
  if (r.includes('music')) return 'composer'
  return 'staff'
}
// Manga staff are mostly the author/artist; surface those as mangaka.
function alMapMangaStaffRole(role) {
  const r = (role ?? '').toLowerCase()
  if (r.includes('story') || r.includes('art') || r.includes('creator') || r.includes('mangaka')) return 'mangaka'
  return 'staff'
}

// AniList relation types surfaced on the detail page: the season chain + the
// manga/novel a title was adapted from (SOURCE) or that adapts it (ADAPTATION).
const AL_RELATION_TYPES = new Set([
  'PREQUEL', 'SEQUEL', 'PARENT', 'SIDE_STORY', 'ALTERNATIVE', 'SPIN_OFF', 'SOURCE', 'ADAPTATION'
])

// The bulk script opens the DB raw and never runs init.sql, so the (newly added)
// media_relation table may not exist yet — create it on demand. DDL mirrors
// init.sql exactly; IF NOT EXISTS keeps it idempotent with the app's own init.
function ensureRelationTable() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS media_relation (
      id                   INTEGER PRIMARY KEY AUTOINCREMENT,
      media_id             INTEGER NOT NULL REFERENCES media_item(id) ON DELETE CASCADE,
      relation_type        TEXT NOT NULL,
      related_source       TEXT NOT NULL,
      related_external_id  TEXT NOT NULL,
      related_type         TEXT,
      related_title        TEXT,
      sort_order           INTEGER,
      UNIQUE(media_id, related_source, related_external_id)
    );
    CREATE INDEX IF NOT EXISTS idx_media_relation_media ON media_relation(media_id);
    CREATE INDEX IF NOT EXISTS idx_media_relation_related
      ON media_relation(related_source, related_external_id);
  `)
}

// Ports replaceRelations(): authoritatively replaces a title's relations. Keyed
// by the related work's AniList id (both anime and manga media_items use
// AL_SOURCE and AniList ids are unique across both), so links resolve whichever
// title is imported first.
function alReplaceRelations(mediaId, relations) {
  db.prepare('DELETE FROM media_relation WHERE media_id = ?').run(mediaId)
  const ins = db.prepare(
    `INSERT OR IGNORE INTO media_relation
       (media_id, relation_type, related_source, related_external_id, related_type, related_title, sort_order)
     VALUES (?, ?, ?, ?, ?, ?, ?)`
  )
  let order = 0
  for (const edge of relations?.edges ?? []) {
    if (!AL_RELATION_TYPES.has(edge?.relationType)) continue
    const node = edge.node
    if (!node?.id) continue
    const { title } = alPickTitle(node.title)
    const type = node.type ? String(node.type).toLowerCase() : null
    ins.run(mediaId, edge.relationType, AL_SOURCE, String(node.id), type, title, order++)
  }
}

// Lightweight relations-only query (no `type:` filter → works for anime & manga
// by id), used by the relations-backfill command.
const AL_RELATIONS_QUERY = `
query ($id: Int) {
  Media(id: $id) {
    id
    relations {
      edges {
        relationType
        node { id type title { romaji english native } }
      }
    }
  }
}`

const AL_DETAIL_QUERY = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title { romaji english native }
    description(asHtml: false)
    episodes
    averageScore
    season
    seasonYear
    startDate { year month day }
    coverImage { large extraLarge }
    genres
    studios { edges { isMain node { id name } } }
    relations {
      edges {
        relationType
        node { id type title { romaji english native } }
      }
    }
    characters(sort: [ROLE, FAVOURITES_DESC], page: 1, perPage: 25) {
      pageInfo { hasNextPage }
      edges {
        role
        node { id name { full native } gender image { large } }
        voiceActors(language: JAPANESE) { id name { full native } image { large } }
      }
    }
    staff(perPage: 8, sort: RELEVANCE) {
      edges { role node { id name { full native } image { large } } }
    }
  }
}`

const AL_CHARS_QUERY = `
query ($id: Int, $page: Int) {
  Media(id: $id, type: ANIME) {
    characters(sort: [ROLE, FAVOURITES_DESC], page: $page, perPage: 25) {
      pageInfo { hasNextPage }
      edges {
        role
        node { id name { full native } gender image { large } }
        voiceActors(language: JAPANESE) { id name { full native } image { large } }
      }
    }
  }
}`

// A user's anime list with personal tracking. Public — no auth.
const AL_LIST_QUERY = `
query ($userName: String) {
  MediaListCollection(userName: $userName, type: ANIME) {
    lists {
      name
      isCustomList
      entries {
        status
        score(format: POINT_10)
        progress
        media { id }
      }
    }
  }
}`

// A user's manga list with personal tracking (same shape, type MANGA).
const AL_LIST_QUERY_MANGA = `
query ($userName: String) {
  MediaListCollection(userName: $userName, type: MANGA) {
    lists {
      name
      isCustomList
      entries {
        status
        score(format: POINT_10)
        progress
        media { id }
      }
    }
  }
}`

// AniList list status -> the app's default anime status labels.
const AL_STATUS_MAP = {
  CURRENT: 'Watching',
  REPEATING: 'Watching',
  PLANNING: 'Plan to Watch',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
  PAUSED: 'On Hold'
}

// -> the app's default manga status labels (Reading / Plan to Read…).
const AL_STATUS_MAP_MANGA = {
  CURRENT: 'Reading',
  REPEATING: 'Reading',
  PLANNING: 'Plan to Read',
  COMPLETED: 'Completed',
  DROPPED: 'Dropped',
  PAUSED: 'On Hold'
}

async function alUpsertCompany(node) {
  const ext = String(node.id)
  const row = db.prepare('SELECT id FROM company WHERE external_source=? AND external_id=?').get(AL_SOURCE, ext)
  if (row) return row.id
  return Number(
    db.prepare('INSERT INTO company (name, type, external_source, external_id) VALUES (?, ?, ?, ?)')
      .run(node.name, 'studio', AL_SOURCE, ext).lastInsertRowid
  )
}
async function alUpsertPerson(node) {
  const ext = String(node.id)
  const row = db.prepare('SELECT id, photo_path FROM person WHERE external_source=? AND external_id=?').get(AL_SOURCE, ext)
  const name = node.name?.full ?? 'Unknown'
  const nativeName = node.name?.native ?? null
  if (row) {
    if (!row.photo_path && node.image?.large) {
      const p = await downloadImage(node.image.large)
      if (p) db.prepare('UPDATE person SET photo_path=? WHERE id=?').run(p, row.id)
    }
    return row.id
  }
  const photo = await downloadImage(node.image?.large)
  return Number(
    db.prepare('INSERT INTO person (name, name_native, photo_path, external_source, external_id) VALUES (?, ?, ?, ?, ?)')
      .run(name, nativeName, photo, AL_SOURCE, ext).lastInsertRowid
  )
}
async function alUpsertCharacter(node, charSource = AL_SOURCE) {
  const ext = String(node.id)
  const row = db.prepare('SELECT id, image_path FROM character WHERE external_source=? AND external_id=?').get(charSource, ext)
  const name = node.name?.full ?? 'Unknown'
  const nativeName = node.name?.native ?? null
  const normalizedGender = typeof node.gender === 'string'
    ? node.gender.trim().toLowerCase().replace(/[^a-z]+/g, '')
    : ''
  const gender = ['male', 'female', 'nonbinary'].includes(normalizedGender)
    ? normalizedGender
    : null
  if (row) {
    const p = !row.image_path && node.image?.large ? await downloadImage(node.image.large) : null
    db.prepare('UPDATE character SET gender=?, image_path=COALESCE(image_path, ?) WHERE id=?')
      .run(gender, p, row.id)
    return row.id
  }
  const img = await downloadImage(node.image?.large)
  return Number(
    db.prepare('INSERT INTO character (name, name_native, gender, image_path, external_source, external_id) VALUES (?, ?, ?, ?, ?, ?)')
      .run(name, nativeName, gender, img, charSource, ext).lastInsertRowid
  )
}

// Ports importAnime(). `full` controls whether cast/staff are fetched.
async function alImportAnime(anilistId, { full }) {
  const data = await alGql(AL_DETAIL_QUERY, { id: anilistId })
  const m = data?.Media
  if (!m) throw new Error('Anime not found on AniList')

  const { title, native } = alPickTitle(m.title)
  const coverPath = await downloadImage(m.coverImage?.extraLarge || m.coverImage?.large)

  const existing = db.prepare('SELECT id FROM media_item WHERE external_source=? AND external_id=?').get(AL_SOURCE, String(m.id))
  let mediaId
  const created = !existing
  if (existing) {
    mediaId = existing.id
    db.prepare(
      `UPDATE media_item SET title=?, title_original=?, synopsis=?, cover_path=COALESCE(?, cover_path),
       total_units=?, release_date=?, updated_at=datetime('now') WHERE id=?`
    ).run(title, native, alStripHtml(m.description), coverPath, m.episodes ?? null, alFmtDate(m.startDate), mediaId)
  } else {
    mediaId = Number(
      db.prepare(
        `INSERT INTO media_item
         (media_type, title, title_original, synopsis, cover_path, total_units, release_date, external_source, external_id)
         VALUES ('anime', ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(title, native, alStripHtml(m.description), coverPath, m.episodes ?? null, alFmtDate(m.startDate), AL_SOURCE, String(m.id)).lastInsertRowid
    )
  }

  // AniList community average (0-100) + airing season -> metadata, merged so
  // re-import doesn't wipe any other metadata keys. Shown beside the user's
  // own score in the app; season feeds the Seasonal page.
  const metaRow = db.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId)
  const meta = mergeMeta(metaRow?.metadata, {
    averageScore: typeof m.averageScore === 'number' && m.averageScore > 0 ? m.averageScore : null,
    season: typeof m.season === 'string' && m.season ? m.season : null,
    seasonYear: typeof m.seasonYear === 'number' && m.seasonYear > 0 ? m.seasonYear : null
  })
  db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(meta, mediaId)

  // studios (main only) + genres always (cheap, no images for studios/genres)
  let studios = 0
  for (const edge of m.studios?.edges ?? []) {
    if (!edge.isMain) continue
    const companyId = await alUpsertCompany(edge.node)
    db.prepare('INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)').run(mediaId, companyId, 'animation_studio')
    studios++
  }
  for (const g of m.genres ?? []) upsertTagAndLink(mediaId, g)

  let cast = 0
  let staff = 0
  if (full) {
    const MAX_CHARACTERS = 125
    const charEdges = [...(m.characters?.edges ?? [])]
    let hasNext = !!m.characters?.pageInfo?.hasNextPage
    let page = 1
    while (hasNext && charEdges.length < MAX_CHARACTERS) {
      page++
      const more = await alGql(AL_CHARS_QUERY, { id: anilistId, page })
      const conn = more?.Media?.characters
      charEdges.push(...(conn?.edges ?? []))
      hasNext = !!conn?.pageInfo?.hasNextPage
    }
    const limited = charEdges.slice(0, MAX_CHARACTERS)

    let order = 0
    const keptCharacterIds = new Set()
    for (const edge of limited) {
      const characterId = await alUpsertCharacter(edge.node)
      keptCharacterIds.add(characterId)
      const sortOrder = order++
      const importance = alRankFromRole(edge.role)
      db.prepare(
        `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)
         ON CONFLICT(media_id, character_id) DO UPDATE SET sort_order = excluded.sort_order`
      ).run(mediaId, characterId, sortOrder)
      for (const va of edge.voiceActors ?? []) {
        const personId = await alUpsertPerson(va)
        const dup = db.prepare('SELECT id FROM credit WHERE media_id=? AND person_id=? AND character_id IS ? AND role=?')
          .get(mediaId, personId, characterId, 'voice_actor')
        if (dup) db.prepare('UPDATE credit SET importance=? WHERE id=?').run(importance, dup.id)
        else db.prepare('INSERT INTO credit (media_id, person_id, character_id, role, language, importance) VALUES (?, ?, ?, ?, ?, ?)')
          .run(mediaId, personId, characterId, 'voice_actor', 'Japanese', importance)
        cast++
      }
    }
    pruneCharacters(mediaId, AL_SOURCE, keptCharacterIds)

    for (const edge of m.staff?.edges ?? []) {
      const personId = await alUpsertPerson(edge.node)
      const role = alMapStaffRole(edge.role)
      const dup = db.prepare('SELECT id FROM credit WHERE media_id=? AND person_id=? AND role=? AND character_id IS NULL').get(mediaId, personId, role)
      if (!dup) db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)').run(mediaId, personId, role)
      staff++
    }
  }

  // related titles (seasons + manga source) — cheap, always captured
  alReplaceRelations(mediaId, m.relations)

  return { mediaId, title, studios, cast, staff, created }
}

const AL_DETAIL_QUERY_MANGA = `
query ($id: Int) {
  Media(id: $id, type: MANGA) {
    id
    title { romaji english native }
    description(asHtml: false)
    chapters
    averageScore
    startDate { year month day }
    coverImage { large extraLarge }
    genres
    relations {
      edges {
        relationType
        node { id type title { romaji english native } }
      }
    }
    characters(sort: [ROLE, FAVOURITES_DESC], page: 1, perPage: 25) {
      pageInfo { hasNextPage }
      edges { role node { id name { full native } gender image { large } } }
    }
    staff(perPage: 8, sort: RELEVANCE) {
      edges { role node { id name { full native } gender image { large } } }
    }
  }
}`

const AL_CHARS_QUERY_MANGA = `
query ($id: Int, $page: Int) {
  Media(id: $id, type: MANGA) {
    characters(sort: [ROLE, FAVOURITES_DESC], page: $page, perPage: 25) {
      pageInfo { hasNextPage }
      edges { role node { id name { full native } image { large } } }
    }
  }
}`

// Ports importManga(): like anime but no studios, no voice actors; characters use
// AL_MANGA_CHAR_SOURCE and staff are surfaced as mangaka.
async function alImportManga(anilistId, { full }) {
  const data = await alGql(AL_DETAIL_QUERY_MANGA, { id: anilistId })
  const m = data?.Media
  if (!m) throw new Error('Manga not found on AniList')

  const { title, native } = alPickTitle(m.title)
  const coverPath = await downloadImage(m.coverImage?.extraLarge || m.coverImage?.large)

  const existing = db.prepare('SELECT id FROM media_item WHERE external_source=? AND external_id=?').get(AL_SOURCE, String(m.id))
  let mediaId
  const created = !existing
  if (existing) {
    mediaId = existing.id
    db.prepare(
      `UPDATE media_item SET title=?, title_original=?, synopsis=?, cover_path=COALESCE(?, cover_path),
       total_units=?, release_date=?, updated_at=datetime('now') WHERE id=?`
    ).run(title, native, alStripHtml(m.description), coverPath, m.chapters ?? null, alFmtDate(m.startDate), mediaId)
  } else {
    mediaId = Number(
      db.prepare(
        `INSERT INTO media_item
         (media_type, title, title_original, synopsis, cover_path, total_units, release_date, external_source, external_id)
         VALUES ('manga', ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(title, native, alStripHtml(m.description), coverPath, m.chapters ?? null, alFmtDate(m.startDate), AL_SOURCE, String(m.id)).lastInsertRowid
    )
  }

  const metaRow = db.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId)
  const meta = mergeMeta(metaRow?.metadata, {
    averageScore: typeof m.averageScore === 'number' && m.averageScore > 0 ? m.averageScore : null
  })
  db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(meta, mediaId)

  for (const g of m.genres ?? []) upsertTagAndLink(mediaId, g)

  let staff = 0
  const keptCharacterIds = new Set()
  if (full) {
    const MAX_CHARACTERS = 125
    const charEdges = [...(m.characters?.edges ?? [])]
    let hasNext = !!m.characters?.pageInfo?.hasNextPage
    let page = 1
    while (hasNext && charEdges.length < MAX_CHARACTERS) {
      page++
      const more = await alGql(AL_CHARS_QUERY_MANGA, { id: anilistId, page })
      const conn = more?.Media?.characters
      charEdges.push(...(conn?.edges ?? []))
      hasNext = !!conn?.pageInfo?.hasNextPage
    }
    const limited = charEdges.slice(0, MAX_CHARACTERS)

    let order = 0
    for (const edge of limited) {
      const characterId = await alUpsertCharacter(edge.node, AL_MANGA_CHAR_SOURCE)
      keptCharacterIds.add(characterId)
      const sortOrder = order++
      db.prepare(
        `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)
         ON CONFLICT(media_id, character_id) DO UPDATE SET sort_order = excluded.sort_order`
      ).run(mediaId, characterId, sortOrder)
    }
    pruneCharacters(mediaId, AL_MANGA_CHAR_SOURCE, keptCharacterIds)

    for (const edge of m.staff?.edges ?? []) {
      const personId = await alUpsertPerson(edge.node)
      const role = alMapMangaStaffRole(edge.role)
      const dup = db.prepare('SELECT id FROM credit WHERE media_id=? AND person_id=? AND role=? AND character_id IS NULL').get(mediaId, personId, role)
      if (!dup) db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)').run(mediaId, personId, role)
      staff++
    }
  }

  // related titles (other parts + anime adaptation) — cheap, always captured
  alReplaceRelations(mediaId, m.relations)

  // cast count reports linked characters (manga has no per-character credits).
  return { mediaId, title, studios: 0, cast: keptCharacterIds.size, staff, created }
}

// Import one AniList list (anime or manga) for a user. Shared by both sections.
async function alImportUserSection(sec, username, { full, limit, preserveTracking, delay }) {
  console.log(`▶ Fetching AniList ${sec.label} list for "${username}"…`)
  const data = await alGql(sec.listQuery, { userName: username })
  const lists = data?.MediaListCollection?.lists ?? []
  // Standard status lists only (skip custom lists, which duplicate entries).
  const seen = new Set()
  const entries = []
  for (const list of lists) {
    if (list.isCustomList) continue
    for (const e of list.entries ?? []) {
      const id = e.media?.id
      if (!id || seen.has(id)) continue
      seen.add(id)
      entries.push(e)
    }
  }
  const targets = entries.slice(0, limit === Infinity ? entries.length : limit)
  console.log(`  Found ${entries.length} ${sec.label}${targets.length < entries.length ? `, importing first ${targets.length}` : ''}. Mode: ${full ? 'full detail' : 'basic'}.\n`)

  let ok = 0
  const failures = []
  for (let i = 0; i < targets.length; i++) {
    const e = targets[i]
    const id = e.media.id
    const tag = `[${sec.label} ${i + 1}/${targets.length}]`
    try {
      const sum = await sec.importFn(id, { full })
      // tracking: AniList authoritative by default; --preserve-tracking only sets on first add.
      if (!preserveTracking || sum.created) {
        const status = sec.statusMap[e.status] ?? null
        const score = e.score && e.score > 0 ? e.score : null
        db.prepare(`UPDATE media_item SET status=?, score=?, progress=?, updated_at=datetime('now') WHERE id=?`)
          .run(status, score, e.progress ?? 0, sum.mediaId)
      }
      ok++
      console.log(`${tag} ✓ ${sum.title} (${sum.created ? 'added' : 'updated'}${full ? `, ${sum.cast} ${sec.castLabel}` : ''})`)
    } catch (err) {
      failures.push({ id, msg: err.message })
      console.log(`${tag} ✗ AniList ${sec.label} #${id} — ${err.message}`)
    }
    if (delay) await sleep(delay)
  }

  console.log(`\n✔ ${sec.label}: ${ok}/${targets.length} imported.${failures.length ? ` ${failures.length} failed.` : ''}`)
  if (failures.length) console.log('  Failed ids:', failures.map((f) => f.id).join(', '))
  return { ok, total: targets.length, failures: failures.length }
}

async function cmdAnilistUser(positional, flags) {
  const username = positional[0]
  if (!username) {
    console.error('✗ Usage: anilist-user <username> [--limit N] [--basic] [--preserve-tracking] [--skip-anime] [--skip-manga] [--delay MS]')
    process.exit(1)
  }
  const opts = {
    full: !flags.basic,
    limit: flags.limit ? Number(flags.limit) : Infinity,
    preserveTracking: !!flags['preserve-tracking'],
    delay: flags.delay ? Number(flags.delay) : 500
  }

  // Both lists by default; characters from each stay distinct (anime vs manga
  // character sources), so a title with both an anime and a manga keeps two
  // separate cast lists.
  const sections = []
  if (!flags['skip-anime'])
    sections.push({ label: 'anime', listQuery: AL_LIST_QUERY, statusMap: AL_STATUS_MAP, importFn: alImportAnime, castLabel: 'VA credits' })
  if (!flags['skip-manga'])
    sections.push({ label: 'manga', listQuery: AL_LIST_QUERY_MANGA, statusMap: AL_STATUS_MAP_MANGA, importFn: alImportManga, castLabel: 'characters' })

  const totals = []
  for (const sec of sections) {
    totals.push(await alImportUserSection(sec, username, opts))
    console.log('')
  }
  const ok = totals.reduce((a, t) => a + t.ok, 0)
  const total = totals.reduce((a, t) => a + t.total, 0)
  console.log(`✔ All done. ${ok}/${total} titles imported across ${sections.length} list(s).`)
}

/* ---- anilist-top: ranked "greatest anime/manga" lists (not a user list) ---- */
// AniList's Page.media sorted list. isAdult:false keeps hentai out of a top
// list; SCORE_DESC mirrors AniList's own "Top 100" browse (mean score already
// needs votes, so obscure one-vote titles don't float up).
const AL_TOP_QUERY = `
query ($page: Int, $perPage: Int, $type: MediaType, $sort: [MediaSort]) {
  Page(page: $page, perPage: $perPage) {
    pageInfo { hasNextPage }
    media(type: $type, sort: $sort, isAdult: false) { id }
  }
}`
const AL_TOP_SORTS = {
  score: 'SCORE_DESC',
  popularity: 'POPULARITY_DESC',
  trending: 'TRENDING_DESC',
  favourites: 'FAVOURITES_DESC'
}

// Resolve a ranked list to an ordered, deduped array of AniList ids (perPage
// caps at 50, so page as needed).
async function alRankedIds(type, sortEnum, count) {
  const ids = []
  const seen = new Set()
  let page = 1
  while (ids.length < count) {
    const data = await alGql(AL_TOP_QUERY, { page, perPage: 50, type, sort: [sortEnum] })
    const media = data?.Page?.media ?? []
    if (!media.length) break
    for (const m of media) {
      if (ids.length >= count) break
      if (m?.id && !seen.has(m.id)) { seen.add(m.id); ids.push(m.id) }
    }
    if (!data?.Page?.pageInfo?.hasNextPage) break
    page++
  }
  return ids
}

async function cmdAnilistTop(positional, flags) {
  const sortKey = Object.keys(AL_TOP_SORTS).includes(flags.sort) ? flags.sort : 'score'
  const sortEnum = AL_TOP_SORTS[sortKey]
  let animeCount = flags.anime !== undefined ? Number(flags.anime) : 0
  const mangaCount = flags.manga !== undefined ? Number(flags.manga) : 0
  if (!animeCount && !mangaCount) animeCount = 500 // sensible default when no flags
  const full = !flags.basic
  const onlyMissing = !!flags['only-missing']
  const delay = flags.delay ? Number(flags.delay) : 500

  const sections = []
  if (animeCount > 0)
    sections.push({ label: 'anime', type: 'ANIME', count: animeCount, importFn: alImportAnime, castLabel: 'VA credits' })
  if (mangaCount > 0)
    sections.push({ label: 'manga', type: 'MANGA', count: mangaCount, importFn: alImportManga, castLabel: 'characters' })

  console.log(`▶ AniList top lists · sort=${sortKey} · ${sections.map((s) => `${s.count} ${s.label}`).join(' + ')} · ${full ? 'full detail' : 'basic'}`)

  const totals = []
  for (const sec of sections) {
    console.log(`\n▶ Resolving top ${sec.count} ${sec.label}…`)
    const ids = await alRankedIds(sec.type, sortEnum, sec.count)
    let targets = ids
    if (onlyMissing) {
      const have = db.prepare('SELECT 1 FROM media_item WHERE external_source=? AND external_id=?')
      targets = ids.filter((id) => !have.get(AL_SOURCE, String(id)))
      console.log(`  ${ids.length} resolved; --only-missing → importing ${targets.length}.`)
    } else {
      console.log(`  Resolved ${ids.length} ${sec.label} ids.`)
    }
    console.log('')

    let ok = 0
    const failures = []
    for (let i = 0; i < targets.length; i++) {
      const id = targets[i]
      const tag = `[${sec.label} ${i + 1}/${targets.length}]`
      try {
        const sum = await sec.importFn(id, { full })
        ok++
        console.log(`${tag} ✓ ${sum.title} (${sum.created ? 'added' : 'updated'}${full ? `, ${sum.cast} ${sec.castLabel}` : ''})`)
      } catch (err) {
        failures.push({ id, msg: err.message })
        console.log(`${tag} ✗ AniList ${sec.label} #${id} — ${err.message}`)
      }
      if (delay) await sleep(delay)
    }
    console.log(`\n✔ ${sec.label}: ${ok}/${targets.length} imported.${failures.length ? ` ${failures.length} failed.` : ''}`)
    if (failures.length) console.log('  Failed ids:', failures.map((f) => f.id).join(', '))
    totals.push({ ok, total: targets.length })
  }

  const ok = totals.reduce((a, t) => a + t.ok, 0)
  const total = totals.reduce((a, t) => a + t.total, 0)
  console.log(`\n✔ All done. ${ok}/${total} titles imported across ${sections.length} list(s).`)
}

/* =====================================================================
 * TMDB  (movies + TV) — ports src/main/tmdb.ts
 * ===================================================================== */
const TMDB_BASE = 'https://api.themoviedb.org/3'
const TMDB_IMG = 'https://image.tmdb.org/t/p'
const TMDB_SOURCE = 'tmdb'
const TMDB_MAX_CAST = 30

// OMDb (IMDb rating + Rotten Tomatoes). Optional enrichment; key from the
// --omdb-key flag or the settings table (omdb.api_key). Set by cmdTmdbTop.
let OMDB_KEY = null
function omdbKey() {
  if (OMDB_KEY) return OMDB_KEY
  return maintenanceSecret('omdb.api_key', 'NAVIHUB_OMDB_API_KEY')
}
async function fetchOmdb(imdbId) {
  const key = omdbKey()
  if (!key || !imdbId) return null
  try {
    const url = new URL('https://www.omdbapi.com/')
    url.searchParams.set('apikey', key)
    url.searchParams.set('i', imdbId)
    const res = await fetch(url.toString())
    if (!res.ok) return null
    const d = await res.json()
    if (d.Response === 'False') return null
    const patch = {}
    const rating = parseFloat(d.imdbRating)
    if (Number.isFinite(rating)) patch.imdbRating = rating
    const votes = parseInt(String(d.imdbVotes ?? '').replace(/,/g, ''), 10)
    if (Number.isFinite(votes)) patch.imdbVotes = votes
    const rt = (d.Ratings ?? []).find((x) => x.Source === 'Rotten Tomatoes')
    if (rt) {
      const v = parseInt(rt.Value, 10)
      if (Number.isFinite(v)) patch.rottenTomatoes = v
    }
    const ms = parseInt(d.Metascore, 10)
    if (Number.isFinite(ms)) patch.metascore = ms
    return Object.keys(patch).length ? patch : null
  } catch {
    return null
  }
}

function tmdbApiKey() {
  const key = maintenanceSecret('tmdb.api_key', 'NAVIHUB_TMDB_API_KEY', true)
  if (!key) throw new Error('No TMDB API key. Set NAVIHUB_TMDB_API_KEY for this run.')
  return key
}
async function tmdbGet(p, params = {}, attempt = 0) {
  const url = new URL(`${TMDB_BASE}${p}`)
  url.searchParams.set('api_key', tmdbApiKey())
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v))
  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } })
  if (res.status === 429) {
    const retry = Number(res.headers.get('retry-after')) || 2
    await sleep((retry + 1) * 1000)
    return tmdbGet(p, params, attempt)
  }
  if (res.status === 401) throw new Error('Invalid TMDB API key.')
  if (!res.ok) {
    if (attempt < 3) {
      await sleep(1500)
      return tmdbGet(p, params, attempt + 1)
    }
    throw new Error(`TMDB request failed (${res.status})`)
  }
  return res.json()
}
const tmdbPoster = (p, size = 'w500') => (p ? `${TMDB_IMG}/${size}${p}` : null)
const tmdbProfile = (p) => (p ? `${TMDB_IMG}/w185${p}` : null)
function tmdbMapCrewJob(job) {
  const j = (job ?? '').toLowerCase()
  if (j === 'director') return 'director'
  if (j === 'screenplay' || j === 'writer' || j === 'story' || j === 'author') return 'writer'
  if (j === 'original music composer' || j === 'music') return 'composer'
  return null
}
async function tmdbUpsertCompany(node) {
  const ext = String(node.id)
  const row = db.prepare('SELECT id FROM company WHERE external_source=? AND external_id=?').get(TMDB_SOURCE, ext)
  if (row) return row.id
  return Number(db.prepare('INSERT INTO company (name, type, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(node.name, 'studio', TMDB_SOURCE, ext).lastInsertRowid)
}
async function tmdbUpsertPerson(node) {
  const ext = String(node.id)
  const row = db.prepare('SELECT id, photo_path FROM person WHERE external_source=? AND external_id=?').get(TMDB_SOURCE, ext)
  if (row) {
    if (!row.photo_path && node.profile_path) {
      const p = await downloadImage(tmdbProfile(node.profile_path))
      if (p) db.prepare('UPDATE person SET photo_path=? WHERE id=?').run(p, row.id)
    }
    return row.id
  }
  const photo = await downloadImage(tmdbProfile(node.profile_path))
  return Number(db.prepare('INSERT INTO person (name, photo_path, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(node.name ?? 'Unknown', photo, TMDB_SOURCE, ext).lastInsertRowid)
}
async function tmdbUpsertCharacter(name, creditId, profilePath) {
  const row = db.prepare('SELECT id, image_path FROM character WHERE external_source=? AND external_id=?').get(TMDB_SOURCE, creditId)
  if (row) {
    if (!row.image_path && profilePath) {
      const p = await downloadImage(tmdbProfile(profilePath))
      if (p) db.prepare('UPDATE character SET image_path=? WHERE id=?').run(p, row.id)
    }
    return row.id
  }
  const img = await downloadImage(tmdbProfile(profilePath))
  return Number(db.prepare('INSERT INTO character (name, image_path, external_source, external_id) VALUES (?, ?, ?, ?)')
    .run(name, img, TMDB_SOURCE, creditId).lastInsertRowid)
}

// Ports persistTitle().
async function tmdbPersist(n) {
  const coverPath = await downloadImage(tmdbPoster(n.posterPath, 'w500'))
  const existing = db.prepare('SELECT id FROM media_item WHERE external_source=? AND external_id=?').get(TMDB_SOURCE, n.externalId)
  let mediaId
  const created = !existing
  if (existing) {
    mediaId = existing.id
    db.prepare(
      `UPDATE media_item SET title=?, title_original=?, synopsis=?, cover_path=COALESCE(?, cover_path),
       total_units=?, release_date=?, updated_at=datetime('now') WHERE id=?`
    ).run(n.title, n.native, n.synopsis, coverPath, n.totalUnits, n.releaseDate, mediaId)
  } else {
    mediaId = Number(
      db.prepare(
        `INSERT INTO media_item
         (media_type, title, title_original, synopsis, cover_path, total_units, release_date, external_source, external_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(n.mediaType, n.title, n.native, n.synopsis, coverPath, n.totalUnits, n.releaseDate, TMDB_SOURCE, n.externalId).lastInsertRowid
    )
  }

  // OMDb scores -> metadata (merged so re-import keeps other keys).
  if (n.extraMeta) {
    const mr = db.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId)
    db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(mergeMeta(mr?.metadata, n.extraMeta), mediaId)
  }

  let studios = 0
  for (const node of n.companies.slice(0, 3)) {
    const companyId = await tmdbUpsertCompany(node)
    db.prepare('INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)').run(mediaId, companyId, 'production_studio')
    studios++
  }
  for (const g of n.genres) upsertTagAndLink(mediaId, g.name)

  const castEdges = [...n.cast].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)).slice(0, TMDB_MAX_CAST)
  let cast = 0
  let order = 0
  const keptCharacterIds = new Set()
  for (const edge of castEdges) {
    const characterName = (edge.character ?? '').trim()
    if (!characterName) continue
    const personId = await tmdbUpsertPerson(edge)
    const characterId = await tmdbUpsertCharacter(characterName, String(edge.credit_id), edge.profile_path)
    keptCharacterIds.add(characterId)
    const sortOrder = order++
    db.prepare(
      `INSERT INTO media_character (media_id, character_id, sort_order) VALUES (?, ?, ?)
       ON CONFLICT(media_id, character_id) DO UPDATE SET sort_order = excluded.sort_order`
    ).run(mediaId, characterId, sortOrder)
    const dup = db.prepare('SELECT id FROM credit WHERE media_id=? AND person_id=? AND character_id IS ? AND role=?').get(mediaId, personId, characterId, 'actor')
    if (dup) db.prepare('UPDATE credit SET importance=? WHERE id=?').run(sortOrder, dup.id)
    else db.prepare('INSERT INTO credit (media_id, person_id, character_id, role, importance) VALUES (?, ?, ?, ?, ?)').run(mediaId, personId, characterId, 'actor', sortOrder)
    cast++
  }
  pruneCharacters(mediaId, TMDB_SOURCE, keptCharacterIds)

  let staff = 0
  const seenCrew = new Set()
  for (const edge of n.crew) {
    const role = tmdbMapCrewJob(edge.job)
    if (!role) continue
    const personId = await tmdbUpsertPerson(edge)
    const key = `${personId}:${role}`
    if (seenCrew.has(key)) continue
    seenCrew.add(key)
    const dup = db.prepare('SELECT id FROM credit WHERE media_id=? AND person_id=? AND role=? AND character_id IS NULL').get(mediaId, personId, role)
    if (!dup) db.prepare('INSERT INTO credit (media_id, person_id, role) VALUES (?, ?, ?)').run(mediaId, personId, role)
    staff++
  }

  return { mediaId, title: n.title, studios, cast, staff, created }
}

async function tmdbImportMovie(id) {
  const m = await tmdbGet(`/movie/${id}`, { append_to_response: 'credits' })
  if (!m?.id) throw new Error('Movie not found')
  const title = m.title || m.original_title || 'Untitled'
  return tmdbPersist({
    externalId: String(m.id), mediaType: 'movie', title,
    native: m.original_title && m.original_title !== title ? m.original_title : null,
    synopsis: m.overview || null, posterPath: m.poster_path ?? null,
    totalUnits: m.runtime ?? null, releaseDate: m.release_date || null,
    companies: m.production_companies ?? [], genres: m.genres ?? [],
    cast: m.credits?.cast ?? [], crew: m.credits?.crew ?? [],
    extraMeta: await fetchOmdb(m.imdb_id)
  })
}
async function tmdbImportTv(id) {
  const m = await tmdbGet(`/tv/${id}`, { append_to_response: 'aggregate_credits,external_ids' })
  if (!m?.id) throw new Error('TV show not found')
  const title = m.name || m.original_name || 'Untitled'
  return tmdbPersist({
    externalId: String(m.id), mediaType: 'tv', title,
    native: m.original_name && m.original_name !== title ? m.original_name : null,
    synopsis: m.overview || null, posterPath: m.poster_path ?? null,
    totalUnits: m.number_of_episodes ?? null, releaseDate: m.first_air_date || null,
    companies: [...(m.networks ?? []), ...(m.production_companies ?? [])], genres: m.genres ?? [],
    cast: (m.aggregate_credits?.cast ?? []).map((c) => {
      const primary = c.roles?.[0] ?? {}
      return { id: c.id, name: c.name, profile_path: c.profile_path, order: c.order, character: primary.character ?? '', credit_id: primary.credit_id ?? `agg_${c.id}` }
    }),
    crew: [],
    extraMeta: await fetchOmdb(m.external_ids?.imdb_id)
  })
}

// Resolve a ranked list to an ordered array of {id} up to `count`, paging as needed.
async function tmdbRankedIds(type, list, count) {
  const ids = []
  let page = 1
  const endpoint =
    list === 'trending' ? `/trending/${type}/week` : `/${type}/${list}` // top_rated | popular
  while (ids.length < count && page <= 500) {
    const data = await tmdbGet(endpoint, { page: page })
    const results = data?.results ?? []
    if (results.length === 0) break
    for (const r of results) {
      if (ids.length >= count) break
      ids.push(r.id)
    }
    if (page >= (data.total_pages ?? page)) break
    page++
  }
  return ids
}

async function cmdTmdbTop(flags) {
  const type = flags.type === 'tv' ? 'tv' : 'movie'
  const list = ['top_rated', 'popular', 'trending'].includes(flags.list) ? flags.list : 'top_rated'
  const count = flags.count ? Number(flags.count) : 50
  const delay = flags.delay ? Number(flags.delay) : 250

  if (flags['omdb-key']) OMDB_KEY = String(flags['omdb-key']).trim()
  const omdbOn = !!omdbKey()

  console.log(`▶ TMDB ${type} · ${list} · top ${count}`)
  console.log(omdbOn ? '  OMDb enrichment: ON (IMDb + Rotten Tomatoes)' : '  OMDb enrichment: off (no key — pass --omdb-key or set it in Settings)')
  const ids = await tmdbRankedIds(type, list, count)
  console.log(`  Resolved ${ids.length} ids.\n`)

  let ok = 0
  const failures = []
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]
    const tag = `[${i + 1}/${ids.length}]`
    try {
      const sum = type === 'tv' ? await tmdbImportTv(id) : await tmdbImportMovie(id)
      ok++
      console.log(`${tag} ✓ ${sum.title} (${sum.created ? 'added' : 'updated'}, ${sum.cast} cast)`)
    } catch (err) {
      failures.push({ id, msg: err.message })
      console.log(`${tag} ✗ TMDB ${type} #${id} — ${err.message}`)
    }
    if (delay) await sleep(delay)
  }
  console.log(`\n✔ Done. ${ok}/${ids.length} imported.${failures.length ? ` ${failures.length} failed.` : ''}`)
  if (failures.length) console.log('  Failed ids:', failures.map((f) => f.id).join(', '))
}

/* =====================================================================
 * IMDB TOP — the canonical "greatest films" list, mapped to TMDB by id.
 *
 * IMDb has no free list API, so we use IMDb's official ratings dataset
 * (datasets.imdbws.com, free for personal use): ~1.5M titles with averageRating
 * + numVotes. We rank with IMDb's own weighted-rating (true Bayesian) formula,
 * then resolve each IMDb id to TMDB via /find (which also tells us movie vs TV,
 * so non-movies are skipped cleanly). No fuzzy name-matching.
 * ===================================================================== */
const IMDB_RATINGS_URL = 'https://datasets.imdbws.com/title.ratings.tsv.gz'

async function fetchImdbRatings() {
  const res = await fetch(IMDB_RATINGS_URL)
  if (!res.ok) throw new Error(`IMDb ratings download failed (${res.status})`)
  const gz = Buffer.from(await res.arrayBuffer())
  const text = zlib.gunzipSync(gz).toString('utf8')
  const lines = text.split('\n')
  const rows = []
  for (let i = 1; i < lines.length; i++) {
    // header: tconst  averageRating  numVotes
    const line = lines[i]
    if (!line) continue
    const tab1 = line.indexOf('\t')
    const tab2 = line.indexOf('\t', tab1 + 1)
    if (tab1 < 0 || tab2 < 0) continue
    const tconst = line.slice(0, tab1)
    const r = parseFloat(line.slice(tab1 + 1, tab2))
    const v = parseInt(line.slice(tab2 + 1), 10)
    if (Number.isFinite(r) && Number.isFinite(v)) rows.push({ tconst, r, v })
  }
  return rows
}

// IMDb Top-250-style weighted rating: W = (v/(v+m))R + (m/(v+m))C, where m is the
// minimum-votes threshold and C is the mean rating across qualifying titles.
function rankImdb(rows, minVotes) {
  const pool = rows.filter((x) => x.v >= minVotes)
  const C = pool.reduce((a, x) => a + x.r, 0) / (pool.length || 1)
  for (const x of pool) x.w = (x.v / (x.v + minVotes)) * x.r + (minVotes / (x.v + minVotes)) * C
  pool.sort((a, b) => b.w - a.w)
  return pool
}

// IMDb id -> TMDB movie {id, lang} (null if it isn't a movie / not found on
// TMDB). lang is TMDB's original_language (ISO 639-1), used by --exclude-langs.
async function tmdbFindMovieByImdb(tconst) {
  const d = await tmdbGet(`/find/${tconst}`, { external_source: 'imdb_id' })
  const m = d?.movie_results?.[0]
  return m?.id ? { id: m.id, lang: m.original_language ?? null } : null
}

async function cmdImdbTop(flags) {
  const count = flags.count ? Number(flags.count) : 500
  const minVotes = flags['min-votes'] ? Number(flags['min-votes']) : 25000
  const delay = flags.delay ? Number(flags.delay) : 250
  const onlyMissing = !!flags['only-missing']
  // e.g. --exclude-langs hi,ta,te — skip movies whose ORIGINAL language is in
  // the list, replacing them with the next ranked titles (count stays full).
  const excludeLangs = new Set(
    String(flags['exclude-langs'] || '').split(',').map((s) => s.trim().toLowerCase()).filter(Boolean)
  )
  if (flags['omdb-key']) OMDB_KEY = String(flags['omdb-key']).trim()
  const omdbOn = !!omdbKey()

  console.log(`▶ IMDb top ${count} movies (weighted rating, ≥${minVotes} votes) → TMDB by id`)
  console.log(omdbOn ? '  OMDb enrichment: ON (IMDb + Rotten Tomatoes)' : '  OMDb enrichment: off (no key)')
  if (excludeLangs.size) console.log(`  Excluding original languages: ${[...excludeLangs].join(', ')}`)

  console.log('  Downloading IMDb ratings dataset (~25 MB)…')
  const ranked = rankImdb(await fetchImdbRatings(), minVotes)
  console.log(`  ${ranked.length} titles qualify (≥${minVotes} votes); resolving top movies on TMDB…`)

  // Walk the ranked list top-down, resolving to TMDB movie ids and skipping
  // anything that isn't a movie (highly-rated TV series/episodes) or is in an
  // excluded language, until `count`.
  const ids = []
  const seen = new Set()
  let scanned = 0
  let excluded = 0
  for (const x of ranked) {
    if (ids.length >= count) break
    scanned++
    let found = null
    try {
      found = await tmdbFindMovieByImdb(x.tconst)
    } catch {
      found = null
    }
    if (found && excludeLangs.has(found.lang)) excluded++
    else if (found && !seen.has(found.id)) {
      seen.add(found.id)
      ids.push(found.id)
    }
    if (scanned % 100 === 0) console.log(`   …${ids.length}/${count} movies (scanned ${scanned})`)
    await sleep(40) // gentle on TMDB during resolution
  }
  console.log(`  Resolved ${ids.length} movie ids (scanned ${scanned} titles${excluded ? `, ${excluded} excluded by language` : ''}).`)

  // --only-missing: resume after an interrupted run without re-importing (and
  // re-downloading images for) everything already in the library.
  let targets = ids
  if (onlyMissing) {
    const have = db.prepare('SELECT 1 FROM media_item WHERE external_source=? AND external_id=?')
    targets = ids.filter((id) => !have.get(TMDB_SOURCE, String(id)))
    console.log(`  --only-missing: ${ids.length - targets.length} already in library, importing ${targets.length}.`)
  }
  console.log('')

  let ok = 0
  const failures = []
  for (let i = 0; i < targets.length; i++) {
    const id = targets[i]
    const tag = `[${i + 1}/${targets.length}]`
    try {
      const sum = await tmdbImportMovie(id)
      ok++
      console.log(`${tag} ✓ ${sum.title} (${sum.created ? 'added' : 'updated'}, ${sum.cast} cast)`)
    } catch (err) {
      failures.push({ id, msg: err.message })
      console.log(`${tag} ✗ TMDB #${id} — ${err.message}`)
    }
    if (delay) await sleep(delay)
  }
  console.log(`\n✔ Done. ${ok}/${targets.length} imported.${failures.length ? ` ${failures.length} failed.` : ''}`)
  if (failures.length) console.log('  Failed ids:', failures.map((f) => f.id).join(', '))
}

/* =====================================================================
 * RAWG  (video games) — ports src/main/rawg.ts (+ src/main/hltb.ts)
 * ===================================================================== */
const RAWG_BASE = 'https://api.rawg.io/api'
const RAWG_SOURCE = 'rawg'

// Key from the --rawg-key flag, an explicit environment value, or a legacy
// plaintext settings row. Protected app values cannot be decrypted headlessly.
let RAWG_KEY = null
function rawgApiKey() {
  if (RAWG_KEY) return RAWG_KEY
  const key = maintenanceSecret('rawg.api_key', 'NAVIHUB_RAWG_API_KEY', true)
  if (!key) throw new Error('No RAWG API key. Pass --rawg-key KEY or set NAVIHUB_RAWG_API_KEY for this run.')
  return key
}

async function rawgGet(p, params = {}, attempt = 0) {
  const url = new URL(`${RAWG_BASE}${p}`)
  url.searchParams.set('key', rawgApiKey())
  for (const [k, v] of Object.entries(params)) url.searchParams.set(k, String(v))
  const res = await fetch(url.toString(), { headers: { Accept: 'application/json' } })
  if (res.status === 429) {
    const retry = Number(res.headers.get('retry-after')) || 5
    await sleep((retry + 1) * 1000)
    return rawgGet(p, params, attempt)
  }
  if (res.status === 401) throw new Error('Invalid RAWG API key.')
  if (!res.ok) {
    if (attempt < 3) {
      await sleep(1500)
      return rawgGet(p, params, attempt + 1)
    }
    throw new Error(`RAWG request failed (${res.status})`)
  }
  return res.json()
}

/* ---- HowLongToBeat (ports src/main/hltb.ts) — best-effort play times.
 * No official API; mirrors the site's own JS (as of mid-2026): GET
 * /api/bleed/init for a token + honeypot pair, POST /api/bleed with them as
 * headers AND the hp pair echoed in the body; 403 = expired token, re-init
 * once. Token is bound to IP + User-Agent so the same UA goes on every
 * request. Every failure path returns null/[] — HLTB must never break an
 * import. ---- */
const HLTB_BASE = 'https://howlongtobeat.com'
const HLTB_UA =
  'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36'
let hltbCreds = null

async function hltbInit() {
  try {
    const res = await fetch(`${HLTB_BASE}/api/bleed/init?t=${Date.now()}`, {
      headers: { 'User-Agent': HLTB_UA, Referer: `${HLTB_BASE}/` },
      signal: AbortSignal.timeout(15000)
    })
    if (!res.ok) return null
    const j = await res.json()
    hltbCreds = j?.token && j?.hpKey && j?.hpVal
      ? { token: j.token, hpKey: j.hpKey, hpVal: j.hpVal }
      : null
    return hltbCreds
  } catch {
    return null
  }
}

async function hltbSearch(query) {
  const terms = query.trim().split(/\s+/).filter(Boolean)
  if (!terms.length) return []
  let c = hltbCreds ?? (await hltbInit())
  if (!c) return []

  for (let attempt = 0; attempt < 2; attempt++) {
    const body = {
      searchType: 'games',
      searchTerms: terms,
      searchPage: 1,
      size: 20,
      searchOptions: {
        games: {
          userId: 0,
          platform: '',
          sortCategory: 'popular',
          rangeCategory: 'main',
          rangeTime: { min: null, max: null },
          gameplay: { perspective: '', flow: '', genre: '', difficulty: '' },
          rangeYear: { min: '', max: '' },
          modifier: ''
        },
        users: { sortCategory: 'postcount' },
        lists: { sortCategory: 'follows' },
        filter: '',
        sort: 0,
        randomizer: 0
      },
      useCache: true,
      [c.hpKey]: c.hpVal
    }
    try {
      const res = await fetch(`${HLTB_BASE}/api/bleed`, {
        method: 'POST',
        headers: {
          'User-Agent': HLTB_UA,
          Referer: `${HLTB_BASE}/`,
          'Content-Type': 'application/json',
          'x-auth-token': c.token,
          'x-hp-key': c.hpKey,
          'x-hp-val': c.hpVal
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000)
      })
      if (res.status === 403 && attempt === 0) {
        c = await hltbInit()
        if (!c) return []
        continue
      }
      if (!res.ok) return []
      const j = await res.json()
      return Array.isArray(j?.data) ? j.data : []
    } catch {
      return []
    }
  }
  return []
}

// Loose title key: lowercase, accents stripped, punctuation collapsed — so
// "Steins;Gate" matches "Steins Gate" and "Pokémon" matches "Pokemon".
function hltbNorm(s) {
  return s
    .toLowerCase()
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
}

// Results come back popularity-sorted, so the first is already a decent guess;
// an exact title/alias match (and a release year within ±1) beats popularity.
function hltbPickBest(results, title, year) {
  const target = hltbNorm(title)
  let best = null
  let bestScore = -1
  for (const g of results) {
    let score = 0
    if (hltbNorm(String(g.game_name ?? '')) === target) score += 4
    else if (
      typeof g.game_alias === 'string' &&
      g.game_alias.split(/\s*,\s*/).some((a) => hltbNorm(a) === target)
    )
      score += 3
    if (year && typeof g.release_world === 'number' && Math.abs(g.release_world - year) <= 1)
      score += 2
    if (score > bestScore) {
      bestScore = score
      best = g
    }
  }
  return best
}

// HLTB reports seconds; the DB stores minutes (same unit VNDB uses).
const hltbMins = (sec) => (typeof sec === 'number' && sec > 0 ? Math.round(sec / 60) : null)

function hltbToTimes(g) {
  return {
    id: Number(g.game_id) || 0,
    name: String(g.game_name ?? ''),
    main: hltbMins(g.comp_main),
    mainExtra: hltbMins(g.comp_plus),
    completionist: hltbMins(g.comp_100),
    allStyles: hltbMins(g.comp_all),
    mainCount: Number(g.comp_main_count) || 0,
    mainExtraCount: Number(g.comp_plus_count) || 0,
    completionistCount: Number(g.comp_100_count) || 0,
    allStylesCount: Number(g.comp_all_count) || 0
  }
}

// Best-effort lookup by title (+ release year). Falls back to the pre-colon
// part of the title ("Persona 5: The Phantom X" -> "Persona 5") when the full
// title finds nothing. Null on no match or any network trouble.
async function hltbFetchPlaytimes(title, year = null) {
  if (!title.trim()) return null
  let results = await hltbSearch(title)
  if (!results.length && title.includes(':')) {
    const short = title.split(':')[0].trim()
    if (short && short !== title) results = await hltbSearch(short)
  }
  const best = hltbPickBest(results, title, year)
  return best ? hltbToTimes(best) : null
}

// Developer/publisher -> company, deduped by (rawg, id). RAWG company nodes
// carry no logo, so nothing to download (mirrors rawg.ts upsertCompany).
function rawgUpsertCompany(node) {
  const ext = String(node.id)
  const row = db.prepare('SELECT id FROM company WHERE external_source=? AND external_id=?').get(RAWG_SOURCE, ext)
  if (row) return row.id
  return Number(
    db.prepare('INSERT INTO company (name, type, external_source, external_id) VALUES (?, ?, ?, ?)')
      .run(node.name ?? 'Unknown', 'developer', RAWG_SOURCE, ext).lastInsertRowid
  )
}

// Ports importGame(): media upsert (personal tracking preserved), Metacritic +
// HLTB -> metadata, developers/publishers -> companies, genres -> tags. No
// characters and no prune — RAWG never writes cast, hand-added cast is untouched.
async function rawgImportGame(rawgId, { withHltb }) {
  const g = await rawgGet(`/games/${rawgId}`)
  if (!g?.id) throw new Error('Game not found on RAWG')

  const coverPath = await downloadImage(g.background_image ?? null)
  const year = g.released ? Number(String(g.released).slice(0, 4)) || null : null
  const hltbTimes = withHltb ? await hltbFetchPlaytimes(g.name ?? '', year) : null

  const title = g.name ?? 'Untitled'
  const native = g.name_original && g.name_original !== title ? String(g.name_original) : null

  const existing = db.prepare('SELECT id FROM media_item WHERE external_source=? AND external_id=?').get(RAWG_SOURCE, String(g.id))
  let mediaId
  const created = !existing
  if (existing) {
    mediaId = existing.id
    db.prepare(
      `UPDATE media_item SET title=?, title_original=?, synopsis=?, cover_path=COALESCE(?, cover_path),
       total_units=?, release_date=?, updated_at=datetime('now') WHERE id=?`
    ).run(title, native, g.description_raw || null, coverPath, g.playtime > 0 ? g.playtime : null, g.released || null, mediaId)
  } else {
    mediaId = Number(
      db.prepare(
        `INSERT INTO media_item
         (media_type, title, title_original, synopsis, cover_path, total_units, release_date, external_source, external_id)
         VALUES ('game', ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(title, native, g.description_raw || null, coverPath, g.playtime > 0 ? g.playtime : null, g.released || null, RAWG_SOURCE, String(g.id)).lastInsertRowid
    )
  }

  // Metacritic + HLTB -> metadata (mergeMeta skips nulls, so a failed HLTB
  // lookup keeps whatever was stored before).
  const metaRow = db.prepare('SELECT metadata FROM media_item WHERE id=?').get(mediaId)
  const meta = mergeMeta(metaRow?.metadata, {
    metacritic: typeof g.metacritic === 'number' && g.metacritic > 0 ? g.metacritic : null,
    hltb: hltbTimes
  })
  db.prepare('UPDATE media_item SET metadata=? WHERE id=?').run(meta, mediaId)

  let studios = 0
  const companyRoles = [
    [g.developers ?? [], 'developer'],
    [g.publishers ?? [], 'publisher']
  ]
  for (const [nodes, role] of companyRoles) {
    for (const node of nodes) {
      const companyId = rawgUpsertCompany(node)
      db.prepare('INSERT OR IGNORE INTO media_company (media_id, company_id, role) VALUES (?, ?, ?)').run(mediaId, companyId, role)
      studios++
    }
  }
  for (const genre of g.genres ?? []) upsertTagAndLink(mediaId, genre?.name)

  return { mediaId, title, studios, created, hltb: !!hltbTimes }
}

// Resolve a ranked list to an ordered array of game ids up to `count`, paging
// as needed. exclude_additions drops DLC/special editions.
async function rawgRankedIds(ordering, count) {
  const ids = []
  let page = 1
  while (ids.length < count) {
    const data = await rawgGet('/games', {
      ordering,
      page_size: 40,
      page,
      exclude_additions: 'true'
    })
    const results = data?.results ?? []
    if (!results.length) break
    for (const r of results) {
      if (ids.length >= count) break
      if (r?.id) ids.push(r.id)
    }
    if (!data.next) break
    page++
  }
  return ids
}

async function cmdRawgTop(flags) {
  const list = ['metacritic', 'rating', 'added'].includes(flags.list) ? flags.list : 'metacritic'
  const count = flags.count ? Number(flags.count) : 500
  const delay = flags.delay ? Number(flags.delay) : 250
  const withHltb = !flags['no-hltb']

  // --rawg-key is process-local. Never write a plaintext credential into the
  // database behind the app's protected-storage boundary.
  if (flags['rawg-key']) {
    RAWG_KEY = String(flags['rawg-key']).trim()
  }
  rawgApiKey() // fail fast with a clear message before any network work

  console.log(`▶ RAWG games · ${list} · top ${count}`)
  console.log(withHltb ? '  HLTB play times: ON (best-effort per game)' : '  HLTB play times: off')
  const ids = await rawgRankedIds(`-${list}`, count)
  console.log(`  Resolved ${ids.length} ids.\n`)

  let ok = 0
  let hltbHits = 0
  const failures = []
  for (let i = 0; i < ids.length; i++) {
    const id = ids[i]
    const tag = `[${i + 1}/${ids.length}]`
    try {
      const sum = await rawgImportGame(id, { withHltb })
      ok++
      if (sum.hltb) hltbHits++
      console.log(`${tag} ✓ ${sum.title} (${sum.created ? 'added' : 'updated'}, ${sum.studios} companies${withHltb ? `, HLTB ${sum.hltb ? '✓' : '–'}` : ''})`)
    } catch (err) {
      failures.push({ id, msg: err.message })
      console.log(`${tag} ✗ RAWG #${id} — ${err.message}`)
    }
    if (delay) await sleep(delay)
  }
  console.log(`\n✔ Done. ${ok}/${ids.length} imported${withHltb ? ` (${hltbHits} with HLTB times)` : ''}.${failures.length ? ` ${failures.length} failed.` : ''}`)
  if (failures.length) console.log('  Failed ids:', failures.map((f) => f.id).join(', '))
}

/* =====================================================================
 * ANIMETHEMES  (anime OP/ED songs) — ports src/main/themes.ts
 * ===================================================================== */
const AT_BASE = 'https://api.animethemes.moe'
const AT_UA = 'NaviHUB/0.1 (personal media tracker)'
const AT_SOURCE = 'animethemes'

async function atGet(pathAndQuery, attempt = 0) {
  const res = await fetch(`${AT_BASE}${pathAndQuery}`, {
    headers: { Accept: 'application/json', 'User-Agent': AT_UA }
  })
  if (res.status === 429) {
    const retry = Number(res.headers.get('retry-after')) || 5
    await sleep((retry + 1) * 1000)
    return atGet(pathAndQuery, attempt)
  }
  if (!res.ok) {
    if (attempt < 3) {
      await sleep(1500)
      return atGet(pathAndQuery, attempt + 1)
    }
    throw new Error(`AnimeThemes request failed (${res.status})`)
  }
  return res.json()
}

function atArtistImage(artist) {
  const imgs = artist?.images ?? []
  const large = imgs.find((i) => /large/i.test(i.facet ?? ''))
  return (large ?? imgs[0])?.link ?? null
}

// One external-site resource mapping -> AnimeThemes slug (null if that site has
// no mapping for the id). site is AnimeThemes' name: 'AniList' | 'MyAnimeList'.
async function atResolveSlug(site, externalId) {
  const resData = await atGet(`/resource?filter[site]=${site}&filter[external_id]=${externalId}&include=anime`)
  return resData?.resources?.[0]?.anime?.[0]?.slug ?? null
}

// AniList exposes each anime's MyAnimeList id as idMal — the fallback key for
// AnimeThemes entries mapped by MAL but not AniList. Reuses alGql; null on miss.
async function alFetchMalId(anilistId) {
  try {
    const data = await alGql('query ($id: Int) { Media(id: $id, type: ANIME) { idMal } }', { id: anilistId })
    const idMal = data?.Media?.idMal
    return typeof idMal === 'number' && idMal > 0 ? idMal : null
  } catch {
    return null
  }
}

async function atFetchThemes(anilistId) {
  let slug = await atResolveSlug('AniList', anilistId)
  if (!slug) {
    const malId = await alFetchMalId(anilistId)
    if (malId) slug = await atResolveSlug('MyAnimeList', malId)
  }
  if (!slug) return null // not catalogued under either id
  const inc = encodeURIComponent('animethemes.song.artists.images,animethemes.animethemeentries.videos.audio')
  const data = await atGet(`/anime/${slug}?include=${inc}`)
  const themes = data?.anime?.animethemes ?? []
  return themes.map((t) => {
    const entries = t.animethemeentries ?? []
    const entry = entries.find((e) => !e.spoiler) ?? entries[0]
    return {
      externalId: String(t.id),
      slug: t.slug ?? null,
      type: t.type ?? null,
      sequence: typeof t.sequence === 'number' ? t.sequence : null,
      title: t.song?.title ?? null,
      audioUrl: entry?.videos?.[0]?.audio?.link ?? null,
      artists: (t.song?.artists ?? []).map((a) => ({
        externalId: String(a.id),
        name: a.name ?? 'Unknown',
        imageUrl: atArtistImage(a)
      }))
    }
  })
}

async function atUpsertArtist(artist) {
  const ext = artist.externalId
  const row = db.prepare('SELECT id, photo_path FROM person WHERE external_source=? AND external_id=?').get(AT_SOURCE, ext)
  if (row) {
    if (!row.photo_path && artist.imageUrl) {
      const p = await downloadImage(artist.imageUrl)
      if (p) db.prepare('UPDATE person SET photo_path=? WHERE id=?').run(p, row.id)
    }
    return row.id
  }
  const photo = await downloadImage(artist.imageUrl)
  return Number(
    db.prepare('INSERT INTO person (name, photo_path, external_source, external_id) VALUES (?, ?, ?, ?)')
      .run(artist.name, photo, AT_SOURCE, ext).lastInsertRowid
  )
}

// Readable audio filename base, e.g. "Berserk OP1 - Tell Me Why".
function themeFileBase(anime, slug, title) {
  const head = [anime, slug].filter(Boolean).join(' ')
  return title ? `${head} - ${title}` : head
}

// Ports importThemes(): replace this anime's themes + artist credits.
async function atImportThemes(mediaId, anilistId, animeTitle, { withAudio }) {
  const themes = await atFetchThemes(anilistId)
  if (themes === null) return { songs: 0, artists: 0, audio: 0, catalogued: false }

  // Carry the Songs page's hearts across the clean replace (mirrors themes.ts).
  const favorited = new Set(
    db
      .prepare('SELECT external_id FROM theme_song WHERE media_id=? AND favorite=1')
      .all(mediaId)
      .map((r) => r.external_id)
      .filter(Boolean)
  )
  const existingAudio = new Map(
    db
      .prepare('SELECT external_id, audio_path FROM theme_song WHERE media_id=?')
      .all(mediaId)
      .filter((r) => r.external_id && r.audio_path)
      .map((r) => [r.external_id, r.audio_path])
  )
  db.prepare('DELETE FROM theme_song WHERE media_id=?').run(mediaId)
  db.prepare("DELETE FROM credit WHERE media_id=? AND role='artist'").run(mediaId)

  let songs = 0
  let audio = 0
  const artistIds = new Set()
  let order = 0
  for (const t of themes) {
    const retainedAudio = existingAudio.get(t.externalId)
    const audioPath = retainedAudio ||
      (withAudio && t.audioUrl
        ? await downloadAudio(t.audioUrl, themeFileBase(animeTitle, t.slug, t.title))
        : null)
    if (audioPath && !retainedAudio) audio++
    const themeSongId = Number(
      db.prepare(
        `INSERT INTO theme_song
         (media_id, slug, type, sequence, title, audio_url, audio_path, sort_order, favorite, external_source, external_id)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
      ).run(mediaId, t.slug, t.type, t.sequence, t.title, t.audioUrl, audioPath, order++, favorited.has(t.externalId) ? 1 : 0, AT_SOURCE, t.externalId).lastInsertRowid
    )
    songs++
    let aOrder = 0
    for (const a of t.artists) {
      const personId = await atUpsertArtist(a)
      artistIds.add(personId)
      db.prepare('INSERT OR IGNORE INTO theme_artist (theme_song_id, person_id, sort_order) VALUES (?, ?, ?)').run(themeSongId, personId, aOrder++)
      db.prepare(
        "INSERT INTO credit (media_id, person_id, role) SELECT ?, ?, 'artist' WHERE NOT EXISTS " +
        "(SELECT 1 FROM credit WHERE media_id=? AND person_id=? AND role='artist' AND character_id IS NULL)"
      ).run(mediaId, personId, mediaId, personId)
    }
  }
  db.prepare(`DELETE FROM person WHERE external_source=? AND id NOT IN (SELECT person_id FROM theme_artist)`).run(AT_SOURCE)
  return { songs, artists: artistIds.size, audio, catalogued: true }
}

async function cmdAnimeThemes(flags) {
  const withAudio = !flags['no-audio']
  const limit = flags.limit ? Number(flags.limit) : Infinity
  const onlyMissing = !!flags['only-missing']
  const delay = flags.delay ? Number(flags.delay) : 400

  // Audio location: --audio-dir wins (and is saved so the app uses it too),
  // else the saved `audio.dir` setting, else the default media dir.
  if (flags['audio-dir']) {
    AUDIO_DIR = String(flags['audio-dir'])
    db.prepare(
      `INSERT INTO settings (key, value) VALUES ('audio.dir', ?)
       ON CONFLICT(key) DO UPDATE SET value = excluded.value`
    ).run(AUDIO_DIR)
  } else {
    const saved = db.prepare("SELECT value FROM settings WHERE key='audio.dir'").get()
    AUDIO_DIR = saved?.value?.trim() || MEDIA_DIR
  }
  if (withAudio) console.log(`  Audio dir: ${AUDIO_DIR}`)

  // Every AniList-sourced anime in the library.
  let rows = db.prepare(
    "SELECT id, title, external_id FROM media_item WHERE media_type='anime' AND external_source='anilist' AND external_id IS NOT NULL ORDER BY id"
  ).all()
  if (onlyMissing) rows = rows.filter((r) => !db.prepare('SELECT 1 FROM theme_song WHERE media_id=? LIMIT 1').get(r.id))
  const targets = rows.slice(0, limit === Infinity ? rows.length : limit)

  console.log(`▶ AnimeThemes for ${targets.length} anime${onlyMissing ? ' (missing only)' : ''}`)
  console.log(withAudio ? '  Audio: ON (downloading .ogg per OP/ED — a few MB each)' : '  Audio: off (storing streaming URLs only)')
  console.log('')

  let ok = 0, noHits = 0, totalSongs = 0
  const failures = []
  for (let i = 0; i < targets.length; i++) {
    const r = targets[i]
    const tag = `[${i + 1}/${targets.length}]`
    try {
      const s = await atImportThemes(r.id, Number(r.external_id), r.title, { withAudio })
      if (!s.catalogued) { noHits++; console.log(`${tag} – ${r.title} — not on AnimeThemes`) }
      else { ok++; totalSongs += s.songs; console.log(`${tag} ✓ ${r.title} — ${s.songs} songs, ${s.artists} artists${withAudio ? `, ${s.audio} audio` : ''}`) }
    } catch (err) {
      failures.push({ id: r.id, msg: err.message })
      console.log(`${tag} ✗ ${r.title} — ${err.message}`)
    }
    if (delay) await sleep(delay)
  }
  console.log(`\n✔ Done. ${ok} with themes (${totalSongs} songs), ${noHits} not catalogued.${failures.length ? ` ${failures.length} failed.` : ''}`)
  if (failures.length) console.log('  Failed ids:', failures.map((f) => f.id).join(', '))
}

/* ----------------------------- main ----------------------------- */
// Backfills media_relation for AniList titles already in the library WITHOUT a
// full re-import: one tiny relations-only query per title (no images, no cast).
// Run once after adding the relations feature to light up seasons/source links
// on the anime + manga you already have.
async function cmdRelationsBackfill(flags) {
  ensureRelationTable()
  const delay = flags.delay ? Number(flags.delay) : 200
  const rows = db
    .prepare(
      `SELECT id, external_id, title FROM media_item
       WHERE external_source = ? AND media_type IN ('anime', 'manga') AND external_id IS NOT NULL
       ORDER BY id`
    )
    .all(AL_SOURCE)
  console.log(`▶ Backfilling relations for ${rows.length} AniList titles (relations-only, no re-import)`)
  let ok = 0
  let withRel = 0
  const failures = []
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const tag = `[${i + 1}/${rows.length}]`
    try {
      const data = await alGql(AL_RELATIONS_QUERY, { id: Number(row.external_id) })
      alReplaceRelations(row.id, data?.Media?.relations)
      const n = db.prepare('SELECT COUNT(*) c FROM media_relation WHERE media_id=?').get(row.id).c
      ok++
      if (n > 0) withRel++
      console.log(`${tag} ✓ ${row.title} — ${n} relation${n === 1 ? '' : 's'}`)
    } catch (err) {
      failures.push(row.title)
      console.log(`${tag} ✗ ${row.title} — ${err.message}`)
    }
    if (delay) await sleep(delay)
  }
  console.log(
    `\n✔ Done. ${ok}/${rows.length} processed, ${withRel} have relations.${failures.length ? ` ${failures.length} failed.` : ''}`
  )
}

async function main() {
  const [command, ...rest] = process.argv.slice(2)
  const { flags, positional } = parseFlags(rest)

  // Any AniList write path may touch the (new) media_relation table.
  if (command === 'anilist-user' || command === 'anilist-top' || command === 'relations-backfill') ensureRelationTable()

  if (command === 'anilist-user') await cmdAnilistUser(positional, flags)
  else if (command === 'anilist-top') await cmdAnilistTop(positional, flags)
  else if (command === 'tmdb-top') await cmdTmdbTop(flags)
  else if (command === 'imdb-top') await cmdImdbTop(flags)
  else if (command === 'rawg-top') await cmdRawgTop(flags)
  else if (command === 'anime-themes') await cmdAnimeThemes(flags)
  else if (command === 'relations-backfill') await cmdRelationsBackfill(flags)
  else {
    console.log('NaviHUB bulk importer\n')
    console.log('  anilist-user <username> [--limit N] [--basic] [--preserve-tracking] [--skip-anime] [--skip-manga] [--delay MS]')
    console.log('  anilist-top [--anime N] [--manga N] [--sort score|popularity|trending|favourites] [--basic] [--only-missing] [--delay MS]   (ranked top anime/manga)')
    console.log('  imdb-top [--count N] [--min-votes N] [--only-missing] [--exclude-langs hi,ta,…] [--omdb-key KEY] [--delay MS]   (greatest films, IMDb-ranked → TMDB)')
    console.log('  tmdb-top [--type movie|tv] [--list top_rated|popular|trending] [--count N] [--omdb-key KEY] [--delay MS]')
    console.log('  rawg-top [--list metacritic|rating|added] [--count N] [--rawg-key KEY] [--no-hltb] [--delay MS]   (top video games)')
    console.log('  anime-themes [--limit N] [--no-audio] [--only-missing] [--audio-dir PATH] [--delay MS]')
    console.log('  relations-backfill [--delay MS]   (add season + manga-source links to titles you already imported)\n')
    console.log('Run via:  ELECTRON_RUN_AS_NODE=1 ./node_modules/.bin/electron scripts/bulk-import.cjs <command>')
    console.log('Close the NaviHUB app first.')
    process.exit(command ? 1 : 0)
  }
}

main()
  .then(() => {
    db.close()
    process.exit(0)
  })
  .catch((err) => {
    console.error('\n✗ Fatal:', err.message)
    db.close()
    process.exit(1)
  })
