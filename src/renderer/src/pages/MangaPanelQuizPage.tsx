import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import LibMcRound, { type McQuestion } from '../components/libraryQuiz/LibMcRound'
import { Group, Pill } from '../components/PillGroup'
import { quizSeed } from '@shared/quizCore'
import { buildMangaPanelQuestions } from '@shared/mangaPanelQuiz'
import { mediaUrl } from '@shared/mediaUrl'

// Manga panel quiz: a random page from a locally-linked series appears —
// name the manga it belongs to. Eligibility is every series with attached
// chapters (folders or CBZ); pages are the exact paths the reader streams.
export default function MangaPanelQuizPage() {
  const qc = useQueryClient()
  const [listSource, setListSource] = usePersistedState<'consumed' | 'all'>('quizPanelList', 'consumed')
  const [length, setLength] = usePersistedState<number>('quizPanelLength', 10)
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizPanelTimer', true)

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
      const filter = { scope: listSource, seed }
      const requested = length + 5
      const pool = await qc.fetchQuery({
        queryKey: qk.quiz.mangaPanelPool(filter, requested),
        queryFn: () => api.quiz.mangaPanelPool(filter, requested)
      })
      const built = buildMangaPanelQuestions(pool, seed)
      if (built.length < length) {
        setError(
          `Need ${length} different manga with eligible readable pages — found ${built.length}. Attach more manga folders, choose a shorter round, or widen the page scope.`
        )
        return
      }
      const qs: McQuestion[] = built.map((question) => ({
        key: question.key,
        validKeys: question.validKeys,
        waitForPrompt: true,
        prompt: ({ skip, ready }) => (
          <div className="text-center">
            <p className="text-sm uppercase tracking-widest text-gray-500">
              Which manga is this page from?
            </p>
            <img
              src={mediaUrl(question.answer.pageRelPath) ?? undefined}
              alt="Manga page"
              className="mx-auto mt-4 max-h-[65vh] max-w-full rounded-xl border border-base-700"
              draggable={false}
              onLoad={ready}
              onError={skip}
            />
          </div>
        ),
        // The shared builder guarantees four distinct manga identities.
        options: question.options.map((o) => ({
          key: `media-${o.mediaId}`,
          node: (
            <>
              <CoverImage path={o.coverPath} alt={o.title} className="h-24 w-16 shrink-0" />
              <span className="line-clamp-2 text-base font-medium">{o.title}</span>
            </>
          )
        }))
      }))
      setSettingsSnapshot({ listSource, scope: listSource, length, timerEnabled, seed })
      setQuestions(qs)
      setRound((r) => r + 1)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load manga pages.')
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
        kind="mangaPanel"
        questions={questions}
        settings={settingsSnapshot}
        timed={timerEnabled}
        targetLength={length}
        onPlayAgain={playAgain}
        backTo={{ to: '/quiz', label: 'quizzes' }}
      />
    )
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <PageHeader
        back={{ to: '/quiz', label: 'Quiz' }}
        title="Manga Panel Quiz"
        subtitle="A random page from your local manga appears — name the series."
        className="mb-6"
      />

      <div className="card p-6 space-y-6">
        <Group label="From">
          <Pill active={listSource !== 'all'} onClick={() => setListSource('consumed')} label="Read pages" />
          <Pill active={listSource === 'all'} onClick={() => setListSource('all')} label="All" />
        </Group>
        {listSource === 'all' && <p className="-mt-4 text-sm text-amber-300">Includes unread pages and may contain spoilers.</p>}

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
          {loading ? 'Loading pages…' : 'Start quiz'}
        </button>
      </div>

      <QuizRecord kind="mangaPanel" />
    </div>
  )
}
