import { useEffect, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import FavoriteButton from '../components/FavoriteButton'
import AddToListMenu from '../components/AddToListMenu'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import {
  FootballMatchRow,
  FootballMediaShelf,
  FootballSectionTitle
} from '../components/football/FootballCommon'

export default function FootballPersonPage() {
  const id = Number(useParams().id)
  const qc = useQueryClient()
  const wasSyncing = useRef(false)
  const autoQueued = useRef(false)
  const { data, isLoading } = useQuery({
    queryKey: qk.football.person(id),
    queryFn: () => api.football.person(id),
    enabled: Number.isInteger(id) && id > 0
  })
  const { data: sync } = useQuery({
    queryKey: qk.football.sync,
    queryFn: () => api.football.syncOverview(),
    refetchInterval: (query) => {
      const state = query.state.data?.status.state
      return state && ['running', 'pausing', 'paused'].includes(state) ? 700 : false
    }
  })
  const syncActive = !!sync && ['running', 'pausing', 'paused'].includes(sync.status.state)
  useEffect(() => {
    if (syncActive) {
      wasSyncing.current = true
      return
    }
    if (!wasSyncing.current) return
    wasSyncing.current = false
    qc.invalidateQueries({ queryKey: qk.football.person(id) })
  }, [id, qc, syncActive])
  useEffect(() => {
    autoQueued.current = false
  }, [id])
  useEffect(() => {
    if (!data || !sync || autoQueued.current || syncActive || data.enrichmentState !== 'not_requested') return
    autoQueued.current = true
    void api.football
      .startSync({ kind: 'enrich', entityKind: 'person', entityId: id })
      .then(() => qc.invalidateQueries({ queryKey: qk.football.sync }))
  }, [data, id, qc, sync, syncActive])
  if (isLoading) return <PageStatus>Opening career record...</PageStatus>
  if (!data) return <PageStatus>Person not found.</PageStatus>
  async function favorite() {
    await api.football.setFavorite('person', id, !data!.favorite)
    if (!data!.favorite && data!.enrichmentState !== 'ready' && !syncActive) {
      await api.football.startSync({ kind: 'enrich', entityKind: 'person', entityId: id })
      await qc.invalidateQueries({ queryKey: qk.football.sync })
    }
    qc.invalidateQueries({ queryKey: qk.football.all })
  }
  async function enrich() {
    if (syncActive) return
    await api.football.startSync({ kind: 'enrich', entityKind: 'person', entityId: id })
    await qc.invalidateQueries({ queryKey: qk.football.sync })
  }
  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <div className="grid gap-6 md:grid-cols-[150px_minmax(0,1fr)]">
        <CoverImage path={data.imagePath} alt={data.name} className="h-36 w-36" rounded="rounded-full" thumbWidth={256} />
        <PageHeader
          title={data.name}
          subtitle={[data.role, data.nationality, data.birthDate].filter(Boolean).join(' / ')}
          back={{ to: '/football/people', label: 'Players and managers' }}
          actions={<><FavoriteButton active={data.favorite} onClick={favorite} variant="pill" activeText="Saved" inactiveText="Save" /><button className="btn-ghost" disabled={syncActive} onClick={enrich}>{syncActive ? 'Football sync active' : data.enrichmentState === 'ready' ? 'Refresh reference' : 'Fetch reference'}</button><AddToListMenu kind="footballPerson" entityId={id} /></>}
        />
      </div>
      {data.bio ? <p className="mb-9 max-w-5xl whitespace-pre-line text-sm leading-7 text-ink-secondary">{data.bio}</p> : <p className="mb-9 text-sm text-ink-muted">Biography not fetched. Canonical career facts remain available offline.</p>}

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.25fr)_minmax(340px,0.75fr)]">
        <div className="space-y-10">
          <section>
            <FootballSectionTitle title="Senior career timeline" />
            <ol className="border-l border-line-subtle pl-5">
              {data.tenures.map((tenure) => (
                <li key={tenure.id} className="relative border-b border-line-subtle py-3 before:absolute before:-left-[23px] before:top-5 before:h-1.5 before:w-1.5 before:rounded-full before:bg-ink-muted">
                  <div className="flex flex-wrap items-baseline justify-between gap-2">
                    <Link to={`/football/team/${tenure.team.id}`} className="font-medium text-ink hover:text-signal-link">{tenure.team.name}</Link>
                    <span className="text-xs text-ink-muted">{tenure.startDate ?? '?'} to {tenure.endDate ?? 'present'}</span>
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">{tenure.role}{tenure.loan ? ' / loan' : ''}{tenure.appearances != null ? ` / ${tenure.appearances} appearances` : ''}{tenure.goals != null ? ` / ${tenure.goals} goals` : ''}</p>
                </li>
              ))}
            </ol>
          </section>
          <section>
            <FootballSectionTitle title="Recorded appearances" detail={`${data.appearances.length} matches`} />
            {data.appearances.map((match) => <FootballMatchRow key={match.id} match={match} />)}
            {!data.appearances.length && <p className="text-sm text-ink-muted">Lineup appearances not supplied.</p>}
          </section>
        </div>
        <aside className="space-y-9">
          <section>
            <FootballSectionTitle title="Honours" />
            {data.honours.map((honour) => <p key={honour.id} className="border-b border-line-subtle py-2.5 text-sm"><span className="text-ink">{honour.title}</span><span className="ml-2 text-ink-muted">{honour.seasonLabel}</span></p>)}
            {!data.honours.length && <p className="text-sm text-ink-muted">Honours not supplied.</p>}
          </section>
          <section><FootballSectionTitle title="Clips and interviews" /><FootballMediaShelf media={data.media} /></section>
        </aside>
      </div>
    </div>
  )
}
