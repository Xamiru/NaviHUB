import { openSandboxDb, runUserSql, type SandboxDb } from './sqlSandboxCore'

// The SQL sandbox's utility-process entry (Electron `utilityProcess.fork`,
// bundled by electron-vite's `?modulePath` import in sqlSandbox.ts). It holds
// ONE seeded in-memory database and answers {id, sql, rowCap} messages on
// process.parentPort. It exists so a runaway query can be killed from main —
// SQLite has no interrupt through better-sqlite3 and a worker thread cannot be
// terminated mid-step. No console (tests/noConsole): errors travel back as
// messages, and main logs them.

interface RunMessage {
  id: number
  sql: string
  rowCap: number
}

const HEAP_LIMIT = 128 * 1024 * 1024

let db: SandboxDb | null = null

function getDb(): SandboxDb {
  if (!db) db = openSandboxDb({ heapLimitBytes: HEAP_LIMIT })
  return db
}

const port = process.parentPort
port.on('message', (e) => {
  const msg = e.data as RunMessage
  try {
    const out = runUserSql(getDb(), msg.sql, msg.rowCap)
    port.postMessage({ id: msg.id, ok: true, ...out })
  } catch (err) {
    port.postMessage({
      id: msg.id,
      ok: false,
      error: err instanceof Error ? err.message : String(err)
    })
  }
})
