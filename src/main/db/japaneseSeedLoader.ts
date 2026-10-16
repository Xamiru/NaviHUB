import { getSqlite } from './connection'
import { SEED_VERSION, SEED_VERSION_KEY } from './japaneseSeedVersion'
import { logError } from '../logBus'
import { reattachSeedRows, seedDrift } from './japaneseSeedSync'
import type { JpBuiltInStatus } from '@shared/types'

// The built-in Japanese courses (~0.8 MB of seed modules) load only when they
// have something to do: a library whose last completed sync stamped the
// current SEED_VERSION skips the import entirely, so a normal launch pays one
// settings read instead of parsing the whole curriculum. index.ts starts this
// right after initDatabase(); the Japanese course/review IPC handlers await it
// (ipc.ts `seeded`), so a first launch never answers with an empty library.

let ready: Promise<void> | null = null

// The seed itself; rejects on failure. Resolves at once when the stamp is current.
function runSeed(): Promise<void> {
  const db = getSqlite()
  const stamp = db.prepare('SELECT value FROM settings WHERE key = ?').get(SEED_VERSION_KEY) as
    | { value: string }
    | undefined
  if (stamp?.value === SEED_VERSION) return Promise.resolve()
  return import('./japaneseSeed').then((m) => m.seedJapanese(db))
}

function logSeedFailure(err: unknown): void {
  logError(
    'db',
    `built-in Japanese course seed failed: ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`
  )
}

export function japaneseSeedReady(): Promise<void> {
  // A failed seed must not wedge every Japanese channel: the section keeps
  // serving whatever the library already has, and the next launch retries
  // (the stamp was not written).
  ready ??= runSeed().catch(logSeedFailure)
  return ready
}

export async function builtInStatus(): Promise<JpBuiltInStatus> {
  await japaneseSeedReady()
  return seedDrift(getSqlite())
}

// Settings → Learning → "Built-in course updates": the user's explicit choice to
// put the built-in text back over edited (or stale) built-in rows and bring in
// what the key backfill found missing. Unlike startup, a failure here rejects,
// so the renderer reports it instead of a success toast.
export async function restoreBuiltIn(): Promise<JpBuiltInStatus> {
  await japaneseSeedReady()
  reattachSeedRows(getSqlite())
  const run = runSeed()
  ready = run.catch(logSeedFailure)
  await run
  return seedDrift(getSqlite())
}
