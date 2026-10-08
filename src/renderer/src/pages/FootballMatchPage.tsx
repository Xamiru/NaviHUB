import { Fragment, memo, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageStatus from '../components/PageStatus'
import FavoriteButton from '../components/FavoriteButton'
import AddToListMenu from '../components/AddToListMenu'
import Tabs, { TabPanel } from '../components/Tabs'
import FootballExternalLinks from '../components/football/FootballExternalLinks'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { formatFootballScore } from '@shared/football'
import { footballEraName, footballTeamColors } from '@shared/footballIdentity'
import { footballPitchLayout } from '@shared/footballInsights'
import type { FootballLineupEntry, FootballMatchDetail, FootballMatchEvent, FootballTeamSummary } from '@shared/types'
import {
  FootballFlag,
  FootballMediaShelf,
  FootballPanel,
  FootballPortrait,
  FootballRatingInput,
  FootballTeamMark,
  footballCompetitionStyle
} from '../components/football/FootballCommon'

type MatchTab = 'timeline' | 'lineups' | 'media' | 'sources'

const DATE_FORMAT = new Intl.DateTimeFormat('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })

function minute(event: FootballMatchEvent): string {
  return `${event.minute ?? '?'}${event.extraMinute ? `+${event.extraMinute}` : ''}'`
}

function scorers(events: FootballMatchEvent[], teamId: number): string {
  return events
    .filter((event) => event.type === 'goal' && event.teamId === teamId)
    .map((event) => `${event.person?.name ?? 'Unknown'} ${minute(event)}${event.ownGoal ? ' (og)' : event.penalty ? ' (pen)' : ''}`)
    .join(' / ')
}

const CARD_CLASSES: Record<string, string> = {
  'Yellow card': 'bg-[#facc15]',
  'Second yellow': 'bg-gradient-to-br from-[#facc15] from-50% to-[#ef4444] to-50%',
  'Red card': 'bg-[#ef4444]'
}

function PersonLink({ person, fallback }: { person: FootballMatchEvent['person']; fallback: string }) {
  return person
    ? <Link to={`/football/person/${person.id}`} className="font-semibold text-ink hover:text-signal-link">{person.name}</Link>
    : <span className="text-ink-muted">{fallback}</span>
}

// Memoized with Pitch and SquadList: typing a journal note must not rebuild the match detail.
const Timeline = memo(function Timeline({ match }: { match: FootballMatchDetail }) {
  const ordered = [...match.events]
    .filter((event) => event.type !== 'shootout')
    .sort((a, b) => (a.minute ?? 0) - (b.minute ?? 0) || (a.extraMinute ?? 0) - (b.extraMinute ?? 0) || a.sortOrder - b.sortOrder)
  const shootout = match.events.filter((event) => event.type === 'shootout').sort((a, b) => a.sortOrder - b.sortOrder)
  if (!ordered.length) return <p className="text-sm text-ink-muted">Scorer data not supplied.</p>
  let home = 0
  let away = 0
  const halftimeAfter = ordered.filter((event) => (event.minute ?? 0) <= 45).length
  const marker = (label: string) => (
    <li className="grid grid-cols-[1fr_64px_1fr] items-center"><span /><span className="mx-auto rounded-full border border-line-strong bg-surface-panel px-2 py-0.5 text-xs tabular-nums text-ink-muted">{label}</span><span /></li>
  )
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-1/2 w-px bg-line-strong" aria-hidden="true" />
      <ol className="relative space-y-3">
        {marker('KO')}
        {ordered.map((event, index) => {
          const isHome = event.teamId === match.home.id
          if (event.type === 'goal') {
            if (isHome) home++
            else away++
          }
          const score = event.scoreHome != null && event.scoreAway != null ? `${event.scoreHome}-${event.scoreAway}` : `${home}-${away}`
          const person = event.person
          const goal = event.type === 'goal'
          let content
          if (goal) {
            content = (
              <span>
                <PersonLink person={person} fallback="Scorer not identified" />
                <span className="block text-xs text-ink-muted">
                  {score}{event.ownGoal ? ' / own goal' : event.penalty ? ' / penalty' : ''}
                  {event.relatedPerson && <> / assist <Link to={`/football/person/${event.relatedPerson.id}`} className="hover:text-signal-link">{event.relatedPerson.name}</Link></>}
                </span>
              </span>
            )
          } else if (event.type === 'card') {
            content = (
              <span className={`flex items-center gap-2 text-sm ${isHome ? 'flex-row-reverse' : ''}`}>
                <span className={`inline-block h-4 w-3 rounded-[2px] ${CARD_CLASSES[event.detail ?? ''] ?? CARD_CLASSES['Yellow card']}`} aria-label={event.detail ?? 'Card'} />
                <PersonLink person={person} fallback="Unknown player" />
              </span>
            )
          } else if (event.type === 'substitution') {
            content = (
              <span className="text-sm">
                <span className="text-signal-affirmative">On </span><PersonLink person={event.relatedPerson} fallback="Unknown player" />
                <span className="block text-xs text-ink-muted">Off {person?.name ?? 'unknown'}{event.detail ? ` / ${event.detail.toLowerCase()}` : ''}</span>
              </span>
            )
          } else {
            content = <span className="text-sm text-ink-secondary">{event.detail ?? event.type} <PersonLink person={person} fallback="" /></span>
          }
          const body = (
            <span className={`flex items-center gap-3 ${isHome ? 'justify-end text-right' : ''}`}>
              {goal && !isHome && <FootballPortrait name={person?.name ?? '?'} imagePath={person?.imagePath} className="h-8 w-8" />}
              {content}
              {goal && isHome && <FootballPortrait name={person?.name ?? '?'} imagePath={person?.imagePath} className="h-8 w-8" />}
            </span>
          )
          return (
            <Fragment key={event.id}>
              {index === halftimeAfter && halftimeAfter > 0 && halftimeAfter < ordered.length && marker(`HT ${match.homeHalftime ?? ''}${match.homeHalftime != null ? '-' : ''}${match.awayHalftime ?? ''}`.trim())}
              <li className={`grid grid-cols-[1fr_64px_1fr] items-center ${goal ? '' : 'opacity-90'}`}>
                {isHome ? body : <span />}
                <span className={`mx-auto flex items-center justify-center rounded-full text-xs font-semibold tabular-nums ${goal ? 'h-10 w-10 bg-surface-raised text-ink' : 'h-7 w-7 bg-surface-panel text-ink-muted'}`}>{minute(event)}</span>
                {isHome ? <span /> : body}
              </li>
            </Fragment>
          )
        })}
        {marker(`FT ${formatFootballScore(match)}`)}
      </ol>
      {shootout.length > 0 && (
        <div className="relative mt-6 border-t border-line-subtle pt-4">
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.2em] text-ink-muted">Penalty shoot-out</p>
          <ol className="grid gap-1.5">
            {shootout.map((event) => {
              const isHome = event.teamId === match.home.id
              const mark = <span className={`inline-block h-2.5 w-2.5 rounded-full ${event.detail === 'Scored' ? 'bg-signal-affirmative' : 'bg-signal-anomaly'}`} aria-label={event.detail ?? ''} />
              return (
                <li key={event.id} className="grid grid-cols-[1fr_64px_1fr] items-center text-sm">
                  {isHome ? <span className="flex items-center justify-end gap-2"><PersonLink person={event.person} fallback="Unknown" />{mark}</span> : <span />}
                  <span className="text-center text-xs text-ink-muted">{event.detail}</span>
                  {isHome ? <span /> : <span className="flex items-center gap-2">{mark}<PersonLink person={event.person} fallback="Unknown" /></span>}
                </li>
              )
            })}
          </ol>
        </div>
      )}
    </div>
  )
})

