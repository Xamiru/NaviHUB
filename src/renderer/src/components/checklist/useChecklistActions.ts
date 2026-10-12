import { useCallback, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import type { ChecklistTaskStatus } from '@shared/types'

export interface ChecklistActions {
  tick: (task: ChecklistTaskStatus, done: boolean) => Promise<void>
  credit: (task: ChecklistTaskStatus, amount?: number) => Promise<void>
  undo: (task: ChecklistTaskStatus, logId: number) => Promise<void>
  skip: (task: ChecklistTaskStatus, skipped: boolean) => Promise<void>
  restDay: (skipped: boolean) => Promise<void>
  log: (task: ChecklistTaskStatus, mediaId: number) => Promise<void>
  remove: (task: ChecklistTaskStatus) => Promise<void>
  run: (fn: () => Promise<unknown>, touchesMedia?: boolean) => Promise<void>
}

const mediaKind = (task: ChecklistTaskStatus): boolean =>
  task.kind === 'mediaLog' || task.kind === 'mediaSession'

// Every board write, shared by the page and the Home card. `day` is the day the
// user is viewing (null = today); main validates it. Each write invalidates the
// whole checklist group — every day's status — and the media group when a
// title moved.
export function useChecklistActions(day: string | null): ChecklistActions {
  const qc = useQueryClient()
  const at = day ?? undefined

  const run = useCallback(
    async (fn: () => Promise<unknown>, touchesMedia = false): Promise<void> => {
      try {
        await fn()
      } catch (e) {
        toastError(e)
      } finally {
        await qc.invalidateQueries({ queryKey: qk.checklist.all })
        if (touchesMedia) await qc.invalidateQueries({ queryKey: qk.media.all })
      }
    },
    [qc]
  )

  return useMemo<ChecklistActions>(
    () => ({
      run,
      tick: (task, done) =>
        run(() =>
          done
            ? api.checklist.tick(task.key, task.cadence, at)
            : api.checklist.untick(task.key, task.cadence, at)
        ),
      credit: (task, amount = 1) => run(() => api.checklist.credit(task.key, task.cadence, amount, at)),
      undo: (task, logId) => run(() => api.checklist.undoLog(logId), mediaKind(task)),
      skip: (task, skipped) => run(() => api.checklist.skip(task.id, task.cadence, skipped, at)),
      restDay: (skipped) => run(() => api.checklist.skip(null, 'daily', skipped, at)),
      remove: (task) => run(() => api.checklist.removeTask(task.id)),
      log: (task, mediaId) =>
        run(async () => {
          if (task.kind === 'mediaSession') {
            await api.checklist.logSession(task.key, task.cadence, mediaId, at)
            return
          }
          const res = await api.checklist.logMedia(task.key, task.cadence, mediaId, at)
          if (res.startedRewatch) toast(`${res.title}: pass ${res.rewatchCount} started`, 'success')
        }, true)
    }),
    [run, at]
  )
}
