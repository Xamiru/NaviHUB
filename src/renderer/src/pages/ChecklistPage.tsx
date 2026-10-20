import { useMemo, useState } from 'react'
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { usePersistedState } from '../lib/navState'
import { addDays } from '@shared/checklist'
import Section from '../components/Section'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import ThemedFailure from '../components/theme/ThemedFailure'
import CalendarHeatmap from '../components/CalendarHeatmap'
import { SortableList, SortableRow, useOptimisticReorder } from '../components/SortableList'
import ChecklistTaskRow from '../components/checklist/ChecklistTaskRow'
import ChecklistAddDialog from '../components/checklist/ChecklistAddDialog'
import ChecklistItemDialog, { type ItemChanges } from '../components/checklist/ChecklistItemDialog'
import ChecklistMediaPickerDialog from '../components/checklist/ChecklistMediaPickerDialog'
import {
  useChecklistActions,
  type ChecklistActions
} from '../components/checklist/useChecklistActions'
import {
  STATE_DOT,
  STATE_LABEL,
  fmtDay,
  fmtDayOfMonth,
  fmtWeekday
} from '../components/checklist/checklistFormat'
import type { ChecklistCadence, ChecklistStatus, ChecklistTaskStatus } from '@shared/types'

const EDITABLE_DAYS = 364 // main's window; stepping back further is refused there

export default function ChecklistPage() {
  const qc = useQueryClient()
  // null = today, whatever day main says that is. A chosen earlier day is
  // always one of main's own date strings, sent back for main to validate.
  const [day, setDay] = usePersistedState<string | null>('checklist.day', null)
  const [reorder, setReorder] = useState(false)
  const [adding, setAdding] = useState<ChecklistCadence | null>(null)
  const [logging, setLogging] = useState<ChecklistTaskStatus | null>(null)
  const [editing, setEditing] = useState<ChecklistTaskStatus | null>(null)
  const actions = useChecklistActions(day)

  // staleTime 0 so coming back from /japanese/review (or a media page) re-reads
  // immediately; the interval catches midnight on a page left open.
  const { data, isPending, isError, error, refetch } = useQuery({
    queryKey: qk.checklist.status(day),
    queryFn: () => api.checklist.status(day ?? undefined),
    staleTime: 0,
    refetchInterval: 60_000,
    placeholderData: keepPreviousData
  })

  if (isError && !data) {
    return (
      <div className="p-6">
        <ThemedFailure
          message={`Could not read your checklist${error instanceof Error ? ` — ${error.message}` : ''}`}
          onRetry={() => void refetch()}
        />
      </div>
    )
  }
  if (isPending || !data) return <PageStatus>Loading…</PageStatus>

  const viewingToday = data.day === data.today
  const choose = (d: string): void => setDay(d === data.today ? null : d)
  const empty = data.daily.length === 0 && data.weekly.length === 0

  async function save(task: ChecklistTaskStatus, changes: ItemChanges): Promise<void> {
    setEditing(null)
    await actions.run(async () => {
      if (changes.custom && task.customId != null) {
        await api.checklist.updateCustom(task.customId, changes.custom)
      }
      if (changes.target !== undefined) await api.checklist.setTarget(task.id, changes.target)
      if (changes.days !== undefined) await api.checklist.setDays(task.id, changes.days)
    })
  }

  return (
    <div className="mx-auto max-w-[1100px] p-6">
      <PageHeader
        title="Checklist"
        subtitle="Your daily and weekly routine. Weeks run Saturday to Friday."
        actions={
          <>
            {!empty && (
              <button
                type="button"
                className="btn-ghost"
                aria-pressed={reorder}
                onClick={() => setReorder((v) => !v)}
              >
                {reorder ? 'Done reordering' : 'Reorder'}
              </button>
            )}
            <button type="button" className="btn-primary" onClick={() => setAdding('daily')}>
              Add item
            </button>
          </>
        }
      />

      <Hero data={data} actions={actions} onChoose={choose} />

      {!viewingToday && (
        <div className="mb-6 flex flex-wrap items-center gap-3 rounded border border-accent/40 bg-accent/5 px-4 py-2 text-sm">
          <span>
            Editing <strong>{fmtDay(data.day)}</strong>. Ticks, credits and logs count for that day.
          </span>
          <button type="button" className="btn-ghost ml-auto px-2 py-1 text-xs" onClick={() => setDay(null)}>
            Back to today
          </button>
        </div>
      )}

      {empty ? (
        <div className="card p-6">
          <p className="text-sm text-gray-300">
            Nothing on your board yet. Add built-in items that track themselves, or make your own.
          </p>
          <button type="button" className="btn-primary mt-4" onClick={() => setAdding('daily')}>
            Add your first item
          </button>
        </div>
      ) : (
        <>
          <Board
            cadence="daily"
            title={viewingToday ? 'Today' : fmtDay(data.day)}
            subtitle={data.restDay ? 'Rest day' : undefined}
            tasks={data.daily}
            reorder={reorder}
            actions={actions}
            onAdd={() => setAdding('daily')}
            onLog={setLogging}
            onEdit={setEditing}
            onReordered={() => void qc.invalidateQueries({ queryKey: qk.checklist.all })}
          />
          <Board
            cadence="weekly"
            title={viewingToday ? 'This week' : 'That week'}
            subtitle={`${fmtDay(data.week.start)} – ${fmtDay(data.week.end)}`}
            tasks={data.weekly}
            reorder={reorder}
            actions={actions}
            onAdd={() => setAdding('weekly')}
            onLog={setLogging}
            onEdit={setEditing}
            onReordered={() => void qc.invalidateQueries({ queryKey: qk.checklist.all })}
          />
        </>
      )}

      {data.history.length > 0 && (
        <Section title="History" subtitle="daily items done; outlined days were skipped">
          <div className="card p-4">
            <CalendarHeatmap
              days={data.history}
              skipped={data.history.filter((h) => h.skipped).map((h) => h.day)}
              unit="items done"
            />
          </div>
        </Section>
      )}

      {adding && (
        <ChecklistAddDialog
          cadence={adding}
          onCadence={setAdding}
          enabledKeys={{
            daily: data.daily.map((t) => t.key),
            weekly: data.weekly.map((t) => t.key)
          }}
          onAdd={(key, cadence) => {
            setAdding(null) // close first — awaiting the refetch would flicker the list
            void actions.run(() => api.checklist.addTask(key, cadence))
          }}
          onCreate={(input, cadence, days) => {
            setAdding(null)
            void actions.run(() => api.checklist.createCustom(input, cadence, days))
          }}
          onClose={() => setAdding(null)}
        />
      )}

      {logging && logging.mediaType && (
        <ChecklistMediaPickerDialog
          task={logging}
          mediaType={logging.mediaType}
          onPick={(mediaId) => {
            const task = logging
            setLogging(null)
            void actions.log(task, mediaId)
          }}
          onClose={() => setLogging(null)}
        />
      )}

      {editing && (
        <ChecklistItemDialog
          task={editing}
          onSave={(changes) => void save(editing, changes)}
          onRemove={() => {
            const task = editing
            setEditing(null)
            void actions.remove(task)
          }}
          onDelete={() => {
            const id = editing.customId
            setEditing(null)
            if (id != null) void actions.run(() => api.checklist.deleteCustom(id))
          }}
          onClose={() => setEditing(null)}
        />
      )}
    </div>
  )
}

