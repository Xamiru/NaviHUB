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
import { libraryleFeedback, libraryleScore, type LibraryleFeedback } from '@shared/libraryle'
import type {
  QuizConsumptionScope,
  QuizLibraryleQuestion,
  QuizLibraryleTitle,
  QuizScreenMediaMode,
  QuizScreenTitle
} from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'
type Outcome = 'playing' | 'solved' | 'failed' | 'gaveUp'
interface Guess {
  titleKey: string
  feedback: LibraryleFeedback
}

const MODE_LABEL: Record<QuizScreenMediaMode, string> = {
  movie: 'Movies',
  tv: 'TV shows',
  both: 'Both'
}

function tone(match: 'exact' | 'near' | 'partial' | 'none'): string {
  if (match === 'exact') return 'border-emerald-500/50 bg-emerald-500/10 text-emerald-200'
  if (match === 'near' || match === 'partial') return 'border-amber-500/50 bg-amber-500/10 text-amber-200'
  return 'border-base-600 bg-base-900 text-gray-400'
}

function Fact({ label, value, match }: { label: string; value: string; match: 'exact' | 'near' | 'partial' | 'none' }) {
  return (
    <div className={`rounded-lg border px-3 py-2 ${tone(match)}`}>
      <p className="text-[10px] font-semibold uppercase tracking-wider opacity-70">{label}</p>
      <p className="mt-1 text-xs font-medium">{value}</p>
    </div>
  )
}

