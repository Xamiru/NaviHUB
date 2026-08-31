import { useMemo, useRef, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence, SessionFeedback } from '../components/StudySessionFrame'
import CoverImage from '../components/CoverImage'
import QuizRecord from '../components/QuizRecord'
import { Group, Pill } from '../components/PillGroup'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { useAllCompletedStatuses } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { qk } from '../lib/queryKeys'
import { isNewQuizBest, quizScorePolicy, quizSeed } from '@shared/quizCore'
import {
  initialLinkWallState,
  linkWallScore,
  submitLinkWallGroup,
  toggleLinkWallTitle,
  type LinkWallState
} from '@shared/linkWall'
import { shuffle } from '@shared/shuffle'
import type {
  QuizConsumptionScope,
  QuizLinkWallGroup,
  QuizLinkWallQuestion,
  QuizScreenMediaMode
} from '@shared/types'

type Phase = 'setup' | 'play' | 'summary'

const MODE_LABEL: Record<QuizScreenMediaMode, string> = {
  movie: 'Movies',
  tv: 'TV shows',
  both: 'Both'
}

export default function LinkWallPage() {
  const qc = useQueryClient()
  const completedStatuses = useAllCompletedStatuses()
  const [scope, setScope] = usePersistedState<QuizConsumptionScope>('linkWallScope', 'consumed')
  const [mediaMode, setMediaMode] = usePersistedState<QuizScreenMediaMode>('linkWallMode', 'both')
  const [phase, setPhase] = useState<Phase>('setup')
  const [question, setQuestion] = useState<QuizLinkWallQuestion | null>(null)
  const [state, setState] = useState<LinkWallState>(initialLinkWallState)
  const [orderKeys, setOrderKeys] = useState<string[]>([])
  const [message, setMessage] = useState<string | null>(null)
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
    queryKey: qk.quiz.history('linkWall'),
    queryFn: () => api.quiz.history('linkWall')
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
  )?.linkWall ?? 0
  const titleByKey = useMemo(
    () => new Map(question?.titles.map((title) => [title.key, title]) ?? []),
    [question]
  )
  const groupByKey = useMemo(
    () => new Map(question?.groups.map((group) => [group.key, group]) ?? []),
    [question]
  )
  const score = linkWallScore(state)

  async function startGame() {
    setLoading(true)
    setError(null)
    try {
      const nextSeed = quizSeed(`${Date.now()}-${Math.random()}`)
      const request = {
        kind: 'linkWall' as const,
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
      if (!built || built.kind !== 'linkWall') {
        setError('No unambiguous four-group wall can be built from this selection yet. Widen the scope or import more credits and companies.')
        return
      }
      setQuestion(built)
      setState(initialLinkWallState())
      setOrderKeys(built.titles.map((title) => title.key))
      setMessage(null)
      setSeed(nextSeed)
      setSaveError(null)
      setNewBest(false)
      loggedRef.current = false
      interactionLockedRef.current = false
      saveLockedRef.current = false
      setPhase('play')
    } catch (caught) {
      setError('The wall could not be built. Try again or inspect Logs for the underlying error.')
      throw caught
    } finally {
      setLoading(false)
    }
  }

  async function finish(finalState: LinkWallState) {
    if (!question || loggedRef.current || saveLockedRef.current) return
    saveLockedRef.current = true
    setSaving(true)
    setSaveError(null)
    const finalScore = linkWallScore(finalState)
    const completed = finalState.status === 'complete'
    const attempted = finalState.solvedGroupKeys.length + finalState.mistakes
    const settings = {
      correct: finalState.solvedGroupKeys.length,
      attempted: Math.max(1, attempted),
      scorePolicy: 'points' as const,
      playMode: 'solo' as const,
      seed,
      scope,
      mediaMode,
      completed,
      gaveUp: finalState.status === 'gaveUp',
      solvedGroups: finalState.solvedGroupKeys,
      mistakes: finalState.mistakes,
      groups: question.groups.map((group) => ({
        family: group.family,
        labels: group.labels,
        titleKeys: group.titleKeys
      }))
    }
    setNewBest(
      isNewQuizBest(
        { score: finalScore, total: settings.attempted, settings },
        history.data?.best ?? null,
        quizScorePolicy('linkWall'),
        'linkWall'
      )
    )
    try {
      await api.quiz.logSession({
        kind: 'linkWall',
        score: finalScore,
        total: settings.attempted,
        bestStreak: 0,
        settings
      })
      loggedRef.current = true
      await qc.invalidateQueries({ queryKey: qk.quiz.history('linkWall') })
      setPhase('summary')
    } catch (caught) {
      setSaveError('The result was not saved. Retry before leaving this wall.')
      throw caught
    } finally {
      saveLockedRef.current = false
      setSaving(false)
    }
  }

  function submitGroup() {
    if (!question || state.status !== 'playing' || interactionLockedRef.current) return
    interactionLockedRef.current = true
    const transition = submitLinkWallGroup(question, state)
    setState(transition.state)
    if (transition.outcome === 'correct') {
      setMessage(`Group found: ${transition.group?.labels.join(' / ')}`)
      interactionLockedRef.current = false
    } else if (transition.outcome === 'wrong') {
      setMessage('Those four titles do not form one of the exact groups.')
      interactionLockedRef.current = false
    } else if (transition.outcome === 'complete' || transition.outcome === 'failed') {
      setMessage(null)
      void finish(transition.state)
    } else {
      interactionLockedRef.current = false
    }
  }

  async function giveUp() {
    if (state.status !== 'playing' || interactionLockedRef.current) return
    const ok = await confirmDialog('Reveal every group and finish this wall?', {
      confirmLabel: 'Reveal wall'
    })
    if (!ok) return
    interactionLockedRef.current = true
    const next: LinkWallState = { ...state, status: 'gaveUp', selectedKeys: [] }
    setState(next)
    void finish(next)
  }

  function groupCards(group: QuizLinkWallGroup) {
    return (
      <div key={group.key} className="rounded-xl border border-accent/30 bg-accent/5 p-4">
        <p className="text-sm font-semibold text-accent">{group.labels.join(' / ')}</p>
        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {group.titleKeys.map((key) => {
            const title = titleByKey.get(key)
            return title ? (
              <div key={key} className="flex items-center gap-2 rounded-lg bg-base-900/70 p-2">
                <CoverImage path={title.imagePath} alt="" className="h-12 w-8 shrink-0" />
                <span className="text-xs font-medium text-gray-200">{title.label}</span>
              </div>
            ) : null
          })}
        </div>
      </div>
    )
  }

  if (phase === 'setup') {
    return (
      <div className="mx-auto max-w-3xl p-6">
        <PageHeader
          back={{ to: '/quiz', label: 'Quiz' }}
          title="Link Wall"
          subtitle="Sort sixteen movies and TV shows into four exact groups of four."
          className="mb-6"
        />
        <div className="card space-y-6 p-6">
          <Group label="Library">
            {(['movie', 'tv', 'both'] as const).map((mode) => {
              const count = availability.data?.screenGameOptions.find((item) => item.mediaMode === mode)?.linkWall ?? 0
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
          {availability.isSuccess && available === 0 && <p className="text-sm text-gray-400">This selection cannot form a uniquely solvable wall with at least three clue families.</p>}
          {error && <p className="text-sm text-red-300">{error}</p>}
          <button className="btn-primary" disabled={loading || availability.isLoading || available === 0} onClick={() => void startGame()}>
            {loading ? 'Building wall…' : 'Start Link Wall'}
          </button>
        </div>
        <QuizRecord kind="linkWall" />
      </div>
    )
  }

  if (!question) return null

  if (phase === 'summary') {
    return (
      <StudySessionFrame title="Link Wall" subtitle={`${MODE_LABEL[mediaMode]} · ${scope === 'consumed' ? 'Completed' : 'All titles'}`}>
        <div className="text-center">
          <h2 className="text-4xl font-semibold tabular-nums text-white">{score} points</h2>
          <p className="mt-3 text-gray-400">{state.solvedGroupKeys.length} of 4 groups found · {state.mistakes} mistakes</p>
          {newBest && <p className="mt-3 text-sm font-semibold text-accent">New personal best.</p>}
          <div className="mt-7 flex justify-center gap-3">
            <button className="btn-primary" onClick={() => void startGame()}>Play again</button>
            <button className="btn-ghost" onClick={() => setPhase('setup')}>Change setup</button>
          </div>
        </div>
        <div className="mt-8 space-y-3">{question.groups.map(groupCards)}</div>
      </StudySessionFrame>
    )
  }

  const solvedTitleKeys = new Set(
    state.solvedGroupKeys.flatMap((key) => groupByKey.get(key)?.titleKeys ?? [])
  )
  const remainingKeys = orderKeys.filter((key) => !solvedTitleKeys.has(key))
  const locked = state.status !== 'playing' || saving
  return (
    <StudySessionFrame
      title="Link Wall"
      subtitle={`${MODE_LABEL[mediaMode]} · Select four titles that share one exact connection.`}
      progress={{ current: state.solvedGroupKeys.length, total: 4, label: 'Groups found' }}
      actions={
        <>
          <span className="pill tabular-nums">{question.maxMistakes - state.mistakes} mistakes left</span>
          <button className="btn-ghost" disabled={locked} onClick={() => void giveUp()}>Give up</button>
        </>
      }
      rail={
        <>
          <SessionEvidence title="Possible connections">
            <p>Main-cast actor, director, company, franchise, genre, or release decade. Every wall uses at least three different families.</p>
          </SessionEvidence>
          <SessionEvidence title="Scoring">
            <p>Each solved group is worth 250 points. Every wrong group costs 25 points. Four mistakes end the wall.</p>
          </SessionEvidence>
        </>
      }
      feedback={saveError ? (
        <SessionFeedback tone="incorrect" title="Result not saved">
          <p>{saveError}</p>
          <button className="btn-ghost mt-3" disabled={saving || state.status === 'playing'} onClick={() => void finish(state)}>Retry save</button>
        </SessionFeedback>
      ) : message ? (
        <SessionFeedback tone="neutral" title="Wall update">{message}</SessionFeedback>
      ) : undefined}
    >
      {state.solvedGroupKeys.length > 0 && (
        <div className="mb-4 space-y-3">{state.solvedGroupKeys.map((key) => groupByKey.get(key)).filter((group): group is QuizLinkWallGroup => Boolean(group)).map(groupCards)}</div>
      )}
      <div className="grid grid-cols-2 gap-2 md:grid-cols-4" aria-label="Unsolved wall titles">
        {remainingKeys.map((key) => {
          const title = titleByKey.get(key)
          if (!title) return null
          const selected = state.selectedKeys.includes(key)
          return (
            <button
              type="button"
              key={key}
              aria-pressed={selected}
              disabled={locked}
              className={`min-h-28 rounded-xl border p-2 text-left transition-colors ${
                selected ? 'border-accent bg-accent/10' : 'border-base-600 bg-base-800 hover:border-base-500'
              }`}
              onClick={() => {
                setState((current) => toggleLinkWallTitle(current, key))
                setMessage(null)
              }}
            >
              <div className="flex h-full items-center gap-2 sm:gap-3">
                <CoverImage path={title.imagePath} alt="" className="h-20 w-[54px] shrink-0" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">{title.label}</p>
                  <p className="mt-1 text-[11px] text-gray-500">{title.releaseYear ?? 'Year unknown'} · {title.mediaType === 'movie' ? 'Movie' : 'TV'}</p>
                </div>
              </div>
            </button>
          )
        })}
      </div>
      <div className="mt-5 flex flex-wrap gap-2 border-t border-base-700 pt-5">
        <button className="btn-primary" disabled={locked || state.selectedKeys.length !== 4} onClick={submitGroup}>Submit group</button>
        <button className="btn-ghost" disabled={locked || state.selectedKeys.length === 0} onClick={() => setState((current) => ({ ...current, selectedKeys: [] }))}>Clear selection</button>
        <button className="btn-ghost" disabled={locked || remainingKeys.length < 2} onClick={() => setOrderKeys((keys) => shuffle(keys))}>Shuffle titles</button>
      </div>
      <p className="mt-3 text-xs text-gray-500">{state.selectedKeys.length} of 4 selected</p>
    </StudySessionFrame>
  )
}
