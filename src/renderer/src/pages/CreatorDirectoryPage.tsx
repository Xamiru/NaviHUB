import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue, useIncrementalList, useStatuses } from '../lib/hooks'
import { qk } from '../lib/queryKeys'
import type { MediaConfig } from '../lib/mediaConfig'
import CoverImage from '../components/CoverImage'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import { Group, Pill } from '../components/PillGroup'
import { Field } from '../components/Field'
import type { CreditRole, PersonDirectoryEntry, PersonDirectorySort } from '@shared/types'

const SORTS: { key: PersonDirectorySort; label: string }[] = [
  { key: 'works', label: 'Most works' },
  { key: 'read', label: 'Most read' },
  { key: 'score', label: 'Your score' },
  { key: 'name', label: 'Name' }
]

function compare(sort: PersonDirectorySort) {
  const byName = (a: PersonDirectoryEntry, b: PersonDirectoryEntry) =>
    a.person.name.localeCompare(b.person.name)
  switch (sort) {
    case 'read':
      return (a: PersonDirectoryEntry, b: PersonDirectoryEntry) =>
        b.readWorks - a.readWorks || b.works - a.works || byName(a, b)
    case 'score':
      return (a: PersonDirectoryEntry, b: PersonDirectoryEntry) =>
        (b.meanScore ?? -1) - (a.meanScore ?? -1) || b.readWorks - a.readWorks || byName(a, b)
    case 'name':
      return byName
    default:
      return (a: PersonDirectoryEntry, b: PersonDirectoryEntry) => b.works - a.works || byName(a, b)
  }
}

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
      .filter(
        (e) =>
          !needle ||
          e.person.name.toLowerCase().includes(needle) ||
          (e.person.nameNative ?? '').toLowerCase().includes(needle)
      )
      .sort(compare(sort))
  }, [data, readOnly, needle, sort])
  const { visible, sentinelRef, hasMore } = useIncrementalList(rows)

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
  const { person, works, readWorks, meanScore, covers } = entry
  const unit = works === 1 ? cfg.singular.toLowerCase() : cfg.plural.toLowerCase()
  return (
    <li className="card flex flex-col gap-3 p-3">
      <Link to={`/people/${person.id}?role=${role}`} className="group flex min-w-0 items-center gap-3">
        <CoverImage
          path={person.photoPath}
          alt=""
          thumbWidth={160}
          rounded="rounded-full"
          className="h-14 w-14 shrink-0"
        />
        <span className="min-w-0">
          <span className="block truncate text-sm font-medium group-hover:text-accent">
            {person.name}
          </span>
          {person.nameNative && (
            <span className="block truncate text-xs text-gray-500">{person.nameNative}</span>
          )}
          <span className="mt-0.5 block text-xs text-gray-400">
            {works} {unit}
            {readWorks > 0 && ` / ${readWorks} read`}
            {meanScore != null && ` / ★ ${meanScore.toFixed(1)}`}
          </span>
        </span>
      </Link>
      <div className="grid grid-cols-3 gap-2">
        {covers.map((c) => (
          <Link
            key={c.id}
            to={`${cfg.basePath}/${c.id}`}
            title={c.title}
            aria-label={c.title}
            className={c.read ? '' : 'opacity-60 hover:opacity-100 focus-visible:opacity-100'}
          >
            <CoverImage path={c.coverPath} alt="" thumbWidth={160} className="aspect-[2/3] w-full" />
          </Link>
        ))}
      </div>
    </li>
  )
}
