import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageStatus from '../components/PageStatus'
import FavoriteButton from '../components/FavoriteButton'
import AddToListMenu from '../components/AddToListMenu'
import FootballExternalLinks from '../components/football/FootballExternalLinks'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { footballEraName, footballTeamColors } from '@shared/footballIdentity'
import { footballRollOfHonour } from '@shared/footballInsights'
import type { FootballCompetitionKey, FootballEra, FootballSeason } from '@shared/types'
import {
  FootballCompetitionMark,
  FootballCoverageStrip,
  FootballHero,
  FootballMediaShelf,
  FootballSectionTitle,
  FootballTeamMark,
  footballCompetitionStyle
} from '../components/football/FootballCommon'

function inEra(season: FootballSeason, era: FootballEra | null): boolean {
  if (!era) return true
  return (!era.startSeason || season.key >= era.startSeason) && (!era.endSeason || season.key <= era.endSeason)
}

function TitleTimeline({ seasons }: { seasons: FootballSeason[] }) {
  if (!seasons.length) return <p className="text-sm text-ink-muted">No seasons in this era.</p>
  return (
    <>
      <div className="flex h-16 gap-px" role="list" aria-label="Champion by season">
        {seasons.map((season) => {
          const colors = season.champion ? footballTeamColors(season.champion.name, season.champion.colors) : null
          const label = `${season.label}: ${season.champion?.name ?? 'no verified champion'}`
          return (
            <Link
              key={season.id}
              role="listitem"
              to={`/football/season/${season.id}`}
              title={label}
              aria-label={label}
              className="min-w-[3px] flex-1 rounded-[2px] ring-1 ring-black/20 transition-transform hover:z-10 hover:scale-y-110 hover:ring-2 hover:ring-ink"
              style={{
                background: colors
                  ? `linear-gradient(180deg, ${colors.primary} 0 70%, ${colors.secondary} 70% 100%)`
                  : 'rgb(var(--surface-raised))'
              }}
            />
          )
        })}
      </div>
      <div className="mt-2 flex justify-between text-[10px] tabular-nums text-ink-muted">
        <span>{seasons[0].label}</span>
        {seasons.length > 8 && <span>{seasons[Math.floor(seasons.length / 2)].label}</span>}
        <span>{seasons[seasons.length - 1].label}</span>
      </div>
    </>
  )
}

