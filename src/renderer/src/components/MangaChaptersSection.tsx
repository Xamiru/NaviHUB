import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { readerPath, isBookChapter } from '../lib/readerPath'
import { toast, toastError } from '../lib/toast'
import { useOcrRun } from '../lib/useOcrRun'
import Section from './Section'
import CoverImage from './CoverImage'
import type { MangaChapter, MediaDetail } from '@shared/types'
import { confirmDialog } from '../lib/confirm'

// Local manga reader entry point on the manga detail page: attach a series
// folder from the manga library, list its scanned chapters (image folders,
// CBZ volumes and EPUB light novels), and jump into the matching reader.
// Reading progress lives in manga_chapter rows; finishing chapters raises the
// media item's chapters-read counter (never lowers it).
export default function MangaChaptersSection({ m }: { m: MediaDetail }) {
  const navigate = useNavigate()
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [buildingDeck, setBuildingDeck] = useState(false)

  // Book-type media reuse this section under /books with their own library
  // root; the Japanese-mining extras (mokuro OCR, vocab prep deck) stay
  // manga-only — an English novel has no OCR sidecars or JP corpus.
  const isBookMedia = m.mediaType === 'book'
  const basePath = isBookMedia ? ('/books' as const) : ('/manga' as const)

  // Live progress while a prep deck is being built (main-process scan).
  const { data: deckStatus } = useQuery({
    queryKey: qk.japanese.prepDeckStatus,
    queryFn: () => api.japanese.prepDeckStatus(),
    enabled: buildingDeck,
    refetchInterval: buildingDeck ? 400 : false
  })

  async function buildDeck() {
    setBuildingDeck(true)
    try {
      const res = await api.japanese.buildPrepDeck(m.id)
      await qc.invalidateQueries({ queryKey: qk.japanese.all })
      toast(`Built "${res.courseTitle}" — ${res.words} words from ${res.chaptersScanned} chapters`, 'success')
      navigate(`/japanese/courses/${res.courseId}`)
    } catch (e) {
      toastError(e)
    } finally {
      setBuildingDeck(false)
    }
  }

  const { data } = useQuery({
    queryKey: qk.manga.chapters(m.id),
    queryFn: () => api.manga.chapters(m.id)
  })

  // Mokuro sidecar presence per chapter (OCR chips + the Run OCR count) and
  // the shared in-app run poll. The run is main-process and one-at-a-time, so
  // the status survives navigating away — busy state derives from it, never
  // from a local flag.
  const { data: ocrOverview } = useQuery({
    queryKey: qk.manga.ocrOverview(m.id),
    queryFn: () => api.manga.ocrOverview(m.id),
    enabled: !!data?.localDir && !isBookMedia
  })
  const ocr = useOcrRun()
  const ocrByChapter = new Map((ocrOverview ?? []).map((o) => [o.chapterId, o]))
  const ocrMissing = (ocrOverview ?? []).filter((o) => o.ocrEligible && !o.hasSidecar).length

  async function startOcr() {
    try {
      await api.manga.ocrRun(m.id)
      await ocr.kick()
    } catch (e) {
      toastError(e)
    }
  }

  const refresh = () => {
    qc.invalidateQueries({ queryKey: qk.manga.all })
    qc.invalidateQueries({ queryKey: qk.media.detail(m.id) })
  }

  async function run(fn: () => Promise<void>) {
    setBusy(true)
    try {
      await fn()
      refresh()
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  const attach = () =>
    run(async () => {
      const res = await api.manga.attachFolder(m.id)
      if (res.ok) toast(`Found ${res.chapterCount} chapter${res.chapterCount === 1 ? '' : 's'}`, 'success')
      else if (res.error) toast(res.error)
    })

  const rescan = () =>
    run(async () => {
      const res = await api.manga.rescan(m.id)
      if (res.ok) toast(`Rescanned: ${res.chapterCount} chapter${res.chapterCount === 1 ? '' : 's'}`, 'success')
      else if (res.error) toast(res.error)
    })

  const detach = async (): Promise<void> => {
    const ok = await confirmDialog(
      'Unlink the local folder? Reading progress per chapter will be forgotten.',
      { confirmLabel: 'Unlink', danger: true }
    )
    if (!ok) return
    await run(async () => {
      await api.manga.detach(m.id)
    })
  }

  const chapters = data?.chapters ?? []
  // Continue = the chapter mid-read, else the first unread one.
  const continueCh =
    chapters.find((c) => c.lastReadPage != null && !c.readAt) ?? chapters.find((c) => !c.readAt)
  const readCount = chapters.filter((c) => c.readAt).length
  // Grid is the browsing view (Komga-shaped: thumbnail, unread ribbon, progress
  // bar); the list stays for the dense facts and the per-chapter chips. Kept in
  // history-scoped state so Back out of the reader restores the view you chose.
  const [view, setView] = usePersistedState<'grid' | 'list'>('chapterView', 'grid')

  const openReader = (ch: MangaChapter) => navigate(readerPath(basePath, m.id, ch))

  return (
    <Section
      title={`${isBookMedia ? 'Volumes' : 'Chapters'}${chapters.length ? ` · ${readCount}/${chapters.length} read` : ''}`}
      className="mb-6"
    >
      {!data?.localDir ? (
        <div className="flex items-center gap-3">
          <button className="btn-ghost py-1 px-3 text-sm" disabled={busy} onClick={attach}>
            ⊕ Link local folder
          </button>
          <span className="text-xs text-gray-400">
            Point at this {isBookMedia ? "book's" : "manga's"} folder in your library to read it
            here.
          </span>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 mb-2 text-sm">
            {continueCh && (
              <button className="btn-ghost py-1 px-3" onClick={() => openReader(continueCh)}>
                ▶ {continueCh.lastReadPage != null ? 'Continue' : 'Start'} · {continueCh.title}
              </button>
            )}
            <button className="btn-ghost py-1 px-3" disabled={busy} onClick={rescan}>
              Rescan
            </button>
            {!isBookMedia && ocr.running ? (
              <>
                <span className="chip bg-accent/20 text-accent text-[11px] shrink-0">
                  {ocr.status?.state === 'starting'
                    ? 'OCR: loading model…'
                    : `OCR ${ocr.status?.volumeIndex ?? '…'}/${ocr.status?.volumeCount ?? '…'}${
                        ocr.status?.percent != null ? ` · ${ocr.status.percent}%` : ''
                      }`}
                </span>
                <button
                  className="btn-ghost py-1 px-3"
                  onClick={() => {
                    if (ocr.status) void api.manga.ocrRunCancel(ocr.status.id).then(ocr.kick)
                  }}
                >
                  Stop
                </button>
              </>
            ) : (
              !isBookMedia &&
              ocrMissing > 0 && (
                <button
                  className="btn-ghost py-1 px-3"
                  disabled={busy}
                  title="Run mokuro on every volume without OCR, so its text becomes tappable in the reader (needs mokuro installed — see Settings → Integrations)"
                  onClick={() => void startOcr()}
                >
                  Run OCR ({ocrMissing})
                </button>
              )
            )}
            {!isBookMedia && (
              <button
                className="btn-ghost py-1 px-3"
                disabled={busy || buildingDeck}
                title="Frequency-scan this series' text (mokuro OCR / EPUB) and build a 'words you'll meet' course"
                onClick={() => void buildDeck()}
              >
                {buildingDeck
                  ? deckStatus?.phase === 'reading'
                    ? `Scanning ${deckStatus.done}/${deckStatus.total}…`
                    : deckStatus?.phase === 'glossing'
                      ? `Glossing ${deckStatus.done}/${deckStatus.total}…`
                      : 'Building…'
                  : 'Vocab deck'}
              </button>
            )}
            <button className="btn-ghost py-1 px-3" disabled={busy} onClick={detach}>
              ✕ Unlink
            </button>
            <span className="text-xs text-gray-400 truncate" title={data.localDir}>
              {data.localDir}
            </span>
          </div>
          <div className="mb-2 flex items-center gap-1.5">
            <button
              className={view === 'grid' ? 'pill pill-active' : 'pill'}
              onClick={() => setView('grid')}
            >
              Grid
            </button>
            <button
              className={view === 'list' ? 'pill pill-active' : 'pill'}
              onClick={() => setView('list')}
            >
              List
            </button>
          </div>
          {view === 'grid' ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(132px,1fr))] gap-4">
              {chapters.map((ch) => (
                <ChapterTile
                  key={ch.id}
                  ch={ch}
                  hasOcr={ocrByChapter.get(ch.id)?.hasSidecar ?? false}
                  onOpen={() => openReader(ch)}
                  onChange={refresh}
                />
              ))}
            </div>
          ) : (
            <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
              {chapters.map((ch) => (
                <ChapterRow
                  key={ch.id}
                  ch={ch}
                  hasOcr={ocrByChapter.get(ch.id)?.hasSidecar ?? false}
                  onOpen={() => openReader(ch)}
                  onChange={refresh}
                />
              ))}
            </div>
          )}
        </>
      )}
    </Section>
  )
}

