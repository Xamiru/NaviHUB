import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { regionLabel } from '@shared/history/schema'
import { EQUAL_EARTH_BOUNDS, EUROPE_FROM, bordersRange, clampYear, decodeRing, equalEarth, layersAt, shapePath, stateHue } from '@shared/history/mapGeometry'
import type { HistoryMapPin, HistoryMapPolity, HistoryMapUnit } from '@shared/types'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { PauseIcon, PlayIcon } from '../components/PlayerIcons'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { historyImageSrc, historyPath, useHistoryImageRefresh } from '../lib/historyUi'

// The History map: the world's borders in any year from CShapes (Europe from
// 1806, the whole world from 1886) with events pinned at their located places.
// Mouse-first like the timeline: wheel to zoom, drag to pan, double-click to
// dive in, hover a state or a pin to read it, click a pin to open the event.
// The year slider scrubs and plays through time.

const K = 100 // projected units -> path units (shapePath's scale)
const PIN_WINDOW = 5 // years either side of the chosen year
const IRAN_CODE = 630

function useWidth(): [(el: HTMLDivElement | null) => void, number] {
  const [el, setEl] = useState<HTMLDivElement | null>(null)
  const [width, setWidth] = useState(0)
  useEffect(() => {
    if (!el) return
    const ro = new ResizeObserver(([e]) => setWidth(Math.round(e.contentRect.width)))
    ro.observe(el)
    return () => ro.disconnect()
  }, [el])
  return [setEl, width]
}

interface View {
  k: number
  tx: number
  ty: number
}

const laneStyle = (key: string): CSSProperties => ({ ['--lane' as string]: `var(--hist-${key})` })
const yearsOf = (from: number, to: number): string => `${Math.floor(from)} to ${Math.ceil(to) - 1}`

