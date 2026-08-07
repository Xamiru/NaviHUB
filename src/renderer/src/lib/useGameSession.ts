import { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { toast } from './toast'
import type { GameLaunchStatus } from '@shared/types'

// Poll for a tracked game/VN play session — the useOcrRun shape verbatim,
// with a 1 s interval so the running chip's elapsed clock ticks.
const ACTIVE = new Set<GameLaunchStatus['state']>(['running'])

// "1 h 23 m" / "12 m" / "45 s" — session durations, not progress units.
export function fmtDurationSec(sec: number): string {
  if (sec < 60) return `${sec} s`
  const min = Math.round(sec / 60)
  return min < 60 ? `${min} m` : `${Math.floor(min / 60)} h ${min % 60} m`
}

// Module-level, not per-hook: the settled toast must fire once per session
// even if several Playtime tabs mount the hook (the MusicDownloadDialog
// precedent).
let lastSettled: string | null = null

export interface GameSessionHook {
  status: GameLaunchStatus | undefined | null
  running: boolean
  // refetchInterval is false while idle, so every launch must kick the poll
  // back to life — otherwise a started session would never report.
  kick: () => Promise<void>
}

export function useGameSession(): GameSessionHook {
  const qc = useQueryClient()
  const { data: status } = useQuery({
    queryKey: qk.games.sessionStatus,
    queryFn: () => api.games.sessionStatus(),
    // Self-gating off the polled data rather than a local flag, so a session
    // that is already running keeps reporting after navigating away and back.
    refetchInterval: (q) => (q.state.data && ACTIVE.has(q.state.data.state) ? 1000 : false)
  })

  useEffect(() => {
    if (!status || ACTIVE.has(status.state)) return
    const key = `${status.id}:${status.state}`
    if (lastSettled === key) return
    lastSettled = key
    if (status.state === 'ended' && status.discarded) {
      // Not a success (nothing was saved) — the corrective hint warrants the
      // attention styling.
      toast(status.message ?? 'Session too short — not recorded.', 'error')
    } else if (status.state === 'ended') {
      const dur = fmtDurationSec(status.durationSec ?? 0)
      const delta = status.progressDelta ?? 0
      const unit = status.mediaType === 'game' ? 'h' : 'min'
      toast(
        delta > 0 ? `Session saved — ${dur} · +${delta} ${unit}` : `Session saved — ${dur}`,
        'success'
      )
    } else if (status.state === 'error' && status.message) {
      toast(status.message, 'error')
    }
    // A recorded session moves progress (detail header, cards, Stats) and can
    // tick the checklist's Play-a-game item.
    void qc.invalidateQueries({ queryKey: qk.games.all })
    void qc.invalidateQueries({ queryKey: qk.media.all })
    void qc.invalidateQueries({ queryKey: qk.checklist.all })
  }, [status, qc])

  return {
    status,
    running: status != null && ACTIVE.has(status.state),
    kick: async () => {
      await qc.invalidateQueries({ queryKey: qk.games.sessionStatus })
    }
  }
}
