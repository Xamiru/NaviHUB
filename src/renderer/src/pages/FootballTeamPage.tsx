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
  FootballSectionTitle,
  FootballTeamMark
} from '../components/football/FootballCommon'

export default function FootballTeamPage() {
  const id = Number(useParams().id)
  const qc = useQueryClient()
  const wasSyncing = useRef(false)
  const autoQueued = useRef(false)
  const { data, isLoading } = useQuery({
    queryKey: qk.football.team(id),
    queryFn: () => api.football.team(id),
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
    qc.invalidateQueries({ queryKey: qk.football.team(id) })
  }, [id, qc, syncActive])
  useEffect(() => {
    autoQueued.current = false
  }, [id])
  useEffect(() => {
    if (!data || !sync || autoQueued.current || syncActive || data.enrichmentState !== 'not_requested') return
    autoQueued.current = true
    void api.football
      .startSync({ kind: 'enrich', entityKind: 'team', entityId: id })
      .then(() => qc.invalidateQueries({ queryKey: qk.football.sync }))
  }, [data, id, qc, sync, syncActive])
  if (isLoading) return <PageStatus>Opening team volume...</PageStatus>
  if (!data) return <PageStatus>Team not found.</PageStatus>
  async function favorite() {
    await api.football.setFavorite('team', id, !data!.favorite)
    if (!data!.favorite && data!.enrichmentState !== 'ready' && !syncActive) {
      await api.football.startSync({ kind: 'enrich', entityKind: 'team', entityId: id })
      await qc.invalidateQueries({ queryKey: qk.football.sync })
    }
    qc.invalidateQueries({ queryKey: qk.football.all })
  }
  async function enrich() {
    if (syncActive) return
    await api.football.startSync({ kind: 'enrich', entityKind: 'team', entityId: id })
    await qc.invalidateQueries({ queryKey: qk.football.sync })
  }
  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <div className="grid items-center gap-6 md:grid-cols-[150px_minmax(0,1fr)]">
        <div className="flex justify-center md:justify-start"><FootballTeamMark team={data} size="lg" /></div>
        <PageHeader
          title={data.name}
          subtitle={[data.country, data.foundedYear ? `Founded ${data.foundedYear}` : null].filter(Boolean).join(' / ') || 'Team archive'}
          back={{ to: '/football/teams', label: 'Teams' }}
          actions={<><FavoriteButton active={data.favorite} onClick={favorite} variant="pill" activeText="Saved" inactiveText="Save" /><AddToListMenu kind="footballTeam" entityId={id} /></>}
        />
      </div>

      {data.bio && <p className="mb-9 max-w-5xl whitespace-pre-line text-sm leading-7 text-ink-secondary">{data.bio}</p>}
      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.35fr)_minmax(340px,0.7fr)]">
        <div className="space-y-10">
          <section>
            <FootballSectionTitle title="Match history" detail={`${data.matches.length} recent`} />
            {data.matches.map((match) => <FootballMatchRow key={match.id} match={match} />)}
            {!data.matches.length && <p className="text-sm text-ink-muted">No matches are linked yet.</p>}
          </section>
          <section>
            <FootballSectionTitle title="Season history" detail={`${data.seasonRecords.length} tables`} />
            <div className="overflow-x-auto">
              <table className="w-full text-sm"><thead className="text-left text-xs text-ink-muted"><tr><th className="py-2">Season</th><th>Competition</th><th>Rank</th><th>P</th><th>W</th><th>D</th><th>L</th><th>GF</th><th>GA</th><th>Pts</th></tr></thead><tbody className="divide-y divide-line-subtle">{data.seasonRecords.map((row, index) => <tr key={row.seasonId ?? index}><td className="py-2.5">{row.seasonId ? <Link to={`/football/season/${row.seasonId}`} className="font-medium text-ink hover:text-signal-link">{row.seasonLabel}</Link> : 'Unknown'}</td><td className="text-ink-muted">{row.competitionName ?? 'Not supplied'}</td><td>{row.rankOfficial ? row.rank : '-'}</td>{[row.played,row.won,row.drawn,row.lost,row.goalsFor,row.goalsAgainst,row.points].map((value, i) => <td key={i} className="tabular-nums text-ink-secondary">{value}</td>)}</tr>)}</tbody></table>
            </div>
          </section>
        </div>
        <aside className="space-y-9">
          <section>
            <FootballSectionTitle title="Players and managers" />
            <div className="divide-y divide-line-subtle">
              {data.tenures.slice(0, 80).map((tenure) => (
                <Link key={tenure.id} to={`/football/person/${tenure.personId}`} className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 py-2.5 text-sm">
                  <CoverImage path={tenure.person?.imagePath} alt={tenure.person?.name ?? `Person ${tenure.personId}`} className="h-9 w-9" rounded="rounded-full" thumbWidth={72} />
                  <span className="truncate font-medium text-ink hover:text-signal-link">{tenure.person?.name ?? `Person ${tenure.personId}`}</span>
                  <span className="shrink-0 text-xs text-ink-muted">{tenure.role}{tenure.loan ? ' / loan' : ''}</span>
                </Link>
              ))}
            </div>
          </section>
          <section>
            <FootballSectionTitle title="Honours" />
            {data.honours.map((honour) => <p key={honour.id} className="border-b border-line-subtle py-2.5 text-sm"><span className="text-ink">{honour.title}</span><span className="ml-2 text-ink-muted">{honour.seasonLabel}</span></p>)}
            {!data.honours.length && <p className="text-sm text-ink-muted">Honours not supplied.</p>}
          </section>
          <section><FootballSectionTitle title="Derived media" /><FootballMediaShelf media={data.media} /></section>
        </aside>
      </div>
      <details className="mt-10 border-y border-line-subtle py-4">
        <summary className="cursor-pointer text-sm font-medium text-ink">Reference and image source</summary>
        <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
          <p className="max-w-3xl text-sm text-ink-muted">Licensed Wikimedia biography and imagery are fetched lazily. Canonical match and career facts remain available without them.</p>
          <button className="btn-ghost" disabled={syncActive} onClick={enrich}>{syncActive ? 'Football sync active' : data.enrichmentState === 'ready' ? 'Refresh reference' : 'Fetch reference'}</button>
        </div>
      </details>
    </div>
  )
}
