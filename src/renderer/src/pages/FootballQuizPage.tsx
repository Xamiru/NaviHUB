import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'

const GAMES = [
  { key: 'champion', to: '/football/quiz/champion', title: 'Champion', body: 'Name the verified winner of a completed edition.', minimum: 5 },
  { key: 'scoreline', to: '/football/quiz/scoreline', title: 'Scoreline', body: 'Recover the exact final score from teams, date and stage.', minimum: 5 },
  { key: 'careerPath', to: '/football/quiz/career-path', title: 'Career Path', body: 'Identify a player from four to six dated senior club spells.', minimum: 5 },
  { key: 'chronology', to: '/football/quiz/chronology', title: 'Champion Chronology', body: 'Order four champion editions from one competition.', minimum: 4 },
  { key: 'playerGrid', to: '/football/quiz/player-grid', title: 'Player Grid', body: 'Fill nine verified club, national-team and edition intersections.', minimum: 1 }
] as const

export default function FootballQuizPage() {
  const { data } = useQuery({
    queryKey: qk.quiz.availability({ scope: 'all' }),
    queryFn: () => api.quiz.availability({ scope: 'all' })
  })
  const availability = data?.football
  return (
    <div className="mx-auto max-w-[1300px] p-6">
      <PageHeader
        title="Football quiz room"
        subtitle="Five offline solo games dealt only from complete, verified and conflict-free archive facts."
        back={{ to: '/football', label: 'Football Archive' }}
      />
      <div className="mb-8 grid grid-cols-2 gap-6 border-y border-line-subtle py-5 sm:grid-cols-4">
        <div><p className="text-xs text-ink-muted">Dataset revision</p><p className="mt-1 truncate text-sm font-medium text-ink">{availability?.datasetRevision ?? 'Not installed'}</p></div>
        <div><p className="text-xs text-ink-muted">Champion facts</p><p className="mt-1 text-2xl font-semibold tabular-nums text-ink">{availability?.champion ?? 0}</p></div>
        <div><p className="text-xs text-ink-muted">Scorelines</p><p className="mt-1 text-2xl font-semibold tabular-nums text-ink">{availability?.scoreline ?? 0}</p></div>
        <div><p className="text-xs text-ink-muted">Quiz-pack players</p><p className="mt-1 text-2xl font-semibold tabular-nums text-ink">{availability?.playerGridPlayers ?? 0}</p></div>
      </div>
      <div className="divide-y divide-line-subtle border-y border-line-subtle">
        {GAMES.map((game, index) => {
          const count = availability?.[game.key] ?? 0
          const ready = count >= game.minimum
          const content = (
            <>
              <span className="font-mono text-xs text-ink-muted">{String(index + 1).padStart(2, '0')}</span>
              <span><span className="block text-lg font-semibold text-ink">{game.title}</span><span className="mt-1 block text-sm text-ink-muted">{game.body}</span></span>
              <span className="text-right text-xs text-ink-muted">{ready ? `${count} eligible` : `Locked / ${count} eligible`}</span>
            </>
          )
          return ready ? <Link key={game.key} to={game.to} className="grid grid-cols-[40px_minmax(0,1fr)_120px] items-center gap-3 py-5 hover:bg-surface-raised/35">{content}</Link> : <div key={game.key} className="grid grid-cols-[40px_minmax(0,1fr)_120px] items-center gap-3 py-5 opacity-55" aria-disabled="true">{content}</div>
        })}
      </div>
      {(!availability || availability.careerPath < 5 || availability.playerGrid < 1) && (
        <p className="mt-6 text-sm leading-relaxed text-ink-muted">
          Career Path and Player Grid remain locked until the optional Player Quiz Pack contains enough verified senior-career connections. <Link to="/football/sync" className="text-signal-link hover:underline">Open Football sources</Link>.
        </p>
      )}
    </div>
  )
}
