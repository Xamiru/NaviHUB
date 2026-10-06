import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { REGIONS, type RegionKey } from '@shared/history/schema'
import {
  clampView,
  densityBins,
  bandLabels,
  estimateLabelWidth,
  layoutLane,
  panView,
  ticks,
  viewAtLevel,
  yearToX,
  zoomLevel,
  zoomView,
  type Bounds,
  type LaneItem,
  type View,
  type ZoomLevel
} from '@shared/history/timelineLayout'
import type { HistoryTimelineItem } from '@shared/types'
import { usePersistedState } from '../../lib/navState'
import { historyPath } from '../../lib/historyUi'

// The world timeline: one lane per region (Iran pinned first), named periods
// as bands, long events as bars and point events as marks. Ctrl+wheel zooms
// around the pointer, Shift+wheel or dragging pans, and the minimap window
// drags; plain wheel keeps scrolling the page. The List view is the same data
// as a table, for keyboard and screen-reader reading.

const ROW = 24
const PAD = 8
const LABEL_W = 176

interface Props {
  items: HistoryTimelineItem[]
  periods: HistoryTimelineItem[]
  range: { min: number; max: number }
  selected: string | null
  onSelect: (ref: string) => void
}

// A callback ref, so the observer follows the element across the
// Timeline/List switch that unmounts and remounts it.
function useWidth(): [(el: HTMLDivElement | null) => void, number, HTMLDivElement | null] {
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (!el) return
    const ro = new ResizeObserver(([entry]) => setWidth(Math.round(entry.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [el])
  return [setEl, width, el]
}

const yearsText = (t: HistoryTimelineItem): string => {
  const a = Math.floor(t.s)
  const b = t.e === null ? a : Math.floor(t.e - 1e-6)
  return b > a ? `${a} to ${b}` : String(a)
}

export default function HistoryTimeline({ items, periods, range, selected, onSelect }: Props) {
  const bounds: Bounds = useMemo(
    () => ({
      min: Math.floor(range.min / 10) * 10 - 5,
      max: Math.ceil((range.max + 0.01) / 10) * 10 + 5,
      minSpan: 0.6
    }),
    [range.min, range.max]
  )
  // Open on the span the events cover (periods such as a dynasty can reach
  // far earlier), at least three decades wide and at most a century.
  const initial = useMemo(() => {
    if (items.length === 0) return clampView({ s: bounds.min + 5, e: Math.min(bounds.max - 5, bounds.min + 105) }, bounds)
    const first = Math.min(...items.map((i) => i.s))
    const last = Math.max(...items.map((i) => i.e ?? i.s))
    const s = Math.floor(first) - 3
    return clampView({ s, e: Math.min(s + 105, Math.max(Math.ceil(last) + 3, s + 30)) }, bounds)
  }, [bounds, items])
  const [stored, setStored] = usePersistedState<View>('history.timeline.view', initial)
  const view = clampView(stored, bounds)
  const setView = (v: View): void => setStored(clampView(v, bounds))
  const [mode, setMode] = usePersistedState<'timeline' | 'list'>('history.timeline.mode', 'timeline')
  const [trackRef, width, trackEl] = useWidth()
  const [miniRef, miniWidth] = useWidth()
  const level = zoomLevel(view)
  const span = view.e - view.s

  const lanes = useMemo(() => {
    // Global periods are drawn as bands across every lane; global events get
    // their own lane, last, like any region.
    const used = new Set<string>([
      ...items.map((i) => i.lane),
      ...periods.filter((p) => p.lane !== 'global').map((p) => p.lane)
    ])
    return REGIONS.filter((r) => 'pinned' in r || used.has(r.key))
  }, [items, periods])
  const bandPeriods = periods.filter((p) => p.lane === 'global')
  const lanePeriods = (lane: RegionKey): HistoryTimelineItem[] => periods.filter((p) => p.lane === lane)

  // Native listener: React's wheel handler is passive and cannot stop the
  // page (or the app's Ctrl+wheel UI zoom) from also reacting.
  const viewRef = useRef(view)
  viewRef.current = view
  const setRef = useRef(setView)
  setRef.current = setView
  useEffect(() => {
    const el = trackEl
    if (!el) return
    const onWheel = (e: WheelEvent): void => {
      const v = viewRef.current
      const w = el.clientWidth || 1
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault()
        const anchor = v.s + ((e.clientX - el.getBoundingClientRect().left) / w) * (v.e - v.s)
        setRef.current(zoomView(v, e.deltaY > 0 ? 1.18 : 1 / 1.18, bounds, anchor))
      } else if (e.shiftKey || Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        setRef.current(panView(v, ((e.deltaX || e.deltaY) / w) * (v.e - v.s), bounds))
      }
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [trackEl, bounds])

  const drag = useRef<{ x: number; s: number } | null>(null)
  const miniDrag = useRef<{ x: number; s: number } | null>(null)

  const laneLayouts = lanes.map((lane) => {
    const laneItems: LaneItem[] = items
      .filter((i) => i.lane === lane.key)
      .map((i) => ({ key: i.ref, label: i.title, s: i.s, e: i.e ?? undefined, prominence: i.prominence }))
    const layout = layoutLane(laneItems, view, width || 1, {
      measure: estimateLabelWidth,
      pinned: selected ? new Set([selected]) : undefined
    })
    const bands = lanePeriods(lane.key)
    const height = layout.rows * ROW + PAD * 2 + (bands.length ? 12 : 0)
    return { lane, layout, bands, height }
  })
  const tickList = width ? ticks(view, width) : []
  const byRef = useMemo(() => new Map(items.map((i) => [i.ref, i])), [items])

  const zoomBy = (factor: number): void => setView(zoomView(view, factor, bounds))
  const jump = (lvl: ZoomLevel): void => setView(viewAtLevel(view, lvl, bounds))

  const inView = items.filter((i) => (i.e ?? i.s) >= view.s && i.s <= view.e)
  const rangeText = `${Math.floor(view.s)} to ${Math.ceil(view.e)}`

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1" role="group" aria-label="View">
          {(['timeline', 'list'] as const).map((m) => (
            <button key={m} type="button" className={`pill ${mode === m ? 'pill-active' : ''}`} aria-pressed={mode === m} onClick={() => setMode(m)}>
              {m === 'timeline' ? 'Timeline' : 'List'}
            </button>
          ))}
        </div>
        <span className="mx-1 h-5 w-px bg-line-subtle" aria-hidden="true" />
        <div className="flex items-center gap-1" role="group" aria-label="Zoom level">
          {(['century', 'decade', 'year'] as const).map((l) => (
            <button key={l} type="button" className={`pill ${level === l ? 'pill-active' : ''}`} aria-pressed={level === l} onClick={() => jump(l)}>
              {l === 'century' ? 'Century' : l === 'decade' ? 'Decade' : 'Year'}
            </button>
          ))}
        </div>
        <button type="button" className="btn-ghost h-8 w-8 !px-0" aria-label="Zoom out" title="Zoom out" onClick={() => zoomBy(1.4)}>
          −
        </button>
        <button type="button" className="btn-ghost h-8 w-8 !px-0" aria-label="Zoom in" title="Zoom in" onClick={() => zoomBy(1 / 1.4)}>
          +
        </button>
        <span className="ml-auto text-xs text-ink-muted">
          <span className="tabular-nums text-ink-secondary">{rangeText}</span>
          <span className="ml-3 hidden md:inline">Ctrl+wheel zooms · drag or Shift+wheel pans</span>
        </span>
      </div>

      {mode === 'list' ? (
        <TimelineList items={inView} caption={`Events from ${rangeText}`} />
      ) : (
        <div className="card overflow-hidden p-0">
          <p className="sr-only">
            Showing {inView.length} events from {rangeText}. The List view lists them as a table.
          </p>
          {/* period bands */}
          <div className="flex border-b border-line-subtle">
            <div className="shrink-0 border-r border-line-subtle px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted" style={{ width: LABEL_W }}>
              Periods
            </div>
            <div className="relative h-8 min-w-0 flex-1 overflow-hidden" aria-hidden="true">
              {width > 0 &&
                bandPeriods
                  .filter((p) => (p.e ?? p.s) > view.s && p.s < view.e)
                  .map((p) => {
                    const l = Math.max(0, yearToX(p.s, view, width))
                    const r = Math.min(width, yearToX(p.e ?? p.s, view, width))
                    const w = Math.max(0, r - l - 2)
                    const label = w > estimateLabelWidth(p.title) ? p.title : ''
                    return (
                      <Link
                        key={p.ref}
                        to={historyPath(p.ref) ?? '/history'}
                        tabIndex={-1}
                        title={`${p.title}, ${yearsText(p)}`}
                        className="absolute bottom-1 top-1 overflow-hidden whitespace-nowrap rounded border border-accent/30 bg-accent/10 px-2 text-[10px] font-semibold uppercase leading-6 tracking-[0.14em] text-accent/90 hover:bg-accent/20"
                        style={{ left: l, width: w }}
                      >
                        {label}
                      </Link>
                    )
                  })}
            </div>
          </div>
          {/* axis */}
          <div className="flex border-b border-line-subtle" aria-hidden="true">
            <div className="shrink-0 border-r border-line-subtle" style={{ width: LABEL_W }} />
            <div className="relative h-7 min-w-0 flex-1 overflow-hidden">
              {tickList.map((t) => (
                <div key={t.year} className={`absolute top-0 h-full border-l ${t.major ? 'border-line-strong' : 'border-line-subtle'}`} style={{ left: t.x }}>
                  <span className={`ml-1 text-[10px] tabular-nums ${t.major ? 'text-ink-secondary' : 'text-ink-muted'}`}>{t.label}</span>
                </div>
              ))}
            </div>
          </div>
          {/* lanes */}
          <div className="flex">
            <div className="shrink-0 border-r border-line-subtle" style={{ width: LABEL_W }}>
              {laneLayouts.map(({ lane, height }) => (
                <div
                  key={lane.key}
                  className={`flex items-start border-b border-line-subtle px-3 pt-2.5 ${'pinned' in lane ? 'bg-accent/5' : ''}`}
                  style={{ height }}
                >
                  <span className={`text-xs font-medium ${'pinned' in lane ? 'text-accent' : 'text-ink-secondary'}`}>{lane.label}</span>
                </div>
              ))}
            </div>
            <div
              ref={trackRef}
              tabIndex={0}
              aria-label={`Timeline ${rangeText}. Arrow keys pan, plus and minus zoom.`}
              className="relative min-w-0 flex-1 cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing"
              onKeyDown={(e) => {
                if (e.target !== e.currentTarget) return
                if (e.key === 'ArrowLeft') setView(panView(view, -span * 0.1, bounds))
                else if (e.key === 'ArrowRight') setView(panView(view, span * 0.1, bounds))
                else if (e.key === '+' || e.key === '=') zoomBy(1 / 1.4)
                else if (e.key === '-') zoomBy(1.4)
                else return
                e.preventDefault()
              }}
              onPointerDown={(e) => {
                if ((e.target as HTMLElement).closest('[data-ev]')) return
                drag.current = { x: e.clientX, s: view.s }
                e.currentTarget.setPointerCapture(e.pointerId)
              }}
              onPointerMove={(e) => {
                if (!drag.current || !width) return
                const dy = ((drag.current.x - e.clientX) / width) * span
                setView({ s: drag.current.s + dy, e: drag.current.s + dy + span })
              }}
              onPointerUp={() => (drag.current = null)}
            >
              {laneLayouts.map(({ lane, layout, bands, height }) => (
                <div key={lane.key} className={`relative border-b border-line-subtle ${'pinned' in lane ? 'bg-accent/5' : ''}`} style={{ height }}>
                  {width > 0 &&
                    (() => {
                      const boxes = bands
                        .filter((p) => (p.e ?? p.s) > view.s && p.s < view.e)
                        .map((p) => ({
                          key: p.ref,
                          x0: Math.max(0, yearToX(p.s, view, width)),
                          x1: Math.min(width, yearToX(p.e ?? p.s, view, width)),
                          label: p.title
                        }))
                      const labelled = bandLabels(boxes)
                      return boxes.map((b, i) => (
                        <div key={b.key} className={`absolute inset-y-0 ${i % 2 ? 'bg-base-700/25' : 'bg-base-700/10'}`} style={{ left: b.x0, width: Math.max(0, b.x1 - b.x0) }}>
                          {labelled.has(b.key) && (
                            <span className="absolute bottom-0.5 right-1.5 whitespace-nowrap text-[9px] uppercase tracking-[0.14em] text-ink-muted">{b.label}</span>
                          )}
                        </div>
                      ))
                    })()}
                  {tickList.map((t) => (
                    <div key={t.year} aria-hidden="true" className="pointer-events-none absolute inset-y-0 border-l border-line-subtle/40" style={{ left: t.x }} />
                  ))}
                  {layout.placed.map((p) => {
                    const item = byRef.get(p.item.key)!
                    const top = PAD + p.row * ROW
                    const isSel = selected === item.ref
                    const pinned = 'pinned' in lane
                    const label = `${item.title}, ${yearsText(item)}`
                    if (item.e !== null) {
                      const w = Math.max(p.x1 - p.x0, 6)
                      return (
                        <button
                          key={item.ref}
                          type="button"
                          data-ev
                          title={label}
                          aria-label={label}
                          aria-pressed={isSel}
                          onClick={() => onSelect(item.ref)}
                          className={`absolute flex h-[18px] items-center rounded-sm border text-left ${
                            pinned ? 'border-accent bg-accent/70' : 'border-signal-link/80 bg-signal-link/45'
                          } ${isSel ? 'ring-2 ring-accent' : ''} ${item.personal ? 'border-dashed' : ''}`}
                          style={{ left: p.x0, top, width: w }}
                        >
                          {p.showLabel && (
                            <span
                              className={`whitespace-nowrap text-[11px] font-medium ${
                                p.inside ? 'px-1.5 text-ink' : p.flip ? 'absolute right-full mr-1.5 text-ink-secondary' : 'absolute left-full ml-1.5 text-ink-secondary'
                              }`}
                            >
                              {item.title}
                            </span>
                          )}
                        </button>
                      )
                    }
                    return (
                      <button
                        key={item.ref}
                        type="button"
                        data-ev
                        title={label}
                        aria-label={label}
                        aria-pressed={isSel}
                        onClick={() => onSelect(item.ref)}
                        className={`absolute flex h-[18px] items-center ${p.flip ? 'flex-row-reverse' : ''}`}
                        style={p.flip ? { right: width - p.x0 - 5, top } : { left: p.x0 - 5, top }}
                      >
                        <span
                          className={`h-2.5 w-2.5 rotate-45 border ${pinned ? 'border-accent bg-accent' : 'border-signal-link bg-base-900'} ${
                            isSel ? 'ring-2 ring-accent' : ''
                          } ${item.personal ? 'border-dashed' : ''}`}
                        />
                        {p.showLabel && (
                          <span className={`${p.flip ? 'mr-1.5' : 'ml-1.5'} whitespace-nowrap text-[11px] font-medium text-ink-secondary`}>{item.title}</span>
                        )}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>
          </div>
          {/* minimap */}
          <div className="flex border-t border-line-subtle bg-base-900/40">
            <div className="shrink-0 border-r border-line-subtle px-3 py-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted" style={{ width: LABEL_W }}>
              Whole archive
            </div>
            <div
              ref={miniRef}
              role="slider"
              tabIndex={0}
              aria-label="Visible range"
              aria-valuemin={bounds.min}
              aria-valuemax={bounds.max}
              aria-valuenow={Math.round(view.s)}
              aria-valuetext={rangeText}
              className="relative h-12 min-w-0 flex-1 cursor-pointer touch-none select-none overflow-hidden"
              onKeyDown={(e) => {
                if (e.key === 'ArrowLeft') setView(panView(view, -span * 0.25, bounds))
                else if (e.key === 'ArrowRight') setView(panView(view, span * 0.25, bounds))
                else return
                e.preventDefault()
              }}
              onPointerDown={(e) => {
                if (!miniWidth) return
                const rect = e.currentTarget.getBoundingClientRect()
                const year = bounds.min + ((e.clientX - rect.left) / miniWidth) * (bounds.max - bounds.min)
                let start = view.s
                if (!(e.target as HTMLElement).closest('[data-window]')) {
                  const next = clampView({ s: year - span / 2, e: year + span / 2 }, bounds)
                  setView(next)
                  start = next.s
                }
                miniDrag.current = { x: e.clientX, s: start }
                e.currentTarget.setPointerCapture(e.pointerId)
              }}
              onPointerMove={(e) => {
                if (!miniDrag.current || !miniWidth) return
                const dy = ((e.clientX - miniDrag.current.x) / miniWidth) * (bounds.max - bounds.min)
                setView({ s: miniDrag.current.s + dy, e: miniDrag.current.s + dy + span })
              }}
              onPointerUp={() => (miniDrag.current = null)}
            >
              {miniWidth > 0 && (
                <Minimap items={items} bounds={bounds} width={miniWidth} view={view} />
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function Minimap({ items, bounds, width, view }: { items: HistoryTimelineItem[]; bounds: Bounds; width: number; view: View }) {
  const full = { s: bounds.min, e: bounds.max }
  const size = (bounds.max - bounds.min) / 60
  const bins = densityBins(items.map((i) => i.s), bounds.min, bounds.max, size)
  const max = Math.max(1, ...bins.map((b) => b.count))
  const marks = ticks(full, width).filter((t) => t.major)
  return (
    <>
      {bins.map((b) =>
        b.count ? (
          <div
            key={b.start}
            aria-hidden="true"
            className="absolute bottom-1 bg-signal-link/50"
            style={{
              left: yearToX(b.start, full, width),
              width: Math.max(yearToX(b.start + size, full, width) - yearToX(b.start, full, width) - 1, 1),
              height: 4 + (b.count / max) * 30
            }}
          />
        ) : null
      )}
      {marks.map((t) => (
        <span key={t.year} aria-hidden="true" className="absolute top-0.5 ml-1 text-[9px] tabular-nums text-ink-muted" style={{ left: t.x }}>
          {t.year}
        </span>
      ))}
      <div
        data-window
        aria-hidden="true"
        className="absolute inset-y-0.5 cursor-ew-resize rounded border-2 border-accent bg-accent/10"
        style={{ left: yearToX(view.s, full, width), width: Math.max(yearToX(view.e, full, width) - yearToX(view.s, full, width), 4) }}
      />
    </>
  )
}

function TimelineList({ items, caption }: { items: HistoryTimelineItem[]; caption: string }) {
  const byDecade = new Map<number, HistoryTimelineItem[]>()
  for (const i of [...items].sort((a, b) => a.s - b.s)) {
    const d = Math.floor(i.s / 10) * 10
    const list = byDecade.get(d) ?? []
    list.push(i)
    byDecade.set(d, list)
  }
  const regionLabel = (key: string): string => REGIONS.find((r) => r.key === key)?.label ?? key
  if (items.length === 0) return <p className="card p-6 text-sm text-ink-muted">No events in this range.</p>
  return (
    <div className="card overflow-x-auto p-0">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="border-b border-line-subtle text-[10px] uppercase tracking-[0.16em] text-ink-muted">
          <tr>
            <th scope="col" className="px-4 py-2 font-semibold">Dates</th>
            <th scope="col" className="px-4 py-2 font-semibold">Event</th>
            <th scope="col" className="px-4 py-2 font-semibold">Type</th>
            <th scope="col" className="px-4 py-2 font-semibold">Region</th>
          </tr>
        </thead>
        {[...byDecade.entries()].map(([d, list]) => (
          <tbody key={d}>
            <tr>
              <th scope="rowgroup" colSpan={4} className="bg-base-800 px-4 py-1.5 text-xs font-semibold text-accent">
                {d}s
              </th>
            </tr>
            {list.map((i) => (
              <tr key={i.ref} className="border-b border-line-subtle/60">
                <td className="px-4 py-1.5 tabular-nums text-ink-muted">{yearsText(i)}</td>
                <td className="px-4 py-1.5">
                  <Link to={historyPath(i.ref) ?? '/history'} className="text-ink hover:text-accent">
                    {i.title}
                  </Link>
                  {i.read && <span className="ml-2 text-xs text-signal-affirmative">✓ read</span>}
                </td>
                <td className="px-4 py-1.5 text-ink-secondary">{i.typeLabel}</td>
                <td className="px-4 py-1.5 text-ink-secondary">{regionLabel(i.lane)}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}
