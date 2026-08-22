import { useCallback, useEffect, useMemo } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { toast } from './toast'
import type { TaskKind, TaskSnapshot } from '@shared/types'

// Poll for the main-process task registry — the useBulkRun shape, with one
// deliberate difference: idle is a lazy HEARTBEAT rather than `false`.
//
// Every other status hook gates its poll off a local start, so it can afford to
// stop entirely. This one is the app's discovery surface: it is mounted by the
// Topbar pill on every page, and a job started from the native Tools menu, from
// main's own watchers, or from a dialog that forgot to kick() must still show
// up. 5s idle is cheaper than the 2s heartbeat ActivityIndicator already ran.
const ACTIVE_MS = 700
const IDLE_MS = 5000

// Kinds whose own hook ALREADY toasts on settle. Without this the user gets two
// toasts for every bulk import. Keep this list beside its owners:
//   bulkImport      lib/useBulkRun.ts
//   mangaOcr        lib/useOcrRun.ts
//   appUpdate       lib/useUpdateStatus.ts
//   musicDownload   components/MusicDownloadDialog.tsx
//   videoPrepare    components/video/PreparePanel.tsx
//   wrestlingImport lib/useWrestlingImport.ts
//   torrentSearch   the /torrents page renders its own result state
const OWNED: ReadonlySet<TaskKind> = new Set<TaskKind>([
  'bulkImport',
  'libraryRefresh',
  'mangaOcr',
  'appUpdate',
  'musicDownload',
  'videoPrepare',
  'wrestlingImport',
  'torrentSearch'
])

const LIVE: ReadonlySet<TaskSnapshot['state']> = new Set<TaskSnapshot['state']>([
  'running',
  'pausing',
  'paused',
  'cancelling'
])

export function isLive(task: TaskSnapshot): boolean {
  return LIVE.has(task.state)
}

// Module-level, not per-hook: the Topbar pill and the Tasks page mount this
// hook SIMULTANEOUSLY, so a per-instance guard would fire the toast twice.
// Keyed `${id}:${state}`; pruned to the ids main still lists, and since ids are
// never reused a pruned key can never re-fire.
const settled = new Set<string>()

const NO_TASKS: TaskSnapshot[] = []

export interface TasksHook {
  tasks: TaskSnapshot[]
  active: TaskSnapshot[]
  finished: TaskSnapshot[]
  running: boolean
  // The poll drops to a slow heartbeat while idle, so every mutation kicks it
  // — otherwise a pause/cancel would take up to 5s to show.
  kick: () => Promise<void>
}

export function useTasks(): TasksHook {
  const qc = useQueryClient()
  const { data } = useQuery({
    queryKey: qk.tasks.list,
    queryFn: () => api.tasks.list(),
    // Self-gating off the POLLED data, not a local flag, so a job that is
    // already running keeps reporting after navigating away and back.
    refetchInterval: (q) => (q.state.data?.some(isLive) ? ACTIVE_MS : IDLE_MS)
  })

  // Stable identity while the first poll is in flight, so the memos below
  // don't hand out a fresh array on every render before any data exists.
  const tasks = data ?? NO_TASKS

  useEffect(() => {
    if (tasks.length === 0) return
    const ids = new Set(tasks.map((t) => t.id))
    for (const key of settled) {
      if (!ids.has(key.slice(0, key.lastIndexOf(':')))) settled.delete(key)
    }
    for (const task of tasks) {
      if (isLive(task) || OWNED.has(task.kind)) continue
      const key = `${task.id}:${task.state}`
      if (settled.has(key)) continue
      settled.add(key)
      if (task.state === 'error') toast(task.error ?? `${task.label} failed.`, 'error')
      else if (task.state === 'done') toast(`${task.label} finished.`, 'success')
      // A cancel is the user's own action — they do not need telling.
    }
  }, [tasks])

  // Memoized on the polled array, NOT rebuilt per render: `finished` is fed to
  // useIncrementalList on the Tasks page, which resets to the first batch
  // whenever the items IDENTITY changes — and a live task re-renders this hook
  // every 700 ms as its elapsed time ticks, which would snap a scrolled-open
  // history back to 96 rows about once a second.
  const active = useMemo(() => tasks.filter(isLive), [tasks])
  const finished = useMemo(() => tasks.filter((t) => !isLive(t)), [tasks])

  const kick = useCallback(async () => {
    await qc.invalidateQueries({ queryKey: qk.tasks.list })
  }, [qc])

  return { tasks, active, finished, running: active.length > 0, kick }
}
