#!/usr/bin/env node
/*
 * NaviHUB library EXPORTER — builds a shareable copy of the library with all
 * personal data stripped (see scripts/sanitizeSql.cjs for exactly what goes).
 *
 * Produces a bundle folder the recipient drops into their own NaviHUB data dir
 * (%APPDATA%\navihub on Windows, ~/.config/navihub on Linux) BEFORE first
 * launch:
 *
 *   <out>/
 *     navihub.db    sanitized copy (journal_mode=DELETE, VACUUMed)
 *     media/        covers/photos/art + theme-song audio
 *     README.txt    step-by-step instructions for the recipient
 *
 * Theme audio: audio_path rows ('audio/<file>') resolve via the audio.dir
 * setting on THIS machine but fall back to <userData>/media on a machine where
 * audio.dir is unset — so the files are copied into the bundle's media/ folder,
 * which is exactly where the recipient's app will look for them.
 *
 * IMPORTANT — how to run it:
 *   better-sqlite3 is built against ELECTRON's ABI, so plain `node` can't open
 *   the DB. Run through Electron-as-Node:
 *
 *     npm run export:library                          # -> ~/navihub-export/navihub-bundle
 *     npm run export:library -- --out /path/to/dir    # custom destination
 *     npm run export:library -- --zip                 # also produce <out>.zip (store-only)
 *
 *   >>> CLOSE THE NAVIHUB APP FIRST <<< (the snapshot is consistent either way,
 *   but changes made while exporting would be silently missed).
 */

const path = require('path')
const os = require('os')
const fs = require('fs')
const { spawnSync } = require('child_process')
const Database = require('better-sqlite3')
const { sanitizeDb } = require('./sanitizeSql.cjs')

/* ----------------------------- paths / args ----------------------------- */
// Mirrors Electron's app.getPath('userData') on Linux: ~/.config/<name>.
// Override with NAVIHUB_DIR if your data lives elsewhere.
const USER_DIR = process.env.NAVIHUB_DIR || path.join(os.homedir(), '.config', 'navihub')
const DB_PATH = path.join(USER_DIR, 'navihub.db')
const MEDIA_DIR = path.join(USER_DIR, 'media')

function parseArgs(argv) {
  const flags = { out: path.join(os.homedir(), 'navihub-export', 'navihub-bundle'), zip: false }
  for (let i = 0; i < argv.length; i++) {
    if (argv[i] === '--out') flags.out = path.resolve(argv[++i])
    else if (argv[i] === '--zip') flags.zip = true
    else {
      console.error(`✗ Unknown flag ${argv[i]}. Usage: export-library.cjs [--out DIR] [--zip]`)
      process.exit(1)
    }
  }
  return flags
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms))

