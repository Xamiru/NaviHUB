import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toastError } from '../../lib/toast'
import type { GachaGameId, GachaGoal } from '@shared/types'
import CoachImportDialog from './CoachImportDialog'

// Right rail: reminders (tasks/goals — render from DB, no LLM), coach memory
// notes, imported chats, and the import / new-conversation actions.
export default function CoachRail({
  game,
  onNewThread
}: {
  game: GachaGameId
  onNewThread: () => void
}) {
  const qc = useQueryClient()
  const [importing, setImporting] = useState(false)

  const { data: goals = [] } = useQuery({
    queryKey: qk.gacha.goals(game),
    queryFn: () => api.gacha.goals(game)
  })
  const { data: notes = [] } = useQuery({
    queryKey: qk.gacha.coachNotes(game),
    queryFn: () => api.gacha.coachNotes(game)
  })
  const { data: docs = [] } = useQuery({
    queryKey: qk.gacha.coachDocs(game),
    queryFn: () => api.gacha.coachDocs(game)
  })

  const invalidate = (): Promise<void> => qc.invalidateQueries({ queryKey: qk.gacha.all }).then()

  async function complete(id: number): Promise<void> {
    try {
      await api.gacha.completeGoal(id)
      await invalidate()
    } catch (e) {
      toastError(e)
    }
  }
  async function drop(id: number): Promise<void> {
    await api.gacha.dropGoal(id)
    await invalidate()
  }
  async function removeNote(id: number): Promise<void> {
    await api.gacha.removeCoachNote(id)
    await invalidate()
  }
  async function removeDoc(id: number): Promise<void> {
    await api.gacha.removeCoachDoc(id)
    await invalidate()
  }

  const tasks = goals.filter((g) => g.kind === 'task')
  const plainGoals = goals.filter((g) => g.kind === 'goal')

  return (
    <aside className="space-y-6">
      <div className="flex gap-2">
        <button className="btn-ghost flex-1" onClick={() => setImporting(true)}>
          Import chat
        </button>
        <button className="btn-ghost flex-1" onClick={onNewThread}>
          New conversation
        </button>
      </div>

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">Tasks</h3>
        {tasks.length === 0 ? (
          <p className="text-xs text-gray-500">No tasks yet — ask the coach to remind you of your dailies.</p>
        ) : (
          <ul className="space-y-1.5">
            {tasks.map((g) => (
              <GoalRow key={g.id} goal={g} onComplete={complete} onDrop={drop} />
            ))}
          </ul>
        )}
      </section>

      {plainGoals.length > 0 && (
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">Goals</h3>
          <ul className="space-y-1.5">
            {plainGoals.map((g) => (
              <GoalRow key={g.id} goal={g} onComplete={complete} onDrop={drop} />
            ))}
          </ul>
        </section>
      )}

      <section>
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
          Coach memory
        </h3>
        {notes.length === 0 ? (
          <p className="text-xs text-gray-500">The coach will note things about you here.</p>
        ) : (
          <ul className="space-y-1.5">
            {notes.map((n) => (
              <li key={n.id} className="group flex items-start gap-2 text-xs text-gray-300">
                <span className="flex-1">{n.content}</span>
                <button
                  className="text-gray-600 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hover:text-red-400"
                  title="Delete note"
                  aria-label="Delete note"
                  onClick={() => removeNote(n.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        )}
      </section>

      {docs.length > 0 && (
        <section>
          <h3 className="mb-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
            Imported chats
          </h3>
          <ul className="space-y-1.5">
            {docs.map((d) => (
              <li key={d.id} className="group flex items-start gap-2 text-xs text-gray-300">
                <span className="flex-1 truncate" title={d.summary ?? undefined}>
                  {d.title}
                </span>
                <button
                  className="text-gray-600 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hover:text-red-400"
                  title="Delete import"
                  aria-label="Delete import"
                  onClick={() => removeDoc(d.id)}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
        </section>
      )}

      {importing && <CoachImportDialog game={game} onClose={() => setImporting(false)} />}
    </aside>
  )
}

function GoalRow({
  goal,
  onComplete,
  onDrop
}: {
  goal: GachaGoal
  onComplete: (id: number) => void
  onDrop: (id: number) => void
}) {
  const today = new Date().toISOString().slice(0, 10)
  const overdue = goal.dueAt != null && goal.dueAt < today
  const dueToday = goal.dueAt === today
  return (
    <li className="group flex items-start gap-2 text-sm">
      <button
        className="mt-0.5 h-4 w-4 shrink-0 rounded border border-base-500 hover:border-accent"
        title="Complete"
        aria-label="Complete"
        onClick={() => onComplete(goal.id)}
      />
      <div className="min-w-0 flex-1">
        <p className={overdue ? 'text-red-400' : dueToday ? 'text-amber-400' : 'text-gray-200'}>
          {goal.title}
        </p>
        {goal.dueAt && (
          <p className="text-[11px] text-gray-500">
            {overdue ? 'Overdue · ' : dueToday ? 'Due today · ' : ''}
            {goal.dueAt}
            {goal.recur ? ` · ${goal.recur}` : ''}
          </p>
        )}
      </div>
      <button
        className="text-gray-600 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 hover:text-gray-300"
        title="Drop"
        aria-label="Drop"
        onClick={() => onDrop(goal.id)}
      >
        ✕
      </button>
    </li>
  )
}
