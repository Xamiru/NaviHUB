import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import EmptyState from '../components/EmptyState'
import KindleGuide from '../components/kindle/KindleGuide'
import KindleImportDialog from '../components/kindle/KindleImportDialog'
import KindleMakeBooks from '../components/kindle/KindleMakeBooks'
import KindleUnfinishedSends from '../components/kindle/KindleUnfinishedSends'
import KindleLinkDialog from '../components/kindle/KindleLinkDialog'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { useSettings } from '../lib/hooks'
import { bytes, percent, readTime } from '../lib/kindle'
import { qk } from '../lib/queryKeys'
import { toast } from '../lib/toast'
import type { KindleDeviceBook, KindleDeviceSeries, KindleStatus } from '@shared/types'

// /books/kindle — the Kindle (KOReader) bridge. Nothing touches the device
// until Check Kindle is pressed; the check reads only, and keeps a copy of
// KOReader's data under userData/kindle/snapshots.

// KOReader stores its "On hold" status as 'abandoned'.
const STATUS_LABEL = { reading: 'Reading', complete: 'Finished', abandoned: 'On hold' } as const

export default function KindlePage() {
  const qc = useQueryClient()
  const { data: status, isLoading, isError, refetch } = useQuery({
    queryKey: qk.kindle.status,
    queryFn: () => api.kindle.status()
  })
  const { data: settings } = useSettings()
  const folder = settings?.['kindle.folder'] || ''
  const [checking, setChecking] = useState(false)
  const [importing, setImporting] = useState(false)
  const [linking, setLinking] = useState<KindleDeviceBook | null>(null)
  const [linkingSeries, setLinkingSeries] = useState<KindleDeviceSeries | null>(null)

  async function check(): Promise<void> {
    setChecking(true)
    try {
      const next = await api.kindle.check()
      qc.setQueryData<KindleStatus>(qk.kindle.status, next)
    } finally {
      setChecking(false)
    }
  }

  async function refresh(): Promise<void> {
    await qc.invalidateQueries({ queryKey: qk.kindle.all })
  }

  async function chooseFolder(): Promise<void> {
    const picked = await api.files.chooseFolder('Choose the copied Kindle folder', folder || undefined)
    if (!picked) return
    await api.settings.set('kindle.folder', picked)
    await qc.invalidateQueries({ queryKey: qk.settings.all })
  }

  async function forgetFolder(): Promise<void> {
    await api.settings.set('kindle.folder', '')
    await qc.invalidateQueries({ queryKey: qk.settings.all })
  }

  async function undo(): Promise<void> {
    const ok = await confirmDialog(
      'Undo the last Kindle import? Progress, status, quotes and reading days go back to how they were, except anything you have changed since.',
      { confirmLabel: 'Undo import' }
    )
    if (!ok) return
    const r = await api.kindle.undoLastImport()
    toast(
      r.kept > 0
        ? `Undone. ${r.kept} ${r.kept === 1 ? 'item was' : 'items were'} changed since the import and kept.`
        : 'The last Kindle import was undone.',
      'success'
    )
    void qc.invalidateQueries({ queryKey: qk.kindle.all })
    void qc.invalidateQueries({ queryKey: qk.media.all })
    void qc.invalidateQueries({ queryKey: qk.quotes.all })
    void qc.invalidateQueries({ queryKey: qk.checklist.all })
    // Undo can take imported words back out of the decks.
    void qc.invalidateQueries({ queryKey: qk.english.all })
    void qc.invalidateQueries({ queryKey: qk.japanese.all })
  }

  async function link(book: KindleDeviceBook, mediaId: number): Promise<void> {
    if (!book.partialMd5) return
    await api.kindle.link(book.partialMd5, mediaId)
    setLinking(null)
    await refresh()
  }

  async function unlink(book: KindleDeviceBook): Promise<void> {
    if (!book.partialMd5) return
    await api.kindle.unlink(book.partialMd5)
    await refresh()
  }

  async function linkSeries(series: KindleDeviceSeries, mediaId: number): Promise<void> {
    await api.kindle.linkSeries(series.key, mediaId)
    setLinkingSeries(null)
    await refresh()
  }

  async function unlinkSeries(series: KindleDeviceSeries): Promise<void> {
    await api.kindle.unlinkSeries(series.key)
    await refresh()
  }

  const device = status?.device ?? null
  const books = status?.books ?? []
  const series = status?.series ?? []
  const linked = books.filter((b) => b.mediaId != null)
  const unlinked = books.filter((b) => b.mediaId == null)

  return (
    <div>
      <PageHeader
        title="Kindle"
        back={{ to: '/books', label: 'Books' }}
        subtitle="Reading progress, highlights and reading time for books and manga from KOReader on your Kindle. Nothing is read from the device until you check it, and only Send to Kindle writes to it, into its own NaviHUB folder."
        actions={
          <>
            {status?.canUndoImport && (
              <button type="button" className="btn-ghost" onClick={() => void undo()}>
                Undo last import
              </button>
            )}
            {device && (
              <button type="button" className="btn-ghost" disabled={checking} onClick={() => setImporting(true)}>
                Import from Kindle…
              </button>
            )}
            <button type="button" className="btn-primary" disabled={checking} onClick={() => void check()}>
              {checking ? 'Checking…' : 'Check Kindle'}
            </button>
          </>
        }
      />

      {isError ? (
        <div className="text-sm">
          <p className="text-signal-anomaly">Could not read the Kindle status.</p>
          <button type="button" className="btn-ghost mt-2 text-xs" onClick={() => void refetch()}>
            Try again
          </button>
        </div>
      ) : isLoading ? (
        <p className="text-sm text-gray-400">Loading…</p>
      ) : (
        <>
          {status?.error && (
            <p role="alert" className="mb-4 text-sm text-signal-anomaly">
              The last check failed: {status.error}
            </p>
          )}

          {device ? (
            <section className="card mb-6 p-4" aria-label="Device">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold">{device.label}</h2>
                {status?.checkedAt && (
                  <span className="text-xs text-gray-400">
                    Checked {new Date(status.checkedAt).toLocaleString()}
                  </span>
                )}
              </div>
              <p className="mt-1 break-all text-xs text-gray-400">{device.location}</p>
              <dl className="mt-3 grid grid-cols-2 gap-3 text-sm sm:grid-cols-4">
                <div>
                  <dt className="text-xs text-gray-400">Free space</dt>
                  <dd>
                    {device.freeBytes != null && device.totalBytes != null
                      ? `${bytes(device.freeBytes)} of ${bytes(device.totalBytes)}`
                      : 'Unknown'}
                  </dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">KOReader</dt>
                  <dd>{device.hasKoReader ? 'Installed' : 'Not found'}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">Books</dt>
                  <dd>{books.length}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">Manga series</dt>
                  <dd>{series.length}</dd>
                </div>
                <div>
                  <dt className="text-xs text-gray-400">Last import</dt>
                  <dd>{status?.lastImportAt ? new Date(`${status.lastImportAt}Z`).toLocaleString() : 'Never'}</dd>
                </div>
              </dl>
            </section>
          ) : (
            <EmptyState
              title={status?.checkedAt ? 'No Kindle found' : 'Connect your Kindle'}
              body={
                <>
                  <p>
                    Plug the Kindle in with USB, unlock it, then press Check Kindle. On Linux the Kindle appears
                    through the file manager's MTP mount.
                  </p>
                  <p className="mt-2">
                    On Windows, direct access is not built yet. Until it is, copy the Kindle's{' '}
                    <code>documents</code> and <code>koreader</code> folders into one folder with Explorer and
                    choose that folder below.
                  </p>
                </>
              }
            />
          )}

          <section className="mb-6 text-sm" aria-label="Copied folder">
            <h2 className="label mb-1">Copied Kindle folder</h2>
            <p className="text-gray-400">
              {folder ? (
                <>
                  Used when no Kindle is connected: <span className="break-all text-ink">{folder}</span>
                </>
              ) : (
                'None. A connected Kindle is always used first.'
              )}
            </p>
            <div className="mt-2 flex gap-2">
              <button type="button" className="btn-ghost text-xs" onClick={() => void chooseFolder()}>
                {folder ? 'Change folder…' : 'Choose folder…'}
              </button>
              {folder && (
                <button type="button" className="btn-ghost text-xs" onClick={() => void forgetFolder()}>
                  Forget folder
                </button>
              )}
            </div>
          </section>

          {device && (
            <>
              <BookSection
                title="Linked to your library"
                empty="No book on the Kindle is linked yet. Link one below to import its progress and highlights."
                books={linked}
                onLink={setLinking}
                onUnlink={(b) => void unlink(b)}
                onPickSuggestion={(b, id) => void link(b, id)}
              />
              <BookSection
                title="Not linked"
                empty="Every book KOReader knows is linked."
                books={unlinked}
                onLink={setLinking}
                onUnlink={(b) => void unlink(b)}
                onPickSuggestion={(b, id) => void link(b, id)}
              />
              <SeriesSection
                series={series}
                onLink={setLinkingSeries}
                onUnlink={(s) => void unlinkSeries(s)}
                onPickSuggestion={(s, id) => void linkSeries(s, id)}
              />
            </>
          )}

          <KindleUnfinishedSends />
          <KindleMakeBooks />
          <KindleGuide />
        </>
      )}

      {importing && status?.device && (
        <KindleImportDialog scanId={status.checkedAt ?? ''} onClose={() => setImporting(false)} />
      )}
      {linking && (
        <KindleLinkDialog
          name={linking.title}
          onPick={(id) => void link(linking, id)}
          onClose={() => setLinking(null)}
        />
      )}
      {linkingSeries && (
        <KindleLinkDialog
          name={linkingSeries.name}
          mediaType="manga"
          onPick={(id) => void linkSeries(linkingSeries, id)}
          onClose={() => setLinkingSeries(null)}
        />
      )}
    </div>
  )
}

