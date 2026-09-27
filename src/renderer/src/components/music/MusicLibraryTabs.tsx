import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode
} from 'react'
import EmptyState from '../EmptyState'
import { Link } from 'react-router-dom'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { useIncrementalList } from '../../lib/hooks'
import { usePersistedState } from '../../lib/navState'
import CoverImage from '../CoverImage'
import type {
  MusicBrowseScope,
  MusicDecadeFilter,
  MusicPlaylistSummary,
  MusicTrackBrowseFilter,
  MusicTrackBrowseSort
} from '@shared/types'
import { Field } from '../Field'
import ThemedFailure from '../theme/ThemedFailure'
import { GRID, ArtistCard, AlbumCard, TrackList } from './MusicBrowse'

export function LoadFailed({ what, onRetry }: { what: string; onRetry: () => void }) {
  return <ThemedFailure message={`Could not load ${what}.`} onRetry={onRetry} retryLabel={`Retry ${what}`} />
}

export function ArtistsTab() {
  const [sort, setSort] = usePersistedState<'name' | 'albums' | 'tracks'>('musicArtistSort', 'name')
  const [missingArt, setMissingArt] = usePersistedState('musicArtistMissingArt', false)
  const { data: artists = [], isLoading, isLoadingError, refetch } = useQuery({
    queryKey: qk.music.artists(''),
    queryFn: () => api.music.artists()
  })
  const ordered = useMemo(() => {
    const next = artists.filter((artist) => !missingArt || !artist.coverPath)
    return [...next].sort((a, b) => {
      if (sort === 'albums') return b.albumCount - a.albumCount || a.name.localeCompare(b.name)
      if (sort === 'tracks') return b.trackCount - a.trackCount || a.name.localeCompare(b.name)
      return a.name.localeCompare(b.name)
    })
  }, [artists, missingArt, sort])
  const { visible, sentinelRef } = useIncrementalList(ordered)
  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>
  if (isLoadingError) return <LoadFailed what="artists" onRetry={() => void refetch()} />
  return (
    <>
      <BrowseControls>
        <label className="flex items-center gap-2 text-sm text-gray-400">
          Sort
          <select className="input w-auto py-1.5" value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
            <option value="name">Artist name</option>
            <option value="albums">Most albums</option>
            <option value="tracks">Most tracks</option>
          </select>
        </label>
        <button className={missingArt ? 'pill-active' : 'pill'} onClick={() => setMissingArt(!missingArt)}>
          Missing photos
        </button>
        <span className="text-xs text-gray-500">{ordered.length} artists</span>
      </BrowseControls>
      <div className={GRID}>
        {visible.map((a) => (
          <ArtistCard key={a.id} artist={a} />
        ))}
      </div>
      <div ref={sentinelRef} />
    </>
  )
}

export function AlbumsTab({ scope, onScope }: { scope: MusicBrowseScope; onScope: (scope: MusicBrowseScope) => void }) {
  const [sort, setSort] = usePersistedState<'catalog' | 'title' | 'newest' | 'oldest'>('musicAlbumSort', 'catalog')
  const [missingArt, setMissingArt] = usePersistedState('musicAlbumMissingArt', false)
  const { data: albums = [], isLoading, isLoadingError, refetch } = useQuery({
    queryKey: qk.music.albums('', scope),
    queryFn: () => api.music.albums('', scope)
  })
  const ordered = useMemo(() => {
    const next = albums.filter((album) => !missingArt || !album.coverPath)
    return [...next].sort((a, b) => {
      if (sort === 'title') return a.title.localeCompare(b.title)
      if (sort === 'newest') return (b.year ?? -Infinity) - (a.year ?? -Infinity) || a.title.localeCompare(b.title)
      if (sort === 'oldest') return (a.year ?? Infinity) - (b.year ?? Infinity) || a.title.localeCompare(b.title)
      return a.artistName.localeCompare(b.artistName) || (a.year ?? Infinity) - (b.year ?? Infinity) || a.title.localeCompare(b.title)
    })
  }, [albums, missingArt, sort])
  const { visible, sentinelRef } = useIncrementalList(ordered)
  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>
  if (isLoadingError) return <LoadFailed what="albums" onRetry={() => void refetch()} />
  return (
    <>
      <BrowseControls>
        <label className="flex items-center gap-2 text-sm text-gray-400">
          Sort
          <select className="input w-auto py-1.5" value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
            <option value="catalog">Artist and release</option>
            <option value="title">Album title</option>
            <option value="newest">Newest year</option>
            <option value="oldest">Oldest year</option>
          </select>
        </label>
        <ScopeSelects scope={scope} onScope={onScope} count="albums" />
        <button className={missingArt ? 'pill-active' : 'pill'} onClick={() => setMissingArt(!missingArt)}>
          Missing covers
        </button>
        <span className="text-xs text-gray-500">{ordered.length} albums</span>
      </BrowseControls>
      <div className={GRID}>
        {visible.map((a) => (
          <AlbumCard key={a.id} album={a} />
        ))}
      </div>
      <div ref={sentinelRef} />
    </>
  )
}

