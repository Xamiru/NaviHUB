import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { formatHistDate, yearLabel } from '@shared/history/calendars'
import { successionLayout, type SuccessionBar, type SuccessionRuler } from '@shared/history/succession'
import type { HistoryRefInfo } from '@shared/types'
import { historyPath } from '../../lib/historyUi'
import { RefLink } from './HistoryBits'

const LANE = 28

function nowYear(): number {
  const d = new Date()
  return d.getFullYear() + d.getMonth() / 12
}

function dateText(c: SuccessionRuler['start']): string {
  const v = c?.alts[0]?.value
  return v ? formatHistDate(v, { short: true }) : 'not given'
}

/**
 * A state's office holders on one year axis, one row per office. The chart is
 * drawn for sight; the table beside it carries the same reigns for screen
 * readers, and the list below the chart holds the links.
 */
export default function SuccessionChart({
  rulers,
  span,
  refs,
  predecessors,
  successors,
  stateNames
}: {
  rulers: SuccessionRuler[]
  span: { s: number; e: number | null } | null
  refs: Record<string, HistoryRefInfo>
  predecessors: string[]
  successors: string[]
  /** The state's own names, so "Shah of Iran" and "Shah" share a row. */
  stateNames: string[]
}) {
  const layout = useMemo(() => successionLayout(rulers, span, nowYear(), stateNames), [rulers, span, stateNames])
  if (!layout) return null
  const width = layout.to - layout.from || 1
  const pct = (y: number) => `${((y - layout.from) / width) * 100}%`
  const name = (b: SuccessionBar) => refs[b.person]?.title ?? b.person

  return (
    <figure className="mb-6">
      <div aria-hidden="true" className="space-y-1">
        {layout.rows.map((row, ri) => (
          <div key={row.title} className="flex items-start gap-3">
            <span className="w-28 shrink-0 truncate pt-1 text-right text-xs text-ink-muted" title={row.title}>
              {row.title}
            </span>
            <div className="relative flex-1 border-l border-line" style={{ height: row.lanes * LANE }}>
              {layout.bars
                .filter((b) => b.row === ri)
                .map((b) => {
                  const to = historyPath(b.person)
                  const r = rulers[b.index]
                  const label = `${name(b)}, ${b.title}, ${dateText(r.start)} to ${dateText(r.end)}`
                  const cls = `absolute flex items-center overflow-hidden rounded border px-1.5 text-xs ${
                    b.openEnd ? 'border-dashed border-accent/40 bg-gradient-to-r from-accent/25 to-accent/5' : 'border-accent/40 bg-accent/25'
                  } text-ink hover:bg-accent/40`
                  const style = { left: pct(b.s), width: `max(4px, ${pct(layout.from + (b.e - b.s))})`, top: b.lane * LANE, height: LANE - 4 }
                  const body = <span className="truncate">{name(b)}</span>
                  return (
                    <span key={`${b.person}-${b.index}`}>
                      {b.softStart && <Soft from={b.softStart.from} to={b.softStart.to} lane={b.lane} pct={pct} width={width} />}
                      {b.softEnd && <Soft from={b.softEnd.from} to={b.softEnd.to} lane={b.lane} pct={pct} width={width} />}
                      {to ? (
                        <Link to={to} tabIndex={-1} title={label} className={cls} style={style}>
                          {body}
                        </Link>
                      ) : (
                        <span title={label} className={cls} style={style}>
                          {body}
                        </span>
                      )}
                    </span>
                  )
                })}
            </div>
          </div>
        ))}
        <div className="flex gap-3">
          <span className="w-28 shrink-0" />
          <div className="relative h-5 flex-1 border-t border-line">
            {layout.ticks.map((t) => {
              // Labels near either end align inward so the chart edge does not clip them.
              const at = (t - layout.from) / width
              const align = at > 0.95 ? '-translate-x-full' : at < 0.05 ? '' : '-translate-x-1/2'
              return (
                <span key={t} className={`absolute top-0.5 ${align} text-xs tabular-nums text-ink-muted`} style={{ left: pct(t) }}>
                  {yearLabel(t)}
                </span>
              )
            })}
          </div>
        </div>
      </div>
      {(predecessors.length > 0 || successors.length > 0) && (
        <figcaption className="mt-2 flex flex-wrap justify-between gap-x-6 gap-y-1 pl-[124px] text-xs text-ink-muted">
          <span>
            {predecessors.length > 0 && (
              <>
                From{' '}
                {predecessors.map((r, i) => (
                  <span key={r}>
                    {i > 0 && ', '}
                    {refs[r] ? <RefLink info={refs[r]} /> : r}
                  </span>
                ))}
              </>
            )}
          </span>
          <span>
            {successors.length > 0 && (
              <>
                To{' '}
                {successors.map((r, i) => (
                  <span key={r}>
                    {i > 0 && ', '}
                    {refs[r] ? <RefLink info={refs[r]} /> : r}
                  </span>
                ))}
              </>
            )}
          </span>
        </figcaption>
      )}
      <table className="sr-only">
        <caption>Succession chart</caption>
        <thead>
          <tr>
            <th scope="col">Office</th>
            <th scope="col">Holder</th>
            <th scope="col">From</th>
            <th scope="col">To</th>
          </tr>
        </thead>
        <tbody>
          {layout.bars.map((b) => (
            <tr key={`${b.person}-${b.index}`}>
              <td>{layout.rows[b.row].title}</td>
              <td>{name(b)}</td>
              <td>{dateText(rulers[b.index].start)}</td>
              <td>{dateText(rulers[b.index].end)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </figure>
  )
}

function Soft({ from, to, lane, pct, width }: { from: number; to: number; lane: number; pct: (y: number) => string; width: number }) {
  return (
    <span
      className="absolute rounded border border-dashed border-accent/30 bg-accent/10"
      style={{ left: pct(from), width: `${((to - from) / width) * 100}%`, top: lane * LANE - 2, height: LANE }}
    />
  )
}
