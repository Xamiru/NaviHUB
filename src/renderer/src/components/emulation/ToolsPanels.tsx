import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { fmtDurationSec } from '../../lib/useGameSession'
import Section from '../Section'
import { PLATFORMS } from '@shared/emulation/platforms'
import { EMULATOR_PRESETS } from '@shared/emulation/emulatorPresets'
import { NATIVE_PORTS, portTitleKey } from '@shared/emulation/nativePorts'

// Emulation-wide panels for the Tools page: playtime by console and emulator,
// and fan-made native ports of library games.

function RankTable({
  caption,
  rows
}: {
  caption: string
  rows: { key: string; label: string; seconds: number; sessions: number }[]
}) {
  const max = Math.max(1, ...rows.map((r) => r.seconds))
  return (
    <table className="w-full text-left text-sm">
      <caption className="mb-2 text-left text-xs text-gray-400">{caption}</caption>
      <tbody>
        {rows.map((r) => (
          <tr key={r.key} className="border-t border-base-700">
            <th scope="row" className="w-40 py-2 pr-3 font-normal">
              {r.label}
            </th>
            <td className="py-2 pr-3">
              <div aria-hidden="true" className="h-2 rounded bg-base-700">
                <div className="h-2 rounded bg-accent/70" style={{ width: `${Math.max(2, (r.seconds / max) * 100)}%` }} />
              </div>
            </td>
            <td className="w-28 py-2 text-right tabular-nums">{fmtDurationSec(r.seconds)}</td>
            <td className="w-24 py-2 text-right text-xs text-gray-400">
              {r.sessions} session{r.sessions === 1 ? '' : 's'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export function StatsPanel() {
  const { data } = useQuery({ queryKey: qk.games.emulationStats, queryFn: () => api.games.emulationStats() })
  if (!data || data.byPlatform.length === 0) return null
  return (
    <Section title="Playtime" subtitle="Sessions launched through an emulator">
      <div className="grid gap-6 lg:grid-cols-2">
        <RankTable
          caption="By console"
          rows={data.byPlatform.map((r) => ({ key: r.platform, label: PLATFORMS[r.platform].label, seconds: r.seconds, sessions: r.sessions }))}
        />
        <RankTable
          caption="By emulator"
          rows={data.byEmulator.map((r) => ({ key: r.presetKey, label: EMULATOR_PRESETS[r.presetKey].name, seconds: r.seconds, sessions: r.sessions }))}
        />
      </div>
    </Section>
  )
}

export function PortsPanel() {
  const { data: games } = useQuery({
    queryKey: qk.media.home('game'),
    queryFn: () => api.media.list({ mediaType: 'game' })
  })
  const matches = useMemo(() => {
    if (!games) return []
    const byKey = new Map(games.map((g) => [portTitleKey(g.title), g]))
    return NATIVE_PORTS.flatMap((port) =>
      port.titles
        .map((t) => byKey.get(portTitleKey(t)))
        .filter((g): g is NonNullable<typeof g> => g != null)
        .slice(0, 1)
        .map((game) => ({ port, game }))
    )
  }, [games])
  if (matches.length === 0) return null
  return (
    <Section title="Native PC ports" subtitle="Fan-made ports of games in your library">
      <ul className="grid gap-3 sm:grid-cols-2">
        {matches.map(({ port, game }) => (
          <li key={port.id} className="card p-4 text-sm">
            <p className="font-semibold">{port.name}</p>
            <p className="text-xs text-gray-400">
              Plays <Link className="underline hover:text-accent" to={`/games/${game.id}`}>{game.title}</Link>
            </p>
            <p className="mt-2 text-xs text-gray-300">{port.needs}</p>
            <button type="button" className="btn-ghost mt-2 text-xs" onClick={() => void api.app.openExternal(port.homepage)}>
              Project page
            </button>
          </li>
        ))}
      </ul>
    </Section>
  )
}
