import PageHeader from '../components/PageHeader'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useStatuses, useDebouncedValue, useIncrementalList } from '../lib/hooks'
import { usePlayer, type Track } from '../lib/player'
import { ANIME } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import { PlayIcon, PauseIcon } from '../components/PlayerIcons'
import MediaFilterPanel, {
  EMPTY_FILTERS,
  activeCount,
  toListFilter,
  type MediaFilters
} from '../components/MediaFilterPanel'
import { seasonLabel } from '@shared/season'
import type { MediaListFilter, MediaSort, ThemeSongEntry, ThemeSongFilter } from '@shared/types'

// The anime library heard rather than seen: every imported OP/ED, narrowed with
// the SAME filter model as the anime list page (the panel, the status pills, the
// sort menu are literally the same components/objects) and queued in one click.
// Replaces the sidebar's old "Shuffle Themes" button, which could only ever play
// the whole library in random order.

// Same menu as MediaListPage — these sort the ANIME the songs hang off, except
// 'random', which the repo re-points at the song id so a shuffle deals songs.
const SORTS: { value: MediaSort; label: string }[] = [
  { value: 'updated', label: 'Last updated' },
  { value: 'added', label: 'Recently added' },
  { value: 'title', label: 'Anime title' },
  { value: 'score', label: 'Your score' },
  { value: 'communityScore', label: 'Community score' },
  { value: 'release', label: 'Release date' },
  { value: 'random', label: 'Random' }
]

const newSeed = (): number => Math.floor(Math.random() * 1_000_000)

function songTitle(s: ThemeSongEntry): string {
  return s.slug ? `${s.slug} · ${s.title ?? 'Untitled'}` : (s.title ?? 'Untitled')
}

// Queue track. Keeps the `theme-<id>` id namespace the detail page and the
// player already speak, so a song queued here still highlights on its anime page.
function toTrack(s: ThemeSongEntry): Track {
  return {
    id: `theme-${s.themeId}`,
    audioPath: s.audioPath,
    audioUrl: s.audioUrl,
    title: songTitle(s),
    subtitle: s.artists.map((a) => a.name).join(', ') || null,
    context: s.animeTitle,
    coverPath: s.coverPath,
    mediaId: s.mediaId
  }
}

