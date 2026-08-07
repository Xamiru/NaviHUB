import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useReaderSource } from '../lib/readerSource'
import { readerPath } from '../lib/readerPath'
import BookContent from '../components/reader/BookContent'
import MiningPanel from '../components/reader/MiningPanel'
import BarButton from '../components/reader/BarButton'
import ShortcutHelp from '../components/reader/ShortcutHelp'
import BookSettingsPopover, {
  BOOK_DEFAULTS,
  BOOK_SERIF_STACK,
  type BookPrefs
} from '../components/reader/BookSettingsPopover'
import { PrevIcon, NextIcon } from '../components/PlayerIcons'
import type { EpubTocEntry, MangaChapter } from '@shared/types'
// Mincho face for the serif reading option — unicode-range split woff2s, so
// only the glyphs actually rendered are fetched (self-origin, CSP-safe).
import '@fontsource/noto-serif-jp/400.css'
import '@fontsource/noto-serif-jp/600.css'

// Immersive EPUB (light novel) reader — the book sibling of MangaReaderPage,
// routed chrome-free from App.tsx. "Pages" are the book's spine documents,
// fetched as XHTML from navimg:// and rendered sanitized (BookContent).
// Horizontal or vertical (tategaki) layout, TOC jump, persisted typography
// prefs (incl. reading theme + serif — BookSettingsPopover), and the same
// mine-to-SRS panel as the manga reader: toggle ⛏, tap a paragraph, save the
// word with this novel as its source.

const PREFS_KEY = 'book.readerPrefs'

function loadPrefs(): BookPrefs {
  try {
    return { ...BOOK_DEFAULTS, ...JSON.parse(localStorage.getItem(PREFS_KEY) ?? '{}') }
  } catch {
    return BOOK_DEFAULTS
  }
}

const SHORTCUTS = [
  { keys: ['←', '→'], label: 'Previous / next section' },
  { keys: ['Space'], label: 'Scroll a screenful (Shift = back)' },
  { keys: ['↑', '↓'], label: 'Scroll a little' },
  { keys: ['Home', 'End'], label: 'First / last section' },
  { keys: ['T'], label: 'Table of contents' },
  { keys: ['V'], label: 'Vertical ↔ horizontal text' },
  { keys: ['+', '−'], label: 'Text size' },
  { keys: ['M'], label: 'Mine words (then tap a paragraph)' },
  { keys: ['Esc'], label: 'Close panels / back to series' }
]

// "manga/<dir>/<Book>.epub/<entry>" → the navimg prefix up to the epub + the
// in-zip entry path (mirrors the main process's splitArchivePath).
function splitBookRelPath(relPath: string): { prefix: string; entryPath: string } | null {
  const parts = relPath.split('/')
  for (let i = 0; i < parts.length - 1; i++) {
    if (parts[i].toLowerCase().endsWith('.epub')) {
      return { prefix: parts.slice(0, i + 1).join('/'), entryPath: parts.slice(i + 1).join('/') }
    }
  }
  return null
}

