// Caches the curated franchise artwork (franchise heroes, entry backgrounds,
// character portraits from @shared/franchises) into the content-addressed
// media/ pool. The renderer renders the remote https URL until a cached path
// exists (CSP allows img-src https:), so nothing here ever blocks a page —
// ensureArt/ensureHeroes fire a background batch and return immediately; the
// page polls franchise:artStatus and re-fetches its map when the run ends.
//
// Downloads are resumable for free: every file is content-addressed by URL
// (files.ts dlFileName), so a killed run just skips what already landed.

import { franchiseCfg, franchiseArtUrls, franchiseHeroUrls } from '@shared/franchises'
import type { FranchiseArtStatus } from '@shared/types'
import { runWithActivitySignal } from './activityContext'
import { cachedDownload, downloadImage } from './files'
import { logWarn } from './logBus'
import * as tasks from './tasks'

const artState: FranchiseArtStatus = {
  running: false,
  franchiseId: null,
  done: 0,
  total: 0
}

export function getArtStatus(): FranchiseArtStatus {
  return { ...artState }
}

// url -> cached relative path (null while not yet downloaded). Synchronous
// existsSync sweep — a franchise has a few dozen URLs at most.
export function artMap(franchiseId: string): Record<string, string | null> {
  const cfg = franchiseCfg(franchiseId)
  if (!cfg) return {}
  const out: Record<string, string | null> = {}
  for (const url of franchiseArtUrls(cfg)) out[url] = cachedDownload(url)
  return out
}

// franchiseId -> cached hero path (null until downloaded), for the index page.
export function heroMap(): Record<string, string | null> {
  const out: Record<string, string | null> = {}
  for (const [id, url] of Object.entries(franchiseHeroUrls())) out[id] = cachedDownload(url)
  return out
}

export async function ensureArt(franchiseId: string): Promise<{ started: boolean }> {
  const cfg = franchiseCfg(franchiseId)
  if (!cfg) return { started: false }
  return ensureUrls(franchiseArtUrls(cfg), franchiseId, `Caching ${cfg.name} artwork`, `/games/franchises/${cfg.id}`)
}

export async function ensureHeroes(): Promise<{ started: boolean }> {
  return ensureUrls(Object.values(franchiseHeroUrls()), null, 'Caching franchise art', '/games/franchises')
}

// Single-flight: one batch at a time. Fire-and-forget — the handler returns
// { started: true } while the task runs. runTask rethrows on error, so the
// catch keeps a failed batch from becoming an unhandled rejection (failures
// are per-URL anyway).
function ensureUrls(
  urls: string[],
  franchiseId: string | null,
  label: string,
  route: string
): { started: boolean } {
  if (artState.running) return { started: false }
  const missing = urls.filter((url) => !cachedDownload(url))
  if (missing.length === 0) return { started: false }

  Object.assign(artState, { running: true, franchiseId, done: 0, total: missing.length })
  const controller = new AbortController()
  const run = tasks.runTask(
    {
      kind: 'franchiseArt',
      label,
      route,
      controls: {
        cancel: () => controller.abort(),
        pauseNote: 'Artwork caching cannot be paused'
      },
      project: () => ({ done: artState.done, total: artState.total })
    },
    async (handle) => runWithActivitySignal(controller.signal, async () => {
      let failed = 0
      // Same small-pool shape as files.downloadImages, inlined so done/total
      // land in artState (downloadImages only reports into the import
      // activity slot, which is not running here).
      let next = 0
      const worker = async (): Promise<void> => {
        while (next < missing.length) {
          if (handle.cancelRequested()) throw new tasks.TaskCancelledError(label)
          const url = missing[next++]
          if ((await downloadImage(url)) == null) failed += 1
          artState.done += 1
        }
      }
      await Promise.all(Array.from({ length: Math.min(5, missing.length) }, worker))
      if (failed > 0) logWarn('app', `franchise art: ${failed} of ${missing.length} downloads failed`)
    })
  )
  void run.catch(() => {}).finally(() => {
    artState.running = false
  })
  return { started: true }
}
