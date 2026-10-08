import { useEffect, useMemo, useRef } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageStatus from '../components/PageStatus'
import FavoriteButton from '../components/FavoriteButton'
import AddToListMenu from '../components/AddToListMenu'
import Tabs, { TabPanel } from '../components/Tabs'
import FootballExternalLinks from '../components/football/FootballExternalLinks'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { useIncrementalList } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { FOOTBALL_COMPETITION_IDENTITY, footballTeamColors } from '@shared/footballIdentity'
import { footballGoalBuckets } from '@shared/footballInsights'
import { FOOTBALL_COMPETITIONS } from '@shared/football'
import type { FootballCompetitionKey, FootballTenure } from '@shared/types'
import {
  FootballCompetitionMark,
  FootballHero,
  FootballMatchRow,
  FootballMediaShelf,
  FootballPanel,
  FootballPortrait,
  FootballTeamMark
} from '../components/football/FootballCommon'

type PersonTab = 'goals' | 'appearances' | 'career' | 'transfers'

const EUROS = new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'EUR', notation: 'compact', maximumFractionDigits: 1 })

function year(value: string | null): number | null {
  const parsed = Number(value?.slice(0, 4))
  return parsed || null
}

function CareerStrip({ tenures }: { tenures: FootballTenure[] }) {
  const spells = tenures
    .filter((tenure) => tenure.role === 'player' && year(tenure.startDate))
    .map((tenure) => ({ tenure, start: year(tenure.startDate)!, end: year(tenure.endDate) ?? new Date().getFullYear() }))
    .sort((a, b) => a.start - b.start)
  if (!spells.length) return null
  const first = spells[0].start
  const last = Math.max(...spells.map((spell) => spell.end))
  return (
    <section className="mb-9">
      <div className="section-heading mb-3 flex items-center gap-3">
        <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">Career</h2>
        <span className="h-px flex-1 bg-line-subtle" aria-hidden="true" />
        <span className="text-xs text-ink-muted">Senior clubs, width by years</span>
      </div>
      <div className="flex h-14 gap-1">
        {spells.map(({ tenure, start, end }) => {
          const colors = footballTeamColors(tenure.team.name, tenure.team.colors)
          return (
            <Link
              key={tenure.id}
              to={`/football/team/${tenure.team.id}`}
              className="relative flex min-w-[64px] flex-col justify-end overflow-hidden rounded-md border border-line-subtle px-2.5 py-1.5 hover:border-line-strong"
              style={{ flex: Math.max(1, end - start), background: `linear-gradient(90deg, ${colors.primary}55, transparent)` }}
              title={`${tenure.team.name}, ${start} to ${tenure.endDate ? end : 'present'}${tenure.loan ? ' (loan)' : ''}`}
            >
              <span className="absolute inset-y-0 left-0 w-1" style={{ background: colors.primary }} aria-hidden="true" />
              <span className="flex min-w-0 items-center gap-1.5 text-sm font-semibold text-ink"><FootballTeamMark team={tenure.team} size="xs" /><span className="truncate">{tenure.team.name}</span></span>
              <span className="truncate text-[10px] tabular-nums text-ink-muted">{start}-{tenure.endDate ? end : 'now'}{tenure.goals != null ? ` / ${tenure.goals} goals` : ''}</span>
            </Link>
          )
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] tabular-nums text-ink-muted"><span>{first}</span><span>{last}</span></div>
    </section>
  )
}

export default function FootballPersonPage() {
  const id = Number(useParams().id)
  const qc = useQueryClient()
  const wasSyncing = useRef(false)
  const [tab, setTab] = usePersistedState<PersonTab>('footballPersonTab', 'goals')
  const { data, isLoading, isError } = useQuery({
    queryKey: qk.football.person(id),
    queryFn: () => api.football.person(id),
    enabled: Number.isInteger(id) && id > 0
  })
  // Only the run state is needed here; the full sync overview is the Sync page's payload.
  const { data: sync } = useQuery({
    queryKey: qk.football.syncStatus,
    queryFn: () => api.football.syncStatus(),
    refetchInterval: (query) => {
      const state = query.state.data?.state
      return state && ['running', 'pausing', 'paused'].includes(state) ? 700 : false
    }
  })
  const syncActive = !!sync && ['running', 'pausing', 'paused'].includes(sync.state)
  const appearanceList = useIncrementalList(data?.appearances ?? [], 48, id)
  const buckets = useMemo(() => footballGoalBuckets(data?.goalsBySeason ?? []), [data])
  useEffect(() => {
    if (syncActive) {
      wasSyncing.current = true
      return
    }
    if (!wasSyncing.current) return
    wasSyncing.current = false
    qc.invalidateQueries({ queryKey: qk.football.person(id) })
  }, [id, qc, syncActive])
  if (isLoading) return <PageStatus>Opening career record...</PageStatus>
  if (isError) return <PageStatus>Could not load this career record.</PageStatus>
  if (!data) return <PageStatus>Person not found.</PageStatus>
  async function favorite() {
    await api.football.setFavorite('person', id, !data!.favorite)
    if (!data!.favorite && data!.enrichmentState !== 'ready' && !syncActive) {
      await api.football.startSync({ kind: 'enrich', entityKind: 'person', entityId: id })
      await qc.invalidateQueries({ queryKey: qk.football.syncStatus })
    }
    qc.invalidateQueries({ queryKey: qk.football.all })
  }
  async function enrich() {
    if (syncActive) return
    await api.football.startSync({ kind: 'enrich', entityKind: 'person', entityId: id })
    await qc.invalidateQueries({ queryKey: qk.football.syncStatus })
  }

  const clubs = new Set(data.tenures.filter((tenure) => tenure.role === 'player').map((tenure) => tenure.team.id))
  const mainClub = [...data.tenures].sort((a, b) => (b.appearances ?? 0) - (a.appearances ?? 0) || (year(b.endDate) ?? 9999) - (year(a.endDate) ?? 9999))[0]?.team
  const tint = mainClub ? footballTeamColors(mainClub.name, mainClub.colors).primary : null
  const honours = new Map<string, { count: number; competitionKey: FootballCompetitionKey | null }>()
  for (const honour of data.honours) {
    if (honour.placement === 'runner-up') continue
    const label = honour.placement === 'individual' ? honour.title : honour.competitionName
    const entry = honours.get(label) ?? { count: 0, competitionKey: honour.placement === 'individual' ? null : honour.competitionKey }
    entry.count++
    honours.set(label, entry)
  }
  const peak = Math.max(1, ...buckets.map((bucket) => bucket.total))
  const competitions = [...new Set(buckets.flatMap((bucket) => bucket.parts.map((part) => part.competitionKey)))]
  const competitionName = (key: FootballCompetitionKey) => FOOTBALL_COMPETITIONS.find((item) => item.key === key)?.name ?? key

  return (
    <div>
      <FootballHero
        tint={tint ? `linear-gradient(90deg, ${tint}40, ${tint}10 45%, transparent)` : 'linear-gradient(90deg, rgb(var(--surface-raised)), transparent)'}
        back={{ to: '/football/people', label: 'Players and managers' }}
      >
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <FootballPortrait name={data.name} imagePath={data.imagePath} className="h-40 w-32" rounded="rounded-lg" thumbWidth={320} />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-secondary">
              {[data.position ?? (data.role === 'both' ? 'Player and manager' : data.role), data.nationality, data.birthDate ? `born ${data.birthDate}${data.birthPlace ? `, ${data.birthPlace}` : ''}` : data.birthPlace ? `born in ${data.birthPlace}` : null, data.heightCm ? `${data.heightCm} cm` : null, data.foot ? `${data.foot} foot` : null, data.deathDate ? `died ${data.deathDate}` : null].filter(Boolean).join(' / ')}
            </p>
            <h1 className="mt-1 text-4xl font-semibold tracking-tight text-ink">{data.name}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {[...honours].slice(0, 5).map(([title, { count, competitionKey }]) => <span key={title} className="football-honour items-center">{competitionKey && <FootballCompetitionMark competitionKey={competitionKey} size="xs" />}<b className="font-semibold tabular-nums text-ink">{count}</b>{title}</span>)}
              {mainClub && <Link to={`/football/team/${mainClub.id}`} className="football-honour items-center hover:border-signal-link"><FootballTeamMark team={mainClub} size="xs" />{mainClub.name}</Link>}
            </div>
          </div>
          <dl className="grid grid-cols-3 gap-x-8 text-right">
            <div><dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Goals</dt><dd className="mt-1 text-3xl font-semibold tabular-nums text-ink">{data.goalTotal}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Matches</dt><dd className="mt-1 text-3xl font-semibold tabular-nums text-ink">{data.matchTotal}</dd></div>
            <div><dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Clubs</dt><dd className="mt-1 text-3xl font-semibold tabular-nums text-ink">{clubs.size || '-'}</dd></div>
          </dl>
          <div className="flex w-full items-center justify-end gap-2">
            <FavoriteButton active={data.favorite} onClick={favorite} variant="pill" activeText="Saved" inactiveText="Save" />
            <AddToListMenu kind="footballPerson" entityId={id} />
          </div>
        </div>
      </FootballHero>

      <div className="mx-auto max-w-[1500px] px-6 py-7">
        <CareerStrip tenures={data.tenures} />

        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_400px]">
          <section className="min-w-0">
            <Tabs
              id="football-person"
              label="Player view"
              className="mb-4"
              value={tab}
              onChange={setTab}
              tabs={[
                { key: 'goals', label: 'Goals', count: data.goalTotal || undefined },
                { key: 'appearances', label: 'Matches', count: data.appearances.length || undefined },
                { key: 'career', label: 'Career', count: data.tenures.length || undefined },
                ...(data.transfers.length ? [{ key: 'transfers' as const, label: 'Transfers', count: data.transfers.length }] : [])
              ]}
            />
            <TabPanel tabsId="football-person" value={tab}>
              {tab === 'goals' && (buckets.length ? (
                <div className="card p-4">
                  <div className="flex h-48 items-end gap-1.5" role="img" aria-label={`Recorded goals by season: ${buckets.map((bucket) => `${bucket.season} ${bucket.total}`).join(', ')}`}>
                    {buckets.map((bucket) => (
                      <div key={bucket.season} className="flex h-full min-w-0 flex-1 flex-col-reverse" title={`${bucket.season}: ${bucket.total} goals`}>
                        {bucket.parts.map((part) => (
                          <span key={part.competitionKey} className="w-full first:rounded-b-sm last:rounded-t-sm" style={{ height: `${(part.goals / peak) * 100}%`, background: `rgb(${FOOTBALL_COMPETITION_IDENTITY[part.competitionKey].rgb})` }} />
                        ))}
                      </div>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-1.5 text-[10px] tabular-nums text-ink-muted" aria-hidden="true">
                    {buckets.map((bucket) => <span key={bucket.season} className="min-w-0 flex-1 truncate text-center">{bucket.season.slice(2)}</span>)}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-4 text-xs text-ink-muted">
                    {competitions.map((key) => <span key={key} className="flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm" style={{ background: `rgb(${FOOTBALL_COMPETITION_IDENTITY[key].rgb})` }} /><FootballCompetitionMark competitionKey={key} size="xs" />{competitionName(key)}</span>)}
                  </div>
                </div>
              ) : <p className="text-sm text-ink-muted">No goals are recorded for {data.name} in the archive.</p>)}
              {tab === 'appearances' && (
                <div>
                  {appearanceList.visible.map((match) => <FootballMatchRow key={match.id} match={match} />)}
                  <div ref={appearanceList.sentinelRef} />
                  {!data.appearances.length && <p className="text-sm text-ink-muted">Lineup appearances not supplied.</p>}
                </div>
              )}
              {tab === 'transfers' && (
                <ol className="divide-y divide-line-subtle">
                  {data.transfers.map((transfer) => {
                    const side = (team: typeof transfer.from, name: string) => team
                      ? <Link to={`/football/team/${team.id}`} className="flex min-w-0 items-center gap-2 text-ink hover:text-signal-link"><FootballTeamMark team={team} size="xs" /><span className="truncate">{team.name}</span></Link>
                      : <span className="truncate text-ink-secondary">{name}</span>
                    return (
                      <li key={transfer.id} className="grid grid-cols-[88px_minmax(0,1fr)_auto] items-center gap-3 py-2.5 text-sm">
                        <span className="font-mono text-xs tabular-nums text-ink-muted">{transfer.date ?? transfer.season ?? ''}</span>
                        <span className="flex min-w-0 flex-wrap items-center gap-x-2">{side(transfer.from, transfer.fromName)}<span className="text-xs text-ink-muted">to</span>{side(transfer.to, transfer.toName)}</span>
                        <span className="text-right text-xs tabular-nums text-ink-secondary">{transfer.fee ? EUROS.format(transfer.fee) : 'Free or undisclosed'}</span>
                      </li>
                    )
                  })}
                </ol>
              )}
              {tab === 'career' && (
                <ol className="divide-y divide-line-subtle">
                  {data.tenures.map((tenure) => (
                    <li key={tenure.id} className="grid grid-cols-[32px_minmax(0,1fr)_auto] items-center gap-3 py-2.5 text-sm">
                      <FootballTeamMark team={tenure.team} size="sm" />
                      <span className="min-w-0"><Link to={`/football/team/${tenure.team.id}`} className="font-medium text-ink hover:text-signal-link">{tenure.team.name}</Link><span className="ml-2 text-xs capitalize text-ink-muted">{tenure.role}{tenure.loan ? ' / loan' : ''}</span></span>
                      <span className="text-right text-xs tabular-nums text-ink-muted">{tenure.startDate?.slice(0, 4) ?? '?'} to {tenure.endDate?.slice(0, 4) ?? 'present'}{tenure.appearances != null ? ` / ${tenure.appearances} apps` : ''}{tenure.goals != null ? ` / ${tenure.goals} goals` : ''}</span>
                    </li>
                  ))}
                  {!data.tenures.length && <p className="py-3 text-sm text-ink-muted">Career spells are fetched with the reference data.</p>}
                </ol>
              )}
            </TabPanel>
          </section>

          <aside className="space-y-6">
            <FootballPanel title="Matches with goals">
              {data.scoredIn.length ? (
                <div className="divide-y divide-line-subtle text-sm">
                  {data.scoredIn.map(({ match, goals }) => (
                    <Link key={match.id} to={`/football/match/${match.id}`} className="flex items-center justify-between gap-3 py-2 hover:text-signal-link">
                      <span className="flex min-w-0 items-center gap-1.5 text-ink"><FootballTeamMark team={match.home} size="xs" /><span className="truncate">{match.home.name}</span><span className="shrink-0 tabular-nums">{match.homeScore}-{match.awayScore}</span><span className="truncate">{match.away.name}</span><FootballTeamMark team={match.away} size="xs" /></span>
                      <span className="shrink-0 text-xs text-ink-muted">{match.matchDate.slice(0, 4)} / {goals === 1 ? 'scored' : goals === 3 ? 'hat-trick' : `${goals} goals`}</span>
                    </Link>
                  ))}
                </div>
              ) : <p className="text-sm text-ink-muted">No recorded goals yet.</p>}
            </FootballPanel>
            {data.media.length > 0 && <FootballPanel title="Clips and interviews"><FootballMediaShelf media={data.media} /></FootballPanel>}
          </aside>
        </div>

        {data.bio && (
          <details className="mt-10 border-y border-line-subtle py-4" open>
            <summary className="cursor-pointer text-sm font-medium text-ink">Biography</summary>
            <p className="mt-4 max-w-5xl whitespace-pre-line text-sm leading-7 text-ink-secondary">{data.bio}</p>
          </details>
        )}
        <details className="mt-6 border-y border-line-subtle py-4">
          <summary className="cursor-pointer text-sm font-medium text-ink">Reference, portrait and external links</summary>
          <div className="mt-4 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-3xl text-sm text-ink-muted">The portrait, biography and career are fetched from reference sources when you save the player or ask here.</p>
              <button className="btn-ghost" disabled={syncActive} onClick={enrich}>{syncActive ? 'Football sync active' : data.enrichmentState === 'ready' ? 'Refresh reference' : 'Fetch reference'}</button>
            </div>
            <FootballExternalLinks entityKind="person" entityId={id} links={data.externalLinks} onChanged={() => qc.invalidateQueries({ queryKey: qk.football.all })} />
          </div>
        </details>
      </div>
    </div>
  )
}
