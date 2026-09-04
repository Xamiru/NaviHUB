#!/usr/bin/env node

const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const Database = require('better-sqlite3')

const scratchDir = fs.mkdtempSync(path.join(os.tmpdir(), 'navihub-native-smoke-'))
const dbPath = path.join(scratchDir, 'native-smoke.db')
let db

try {
  db = new Database(dbPath)
  db.exec(`
    CREATE TABLE native_smoke (
      id INTEGER PRIMARY KEY,
      marker TEXT NOT NULL
    )
  `)
  db.prepare('INSERT INTO native_smoke(marker) VALUES (?)').run('write-ok')
  assert.equal(db.pragma('integrity_check', { simple: true }), 'ok')
  const sqliteVersion = db.prepare('SELECT sqlite_version() AS version').get().version
  db.close()

  db = new Database(dbPath, { readonly: true })
  assert.deepEqual(db.prepare('SELECT id, marker FROM native_smoke').get(), {
    id: 1,
    marker: 'write-ok'
  })

  const betterSqliteVersion = require('better-sqlite3/package.json').version
  console.log(
    `Native smoke passed: Electron ${process.versions.electron}, Node ${process.versions.node}, ` +
      `better-sqlite3 ${betterSqliteVersion}, SQLite ${sqliteVersion}`
  )
} finally {
  if (db?.open) db.close()
  fs.rmSync(scratchDir, { recursive: true, force: true })
}