export default function HistoryMapPage() {
  const navigate = useNavigate()
  const borders = useQuery({ queryKey: qk.history.borders, queryFn: () => api.history.borders(), staleTime: Infinity })
  const pinsQuery = useQuery({ queryKey: qk.history.mapPins, queryFn: () => api.history.mapPins() })
  const politiesQuery = useQuery({ queryKey: qk.history.mapPolities, queryFn: () => api.history.mapPolities() })
  useHistoryImageRefresh(pinsQuery.dataUpdatedAt)
  const [year, setYear] = usePersistedState('history.map.year', 1905)
  const [playing, setPlaying] = useState(false)
  const [hostRef, width] = useWidth()
  const height = Math.max(420, Math.min(Math.round((typeof window === 'undefined' ? 900 : window.innerHeight) * 0.68), 760))
  const [view, setView] = usePersistedState<View | null>('history.map.view', null)
  const [hoverState, setHoverState] = useState<{ unit: HistoryMapUnit; x: number; y: number } | null>(null)
  const [hoverPin, setHoverPin] = useState<{ pin: HistoryMapPin; x: number; y: number } | null>(null)
  // "On the map" from an event page: open at its year, centred on its pin.
  const [params] = useSearchParams()
  const focus = params.get('focus')
  const focused = useRef<string | null>(null)
  const yearParam = params.get('year')
  useEffect(() => {
    if (yearParam && /^\d{4}$/.test(yearParam)) setYear(Number(yearParam))
  }, [yearParam, setYear])

  const data = borders.data
  // The slider reaches back to the earliest pinned event (the 1800s), before the
  // borders begin: those years show the land without borders, and say so.
  const range = useMemo(() => {
    const r = data ? bordersRange(data) : { min: EUROPE_FROM, max: 2019 }
    const first = Math.min(...(pinsQuery.data ?? []).map((p) => Math.floor(p.s)))
    return { min: Number.isFinite(first) ? Math.min(r.min, first) : r.min, max: r.max }
  }, [data, pinsQuery.data])
  // A remembered year or a focused event can fall outside the borders' span.
  useEffect(() => {
    if (data && !pinsQuery.isPending && clampYear(year, range) !== year) setYear(clampYear(year, range))
  }, [data, pinsQuery.isPending, year, range, setYear])
  // State versions can share set, code and start year, so React keys use the unit's position.
  const unitKey = useMemo(() => new Map((data?.units ?? []).map((u, i) => [u, i])), [data])
  const paths = useMemo(() => (data ? data.shapes.map((s) => shapePath(s, data.quantum, K)) : []), [data])
  // Each shape's projected box, for deciding which labels have room.
  const boxes = useMemo(
    () =>
      data
        ? data.shapes.map((rings) => {
            let x0 = Infinity
            let x1 = -Infinity
            let y0 = Infinity
            let y1 = -Infinity
            for (const ring of rings) {
              for (const [lon, lat] of decodeRing(ring, data.quantum)) {
                const [x, y] = equalEarth(lon, lat)
                x0 = Math.min(x0, x)
                x1 = Math.max(x1, x)
                y0 = Math.min(y0, y)
                y1 = Math.max(y1, y)
              }
            }
            return { w: (x1 - x0) * K, h: (y1 - y0) * K }
          })
        : [],
    [data]
  )

  // Fit the world to the stage on first sight.
  const base = width / (EQUAL_EARTH_BOUNDS.width * K)
  const v: View = view ?? { k: 1, tx: width / 2, ty: height / 2 }
  const scale = base * v.k
  const toScreen = (lon: number, lat: number): [number, number] => {
    const [x, y] = equalEarth(lon, lat)
    return [v.tx + x * K * scale, v.ty + y * K * scale]
  }

  const layers = useMemo(() => (data ? layersAt(data, year + 0.5) : null), [data, year])
  // A border unit's state page in this year, when one links to it.
  const polityOf = useMemo(() => {
    const t = year + 0.5
    const list = politiesQuery.data ?? []
    return (u: HistoryMapUnit): HistoryMapPolity | undefined =>
      list.find((p) => p.set === u.set && p.code === u.code && (p.from === null || t >= p.from) && (p.to === null || t < p.to))
  }, [politiesQuery.data, year])
  const linkedStates = useMemo(() => {
    const seen = new Map<string, HistoryMapPolity>()
    for (const u of layers?.states ?? []) {
      const p = polityOf(u)
      if (p && !seen.has(p.ref)) seen.set(p.ref, p)
    }
    return [...seen.values()].sort((a, b) => a.title.localeCompare(b.title))
  }, [layers, polityOf])
  // A hover card belongs to the year it was read in; a pin leaving the window
  // unmounts without a mouseleave.
  useEffect(() => {
    setHoverState(null)
    setHoverPin(null)
  }, [year])
  const pins = useMemo(
    () =>
      (pinsQuery.data ?? [])
        .filter((p) => (p.e ?? p.s) >= year - PIN_WINDOW && p.s <= year + PIN_WINDOW + 1)
        .sort((a, b) => b.prominence - a.prominence),
    [pinsQuery.data, year]
  )
  const density = useMemo(() => {
    const bins = new Map<number, number>()
    for (const p of pinsQuery.data ?? []) bins.set(Math.floor(p.s), (bins.get(Math.floor(p.s)) ?? 0) + 1)
    return bins
  }, [pinsQuery.data])
  const maxDensity = Math.max(1, ...density.values())

  // Play: one year every 450 ms, stopping at the end.
  useEffect(() => {
    if (!playing) return
    const t = setInterval(() => {
      setYear((y) => {
        if (y >= range.max) {
          setPlaying(false)
          return y
        }
        return y + 1
      })
    }, 450)
    return () => clearInterval(t)
  }, [playing, range.max, setYear])

  useEffect(() => {
    if (!focus || focused.current === focus || !width || !pinsQuery.data || !data) return
    const pin = pinsQuery.data.find((p) => p.ref === focus)
    if (!pin) return
    focused.current = focus
    setYear(clampYear(Math.floor(pin.s), range))
    const k = 4
    const [x, y] = equalEarth(pin.lon, pin.lat)
    const sc = (width / (EQUAL_EARTH_BOUNDS.width * K)) * k
    setView({ k, tx: width / 2 - x * K * sc, ty: height / 2 - y * K * sc })
  }, [focus, width, height, pinsQuery.data, data, range, setYear, setView])

  // ---- mouse ----
  const stageRef = useRef<HTMLDivElement | null>(null)
  const viewRef = useRef(v)
  viewRef.current = v
  const zoomAt = (cx: number, cy: number, factor: number): void => {
    const cur = viewRef.current
    const k = Math.min(Math.max(cur.k * factor, 1), 14)
    const f = k / cur.k
    setView({ k, tx: cx - (cx - cur.tx) * f, ty: cy - (cy - cur.ty) * f })
  }
  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const onWheel = (e: WheelEvent): void => {
      const cur = viewRef.current
      // Fully zoomed out and scrolling down: let the page scroll.
      if (!e.ctrlKey && e.deltaY > 0 && cur.k <= 1.001) return
      e.preventDefault()
      const r = el.getBoundingClientRect()
      zoomAt(e.clientX - r.left, e.clientY - r.top, Math.exp(-e.deltaY * (e.deltaMode === 1 ? 0.05 : 0.0018)))
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  })
  const drag = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null)
  // A drag that moved is not a click on the state under the pointer.
  const moved = useRef(false)
  // A single click opens a state's page, but only once a double-click (zoom) is ruled out.
  const openTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => () => {
    if (openTimer.current) clearTimeout(openTimer.current)
  }, [])

  if (borders.isLoading) return <PageStatus>Loading the map…</PageStatus>
  if (!data || !layers) return <PageStatus>The map could not be loaded.</PageStatus>

  const showLabel = (u: HistoryMapUnit): boolean => {
    const b = boxes[u.shape]
    return !!b && b.w * scale > Math.max(56, (polityOf(u)?.title ?? u.name).length * 6.5) && b.h * scale > 18
  }
  const pinSize = (p: HistoryMapPin): number => (p.prominence === 1 ? 12 : p.prominence === 2 ? 9 : 7)

  return (
    <div className="mx-auto max-w-[1600px] p-6">
      <PageHeader
        title="Map"
        subtitle="The world's borders in any year, with each event pinned where its sources place it."
        className="mb-5"
      />
      <div className="history-stage relative overflow-hidden rounded-2xl border border-black/40 shadow-2xl">
        {/* header */}
        <div className="relative z-30 flex flex-wrap items-center gap-3 border-b border-white/[0.06] px-5 py-2.5">
          <span className="hist-display text-3xl font-semibold tabular-nums tracking-tight text-ink">
            {year}
          </span>
          <span className="text-[10px] uppercase tracking-[0.2em] text-ink-muted">
            {layers.states.length} states
            {pinsQuery.isSuccess && ` · ${pins.length} events within ${PIN_WINDOW} years`}
          </span>
          {pinsQuery.isError && (
            <span role="alert" className="flex items-center gap-2 text-xs text-signal-anomaly">
              The events could not be loaded.
              <button type="button" className="underline hover:text-ink" onClick={() => void pinsQuery.refetch()}>
                Retry
              </button>
            </span>
          )}
          <div className="ml-auto flex items-center gap-1 rounded-full border border-white/10 bg-black/40 p-1">
            <MapButton label="Zoom out" onClick={() => zoomAt(width / 2, height / 2, 1 / 1.6)}>
              −
            </MapButton>
            <MapButton label="Zoom in" onClick={() => zoomAt(width / 2, height / 2, 1.6)}>
              +
            </MapButton>
            <MapButton label="Whole world" onClick={() => setView(null)} wide>
              World
            </MapButton>
          </div>
        </div>

        {/* the map */}
        <div
          ref={(el) => {
            hostRef(el)
            stageRef.current = el
          }}
          tabIndex={0}
          aria-label={`Map of ${year}. Arrow keys pan, plus and minus zoom.`}
          className="relative cursor-grab touch-none select-none overflow-hidden active:cursor-grabbing"
          style={{ height }}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return
            const step = 60
            if (e.key === 'ArrowLeft') setView({ ...v, tx: v.tx + step })
            else if (e.key === 'ArrowRight') setView({ ...v, tx: v.tx - step })
            else if (e.key === 'ArrowUp') setView({ ...v, ty: v.ty + step })
            else if (e.key === 'ArrowDown') setView({ ...v, ty: v.ty - step })
            else if (e.key === '+' || e.key === '=') zoomAt(width / 2, height / 2, 1.4)
            else if (e.key === '-') zoomAt(width / 2, height / 2, 1 / 1.4)
            else return
            e.preventDefault()
          }}
          onPointerDown={(e) => {
            if ((e.target as HTMLElement).closest('[data-pin]')) return
            drag.current = { x: e.clientX, y: e.clientY, tx: v.tx, ty: v.ty }
            moved.current = false
            e.currentTarget.setPointerCapture(e.pointerId)
          }}
          onPointerMove={(e) => {
            const d = drag.current
            if (!d) return
            if (Math.abs(e.clientX - d.x) + Math.abs(e.clientY - d.y) > 4) moved.current = true
            else return
            setHoverState(null)
            setView({ k: v.k, tx: d.tx + e.clientX - d.x, ty: d.ty + e.clientY - d.y })
          }}
          onPointerUp={(e) => {
            const wasDrag = moved.current
            drag.current = null
            moved.current = false
            if (wasDrag || (e.target as HTMLElement).closest('[data-pin]')) return
            // Pointer capture retargets events to the stage, so find the state under the pointer.
            const hit = document.elementsFromPoint(e.clientX, e.clientY).find((el) => el instanceof SVGPathElement && el.dataset.state)
            const ref = (hit as SVGPathElement | undefined)?.dataset.state
            const to = ref ? historyPath(ref) : null
            if (!to) return
            if (openTimer.current) clearTimeout(openTimer.current)
            openTimer.current = setTimeout(() => navigate(to), 280)
          }}
          onPointerLeave={() => setHoverState(null)}
          onDoubleClick={(e) => {
            if (openTimer.current) clearTimeout(openTimer.current)
            openTimer.current = null
            if ((e.target as HTMLElement).closest('[data-pin]')) return
            const r = e.currentTarget.getBoundingClientRect()
            zoomAt(e.clientX - r.left, e.clientY - r.top, 2.2)
          }}
        >
          {width > 0 && (
            <svg width={width} height={height} className="absolute inset-0" aria-hidden="true">
              <g transform={`translate(${v.tx} ${v.ty}) scale(${scale})`}>
                <Graticule />
                {layers.silhouette.map((u) => (
                  <path key={`s${unitKey.get(u)}`} d={paths[u.shape]} fill="rgb(255 255 255 / 0.1)" />
                ))}
                {layers.states.map((u) => {
                  const iran = u.code === IRAN_CODE && u.set !== 'europe'
                  const hovered = hoverState?.unit === u
                  const polity = polityOf(u)
                  return (
                    <path
                      key={unitKey.get(u)}
                      d={paths[u.shape]}
                      data-state={polity?.ref}
                      style={polity ? { cursor: 'pointer' } : undefined}
                      fill={iran ? 'rgb(var(--hist-iran) / 0.55)' : `hsl(${stateHue(u.code)} 28% ${hovered ? 40 : 27}%)`}
                      stroke={hovered ? 'rgb(255 255 255 / 0.9)' : 'rgb(255 255 255 / 0.22)'}
                      strokeWidth={hovered ? 1.4 : 0.6}
                      vectorEffect="non-scaling-stroke"
                      onMouseMove={(e) => {
                        if (drag.current) return
                        const r = (e.currentTarget.ownerSVGElement as SVGSVGElement).getBoundingClientRect()
                        setHoverState({ unit: u, x: e.clientX - r.left, y: e.clientY - r.top })
                      }}
                      onMouseLeave={() => setHoverState(null)}
                    />
                  )
                })}
              </g>
            </svg>
          )}

          {/* state names where there is room */}
          {width > 0 &&
            labelled(layers.states.filter(showLabel), (u) => [...toScreen(u.label[0], u.label[1]), (polityOf(u)?.title ?? u.name).length * 7 + 8], (u) => boxes[u.shape]?.w ?? 0).map((u) => {
              const [x, y] = toScreen(u.label[0], u.label[1])
              return (
                <span
                  key={`l-${unitKey.get(u)}`}
                  aria-hidden="true"
                  className="pointer-events-none absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[10px] font-semibold uppercase tracking-[0.14em] text-white/55"
                  style={{ left: x, top: y, textShadow: '0 1px 4px rgb(0 0 0 / 0.9)' }}
                >
                  {polityOf(u)?.title ?? u.name}
                </span>
              )
            })}

          {/* capitals, once zoomed in */}
          {v.k >= 2 &&
            layers.states
              .filter((u) => u.capitalAt)
              .map((u) => {
                const [x, y] = toScreen(u.capitalAt![0], u.capitalAt![1])
                return (
                  <span
                    key={`c-${unitKey.get(u)}`}
                    aria-hidden="true"
                    className="pointer-events-none absolute h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/70 bg-black/60"
                    style={{ left: x, top: y }}
                  />
                )
              })}

          {/* event pins */}
          {width > 0 &&
            pins.map((p) => {
              const [x, y] = toScreen(p.lon, p.lat)
              const fade = Math.max(0.35, 1 - Math.max(0, Math.abs(p.s - year) - 1) / (PIN_WINDOW + 1))
              const src = p.prominence === 1 ? historyImageSrc(p.image, 64) : null
              const size = src ? 26 : pinSize(p)
              const label = `${p.title}, ${Math.floor(p.s)}, ${p.place}`
              return (
                <button
                  key={p.ref}
                  type="button"
                  data-pin
                  aria-label={label}
                  title={label}
                  onClick={() => {
                    const to = historyPath(p.ref)
                    if (to) navigate(to)
                  }}
                  onMouseEnter={(e) => {
                    const host = stageRef.current?.getBoundingClientRect()
                    const b = e.currentTarget.getBoundingClientRect()
                    if (host) setHoverPin({ pin: p, x: b.left + b.width / 2 - host.left, y: b.top - host.top })
                  }}
                  onMouseLeave={() => setHoverPin(null)}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{ ...laneStyle(p.lane), left: x, top: y, opacity: fade }}
                >
                  {p.ref === focus && (
                    <span aria-hidden="true" className="absolute left-1/2 top-1/2 h-11 w-11 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border-2 motion-reduce:animate-none" style={{ borderColor: 'rgb(var(--lane))' }} />
                  )}
                  {src ? (
                    <img src={src} alt="" draggable={false} className="ev-pop ev-glow rounded-full object-cover" style={{ width: size, height: size, border: '2px solid rgb(var(--lane))' }} />
                  ) : (
                    <span className="ev-pop ev-glow block rounded-full" style={{ width: size, height: size, background: 'rgb(var(--lane))' }} />
                  )}
                </button>
              )
            })}

          {hoverState && !hoverPin && (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute z-30 rounded-lg border border-white/10 bg-[rgb(var(--stage-bg-2)/0.95)] px-3 py-2 shadow-xl"
              style={{ left: Math.min(hoverState.x + 14, width - 220), top: hoverState.y + 14 }}
            >
              <p className="text-sm font-semibold text-ink">{polityOf(hoverState.unit)?.title ?? hoverState.unit.name}</p>
              <p className="text-[11px] tabular-nums text-ink-secondary">
                These borders {yearsOf(hoverState.unit.from, hoverState.unit.to)}
              </p>
              {hoverState.unit.capital && <p className="text-[11px] text-ink-muted">Capital: {hoverState.unit.capital}</p>}
              {polityOf(hoverState.unit) && <p className="mt-1 text-[11px] text-accent">Click to open its page</p>}
            </div>
          )}

          {hoverPin && <PinCard pin={hoverPin.pin} x={hoverPin.x} y={hoverPin.y} stageWidth={width} />}

          {layers.noBorders && (
            <p className="pointer-events-none absolute bottom-3 left-4 z-20 max-w-md rounded-lg bg-black/50 px-3 py-1.5 text-xs text-ink-secondary">
              No border data for this year; the land is shown without borders.
            </p>
          )}
          {layers.approximate && (
            <p className="pointer-events-none absolute bottom-3 left-4 z-20 max-w-md rounded-lg bg-black/50 px-3 py-1.5 text-xs text-ink-secondary">
              Before {data.worldFrom}, borders outside Europe{year < EUROPE_FROM ? ' and, before ' + EUROPE_FROM + ', within it' : ''} are approximate atlas outlines
              (Cliopatria); from {data.worldFrom} they follow CShapes.
            </p>
          )}
        </div>

        {linkedStates.length > 0 && (
          <nav aria-label={`States with a page in ${year}`} className="border-t border-white/[0.07] px-5 py-2 text-xs text-ink-secondary">
            <span className="mr-2 text-[10px] uppercase tracking-[0.18em] text-ink-muted">States with a page</span>
            {linkedStates.map((p, i) => (
              <span key={p.ref}>
                {i > 0 && ', '}
                <Link to={historyPath(p.ref) ?? '/history'} className="hover:text-accent">
                  {p.title}
                </Link>
              </span>
            ))}
          </nav>
        )}

        {/* year control */}
        <div className="border-t border-white/[0.07] bg-black/30 px-5 pb-3 pt-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label={playing ? 'Pause' : 'Play through the years'}
              title={playing ? 'Pause' : 'Play through the years'}
              onClick={() => setPlaying((p) => !p)}
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105"
            >
              {playing ? <PauseIcon className="h-4 w-4" /> : <PlayIcon className="h-4 w-4" />}
            </button>
            <div className="relative min-w-0 flex-1">
              {/* where events cluster */}
              <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-5 h-6">
                {[...density.entries()].map(([y, n]) =>
                  y >= range.min && y <= range.max ? (
                    <span
                      key={y}
                      className="absolute bottom-0 w-[2px] rounded-full bg-white/30"
                      style={{ left: `${((y - range.min) / (range.max - range.min)) * 100}%`, height: 3 + (n / maxDensity) * 20 }}
                    />
                  ) : null
                )}
              </div>
              <input
                type="range"
                min={range.min}
                max={range.max}
                step={1}
                value={year}
                aria-label="Year"
                aria-valuetext={String(year)}
                onChange={(e) => {
                  setPlaying(false)
                  setYear(Number(e.target.value))
                }}
                className="relative mt-6 w-full accent-white"
              />
              <div className="mt-0.5 flex justify-between text-[10px] tabular-nums text-ink-muted" aria-hidden="true">
                <span>{range.min}</span>
                <span>{data.worldFrom}</span>
                <span>{range.max}</span>
              </div>
            </div>
          </div>
          <p className="mt-2 text-xs text-ink-muted">
            Scroll to zoom · drag to move · double-click to dive in · click a pin to open the event, or a state to open its page.{' '}
            <button type="button" className="underline decoration-dotted hover:text-ink" onClick={() => void api.app.openExternal(data.url)}>
              Borders: CShapes 2.0 and CShapes-Europe (ETH Zürich), CC BY-NC-SA 4.0
            </button>
            {data.earlyUrl && (
              <>
                {' · '}
                <button type="button" className="underline decoration-dotted hover:text-ink" onClick={() => void api.app.openExternal(data.earlyUrl!)}>
                  before 1886: Cliopatria (Seshat Global History Databank, Bennett et al. 2025), CC BY 4.0, simplified
                </button>
              </>
            )}
            {' · '}place positions: Natural Earth (public domain) and GeoNames (CC BY 4.0).
          </p>
        </div>
      </div>
    </div>
  )
}

