// Caches History's curated remote images (event heroes, portraits, posters)
// into the content-addressed media/ pool, the franchise art pattern: a page
// shows a placeholder until a cached path exists (the renderer never loads the
// remote URL itself), downloads run in the background as a task, and the page
// polls history:imageStatus and refreshes as images land.
//
// Nearly every image is on Wikimedia, which rate-limits bursts. So there is ONE
// queue and ONE download at a time, spaced MIN_GAP_MS apart; a 429 is waited
// out inside fetchWithRetry, which pauses the whole queue rather than letting
// other workers keep hitting the host. The page being looked at goes first:
// each request puts its URLs at the front.

import type { HistoryImageStatus } from '@shared/types'
import { runWithActivitySignal } from '../activityContext'
import { cachedDownload, downloadImage } from '../files'
import { logWarn } from '../logBus'
import * as tasks from '../tasks'

const state: HistoryImageStatus = { running: false, done: 0, total: 0 }

// A URL that failed (or was cancelled before its turn) is not retried until the
// cooldown passes. Pages refetch as images land, and every refetch asks for
// images again, so without this an offline machine or one dead URL would be
// queued again on every poll for as long as the page stays open.
export const RETRY_COOLDOWN_MS = 10 * 60_000
const retryAfter = new Map<string, number>()

/** Minimum spacing between two downloads. */
export const MIN_GAP_MS = 1100
let gapMs = MIN_GAP_MS

/** Tests shorten the spacing; production never calls this. */
export function setDownloadGapForTests(ms: number): void {
  gapMs = ms
}

const queue: string[] = []
let inFlight: string | null = null

export function imageStatus(): HistoryImageStatus {
  return { ...state }
}

// Wikimedia's upload servers refuse requests without a descriptive agent.
export function historyRequestHeaders(url: string): Record<string, string> | undefined {
  const host = new URL(url).hostname
  return /(^|\.)wikimedia\.org$/.test(host) || /(^|\.)archive\.org$/.test(host) || /(^|\.)loc\.gov$/.test(host)
    ? { 'User-Agent': 'NaviHUB/1.0 (personal offline history archive; one request at a time)' }
    : undefined
}

function sleep(ms: number, signal: AbortSignal): Promise<void> {
  return new Promise((resolve) => {
    if (signal.aborted) return resolve()
    const t = setTimeout(resolve, ms)
    signal.addEventListener('abort', () => {
      clearTimeout(t)
      resolve()
    }, { once: true })
  })
}

/**
 * Queues the missing images, the most recent request first (`back` queues a
 * background prefetch behind everything instead). Returns whether anything new
 * was queued (a request for images already queued only moves them forward).
 */
export function ensureImages(
  urls: string[],
  label: string,
  now = Date.now(),
  { back = false }: { back?: boolean } = {}
): { started: boolean } {
  const wanted = [...new Set(urls)].filter(
    (u) => u.startsWith('https://') && u !== inFlight && (retryAfter.get(u) ?? 0) <= now && !cachedDownload(u)
  )
  if (wanted.length === 0) return { started: false }
  const queued = new Set(queue)
  const fresh = wanted.filter((u) => !queued.has(u))
  if (back) {
    // Background prefetch (the timeline's medallions): behind everything queued.
    queue.push(...fresh)
  } else {
    // Move everything this page wants to the front, in the page's order.
    const wantedSet = new Set(wanted)
    const rest = queue.filter((u) => !wantedSet.has(u))
    queue.splice(0, queue.length, ...wanted, ...rest)
  }
  if (state.running) {
    state.total += fresh.length
    return { started: fresh.length > 0 }
  }
  Object.assign(state, { running: true, done: 0, total: queue.length })
  start(label)
  return { started: true }
}

function start(label: string): void {
  const ctl = new AbortController()
  const run = tasks.runTask(
    {
      kind: 'historyImages',
      label,
      route: '/history',
      controls: { cancel: () => ctl.abort(), pauseNote: 'Image caching cannot be paused' },
      project: () => ({ done: state.done, total: state.total })
    },
    async (handle) =>
      runWithActivitySignal(ctl.signal, async () => {
        let failed = 0
        let attempted = 0
        try {
          while (queue.length > 0) {
            if (handle.cancelRequested() || ctl.signal.aborted) throw new tasks.TaskCancelledError(label)
            const url = queue.shift()!
            inFlight = url
            attempted += 1
            if (!cachedDownload(url) && (await downloadImage(url, undefined, historyRequestHeaders(url))) == null) {
              failed += 1
              retryAfter.set(url, Date.now() + RETRY_COOLDOWN_MS)
            }
            inFlight = null
            state.done += 1
            if (queue.length > 0) await sleep(gapMs, ctl.signal)
          }
          // Synchronous with the empty-queue check above: a request arriving
          // after this point starts a fresh run instead of joining this one.
          state.running = false
        } finally {
          state.running = false
          inFlight = null
          // A cancelled run must not restart from the refetch it triggers.
          const until = Date.now() + RETRY_COOLDOWN_MS
          for (const url of queue.splice(0)) retryAfter.set(url, until)
        }
        if (failed > 0) logWarn('app', `history images: ${failed} of ${attempted} downloads failed`)
      })
  )
  void run.catch(() => {})
}
