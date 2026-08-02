import { useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { mediaUrl } from '@shared/mediaUrl'
import type { OpenTarget } from '@shared/types'
import { api } from '../lib/api'
import { usePlayer } from '../lib/player'
import { toast } from '../lib/toast'

// "Open with NaviHUB". The OS hands main a path; main parks it; this collects
// it and decides where to go.
//
// A poll rather than a subscription because the app has no push channel (no
// ipcRenderer.on anywhere — CLAUDE.md). `app:pendingOpen` returns AND clears,
// so polling is idempotent: every tick after the first returns [].
//
// Headless and mounted once in the App shell, like MusicPlayLogger.
export default function OpenFileHandler(): null {
  const navigate = useNavigate()
  const player = usePlayer()
  // The player identity changes on every playback state change; keeping it in a
  // ref stops the poll effect from tearing down and re-arming constantly.
  const playerRef = useRef(player)
  playerRef.current = player

  useEffect(() => {
    let cancelled = false

    async function collect(): Promise<void> {
      let targets: OpenTarget[]
      try {
        targets = await api.app.pendingOpen()
      } catch {
        return
      }
      if (cancelled || targets.length === 0) return

      // Audio has no page: hand the whole batch to the global player as a
      // queue and stay where we are. `src` is pre-resolved (the SongQuizPage
      // pattern) because there is no music_track row to resolve from, and the
      // `file-` id namespace is deliberately NOT `music-` so MusicPlayLogger
      // ignores it instead of logging a play against a random track id.
      const audio = targets.filter((t) => t.kind === 'audio')
      if (audio.length > 0) {
        playerRef.current.playQueue(
          audio.map((t) => ({
            id: `file-${t.token}`,
            src: mediaUrl(t.relPath) ?? undefined,
            title: t.title,
            subtitle: 'Opened file',
            mediaId: null
          })),
          0
        )
        if (audio.length > 1) toast(`Playing ${audio.length} files`, 'success')
      }

      // Everything else is a page. Last one wins if several arrived at once —
      // opening six videos can only show one.
      const routed = targets.filter((t) => t.route)
      const last = routed[routed.length - 1]
      if (last) {
        if (routed.length > 1) {
          toast(`Opened ${last.title} (${routed.length - 1} more ignored)`)
        }
        navigate(last.route)
      }
    }

    void collect()
    // Focus is the signal that matters: main brings the window forward before
    // the file lands in the queue, so this fires right after. The interval is
    // only a backstop for the cases focus can't cover (already-focused window,
    // a compositor that ignores the raise).
    const onFocus = (): void => void collect()
    window.addEventListener('focus', onFocus)
    document.addEventListener('visibilitychange', onFocus)
    const timer = setInterval(() => {
      if (document.visibilityState === 'visible') void collect()
    }, 2000)

    return () => {
      cancelled = true
      window.removeEventListener('focus', onFocus)
      document.removeEventListener('visibilitychange', onFocus)
      clearInterval(timer)
    }
  }, [navigate])

  return null
}
