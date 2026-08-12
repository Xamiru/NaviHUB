#!/usr/bin/env node
/*
 * Builds the offline games-catalog data pack from the RAWG JSONL dump
 * (huggingface.co/datasets/atalaydenknalbant/video-games-dataset — CC0,
 * last refreshed 2026-06, weeks before RAWG's API died).
 *
 *   ELECTRON_RUN_AS_NODE=1 npx electron scripts/build-games-catalog.cjs \
 *       <games.jsonl> <out-dir>
 *
 * (electron-as-node because better-sqlite3 is built for Electron's ABI —
 * the npm-test invocation trick.)
 *
 * Filters to `added >= 1`: of ~900k rows, ~780k have added == 0 — shovelware
 * no RAWG user ever tracked; dropping them turns a 4.1 GB dump into a ~55 MB
 * download while keeping every game anyone actually plays. Emits
 * rawg-catalog.db.gz, published as the `games-catalog-1` GitHub PRERELEASE
 * asset (prerelease so electron-updater's /releases/latest ignores it).
 * The app-side reader is src/main/gamesCatalog.ts.
 */
const { createReadStream, writeFileSync, rmSync, readFileSync } = require('node:fs')
const { createInterface } = require('node:readline')
const { gzipSync } = require('node:zlib')
const { join } = require('node:path')
const Database = require('better-sqlite3')

// MUST match CATALOG_DDL in src/main/gamesCatalogDb.ts —
// tests/gamesCatalog.test.ts diffs the two, so drift fails the suite.
// DDL-START
const CATALOG_DDL = `
CREATE TABLE IF NOT EXISTS catalog_meta (key TEXT PRIMARY KEY, value TEXT);
CREATE TABLE IF NOT EXISTS catalog_game (
  id            INTEGER PRIMARY KEY,  -- RAWG id: media dedup key ('rawg', id)
  name          TEXT NOT NULL,
  name_original TEXT,
  released      TEXT,
  image_url     TEXT,
  rating        REAL,
  ratings_count INTEGER,
  added         INTEGER NOT NULL DEFAULT 0,  -- RAWG popularity: the search rank
  metacritic    INTEGER,
  playtime      INTEGER,                     -- RAWG avg hours: length fallback
  platforms     TEXT,                        -- JSON array of platform slugs
  developers    TEXT,                        -- JSON [{id,name}]
  publishers    TEXT,                        -- JSON [{id,name}]
  genres        TEXT,                        -- JSON array of names
  description   TEXT
);
CREATE VIRTUAL TABLE IF NOT EXISTS catalog_fts USING fts5(name, alt, content='');
`
// DDL-END

const MIN_ADDED = 1
const DESC_CAP = 2000

function rowFrom(d) {
  const companies = (list) =>
    JSON.stringify((list ?? []).filter((c) => c?.id && c?.name).map((c) => ({ id: c.id, name: c.name })))
  return {
    id: d.id,
    name: d.name ?? 'Untitled',
    name_original: d.name_original ?? null,
    released: d.released ?? null,
    image_url: d.background_image ?? null,
    rating: d.rating ?? null,
    ratings_count: d.ratings_count ?? null,
    added: d.added ?? 0,
    metacritic: d.metacritic ?? null,
    playtime: d.playtime ?? null,
    platforms: JSON.stringify(
      (d.platforms ?? []).map((p) => p?.platform?.slug).filter(Boolean)
    ),
    developers: companies(d.developers),
    publishers: companies(d.publishers),
    genres: JSON.stringify((d.genres ?? []).map((g) => g?.name).filter(Boolean)),
    description: (d.description_raw ?? '').slice(0, DESC_CAP) || null,
    alt: (d.alternative_names ?? []).join(' ')
  }
}

async function main() {
  const [src, outDir] = process.argv.slice(2)
  if (!src || !outDir) {
    console.error('usage: build-games-catalog.cjs <games.jsonl> <out-dir>')
    process.exit(1)
  }
  const dbPath = join(outDir, 'rawg-catalog.db')
  rmSync(dbPath, { force: true })
  const db = new Database(dbPath)
  db.pragma('journal_mode = OFF')
  db.pragma('synchronous = OFF')
  db.exec(CATALOG_DDL)

  const insGame = db.prepare(`INSERT OR REPLACE INTO catalog_game
    (id, name, name_original, released, image_url, rating, ratings_count, added,
     metacritic, playtime, platforms, developers, publishers, genres, description)
    VALUES (@id, @name, @name_original, @released, @image_url, @rating, @ratings_count,
     @added, @metacritic, @playtime, @platforms, @developers, @publishers, @genres, @description)`)
  const insFts = db.prepare(
    'INSERT INTO catalog_fts (rowid, name, alt) VALUES (?, ?, ?)'
  )

  let read = 0
  let kept = 0
  let batch = []
  const flush = db.transaction((rows) => {
    for (const r of rows) {
      insGame.run(r)
      insFts.run(r.id, r.name, r.alt)
    }
  })

  const rl = createInterface({ input: createReadStream(src), crlfDelay: Infinity })
  for await (const line of rl) {
    read++
    if (!line.trim()) continue
    let d
    try {
      d = JSON.parse(line)
    } catch {
      continue // one mangled line must not sink the build
    }
    if (!d?.id || (d.added ?? 0) < MIN_ADDED) continue
    batch.push(rowFrom(d))
    kept++
    if (batch.length >= 5000) {
      flush(batch)
      batch = []
    }
    if (read % 100000 === 0) console.log(`  ${read} read, ${kept} kept…`)
  }
  if (batch.length) flush(batch)

  db.prepare(`INSERT OR REPLACE INTO catalog_meta (key, value) VALUES ('snapshot', ?)`).run(
    '2026-06-27'
  )
  db.prepare(`INSERT OR REPLACE INTO catalog_meta (key, value) VALUES ('minAdded', ?)`).run(
    String(MIN_ADDED)
  )
  db.exec('VACUUM')
  db.close()

  console.log(`${kept}/${read} games kept — gzipping…`)
  writeFileSync(`${dbPath}.gz`, gzipSync(readFileSync(dbPath), { level: 9 }))
  console.log(`done: ${dbPath}.gz`)
}

// Guarded so the drift test can require({ CATALOG_DDL }) without running a build.
if (require.main === module) {
  main().catch((e) => {
    console.error(e)
    process.exit(1)
  })
}

module.exports = { CATALOG_DDL }