/** Names that do not overlap a larger state's name, largest states first. */
function labelled<T>(units: T[], at: (u: T) => [number, number, number], size: (u: T) => number): T[] {
  const placed: Array<[number, number, number, number]> = []
  const out: T[] = []
  for (const u of [...units].sort((a, b) => size(b) - size(a))) {
    const [x, y, w] = at(u)
    const box: [number, number, number, number] = [x - w / 2, y - 8, x + w / 2, y + 8]
    if (placed.some((p) => box[0] < p[2] && p[0] < box[2] && box[1] < p[3] && p[1] < box[3])) continue
    placed.push(box)
    out.push(u)
  }
  return out
}

function MapButton({ label, onClick, children, wide }: { label: string; onClick: () => void; children: ReactNode; wide?: boolean }) {
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

function Graticule() {
  const lines: string[] = []
  for (let lon = -180; lon <= 180; lon += 30) {
    let d = ''
    for (let lat = -90; lat <= 90; lat += 5) {
      const [x, y] = equalEarth(lon, lat)
      d += `${lat === -90 ? 'M' : 'L'}${(x * K).toFixed(1)} ${(y * K).toFixed(1)}`
    }
    lines.push(d)
  }
  for (let lat = -60; lat <= 60; lat += 30) {
    let d = ''
    for (let lon = -180; lon <= 180; lon += 10) {
      const [x, y] = equalEarth(lon, lat)
      d += `${lon === -180 ? 'M' : 'L'}${(x * K).toFixed(1)} ${(y * K).toFixed(1)}`
    }
    lines.push(d)
  }
  return (
    <g>
      {lines.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="rgb(255 255 255 / 0.05)" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />
      ))}
    </g>
  )
}

