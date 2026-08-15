import { Link } from 'react-router-dom'
import { useGameSession, fmtDurationSec } from '../lib/useGameSession'
import { useAchievementWatch } from '../lib/useAchievementWatch'
import { configFor } from '../lib/mediaConfig'
import type { MediaType } from '@shared/types'

// Topbar pill for a tracked play session, the ActivityIndicator shape.
//
// useGameSession used to be mounted ONLY inside GameLaunchSection, so navigating
// away from that one Playtime tab left no sign a session was being tracked — and
// the settled toast could only fire when some instance of the hook happened to
// be mounted. Mounting it here means the pill (and the toast) follow you.
// The hook self-gates its poll off the polled data, so this costs one request
// while nothing is running.
export default function GameSessionIndicator() {
  const { status, running } = useGameSession()
  // Mounted here for the same reason: the unlock toast has to be able to fire
  // wherever the user happens to be, not only on a detail page. Its poll is
  // gated on a running session, so it is free the rest of the time.
  useAchievementWatch()
  if (!running || !status) return null
  const cfg = configFor(status.mediaType as MediaType)
  return (
    <Link
      to={`${cfg.basePath}/${status.mediaId}?tab=media`}
      className="flex shrink-0 items-center gap-2 rounded-full bg-base-700/80 px-3 py-1.5 text-xs text-gray-300 hover:text-accent"
      title={`${status.title} — playing for ${fmtDurationSec(status.elapsedSec)}`}
    >
      <span className="inline-block h-2 w-2 rounded-full bg-accent motion-safe:animate-pulse" />
      <span className="max-w-[14rem] truncate">
        {status.title} · {fmtDurationSec(status.elapsedSec)}
      </span>
    </Link>
  )
}
