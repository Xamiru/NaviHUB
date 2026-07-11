import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { MEDIA_CONFIGS, configFor } from '../lib/mediaConfig'
import BackButton from '../components/BackButton'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import { MediaCard } from './MediaListPage'

// Everything carrying one tag, grouped by media type in sidebar order.
export default function TagDetailPage() {
  const { id } = useParams()
  const tagId = Number(id)

  const { data: tag, isLoading } = useQuery({
    queryKey: qk.tags.get(tagId),
    queryFn: () => api.tags.get(tagId)
  })
  const { data: items = [] } = useQuery({
    queryKey: qk.tags.media(tagId),
    queryFn: () => api.tags.media(tagId)
  })

  if (isLoading) return <PageStatus>Loading…</PageStatus>
  if (!tag) return <PageStatus>Tag not found.</PageStatus>

  const groups = MEDIA_CONFIGS.map((cfg) => ({
    cfg,
    items: items.filter((m) => m.mediaType === cfg.key)
  })).filter((g) => g.items.length > 0)

  return (
    <div className="p-6 max-w-[1400px] mx-auto">
      <BackButton />
      <div className="mb-6 flex items-baseline gap-3">
        <h1 className="text-2xl font-bold">{tag.name}</h1>
        {tag.category && <span className="chip">{tag.category}</span>}
        <span className="text-sm text-gray-500">
          {items.length} {items.length === 1 ? 'title' : 'titles'}
        </span>
      </div>

      {groups.length === 0 ? (
        <div className="card p-10 text-center text-gray-400">Nothing carries this tag yet.</div>
      ) : (
        groups.map(({ cfg, items: group }) => (
          <Section key={cfg.key} title={`${cfg.plural} · ${group.length}`} className="mb-8">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
              {group.map((m) => (
                <MediaCard key={m.id} cfg={configFor(m.mediaType)} item={m} />
              ))}
            </div>
          </Section>
        ))
      )}
    </div>
  )
}
