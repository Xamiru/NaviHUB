import { useId, useState, type FormEvent } from 'react'
import Dialog from '../Dialog'
import { Field } from '../Field'
import WeekdayPicker from './WeekdayPicker'
import { confirmDialog } from '../../lib/confirm'
import { periodWord } from './checklistFormat'
import type { ChecklistCustomInput, ChecklistTaskStatus } from '@shared/types'

export interface ItemChanges {
  target?: number | null
  days?: number | null
  custom?: Omit<ChecklistCustomInput, 'target'>
}

// Edit one board item: target and schedule for every item, name, unit and note
// for your own. A target or schedule change applies from today on; earlier
// days keep the rules they were judged by.
export default function ChecklistItemDialog({
  task,
  onSave,
  onRemove,
  onDelete,
  onClose
}: {
  task: ChecklistTaskStatus
  onSave: (changes: ItemChanges) => void
  onRemove: () => void
  onDelete: () => void
  onClose: () => void
}) {
  const headingId = useId()
  const custom = task.customId != null
  const period = periodWord(task)
  const overridden = task.target !== task.defaultTarget
  const [target, setTarget] = useState(overridden ? String(task.target) : '')
  const [days, setDays] = useState<number | null>(task.days)
  const [label, setLabel] = useState(task.label)
  const [unit, setUnit] = useState(task.unit ?? '')
  const [note, setNote] = useState(task.note ?? '')
  const [tried, setTried] = useState(false)

  const raw = target.trim()
  const n = Math.floor(Number(raw))
  const targetOk = raw === '' || (Number.isFinite(n) && n >= 1)
  const labelOk = !custom || label.trim() !== ''
  const ratePct = task.rate.due > 0 ? Math.round((task.rate.done / task.rate.due) * 100) : null

  function submit(e: FormEvent): void {
    e.preventDefault()
    setTried(true)
    if (!targetOk || !labelOk) return
    const changes: ItemChanges = {}
    const nextTarget = raw === '' ? null : n
    if ((nextTarget ?? task.defaultTarget) !== task.target) changes.target = nextTarget
    if (task.cadence === 'daily' && days !== task.days) changes.days = days
    if (
      custom &&
      (label.trim() !== task.label || (unit.trim() || null) !== task.unit || (note.trim() || null) !== task.note)
    ) {
      changes.custom = { label, unit: unit.trim() || null, note: note.trim() || null }
    }
    onSave(changes)
  }

  async function deleteForever(): Promise<void> {
    const ok = await confirmDialog(
      `Delete "${task.label}" and every entry it has logged? This cannot be undone.`,
      { confirmLabel: 'Delete', danger: true }
    )
    if (ok) onDelete()
  }

  return (
    <Dialog
      labelledBy={headingId}
      onClose={onClose}
      panelClassName="card flex max-h-full w-full max-w-lg flex-col overflow-y-auto p-5"
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 id={headingId} className="text-lg font-semibold">
          {task.label}
        </h2>
        <button className="px-2 text-gray-400 hover:text-white" onClick={onClose} aria-label="Close">
          ✕
        </button>
      </div>

      <dl className="mb-4 grid grid-cols-3 gap-2 text-center">
        <div className="rounded bg-base-800 p-2">
          <dt className="text-xs text-gray-400">Streak</dt>
          <dd className="text-lg font-semibold tabular-nums">
            {task.streak.current} {period}
            {task.streak.current === 1 ? '' : 's'}
          </dd>
        </div>
        <div className="rounded bg-base-800 p-2">
          <dt className="text-xs text-gray-400">Best</dt>
          <dd className="text-lg font-semibold tabular-nums">{task.streak.longest}</dd>
        </div>
        <div className="rounded bg-base-800 p-2">
          <dt className="text-xs text-gray-400">
            Last {task.cadence === 'weekly' ? '13 weeks' : '30 days'}
          </dt>
          <dd className="text-lg font-semibold tabular-nums">
            {ratePct == null ? 'None yet' : `${ratePct}%`}
          </dd>
          {task.rate.due > 0 && (
            <dd className="text-xs text-gray-400">
              {task.rate.done} of {task.rate.due}
            </dd>
          )}
        </div>
      </dl>

      <form className="space-y-3" onSubmit={submit} noValidate>
        {custom && (
          <Field label="Name" error={tried && !labelOk ? 'Give the item a name.' : undefined}>
            <input
              className="input w-full"
              value={label}
              maxLength={80}
              onChange={(e) => setLabel(e.target.value)}
            />
          </Field>
        )}
        <div className="grid grid-cols-2 gap-3">
          <Field
            label={`Target per ${period}`}
            description={`Leave empty for the default (${task.defaultTarget}).`}
            error={tried && !targetOk ? 'Use a whole number of at least 1.' : undefined}
          >
            <input
              className="input w-full tabular-nums"
              inputMode="numeric"
              placeholder={String(task.defaultTarget)}
              value={target}
              onChange={(e) => setTarget(e.target.value)}
            />
          </Field>
          {custom && (
            <Field label="Unit (optional)">
              <input
                className="input w-full"
                value={unit}
                maxLength={16}
                onChange={(e) => setUnit(e.target.value)}
              />
            </Field>
          )}
        </div>
        {task.cadence === 'daily' && <WeekdayPicker value={days} onChange={setDays} />}
        {custom && (
          <Field label="Note (optional)">
            <input
              className="input w-full"
              value={note}
              maxLength={300}
              onChange={(e) => setNote(e.target.value)}
            />
          </Field>
        )}
        <p className="text-xs text-gray-400">
          Target and schedule changes apply from today; earlier days keep their old rules.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-1">
          <button type="button" className="btn-ghost" onClick={onRemove}>
            Remove from board
          </button>
          {custom && (
            <button type="button" className="btn-danger" onClick={() => void deleteForever()}>
              Delete permanently
            </button>
          )}
          <span className="flex-1" />
          <button type="button" className="btn-ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            Save
          </button>
        </div>
      </form>
    </Dialog>
  )
}
