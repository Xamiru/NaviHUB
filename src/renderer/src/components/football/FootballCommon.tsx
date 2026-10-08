import { memo, useEffect, useState, type CSSProperties, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import CoverImage from '../CoverImage'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { formatFootballScore } from '@shared/football'
import { mediaUrl, thumbUrl } from '@shared/mediaUrl'
import {
  FOOTBALL_COMPETITION_IDENTITY,
  footballFateLabel,
  footballTeamCode,
  footballTeamColors
} from '@shared/footballIdentity'
import type { FootballFormResult } from '@shared/footballInsights'
import type {
  FootballCompetitionKey,
  FootballCoverage,
  FootballMatchSummary,
  FootballMedia,
  FootballSeasonFate,
  FootballTeamSummary
} from '@shared/types'

/** CSS variables for a competition's identity hue; pair with `.football-chip` or `rgb(var(--football-c))`. */
export function footballCompetitionStyle(key: FootballCompetitionKey): CSSProperties {
  const identity = FOOTBALL_COMPETITION_IDENTITY[key]
  return { ['--football-c' as string]: identity.rgb, ['--football-ci' as string]: identity.ink }
}

/** Stored competition logos, read once and shared by every chip and mark. */
export function useFootballCompetitionLogos(): Partial<Record<FootballCompetitionKey, string>> {
  const { data } = useQuery({
    queryKey: qk.football.competitionLogos,
    queryFn: () => api.football.competitionLogos(),
    staleTime: Infinity
  })
  return data ?? {}
}

/**
 * A stored crest or logo: the cached thumbnail at `thumbWidth` (small slots must not
 * decode the full badge), the original if that fails, then `fallback`.
 */
function StoredMark({
  path,
  thumbWidth,
  className,
  fallback = null
}: {
  path: string | null | undefined
  thumbWidth: number
  className: string
  fallback?: ReactNode
}) {
  const [stage, setStage] = useState<'thumb' | 'full' | 'failed'>('thumb')
  useEffect(() => setStage('thumb'), [path])
  const thumb = path ? thumbUrl(path, thumbWidth) : null
  const src = !path || stage === 'failed' ? null : stage === 'thumb' && thumb ? thumb : mediaUrl(path)
  if (!src) return <>{fallback}</>
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      className={`${className} shrink-0 object-contain`}
      loading="lazy"
      decoding="async"
      draggable={false}
      onError={() => setStage(src === thumb ? 'full' : 'failed')}
    />
  )
}

export function FootballFlag({ competitionKey }: { competitionKey: FootballCompetitionKey }) {
  const identity = FOOTBALL_COMPETITION_IDENTITY[competitionKey]
  const logo = useFootballCompetitionLogos()[competitionKey]
  return (
    <span className="football-chip" style={footballCompetitionStyle(competitionKey)}>
      {/* Logos sit on a light tile: several are dark artwork on a transparent background. */}
      <StoredMark path={logo} thumbWidth={160} className="-ml-1 h-4 w-4 rounded-sm bg-white p-px" />
      {identity.code}
    </span>
  )
}

export function FootballCompetitionMark({
  competitionKey,
  imagePath,
  size = 'md'
}: {
  competitionKey: FootballCompetitionKey
  imagePath?: string | null
  size?: 'xs' | 'sm' | 'md' | 'lg'
}) {
  const dimensions = {
    xs: 'h-5 w-5 rounded-sm p-px text-[7px]',
    sm: 'h-8 w-8 rounded-md p-0.5 text-[10px]',
    md: 'h-12 w-12 rounded-lg p-1 text-sm',
    lg: 'h-24 w-24 rounded-xl p-2 text-3xl'
  }[size]
  const logos = useFootballCompetitionLogos()
  const badge = (
    <span
      className={`${dimensions} inline-flex shrink-0 items-center justify-center font-bold tracking-tight shadow-lg`}
      style={{
        ...footballCompetitionStyle(competitionKey),
        background: 'rgb(var(--football-c))',
        color: 'var(--football-ci)'
      }}
      aria-hidden="true"
    >
      {FOOTBALL_COMPETITION_IDENTITY[competitionKey].code}
    </span>
  )
  return (
    <StoredMark
      path={imagePath ?? logos[competitionKey]}
      thumbWidth={size === 'lg' ? 320 : 160}
      className={`${dimensions} bg-white`}
      fallback={badge}
    />
  )
}

type MarkSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

const MARK_SIZES: Record<MarkSize, string> = {
  xs: 'h-6 w-6 text-[0px]',
  sm: 'h-8 w-8 text-[9px]',
  md: 'h-11 w-11 text-xs',
  lg: 'h-16 w-16 text-base',
  xl: 'h-24 w-24 text-2xl'
}

