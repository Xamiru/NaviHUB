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
import { buildVaQuizQuestions, vaAppearanceKey } from '@shared/vaQuiz'
import { quizSeed } from '@shared/quizCore'
import type { QuizLibFilter } from '@shared/types'

export default function VaQuizPage() {
  const qc = useQueryClient()
  const completedStatuses = useAllCompletedStatuses()
  const [scope, setScope] = usePersistedState<'consumed' | 'all'>('quizVaScope', 'consumed')
  const [length, setLength] = usePersistedState<number>('quizVaLength', 10)
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizVaTimer', true)
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
        queryKey: qk.quiz.vaPool(filter),
        queryFn: () => api.quiz.vaPool(filter)
      })
      const built = buildVaQuizQuestions(pool, length, seed)
      if (built.length < length) {
        setError(
          `Only ${built.length} solvable same-voice questions are available for these filters; choose a shorter round, widen the scope, or re-import anime cast.`
        )
        return
      }

      const qs: McQuestion[] = built.map((question) => ({
        key: question.key,
        validKeys: question.validKeys,
        prompt: (
          <div className="text-center">
            <CoverImage
              path={question.source.characterImagePath}
              alt={question.source.characterName}
              rounded="rounded-xl"
              className="mx-auto h-72 w-auto"
            />
            <p className="mt-4 text-2xl font-semibold">{question.source.characterName}</p>
            <p className="text-base text-gray-500">{question.source.mediaTitle}</p>
            <p className="mt-2 text-gray-400">
              Which other character shares a Japanese voice actor?
            </p>
          </div>
        ),
        reveal: (
          <span>
            {question.source.characterName} and {question.answer.characterName} are voiced by{' '}
            <span className="font-semibold text-white">
              {question.sharedPersonNames.join(' and ')}
            </span>
            .
          </span>
        ),
        options: question.options.map((option) => ({
          key: vaAppearanceKey(option),
          node: (
            <>
              <CoverImage
                path={option.characterImagePath}
                alt={option.characterName}
                className="h-24 w-16 shrink-0"
              />
              <span className="min-w-0">
                <span className="line-clamp-2 text-base font-medium">
                  {option.characterName}
                </span>
                <span className="block truncate text-sm text-gray-500">{option.mediaTitle}</span>
              </span>
            </>
          )
        }))
      }))
      setSettingsSnapshot({ scope, length, timerEnabled, seed })
      setQuestions(qs)
      setRound((value) => value + 1)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load anime voice credits.')
    } finally {
      setLoading(false)
    }
  }

  if (questions && round > 0) {
    return (
      <LibMcRound
        key={round}
        kind="va"
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
        title="Voice Actor Quiz"
        subtitle="Connect characters from different anime through their Japanese voice actor."
        className="mb-6"
      />

      <div className="card p-6 space-y-6">
        <Group label="From">
          <Pill
            active={scope === 'consumed'}
            onClick={() => setScope('consumed')}
            label="Completed"
          />
          <Pill active={scope === 'all'} onClick={() => setScope('all')} label="All" />
        </Group>
        {scope === 'all' && (
          <p className="-mt-4 text-sm text-amber-300">
            Includes in-progress or unseen anime and may contain spoilers.
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
          Options match the answer character's gender, then prefer similar role prominence and
          release era. Re-import anime cast to populate gender for existing characters.
        </p>
        {error && <p className="text-sm text-red-400">{error}</p>}

        <button
          className="btn-primary w-full py-3 text-base"
          disabled={loading}
          onClick={startGame}
        >
          {loading ? 'Loading voice connections…' : 'Start quiz'}
        </button>
      </div>

      <QuizRecord kind="va" />
    </div>
  )
}
