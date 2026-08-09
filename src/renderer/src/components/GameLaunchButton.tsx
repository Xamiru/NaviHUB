import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import { useGameSession, fmtDurationSec } from '../lib/useGameSession'

// THE launch control for games/VNs (cfg.hasGameLaunch). It lives in the detail
// page's action column so a linked game is one click from anywhere on the page,
// rather than only from the Playtime tab — GameLaunchSection deliberately no
// longer has a Play button of its own, so the two can never drift.
//
// Busy state derives from the polled session, never a local flag (the
// MangaChaptersSection rule). useGameSession is already mounted in the Topbar,
// so this shares that poll, and qk.games.overview is the same key
// GameLaunchSection reads — one fetch, not two.
// Whether this title has something to launch. The caller needs it to decide
// which button is the filled one, and it must follow the linked executable
// rather than the config flag: a game with no exe yet renders no Play button,
// so demoting the log button on `hasGameLaunch` alone would leave the page with
// no filled action at all. Same query key, so this costs nothing extra.
export function useHasLaunchTarget(mediaId: number, enabled: boolean): boolean {
  const { data } = useQuery({
    queryKey: qk.games.overview(mediaId),
    queryFn: () => api.games.overview(mediaId),
    enabled
  })
  return !!data?.exePath
}

export default function GameLaunchButton({
  mediaId,
  className = 'btn-primary w-full'
}: {
  mediaId: number
  className?: string
}) {
  const session = useGameSession()
  const { data: ov } = useQuery({
    queryKey: qk.games.overview(mediaId),
    queryFn: () => api.games.overview(mediaId)
  })

  // Nothing to launch: the section on the Playtime tab is where you link one,
  // and an empty slot in the action column would just be a dead button.
  if (!ov?.exePath) return null

  // This title's session vs some other title's — both block Play, different copy.
  const runningHere = session.running && session.status?.mediaId === mediaId
  const runningElsewhere = session.running && session.status?.mediaId !== mediaId

  if (runningHere) {
    return (
      <div
        className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-2 text-center text-xs text-accent"
        title="The session closes itself when the game exits"
      >
        Playing · {fmtDurationSec(session.status?.elapsedSec ?? 0)}
      </div>
    )
  }

  async function play(): Promise<void> {
    try {
      await api.games.launch(mediaId)
      // The poll self-gates while idle, so a launch must kick it back to life
      // or the session would never report.
      await session.kick()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <button
      className={className}
      onClick={() => void play()}
      disabled={!ov.supported || session.running}
      title={
        !ov.supported
          ? 'Launching runs on Windows only'
          : runningElsewhere
            ? `Already tracking “${session.status?.title}” — one session at a time`
            : 'Launch and start tracking'
      }
    >
      Play
    </button>
  )
}