/** A club or national-team crest: the stored image, or a two-colour crest with its code. */
export function FootballTeamMark({ team, size = 'md' }: { team: FootballTeamSummary; size?: MarkSize }) {
  const colors = footballTeamColors(team.name, team.colors)
  const generated = (
    <span
      className={`${MARK_SIZES[size]} inline-flex shrink-0 items-center justify-center rounded-md font-bold tracking-tight ring-1 ring-black/20`}
      style={{
        background: `linear-gradient(135deg, ${colors.primary} 0 62%, ${colors.secondary} 62% 100%)`,
        color: colors.ink,
        textShadow: '0 1px 1px rgb(0 0 0 / 0.3)'
      }}
      aria-hidden="true"
    >
      {footballTeamCode(team.name, team.shortName)}
    </span>
  )
  return (
    <StoredMark
      path={team.imagePath}
      thumbWidth={size === 'xl' ? 320 : 160}
      className={`${MARK_SIZES[size]} football-crest`}
      fallback={generated}
    />
  )
}

export function FootballPortrait({
  name,
  imagePath,
  className = 'h-9 w-9',
  rounded = 'rounded-full',
  thumbWidth = 160
}: {
  name: string
  imagePath: string | null | undefined
  className?: string
  rounded?: string
  /** The smallest cached width covers the 24-36 px list slots; larger slots pass more. */
  thumbWidth?: number
}) {
  if (imagePath) {
    return <CoverImage path={imagePath} alt={name} className={`${className} object-cover`} rounded={rounded} thumbWidth={thumbWidth} />
  }
  const initials = name.split(/\s+/).filter(Boolean).slice(0, 2).map((part) => part[0]).join('').toUpperCase()
  return (
    <span className={`${className} ${rounded} inline-flex shrink-0 items-center justify-center bg-surface-active text-[10px] font-semibold text-ink-secondary`} aria-hidden="true">
      {initials}
    </span>
  )
}

export function FootballTeamLink({ team, size = 'xs', className = '' }: { team: FootballTeamSummary; size?: MarkSize; className?: string }) {
  return (
    <Link to={`/football/team/${team.id}`} className={`flex min-w-0 items-center gap-2 font-medium text-ink hover:text-signal-link ${className}`}>
      <FootballTeamMark team={team} size={size} />
      <span className="truncate">{team.name}</span>
    </Link>
  )
}

const FATE_CLASSES: Record<FootballSeasonFate | 'champion', string> = {
  champion: 'bg-signal-caution text-ink-inverse',
  'champions-league': 'bg-[#3b82f6] text-white',
  'europa-league': 'bg-[#f59e0b] text-[#111827]',
  'conference-league': 'bg-[#14b8a6] text-[#111827]',
  relegated: 'bg-[#ef4444] text-white'
}

/** Table position, coloured by what the team did next (title, Europe, relegation). */
export function FootballZoneBadge({
  position,
  fate,
  champion = false
}: {
  position: number | null | undefined
  fate?: FootballSeasonFate | null
  champion?: boolean
}) {
  const tone = champion ? FATE_CLASSES.champion : fate ? FATE_CLASSES[fate] : 'bg-surface-raised text-ink-secondary'
  return (
    <span className={`inline-flex h-6 w-6 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums ${tone}`}>
      {position ?? '-'}
    </span>
  )
}

export function FootballZoneLegend({ fates, seasonKey, champion }: { fates: FootballSeasonFate[]; seasonKey: string; champion: boolean }) {
  const present = (['champions-league', 'europa-league', 'conference-league', 'relegated'] as const).filter((fate) => fates.includes(fate))
  if (!present.length && !champion) return null
  return (
    <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-ink-muted">
      {champion && <span className="flex items-center gap-1.5"><span className={`h-2.5 w-2.5 rounded-sm ${FATE_CLASSES.champion}`} />Champion</span>}
      {present.map((fate) => (
        <span key={fate} className="flex items-center gap-1.5">
          <span className={`h-2.5 w-2.5 rounded-sm ${FATE_CLASSES[fate]}`} />
          {fate === 'relegated' ? 'Relegated' : `${footballFateLabel(fate, seasonKey)} next season`}
        </span>
      ))}
    </div>
  )
}

const FORM_CLASSES: Record<FootballFormResult, string> = {
  W: 'bg-signal-affirmative text-ink-inverse',
  D: 'bg-surface-active text-ink-secondary',
  L: 'bg-signal-anomaly text-ink-inverse'
}
const FORM_NAMES: Record<FootballFormResult, string> = { W: 'win', D: 'draw', L: 'loss' }

export function FootballFormGuide({ results }: { results: FootballFormResult[] }) {
  if (!results.length) return null
  return (
    <span className="flex gap-1" aria-label={`Last ${results.length}: ${results.map((result) => FORM_NAMES[result]).join(', ')}`}>
      {results.map((result, index) => (
        <span key={index} aria-hidden="true" className={`flex h-5 w-5 items-center justify-center rounded-sm text-[10px] font-bold ${FORM_CLASSES[result]}`}>{result}</span>
      ))}
    </span>
  )
}

