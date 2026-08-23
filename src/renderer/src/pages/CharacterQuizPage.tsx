import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useAllWatchedStatuses } from '../lib/hooks'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import LibMcRound, { type McQuestion } from '../components/libraryQuiz/LibMcRound'
import { Group, Pill } from '../components/PillGroup'
import { pickDistractors } from '@shared/quizDistractors'
import { shuffle } from '@shared/shuffle'

// Character quiz: a portrait appears, you name the title it belongs to.
// Distractor titles share the answer's era/genres where the library allows.
export default function CharacterQuizPage() {
  const watchedStatuses = useAllWatchedStatuses()

  const [listSource, setListSource] = usePersistedState<'watched' | 'all'>('quizCharList', 'watched')
  const [length, setLength] = usePersistedState<number>('quizCharLength', 10)
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizCharTimer', true)

  const [round, setRound] = useState(0)
  const [questions, setQuestions] = useState<McQuestion[] | null>(null)
  const [settingsSnapshot, setSettingsSnapshot] = useState<Record<string, unknown>>({})
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function startGame() {
    setError(null)
    setLoading(true)
    try {
      const pool = await api.quiz.characterPool({
        statuses: listSource === 'all' ? null : watchedStatuses
      })
      const distinctMedia = new Set(pool.map((p) => p.mediaId)).size
      if (pool.length === 0 || distinctMedia < 4) {
        setError(
          `Need characters with portraits from at least 4 different titles — found ${distinctMedia}. Import cast for your titles first, or widen the filters.`
        )
        return
      }
      const seeds = shuffle(pool).slice(0, length)
      const qs: McQuestion[] = seeds.map((seed) => {
        // pickDistractors keys on mediaId, so a distractor title never shares
        // the answer's title (and its covers stay distinct within a question).
        const distractors = pickDistractors(pool, seed, 3)
        return {
          key: `char-${seed.characterId}`,
          correctKey: seed.mediaId,
          prompt: (
            <div className="text-center">
              <CoverImage
                path={seed.imagePath}
                alt={seed.name}
                rounded="rounded-xl"
                className="mx-auto h-72 w-auto"
              />
              <p className="mt-4 text-2xl font-semibold">{seed.name}</p>
              {seed.nameNative && <p className="text-base text-gray-500">{seed.nameNative}</p>}
              <p className="mt-2 text-gray-400">Which title is this character from?</p>
            </div>
          ),
          options: shuffle([seed, ...distractors]).map((o) => ({
            key: o.mediaId,
            node: (
              <>
                <CoverImage path={o.coverPath} alt={o.mediaTitle} className="h-24 w-16 shrink-0" />
                <span className="line-clamp-2 text-base font-medium">{o.mediaTitle}</span>
              </>
            )
          }))
        }
      })
      setSettingsSnapshot({ listSource, length, timerEnabled })
      setQuestions(qs)
      setRound((r) => r + 1)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load characters.')
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
        kind="character"
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
        title="Character Quiz"
        subtitle="A portrait appears — name the title they belong to."
        className="mb-6"
      />

      <div className="card p-6 space-y-6">
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
          {loading ? 'Loading characters…' : 'Start quiz'}
        </button>
      </div>

      <QuizRecord kind="character" />
    </div>
  )
}