function BookSection({
  title,
  empty,
  books,
  onLink,
  onUnlink,
  onPickSuggestion
}: {
  title: string
  empty: string
  books: KindleDeviceBook[]
  onLink: (b: KindleDeviceBook) => void
  onUnlink: (b: KindleDeviceBook) => void
  onPickSuggestion: (b: KindleDeviceBook, mediaId: number) => void
}) {
  return (
    <section className="mb-6" aria-label={title}>
      <h2 className="label mb-2">
        {title} ({books.length})
      </h2>
      {books.length === 0 ? (
        <p className="text-sm text-gray-400">{empty}</p>
      ) : (
        <ul className="divide-y divide-line-subtle">
          {books.map((b) => (
            <li key={b.key} className="flex flex-wrap items-start gap-3 py-3">
              <div className="min-w-0 flex-1">
                <p className="font-medium">
                  {b.mediaId != null ? (
                    <Link to={`/books/${b.mediaId}`} className="text-signal-link hover:underline">
                      {b.mediaTitle ?? b.title}
                    </Link>
                  ) : (
                    b.title
                  )}
                </p>
                <p className="text-xs text-gray-400">
                  {[
                    b.authors,
                    b.status ? STATUS_LABEL[b.status] : null,
                    percent(b.percent),
                    b.highlights > 0 ? `${b.highlights} ${b.highlights === 1 ? 'highlight' : 'highlights'}` : null,
                    b.readSeconds > 0 ? `read ${readTime(b.readSeconds)}` : null,
                    b.link === 'sent' ? 'sent from NaviHUB' : null
                  ]
                    .filter(Boolean)
                    .join(' · ')}
                </p>
                {b.devicePath && <p className="break-all text-xs text-gray-500">{b.devicePath}</p>}
                {b.mediaId == null && !b.partialMd5 && (
                  <p className="text-xs text-gray-400">Open it once in KOReader before it can be linked.</p>
                )}
              </div>
              <div className="flex flex-wrap items-center gap-2">
                {b.mediaId == null &&
                  b.partialMd5 &&
                  b.suggestions.map((s) => (
                    <button
                      key={s.mediaId}
                      type="button"
                      className="btn-ghost text-xs"
                      onClick={() => onPickSuggestion(b, s.mediaId)}
                    >
                      Link to {s.title}
                    </button>
                  ))}
                {b.mediaId == null && b.partialMd5 && (
                  <button type="button" className="btn-ghost text-xs" onClick={() => onLink(b)}>
                    {b.suggestions.length ? 'Another book…' : 'Link to a book…'}
                  </button>
                )}
                {b.link === 'linked' && (
                  <button type="button" className="btn-ghost text-xs" onClick={() => onUnlink(b)}>
                    Unlink
                  </button>
                )}
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}

// "volumes 1-3, 5", for the read volume files of a series.
function volumeRanges(volumes: number[]): string {
  const parts: string[] = []
  let start = volumes[0]
  let prev = volumes[0]
  for (const v of [...volumes.slice(1), NaN]) {
    if (v === prev + 1) {
      prev = v
      continue
    }
    parts.push(start === prev ? `${start}` : `${start}-${prev}`)
    start = v
    prev = v
  }
  return `${volumes.length === 1 ? 'volume' : 'volumes'} ${parts.join(', ')}`
}

// Manga series: one folder of comic files under documents/, linked as a whole
// to a library manga. Chapter progress comes from the chapter numbers in the
// file names, so the link is per series.
function SeriesSection({
  series,
  onLink,
  onUnlink,
  onPickSuggestion
}: {
  series: KindleDeviceSeries[]
  onLink: (s: KindleDeviceSeries) => void
  onUnlink: (s: KindleDeviceSeries) => void
  onPickSuggestion: (s: KindleDeviceSeries, mediaId: number) => void
}) {
  if (series.length === 0) return null
  const linkedCount = series.filter((s) => s.mediaId != null).length
  return (
    <section className="mb-6" aria-label="Manga series">
      <h2 className="label mb-2">
        Manga series ({linkedCount} of {series.length} linked)
      </h2>
      <p className="mb-2 text-xs text-gray-400">
        A chapter counts as read when KOReader marked it finished or it was read to the last page. Volume files are
        shown but never turned into a chapter count.
      </p>
      <ul className="divide-y divide-line-subtle">
        {series.map((s) => (
          <li key={s.key} className="flex flex-wrap items-start gap-3 py-3">
            <div className="min-w-0 flex-1">
              <p className="font-medium">
                {s.mediaId != null ? (
                  <Link to={`/manga/${s.mediaId}`} className="text-signal-link hover:underline">
                    {s.mediaTitle ?? s.name}
                  </Link>
                ) : (
                  s.name
                )}
              </p>
              <p className="text-xs text-gray-400">
                {[
                  `${s.files} ${s.files === 1 ? 'file' : 'files'}`,
                  s.numbering === 'unclear'
                    ? 'chapter numbers restart in each volume and some volumes are single files, so progress is set by hand'
                    : s.lastChapter != null
                    ? s.numbering === 'per-volume'
                      ? `read up to chapter ${s.lastChapter}, counted in volume order`
                      : `read up to chapter ${s.lastChapter}`
                    : null,
                  s.volumesRead.length ? `read ${volumeRanges(s.volumesRead)}` : null,
                  s.readSeconds > 0 ? `read ${readTime(s.readSeconds)}` : null,
                  s.mediaId != null && s.mediaTitle !== s.name ? `folder ${s.name}` : null
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              {s.mediaId == null &&
                s.suggestions.map((m) => (
                  <button
                    key={m.mediaId}
                    type="button"
                    className="btn-ghost text-xs"
                    onClick={() => onPickSuggestion(s, m.mediaId)}
                  >
                    Link to {m.title}
                  </button>
                ))}
              {s.mediaId == null ? (
                <button type="button" className="btn-ghost text-xs" onClick={() => onLink(s)}>
                  {s.suggestions.length ? 'Another manga…' : 'Link to a manga…'}
                </button>
              ) : (
                <button type="button" className="btn-ghost text-xs" onClick={() => onUnlink(s)}>
                  Unlink
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
