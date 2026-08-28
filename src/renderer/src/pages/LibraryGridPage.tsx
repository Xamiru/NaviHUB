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
import { availableLibraryGridHint, libraryGridScore } from '@shared/libraryGrid'
import type {
  QuizConsumptionScope,
  QuizLibraryGridQuestion,
  QuizScreenMediaMode,
  QuizScreenTitle
} from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'
interface FilledCell {
  titleKey: string
  hinted: boolean
}
interface GridAttempt {
  cellKey: string
  title: string
  reason: string
}

const MODE_LABEL: Record<QuizScreenMediaMode, string> = {
  movie: 'Movies',
  tv: 'TV shows',
  both: 'Both'
}

export default function LibraryGridPage() {
  const qc = useQueryClient()
  const completedStatuses = useAllCompletedStatuses()
  const [scope, setScope] = usePersistedState<QuizConsumptionScope>('libraryGridScope', 'consumed')
  const [mediaMode, setMediaMode] = usePersistedState<QuizScreenMediaMode>('libraryGridMode', 'both')
  const [phase, setPhase] = useState<Phase>('setup')
  const [question, setQuestion] = useState<QuizLibraryGridQuestion | null>(null)
  const [seed, setSeed] = useState(0)
  const [activeCell, setActiveCell] = useState('cell-0')
  const [filled, setFilled] = useState<Record<string, FilledCell>>({})
  const [hinted, setHinted] = useState<string[]>([])
  const [attempts, setAttempts] = useState<GridAttempt[]>([])
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [newBest, setNewBest] = useState(false)
  const loggedRef = useRef(false)
  const history = useQuery({
    queryKey: qk.quiz.history('libraryGrid'),
    queryFn: () => api.quiz.history('libraryGrid')
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
  const ready = (modeAvailability?.libraryGrid ?? 0) >= 9
  const solvedCount = Object.keys(filled).length
  const unaidedCount = Object.values(filled).filter((cell) => !cell.hinted).length
  const hintedCount = Object.values(filled).filter((cell) => cell.hinted).length
  const score = libraryGridScore({
    unaidedCells: unaidedCount,
    hintedCells: hintedCount,
    invalidGuesses: attempts.length
  })
  const titleByKey = useMemo(
    () => new Map(question?.titles.map((title) => [title.key, title]) ?? []),
    [question]
  )
  const currentCell = question?.cells.find((cell) => cell.key === activeCell) ?? null

  async function startGame() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = {
        kind: 'libraryGrid' as const,
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
      if (!built || built.kind !== 'libraryGrid') {
        setError('No solvable 3×3 board exists for this setup. Widen the scope or import more cast, genre, and company data.')
        return
      }
      setQuestion(built)
      setSeed(nextSeed)
      setActiveCell('cell-0')
      setFilled({})
      setHinted([])
      setAttempts([])
      setSaveError(null)
      setNewBest(false)
      loggedRef.current = false
      setPhase('play')
    } catch (caught) {
      setError('The grid pool could not be loaded. Try again or inspect Logs for the underlying error.')
      throw caught
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalFilled: Record<string, FilledCell>, gaveUp: boolean) {
    if (!question || loggedRef.current || saving) return
    setSaving(true)
    setSaveError(null)
    const values = Object.values(finalFilled)
    const finalScore = gaveUp
      ? libraryGridScore({
          unaidedCells: values.filter((cell) => !cell.hinted).length,
          hintedCells: values.filter((cell) => cell.hinted).length,
          invalidGuesses: attempts.length
        })
      : scoreFor(finalFilled)
    const correct = values.length
    const attempted = correct + attempts.length
    const settings = {
      correct,
      attempted,
      scorePolicy: 'points' as const,
      playMode: 'solo' as const,
      seed,
      scope,
      mediaMode,
      completed: !gaveUp && correct === 9,
      hintsUsed: hinted.length,
      invalidGuesses: attempts.length,
      clues: [...question.rows, ...question.columns].map(({ key, kind, label }) => ({ key, kind, label })),
      solvedCells: Object.entries(finalFilled).map(([cellKey, value]) => ({ cellKey, ...value }))
    }
    setNewBest(
      isNewQuizBest(
        { score: finalScore, total: Math.max(1, attempted), settings },
        history.data?.best ?? null,
        quizScorePolicy('libraryGrid'),
        'libraryGrid'
      )
    )
    try {
      await api.quiz.logSession({
        kind: 'libraryGrid',
        score: finalScore,
        total: Math.max(1, attempted),
        bestStreak: 0,
        settings
      })
      loggedRef.current = true
      await qc.invalidateQueries({ queryKey: qk.quiz.history('libraryGrid') })
      setPhase('summary')
    } catch (caught) {
      setSaveError('The result was not saved. Retry before leaving this board.')
      throw caught
    } finally {
      setSaving(false)
    }
  }

  function scoreFor(nextFilled: Record<string, FilledCell>): number {
    const values = Object.values(nextFilled)
    return libraryGridScore({
      unaidedCells: values.filter((cell) => !cell.hinted).length,
      hintedCells: values.filter((cell) => cell.hinted).length,
      invalidGuesses: attempts.length
    })
  }

  function submitTitle(title: QuizScreenTitle) {
    if (!question || !currentCell || filled[currentCell.key] || saving) return
    const used = Object.values(filled).some((cell) => cell.titleKey === title.key)
    if (used || !currentCell.validKeys.includes(title.key)) {
      setAttempts((values) => [
        ...values,
        {
          cellKey: currentCell.key,
          title: title.label,
          reason: used ? 'Already used elsewhere' : 'Does not match both clues'
        }
      ])
      return
    }
    const next = {
      ...filled,
      [currentCell.key]: { titleKey: title.key, hinted: hinted.includes(currentCell.key) }
    }
    setFilled(next)
    const nextCell = question.cells.find((cell) => !next[cell.key])
    if (nextCell) setActiveCell(nextCell.key)
    else void finish(next, false)
  }

  async function giveUp() {
    if (!question || saving) return
    const ok = await confirmDialog('Reveal every unresolved cell and finish this board?', {
      confirmLabel: 'Reveal board'
    })
    if (ok) void finish(filled, true)
  }

  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader
          back={{ to: '/quiz', label: 'Quiz' }}
          title="Library Grid"
          subtitle="Fill a 3×3 board where every title must satisfy its row and column facts."
          className="mb-6"
        />
        <div className="card space-y-6 p-6">
          <Group label="Library">
            {(['movie', 'tv', 'both'] as const).map((mode) => {
              const option = availability.data?.screenGameOptions.find((item) => item.mediaMode === mode)
              return (
                <Pill
                  key={mode}
                  active={mediaMode === mode}
                  disabled={availability.isSuccess && (option?.libraryGrid ?? 0) < 9}
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
          {scope === 'all' && (
            <p className="text-sm text-amber-300">Includes in-progress or unseen titles and may contain spoilers.</p>
          )}
          {availability.isSuccess && !ready && (
            <p className="text-sm text-gray-400">This selection cannot form nine distinct intersections yet.</p>
          )}
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="btn-primary" disabled={loading || availability.isLoading || !ready} onClick={() => void startGame()}>
            {loading ? 'Building board…' : 'Start grid'}
          </button>
        </div>
        <QuizRecord kind="libraryGrid" />
      </div>
    )
  }

  if (!question) return null

  if (phase === 'summary') {
    return (
      <StudySessionFrame title="Library Grid" subtitle={`${MODE_LABEL[mediaMode]} · ${scope === 'consumed' ? 'Completed' : 'All titles'}`}>
        <div className="text-center">
          <h2 className="text-4xl font-semibold tabular-nums text-white">{score} points</h2>
          <p className="mt-3 text-gray-400">{solvedCount}/9 cells solved · {attempts.length} invalid guesses · {hinted.length} hints</p>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New personal best.</p>}
          <div className="mt-7 flex justify-center gap-3">
            <button className="btn-primary" onClick={() => void startGame()}>Play again</button>
            <button className="btn-ghost" onClick={() => setPhase('setup')}>Change setup</button>
          </div>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {question.cells.map((cell) => {
            const answer = filled[cell.key]
            const title = titleByKey.get(answer?.titleKey ?? cell.revealKey)
            if (!title) return null
            return (
              <div key={cell.key} className="flex gap-3 rounded-lg border border-base-600 bg-base-900 p-3 text-left">
                <CoverImage path={title.imagePath} alt={title.label} className="h-20 w-[54px] shrink-0" />
                <div>
                  <p className="text-sm font-semibold text-white">{title.label}</p>
                  {!answer && <p className="mt-1 text-xs text-gray-400">Revealed answer</p>}
                  <p className="mt-2 text-[11px] leading-4 text-gray-500">
                    {question.rows[cell.row].label}<br />{question.columns[cell.column].label}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </StudySessionFrame>
    )
  }

  const usedKeys = Object.values(filled).map((cell) => cell.titleKey)
  const hintOpen = currentCell ? hinted.includes(currentCell.key) : false
  const hintChoices = currentCell
    ? availableLibraryGridHint(currentCell, question.titles.map((title) => title.key), usedKeys)
    : []
  return (
    <StudySessionFrame
      title="Library Grid"
      subtitle={`${MODE_LABEL[mediaMode]} · Select a cell, then submit one matching title.`}
      progress={{ current: solvedCount, total: 9, label: 'Grid progress' }}
      actions={
        <>
          <span className="pill tabular-nums">{score} points</span>
          <button className="btn-ghost" disabled={saving} onClick={() => void giveUp()}>Give up</button>
        </>
      }
      rail={
        <>
          <SessionEvidence title="Scoring">
            <p>100 points unaided, 40 after a hint, and minus 10 for an invalid title.</p>
          </SessionEvidence>
          <SessionEvidence title="Attempts">
            {attempts.length === 0 ? (
              <p>No invalid submissions.</p>
            ) : (
              <div className="space-y-2">
                {attempts.slice(-8).reverse().map((attempt, index) => (
                  <p key={`${attempt.cellKey}-${attempt.title}-${index}`}>
                    <span className="text-gray-300">{attempt.title}</span><br />{attempt.reason}
                  </p>
                ))}
              </div>
            )}
          </SessionEvidence>
        </>
      }
      feedback={saveError ? (
        <SessionFeedback tone="incorrect" title="Result not saved">
          <p>{saveError}</p>
          <button className="btn-ghost mt-3" disabled={saving} onClick={() => void finish(filled, solvedCount < 9)}>
            Retry save
          </button>
        </SessionFeedback>
      ) : undefined}
    >
      <div className="overflow-x-auto pb-2">
        <div className="grid min-w-[760px] grid-cols-[150px_repeat(3,minmax(180px,1fr))] gap-2">
          <div />
          {question.columns.map((clue) => (
            <div key={clue.key} className="flex min-h-20 items-end justify-center rounded-lg border border-base-600 bg-base-800 px-3 py-4 text-center text-sm font-semibold text-gray-200">
              {clue.label}
            </div>
          ))}
          {question.rows.map((row, rowIndex) => (
            <div key={row.key} className="contents">
              <div className="flex min-h-44 items-center rounded-lg border border-base-600 bg-base-800 px-4 text-sm font-semibold text-gray-200">
                {row.label}
              </div>
              {question.cells.filter((cell) => cell.row === rowIndex).map((cell) => {
                const answer = filled[cell.key]
                const title = answer ? titleByKey.get(answer.titleKey) : null
                return (
                  <button
                    type="button"
                    key={cell.key}
                    className={`min-h-44 overflow-hidden rounded-lg border text-left transition-colors ${
                      activeCell === cell.key
                        ? 'border-accent bg-base-700'
                        : 'border-base-600 bg-base-900 hover:border-base-500'
                    }`}
                    onClick={() => setActiveCell(cell.key)}
                  >
                    {title ? (
                      <div className="flex h-full items-center gap-3 p-3">
                        <CoverImage path={title.imagePath} alt={title.label} className="h-32 w-20 shrink-0" />
                        <div>
                          <p className="font-semibold text-white">{title.label}</p>
                          {answer?.hinted && <p className="mt-2 text-xs text-gray-400">Hinted · 40 points</p>}
                        </div>
                      </div>
                    ) : (
                      <span className="flex h-full items-center justify-center px-3 text-center text-sm text-gray-500">
                        {activeCell === cell.key ? 'Selected cell' : 'Choose this cell'}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>
          ))}
        </div>
      </div>
      {currentCell && filled[currentCell.key] && solvedCount < 9 && (
        <div className="mt-6 border-t border-base-700 pt-5">
          <p className="text-sm text-gray-400">This title can be cleared if it blocks another intersection.</p>
          <button
            className="btn-ghost mt-3"
            disabled={saving}
            onClick={() => {
              const next = { ...filled }
              delete next[currentCell.key]
              setFilled(next)
            }}
          >
            Clear selected cell
          </button>
        </div>
      )}
      {currentCell && !filled[currentCell.key] && (
        <div className="mt-6 border-t border-base-700 pt-5">
          <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-sm font-semibold text-white">Selected intersection</p>
              <p className="mt-1 text-xs text-gray-400">
                {question.rows[currentCell.row].label} and {question.columns[currentCell.column].label}
              </p>
            </div>
            <button
              className="btn-ghost"
              disabled={hintOpen || saving}
              onClick={() => setHinted((values) => [...values, currentCell.key])}
            >
              Show three-title hint
            </button>
          </div>
          {hintOpen && (
            <div className="mb-4 grid gap-2 sm:grid-cols-3" aria-label="Hint choices">
              {hintChoices.length === 0 && (
                <p className="sm:col-span-3 text-sm text-gray-400">Every valid hint title is already used. Clear another cell to free one.</p>
              )}
              {hintChoices.map((key) => {
                const title = titleByKey.get(key)
                return title ? (
                  <button key={key} className="btn-ghost text-left" onClick={() => submitTitle(title)}>
                    {title.label}
                  </button>
                ) : null
              })}
            </div>
          )}
          <QuizTitleAutocomplete
            titles={question.titles}
            excludedKeys={usedKeys}
            disabled={saving}
            resetKey={`${activeCell}-${solvedCount}-${attempts.length}`}
            onSubmit={submitTitle}
          />
          {attempts.length > 0 && (
            <div className="mt-4 space-y-2 rounded-lg border border-base-600 bg-base-900 p-4 text-sm text-gray-400 lg:hidden">
              <p className="font-semibold text-gray-200">Recent invalid attempts</p>
              {attempts.slice(-4).reverse().map((attempt, index) => (
                <p key={`${attempt.cellKey}-${attempt.title}-mobile-${index}`}>
                  {attempt.title} · {attempt.reason}
                </p>
              ))}
            </div>
          )}
        </div>
      )}
    </StudySessionFrame>
  )
}
