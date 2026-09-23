import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import type { MusicJournalFilter } from '@shared/types'
import { MUSIC_SHELVES } from '@shared/musicPersonal'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import PageHeader from '../components/PageHeader'
import { Field } from '../components/Field'
import CoverImage from '../components/CoverImage'
import Pager from '../components/Pager'

export default function MusicJournalPage() {
  const [search, setSearch] = usePersistedState('music.journalSearch', '')
  const [shelf, setShelf] = usePersistedState<MusicJournalFilter['shelf']>(
    'music.journalShelf',
    'all'
  )
  const [page, setPage] = usePersistedState('music.journalPage', 0)
  const filter = { search: useDebouncedValue(search), shelf, page }
  const query = useQuery({
    queryKey: qk.music.journal(filter),
    queryFn: () => api.musicJournal.list(filter)
  })
  return (
    <div className="mx-auto max-w-6xl p-4 sm:p-6">
      <PageHeader
        title="Listening journal"
        subtitle="Your album shelves, ratings, and listening impressions."
        actions={
          <Link className="btn" to="/music">
            Browse albums
          </Link>
        }
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-[1fr_240px]">
        <Field label="Search journal">
          <input
            className="input"
            value={search}
            maxLength={300}
            onChange={(e) => {
              setSearch(e.target.value)
              setPage(0)
            }}
            placeholder="Album or artist"
          />
        </Field>
        <Field label="Album shelf">
          <select
            className="input"
            value={shelf}
            onChange={(e) => {
              setShelf(e.target.value as MusicJournalFilter['shelf'])
              setPage(0)
            }}
          >
            <option value="all">All journal albums</option>
            <option value="rated">Rated albums</option>
            {Object.entries(MUSIC_SHELVES).map(([key, label]) => (
              <option key={key} value={key}>
                {label}
              </option>
            ))}
          </select>
        </Field>
      </div>
      {query.isLoading ? (
        <p className="text-sm text-ink-muted">Loading listening journal…</p>
      ) : query.isError || !query.data ? (
        <p role="alert">
          Could not load your journal.{' '}
          <button className="btn" onClick={() => void query.refetch()}>
            Retry journal
          </button>
        </p>
      ) : (
        <>
          {!query.data.items.length && (
            <div className="border-y border-line-subtle py-8">
              <h2 className="text-lg font-semibold">
                {search || shelf !== 'all'
                  ? 'No albums match this view'
                  : 'Start with an album you know'}
              </h2>
              <p className="mt-2 text-sm text-ink-muted">
                Open an album and choose a shelf, rate it, or log a listen. It will appear here.
              </p>
            </div>
          )}
          <div className="divide-y divide-line-subtle">
            {query.data.items.map((album) => (
              <article key={album.id} className="flex items-start gap-4 py-5">
                <Link to={`/music/albums/${album.id}`} tabIndex={-1} aria-hidden="true">
                  <CoverImage
                    path={album.coverPath}
                    alt=""
                    thumbWidth={160}
                    className="h-24 w-24 shrink-0"
                    fallback="music"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <h2 className="text-lg font-semibold">
                      <Link to={`/music/albums/${album.id}`} className="hover:text-accent">
                        {album.title}
                      </Link>
                    </h2>
                    {album.rating !== null && (
                      <span className="font-semibold">{album.rating} / 10</span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-ink-muted">
                    {album.artistName}
                    {album.shelf && ` · ${MUSIC_SHELVES[album.shelf]}`}
                  </p>
                  {album.review && (
                    <p className="mt-3 line-clamp-3 whitespace-pre-wrap text-sm">{album.review}</p>
                  )}
                  {!!album.tags.length && (
                    <p className="mt-2 text-xs text-ink-muted">{album.tags.join(', ')}</p>
                  )}
                  <p className="mt-2 text-xs text-ink-muted">
                    {album.listenCount} logged listens
                    {album.lastListenedOn && ` · Latest ${album.lastListenedOn}`}
                  </p>
                </div>
              </article>
            ))}
          </div>
          <Pager page={page} pageCount={Math.ceil(query.data.total / 50)} onChange={setPage} />
        </>
      )}
    </div>
  )
}
