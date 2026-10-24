import { app } from 'electron'
import { readFileSync, renameSync, writeFileSync } from 'fs'
import { join } from 'path'
import type {
  QuizAvailability,
  QuizAvailabilityRequest,
  QuizFootballAvailability
} from '@shared/types'
import { getSqlite } from './db/connection'
import { callQuizPools } from './quizPools'
import { logWarn } from './logBus'
import {
  AvailabilityCache,
  FORMAT_VERSION,
  parseStoredFile,
  serializeStoredFile,
  type Served
} from './quizAvailabilityCacheCore'

// IO half of the quiz availability cache: the fingerprint and the rebuilds
// both run in the quiz pool process (the fingerprint counts whole tables, too
// slow for main on a large library), and results persist to one small JSON file in userData so the
// first /quiz visit after launch is instant too. The file is derived data:
// deleting it only costs one rebuild.

const FILE_NAME = 'quiz-availability.json'

function filePath(): string {
  return join(app.getPath('userData'), FILE_NAME)
}

function stamp(): string {
  return `${app.getVersion()}/${FORMAT_VERSION}`
}

// Main's own change counters, both constant-time: total_changes() moves on
// every write through main's connection, data_version on a commit by another
// one (the headless scripts). While neither moves, the last fingerprint still
// holds and the pool process is not asked again.
let lastFingerprint: { gate: string; fingerprint: string } | null = null

async function fingerprint(): Promise<string> {
  const db = getSqlite()
  const { changes } = db.prepare('SELECT total_changes() AS changes').get() as { changes: number }
  const gate = `${changes}:${db.pragma('data_version', { simple: true }) as number}`
  if (lastFingerprint?.gate === gate) return lastFingerprint.fingerprint
  const value = await callQuizPools('availabilityFingerprint')
  lastFingerprint = { gate, fingerprint: value }
  return value
}

function makeCache<T extends object>(name: string): AvailabilityCache<T> {
  return new AvailabilityCache<T>({
    fingerprint,
    load: () => {
      let raw: string
      try {
        raw = readFileSync(filePath(), 'utf8')
      } catch {
        return {}
      }
      const all = parseStoredFile<unknown>(raw, stamp())
      const prefix = `${name}:`
      const own: Record<string, { fingerprint: string; value: T }> = {}
      for (const [key, item] of Object.entries(all)) {
        if (key.startsWith(prefix)) own[key] = item as { fingerprint: string; value: T }
      }
      return own
    },
    save: (entries) => saveSection(name, entries),
    onError: (key, err) =>
      logWarn('proc', `quiz availability cache (${key}): ${err instanceof Error ? err.message : String(err)}`)
  })
}

// Both caches share the file; each rewrites only its own keys.
function saveSection(name: string, entries: Record<string, unknown>): void {
  let current: Record<string, { fingerprint: string; value: unknown }> = {}
  try {
    current = parseStoredFile(readFileSync(filePath(), 'utf8'), stamp())
  } catch {
    // No file yet.
  }
  const prefix = `${name}:`
  for (const key of Object.keys(current)) if (key.startsWith(prefix)) delete current[key]
  Object.assign(current, entries)
  const target = filePath()
  const temp = `${target}.partial`
  writeFileSync(temp, serializeStoredFile(current, stamp()), 'utf8')
  renameSync(temp, target)
}

const library = makeCache<QuizAvailability>('library')
const football = makeCache<QuizFootballAvailability>('football')

export function availability(request: QuizAvailabilityRequest = {}): Promise<Served<QuizAvailability>> {
  const key = `library:${JSON.stringify([request.scope ?? 'consumed', request.statuses?.filter(Boolean) ?? []])}`
  return library.read(key, () => callQuizPools('availability', request))
}

export function footballAvailability(): Promise<Served<QuizFootballAvailability>> {
  return football.read('football:all', () => callQuizPools('footballAvailability'))
}
