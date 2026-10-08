import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { footballTeamColors } from '@shared/footballIdentity'
import type { FootballRaceLine } from '@shared/footballInsights'
import { FootballTeamMark } from './FootballCommon'

function rgb(hex: string): [number, number, number] | null {
  const match = hex.trim().match(/^#?([0-9a-f]{6})$/i)
  if (!match) return null
  const value = parseInt(match[1], 16)
  return [(value >> 16) & 255, (value >> 8) & 255, value & 255]
}

function distance(a: string, b: string): number {
  const x = rgb(a)
  const y = rgb(b)
  return x && y ? Math.hypot(x[0] - y[0], x[1] - y[1], x[2] - y[2]) : 999
}

function lightness(hex: string): number {
  const value = rgb(hex)
  return value ? (value[0] * 0.299 + value[1] * 0.587 + value[2] * 0.114) / 255 : 0.5
}

/**
 * One stroke per club from its colours: the primary unless it is near-white (invisible on a
 * light theme) or too close to a club already drawn, then the secondary, then the theme ink.
 */
function lineColors(lines: FootballRaceLine[]): string[] {
  const used: string[] = []
  return lines.map((line) => {
    const colors = footballTeamColors(line.team.name, line.team.colors)
    const usable = (hex: string) => lightness(hex) < 0.85 && used.every((other) => distance(other, hex) > 90)
    const color = [colors.primary, colors.secondary].find(usable) ?? 'rgb(var(--ink-secondary))'
    used.push(color)
    return color
  })
}

// Crests in the right gutter keep at least this share of the plot height apart.
const LABEL_GAP = 11

export default function FootballTitleRace({ lines }: { lines: FootballRaceLine[] }) {
  const [focus, setFocus] = useState<number | null>(null)
  const colors = useMemo(() => lineColors(lines), [lines])
  const games = Math.max(...lines.map((line) => line.points.length))
  const peak = Math.max(1, ...lines.map((line) => line.points[line.points.length - 1] ?? 0))
  const step = peak > 60 ? 20 : peak > 25 ? 10 : 5
  const top = Math.ceil(peak / step) * step
  const x = (game: number) => (games > 1 ? ((game - 1) / (games - 1)) * 100 : 50)
  const y = (points: number) => 100 - (points / top) * 100
  const labels = lines
    .map((line, index) => ({ index, y: y(line.points[line.points.length - 1] ?? 0) }))
    .sort((a, b) => a.y - b.y)
  for (let i = 1; i < labels.length; i++) labels[i].y = Math.max(labels[i].y, labels[i - 1].y + LABEL_GAP)
  for (let i = labels.length - 1; i >= 0; i--) {
    labels[i].y = Math.min(labels[i].y, i === labels.length - 1 ? 100 : labels[i + 1].y - LABEL_GAP)
  }
  const gridlines = Array.from({ length: top / step + 1 }, (_, i) => i * step)
  const gameTicks = [1, ...Array.from({ length: Math.floor(games / 10) }, (_, i) => (i + 1) * 10)].filter((game) => game <= games)

  return (
    <div>
      <div className="relative ml-8 mr-10 h-64" aria-hidden="true">
        {gridlines.map((value) => (
          <div key={value} className="absolute inset-x-0 border-t border-line-subtle" style={{ top: `${y(value)}%` }}>
            <span className="absolute -left-8 -translate-y-1/2 text-[10px] tabular-nums text-ink-muted">{value}</span>
          </div>
        ))}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full overflow-visible">
          {lines.map((line, index) => (
            <polyline
              key={line.team.id}
              fill="none"
              stroke={colors[index]}
              strokeWidth={focus === index ? 3.5 : 2.25}
              strokeLinejoin="round"
              vectorEffect="non-scaling-stroke"
              opacity={focus == null || focus === index ? 1 : 0.2}
              points={line.points.map((points, game) => `${x(game + 1)},${y(points)}`).join(' ')}
            />
          ))}
        </svg>
        {labels.map(({ index, y: labelY }) => (
          <span
            key={lines[index].team.id}
            className="absolute left-full ml-2 -translate-y-1/2 transition-opacity"
            style={{ top: `${labelY}%`, opacity: focus == null || focus === index ? 1 : 0.25 }}
          >
            <FootballTeamMark team={lines[index].team} size="xs" />
          </span>
        ))}
        {gameTicks.map((game) => (
          <span key={game} className="absolute top-full mt-1 -translate-x-1/2 text-[10px] tabular-nums text-ink-muted" style={{ left: `${x(game)}%` }}>{game}</span>
        ))}
      </div>
      <p className="ml-8 mt-6 text-[10px] uppercase tracking-[0.14em] text-ink-muted">Points after each game, from results; deductions are applied only in the table</p>
      <ul className="mt-3 flex flex-wrap gap-2" aria-label="Clubs in the title race">
        {lines.map((line, index) => (
          <li key={line.team.id}>
            <span
              className={`flex items-center gap-2 rounded-md border px-2 py-1 text-sm ${focus === index ? 'border-line-strong bg-surface-raised' : 'border-line-subtle'}`}
              onMouseEnter={() => setFocus(index)}
              onMouseLeave={() => setFocus(null)}
              onFocus={() => setFocus(index)}
              onBlur={() => setFocus(null)}
            >
              <span className="h-0.5 w-4 rounded-full" style={{ background: colors[index] }} aria-hidden="true" />
              <FootballTeamMark team={line.team} size="xs" />
              <Link to={`/football/team/${line.team.id}`} className="text-ink hover:text-signal-link">{line.team.name}</Link>
              <span className="tabular-nums text-ink-muted">{line.points[line.points.length - 1]}</span>
            </span>
          </li>
        ))}
      </ul>
      <table className="sr-only">
        <caption>Points after each game</caption>
        <thead>
          <tr><th scope="col">Club</th>{Array.from({ length: games }, (_, game) => <th key={game} scope="col">Game {game + 1}</th>)}</tr>
        </thead>
        <tbody>
          {lines.map((line) => (
            <tr key={line.team.id}><th scope="row">{line.team.name}</th>{line.points.map((points, game) => <td key={game}>{points}</td>)}</tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
