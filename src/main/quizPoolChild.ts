import Database from 'better-sqlite3'
import { installSqlite } from './db/sqliteHandle'
import { runQuizPoolRequest } from './quizPoolsCore'

// The quiz pool process's entry (Electron `utilityProcess.fork`, bundled by
// electron-vite's `?modulePath` import in quizPools.ts). It answers
// {id, method, args} messages on process.parentPort from its own read-only
// connection, so availability checks and question builds over the whole
// library never block main. It must not import electron or db/connection.ts.
// No console (tests/noConsole): errors travel back as messages.

interface QuizPoolMessage {
  id: number
  method: string
  args: unknown[]
}

// WAL lets this reader run beside main's writer; readonly also refuses any
// accidental write from a repo function. A database that cannot open ends the
// process, which main treats like a crash and answers the request itself.
let db: Database.Database
try {
  db = new Database(process.env.NAVIHUB_QUIZ_DB ?? '', { readonly: true, fileMustExist: true })
} catch {
  process.exit(1)
}
installSqlite(() => db)

const port = process.parentPort
port.on('message', (e) => {
  const msg = e.data as QuizPoolMessage
  try {
    port.postMessage({ id: msg.id, ok: true, value: runQuizPoolRequest(msg.method, msg.args) })
  } catch (err) {
    port.postMessage({
      id: msg.id,
      ok: false,
      error: err instanceof Error ? err.message : String(err)
    })
  }
})
