import { useId, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import Dialog from './Dialog'
import type { BookEdition, MediaDetail } from '@shared/types'

// Book-only facts beside the overview: the series position, the kind of book,
// Hardcover's reader count, audiobook length, and the edition the user reads.
// Choosing an edition makes its page count the progress total (book_edition);
// only Hardcover rows have an edition list to choose from.

const FACT = 'text-[10px] font-semibold uppercase tracking-[0.16em] text-gray-500'

interface SeriesMeta {
  name?: string
  position?: number | null
  details?: string | null
  count?: number | null
}

function duration(seconds: number): string {
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  return h > 0 ? `${h} h ${m} min` : `${m} min`
}

export function editionSummary(e: BookEdition): string {
  return [
    e.format ?? e.readingFormat,
    e.publisher,
    e.pages != null ? `${e.pages} pages` : null,
    e.audioSeconds != null ? duration(e.audioSeconds) : null,
    e.releaseDate?.slice(0, 4),
    e.language
  ]
    .filter(Boolean)
    .join(' · ')
}

export default function BookFacts({ m }: { m: MediaDetail }) {
  const meta = (m.metadata ?? {}) as Record<string, unknown>
  const series = (meta.series ?? null) as SeriesMeta | null
  const kind = [meta.bookCategory, meta.literaryType].filter((v) => typeof v === 'string').join(' · ')
  const readers = typeof meta.hcReaders === 'number' ? meta.hcReaders : null
  const audio = typeof meta.audioSeconds === 'number' ? meta.audioSeconds : null
  const subtitle = typeof meta.subtitle === 'string' ? meta.subtitle : null
  const fromHardcover = m.externalSource === 'hardcover'
  const authors = m.cast
    .filter((c) => c.role === 'writer' && !c.character)
    .filter((c, i, all) => all.findIndex((x) => x.person.id === c.person.id) === i)
  const [picking, setPicking] = useState(false)

  const { data: chosen } = useQuery({
    queryKey: qk.media.bookEdition(m.id),
    queryFn: () => api.books.edition(m.id)
  })

  const qc = useQueryClient()
  async function clear(): Promise<void> {
    await api.books.clearEdition(m.id)
    await qc.invalidateQueries({ queryKey: qk.media.all })
  }

  return (
    <>
      {authors.length > 0 && (
        <div>
          <p className={FACT}>{authors.length === 1 ? 'Author' : 'Authors'}</p>
          <ul className="mt-1 space-y-1">
            {authors.map((c) => (
              <li key={c.person.id}>
                <Link to={`/people/${c.person.id}?role=writer`} className="text-signal-link hover:underline">
                  {c.person.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {subtitle && (
        <div>
          <p className={FACT}>Subtitle</p>
          <p className="mt-1 text-white">{subtitle}</p>
        </div>
      )}
      {series?.name && (
        <div>
          <p className={FACT}>Series</p>
          <p className="mt-1 text-white">
            {series.position != null
              ? `Book ${series.details ?? series.position}${series.count ? ` of ${series.count}` : ''} · `
              : ''}
            {series.name}
          </p>
        </div>
      )}
      {kind && (
        <div>
          <p className={FACT}>Kind</p>
          <p className="mt-1 text-white">{kind}</p>
        </div>
      )}
      {readers != null && (
        <div>
          <p className={FACT}>Hardcover readers</p>
          <p className="mt-1 text-white">{readers.toLocaleString()}</p>
        </div>
      )}
      {audio != null && (
        <div>
          <p className={FACT}>Audiobook</p>
          <p className="mt-1 text-white">{duration(audio)}</p>
        </div>
      )}
      {(fromHardcover || chosen) && (
        <div>
          <p className={FACT}>My edition</p>
          {chosen ? (
            <p className="mt-1 text-white">{editionSummary(chosen.edition) || 'Chosen edition'}</p>
          ) : (
            <p className="mt-1 text-gray-400">Not chosen — progress counts the book&apos;s usual page total</p>
          )}
          {chosen?.edition.isbn13 && <p className="text-xs text-gray-400">ISBN {chosen.edition.isbn13}</p>}
          <div className="mt-2 flex flex-wrap gap-2">
            {fromHardcover && (
              <button type="button" className="btn-ghost text-xs" onClick={() => setPicking(true)}>
                {chosen ? 'Change edition…' : 'Choose edition…'}
              </button>
            )}
            {chosen && (
              <button type="button" className="btn-ghost text-xs" onClick={() => void clear()}>
                Clear
              </button>
            )}
          </div>
        </div>
      )}
      {picking && (
        <EditionPicker mediaId={m.id} chosenId={chosen?.edition.id ?? null} onClose={() => setPicking(false)} />
      )}
    </>
  )
}

function EditionPicker({
  mediaId,
  chosenId,
  onClose
}: {
  mediaId: number
  chosenId: number | null
  onClose: () => void
}) {
  const titleId = useId()
  const qc = useQueryClient()
  const [saving, setSaving] = useState<number | null>(null)
  const { data: editions = [], isLoading, isError, error, refetch } = useQuery({
    queryKey: qk.books.editions(mediaId),
    queryFn: () => api.books.editions(mediaId),
    staleTime: 10 * 60_000
  })

  async function choose(id: number): Promise<void> {
    setSaving(id)
    try {
      await api.books.chooseEdition(mediaId, id)
      await qc.invalidateQueries({ queryKey: qk.media.all })
      onClose()
    } finally {
      setSaving(null)
    }
  }

  return (
    <Dialog labelledBy={titleId} onClose={onClose} panelClassName="card w-full max-w-2xl p-5 max-h-[85vh] overflow-y-auto">
      <div className="mb-4 flex items-center justify-between">
        <h2 id={titleId} className="text-lg font-bold">
          Choose your edition
        </h2>
        <button className="text-xl leading-none text-gray-500 hover:text-white" aria-label="Close" onClick={onClose}>
          ✕
        </button>
      </div>
      <p className="mb-3 text-xs text-gray-400">
        The edition&apos;s page count becomes this book&apos;s progress total and survives refreshes.
      </p>
      {isLoading && <p className="text-sm text-gray-400">Loading editions from Hardcover…</p>}
      {isError && (
        <div role="alert" className="mb-3">
          <p className="text-sm text-red-400">
            Could not load editions.{error instanceof Error && error.message ? ` ${error.message}` : ''}
          </p>
          <button className="btn-ghost mt-2" onClick={() => void refetch()}>
            Retry
          </button>
        </div>
      )}
      {!isLoading && !isError && editions.length === 0 && (
        <p className="text-sm text-gray-400">Hardcover lists no editions for this book.</p>
      )}
      <ul className="space-y-2">
        {editions.map((e) => (
          <li key={e.id} className="flex items-center gap-3 rounded-md bg-base-700 p-2">
            {e.coverUrl ? (
              <img src={e.coverUrl} alt="" className="h-16 w-12 shrink-0 rounded object-cover" />
            ) : (
              <div className="h-16 w-12 shrink-0 rounded bg-base-600" />
            )}
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium">{e.title ?? 'Untitled edition'}</p>
              <p className="text-xs text-gray-400">{editionSummary(e) || 'No details listed'}</p>
              {(e.isbn13 ?? e.isbn10) && <p className="text-xs text-gray-500">ISBN {e.isbn13 ?? e.isbn10}</p>}
            </div>
            {e.id === chosenId ? (
              <span className="pill pill-active shrink-0">Current</span>
            ) : (
              <button
                type="button"
                className="btn-primary shrink-0"
                disabled={saving !== null}
                onClick={() => void choose(e.id)}
              >
                {saving === e.id ? 'Saving…' : 'Use this'}
              </button>
            )}
          </li>
        ))}
      </ul>
    </Dialog>
  )
}
