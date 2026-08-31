import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { useTutorSessionState } from '../lib/japaneseTutorSession'
import PageHeader from '../components/PageHeader'
import StudySessionFrame, { SessionEvidence } from '../components/StudySessionFrame'
import {
  ROLEPLAY_SCENARIOS,
  checkRoleplayResponse,
  nextRoleplayScenario,
  roleplayNode,
  type RoleplayChoice
} from '@shared/japanese/roleplay'

interface TurnRecord {
  nodeId: string
  speakerLine: string
  response: string
  model: string
  matched: number
  total: number
}

export default function JapaneseRoleplayPage() {
  const qc = useQueryClient()
  const { data: outputHistory } = useQuery({
    queryKey: qk.quiz.historyAll('jpOutput'),
    queryFn: () => api.quiz.history('jpOutput', 200),
    staleTime: 0
  })
  const activeTutor = useTutorSessionState(false)
  const [scenarioId, setScenarioId] = usePersistedState('jpRoleplayScenario', ROLEPLAY_SCENARIOS[0].id)
  const [nodeId, setNodeId] = usePersistedState('jpRoleplayNode', '')
  const [turns, setTurns] = usePersistedState<TurnRecord[]>('jpRoleplayTurns', [])
  const [answer, setAnswer] = usePersistedState('jpRoleplayAnswer', '')
  const [revealed, setRevealed] = usePersistedState('jpRoleplayRevealed', false)
  const [finished, setFinished] = usePersistedState('jpRoleplayFinished', false)
  const [busy, setBusy] = useState(false)
  const scenario = ROLEPLAY_SCENARIOS.find((item) => item.id === scenarioId) ?? ROLEPLAY_SCENARIOS[0]
  const activeNodeId = nodeId || scenario.startNodeId
  const node = roleplayNode(scenario, activeNodeId) ?? roleplayNode(scenario, scenario.startNodeId)!
  const check = useMemo(
    () => (revealed ? checkRoleplayResponse(answer, node) : null),
    [answer, node, revealed]
  )

  function reset(nextScenarioId = scenario.id): void {
    const next = ROLEPLAY_SCENARIOS.find((item) => item.id === nextScenarioId) ?? ROLEPLAY_SCENARIOS[0]
    setScenarioId(next.id)
    setNodeId(next.startNodeId)
    setTurns([])
    setAnswer('')
    setRevealed(false)
    setFinished(false)
  }

  function resetToRecommendedNext(): void {
    const recentScenarioIds = [
      scenario.id,
      ...(outputHistory?.recent.flatMap((session) => {
        const id = session.settings?.scenarioId
        return typeof id === 'string' ? [id] : []
      }) ?? [])
    ]
    reset(nextRoleplayScenario(ROLEPLAY_SCENARIOS, recentScenarioIds, scenario.id).id)
  }

  async function choose(choice: RoleplayChoice): Promise<void> {
    if (!check) return
    const nextTurns = [
      ...turns,
      {
        nodeId: node.id,
        speakerLine: node.line,
        response: answer.trim(),
        model: choice.japanese,
        matched: check.matched,
        total: check.total
      }
    ]
    if (choice.nextNodeId) {
      setTurns(nextTurns)
      setAnswer('')
      setRevealed(false)
      setNodeId(choice.nextNodeId)
      return
    }

    setBusy(true)
    try {
      const score = nextTurns.reduce((sum, turn) => sum + turn.matched, 0)
      const total = nextTurns.reduce((sum, turn) => sum + turn.total, 0)
      await api.quiz.logSession({
        kind: 'jpOutput',
        score,
        total,
        bestStreak: 0,
        settings: {
          mode: 'branching-roleplay',
          scenarioId: scenario.id,
          path: nextTurns.map((turn) => turn.nodeId)
        }
      })
      await qc.invalidateQueries({ queryKey: qk.quiz.history('jpOutput') })
      setTurns(nextTurns)
      setAnswer('')
      setRevealed(false)
      setFinished(true)
    } finally {
      setBusy(false)
    }
  }

  if (finished) {
    const score = turns.reduce((sum, turn) => sum + turn.matched, 0)
    const total = turns.reduce((sum, turn) => sum + turn.total, 0)
    return (
      <div className="mx-auto max-w-4xl p-4 sm:p-6">
        <PageHeader
          back={{ to: '/japanese', label: 'Japanese' }}
          title="Role-play complete"
          subtitle={`${scenario.title}. You carried the exchange through ${turns.length} constrained turns without a network model.`}
        />
        <div className="grid gap-7 lg:grid-cols-[minmax(0,1fr)_280px]">
          <div className="divide-y divide-base-700 border-y border-base-700">
            {turns.map((turn, index) => (
              <article key={`${turn.nodeId}-${index}`} className="py-5">
                <p className="text-sm text-gray-500">Partner: {turn.speakerLine}</p>
                <p className="mt-2 leading-7 text-white">You: {turn.response}</p>
                <p className="mt-2 text-sm leading-6 text-gray-400">Compared path: {turn.model}</p>
              </article>
            ))}
          </div>
          <aside className="card self-start p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">Function signals</p>
            <p className="mt-3 text-3xl font-semibold tabular-nums text-white">{score} / {total}</p>
            <p className="mt-3 text-sm leading-6 text-gray-400">
              This checks the intended language functions, not every valid expression or full naturalness.
            </p>
            <div className="mt-5 space-y-2">
              {activeTutor && <Link to="/japanese/tutor/session" className="btn-primary block text-center">Continue Tutor session</Link>}
              <button type="button" className={activeTutor ? 'btn-ghost w-full' : 'btn-primary w-full'} onClick={() => reset()}>
                Repeat scenario
              </button>
              <button type="button" className="btn-ghost w-full" onClick={resetToRecommendedNext}>
                Practice least-recent scenario
              </button>
            </div>
          </aside>
        </div>
      </div>
    )
  }

  return (
    <StudySessionFrame
      title="Branching Japanese role-play"
      subtitle={`${scenario.title} · ${scenario.level}`}
      progress={{ current: turns.length + 1, total: Math.max(3, turns.length + 1), label: 'Produce before choosing a path' }}
      actions={<Link to="/japanese/output" className="btn-ghost">Controlled output</Link>}
      rail={
        <>
          <SessionEvidence title="Conversation purpose"><p>{scenario.purpose}</p></SessionEvidence>
          <SessionEvidence title="Offline boundaries">
            <p>All {ROLEPLAY_SCENARIOS.length} conversations and response paths are authored in the app. The structure check is exact and deterministic.</p>
          </SessionEvidence>
          {turns.length > 0 && (
            <SessionEvidence title="Exchange so far">
              <ol className="space-y-3">
                {turns.map((turn, index) => <li key={`${turn.nodeId}-${index}`}>{index + 1}. {turn.model}</li>)}
              </ol>
            </SessionEvidence>
          )}
        </>
      }
      surface={false}
    >
      {turns.length === 0 && (
        <div className="mb-6 flex flex-wrap gap-2 border-b border-base-700 pb-5">
          {ROLEPLAY_SCENARIOS.map((item) => (
            <button
              key={item.id}
              type="button"
              className={item.id === scenario.id ? 'pill pill-active' : 'pill'}
              onClick={() => reset(item.id)}
            >
              {item.title}
            </button>
          ))}
        </div>
      )}

      <div className="border-b border-base-700 pb-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">{node.speaker}</p>
        <p className="mt-3 text-2xl leading-relaxed text-white">{node.line}</p>
        <p className="mt-1 text-sm text-gray-500">{node.reading}</p>
      </div>

      <div className="mt-6">
        <label className="label" htmlFor="jp-roleplay-answer">Your move: {node.goal}</label>
        <textarea
          id="jp-roleplay-answer"
          className="input mt-2 min-h-32 w-full resize-y text-lg leading-8"
          value={answer}
          onChange={(event) => setAnswer(event.target.value)}
          placeholder="Respond in Japanese before seeing the authored paths"
          autoFocus
        />
        {!revealed && (
          <button type="button" className="btn-primary mt-3" disabled={!answer.trim()} onClick={() => setRevealed(true)}>
            Check and continue conversation
          </button>
        )}
      </div>

      {revealed && check && (
        <div className="mt-7 border-t border-base-700 pt-6" aria-live="polite">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h2 className="text-lg font-semibold text-white">Choose the closest natural path</h2>
            <p className="text-sm tabular-nums text-gray-400">{check.matched} / {check.total} intended signals found</p>
          </div>
          {check.missing.length > 0 && (
            <p className="mt-2 text-sm leading-6 text-signal-caution">Still missing: {check.missing.join('; ')}</p>
          )}
          <div className="mt-4 divide-y divide-base-700 border-y border-base-700">
            {node.choices.map((choice) => (
              <button
                key={choice.id}
                type="button"
                className="block w-full px-1 py-4 text-left hover:bg-base-700/30"
                disabled={busy}
                onClick={() => void choose(choice)}
              >
                <span className="block text-lg leading-7 text-white">{choice.japanese}</span>
                <span className="mt-1 block text-sm text-gray-500">{choice.reading}</span>
                <span className="mt-2 block text-sm leading-6 text-gray-400">{choice.note}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </StudySessionFrame>
  )
}
