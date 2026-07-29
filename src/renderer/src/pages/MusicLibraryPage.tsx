import { useState, type ReactNode } from 'react'
import EmptyState from '../components/EmptyState'
import ActionMenu from '../components/ActionMenu'
import Tabs from '../components/Tabs'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayer } from '../lib/player'
import { musicTrackToPlayerTrack, playTracks } from '../lib/musicTracks'
import { useDebouncedValue, useIncrementalList, useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { toast, toastError } from '../lib/toast'
import CoverImage from '../components/CoverImage'
import Section from '../components/Section'
import MusicTrackRow, { formatLongDuration } from '../components/MusicTrackRow'
import MusicDownloadDialog, { DownloadPill } from '../components/MusicDownloadDialog'
import type { MusicAlbumSummary, MusicArtist, MusicPlaylistSummary, MusicTrack } from '@shared/types'

type Tab = 'artists' | 'albums' | 'tracks' | 'playlists'

export default function MusicLibraryPage() {
  const qc = useQueryClient()
  const player = usePlayer()
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
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="mr-auto">
          <h1 className="text-2xl font-bold">Music</h1>
          {stats && stats.tracks > 0 && (
            <p className="text-xs text-gray-500">
              {stats.artists} artists · {stats.albums} albums · {stats.tracks} tracks ·{' '}
              {formatLongDuration(stats.totalDuration)}
            </p>
          )}
        </div>
        <DownloadPill />
        {art.running && (
          <button className="pill" onClick={art.cancel} title="Cancel art fetch">
            Art {art.status ? `${art.status.done}/${art.status.total}` : '…'} — cancel
          </button>
        )}
        {scanning && <span className="pill">Scanning…</span>}
        <button className="btn-ghost" onClick={() => playAll(false)}>
          Play all
        </button>
        <button className="btn-primary" onClick={() => playAll(true)}>
          Shuffle
        </button>
        <ActionMenu
          items={[
            {
              label: 'Rescan library',
              disabled: scanning,
              onSelect: () => runScan(false)
            },
            { label: 'Find missing art', disabled: art.running, onSelect: () => void art.run() },
            { label: 'Download from URL…', onSelect: () => setDlOpen(true) }
          ]}
        />
      </div>

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
          <div className="h-1.5 overflow-hidden rounded bg-base-600">
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

      <input
        className="input mb-4 max-w-md"
        placeholder="Search artists, albums, tracks…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {query ? (
        <SearchResults query={query} />
      ) : (
        <>
          {/* Liked and Stats are destinations, not views of this page — they
              live under Music in the sidebar now. */}
          <Tabs
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
          {tab === 'artists' && <ArtistsTab />}
          {tab === 'albums' && <AlbumsTab />}
          {tab === 'tracks' && <TracksTab />}
          {tab === 'playlists' && <PlaylistsTab />}
        </>
      )}

      {dlOpen && <MusicDownloadDialog onClose={() => setDlOpen(false)} />}
    </div>
  )
}

// "Find missing art" — kicks the bulk Deezer/iTunes job and shows its progress
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
      toast(`Art fetch done — ${res.updated} image${res.updated === 1 ? '' : 's'} found`, 'success')
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
  const { data: artists = [], isLoading } = useQuery({
    queryKey: qk.music.artists(''),
    queryFn: () => api.music.artists()
  })
  const { visible, sentinelRef } = useIncrementalList(artists)
  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>
  return (
    <>
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
  const { data: albums = [], isLoading } = useQuery({
    queryKey: qk.music.albums(''),
    queryFn: () => api.music.albums()
  })
  const { visible, sentinelRef } = useIncrementalList(albums)
  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>
  return (
    <>
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
  renderTrailing
}: {
  tracks: MusicTrack[]
  showAlbum?: boolean
  renderTrailing?: (t: MusicTrack) => ReactNode
}) {
  const player = usePlayer()
  const { visible, sentinelRef } = useIncrementalList(tracks)
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
  const { data: tracks = [], isLoading } = useQuery({
    queryKey: qk.music.tracks({}),
    queryFn: () => api.music.tracks({})
  })
  if (isLoading) return <p className="text-sm text-gray-500">Loading…</p>
  return <TrackList tracks={tracks} />
}

function PlaylistsTab() {
  const qc = useQueryClient()
  const [newTitle, setNewTitle] = useState('')
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
      <div className="mb-4 flex max-w-md gap-2">
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
        <button className="btn-primary" disabled={!newTitle.trim()} onClick={create}>
          Create
        </button>
      </div>
      {playlists.length === 0 ? (
        <p className="text-sm text-gray-500">No playlists yet — create one above.</p>
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
            {data.artists.slice(0, 6).map((a) => (
              <ArtistCard key={a.id} artist={a} />
            ))}
          </div>
        </Section>
      )}
      {data.albums.length > 0 && (
        <Section title="Albums" className="">
          <div className={GRID}>
            {data.albums.slice(0, 6).map((a) => (
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
