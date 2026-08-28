import { useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence, SessionFeedback } from '../components/StudySessionFrame'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import QuizTitleAutocomplete from '../components/quiz/QuizTitleAutocomplete'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { useAllCompletedStatuses } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { qk } from '../lib/queryKeys'
import { isNewQuizBest, quizScorePolicy, quizSeed } from '@shared/quizCore'
import {
  hintMovieChain,
  initialMovieChainState,
  movieChainConnectors,
  movieChainScore,
  submitMovieChainTitle,
  undoMovieChain,
  type MovieChainState
} from '@shared/movieChain'
import type {
  QuizConsumptionScope,
  QuizKind,
  QuizMovieChainDifficulty,
  QuizMovieChainQuestion,
  QuizScreenMediaMode,
  QuizScreenTitle
} from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'
interface ChainAttempt {
  title: string
  reason: string
}

const MODE_LABEL: Record<QuizScreenMediaMode, string> = {
  movie: 'Movies',
  tv: 'TV shows',
  both: 'Both'
}
const DIFFICULTY_LABEL: Record<QuizMovieChainDifficulty, string> = {
  easy: 'Easy',
  normal: 'Normal',
  hard: 'Hard'
}
const KIND: Record<QuizMovieChainDifficulty, QuizKind> = {
  easy: 'movieChainEasy',
  normal: 'movieChainNormal',
  hard: 'movieChainHard'
}

function describeRoles(roles: string[]): string {
  return roles.join(' / ') || 'cast member'
}