export default function ThemeSongsPage(): JSX.Element {
  const player = usePlayer()
  const statuses = useStatuses(ANIME)

  const [selStatuses, setSelStatuses] = usePersistedState<string[]>('statuses', [])
  const [search, setSearch] = usePersistedState('search', '')
  const [sort, setSort] = usePersistedState<MediaSort>('sort', 'updated')
  const [seed, setSeed] = usePersistedState('seed', 1)
  const [sortDir, setSortDir] = usePersistedState<'asc' | 'desc'>('sortDir', 'desc')
  const [favAnime, setFavAnime] = usePersistedState('favAnime', false)
  const [favSongs, setFavSongs] = usePersistedState('favSongs', false)
  const [songType, setSongType] = usePersistedState<'OP' | 'ED' | null>('songType', null)
  const [filters, setFilters] = usePersistedState<MediaFilters>('filters', EMPTY_FILTERS)
  const [showFilters, setShowFilters] = usePersistedState('showFilters', false)

  const debouncedSearch = useDebouncedValue(search, 250)

  const { data: tags = [] } = useQuery({ queryKey: qk.tags.all, queryFn: () => api.tags.list() })
  const { data: facets } = useQuery({
    queryKey: qk.mediaCounts.facets('anime'),
    queryFn: () => api.media.facets('anime')
  })
  const { data: counts } = useQuery({
    queryKey: qk.themes.counts,
    queryFn: () => api.themes.counts()
  })

  // The anime half of the filter is built exactly like MediaListPage builds its
  // own — same fields, same null-means-unconstrained convention.
  const media: MediaListFilter = {
    mediaType: 'anime',
    statuses: selStatuses.length ? selStatuses : null,
    sort,
    sortDir,
    favorite: favAnime || null,
    seed: sort === 'random' ? seed : null,
    ...toListFilter(filters)
  }
  const filter: ThemeSongFilter = {
    media,
    search: debouncedSearch.trim() || null,
    songType,
    favoriteOnly: favSongs || null
  }
  const nFilters =
    activeCount(filters) +
    (favAnime ? 1 : 0) +
    (favSongs ? 1 : 0) +
    (songType ? 1 : 0) +
    (selStatuses.length ? 1 : 0)

  const { data: songs = [], isLoading } = useQuery({
    queryKey: qk.themes.list(filter),
    queryFn: () => api.themes.list(filter)
  })
  const { visible, sentinelRef, hasMore } = useIncrementalList(songs)

  // Every play button queues the WHOLE filtered set, so next/prev walk the
  // current selection rather than one anime's songs.
  function playAt(index: number, opts?: { shuffle?: boolean }): void {
    if (songs.length === 0) return
    player.playQueue(songs.map(toTrack), index, opts)
  }

  function shuffleAll(): void {
    // Random start too — {shuffle: true} keeps the start track first, so a
    // fixed 0 would always open with the same song.
    playAt(Math.floor(Math.random() * songs.length), { shuffle: true })
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Songs"
        subtitle={
          counts
            ? `${counts.playable} playable theme${counts.playable === 1 ? '' : 's'}${
                counts.total > counts.playable ? ` of ${counts.total}` : ''
              } · ${counts.favorites} favorite${counts.favorites === 1 ? '' : 's'}`
            : 'Anime openings and endings from your library'
        }
        actions={
          <>
            <button className="btn-ghost" disabled={songs.length === 0} onClick={() => playAt(0)}>
              Play all
            </button>
            <button className="btn-primary" disabled={songs.length === 0} onClick={shuffleAll}>
              Shuffle
            </button>
          </>
        }
      />

      {/* Anime status pills — multi-select, "All" clears (MediaListPage idiom) */}
      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setSelStatuses([])}
          className={selStatuses.length === 0 ? 'pill pill-active' : 'pill'}
        >
          All
        </button>
        {statuses.map((s) => (
          <button
            key={s}
            onClick={() =>
              setSelStatuses((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))
            }
            className={selStatuses.includes(s) ? 'pill pill-active' : 'pill'}
          >
            {s}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-4">
        <input
          className="input max-w-xs"
          placeholder="Search songs, artists, anime…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className={`btn py-1.5 ${
            showFilters || activeCount(filters)
              ? 'bg-accent text-white'
              : 'bg-base-700 text-gray-300 hover:bg-base-600'
          }`}
          onClick={() => setShowFilters((v) => !v)}
          aria-expanded={showFilters}
        >
          Filters{activeCount(filters) ? ` (${activeCount(filters)})` : ''}
        </button>
        <div className="flex gap-1">
          {(['OP', 'ED'] as const).map((t) => (
            <button
              key={t}
              className={`btn py-1.5 ${
                songType === t ? 'bg-accent text-white' : 'bg-base-700 text-gray-300 hover:bg-base-600'
              }`}
              onClick={() => setSongType(songType === t ? null : t)}
              title={t === 'OP' ? 'Openings only' : 'Endings only'}
            >
              {t}
            </button>
          ))}
        </div>
        <button
          className={`btn py-1.5 ${
            favSongs ? 'bg-accent text-white' : 'bg-base-700 text-gray-300 hover:bg-base-600'
          }`}
          onClick={() => setFavSongs((v) => !v)}
          title="Show hearted songs only"
        >
          ♥ Favorite songs
        </button>
        <button
          className={`btn py-1.5 ${
            favAnime ? 'bg-accent text-white' : 'bg-base-700 text-gray-300 hover:bg-base-600'
          }`}
          onClick={() => setFavAnime((v) => !v)}
          title="Songs from your favorite anime only"
        >
          Favorite anime
        </button>
        <div className="flex items-center gap-2 ml-auto text-sm">
          <span className="text-gray-500">Sort</span>
          <select
            className="input w-auto py-1.5"
            value={sort}
            onChange={(e) => {
              const next = e.target.value as MediaSort
              if (next === 'random') setSeed(newSeed())
              setSort(next)
            }}
          >
            {SORTS.map((s) => (
              <option key={s.value} value={s.value}>
                {s.label}
              </option>
            ))}
          </select>
          {sort === 'random' ? (
            <button className="btn-ghost py-1.5" onClick={() => setSeed(newSeed())}>
              Shuffle
            </button>
          ) : (
            <button
              className="btn-ghost py-1.5"
              onClick={() => setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))}
              title="Toggle direction"
              aria-label="Toggle sort direction"
            >
              {sortDir === 'asc' ? '↑' : '↓'}
            </button>
          )}
        </div>
      </div>

      {showFilters && (
        <MediaFilterPanel cfg={ANIME} facets={facets} value={filters} onChange={setFilters} />
      )}

      {nFilters > 0 && (
        <div className="mb-5 flex flex-wrap items-center gap-2">
          {selStatuses.map((s) => (
            <ActiveChip
              key={`st-${s}`}
              label={s}
              onClear={() => setSelStatuses((cur) => cur.filter((x) => x !== s))}
            />
          ))}
          {songType && <ActiveChip label={songType} onClear={() => setSongType(null)} />}
          {favSongs && <ActiveChip label="Favorite songs" onClear={() => setFavSongs(false)} />}
          {favAnime && <ActiveChip label="Favorite anime" onClear={() => setFavAnime(false)} />}
          {filters.tagIds.map((id) => (
            <ActiveChip
              key={`tag-${id}`}
              label={tags.find((t) => t.id === id)?.name ?? `Tag ${id}`}
              onClear={() => setFilters((f) => ({ ...f, tagIds: f.tagIds.filter((x) => x !== id) }))}
            />
          ))}
          {filters.seasons.map((s) => (
            <ActiveChip
              key={`se-${s}`}
              label={seasonLabel(s)}
              onClear={() => setFilters((f) => ({ ...f, seasons: f.seasons.filter((x) => x !== s) }))}
            />
          ))}
          {filters.year && (
            <ActiveChip
              label={`Year ${filters.year[0]}–${filters.year[1]}`}
              onClear={() => setFilters((f) => ({ ...f, year: null }))}
            />
          )}
          {filters.score && (
            <ActiveChip
              label={`Score ${filters.score[0]}–${filters.score[1]}`}
              onClear={() => setFilters((f) => ({ ...f, score: null }))}
            />
          )}
          {filters.unrated && (
            <ActiveChip label="Unrated" onClear={() => setFilters((f) => ({ ...f, unrated: false }))} />
          )}
          {filters.community && (
            <ActiveChip
              label={`Community ${filters.community[0]}–${filters.community[1]}`}
              onClear={() => setFilters((f) => ({ ...f, community: null }))}
            />
          )}
          {filters.units && (
            <ActiveChip
              label={`${ANIME.totalFieldLabel} ${filters.units[0]}–${filters.units[1]}`}
              onClear={() => setFilters((f) => ({ ...f, units: null }))}
            />
          )}
          <button
            className="text-xs text-gray-400 underline-offset-2 hover:text-accent hover:underline"
            onClick={() => {
              setFilters(EMPTY_FILTERS)
              setSelStatuses([])
              setFavAnime(false)
              setFavSongs(false)
              setSongType(null)
            }}
          >
            Clear all
          </button>
        </div>
      )}

      {isLoading ? (
        <p className="text-gray-500">Loading…</p>
      ) : songs.length === 0 ? (
        <div className="card p-12 text-center">
          <p className="text-lg font-medium mb-1">
            {nFilters > 0 || debouncedSearch.trim()
              ? 'No songs match these filters'
              : 'No theme songs yet'}
          </p>
          <p className="text-sm text-gray-500">
            {nFilters > 0 || debouncedSearch.trim() ? (
              'Loosen a range or clear a chip to widen the search.'
            ) : (
              <>
                Open an anime and use{' '}
                <span className="text-gray-300">Fetch theme songs</span> to pull its OP/EDs from
                AnimeThemes.
              </>
            )}
          </p>
        </div>
      ) : (
        <>
          <p className="mb-3 text-xs text-gray-400">
            {songs.length} song{songs.length === 1 ? '' : 's'} queued by these filters
          </p>
          <div className="space-y-1.5">
            {visible.map((s, i) => (
              <SongRow key={s.themeId} song={s} onPlay={() => playAt(i)} />
            ))}
          </div>
          <div ref={sentinelRef} />
          {hasMore && (
            <p className="mt-4 text-center text-xs text-gray-400">
              Showing {visible.length} of {songs.length} — scroll for more
            </p>
          )}
        </>
      )}
    </div>
  )
}

function SongRow({ song, onPlay }: { song: ThemeSongEntry; onPlay: () => void }): JSX.Element {
  const qc = useQueryClient()
  const player = usePlayer()
  const id = `theme-${song.themeId}`
  const isCurrent = player.track?.id === id
  const isPlaying = isCurrent && player.isPlaying

  // Optimistic heart (MusicTrackRow's pattern): flip locally, persist, then let
  // the broad invalidation settle every list that carries this song.
  const [favorite, setFavorite] = useState(song.favorite)
  useEffect(() => setFavorite(song.favorite), [song.favorite])
  async function toggleFavorite(): Promise<void> {
    const next = !favorite
    setFavorite(next)
    await api.themes.setFavorite(song.themeId, next)
    qc.invalidateQueries({ queryKey: qk.themes.all })
    // The anime detail page's theme rows carry the same flag.
    qc.invalidateQueries({ queryKey: qk.media.detail(song.mediaId) })
  }

  return (
    <div
      className={`group flex items-center gap-3 rounded-md bg-base-800 px-3 py-2 ${
        isCurrent ? 'ring-1 ring-accent/50' : ''
      }`}
    >
      <button
        onClick={() => (isCurrent ? player.toggle() : onPlay())}
        title={isPlaying ? 'Pause' : 'Play'}
        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent/15 text-sm text-accent hover:bg-accent/30"
      >
        {isPlaying ? <PauseIcon /> : <PlayIcon />}
      </button>
      <Link to={`/anime/${song.mediaId}`} className="shrink-0">
        <CoverImage path={song.coverPath} alt={song.animeTitle} className="h-10 w-10" />
      </Link>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          {song.slug && (
            <span className="chip shrink-0 bg-accent/20 px-1.5 py-0.5 text-[11px] text-accent">
              {song.slug}
            </span>
          )}
          <span className={`truncate text-sm font-medium ${isCurrent ? 'text-accent' : ''}`}>
            {song.title ?? 'Untitled'}
          </span>
        </div>
        <p className="mt-0.5 truncate text-xs text-gray-500">
          {song.artists.length > 0 && (
            <>
              {song.artists.map((a, i) => (
                <span key={a.id}>
                  {i > 0 && ', '}
                  <Link to={`/people/${a.id}`} className="hover:text-accent">
                    {a.name}
                  </Link>
                </span>
              ))}
              {' · '}
            </>
          )}
          <Link to={`/anime/${song.mediaId}`} className="hover:text-accent">
            {song.animeTitle}
          </Link>
        </p>
      </div>
      <button
        className={`px-1 text-sm ${
          favorite ? 'text-accent' : 'text-gray-600 opacity-0 group-hover:opacity-100'
        } hover:text-accent`}
        title={favorite ? 'Remove from favorites' : 'Add to favorites'}
        aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}
        onClick={toggleFavorite}
      >
        {favorite ? '♥' : '♡'}
      </button>
    </div>
  )
}

// One active narrowing, removable (MediaListPage's chip).
function ActiveChip({ label, onClear }: { label: string; onClear: () => void }): JSX.Element {
  return (
    <span className="chip">
      {label}
      <button
        onClick={onClear}
        className="text-gray-500 hover:text-accent"
        aria-label={`Remove filter ${label}`}
        title={`Remove ${label}`}
      >
        ×
      </button>
    </span>
  )
}
