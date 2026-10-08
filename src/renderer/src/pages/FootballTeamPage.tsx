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
import { footballTeamColors } from '@shared/footballIdentity'
import { footballLeagueFinishes } from '@shared/footballInsights'
import type { FootballCompetitionKey, FootballHonour, FootballStanding } from '@shared/types'
import {
  FootballCompetitionMark,
  FootballFlag,
  FootballHero,
  FootballMatchRow,
  FootballMediaShelf,
  FootballPanel,
  FootballPortrait,
  FootballTeamMark,
  FootballZoneBadge
} from '../components/football/FootballCommon'

type TeamTab = 'seasons' | 'matches' | 'squad' | 'honours'

function honourCounts(honours: FootballHonour[]): Array<{ title: string; competitionKey: FootballCompetitionKey; count: number }> {
  const counts = new Map<string, { title: string; competitionKey: FootballCompetitionKey; count: number }>()
  for (const honour of honours) {
    if (honour.placement !== 'winner') continue
    const entry = counts.get(honour.competitionName) ?? { title: honour.competitionName, competitionKey: honour.competitionKey, count: 0 }
    entry.count++
    counts.set(honour.competitionName, entry)
  }
  return [...counts.values()].sort((a, b) => b.count - a.count)
}

function seasonStart(label: string | undefined): number {
  return Number(label?.match(/\d{4}/)?.[0] ?? 0)
}

function FinishChart({ finishes, color }: { finishes: FootballStanding[]; color: string }) {
  const depth = Math.max(10, ...finishes.map((row) => row.teamCount ?? row.position ?? 1))
  const width = 900
  const height = 230
  const left = 40
  const right = 12
  const top = 14
  const plotHeight = height - top - 36
  const x = (index: number): number => left + (finishes.length > 1 ? (index * (width - left - right)) / (finishes.length - 1) : (width - left - right) / 2)
  const y = (position: number): number => top + ((position - 1) / (depth - 1)) * plotHeight
  const segments: number[][] = []
  finishes.forEach((row, index) => {
    const previous = finishes[index - 1]
    const joined = previous && seasonStart(row.seasonLabel) - seasonStart(previous.seasonLabel) <= 1 && previous.competitionKey === row.competitionKey
    if (joined) segments[segments.length - 1].push(index)
    else segments.push([index])
  })
  const ticks = [1, Math.round(depth / 4), Math.round(depth / 2), Math.round((depth * 3) / 4), depth].filter((value, index, all) => all.indexOf(value) === index)
  const labelEvery = Math.max(1, Math.ceil(finishes.length / 8))
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label={`League finish by season: ${finishes.map((row) => `${row.seasonLabel} ${row.position}`).join(', ')}`}>
      {ticks.map((tick) => (
        <g key={tick}>
          <line x1={left} x2={width - right} y1={y(tick)} y2={y(tick)} stroke="rgb(var(--line-subtle))" />
          <text x={left - 10} y={y(tick) + 4} textAnchor="end" fontSize="10" fill="rgb(var(--ink-muted))">{tick}</text>
        </g>
      ))}
      {segments.map((segment) => (
        <polyline key={segment[0]} fill="none" stroke={color} strokeWidth="2.5" strokeLinejoin="round" points={segment.map((index) => `${x(index)},${y(finishes[index].position!)}`).join(' ')} />
      ))}
      {finishes.map((row, index) => (
        <g key={row.seasonId}>
          <circle cx={x(index)} cy={y(row.position!)} r={row.position === 1 ? 6 : 3.5} fill={row.position === 1 ? 'rgb(var(--signal-caution))' : color} stroke="rgb(var(--surface-panel))" strokeWidth="1.5">
            <title>{row.seasonLabel}: {row.position}{row.teamCount ? ` of ${row.teamCount}` : ''}</title>
          </circle>
          {index % labelEvery === 0 && <text x={x(index)} y={height - 8} textAnchor="middle" fontSize="10" fill="rgb(var(--ink-muted))">{seasonStart(row.seasonLabel)}</text>}
        </g>
      ))}
    </svg>
  )
}

