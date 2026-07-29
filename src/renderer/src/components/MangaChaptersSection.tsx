import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { readerPath, isBookChapter } from '../lib/readerPath'
import { toast, toastError } from '../lib/toast'
import type { MangaChapter, MediaDetail } from '@shared/types'

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

  const detach = () =>
    run(async () => {
      if (!confirm('Unlink the local folder? Reading progress per chapter will be forgotten.')) return
      await api.manga.detach(m.id)
    })

  const chapters = data?.chapters ?? []
  // Continue = the chapter mid-read, else the first unread one.
  const continueCh =
    chapters.find((c) => c.lastReadPage != null && !c.readAt) ?? chapters.find((c) => !c.readAt)
  const readCount = chapters.filter((c) => c.readAt).length

  const openReader = (ch: MangaChapter) => navigate(readerPath(m.id, ch))

  return (
    <div className="mb-6">
      <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-2">
        Chapters{chapters.length ? ` · ${readCount}/${chapters.length} read` : ''}
      </h2>

      {!data?.localDir ? (
        <div className="flex items-center gap-3">
          <button className="btn-ghost py-1 px-3 text-sm" disabled={busy} onClick={attach}>
            ⊕ Link local folder
          </button>
          <span className="text-xs text-gray-400">
            Point at this manga's folder in your library to read it here.
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
              ↻ Rescan
            </button>
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
            <button className="btn-ghost py-1 px-3" disabled={busy} onClick={detach}>
              ✕ Unlink
            </button>
            <span className="text-xs text-gray-400 truncate" title={data.localDir}>
              {data.localDir}
            </span>
          </div>
          <div className="max-h-72 overflow-y-auto space-y-1 pr-1">
            {chapters.map((ch) => (
              <ChapterRow key={ch.id} ch={ch} onOpen={() => openReader(ch)} onChange={refresh} />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

function ChapterRow({
  ch,
  onOpen,
  onChange
}: {
  ch: MangaChapter
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
