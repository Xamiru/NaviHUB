import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { formatFootballScore } from '@shared/football'
import type {
  FootballCompetition,
  FootballMatchEvent,
  FootballMatchSummary,
  FootballSetupState,
  FootballSetupStep,
  FootballSyncStatus
} from '@shared/types'
import {
  FootballCompetitionMark,
  FootballFlag,
  FootballPanel,
  FootballPortrait,
  FootballSectionTitle,
  FootballStars,
  FootballTeamMark,
  footballCompetitionStyle
} from '../components/football/FootballCommon'

const DAY_FORMAT = new Intl.DateTimeFormat('en-GB', { day: 'numeric', month: 'long' })

function scorerLine(events: FootballMatchEvent[]): string {
  return events
    .filter((event) => event.type === 'goal')
    .map((event) => `${event.person?.name ?? 'Unknown'} ${event.minute ?? '?'}${event.extraMinute ? `+${event.extraMinute}` : ''}'${event.ownGoal ? ' (og)' : event.penalty ? ' (pen)' : ''}`)
    .join(' / ')
}

function CompetitionCard({ competition }: { competition: FootballCompetition }) {
  const leaders = competition.titleLeaders
  return (
    <Link
      to={`/football/competition/${competition.key}`}
      className="group relative block overflow-hidden rounded-lg border border-line-subtle bg-surface-panel/70 transition-colors hover:border-line-strong"
      style={footballCompetitionStyle(competition.key)}
    >
      <span className="absolute inset-x-0 top-0 h-1 bg-[rgb(var(--football-c))]" aria-hidden="true" />
      <span className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-[rgb(var(--football-c)/0.10)]" aria-hidden="true" />
      <span className="relative flex items-start gap-4 p-4 pt-5">
        {competition.imagePath ? <FootballCompetitionMark competitionKey={competition.key} imagePath={competition.imagePath} size="md" /> : <FootballFlag competitionKey={competition.key} />}
        <span className="min-w-0 flex-1">
          <span className="block text-lg font-semibold text-ink group-hover:text-signal-link">{competition.shortName ?? competition.name}</span>
          <span className="block text-xs text-ink-muted">
            {[competition.country ?? (competition.scope === 'international' ? 'International' : 'Europe'), competition.startYear ? `since ${competition.startYear}` : null].filter(Boolean).join(' / ')}
            {competition.seasonCount ? ` / ${competition.seasonCount} ${competition.format === 'league' ? 'seasons' : 'editions'}` : ''}
          </span>
          {competition.holder ? (
            <span className="mt-4 flex items-center gap-2 text-sm text-ink">
              <FootballTeamMark team={competition.holder} size="xs" />
              <span className="truncate">{competition.holder.name}</span>
              <span className="text-xs text-ink-muted">holder</span>
            </span>
          ) : (
            <span className="mt-4 block text-sm text-ink-muted">No verified champion yet</span>
          )}
          {leaders && (
            <span className="mt-1 block truncate text-xs text-ink-muted">
              Most titles: {leaders.teams.map((team) => team.name).join(', ')} {leaders.titles}
            </span>
          )}
        </span>
      </span>
    </Link>
  )
}

function LoggedCard({ match }: { match: FootballMatchSummary }) {
  return (
    <Link to={`/football/match/${match.id}`} className="card block overflow-hidden hover:border-line-strong" style={footballCompetitionStyle(match.competitionKey)}>
      <span className="block h-1 bg-[rgb(var(--football-c))]" aria-hidden="true" />
      <span className="block p-4">
        <span className="flex items-center justify-between text-xs text-ink-muted"><FootballFlag competitionKey={match.competitionKey} /><span>{match.matchDate.slice(0, 4)}</span></span>
        {([['home', match.homeScore], ['away', match.awayScore]] as const).map(([side, goals]) => (
          <span key={side} className="mt-2 flex items-center gap-2 text-sm font-medium text-ink">
            <FootballTeamMark team={match[side]} size="xs" />
            <span className="truncate">{match[side].name}</span>
            <span className="ml-auto font-semibold tabular-nums">{goals ?? '-'}</span>
          </span>
        ))}
        <span className="mt-3 flex items-center justify-between text-xs">
          <FootballStars rating={match.rating} className="text-xs" />
          <span className="text-ink-muted">Watched {match.watchedAt?.slice(0, 10)}</span>
        </span>
      </span>
    </Link>
  )
}