const Pitch = memo(function Pitch({ match }: { match: FootballMatchDetail }) {
  const starters = (team: FootballTeamSummary) => match.lineups.filter((entry) => entry.teamId === team.id && entry.role === 'player' && entry.starter)
  const home = footballPitchLayout(starters(match.home), 'home')
  const away = footballPitchLayout(starters(match.away), 'away')
  if (!home || !away) return null
  const dot = (entry: FootballLineupEntry, x: number, y: number, team: FootballTeamSummary) => {
    const colors = footballTeamColors(team.name, team.colors)
    return (
      <Link key={entry.id} to={`/football/person/${entry.person.id}`} className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center" style={{ left: `${x}%`, top: `${y}%` }} title={`${entry.person.name}${entry.position ? `, ${entry.position}` : ''}`}>
        <span className="flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ring-2 ring-black/30" style={{ background: colors.primary, color: colors.ink }}>{entry.shirt ?? ''}</span>
        <span className="mt-1 max-w-24 truncate rounded bg-black/60 px-1.5 text-[10px] font-medium text-white">{entry.person.name.split(' ').slice(-1)[0]}</span>
      </Link>
    )
  }
  return (
    <div className="football-pitch theme-dark aspect-[16/9]">
      {home.map((spot) => dot(spot.entry, spot.x, spot.y, match.home))}
      {away.map((spot) => dot(spot.entry, spot.x, spot.y, match.away))}
    </div>
  )
})

