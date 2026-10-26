import { Link } from 'react-router-dom'
import CoverImage from '../CoverImage'
import EmulatorChip from './EmulatorChip'
import { consoleArt } from '../../lib/consoleArt'
import { consolePath, type ConsoleSummary } from '../../lib/emulationHub'
import { fmtDurationSec } from '../../lib/useGameSession'
import { fmtLastPlayed } from '../games/LaunchCards'
import { PLATFORMS } from '@shared/emulation/platforms'
import type { InstalledGame } from '@shared/types'

// The user's own covers for a console, tilted behind its hardware photo like
// Home's cover wall (the same per-theme opacity and filter). A console with
// only a few games repeats them so the wall still fills.
export function ConsoleCoverWall({ games, slots = 8 }: { games: readonly InstalledGame[]; slots?: number }) {
  const covers = games.filter((g) => g.coverPath)
  if (covers.length === 0) return null
  const tiles = Array.from({ length: slots }, (_, i) => covers[i % covers.length])
  return (
    <div
      className="home-cover-wall pointer-events-none absolute -inset-6 grid grid-cols-4 auto-rows-fr gap-2 -rotate-3 scale-110"
      aria-hidden="true"
    >
      {tiles.map((g, i) => (
        <CoverImage key={i} path={g.coverPath} alt="" thumbWidth={320} rounded="rounded" className="h-full w-full" />
      ))}
    </div>
  )
}

export function consoleStatsLine(summary: ConsoleSummary): string {
  const parts = [`${summary.games.length} ${summary.games.length === 1 ? 'game' : 'games'}`]
  if (summary.seconds > 0) parts.push(`${fmtDurationSec(summary.seconds)} played`)
  if (summary.lastPlayedAt) parts.push(`Last played ${fmtLastPlayed(summary.lastPlayedAt)}`)
  return parts.join(' / ')
}

export default function ConsoleTile({ summary, wide = false }: { summary: ConsoleSummary; wide?: boolean }) {
  const platform = PLATFORMS[summary.platform]
  const art = consoleArt(summary.platform, wide ? 'banner' : 'tile')
  return (
    <li className="min-w-0">
      <Link
        to={consolePath(summary.platform)}
        className={`group relative flex overflow-hidden rounded-lg border border-line-subtle bg-surface-panel transition-colors hover:border-accent/60 ${
          wide ? 'min-h-[280px]' : 'min-h-[220px]'
        }`}
      >
        <ConsoleCoverWall games={summary.games} />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-surface-panel via-surface-panel/90 to-surface-panel/40" />
        <div className="pointer-events-none absolute -right-10 bottom-0 h-3/4 w-2/3 rounded-full bg-accent/10 blur-3xl" />
        {art && (
          <img
            src={art}
            alt=""
            className={`pointer-events-none absolute bottom-4 right-4 object-contain drop-shadow-2xl motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-105 ${
              wide ? 'max-h-[82%] max-w-[50%]' : 'max-h-[76%] max-w-[50%]'
            }`}
          />
        )}
        <div className={`relative z-10 flex flex-col justify-between gap-4 p-5 ${wide ? 'max-w-[55%]' : 'max-w-[62%]'}`}>
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">{platform.short}</p>
            <h3 className={`mt-1 font-semibold tracking-tight text-ink ${wide ? 'text-3xl' : 'text-2xl'}`}>{platform.label}</h3>
          </div>
          {summary.emulators.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {summary.emulators.map((e) => (
                <EmulatorChip key={e.id} emulator={e} isDefault={e === summary.defaultEmulator} />
              ))}
            </div>
          )}
          <div>
            <p className="text-xs text-ink-muted">{consoleStatsLine(summary)}</p>
            {summary.problem && <p className="mt-1 text-xs text-signal-caution">{summary.problem}</p>}
          </div>
        </div>
      </Link>
    </li>
  )
}
