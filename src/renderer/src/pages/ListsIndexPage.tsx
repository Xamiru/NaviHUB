import type { ReactNode } from 'react'
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

type Tab = 'lists' | 'tiers'

// Kinds are offered as filters only when a list of that kind exists, in the
// order the archive presents them; the full set stays in New list.
const KIND_ORDER: ListKind[] = [
  'media',
  'person',
  'character',
  'company',
  'wrestlingEvent',
  'wrestlingWrestler',
  'wrestlingMatch',
  'footballCompetition',
  'footballTeam',
  'footballPerson',
  'footballMatch'
]

export default function ListsIndexPage() {
  const [tab, setTab] = usePersistedState<Tab>('listsTab', 'lists')
  const [kind, setKind] = usePersistedState<ListKind | null>('listKind', null)
  const isTiers = tab === 'tiers'

  // Both indexes load whole (they are small): the tab counts and the kind
  // filters come from them, and filtering is local.
  const listsQuery = useQuery({ queryKey: qk.lists.index(null), queryFn: () => api.lists.list(null) })
  const tiersQuery = useQuery({ queryKey: qk.tierLists.index(null), queryFn: () => api.tierLists.list(null) })
  const all: (ListSummary | TierListSummary)[] = (isTiers ? tiersQuery.data : listsQuery.data) ?? []
  const isLoading = isTiers ? tiersQuery.isLoading : listsQuery.isLoading
  const kindCounts = new Map<ListKind, number>()
  for (const l of all) kindCounts.set(l.kind, (kindCounts.get(l.kind) ?? 0) + 1)
  const kinds = KIND_ORDER.filter((k) => kindCounts.has(k))
  // A remembered kind with nothing left in it falls back to All.
  const activeKind = kind && kindCounts.has(kind) ? kind : null
  const lists = activeKind ? all.filter((l) => l.kind === activeKind) : all

  const newTo = isTiers ? '/lists/tier/new' : '/lists/new'

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Curated collections"
        subtitle="Authored shelves, rankings and tier boards drawn from every part of the archive."
        actions={
          !isLoading && all.length === 0 ? undefined : (
            <Link to={newTo} className="btn-primary">
              {isTiers ? 'New tier list' : 'New list'}
            </Link>
          )
        }
      />

      <div className="mb-6 flex flex-wrap items-center gap-2">
        <div className="flex gap-2" role="group" aria-label="Collection type">
          {(['lists', 'tiers'] as const).map((t) => (
            <button
              key={t}
              className={`pill ${tab === t ? 'pill-active' : ''}`}
              aria-pressed={tab === t}
              onClick={() => setTab(t)}
            >
              {t === 'lists' ? 'Lists' : 'Tier lists'}{' '}
              <span className="tabular-nums opacity-70">
                {(t === 'lists' ? listsQuery.data : tiersQuery.data)?.length ?? 0}
              </span>
            </button>
          ))}
        </div>
        {kinds.length > 1 && (
          <>
            <span className="mx-1 h-5 w-px bg-base-700" aria-hidden="true" />
            <div className="flex flex-wrap gap-2" role="group" aria-label="Kind">
              {[null, ...kinds].map((k) => (
                <button
                  key={k ?? 'all'}
                  onClick={() => setKind(k)}
                  className={`pill ${activeKind === k ? 'pill-active' : ''}`}
                  aria-pressed={activeKind === k}
                >
                  {k ? KIND_LABEL[k] : 'All'}{' '}
                  <span className="tabular-nums opacity-70">{k ? kindCounts.get(k) : all.length}</span>
                </button>
              ))}
            </div>
          </>
        )}
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
        <div className="grid grid-cols-[repeat(auto-fill,minmax(300px,1fr))] gap-6">
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

// Up to five covers fanned left to right, the first on top — a list's face is
// its opening entries. An empty list shows one dashed slot.
function FannedCovers({ images }: { images: (string | null)[] }) {
  const shown = images.slice(0, 5)
  if (shown.length === 0) {
    return (
      <div className="flex h-[170px] w-[114px] items-center justify-center rounded-lg border border-dashed border-base-600 text-xs text-gray-500">
        Empty
      </div>
    )
  }
  return (
    <div className="relative h-[170px]">
      {shown.map((path, i) => (
        <div key={i} className="absolute top-0" style={{ left: i * 46, zIndex: shown.length - i }}>
          <CoverImage
            path={path}
            alt=""
            thumbWidth={240}
            rounded="rounded-lg"
            className="h-[170px] w-[114px] shadow-xl ring-1 ring-black/40"
          />
        </div>
      ))}
    </div>
  )
}

// A tier list's face is a miniature of its board: the first three tiers with
// their colours and covers.
function MiniBoard({ rows }: { rows: TierListSummary['previewRows'] }) {
  return (
    <div className="card flex h-[170px] flex-col gap-1 overflow-hidden p-2">
      {rows.map((r, i) => (
        <div key={i} className="flex min-h-0 flex-1 items-stretch gap-1">
          <span
            className="flex w-9 shrink-0 items-center justify-center rounded text-xs font-bold text-black"
            style={{ background: r.color }}
          >
            {r.label}
          </span>
          {r.images.map((path, j) => (
            <CoverImage key={j} path={path} alt="" thumbWidth={80} rounded="rounded" className="h-full w-8 shrink-0" />
          ))}
        </div>
      ))}
    </div>
  )
}

function CardFace({ to, title, meta, face }: { to: string; title: string; meta: string; face: ReactNode }) {
  return (
    <Link to={to} className="group block">
      {face}
      <p className="mt-3 line-clamp-1 font-semibold text-white group-hover:text-accent">{title}</p>
      <p className="mt-0.5 text-xs text-gray-400">{meta}</p>
    </Link>
  )
}

function ListCard({ list }: { list: ListSummary }) {
  return (
    <CardFace
      to={`/lists/${list.id}`}
      title={list.title}
      meta={`${list.ranked ? 'Ranked · ' : ''}${KIND_LABEL[list.kind]} · ${list.itemCount} ${list.itemCount === 1 ? 'item' : 'items'}`}
      face={<FannedCovers images={list.previewImages} />}
    />
  )
}

function TierCard({ summary }: { summary: TierListSummary }) {
  return (
    <CardFace
      to={`/lists/tier/${summary.id}`}
      title={summary.title}
      meta={`Tier list · ${KIND_LABEL[summary.kind]} · ${summary.itemCount} ${summary.itemCount === 1 ? 'item' : 'items'}`}
      face={<MiniBoard rows={summary.previewRows} />}
    />
  )
}