const SquadList = memo(function SquadList({ match, team, formation, manager }: { match: FootballMatchDetail; team: FootballTeamSummary; formation: string | null; manager: string | null }) {
  const entries = match.lineups.filter((entry) => entry.teamId === team.id)
  const group = (label: string, list: FootballLineupEntry[]) => list.length > 0 && (
    <div className="mb-3">
      <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-ink-muted">{label}</p>
      <div className="divide-y divide-line-subtle">
        {list.map((entry) => (
          <Link key={entry.id} to={`/football/person/${entry.person.id}`} className="grid grid-cols-[28px_32px_minmax(0,1fr)_auto] items-center gap-2 py-1.5 text-sm hover:bg-surface-raised/40">
            <span className="text-right text-xs tabular-nums text-ink-muted">{entry.shirt ?? ''}</span>
            <FootballPortrait name={entry.person.name} imagePath={entry.person.imagePath} className="h-7 w-7" />
            <span className="truncate text-ink">{entry.person.name}{entry.captain ? ' (c)' : ''}</span>
            <span className="text-xs text-ink-muted">{entry.position ?? ''}</span>
          </Link>
        ))}
      </div>
    </div>
  )
  return (
    <div>
      <p className="mb-2 flex items-center gap-2 font-semibold text-ink"><FootballTeamMark team={team} size="sm" />{team.name}{formation && <span className="text-xs font-normal text-ink-muted">{formation}</span>}</p>
      {manager && <p className="-mt-1 mb-2 text-xs text-ink-muted">Manager {manager}</p>}
      {group('Starting', entries.filter((entry) => entry.role === 'player' && entry.starter))}
      {group('Substitutes', entries.filter((entry) => entry.role === 'player' && !entry.starter))}
      {group('Manager', entries.filter((entry) => entry.role === 'manager'))}
    </div>
  )
})

