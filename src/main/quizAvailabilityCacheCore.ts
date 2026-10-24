// Pure half of the quiz availability cache (IO half: quizAvailabilityCache.ts).
//
// Availability runs every quiz's real deal builder over the library, which
// takes seconds of CPU on a large one. The quiz pool process used to be the
// only cache, and it lost the result whenever any row was written (a logged
// round included) or the process went idle, so every visit to /quiz waited
// for a full rebuild. This cache lives in main, keyed by a fingerprint of the
// tables availability reads, and is stale-while-revalidate:
//
// - a verified entry whose fingerprint still matches is served as is;
// - an entry whose fingerprint moved, or one loaded from disk and not yet
//   rebuilt this session, is served at once with `refreshing: true` while one
//   rebuild runs in the background (the renderer polls until it lands);
// - only a key with no entry at all waits for the rebuild.
//
// Rebuilds are spaced: the next one for a key starts no sooner than
// MIN_REBUILD_GAP_MS (or REBUILD_GAP_FACTOR times the last rebuild's length)
// after the last one finished, so a library written to continuously (a
// Football sync, a bulk import) cannot turn the renderer's poll into
// back-to-back rebuilds. A key known to be stale is not fingerprinted again
// while it waits. A failed rebuild keeps the old value, stops refreshing and
// is retried on a read after RETRY_AFTER_FAILURE_MS; a result loaded from
// disk stays unverified until a rebuild succeeds.

export interface StoredAvailability<T> {
  fingerprint: string
  value: T
}

interface Entry<T> extends StoredAvailability<T> {
  verified: boolean
}

export const MIN_REBUILD_GAP_MS = 5_000
export const REBUILD_GAP_FACTOR = 10
export const RETRY_AFTER_FAILURE_MS = 60_000

export interface AvailabilityCacheIo<T> {
  fingerprint(): string | Promise<string>
  load(): Record<string, StoredAvailability<T>>
  save(entries: Record<string, StoredAvailability<T>>): void
  onError(key: string, err: unknown): void
  now?(): number
}

export type Served<T> = T & { refreshing?: boolean }

export class AvailabilityCache<T extends object> {
  private entries: Map<string, Entry<T>> | null = null
  private inflight = new Map<string, Promise<T>>()
  // Keys whose fingerprint was seen to move, waiting for their next rebuild.
  private stale = new Set<string>()
  // Earliest time the next background rebuild of a key may start.
  private notBefore = new Map<string, number>()
  // Set after a failed rebuild: until then the old value is served without
  // `refreshing`, so the renderer stops polling.
  private retryAt = new Map<string, number>()

  constructor(private readonly io: AvailabilityCacheIo<T>) {}

  private now(): number {
    return this.io.now ? this.io.now() : Date.now()
  }

  async read(key: string, compute: () => Promise<T>): Promise<Served<T>> {
    const entry = this.loaded().get(key)
    if (!entry) return { ...(await this.rebuild(key, compute)) }
    if (this.inflight.has(key)) return { ...entry.value, refreshing: true }
    const now = this.now()
    if (now < (this.retryAt.get(key) ?? 0)) return { ...entry.value }
    if (entry.verified && !this.stale.has(key)) {
      let current: string | null = null
      try {
        current = await this.io.fingerprint()
      } catch (err) {
        this.io.onError('fingerprint', err)
      }
      if (current === entry.fingerprint) return { ...entry.value }
      this.stale.add(key)
    }
    if (this.now() >= (this.notBefore.get(key) ?? 0)) {
      this.rebuild(key, compute).catch(() => {
        // Reported through io.onError inside rebuild; the stale value stands.
      })
    }
    return { ...entry.value, refreshing: true }
  }

  private loaded(): Map<string, Entry<T>> {
    if (this.entries) return this.entries
    this.entries = new Map()
    let stored: Record<string, StoredAvailability<T>> = {}
    try {
      stored = this.io.load()
    } catch (err) {
      this.io.onError('load', err)
    }
    for (const [key, item] of Object.entries(stored)) {
      this.entries.set(key, { ...item, verified: false })
    }
    return this.entries
  }

  // One rebuild per key at a time. The fingerprint is taken before the
  // computation, so a write that lands during the rebuild leaves the stored
  // fingerprint behind the library and the next read schedules another.
  private rebuild(key: string, compute: () => Promise<T>): Promise<T> {
    const running = this.inflight.get(key)
    if (running) return running
    const entries = this.loaded()
    const startedAt = this.now()
    const promise = (async () => {
      const fingerprint = await this.io.fingerprint()
      return { fingerprint, value: await compute() }
    })()
      .then(({ fingerprint, value }) => {
        const finishedAt = this.now()
        entries.set(key, { fingerprint, value, verified: true })
        this.stale.delete(key)
        this.retryAt.delete(key)
        this.notBefore.set(
          key,
          finishedAt + Math.max(MIN_REBUILD_GAP_MS, (finishedAt - startedAt) * REBUILD_GAP_FACTOR)
        )
        this.persist()
        return value
      })
      .catch((err: unknown) => {
        this.io.onError(key, err)
        if (entries.has(key)) this.retryAt.set(key, this.now() + RETRY_AFTER_FAILURE_MS)
        throw err
      })
      .finally(() => {
        this.inflight.delete(key)
      })
    this.inflight.set(key, promise)
    return promise
  }

  private persist(): void {
    const out: Record<string, StoredAvailability<T>> = {}
    for (const [key, entry] of this.loaded()) {
      out[key] = { fingerprint: entry.fingerprint, value: entry.value }
    }
    try {
      this.io.save(out)
    } catch (err) {
      this.io.onError('save', err)
    }
  }
}

// The file format, checked on load so a damaged or older file is ignored
// rather than served. `stamp` is the app version plus FORMAT_VERSION: a new
// release may add availability fields the renderer expects, so a file from
// another release is dropped and rebuilt.
export const FORMAT_VERSION = 1

export function parseStoredFile<T>(
  raw: string,
  stamp: string
): Record<string, StoredAvailability<T>> {
  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return {}
  }
  if (!parsed || typeof parsed !== 'object') return {}
  const file = parsed as { stamp?: unknown; entries?: unknown }
  if (file.stamp !== stamp || !file.entries || typeof file.entries !== 'object') return {}
  const out: Record<string, StoredAvailability<T>> = {}
  for (const [key, item] of Object.entries(file.entries as Record<string, unknown>)) {
    const candidate = item as { fingerprint?: unknown; value?: unknown } | null
    if (
      candidate &&
      typeof candidate.fingerprint === 'string' &&
      candidate.value &&
      typeof candidate.value === 'object'
    ) {
      out[key] = { fingerprint: candidate.fingerprint, value: candidate.value as T }
    }
  }
  return out
}

export function serializeStoredFile<T>(
  entries: Record<string, StoredAvailability<T>>,
  stamp: string
): string {
  return JSON.stringify({ stamp, entries })
}
