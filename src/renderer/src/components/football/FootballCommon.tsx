import { Link } from 'react-router-dom'
import { api } from '../../lib/api'
import { formatFootballScore } from '@shared/football'
import type {
  FootballCoverage,
  FootballMatchSummary,
  FootballMedia,
  FootballTeamSummary
} from '@shared/types'

export function FootballTeamMark({ team }: { team: FootballTeamSummary }) {
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-line-subtle bg-surface-raised text-xs font-semibold text-ink-secondary">
      {(team.shortName ?? team.name)
        .split(/\s+/)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase()}
    </span>
  )
}

export function FootballMatchRow({ match }: { match: FootballMatchSummary }) {
  const score = formatFootballScore(match)
  return (
    <Link
      to={`/football/match/${match.id}`}
      className="grid grid-cols-[92px_minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 border-b border-line-subtle px-1 py-3 text-sm transition-colors last:border-0 hover:bg-surface-raised/45"
    >
      <span className="text-xs tabular-nums text-ink-muted">{match.matchDate}</span>
      <span className="flex min-w-0 items-center justify-end gap-2 text-right font-medium text-ink">
        <span className="truncate">{match.home.name}</span>
        <FootballTeamMark team={match.home} />
      </span>
      <span className="min-w-16 rounded border border-line-subtle bg-surface-raised px-2 py-1 text-center font-semibold tabular-nums text-ink">
        {score}
      </span>
      <span className="flex min-w-0 items-center gap-2 font-medium text-ink">
        <FootballTeamMark team={match.away} />
        <span className="truncate">{match.away.name}</span>
      </span>
    </Link>
  )
}

export function FootballCoverageStrip({ coverage }: { coverage: FootballCoverage[] }) {
  if (!coverage.length) {
    return <p className="text-sm text-ink-muted">No source coverage has been recorded yet.</p>
  }
  const latest = new Map<string, FootballCoverage>()
  for (const item of coverage) if (!latest.has(item.facet)) latest.set(item.facet, item)
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-2 text-xs">
      {[...latest.values()].map((item) => (
        <span key={`${item.facet}-${item.source}`} className="inline-flex items-center gap-2">
          <span
            className={`h-1.5 w-1.5 rounded-full ${
              item.state === 'complete'
                ? 'bg-signal-live'
                : item.state === 'conflicted'
                  ? 'bg-signal-anomaly'
                  : 'bg-ink-muted'
            }`}
          />
          <span className="text-ink-secondary">{item.facet}</span>
          <span className="text-ink-muted">{item.state.replace('_', ' ')}</span>
        </span>
      ))}
    </div>
  )
}

export function FootballMediaShelf({ media }: { media: FootballMedia[] }) {
  if (!media.length) return <p className="text-sm text-ink-muted">No media attached.</p>
  return (
    <div className="divide-y divide-line-subtle">
      {media.map((item) => (
        <div key={item.id} className="flex items-center justify-between gap-4 py-3">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium text-ink">{item.title}</p>
            <p className="mt-0.5 text-xs text-ink-muted">
              {item.kind === 'fullMatch' ? 'Full match' : item.kind}
              {item.links.length ? ` / ${item.links.map((link) => link.label).filter(Boolean).join(', ')}` : ''}
            </p>
          </div>
          <button
            className="btn-ghost shrink-0"
            onClick={() =>
              item.localPath
                ? api.football.openMedia(item.localPath)
                : item.url
                  ? api.football.openExternalLink('website', item.url)
                  : undefined
            }
          >
            Open
          </button>
        </div>
      ))}
    </div>
  )
}

export function FootballSectionTitle({
  title,
  detail
}: {
  title: string
  detail?: string
}) {
  return (
    <div className="mb-3 flex items-end justify-between gap-4 border-b border-line-subtle pb-2">
      <h2 className="text-lg font-semibold text-ink">{title}</h2>
      {detail && <p className="text-xs text-ink-muted">{detail}</p>}
    </div>
  )
}