export default function BookReaderPage() {
  const { doc, library, chapterId, mediaId, adhoc } = useReaderSource()
  const navigate = useNavigate()
  const location = useLocation()
  const qc = useQueryClient()
  const [searchParams, setSearchParams] = useSearchParams()
  const viewportRef = useRef<HTMLDivElement>(null)

  const pages = doc?.pages ?? []
  const sectionCount = pages.length
  const toc = doc?.toc ?? []
  const chapters = library?.chapters ?? []
  const chIndex = chapters.findIndex((c) => c.id === chapterId)
  const prevChapter = chIndex > 0 ? chapters[chIndex - 1] : null
  const nextChapter = chIndex >= 0 && chIndex < chapters.length - 1 ? chapters[chIndex + 1] : null

  // ---- prefs ----
  const [prefs, setPrefs] = useState<BookPrefs>(loadPrefs)
  const setPref = useCallback(<K extends keyof BookPrefs>(k: K, v: BookPrefs[K]) => {
    setPrefs((p) => {
      const next = { ...p, [k]: v }
      localStorage.setItem(PREFS_KEY, JSON.stringify(next))
      return next
    })
  }, [])
  const { fontSize, lineHeight, maxWidth, vertical, theme, font } = prefs

  // ---- current section (same init contract as the manga reader) ----
  const [section, setSection] = useState(0)
  const [showEnd, setShowEnd] = useState(false)
  const initRef = useRef<number | null>(null)

  useEffect(() => {
    if (!doc || !library || initRef.current === chapterId) return
    initRef.current = chapterId
    const raw = searchParams.get('page')
    const fromUrl = raw != null ? Number(raw) : NaN
    const chapter = chapters[chIndex]
    const start = Number.isFinite(fromUrl) ? fromUrl : (chapter?.lastReadPage ?? 0)
    setSection(Math.min(Math.max(0, start), Math.max(0, doc.pages.length - 1)))
    setShowEnd(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [doc, library, chapterId])

  useEffect(() => {
    setSearchParams({ page: String(section) }, { replace: true })
  }, [section, setSearchParams])

  // ---- section document ----
  const current = pages[section]
  const split = current ? splitBookRelPath(current.relPath) : null
  const { data: html, isLoading: docLoading } = useQuery({
    queryKey: qk.manga.bookDoc(chapterId, section),
    queryFn: async () => {
      const res = await fetch(current!.url)
      if (!res.ok) throw new Error(`Failed to load section (${res.status})`)
      return res.text()
    },
    enabled: current != null,
    staleTime: Infinity
  })

  // Prefetch the next section so page turns feel instant.
  useEffect(() => {
    const next = pages[section + 1]
    if (!next) return
    void qc.prefetchQuery({
      queryKey: qk.manga.bookDoc(chapterId, section + 1),
      queryFn: async () => {
        const res = await fetch(next.url)
        if (!res.ok) throw new Error(`Failed to load section (${res.status})`)
        return res.text()
      },
      staleTime: Infinity
    })
  }, [section, pages, chapterId, qc])

  // ---- navigation ----
  const gotoSection = useCallback(
    (i: number) => {
      if (sectionCount === 0) return
      setSection(Math.min(Math.max(0, i), sectionCount - 1))
      setShowEnd(false)
    },
    [sectionCount]
  )

  const scrollToStart = useCallback(() => {
    const el = viewportRef.current
    if (!el) return
    el.scrollTop = 0
    el.scrollLeft = 0 // vertical-rl: 0 is the start (right) edge
  }, [])
  useEffect(() => scrollToStart(), [section, chapterId, vertical, scrollToStart])

  const nextSection = useCallback(() => {
    if (section + 1 < sectionCount) gotoSection(section + 1)
    else setShowEnd(true)
  }, [section, sectionCount, gotoSection])

  const prevSection = useCallback(() => {
    setShowEnd(false)
    if (section > 0) gotoSection(section - 1)
  }, [section, gotoSection])

  // The same reader serves /manga and /books routes; the URL says which
  // section this item lives in, so exits and volume switches stay inside it.
  const basePath = location.pathname.startsWith('/books') ? ('/books' as const) : ('/manga' as const)

  const exitToDetail = useCallback(() => {
    // Same history contract as the manga reader: unwind, don't re-push detail.
    if (location.key !== 'default') navigate(-1)
    // An ad-hoc book has no series page to go back to.
    else navigate(adhoc ? '/' : `${basePath}/${mediaId}`)
  }, [navigate, mediaId, location.key, basePath])

  const goToChapter = useCallback(
    (ch: MangaChapter) => {
      initRef.current = null
      setShowEnd(false)
      // replace: a whole reading session stays ONE history entry. readerPath
      // routes image chapters back into the manga reader.
      navigate(`${readerPath(basePath, mediaId, ch)}?page=0`, { replace: true })
    },
    [navigate, mediaId, basePath]
  )

  // Scroll a screenful along the reading axis; cross into the neighbour
  // section when already at the edge.
  const scrollForward = useCallback(
    (back = false) => {
      const el = viewportRef.current
      if (!el) return
      if (vertical) {
        const atEnd = Math.abs(el.scrollLeft) + el.clientWidth >= el.scrollWidth - 4
        const atStart = Math.abs(el.scrollLeft) <= 4
        if (!back && atEnd) return nextSection()
        if (back && atStart) return prevSection()
        el.scrollBy({ left: back ? el.clientWidth * 0.85 : -el.clientWidth * 0.85, behavior: 'smooth' })
      } else {
        const atEnd = el.scrollTop + el.clientHeight >= el.scrollHeight - 4
        const atStart = el.scrollTop <= 4
        if (!back && atEnd) return nextSection()
        if (back && atStart) return prevSection()
        el.scrollBy({ top: back ? -el.clientHeight * 0.85 : el.clientHeight * 0.85, behavior: 'smooth' })
      }
    },
    [vertical, nextSection, prevSection]
  )

  // Vertical mode: translate the mouse wheel onto the horizontal reading axis.
  useEffect(() => {
    const el = viewportRef.current
    if (!el || !vertical) return
    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return
      e.preventDefault()
      el.scrollBy({ left: -e.deltaY })
    }
    el.addEventListener('wheel', onWheel, { passive: false })
    return () => el.removeEventListener('wheel', onWheel)
  }, [vertical])

  // ---- progress autosave (same debounce/flush contract as the manga reader) ----
  const saveRef = useRef<{ chapterId: number; page: number } | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  useEffect(() => {
    if (!doc) return
    saveRef.current = { chapterId, page: section }
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      const s = saveRef.current
      if (s && s.chapterId > 0) void api.manga.markProgress(s.chapterId, s.page)
      saveRef.current = null
    }, 800)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [section, chapterId, doc])
  useEffect(() => {
    return () => {
      const s = saveRef.current
      if (s && s.chapterId > 0) void api.manga.markProgress(s.chapterId, s.page)
      qc.invalidateQueries({ queryKey: qk.manga.all })
      qc.invalidateQueries({ queryKey: qk.media.detail(mediaId) })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // ---- mining + popovers ----
  const [panelOpen, setPanelOpen] = useState(false)
  const [blockText, setBlockText] = useState<string | null>(null)
  const [tocOpen, setTocOpen] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [helpOpen, setHelpOpen] = useState(false)

  const onBlockText = useCallback((text: string) => {
    setBlockText(text)
    setPanelOpen(true)
  }, [])

  // Current TOC entry = the last one starting at or before this section.
  const tocLabel = [...toc].reverse().find((t) => t.page <= section)?.label ?? null

  // ---- keyboard ----
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement
      if (t instanceof HTMLInputElement || t instanceof HTMLTextAreaElement || t.isContentEditable)
        return
      switch (e.key) {
        case 'ArrowRight':
          vertical ? prevSection() : nextSection()
          break
        case 'ArrowLeft':
          vertical ? nextSection() : prevSection()
          break
        case ' ':
        case 'PageDown':
          e.preventDefault()
          scrollForward(e.shiftKey)
          break
        case 'PageUp':
          e.preventDefault()
          scrollForward(true)
          break
        case 'ArrowDown':
          e.preventDefault()
          viewportRef.current?.scrollBy(vertical ? { left: -120 } : { top: 120 })
          break
        case 'ArrowUp':
          e.preventDefault()
          viewportRef.current?.scrollBy(vertical ? { left: 120 } : { top: -120 })
          break
        case 'Home':
          gotoSection(0)
          break
        case 'End':
          gotoSection(sectionCount - 1)
          break
        case 'v':
          setPref('vertical', !vertical)
          break
        case 't':
          setTocOpen((o) => !o)
          break
        case '+':
        case '=':
          setPref('fontSize', Math.min(28, fontSize + 1))
          break
        case '-':
        case '_':
          setPref('fontSize', Math.max(12, fontSize - 1))
          break
        case 'm':
          setPanelOpen((v) => !v)
          break
        case '?':
          setHelpOpen((v) => !v)
          break
        case 'Escape':
        case 'Backspace':
          if (helpOpen) setHelpOpen(false)
          else if (tocOpen) setTocOpen(false)
          else if (settingsOpen) setSettingsOpen(false)
          else if (showEnd) setShowEnd(false)
          else if (panelOpen) setPanelOpen(false)
          else exitToDetail()
          break
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [vertical, fontSize, nextSection, prevSection, scrollForward, gotoSection, sectionCount, tocOpen, settingsOpen, helpOpen, showEnd, panelOpen, setPref, exitToDetail])

  if (!doc || !library) return <div className="h-screen bg-base-900 p-6 text-gray-500">Loading…</div>

  return (
    <div className="h-screen bg-base-900 flex">
      <div className="relative flex-1 min-w-0 flex flex-col">
        {/* top bar */}
        <div className="shrink-0 z-20 bg-base-900/95 backdrop-blur border-b border-base-800 px-4 py-2 flex items-center gap-3">
          <button className="btn-ghost py-1 px-3 text-sm" onClick={exitToDetail}>
            ← Back
          </button>
          <div className="min-w-0 flex-1 text-sm text-gray-300 truncate">
            {doc.title}
            {tocLabel && <span className="ml-2 text-gray-500">· {tocLabel}</span>}
          </div>
          <span className="text-sm text-gray-400 shrink-0">
            {section + 1} / {sectionCount}
          </span>
        </div>

        {/* content — the themed reading surface (data-book-theme scopes the
            --book-* vars; horizontal mode floats a sheet on the backdrop,
            vertical stays full-bleed because a sheet fights vertical-rl). */}
        <div
          ref={viewportRef}
          data-book-theme={theme}
          className={`book-surface flex-1 min-h-0 ${vertical ? 'overflow-x-auto overflow-y-hidden' : 'overflow-y-auto'}`}
          style={{ background: 'var(--book-bg)' }}
        >
          {docLoading || !html ? (
            <p className="p-8 text-sm" style={{ color: 'var(--book-muted)' }}>
              Loading section…
            </p>
          ) : (
            <div
              className={
                vertical
                  ? 'book-vertical h-full py-8 px-10'
                  : 'mx-auto my-8 rounded-lg border px-10 py-12 shadow-xl shadow-black/30'
              }
              style={{
                fontSize,
                lineHeight,
                ...(font === 'serif' ? { fontFamily: BOOK_SERIF_STACK } : {}),
                ...(vertical
                  ? { writingMode: 'vertical-rl' as const }
                  : {
                      maxWidth,
                      background: 'var(--book-sheet)',
                      borderColor: 'var(--book-border)'
                    })
              }}
            >
              {split && (
                <BookContent
                  html={html}
                  docEntryPath={split.entryPath}
                  epubUrlPrefix={split.prefix}
                  onBlockText={panelOpen ? onBlockText : undefined}
                />
              )}
              {/* end-of-section footer — font size reset so the buttons stop
                  scaling with the prose */}
              <div
                className={`flex items-center gap-3 ${vertical ? 'mr-8' : 'mt-10 mb-2'}`}
                style={{ fontSize: '0.875rem', lineHeight: 1.5, color: 'var(--book-muted)' }}
              >
                {section > 0 && (
                  <button className="btn-ghost" onClick={prevSection}>
                    ← Previous
                  </button>
                )}
                <button className="btn-primary" onClick={nextSection}>
                  {section + 1 < sectionCount ? 'Next →' : 'Finish book'}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* end-of-book overlay */}
        {showEnd && (
          <div
            className="absolute inset-0 z-30 flex items-center justify-center bg-black/70"
            onMouseDown={(e) => e.target === e.currentTarget && setShowEnd(false)}
          >
            <div className="card p-8 text-center max-w-sm">
              <p className="text-lg font-semibold">Book finished</p>
              <p className="mt-1 text-sm text-gray-400">{doc.title}</p>
              <div className="mt-5 flex flex-col gap-2">
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
        <div className="shrink-0 z-20 bg-base-900/95 backdrop-blur border-t border-base-800 px-4 py-2 flex items-center gap-3">
          <button
            className="btn-ghost py-1 px-2 text-xs"
            disabled={!prevChapter}
            onClick={() => prevChapter && goToChapter(prevChapter)}
            title="Previous volume"
            aria-label="Previous volume"
          >
            <PrevIcon />
          </button>
          <button
            className="max-w-48 shrink-0 truncate text-xs text-gray-400 hover:text-white"
            title="Table of contents (T)"
            aria-label="Table of contents"
            aria-expanded={tocOpen}
            onClick={() => setTocOpen((v) => !v)}
          >
            {tocLabel ?? `Section ${section + 1}`} ▾
          </button>
          {tocOpen && (
            <TocPopover
              toc={toc}
              sectionCount={sectionCount}
              current={section}
              onPick={(page) => {
                setTocOpen(false)
                gotoSection(page)
              }}
              onClose={() => setTocOpen(false)}
            />
          )}
          <input
            type="range"
            min={0}
            max={Math.max(0, sectionCount - 1)}
            value={section}
            onChange={(e) => gotoSection(Number(e.target.value))}
            className="flex-1 accent-accent"
            aria-label="Section"
          />
          <button
            className="btn-ghost py-1 px-2 text-xs"
            disabled={!nextChapter}
            onClick={() => nextChapter && goToChapter(nextChapter)}
            title="Next volume"
            aria-label="Next volume"
          >
            <NextIcon />
          </button>
          <div className="relative flex items-center gap-1 shrink-0 text-xs">
            <BarButton
              label="Aa"
              active={settingsOpen}
              title="Typography & theme"
              onClick={() => setSettingsOpen((v) => !v)}
            />
            {settingsOpen && (
              <BookSettingsPopover
                prefs={prefs}
                setPref={setPref}
                onClose={() => setSettingsOpen(false)}
              />
            )}
            <BarButton
              label="⛏"
              active={panelOpen}
              title="Mine words (M) — then tap a paragraph"
              onClick={() => setPanelOpen((v) => !v)}
            />
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
          initialTerm={null}
          onClose={() => setPanelOpen(false)}
        />
      )}
    </div>
  )
}

// TOC jump list (ChapterListPopover pattern): real chapter titles when the
// book has a nav/NCX, plain section numbers otherwise.
function TocPopover({
  toc,
  sectionCount,
  current,
  onPick,
  onClose
}: {
  toc: EpubTocEntry[]
  sectionCount: number
  current: number
  onPick: (page: number) => void
  onClose: () => void
}) {
  const entries: EpubTocEntry[] =
    toc.length > 0
      ? toc
      : Array.from({ length: sectionCount }, (_, i) => ({ label: `Section ${i + 1}`, page: i }))
  // Highlight the entry the current section falls under.
  const activePage = [...entries].reverse().find((t) => t.page <= current)?.page
  const currentRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    currentRef.current?.scrollIntoView({ block: 'center' })
  }, [])

  return (
    <>
      <div className="fixed inset-0 z-20" onMouseDown={onClose} />
      <div className="absolute bottom-full left-4 z-30 mb-2 max-h-96 w-80 max-w-[calc(100vw-2rem)] overflow-y-auto rounded-lg border border-base-700 bg-base-800 py-1 shadow-xl shadow-black/40">
        {entries.map((t) => (
          <button
            key={`${t.page}-${t.label}`}
            ref={t.page === activePage ? currentRef : undefined}
            className={`flex w-full items-center gap-3 px-3 py-1.5 text-left text-sm hover:bg-base-700 ${
              t.page === activePage ? 'bg-base-700/60 text-accent' : 'text-gray-300'
            }`}
            onClick={() => onPick(t.page)}
          >
            <span className="min-w-0 flex-1 truncate">{t.label}</span>
            <span className="shrink-0 text-xs text-gray-500">{t.page + 1}</span>
          </button>
        ))}
      </div>
    </>
  )
}