function PinCard({ pin, x, y, stageWidth }: { pin: HistoryMapPin; x: number; y: number; stageWidth: number }) {
  const src = historyImageSrc(pin.image, 480)
  const W = 250
  const left = Math.min(Math.max(x - W / 2, 8), Math.max(stageWidth - W - 8, 8))
  const above = y > 260
  return (
    <div
      aria-hidden="true"
      className="hover-card pointer-events-none absolute z-40 overflow-hidden rounded-xl border border-white/10 bg-[rgb(var(--stage-bg-2)/0.96)] shadow-2xl"
      style={{ ...laneStyle(pin.lane), left, width: W, ...(above ? { top: y - 10, transform: 'translateY(-100%)' } : { top: y + 22 }) }}
    >
      {src && <img src={src} alt="" className="h-28 w-full object-cover" />}
      <div className="h-0.5" style={{ background: 'linear-gradient(90deg, rgb(var(--lane)), transparent)' }} />
      <div className="p-3">
        <p className="text-[10px] font-semibold uppercase tracking-[0.18em]" style={{ color: 'rgb(var(--lane))' }}>
          {pin.typeLabel} · {regionLabel(pin.lane)}
        </p>
        <p className="mt-1 hist-display text-base font-semibold leading-snug text-ink">{pin.title}</p>
        {pin.native && (
          <p className="mt-0.5 text-sm text-ink-secondary" dir="auto">
            {pin.native}
          </p>
        )}
        <p className="mt-1.5 text-xs tabular-nums text-ink-secondary">
          {Math.floor(pin.s)}
          {pin.e !== null && Math.floor(pin.e - 1e-6) > Math.floor(pin.s) ? ` to ${Math.floor(pin.e - 1e-6)}` : ''} · {pin.place}
        </p>
      </div>
    </div>
  )
}
