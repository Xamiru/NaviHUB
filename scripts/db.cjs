#!/usr/bin/env node
/*
 * THE way to inspect NaviHUB's databases. Run it as:
 *
 *   npm run db:query -- "SELECT title, status FROM media_item LIMIT 5"
 *   npm run db:query -- .tables
 *   npm run db:query -- .schema media_item
 *   npm run db:query -- --db dict "SELECT COUNT(*) FROM en_lemma"
 *   npm run db:query -- --json "SELECT * FROM settings"
 *
 * Why this exists: across 48 sessions the same one-off
 * `ELECTRON_RUN_AS_NODE=1 … electron -e "…better-sqlite3…"` incantation was
 * re-typed 231 times in five mutually incompatible spellings, most of which also
 * missed the permission allowlist. One script, one npm script, one allowlist entry.
 *
 * READ-ONLY by default. Pass --write to open writable; it will say so loudly.
 * This is the user's only copy of their library — there is no second DB anywhere.
 */
const { existsSync } = require('fs')
const { join } = require('path')
const { homedir } = require('os')

function userDataDir() {
  if (process.env.NAVIHUB_USERDATA) return process.env.NAVIHUB_USERDATA
  if (process.platform === 'win32') {
    return join(process.env.APPDATA || join(homedir(), 'AppData', 'Roaming'), 'navihub')
  }
  if (process.platform === 'darwin') {
    return join(homedir(), 'Library', 'Application Support', 'navihub')
  }
  return join(process.env.XDG_CONFIG_HOME || join(homedir(), '.config'), 'navihub')
}

const DBS = {
  main: 'navihub.db',
  dict: 'dictionaries.db',
  catalog: 'rawg-catalog.db'
}

function usage(msg) {
  if (msg) console.error(`\n${msg}`)
  console.error(`
Usage: npm run db:query -- [--db main|dict|catalog|<path>] [--json] [--write] <sql | .tables | .schema NAME>

  --db      which database (default: main). Accepts a raw path too.
  --json    print rows as JSON instead of a table.
  --write   open writable. Default is read-only; you almost never want this.

Databases live in ${userDataDir()}
`)
  process.exit(msg ? 1 : 0)
}

const argv = process.argv.slice(2)
let which = 'main'
let asJson = false
let write = false
const rest = []
for (let i = 0; i < argv.length; i++) {
  const a = argv[i]
  if (a === '--db') which = argv[++i]
  else if (a === '--json') asJson = true
  else if (a === '--write') write = true
  else if (a === '-h' || a === '--help') usage()
  else rest.push(a)
}
if (!rest.length) usage('No query given.')

const dbPath = DBS[which] ? join(userDataDir(), DBS[which]) : which
if (!existsSync(dbPath)) {
  console.error(`\nNo database at ${dbPath}`)
  console.error(
    which === 'main'
      ? 'On the VPS this is expected — the live library only exists on the laptop.\n' +
          'Point at a copy with --db <path>, or build a throwaway one from src/main/db/init.sql.\n'
      : 'That pack may simply not be installed.\n'
  )
  process.exit(2)
}

let Database
try {
  Database = require('better-sqlite3')
} catch (e) {
  console.error(
    '\nCould not load better-sqlite3. Run this through the npm script ' +
      '(`npm run db:query -- …`) so it uses NaviHUB\'s Electron/Node runtime.\n'
  )
  process.exit(3)
}

const db = new Database(dbPath, { readonly: !write, fileMustExist: true })
if (write) console.error('!! opened WRITABLE — this is the live library, be careful\n')

const sql = rest.join(' ')
let statement = sql

if (sql === '.tables') {
  statement = "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
} else if (sql.startsWith('.schema')) {
  const name = sql.split(/\s+/)[1]
  if (!name) usage('.schema needs a table name.')
  statement = `SELECT sql FROM sqlite_master WHERE name='${name.replace(/'/g, "''")}'`
}

try {
  const isSelect = /^\s*(select|with|pragma)\b/i.test(statement)
  if (!isSelect && !write) {
    console.error('Refusing to run a non-SELECT without --write.\n')
    process.exit(1)
  }
  const rows = isSelect ? db.prepare(statement).all() : db.prepare(statement).run()
  if (!isSelect) {
    console.log(rows)
  } else if (asJson) {
    console.log(JSON.stringify(rows, null, 2))
  } else if (!rows.length) {
    console.log('(no rows)')
  } else if (sql.startsWith('.schema')) {
    console.log(rows[0].sql)
  } else {
    console.table(rows)
    console.log(`${rows.length} row${rows.length === 1 ? '' : 's'}`)
  }
} catch (e) {
  console.error(`\nSQL error: ${e.message}\n`)
  process.exit(1)
} finally {
  db.close()
}
