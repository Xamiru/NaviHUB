import { useEffect, useMemo, useRef, useState, type ReactNode } from 'react'
import EmptyState from '../components/EmptyState'
import ActionMenu from '../components/ActionMenu'
import PageHeader from '../components/PageHeader'
import Tabs, { TabPanel } from '../components/Tabs'
import { Link, useNavigate } from 'react-router-dom'
import { useInfiniteQuery, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { musicTrackToPlayerTrack, playTracks } from '../lib/musicTracks'
import { useDebouncedValue, useDialog, useIncrementalList, useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { toast, toastError } from '../lib/toast'
import CoverImage from '../components/CoverImage'
import Section from '../components/Section'
import MusicTrackRow, { formatLongDuration } from '../components/MusicTrackRow'
import MusicDownloadDialog, { DownloadPill } from '../components/MusicDownloadDialog'
import type {
  MusicAlbumSummary,
  MusicArtist,
  MusicPlaylistSummary,
  MusicTrack,
  MusicTrackBrowseFilter,
  MusicTrackBrowseSort
} from '@shared/types'
import { Field } from '../components/Field'
import { activityText, useActivity } from '../components/ActivityIndicator'

type Tab = 'artists' | 'albums' | 'tracks' | 'playlists'

export default function MusicLibraryPage() {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const [tab, setTab] = usePersistedState<Tab>('musicTab', 'artists')
  const [search, setSearch] = usePersistedState('musicSearch', '')
  const query = useDebouncedValue(search.trim())
  const [dlOpen, setDlOpen] = useState(false)
  const art = useArtFetch()
  const [scanning, setScanning] = useState(false)

  const { data: settings } = useSettings()
  const { data: stats } = useQuery({ queryKey: qk.music.stats, queryFn: () => api.music.stats() })

  const { data: scanStatus } = useQuery({
    queryKey: qk.music.scanStatus,
    queryFn: () => api.music.scanStatus(),
    enabled: scanning,
    refetchInterval: scanning ? 400 : false
  })

  const hasRoot = !!settings?.['music.dir']?.trim()
  const empty = stats != null && stats.tracks === 0

  async function runScan(pick: boolean): Promise<void> {
    setScanning(true)
    try {
      const summary = pick ? await api.music.pickRoot() : await api.music.scan()
      if (summary) {
        const skipped = summary.skippedRootFiles
          ? ` (${summary.skippedRootFiles} loose file${summary.skippedRootFiles === 1 ? '' : 's'} at the root skipped — use Artist/Album folders)`
          : ''
        toast(
          `Scanned ${summary.tracks} tracks · ${summary.added} new · ${summary.removed} removed${skipped}`,
          'success'
        )
      }
      qc.invalidateQueries({ queryKey: qk.music.all })
      qc.invalidateQueries({ queryKey: qk.settings.all })
    } catch (e) {
      toastError(e)
    } finally {
      setScanning(false)
    }
  }

  async function playAll(shuffle: boolean): Promise<void> {
    try {
      const tracks = await api.music.tracks({})
      if (tracks.length === 0) {
        toast('No tracks in the library yet')
        return
      }
      playTracks(player, tracks, { shuffle })
    } catch (e) {
      toastError(e)
    }
  }

  // First run: no folder chosen (or nothing found) — one big call to action.
  if (stats != null && empty && !scanning) {
    return (
      <div className="flex h-full items-center justify-center p-6">
        <EmptyState
          className="card max-w-md p-8 text-center"
          title="Your music library"
          body={
            <>
              Pick the folder that holds your music — artists as folders, albums inside them.
              NaviHUB scans it in place; nothing is moved or copied.
              {hasRoot && (
                <span className="mt-3 block text-xs text-gray-500">
                  Current folder: {settings?.['music.dir']} (change it in Settings)
                </span>
              )}
            </>
          }
          action={
            <button className="btn-primary" onClick={() => runScan(!hasRoot)}>
              {hasRoot ? 'Scan music folder' : 'Choose music folder…'}
            </button>
          }
        />
      </div>
    )
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Sonic archive"
        subtitle={
          stats && stats.tracks > 0
            ? `${stats.artists} artists · ${stats.albums} albums · ${stats.tracks} tracks · ${formatLongDuration(stats.totalDuration)}`
            : undefined
        }
        actions={
          <>
            <DownloadPill />
            {art.running && (
              <button className="pill" onClick={art.cancel} title="Cancel art fetch">
                Art {art.status ? `${art.status.done}/${art.status.total}` : '…'} — cancel
              </button>
            )}
            {scanning && <span className="pill">Scanning…</span>}
            <button className="btn-primary" onClick={() => playAll(false)}>
              Play all
            </button>
            <button className="btn-ghost" onClick={() => playAll(true)}>
              Shuffle
            </button>
            <ActionMenu
              label="Add music"
              items={[{ label: 'Save audio from a link…', onSelect: () => setDlOpen(true) }]}
            />
            <ActionMenu
              label="Library maintenance"
              items={[
                {
                  label: 'Rescan library',
                  disabled: scanning,
                  onSelect: () => runScan(false)
                },
                {
                  label: 'Find missing art',
                  disabled: art.running,
                  onSelect: () => void art.run()
                }
              ]}
            />
          </>
        }
      />

      {scanning && scanStatus && (
        <div className="card mb-4 p-3 text-sm">
          <div className="mb-1 flex justify-between text-xs text-gray-400">
            <span>
              {scanStatus.phase === 'walking' && 'Finding files…'}
              {scanStatus.phase === 'tags' &&
                `Reading tags… ${scanStatus.done}/${scanStatus.total}`}
              {scanStatus.phase === 'writing' && 'Updating library…'}
              {scanStatus.phase === 'idle' && 'Starting…'}
            </span>
            {scanStatus.phase === 'tags' && scanStatus.total > 0 && (
              <span className="tabular-nums">
                {Math.round((scanStatus.done / scanStatus.total) * 100)}%
              </span>
            )}
          </div>
          <div
            className="h-1.5 overflow-hidden rounded bg-base-600"
            role="progressbar"
            aria-label="Music library scan progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={
              scanStatus.phase === 'tags' && scanStatus.total > 0
                ? Math.round((scanStatus.done / scanStatus.total) * 100)
                : undefined
            }
          >
            <div
              className="h-full bg-accent transition-all"
              style={{
                width:
                  scanStatus.phase === 'tags' && scanStatus.total > 0
                    ? `${(scanStatus.done / scanStatus.total) * 100}%`
                    : '100%'
              }}
            />
          </div>
        </div>
      )}

      <SonicArchiveLead />

      <Field label="Search music library" hiddenLabel className="contents">
        <input
          className="input mb-4 max-w-md"
          placeholder="Search artists, albums, tracks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Field>

      {query ? (
        <SearchResults query={query} />
      ) : (
        <>
          {/* Liked and Stats are destinations, not views of this page — they
              live under Music in the sidebar now. */}
          <Tabs
            id="music-library"
            label="Music library view"
            className="mb-4"
            value={tab}
            onChange={setTab}
            tabs={[
              { key: 'artists', label: 'Artists' },
              { key: 'albums', label: 'Albums' },
              { key: 'tracks', label: 'Tracks' },
              { key: 'playlists', label: 'Playlists' }
            ]}
          />
          <TabPanel tabsId="music-library" value={tab}>
            {tab === 'artists' && <ArtistsTab />}
            {tab === 'albums' && <AlbumsTab />}
            {tab === 'tracks' && <TracksTab />}
            {tab === 'playlists' && <PlaylistsTab />}
          </TabPanel>
        </>
      )}

      {dlOpen && <MusicDownloadDialog onClose={() => setDlOpen(false)} />}
    </div>
  )
}

function SonicArchiveLead() {
  const player = usePlayerControls()
  const { data } = useQuery({
    queryKey: qk.music.statsDetail(30),
    queryFn: () => api.music.statsDetail(30)
  })
  const { data: recent = [] } = useQuery({
    queryKey: qk.music.recent(8),
    queryFn: () => api.music.recent(8)
  })
  const { data: libraryTracks = [] } = useQuery({
    queryKey: qk.music.tracks({}),
    queryFn: () => api.music.tracks({})
  })
  const artist = data?.topArtists[0]
  if (!data) return null
  const returnTracks =
    recent.length > 0
      ? recent.slice(0, 4)
      : data.topTracks.length > 0
        ? data.topTracks.slice(0, 4).map((row) => row.track)
        : libraryTracks.slice(0, 4)
  if (returnTracks.length === 0) return null

  return (
    <section
      className={`card mb-6 grid overflow-hidden ${artist ? 'lg:grid-cols-[260px_minmax(0,1fr)]' : ''}`}
    >
      {artist && (
        <div className="relative min-h-56 overflow-hidden bg-base-700 p-6">
          {artist.coverPath && (
            <CoverImage
              path={artist.coverPath}
              alt=""
              thumbWidth={320}
              rounded=""
              className="absolute inset-0 h-full w-full"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-base-800 via-base-800/55 to-base-800/10" />
          <div className="relative flex h-full flex-col justify-end">
            <Link
              to={`/music/artists/${artist.id}`}
              className="line-clamp-2 text-2xl font-semibold text-white hover:text-accent"
            >
              {artist.name}
            </Link>
            <p className="mt-1 text-xs text-gray-400">
              Most played artist in the last 30 days · {artist.plays} plays
            </p>
          </div>
        </div>
      )}
      <div className="p-6">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="text-xl font-semibold text-white">
              {recent.length > 0
                ? 'Pick up where you left off'
                : data.topTracks.length > 0
                  ? 'Return to a familiar signal'
                  : 'Start listening'}
            </h2>
            <p className="mt-1 text-sm text-gray-400">
              {data.newArtists.length > 0
                ? `${data.newArtists.length} artist${data.newArtists.length === 1 ? '' : 's'} first heard this month.`
                : 'Your recent listening stays close at hand.'}
            </p>
          </div>
          <Link to="/music/stats" className="btn-ghost shrink-0">
            Listening history
          </Link>
        </div>
        <div className="mt-4">
          {returnTracks.map((track, index) => (
            <MusicTrackRow
              key={track.id}
              track={track}
              showAlbum
              onPlay={() =>
                player.playQueue(returnTracks.map(musicTrackToPlayerTrack), index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  )
}

// "Find missing art" — kicks the strict online provider chain and shows its progress
// while it runs (polled, like the scanner).
// Art-fetch job state, lifted so the trigger lives in the header's More menu
// while a progress pill (with cancel) appears only while it runs.
function useArtFetch() {
  const qc = useQueryClient()
  const [running, setRunning] = useState(false)
  const { data: status } = useQuery({
    queryKey: qk.music.artStatus,
    queryFn: () => api.music.artStatus(),
    enabled: running,
    refetchInterval: running ? 500 : false
  })

  async function run(): Promise<void> {
    setRunning(true)
    try {
      const res = await api.music.artFetchMissing()
      const found = `${res.updated} image${res.updated === 1 ? '' : 's'} found`
      if (res.cancelled) {
        toast(`Art fetch stopped — ${found}; ${res.total - res.done} not attempted`)
      } else if (res.failed) {
        toast(
          `Art fetch finished — ${found}; ${res.failed} failed; ${res.missing} had no match`
        )
      } else {
        toast(
          `Art fetch done — ${found}${res.missing ? `; ${res.missing} had no match` : ''}`,
          'success'
        )
      }
      qc.invalidateQueries({ queryKey: qk.music.all })
    } catch (e) {
      toastError(e)
    } finally {
      setRunning(false)
    }
  }

  return { running, status, run, cancel: () => api.music.artCancel() }
}

export function ArtistCard({ artist }: { artist: MusicArtist }) {
  return (
    <Link to={`/music/artists/${artist.id}`} className="group text-center">
      <CoverImage
        path={artist.coverPath}
        alt={artist.name}
        thumbWidth={320}
        rounded="rounded-full"
        className="mx-auto aspect-square w-full"
        fallback="music"
      />
      <p className="mt-2 line-clamp-1 text-sm font-medium group-hover:text-accent">
        {artist.name}
      </p>
      <p className="text-xs text-gray-500">
        {artist.albumCount} {artist.albumCount === 1 ? 'album' : 'albums'}
      </p>
    </Link>
  )
}

export function AlbumCard({ album }: { album: MusicAlbumSummary }) {
  return (
    <Link to={`/music/albums/${album.id}`} className="group">
      <CoverImage
        path={album.coverPath}
        alt={album.title}
        thumbWidth={320}
        className="aspect-square w-full"
        fallback="music"
      />
      <p className="mt-2 line-clamp-1 text-sm font-medium group-hover:text-accent">
        {album.title}
      </p>
      <p className="line-clamp-1 text-xs text-gray-500">
        {album.artistName}
        {album.year != null && ` · ${album.year}`}
      </p>
    </Link>
  )
}

const GRID = 'grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4'

function ArtistsTab() {
  const [sort, setSort] = usePersistedState<'name' | 'albums' | 'tracks'>('musicArtistSort', 'name')
  const [missingArt, setMissingArt] = usePersistedState('musicArtistMissingArt', false)
  const { data: artists = [], isLoading } = useQuery({
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

function AlbumsTab() {
  const [sort, setSort] = usePersistedState<'catalog' | 'title' | 'newest' | 'oldest'>('musicAlbumSort', 'catalog')
  const [missingArt, setMissingArt] = usePersistedState('musicAlbumMissingArt', false)
  const { data: albums = [], isLoading } = useQuery({
    queryKey: qk.music.albums(''),
    queryFn: () => api.music.albums()
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

// Shared by the Tracks tab, search results and the liked/stats pages:
// clicking a row queues this whole list starting at that row. renderTrailing
// lets a page append per-row extras (e.g. the stats page's play-count chip).
export function TrackList({
  tracks,
  showAlbum = true,
  renderTrailing,
  batch = 96
}: {
  tracks: MusicTrack[]
  showAlbum?: boolean
  renderTrailing?: (t: MusicTrack) => ReactNode
  batch?: number
}) {
  const player = usePlayerControls()
  const { visible, sentinelRef } = useIncrementalList(tracks, batch)
  return (
    <>
      <div>
        {visible.map((t, i) => (
          <MusicTrackRow
            key={t.id}
            track={t}
            showAlbum={showAlbum}
            trailing={renderTrailing?.(t)}
            onPlay={() => player.playQueue(tracks.map(musicTrackToPlayerTrack), i)}
          />
        ))}
      </div>
      <div ref={sentinelRef} />
    </>
  )
}

function TracksTab() {
  const [sort, setSort] = usePersistedState<MusicTrackBrowseSort>('musicTrackSort', 'catalog')
  const [filter, setFilter] = usePersistedState<MusicTrackBrowseFilter>('musicTrackFilter', 'all')
  const {
    data: pages,
    isLoading,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage
  } = useInfiniteQuery({
    queryKey: qk.music.trackPage(sort, filter),
    queryFn: ({ pageParam }) => api.music.trackPage({ sort, filter, offset: pageParam, limit: 192 }),
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

function BrowseControls({ children }: { children: ReactNode }) {
  return <div className="mb-4 flex flex-wrap items-center gap-2">{children}</div>
}

function PlaylistsTab() {
  const qc = useQueryClient()
  const navigate = useNavigate()
  const [newTitle, setNewTitle] = useState('')
  const [importOpen, setImportOpen] = useState(false)
  const { data: playlists = [], isLoading } = useQuery({
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
  return (
    <>
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
        <button className="btn-ghost shrink-0" onClick={() => setImportOpen(true)}>
          Import a playlist…
        </button>
      </div>
      {importOpen && (
        <SpotifyImportDialog
          onClose={() => setImportOpen(false)}
          onImported={(playlistId) => {
            setImportOpen(false)
            qc.invalidateQueries({ queryKey: qk.music.playlists })
            navigate(`/music/playlists/${playlistId}`)
          }}
        />
      )}
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

function SpotifyImportDialog({
  onClose,
  onImported
}: {
  onClose: () => void
  onImported: (playlistId: number) => void
}) {
  const panelRef = useDialog(onClose)
  const [url, setUrl] = useState('')
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const activity = useActivity(importing)
  const { data: readiness, isLoading } = useQuery({
    queryKey: qk.music.spotifyDetect,
    queryFn: () => api.music.spotifyDetect()
  })

  async function start(): Promise<void> {
    if (!url.trim() || importing) return
    setImporting(true)
    setError(null)
    try {
      const result = await api.music.spotifyImportPlaylist(url.trim())
      toast(
        result.existing
          ? 'This Spotify playlist was already imported; opening the existing copy.'
          : `Imported ${result.imported}: ${result.matched} playable, ${result.missing} missing, ${result.duplicates} duplicate, ${result.skipped} skipped.`,
        'success'
      )
      onImported(result.playlistId)
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : String(cause))
    } finally {
      setImporting(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-label="Import Spotify playlist"
        tabIndex={-1}
        className="card w-full max-w-lg p-5"
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Import Spotify playlist</h2>
          <button className="px-2 text-gray-500 hover:text-white" aria-label="Close" onClick={onClose}>
            ✕
          </button>
        </div>
        <label className="label" htmlFor="spotify-playlist-url">
          Public playlist link
        </label>
        <input
          id="spotify-playlist-url"
          className="input"
          autoFocus
          value={url}
          onChange={(event) => setUrl(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'Enter') void start()
          }}
          placeholder="https://open.spotify.com/playlist/…"
          disabled={importing}
        />
        <p className="mt-2 text-sm text-gray-400">
          Public playlists only. This creates a one-time snapshot; it does not stay synced with
          Spotify. Downloaded audio is matched by spotDL through YouTube Music.
        </p>
        <p
          className={`mt-3 text-sm ${readiness?.ok ? 'text-green-400' : 'text-yellow-400'}`}
          role="status"
        >
          {isLoading
            ? 'Checking spotDL…'
            : readiness?.ok
              ? `spotDL ${readiness.version ?? ''} and ffmpeg are ready.`
              : (readiness?.error ?? 'spotDL is not ready. Configure it in Settings.')}
        </p>
        {importing && (
          <div className="mt-3 rounded-md bg-base-700/60 p-3" role="status" aria-live="polite">
            <p className="text-sm text-gray-300">
              {activity?.active ? activityText(activity) : 'Starting playlist import…'}
            </p>
            <div className="mt-2 h-1.5 overflow-hidden rounded bg-base-600">
              <div className="h-full w-1/3 bg-accent motion-safe:animate-pulse" />
            </div>
            <p className="mt-2 text-xs leading-5 text-gray-400">
              This stage reads Spotify metadata only; it does not download song audio. Large
              playlists can be quiet for several minutes after the track count appears.
            </p>
          </div>
        )}
        {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
        <div className="mt-5 flex justify-end gap-2">
          <button className="btn-ghost" onClick={onClose} disabled={importing}>
            Cancel
          </button>
          <button
            className="btn-primary"
            onClick={start}
            disabled={!url.trim() || importing || !readiness?.ok}
          >
            {importing ? 'Importing…' : 'Import'}
          </button>
        </div>
      </div>
    </div>
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

function SearchResults({ query }: { query: string }) {
  const { data, isLoading } = useQuery({
    queryKey: qk.music.search(query),
    queryFn: () => api.music.search(query)
  })
  if (isLoading || !data) return <p className="text-sm text-gray-500">Searching…</p>
  const nothing = data.artists.length === 0 && data.albums.length === 0 && data.tracks.length === 0
  if (nothing) return <p className="text-sm text-gray-500">No matches for “{query}”.</p>
  return (
    <div className="space-y-6">
      {data.artists.length > 0 && (
        <Section title="Artists" className="">
          <div className={GRID}>
            {data.artists.map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
        </Section>
      )}
      {data.albums.length > 0 && (
        <Section title="Albums" className="">
          <div className={GRID}>
            {data.albums.map((a) => (
              <AlbumCard key={a.id} album={a} />
            ))}
          </div>
        </Section>
      )}
      {data.tracks.length > 0 && (
        <Section title="Tracks" className="">
          <TrackList tracks={data.tracks} />
        </Section>
      )}
    </div>
  )
}