// Characters (or trailing dot/space) Windows can't have in filenames. The app's
// sanitizeFileBase already prevents these — this is cheap insurance at export.
const WINDOWS_UNSAFE = /[<>:"|?*]|[. ]$/

async function main() {
  const { out, zip } = parseArgs(process.argv.slice(2))

  if (!fs.existsSync(DB_PATH)) {
    console.error(`✗ DB not found at ${DB_PATH} (set NAVIHUB_DIR if your data lives elsewhere).`)
    process.exit(1)
  }

  const wal = DB_PATH + '-wal'
  if (fs.existsSync(wal) && fs.statSync(wal).size > 0) {
    console.warn('!! navihub.db-wal is non-empty — NaviHUB is probably RUNNING.')
    console.warn('!! Close the app first or the export may miss recent changes.')
    console.warn('   Continuing in 5s (Ctrl+C to abort)...')
    await sleep(5000)
  }

  fs.mkdirSync(out, { recursive: true })
  const outDb = path.join(out, 'navihub.db')
  const outMedia = path.join(out, 'media')

  /* ---- 1. consistent snapshot of the live DB (WAL-safe) ---- */
  console.log(`Snapshotting ${DB_PATH} ...`)
  const src = new Database(DB_PATH, { readonly: true, fileMustExist: true })
  const audioDirRow = src.prepare(`SELECT value FROM settings WHERE key='audio.dir'`).get()
  const audioDir = audioDirRow ? audioDirRow.value : MEDIA_DIR
  const audioPaths = src
    .prepare(`SELECT DISTINCT audio_path FROM theme_song WHERE audio_path LIKE 'audio/%'`)
    .all()
    .map((r) => r.audio_path)
  if (fs.existsSync(outDb)) fs.rmSync(outDb)
  await src.backup(outDb)
  src.close()

  /* ---- 2. sanitize the copy ---- */
  console.log('Sanitizing the copy (personal tracking, lists, jp/music/manga state, secrets)...')
  const copy = new Database(outDb)
  sanitizeDb(copy)
  // Ship a single standalone file (no -wal/-shm); the app switches back to WAL
  // on its first startup (db/connection.ts).
  copy.pragma('journal_mode = DELETE')
  copy.exec('VACUUM')

  /* ---- 3. covers/photos/art ---- */
  console.log(`Copying ${MEDIA_DIR} -> ${outMedia} (skipping music-covers, wiped with music rows)...`)
  const musicCovers = path.join(MEDIA_DIR, 'music-covers')
  fs.cpSync(MEDIA_DIR, outMedia, {
    recursive: true,
    filter: (p) => !p.startsWith(musicCovers)
  })

  /* ---- 4. theme-song audio ---- */
  console.log(`Copying theme audio from ${audioDir} ...`)
  let audioCopied = 0
  const audioMissing = []
  const unsafeNames = []
  for (const rel of audioPaths) {
    const rest = rel.slice('audio/'.length)
    if (WINDOWS_UNSAFE.test(path.basename(rest))) unsafeNames.push(rest)
    const dest = path.join(outMedia, rest)
    const candidates = [path.join(audioDir, rest), path.join(MEDIA_DIR, rest)]
    const found = candidates.find((p) => fs.existsSync(p))
    if (!found) {
      audioMissing.push(rel)
      continue
    }
    fs.mkdirSync(path.dirname(dest), { recursive: true })
    fs.copyFileSync(found, dest)
    audioCopied++
  }

  /* ---- 5. README for the recipient ---- */
  fs.writeFileSync(
    path.join(out, 'README.txt'),
    `NaviHUB library bundle
======================

This folder contains a ready-made NaviHUB library (all the imported anime /
manga / movies / games / etc. with covers and theme songs) with the previous
owner's scores, statuses and progress wiped — it's yours to fill in.

Setup (Windows):

1. Run NaviHUB-Setup-x.x.x.exe. Windows SmartScreen will warn because the app
   is unsigned: click "More info" -> "Run anyway".
   >>> Do NOT launch the app yet. <<<
2. Press Win+R, type  %APPDATA%  and press Enter.
3. Inside the folder that opens, create a folder named  navihub  (skip if it
   already exists). You should now be in something like
   C:\\Users\\<you>\\AppData\\Roaming\\navihub
4. Copy  navihub.db  and the  media  folder from this bundle into it.
5. Launch NaviHUB from the Start menu / desktop shortcut. The first start takes
   a moment (Japanese courses are being set up). Everything else — library,
   covers, theme songs — is already there.

If you accidentally launched the app before step 4: close it, delete
navihub.db, navihub.db-wal and navihub.db-shm from %APPDATA%\\navihub, then
redo step 4.

Optional, in the app's Settings page:
- Add your own free API keys (TMDB / RAWG / OMDb) to import new titles.
- Point "Manga folder" / "Music folder" at your own collections.
- Install yt-dlp + ffmpeg if you want the music downloader.
`
  )

  /* ---- 6. verification summary ---- */
  const one = (sql) => Object.values(copy.prepare(sql).get())[0]
  const tracked = one(`SELECT COUNT(*) FROM media_item WHERE status IS NOT NULL
     OR score IS NOT NULL OR progress<>0 OR started_at IS NOT NULL
     OR finished_at IS NOT NULL OR rewatch_count<>0 OR notes IS NOT NULL
     OR favorite<>0 OR local_dir IS NOT NULL`)
  const hasTable = copy.prepare(`SELECT 1 FROM sqlite_master WHERE type='table' AND name=?`)
  const wiped = [
    'list', 'list_item', 'jp_course', 'jp_lesson', 'jp_card', 'jp_review_log',
    'music_artist', 'music_album', 'music_track', 'music_playlist',
    'music_playlist_track', 'music_play_log', 'manga_chapter'
  ].map((t) => [t, hasTable.get(t) ? one(`SELECT COUNT(*) FROM "${t}"`) : 0])
  const settingsKeys = copy.prepare('SELECT key FROM settings ORDER BY key').all().map((r) => r.key)

  console.log('\n===== Export summary =====')
  console.log(`media_item rows:            ${one('SELECT COUNT(*) FROM media_item')}`)
  console.log(`  with tracking remaining:  ${tracked} (must be 0)`)
  console.log(`theme_song rows:            ${one('SELECT COUNT(*) FROM theme_song')}`)
  console.log(`theme audio copied:         ${audioCopied}/${audioPaths.length} (missing: ${audioMissing.length})`)
  for (const rel of audioMissing.slice(0, 10)) console.log(`    missing: ${rel}`)
  if (unsafeNames.length) {
    console.log(`  !! ${unsafeNames.length} filenames are Windows-unsafe:`)
    for (const n of unsafeNames.slice(0, 10)) console.log(`    ${n}`)
  }
  for (const [t, n] of wiped) console.log(`${(t + ' rows:').padEnd(28)}${n}${n === 0 ? '' : '  <-- expected 0!'}`)
  console.log(`settings keys kept:         ${settingsKeys.join(', ')}`)
  copy.close()

  let total = 0
  const walk = (dir) => {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const p = path.join(dir, e.name)
      if (e.isDirectory()) walk(p)
      else total += fs.statSync(p).size
    }
  }
  walk(out)
  console.log(`bundle size:                ${(total / 1024 / 1024 / 1024).toFixed(2)} GB`)
  console.log(`bundle folder:              ${out}`)

  const failed = tracked !== 0 || wiped.some(([, n]) => n !== 0) || audioMissing.length > 0
  if (failed) console.log('\n✗ CHECK THE WARNINGS ABOVE before sharing this bundle.')

  /* ---- 7. optional zip (store-only: audio/images don't compress) ---- */
  if (zip) {
    const zipFile = out + '.zip'
    console.log(`\nZipping to ${zipFile} (store-only, ~bundle size)...`)
    if (fs.existsSync(zipFile)) fs.rmSync(zipFile)
    const res = spawnSync('zip', ['-rq0', zipFile, path.basename(out)], {
      cwd: path.dirname(out),
      stdio: 'inherit'
    })
    if (res.status !== 0) console.error('✗ zip failed — share the plain folder instead.')
  }

  process.exit(failed ? 1 : 0)
}

main().catch((err) => {
  console.error('✗ Export failed:', err)
  process.exit(1)
})
