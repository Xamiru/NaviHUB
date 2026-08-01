import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { configFor } from '../lib/mediaConfig'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import type { TagWithCounts } from '@shared/types'

// Browse every tag in the library with per-type usage counts; clicking one
// shows everything tagged with it across media types (/tags/:id).
export default function TagsIndexPage() {
  const [search, setSearch] = usePersistedState('tagsSearch', '')
  const q = useDebouncedValue(search).trim().toLowerCase()

  const { data: tags, isLoading } = useQuery({
    queryKey: qk.tags.withCounts,
    queryFn: () => api.tags.listWithCounts()
  })

  const shown = useMemo(() => {
    if (!tags) return []
    const filtered = q ? tags.filter((t) => t.name.toLowerCase().includes(q)) : tags
    return [...filtered].sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
  }, [tags, q])

  if (isLoading) return <PageStatus>Loading…</PageStatus>

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Tags"
        subtitle={tags ? `${tags.length} tags` : undefined}
        actions={
          <input
            className="input max-w-xs"
            placeholder="Filter tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />

      {shown.length === 0 ? (
        <EmptyState
          title={q ? 'No tags match that filter.' : 'No tags yet.'}
          body={q ? undefined : 'Imports add them automatically.'}
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(220px,1fr))] gap-3">
          {shown.map((t) => (
            <TagCard key={t.id} tag={t} />
          ))}
        </div>
      )}
    </div>
  )
}

function TagCard({ tag }: { tag: TagWithCounts }) {
  const parts = tag.counts.map((c) => `${c.count} ${configFor(c.mediaType).plural}`)
  return (
    <Link to={`/tags/${tag.id}`} className="card p-4 group hover:border-accent transition-colors">
      <div className="flex items-baseline gap-2">
        <p className="font-semibold group-hover:text-accent">{tag.name}</p>
        {tag.category && <span className="text-[10px] uppercase text-gray-500">{tag.category}</span>}
      </div>
      <p className="mt-1 text-xs text-gray-500">
        {tag.total === 0 ? 'Unused' : parts.join(' · ')}
      </p>
    </Link>
  )
}
