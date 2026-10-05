import { useQueryClient } from '@tanstack/react-query'
import type { MediaProgressLogged, MediaSummary } from '@shared/types'
import { api } from './api'
import { qk } from './queryKeys'
import { statusesFrom, useSettings } from './hooks'
import { configFor, isCompletedStatus } from './mediaConfig'
import { celebrateCompletion, celebrateProgress } from './themeFx'
import { toast, toastError } from './toast'

// The one renderer path for "I watched/read another one", shared by the detail
// page, the library list and the command palette. Main owns the rules
// (@shared/mediaProgress): progress + status promotion, and a finished title
// wraps into a fresh pass. This side owns the feedback: the theme's progress
// tick and completion card, the rewatch notice, and refreshing every view
// that shows the title's tracking.
export function useLogProgress(): (
  m: MediaSummary,
  opts?: { announce?: boolean }
) => Promise<MediaProgressLogged | null> {
  const qc = useQueryClient()
  const { data: settings } = useSettings()
  return async (m, opts = {}) => {
    const anchor = document.activeElement
    const cfg = configFor(m.mediaType)
    const statuses = statusesFrom(settings, cfg)
    const finished = isCompletedStatus(m.status, statuses) || (!!m.totalUnits && m.progress >= m.totalUnits)
    try {
      const res = await api.media.logProgress(m.id)
      celebrateProgress(anchor, { count: finished ? null : m.progress + 1, total: m.totalUnits })
      if (!finished && isCompletedStatus(res.status, statuses)) {
        celebrateCompletion(res.title, {
          coverPath: m.coverPath,
          total: cfg.formatProgressStat({ ...m, progress: m.totalUnits ?? m.progress + 1 })
        })
      }
      await Promise.all([
        qc.invalidateQueries({ queryKey: qk.media.all }),
        qc.invalidateQueries({ queryKey: qk.mediaCounts.all }),
        qc.invalidateQueries({ queryKey: qk.checklist.all }),
        qc.invalidateQueries({ queryKey: qk.searchAll })
      ])
      if (res.startedRewatch) toast(`${res.title} — pass #${res.rewatchCount} started`, 'success')
      else if (opts.announce) toast(`${res.title}: one more ${cfg.logUnitLabel ?? 'entry'} logged`, 'success')
      return res
    } catch (e) {
      toastError(e)
      return null
    }
  }
}
