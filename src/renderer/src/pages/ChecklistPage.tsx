import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'
import { checklistDef } from '@shared/checklist'
import Section from '../components/Section'
import PageHeader from '../components/PageHeader'
import PageStatus from '../components/PageStatus'
import CalendarHeatmap from '../components/CalendarHeatmap'
import { SortableList, SortableRow, useOptimisticReorder } from '../components/SortableList'
import ChecklistTaskRow from '../components/checklist/ChecklistTaskRow'
import ChecklistAddDialog from '../components/checklist/ChecklistAddDialog'
import ChecklistMediaPickerDialog from '../components/checklist/ChecklistMediaPickerDialog'
import type { ChecklistCadence, ChecklistStatus, ChecklistTaskStatus } from '@shared/types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Formatting only: main sends local 'YYYY-MM-DD' strings, so the parts are read
// back through UTC accessors. Nothing here derives what day it is.
function fmtDay(date: string): string {
  const [y, m, d] = date.split('-').map(Number)
  const weekday = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()]
  return `${weekday} ${d} ${MONTHS[m - 1]}`
}

export default function ChecklistPage() {
  const qc = useQueryClient()
  const [editMode, setEditMode] = useState(false)
  const [adding, setAdding] = useState<ChecklistCadence | null>(null)
  const [logging, setLogging] = useState<ChecklistTaskStatus | null>(null)

  // staleTime 0 so coming back from /japanese/review (or a media page) re-reads
  // immediately; the interval catches midnight on a page left open.
  const { data, isLoading } = useQuery({
    queryKey: qk.checklist.status,
    queryFn: () => api.checklist.status(),
    staleTime: 0,
    refetchInterval: 60_000
  })

  async function run(fn: () => Promise<unknown>, touchesMedia = false): Promise<void> {
    try {
      await fn()
      await qc.invalidateQueries({ queryKey: qk.checklist.all })
      if (touchesMedia) await qc.invalidateQueries({ queryKey: qk.media.all })
    } catch (e) {
      toastError(e)
    }
  }

  if (isLoading || !data) return <PageStatus>Loading…</PageStatus>

  const doneToday = data.daily.filter((t) => t.done).length
  const doneWeek = data.weekly.filter((t) => t.done).length

  return (
    <div className="mx-auto max-w-[1600px] p-6">
      <PageHeader
        title="Checklist"
        subtitle="Your routine. Weeks run Saturday to Friday; days roll over at midnight."
        actions={
          <button className="btn-ghost" onClick={() => setEditMode((v) => !v)}>
            {editMode ? 'Done editing' : 'Edit board'}
          </button>
        }
      />

      <Hero data={data} doneToday={doneToday} doneWeek={doneWeek} />

      <Board
        cadence="daily"
        title="Daily"
        subtitle={fmtDay(data.today)}
        tasks={data.daily}
        editMode={editMode}
        onAdd={() => setAdding('daily')}
        onLog={setLogging}
        run={run}
      />

      <Board
        cadence="weekly"
        title="Weekly"
        subtitle={`${fmtDay(data.week.start)} – ${fmtDay(data.week.end)}`}
        tasks={data.weekly}
        editMode={editMode}
        onAdd={() => setAdding('weekly')}
        onLog={setLogging}
        run={run}
      />

      {data.history.length > 0 && (
        <Section title="History" subtitle="days with every daily item done">
          <div className="card p-4">
            <CalendarHeatmap days={data.history} unit="items done" />
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
            run(() => api.checklist.addTask(key, cadence))
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
            run(async () => {
              const res = await api.checklist.logMedia(task.key, task.cadence, mediaId)
              if (res.startedRewatch) toast(`${res.title} — pass #${res.rewatchCount} started`, 'success')
            }, true)
          }}
          onClose={() => setLogging(null)}
        />
      )}
    </div>
  )
}

