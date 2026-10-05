import { useState } from 'react'
import EmptyState from '../components/EmptyState'
import ActionMenu from '../components/ActionMenu'
import PageHeader from '../components/PageHeader'
import Tabs, { TabPanel } from '../components/Tabs'
import { Link, useNavigate } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePlayerControls } from '../lib/player'
import { musicTrackToPlayerTrack, playTracks } from '../lib/musicTracks'
import { useDebouncedValue, useSettings } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { toast, toastError } from '../lib/toast'
import CoverImage from '../components/CoverImage'
import Section from '../components/Section'
import MusicTrackRow, { formatDuration, formatLongDuration } from '../components/MusicTrackRow'
import MusicDownloadDialog, { DownloadPill } from '../components/MusicDownloadDialog'
import type { MusicBrowseScope, MusicLyricMatch } from '@shared/types'
import { Field } from '../components/Field'
import { GRID, ArtistCard, AlbumCard, TrackList } from '../components/music/MusicBrowse'
import { LoadFailed, ArtistsTab, AlbumsTab, TracksTab, PlaylistsTab } from '../components/music/MusicLibraryTabs'
import { SpotifyImportDialog } from '../components/music/SpotifyImportDialog'

type Tab = 'artists' | 'albums' | 'tracks' | 'playlists'

export default function MusicLibraryPage() {
  const qc = useQueryClient()
  const player = usePlayerControls()
  const [tab, setTab] = usePersistedState<Tab>('musicTab', 'artists')
  const [search, setSearch] = usePersistedState('musicSearch', '')
  // One genre/decade scope for the Albums and Tracks tabs; Play/Shuffle follow it there.
  const [scope, setScope] = usePersistedState<MusicBrowseScope>('musicBrowseScope', {})
  const query = useDebouncedValue(search.trim())
  const [dlOpen, setDlOpen] = useState(false)
  const [importOpen, setImportOpen] = useState(false)
  const navigate = useNavigate()
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
    const scoped = !query && (tab === 'albums' || tab === 'tracks') && (scope.genre || scope.decade != null)
    try {
      const queue = await api.music.playbackQueue(shuffle, scoped ? scope : null)
      if (queue.items.length === 0) {
        toast(scoped ? 'No tracks match the selected genre and year' : 'No tracks in the library yet')
        return
      }
      playTracks(player, queue.items, { shuffle })
      if (queue.truncated) {
        const scope = shuffle ? 'random tracks' : 'tracks'
        toast(
          `Queued ${queue.items.length.toLocaleString()} ${scope} from ${queue.total.toLocaleString()} to keep playback responsive`
        )
      }
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
        title="Music"
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
              items={[
                { label: 'Import Spotify playlist…', onSelect: () => setImportOpen(true) },
                { label: 'Save audio from a link…', onSelect: () => setDlOpen(true) }
              ]}
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
          placeholder="Search artists, albums, tracks, lyrics…"
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
            {tab === 'albums' && <AlbumsTab scope={scope} onScope={setScope} />}
            {tab === 'tracks' && <TracksTab scope={scope} onScope={setScope} />}
            {tab === 'playlists' && <PlaylistsTab onImport={() => setImportOpen(true)} />}
          </TabPanel>
        </>
      )}

      {dlOpen && <MusicDownloadDialog onClose={() => setDlOpen(false)} />}
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
  const { data: libraryPage } = useQuery({
    queryKey: qk.music.trackLead,
    queryFn: () =>
      api.music.trackPage({ sort: 'catalog', filter: 'all', offset: 0, limit: 48 })
  })
  const artist = data?.topArtists[0]
  if (!data) return null
  const returnTracks =
    recent.length > 0
      ? recent.slice(0, 4)
      : data.topTracks.length > 0
        ? data.topTracks.slice(0, 4).map((row) => row.track)
        : (libraryPage?.items ?? []).slice(0, 4)
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

function SearchResults({ query }: { query: string }) {
  const { data, isLoading, isLoadingError, refetch } = useQuery({
    queryKey: qk.music.search(query),
    queryFn: () => api.music.search(query)
  })
  const lyrics = useQuery({
    queryKey: qk.music.lyricsSearch(query),
    queryFn: () => api.music.searchLyrics(query)
  })
  if (isLoadingError) return <LoadFailed what="search results" onRetry={() => void refetch()} />
  if (isLoading || !data) return <p className="text-sm text-gray-500">Searching…</p>
  const noTitles = data.artists.length === 0 && data.albums.length === 0 && data.tracks.length === 0
  if (noTitles && lyrics.isLoading) return <p className="text-sm text-gray-500">Searching…</p>
  if (noTitles && lyrics.data?.length === 0) {
    return <p className="text-sm text-gray-500">No matches for “{query}”.</p>
  }
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
      {lyrics.isLoadingError ? (
        <LoadFailed what="lyrics matches" onRetry={() => void lyrics.refetch()} />
      ) : (
        lyrics.data &&
        lyrics.data.length > 0 && (
          <Section title="Lyrics" className="">
            <LyricMatches matches={lyrics.data} />
          </Section>
        )
      )}
    </div>
  )
}

// Each hit plays its song from the matched line when the lyrics are synced.
function LyricMatches({ matches }: { matches: MusicLyricMatch[] }) {
  const player = usePlayerControls()
  return (
    <div>
      {matches.map((m) => (
        <div key={m.track.id}>
          <MusicTrackRow
            track={m.track}
            onPlay={() =>
              player.playQueue([musicTrackToPlayerTrack(m.track)], 0, { startTime: m.time ?? 0 })
            }
          />
          <p className="mb-2 ml-2 border-l-2 border-base-700 pl-3 text-sm text-gray-400">
            <span className="line-clamp-2">{m.line}</span>
            {(m.time != null || m.count > 1) && (
              <span className="text-xs text-gray-500">
                {[
                  m.time != null ? `at ${formatDuration(m.time)}` : null,
                  m.count > 1 ? `${m.count} times in the song` : null
                ]
                  .filter(Boolean)
                  .join(' · ')}
              </span>
            )}
          </p>
        </div>
      ))}
    </div>
  )
}
