import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toastError } from '../lib/toast'
import { checklistDef } from '@shared/checklist'
import Section from '../components/Section'
import StatTile from '../components/StatTile'
import PageStatus from '../components/PageStatus'
import CalendarHeatmap from '../components/CalendarHeatmap'
import ChecklistTaskRow from '../components/checklist/ChecklistTaskRow'
import ChecklistAddDialog from '../components/checklist/ChecklistAddDialog'
import ChecklistMediaPickerDialog from '../components/checklist/ChecklistMediaPickerDialog'
import type { ChecklistCadence, ChecklistTaskStatus } from '@shared/types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// Formatting only: main sends local 'YYYY-MM-DD' strings, so the parts are read
// back through UTC accessors. Nothing here derives what day it is.
function parts(date: string): { weekday: string; day: number; month: string } {
  const [y, m, d] = date.split('-').map(Number)
  const utc = new Date(Date.UTC(y, m - 1, d))
  return { weekday: WEEKDAYS[utc.getUTCDay()], day: d, month: MONTHS[m - 1] }
}

function fmtDay(date: string): string {
  const p = parts(date)
  return `${p.weekday} ${p.day} ${p.month}`
}

function fmtRange(start: string, end: string): string {
  return `${fmtDay(start)} – ${fmtDay(end)}`
}

export default function ChecklistPage() {
  const qc = useQueryClient()
  const [editMode, setEditMode] = useState(false)
  const [adding, setAdding] = useState<ChecklistCadence | null>(null)
  const [logging, setLogging] = useState<ChecklistTaskStatus | null>(null)

  // staleTime 0 so coming back from /japanese/review (or the manga reader)
  // re-detects immediately; the interval catches midnight on a page left open.
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
  const enabledKeys = {
    daily: data.daily.map((t) => t.key),
    weekly: data.weekly.map((t) => t.key)
  }

  const board = (cadence: ChecklistCadence, tasks: ChecklistTaskStatus[]) => (
    <div className="card overflow-hidden">
      {tasks.length === 0 ? (
        <p className="px-4 py-6 text-sm text-gray-400">
          Nothing on this board yet.{' '}
          <button className="text-accent hover:underline" onClick={() => setAdding(cadence)}>
            Add an item
          </button>
          .
        </p>
      ) : (
        tasks.map((t) => (
          <ChecklistTaskRow
            key={`${t.key}-${t.cadence}`}
            task={t}
            hint={checklistDef(t.key)?.hint ?? ''}
            editMode={editMode}
            onLog={setLogging}
            onUndo={(logId) => run(() => api.checklist.undoLog(logId), true)}
            onToggle={(task, done) =>
              run(() =>
                done
                  ? api.checklist.tick(task.key, task.cadence)
                  : api.checklist.untick(task.key, task.cadence)
              )
            }
            onRemove={(task) => run(() => api.checklist.removeTask(task.id))}
          />
        ))
      )}
    </div>
  )

  return (
    <div className="mx-auto max-w-[1600px] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Checklist</h1>
          <p className="text-sm text-gray-500">
            Your daily and weekly routine. Weeks run Saturday to Friday.
          </p>
        </div>
        <div className="flex gap-2">
          {editMode && (
            <button className="btn-primary" onClick={() => setAdding('daily')}>
              + Add item
            </button>
          )}
          <button className="btn-ghost" onClick={() => setEditMode((v) => !v)}>
            {editMode ? 'Done' : 'Edit'}
          </button>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
        <StatTile
          label="Streak"
          value={data.streak.current}
          sub={`longest ${data.streak.longest}`}
          accent={data.streak.current > 0}
        />
        <StatTile label="Today" value={`${doneToday} / ${data.daily.length}`} />
        <StatTile label="This week" value={`${doneWeek} / ${data.weekly.length}`} />
      </div>

      <Section title="Daily" subtitle={fmtDay(data.today)}>
        {board('daily', data.daily)}
      </Section>

      <Section title="Weekly" subtitle={fmtRange(data.week.start, data.week.end)}>
        {board('weekly', data.weekly)}
      </Section>

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
          enabledKeys={enabledKeys}
          onAdd={async (key, cadence) => {
            await run(() => api.checklist.addTask(key, cadence))
            setAdding(null)
          }}
          onClose={() => setAdding(null)}
        />
      )}

      {logging && logging.mediaType && (
        <ChecklistMediaPickerDialog
          task={logging}
          mediaType={logging.mediaType}
          onPick={async (mediaId) => {
            await run(() => api.checklist.logMedia(logging.key, logging.cadence, mediaId), true)
            setLogging(null)
          }}
          onClose={() => setLogging(null)}
        />
      )}
    </div>
  )
}