// Today at a glance: the fraction, a bar, and the streak — the StatsPage hero
// treatment (.card-glow).
function Hero({
  data,
  doneToday,
  doneWeek
}: {
  data: ChecklistStatus
  doneToday: number
  doneWeek: number
}) {
  const total = data.daily.length
  const pct = total ? Math.round((doneToday / total) * 100) : 0
  return (
    <div className="card-glow relative mb-8 overflow-hidden p-6">
      <div className="text-xs font-semibold uppercase tracking-widest text-accent">
        Today · {fmtDay(data.today)}
      </div>
      <div className="mt-1 flex items-baseline gap-2">
        <span className="text-5xl font-bold tabular-nums">{doneToday}</span>
        <span className="text-2xl font-semibold text-gray-300">
          / {total} {total === 1 ? 'item' : 'items'}
        </span>
        {total > 0 && <span className="ml-auto text-sm tabular-nums text-gray-400">{pct}%</span>}
      </div>
      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-base-900/60">
        <div
          className="h-full bg-accent transition-[width] motion-reduce:transition-none"
          style={{ width: `${pct}%` }}
        />
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        <span className="chip">
          {data.streak.current} day{data.streak.current === 1 ? '' : 's'} in a row
        </span>
        <span className="chip">best {data.streak.longest}</span>
        <span className="chip">
          this week {doneWeek} / {data.weekly.length}
        </span>
      </div>
    </div>
  )
}

function Board({
  cadence,
  title,
  subtitle,
  tasks,
  editMode,
  onAdd,
  onLog,
  run
}: {
  cadence: ChecklistCadence
  title: string
  subtitle: string
  tasks: ChecklistTaskStatus[]
  editMode: boolean
  onAdd: () => void
  onLog: (task: ChecklistTaskStatus) => void
  run: (fn: () => Promise<unknown>, touchesMedia?: boolean) => Promise<void>
}) {
  const qc = useQueryClient()
  // useOptimisticReorder keys on itemId, and re-syncs whenever the source array
  // identity changes — so this must be memoised, not rebuilt every render.
  const rows = useMemo(() => tasks.map((t) => ({ ...t, itemId: t.id })), [tasks])
  const { items, sensors, onDragEnd } = useOptimisticReorder(
    rows,
    (next) => api.checklist.reorder(cadence, next.map((t) => t.itemId)),
    () => void qc.invalidateQueries({ queryKey: qk.checklist.all })
  )

  const rowProps = (task: ChecklistTaskStatus) => ({
    task,
    hint: checklistDef(task.key)?.hint ?? '',
    editMode,
    onLog,
    onCredit: (t: ChecklistTaskStatus) => run(() => api.checklist.credit(t.key, t.cadence)),
    onUndo: (logId: number) => run(() => api.checklist.undoLog(logId), true),
    onToggle: (t: ChecklistTaskStatus, done: boolean) =>
      run(() =>
        done ? api.checklist.tick(t.key, t.cadence) : api.checklist.untick(t.key, t.cadence)
      ),
    onTarget: (t: ChecklistTaskStatus, target: number | null) =>
      run(() => api.checklist.setTarget(t.id, target)),
    onRemove: (t: ChecklistTaskStatus) => run(() => api.checklist.removeTask(t.id))
  })

  return (
    <Section
      title={title}
      subtitle={
        <span className="flex items-center gap-3">
          {subtitle}
          {editMode && (
            <button className="text-accent hover:underline" onClick={onAdd}>
              + Add
            </button>
          )}
        </span>
      }
    >
      <div className="card overflow-hidden">
        {items.length === 0 ? (
          <p className="px-4 py-6 text-sm text-gray-400">
            Nothing on this board.{' '}
            <button className="text-accent hover:underline" onClick={onAdd}>
              Add an item
            </button>
            .
          </p>
        ) : editMode ? (
          <SortableList ids={items.map((t) => t.itemId)} sensors={sensors} onDragEnd={onDragEnd}>
            {items.map((task) => (
              <SortableRow key={task.itemId} id={task.itemId}>
                {(handle) => <ChecklistTaskRow {...rowProps(task)} handle={handle} />}
              </SortableRow>
            ))}
          </SortableList>
        ) : (
          items.map((task) => <ChecklistTaskRow key={task.itemId} {...rowProps(task)} />)
        )}
      </div>
    </Section>
  )
}
