import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { formatTime } from '@shared/subtitles'
import type { MediaDetail, VideoFile } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import Section from './Section'
import { confirmDialog } from '../lib/confirm'
import { celebrateProgress } from '../lib/themeFx'
import FavoriteButton from './FavoriteButton'
import { useEpisodeFavorites } from './FavoriteEpisodesSection'

// Which file numbers are the entry's own episodes, so a file row can heart its
// number in the Favorite episodes grid. A folder spanning several seasons
// numbers episodes per season, while an AniList entry is one season: hearts
// would collide (S01E05 and S02E05), so none. A folder whose every number is
// past the entry's known total counts across seasons (a second cour as 13-24),
// so none either; otherwise a file past the total (an OVA numbered 13) offers
// none on its own row. Without a known total (airing; some sources store 0)
// the file numbers are all there is, and the grid follows them. Either way the
// grid stays the place to heart.
export function episodeNumberHeartable(
  files: Pick<VideoFile, 'season' | 'number'>[],
  totalUnits: number | null
): (number: number) => boolean {
  const whole = (n: number | null): n is number => n != null && Number.isInteger(n) && n >= 1
  if (new Set(files.map((f) => f.season ?? 1)).size > 1) return () => false
  const total = totalUnits != null && totalUnits > 0 ? totalUnits : null
  if (total == null) return whole
  const numbers = files.map((f) => f.number).filter(whole)
  if (numbers.length > 0 && numbers.every((n) => n > total)) return () => false
  return (n) => whole(n) && n <= total
}

// Linked-video entry point on an anime/movie/tv detail page. Mirrors
// MangaChaptersSection: attach a folder from the video library, list what was
// scanned, then play files in the in-app player (which falls back to the
// system player for codecs it cannot decode). Every row also opens externally.
// Finishing a file in the player, or ticking it by hand, credits progress.
export default function VideoEpisodesSection({ m }: { m: MediaDetail }): JSX.Element {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  // Anime only: a file row hearts its episode number in the same table as the
  // Favorite episodes grid below it.
  const episodeFavorites = useEpisodeFavorites(m.id, m.mediaType === 'anime')

  const { data } = useQuery({
    queryKey: qk.video.library(m.id),
    queryFn: () => api.video.files(m.id)
  })

  const refresh = (): void => {
    qc.invalidateQueries({ queryKey: qk.video.all })
    qc.invalidateQueries({ queryKey: qk.media.detail(m.id) })
  }

  async function run(fn: () => Promise<void>): Promise<void> {
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

  const attach = (): Promise<void> =>
    run(async () => {
      const res = await api.video.attachFolder(m.id)
      if (res.ok) toast(`Found ${res.fileCount} file${res.fileCount === 1 ? '' : 's'}`, 'success')
      else if (res.error) toast(res.error)
    })

  const rescan = (): Promise<void> =>
    run(async () => {
      const res = await api.video.rescan(m.id)
      if (res.ok) toast(`Rescanned: ${res.fileCount} file${res.fileCount === 1 ? '' : 's'}`, 'success')
      else if (res.error) toast(res.error)
    })

  const detach = async (): Promise<void> => {
    const ok = await confirmDialog('Unlink the local folder? Watched marks will be forgotten.', {
      confirmLabel: 'Unlink',
      danger: true
    })
    if (!ok) return
    await run(async () => {
      await api.video.detach(m.id)
    })
  }

  const files = data?.files ?? []
  const heartable = episodeNumberHeartable(files, m.totalUnits)
  const continueFile = files.find((f) => !f.watchedAt)
  const watched = files.filter((f) => f.watchedAt).length

  const openExternal = (f: VideoFile): void => {
    void api.video.openExternal({ kind: 'file', fileId: f.id }).catch(toastError)
  }

  return (
    <Section
      title={`Episodes${files.length ? ` · ${watched}/${files.length} watched` : ''}`}
      className="mb-6"
    >
      {!data?.localDir ? (
        <div className="flex items-center gap-3">
          <button className="btn-ghost px-3 py-1 text-sm" disabled={busy} onClick={() => void attach()}>
            Link video folder
          </button>
          <span className="text-xs text-gray-400">
            Point at this title&apos;s folder to play its episodes here.
          </span>
        </div>
      ) : (
        <>
          <div className="mb-2 flex items-center gap-2 text-sm">
            {continueFile && (
              <Link className="btn-ghost px-3 py-1" to={`/watch/file/${continueFile.id}`}>
                {continueFile.resumeSeconds ? 'Resume' : 'Play next'} · {continueFile.title}
              </Link>
            )}
            <button className="btn-ghost px-3 py-1" disabled={busy} onClick={() => void rescan()}>
              Rescan
            </button>
            <button className="btn-ghost px-3 py-1" disabled={busy} onClick={() => void detach()}>
              Unlink
            </button>
            <span className="truncate text-xs text-gray-400" title={data.localDir}>
              {data.localDir}
            </span>
          </div>
          <div className="max-h-72 space-y-1 overflow-y-auto pr-1">
            {files.map((f) => (
              <EpisodeRow
                key={f.id}
                f={f}
                onExternal={() => openExternal(f)}
                onChange={refresh}
                favorite={
                  m.mediaType === 'anime' &&
                  f.number != null &&
                  heartable(f.number)
                    ? {
                        active: episodeFavorites.favorites.has(f.number),
                        toggle: () => episodeFavorites.toggle(f.number as number)
                      }
                    : null
                }
              />
            ))}
          </div>
        </>
      )}
    </Section>
  )
}

function EpisodeRow({
  f,
  onExternal,
  onChange,
  favorite
}: {
  f: VideoFile
  onExternal: () => void
  onChange: () => void
  // Null when the file has no whole episode number to key a favorite on.
  favorite: { active: boolean; toggle: () => Promise<void> } | null
}): JSX.Element {
  async function toggleWatched(): Promise<void> {
    try {
      const anchor = document.activeElement
      await api.video.markWatched({ kind: 'file', fileId: f.id }, !f.watchedAt)
      if (!f.watchedAt) celebrateProgress(anchor)
      onChange()
    } catch (e) {
      toastError(e)
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-md bg-base-800 px-3 py-2">
      <button
        onClick={() => void toggleWatched()}
        title={f.watchedAt ? 'Mark unwatched' : 'Mark watched'}
        aria-label={f.watchedAt ? 'Mark unwatched' : 'Mark watched'}
        className={`shrink-0 text-sm ${f.watchedAt ? 'text-accent' : 'text-gray-600 hover:text-gray-300'}`}
      >
        {f.watchedAt ? '✓' : '○'}
      </button>
      <Link to={`/watch/file/${f.id}`} className="min-w-0 flex-1 truncate text-left text-sm hover:text-accent">
        {f.title}
      </Link>
      {f.resumeSeconds != null && !f.watchedAt && (
        <span className="chip shrink-0 text-xs" title="Resumes from here in the player">
          at {formatTime(f.resumeSeconds)}
        </span>
      )}
      {f.duration != null && (
        <span className="chip shrink-0 text-xs">
          {formatTime(f.duration)}
        </span>
      )}
      {favorite && (
        <FavoriteButton
          variant="compact"
          active={favorite.active}
          activeLabel={`Remove episode ${f.number} from favorites`}
          inactiveLabel={`Add episode ${f.number} to favorites`}
          onClick={favorite.toggle}
        />
      )}
      <button
        className="btn-ghost shrink-0 px-2 py-0.5 text-xs"
        title="Open in the system player"
        onClick={onExternal}
      >
        External
      </button>
    </div>
  )
}
