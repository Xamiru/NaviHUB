import { useId, useState, type ReactNode } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MusicAlbumSummary, MusicLink, MusicLinkOwner, MusicTrack, ThemeSong } from '@shared/types'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useDebouncedValue } from '../../lib/hooks'
import { toastError } from '../../lib/toast'
import Dialog from '../Dialog'
import { Field } from '../Field'
import CoverImage from '../CoverImage'
import { formatDuration } from '../MusicTrackRow'

type Pick = { kind: 'album'; album: MusicAlbumSummary } | { kind: 'track'; track: MusicTrack }

export function themeOptionLabel(t: ThemeSong): string {
  return [t.slug, t.title ?? 'Untitled'].filter(Boolean).join(' · ')
}

// Search the local music library and link an album or a track to a title or a
// wrestler. The dialog stays open after each link so a soundtrack can be
// linked track by track; Done closes it.
export default function LinkMusicDialog({
  owner,
  ownerTitle,
  existing,
  themes = [],
  onClose
}: {
  owner: MusicLinkOwner
  ownerTitle: string
  existing: MusicLink[]
  // Anime only: the title's theme songs, offered as "Full version of".
  themes?: ThemeSong[]
  onClose: () => void
}) {
  const id = useId()
  const qc = useQueryClient()
  const [query, setQuery] = useState('')
  const [pick, setPick] = useState<Pick | null>(null)
  const [label, setLabel] = useState('')
  const [themeId, setThemeId] = useState('')
  const [busy, setBusy] = useState(false)
  const [status, setStatus] = useState('')
  const debounced = useDebouncedValue(query.trim(), 250)
  const results = useQuery({
    queryKey: qk.music.links.search(debounced),
    queryFn: () => api.musicLinks.search(debounced),
    enabled: debounced.length > 0
  })
  const { data: labels = [] } = useQuery({
    queryKey: qk.music.links.labels,
    queryFn: () => api.musicLinks.labels()
  })
  const linkedAlbums = new Set(existing.filter((l) => l.kind === 'album').map((l) => l.album?.id))
  const linkedTracks = new Set(existing.filter((l) => l.kind === 'track').map((l) => l.tracks[0]?.id))
  const offerThemes = themes.length > 0 && pick?.kind === 'track'

  async function submit(): Promise<void> {
    if (!pick) return
    setBusy(true)
    try {
      await api.musicLinks.create({
        owner,
        kind: pick.kind,
        albumId: pick.kind === 'album' ? pick.album.id : null,
        trackId: pick.kind === 'track' ? pick.track.id : null,
        label,
        themeSongId: offerThemes && themeId ? Number(themeId) : null
      })
      await qc.invalidateQueries({ queryKey: qk.music.links.all })
      setStatus(`Linked ${pick.kind === 'album' ? pick.album.title : pick.track.title}.`)
      setPick(null)
      setThemeId('')
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  const albums = results.data?.albums ?? []
  const tracks = results.data?.tracks ?? []
  return (
    <Dialog
      labelledBy={id}
      onClose={onClose}
      panelClassName="flex max-h-[85vh] w-full max-w-2xl flex-col rounded-lg border border-line-subtle bg-surface-panel p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <h2 id={id} className="text-lg font-semibold">
          Link music to {ownerTitle}
        </h2>
        <button className="btn-ghost" onClick={onClose} aria-label="Close" title="Close">
          ✕
        </button>
      </div>
      <Field label="Search your music library" description="Album, track or artist name.">
        <input
          className="input w-full"
          type="search"
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </Field>

      <div className="mt-4 min-h-0 flex-1 overflow-y-auto pr-1" aria-busy={results.isFetching}>
        {debounced.length === 0 ? (
          <p className="text-sm text-gray-400">Search to find an album or a track.</p>
        ) : results.isError ? (
          <p role="alert" className="text-sm text-red-400">
            Could not search the music library.
          </p>
        ) : results.isLoading ? (
          <p className="text-sm text-gray-400">Searching…</p>
        ) : albums.length === 0 && tracks.length === 0 ? (
          <p className="text-sm text-gray-400">Nothing in your music library matches.</p>
        ) : (
          <>
            {albums.length > 0 && (
              <ResultGroup title="Albums">
                {albums.map((a) => (
                  <ResultButton
                    key={`album-${a.id}`}
                    selected={pick?.kind === 'album' && pick.album.id === a.id}
                    linked={linkedAlbums.has(a.id)}
                    onSelect={() => setPick({ kind: 'album', album: a })}
                    cover={a.coverPath}
                    title={a.title}
                    detail={[a.artistName, a.year, `${a.trackCount} ${a.trackCount === 1 ? 'track' : 'tracks'}`]
                      .filter(Boolean)
                      .join(' · ')}
                  />
                ))}
              </ResultGroup>
            )}
            {tracks.length > 0 && (
              <ResultGroup title="Tracks">
                {tracks.map((t) => (
                  <ResultButton
                    key={`track-${t.id}`}
                    selected={pick?.kind === 'track' && pick.track.id === t.id}
                    linked={linkedTracks.has(t.id)}
                    onSelect={() => setPick({ kind: 'track', track: t })}
                    cover={t.coverPath}
                    title={t.title}
                    detail={[t.tagArtist ?? t.artistName, t.albumTitle, t.duration ? formatDuration(t.duration) : null]
                      .filter(Boolean)
                      .join(' · ')}
                  />
                ))}
              </ResultGroup>
            )}
          </>
        )}
      </div>

      <form
        className="mt-4 space-y-3 border-t border-line-subtle pt-4"
        onSubmit={(e) => {
          e.preventDefault()
          void submit()
        }}
      >
        <p className="text-sm text-gray-300" aria-live="polite">
          {pick
            ? `Selected ${pick.kind}: ${pick.kind === 'album' ? pick.album.title : pick.track.title}`
            : 'Select an album or a track above.'}
        </p>
        <div className="flex flex-wrap gap-3">
          <Field
            className="min-w-[14rem] flex-1"
            label="Label"
            description="Optional. For example OST, Opening, or the episode it plays in."
          >
            <input
              className="input w-full"
              list={`${id}-labels`}
              maxLength={80}
              value={label}
              onChange={(e) => setLabel(e.target.value)}
            />
          </Field>
          <datalist id={`${id}-labels`}>
            {labels.map((l) => (
              <option key={l} value={l} />
            ))}
          </datalist>
          {offerThemes && (
            <Field className="min-w-[14rem] flex-1" label="Full version of">
              <select className="input w-full" value={themeId} onChange={(e) => setThemeId(e.target.value)}>
                <option value="">No theme song</option>
                {themes.map((t) => (
                  <option key={t.id} value={t.id}>
                    {themeOptionLabel(t)}
                  </option>
                ))}
              </select>
            </Field>
          )}
        </div>
        <div className="flex items-center justify-end gap-2">
          <p className="mr-auto text-xs text-gray-400" role="status">
            {status}
          </p>
          <button type="button" className="btn-ghost" onClick={onClose}>
            Done
          </button>
          <button type="submit" className="btn-primary" disabled={!pick || busy}>
            Link
          </button>
        </div>
      </form>
    </Dialog>
  )
}

function ResultGroup({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mb-4">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</h3>
      <ul className="space-y-1">{children}</ul>
    </section>
  )
}

function ResultButton({
  selected,
  linked,
  onSelect,
  cover,
  title,
  detail
}: {
  selected: boolean
  linked: boolean
  onSelect: () => void
  cover: string | null
  title: string
  detail: string
}) {
  return (
    <li>
      <button
        type="button"
        aria-pressed={selected}
        onClick={onSelect}
        className={`flex w-full items-center gap-3 rounded-md px-2 py-1.5 text-left hover:bg-base-700 ${
          selected ? 'bg-accent/15 ring-1 ring-inset ring-accent/40' : ''
        }`}
      >
        <CoverImage path={cover} alt="" className="h-9 w-9 shrink-0" fallback="music" thumbWidth={96} />
        <span className="min-w-0 flex-1">
          <span className="block truncate text-sm">{title}</span>
          <span className="block truncate text-xs text-gray-400">{detail}</span>
        </span>
        {linked && <span className="chip shrink-0 text-xs">Linked</span>}
      </button>
    </li>
  )
}
