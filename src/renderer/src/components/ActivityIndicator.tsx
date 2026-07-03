import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import type { ActivityStatus } from '@shared/types'

const PHASE_TEXT: Record<ActivityStatus['phase'], string> = {
  fetching: 'Fetching details…',
  images: 'Downloading images',
  audio: 'Downloading audio',
  writing: 'Saving…'
}

// Polls the main process's single activity slot: a lazy 2s heartbeat while
// idle (cheap — one tiny IPC), tightening to 400ms the moment something runs.
export function useActivity(fast = false): ActivityStatus | null {
  const { data } = useQuery({
    queryKey: qk.activity,
    queryFn: () => api.activity.status(),
    refetchInterval: (query) => (query.state.data?.active || fast ? 400 : 2000)
  })
  return data ?? null
}

export function activityText(s: ActivityStatus): string {
  const counted = (s.phase === 'images' || s.phase === 'audio') && s.total > 0
  return counted ? `${PHASE_TEXT[s.phase]} ${s.done}/${s.total}` : PHASE_TEXT[s.phase]
}

// Topbar pill: shows whatever long-running task the main process is on
// (imports, theme fetches), wherever the user has navigated to.
export default function ActivityIndicator() {
  const s = useActivity()
  if (!s?.active) return null
  return (
    <div
      className="flex shrink-0 items-center gap-2 rounded-full bg-base-700/80 px-3 py-1.5 text-xs text-gray-300"
      title={`${s.label} — ${activityText(s)}`}
    >
      <span className="inline-block h-3 w-3 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      <span className="max-w-[18rem] truncate">
        {s.label} · {activityText(s)}
      </span>
    </div>
  )
}
