import { useEffect, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { ARCHIVE_KINDS, LICENSES, type ArchiveKind } from '@shared/history/schema'
import { mediaUrl, thumbUrl } from '@shared/mediaUrl'
import type { HistoryArchiveItem, HistoryArticleView } from '@shared/types'
import Lightbox from '../Lightbox'
import { PlayIcon } from '../PlayerIcons'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { confirmDialog } from '../../lib/confirm'
import { usePlayerControls } from '../../lib/player'

// A History page's real-life archive: recordings play in the app's player
// (track ids in the `history-` namespace), video and documents open in the
// system's own apps, photos open in the lightbox. Research suggestions show
// their holding archive, license and size, and download on request.

type Filter = 'all' | ArchiveKind

const licenseLabel = (id: string | null): string | null =>
  id ? (LICENSES as Record<string, string>)[id] ?? id : null

const sizeLabel = (bytes: number | null): string | null => {
  if (!bytes) return null
  const mb = bytes / (1024 * 1024)
  return mb >= 1024 ? `${(mb / 1024).toFixed(1)} GB` : mb >= 1 ? `${Math.round(mb)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`
}

const duration = (s: number | null): string | null =>
  s ? `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, '0')}` : null

function meta(item: HistoryArchiveItem): string {
  return [ARCHIVE_KINDS[item.kind], item.date, duration(item.durationSec), item.credit, licenseLabel(item.license), sizeLabel(item.bytes)]
    .filter(Boolean)
    .join(' · ')
}

export default function HistoryArchiveList({ view }: { view: HistoryArticleView }) {
  const queryClient = useQueryClient()
  const player = usePlayerControls()
  const [filter, setFilter] = useState<Filter>('all')
  const [lightbox, setLightbox] = useState<number | null>(null)
  const { data: jobs = [] } = useQuery({
    queryKey: qk.history.archiveJobs,
    queryFn: () => api.history.archiveJobs(),
    refetchInterval: (q) => (q.state.data?.some((j) => j.state === 'running') ? 800 : false)
  })
  // A job finishing changes the page's archive rows.
  const running = useRef(new Set<string>())
  useEffect(() => {
    const now = new Set(jobs.filter((j) => j.state === 'running').map((j) => j.id))
    const settled = [...running.current].some((id) => !now.has(id))
    running.current = now
    if (settled) void queryClient.invalidateQueries({ queryKey: qk.history.all })
  }, [jobs, queryClient])

  const pollJobs = (): void => void queryClient.invalidateQueries({ queryKey: qk.history.archiveJobs })

  const items = view.archive
  const local = items.filter((i) => i.state !== 'suggested')
  const suggested = items.filter((i) => i.state === 'suggested')
  const shown = local.filter((i) => filter === 'all' || i.kind === filter)
  const photos = shown.filter((i) => i.kind === 'image' && i.state === 'local' && i.relPath)
  const counts = (k: ArchiveKind): number => local.filter((i) => i.kind === k).length
  const title = view.entity.names.find((n) => n.role === 'primary')?.text ?? view.ref

  const play = (item: HistoryArchiveItem): void => {
    if (!item.relPath || item.rowId === null) return
    player.playQueue(
      [{ id: `history-${item.rowId}`, src: mediaUrl(item.relPath) ?? undefined, title: item.title, subtitle: item.credit ?? 'History archive', context: title, mediaId: null }],
      0
    )
  }

  const remove = async (item: HistoryArchiveItem): Promise<void> => {
    if (item.rowId === null) return
    const ok = await confirmDialog(`Remove "${item.title}" from this page? Its copy in your History folder is deleted.`, {
      confirmLabel: 'Remove',
      danger: true
    })
    if (!ok) return
    await api.history.removeArchive(item.rowId, true)
    void queryClient.invalidateQueries({ queryKey: qk.history.all })
  }

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-2">
        {local.length > 0 && (
          <div className="flex flex-wrap gap-2" role="group" aria-label="Archive filter">
            {(['all', 'audio', 'video', 'image', 'document'] as const).map((f) => {
              const n = f === 'all' ? local.length : counts(f)
              if (f !== 'all' && n === 0) return null
              return (
                <button key={f} type="button" className={`pill ${filter === f ? 'pill-active' : ''}`} aria-pressed={filter === f} onClick={() => setFilter(f)}>
                  {f === 'all' ? 'All' : f === 'image' ? 'Photos' : ARCHIVE_KINDS[f] + (f === 'document' ? 's' : '')}{' '}
                  <span className={filter === f ? 'opacity-70' : 'text-gray-500'}>{n}</span>
                </button>
              )
            })}
          </div>
        )}
        <button
          type="button"
          className="btn-ghost ml-auto h-8 text-xs"
          onClick={async () => {
            const r = await api.history.attachFile(view.ref)
            if (r.started) pollJobs()
          }}
        >
          Attach file
        </button>
      </div>

      {local.length === 0 && suggested.length === 0 && (
        <p className="text-sm text-ink-muted">No recordings, footage, photos or documents yet. Attach your own, or a research session can suggest public-domain items.</p>
      )}

      <ul className="space-y-2">
        {shown
          .filter((i) => i.kind !== 'image' || i.state !== 'local')
          .map((item) => (
            <li key={item.key} className="card flex items-center gap-4 p-3">
              {item.kind === 'audio' && item.state === 'local' ? (
                <button
                  type="button"
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-[rgb(var(--ink-inverse))] hover:bg-accent-hover"
                  aria-label={`Play ${item.title}`}
                  title="Play"
                  onClick={() => play(item)}
                >
                  <PlayIcon className="h-4 w-4" />
                </button>
              ) : (
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-base-700 text-[10px] font-semibold uppercase text-ink-muted">
                  {item.kind === 'document' ? 'Doc' : ARCHIVE_KINDS[item.kind]}
                </span>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-ink">{item.title}</p>
                <p className="truncate text-xs text-ink-muted">{meta(item)}</p>
              </div>
              {item.state === 'missing' ? (
                <span className="text-xs text-signal-anomaly">File missing</span>
              ) : (
                item.kind !== 'audio' && (
                  <button type="button" className="btn-ghost h-8 text-xs" onClick={() => void api.history.openArchive(item.rowId!)}>
                    Open
                  </button>
                )
              )}
              {item.rowId !== null && (
                <button type="button" className="btn-ghost h-8 text-xs" onClick={() => void remove(item)}>
                  Remove
                </button>
              )}
            </li>
          ))}
      </ul>

      {photos.length > 0 && (
        <div className="mt-3 grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-2">
          {photos.map((p, i) => (
            <button key={p.key} type="button" className="group relative block overflow-hidden rounded-md" onClick={() => setLightbox(i)} aria-label={`View ${p.title}`}>
              <img src={thumbUrl(p.relPath, 320) ?? mediaUrl(p.relPath!) ?? undefined} alt="" loading="lazy" className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-[1.03] motion-reduce:transition-none" />
              <span className="media-contrast absolute inset-x-0 bottom-0 truncate bg-black/60 px-2 py-1 text-left text-[10px] text-gray-200">{p.title}</span>
            </button>
          ))}
        </div>
      )}
      {lightbox !== null && photos[lightbox] && (
        <Lightbox
          images={photos.map((p) => ({ url: mediaUrl(p.relPath!) ?? '', alt: p.title }))}
          index={lightbox}
          onIndexChange={setLightbox}
          onClose={() => setLightbox(null)}
        />
      )}

      {suggested.length > 0 && (
        <>
          <p className="mb-2 mt-6 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink-muted">Suggested by research</p>
          <ul className="space-y-2">
            {suggested.map((item) => {
              const job = jobs.find((j) => j.key === item.key && j.state === 'running')
              const failed = jobs.find((j) => j.key === item.key && j.state === 'error')
              const pct = job && job.total > 0 ? Math.min(100, Math.round((job.done / job.total) * 100)) : null
              return (
                <li key={item.key} className="flex items-center gap-4 rounded-lg border border-dashed border-line-strong p-3">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-medium text-ink-secondary">{item.title}</p>
                    <p className="truncate text-xs text-ink-muted">{meta(item)}</p>
                    {item.page && (
                      <button type="button" className="text-xs text-signal-link hover:underline" onClick={() => void api.app.openExternal(item.page!)}>
                        View at the archive
                      </button>
                    )}
                    {job && (
                      <div
                        className="mt-2 h-1.5 overflow-hidden rounded-full bg-base-700"
                        role="progressbar"
                        aria-label={`Downloading ${item.title}`}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-valuenow={pct ?? undefined}
                      >
                        <div className="h-full bg-accent transition-[width]" style={{ width: `${pct ?? 5}%` }} />
                      </div>
                    )}
                    {failed && !job && <p className="mt-1 text-xs text-signal-anomaly">Download failed: {failed.error}</p>}
                  </div>
                  {job ? (
                    <>
                      <span className="text-xs tabular-nums text-ink-muted">{pct !== null ? `${pct}%` : sizeLabel(job.done)}</span>
                      <button type="button" className="btn-ghost h-8 text-xs" onClick={() => void api.history.cancelArchiveJob(job.id).then(pollJobs)}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="btn-ghost h-8 text-xs"
                      onClick={async () => {
                        const id = item.key.slice(item.key.indexOf('#') + 1)
                        await api.history.downloadSuggestion(view.ref, id)
                        pollJobs()
                      }}
                    >
                      Download
                    </button>
                  )}
                </li>
              )
            })}
          </ul>
        </>
      )}
    </div>
  )
}
