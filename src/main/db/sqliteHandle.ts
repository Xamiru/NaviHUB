import type Database from 'better-sqlite3'

// The SQLite handle for repos that also run in the quiz pool process
// (quizPoolChild.ts), which must not load connection.ts: it imports electron
// and owns migrations and seeds. connection.ts installs the main connection
// when it loads; the child installs its own read-only one.
let source: (() => Database.Database) | null = null

export function installSqlite(open: () => Database.Database): void {
  source = open
}

export function getSqlite(): Database.Database {
  if (!source) throw new Error('No database is open in this process.')
  return source()
}
