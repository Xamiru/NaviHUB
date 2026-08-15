// Caches the curated franchise artwork (entry backgrounds + character
// portraits from @shared/franchises) into the content-addressed media/ pool.
// The renderer renders the remote https URL until a cached path exists (CSP
// allows img-src https:), so nothing here ever blocks a page — ensureArt
// fires a background batch and returns immediately; the page polls
// franchise:artStatus and re-fetches the map when the run ends.
//
// Downloads are resumable for free: every file is content-addressed by URL
// (files.ts dlFileName), so a killed run just skips what already landed.

import { franchiseCfg, franchiseArtUrls } from '@shared/franchises'
import type { FranchiseArtStatus } from '@shared/types'
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

export async function ensureArt(franchiseId: string): Promise<{ started: boolean }> {
  const cfg = franchiseCfg(franchiseId)
  if (!cfg || artState.running) return { started: false }
  const missing = franchiseArtUrls(cfg).filter((url) => !cachedDownload(url))
  if (missing.length === 0) return { started: false }

  Object.assign(artState, {
    running: true,
    franchiseId,
    done: 0,
    total: missing.length
  })
  // Fire-and-forget: the handler returns { started: true } while the task
  // runs. runTask rethrows on error, so the catch below keeps a failed batch
  // from becoming an unhandled rejection — failures are per-URL anyway.
  const run = tasks.runTask(
    {
      kind: 'franchiseArt',
      label: `Caching ${cfg.name} artwork`,
      route: `/games/franchises/${cfg.id}`,
      project: () => ({ done: artState.done, total: artState.total })
    },
    async () => {
      let failed = 0
      // Same small-pool shape as files.downloadImages, inlined so done/total
      // land in artState (downloadImages only reports into the import
      // activity slot, which is not running here).
      let next = 0
      const worker = async (): Promise<void> => {
        while (next < missing.length) {
          const url = missing[next++]
          if ((await downloadImage(url)) == null) failed += 1
          artState.done += 1
        }
      }
      await Promise.all(Array.from({ length: Math.min(5, missing.length) }, worker))
      if (failed > 0)
        logWarn('app', `franchise art: ${cfg.name}: ${failed} of ${missing.length} downloads failed`)
    }
  )
  void run.catch(() => {}).finally(() => {
    artState.running = false
  })
  return { started: true }
}
