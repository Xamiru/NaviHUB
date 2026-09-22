import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import FavoriteButton from '../components/FavoriteButton'
import AddToListMenu from '../components/AddToListMenu'
import FootballExternalLinks from '../components/football/FootballExternalLinks'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import type { FootballCompetitionKey } from '@shared/types'
import {
  FootballCompetitionMark,
  FootballCoverageStrip,
  FootballFlag,
  FootballMediaShelf,
  FootballSectionTitle,
  FootballTeamMark
} from '../components/football/FootballCommon'

export default function FootballCompetitionPage() {
  const { key: param = '' } = useParams()
  const qc = useQueryClient()
  const competitionsQuery = useQuery({ queryKey: qk.football.competitions, queryFn: () => api.football.competitions() })
  const competitions = competitionsQuery.data ?? []
  const resolved = competitions.find((item) => item.key === param || String(item.id) === param)
  const detailQuery = useQuery({
    queryKey: resolved ? qk.football.competition(resolved.key) : qk.football.competitionPending(param),
    queryFn: () => api.football.competition(resolved!.key as FootballCompetitionKey),
    enabled: !!resolved
  })
  if (competitionsQuery.isLoading || detailQuery.isLoading) return <PageStatus>Opening competition history...</PageStatus>
  if (competitionsQuery.isError || detailQuery.isError) return <PageStatus>Could not load this competition history.</PageStatus>
  if (!resolved) return <PageStatus>Competition not found.</PageStatus>
  if (!detailQuery.data) return <PageStatus>Competition not found.</PageStatus>
  const data = detailQuery.data
  const competition = data

  async function favorite() {
    await api.football.setFavorite('competition', competition.id, !competition.favorite)
    qc.invalidateQueries({ queryKey: qk.football.all })
  }

  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <div className="grid items-center gap-5 md:grid-cols-[104px_minmax(0,1fr)]">
        <div className="flex items-center justify-center gap-2"><FootballCompetitionMark competitionKey={competition.key} size="lg" /><FootballFlag competitionKey={competition.key} /></div>
        <PageHeader
          title={competition.name}
          subtitle={competition.lineageNote ?? competition.summary ?? `${competition.scope} ${competition.format} history`}
          back={{ to: '/football/competitions', label: 'History' }}
          actions={<><FavoriteButton active={competition.favorite} onClick={favorite} variant="pill" activeText="Saved" inactiveText="Save" /><AddToListMenu kind="footballCompetition" entityId={competition.id} /></>}
        />
      </div>

      <div className="mb-10 grid grid-cols-2 gap-x-8 gap-y-4 border-y border-line-subtle py-5 sm:grid-cols-4">
        <div><p className="text-xs text-ink-muted">Archive begins</p><p className="mt-1 text-lg font-semibold tabular-nums text-ink">{competition.startYear ?? 'Unknown'}</p></div>
        <div><p className="text-xs text-ink-muted">Latest chapter</p><p className="mt-1 text-lg font-semibold text-ink">{competition.latestSeason ?? 'Not installed'}</p></div>
        <div><p className="text-xs text-ink-muted">Seasons</p><p className="mt-1 text-lg font-semibold tabular-nums text-ink">{competition.seasonCount}</p></div>
        <div><p className="text-xs text-ink-muted">Matches</p><p className="mt-1 text-lg font-semibold tabular-nums text-ink">{competition.matchCount.toLocaleString()}</p></div>
      </div>

      {data.article?.body && (
        <section className="mb-11 max-w-5xl">
          <FootballSectionTitle title="The story" />
          <p className="whitespace-pre-line text-sm leading-7 text-ink-secondary">{data.article.body}</p>
          <p className="mt-4 text-xs text-ink-muted">{data.article.attribution ?? data.article.sourceUrl}</p>
        </section>
      )}

      {competition.eras.length > 0 && (
        <section className="mb-11">
          <FootballSectionTitle title="Era timeline" detail={`${competition.eras.length} recognized eras`} />
          <div className="grid gap-px overflow-hidden border-y border-line-subtle bg-line-subtle md:grid-cols-2 xl:grid-cols-3">
            {competition.eras.map((era) => <div key={era.id} className="min-h-36 bg-surface-canvas p-4"><p className="text-xs tabular-nums text-signal-link">{era.startSeason ?? 'Origin'} – {era.endSeason ?? 'present'}</p><p className="mt-3 font-semibold text-ink">{era.name}</p>{era.narrative && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{era.narrative}</p>}</div>)}
          </div>
        </section>
      )}

      <div className="grid items-start gap-10 xl:grid-cols-[minmax(0,1.35fr)_340px]">
        <section>
          <FootballSectionTitle title="Season chapters" detail={`${competition.seasons.length} editions`} />
          <div className="divide-y divide-line-subtle border-y border-line-subtle">
            {competition.seasons.map((season) => (
              <Link key={season.id} to={`/football/season/${season.id}`} className="group grid grid-cols-[92px_minmax(0,1fr)_auto] items-center gap-4 px-2 py-3.5 hover:bg-surface-raised/35">
                <span className="font-mono text-sm text-ink-secondary">{season.label}</span>
                <span className="flex min-w-0 items-center gap-2">{season.champion && <FootballTeamMark team={season.champion} size="sm" />}<span className="truncate text-sm text-ink-muted group-hover:text-ink">{season.champion ? `${season.champion.name} / champion` : season.status === 'void' ? 'Void edition' : 'Champion not verified'}</span></span>
                <span className="text-xs tabular-nums text-ink-muted">{season.matchCount} matches</span>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-9">
          {data.honours.length > 0 && <section><FootballSectionTitle title="Recent champions" /><div className="divide-y divide-line-subtle">{data.honours.filter((honour) => honour.placement === 'winner' && honour.team).slice(-8).reverse().map((honour) => <div key={honour.id} className="flex items-center justify-between gap-3 py-2.5"><span className="flex min-w-0 items-center gap-2 text-sm font-medium text-ink">{honour.team && <FootballTeamMark team={honour.team} size="sm" />}<span className="truncate">{honour.team?.name}</span></span><span className="text-xs text-ink-muted">{honour.seasonLabel}</span></div>)}</div></section>}
          <section><FootballSectionTitle title="Media" /><FootballMediaShelf media={data.media} /></section>
        </aside>
      </div>

      <details className="mt-10 border-y border-line-subtle py-4"><summary className="cursor-pointer text-sm font-medium text-ink">Sources and coverage</summary><div className="mt-4"><FootballCoverageStrip coverage={data.coverage} /></div></details>
      <details className="mt-6 border-y border-line-subtle py-4">
        <summary className="cursor-pointer text-sm font-medium text-ink">External links</summary>
        <div className="mt-4">
          <FootballExternalLinks entityKind="competition" entityId={competition.id} links={data.externalLinks} onChanged={() => qc.invalidateQueries({ queryKey: qk.football.all })} />
        </div>
      </details>
    </div>
  )
}
