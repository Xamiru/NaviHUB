import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useDebouncedValue } from '../lib/hooks'
import { configFor } from '../lib/mediaConfig'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import ActionMenu from '../components/ActionMenu'
import { Group, Pill } from '../components/PillGroup'
import { toastError } from '../lib/toast'
import type { TagWithCounts } from '@shared/types'
import { confirmDialog } from '../lib/confirm'

// Browse every tag in the library with per-type usage counts; clicking one
// shows everything tagged with it across media types (/tags/:id).
//
// Tags arrive from importers and nothing ever removed them, so the list only
// grows. The Unused filter is the janitor: after a big import it collects every
// tag no title actually carries, in one pass.
type Scope = 'all' | 'unused'

export default function TagsIndexPage() {
  const qc = useQueryClient()
  const [search, setSearch] = usePersistedState('tagsSearch', '')
  const [scope, setScope] = usePersistedState<Scope>('tagsScope', 'all')
  const q = useDebouncedValue(search).trim().toLowerCase()

  const { data: tags, isLoading } = useQuery({
    queryKey: qk.tags.withCounts,
    queryFn: () => api.tags.listWithCounts()
  })

  const unusedCount = useMemo(() => (tags ?? []).filter((t) => t.total === 0).length, [tags])

  const shown = useMemo(() => {
    if (!tags) return []
    let filtered = q ? tags.filter((t) => t.name.toLowerCase().includes(q)) : tags
    if (scope === 'unused') filtered = filtered.filter((t) => t.total === 0)
    return [...filtered].sort((a, b) => b.total - a.total || a.name.localeCompare(b.name))
  }, [tags, q, scope])

  async function remove(tag: TagWithCounts): Promise<void> {
    const used =
      tag.total === 0
        ? 'It is not used by any title.'
        : `It is still on ${tag.total} title${tag.total === 1 ? '' : 's'}, which will lose it.`
    const ok = await confirmDialog(`Delete the tag "${tag.name}"? ${used} This cannot be undone.`, {
      confirmLabel: 'Delete',
      danger: true
    })
    if (!ok) return
    try {
      await api.tags.remove(tag.id)
      await qc.invalidateQueries({ queryKey: qk.tags.all })
      await qc.invalidateQueries({ queryKey: qk.media.all })
    } catch (e) {
      toastError(e)
    }
  }

  if (isLoading) return <PageStatus>Loading…</PageStatus>

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <PageHeader
        title="Tags as lenses"
        subtitle={tags ? `${tags.length} relationship lenses across your library` : undefined}
        actions={
          <input
            className="input max-w-xs"
            placeholder="Filter tags…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        }
      />

      <div className="mb-4">
        <Group label="Show">
          <Pill label="All" active={scope === 'all'} onClick={() => setScope('all')} />
          <Pill
            label={`Unused${unusedCount > 0 ? ` · ${unusedCount}` : ''}`}
            active={scope === 'unused'}
            onClick={() => setScope('unused')}
          />
        </Group>
      </div>

      {shown.length === 0 ? (
        <EmptyState
          title={
            scope === 'unused'
              ? 'Every tag is in use.'
              : q
                ? 'No tags match that filter.'
                : 'No tags yet.'
          }
          body={q || scope === 'unused' ? undefined : 'Imports add them automatically.'}
        />
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-4">
          {shown.map((t) => (
            <TagCard key={t.id} tag={t} onRemove={() => remove(t)} />
          ))}
        </div>
      )}
    </div>
  )
}

function TagCard({ tag, onRemove }: { tag: TagWithCounts; onRemove: () => void }) {
  const parts = tag.counts.map((c) => `${c.count} ${configFor(c.mediaType).plural}`)
  return (
    <div className="card p-4 group hover:border-accent transition-colors">
      <div className="flex items-start gap-2">
        <Link to={`/tags/${tag.id}`} className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <p className="font-semibold group-hover:text-accent truncate">{tag.name}</p>
            {tag.category && (
              <span className="text-[10px] uppercase text-gray-500">{tag.category}</span>
            )}
          </div>
          <p className="mt-1 text-xs text-gray-500">
            {tag.total === 0 ? 'Unused' : parts.join(' · ')}
          </p>
        </Link>
        {/* Delete lives behind More, never beside the everyday action. */}
        <ActionMenu
          buttonClassName="btn-ghost px-2 py-1 text-xs"
          items={[{ label: 'Delete…', danger: true, onSelect: onRemove }]}
        />
      </div>
    </div>
  )
}