export default function FootballHomePage() {
  const overviewQuery = useQuery({ queryKey: qk.football.overview, queryFn: () => api.football.overview() })
  const peopleQuery = useQuery({
    queryKey: qk.football.people({ favoriteOnly: true, limit: 8 }),
    queryFn: () => api.football.people({ favoriteOnly: true, limit: 8 })
  })
  const statusQuery = useQuery({
    queryKey: qk.football.syncStatus,
    queryFn: () => api.football.syncStatus(),
    refetchInterval: (query) => ['running', 'pausing', 'paused'].includes(query.state.data?.state ?? '') ? 2000 : false
  })
  const teamsQuery = useQuery({
    queryKey: qk.football.teams({ favoriteOnly: true, limit: 8 }),
    queryFn: () => api.football.teams({ favoriteOnly: true, limit: 8 })
  })

  if (overviewQuery.isLoading) return <PageStatus>Opening the Football archive...</PageStatus>
  if (overviewQuery.isError || !overviewQuery.data) return <PageStatus>The Football archive could not be opened.</PageStatus>
  const data = overviewQuery.data
  const followedTeams = teamsQuery.data ?? []
  const followedPeople = peopleQuery.data ?? []
  const today = data.onThisDay

  return (
    <div>
      <div className="relative overflow-hidden border-b border-line-subtle">
        <div className="football-grid-lines absolute inset-0 opacity-[0.06]" aria-hidden="true" />
        <div className="relative mx-auto grid max-w-[1500px] gap-8 px-6 pb-8 pt-9 lg:grid-cols-[minmax(0,1fr)_420px]">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-signal-live">Football almanac</p>
            <h1 className="mt-2 text-4xl font-semibold tracking-tight text-ink">
              {data.installed ? `${new Date().getFullYear() - 1888} years of the game, offline.` : 'Install the historical record.'}
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-ink-secondary">
              {data.installed
                ? `Nine competitions, ${data.totals.seasons.toLocaleString()} seasons and ${data.totals.matches.toLocaleString()} matches in your archive.`
                : 'One manual installation creates the offline competition, season, team and match archive.'}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-2">
              {data.installed
                ? <Link to="/football/competitions" className="btn-primary">Browse history</Link>
                : <Link to="/football/sync" className="btn-primary">Set up the archive</Link>}
              <Link to="/football/media" className="btn-ghost">My archive</Link>
              {data.lastSyncAt && <span className="ml-2 text-xs text-ink-muted">Updated {data.lastSyncAt.slice(0, 10)}</span>}
            </div>
          </div>
          {today ? (
            <Link to={`/football/match/${today.match.id}`} className="card block overflow-hidden hover:border-line-strong">
              <span className="flex items-center justify-between border-b border-line-subtle px-4 py-2.5">
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-signal-link">On this day / {DAY_FORMAT.format(new Date())}</span>
                <FootballFlag competitionKey={today.match.competitionKey} />
              </span>
              <span className="block px-4 py-4">
                <span className="block text-xs text-ink-muted">{today.match.matchDate.slice(0, 4)} / {today.match.competitionName}{today.match.stageName ? ` / ${today.match.stageName}` : ''}</span>
                <span className="mt-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3">
                  <span className="flex min-w-0 items-center justify-end gap-2 text-right"><span className="truncate text-sm font-semibold text-ink">{today.match.home.name}</span><FootballTeamMark team={today.match.home} size="sm" /></span>
                  <span className="rounded bg-surface-raised px-3 py-1.5 text-2xl font-semibold tabular-nums text-ink">{formatFootballScore(today.match)}</span>
                  <span className="flex min-w-0 items-center gap-2"><FootballTeamMark team={today.match.away} size="sm" /><span className="truncate text-sm font-semibold text-ink">{today.match.away.name}</span></span>
                </span>
                {today.events.length > 0 && <span className="mt-3 block text-xs leading-relaxed text-ink-muted">{scorerLine(today.events)}</span>}
              </span>
            </Link>
          ) : (
            <FootballPanel title="On this day">
              <p className="text-sm text-ink-muted">No stored match was played on {DAY_FORMAT.format(new Date())}.</p>
            </FootballPanel>
          )}
        </div>
      </div>

      <div className="mx-auto max-w-[1500px] px-6 py-8">
        <SetupStrip setup={data.setup} status={statusQuery.data} installed={data.installed} />
        {data.currentMatches.length > 0 && (
          <section className="mb-9">
            <FootballSectionTitle title="Matchday" detail={<Link to="/football/current" className="text-signal-link hover:underline">Open matchday</Link>} />
            <div className="grid gap-3 md:grid-cols-3">
              {data.currentMatches.slice(0, 3).map((match) => <MatchdayCard key={match.id} match={match} />)}
            </div>
          </section>
        )}

        <section>
          <FootballSectionTitle title="Competitions" detail="Holder and title leader" />
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {data.competitions.map((competition) => <CompetitionCard key={competition.key} competition={competition} />)}
          </div>
        </section>

        <div className="mt-10 grid items-start gap-8 xl:grid-cols-[minmax(0,1fr)_380px]">
          <section>
            <FootballSectionTitle title="Recently logged" detail={<Link to="/football/media" className="text-signal-link hover:underline">Open my archive</Link>} />
            {data.recentJournal.length ? (
              <div className="grid gap-3 md:grid-cols-3">{data.recentJournal.slice(0, 3).map((match) => <LoggedCard key={match.id} match={match} />)}</div>
            ) : (
              <p className="border-y border-line-subtle py-5 text-sm text-ink-muted">Open any match and log it as watched to start your diary.</p>
            )}
          </section>
          <aside className="space-y-6">
            <FootballPanel title="Followed">
              {followedTeams.length || followedPeople.length ? (
                <div className="flex flex-wrap gap-2">
                  {followedTeams.map((team) => (
                    <Link key={`t${team.id}`} to={`/football/team/${team.id}`} className="flex items-center gap-2 rounded-md border border-line-subtle bg-surface-raised/60 py-1 pl-1 pr-3 text-sm text-ink hover:border-line-strong"><FootballTeamMark team={team} size="xs" />{team.name}</Link>
                  ))}
                  {followedPeople.map((person) => (
                    <Link key={`p${person.id}`} to={`/football/person/${person.id}`} className="flex items-center gap-2 rounded-md border border-line-subtle bg-surface-raised/60 py-1 pl-1 pr-3 text-sm text-ink hover:border-line-strong"><FootballPortrait name={person.name} imagePath={person.imagePath} className="h-6 w-6" />{person.name}</Link>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-ink-muted">Save a club or player to keep them here.</p>
              )}
            </FootballPanel>
            <Link to="/football/quiz" className="card block p-4 hover:border-line-strong">
              <span className="flex items-center justify-between"><span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Quiz room</span><span className="text-xs text-signal-link">Play ›</span></span>
              <span className="mt-2 block text-lg font-semibold text-ink">Five games from verified history</span>
              <span className="mt-1 block text-xs text-ink-muted">Champions, scorelines, careers and grids</span>
            </Link>
            <div className="flex items-center justify-between gap-4 border-t border-line-subtle pt-3 text-xs">
              <span className="text-ink-muted">{data.totals.teams.toLocaleString()} clubs / {data.totals.people.toLocaleString()} people</span>
              <Link to="/football/sync" className="text-ink-secondary hover:text-signal-link">Sources</Link>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}

const SETUP_LABELS: Record<FootballSetupStep, string> = {
  history: 'Match history',
  detail: 'Match detail',
  pictures: 'Pictures and facts'
}

/** Setup progress until all three steps have finished once. */
function SetupStrip({ setup, status, installed }: { setup: FootballSetupState; status: FootballSyncStatus | undefined; installed: boolean }) {
  const steps = Object.keys(SETUP_LABELS) as FootballSetupStep[]
  const done = steps.filter((step) => setup[step]).length
  const running = status && ['running', 'pausing', 'paused'].includes(status.state)
  if (done === steps.length && !running) return null
  return (
    <Link to="/football/sync" className="card mb-9 flex flex-wrap items-center gap-5 p-4 hover:border-line-strong">
      <span className="flex gap-1.5" aria-hidden="true">
        {steps.map((step) => <span key={step} className={`h-2 w-10 rounded-full ${setup[step] ? 'bg-signal-affirmative' : status?.setupStep?.step === step ? 'bg-signal-live' : 'bg-surface-active'}`} />)}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-ink">Football setup: {done} of {steps.length} steps done</span>
        <span className="block truncate text-xs text-ink-muted">
          {running
            ? `${status.setupStep ? `${SETUP_LABELS[status.setupStep.step]}: ` : ''}${status.message ?? 'working'}`
            : installed && !setup.history
              ? 'Next: run match history again to fill in missing champions'
              : `Next: ${SETUP_LABELS[steps.find((step) => !setup[step])!]}`}
        </span>
      </span>
      <span className="text-sm text-signal-link">{running ? 'View progress ›' : 'Continue setup ›'}</span>
    </Link>
  )
}

function MatchdayCard({ match }: { match: FootballMatchSummary }) {
  const scheduled = match.homeScore == null || match.awayScore == null
  return (
    <Link to={`/football/match/${match.id}`} className="card block p-4 hover:border-line-strong">
      <span className="flex items-center justify-between text-xs text-ink-muted"><FootballFlag competitionKey={match.competitionKey} /><span>{scheduled ? match.kickoffAt?.slice(11, 16) ?? 'Scheduled' : 'Final'}</span></span>
      {([['home', match.homeScore], ['away', match.awayScore]] as const).map(([side, goals]) => (
        <span key={side} className="mt-2 flex items-center gap-2 text-sm font-medium text-ink">
          <FootballTeamMark team={match[side]} size="xs" />
          <span className="truncate">{match[side].name}</span>
          <span className="ml-auto font-semibold tabular-nums">{scheduled ? '' : goals}</span>
        </span>
      ))}
    </Link>
  )
}
