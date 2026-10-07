import { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageStatus from '../components/PageStatus'
import Tabs, { TabPanel } from '../components/Tabs'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { formatFootballScore } from '@shared/football'
import { footballEraName } from '@shared/footballIdentity'
import { footballForm, footballSeasonRecords } from '@shared/footballInsights'
import type { FootballMatchSummary, FootballSeasonFate } from '@shared/types'
import {
  FootballCoverageStrip,
  FootballCompetitionMark,
  FootballFormGuide,
  FootballHero,
  FootballMatchRow,
  FootballPanel,
  FootballPortrait,
  FootballSectionTitle,
  FootballStars,
  FootballTeamMark,
  FootballZoneBadge,
  FootballZoneLegend,
  footballCompetitionStyle
} from '../components/football/FootballCommon'

type SeasonTab = 'table' | 'results'

function matchLine(match: FootballMatchSummary): string {
  return `${match.home.name} ${formatFootballScore(match)} ${match.away.name}`
}

export default function FootballSeasonPage() {
  const id = Number(useParams().id)
  const [tab, setTab] = usePersistedState<SeasonTab | null>('footballSeasonTab', null)
  const { data, isLoading, isError } = useQuery({
    queryKey: qk.football.season(id),
    queryFn: () => api.football.season(id),
    enabled: Number.isInteger(id) && id > 0
  })
  const seasonsQuery = useQuery({
    queryKey: qk.football.seasons(data?.competitionKey ?? null),
    queryFn: () => api.football.seasons(data!.competitionKey),
    enabled: !!data
  })
  const records = useMemo(() => footballSeasonRecords(data?.matches ?? []), [data])
  if (isLoading) return <PageStatus>Opening season chapter...</PageStatus>
  if (isError) return <PageStatus>Could not load this season chapter.</PageStatus>
  if (!data) return <PageStatus>Season not found.</PageStatus>

  const ordered = [...(seasonsQuery.data ?? [])].sort((a, b) => a.key.localeCompare(b.key))
  const index = ordered.findIndex((season) => season.id === data.id)
  const previous = index > 0 ? ordered[index - 1] : null
  const next = index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : null
  const active: SeasonTab = tab ?? (data.standings.length ? 'table' : 'results')
  const eraName = footballEraName(data.competitionKey, data.key, data.competitionName)
  const champion = data.champion
  const watched = data.matches.filter((match) => match.watchedAt)
  const fates = data.standings.map((row) => row.fate).filter((fate): fate is FootballSeasonFate => !!fate)

  return (
    <div style={footballCompetitionStyle(data.competitionKey)}>
      <FootballHero
        tint="linear-gradient(90deg, rgb(var(--football-c) / 0.2), transparent 70%)"
        back={{ to: `/football/competition/${data.competitionKey}`, label: data.competitionName }}
      >
        <div className="mt-3 flex flex-wrap items-center gap-4">
          <Link to={`/football/competition/${data.competitionKey}`} aria-label={data.competitionName}><FootballCompetitionMark competitionKey={data.competitionKey} size="md" /></Link>
          <div className="flex items-center gap-1">
            {previous
              ? <Link to={`/football/season/${previous.id}`} className="btn-ghost px-2" aria-label={`Previous season, ${previous.label}`}>‹</Link>
              : <span className="btn-ghost px-2 opacity-40" aria-hidden="true">‹</span>}
            <h1 className="px-2 text-4xl font-semibold tabular-nums tracking-tight text-ink">
              <span className="sr-only">{eraName} </span>{data.label}
            </h1>
            {next
              ? <Link to={`/football/season/${next.id}`} className="btn-ghost px-2" aria-label={`Next season, ${next.label}`}>›</Link>
              : <span className="btn-ghost px-2 opacity-40" aria-hidden="true">›</span>}
          </div>
          {eraName !== data.competitionName && <span className="text-sm text-ink-secondary">{eraName}</span>}
          {champion ? (
            <Link to={`/football/team/${champion.id}`} className="ml-auto flex items-center gap-3 rounded-lg border border-line-subtle bg-surface-panel/80 px-4 py-2.5 hover:border-line-strong">
              <FootballTeamMark team={champion} size="md" />
              <span>
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-signal-caution">Champion</span>
                <span className="block text-lg font-semibold text-ink">{champion.name}</span>
                {data.runnerUp && <span className="mt-0.5 flex items-center gap-1.5 text-xs text-ink-muted">Runner-up <FootballTeamMark team={data.runnerUp} size="xs" />{data.runnerUp.name}</span>}
              </span>
            </Link>
          ) : (
            <span className="ml-auto text-sm capitalize text-ink-muted">{data.status === 'complete' ? 'Champion not verified' : data.status}</span>
          )}
        </div>
        {data.narrative && <p className="mt-4 max-w-4xl text-sm text-ink-secondary">{data.narrative}</p>}
      </FootballHero>

      <div className="mx-auto grid max-w-[1500px] items-start gap-8 px-6 py-7 xl:grid-cols-[minmax(0,1fr)_360px]">
        <section className="min-w-0">
          <Tabs
            id="football-season"
            label="Season view"
            className="mb-4"
            value={active}
            onChange={setTab}
            tabs={[
              ...(data.standings.length ? [{ key: 'table' as const, label: 'Table' }] : []),
              { key: 'results' as const, label: 'Results', count: data.matches.length }
            ]}
          />
          <TabPanel tabsId="football-season" value={active}>
            {active === 'table' && (
              <>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-line-strong text-left text-[10px] font-semibold uppercase tracking-[0.14em] text-ink-muted">
                        <th className="w-10 py-2 pl-2">#</th><th className="py-2">Club</th>
                        <th className="w-9 text-right">P</th><th className="w-9 text-right">W</th><th className="w-9 text-right">D</th><th className="w-9 text-right">L</th>
                        <th className="w-10 text-right">GF</th><th className="w-10 text-right">GA</th><th className="w-11 text-right">GD</th><th className="w-12 text-right">Pts</th>
                        <th className="hidden w-40 pl-5 lg:table-cell">Last 5</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.standings.map((row) => (
                        <tr key={row.team.id} className={`border-b border-line-subtle hover:bg-surface-raised/40 ${row.fate === 'relegated' && data.standings.find((other) => other.fate === 'relegated') === row ? 'border-t-2 border-t-line-strong' : ''}`}>
                          <td className="py-2 pl-2"><FootballZoneBadge position={row.rankOfficial ? row.rank : row.position} fate={row.fate} champion={champion?.id === row.team.id} /></td>
                          <td className="py-2"><Link to={`/football/team/${row.team.id}`} className="flex items-center gap-2.5 font-medium text-ink hover:text-signal-link"><FootballTeamMark team={row.team} size="xs" /><span className="truncate">{row.team.name}</span></Link></td>
                          <td className="text-right tabular-nums text-ink-muted">{row.played}</td>
                          <td className="text-right tabular-nums text-ink-secondary">{row.won}</td>
                          <td className="text-right tabular-nums text-ink-secondary">{row.drawn}</td>
                          <td className="text-right tabular-nums text-ink-secondary">{row.lost}</td>
                          <td className="text-right tabular-nums text-ink-secondary">{row.goalsFor}</td>
                          <td className="text-right tabular-nums text-ink-secondary">{row.goalsAgainst}</td>
                          <td className={`text-right tabular-nums ${row.goalDifference > 0 ? 'text-signal-affirmative' : row.goalDifference < 0 ? 'text-signal-anomaly' : 'text-ink-muted'}`}>{row.goalDifference > 0 ? '+' : ''}{row.goalDifference}</td>
                          <td className="text-right text-base font-semibold tabular-nums text-ink">{row.points}{row.deduction ? <span className="ml-1 text-[10px] text-signal-anomaly" title={row.note ?? 'Points deducted'}>-{row.deduction}</span> : null}</td>
                          <td className="hidden pl-5 lg:table-cell"><FootballFormGuide results={footballForm(data.matches, row.team.id)} /></td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <FootballZoneLegend fates={fates} seasonKey={data.key} champion={!!champion} />
                  <span className="text-xs text-ink-muted">{data.standings.some((row) => row.rankOfficial) ? 'Official order' : 'Ordered by points, goal difference and goals'}</span>
                </div>
              </>
            )}
            {active === 'results' && (
              <div>
                {data.matches.map((match) => <FootballMatchRow key={match.id} match={match} />)}
                {!data.matches.length && <p className="border-y border-line-subtle py-5 text-sm text-ink-muted">No match results are stored for this edition.</p>}
              </div>
            )}
          </TabPanel>
        </section>

        <aside className="space-y-6">
          <FootballPanel title={data.topScorers.length ? 'Top scorers' : 'Scorers'}>
            {data.topScorers.length ? (
              <ol className="space-y-2.5">
                {data.topScorers.slice(0, 8).map((entry) => (
                  <li key={entry.person.id} className="grid grid-cols-[18px_minmax(0,1fr)_auto] items-center gap-2">
                    <span className="text-xs tabular-nums text-ink-muted">{entry.rank}</span>
                    <span className="min-w-0">
                      <Link to={`/football/person/${entry.person.id}`} className="flex items-center gap-2 text-sm text-ink hover:text-signal-link">
                        <FootballPortrait name={entry.person.name} imagePath={entry.person.imagePath} className="h-7 w-7" />
                        <span className="truncate">{entry.person.name}</span>
                        {entry.team && <FootballTeamMark team={entry.team} size="xs" />}
                      </Link>
                      <span className="mt-1 block h-1 rounded-full bg-signal-live/70" style={{ width: `${(entry.goals / data.topScorers[0].goals) * 100}%` }} aria-hidden="true" />
                    </span>
                    <span className="text-lg font-semibold tabular-nums text-ink">{entry.goals}</span>
                  </li>
                ))}
              </ol>
            ) : <p className="text-sm text-ink-muted">Scorer data not supplied.</p>}
          </FootballPanel>

          {records.matches > 0 && (
            <FootballPanel title="Season records">
              <dl className="divide-y divide-line-subtle text-sm">
                <div className="flex justify-between gap-4 py-2"><dt className="text-ink-muted">Goals</dt><dd className="tabular-nums text-ink">{records.goals.toLocaleString()} / {records.goalsPerMatch?.toFixed(2)} a match</dd></div>
                {records.biggestWins[0] && <div className="flex justify-between gap-4 py-2"><dt className="shrink-0 text-ink-muted">Biggest win</dt><dd className="text-right text-ink"><Link to={`/football/match/${records.biggestWins[0].id}`} className="hover:text-signal-link">{matchLine(records.biggestWins[0])}</Link>{records.biggestWins.length > 1 && <span className="block text-xs text-ink-muted">and {records.biggestWins.length - 1} more</span>}</dd></div>}
                {records.highestScoring[0] && <div className="flex justify-between gap-4 py-2"><dt className="shrink-0 text-ink-muted">Most goals</dt><dd className="text-right text-ink"><Link to={`/football/match/${records.highestScoring[0].id}`} className="hover:text-signal-link">{matchLine(records.highestScoring[0])}</Link>{records.highestScoring.length > 1 && <span className="block text-xs text-ink-muted">and {records.highestScoring.length - 1} more</span>}</dd></div>}
                {records.homeWinShare != null && <div className="flex justify-between gap-4 py-2"><dt className="text-ink-muted">Home wins</dt><dd className="tabular-nums text-ink">{Math.round(records.homeWinShare * 100)}%</dd></div>}
              </dl>
            </FootballPanel>
          )}

          {data.stages.length > 0 && (
            <FootballPanel title="Tournament path">
              <ol className="divide-y divide-line-subtle text-sm">{data.stages.map((stage) => <li key={stage.id} className="flex justify-between gap-4 py-2"><span className="text-ink">{stage.name}</span><span className="text-xs capitalize text-ink-muted">{stage.kind}</span></li>)}</ol>
            </FootballPanel>
          )}

          <FootballPanel title="You watched">
            {watched.length ? (
              <div className="divide-y divide-line-subtle">
                {watched.slice(0, 6).map((match) => (
                  <Link key={match.id} to={`/football/match/${match.id}`} className="flex items-center justify-between gap-3 py-2 text-sm text-ink hover:text-signal-link">
                    <span className="truncate">{matchLine(match)}</span>
                    <FootballStars rating={match.rating} className="text-xs" />
                  </Link>
                ))}
                <p className="pt-2 text-xs text-ink-muted">{watched.length} of {data.matches.length} matches this season</p>
              </div>
            ) : <p className="text-sm text-ink-muted">Nothing logged from this season yet.</p>}
          </FootballPanel>
        </aside>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 pb-8">
        <details className="border-y border-line-subtle py-4">
          <summary className="cursor-pointer text-sm font-medium text-ink">Chapter details and sources</summary>
          <div className="mt-4 space-y-4">
            <FootballSectionTitle title="Coverage" />
            <FootballCoverageStrip coverage={data.coverage} />
            {data.article?.body && <p className="max-w-5xl whitespace-pre-line text-sm leading-7 text-ink-secondary">{data.article.body}</p>}
          </div>
        </details>
      </div>
    </div>
  )
}
