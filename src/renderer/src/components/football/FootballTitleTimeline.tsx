import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { footballTeamColors } from '@shared/footballIdentity'
import type { FootballSeason, FootballTeamSummary } from '@shared/types'
import { FootballTeamMark } from './FootballCommon'

/** Consecutive seasons with the same verified champion (or none), drawn as one block. */
export interface FootballTitleRun {
  champion: FootballTeamSummary | null
  seasons: FootballSeason[]
  start: number
}

export function footballTitleRuns(seasons: FootballSeason[]): FootballTitleRun[] {
  const runs: FootballTitleRun[] = []
  seasons.forEach((season, index) => {
    const last = runs[runs.length - 1]
    const championId = season.champion?.id ?? null
    if (last && (last.champion?.id ?? null) === championId) last.seasons.push(season)
    else runs.push({ champion: season.champion, seasons: [season], start: index })
  })
  return runs
}

// A run shows its crest once its share of the strip leaves room around the 24 px mark.
const CREST_MIN_WIDTH = 30

export default function FootballTitleTimeline({ seasons }: { seasons: FootballSeason[] }) {
  const runs = useMemo(() => footballTitleRuns(seasons), [seasons])
  const stripRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  const [active, setActive] = useState<number | null>(null)
  useEffect(() => {
    const el = stripRef.current
    if (!el) return
    setWidth(el.clientWidth)
    const observer = new ResizeObserver(() => setWidth(el.clientWidth))
    observer.observe(el)
    return () => observer.disconnect()
    // The strip is absent while an era has no seasons; attach again when it appears.
  }, [seasons.length > 0])

  if (!seasons.length) return <p className="text-sm text-ink-muted">No seasons in this era.</p>
  const hovered = active == null ? null : seasons[active] ?? null
  const seasonWidth = width / seasons.length
  return (
    <>
      <div className="relative">
        <div ref={stripRef} className="flex h-16 gap-px" role="list" aria-label="Champion by season" onMouseLeave={() => setActive(null)}>
          {runs.map((run) => {
            const colors = run.champion ? footballTeamColors(run.champion.name, run.champion.colors) : null
            const showCrest = !!run.champion?.imagePath && run.seasons.length * seasonWidth >= CREST_MIN_WIDTH
            return (
              <div
                key={run.seasons[0].id}
                className="relative flex min-w-[3px] overflow-hidden rounded-[2px] ring-1 ring-black/20"
                style={{
                  flexGrow: run.seasons.length,
                  flexBasis: 0,
                  background: colors
                    ? `linear-gradient(180deg, ${colors.primary} 0 70%, ${colors.secondary} 70% 100%)`
                    : 'rgb(var(--surface-raised))'
                }}
              >
                {run.seasons.map((season, offset) => {
                  const label = `${season.label}: ${season.champion?.name ?? 'no verified champion'}`
                  return (
                    <span key={season.id} role="listitem" className={`flex flex-1 ${offset ? 'border-l border-black/15' : ''}`}>
                      <Link
                        to={`/football/season/${season.id}`}
                        aria-label={label}
                        className="flex-1 hover:bg-white/20"
                        onMouseEnter={() => setActive(run.start + offset)}
                        onFocus={() => setActive(run.start + offset)}
                        onBlur={() => setActive(null)}
                      />
                    </span>
                  )
                })}
                {showCrest && run.champion && (
                  <span className="pointer-events-none absolute inset-0 flex items-center justify-center" aria-hidden="true">
                    <FootballTeamMark team={run.champion} size="xs" />
                  </span>
                )}
              </div>
            )
          })}
        </div>
        {hovered && (
          <div
            className="pointer-events-none absolute bottom-full z-20 mb-2 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-md border border-line-strong bg-surface-panel px-3 py-2 shadow-lg"
            style={{ left: `${Math.min(92, Math.max(8, ((active! + 0.5) / seasons.length) * 100))}%` }}
            aria-hidden="true"
          >
            {hovered.champion && <FootballTeamMark team={hovered.champion} size="sm" />}
            <span>
              <span className="block text-xs tabular-nums text-ink-muted">{hovered.label}</span>
              <span className="block text-sm font-semibold text-ink">{hovered.champion?.name ?? 'No verified champion'}</span>
            </span>
          </div>
        )}
      </div>
      <div className="mt-2 flex justify-between text-[10px] tabular-nums text-ink-muted">
        <span>{seasons[0].label}</span>
        {seasons.length > 8 && <span>{seasons[Math.floor(seasons.length / 2)].label}</span>}
        <span>{seasons[seasons.length - 1].label}</span>
      </div>
    </>
  )
}