// Grid form of a chapter/volume: the thumbnail the scanner recorded, an unread
// ribbon, and a progress bar for one in flight. Clicking the tile reads; the
// tick toggles read, mirroring ChapterRow so the two views do the same things.
function ChapterTile({
  ch,
  hasOcr,
  onOpen,
  onChange
}: {
  ch: MangaChapter
  hasOcr: boolean
  onOpen: () => void
  onChange: () => void
}) {
  const inProgress = ch.lastReadPage != null && !ch.readAt
  const pct =
    inProgress && ch.pageCount > 0
      ? Math.min(100, Math.round((((ch.lastReadPage ?? 0) + 1) / ch.pageCount) * 100))
      : null

  async function toggleRead(e: React.MouseEvent): Promise<void> {
    e.stopPropagation()
    try {
      await api.manga.markChapterRead(ch.id, !ch.readAt)
      onChange()
    } catch (err) {
      toastError(err)
    }
  }

  return (
    <div className="group">
      <button className="relative block w-full text-left" onClick={onOpen} title="Read">
        <CoverImage
          path={ch.coverPath}
          alt={ch.title}
          rounded="rounded-lg"
          className={`aspect-[2/3] w-full ${ch.readAt ? 'opacity-60' : ''}`}
        />
        {!ch.readAt && !inProgress && (
          <span className="absolute right-1.5 top-1.5 rounded bg-accent px-1.5 py-0.5 text-[10px] font-semibold text-base-900">
            {ch.pageCount}
          </span>
        )}
        {hasOcr && (
          <span
            className="absolute left-1.5 top-1.5 rounded bg-black/70 px-1.5 py-0.5 text-[10px] text-accent"
            title="Mokuro OCR available"
          >
            OCR
          </span>
        )}
        {pct != null && (
          <div className="absolute inset-x-0 bottom-0 h-1 bg-black/60">
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        )}
      </button>
      <div className="mt-2 flex items-start gap-2">
        <button
          onClick={toggleRead}
          title={ch.readAt ? 'Mark unread' : 'Mark read'}
          aria-label={ch.readAt ? 'Mark unread' : 'Mark read'}
          className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full text-[10px] ${
            ch.readAt ? 'bg-accent/20 text-accent' : 'bg-base-700 text-gray-600 hover:text-gray-300'
          }`}
        >
          ✓
        </button>
        <div className="min-w-0">
          <p
            className={`truncate text-sm ${ch.readAt ? 'text-gray-500' : 'text-gray-200'} group-hover:text-accent`}
            title={ch.title}
          >
            {ch.title}
          </p>
          <p className="text-xs text-gray-500">
            {inProgress
              ? `${isBookChapter(ch) ? '§' : 'p.'} ${(ch.lastReadPage ?? 0) + 1} of ${ch.pageCount}`
              : ch.readAt
                ? 'read'
                : `${ch.pageCount} ${isBookChapter(ch) ? 'sections' : 'pages'}`}
          </p>
        </div>
      </div>
    </div>
  )
}

function ChapterRow({
  ch,
  hasOcr,
  onOpen,
  onChange
}: {
  ch: MangaChapter
  hasOcr: boolean
  onOpen: () => void
  onChange: () => void
}) {
  const inProgress = ch.lastReadPage != null && !ch.readAt

  async function toggleRead() {
    try {
      await api.manga.markChapterRead(ch.id, !ch.readAt)
      onChange()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <div className="flex items-center gap-3 bg-base-800 rounded-md px-3 py-2">
      <button
        onClick={toggleRead}
        title={ch.readAt ? 'Mark unread' : 'Mark read'}
        className={`shrink-0 w-6 h-6 rounded-full flex items-center justify-center text-xs ${
          ch.readAt
            ? 'bg-accent/20 text-accent'
            : 'bg-base-700 text-gray-600 hover:text-gray-300'
        }`}
      >
        ✓
      </button>
      <button className="min-w-0 flex-1 text-left" onClick={onOpen} title="Read">
        <span className={`text-sm ${ch.readAt ? 'text-gray-500' : 'text-gray-200'}`}>
          {ch.title}
        </span>
      </button>
      {isBookChapter(ch) && (
        <span className="chip text-[11px] px-1.5 py-0.5 shrink-0" title="EPUB book">
          本
        </span>
      )}
      {hasOcr && (
        <span
          className="chip bg-accent/20 text-accent text-[11px] px-1.5 py-0.5 shrink-0"
          title="Mokuro OCR available — text is tappable in the reader"
        >
          OCR
        </span>
      )}
      {inProgress && (
        <span className="chip bg-accent/20 text-accent text-[11px] px-1.5 py-0.5 shrink-0">
          {isBookChapter(ch) ? '§' : 'p.'} {(ch.lastReadPage ?? 0) + 1}/{ch.pageCount}
        </span>
      )}
      <span className="text-xs text-gray-400 shrink-0">
        {ch.pageCount} {isBookChapter(ch) ? 'sections' : 'pages'}
      </span>
      <button className="btn-ghost py-0.5 px-2.5 text-xs shrink-0" onClick={onOpen}>
        Read
      </button>
    </div>
  )
}