export default function MovieChainPage() {
  const qc = useQueryClient()
  const completedStatuses = useAllCompletedStatuses()
  const [scope, setScope] = usePersistedState<QuizConsumptionScope>('movieChainScope', 'consumed')
  const [mediaMode, setMediaMode] = usePersistedState<QuizScreenMediaMode>('movieChainMode', 'both')
  const [difficulty, setDifficulty] = usePersistedState<QuizMovieChainDifficulty>('movieChainDifficulty', 'normal')
  const kind = KIND[difficulty]
  const [phase, setPhase] = useState<Phase>('setup')
  const [question, setQuestion] = useState<QuizMovieChainQuestion | null>(null)
  const [state, setState] = useState<MovieChainState | null>(null)
  const [seed, setSeed] = useState(0)
  const [attempts, setAttempts] = useState<ChainAttempt[]>([])
  const [message, setMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [newBest, setNewBest] = useState(false)
  const loggedRef = useRef(false)
  const history = useQuery({
    queryKey: qk.quiz.history(kind),
    queryFn: () => api.quiz.history(kind)
  })
  const availabilityRequest = useMemo(
    () => ({ scope, statuses: scope === 'consumed' ? completedStatuses : null }),
    [scope, completedStatuses]
  )
  const availability = useQuery({
    queryKey: qk.quiz.availability(availabilityRequest),
    queryFn: () => api.quiz.availability(availabilityRequest)
  })
  const modeAvailability = availability.data?.screenGameOptions.find(
    (option) => option.mediaMode === mediaMode
  )
  const availablePairs = modeAvailability?.movieChain[difficulty] ?? 0
  const titleByKey = useMemo(
    () => new Map(question?.titles.map((title) => [title.key, title]) ?? []),
    [question]
  )
  const score = question && state ? movieChainScore(state, question.optimalDistance) : 0

  async function startGame() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = {
        kind: 'movieChain' as const,
        seed: nextSeed,
        scope,
        statuses: scope === 'consumed' ? completedStatuses : null,
        length: 1,
        options: { screenMediaMode: mediaMode, movieChainDifficulty: difficulty }
      }
      const result = await qc.fetchQuery({
        queryKey: qk.quiz.challengePool(request),
        queryFn: () => api.quiz.challengePool(request)
      })
      const built = result[0]
      if (!built || built.kind !== 'movieChain') {
        setError('No title pair exists at that exact distance. Choose another difficulty, widen the scope, or import more cast and director credits.')
        return
      }
      setQuestion(built)
      setState(initialMovieChainState(built))
      setSeed(nextSeed)
      setAttempts([])
      setMessage(null)
      setSaveError(null)
      setNewBest(false)
      loggedRef.current = false
      setPhase('play')
    } catch (caught) {
      setError('The connection graph could not be loaded. Try again or inspect Logs for the underlying error.')
      throw caught
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalState: MovieChainState) {
    if (!question || loggedRef.current || saving) return
    setSaving(true)
    setSaveError(null)
    const completed = finalState.status === 'complete'
    const finalScore = movieChainScore(finalState, question.optimalDistance)
    const settings = {
      correct: completed ? 1 : 0,
      attempted: 1,
      scorePolicy: 'points' as const,
      playMode: 'solo' as const,
      seed,
      scope,
      mediaMode,
      difficulty,
      completed,
      start: { key: question.start.key, label: question.start.label },
      target: { key: question.target.key, label: question.target.label },
      path: finalState.pathKeys.map((key) => ({ key, label: titleByKey.get(key)?.label ?? key })),
      optimalDistance: question.optimalDistance,
      maxMoves: question.maxMoves,
      acceptedMoves: finalState.acceptedMoves,
      invalidGuesses: finalState.invalidGuesses,
      hintsUsed: finalState.hintsUsed
    }
    setNewBest(
      isNewQuizBest(
        { score: finalScore, total: 1, settings },
        history.data?.best ?? null,
        quizScorePolicy(kind),
        kind
      )
    )
    try {
      await api.quiz.logSession({ kind, score: finalScore, total: 1, bestStreak: 0, settings })
      loggedRef.current = true
      await qc.invalidateQueries({ queryKey: qk.quiz.history(kind) })
      setPhase('summary')
    } catch (caught) {
      setSaveError('The result was not saved. Retry before leaving this route.')
      throw caught
    } finally {
      setSaving(false)
    }
  }

  function submitTitle(title: QuizScreenTitle) {
    if (!question || !state || saving) return
    const transition = submitMovieChainTitle(question, state, title.key)
    setState(transition.state)
    if (transition.outcome === 'invalid' || transition.outcome === 'repeated') {
      setAttempts((values) => [
        ...values,
        {
          title: title.label,
          reason: transition.outcome === 'repeated' ? 'Already used in this route' : 'No eligible actor or director connects these titles'
        }
      ])
      setMessage('That title does not advance the route. The score has been reduced by 25 points.')
    } else if (transition.outcome === 'moveLimit') {
      setMessage('The move limit is full. Undo the last step before choosing another title.')
    } else if (transition.outcome === 'complete') {
      setMessage(null)
      void finish(transition.state)
    } else {
      setMessage(null)
    }
  }

  function requestHint() {
    if (!question || !state || saving) return
    const result = hintMovieChain(question, state)
    setState(result.state)
    if (result.outcome === 'undoRequired') {
      setMessage('The target cannot fit inside the remaining moves from here. Undo a step first.')
      return
    }
    setMessage(`Shortest-route hint: ${titleByKey.get(result.key!)?.label ?? 'title unavailable'}. Selecting it is still required.`)
  }

  async function giveUp() {
    if (!state || saving) return
    const ok = await confirmDialog('End this route and record a score of zero?', {
      confirmLabel: 'Give up'
    })
    if (!ok) return
    const next: MovieChainState = { ...state, status: 'gaveUp' }
    setState(next)
    void finish(next)
  }

  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader
          back={{ to: '/quiz', label: 'Quiz' }}
          title="Movie Chain"
          subtitle="Reach a target title through shared main-cast actors and directors."
          className="mb-6"
        />
        <div className="card space-y-6 p-6">
          <Group label="Library">
            {(['movie', 'tv', 'both'] as const).map((mode) => (
              <Pill
                key={mode}
                active={mediaMode === mode}
                disabled={
                  availability.isSuccess &&
                  Object.values(
                    availability.data.screenGameOptions.find((item) => item.mediaMode === mode)?.movieChain ?? {}
                  ).every((count) => count === 0)
                }
                onClick={() => setMediaMode(mode)}
                label={MODE_LABEL[mode]}
              />
            ))}
          </Group>
          <Group label="Distance">
            {(['easy', 'normal', 'hard'] as const).map((value) => (
              <Pill
                key={value}
                active={difficulty === value}
                disabled={
                  availability.isSuccess &&
                  (modeAvailability?.movieChain[value] ?? 0) === 0
                }
                onClick={() => setDifficulty(value)}
                label={`${DIFFICULTY_LABEL[value]} · ${value === 'easy' ? 2 : value === 'normal' ? 3 : 4} links`}
              />
            ))}
          </Group>
          <Group label="Spoiler boundary">
            <Pill active={scope === 'consumed'} onClick={() => setScope('consumed')} label="Completed" />
            <Pill active={scope === 'all'} onClick={() => setScope('all')} label="All" />
          </Group>
          {scope === 'all' && (
            <p className="text-sm text-amber-300">Includes in-progress or unseen titles and may contain spoilers.</p>
          )}
          {availability.isSuccess && availablePairs === 0 && (
            <p className="text-sm text-gray-400">No start and target pair exists at this exact distance.</p>
          )}
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="btn-primary" disabled={loading || availability.isLoading || availablePairs === 0} onClick={() => void startGame()}>
            {loading ? 'Building route…' : 'Start chain'}
          </button>
        </div>
        <QuizRecord kind={kind} />
      </div>
    )
  }

  if (!question || !state) return null
  const movesUsed = state.pathKeys.length - 1

  if (phase === 'summary') {
    return (
      <StudySessionFrame title="Movie Chain" subtitle={`${DIFFICULTY_LABEL[difficulty]} · ${MODE_LABEL[mediaMode]}`}>
        <div className="text-center">
          <h2 className="text-4xl font-semibold tabular-nums text-white">{score} points</h2>
          <p className="mt-3 text-gray-400">
            {state.status === 'complete' ? `Target reached in ${movesUsed} moves.` : 'Route ended before the target.'}
          </p>
          <p className="mt-1 text-sm text-gray-500">{state.invalidGuesses} invalid guesses · {state.hintsUsed} hints</p>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New {DIFFICULTY_LABEL[difficulty]} personal best.</p>}
          <div className="mt-7 flex justify-center gap-3">
            <button className="btn-primary" onClick={() => void startGame()}>Play again</button>
            <button className="btn-ghost" onClick={() => setPhase('setup')}>Change setup</button>
          </div>
        </div>
      </StudySessionFrame>
    )
  }

  return (
    <StudySessionFrame
      title="Movie Chain"
      subtitle={`${DIFFICULTY_LABEL[difficulty]} · Reach the target in at most ${question.maxMoves} moves.`}
      progress={{ current: movesUsed, total: question.maxMoves, label: 'Moves used' }}
      actions={
        <>
          <span className="pill tabular-nums">{score} points</span>
          <button className="btn-ghost" disabled={saving} onClick={() => void giveUp()}>Give up</button>
        </>
      }
      rail={
        <>
          <SessionEvidence title="Target">
            <CoverImage path={question.target.imagePath} alt={question.target.label} className="mb-3 aspect-[2/3] w-24" />
            <p className="font-semibold text-gray-200">{question.target.label}</p>
            <p>{question.optimalDistance} links is the shortest possible route.</p>
          </SessionEvidence>
          <SessionEvidence title="Scoring">
            <p>Starts at 1000. Extra accepted moves cost 100, invalid titles cost 25, and hints cost 150.</p>
          </SessionEvidence>
          <SessionEvidence title="Invalid attempts">
            {attempts.length === 0 ? <p>None.</p> : attempts.slice(-6).reverse().map((attempt, index) => (
              <p key={`${attempt.title}-${index}`} className="mb-2"><span className="text-gray-300">{attempt.title}</span><br />{attempt.reason}</p>
            ))}
          </SessionEvidence>
        </>
      }
      feedback={saveError ? (
        <SessionFeedback tone="incorrect" title="Result not saved">
          <p>{saveError}</p>
          <button className="btn-ghost mt-3" disabled={saving} onClick={() => void finish(state)}>Retry save</button>
        </SessionFeedback>
      ) : message ? (
        <SessionFeedback tone="neutral" title="Route update">{message}</SessionFeedback>
      ) : undefined}
    >
      <div className="flex items-center justify-between gap-4 rounded-xl border border-base-600 bg-base-800 p-4">
        <div className="flex min-w-0 items-center gap-4">
          <CoverImage path={question.start.imagePath} alt={question.start.label} className="h-28 w-[74px] shrink-0" />
          <div className="min-w-0">
            <p className="label">Starting title</p>
            <p className="mt-1 truncate text-xl font-semibold text-white">{question.start.label}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="label">Goal</p>
          <p className="mt-1 text-sm font-semibold text-accent">{question.target.label}</p>
        </div>
      </div>

      <ol className="mt-5 space-y-3" aria-label="Current title chain">
        {state.pathKeys.map((key, index) => {
          const title = titleByKey.get(key)
          if (!title) return null
          const previousKey = state.pathKeys[index - 1]
          const connectors = previousKey ? movieChainConnectors(question, previousKey, key) : []
          return (
            <li key={`${key}-${index}`}>
              {connectors.length > 0 && (
                <div className="mb-2 ml-8 border-l border-accent/40 pl-4 text-xs text-gray-400">
                  {connectors.map((connector) => (
                    <p key={connector.personId}>
                      <span className="font-medium text-gray-200">{connector.name}</span> · {describeRoles(connector.leftRoles)} / {describeRoles(connector.rightRoles)}
                    </p>
                  ))}
                </div>
              )}
              <div className={`flex items-center gap-4 rounded-lg border p-3 ${key === question.target.key ? 'border-accent bg-accent/5' : 'border-base-600 bg-base-900'}`}>
                <CoverImage path={title.imagePath} alt={title.label} className="h-20 w-[54px] shrink-0" />
                <div>
                  <p className="text-xs text-gray-500">{index === 0 ? 'Start' : `Move ${index}`}</p>
                  <p className="font-semibold text-white">{title.label}</p>
                  <p className="mt-1 text-xs text-gray-500">{title.releaseYear ?? 'Year unknown'} · {title.mediaType === 'movie' ? 'Movie' : 'TV'}</p>
                </div>
              </div>
            </li>
          )
        })}
      </ol>

      {state.status === 'playing' && (
        <div className="mt-6 border-t border-base-700 pt-5">
          {state.hintedKey && (
            <p className="mb-3 rounded-lg border border-accent/30 bg-accent/5 px-4 py-3 text-sm text-gray-200">
              Suggested next title: <span className="font-semibold text-accent">{titleByKey.get(state.hintedKey)?.label}</span>
            </p>
          )}
          <QuizTitleAutocomplete
            titles={question.titles}
            excludedKeys={state.pathKeys}
            disabled={saving || movesUsed >= question.maxMoves}
            resetKey={`${state.pathKeys.join(':')}-${state.invalidGuesses}`}
            submitLabel="Add title"
            onSubmit={submitTitle}
          />
          <div className="mt-3 flex flex-wrap gap-2">
            <button className="btn-ghost" disabled={state.pathKeys.length <= 1 || saving} onClick={() => {
              setState(undoMovieChain(state))
              setMessage(null)
            }}>Undo last move</button>
            <button className="btn-ghost" disabled={saving || state.hintedKey != null} onClick={requestHint}>Reveal next title</button>
          </div>
          {attempts.length > 0 && (
            <div className="mt-4 space-y-2 rounded-lg border border-base-600 bg-base-900 p-4 text-sm text-gray-400 lg:hidden">
              <p className="font-semibold text-gray-200">Recent invalid attempts</p>
              {attempts.slice(-4).reverse().map((attempt, index) => (
                <p key={`${attempt.title}-mobile-${index}`}>{attempt.title} · {attempt.reason}</p>
              ))}
            </div>
          )}
        </div>
      )}
    </StudySessionFrame>
  )
}
