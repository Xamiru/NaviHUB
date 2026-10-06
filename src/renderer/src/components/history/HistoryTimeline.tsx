import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type FocusEvent, type MutableRefObject, type MouseEvent as ReactMouseEvent, type ReactNode } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { REGIONS, regionLabel, type RegionKey } from '@shared/history/schema'
import {
  bandLabels,
  clampView,
  densityBins,
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
import { historyImageSrc, historyPath } from '../../lib/historyUi'

// The world timeline, a mouse-first stage: one coloured stream per region (Iran
// pinned first), named periods as ribbons and tall bands, long events as glowing
// capsules and lead events as picture medallions. The wheel zooms around the
// pointer (and lets the page scroll once fully zoomed out), dragging pans with
// momentum, double-click dives in, and the scrubber below drags and resizes the
// visible window. A hover card shows each event's picture and dates. Keyboard
// users focus the stage (arrows pan, plus and minus zoom) and the List view is
// the same data as a table.

const ROW = 26
/** Room for the region tag above a stream's first row. */
const LANE_TOP = 28
const LANE_BOTTOM = 8
const RIBBON = 16
const AXIS = 30
const MEDAL = 26

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

function useWindowHeight(): number {
  const [h, setH] = useState(() => (typeof window === 'undefined' ? 800 : window.innerHeight))
  useEffect(() => {
    const on = (): void => setH(window.innerHeight)
    window.addEventListener('resize', on)
    return () => window.removeEventListener('resize', on)
  }, [])
  return h
}

const yearsText = (t: HistoryTimelineItem): string => {
  const a = Math.floor(t.s)
  const b = t.e === null ? a : Math.floor(t.e - 1e-6)
  return b > a ? `${a} to ${b}` : String(a)
}

const laneStyle = (key: string): CSSProperties => ({ ['--lane' as string]: `var(--hist-${key})` })
const easeOut = (t: number): number => 1 - Math.pow(1 - t, 3)
const reducedMotion = (): boolean =>
  typeof window !== 'undefined' && !!window.matchMedia?.('(prefers-reduced-motion: reduce)').matches

interface Hover {
  item: HistoryTimelineItem
  x: number
  y: number
}

export default function HistoryTimeline({ items, periods, range, selected, onSelect }: Props) {
  const navigate = useNavigate()
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
  const [mode, setMode] = usePersistedState<'timeline' | 'list'>('history.timeline.mode', 'timeline')
  const [trackRef, width, trackEl] = useWidth()
  const [miniRef, miniWidth, miniEl] = useWidth()
  const level = zoomLevel(view)
  const span = view.e - view.s
  const fullSpan = bounds.max - bounds.min
  const [hover, setHover] = useState<Hover | null>(null)
  // The cursor line draws itself (CursorLine), so pointer moves do not re-render the streams.
  const cursor = useRef<(x: number | null) => void>(() => {})
  const [offY, setOffY] = useState(0)
  const winH = useWindowHeight()

  // ---- view changes: immediate, animated, and momentum ----
  const viewRef = useRef(view)
  viewRef.current = view
  const anim = useRef<number | null>(null)
  const stop = useCallback((): void => {
    if (anim.current !== null) cancelAnimationFrame(anim.current)
    anim.current = null
  }, [])
  const setView = useCallback((v: View): void => setStored(clampView(v, bounds)), [bounds, setStored])
  const animateTo = useCallback(
    (target: View): void => {
      stop()
      const to = clampView(target, bounds)
      if (reducedMotion()) return setStored(to)
      const from = viewRef.current
      const t0 = performance.now()
      const step = (now: number): void => {
        const k = easeOut(Math.min(1, (now - t0) / 320))
        setStored({ s: from.s + (to.s - from.s) * k, e: from.e + (to.e - from.e) * k })
        anim.current = k < 1 ? requestAnimationFrame(step) : null
      }
      anim.current = requestAnimationFrame(step)
    },
    [bounds, setStored, stop]
  )
  useEffect(() => stop, [stop])

  const setOffYRef = useRef<(dy: number) => void>(() => {})
  // Native wheel listener: React's is passive and cannot stop the page (or the
  // app's Ctrl+wheel UI zoom) from also reacting.
  useEffect(() => {
    const el = trackEl
    if (!el) return
    const onWheel = (e: WheelEvent): void => {
      const v = viewRef.current
      const w = el.clientWidth || 1
      const unit = e.deltaMode === 1 ? 33 : e.deltaMode === 2 ? w : 1
      const dx = e.deltaX * unit
      const dy = e.deltaY * unit
      if (e.altKey) {
        e.preventDefault()
        setOffYRef.current(dy)
        return
      }
      if (e.shiftKey || Math.abs(dx) > Math.abs(dy)) {
        e.preventDefault()
        stop()
        setView(panView(v, ((dx || dy) / w) * (v.e - v.s), bounds))
        return
      }
      // Fully zoomed out and still scrolling down: hand the wheel back to the page.
      if (!e.ctrlKey && !e.metaKey && dy > 0 && v.e - v.s >= fullSpan - 0.01) return
      e.preventDefault()
      stop()
      const anchor = v.s + ((e.clientX - el.getBoundingClientRect().left) / w) * (v.e - v.s)
      setView(zoomView(v, Math.exp(dy * 0.0016), bounds, anchor))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [trackEl, bounds, fullSpan, setView, stop])

  const drag = useRef<{ x: number; y: number; s: number; offY: number; lastX: number; lastT: number; vel: number; moved: boolean } | null>(null)
  const momentum = (velPxPerMs: number): void => {
    if (reducedMotion() || Math.abs(velPxPerMs) < 0.15 || !width) return
    let vel = velPxPerMs
    let last = performance.now()
    const step = (now: number): void => {
      const dt = now - last
      last = now
      vel *= Math.pow(0.994, dt)
      const v = viewRef.current
      setView(panView(v, (-(vel * dt) / width) * (v.e - v.s), bounds))
      anim.current = Math.abs(vel) > 0.02 ? requestAnimationFrame(step) : null
    }
    anim.current = requestAnimationFrame(step)
  }

  // ---- layout ----
  const lanes = useMemo(() => {
    // Global periods are tall bands across every lane; global events get their
    // own stream, last, like any region.
    const used = new Set<string>([
      ...items.map((i) => i.lane),
      ...periods.filter((p) => p.lane !== 'global').map((p) => p.lane)
    ])
    return REGIONS.filter((r) => 'pinned' in r || used.has(r.key))
  }, [items, periods])
  const bandPeriods = periods.filter((p) => p.lane === 'global')
  // Memoized: hover and drag-free pointer moves re-render without moving the view.
  const laneLayouts = useMemo(() => lanes.map((lane) => {
    const laneItems: LaneItem[] = items
      .filter((i) => i.lane === lane.key)
      .map((i) => ({ key: i.ref, label: i.title, s: i.s, e: i.e ?? undefined, prominence: i.prominence }))
    const layout = layoutLane(laneItems, view, width || 1, {
      measure: (label) => estimateLabelWidth(label) + 14,
      pinned: selected ? new Set([selected]) : undefined
    })
    const bands = periods.filter((p) => p.lane === lane.key && (p.e ?? p.s) > view.s && p.s < view.e)
    const height = LANE_TOP + Math.max(layout.rows, 1) * ROW + LANE_BOTTOM + (bands.length ? RIBBON : 0)
    return { lane, layout, bands, height }
  }), [lanes, items, periods, view.s, view.e, width, selected])
  const contentH = Math.max(1, laneLayouts.reduce((n, l) => n + l.height, 0))
  // A map-like viewport: about two thirds of the window, never taller than the streams.
  const viewportH = Math.min(AXIS + contentH, Math.max(380, Math.min(Math.round(winH * 0.66), 780)))
  const maxOff = Math.max(0, contentH - (viewportH - AXIS))
  const clampY = (y: number): number => Math.min(Math.max(y, 0), maxOff)
  const laneTops = laneLayouts.reduce<number[]>((tops, l, i) => [...tops, i === 0 ? 0 : tops[i - 1] + laneLayouts[i - 1].height], [])
  if (offY > maxOff) setOffY(maxOff)
  setOffYRef.current = (dy) => setOffY((y) => Math.min(Math.max(y + dy, 0), maxOff))
  const tickList = width ? ticks(view, width) : []
  // Giant numerals behind the streams, spaced so they never crowd.
  const numerals: typeof tickList = []
  for (const t of tickList) {
    if (t.major && (numerals.length === 0 || t.x - numerals[numerals.length - 1].x > 240)) numerals.push(t)
  }
  const byRef = useMemo(() => new Map(items.map((i) => [i.ref, i])), [items])
  const selectedItem = selected ? byRef.get(selected) : undefined

  const zoomBy = (factor: number): void => animateTo(zoomView(view, factor, bounds))
  const jump = (lvl: ZoomLevel): void => animateTo(viewAtLevel(view, lvl, bounds))
  const fit = (): void => animateTo(initial)
  const showAll = (): void => animateTo({ s: bounds.min, e: bounds.max })

  const inView = items.filter((i) => (i.e ?? i.s) >= view.s && i.s <= view.e)
  const rangeText = `${Math.floor(view.s)} to ${Math.ceil(view.e)}`
  const yearAt = (x: number): number => view.s + (x / Math.max(width, 1)) * span

  const openCard = (item: HistoryTimelineItem, el: HTMLElement): void => {
    if (!trackEl) return
    const box = el.getBoundingClientRect()
    const host = trackEl.getBoundingClientRect()
    setHover({ item, x: box.left + box.width / 2 - host.left, y: box.top - host.top })
  }

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
        <span className="ml-auto text-xs tabular-nums text-ink-secondary">{inView.length} events in view</span>
      </div>

      {mode === 'list' ? (
        <TimelineList items={inView} caption={`Events from ${rangeText}`} />
      ) : (
        <div className="history-stage relative overflow-hidden rounded-2xl border border-black/40 shadow-2xl">
          <div className="stage-grain pointer-events-none absolute inset-0" aria-hidden="true" />
          <p className="sr-only">
            Showing {inView.length} events from {rangeText}. The List view lists them as a table.
          </p>

          {/* header: range readout and the zoom cluster */}
          <div className="relative z-30 flex items-center gap-3 border-b border-white/[0.06] px-5 py-2.5">
            <span className="hist-display text-2xl font-semibold tabular-nums tracking-tight text-ink" aria-hidden="true">
              {Math.floor(view.s)}
              <span className="mx-2 text-ink-muted">–</span>
              {Math.ceil(view.e)}
            </span>
            <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted" aria-hidden="true">
              {level} view
            </span>
            <div className="ml-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1">
              <StageButton label="Zoom out" onClick={() => zoomBy(1.6)}>
                −
              </StageButton>
              <StageButton label="Zoom in" onClick={() => zoomBy(1 / 1.6)}>
                +
              </StageButton>
              <span className="mx-0.5 h-4 w-px bg-white/15" aria-hidden="true" />
              <StageButton label="Fit the events" onClick={fit} wide>
                Fit
              </StageButton>
              <StageButton label="Show the whole archive" onClick={showAll} wide>
                All
              </StageButton>
            </div>
          </div>

          {/* the stage: a fixed viewport, dragged in time (x) and across the regions (y) */}
          <div
            ref={trackRef}
            tabIndex={0}
            aria-label={`Timeline ${rangeText}. Arrow keys pan, plus and minus zoom.`}
            className="relative cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing"
            style={{ height: viewportH }}
            onKeyDown={(e) => {
              if (e.target !== e.currentTarget) return
              if (e.key === 'ArrowLeft') animateTo(panView(view, -span * 0.15, bounds))
              else if (e.key === 'ArrowRight') animateTo(panView(view, span * 0.15, bounds))
              else if (e.key === 'ArrowUp') setOffY((y) => clampY(y - 80))
              else if (e.key === 'ArrowDown') setOffY((y) => clampY(y + 80))
              else if (e.key === '+' || e.key === '=') setView(zoomView(view, 1 / 1.4, bounds))
              else if (e.key === '-') setView(zoomView(view, 1.4, bounds))
              else return
              e.preventDefault()
            }}
            onPointerDown={(e) => {
              if ((e.target as HTMLElement).closest('[data-ev],[data-band]')) return
              stop()
              setHover(null)
              drag.current = { x: e.clientX, y: e.clientY, s: view.s, offY, lastX: e.clientX, lastT: performance.now(), vel: 0, moved: false }
              e.currentTarget.setPointerCapture(e.pointerId)
            }}
            onPointerMove={(e) => {
              const host = e.currentTarget.getBoundingClientRect()
              const d = drag.current
              if (!d || !width) return cursor.current(e.clientX - host.left)
              const now = performance.now()
              const dt = Math.max(now - d.lastT, 1)
              d.vel = 0.8 * ((e.clientX - d.lastX) / dt) + 0.2 * d.vel
              d.lastX = e.clientX
              d.lastT = now
              if (Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 3) d.moved = true
              cursor.current(d.moved ? null : e.clientX - host.left)
              const shift = ((d.x - e.clientX) / width) * span
              setView({ s: d.s + shift, e: d.s + shift + span })
              setOffY(clampY(d.offY + (d.y - e.clientY)))
            }}
            onPointerUp={() => {
              const d = drag.current
              drag.current = null
              if (d?.moved) momentum(d.vel)
            }}
            onPointerLeave={() => cursor.current(null)}
            onDoubleClick={(e) => {
              if ((e.target as HTMLElement).closest('[data-ev],[data-band]') || !width) return
              const host = e.currentTarget.getBoundingClientRect()
              animateTo(zoomView(view, 1 / 2.5, bounds, yearAt(e.clientX - host.left)))
            }}
          >
            {/* giant numerals, pinned to the bottom of the viewport */}
            {numerals.map((t) => (
              <span key={`n${t.year}`} aria-hidden="true" className="hist-numeral hist-display pointer-events-none absolute bottom-1 font-bold tabular-nums" style={{ left: t.x + 6 }}>
                {t.label}
              </span>
            ))}

            {/* global periods: tall bands through every stream */}
            {width > 0 &&
              bandPeriods
                .filter((p) => (p.e ?? p.s) > view.s && p.s < view.e)
                .map((p) => {
                  const l = Math.max(0, yearToX(p.s, view, width))
                  const r = Math.min(width, yearToX(p.e ?? p.s, view, width))
                  const w = Math.max(0, r - l)
                  return (
                    <div key={p.ref} className="pointer-events-none absolute bottom-0 border-x border-white/[0.06] bg-white/[0.025]" style={{ left: l, width: w, top: AXIS }}>
                      {w > estimateLabelWidth(p.title) + 20 && (
                        <Link
                          to={historyPath(p.ref) ?? '/history'}
                          tabIndex={-1}
                          data-band
                          className="pointer-events-auto absolute bottom-24 left-2 rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted hover:bg-white/10 hover:text-ink"
                        >
                          {p.title}
                        </Link>
                      )}
                    </div>
                  )
                })}

            {/* selection beam */}
            {selectedItem && width > 0 && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute bottom-0 w-px"
                style={{
                  ...laneStyle(selectedItem.lane),
                  left: yearToX(selectedItem.s, view, width),
                  top: AXIS,
                  background: 'linear-gradient(180deg, rgb(var(--lane) / 0.9), rgb(var(--lane) / 0.1))'
                }}
              />
            )}

            {/* streams, moved by the vertical pan */}
            <div className="absolute inset-x-0" style={{ top: AXIS - offY }}>
              {laneLayouts.map(({ lane, layout, bands, height }) => (
                <div
                  key={lane.key}
                  className="relative border-b border-white/[0.05]"
                  style={{
                    ...laneStyle(lane.key),
                    height,
                    background: 'linear-gradient(90deg, rgb(var(--lane) / 0.14), rgb(var(--lane) / 0.04) 45%, rgb(var(--lane) / 0.08))'
                  }}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute left-3 top-1.5 z-20 flex items-center gap-1.5 whitespace-nowrap rounded-full bg-black/45 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em]"
                    style={{ color: 'rgb(var(--lane))' }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--lane))', boxShadow: '0 0 8px rgb(var(--lane))' }} />
                    {lane.label}
                  </span>

                  {/* regional periods: ribbons along the bottom of the stream */}
                  {width > 0 &&
                    (() => {
                      const boxes = bands.map((p) => ({
                        key: p.ref,
                        x0: Math.max(0, yearToX(p.s, view, width)),
                        x1: Math.min(width, yearToX(p.e ?? p.s, view, width)),
                        label: p.title
                      }))
                      const labelled = bandLabels(boxes)
                      return boxes.map((b) => (
                        <div key={b.key} aria-hidden="true" className="pointer-events-none absolute bottom-1.5" style={{ left: b.x0, width: Math.max(0, b.x1 - b.x0) }}>
                          {labelled.has(b.key) && (
                            <span className="absolute bottom-2 right-1 whitespace-nowrap text-[9px] font-semibold uppercase tracking-[0.16em]" style={{ color: 'rgb(var(--lane) / 0.75)' }}>
                              {b.label}
                            </span>
                          )}
                          <div className="h-1 rounded-full" style={{ background: 'linear-gradient(90deg, rgb(var(--lane) / 0.15), rgb(var(--lane) / 0.45), rgb(var(--lane) / 0.15))' }} />
                        </div>
                      ))
                    })()}

                  {/* events */}
                  {layout.placed.map((p) => {
                    const item = byRef.get(p.item.key)!
                    const top = LANE_TOP + p.row * ROW
                    const isSel = selected === item.ref
                    const isHover = hover?.item.ref === item.ref
                    const label = `${item.title}, ${yearsText(item)}`
                    const lead = item.prominence === 1
                    const handlers = {
                      onClick: () => onSelect(item.ref),
                      onDoubleClick: () => {
                        const to = historyPath(item.ref)
                        if (to) navigate(to)
                      },
                      onMouseEnter: (e: ReactMouseEvent<HTMLButtonElement>) => openCard(item, e.currentTarget),
                      onMouseLeave: () => setHover(null),
                      onFocus: (e: FocusEvent<HTMLButtonElement>) => openCard(item, e.currentTarget),
                      onBlur: () => setHover(null)
                    }
                    const glow = isSel ? 'ev-glow-strong' : isHover ? 'ev-glow' : ''
                    const dim = item.read && !isSel ? 0.62 : 1
                    const outsideText = p.showLabel && (
                      <span
                        className={`pointer-events-none whitespace-nowrap ${lead ? 'text-[12px] font-semibold text-ink' : 'text-[11px] font-medium text-ink-secondary'} ${isSel || isHover ? '!text-ink' : ''}`}
                        style={{ textShadow: '0 1px 6px rgb(0 0 0 / 0.95)' }}
                      >
                        {item.title}
                      </span>
                    )
                    if (item.e !== null) {
                      const w = Math.max(p.x1 - p.x0, 8)
                      // A capsule long enough for its name carries it inside, in dark ink.
                      if (p.inside && p.showLabel) {
                        return (
                          <button
                            key={item.ref}
                            type="button"
                            data-ev
                            title={label}
                            aria-label={label}
                            aria-pressed={isSel}
                            {...handlers}
                            className={`ev-pop absolute z-10 flex items-center overflow-hidden rounded-full px-2.5 ${glow} ${item.personal ? 'outline-dashed outline-1 outline-white/70' : ''}`}
                            style={{
                              left: p.x0,
                              top: top + 2,
                              width: w,
                              height: 20,
                              opacity: dim,
                              background: 'linear-gradient(90deg, rgb(var(--lane)), rgb(var(--lane) / 0.6))'
                            }}
                          >
                            <span className={`pointer-events-none whitespace-nowrap text-[11px] text-black/85 ${lead ? 'font-bold' : 'font-semibold'}`}>{item.title}</span>
                          </button>
                        )
                      }
                      const h = lead ? 10 : 7
                      return (
                        <button
                          key={item.ref}
                          type="button"
                          data-ev
                          title={label}
                          aria-label={label}
                          aria-pressed={isSel}
                          {...handlers}
                          className={`absolute z-10 flex items-center gap-2 ${p.flip ? 'flex-row-reverse' : ''}`}
                          style={{ top: top + 2, height: 20, ...(p.flip ? { right: width - p.x1 } : { left: p.x0 }) }}
                        >
                          <span
                            className={`ev-pop block shrink-0 rounded-full ${glow} ${item.personal ? 'outline-dashed outline-1 outline-white/70' : ''}`}
                            style={{ width: w, height: h, opacity: dim, background: 'linear-gradient(90deg, rgb(var(--lane)), rgb(var(--lane) / 0.55))' }}
                          />
                          {outsideText}
                        </button>
                      )
                    }
                    const src = lead ? historyImageSrc(item.image, 64) : null
                    const size = src ? MEDAL : lead ? 12 : item.prominence === 2 ? 9 : 7
                    return (
                      <button
                        key={item.ref}
                        type="button"
                        data-ev
                        title={label}
                        aria-label={label}
                        aria-pressed={isSel}
                        {...handlers}
                        className={`absolute z-10 flex items-center gap-2 ${p.flip ? 'flex-row-reverse' : ''}`}
                        style={{ top: top + 12 - size / 2, ...(p.flip ? { right: width - p.x0 - size / 2 } : { left: p.x0 - size / 2 }) }}
                      >
                        {src ? (
                          <img
                            src={src}
                            alt=""
                            draggable={false}
                            className={`ev-pop shrink-0 rounded-full object-cover ${isSel ? 'ev-glow-strong scale-110' : isHover ? 'ev-glow scale-110' : 'ev-glow'}`}
                            style={{ width: size, height: size, border: '2px solid rgb(var(--lane))', opacity: dim }}
                          />
                        ) : (
                          <span
                            className={`ev-pop block shrink-0 rounded-full ${isSel ? 'ev-glow-strong scale-125' : isHover ? 'ev-glow scale-125' : lead ? 'ev-glow' : ''} ${item.personal ? 'outline-dashed outline-1 outline-white/70' : ''}`}
                            style={{ width: size, height: size, opacity: dim, background: 'rgb(var(--lane))' }}
                          />
                        )}
                        {outsideText}
                      </button>
                    )
                  })}
                </div>
              ))}
            </div>

            {/* axis, pinned over the streams */}
            <div className="absolute inset-x-0 top-0 z-20 border-b border-white/[0.08] bg-[rgb(var(--stage-bg)/0.85)] backdrop-blur" style={{ height: AXIS }} aria-hidden="true">
              {tickList.map((t) => (
                <div key={t.year} className="absolute bottom-0" style={{ left: t.x }}>
                  <div className={`w-px ${t.major ? 'h-3 bg-white/45' : 'h-1.5 bg-white/20'}`} />
                  {t.label && (
                    <span className={`absolute bottom-3.5 -translate-x-1/2 whitespace-nowrap tabular-nums ${t.major ? 'text-[11px] font-semibold text-ink-secondary' : 'text-[10px] text-ink-muted'}`}>
                      {t.label}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* vertical position: how far down the regions the view is */}
            {maxOff > 0 && (
              <div aria-hidden="true" className="pointer-events-none absolute bottom-3 right-1.5 z-20 w-1 rounded-full bg-white/10" style={{ top: AXIS + 8 }}>
                <div
                  className="absolute inset-x-0 rounded-full bg-white/40"
                  style={{ top: `${(offY / contentH) * 100}%`, height: `${((viewportH - AXIS) / contentH) * 100}%` }}
                />
              </div>
            )}

            {/* cursor line and year */}
            {width > 0 && <CursorLine setter={cursor} yearAt={yearAt} span={span} />}

            {hover && <HoverCard hover={hover} stageWidth={width} stageHeight={viewportH} />}
          </div>

          {/* scrubber */}
          <div className="relative border-t border-white/[0.07] bg-black/30 px-4 pb-3 pt-2">
            <div className="mb-2 flex flex-wrap items-center gap-1.5">
              {laneLayouts.map(({ lane }, i) => (
                <button
                  key={lane.key}
                  type="button"
                  onClick={() => setOffY(clampY(laneTops[i]))}
                  className="flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-secondary transition-colors hover:bg-white/10 hover:text-ink"
                  style={laneStyle(lane.key)}
                >
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'rgb(var(--lane))' }} aria-hidden="true" />
                  {lane.label}
                </button>
              ))}
              <span className="ml-auto text-xs text-ink-muted" aria-hidden="true">
                Scroll to zoom · drag to move · double-click to dive in · Alt+scroll for regions
              </span>
            </div>
            <Scrubber
              items={items}
              bounds={bounds}
              view={view}
              span={span}
              rangeText={rangeText}
              hostRef={miniRef}
              host={miniEl}
              width={miniWidth}
              setView={setView}
              animateTo={animateTo}
              stop={stop}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function StageButton({ label, onClick, children, wide }: { label: string; onClick: () => void; children: ReactNode; wide?: boolean }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className={`flex h-7 items-center justify-center rounded-full text-sm font-semibold text-ink-secondary transition-colors hover:bg-white/15 hover:text-ink ${wide ? 'px-2.5 text-[11px] uppercase tracking-[0.14em]' : 'w-7'}`}
    >
      {children}
    </button>
  )
}

function HoverCard({ hover, stageWidth, stageHeight }: { hover: Hover; stageWidth: number; stageHeight: number }) {
  const { item } = hover
  const src = historyImageSrc(item.image, 480)
  const W = 260
  const left = Math.min(Math.max(hover.x - W / 2, 8), Math.max(stageWidth - W - 8, 8))
  // Below the event when there is room, otherwise above it.
  const above = hover.y + 34 + (src ? 260 : 140) > stageHeight && hover.y > 150
  return (
    <div
      aria-hidden="true"
      className="hover-card pointer-events-none absolute z-40 overflow-hidden rounded-xl border border-white/10 bg-[rgb(var(--stage-bg-2)/0.96)] shadow-2xl backdrop-blur"
      style={{ ...laneStyle(item.lane), left, width: W, ...(above ? { top: hover.y - 8, transform: 'translateY(-100%)' } : { top: hover.y + 34 }) }}
    >
      {src && <img src={src} alt="" className="h-32 w-full object-cover" />}
      <div className="h-0.5" style={{ background: 'linear-gradient(90deg, rgb(var(--lane)), transparent)' }} />
      <div className="p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgb(var(--lane))' }}>
          {item.typeLabel} · {regionLabel(item.lane)}
        </p>
        <p className="mt-1 hist-display text-base font-semibold leading-snug text-ink">{item.title}</p>
        {item.native && (
          <p className="mt-0.5 text-sm text-ink-secondary" dir="auto">
            {item.native}
          </p>
        )}
        <p className="mt-1.5 text-xs tabular-nums text-ink-secondary">
          {yearsText(item)}
          {item.read && <span className="ml-2 text-ink-muted">read</span>}
        </p>
        <p className="mt-2 text-xs text-ink-muted">Click to preview · double-click to open</p>
      </div>
    </div>
  )
}

/** The cursor line and its year; owns its position so a pointer move re-renders only this. */
function CursorLine({
  setter,
  yearAt,
  span
}: {
  setter: MutableRefObject<(x: number | null) => void>
  yearAt: (x: number) => number
  span: number
}) {
  const [x, setX] = useState<number | null>(null)
  useEffect(() => {
    setter.current = setX
    return () => {
      setter.current = () => {}
    }
  }, [setter])
  if (x === null) return null
  return (
    <div aria-hidden="true" className="pointer-events-none absolute bottom-0 top-0 z-30" style={{ left: x }}>
      <div className="absolute bottom-0 w-px bg-white/20" style={{ top: AXIS }} />
      <span className="absolute top-1.5 -translate-x-1/2 rounded-full bg-white px-2 py-0.5 text-[10px] font-bold tabular-nums text-black shadow">
        {span < 3 ? yearAt(x).toFixed(1) : Math.floor(yearAt(x))}
      </span>
    </div>
  )
}

function Scrubber({
  items,
  bounds,
  view,
  span,
  rangeText,
  hostRef,
  host,
  width,
  setView,
  animateTo,
  stop
}: {
  items: HistoryTimelineItem[]
  bounds: Bounds
  view: View
  span: number
  rangeText: string
  hostRef: (el: HTMLDivElement | null) => void
  host: HTMLDivElement | null
  width: number
  setView: (v: View) => void
  animateTo: (v: View) => void
  stop: () => void
}) {
  const full = { s: bounds.min, e: bounds.max }
  const H = 46
  const drag = useRef<{ kind: 'move' | 'left' | 'right'; x: number; view: View } | null>(null)
  const toYear = (clientX: number): number => {
    const rect = host?.getBoundingClientRect()
    return bounds.min + ((clientX - (rect?.left ?? 0)) / Math.max(width, 1)) * (bounds.max - bounds.min)
  }
  const area = useMemo(() => {
    if (!width) return ''
    const size = (bounds.max - bounds.min) / 90
    const bins = densityBins(items.map((i) => i.s), bounds.min, bounds.max, size)
    const max = Math.max(1, ...bins.map((b) => b.count))
    const pts = bins.map((b) => [yearToX(b.start + size / 2, full, width), H - 4 - (b.count / max) * (H - 10)] as const)
    if (pts.length === 0) return ''
    let d = `M0 ${H} L${pts[0][0]} ${pts[0][1]}`
    for (let i = 1; i < pts.length; i++) {
      const [x0, y0] = pts[i - 1]
      const [x1, y1] = pts[i]
      const mx = (x0 + x1) / 2
      d += ` C${mx} ${y0} ${mx} ${y1} ${x1} ${y1}`
    }
    return `${d} L${width} ${H} Z`
  }, [items, bounds, width])
  const marks = width ? ticks(full, width).filter((t) => t.major) : []
  const wl = width ? yearToX(view.s, full, width) : 0
  const wr = width ? yearToX(view.e, full, width) : 0

  return (
    <div
      ref={hostRef}
      role="slider"
      tabIndex={0}
      aria-label="Visible range"
      aria-valuemin={bounds.min}
      aria-valuemax={bounds.max}
      aria-valuenow={Math.round(view.s)}
      aria-valuetext={rangeText}
      className="relative cursor-pointer touch-none select-none"
      style={{ height: H }}
      onKeyDown={(e) => {
        if (e.key === 'ArrowLeft') animateTo(panView(view, -span * 0.25, bounds))
        else if (e.key === 'ArrowRight') animateTo(panView(view, span * 0.25, bounds))
        else return
        e.preventDefault()
      }}
      onPointerDown={(e) => {
        if (!width) return
        stop()
        const part = (e.target as HTMLElement).closest<HTMLElement>('[data-part]')?.dataset.part as 'move' | 'left' | 'right' | undefined
        if (!part) {
          const year = toYear(e.clientX)
          animateTo({ s: year - span / 2, e: year + span / 2 })
          return
        }
        drag.current = { kind: part, x: e.clientX, view }
        e.currentTarget.setPointerCapture(e.pointerId)
      }}
      onPointerMove={(e) => {
        const d = drag.current
        if (!d || !width) return
        const dy = ((e.clientX - d.x) / width) * (bounds.max - bounds.min)
        if (d.kind === 'move') setView({ s: d.view.s + dy, e: d.view.e + dy })
        else if (d.kind === 'left') setView({ s: Math.min(d.view.s + dy, d.view.e - bounds.minSpan), e: d.view.e })
        else setView({ s: d.view.s, e: Math.max(d.view.e + dy, d.view.s + bounds.minSpan) })
      }}
      onPointerUp={() => (drag.current = null)}
    >
      {width > 0 && (
        <>
          <svg aria-hidden="true" width={width} height={H} className="absolute inset-0">
            <defs>
              <linearGradient id="hist-density" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="rgb(var(--hist-europe))" stopOpacity="0.55" />
                <stop offset="100%" stopColor="rgb(var(--hist-europe))" stopOpacity="0.05" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#hist-density)" stroke="rgb(var(--hist-europe) / 0.7)" strokeWidth="1" />
          </svg>
          {marks.map((t) => (
            <span key={t.year} aria-hidden="true" className="absolute top-0 ml-1 text-[9px] tabular-nums text-ink-muted" style={{ left: t.x }}>
              {t.year}
            </span>
          ))}
          {/* dimmed outside the window */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-0 bg-black/45" style={{ width: wl }} />
          <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-0 bg-black/45" style={{ left: wr }} />
          <div
            data-part="move"
            aria-hidden="true"
            className="absolute inset-y-0 cursor-grab rounded-md border border-white/70 bg-white/[0.06] shadow-[0_0_18px_rgb(255_255_255/0.15)] active:cursor-grabbing"
            style={{ left: wl, width: Math.max(wr - wl, 6) }}
          >
            <span data-part="left" className="absolute -left-1.5 inset-y-1 w-3 cursor-ew-resize rounded-full bg-white/80" />
            <span data-part="right" className="absolute -right-1.5 inset-y-1 w-3 cursor-ew-resize rounded-full bg-white/80" />
          </div>
        </>
      )}
    </div>
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
                <td className="px-4 py-1.5 text-ink-secondary">{regionLabel(i.lane as RegionKey)}</td>
              </tr>
            ))}
          </tbody>
        ))}
      </table>
    </div>
  )
}