// The viewed day at a glance, the streak, and the week strip that steps the
// board to any day of this week (or back a week at a time).
function Hero({
  data,
  actions,
  onChoose
}: {
  data: ChecklistStatus
  actions: ChecklistActions
  onChoose: (day: string) => void
}) {
  const { done, due } = data.summary
  const pct = due ? Math.round((done / due) * 100) : 0
  const viewingToday = data.day === data.today
  const weeklyDone = data.weekly.filter((t) => t.done).length
  const earliest = addDays(data.today, -(EDITABLE_DAYS - 1))
  const prevWeekDay = addDays(data.week.start, -1)
  const nextWeekDay = addDays(data.week.end, 1)
  const canPrev = prevWeekDay >= earliest
  const canNext = nextWeekDay <= data.today

  return (
    <div className="card-glow relative mb-6 overflow-hidden p-6">
      <div className="flex flex-wrap items-start gap-4">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-widest text-accent">
            {viewingToday ? 'Today' : 'Viewing'} · {fmtDay(data.day)}
          </p>
          {data.restDay ? (
            <p className="mt-1 text-3xl font-bold">Rest day</p>
          ) : due === 0 ? (
            <p className="mt-1 text-3xl font-bold">Nothing due</p>
          ) : (
            <p className="mt-1 flex items-baseline gap-2">
              <span className="text-5xl font-bold tabular-nums">{done}</span>
              <span className="text-2xl font-semibold text-gray-300">/ {due} due</span>
            </p>
          )}
        </div>
        <button
          type="button"
          className="btn-ghost"
          aria-pressed={data.restDay}
          onClick={() => void actions.restDay(!data.restDay)}
          title="A rest day neither completes nor breaks your streak"
        >
          {data.restDay ? 'Undo rest day' : 'Take a rest day'}
        </button>
      </div>

      {!data.restDay && due > 0 && (
        <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-base-900/60" aria-hidden>
          <div
            className="h-full bg-accent transition-[width] motion-reduce:transition-none"
            style={{ width: `${pct}%` }}
          />
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <span className="chip">
          {data.streak.current} day{data.streak.current === 1 ? '' : 's'} in a row
        </span>
        <span className="chip">best {data.streak.longest}</span>
        {data.weekly.length > 0 && (
          <span className="chip">
            {viewingToday ? 'this week' : 'that week'} {weeklyDone} / {data.weekly.length}
          </span>
        )}
      </div>

      <nav className="mt-5 flex items-center gap-1.5" aria-label="Choose a day">
        <button
          type="button"
          className="btn-ghost px-2 py-1 text-xs"
          disabled={!canPrev}
          onClick={() => onChoose(prevWeekDay)}
        >
          Previous week
        </button>
        <ol className="grid flex-1 grid-cols-7 gap-1.5">
          {data.weekDays.map((cell) => {
            const selected = cell.day === data.day
            const future = cell.state === 'future'
            const label = `${fmtDay(cell.day)}${cell.day === data.today ? ' (today)' : ''}: ${
              STATE_LABEL[cell.state]
            }${cell.due > 0 ? `, ${cell.done} of ${cell.due} done` : ''}`
            return (
              <li key={cell.day}>
                <button
                  type="button"
                  disabled={future}
                  aria-current={selected ? 'date' : undefined}
                  aria-label={label}
                  title={label}
                  onClick={() => onChoose(cell.day)}
                  className={`flex w-full flex-col items-center gap-1 rounded-md border px-1 py-1.5 text-xs transition-colors disabled:cursor-default disabled:opacity-40 ${
                    selected
                      ? 'border-accent bg-accent/10 text-white'
                      : 'border-transparent text-gray-400 hover:border-line-subtle hover:text-white'
                  }`}
                >
                  <span>{fmtWeekday(cell.day)}</span>
                  <span className="text-sm font-semibold tabular-nums">{fmtDayOfMonth(cell.day)}</span>
                  <span className={`h-2 w-2 rounded-sm ${STATE_DOT[cell.state]}`} aria-hidden />
                </button>
              </li>
            )
          })}
        </ol>
        <button
          type="button"
          className="btn-ghost px-2 py-1 text-xs"
          disabled={!canNext}
          onClick={() => onChoose(nextWeekDay)}
        >
          Next week
        </button>
      </nav>
    </div>
  )
}

function Board({
  cadence,
  title,
  subtitle,
  tasks,
  reorder,
  actions,
  onAdd,
  onLog,
  onEdit,
  onReordered
}: {
  cadence: ChecklistCadence
  title: string
  subtitle?: string
  tasks: ChecklistTaskStatus[]
  reorder: boolean
  actions: ChecklistActions
  onAdd: () => void
  onLog: (task: ChecklistTaskStatus) => void
  onEdit: (task: ChecklistTaskStatus) => void
  onReordered: () => void
}) {
  // useOptimisticReorder keys on itemId, and re-syncs whenever the source array
  // identity changes — so this must be memoised, not rebuilt every render.
  const rows = useMemo(() => tasks.map((t) => ({ ...t, itemId: t.id })), [tasks])
  const { items, sensors, onDragEnd } = useOptimisticReorder(
    rows,
    (next) => api.checklist.reorder(cadence, next.map((t) => t.itemId)),
    onReordered
  )
  const row = (task: ChecklistTaskStatus) => ({ task, actions, onLog, onEdit })

  // Items not due on this day — off their schedule, or not on the board yet —
  // fold away under the due ones.
  const due = items.filter((t) => t.state !== 'off' || t.done)
  const off = items.filter((t) => t.state === 'off' && !t.done)

  return (
    <Section
      title={title}
      subtitle={subtitle}
      actions={
        <button type="button" className="text-xs text-accent hover:underline" onClick={onAdd}>
          Add {cadence} item
        </button>
      }
    >
      <div className="card overflow-hidden">
        {items.length === 0 ? (
          <p className="px-4 py-6 text-sm text-gray-400">
            Nothing on this board.{' '}
            <button type="button" className="text-accent hover:underline" onClick={onAdd}>
              Add an item
            </button>
            .
          </p>
        ) : reorder ? (
          <SortableList ids={items.map((t) => t.itemId)} sensors={sensors} onDragEnd={onDragEnd}>
            {items.map((task) => (
              <SortableRow key={task.itemId} id={task.itemId}>
                {(handle) => <ChecklistTaskRow {...row(task)} handle={handle} />}
              </SortableRow>
            ))}
          </SortableList>
        ) : (
          <>
            {due.map((task) => (
              <ChecklistTaskRow key={task.itemId} {...row(task)} />
            ))}
            {due.length === 0 && (
              <p className="px-4 py-4 text-sm text-gray-400">Nothing scheduled for this day.</p>
            )}
            {off.length > 0 && (
              <details className="border-t border-base-700">
                <summary className="cursor-pointer px-4 py-2 text-xs text-gray-400 hover:text-white">
                  Not due this day ({off.length})
                </summary>
                {off.map((task) => (
                  <ChecklistTaskRow key={task.itemId} {...row(task)} />
                ))}
              </details>
            )}
          </>
        )}
      </div>
    </Section>
  )
}