export default function FootballTeamPage() {
  const id = Number(useParams().id)
  const qc = useQueryClient()
  const wasSyncing = useRef(false)
  const [tab, setTab] = usePersistedState<TeamTab>('footballTeamTab', 'seasons')
  const [range, setRange] = usePersistedState<'recent' | 'all'>('footballTeamFinishRange', 'recent')
  const { data, isLoading, isError } = useQuery({
    queryKey: qk.football.team(id),
    queryFn: () => api.football.team(id),
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
  const tenureList = useIncrementalList(data?.tenures ?? [], 40, id)
  const matchList = useIncrementalList(data?.matches ?? [], 40, id)
  const finishes = useMemo(() => footballLeagueFinishes(data?.seasonRecords ?? []), [data])
  useEffect(() => {
    if (syncActive) {
      wasSyncing.current = true
      return
    }
    if (!wasSyncing.current) return
    wasSyncing.current = false
    qc.invalidateQueries({ queryKey: qk.football.team(id) })
  }, [id, qc, syncActive])
  if (isLoading) return <PageStatus>Opening team volume...</PageStatus>
  if (isError) return <PageStatus>Could not load this team volume.</PageStatus>
  if (!data) return <PageStatus>Team not found.</PageStatus>
  async function favorite() {
    await api.football.setFavorite('team', id, !data!.favorite)
    if (!data!.favorite && data!.enrichmentState !== 'ready' && !syncActive) {
      await api.football.startSync({ kind: 'enrich', entityKind: 'team', entityId: id })
      await qc.invalidateQueries({ queryKey: qk.football.syncStatus })
    }
    qc.invalidateQueries({ queryKey: qk.football.all })
  }
  async function enrich() {
    if (syncActive) return
    await api.football.startSync({ kind: 'enrich', entityKind: 'team', entityId: id })
    await qc.invalidateQueries({ queryKey: qk.football.syncStatus })
  }
  const colors = footballTeamColors(data.name, data.colors)
  const lineColor = colors.primary.toLowerCase() === '#ffffff' ? colors.secondary : colors.primary
  const honours = honourCounts(data.honours)
  const shownFinishes = range === 'recent' ? finishes.slice(-35) : finishes
  const topFlight = finishes.length

  return (
    <div>
      <FootballHero
        tint={`linear-gradient(90deg, ${colors.primary} 0 6px, ${colors.primary}6b 6px, ${colors.primary}1a 45%, transparent)`}
        back={{ to: '/football/teams', label: 'Teams' }}
      >
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <FootballTeamMark team={data} size="xl" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-ink-secondary">
              {[data.country, data.isNational ? 'National team' : null, data.foundedYear ? `founded ${data.foundedYear}` : null, data.venue ? `${data.venue}${data.venueCapacity ? ` (${data.venueCapacity.toLocaleString()})` : ''}` : null].filter(Boolean).join(' / ') || 'Team archive'}
            </p>
            <h1 className="mt-1 text-4xl font-semibold tracking-tight text-ink">{data.name}</h1>
            <div className="mt-3 flex flex-wrap gap-2">
              {honours.slice(0, 5).map((honour) => <span key={honour.title} className="football-honour items-center"><FootballCompetitionMark competitionKey={honour.competitionKey} size="xs" /><b className="font-semibold tabular-nums text-ink">{honour.count}</b>{honour.title}</span>)}
              {topFlight > 0 && <span className="football-honour"><b className="font-semibold tabular-nums text-ink">{topFlight}</b>top-flight seasons</span>}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FavoriteButton active={data.favorite} onClick={favorite} variant="pill" activeText="Saved" inactiveText="Save" />
            <AddToListMenu kind="footballTeam" entityId={id} />
          </div>
        </div>
      </FootballHero>

      <div className="mx-auto max-w-[1500px] px-6 py-7">
        {finishes.length > 1 && (
          <section className="mb-9">
            <div className="section-heading mb-3 flex items-center gap-3">
              <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">League finish</h2>
              <span className="h-px flex-1 bg-line-subtle" aria-hidden="true" />
              {finishes.length > 35 && (
                <span className="flex gap-1.5">
                  <button className={`pill ${range === 'recent' ? 'pill-active' : ''}`} onClick={() => setRange('recent')}>Last 35 seasons</button>
                  <button className={`pill ${range === 'all' ? 'pill-active' : ''}`} onClick={() => setRange('all')}>All time</button>
                </span>
              )}
            </div>
            <div className="card p-4"><FinishChart finishes={shownFinishes} color={lineColor} /></div>
          </section>
        )}

        <div className="grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section className="min-w-0">
            <Tabs
              id="football-team"
              label="Team view"
              className="mb-4"
              value={tab}
              onChange={setTab}
              tabs={[
                { key: 'seasons', label: 'Seasons', count: data.seasonRecords.length },
                { key: 'matches', label: 'Matches', count: data.matches.length },
                { key: 'squad', label: 'Squad', count: data.tenures.length },
                { key: 'honours', label: 'Honours', count: data.honours.length }
              ]}
            />
            <TabPanel tabsId="football-team" value={tab}>
              {tab === 'seasons' && (data.seasonRecords.length ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead><tr className="border-b border-line-strong text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted"><th className="py-2">Season</th><th>Competition</th><th className="text-right">Pos</th><th className="text-right">W-D-L</th><th className="text-right">GF-GA</th><th className="text-right">Pts</th></tr></thead>
                    <tbody className="divide-y divide-line-subtle">
                      {data.seasonRecords.map((row, index) => (
                        <tr key={row.seasonId ?? index} className="hover:bg-surface-raised/40">
                          <td className="py-2.5">{row.seasonId ? <Link to={`/football/season/${row.seasonId}`} className="font-mono text-xs text-ink hover:text-signal-link">{row.seasonLabel}</Link> : <span className="text-ink-muted">Unknown</span>}</td>
                          <td>{row.competitionKey && <FootballFlag competitionKey={row.competitionKey} />}</td>
                          <td className="text-right"><FootballZoneBadge position={row.rankOfficial ? row.rank : row.position} fate={row.fate} champion={data.honours.some((honour) => honour.placement === 'winner' && honour.seasonId === row.seasonId)} /></td>
                          <td className="text-right tabular-nums text-ink-secondary">{row.won}-{row.drawn}-{row.lost}</td>
                          <td className="text-right tabular-nums text-ink-secondary">{row.goalsFor}-{row.goalsAgainst}</td>
                          <td className="text-right font-semibold tabular-nums text-ink">{row.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : <p className="text-sm text-ink-muted">No league tables are stored for this team.</p>)}
              {tab === 'matches' && (
                <div>
                  {matchList.visible.map((match) => <FootballMatchRow key={match.id} match={match} />)}
                  <div ref={matchList.sentinelRef} />
                  {!data.matches.length && <p className="text-sm text-ink-muted">No matches are linked yet.</p>}
                </div>
              )}
              {tab === 'squad' && (
                <div className="divide-y divide-line-subtle">
                  {tenureList.visible.map((tenure) => (
                    <Link key={tenure.id} to={`/football/person/${tenure.personId}`} className="grid grid-cols-[36px_minmax(0,1fr)_auto] items-center gap-3 py-2.5 text-sm hover:bg-surface-raised/40">
                      <FootballPortrait name={tenure.person?.name ?? `Person ${tenure.personId}`} imagePath={tenure.person?.imagePath} />
                      <span className="truncate font-medium text-ink">{tenure.person?.name ?? `Person ${tenure.personId}`}<span className="ml-2 text-xs font-normal capitalize text-ink-muted">{tenure.role}{tenure.loan ? ' / loan' : ''}</span></span>
                      <span className="shrink-0 text-xs tabular-nums text-ink-muted">{tenure.startDate?.slice(0, 4) ?? '?'} to {tenure.endDate?.slice(0, 4) ?? 'present'}{tenure.goals != null ? ` / ${tenure.goals} goals` : ''}</span>
                    </Link>
                  ))}
                  <div ref={tenureList.sentinelRef} />
                  {!data.tenures.length && <p className="py-3 text-sm text-ink-muted">No squad spells are stored. Players arrive with the Player Quiz Pack and lineups.</p>}
                </div>
              )}
              {tab === 'honours' && (
                <div className="divide-y divide-line-subtle">
                  {data.honours.map((honour) => (
                    <p key={honour.id} className="flex items-center justify-between gap-3 py-2.5 text-sm">
                      <span className="flex min-w-0 items-center gap-2 text-ink"><FootballCompetitionMark competitionKey={honour.competitionKey} size="xs" /><span className="truncate">{honour.competitionName}</span><span className="text-xs capitalize text-ink-muted">{honour.placement}</span></span>
                      {honour.seasonId ? <Link to={`/football/season/${honour.seasonId}`} className="font-mono text-xs text-ink-secondary hover:text-signal-link">{honour.seasonLabel}</Link> : <span className="text-xs text-ink-muted">{honour.seasonLabel}</span>}
                    </p>
                  ))}
                  {!data.honours.length && <p className="py-3 text-sm text-ink-muted">Honours not supplied.</p>}
                </div>
              )}
            </TabPanel>
          </section>

          <aside className="space-y-6">
            <FootballPanel title="Leading scorers in the archive">
              {data.scorers.length ? (
                <ol className="space-y-2.5">
                  {data.scorers.slice(0, 8).map((entry) => (
                    <li key={entry.person.id} className="grid grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-2">
                      <span className="text-xs tabular-nums text-ink-muted">{entry.rank}</span>
                      <span className="min-w-0">
                        <Link to={`/football/person/${entry.person.id}`} className="flex items-center gap-2 text-sm text-ink hover:text-signal-link"><FootballPortrait name={entry.person.name} imagePath={entry.person.imagePath} className="h-7 w-7" /><span className="truncate">{entry.person.name}</span></Link>
                        <span className="mt-1 block h-1 rounded-full" style={{ width: `${(entry.goals / data.scorers[0].goals) * 100}%`, background: lineColor }} aria-hidden="true" />
                      </span>
                      <span className="text-lg font-semibold tabular-nums text-ink">{entry.goals}</span>
                    </li>
                  ))}
                </ol>
              ) : <p className="text-sm text-ink-muted">No goal scorers are recorded for this team.</p>}
            </FootballPanel>

            {data.tenures.some((tenure) => tenure.role === 'manager') && (
              <FootballPanel title="Managers">
                <div className="divide-y divide-line-subtle text-sm">
                  {data.tenures
                    .filter((tenure) => tenure.role === 'manager')
                    .sort((a, b) => (b.startDate ?? '').localeCompare(a.startDate ?? ''))
                    .slice(0, 10)
                    .map((tenure) => (
                      <Link key={tenure.id} to={`/football/person/${tenure.personId}`} className="flex items-center justify-between gap-3 py-2 hover:text-signal-link">
                        <span className="flex min-w-0 items-center gap-2 text-ink"><FootballPortrait name={tenure.person?.name ?? '?'} imagePath={tenure.person?.imagePath} className="h-7 w-7" /><span className="truncate">{tenure.person?.name ?? `Person ${tenure.personId}`}</span></span>
                        <span className="shrink-0 text-xs tabular-nums text-ink-muted">{tenure.startDate?.slice(0, 4) ?? '?'}-{tenure.endDate?.slice(0, 4) ?? 'now'}</span>
                      </Link>
                    ))}
                </div>
              </FootballPanel>
            )}

            {data.rivals.length > 0 && (
              <FootballPanel title="Most played opponents">
                <div className="space-y-3 text-sm">
                  {data.rivals.map((rival) => (
                    <div key={rival.opponent.id}>
                      <div className="flex items-center justify-between gap-3">
                        <Link to={`/football/team/${rival.opponent.id}`} className="flex min-w-0 items-center gap-2 text-ink hover:text-signal-link"><FootballTeamMark team={rival.opponent} size="xs" /><span className="truncate">{rival.opponent.name}</span></Link>
                        <span className="shrink-0 tabular-nums text-ink-muted">{rival.played} played</span>
                      </div>
                      <div className="mt-1.5 flex h-2 overflow-hidden rounded-full" aria-hidden="true">
                        <span className="bg-signal-affirmative" style={{ width: `${(rival.won / rival.played) * 100}%` }} />
                        <span className="bg-ink-muted/60" style={{ width: `${(rival.drawn / rival.played) * 100}%` }} />
                        <span className="bg-signal-anomaly" style={{ width: `${(rival.lost / rival.played) * 100}%` }} />
                      </div>
                      <p className="mt-1 text-xs tabular-nums text-ink-muted">{rival.won} W / {rival.drawn} D / {rival.lost} L / goals {rival.goalsFor}-{rival.goalsAgainst}</p>
                    </div>
                  ))}
                </div>
              </FootballPanel>
            )}

            {data.media.length > 0 && <FootballPanel title="Media"><FootballMediaShelf media={data.media} /></FootballPanel>}
          </aside>
        </div>

        {data.bio && (
          <details className="mt-10 border-y border-line-subtle py-4">
            <summary className="cursor-pointer text-sm font-medium text-ink">About {data.name}</summary>
            <p className="mt-4 max-w-5xl whitespace-pre-line text-sm leading-7 text-ink-secondary">{data.bio}</p>
          </details>
        )}
        <details className="mt-6 border-y border-line-subtle py-4">
          <summary className="cursor-pointer text-sm font-medium text-ink">Reference, crest and external links</summary>
          <div className="mt-4 space-y-5">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="max-w-3xl text-sm text-ink-muted">The crest, biography and club facts are fetched from reference sources when you save the team or ask here.</p>
              <button className="btn-ghost" disabled={syncActive} onClick={enrich}>{syncActive ? 'Football sync active' : data.enrichmentState === 'ready' ? 'Refresh reference' : 'Fetch reference'}</button>
            </div>
            <FootballExternalLinks entityKind="team" entityId={id} links={data.externalLinks} onChanged={() => qc.invalidateQueries({ queryKey: qk.football.all })} />
          </div>
        </details>
      </div>
    </div>
  )
}