export function TracksTab({ scope, onScope }: { scope: MusicBrowseScope; onScope: (scope: MusicBrowseScope) => void }) {
  const [sort, setSort] = usePersistedState<MusicTrackBrowseSort>('musicTrackSort', 'catalog')
  const [filter, setFilter] = usePersistedState<MusicTrackBrowseFilter>('musicTrackFilter', 'all')
  const {
    data: pages,
    isLoading,
    isLoadingError,
    refetch,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: qk.music.trackPage(sort, filter, scope),
    queryFn: ({ pageParam }) => api.music.trackPage({ sort, filter, ...scope, offset: pageParam, limit: 192 }),
    initialPageParam: 0,
    getNextPageParam: (last) => (last.hasMore ? last.offset + last.items.length : undefined)
  })
  const tracks = useMemo(() => pages?.pages.flatMap((page) => page.items) ?? [], [pages])
  const total = pages?.pages[0]?.total ?? 0
  const pageSentinelRef = useRef<HTMLDivElement | null>(null)
  useEffect(() => {
    const element = pageSentinelRef.current
    if (!element || !hasNextPage || isFetchingNextPage) return
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) void fetchNextPage()
      },
      { rootMargin: '600px' }
    )
    observer.observe(element)
    return () => observer.disconnect()
  }, [fetchNextPage, hasNextPage, isFetchingNextPage])
  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>
  if (isLoadingError) return <LoadFailed what="tracks" onRetry={() => void refetch()} />
  return (
    <>
      <BrowseControls>
        <label className="flex items-center gap-2 text-sm text-gray-400">
          Sort
          <select className="input w-auto py-1.5" value={sort} onChange={(event) => setSort(event.target.value as typeof sort)}>
            <option value="catalog">Artist and album</option>
            <option value="recent">Recently played</option>
            <option value="most">Most played</option>
            <option value="least">Least played</option>
            <option value="title">Track title</option>
          </select>
        </label>
        <ScopeSelects scope={scope} onScope={onScope} count="tracks" />
        {(['all', 'unplayed', 'missingArt'] as const).map((value) => (
          <button key={value} className={filter === value ? 'pill-active' : 'pill'} onClick={() => setFilter(value)}>
            {value === 'all' ? 'All' : value === 'unplayed' ? 'Unplayed' : 'Missing covers'}
          </button>
        ))}
        <span className="text-xs text-gray-500">{total} tracks</span>
      </BrowseControls>
      <TrackList tracks={tracks} batch={Number.MAX_SAFE_INTEGER} />
      <div ref={pageSentinelRef} />
      {(hasNextPage || isFetchingNextPage) && (
        <p className="mt-3 text-center text-xs text-gray-500">
          {isFetchingNextPage ? 'Loading more tracks…' : `Showing ${tracks.length} of ${total}`}
        </p>
      )}
    </>
  )
}

function ScopeSelects({
  scope,
  onScope,
  count
}: {
  scope: MusicBrowseScope
  onScope: (scope: MusicBrowseScope) => void
  count: 'albums' | 'tracks'
}) {
  return (
    <>
      <GenreSelect value={scope.genre ?? null} onChange={(genre) => onScope({ ...scope, genre })} count={count} />
      <DecadeSelect value={scope.decade ?? null} onChange={(decade) => onScope({ ...scope, decade })} count={count} />
    </>
  )
}

