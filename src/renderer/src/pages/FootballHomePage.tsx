import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CoverImage from '../components/CoverImage'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { formatFootballScore } from '@shared/football'
import type { FootballMatchSummary, FootballPersonSummary } from '@shared/types'
import {
  FootballCompetitionMark,
  FootballFlag,
  FootballTeamMark
} from '../components/football/FootballCommon'

function MatchdayCard({ match }: { match: FootballMatchSummary }) {
  const scheduled = match.homeScore == null || match.awayScore == null
  return (
    <Link
      to={`/football/match/${match.id}`}
      className="group grid min-w-0 grid-cols-[minmax(0,1fr)_auto] gap-4 border-b border-line-subtle px-4 py-4 transition-colors hover:bg-surface-raised/40 lg:border-b-0 lg:border-r last:lg:border-r-0"
    >
      <span className="min-w-0">
        <span className="flex min-w-0 items-center gap-2 text-[10px] uppercase tracking-[0.14em] text-ink-muted">
          <FootballFlag competitionKey={match.competitionKey} />
          <span className="truncate">{match.competitionName} / {scheduled ? match.kickoffAt?.slice(11, 16) ?? 'Scheduled' : 'Final'}</span>
        </span>
        <span className="mt-2 flex items-center gap-2 text-sm font-medium text-ink group-hover:text-signal-link"><FootballTeamMark team={match.home} size="sm" /><span className="truncate">{match.home.name}</span></span>
        <span className="mt-1 flex items-center gap-2 text-sm font-medium text-ink group-hover:text-signal-link"><FootballTeamMark team={match.away} size="sm" /><span className="truncate">{match.away.name}</span></span>
      </span>
      <span className="flex items-end text-right font-semibold tabular-nums text-ink">
        {scheduled ? <span className="text-[10px] uppercase tracking-[0.14em] text-signal-link">Preview</span> : <span className="text-xl">{formatFootballScore(match)}</span>}
      </span>
    </Link>
  )
}

function PersonTile({ person }: { person: FootballPersonSummary }) {
  return (
    <Link to={`/football/person/${person.id}`} className="group min-w-0">
      <CoverImage
        path={person.imagePath}
        alt={person.name}
        className="aspect-[3/4] h-auto w-full grayscale-[18%] transition group-hover:grayscale-0"
        rounded="rounded-none"
        thumbWidth={240}
      />
      <p className="mt-2 truncate text-xs font-medium text-ink group-hover:text-signal-link">{person.name}</p>
      <p className="truncate text-[10px] capitalize text-ink-muted">{person.nationality ?? person.role}</p>
    </Link>
  )
}