/** Read-only half-star rating. */
export function FootballStars({ rating, className = 'text-sm' }: { rating: number | null; className?: string }) {
  if (rating == null) return null
  const percent = `${(Math.max(0, Math.min(5, rating)) / 5) * 100}%`
  return (
    <span className={`relative inline-block whitespace-nowrap leading-none tracking-[0.1em] ${className}`} aria-label={`Rated ${rating} of 5`}>
      <span className="text-ink-muted/45" aria-hidden="true">★★★★★</span>
      <span className="absolute inset-y-0 left-0 overflow-hidden text-signal-caution" style={{ width: percent }} aria-hidden="true">★★★★★</span>
    </span>
  )
}

/** Half-star rating input: a native range over the stars, so keys and screen readers just work. */
export function FootballRatingInput({ value, onChange }: { value: number | null; onChange: (value: number | null) => void }) {
  return (
    <div className="flex items-center gap-3">
      <span className="relative inline-flex">
        <input
          type="range"
          min={0}
          max={5}
          step={0.5}
          value={value ?? 0}
          onChange={(event) => onChange(Number(event.target.value) || null)}
          aria-label="Rating"
          aria-valuetext={value ? `${value} of 5` : 'No rating'}
          className="peer absolute inset-0 z-10 h-full w-full cursor-pointer opacity-0"
        />
        <span className="rounded peer-focus-visible:ring-2 peer-focus-visible:ring-signal-live">
          <FootballStars rating={value ?? 0} className="text-2xl" />
        </span>
      </span>
      <span className="text-sm tabular-nums text-ink-secondary">{value ? value.toFixed(1) : 'No rating'}</span>
      {value != null && <button type="button" className="text-xs text-ink-muted hover:text-ink" onClick={() => onChange(null)}>Clear</button>}
    </div>
  )
}

// Memoized: long match lists re-render on every tab or filter change of their page.
export const FootballMatchRow = memo(function FootballMatchRow({ match }: { match: FootballMatchSummary }) {
  const score = formatFootballScore(match)
  return (
    <Link
      to={`/football/match/${match.id}`}
      className="group block border-b border-line-subtle px-1 py-3 transition-colors last:border-0 hover:bg-surface-raised/45 sm:px-3"
    >
      <span className="mb-2 flex items-center justify-between gap-3 text-[10px] uppercase tracking-[0.12em] text-ink-muted">
        <span className="flex min-w-0 items-center gap-2"><FootballFlag competitionKey={match.competitionKey} /><span className="truncate">{match.seasonLabel}{match.stageName ? ` / ${match.stageName}` : ''}</span></span>
        <span className="flex shrink-0 items-center gap-2 tabular-nums">{match.rating != null && <FootballStars rating={match.rating} className="text-[11px]" />}{match.matchDate}</span>
      </span>
      <span className="grid grid-cols-[minmax(0,1fr)_64px_minmax(0,1fr)] items-center gap-2 text-sm sm:gap-4">
        <span className="flex min-w-0 items-center justify-end gap-2 text-right font-medium text-ink group-hover:text-signal-link">
          <span className="truncate">{match.home.name}</span>
          <FootballTeamMark team={match.home} size="xs" />
        </span>
        <span className="rounded bg-surface-raised px-2 py-1 text-center font-semibold tabular-nums text-ink">{score}</span>
        <span className="flex min-w-0 items-center gap-2 font-medium text-ink group-hover:text-signal-link">
          <FootballTeamMark team={match.away} size="xs" />
          <span className="truncate">{match.away.name}</span>
        </span>
      </span>
    </Link>
  )
})

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

export function FootballSectionTitle({ title, detail }: { title: string; detail?: ReactNode }) {
  return (
    <div className="section-heading mb-3 flex items-center gap-3">
      <h2 className="shrink-0 text-xs font-semibold uppercase tracking-[0.18em] text-ink-secondary">{title}</h2>
      <span className="h-px flex-1 bg-line-subtle" aria-hidden="true" />
      {detail && <span className="text-xs text-ink-muted">{detail}</span>}
    </div>
  )
}

/** Card with a small uppercase caption, used for sidebar facts across Football pages. */
export function FootballPanel({ title, children, className = '' }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={`card p-4 ${className}`}>
      <h2 className="text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  )
}

/** Tinted page hero shared by competition, season, team and player pages. */
export function FootballHero({
  tint,
  back,
  children
}: {
  tint: string
  back?: { to: string; label: string }
  children: ReactNode
}) {
  return (
    <div className="relative overflow-hidden border-b border-line-subtle">
      <div className="absolute inset-0" style={{ background: tint }} aria-hidden="true" />
      <div className="football-grid-lines absolute inset-0 opacity-[0.05]" aria-hidden="true" />
      <div className="relative mx-auto max-w-[1500px] px-6 pb-7 pt-6">
        {back && <Link to={back.to} className="text-xs text-ink-muted hover:text-ink">← {back.label}</Link>}
        {children}
      </div>
    </div>
  )
}
