import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import { useGameSession, fmtDurationSec } from '../lib/useGameSession'
import { fmtMinutesAsHours } from '../lib/mediaConfig'
import Section from './Section'
import StatTile from './StatTile'
import BarChart, { type Bar } from './BarChart'
import type { MediaDetail, HltbTimes } from '@shared/types'

// Launch-from-app + tracked playtime for games/VNs (cfg.hasGameLaunch), on the
// Playtime tab beside the HLTB estimates: link a per-title executable, see the
// tracked totals and the session history. Launching itself is NOT here —
// GameLaunchButton in the detail page's action column owns it, so Play is
// reachable from every tab and exists exactly once.

// UTC "YYYY-MM-DD HH:MM:SS" → local "Aug 6, 21:40" style line.
function fmtSessionStart(utc: string): string {
  const d = new Date(utc.replace(' ', 'T') + 'Z')
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' }) +
    ' · ' +
    d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })
}

// 'YYYY-MM-DD' → 'Aug 11', for the sparse x labels and the tooltips.
function fmtWeek(day: string): string {
  return new Date(day + 'T00:00:00').toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric'
  })
}

function weekBars(weeks: { weekStart: string; seconds: number }[]): Bar[] {
  return weeks.map((w, i) => {
    const hours = Math.round((w.seconds / 3600) * 10) / 10
    return {
      key: w.weekStart,
      // Every fourth week keeps the axis readable at twelve bars.
      label: i % 4 === 0 ? fmtWeek(w.weekStart) : undefined,
      value: hours,
      title: `week of ${fmtWeek(w.weekStart)} · ${hours ? `${hours} h` : 'nothing played'}`
    }
  })
}

export default function GameLaunchSection({ m }: { m: MediaDetail }) {
  const qc = useQueryClient()
  const session = useGameSession()
  const [linkBusy, setLinkBusy] = useState(false)

  const { data: ov } = useQuery({
    queryKey: qk.games.overview(m.id),
    queryFn: () => api.games.overview(m.id)
  })

  const meta = (m.metadata ?? {}) as Record<string, unknown>
  const hltbMain = ((meta.hltb as HltbTimes | undefined) ?? null)?.main ?? null

  // This title's session vs some other title's — both block Play, different copy.
  const runningHere = session.running && session.status?.mediaId === m.id
  const runningElsewhere = session.running && session.status?.mediaId !== m.id

  async function refreshOverview(): Promise<void> {
    await qc.invalidateQueries({ queryKey: qk.games.overview(m.id) })
  }

  async function link(): Promise<void> {
    setLinkBusy(true)
    try {
      const picked = await api.games.pickExe(m.id)
      if (picked) await refreshOverview()
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
      await refreshOverview()
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

      {/* Tracked totals vs the HLTB estimate */}
      <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <StatTile
          label="Tracked"
          value={ov.totalSeconds > 0 ? fmtDurationSec(ov.totalSeconds) : '—'}
          sub={ov.sessionCount > 0 ? `${ov.sessionCount} session${ov.sessionCount === 1 ? '' : 's'}` : undefined}
          accent={ov.totalSeconds > 0}
        />
        {hltbMain != null && (
          <StatTile label="HLTB Main" value={fmtMinutesAsHours(hltbMain)} sub="estimate" />
        )}
      </div>

      {/* The shape of the last 12 weeks. Hours (one decimal) rather than
          seconds: the bar label is read at a glance, and a 40-minute session
          reading "0.7" is more honest than "40" beside a 6-hour week. */}
      {ov.weeks.some((w) => w.seconds > 0) && (
        <div className="mt-5">
          <p className="mb-1 text-xs uppercase tracking-wide text-gray-500">Last 12 weeks</p>
          <BarChart bars={weekBars(ov.weeks)} height={80} />
        </div>
      )}

      {/* Recent sessions */}
      {ov.sessions.length > 0 && (
        <ul className="mt-4 space-y-1">
          {ov.sessions.map((s) => (
            <li
              key={s.id}
              className="flex items-center justify-between text-sm text-gray-400 border-b border-base-700/40 pb-1"
            >
              <span>{fmtSessionStart(s.startedAt)}</span>
              <span className="font-mono text-xs">{fmtDurationSec(s.durationSec)}</span>
            </li>
          ))}
        </ul>
      )}
    </Section>
  )
}
