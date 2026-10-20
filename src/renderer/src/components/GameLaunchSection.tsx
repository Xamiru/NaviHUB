import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import { useGameSession, fmtDurationSec } from '../lib/useGameSession'
import Section from './Section'
import WaysToPlay from './WaysToPlay'
import type { MediaDetail } from '@shared/types'

// Launch-from-app setup for games/VNs (cfg.hasGameLaunch), on the Playtime tab
// below the estimates: link a per-title executable and its game files, see the
// running session. The tracked total sits in PlaytimeSection's tile row above,
// beside the HLTB estimates. Launching itself is NOT here —
// GameLaunchButton in the detail page's action row owns it, so Play is
// reachable from every tab and exists exactly once.

export default function GameLaunchSection({ m }: { m: MediaDetail }) {
  const qc = useQueryClient()
  const session = useGameSession()
  const [linkBusy, setLinkBusy] = useState(false)

  const { data: ov } = useQuery({
    queryKey: qk.games.overview(m.id),
    queryFn: () => api.games.overview(m.id)
  })

  // This title's session vs some other title's — both block Play, different copy.
  const runningHere = session.running && session.status?.mediaId === m.id
  const runningElsewhere = session.running && session.status?.mediaId !== m.id

  async function link(): Promise<void> {
    setLinkBusy(true)
    try {
      const picked = await api.games.pickExe(m.id)
      if (picked) await qc.invalidateQueries({ queryKey: qk.games.all })
    } catch (e) {
      toastError(e)
    } finally {
      setLinkBusy(false)
    }
  }

  async function unlink(): Promise<void> {
    setLinkBusy(true)
    try {
      await api.games.clearExe(m.id)
      await qc.invalidateQueries({ queryKey: qk.games.all })
    } catch (e) {
      toastError(e)
    } finally {
      setLinkBusy(false)
    }
  }

  if (!ov) return <p className="text-sm text-gray-500">Loading…</p>

  return (
    <Section className="mb-6" title="Launcher" subtitle="Sessions are tracked while the game runs">
      {/* Executable link row */}
      <div className="flex flex-wrap items-center gap-3 text-sm">
        {ov.exePath ? (
          <span className="font-mono text-xs text-gray-400 break-all">{ov.exePath}</span>
        ) : (
          <span className="text-gray-500">No executable linked.</span>
        )}
        <button className="btn-ghost text-xs" onClick={link} disabled={linkBusy}>
          {ov.exePath ? 'Relink executable' : 'Link executable'}
        </button>
        {ov.exePath && (
          <button className="btn-ghost text-xs" onClick={unlink} disabled={linkBusy}>
            Unlink
          </button>
        )}
      </div>

      {!ov.supported && (
        <p className="mt-2 text-xs text-gray-500">
          Launching runs on Windows only — linking still works, sessions record on your gaming PC.
        </p>
      )}

      {m.mediaType === 'game' && <WaysToPlay mediaId={m.id} title={m.title} />}

      {session.status?.mediaId === m.id && session.status.state === 'ended' && (
        <SessionShots
          sessionId={session.status.id}
          count={session.status.screenshotCount}
          pending={session.status.shotsPending}
          onImported={() => qc.invalidateQueries({ queryKey: qk.games.sessionStatus })}
        />
      )}

      {/* Session state only — Play itself lives in the detail page's action
          column (GameLaunchButton), so it is reachable from every tab and
          there is exactly one of it. */}
      {(runningHere || runningElsewhere) && (
        <div className="mt-3 flex flex-wrap items-center gap-3">
          {runningHere ? (
            <span className="chip">
              Playing · {fmtDurationSec(session.status?.elapsedSec ?? 0)} — closes when the game
              exits
            </span>
          ) : (
            <span className="text-xs text-gray-500">
              Already tracking “{session.status?.title}” — one session at a time.
            </span>
          )}
        </div>
      )}
    </Section>
  )
}

// The last emulated session's screenshots, offered once for the Art tab.
function SessionShots({
  sessionId,
  count,
  pending,
  onImported
}: {
  sessionId: string
  count: number
  pending: boolean
  onImported: () => Promise<void>
}) {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  if (pending) {
    return (
      <p className="mt-3 text-xs text-gray-400" role="status">
        Looking for screenshots from that session…
      </p>
    )
  }
  if (count === 0) return null

  async function add(): Promise<void> {
    setBusy(true)
    try {
      const res = await api.games.importSessionShots(sessionId)
      toast(
        res.skipped > 0
          ? `Added ${res.added} screenshots to Art; ${res.skipped} could not be read.`
          : `Added ${res.added} screenshots to Art.`,
        'success'
      )
      await qc.invalidateQueries({ queryKey: qk.pictures.all })
      await onImported()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div className="mt-3 flex flex-wrap items-center gap-3 rounded-lg border border-accent/30 bg-accent/5 p-3 text-sm">
      <span>
        You took {count} screenshot{count === 1 ? '' : 's'} in that session.
      </span>
      <button type="button" className="btn text-xs" disabled={busy} onClick={() => void add()}>
        Add to Art
      </button>
    </div>
  )
}
