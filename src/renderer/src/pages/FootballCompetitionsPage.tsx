import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import type { FootballCompetition } from '@shared/types'
import { FootballCompetitionMark, FootballFlag } from '../components/football/FootballCommon'

const GROUPS: Array<{ scope: FootballCompetition['scope']; title: string; description: string }> = [
  { scope: 'domestic', title: 'Domestic leagues', description: 'Four continuous top-flight histories' },
  { scope: 'continental', title: 'European competitions', description: 'European Cup, UEFA Cup and Conference League lineages' },
  { scope: 'international', title: 'International finals', description: 'World Cup and European Championship finals tournaments' }
]

export default function FootballCompetitionsPage() {
  const { data = [], isLoading } = useQuery({ queryKey: qk.football.competitions, queryFn: () => api.football.competitions() })
  if (isLoading) return <PageStatus>Reading competition histories...</PageStatus>
  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <PageHeader
        title="History"
        subtitle="Open a competition, follow its eras, then choose a season chapter. Recognized predecessor competitions remain part of the same volume."
        back={{ to: '/football', label: 'Football Almanac' }}
        actions={<Link to="/football/search" className="btn-ghost">Find a team or player</Link>}
      />

      {GROUPS.map((group) => {
        const competitions = data.filter((competition) => competition.scope === group.scope)
        return (
          <section key={group.scope} className="mb-11">
            <div className="mb-4 flex items-end justify-between gap-4 border-b border-line-subtle pb-3"><h2 className="text-2xl font-semibold tracking-tight text-ink">{group.title}</h2><p className="text-xs text-ink-muted">{group.description}</p></div>
            <div className="grid gap-px overflow-hidden border border-line-subtle bg-line-subtle md:grid-cols-2 xl:grid-cols-3">
              {competitions.map((competition) => (
                <Link key={competition.key} to={`/football/competition/${competition.key}`} className="group min-h-52 bg-surface-canvas p-5 transition-colors hover:bg-surface-raised">
                  <span className="flex items-start justify-between gap-4"><span className="flex items-center gap-3"><FootballFlag competitionKey={competition.key} /><FootballCompetitionMark competitionKey={competition.key} /></span><span className="text-right text-xs tabular-nums text-ink-muted">{competition.seasonCount} editions<br />{competition.matchCount.toLocaleString()} matches</span></span>
                  <span className="mt-8 block text-xl font-semibold text-ink group-hover:text-signal-link">{competition.name}</span>
                  <span className="mt-2 block text-sm leading-relaxed text-ink-muted">{competition.lineageNote ?? `${competition.country ?? 'International'} history from ${competition.startYear ?? 'the first sourced edition'}.`}</span>
                  {competition.latestSeason && <span className="mt-4 block text-xs text-ink-secondary">Latest chapter / {competition.latestSeason}</span>}
                </Link>
              ))}
            </div>
          </section>
        )
      })}

      <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line-subtle pt-5 text-sm">
        <p className="text-ink-muted">Teams and players are discovered through competitions, matches, and archive search.</p>
        <div className="flex gap-4"><Link to="/football/teams" className="text-signal-link">Teams</Link><Link to="/football/people" className="text-signal-link">Players and managers</Link><Link to="/football/sync" className="text-ink-secondary hover:text-signal-link">Sources</Link></div>
      </div>
    </div>
  )
}
