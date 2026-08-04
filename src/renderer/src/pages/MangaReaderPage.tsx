import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useReaderSource } from '../lib/readerSource'
import { readerPath } from '../lib/readerPath'
import OcrOverlay from '../components/reader/OcrOverlay'
import MiningPanel from '../components/reader/MiningPanel'
import BarButton from '../components/reader/BarButton'
import ShortcutHelp from '../components/reader/ShortcutHelp'
import { PopoverRow, PopoverOption } from '../components/reader/BookSettingsPopover'
import type { MangaChapter, MokuroBlock } from '@shared/types'

// Immersive local manga reader (routed chrome-free from App.tsx).
// Modes: single page, double spread (with cover offset + landscape pages shown
// alone), vertical/webtoon scroll. Right-to-left by default, as manga reads.
// Mokuro OCR sidecars (if present) overlay tappable text; tapping opens the
// mining panel (tokenize → Jisho → save to SRS with this manga as source).

type Mode = 'single' | 'double' | 'vertical'
type Fit = 'height' | 'width' | 'original'
type Direction = 'rtl' | 'ltr'

interface ReaderPrefs {
  mode: Mode
  fit: Fit
  direction: Direction
  coverOffset: boolean
  zoom: number
}

const PREFS_KEY = 'manga.readerPrefs'
const DEFAULTS: ReaderPrefs = {
  mode: 'single',
  fit: 'height',
  direction: 'rtl',
  coverOffset: true,
  zoom: 1
}

function loadPrefs(): ReaderPrefs {
  try {
    return { ...DEFAULTS, ...JSON.parse(localStorage.getItem(PREFS_KEY) ?? '{}') }
  } catch {
    return DEFAULTS
  }
}

const FIT_CYCLE: Fit[] = ['height', 'width', 'original']

const SHORTCUTS = [
  { keys: ['←', '→'], label: 'Turn page (direction-aware)' },
  { keys: ['Space'], label: 'Next page (Shift = previous)' },
  { keys: ['Home', 'End'], label: 'First / last page' },
  { keys: ['S', 'D', 'V'], label: 'Single / double / scroll mode' },
  { keys: ['F'], label: 'Cycle fit: height, width, original' },
  { keys: ['R'], label: 'Reading direction RTL ↔ LTR' },
  { keys: ['C'], label: 'Cover page alone (double mode)' },
  { keys: ['O'], label: 'OCR overlay on/off' },
  { keys: ['M'], label: 'Mine words (tap a speech bubble)' },
  { keys: ['+', '−', '0'], label: 'Zoom in / out / reset' },
  { keys: ['Esc'], label: 'Close panels / back to series' }
]