export default function LibrarylePage() {
  const qc = useQueryClient()
  const completedStatuses = useAllCompletedStatuses()
  const [scope, setScope] = usePersistedState<QuizConsumptionScope>('libraryleScope', 'consumed')
  const [mediaMode, setMediaMode] = usePersistedState<QuizScreenMediaMode>('libraryleMode', 'both')
  const [phase, setPhase] = useState<Phase>('setup')
  const [question, setQuestion] = useState<QuizLibraryleQuestion | null>(null)
  const [guesses, setGuesses] = useState<Guess[]>([])
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
    queryKey: qk.quiz.history('libraryle'),
    queryFn: () => api.quiz.history('libraryle')
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
  )?.libraryle ?? 0
  const titleByKey = useMemo(
    () => new Map(question?.titles.map((title) => [title.key, title]) ?? []),
    [question]
  )
  const target = question ? titleByKey.get(question.targetKey) ?? null : null
  const score = libraryleScore(outcome === 'solved', guesses.length)

  async function startGame() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = {
        kind: 'libraryle' as const,
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
      if (!built || built.kind !== 'libraryle') {
        setError('This selection does not have enough covered titles with useful cast and genre data.')
        return
      }
      setQuestion(built)
      setGuesses([])
      setOutcome('playing')
      setSeed(nextSeed)
      setSaveError(null)
      setNewBest(false)
      loggedRef.current = false
      interactionLockedRef.current = false
      saveLockedRef.current = false
      setPhase('play')
    } catch (caught) {
      setError('The title pool could not be loaded. Try again or inspect Logs for the underlying error.')
      throw caught
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalGuesses: Guess[], finalOutcome: Exclude<Outcome, 'playing'>) {
    if (!question || loggedRef.current || saveLockedRef.current) return
    saveLockedRef.current = true
    setSaving(true)
    setSaveError(null)
    const solved = finalOutcome === 'solved'
    const finalScore = libraryleScore(solved, finalGuesses.length)
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
      guesses: finalGuesses.map((guess) => guess.titleKey)
    }
    setNewBest(
      isNewQuizBest(
        { score: finalScore, total: settings.attempted, settings },
        history.data?.best ?? null,
        quizScorePolicy('libraryle'),
        'libraryle'
      )
    )
    try {
      await api.quiz.logSession({
        kind: 'libraryle',
        score: finalScore,
        total: settings.attempted,
        bestStreak: 0,
        settings
      })
      loggedRef.current = true
      await qc.invalidateQueries({ queryKey: qk.quiz.history('libraryle') })
      setPhase('summary')
    } catch (caught) {
      setSaveError('The result was not saved. Retry before leaving this round.')
      throw caught
    } finally {
      saveLockedRef.current = false
      setSaving(false)
    }
  }

  function submitTitle(title: QuizScreenTitle) {
    if (!question || !target || outcome !== 'playing' || interactionLockedRef.current) return
    const fullTitle = titleByKey.get(title.key)
    if (!fullTitle) return
    const next = [...guesses, { titleKey: title.key, feedback: libraryleFeedback(target, fullTitle) }]
    setGuesses(next)
    if (title.key === question.targetKey) {
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
    const ok = await confirmDialog('Reveal the hidden title and record a score of zero?', {
      confirmLabel: 'Give up'
    })
    if (!ok) return
    interactionLockedRef.current = true
    setOutcome('gaveUp')
    void finish(guesses, 'gaveUp')
  }

  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader
          back={{ to: '/quiz', label: 'Quiz' }}
          title="Libraryle"
          subtitle="Find the hidden movie or TV title using year, genre, company, director, and cast feedback."
          className="mb-6"
        />
        <div className="card space-y-6 p-6">
          <Group label="Library">
            {(['movie', 'tv', 'both'] as const).map((mode) => {
              const count = availability.data?.screenGameOptions.find((item) => item.mediaMode === mode)?.libraryle ?? 0
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
          {availability.isSuccess && available === 0 && <p className="text-sm text-gray-400">At least eight eligible titles are required for this selection.</p>}
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="btn-primary" disabled={loading || availability.isLoading || available === 0} onClick={() => void startGame()}>
            {loading ? 'Choosing title…' : 'Start Libraryle'}
          </button>
        </div>
        <QuizRecord kind="libraryle" />
      </div>
    )
  }

  if (!question || !target) return null

  if (phase === 'summary') {
    return (
      <StudySessionFrame title="Libraryle" subtitle={`${MODE_LABEL[mediaMode]} · ${scope === 'consumed' ? 'Completed' : 'All titles'}`}>
        <div className="text-center">
          <p className="label">Hidden title</p>
          <h2 className="mt-2 text-3xl font-semibold text-white">{target.label}</h2>
          <p className="mt-2 text-gray-400">{outcome === 'solved' ? `Solved in ${guesses.length} guesses.` : 'Not solved this round.'}</p>
          <p className="mt-3 text-4xl font-semibold tabular-nums text-white">{score} points</p>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New personal best.</p>}
          <CoverImage path={target.imagePath} alt={target.label} className="mx-auto mt-6 h-64 w-44" />
          <div className="mt-7 flex justify-center gap-3">
            <button className="btn-primary" onClick={() => void startGame()}>Play again</button>
            <button className="btn-ghost" onClick={() => setPhase('setup')}>Change setup</button>
          </div>
        </div>
      </StudySessionFrame>
    )
  }

  const locked = outcome !== 'playing' || saving
  return (
    <StudySessionFrame
      title="Libraryle"
      subtitle={`${MODE_LABEL[mediaMode]} · Guess ${guesses.length + 1} of ${question.maxGuesses}`}
      progress={{ current: guesses.length, total: question.maxGuesses, label: 'Guesses used' }}
      actions={
        <>
          <span className="pill tabular-nums">{question.maxGuesses - guesses.length} guesses left</span>
          <button className="btn-ghost" disabled={locked} onClick={() => void giveUp()}>Give up</button>
        </>
      }
      rail={
        <SessionEvidence title="Feedback">
          <p>Green is an exact match. Amber means a near year or at least one shared fact. Earlier and later point toward the target year.</p>
        </SessionEvidence>
      }
      feedback={saveError ? (
        <SessionFeedback tone="incorrect" title="Result not saved">
          <p>{saveError}</p>
          <button className="btn-ghost mt-3" disabled={saving || outcome === 'playing'} onClick={() => void finish(guesses, outcome as Exclude<Outcome, 'playing'>)}>Retry save</button>
        </SessionFeedback>
      ) : undefined}
    >
      <div className="space-y-3">
        {guesses.map((guess, index) => {
          const title = titleByKey.get(guess.titleKey) as QuizLibraryleTitle | undefined
          if (!title) return null
          const shared = (values: string[], fallback: string) => values.length ? values.join(', ') : fallback
          return (
            <div key={title.key} className="rounded-xl border border-base-600 bg-base-800 p-3">
              <div className="flex items-center gap-3">
                <CoverImage path={title.imagePath} alt={title.label} className="h-20 w-[54px] shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs text-gray-500">Guess {index + 1}</p>
                  <p className="truncate font-semibold text-white">{title.label}</p>
                </div>
              </div>
              <div className="mt-3 grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                <Fact label="Year" match={guess.feedback.year.match} value={`${title.releaseYear} ${guess.feedback.year.direction ?? 'exact'}`} />
                <Fact label="Type" match={guess.feedback.mediaType} value={title.mediaType === 'movie' ? 'Movie' : 'TV'} />
                <Fact label="Genres" match={guess.feedback.genres.match} value={shared(guess.feedback.genres.shared, 'No shared genres')} />
                <Fact label="Company" match={guess.feedback.companies.match} value={shared(guess.feedback.companies.shared, 'No shared companies')} />
                <Fact label="Director" match={guess.feedback.directors.match} value={shared(guess.feedback.directors.shared, 'No shared directors')} />
                <Fact label="Main cast" match={guess.feedback.cast.match} value={shared(guess.feedback.cast.shared, 'No shared main cast')} />
              </div>
            </div>
          )
        })}
        {guesses.length === 0 && <div className="rounded-xl border border-dashed border-base-600 py-16 text-center text-sm text-gray-500">The hidden title is ready. Start with any eligible movie or show.</div>}
      </div>
      <div className="mt-6 border-t border-base-700 pt-5">
        <QuizTitleAutocomplete
          titles={question.titles}
          excludedKeys={guesses.map((guess) => guess.titleKey)}
          disabled={locked}
          resetKey={guesses.length}
          onSubmit={submitTitle}
        />
      </div>
    </StudySessionFrame>
  )
}