export default function FootballHomePage() {
  const { data, isLoading } = useQuery({
    queryKey: qk.football.overview,
    queryFn: () => api.football.overview()
  })
  const { data: favorites = [] } = useQuery({
    queryKey: qk.football.people({ favoriteOnly: true, limit: 6 }),
    queryFn: () => api.football.people({ favoriteOnly: true, limit: 6 })
  })
  const { data: people = [] } = useQuery({
    queryKey: qk.football.people({ limit: 12 }),
    queryFn: () => api.football.people({ limit: 12 })
  })

  if (isLoading) return <PageStatus>Opening the Football archive...</PageStatus>
  if (!data) return <PageStatus>The Football archive could not be opened.</PageStatus>

  const seenPeople = new Set<number>()
  const portraitPeople = [...favorites, ...people]
    .filter((person) => {
      if (!person.imagePath || seenPeople.has(person.id)) return false
      seenPeople.add(person.id)
      return true
    })
    .slice(0, 3)
  const journal = data.recentJournal[0]

  return (
    <div className="mx-auto max-w-[1600px] p-6">
      <PageHeader
        title="Football Almanac"
        subtitle="Nine competitions, their recognized lineages, and every verified match your local archive can hold."
        actions={<Link to="/football/competitions" className="btn-primary">Browse history</Link>}
      />

      {!data.installed && (
        <section className="mb-8 border-y border-line-subtle py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-ink">Install the historical record</h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-muted">One manual installation creates the offline competition, season, team and match archive.</p>
            </div>
            <Link to="/football/sync" className="btn-primary">Install archive</Link>
          </div>
        </section>
      )}

      <section className="mb-9">
        <div className="mb-3 flex items-end justify-between gap-4">
          <h2 className="text-xl font-semibold text-ink">Matchday</h2>
          <Link to="/football/current" className="text-xs text-signal-link hover:underline">Open matchday</Link>
        </div>
        {data.currentMatches.length ? (
          <div className="grid overflow-hidden border-y border-line-subtle lg:grid-cols-3">
            {data.currentMatches.slice(0, 3).map((match) => <MatchdayCard key={match.id} match={match} />)}
          </div>
        ) : (
          <div className="flex items-center justify-between gap-4 border-y border-line-subtle py-5">
            <p className="text-sm text-ink-muted">No fixtures are stored for today.</p>
            <Link to="/football/current" className="text-sm text-signal-link hover:underline">Browse stored results</Link>
          </div>
        )}
      </section>

      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_340px]">
        <section>
          <div className="mb-4 flex items-end justify-between gap-4 border-b border-line-subtle pb-3">
            <h2 className="text-2xl font-semibold tracking-tight text-ink">Competition histories</h2>
            <p className="text-xs text-ink-muted">{data.totals.seasons.toLocaleString()} seasons / {data.totals.matches.toLocaleString()} matches</p>
          </div>
          <div className="grid gap-px overflow-hidden border border-line-subtle bg-line-subtle md:grid-cols-2 2xl:grid-cols-3">
            {data.competitions.map((competition) => (
              <Link
                key={competition.key}
                to={`/football/competition/${competition.key}`}
                className="group min-h-44 bg-surface-canvas px-5 py-5 transition-colors hover:bg-surface-raised"
              >
                <span className="flex items-start justify-between gap-4">
                  <span className="flex items-center gap-2"><FootballFlag competitionKey={competition.key} /><FootballCompetitionMark competitionKey={competition.key} size="sm" /></span>
                  <span className="text-xs tabular-nums text-ink-muted">{competition.seasonCount} {competition.format === 'league' ? 'seasons' : 'editions'}</span>
                </span>
                <span className="mt-7 block text-lg font-semibold text-ink group-hover:text-signal-link">{competition.shortName ?? competition.name}</span>
                <span className="mt-2 block text-xs leading-relaxed text-ink-muted">{competition.lineageNote ?? `${competition.country ?? competition.scope} / ${competition.startYear ?? 'first sourced edition'} onward`}</span>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-8">
          <section className="border-t border-signal-live pt-4">
            <div className="flex items-end justify-between gap-4"><h2 className="text-xl font-semibold text-ink">Faces of the archive</h2><Link to="/football/people" className="text-xs text-signal-link">Browse</Link></div>
            {portraitPeople.length ? (
              <div className="mt-4 grid grid-cols-3 gap-2">{portraitPeople.map((person) => <PersonTile key={person.id} person={person} />)}</div>
            ) : (
              <div className="mt-4 border-y border-line-subtle py-4"><p className="text-sm text-ink-muted">Licensed player portraits appear here after reference enrichment.</p><Link to="/football/people" className="mt-2 inline-block text-xs text-signal-link">Browse players</Link></div>
            )}
          </section>

          <section className="border-t border-line-subtle pt-4">
            <h2 className="text-lg font-semibold text-ink">My archive</h2>
            {journal ? (
              <Link to={`/football/match/${journal.id}`} className="mt-4 block border-y border-line-subtle py-4">
                <p className="text-xs text-ink-muted">Last watched / {journal.watchedAt?.slice(0, 10) ?? journal.matchDate}</p>
                <p className="mt-2 font-semibold text-ink">{journal.home.name} {formatFootballScore(journal)} {journal.away.name}</p>
                <p className="mt-1 text-xs text-ink-muted">{journal.rating != null ? `Rated ${journal.rating.toFixed(1)}` : 'Private journal entry'}{data.recentMedia.length ? ` / ${data.recentMedia.length} recent attachments` : ''}</p>
              </Link>
            ) : <p className="mt-3 text-sm text-ink-muted">Watched matches, ratings and notes will collect here.</p>}
            <Link to="/football/media" className="btn-ghost mt-4 w-full">Open my archive</Link>
          </section>

          <section className="border-t border-line-subtle pt-4">
            <div className="flex items-center justify-between gap-4"><div><h2 className="text-sm font-medium text-ink">Quiz room</h2><p className="mt-1 text-xs text-ink-muted">Five games from verified history</p></div><Link to="/football/quiz" className="text-xs text-signal-link">Play</Link></div>
          </section>

          <section className="border-t border-line-subtle pt-4">
            <div className="flex items-center justify-between gap-4 text-xs"><span className="text-ink-muted">{data.installed ? `Archive ready${data.lastSyncAt ? ` / updated ${data.lastSyncAt.slice(0, 10)}` : ''}` : 'Archive setup required'}</span><Link to="/football/sync" className="text-ink-secondary hover:text-signal-link">Sources</Link></div>
          </section>
        </aside>
      </div>
    </div>
  )
}
