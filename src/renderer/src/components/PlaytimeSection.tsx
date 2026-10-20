import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { fmtMinutesAsHours } from '../lib/mediaConfig'
import { fmtDurationSec } from '../lib/useGameSession'
import Section from './Section'
import StatTile from './StatTile'
import type { HltbTimes, MediaDetail } from '@shared/types'

function fmtPlaytime(minutes: number | null | undefined): string {
  if (minutes == null || minutes <= 0) return '—'
  return fmtMinutesAsHours(minutes)
}

// Play-time estimates for games + VNs (cfg.hasPlaytimes), first on the Playtime
// tab: the user's tracked time (cfg.hasGameLaunch) beside VNDB's average for
// VNs and HowLongToBeat's Main / Main+Extras / Completionist boxes for both.
// Games get HLTB filled automatically at import; the button covers items
// imported before that existed, failed lookups, and refreshes.
export default function PlaytimeSection({
  m,
  tracked,
  onChange
}: {
  m: MediaDetail
  tracked: boolean
  onChange: () => void
}) {
  const meta = (m.metadata ?? {}) as Record<string, unknown>
  const hltb = (meta.hltb as HltbTimes | undefined) ?? null
  const isVn = m.mediaType === 'visual_novel'
  const vndbVotes = typeof meta.vndbLengthVotes === 'number' ? meta.vndbLengthVotes : null
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState<string | null>(null)
  // Shares GameLaunchSection's query, so the launcher's link/unlink refreshes it.
  const { data: ov } = useQuery({
    queryKey: qk.games.overview(m.id),
    queryFn: () => api.games.overview(m.id),
    enabled: tracked
  })

  async function fetchTimes() {
    setBusy(true)
    setError(null)
    try {
      const res = await api.hltb.fetch(m.id)
      if (res) onChange()
      else setError('No matching entry found on HowLongToBeat.')
    } catch {
      setError('HowLongToBeat lookup failed — try again in a bit.')
    } finally {
      setBusy(false)
    }
  }

  const boxes: { label: string; minutes: number | null; sub?: string }[] = []
  // VN average play time comes from VNDB votes (stored in totalUnits, minutes).
  if (isVn && m.totalUnits != null && m.totalUnits > 0) {
    boxes.push({
      label: 'Average',
      minutes: m.totalUnits,
      sub: vndbVotes ? `VNDB · ${vndbVotes} votes` : 'VNDB'
    })
  }
  if (hltb) {
    const polled = (n?: number) => (n ? `${n} polled` : undefined)
    boxes.push(
      { label: 'Main Story', minutes: hltb.main, sub: polled(hltb.mainCount) },
      { label: 'Main + Extras', minutes: hltb.mainExtra, sub: polled(hltb.mainExtraCount) },
      { label: 'Completionist', minutes: hltb.completionist, sub: polled(hltb.completionistCount) },
      { label: 'All Styles', minutes: hltb.allStyles, sub: polled(hltb.allStylesCount) }
    )
  }

  return (
    <Section className="mb-6" title="How long to beat">
      <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-3">
        {tracked && ov && (
          <StatTile
            label="Your time"
            value={ov.totalSeconds > 0 ? fmtDurationSec(ov.totalSeconds) : '—'}
            sub={
              ov.sessionCount > 0
                ? `${ov.sessionCount} session${ov.sessionCount === 1 ? '' : 's'} tracked`
                : 'tracked'
            }
            accent={ov.totalSeconds > 0}
          />
        )}
        {boxes.map((b) => (
          <StatTile
            key={b.label}
            label={b.label}
            value={fmtPlaytime(b.minutes)}
            sub={b.sub ?? undefined}
            accent={!!b.minutes}
          />
        ))}
      </div>
      {boxes.length === 0 && <p className="mt-2 text-sm text-gray-500">No play-time estimates yet.</p>}
      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs">
        <button className="btn-ghost text-xs" onClick={fetchTimes} disabled={busy}>
          {busy
            ? 'Fetching…'
            : hltb
              ? 'Refresh from HowLongToBeat'
              : 'Fetch from HowLongToBeat'}
        </button>
        {/* Surface the matched entry so a wrong match is easy to catch */}
        {hltb && hltb.name && hltb.name.toLowerCase() !== m.title.toLowerCase() && (
          <span className="text-gray-500">Matched: “{hltb.name}”</span>
        )}
        {error && <span className="text-red-400">{error}</span>}
      </div>
    </Section>
  )
}
