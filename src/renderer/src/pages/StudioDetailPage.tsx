import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import EntityHeader from '../components/EntityHeader'
import BackButton from '../components/BackButton'
import CoverImage from '../components/CoverImage'
import PageStatus from '../components/PageStatus'
import Section from '../components/Section'
import { FilterPills } from '../components/PillGroup'
import EditorialDetailFrame, { RelationshipTrail } from '../components/EditorialDetailFrame'
import { configFor, pathForMedia, MEDIA_CONFIGS } from '../lib/mediaConfig'
import { chronologicalYear } from '../lib/archiveDisplay'
import { useLeaveDeleted, usePersistedState } from '../lib/navState'
import { completedStatusByType, useIncrementalList, useSettings } from '../lib/hooks'
import { pickTopWorks, sortWorks, WORK_SORT_OPTIONS, type WorkSort } from '../lib/companyWorks'
import { Field } from '../components/Field'
import type { CompanyType, MediaItem, MediaType } from '@shared/types'

const TYPES: CompanyType[] = ['studio', 'publisher', 'developer', 'other']

export default function StudioDetailPage() {
  const { id } = useParams()
  const companyId = Number(id)
  const leaveDeleted = useLeaveDeleted()
  const qc = useQueryClient()
  // The Edit dialog's type choice, applied with its Save.
  const [typeDraft, setTypeDraft] = useState<CompanyType | null>(null)

  const { data: company } = useQuery({
    queryKey: qk.companies.get(companyId),
    queryFn: () => api.companies.get(companyId)
  })
  const { data: works = [] } = useQuery({
    queryKey: qk.companies.media(companyId),
    queryFn: () => api.companies.media(companyId)
  })
  const { data: collaborators = [] } = useQuery({
    queryKey: qk.companies.collaborators(companyId),
    queryFn: () => api.companies.collaborators(companyId),
    enabled: works.length > 1
  })
  const { data: settings } = useSettings()
  const [typeFilter, setTypeFilter] = usePersistedState<MediaType | 'all'>('studioWorkType', 'all')
  const [workSort, setWorkSort] = usePersistedState<WorkSort>('studioWorkSort', 'newest')

  const summary = useMemo(() => {
    const done = completedStatusByType(settings)
    const isCompleted = (m: MediaItem): boolean =>
      m.status != null && m.status === done.get(m.mediaType)
    const types = [...new Set(works.map((m) => m.mediaType))]
    const order = MEDIA_CONFIGS.map((cfg) => cfg.key)
    types.sort((a, b) => order.indexOf(a) - order.indexOf(b))
    return {
      types,
      completed: works.filter(isCompleted).length,
      knownFor: pickTopWorks(works, isCompleted)
    }
  }, [works, settings])
  // A remembered type this company has no works in falls back to All.
  const activeType = typeFilter !== 'all' && summary.types.includes(typeFilter) ? typeFilter : 'all'
  const shownWorks = useMemo(
    () =>
      sortWorks(
        activeType === 'all' ? works : works.filter((m) => m.mediaType === activeType),
        workSort
      ),
    [works, activeType, workSort]
  )

  if (!company) return <PageStatus>Loading…</PageStatus>
  const type = typeDraft ?? company.type


  return (
    <EditorialDetailFrame width="wide">
      <BackButton />
      <RelationshipTrail>
        <Link to="/studios" className="hover:text-accent">Studios</Link>
        <span className="text-gray-600" aria-hidden="true">›</span>
        <span>{company.name}</span>
      </RelationshipTrail>
      <EntityHeader
        imageShape="logo"
        initial={{
          name: company.name,
          native: company.nameNative ?? '',
          longText: '',
          imgPath: company.logoPath
        }}
        facts={[
          { label: 'Type', value: <span className="capitalize">{company.type}</span> },
          { label: 'In your library', value: `${works.length} ${works.length === 1 ? 'work' : 'works'}` },
          ...(works.length > 0
            ? [{ label: 'Completed', value: `${summary.completed} of ${works.length} works` }]
            : [])
        ]}
        editFields={
          <Field label="Type">
            <select className="input capitalize" value={type} onChange={(e) => setTypeDraft(e.target.value as CompanyType)}>
              {TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </Field>
        }
        onSave={async (f) => {
          await api.companies.upsert({
            id: companyId,
            name: f.name,
            nameNative: f.native || null,
            type,
            logoPath: f.imgPath
          })
          await qc.invalidateQueries({ queryKey: qk.companies.all })
        }}
        onEditReset={() => setTypeDraft(null)}
        onDelete={async () => {
          await api.companies.remove(companyId)
          qc.invalidateQueries({ queryKey: qk.companies.all })
          leaveDeleted((path) => path === `/studios/${companyId}`, '/studios')
        }}
      >
        {summary.knownFor.length > 0 && (
          <Section
            title="Known for"
            subtitle={
              summary.knownFor.some((m) => m.score != null)
                ? 'Your highest-scored works first'
                : 'Works you finished, newest first'
            }
          >
            <div className="grid grid-cols-3 gap-4 sm:grid-cols-6">
              {summary.knownFor.map((m) => (
                <Link key={m.id} to={pathForMedia(m)} className="group block min-w-0">
                  <CoverImage
                    path={m.coverPath}
                    alt=""
                    thumbWidth={240}
                    rounded="rounded-lg"
                    className="aspect-[2/3] w-full transition-transform group-hover:scale-[1.03]"
                  />
                  <p className="mt-1.5 truncate text-sm text-ink-primary group-hover:text-accent">{m.title}</p>
                  <p className="truncate text-xs text-ink-muted">
                    {[chronologicalYear(m.releaseDate), m.score != null ? `scored ${m.score}` : null]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                </Link>
              ))}
            </div>
          </Section>
        )}

        <Section title={`Works · ${shownWorks.length}`}>
          {works.length === 0 ? (
            <p className="text-sm text-gray-400">
              No works linked yet. Add this company from a title&apos;s page.
            </p>
          ) : (
            <>
              <div className="mb-4 flex flex-wrap items-center gap-x-4 gap-y-2">
                {summary.types.length > 1 && (
                  <FilterPills
                    label="Filter by type"
                    options={[
                      { key: 'all', label: 'All' },
                      ...summary.types.map((t) => ({ key: t, label: configFor(t).plural }))
                    ]}
                    value={activeType}
                    onChange={(t) => setTypeFilter(t as MediaType | 'all')}
                  />
                )}
                <FilterPills
                  label="Sort works"
                  options={WORK_SORT_OPTIONS}
                  value={workSort}
                  onChange={(k) => setWorkSort(k as WorkSort)}
                />
              </div>
              <WorkGrid works={shownWorks} />
            </>
          )}
        </Section>

        {collaborators.length > 0 && (
          <Section title="Frequent collaborators" subtitle="Crew on several of these works" className="mb-0">
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-2">
              {collaborators.map(({ person, shared, roles }) => (
                <Link
                  key={person.id}
                  to={`/people/${person.id}`}
                  className="group flex min-w-0 items-center gap-3 rounded-lg px-2 py-1.5 hover:bg-surface-raised"
                >
                  <CoverImage
                    path={person.photoPath}
                    alt=""
                    thumbWidth={80}
                    rounded="rounded-full"
                    className="h-11 w-11 shrink-0 object-cover"
                  />
                  <span className="min-w-0">
                    <span className="block truncate text-sm text-ink-primary group-hover:text-accent">
                      {person.name}
                    </span>
                    <span className="block truncate text-xs text-ink-muted">
                      {roles.slice(0, 2).join(', ')} · {shared} works
                    </span>
                  </span>
                </Link>
              ))}
            </div>
          </Section>
        )}
      </EntityHeader>
    </EditorialDetailFrame>
  )
}

// A big studio has hundreds of works, so covers render in batches as the
// sentinel scrolls into view.
function WorkGrid({ works }: { works: MediaItem[] }) {
  const { visible, sentinelRef, hasMore } = useIncrementalList(works, 48)
  if (works.length === 0) return <p className="text-sm text-gray-400">No works match this filter.</p>
  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(112px,1fr))] gap-3">
        {visible.map((m) => (
          <Link key={m.id} to={pathForMedia(m)} className="group block min-w-0">
            <div className="aspect-[2/3] overflow-hidden rounded-lg">
              <CoverImage
                path={m.coverPath}
                alt=""
                thumbWidth={160}
                rounded="rounded-lg"
                className="h-full w-full transition-transform group-hover:scale-105"
              />
            </div>
            <p className="mt-1.5 line-clamp-2 text-xs font-medium leading-4 group-hover:text-accent">
              {m.title}
            </p>
            <p className="mt-0.5 text-xs tabular-nums text-gray-400">
              {chronologicalYear(m.releaseDate)}
            </p>
          </Link>
        ))}
      </div>
      {hasMore && <div ref={sentinelRef} />}
    </>
  )
}
