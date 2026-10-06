// Caches History's curated remote images (event heroes, portraits, posters)
// into the content-addressed media/ pool, the franchise art pattern: pages
// render the remote https URL until a cached path exists, a batch runs in the
// background as a task, and the page polls history:imageStatus.

import type { HistoryImageStatus } from '@shared/types'
import { runWithActivitySignal } from '../activityContext'
import { cachedDownload, downloadImage } from '../files'
import { logWarn } from '../logBus'
import * as tasks from '../tasks'

const state: HistoryImageStatus = { running: false, done: 0, total: 0 }

// A URL that failed (or was cancelled before its turn) is not retried until the
// cooldown passes. Pages refetch when a batch settles, and every refetch asks
// for images again, so without this an offline machine or one dead URL would
// start a new batch every poll for as long as the page stays open.
export const RETRY_COOLDOWN_MS = 10 * 60_000
const retryAfter = new Map<string, number>()

export function imageStatus(): HistoryImageStatus {
  return { ...state }
}

// Wikimedia's upload servers refuse requests without a descriptive agent.
export function historyRequestHeaders(url: string): Record<string, string> | undefined {
  const host = new URL(url).hostname
  return /(^|\.)wikimedia\.org$/.test(host) || /(^|\.)archive\.org$/.test(host) || /(^|\.)loc\.gov$/.test(host)
    ? { 'User-Agent': 'NaviHUB/1.0 (personal offline history archive)' }
    : undefined
}

/** Single-flight background batch; returns whether a batch started. */
export function ensureImages(urls: string[], label: string, now = Date.now()): { started: boolean } {
  if (state.running) return { started: false }
  const missing = [...new Set(urls)].filter(
    (u) => u.startsWith('https://') && (retryAfter.get(u) ?? 0) <= now && !cachedDownload(u)
  )
  if (missing.length === 0) return { started: false }
  Object.assign(state, { running: true, done: 0, total: missing.length })
  const controller = new AbortController()
  const run = tasks.runTask(
    {
      kind: 'historyImages',
      label,
      route: '/history',
      controls: { cancel: () => controller.abort(), pauseNote: 'Image caching cannot be paused' },
      project: () => ({ done: state.done, total: state.total })
    },
    async (handle) =>
      runWithActivitySignal(controller.signal, async () => {
        let failed = 0
        let next = 0
        const worker = async (): Promise<void> => {
          while (next < missing.length) {
            if (handle.cancelRequested()) throw new tasks.TaskCancelledError(label)
            const url = missing[next++]
            if ((await downloadImage(url, undefined, historyRequestHeaders(url))) == null) {
              failed += 1
              retryAfter.set(url, Date.now() + RETRY_COOLDOWN_MS)
            }
            state.done += 1
          }
        }
        try {
          await Promise.all(Array.from({ length: Math.min(4, missing.length) }, worker))
        } finally {
          // A cancelled batch must not restart from the refetch it triggers.
          const until = Date.now() + RETRY_COOLDOWN_MS
          for (const url of missing.slice(next)) retryAfter.set(url, until)
        }
        if (failed > 0) logWarn('app', `history images: ${failed} of ${missing.length} downloads failed`)
      })
  )
  void run.catch(() => {}).finally(() => {
    state.running = false
  })
  return { started: true }
}