function DecadeSelect({
  value,
  onChange,
  count
}: {
  value: MusicDecadeFilter | null
  onChange: (decade: MusicDecadeFilter | null) => void
  count: 'albums' | 'tracks'
}) {
  const { data: decades = [] } = useQuery({ queryKey: qk.music.decades, queryFn: () => api.music.decades() })
  if (!decades.length) return null
  const selected = value == null ? '' : String(value)
  return (
    <label className="flex items-center gap-2 text-sm text-gray-400">
      Year
      <select
        className="input w-auto py-1.5"
        value={selected}
        onChange={(event) => {
          const next = event.target.value
          onChange(next === '' ? null : next === 'unknown' ? 'unknown' : Number(next))
        }}
      >
        <option value="">All years</option>
        {decades.map((row) => (
          <option key={row.decade ?? 'unknown'} value={row.decade ?? 'unknown'}>
            {row.decade == null ? 'Unknown year' : `${row.decade}s`} ({count === 'albums' ? row.albumCount : row.trackCount})
          </option>
        ))}
      </select>
    </label>
  )
}

// Hidden until a scan has read genre tags, unless a saved choice needs clearing.
function GenreSelect({
  value,
  onChange,
  count
}: {
  value: string | null
  onChange: (genre: string | null) => void
  count: 'albums' | 'tracks'
}) {
  const { data: genres = [] } = useQuery({ queryKey: qk.music.genres, queryFn: () => api.music.genres() })
  if (!genres.length && !value) return null
  const known = value == null || genres.some((genre) => genre.name === value)
  return (
    <label className="flex items-center gap-2 text-sm text-gray-400">
      Genre
      <select
        className="input w-auto max-w-[14rem] py-1.5"
        value={value ?? ''}
        onChange={(event) => onChange(event.target.value || null)}
      >
        <option value="">All genres</option>
        {!known && <option value={value}>{value}</option>}
        {genres.map((genre) => (
          <option key={genre.name} value={genre.name}>
            {genre.name} ({count === 'albums' ? genre.albumCount : genre.trackCount})
          </option>
        ))}
      </select>
    </label>
  )
}

function BrowseControls({ children }: { children: ReactNode }) {
  return <div className="mb-4 flex flex-wrap items-center gap-2">{children}</div>
}

export function PlaylistsTab({ onImport }: { onImport: () => void }) {
  const qc = useQueryClient()
  const [newTitle, setNewTitle] = useState('')
  const { data: playlists = [], isLoading, isLoadingError, refetch } = useQuery({
    queryKey: qk.music.playlists,
    queryFn: () => api.music.playlists()
  })

  async function create(): Promise<void> {
    const title = newTitle.trim()
    if (!title) return
    await api.music.createPlaylist({ title })
    setNewTitle('')
    qc.invalidateQueries({ queryKey: qk.music.playlists })
  }

  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>
  if (isLoadingError) return <LoadFailed what="playlists" onRetry={() => void refetch()} />
  return (
    <>
      <p className="mb-4 text-sm"><Link className="text-accent underline" to="/music/smart">Smart playlists</Link> update automatically from your likes, tags, and listening history.</p>
      <div className="mb-4 flex max-w-2xl flex-col gap-2 sm:flex-row">
        <Field label="New playlist title" hiddenLabel className="contents">
          <input
            className="input"
            placeholder="New playlist…"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault()
                void create()
              }
            }}
          />
        </Field>
        <button className="btn-ghost" disabled={!newTitle.trim()} onClick={create}>
          Create
        </button>
        <button className="btn-ghost shrink-0" onClick={onImport}>
          Import from Spotify…
        </button>
      </div>
      {playlists.length === 0 ? (
        <EmptyState title="No playlists yet" body="Create one above." />
      ) : (
        <div className={GRID}>
          {playlists.map((p) => (
            <PlaylistCard key={p.id} playlist={p} />
          ))}
        </div>
      )}
    </>
  )
}

function PlaylistCard({ playlist }: { playlist: MusicPlaylistSummary }) {
  const covers = [...playlist.previewCovers, null, null, null, null].slice(0, 4)
  return (
    <Link to={`/music/playlists/${playlist.id}`} className="group">
      <div className="grid aspect-square w-full grid-cols-2 grid-rows-2 gap-0.5 overflow-hidden rounded-md">
        {covers.map((c, i) => (
          <CoverImage key={i} path={c} alt={playlist.title} rounded="rounded-none" className="h-full w-full" />
        ))}
      </div>
      <p className="mt-2 line-clamp-1 text-sm font-medium group-hover:text-accent">
        {playlist.title}
      </p>
      <p className="text-xs text-gray-500">
        {playlist.trackCount} {playlist.trackCount === 1 ? 'track' : 'tracks'}
      </p>
    </Link>
  )
}