export default function FootballCompetitionPage() {
  const { key: param = '' } = useParams()
  const qc = useQueryClient()
  const [eraId, setEraId] = usePersistedState<number | null>('footballCompetitionEra', null)
  const [jump, setJump] = useState('')
  const [allSeasons, setAllSeasons] = usePersistedState('footballCompetitionAllSeasons', false)
  const competitionsQuery = useQuery({ queryKey: qk.football.competitions, queryFn: () => api.football.competitions() })
  const competitions = competitionsQuery.data ?? []
  const resolved = competitions.find((item) => item.key === param || String(item.id) === param)
  const detailQuery = useQuery({
    queryKey: resolved ? qk.football.competition(resolved.key) : qk.football.competitionPending(param),
    queryFn: () => api.football.competition(resolved!.key as FootballCompetitionKey),
    enabled: !!resolved
  })
  const chronological = useMemo(
    () => [...(detailQuery.data?.seasons ?? [])].sort((a, b) => a.key.localeCompare(b.key)),
    [detailQuery.data]
  )
  const roll = useMemo(() => footballRollOfHonour(chronological), [chronological])
  if (competitionsQuery.isLoading || detailQuery.isLoading) return <PageStatus>Opening competition history...</PageStatus>
  if (competitionsQuery.isError || detailQuery.isError) return <PageStatus>Could not load this competition history.</PageStatus>
  if (!resolved || !detailQuery.data) return <PageStatus>Competition not found.</PageStatus>
  const competition = detailQuery.data
  const era = competition.eras.find((item) => item.id === eraId) ?? null
  const timeline = chronological.filter((season) => inEra(season, era))
  const newestFirst = [...chronological].reverse()
  const filtered = jump.trim() ? newestFirst.filter((season) => season.label.includes(jump.trim())) : newestFirst
  const visibleSeasons = allSeasons || jump.trim() ? filtered : filtered.slice(0, 12)
  const topTitles = roll[0]?.titles ?? 1

  async function favorite() {
    await api.football.setFavorite('competition', competition.id, !competition.favorite)
    qc.invalidateQueries({ queryKey: qk.football.all })
  }

  return (
    <div style={footballCompetitionStyle(competition.key)}>
      <FootballHero
        tint="linear-gradient(135deg, rgb(var(--football-c) / 0.28), rgb(var(--football-c) / 0.06) 55%, transparent)"
        back={{ to: '/football/competitions', label: 'History' }}
      >
        <div className="mt-4 flex flex-wrap items-end gap-6">
          <FootballCompetitionMark competitionKey={competition.key} imagePath={competition.imagePath} size="lg" />
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-[rgb(var(--football-c))]">
              {[competition.country ?? competition.scope, competition.format === 'league' ? 'league' : 'cup', competition.startYear ? `since ${competition.startYear}` : null].filter(Boolean).join(' / ')}
            </p>
            <h1 className="mt-1 text-4xl font-semibold tracking-tight text-ink">{competition.name}</h1>
            {(competition.lineageNote ?? competition.summary) && <p className="mt-2 max-w-3xl text-sm text-ink-secondary">{competition.lineageNote ?? competition.summary}</p>}
          </div>
          <div className="flex items-center gap-2">
            <FavoriteButton active={competition.favorite} onClick={favorite} variant="pill" activeText="Saved" inactiveText="Save" />
            <AddToListMenu kind="footballCompetition" entityId={competition.id} />
          </div>
        </div>
        <dl className="mt-7 grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-5">
          <div><dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">{competition.format === 'league' ? 'Seasons' : 'Editions'}</dt><dd className="mt-1 text-2xl font-semibold tabular-nums text-ink">{competition.seasonCount}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Matches</dt><dd className="mt-1 text-2xl font-semibold tabular-nums text-ink">{competition.matchCount.toLocaleString()}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Champions</dt><dd className="mt-1 text-2xl font-semibold tabular-nums text-ink">{roll.length}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Goals per match</dt><dd className="mt-1 text-2xl font-semibold tabular-nums text-ink">{competition.matchCount ? (competition.goalCount / competition.matchCount).toFixed(2) : '-'}</dd></div>
          <div><dt className="text-[10px] uppercase tracking-[0.16em] text-ink-muted">Holder</dt><dd className="mt-1 text-lg font-semibold text-ink">{competition.holder ? <Link to={`/football/team/${competition.holder.id}`} className="flex items-center gap-2 hover:text-signal-link"><FootballTeamMark team={competition.holder} size="xs" />{competition.holder.name}</Link> : 'Not verified'}</dd></div>
        </dl>
      </FootballHero>

      <div className="mx-auto max-w-[1500px] px-6 py-8">
        <section className="mb-10">
          <FootballSectionTitle
            title="Title timeline"
            detail={competition.eras.length > 1 && (
              <span className="flex flex-wrap gap-1.5">
                <button className={`pill ${era == null ? 'pill-active' : ''}`} onClick={() => setEraId(null)}>All eras</button>
                {competition.eras.map((item) => (
                  <button key={item.id} className={`pill ${era?.id === item.id ? 'pill-active' : ''}`} onClick={() => setEraId(item.id)}>{item.name}</button>
                ))}
              </span>
            )}
          />
          <TitleTimeline seasons={timeline} />
          {era?.narrative && <p className="mt-3 max-w-4xl text-xs leading-relaxed text-ink-muted">{era.narrative}</p>}
        </section>

        <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1fr)_420px]">
          <section>
            <FootballSectionTitle title="Roll of honour" detail={`${roll.length} champions`} />
            {roll.length ? (
              <ol className="divide-y divide-line-subtle border-y border-line-subtle">
                {roll.slice(0, 20).map((entry, index) => {
                  const colors = footballTeamColors(entry.team.name, entry.team.colors)
                  const bar = colors.primary.toLowerCase() === '#ffffff' ? colors.secondary : colors.primary
                  return (
                    <li key={entry.team.id} className="grid grid-cols-[28px_minmax(0,220px)_minmax(0,1fr)_40px] items-center gap-3 px-1 py-2.5">
                      <span className="text-xs tabular-nums text-ink-muted">{index + 1}</span>
                      <Link to={`/football/team/${entry.team.id}`} className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink hover:text-signal-link"><FootballTeamMark team={entry.team} size="sm" /><span className="truncate">{entry.team.name}</span></Link>
                      <span className="flex min-w-0 items-center gap-3">
                        <span className="h-2 rounded-full" style={{ width: `${Math.max(4, (entry.titles / topTitles) * 80)}%`, background: bar }} aria-hidden="true" />
                        <span className="truncate text-[11px] tabular-nums text-ink-muted">{entry.first === entry.last ? entry.first : `${entry.first} to ${entry.last}`}</span>
                      </span>
                      <span className="text-right text-lg font-semibold tabular-nums text-ink">{entry.titles}</span>
                    </li>
                  )
                })}
              </ol>
            ) : <p className="text-sm text-ink-muted">No verified champions are stored yet.</p>}
          </section>

          <aside>
            <FootballSectionTitle
              title={competition.format === 'league' ? 'Seasons' : 'Editions'}
              detail={<input className="input h-7 w-32 text-xs" value={jump} onChange={(event) => setJump(event.target.value)} placeholder="Jump to year" aria-label="Jump to a season by year" />}
            />
            <div className="divide-y divide-line-subtle border-y border-line-subtle">
              {visibleSeasons.map((season) => (
                <Link key={season.id} to={`/football/season/${season.id}`} className="grid grid-cols-[72px_minmax(0,1fr)_auto] items-center gap-3 px-1 py-2.5 hover:bg-surface-raised/40">
                  <span className="font-mono text-xs tabular-nums text-ink-secondary">{season.label}</span>
                  <span className="flex min-w-0 items-center gap-2 text-sm text-ink">
                    {season.champion ? <><FootballTeamMark team={season.champion} size="xs" /><span className="truncate">{season.champion.name}</span>{season.runnerUp && <span className="truncate text-xs text-ink-muted">ahead of {season.runnerUp.name}</span>}</> : <span className="text-ink-muted">{season.status === 'void' ? 'Void edition' : 'Champion not verified'}</span>}
                  </span>
                  <span className="text-[10px] text-ink-muted">{footballEraName(competition.key, season.key, '') || ''}</span>
                </Link>
              ))}
              {!visibleSeasons.length && <p className="py-4 text-sm text-ink-muted">No season matches that year.</p>}
            </div>
            {!jump.trim() && filtered.length > 12 && (
              <button className="btn-ghost mt-3 w-full" onClick={() => setAllSeasons((value) => !value)}>
                {allSeasons ? 'Show recent seasons' : `Show all ${filtered.length} ${competition.format === 'league' ? 'seasons' : 'editions'}`}
              </button>
            )}
          </aside>
        </div>

        {competition.article?.body && (
          <details className="mt-10 border-y border-line-subtle py-4">
            <summary className="cursor-pointer text-sm font-medium text-ink">The story</summary>
            <p className="mt-4 max-w-5xl whitespace-pre-line text-sm leading-7 text-ink-secondary">{competition.article.body}</p>
            <p className="mt-3 text-xs text-ink-muted">{competition.article.attribution ?? competition.article.sourceUrl}</p>
          </details>
        )}
        <details className="mt-6 border-y border-line-subtle py-4">
          <summary className="cursor-pointer text-sm font-medium text-ink">Media</summary>
          <div className="mt-4"><FootballMediaShelf media={competition.media} /></div>
        </details>
        <details className="mt-6 border-y border-line-subtle py-4">
          <summary className="cursor-pointer text-sm font-medium text-ink">Sources and external links</summary>
          <div className="mt-4 space-y-5">
            <FootballCoverageStrip coverage={competition.coverage} />
            <FootballExternalLinks entityKind="competition" entityId={competition.id} links={competition.externalLinks} onChanged={() => qc.invalidateQueries({ queryKey: qk.football.all })} />
          </div>
        </details>
      </div>
    </div>
  )
}
