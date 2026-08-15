import { getSqlite } from './db/connection'
import { countSeriesWords } from './seriesText'
import * as coverageRepo from './repos/coverageRepo'
import * as tasks from './tasks'
import type { JpCoverageDetail, JpCoverageScanStatus } from '@shared/types'

// Comprehension scan orchestration: walk a series' text once, snapshot the word
// frequencies, and let coverageRepo do the knowing part. Module-level status
// polled via japanese:coverageScanStatus (the app has no push channel — see
// prepDeck.ts / musicDownload.ts).
//
// Unlike the prep deck this needs no dictionary: counting what you know takes
// only your own cards.

const status: JpCoverageScanStatus = {
  running: false,
  mediaId: null,
  done: 0,
  total: 0,
  error: null
}

export function getCoverageScanStatus(): JpCoverageScanStatus {
  return { ...status }
}

export async function scanCoverage(mediaId: number): Promise<JpCoverageDetail> {
  if (status.running) throw new Error('A comprehension scan is already running')
  return tasks.runTask(
    {
      kind: 'coverageScan',
      label: 'Comprehension scan',
      route: `/japanese/comprehension/${mediaId}`,
      controls: tasks.flagCancel('Comprehension scans are short — stop and re-run instead'),
      project: () => ({ done: status.done, total: status.total })
    },
    (handle) => scanCoverageInner(mediaId, handle)
  )
}

async function scanCoverageInner(
  mediaId: number,
  handle: tasks.TaskHandle
): Promise<JpCoverageDetail> {
  status.running = true
  status.error = null
  status.mediaId = mediaId
  status.done = 0
  status.total = 0

  try {
    const db = getSqlite()
    const media = db.prepare('SELECT title FROM media_item WHERE id = ?').get(mediaId) as
      | { title: string }
      | undefined
    if (!media) throw new Error('Media item not found')

    const scan = await countSeriesWords(mediaId, (done, total) => {
      status.done = done
      status.total = total
      // The progress callback is the only cancellation point a file walk has.
      if (handle.cancelRequested()) throw new tasks.TaskCancelledError('Comprehension scan')
    })
    coverageRepo.saveScan(mediaId, scan)
    const detail = coverageRepo.coverageForMedia(mediaId)
    if (!detail) throw new Error('Scan produced no coverage data')
    return detail
  } catch (err) {
    status.error = err instanceof Error ? err.message : String(err)
    throw err
  } finally {
    status.running = false
    status.mediaId = null
  }
}
