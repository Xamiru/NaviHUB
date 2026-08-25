import { Link } from 'react-router-dom'
import EmptyState from '../components/EmptyState'
import PageHeader from '../components/PageHeader'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { qk } from '../lib/queryKeys'
import { KIND_LABEL } from '../lib/listLinks'
import CoverImage from '../components/CoverImage'
import type { ListKind, ListSummary, TierListSummary } from '@shared/types'

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

type Tab = 'lists' | 'tiers'

export default function ListsIndexPage() {
  const [tab, setTab] = usePersistedState<Tab>('listsTab', 'lists')
  const [kind, setKind] = usePersistedState<ListKind | null>('listKind', null)
  const isTiers = tab === 'tiers'

  const { data: lists = [], isLoading } = useQuery({
    queryKey: isTiers ? qk.tierLists.index(kind) : qk.lists.index(kind),
    queryFn: () => (isTiers ? api.tierLists.list(kind) : api.lists.list(kind))
  })

  const newTo = isTiers ? '/lists/tier/new' : '/lists/new'

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Curated collections"
        subtitle="Authored shelves, rankings and tier boards drawn from every part of the archive."
        actions={
          !isLoading && lists.length === 0 ? undefined : (
            <Link to={newTo} className="btn-primary">
              {isTiers ? 'New tier list' : 'New list'}
            </Link>
          )
        }
      />

      <div className="mb-3 flex gap-2">
        <button className={`pill ${!isTiers ? 'pill-active' : ''}`} onClick={() => setTab('lists')}>
          Lists
        </button>
        <button className={`pill ${isTiers ? 'pill-active' : ''}`} onClick={() => setTab('tiers')}>
          Tier lists
        </button>
      </div>

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
        isTiers ? (
          <EmptyState
            title="No tier lists yet"
            body="Drag covers onto S–F tiers, tiermaker-style — anime openings, studios, wrestlers…"
            action={
              <Link to={newTo} className="btn-primary">
                Create your first tier list
              </Link>
            }
          />
        ) : (
          <EmptyState
            title="No lists yet"
            body="Rank your favorites — best anime by opening, favorite actors, worst characters…"
            action={
              <Link to={newTo} className="btn-primary">
                Create your first list
              </Link>
            }
          />
        )
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-5">
          {lists.map((l) =>
            isTiers ? (
              <TierCard key={l.id} summary={l as TierListSummary} />
            ) : (
              <ListCard key={l.id} list={l as ListSummary} />
            )
          )}
        </div>
      )}
    </div>
  )
}

function CardFace({
  to,
  eyebrow,
  title,
  meta,
  previews
}: {
  to: string
  eyebrow: string
  title: string
  meta: string
  previews: (string | null)[]
}) {
  const shown = previews.slice(0, 4)
  return (
    <Link to={to} className="card overflow-hidden group">
      <div className="grid grid-cols-4 aspect-[16/6] bg-base-700">
        {shown.length === 0 ? (
          <div className="col-span-4 flex items-center justify-center text-xs uppercase tracking-widest text-gray-600">
            {eyebrow}
          </div>
        ) : (
          shown.map((p, i) => (
            <CoverImage key={i} path={p} alt="" rounded="rounded-none" className="h-full w-full" />
          ))
        )}
      </div>
      <div className="p-3">
        <p className="font-medium line-clamp-1 group-hover:text-accent">{title}</p>
        <p className="mt-1 text-xs text-gray-500">{meta}</p>
      </div>
    </Link>
  )
}

function ListCard({ list }: { list: ListSummary }) {
  return (
    <CardFace
      to={`/lists/${list.id}`}
      eyebrow="List"
      title={list.title}
      meta={`${KIND_LABEL[list.kind]} · ${list.itemCount} ${list.itemCount === 1 ? 'item' : 'items'}${list.ranked ? ' · Ranked' : ''}`}
      previews={list.previewImages}
    />
  )
}

function TierCard({ summary }: { summary: TierListSummary }) {
  return (
    <CardFace
      to={`/lists/tier/${summary.id}`}
      eyebrow="Tier list"
      title={summary.title}
      meta={`${KIND_LABEL[summary.kind]} · ${summary.itemCount} ${summary.itemCount === 1 ? 'item' : 'items'} · Tier list`}
      previews={summary.previewImages}
    />
  )
}
