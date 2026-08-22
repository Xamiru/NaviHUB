import { useEffect, useRef } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from './api'
import { qk } from './queryKeys'
import { mediaUrl } from '@shared/mediaUrl'
import { toast, toastUnlock } from './toast'
import { useGameSession } from './useGameSession'

// In-app half of the unlock popup. The OVERLAY half is the achPopup window
// (src/main/achPopup.ts → #/achpop), which floats over a fullscreen game; this
// hook polls the same status object so an unlock also lands in the app itself —
// plus it is what refreshes the achievement lists while a session runs. The
// useGameSession recipe: poll only while a session is live, dedupe at module
// level so several mounts can't double-toast.
//
// `seq` is monotonic for the life of the main process. Seeding from the FIRST
// status seen rather than from zero is what stops a renderer reload mid-session
// from replaying every unlock already shown — anything in `recent` at mount
// time has been popped once already.
let lastSeq: number | null = null
let lastMessage: string | null = null

// The session's status flips to 'ended' the moment the game exits, but the
// watcher's FINAL sweep — the one that catches the unlocks an emulator flushes
// on exit — lands after that, and for RetroAchievements a network call later
// still. Polling for a grace period past the end is what lets those reach the
// toast (and the overlay, which reads the same status); without it they only
// ever surfaced after reopening the app.
const GRACE_MS = 20_000

export function useAchievementWatch(): void {
  const qc = useQueryClient()
  const { running } = useGameSession()
  const graceUntil = useRef(0)
  const wasRunning = useRef(false)

  if (running) graceUntil.current = 0
  else if (wasRunning.current) graceUntil.current = Date.now() + GRACE_MS
  wasRunning.current = running

  const { data: status } = useQuery({
    queryKey: qk.achievements.watch,
    queryFn: () => api.achievements.watchStatus(),
    // Re-evaluated after every fetch, so the grace period expires on its own.
    refetchInterval: () => (running || Date.now() < graceUntil.current ? 2000 : false)
  })

  useEffect(() => {
    if (!status) return

    // A watcher that has stopped detecting (RA unreachable, credentials
    // rotated) must say so — otherwise it is indistinguishable from a session
    // where nothing was earned.
    if (status.message && status.message !== lastMessage) toast(status.message, 'error')
    lastMessage = status.message

    if (lastSeq === null) {
      lastSeq = status.seq
      return
    }
    const fresh = status.recent.filter((e) => e.seq > (lastSeq as number))
    if (!fresh.length) return
    lastSeq = status.seq
    for (const event of fresh) {
      toastUnlock(
        event.name,
        event.rarity ? `${event.mediaTitle} · ${event.rarity.replace('-', ' ')}` : event.mediaTitle,
        event.iconPath ? mediaUrl(event.iconPath) : null
      )
    }
    // The detail list, the card chips, the Home strip and the overview all
    // change on an unlock — the broad prefix is the point here.
    void qc.invalidateQueries({ queryKey: qk.achievements.all })
  }, [status, qc])
}