export default function FootballMatchPage() {
  const id = Number(useParams().id)
  const qc = useQueryClient()
  const [tab, setTab] = usePersistedState<MatchTab>('footballMatchTab', 'timeline')
  const { data, isLoading, isError } = useQuery({
    queryKey: qk.football.match(id),
    queryFn: () => api.football.match(id),
    enabled: Number.isInteger(id) && id > 0
  })
  const [watchedAt, setWatchedAt] = useState<string | null>(null)
  const [rating, setRating] = useState<number | null>(null)
  const [note, setNote] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (!data) return
    setWatchedAt(data.watchedAt)
    setRating(data.rating)
    setNote(data.note ?? '')
  }, [data])

  if (isLoading) return <PageStatus>Opening match record...</PageStatus>
  if (isError) return <PageStatus>Could not load this match record.</PageStatus>
  if (!data) return <PageStatus>Match not found.</PageStatus>

  async function refresh() {
    await qc.invalidateQueries({ queryKey: qk.football.all })
  }
  async function favorite() {
    await api.football.setFavorite('match', id, !data!.favorite)
    await refresh()
  }
  async function saveJournal() {
    setSaving(true)
    try {
      await api.football.saveJournal(id, { watchedAt, rating, note })
      await refresh()
    } finally {
      setSaving(false)
    }
  }
  const eraName = footballEraName(data.competitionKey, data.seasonLabel, data.competitionName)
  const date = new Date(`${data.matchDate}T12:00:00`)
  const halftime = data.homeHalftime != null && data.awayHalftime != null ? `HT ${data.homeHalftime}-${data.awayHalftime}` : null
  const aggregate = data.aggregateHome != null && data.aggregateAway != null ? `Aggregate ${data.aggregateHome}-${data.aggregateAway}` : null

  return (
    <div className="mx-auto max-w-[1350px] px-6 py-6" style={footballCompetitionStyle(data.competitionKey)}>
      <Link to={`/football/season/${data.seasonId}`} className="text-xs text-ink-muted hover:text-ink">← {eraName} {data.seasonLabel}</Link>
      <section className="card mt-3 overflow-hidden">
        <div className="flex flex-wrap items-center justify-between gap-3 bg-[rgb(var(--football-c)/0.2)] px-5 py-2.5">
          <span className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-ink">
            <FootballFlag competitionKey={data.competitionKey} />{eraName} {data.seasonLabel}{data.stageName ? ` / ${data.stageName}` : data.round ? ` / ${data.round}` : ''}
          </span>
          <span className="text-xs text-ink-secondary">{[Number.isNaN(date.getTime()) ? data.matchDate : DATE_FORMAT.format(date), [data.venue, data.city].filter(Boolean).join(', '), data.attendance?.toLocaleString()].filter(Boolean).join(' / ')}</span>
        </div>
        <div className="grid items-center gap-4 px-6 py-8 md:grid-cols-[minmax(0,1fr)_220px_minmax(0,1fr)]">
          <Link to={`/football/team/${data.home.id}`} className="group flex items-center justify-end gap-4 text-right">
            <span className="min-w-0"><span className="block text-2xl font-semibold text-ink group-hover:text-signal-link">{data.home.name}</span><span className="mt-1 block text-xs text-ink-muted">{scorers(data.events, data.home.id)}</span></span>
            <FootballTeamMark team={data.home} size="lg" />
          </Link>
          <div className="text-center">
            <h1 className="text-6xl font-semibold tabular-nums tracking-tight text-ink"><span className="sr-only">{data.home.name} {data.away.name} </span>{formatFootballScore(data)}</h1>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-ink-muted">{[data.status === 'finished' ? 'Full time' : data.status, halftime, aggregate].filter(Boolean).join(' / ')}</p>
          </div>
          <Link to={`/football/team/${data.away.id}`} className="group flex items-center gap-4">
            <FootballTeamMark team={data.away} size="lg" />
            <span className="min-w-0"><span className="block text-2xl font-semibold text-ink group-hover:text-signal-link">{data.away.name}</span><span className="mt-1 block text-xs text-ink-muted">{scorers(data.events, data.away.id)}</span></span>
          </Link>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line-subtle px-4 py-2">
          <Tabs
            id="football-match"
            label="Match view"
            value={tab}
            onChange={setTab}
            tabs={[
              { key: 'timeline', label: 'Timeline' },
              { key: 'lineups', label: 'Lineups', count: data.lineups.length || undefined },
              { key: 'media', label: 'Media', count: data.media.length || undefined },
              { key: 'sources', label: 'Sources' }
            ]}
          />
          <span className="flex items-center gap-2">
            <FavoriteButton active={data.favorite} onClick={favorite} variant="pill" activeText="Saved" inactiveText="Save" />
            <AddToListMenu kind="footballMatch" entityId={id} />
          </span>
        </div>
      </section>

      <div className="mt-7 grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
        <TabPanel tabsId="football-match" value={tab} className="min-w-0">
          {tab === 'timeline' && <section className="card p-5"><Timeline match={data} /></section>}
          {tab === 'lineups' && (data.lineups.length ? (
            <div className="space-y-6">
              <Pitch match={data} />
              <div className="grid gap-8 md:grid-cols-2"><SquadList match={data} team={data.home} formation={data.homeFormation} manager={data.homeManager} /><SquadList match={data} team={data.away} formation={data.awayFormation} manager={data.awayManager} /></div>
            </div>
          ) : <p className="text-sm text-ink-muted">Lineup data not supplied.</p>)}
          {tab === 'media' && (
            <section>
              <FootballMediaShelf media={data.media} />
              <Link to={`/football/media?match=${id}`} className="mt-3 inline-block text-sm text-signal-link hover:underline">Attach media to this match</Link>
            </section>
          )}
          {tab === 'sources' && (
            <section className="space-y-5">
              <div className="divide-y divide-line-subtle border-y border-line-subtle">
                {data.sources.map((source) => (
                  <button key={source.id} className="block w-full py-2 text-left text-xs text-ink-muted hover:text-signal-link disabled:hover:text-ink-muted" disabled={!source.sourceUrl} onClick={() => source.sourceUrl && api.football.openExternalLink('website', source.sourceUrl)}>
                    {source.source} / {source.revision ?? 'unversioned'}
                  </button>
                ))}
              </div>
              <FootballExternalLinks entityKind="match" entityId={id} links={data.externalLinks} onChanged={refresh} />
            </section>
          )}
        </TabPanel>

        <aside className="space-y-6">
          <FootballPanel title="Your log">
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <label className="flex items-center gap-2 text-sm text-ink"><input type="checkbox" checked={watchedAt != null} onChange={(event) => setWatchedAt(event.target.checked ? new Date().toISOString() : null)} />Watched</label>
                {watchedAt != null && (
                  <input type="date" className="input h-8 w-40 text-xs" aria-label="Watched on" value={watchedAt.slice(0, 10)} onChange={(event) => event.target.value && setWatchedAt(`${event.target.value}T12:00:00.000Z`)} />
                )}
              </div>
              <div><p className="label">Rating</p><FootballRatingInput value={rating} onChange={setRating} /></div>
              <label className="block"><span className="label mb-1 block">Note</span><textarea className="input min-h-28 resize-y" value={note} onChange={(event) => setNote(event.target.value)} /></label>
              <button className="btn-primary w-full" disabled={saving} onClick={saveJournal}>Save log</button>
            </div>
          </FootballPanel>
          <FootballPanel title="Match facts">
            <dl className="divide-y divide-line-subtle text-sm">
              {([
                ['Venue', [data.venue, data.city].filter(Boolean).join(', ') || null],
                ['Attendance', data.attendance?.toLocaleString() ?? null],
                ['Referee', data.referee],
                ['Round', data.round],
                ['Stage', data.stageName],
                ['Formations', data.homeFormation || data.awayFormation ? `${data.homeFormation ?? '?'} / ${data.awayFormation ?? '?'}` : null],
                ['Managers', data.homeManager || data.awayManager ? `${data.homeManager ?? '?'} / ${data.awayManager ?? '?'}` : null]
              ] as const).filter(([, value]) => value).map(([label, value]) => (
                <div key={label} className="flex justify-between gap-4 py-2"><dt className="text-ink-muted">{label}</dt><dd className="text-right text-ink">{value}</dd></div>
              ))}
              <div className="flex justify-between gap-4 py-2"><dt className="text-ink-muted">Competition</dt><dd className="text-right"><Link to={`/football/competition/${data.competitionKey}`} className="text-ink hover:text-signal-link">{eraName}</Link></dd></div>
            </dl>
          </FootballPanel>
        </aside>
      </div>
    </div>
  )
}