export default function MangaReaderPage() {
  const { doc, library, chapterId, mediaId, adhoc } = useReaderSource()
  const navigate = useNavigate()
  const location = useLocation()
  const qc = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()

  const { data: ocrStatus } = useQuery({
    queryKey: qk.manga.ocrStatus(chapterId),
    queryFn: () => api.manga.ocrStatus(chapterId),
    // Mokuro sidecars are found via the chapter row; an ad-hoc file has none.
    enabled: !adhoc,
    staleTime: 60_000
  })

  const pages = doc?.pages ?? []
  const pageCount = pages.length
  const chapters = library?.chapters ?? []
  const chIndex = chapters.findIndex((c) => c.id === chapterId)
  const chapter: MangaChapter | undefined = chapters[chIndex]
  const prevChapter = chIndex > 0 ? chapters[chIndex - 1] : null
  const nextChapter = chIndex >= 0 && chIndex < chapters.length - 1 ? chapters[chIndex + 1] : null

  // ---- prefs ----
  const [prefs, setPrefs] = useState<ReaderPrefs>(loadPrefs)
  const setPref = useCallback(<K extends keyof ReaderPrefs>(k: K, v: ReaderPrefs[K]) => {
    setPrefs((p) => {
      const next = { ...p, [k]: v }
      localStorage.setItem(PREFS_KEY, JSON.stringify(next))
      return next
    })
  }, [])
  const { mode, fit, direction, coverOffset, zoom } = prefs

  // ---- current page ----
  const [page, setPage] = useState(0)
  const [showEnd, setShowEnd] = useState(false)
  const initRef = useRef<number | null>(null)

  // Initialize once per chapter: ?page= wins (refresh restores the exact spot),
  // else resume from the saved last-read page.
  useEffect(() => {
    if (!doc || !library || initRef.current === chapterId) return
    initRef.current = chapterId
    const raw = searchParams.get('page')
    const fromUrl = raw != null ? Number(raw) : NaN
    const start = Number.isFinite(fromUrl) ? fromUrl : (chapter?.lastReadPage ?? 0)
    setPage(Math.min(Math.max(0, start), Math.max(0, doc.pages.length - 1)))
    setShowEnd(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, library, chapterId])

  useEffect(() => {
    setSearchParams({ page: String(page) }, { replace: true })
  }, [page, setSearchParams])

  // ---- natural sizes (drive double-spread pairing + vertical placeholders) ----
  const naturalsRef = useRef(new Map<number, { w: number; h: number }>())
  const [naturalsVersion, setNaturalsVersion] = useState(0)
  const onNatural = useCallback((index: number, w: number, h: number) => {
    const cur = naturalsRef.current.get(index)
    if (cur && cur.w === w && cur.h === h) return
    naturalsRef.current.set(index, { w, h })
    setNaturalsVersion((v) => v + 1)
  }, [])
  useEffect(() => {
    naturalsRef.current.clear()
  }, [chapterId])

  // Double mode: pair pages into spreads. The cover sits alone (offset), and a
  // landscape page (already a spread) always renders alone.
  const spreads = useMemo(() => {
    const isWide = (i: number) => {
      const n = naturalsRef.current.get(i)
      return !!n && n.w > n.h
    }
    const out: number[][] = []
    let i = 0
    if (coverOffset && pageCount > 0) {
      out.push([0])
      i = 1
    }
    while (i < pageCount) {
      if (isWide(i) || i + 1 >= pageCount || isWide(i + 1)) {
        out.push([i])
        i += 1
      } else {
        out.push([i, i + 1])
        i += 2
      }
    }
    return out
    // naturalsVersion re-pairs as image dimensions arrive
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageCount, coverOffset, naturalsVersion])

  const spreadIndex = Math.max(
    0,
    spreads.findIndex((s) => s.includes(page))
  )
  const visiblePages = mode === 'double' ? (spreads[spreadIndex] ?? [page]) : [page]

  // ---- vertical mode plumbing ----
  const viewportRef = useRef<HTMLDivElement>(null)
  const blockRefs = useRef(new Map<number, HTMLDivElement>())
  const suppressObserverRef = useRef(false)

  const scrollToPage = useCallback((i: number) => {
    suppressObserverRef.current = true
    blockRefs.current.get(i)?.scrollIntoView({ block: 'start' })
    setTimeout(() => (suppressObserverRef.current = false), 200)
  }, [])

  useEffect(() => {
    if (mode !== 'vertical' || pageCount === 0) return
    const root = viewportRef.current
    if (!root) return
    // Track the page crossing the vertical middle of the viewport.
    const io = new IntersectionObserver(
      (entries) => {
        if (suppressObserverRef.current) return
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const idx = Number((e.target as HTMLElement).dataset.index)
          if (Number.isFinite(idx)) setPage(idx)
        }
      },
      { root, rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    )
    for (const el of blockRefs.current.values()) io.observe(el)
    return () => io.disconnect()
  }, [mode, pageCount, chapterId])

  // Entering vertical mode: jump to the current page's block.
  useEffect(() => {
    if (mode === 'vertical') requestAnimationFrame(() => scrollToPage(page))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode, chapterId])

  // ---- zoom (Ctrl+scroll, +/-/0, bar buttons) ----
  // Implemented by scaling the fit-size constraints (not CSS transforms), so
  // the overflowing page pans via normal scrolling and the OCR overlay's
  // percentage layout stays exact. Lives in ReaderPrefs so it survives
  // sessions like mode/fit/direction do.
  const zoomBy = useCallback((factor: number) => {
    setPrefs((p) => {
      const z = Math.min(4, Math.max(0.5, Math.round(p.zoom * factor * 100) / 100))
      const next = { ...p, zoom: z }
      localStorage.setItem(PREFS_KEY, JSON.stringify(next))
      return next
    })
  }, [])

  // ---- navigation ----
  const gotoPage = useCallback(
    (i: number) => {
      const clamped = Math.min(Math.max(0, i), pageCount - 1)
      setPage(clamped)
      setShowEnd(false)
      if (mode === 'vertical') scrollToPage(clamped)
    },
    [pageCount, mode, scrollToPage]
  )

  const goNext = useCallback(() => {
    if (mode === 'vertical') {
      viewportRef.current?.scrollBy({ top: viewportRef.current.clientHeight * 0.85, behavior: 'smooth' })
      return
    }
    if (mode === 'double') {
      if (spreadIndex < spreads.length - 1) gotoPage(spreads[spreadIndex + 1][0])
      else setShowEnd(true)
      return
    }
    if (page < pageCount - 1) gotoPage(page + 1)
    else setShowEnd(true)
  }, [mode, page, pageCount, spreadIndex, spreads, gotoPage])

  const goPrev = useCallback(() => {
    setShowEnd(false)
    if (mode === 'vertical') {
      viewportRef.current?.scrollBy({ top: -viewportRef.current!.clientHeight * 0.85, behavior: 'smooth' })
      return
    }
    if (mode === 'double') {
      if (spreadIndex > 0) gotoPage(spreads[spreadIndex - 1][0])
      return
    }
    if (page > 0) gotoPage(page - 1)
  }, [mode, page, spreadIndex, spreads, gotoPage])

  // Leaving the reader must unwind history, not push the detail page again —
  // otherwise detail's own "← Back" (navigate(-1)) bounces straight back here.
  // The reader is only ever entered from the detail page, so -1 is the detail
  // page; the location.key check covers a deep link / refresh with no history.
  // The same reader serves /manga and /books routes (a books folder can hold
  // CBZ volumes); the URL says which section exits and switches stay inside.
  const basePath = location.pathname.startsWith('/books') ? ('/books' as const) : ('/manga' as const)

  const exitToDetail = useCallback(() => {
    if (location.key !== 'default') navigate(-1)
    // An ad-hoc archive has no series page to go back to.
    else navigate(adhoc ? '/' : `${basePath}/${mediaId}`)
  }, [navigate, mediaId, location.key, basePath])

  const goToChapter = useCallback(
    (ch: MangaChapter) => {
      initRef.current = null
      naturalsRef.current.clear()
      setShowEnd(false)
      // replace: a whole reading session stays ONE history entry, so exiting
      // lands on the detail page no matter how many chapters were read.
      // readerPath routes EPUB volumes into the book reader (mixed series).
      navigate(`${readerPath(basePath, mediaId, ch)}?page=0`, { replace: true })
    },
    [navigate, mediaId, basePath]
  )

  // ---- mining panel + OCR overlay state ----
  const [panelOpen, setPanelOpen] = useState(false)
  const [overlayOn, setOverlayOn] = useState(true)
  const [blockText, setBlockText] = useState<string | null>(null)
  const [selectedTerm, setSelectedTerm] = useState<string | null>(null)

  const onBlockTap = useCallback((b: MokuroBlock) => {
    setBlockText(b.lines.join(''))
    setSelectedTerm(null)
    setPanelOpen(true)
  }, [])
  const onTextSelect = useCallback((text: string) => {
    setSelectedTerm(text)
    setPanelOpen(true)
  }, [])

  // Warm the kuromoji dictionary while the user reads the first page, so the
  // first block tap tokenizes instantly.
  useEffect(() => {
    if (ocrStatus?.hasOcr) void api.japanese.tokenize('。')
  }, [ocrStatus?.hasOcr])

  // Prefetch OCR for the neighbour pages (staleTime ∞, cached in main too).
  useEffect(() => {
    if (!ocrStatus?.hasOcr) return
    for (const i of [page + 1, page - 1]) {
      if (i < 0 || i >= pageCount) continue
      void qc.prefetchQuery({
        queryKey: qk.manga.ocrPage(chapterId, i),
        queryFn: () => api.manga.ocrPage(chapterId, i),
        staleTime: Infinity
      })
    }
  }, [page, pageCount, chapterId, ocrStatus?.hasOcr, qc])

  // ---- image preloading (next 3, prev 1) ----
  useEffect(() => {
    for (const off of [1, 2, 3, -1]) {
      const p = pages[page + off]
      if (p) new Image().src = p.url
    }
  }, [page, pages])

  // ---- progress autosave (debounced, flushed on unmount/chapter change) ----
  const saveRef = useRef<{ chapterId: number; page: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!doc) return
    saveRef.current = { chapterId, page }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const s = saveRef.current
      if (s && s.chapterId > 0) void api.manga.markProgress(s.chapterId, s.page)
      saveRef.current = null
    }, 800)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [page, chapterId, doc])
  useEffect(() => {
    return () => {
      const s = saveRef.current
      if (s && s.chapterId > 0) void api.manga.markProgress(s.chapterId, s.page)
      qc.invalidateQueries({ queryKey: qk.manga.all })
      qc.invalidateQueries({ queryKey: qk.media.detail(mediaId) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---- chapter-jump popover (bottom bar) ----
  const [chapterListOpen, setChapterListOpen] = useState(false)
  const chapterListOpenRef = useRef(false)
  chapterListOpenRef.current = chapterListOpen
  const [settingsOpen, setSettingsOpen] = useState(false)
  const settingsOpenRef = useRef(false)
  settingsOpenRef.current = settingsOpen
  const [helpOpen, setHelpOpen] = useState(false)

  // ---- auto-hiding bars ----
  const [barsVisible, setBarsVisible] = useState(true)
  const barsTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pokeBar = useCallback(() => {
    setBarsVisible(true)
    if (barsTimer.current) clearTimeout(barsTimer.current)
    barsTimer.current = setTimeout(() => {
      // Never hide the bar under an open chapter list or settings popover.
      if (!chapterListOpenRef.current && !settingsOpenRef.current) setBarsVisible(false)
    }, 2500)
  }, [])
  useEffect(() => {
    pokeBar()
    return () => {
      if (barsTimer.current) clearTimeout(barsTimer.current)
    }
  }, [pokeBar])

  // ---- keyboard ----
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      switch (e.key) {
        case 'ArrowRight':
          direction === 'rtl' ? goPrev() : goNext()
          break
        case 'ArrowLeft':
          direction === 'rtl' ? goNext() : goPrev()
          break
        case ' ':
        case 'PageDown':
          e.preventDefault()
          e.shiftKey ? goPrev() : goNext()
          break
        case 'PageUp':
          e.preventDefault()
          goPrev()
          break
        case 'ArrowDown':
          if (mode === 'vertical') {
            e.preventDefault()
            viewportRef.current?.scrollBy({ top: 120 })
          }
          break
        case 'ArrowUp':
          if (mode === 'vertical') {
            e.preventDefault()
            viewportRef.current?.scrollBy({ top: -120 })
          }
          break
        case 'Home':
          gotoPage(0)
          break
        case 'End':
          gotoPage(pageCount - 1)
          break
        case 's':
          setPref('mode', 'single')
          break
        case 'd':
          setPref('mode', 'double')
          break
        case 'v':
          setPref('mode', 'vertical')
          break
        case 'f':
          setPref('fit', FIT_CYCLE[(FIT_CYCLE.indexOf(fit) + 1) % FIT_CYCLE.length])
          break
        case 'r':
          setPref('direction', direction === 'rtl' ? 'ltr' : 'rtl')
          break
        case 'c':
          setPref('coverOffset', !coverOffset)
          break
        case 'o':
          setOverlayOn((v) => !v)
          break
        case 'm':
          setPanelOpen((v) => !v)
          break
        case '?':
          setHelpOpen((v) => !v)
          break
        case '+':
        case '=':
          zoomBy(1.25)
          break
        case '-':
        case '_':
          zoomBy(1 / 1.25)
          break
        case '0':
          setPref('zoom', 1)
          break
        case 'Escape':
        case 'Backspace':
          if (helpOpen) setHelpOpen(false)
          else if (chapterListOpen) setChapterListOpen(false)
          else if (settingsOpen) setSettingsOpen(false)
          else if (showEnd) setShowEnd(false)
          else if (panelOpen) setPanelOpen(false)
          else exitToDetail()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [direction, fit, coverOffset, mode, goNext, goPrev, gotoPage, pageCount, panelOpen, showEnd, chapterListOpen, settingsOpen, helpOpen, setPref, exitToDetail, zoomBy])

  // ---- click zones (single/double): edges turn pages, centre toggles bars ----
  function onViewportClick(e: React.MouseEvent) {
    const dragged = dragRef.current?.moved
    dragRef.current = null
    if (dragged) return
    if (mode === 'vertical') {
      pokeBar()
      return
    }
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width
    if (x < 0.3) direction === 'rtl' ? goNext() : goPrev()
    else if (x > 0.7) direction === 'rtl' ? goPrev() : goNext()
    else pokeBar()
  }

  // ---- viewport size (drives fit-mode pixel constraints) ----
  const [vp, setVp] = useState({ w: 0, h: 0 })
  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setVp({ w: el.clientWidth, h: el.clientHeight }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [panelOpen])

  useEffect(() => {
    const el = viewportRef.current
    if (!el) return
    const onWheel = (e: WheelEvent) => {
      if (!e.ctrlKey) return
      e.preventDefault()
      zoomBy(e.deltaY < 0 ? 1.1 : 1 / 1.1)
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mode])

  // Fresh page → back to the top edge (matters when zoomed in).
  useEffect(() => {
    if (mode !== 'vertical') viewportRef.current?.scrollTo(0, 0)
  }, [page, mode])

  // Drag-to-pan; a drag past the threshold swallows the click so it doesn't
  // turn the page. Overlay text blocks stopPropagation on mousedown, so drags
  // there still select text instead of panning.
  const dragRef = useRef<{ x: number; y: number; sl: number; st: number; moved: boolean } | null>(null)
  function onPanStart(e: React.MouseEvent) {
    if (e.button !== 0) return
    const el = viewportRef.current
    if (!el) return
    dragRef.current = { x: e.clientX, y: e.clientY, sl: el.scrollLeft, st: el.scrollTop, moved: false }
  }
  function onPanMove(e: React.MouseEvent) {
    const d = dragRef.current
    const el = viewportRef.current
    if (!d || !el || e.buttons !== 1) return
    const dx = e.clientX - d.x
    const dy = e.clientY - d.y
    if (Math.abs(dx) + Math.abs(dy) > 5) d.moved = true
    if (d.moved) {
      el.scrollLeft = d.sl - dx
      el.scrollTop = d.st - dy
    }
  }

  if (!doc || !library) {
    return <div className="h-screen bg-black text-gray-500 flex items-center justify-center">Loading…</div>
  }
  if (pageCount === 0) {
    return (
      <div className="h-screen bg-black text-gray-500 flex flex-col items-center justify-center gap-3">
        <p>No pages found in this chapter's folder.</p>
        <button className="btn-ghost" onClick={exitToDetail}>← Back</button>
      </div>
    )
  }

  const perPageWidth = mode === 'double' ? Math.floor(vp.w / 2) : vp.w
  const imgStyle = (index: number): React.CSSProperties => {
    if (fit === 'height') {
      return {
        maxHeight: vp.h ? vp.h * zoom : undefined,
        maxWidth: perPageWidth ? perPageWidth * zoom : undefined,
        objectFit: 'contain'
      }
    }
    if (fit === 'width') return { width: perPageWidth ? perPageWidth * zoom : undefined, height: 'auto' }
    // original: natural size × zoom once the image has reported its dimensions
    const nat = naturalsRef.current.get(index)
    return nat && zoom !== 1 ? { width: nat.w * zoom } : {}
  }

  const barCls = `absolute left-0 right-0 z-20 bg-base-900/90 backdrop-blur border-base-800 px-4 py-2 flex items-center gap-3 transition-opacity duration-300 motion-reduce:transition-none ${
    barsVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'
  }`

  return (
    <div className="h-screen bg-black flex" onMouseMove={pokeBar}>
      {/* main reading column */}
      <div className="relative flex-1 min-w-0 flex flex-col">
        {/* top bar */}
        <div className={`${barCls} top-0 border-b`}>
          <button className="btn-ghost py-1 px-3 text-sm" onClick={exitToDetail}>
            ← Back
          </button>
          <div className="min-w-0 flex-1 text-sm text-gray-300 truncate">
            {doc.title}
            {ocrStatus?.hasOcr && (
              <span
                className={`chip ml-2 text-[10px] px-1.5 py-0.5 ${
                  overlayOn ? 'bg-accent/20 text-accent' : 'bg-base-700 text-gray-500'
                }`}
                title={`OCR: ${ocrStatus.matchedPages}/${ocrStatus.totalPages} pages (O toggles)`}
              >
                OCR
              </span>
            )}
          </div>
          <span className="text-sm text-gray-400 shrink-0">
            {page + 1} / {pageCount}
          </span>
        </div>

        {/* pages */}
        {mode !== 'vertical' ? (
          <div
            ref={viewportRef}
            className={`flex-1 min-h-0 overflow-auto flex ${zoom > 1 ? 'cursor-grab active:cursor-grabbing' : ''}`}
            onClick={onViewportClick}
            onMouseDown={onPanStart}
            onMouseMove={onPanMove}
          >
            {/* m-auto (not justify-center) so an overflowing zoomed page can
                scroll to every edge instead of clipping one side. gap-0: a
                double spread's artwork joins across the seam. */}
            <div
              className={`m-auto flex items-center justify-center ${
                mode === 'double' && direction === 'rtl' ? 'flex-row-reverse' : ''
              }`}
            >
              {visiblePages.map((i) => (
                <PageView
                  key={`${chapterId}-${i}`}
                  chapterId={chapterId}
                  index={i}
                  url={pages[i].url}
                  style={imgStyle(i)}
                  hasOcr={!!ocrStatus?.hasOcr}
                  overlayOn={overlayOn}
                  onBlockTap={onBlockTap}
                  onTextSelect={onTextSelect}
                  onNatural={onNatural}
                />
              ))}
            </div>
          </div>
        ) : (
          <div
            ref={viewportRef}
            className="flex-1 min-h-0 overflow-auto"
            onClick={onViewportClick}
            onMouseDown={onPanStart}
            onMouseMove={onPanMove}
          >
            <div
              className="mx-auto"
              style={{
                width: fit === 'width' ? `${100 * zoom}%` : `min(${48 * zoom}rem, ${100 * zoom}%)`
              }}
            >
              {pages.map((p, i) => (
                <VerticalBlock
                  key={`${chapterId}-${i}`}
                  index={i}
                  nearPage={page}
                  natural={naturalsRef.current.get(i) ?? null}
                  register={(el) => {
                    if (el) blockRefs.current.set(i, el)
                    else blockRefs.current.delete(i)
                  }}
                >
                  <PageView
                    chapterId={chapterId}
                    index={i}
                    url={p.url}
                    style={{ width: '100%', height: 'auto' }}
                    hasOcr={!!ocrStatus?.hasOcr}
                    overlayOn={overlayOn}
                    onBlockTap={onBlockTap}
                    onTextSelect={onTextSelect}
                    onNatural={onNatural}
                  />
                </VerticalBlock>
              ))}
            </div>
          </div>
        )}

        {/* end-of-chapter card */}
        {showEnd && (
          <div className="absolute inset-0 z-30 bg-black/70 flex items-center justify-center" onClick={() => setShowEnd(false)}>
            <div className="card p-6 text-center space-y-4" onClick={(e) => e.stopPropagation()}>
              <p className="text-lg text-gray-200">End of {doc.title}</p>
              {chapters.length > 1 && chIndex >= 0 && (
                <p className="text-xs text-gray-500">
                  Chapter {chIndex + 1} of {chapters.length}
                </p>
              )}
              <div className="flex items-center justify-center gap-2">
                {nextChapter && (
                  <button className="btn-primary" onClick={() => goToChapter(nextChapter)}>
                    Next: {nextChapter.title} →
                  </button>
                )}
                <button className="btn-ghost" onClick={exitToDetail}>
                  Back to series
                </button>
              </div>
            </div>
          </div>
        )}

        {/* bottom bar */}
        <div className={`${barCls} bottom-0 border-t`}>
          <button
            className="btn-ghost py-1 px-2 text-xs"
            disabled={!prevChapter}
            onClick={() => prevChapter && goToChapter(prevChapter)}
            title="Previous chapter"
            aria-label="Previous chapter"
          >
            ⏮
          </button>
          <button
            className="max-w-48 shrink-0 truncate text-xs text-gray-400 hover:text-white"
            title="Jump to chapter"
            aria-label="Jump to chapter"
            aria-expanded={chapterListOpen}
            onClick={() => {
              setChapterListOpen((v) => !v)
              pokeBar()
            }}
          >
            {chapter?.title ?? 'Chapter'} ▾
          </button>
          {chapterListOpen && (
            <ChapterListPopover
              chapters={chapters}
              currentId={chapterId}
              onPick={(c) => {
                setChapterListOpen(false)
                if (c.id !== chapterId) goToChapter(c)
              }}
              onClose={() => setChapterListOpen(false)}
            />
          )}
          <input
            type="range"
            min={0}
            max={Math.max(0, pageCount - 1)}
            value={page}
            onChange={(e) => gotoPage(Number(e.target.value))}
            className="flex-1 accent-accent"
            style={{ direction: direction === 'rtl' && mode !== 'vertical' ? 'rtl' : 'ltr' }}
            aria-label="Page"
          />
          <button
            className="btn-ghost py-1 px-2 text-xs"
            disabled={!nextChapter}
            onClick={() => nextChapter && goToChapter(nextChapter)}
            title="Next chapter"
            aria-label="Next chapter"
          >
            ⏭
          </button>
          <div className="relative flex items-center gap-1 shrink-0 text-xs">
            <BarButton label="−" title="Zoom out (-)" onClick={() => zoomBy(1 / 1.25)} />
            <button
              className={`w-11 text-center text-xs ${zoom !== 1 ? 'text-accent' : 'text-gray-500'} hover:text-gray-200`}
              title="Reset zoom (0) · Ctrl+scroll to zoom"
              aria-label="Reset zoom"
              onClick={() => setPref('zoom', 1)}
            >
              {Math.round(zoom * 100)}%
            </button>
            <BarButton label="+" title="Zoom in (+, Ctrl+scroll)" onClick={() => zoomBy(1.25)} />
            <span className="w-px h-4 bg-base-700 mx-1" />
            <BarButton
              label={mode === 'single' ? 'Single' : mode === 'double' ? 'Double' : 'Scroll'}
              active={settingsOpen}
              title="Display settings — mode, fit, direction"
              onClick={() => {
                setSettingsOpen((v) => !v)
                pokeBar()
              }}
            />
            {settingsOpen && (
              <DisplayPopover
                mode={mode}
                fit={fit}
                direction={direction}
                coverOffset={coverOffset}
                setPref={setPref}
                onClose={() => setSettingsOpen(false)}
              />
            )}
            <BarButton label="⛏" active={panelOpen} title="Mine words (M)" onClick={() => setPanelOpen((v) => !v)} />
            <BarButton label="?" title="Keyboard shortcuts (?)" onClick={() => setHelpOpen(true)} />
          </div>
        </div>

        {helpOpen && (
          <ShortcutHelp title="Reader shortcuts" rows={SHORTCUTS} onClose={() => setHelpOpen(false)} />
        )}
      </div>

      {/* mining panel */}
      {panelOpen && (
        <MiningPanel
          mediaId={mediaId}
          blockText={blockText}
          initialTerm={selectedTerm}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </div>
  )
}

// Chapter jump list, anchored above the bottom bar (QueuePanel pattern):
// read state per row, current chapter highlighted + scrolled into view.
function ChapterListPopover({
  chapters,
  currentId,
  onPick,
  onClose
}: {
  chapters: MangaChapter[]
  currentId: number
  onPick: (c: MangaChapter) => void
  onClose: () => void
}) {
  const currentRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <>
      {/* click-away backdrop */}
      <div className="fixed inset-0 z-20" onMouseDown={onClose} />
      <div className="absolute bottom-full left-4 z-30 mb-2 max-h-96 w-80 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-base-700 bg-base-800 py-1 shadow-xl shadow-black/40">
        {chapters.map((c) => {
          const current = c.id === currentId
          const progress =
            c.readAt != null
              ? '✓'
              : c.lastReadPage != null
                ? `${c.lastReadPage + 1}/${c.pageCount}`
                : ''
          return (
            <button
              key={c.id}
              ref={current ? currentRef : undefined}
              className={`flex w-full items-center gap-3 px-3 py-1.5 text-left text-sm hover:bg-base-700 ${
                current ? 'bg-base-700/60 text-accent' : 'text-gray-300'
              }`}
              onClick={() => onPick(c)}
            >
              <span className="min-w-0 flex-1 truncate">{c.title}</span>
              <span
                className={`shrink-0 text-xs ${c.readAt != null ? 'text-accent' : 'text-gray-500'}`}
              >
                {progress}
              </span>
            </button>
          )
        })}
      </div>
    </>
  )
}

// Display settings popover (BookSettingsPopover's manga sibling): labelled
// segmented rows for what used to be five cryptic letter/arrow buttons.
function DisplayPopover({
  mode,
  fit,
  direction,
  coverOffset,
  setPref,
  onClose
}: {
  mode: Mode
  fit: Fit
  direction: Direction
  coverOffset: boolean
  setPref: <K extends keyof ReaderPrefs>(k: K, v: ReaderPrefs[K]) => void
  onClose: () => void
}) {
  return (
    <>
      <div className="fixed inset-0 z-20" onMouseDown={onClose} />
      <div className="absolute bottom-full right-0 z-30 mb-2 w-72 max-w-[calc(100vw-2rem)] space-y-3 rounded-lg border border-base-700 bg-base-900/95 p-3 shadow-xl shadow-black/40 backdrop-blur">
        <PopoverRow label="Mode">
          <PopoverOption active={mode === 'single'} title="S" onClick={() => setPref('mode', 'single')}>
            Single
          </PopoverOption>
          <PopoverOption active={mode === 'double'} title="D" onClick={() => setPref('mode', 'double')}>
            Double
          </PopoverOption>
          <PopoverOption active={mode === 'vertical'} title="V" onClick={() => setPref('mode', 'vertical')}>
            Scroll
          </PopoverOption>
        </PopoverRow>
        <PopoverRow label="Fit">
          <PopoverOption active={fit === 'height'} title="F cycles" onClick={() => setPref('fit', 'height')}>
            Height
          </PopoverOption>
          <PopoverOption active={fit === 'width'} title="F cycles" onClick={() => setPref('fit', 'width')}>
            Width
          </PopoverOption>
          <PopoverOption active={fit === 'original'} title="F cycles" onClick={() => setPref('fit', 'original')}>
            Original
          </PopoverOption>
        </PopoverRow>
        <PopoverRow label="Direction">
          <PopoverOption active={direction === 'rtl'} title="R toggles" onClick={() => setPref('direction', 'rtl')}>
            ← Right to left
          </PopoverOption>
          <PopoverOption active={direction === 'ltr'} title="R toggles" onClick={() => setPref('direction', 'ltr')}>
            Left to right →
          </PopoverOption>
        </PopoverRow>
        {mode === 'double' && (
          <PopoverRow label="Spreads">
            <PopoverOption
              active={coverOffset}
              title="C toggles"
              onClick={() => setPref('coverOffset', !coverOffset)}
            >
              Cover page alone
            </PopoverOption>
          </PopoverRow>
        )}
      </div>
    </>
  )
}

// One rendered page: the wrapper shrink-wraps the drawn image exactly
// (inline-block + relative), so the OCR overlay can position blocks in
// percentages of the source image.
function PageView({
  chapterId,
  index,
  url,
  style,
  hasOcr,
  overlayOn,
  onBlockTap,
  onTextSelect,
  onNatural
}: {
  chapterId: number
  index: number
  url: string
  style: React.CSSProperties
  hasOcr: boolean
  overlayOn: boolean
  onBlockTap: (b: MokuroBlock) => void
  onTextSelect: (text: string) => void
  onNatural: (index: number, w: number, h: number) => void
}) {
  const { data: ocr } = useQuery({
    queryKey: qk.manga.ocrPage(chapterId, index),
    queryFn: () => api.manga.ocrPage(chapterId, index),
    enabled: hasOcr && overlayOn,
    staleTime: Infinity
  })

  return (
    <div className="relative inline-block leading-none">
      <img
        src={url}
        alt={`Page ${index + 1}`}
        draggable={false}
        style={style}
        onLoad={(e) => {
          const img = e.currentTarget
          onNatural(index, img.naturalWidth, img.naturalHeight)
        }}
      />
      {overlayOn && ocr && <OcrOverlay ocr={ocr} onBlockTap={onBlockTap} onTextSelect={onTextSelect} />}
    </div>
  )
}

// Vertical-mode wrapper: pages far from the viewport render as a sized
// placeholder (aspect ratio from the loaded natural size, else a tall guess)
// so a long chapter doesn't hold hundreds of decoded images at once.
function VerticalBlock({
  index,
  nearPage,
  natural,
  register,
  children
}: {
  index: number
  nearPage: number
  natural: { w: number; h: number } | null
  register: (el: HTMLDivElement | null) => void
  children: React.ReactNode
}) {
  const inWindow = index >= nearPage - 2 && index <= nearPage + 8
  return (
    <div ref={register} data-index={index} className="w-full">
      {inWindow ? (
        children
      ) : (
        <div
          className="flex w-full items-center justify-center bg-base-900 motion-safe:animate-pulse"
          style={{ aspectRatio: natural ? `${natural.w} / ${natural.h}` : undefined, height: natural ? undefined : '80vh' }}
        >
          <span className="text-xs text-gray-600 tabular-nums">{index + 1}</span>
        </div>
      )}
    </div>
  )
}
