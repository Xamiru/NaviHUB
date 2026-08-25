import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { MEDIA_CONFIGS, configFor } from '../lib/mediaConfig'
import { pathForMedia } from '../lib/mediaConfig'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import EmptyState from '../components/EmptyState'
import Section from '../components/Section'
import { MediaCard } from './MediaListPage'
import { ContextTrail } from '../components/ContextPanel'

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
  const strongest = [...items]
    .filter((item) => item.score != null)
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3)

  return (
    <div className="mx-auto max-w-[1600px] p-4 sm:p-6">
      <PageHeader
        back="history"
        title={
          <>
            {tag.name}
            {tag.category && <span className="chip ml-3 align-middle">{tag.category}</span>}
          </>
        }
        subtitle={`${items.length} ${items.length === 1 ? 'title' : 'titles'}`}
      />

      {groups.length > 0 && (
        <section className="mb-8 grid gap-6 border-b border-base-700 pb-7 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.7fr)]">
          <div>
            <h2 className="text-xl font-semibold text-white">Archive distribution</h2>
            <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {groups.map(({ cfg, items: group }) => (
                <div key={cfg.key} className="border-l border-base-600 pl-4">
                  <p className="text-2xl font-semibold">{group.length}</p>
                  <p className="mt-1 text-xs text-gray-400">{cfg.plural}</p>
                </div>
              ))}
            </div>
            <div className="mt-5 flex h-2 overflow-hidden rounded-full bg-base-700">
              {groups.map(({ cfg, items: group }, index) => (
                <span
                  key={cfg.key}
                  className={index === 0 ? 'bg-accent' : index % 2 ? 'bg-base-500' : 'bg-base-600'}
                  style={{ width: `${(group.length / items.length) * 100}%` }}
                />
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-white">Relationship trail</h2>
            <ContextTrail>
              {tag.category && <span className="chip">{tag.category}</span>}
              {strongest.map((item, index) => (
                <span key={item.id} className="contents">
                  {(tag.category || index > 0) && <span className="text-gray-600" aria-hidden="true">›</span>}
                  <Link to={pathForMedia(item)} className="chip hover:text-accent">
                    {item.title}
                  </Link>
                </span>
              ))}
            </ContextTrail>
            <p className="mt-4 text-sm leading-6 text-gray-400">
              Highest-rated linked works provide a quick route back into the archive without changing the tag itself.
            </p>
          </div>
        </section>
      )}

      {groups.length === 0 ? (
        <EmptyState title="Nothing carries this tag yet." />
      ) : (
        groups.map(({ cfg, items: group }) => (
          <Section key={cfg.key} title={`${cfg.plural} / ${group.length}`} className="mb-8">
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
