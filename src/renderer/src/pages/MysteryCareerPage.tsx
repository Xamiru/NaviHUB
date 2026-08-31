import { useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence, SessionFeedback } from '../components/StudySessionFrame'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import QuizPersonAutocomplete from '../components/quiz/QuizPersonAutocomplete'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { useAllCompletedStatuses } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { qk } from '../lib/queryKeys'
import { isNewQuizBest, quizScorePolicy, quizSeed } from '@shared/quizCore'
import { mysteryCareerScore } from '@shared/mysteryCareer'
import type {
  QuizCareerPerson,
  QuizConsumptionScope,
  QuizMysteryCareerQuestion,
  QuizScreenMediaMode
} from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'
type Outcome = 'playing' | 'solved' | 'failed' | 'gaveUp'

const MODE_LABEL: Record<QuizScreenMediaMode, string> = {
  movie: 'Movies',
  tv: 'TV shows',
  both: 'Both'
}

export default function MysteryCareerPage() {
  const qc = useQueryClient()
  const completedStatuses = useAllCompletedStatuses()
  const [scope, setScope] = usePersistedState<QuizConsumptionScope>('mysteryCareerScope', 'consumed')
  const [mediaMode, setMediaMode] = usePersistedState<QuizScreenMediaMode>('mysteryCareerMode', 'both')
  const [phase, setPhase] = useState<Phase>('setup')
  const [question, setQuestion] = useState<QuizMysteryCareerQuestion | null>(null)
  const [guessedKeys, setGuessedKeys] = useState<string[]>([])
  const [outcome, setOutcome] = useState<Outcome>('playing')
  const [seed, setSeed] = useState(0)
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [newBest, setNewBest] = useState(false)
  const loggedRef = useRef(false)
  const interactionLockedRef = useRef(false)
  const saveLockedRef = useRef(false)
  const history = useQuery({
    queryKey: qk.quiz.history('mysteryCareer'),
    queryFn: () => api.quiz.history('mysteryCareer')
  })
  const availabilityRequest = useMemo(
    () => ({ scope, statuses: scope === 'consumed' ? completedStatuses : null }),
    [scope, completedStatuses]
  )
  const availability = useQuery({
    queryKey: qk.quiz.availability(availabilityRequest),
    queryFn: () => api.quiz.availability(availabilityRequest)
  })
  const available = availability.data?.screenGameOptions.find(
    (option) => option.mediaMode === mediaMode
  )?.mysteryCareer ?? 0
  const personByKey = useMemo(
    () => new Map(question?.people.map((person) => [person.key, person]) ?? []),
    [question]
  )
  const target = question ? personByKey.get(question.targetKey) ?? null : null
  const score = question
    ? mysteryCareerScore(outcome === 'solved', guessedKeys.length, question.maxGuesses)
    : 0

  async function startGame() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = {
        kind: 'mysteryCareer' as const,
        seed: nextSeed,
        scope,
        statuses: scope === 'consumed' ? completedStatuses : null,
        length: 1,
        options: { screenMediaMode: mediaMode }
      }
      const result = await qc.fetchQuery({
        queryKey: qk.quiz.challengePool(request),
        queryFn: () => api.quiz.challengePool(request)
      })
      const built = result[0]
      if (!built || built.kind !== 'mysteryCareer') {
        setError('This selection needs more actors or directors with at least six eligible credits.')
        return
      }
      setQuestion(built)
      setGuessedKeys([])
      setOutcome('playing')
      setSeed(nextSeed)
      setSaveError(null)
      setNewBest(false)
      loggedRef.current = false
      interactionLockedRef.current = false
      saveLockedRef.current = false
      setPhase('play')
    } catch (caught) {
      setError('The career pool could not be loaded. Try again or inspect Logs for the underlying error.')
      throw caught
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalGuesses: string[], finalOutcome: Exclude<Outcome, 'playing'>) {
    if (!question || loggedRef.current || saveLockedRef.current) return
    saveLockedRef.current = true
    setSaving(true)
    setSaveError(null)
    const solved = finalOutcome === 'solved'
    const finalScore = mysteryCareerScore(solved, finalGuesses.length, question.maxGuesses)
    const settings = {
      correct: solved ? 1 : 0,
      attempted: Math.max(1, finalGuesses.length),
      scorePolicy: 'points' as const,
      playMode: 'solo' as const,
      seed,
      scope,
      mediaMode,
      completed: solved,
      gaveUp: finalOutcome === 'gaveUp',
      targetKey: question.targetKey,
      guesses: finalGuesses,
      revealedCredits: Math.min(question.credits.length, finalGuesses.length || 1)
    }
    setNewBest(
      isNewQuizBest(
        { score: finalScore, total: settings.attempted, settings },
        history.data?.best ?? null,
        quizScorePolicy('mysteryCareer'),
        'mysteryCareer'
      )
    )
    try {
      await api.quiz.logSession({
        kind: 'mysteryCareer',
        score: finalScore,
        total: settings.attempted,
        bestStreak: 0,
        settings
      })
      loggedRef.current = true
      await qc.invalidateQueries({ queryKey: qk.quiz.history('mysteryCareer') })
      setPhase('summary')
    } catch (caught) {
      setSaveError('The result was not saved. Retry before leaving this round.')
      throw caught
    } finally {
      saveLockedRef.current = false
      setSaving(false)
    }
  }

  function submitPerson(person: QuizCareerPerson) {
    if (!question || outcome !== 'playing' || interactionLockedRef.current) return
    const next = [...guessedKeys, person.key]
    setGuessedKeys(next)
    if (person.key === question.targetKey) {
      interactionLockedRef.current = true
      setOutcome('solved')
      void finish(next, 'solved')
    } else if (next.length >= question.maxGuesses) {
      interactionLockedRef.current = true
      setOutcome('failed')
      void finish(next, 'failed')
    }
  }

  async function giveUp() {
    if (outcome !== 'playing' || interactionLockedRef.current) return
    const ok = await confirmDialog('Reveal the person and record a score of zero?', {
      confirmLabel: 'Give up'
    })
    if (!ok) return
    interactionLockedRef.current = true
    setOutcome('gaveUp')
    void finish(guessedKeys, 'gaveUp')
  }

  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader
          back={{ to: '/quiz', label: 'Quiz' }}
          title="Mystery Career"
          subtitle="Identify an actor or director as their movie and TV credits are revealed."
          className="mb-6"
        />
        <div className="card space-y-6 p-6">
          <Group label="Library">
            {(['movie', 'tv', 'both'] as const).map((mode) => {
              const count = availability.data?.screenGameOptions.find((item) => item.mediaMode === mode)?.mysteryCareer ?? 0
              return (
                <Pill
                  key={mode}
                  active={mediaMode === mode}
                  disabled={availability.isSuccess && count === 0}
                  onClick={() => setMediaMode(mode)}
                  label={MODE_LABEL[mode]}
                />
              )
            })}
          </Group>
          <Group label="Spoiler boundary">
            <Pill active={scope === 'consumed'} onClick={() => setScope('consumed')} label="Completed" />
            <Pill active={scope === 'all'} onClick={() => setScope('all')} label="All" />
          </Group>
          {scope === 'all' && <p className="text-sm text-amber-300">Includes in-progress or unseen titles and may contain spoilers.</p>}
          {availability.isSuccess && available === 0 && <p className="text-sm text-gray-400">No eligible actor or director has six credits in this selection yet.</p>}
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="btn-primary" disabled={loading || availability.isLoading || available === 0} onClick={() => void startGame()}>
            {loading ? 'Building career…' : 'Start Mystery Career'}
          </button>
        </div>
        <QuizRecord kind="mysteryCareer" />
      </div>
    )
  }

  if (!question || !target) return null

  if (phase === 'summary') {
    return (
      <StudySessionFrame title="Mystery Career" subtitle={`${MODE_LABEL[mediaMode]} · ${scope === 'consumed' ? 'Completed' : 'All titles'}`}>
        <div className="text-center">
          <p className="label">Mystery person</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{target.label}</h2>
          <p className="mt-2 capitalize text-gray-400">{target.roles.join(' and ')}</p>
          <p className="mt-4 text-4xl font-semibold tabular-nums text-white">{score} points</p>
          <p className="mt-2 text-gray-400">{outcome === 'solved' ? `Solved in ${guessedKeys.length} guesses.` : 'Not solved this round.'}</p>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New personal best.</p>}
          <div className="mt-7 flex justify-center gap-3">
            <button className="btn-primary" onClick={() => void startGame()}>Play again</button>
            <button className="btn-ghost" onClick={() => setPhase('setup')}>Change setup</button>
          </div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {question.credits.map((credit) => (
            <div key={credit.title.key} className="flex gap-3 rounded-lg border border-base-600 bg-base-900 p-3">
              <CoverImage path={credit.title.imagePath} alt={credit.title.label} className="h-24 w-16 shrink-0" />
              <div>
                <p className="font-semibold text-white">{credit.title.label}</p>
                <p className="mt-1 text-xs text-gray-500">{credit.title.releaseYear ?? 'Year unknown'} · {credit.title.mediaType === 'movie' ? 'Movie' : 'TV'}</p>
                <p className="mt-2 text-xs text-gray-400">{credit.roles.join(' / ')}</p>
              </div>
            </div>
          ))}
        </div>
      </StudySessionFrame>
    )
  }

  const visibleCredits = Math.min(question.credits.length, Math.max(1, guessedKeys.length + 1))
  const locked = outcome !== 'playing' || saving
  return (
    <StudySessionFrame
      title="Mystery Career"
      subtitle={`${MODE_LABEL[mediaMode]} · Guess ${guessedKeys.length + 1} of ${question.maxGuesses}`}
      progress={{ current: guessedKeys.length, total: question.maxGuesses, label: 'Guesses used' }}
      actions={
        <>
          <span className="pill tabular-nums">{visibleCredits} of {question.credits.length} credits</span>
          <button className="btn-ghost" disabled={locked} onClick={() => void giveUp()}>Give up</button>
        </>
      }
      rail={
        <>
          <SessionEvidence title="Rules">
            <p>One credit starts visible. Every wrong guess reveals another. Main-cast actors use only billing positions 0 through 9; directors are not capped.</p>
          </SessionEvidence>
          <SessionEvidence title="Wrong guesses">
            {guessedKeys.length === 0 ? <p>None.</p> : guessedKeys.map((key) => <p key={key}>{personByKey.get(key)?.label ?? 'Unknown person'}</p>)}
          </SessionEvidence>
        </>
      }
      feedback={saveError ? (
        <SessionFeedback tone="incorrect" title="Result not saved">
          <p>{saveError}</p>
          <button className="btn-ghost mt-3" disabled={saving || outcome === 'playing'} onClick={() => void finish(guessedKeys, outcome as Exclude<Outcome, 'playing'>)}>Retry save</button>
        </SessionFeedback>
      ) : undefined}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {question.credits.map((credit, index) => {
          const visible = index < visibleCredits
          return (
            <div key={credit.title.key} className={`min-h-44 rounded-xl border p-3 ${visible ? 'border-base-600 bg-base-800' : 'border-base-700 bg-base-900/60'}`}>
              {visible ? (
                <div className="flex h-full gap-3">
                  <CoverImage path={credit.title.imagePath} alt={credit.title.label} className="h-32 w-[86px] shrink-0" />
                  <div>
                    <p className="text-xs text-gray-500">Credit {index + 1}</p>
                    <p className="mt-1 font-semibold text-white">{credit.title.label}</p>
                    <p className="mt-2 text-xs text-gray-400">{credit.title.releaseYear ?? 'Year unknown'} · {credit.title.mediaType === 'movie' ? 'Movie' : 'TV'}</p>
                    <p className="mt-2 text-xs text-gray-400">{credit.roles.join(' / ')}</p>
                  </div>
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-sm text-gray-500">Revealed after another wrong guess</div>
              )}
            </div>
          )
        })}
      </div>
      <div className="mt-6 border-t border-base-700 pt-5">
        <QuizPersonAutocomplete
          people={question.people}
          excludedKeys={guessedKeys}
          disabled={locked}
          resetKey={guessedKeys.length}
          onSubmit={submitPerson}
        />
      </div>
    </StudySessionFrame>
  )
}
