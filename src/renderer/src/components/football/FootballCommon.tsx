import { Link } from 'react-router-dom'
import CoverImage from '../CoverImage'
import { api } from '../../lib/api'
import { formatFootballScore } from '@shared/football'
import type {
  FootballCompetitionKey,
  FootballCoverage,
  FootballMatchSummary,
  FootballMedia,
  FootballTeamSummary
} from '@shared/types'

const COMPETITION_CODES: Record<FootballCompetitionKey, string> = {
  'premier-league': 'PL',
  'la-liga': 'LL',
  'serie-a': 'SA',
  bundesliga: 'BL',
  'champions-league': 'UCL',
  'europa-league': 'UEL',
  'conference-league': 'UECL',
  'world-cup': 'WC',
  euros: 'EURO'
}

export function FootballFlag({ competitionKey }: { competitionKey: FootballCompetitionKey }) {
  if (competitionKey === 'premier-league') {
    return (
      <span className="relative inline-block h-4 w-6 shrink-0 overflow-hidden rounded-sm border border-black/10 bg-white" aria-label="England">
        <span className="absolute inset-y-0 left-1/2 w-1 -translate-x-1/2 bg-red-600" />
        <span className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 bg-red-600" />
      </span>
    )
  }
  if (competitionKey === 'la-liga') {
    return <span className="inline-grid h-4 w-6 shrink-0 grid-rows-3 overflow-hidden rounded-sm border border-black/10" aria-label="Spain"><span className="bg-red-600" /><span className="bg-yellow-400" /><span className="bg-red-600" /></span>
  }
  if (competitionKey === 'serie-a') {
    return <span className="inline-grid h-4 w-6 shrink-0 grid-cols-3 overflow-hidden rounded-sm border border-black/10" aria-label="Italy"><span className="bg-green-600" /><span className="bg-white" /><span className="bg-red-600" /></span>
  }
  if (competitionKey === 'bundesliga') {
    return <span className="inline-grid h-4 w-6 shrink-0 grid-rows-3 overflow-hidden rounded-sm border border-white/10" aria-label="Germany"><span className="bg-black" /><span className="bg-red-600" /><span className="bg-yellow-400" /></span>
  }
  return (
    <span
      className="inline-flex h-5 min-w-8 shrink-0 items-center justify-center rounded-full border border-signal-link/35 bg-signal-link/10 px-1.5 text-[8px] font-bold tracking-wide text-signal-link"
      aria-label={competitionKey === 'world-cup' ? 'International' : 'UEFA'}
    >
      {competitionKey === 'world-cup' ? 'FIFA' : 'UEFA'}
    </span>
  )
}

export function FootballCompetitionMark({
  competitionKey,
  size = 'md'
}: {
  competitionKey: FootballCompetitionKey
  size?: 'sm' | 'md' | 'lg'
}) {
  const dimensions = size === 'lg' ? 'h-20 w-20 text-lg' : size === 'sm' ? 'h-8 w-8 text-[9px]' : 'h-12 w-12 text-xs'
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface-raised font-bold tracking-tight text-ink ${dimensions}`}>
      {COMPETITION_CODES[competitionKey]}
    </span>
  )
}

export function FootballTeamMark({
  team,
  size = 'md'
}: {
  team: FootballTeamSummary
  size?: 'sm' | 'md' | 'lg'
}) {
  const dimensions = size === 'lg' ? 'h-24 w-24' : size === 'sm' ? 'h-7 w-7' : 'h-10 w-10'
  if (team.imagePath) {
    return (
      <span className={`${dimensions} inline-flex shrink-0 items-center justify-center overflow-hidden rounded-md border border-line-subtle bg-surface-raised p-1`} aria-hidden="true">
        <CoverImage path={team.imagePath} alt="" className="h-full w-full !object-contain" rounded="rounded-none" thumbWidth={size === 'lg' ? 192 : 96} />
      </span>
    )
  }
  return (
    <span className={`${dimensions} inline-flex shrink-0 items-center justify-center rounded-md border border-line-strong bg-surface-raised text-[10px] font-semibold text-ink-secondary`} aria-hidden="true">
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
      className="group block border-b border-line-subtle px-1 py-3.5 transition-colors last:border-0 hover:bg-surface-raised/45 sm:px-3"
    >
      <span className="mb-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.12em] text-ink-muted">
        <span className="flex min-w-0 items-center gap-2"><FootballFlag competitionKey={match.competitionKey} /><span className="truncate">{match.competitionName}{match.stageName ? ` / ${match.stageName}` : ''}</span></span>
        <span className="shrink-0 tabular-nums">{match.matchDate}</span>
      </span>
      <span className="grid grid-cols-[minmax(0,1fr)_58px_minmax(0,1fr)] items-center gap-2 text-sm sm:gap-4">
        <span className="flex min-w-0 items-center justify-end gap-2 text-right font-medium text-ink group-hover:text-signal-link">
          <span className="truncate">{match.home.name}</span>
          <FootballTeamMark team={match.home} size="sm" />
        </span>
        <span className="rounded border border-line-strong bg-surface-raised px-2 py-1.5 text-center font-semibold tabular-nums text-ink">{score}</span>
        <span className="flex min-w-0 items-center gap-2 font-medium text-ink group-hover:text-signal-link">
          <FootballTeamMark team={match.away} size="sm" />
          <span className="truncate">{match.away.name}</span>
        </span>
      </span>
    </Link>
  )
}

export function FootballCoverageStrip({ coverage }: { coverage: FootballCoverage[] }) {
  if (!coverage.length) {
    return <p className="text-sm text-ink-muted">No source coverage has been recorded yet.</p>
  }
  const latest = new Map<string, FootballCoverage>()
  for (const item of coverage) {
    const scope = `${item.competitionKey ?? 'global'}:${item.seasonId ?? 'all'}`
    const key = `${scope}:${item.source}:${item.facet}`
    if (!latest.has(key)) latest.set(key, item)
  }
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
                  : item.state === 'partial'
                    ? 'bg-signal-caution'
                    : 'bg-ink-muted'
            }`}
          />
          <span className="text-ink-secondary">{item.source} / {item.facet}</span>
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
    <div className="mb-4 flex items-end justify-between gap-4 border-b border-line-subtle pb-3">
      <h2 className="text-xl font-semibold tracking-tight text-ink">{title}</h2>
      {detail && <p className="text-xs text-ink-muted">{detail}</p>}
    </div>
  )
}
