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
import { MEDIA_CONFIGS } from '../lib/mediaConfig'
import type { QuizSynopsisFilter } from '@shared/types'
import { quizSeed } from '@shared/quizCore'
import { buildSynopsisQuizQuestions } from '@shared/synopsisQuiz'

// Default scope: the watched-media types. Every type with synopses is one
// click away; the choice persists like every other setup option.
const DEFAULT_TYPES = ['anime', 'movie', 'tv']
// Synopsis quiz: a description excerpt appears — guess which title in your
// library it describes. Wrong options share era/genres where possible.
export default function SynopsisQuizPage() {
  const completedStatuses = useAllCompletedStatuses()
  const qc = useQueryClient()

  const [types, setTypes] = usePersistedState<string[]>('quizSynTypes', DEFAULT_TYPES)
  const [listSource, setListSource] = usePersistedState<'safe' | 'completed'>('quizSynList', 'safe')
  const [textOnly, setTextOnly] = usePersistedState('quizSynTextOnly', false)
  const [length, setLength] = usePersistedState<number>('quizSynLength', 10)
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizSynTimer', true)

  const [round, setRound] = useState(0)
  const [questions, setQuestions] = useState<McQuestion[] | null>(null)
  const [settingsSnapshot, setSettingsSnapshot] = useState<Record<string, unknown>>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function startGame() {
    setError(null)
    setLoading(true)
    try {
      const filter: QuizSynopsisFilter = {
        completedStatuses,
        includeSafeUnseen: listSource === 'safe',
        mediaTypes: types.length > 0 ? types : null,
        requireCover: !textOnly
      }
      const pool = await qc.fetchQuery({
        queryKey: qk.quiz.synopsisPool(filter),
        queryFn: () => api.quiz.synopsisPool(filter)
      })
      const seed = quizSeed(`${Date.now()}-${Math.random()}`)
      const built = buildSynopsisQuizQuestions(pool, length, seed)
      if (built.length < length) {
        setError(
          `Need ${length} eligible questions, with at least 4 titles in each selected media type. Found ${built.length}. Widen the types, choose a shorter round, or import more synopses.`
        )
        return
      }
      const qs: McQuestion[] = built.map((question) => ({
        key: question.key,
        validKeys: question.validKeys,
        prompt: (
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Which title is this the synopsis of?
            </p>
            <p className="mx-auto mt-4 max-w-2xl text-left text-lg leading-relaxed text-gray-300">
              {question.excerpt}
            </p>
          </div>
        ),
        options: question.options.map((o) => ({
          key: `media-${o.mediaId}`,
          node: (
            <>
              {!textOnly && (
                <CoverImage path={o.coverPath} alt={o.title} className="h-24 w-16 shrink-0" />
              )}
              <span className="line-clamp-2 text-base font-medium">{o.title}</span>
            </>
          )
        })),
        reveal: (
          <p className="text-sm text-gray-400">
            {question.answer.title} · {question.answer.mediaType}
          </p>
        )
      }))
      setSettingsSnapshot({
        types,
        listSource,
        scope: 'consumed',
        length,
        timerEnabled,
        textOnly,
        seed
      })
      setQuestions(qs)
      setRound((r) => r + 1)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load synopses.')
    } finally {
      setLoading(false)
    }
  }

  function playAgain() {
    void startGame()
  }

  if (questions && round > 0) {
    return (
      <LibMcRound
        key={round}
        kind="synopsis"
        questions={questions}
        settings={settingsSnapshot}
        timed={timerEnabled}
        onPlayAgain={playAgain}
        backTo={{ to: '/quiz', label: 'quizzes' }}
      />
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/quiz', label: 'Quiz' }}
        title="Synopsis Quiz"
        subtitle="A description excerpt appears — guess which title it belongs to."
        className="mb-6"
      />

      <div className="card p-6 space-y-6">
        <Group label="Types">
          <Pill active={types.length === 0} onClick={() => setTypes([])} label="All types" />
          {MEDIA_CONFIGS.map((cfg) => (
            <Pill
              key={cfg.key}
              active={types.includes(cfg.key)}
              onClick={() =>
                setTypes(
                  types.includes(cfg.key) ? types.filter((t) => t !== cfg.key) : [...types, cfg.key]
                )
              }
              label={cfg.plural}
            />
          ))}
        </Group>

        <Group label="From">
          <Pill
            active={listSource === 'safe'}
            onClick={() => setListSource('safe')}
            label="Safe library"
          />
          <Pill
            active={listSource === 'completed'}
            onClick={() => setListSource('completed')}
            label="Completed only"
          />
        </Group>
        {listSource === 'safe' && (
          <p className="-mt-4 text-sm text-gray-400">
            Includes completed titles plus first entries from unfinished or planned series. Known
            sequels are excluded.
          </p>
        )}

        <Group label="Length">
          <Pill active={length === 5} onClick={() => setLength(5)} label="5" />
          <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
          <Pill active={length === 20} onClick={() => setLength(20)} label="20" />
        </Group>

        <div className="space-y-2 pt-1">
          <label className="flex cursor-pointer items-center gap-2 text-base text-gray-300">
            <input
              type="checkbox"
              checked={textOnly}
              onChange={(e) => setTextOnly(e.target.checked)}
            />
            Text-only options (harder)
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-base text-gray-300">
            <input
              type="checkbox"
              checked={timerEnabled}
              onChange={(e) => setTimerEnabled(e.target.checked)}
            />
            Countdown timer (20s per question)
          </label>
        </div>

        {error && <p className="text-sm text-red-400">{error}</p>}

        <button className="btn-primary w-full py-3 text-base" disabled={loading} onClick={startGame}>
          {loading ? 'Loading titles…' : 'Start quiz'}
        </button>
      </div>

      <QuizRecord kind="synopsis" />
    </div>
  )
}
