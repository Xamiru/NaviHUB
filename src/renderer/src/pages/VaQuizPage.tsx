import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { api } from '../lib/api'
import { usePersistedState } from '../lib/navState'
import { useAllCompletedStatuses } from '../lib/hooks'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import LibMcRound, { type McQuestion } from '../components/libraryQuiz/LibMcRound'
import { Group, Pill } from '../components/PillGroup'
import { vaAppearanceKey, vaPersonKey } from '@shared/vaQuiz'
import { quizSeed } from '@shared/quizCore'
import type { QuizLibFilter } from '@shared/types'
import { loadQuizDefaults } from '../lib/quizPrefs'

export default function VaQuizPage() {
  const completedStatuses = useAllCompletedStatuses()
  const [scope, setScope] = usePersistedState<'consumed' | 'all'>('quizVaScope', 'consumed')
  const [length, setLength] = usePersistedState<number>('quizVaLength', 10)
  // Seeds a fresh visit only (Settings → Readers & quizzes).
  const [quizDefaults] = useState(loadQuizDefaults)
  const [timerEnabled, setTimerEnabled] = usePersistedState('quizVaTimer', quizDefaults.timer)
  // 'shared': which other character shares the voice; 'name': who voices this character.
  const [mode, setMode] = usePersistedState<'shared' | 'name'>('quizVaMode', 'shared')
  const kind = mode === 'name' ? 'vaName' : 'va'
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
      if (mode === 'name') {
        const named = await api.quiz.vaNameQuestions(filter, length, seed)
        if (named.length < length) {
          setError(
            `Only ${named.length} name-the-voice-actor questions are available (voice actors need photos); choose a shorter round, widen the scope, or re-import anime cast.`
          )
          return
        }
        setQuestions(
          named.map((question) => ({
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
                <p className="mt-2 text-gray-400">Who is this character's Japanese voice actor?</p>
              </div>
            ),
            reveal: (
              <span>
                <span className="font-semibold text-white">{question.answer.name}</span>
                {question.otherRoles.length > 0
                  ? ` also voices ${question.otherRoles
                      .map((role) => `${role.characterName} (${role.mediaTitle})`)
                      .join(', ')} in your library.`
                  : ' voices this character.'}
              </span>
            ),
            recap: {
              title: `${question.source.characterName} (${question.source.mediaTitle})`,
              imagePath: question.source.characterImagePath
            },
            options: question.options.map((option) => ({
              key: vaPersonKey(option.personId),
              label: option.name,
              node: (
                <>
                  <CoverImage path={option.photoPath} alt={option.name} className="h-24 w-16 shrink-0" />
                  <span className="line-clamp-2 text-base font-medium">{option.name}</span>
                </>
              )
            }))
          }))
        )
        setSettingsSnapshot({ scope, length, timerEnabled, mode, seed })
        setRound((value) => value + 1)
        return
      }
      const built = await api.quiz.vaQuestions(filter, length, seed)
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
        recap: {
          title: `${question.source.characterName} (${question.source.mediaTitle})`,
          imagePath: question.source.characterImagePath
        },
        options: question.options.map((option) => ({
          key: vaAppearanceKey(option),
          label: `${option.characterName} (${option.mediaTitle})`,
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
      setSettingsSnapshot({ scope, length, timerEnabled, mode, seed })
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
        kind={kind}
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
        <Group label="Mode">
          <Pill active={mode === 'shared'} onClick={() => setMode('shared')} label="Shared voice" />
          <Pill active={mode === 'name'} onClick={() => setMode('name')} label="Name the voice actor" />
        </Group>
        <p className="-mt-4 text-sm text-gray-400">
          {mode === 'shared'
            ? 'Find the character from another anime who has the same Japanese voice actor.'
            : 'Pick the Japanese voice actor from four photos. Favours voice actors heard across several of your shows.'}
        </p>
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
          Only each show's ten best-known characters appear. Options match the answer's gender.
          Re-import anime cast to populate gender for existing characters.
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

      <QuizRecord kind={kind} />
    </div>
  )
}
