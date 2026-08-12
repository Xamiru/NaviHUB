import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { qk } from '../lib/queryKeys'
import { KIND_LABEL } from '../lib/listLinks'
import CoverImage from '../components/CoverImage'
import type { ListKind, ListSummary } from '@shared/types'

const KIND_FILTERS: (ListKind | null)[] = [
  null,
  'media',
  'person',
  'character',
  'company',
  'wrestlingEvent',
  'wrestlingWrestler',
  'wrestlingMatch'
]

export default function ListsIndexPage() {
  const [kind, setKind] = usePersistedState<ListKind | null>('listKind', null)
  const { data: lists = [], isLoading } = useQuery({
    queryKey: qk.lists.index(kind),
    queryFn: () => api.lists.list(kind)
  })

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Lists"
        subtitle="Your curated collections."
        actions={
          !isLoading && lists.length === 0 ? undefined : (
            <Link to="/lists/new" className="btn-primary">
              + New list
            </Link>
          )
        }
      />

      <div className="flex flex-wrap gap-2 mb-6">
        {KIND_FILTERS.map((k) => (
          <button
            key={k ?? 'all'}
            onClick={() => setKind(k)}
            className={`pill ${kind === k ? 'pill-active' : ''}`}
          >
            {k ? KIND_LABEL[k] : 'All'}
          </button>
        ))}
      </div>

      {isLoading ? (
        <p className="text-sm text-gray-500">Loading…</p>
      ) : lists.length === 0 ? (
        <EmptyState
          title="No lists yet"
          body="Rank your favorites — best anime by opening, favorite actors, worst characters…"
          action={
            <Link to="/lists/new" className="btn-primary">
              Create your first list
            </Link>
          }
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-4">
          {lists.map((l) => (
            <ListCard key={l.id} list={l} />
          ))}
        </div>
      )}
    </div>
  )
}

function ListCard({ list }: { list: ListSummary }) {
  const previews = list.previewImages.slice(0, 4)
  return (
    <Link to={`/lists/${list.id}`} className="card overflow-hidden group">
      <div className="grid grid-cols-4 aspect-[16/6] bg-base-700">
        {previews.length === 0 ? (
          <div className="col-span-4 flex items-center justify-center text-xs uppercase tracking-widest text-gray-600">List</div>
        ) : (
          previews.map((p, i) => (
            <CoverImage
              key={i}
              path={p}
              alt=""
              rounded="rounded-none"
              className="h-full w-full"
            />
          ))
        )}
      </div>
      <div className="p-3">
        <p className="font-medium line-clamp-1 group-hover:text-accent">{list.title}</p>
        <p className="mt-1 text-xs text-gray-500">
          {KIND_LABEL[list.kind]} · {list.itemCount} {list.itemCount === 1 ? 'item' : 'items'}
          {list.ranked && ' · Ranked'}
        </p>
      </div>
    </Link>
  )
}
