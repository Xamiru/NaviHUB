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
  QuizCareerCredit,
  QuizCareerPerson,
  QuizConsumptionScope,
  QuizMysteryCareerQuestion,
  QuizScreenMediaMode
} from '@shared/types'
import { useTabLeaveGuard } from '../lib/browserTabs'
import { quizAvailabilityQuery } from '../lib/quizAvailability'

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
  useTabLeaveGuard(phase === 'play', 'run')
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
  const availability = useQuery(quizAvailabilityQuery(availabilityRequest))
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
  const roleLabel = (credit: QuizCareerCredit) => credit.roles.join(' / ')
  const kindLabel = (credit: QuizCareerCredit) =>
    `${credit.title.releaseYear ?? 'Year unknown'} · ${credit.title.mediaType === 'movie' ? 'Movie' : 'TV'}`

  if (phase === 'summary') {
    // The clue at which the player solved it (1-based), for the timeline marker.
    const solvedAt = outcome === 'solved' ? guessedKeys.length : null
    return (
      <StudySessionFrame title="Mystery Career" subtitle={`${MODE_LABEL[mediaMode]} · ${scope === 'consumed' ? 'Completed' : 'All titles'}`}>
        <div className="flex flex-col items-center text-center">
          <CoverImage
            path={target.photoPath ?? null}
            alt={target.label}
            rounded="rounded-full"
            fallback="initial"
            className="h-32 w-32"
          />
          <p className="label mt-4">Mystery person</p>
          <h2 className="mt-1 text-3xl font-semibold text-white">{target.label}</h2>
          <p className="mt-1 capitalize text-gray-400">{target.roles.join(' and ')}</p>
          <p className="mt-4 text-4xl font-semibold tabular-nums text-white">{score} points</p>
          <p className="mt-2 text-gray-400">
            {solvedAt ? `Solved on clue ${solvedAt} of ${question.credits.length}.` : 'Not solved this round.'}
          </p>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New personal best.</p>}
          <div className="mt-6 flex justify-center gap-3">
            <button className="btn-primary" onClick={() => void startGame()}>Play again</button>
            <button className="btn-ghost" onClick={() => setPhase('setup')}>Change setup</button>
          </div>
        </div>
        <h3 className="label mb-3 mt-8">The career, in clue order</h3>
        <ol className="space-y-2">
          {question.credits.map((credit, index) => (
            <li
              key={credit.title.key}
              className={`flex items-center gap-4 rounded-lg border p-3 ${
                solvedAt === index + 1 ? 'border-accent bg-accent/5' : 'border-base-600 bg-base-900'
              }`}
            >
              <span className="w-14 shrink-0 text-xs font-semibold uppercase tracking-wider text-gray-500">Clue {index + 1}</span>
              <CoverImage path={credit.title.imagePath} alt="" thumbWidth={96} className="h-16 w-11 shrink-0" />
              <div className="min-w-0 flex-1">
                <p className="truncate font-semibold text-white">{credit.title.label}</p>
                <p className="text-xs text-gray-500">{kindLabel(credit)}</p>
                <p className="truncate text-xs text-gray-400">{roleLabel(credit)}</p>
              </div>
              {solvedAt === index + 1 && <span className="text-xs font-semibold text-accent">Solved here</span>}
            </li>
          ))}
        </ol>
      </StudySessionFrame>
    )
  }

  const visibleCredits = Math.min(question.credits.length, Math.max(1, guessedKeys.length + 1))
  const locked = outcome !== 'playing' || saving
  const worth = mysteryCareerScore(true, guessedKeys.length + 1, question.maxGuesses)
  const revealed = question.credits.slice(0, visibleCredits).map((credit, index) => ({ credit, index }))
  return (
    <StudySessionFrame
      title="Mystery Career"
      subtitle={`${MODE_LABEL[mediaMode]} · Guess ${guessedKeys.length + 1} of ${question.maxGuesses}`}
      progress={{ current: guessedKeys.length, total: question.maxGuesses, label: 'Guesses used' }}
      actions={<button className="btn-ghost" disabled={locked} onClick={() => void giveUp()}>Give up</button>}
      rail={
        <SessionEvidence title="How it works">
          <p>
            Clues run from the least known credit to the best known. Each wrong guess reveals the next one
            and lowers the prize by 100 points. Actors count from their top-ten billed roles; directors are
            not capped; voice roles never appear.
          </p>
        </SessionEvidence>
      }
      feedback={saveError ? (
        <SessionFeedback tone="incorrect" title="Result not saved">
          <p>{saveError}</p>
          <button className="btn-ghost mt-3" disabled={saving || outcome === 'playing'} onClick={() => void finish(guessedKeys, outcome as Exclude<Outcome, 'playing'>)}>Retry save</button>
        </SessionFeedback>
      ) : undefined}
    >
      {/* Case file header: who is it, what is it worth, how many clues are out. */}
      <div className="flex items-center gap-5 rounded-xl border border-base-600 bg-base-800 p-4">
        <div
          className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full border border-base-500 bg-base-900 text-3xl font-semibold text-gray-500"
          aria-hidden="true"
        >
          ?
        </div>
        <div className="min-w-0 flex-1">
          <p className="label">Mystery person</p>
          <p className="mt-1 text-2xl font-semibold tabular-nums text-white">Worth {worth} points</p>
          <div className="mt-2 flex gap-1.5" role="img" aria-label={`${visibleCredits} of ${question.credits.length} clues revealed`}>
            {question.credits.map((credit, index) => (
              <span
                key={credit.title.key}
                className={`h-1.5 flex-1 rounded-full ${index < visibleCredits ? 'bg-accent' : 'bg-base-600'}`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Guess first, right under the stakes; wrong guesses stay in view. */}
      <div className="mt-5">
        <QuizPersonAutocomplete
          people={question.people}
          excludedKeys={guessedKeys}
          disabled={locked}
          resetKey={guessedKeys.length}
          onSubmit={submitPerson}
        />
        {guessedKeys.length > 0 && (
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="Wrong guesses">
            {guessedKeys.map((key) => (
              <li key={key} className="chip text-gray-400 line-through">
                {personByKey.get(key)?.label ?? 'Unknown person'}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Clue timeline: newest clue first and highlighted; locked clues stay slim. */}
      <ol className="mt-6 space-y-3" aria-label="Career clues">
        {[...revealed].reverse().map(({ credit, index }) => {
          const newest = index === visibleCredits - 1
          return (
            <li
              key={credit.title.key}
              className={`flex gap-4 rounded-xl border p-3 ${
                newest ? 'border-accent bg-accent/5' : 'border-base-600 bg-base-800'
              }`}
            >
              <CoverImage
                path={credit.title.imagePath}
                alt={credit.title.label}
                thumbWidth={192}
                className={`${newest ? 'h-36 w-24' : 'h-24 w-16'} shrink-0`}
              />
              <div className="min-w-0">
                <p className={`text-xs font-semibold uppercase tracking-wider ${newest ? 'text-accent' : 'text-gray-500'}`}>
                  Clue {index + 1}{newest && guessedKeys.length > 0 ? ' · new' : ''}
                </p>
                <p className={`mt-1 font-semibold text-white ${newest ? 'text-xl' : ''}`}>{credit.title.label}</p>
                <p className="mt-1 text-xs text-gray-400">{kindLabel(credit)}</p>
                <p className="mt-2 text-sm text-gray-300">{roleLabel(credit)}</p>
              </div>
            </li>
          )
        })}
        {question.credits.slice(visibleCredits).map((credit, offset) => {
          const clue = visibleCredits + offset + 1
          return (
            <li
              key={credit.title.key}
              className="flex items-center justify-between rounded-lg border border-dashed border-base-600 px-4 py-2.5 text-sm text-gray-500"
            >
              <span>Clue {clue}</span>
              <span className="tabular-nums">
                after {clue - 1} wrong {clue - 1 === 1 ? 'guess' : 'guesses'} · then worth{' '}
                {mysteryCareerScore(true, clue, question.maxGuesses)}
              </span>
            </li>
          )
        })}
      </ol>
    </StudySessionFrame>
  )
}
