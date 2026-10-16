import { Link } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { HISTORY_QUIZ_GAMES } from '../lib/historyQuiz'
import type { HistoryQuizScope } from '@shared/types'

export default function HistoryQuizPage() {
  const [scope, setScope] = usePersistedState<HistoryQuizScope>('history.quiz.scope', 'read')
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: qk.history.quizCounts(scope),
    queryFn: () => api.history.quizCounts(scope)
  })
  return (
    <div className="mx-auto max-w-[1100px] p-6">
      <PageHeader
        title="History quiz"
        subtitle="Rounds dealt from the dates, quotes and map borders of the History pages."
        back={{ to: '/history', label: 'History' }}
        className="mb-5"
      />
      <div className="mb-6">
        <Group label="Deal from">
          <Pill active={scope === 'read'} onClick={() => setScope('read')} label="Pages I have read" />
          <Pill active={scope === 'all'} onClick={() => setScope('all')} label="Every page" />
        </Group>
      </div>
      {isLoading ? (
        <PageStatus>Counting questions…</PageStatus>
      ) : isError || !data ? (
        <PageStatus>
          The quiz could not be prepared.{' '}
          <button type="button" className="underline" onClick={() => void refetch()}>
            Retry
          </button>
        </PageStatus>
      ) : (
        <div className="grid gap-3 md:grid-cols-2">
          {HISTORY_QUIZ_GAMES.map((game) => {
            const count = data[game.kind]
            const ready = count >= game.minimum
            const body = (
              <>
                <span className="flex items-center justify-between gap-3">
                  <span className="text-xl font-semibold text-ink">{game.title}</span>
                  <span className={`text-xs ${ready ? 'text-signal-link' : 'text-ink-muted'}`}>{ready ? 'Play ›' : 'Locked'}</span>
                </span>
                <span className="mt-2 block text-sm leading-6 text-ink-muted">{game.body}</span>
                <span className="mt-4 block text-xs text-ink-secondary">
                  {ready ? `${count.toLocaleString()} to deal from` : `${count} of ${game.minimum} needed`}
                </span>
              </>
            )
            return ready ? (
              <Link key={game.slug} to={`/history/quiz/${game.slug}?scope=${scope}`} className="card block p-5 hover:border-line-strong">
                {body}
              </Link>
            ) : (
              <div key={game.slug} className="card p-5 opacity-60" aria-disabled="true">
                {body}
              </div>
            )
          })}
        </div>
      )}
      {scope === 'read' && data && Object.values(data).every((n) => n === 0) && (
        <p className="mt-6 text-sm text-ink-muted">Mark pages as read to deal from them, or deal from every page.</p>
      )}
    </div>
  )
}
