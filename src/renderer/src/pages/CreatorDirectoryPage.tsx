import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useIncrementalList, useStatuses } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import type { MediaConfig } from '../lib/mediaConfig'
import { directoryCompare, directoryNameMatches, directorySorts } from '../lib/directory'
import CoverImage from '../components/CoverImage'
import DirectoryCard from '../components/DirectoryCard'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import { Group, Pill } from '../components/PillGroup'
import { Field } from '../components/Field'
import type { CreditRole, PersonDirectoryEntry, PersonDirectorySort } from '@shared/types'

const SORTS = directorySorts('Most read')
const byPerson = (e: PersonDirectoryEntry): string => e.person.name

// A role-scoped creator directory (Mangaka): who made the titles in the
// library, how many of them, how many the user has read, and their covers.
export default function CreatorDirectoryPage({
  cfg,
  role,
  title
}: {
  cfg: MediaConfig
  role: CreditRole
  title: string
}) {
  const statuses = useStatuses(cfg)
  // Positional, like Home: the first status is in progress, the second completed.
  const query = { role, mediaType: cfg.key, readStatuses: statuses.slice(0, 2) }
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: qk.people.directory(query),
    queryFn: () => api.people.directory(query)
  })
  const [search, setSearch] = usePersistedState('search', '')
  const [sort, setSort] = usePersistedState<PersonDirectorySort>('sort', 'works')
  const [readOnly, setReadOnly] = usePersistedState('readOnly', false)
  const needle = useDebouncedValue(search, 200).trim().toLowerCase()

  const rows = useMemo(() => {
    const all = data ?? []
    return all
      .filter((e) => !readOnly || e.readWorks > 0)
      .filter((e) => directoryNameMatches(needle, e.person.name, e.person.nameNative))
      .sort(directoryCompare(sort, byPerson))
  }, [data, readOnly, needle, sort])
  const { visible, sentinelRef, hasMore } = useIncrementalList(
    rows,
    96,
    `${cfg.key}:${role}|${readOnly}|${needle}|${sort}`
  )

  if (isError)
    return (
      <PageStatus>
        Could not load {title.toLowerCase()}.{' '}
        <button className="btn ml-2" onClick={() => refetch()}>
          Retry
        </button>
      </PageStatus>
    )

  const total = data?.length ?? 0
  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <PageHeader
        title={title}
        subtitle={
          rows.length === total ? `${total} people` : `${rows.length} of ${total} people`
        }
      />

      <div className="mb-6 flex flex-wrap items-end gap-x-6 gap-y-3">
        <Field label={`Search ${title.toLowerCase()}`} hiddenLabel className="contents">
          <input
            className="input max-w-xs"
            placeholder={`Search ${title.toLowerCase()}...`}
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
          <Pill active={!readOnly} onClick={() => setReadOnly(false)} label="Everyone" />
          <Pill active={readOnly} onClick={() => setReadOnly(true)} label="Ones I've read" />
        </Group>
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : rows.length === 0 ? (
        <EmptyState title={total === 0 ? 'Nothing here yet' : 'No one matches'} />
      ) : (
        <>
          <ul className="grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-3">
            {visible.map((e) => (
              <CreatorCard key={e.person.id} entry={e} cfg={cfg} role={role} />
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

function CreatorCard({
  entry,
  cfg,
  role
}: {
  entry: PersonDirectoryEntry
  cfg: MediaConfig
  role: CreditRole
}) {
  const { person, works } = entry
  const unit = works === 1 ? cfg.singular.toLowerCase() : cfg.plural.toLowerCase()
  return (
    <DirectoryCard
      to={`/people/${person.id}?role=${role}`}
      name={person.name}
      nameNative={person.nameNative}
      image={
        <CoverImage
          path={person.photoPath}
          alt=""
          thumbWidth={160}
          rounded="rounded-full"
          className="h-14 w-14 shrink-0"
        />
      }
      counts={entry}
      worksLabel={`${works} ${unit}`}
      readLabel="read"
      covers={entry.covers}
      coverBase={cfg.basePath}
    />
  )
}
