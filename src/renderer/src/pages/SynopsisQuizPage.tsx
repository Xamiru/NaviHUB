import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useAllWatchedStatuses } from '../lib/hooks'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import LibMcRound, { type McQuestion } from '../components/libraryQuiz/LibMcRound'
import { Group, Pill } from '../components/PillGroup'
import { MEDIA_CONFIGS } from '../lib/mediaConfig'
import type { QuizSynopsisItem } from '@shared/types'
import { pickDistractors } from '@shared/quizDistractors'
import { shuffle } from '@shared/shuffle'

// Default scope: the watched-media types. Every type with synopses is one
// click away; the choice persists like every other setup option.
const DEFAULT_TYPES = ['anime', 'movie', 'tv']
const EXCERPT_MAX = 320

function excerpt(text: string): string {
  const flat = text.replace(/\s+/g, ' ').trim()
  if (flat.length <= EXCERPT_MAX) return flat
  const cut = flat.slice(0, EXCERPT_MAX)
  const sp = cut.lastIndexOf(' ')
  return (sp > EXCERPT_MAX * 0.6 ? cut.slice(0, sp) : cut) + '…'
}

// Synopsis quiz: a description excerpt appears — guess which title in your
// library it describes. Wrong options share era/genres where possible.
export default function SynopsisQuizPage() {
  const watchedStatuses = useAllWatchedStatuses()

  const [types, setTypes] = usePersistedState<string[]>('quizSynTypes', DEFAULT_TYPES)
  const [listSource, setListSource] = usePersistedState<'watched' | 'all'>('quizSynList', 'watched')
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
      const pool = await api.quiz.synopsisPool({
        statuses: listSource === 'all' ? null : watchedStatuses,
        mediaTypes: types.length > 0 ? types : null
      })
      if (pool.length < 4) {
        setError(
          `Need at least 4 titles with a synopsis and cover — found ${pool.length}. Widen the filters or import more titles.`
        )
        return
      }
      const seeds = shuffle(pool).slice(0, length)
      const qs: McQuestion[] = seeds.map((seed) => {
        const distractors = pickDistractors(pool, seed, 3)
        return {
          key: `syn-${seed.mediaId}`,
          correctKey: seed.mediaId,
          prompt: (
            <div className="text-center">
              <p className="text-sm uppercase tracking-widest text-gray-500">
                Which title is this the synopsis of?
              </p>
              <p className="mx-auto mt-4 max-w-2xl text-left text-lg leading-relaxed text-gray-300">
                {excerpt(seed.synopsis)}
              </p>
            </div>
          ),
          options: shuffle([seed, ...distractors]).map((o) => ({
            key: o.mediaId,
            node: (
              <>
                <CoverImage path={o.coverPath} alt={o.title} className="h-24 w-16 shrink-0" />
                <span className="line-clamp-2 text-base font-medium">{o.title}</span>
              </>
            )
          }))
        }
      })
      setSettingsSnapshot({ types, listSource, length, timerEnabled })
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
          {/* Multi-select media types; empty selection means every type. */}
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
          <Pill active={listSource === 'watched'} onClick={() => setListSource('watched')} label="Watched" />
          <Pill active={listSource === 'all'} onClick={() => setListSource('all')} label="All" />
        </Group>

        <Group label="Length">
          <Pill active={length === 5} onClick={() => setLength(5)} label="5" />
          <Pill active={length === 10} onClick={() => setLength(10)} label="10" />
          <Pill active={length === 20} onClick={() => setLength(20)} label="20" />
        </Group>

        <div className="space-y-2 pt-1">
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
