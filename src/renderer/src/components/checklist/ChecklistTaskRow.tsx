import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import ActionMenu from '../ActionMenu'
import { Field } from '../Field'
import { describeDays } from '@shared/checklist'
import {
  STATE_DOT,
  STATE_LABEL,
  entryLabel,
  fmtWeekday,
  isCheckbox,
  periodWord,
  progressText,
  takesAmount
} from './checklistFormat'
import type { ChecklistActions } from './useChecklistActions'
import type { ChecklistTaskStatus } from '@shared/types'

// One row of the board: label and what completes it, progress toward the
// target, this week's strip, and exactly one kind of primary action — a
// checkbox (a once-a-period custom item), +1 / Add amount (counters and
// detected items), or one-click titles plus Log (media items). Everything
// rarer lives in the More menu.
export default function ChecklistTaskRow({
  task,
  actions,
  handle,
  onLog,
  onEdit
}: {
  task: ChecklistTaskStatus
  actions: ChecklistActions
  handle?: ReactNode
  onLog: (task: ChecklistTaskStatus) => void
  onEdit: (task: ChecklistTaskStatus) => void
}) {
  const [amountOpen, setAmountOpen] = useState(false)
  // The checkbox follows the click at once; the refetched task.done takes over
  // as soon as it arrives (and puts it back if the write failed).
  const [ticked, setTicked] = useState<boolean | null>(null)
  useEffect(() => setTicked(null), [task.done, task.progress])
  const pct = Math.min(100, Math.round((task.progress / Math.max(task.target, 1)) * 100))
  const period = periodWord(task)
  const dim = task.state === 'off' || task.state === 'skipped'

  const labelText = (
    <span className={task.done ? 'text-gray-400' : ''}>
      {task.route && task.kind === 'detected' ? (
        <Link to={task.route} className="hover:text-accent hover:underline">
          {task.label}
        </Link>
      ) : (
        task.label
      )}
    </span>
  )

  const meta = [
    task.note ?? task.hint,
    task.days != null ? describeDays(task.days) : null,
    task.kind === 'detected' && task.detected > 0
      ? task.credited > 0
        ? `${task.detected} auto + ${task.credited} by hand`
        : 'tracked automatically'
      : null,
    task.streak.current > 1 ? `${task.streak.current}-${period} streak` : null
  ].filter(Boolean)

  return (
    <div
      className={`group relative border-b border-base-700 px-4 py-3 last:border-b-0 ${
        dim ? 'opacity-70' : ''
      }`}
    >
      {task.done && <span className="absolute left-0 top-0 h-full w-0.5 bg-accent" aria-hidden />}

      <div className="flex items-start gap-3">
        {handle}

        <div className="min-w-0 flex-1">
          {isCheckbox(task) ? (
            <label className="flex items-center gap-3 text-sm">
              <input
                type="checkbox"
                checked={ticked ?? task.done}
                onChange={(e) => {
                  const next = e.target.checked
                  setTicked(next)
                  void actions.tick(task, next).finally(() => setTicked(null))
                }}
                className="h-4 w-4 shrink-0 accent-accent"
              />
              {labelText}
            </label>
          ) : (
            <p className="text-sm">{labelText}</p>
          )}
          {meta.length > 0 && (
            <p className="mt-0.5 text-xs text-gray-400">{meta.join(' · ')}</p>
          )}
          {task.skipped && (
            <p className="mt-0.5 text-xs text-gray-400">Skipped this {period}.</p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end gap-1.5">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs tabular-nums ${task.done ? 'text-accent' : 'text-gray-400'}`}
            >
              {progressText(task)}
            </span>
            <Primary
              task={task}
              actions={actions}
              amountOpen={amountOpen}
              onAmount={() => setAmountOpen((v) => !v)}
              onLog={onLog}
            />
            <ActionMenu
              label="More"
              ariaLabel={`More for ${task.label}`}
              buttonClassName="btn-ghost px-2 py-1 text-xs"
              items={[
                {
                  label: task.skipped ? `Unskip this ${period}` : `Skip this ${period}`,
                  onSelect: () => actions.skip(task, !task.skipped)
                },
                { label: 'Edit…', onSelect: () => onEdit(task) },
                { label: 'Remove from board', danger: true, onSelect: () => actions.remove(task) }
              ]}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="h-1 w-20 overflow-hidden rounded-full bg-base-700" aria-hidden>
              <div
                className="h-full bg-accent transition-[width] motion-reduce:transition-none"
                style={{ width: `${pct}%` }}
              />
            </div>
            <Strip task={task} />
          </div>
        </div>
      </div>

      {task.suggestions.length > 0 && !task.done && (
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-xs text-gray-400">One click:</span>
          {task.suggestions.map((s) => (
            <button
              key={s.mediaId}
              type="button"
              className="chip hover:border-accent hover:text-accent"
              onClick={() => void actions.log(task, s.mediaId)}
              aria-label={`Log ${s.title}`}
            >
              <span className="max-w-[14rem] truncate">{s.title}</span>
            </button>
          ))}
        </div>
      )}

      {task.entries.length > 0 && (
        <ul className="mt-2 flex flex-wrap gap-1.5" aria-label={`Logged for ${task.label}`}>
          {task.entries.map((e) => {
            const label = entryLabel(task, e)
            return (
              <li key={e.id} className="chip">
                <span className="max-w-[16rem] truncate">{label}</span>
                <button
                  type="button"
                  className="text-gray-400 hover:text-red-400"
                  onClick={() => void actions.undo(task, e.id)}
                  title="Undo this entry"
                  aria-label={`Undo ${label}`}
                >
                  ✕
                </button>
              </li>
            )
          })}
        </ul>
      )}

      {amountOpen && (
        <AmountForm
          task={task}
          onDone={() => setAmountOpen(false)}
          onAdd={(n) => actions.credit(task, n)}
        />
      )}
    </div>
  )
}

function Primary({
  task,
  actions,
  amountOpen,
  onAmount,
  onLog
}: {
  task: ChecklistTaskStatus
  actions: ChecklistActions
  amountOpen: boolean
  onAmount: () => void
  onLog: (task: ChecklistTaskStatus) => void
}) {
  if (isCheckbox(task)) return null
  if (task.kind === 'mediaLog' || task.kind === 'mediaSession') {
    return (
      <button
        type="button"
        className="btn-ghost px-2 py-1 text-xs"
        onClick={() => onLog(task)}
        aria-label={`Log ${task.label}`}
      >
        Log…
      </button>
    )
  }
  return (
    <>
      <button
        type="button"
        className="btn-ghost px-2 py-1 text-xs"
        onClick={() => void actions.credit(task, 1)}
        title={task.kind === 'detected' ? 'Count one that you did outside the app' : undefined}
        aria-label={`Add 1${task.unit ? ` ${task.unit}` : ''} to ${task.label}`}
      >
        +1
      </button>
      {takesAmount(task) && (
        <button
          type="button"
          className="btn-ghost px-2 py-1 text-xs"
          aria-expanded={amountOpen}
          onClick={onAmount}
          aria-label={`Add an amount to ${task.label}`}
        >
          Add…
        </button>
      )}
    </>
  )
}

function AmountForm({
  task,
  onAdd,
  onDone
}: {
  task: ChecklistTaskStatus
  onAdd: (amount: number) => Promise<void>
  onDone: () => void
}) {
  const remaining = Math.max(task.target - task.progress, 1)
  const [value, setValue] = useState(String(remaining))
  const n = Math.floor(Number(value))
  const valid = Number.isFinite(n) && n >= 1

  async function submit(e: FormEvent): Promise<void> {
    e.preventDefault()
    if (!valid) return
    await onAdd(n)
    onDone()
  }

  return (
    <form className="mt-2 flex items-end gap-2" onSubmit={(e) => void submit(e)}>
      <Field label={`Amount${task.unit ? ` (${task.unit})` : ''}`} className="w-32">
        <input
          className="input w-full px-2 py-1 text-sm tabular-nums"
          inputMode="numeric"
          autoFocus
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') {
              e.stopPropagation()
              onDone()
            }
          }}
        />
      </Field>
      <button type="submit" className="btn-primary px-3 py-1 text-xs" disabled={!valid}>
        Add
      </button>
      <button type="button" className="btn-ghost px-3 py-1 text-xs" onClick={onDone}>
        Cancel
      </button>
    </form>
  )
}

// Seven small squares: this week's days for a daily item, the last seven weeks
// for a weekly one. Decorative; the summary beside it is what is read out.
function Strip({ task }: { task: ChecklistTaskStatus }) {
  const weekly = task.cadence === 'weekly'
  const summary = task.strip
    .map((s) => `${weekly ? `week of ${s.period}` : fmtWeekday(s.period)} ${STATE_LABEL[s.state]}`)
    .join(', ')
  return (
    <>
      <span className="flex gap-0.5" aria-hidden title={weekly ? 'Last 7 weeks' : 'This week'}>
        {task.strip.map((s) => (
          <span key={s.period} className={`h-2 w-2 rounded-sm ${STATE_DOT[s.state]}`} />
        ))}
      </span>
      <span className="sr-only">
        {weekly ? 'Last seven weeks' : 'This week'}: {summary}.
      </span>
    </>
  )
}
