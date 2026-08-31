import { Link, useParams } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import FavoriteButton from '../components/FavoriteButton'
import AddToListMenu from '../components/AddToListMenu'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import type { FootballCompetitionKey } from '@shared/types'
import {
  FootballCoverageStrip,
  FootballMediaShelf,
  FootballSectionTitle
} from '../components/football/FootballCommon'

export default function FootballCompetitionPage() {
  const { key: param = '' } = useParams()
  const qc = useQueryClient()
  const { data: competitions = [] } = useQuery({
    queryKey: qk.football.competitions,
    queryFn: () => api.football.competitions()
  })
  const resolved = competitions.find((item) => item.key === param || String(item.id) === param)
  const { data, isLoading } = useQuery({
    queryKey: resolved ? qk.football.competition(resolved.key) : ['football', 'competition', 'pending', param],
    queryFn: () => api.football.competition(resolved!.key as FootballCompetitionKey),
    enabled: !!resolved
  })
  if (!resolved && competitions.length) return <PageStatus>Competition not found.</PageStatus>
  if (isLoading || !data) return <PageStatus>Opening competition volume...</PageStatus>
  const competition = data

  async function favorite() {
    await api.football.setFavorite('competition', competition.id, !competition.favorite)
    qc.invalidateQueries({ queryKey: qk.football.all })
  }

  return (
    <div className="mx-auto max-w-[1500px] p-6">
      <PageHeader
        title={competition.name}
        subtitle={competition.lineageNote ?? competition.summary ?? `${competition.scope} ${competition.format} archive`}
        back={{ to: '/football/competitions', label: 'Competition volumes' }}
        actions={
          <>
            <FavoriteButton active={competition.favorite} onClick={favorite} variant="pill" activeText="Saved" inactiveText="Save" />
            <AddToListMenu kind="footballCompetition" entityId={competition.id} />
          </>
        }
      />

      {competition.eras.length > 0 && (
        <section className="mb-9">
          <FootballSectionTitle title="Era timeline" />
          <div className="grid border-y border-line-subtle md:grid-cols-2 xl:grid-cols-3">
            {competition.eras.map((era) => (
              <div key={era.id} className="border-b border-line-subtle px-4 py-4 md:border-r">
                <p className="font-semibold text-ink">{era.name}</p>
                <p className="mt-1 text-xs text-ink-muted">{era.startSeason ?? 'Origin'} to {era.endSeason ?? 'present'}</p>
                {era.narrative && <p className="mt-2 text-sm leading-relaxed text-ink-muted">{era.narrative}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid gap-10 xl:grid-cols-[minmax(0,1.45fr)_minmax(320px,0.7fr)]">
        <section>
          <FootballSectionTitle title="Season chapters" detail={`${competition.seasons.length} editions`} />
          <div className="divide-y divide-line-subtle">
            {competition.seasons.map((season) => (
              <Link key={season.id} to={`/football/season/${season.id}`} className="grid grid-cols-[100px_minmax(0,1fr)_auto] items-center gap-4 py-3 hover:bg-surface-raised/35">
                <span className="font-mono text-sm text-ink-secondary">{season.label}</span>
                <span className="truncate text-sm text-ink-muted">
                  {season.champion ? `${season.champion.name} / champion` : season.status === 'void' ? 'Void edition' : 'Champion not verified'}
                </span>
                <span className="text-xs tabular-nums text-ink-muted">{season.matchCount} matches</span>
              </Link>
            ))}
          </div>
        </section>
        <aside className="space-y-9">
          <section>
            <FootballSectionTitle title="Source evidence" />
            <FootballCoverageStrip coverage={data.coverage} />
          </section>
          {data.article?.body && (
            <section>
              <FootballSectionTitle title={data.article.title} />
              <p className="whitespace-pre-line text-sm leading-relaxed text-ink-muted">{data.article.body}</p>
              <p className="mt-3 text-xs text-ink-muted">{data.article.attribution ?? data.article.sourceUrl}</p>
            </section>
          )}
          <section>
            <FootballSectionTitle title="Media shelf" />
            <FootballMediaShelf media={data.media} />
          </section>
        </aside>
      </div>
    </div>
  )
}
