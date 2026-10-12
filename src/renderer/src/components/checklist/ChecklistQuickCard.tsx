import { useState } from 'react'
import { Link } from 'react-router-dom'
import ChecklistMediaPickerDialog from './ChecklistMediaPickerDialog'
import { useChecklistActions } from './useChecklistActions'
import { isCheckbox } from './checklistFormat'
import type { ChecklistStatus, ChecklistTaskStatus } from '@shared/types'

const SHOWN = 3

// Home's Routine card: today's fraction plus the next few open items, each
// with one action — tick, +1, log the title you are on, or go to where a
// tracked activity happens. Not a link card: buttons cannot sit inside a link,
// so the way to the full page is its own "Open" link.
export default function ChecklistQuickCard({ data }: { data: ChecklistStatus }) {
  const actions = useChecklistActions(null)
  const [logging, setLogging] = useState<ChecklistTaskStatus | null>(null)
  const { done, due } = data.summary
  const empty = data.daily.length === 0 && data.weekly.length === 0
  const open = [...data.daily, ...data.weekly].filter((t) => t.state === 'pending').slice(0, SHOWN)
  const weeklyOpen = data.weekly.filter((t) => t.state === 'pending').length
  const pct = due ? Math.round((done / due) * 100) : 0

  const title = empty
    ? 'Checklist'
    : data.restDay
      ? 'Rest day'
      : due === 0
        ? 'Nothing due today'
        : done === due
          ? 'All done today'
          : `${done} of ${due} done today`
  const meta = [
    data.streak.current > 0
      ? `${data.streak.current} day${data.streak.current === 1 ? '' : 's'} in a row`
      : null,
    weeklyOpen > 0 ? `${weeklyOpen} weekly open` : null
  ]
    .filter(Boolean)
    .join(' · ')

  return (
    <section className="card-glow flex flex-col justify-between p-5" aria-labelledby="home-routine-title">
      <div>
        <div className="flex items-center justify-between gap-2">
          <p className="text-[10px] font-semibold uppercase tracking-widest text-accent">Routine</p>
          <Link to="/checklist" className="text-xs text-accent hover:underline" aria-label="Open checklist">
            Open
          </Link>
        </div>
        <h3 id="home-routine-title" className="mt-1 text-xl font-bold">
          {title}
        </h3>
        {!empty && due > 0 && !data.restDay && (
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-base-900/60" aria-hidden>
            <div className="h-full bg-accent" style={{ width: `${pct}%` }} />
          </div>
        )}
        {empty ? (
          <p className="mt-1 text-sm text-gray-400">
            Set up the things you want to do every day and week.
          </p>
        ) : (
          open.length > 0 && (
            <ul className="mt-3 space-y-1.5" aria-label="Open items">
              {open.map((task) => (
                <li key={task.id} className="flex items-center gap-2 text-sm">
                  <span className="min-w-0 flex-1 truncate" title={task.label}>
                    {task.label}
                  </span>
                  <span className="shrink-0 text-xs tabular-nums text-gray-400">
                    {task.progress}/{task.target}
                  </span>
                  <QuickAction task={task} onLog={setLogging} actions={actions} />
                </li>
              ))}
            </ul>
          )
        )}
      </div>
      {meta && <p className="mt-3 text-xs text-gray-400">{meta}</p>}

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
    </section>
  )
}

function QuickAction({
  task,
  actions,
  onLog
}: {
  task: ChecklistTaskStatus
  actions: ReturnType<typeof useChecklistActions>
  onLog: (task: ChecklistTaskStatus) => void
}) {
  const cls = 'btn-ghost shrink-0 px-2 py-0.5 text-xs'
  if (isCheckbox(task)) {
    return (
      <button type="button" className={cls} onClick={() => void actions.tick(task, true)} aria-label={`Mark ${task.label} done`}>
        Done
      </button>
    )
  }
  if (task.kind === 'mediaLog' || task.kind === 'mediaSession') {
    const next = task.suggestions[0]
    return next ? (
      <button
        type="button"
        className={`${cls} max-w-[9rem] truncate`}
        onClick={() => void actions.log(task, next.mediaId)}
        aria-label={`Log ${next.title}`}
        title={`Log ${next.title}`}
      >
        {next.title}
      </button>
    ) : (
      <button type="button" className={cls} onClick={() => onLog(task)} aria-label={`Log ${task.label}`}>
        Log…
      </button>
    )
  }
  if (task.kind === 'detected' && task.route) {
    return (
      <Link to={task.route} className={cls} aria-label={`Go to ${task.label}`}>
        Go
      </Link>
    )
  }
  return (
    <button
      type="button"
      className={cls}
      onClick={() => void actions.credit(task, 1)}
      aria-label={`Add 1${task.unit ? ` ${task.unit}` : ''} to ${task.label}`}
    >
      +1
    </button>
  )
}
