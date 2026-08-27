import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useAllCompletedStatuses } from '../lib/hooks'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import LibMcRound, { type McQuestion } from '../components/libraryQuiz/LibMcRound'
import { Group, Pill } from '../components/PillGroup'
import { buildCastQuizQuestions } from '@shared/castQuiz'
import { quizSeed } from '@shared/quizCore'
import type { QuizLibFilter } from '@shared/types'

export default function CastQuizPage() {
  const qc = useQueryClient()
  const completedStatuses = useAllCompletedStatuses()
  const [scope, setScope] = usePersistedState<'consumed' | 'all'>('quizCastScope', 'consumed')
  const [length, setLength] = usePersistedState<number>('quizCastLength', 10)
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizCastTimer', true)
  const [round, setRound] = useState(0)
  const [questions, setQuestions] = useState<McQuestion[] | null>(null)
  const [settingsSnapshot, setSettingsSnapshot] = useState<Record<string, unknown>>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function startGame() {
    setError(null)
    setLoading(true)
    try {
      const seed = quizSeed(`${Date.now()}-${Math.random()}`)
      const filter: QuizLibFilter = { statuses: scope === 'all' ? null : completedStatuses }
      const pool = await qc.fetchQuery({
        queryKey: qk.quiz.castPool(filter),
        queryFn: () => api.quiz.castPool(filter)
      })
      const distinctMedia = new Set(pool.map((item) => item.mediaId)).size
      if (distinctMedia < 4) {
        setError(
          `Need photographed actors across at least 4 eligible movies or TV shows — found ${distinctMedia}. Import or re-import cast, or widen the scope.`
        )
        return
      }

      const built = buildCastQuizQuestions(pool, length, seed)
      if (built.length < length) {
        setError(
          `Only ${built.length} solvable actor questions are available for these filters; choose a shorter round or widen the scope.`
        )
        return
      }
      const qs: McQuestion[] = built.map((question) => ({
        key: question.key,
        validKeys: question.validKeys,
        prompt: (
          <div className="text-center">
            <CoverImage
              path={question.actor.photoPath}
              alt={question.actor.personName}
              rounded="rounded-xl"
              className="mx-auto h-72 w-auto"
            />
            <p className="mt-4 text-2xl font-semibold">{question.actor.personName}</p>
            <p className="mt-2 text-gray-400">Which movie or TV show features this actor?</p>
          </div>
        ),
        options: question.options.map((option) => ({
          key: `media-${option.mediaId}`,
          node: (
            <>
              <CoverImage
                path={option.coverPath}
                alt={option.mediaTitle}
                className="h-24 w-16 shrink-0"
              />
              <span className="line-clamp-2 text-base font-medium">{option.mediaTitle}</span>
            </>
          )
        }))
      }))
      setSettingsSnapshot({ scope, length, timerEnabled, seed })
      setQuestions(qs)
      setRound((value) => value + 1)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load cast credits.')
    } finally {
      setLoading(false)
    }
  }

  if (questions && round > 0) {
    return (
      <LibMcRound
        key={round}
        kind="cast"
        questions={questions}
        settings={settingsSnapshot}
        timed={timerEnabled}
        onPlayAgain={() => void startGame()}
        backTo={{ to: '/quiz', label: 'quizzes' }}
      />
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/quiz', label: 'Quiz' }}
        title="Cast Quiz"
        subtitle="See an actor, then identify a movie or TV show they appeared in."
        className="mb-6"
      />

      <div className="card p-6 space-y-6">
        <Group label="From">
          <Pill active={scope === 'consumed'} onClick={() => setScope('consumed')} label="Completed" />
          <Pill active={scope === 'all'} onClick={() => setScope('all')} label="All" />
        </Group>
        {scope === 'all' && (
          <p className="-mt-4 text-sm text-amber-300">
            Includes in-progress or unseen movies and TV shows and may contain spoilers.
          </p>
        )}

        <Group label="Length">
          <Pill active={length === 5} onClick={() => setLength(5)} label="5" />
          <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
          <Pill active={length === 20} onClick={() => setLength(20)} label="20" />
        </Group>

        <label className="flex cursor-pointer items-center gap-2 text-base text-gray-300">
          <input
            type="checkbox"
            checked={timerEnabled}
            onChange={(event) => setTimerEnabled(event.target.checked)}
          />
          Countdown timer (20s per question)
        </label>

        <p className="text-sm text-gray-400">
          Movie questions use only the first 10 billed cast members. TV cast is not capped.
        </p>
        {error && <p className="text-sm text-red-400">{error}</p>}

        <button className="btn-primary w-full py-3 text-base" disabled={loading} onClick={startGame}>
          {loading ? 'Loading cast…' : 'Start quiz'}
        </button>
      </div>

      <QuizRecord kind="cast" />
    </div>
  )
}
