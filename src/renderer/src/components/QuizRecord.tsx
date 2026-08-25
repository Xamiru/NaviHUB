import { useQuery } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import StatTile from './StatTile'
import type { QuizKind, QuizSession } from '@shared/types'
import { quizScorePolicy, quizSessionCorrect } from '@shared/quizCore'

const pct = (s: QuizSession): number =>
  s.total > 0 ? Math.round((quizSessionCorrect(s) / s.total) * 100) : 0

// SQLite timestamps are UTC without a zone marker.
const playedOn = (s: QuizSession): string =>
  new Date(s.playedAt.replace(' ', 'T') + 'Z').toLocaleDateString()

// "Your record" block for a quiz setup screen: personal best + recent rounds
// from the quiz_session log (written by each quiz page's endGame()).
export default function QuizRecord({ kind }: { kind: QuizKind }) {
  const policy = quizScorePolicy(kind)
  const { data: h } = useQuery({
    queryKey: qk.quiz.history(kind),
    queryFn: () => api.quiz.history(kind)
  })
  if (!h || h.totalSessions === 0) return null

  return (
    <div className="mt-6">
      <div className="label mb-2">Your record</div>
      <div className="grid grid-cols-3 gap-3">
        <StatTile
          label="Best round"
          value={
            h.best
              ? policy === 'points'
                ? h.best.score.toLocaleString()
                : `${quizSessionCorrect(h.best)}/${h.best.total}`
              : '—'
          }
          sub={h.best ? `${pct(h.best)}% · ${playedOn(h.best)}` : 'play a round of 5+'}
          accent={h.best != null}
        />
        <StatTile label="Best streak" value={h.bestStreak} />
        <StatTile label="Rounds played" value={h.totalSessions} />
      </div>
      {h.recent.length > 0 && (
        <div className="mt-3 space-y-1">
          {h.recent.slice(0, 5).map((s) => (
            <div key={s.id} className="flex items-center gap-3 text-xs text-gray-500">
              <span className="w-16 font-medium text-gray-400">
                {policy === 'points'
                  ? s.score.toLocaleString()
                  : `${quizSessionCorrect(s)}/${s.total}`}
              </span>
              <span className="w-10">{pct(s)}%</span>
              <span className="w-14">streak {s.bestStreak}</span>
              <span>{playedOn(s)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
