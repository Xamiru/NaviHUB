import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { FootballFlag, footballCompetitionStyle } from '../components/football/FootballCommon'

const GAMES = [
  { key: 'champion', to: '/football/quiz/champion', title: 'Champion', body: 'Name the verified winner of a completed edition.', minimum: 5, competitionKey: 'champions-league' },
  { key: 'scoreline', to: '/football/quiz/scoreline', title: 'Scoreline', body: 'Recover the exact final score from teams, date and stage.', minimum: 5, competitionKey: 'premier-league' },
  { key: 'careerPath', to: '/football/quiz/career-path', title: 'Career Path', body: 'Identify a player from four to six dated senior club spells.', minimum: 5, competitionKey: 'world-cup' },
  { key: 'chronology', to: '/football/quiz/chronology', title: 'Champion Chronology', body: 'Order four champion editions from one competition.', minimum: 4, competitionKey: 'euros' },
  { key: 'playerGrid', to: '/football/quiz/player-grid', title: 'Player Grid', body: 'Fill nine verified club, national-team and edition intersections.', minimum: 1, competitionKey: 'europa-league' }
] as const

export default function FootballQuizPage() {
  const { data, isLoading, isError } = useQuery({
    queryKey: qk.quiz.availability({ scope: 'all' }),
    queryFn: () => api.quiz.availability({ scope: 'all' })
  })
  if (isLoading) return <PageStatus>Preparing the Football quiz room...</PageStatus>
  if (isError) return <PageStatus>Could not load Football quiz eligibility.</PageStatus>
  const availability = data?.football
  return (
    <div className="mx-auto max-w-[1300px] p-6">
      <PageHeader
        title="Football quiz room"
        subtitle="Five offline solo games dealt only from complete, verified and conflict-free archive facts."
        back={{ to: '/football', label: 'Football Archive' }}
      />
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {GAMES.map((game) => {
          const count = availability?.[game.key] ?? 0
          const ready = count >= game.minimum
          const content = (
            <>
              <span className="absolute inset-y-0 left-0 w-1 bg-[rgb(var(--football-c))]" aria-hidden="true" />
              <span className="flex items-center justify-between gap-3">
                <FootballFlag competitionKey={game.competitionKey} />
                <span className={`text-xs ${ready ? 'text-signal-link' : 'text-ink-muted'}`}>{ready ? 'Play ›' : 'Locked'}</span>
              </span>
              <span className="mt-5 block text-xl font-semibold text-ink">{game.title}</span>
              <span className="mt-2 block max-w-md text-sm leading-6 text-ink-muted">{game.body}</span>
              <span className="mt-5 block text-xs text-ink-secondary">{ready ? `${count.toLocaleString()} eligible facts` : `${count.toLocaleString()} of ${game.minimum} needed`}</span>
            </>
          )
          return ready
            ? <Link key={game.key} to={game.to} className="card relative block overflow-hidden p-5 hover:border-line-strong" style={footballCompetitionStyle(game.competitionKey)}>{content}</Link>
            : <div key={game.key} className="card relative overflow-hidden p-5 opacity-60" style={footballCompetitionStyle(game.competitionKey)} aria-disabled="true">{content}</div>
        })}
      </div>
      <details className="mt-6 border-y border-line-subtle py-4">
        <summary className="cursor-pointer text-sm font-medium text-ink">Quiz pool details</summary>
        <div className="mt-5 grid grid-cols-2 gap-6 sm:grid-cols-4">
          <div><p className="text-xs text-ink-muted">Dataset revision</p><p className="mt-1 truncate text-sm font-medium text-ink">{availability?.datasetRevision ?? 'Not installed'}</p></div>
          <div><p className="text-xs text-ink-muted">Champion facts</p><p className="mt-1 text-2xl font-semibold tabular-nums text-ink">{availability?.champion ?? 0}</p></div>
          <div><p className="text-xs text-ink-muted">Scorelines</p><p className="mt-1 text-2xl font-semibold tabular-nums text-ink">{availability?.scoreline ?? 0}</p></div>
          <div><p className="text-xs text-ink-muted">Quiz-pack players</p><p className="mt-1 text-2xl font-semibold tabular-nums text-ink">{availability?.playerGridPlayers ?? 0}</p></div>
        </div>
      </details>
      {(!availability || availability.careerPath < 5 || availability.playerGrid < 1) && (
        <p className="mt-6 text-sm leading-relaxed text-ink-muted">
          Career Path and Player Grid remain locked until the optional Player Quiz Pack contains enough verified senior-career connections. <Link to="/football/sync" className="text-signal-link hover:underline">Open Football sources</Link>.
        </p>
      )}
    </div>
  )
}
