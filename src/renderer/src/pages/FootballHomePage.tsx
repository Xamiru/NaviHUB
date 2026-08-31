import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import {
  FootballCoverageStrip,
  FootballMatchRow,
  FootballMediaShelf,
  FootballSectionTitle
} from '../components/football/FootballCommon'

// Archive Desk direction: a scored current rail opens into competition volumes,
// then historical/reference shelves. Seed: 6f8dcad5.
export default function FootballHomePage() {
  const { data, isLoading } = useQuery({
    queryKey: qk.football.overview,
    queryFn: () => api.football.overview()
  })
  if (isLoading) return <PageStatus>Opening the Football archive...</PageStatus>
  if (!data) return <PageStatus>The Football archive could not be opened.</PageStatus>

  return (
    <div className="mx-auto max-w-[1600px] p-6">
      <PageHeader
        title="Football Archive"
        subtitle="A local history almanac, current-season score desk, match journal and offline quiz source."
        actions={
          <>
            <Link to="/football/current" className="btn-primary">Current desk</Link>
            <Link to="/football/search" className="btn-ghost">Search archive</Link>
            <Link to="/football/sync" className="btn-ghost">Sync sources</Link>
          </>
        }
      />

      {!data.installed && (
        <section className="mb-8 border-y border-line-subtle bg-surface-raised/45 px-5 py-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-ink">The desk is ready for its first volume</h2>
              <p className="mt-1 max-w-3xl text-sm leading-relaxed text-ink-muted">
                Install the historical datasets once. The archive remains available offline and only
                changes when you start a refresh.
              </p>
            </div>
            <Link to="/football/sync" className="btn-primary">Open installation</Link>
          </div>
        </section>
      )}

      <section className="mb-9">
        <FootballSectionTitle
          title="Current matchday"
          detail={data.lastSyncAt ? `Last source update ${data.lastSyncAt.slice(0, 10)}` : 'Manual refresh only'}
        />
        {data.currentMatches.length ? (
          <div>{data.currentMatches.slice(0, 12).map((match) => <FootballMatchRow key={match.id} match={match} />)}</div>
        ) : (
          <div className="flex items-center justify-between gap-4 py-6">
            <p className="text-sm text-ink-muted">No fixtures are stored for today.</p>
            <Link to="/football/current" className="text-sm text-signal-link hover:underline">Browse the current season</Link>
          </div>
        )}
      </section>

      <section className="mb-10">
        <FootballSectionTitle title="Competition volumes" detail="Nine recognized lineages" />
        <div className="grid gap-x-8 lg:grid-cols-3">
          {data.competitions.map((competition, index) => (
            <Link
              key={competition.key}
              to={`/football/competition/${competition.key}`}
              className="group grid grid-cols-[38px_minmax(0,1fr)_auto] items-center gap-3 border-b border-line-subtle py-4"
            >
              <span className="font-mono text-xs text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
              <span className="min-w-0">
                <span className="block truncate font-semibold text-ink group-hover:text-signal-link">
                  {competition.shortName ?? competition.name}
                </span>
                <span className="mt-0.5 block truncate text-xs text-ink-muted">
                  {competition.lineageNote ?? `${competition.startYear ?? 'Archive'} onward`}
                </span>
              </span>
              <span className="text-right text-xs tabular-nums text-ink-muted">
                {competition.seasonCount} seasons<br />{competition.matchCount} matches
              </span>
            </Link>
          ))}
        </div>
      </section>

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.5fr)_minmax(320px,0.8fr)]">
        <div className="space-y-10">
          <section>
            <FootballSectionTitle title="Source freshness" detail={`${data.totals.matches} archived matches`} />
            <FootballCoverageStrip coverage={data.coverage} />
            <dl className="mt-5 grid grid-cols-2 gap-x-8 gap-y-3 border-t border-line-subtle pt-4 sm:grid-cols-4">
              {Object.entries(data.totals).map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs capitalize text-ink-muted">{label}</dt>
                  <dd className="mt-1 text-2xl font-semibold tabular-nums text-ink">{value}</dd>
                </div>
              ))}
            </dl>
          </section>
          <section>
            <FootballSectionTitle title="Saved media" detail="Manual attachments only" />
            <FootballMediaShelf media={data.recentMedia} />
            <Link to="/football/media" className="mt-3 inline-block text-sm text-signal-link hover:underline">Open the media shelves</Link>
          </section>
        </div>

        <aside>
          <FootballSectionTitle title="Recent journal" />
          {data.recentJournal.length ? (
            <div className="space-y-1">
              {data.recentJournal.map((match) => (
                <Link key={match.id} to={`/football/match/${match.id}`} className="block border-b border-line-subtle py-3 last:border-0">
                  <p className="text-sm font-medium text-ink">{match.home.name} vs {match.away.name}</p>
                  <p className="mt-1 text-xs text-ink-muted">
                    {match.watchedAt?.slice(0, 10) ?? match.matchDate}
                    {match.rating != null ? ` / ${match.rating.toFixed(1)} stars` : ''}
                  </p>
                </Link>
              ))}
            </div>
          ) : (
            <p className="py-4 text-sm text-ink-muted">Watched matches and private ratings will collect here.</p>
          )}
          <div className="mt-7 border-t border-line-subtle pt-5">
            <p className="text-sm font-medium text-ink">Quiz room</p>
            <p className="mt-1 text-sm leading-relaxed text-ink-muted">
              Five solo formats deal only from complete, verified facts in the installed archive.
            </p>
            <Link to="/football/quiz" className="mt-3 inline-block text-sm text-signal-link hover:underline">Open Football quizzes</Link>
          </div>
        </aside>
      </div>
    </div>
  )
}
