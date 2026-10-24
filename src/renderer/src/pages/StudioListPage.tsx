import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useIncrementalList, useStatuses } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import { ANIME } from '../lib/mediaConfig'
import { directoryCompare, directoryNameMatches, directorySorts } from '../lib/directory'
import CoverImage from '../components/CoverImage'
import DirectoryCard from '../components/DirectoryCard'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import { Group, Pill } from '../components/PillGroup'
import { Field } from '../components/Field'
import type { CompanyDirectoryEntry, PersonDirectorySort } from '@shared/types'

const SORTS = directorySorts('Most watched')

// Studios the library holds only one or two titles from are mostly import
// noise; the default view hides them unless the user has watched one of the
// titles, and a search always reaches them.
const MIN_WORKS = 3
type Show = 'regular' | 'all' | 'watched'

const byStudio = (e: CompanyDirectoryEntry): string => e.company.name

// The anime Studios directory. AniList has no studio logos, so each studio is
// shown through the covers of its titles in the library, like the Mangaka page.
// No "Add" box: a bare name has no anime and would never appear here.
export default function StudioListPage() {
  const statuses = useStatuses(ANIME)
  // Positional, like Home: the first status is in progress, the second completed.
  const query = { mediaType: ANIME.key, readStatuses: statuses.slice(0, 2) }
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: qk.companies.directory(query),
    queryFn: () => api.companies.directory(query)
  })
  const [search, setSearch] = usePersistedState('search', '')
  const [sort, setSort] = usePersistedState<PersonDirectorySort>('sort', 'works')
  const [show, setShow] = usePersistedState<Show>('show', 'regular')
  const needle = useDebouncedValue(search, 200).trim().toLowerCase()

  const rows = useMemo(() => {
    const all = data ?? []
    return all
      .filter((e) => (show === 'watched' ? e.readWorks > 0 : true))
      .filter((e) => show !== 'regular' || needle !== '' || e.works >= MIN_WORKS || e.readWorks > 0)
      .filter((e) => directoryNameMatches(needle, e.company.name, e.company.nameNative))
      .sort(directoryCompare(sort, byStudio))
  }, [data, show, needle, sort])
  const { visible, sentinelRef, hasMore } = useIncrementalList(rows, 96, `${show}|${needle}|${sort}`)

  if (isError)
    return (
      <PageStatus>
        Could not load studios.{' '}
        <button className="btn ml-2" onClick={() => refetch()}>
          Retry
        </button>
      </PageStatus>
    )

  const total = data?.length ?? 0
  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <PageHeader
        title="Studio directory"
        subtitle={rows.length === total ? `${total} studios` : `${rows.length} of ${total} studios`}
      />

      <div className="mb-6 flex flex-wrap items-end gap-x-6 gap-y-3">
        <Field label="Search studios" hiddenLabel className="contents">
          <input
            className="input max-w-xs"
            placeholder="Search studios..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </Field>
        <Group label="Sort">
          {SORTS.map((s) => (
            <Pill key={s.key} active={sort === s.key} onClick={() => setSort(s.key)} label={s.label} />
          ))}
        </Group>
        <Group label="Show">
          <Pill active={show === 'regular'} onClick={() => setShow('regular')} label={`${MIN_WORKS}+ works or watched`} />
          <Pill active={show === 'all'} onClick={() => setShow('all')} label="All" />
          <Pill active={show === 'watched'} onClick={() => setShow('watched')} label="Ones I've watched" />
        </Group>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState title={total === 0 ? 'Nothing here yet' : 'No studio matches'} />
      ) : (
        <>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3">
            {visible.map((e) => (
              <StudioCard key={e.company.id} entry={e} />
            ))}
          </ul>
          <div ref={sentinelRef} />
          {hasMore && (
            <p className="mt-4 text-center text-xs text-gray-400">
              Showing {visible.length} of {rows.length} / scroll for more
            </p>
          )}
        </>
      )}
    </div>
  )
}

function StudioCard({ entry }: { entry: CompanyDirectoryEntry }) {
  const { company } = entry
  return (
    <DirectoryCard
      to={`/studios/${company.id}`}
      name={company.name}
      nameNative={company.nameNative}
      image={
        // A hand-picked logo leads the card; most studios have none.
        company.logoPath && (
          <CoverImage
            path={company.logoPath}
            alt=""
            thumbWidth={160}
            rounded="rounded-lg"
            className="h-14 w-14 shrink-0 object-contain"
          />
        )
      }
      counts={entry}
      worksLabel={`${entry.works} anime`}
      readLabel="watched"
      covers={entry.covers}
      coverBase={ANIME.basePath}
    />
  )
}
