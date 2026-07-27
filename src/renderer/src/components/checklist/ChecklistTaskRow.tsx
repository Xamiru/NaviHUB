import { useEffect, useState, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { ChecklistTaskStatus } from '@shared/types'

// One row of a checklist board: label, a bar toward the target, and exactly one
// action. The action differs per kind — mediaLog opens a picker, detected reads
// its own activity but can still be credited by hand, manual is a plain tick.
export default function ChecklistTaskRow({
  task,
  hint,
  editMode,
  handle,
  onLog,
  onCredit,
  onUndo,
  onToggle,
  onTarget,
  onRemove
}: {
  task: ChecklistTaskStatus
  hint: string
  editMode: boolean
  handle?: ReactNode
  onLog: (task: ChecklistTaskStatus) => void
  onCredit: (task: ChecklistTaskStatus) => void
  onUndo: (logId: number) => void
  onToggle: (task: ChecklistTaskStatus, done: boolean) => void
  onTarget: (task: ChecklistTaskStatus, target: number | null) => void
  onRemove: (task: ChecklistTaskStatus) => void
}) {
  const pct = Math.min(100, Math.round((task.progress / Math.max(task.target, 1)) * 100))

  const label =
    task.kind === 'detected' && task.route ? (
      <Link to={task.route} className="hover:text-accent" title={hint}>
        {task.label}
      </Link>
    ) : (
      <span title={hint}>{task.label}</span>
    )

  return (
    <div className="relative border-b border-base-700 px-4 py-3 last:border-b-0">
      {task.done && <span className="absolute left-0 top-0 h-full w-0.5 bg-accent" aria-hidden />}

      <div className="flex items-center gap-3">
        {editMode && handle}

        {task.kind === 'manual' ? (
          <label className="flex min-w-0 flex-1 items-center gap-3">
            <input
              type="checkbox"
              checked={task.done}
              onChange={(e) => onToggle(task, e.target.checked)}
              className="h-4 w-4 shrink-0 accent-accent"
            />
            <span className={`truncate text-sm ${task.done ? 'text-gray-500' : ''}`} title={hint}>
              {task.label}
            </span>
          </label>
        ) : (
          <span className={`min-w-0 flex-1 truncate text-sm ${task.done ? 'text-gray-500' : ''}`}>
            {label}
          </span>
        )}

        <div className="hidden h-1.5 w-24 shrink-0 overflow-hidden rounded-full bg-base-700 sm:block">
          <div className="h-full bg-accent transition-[width]" style={{ width: `${pct}%` }} />
        </div>

        {editMode ? (
          <TargetInput task={task} onTarget={onTarget} />
        ) : (
          <span
            className={`w-14 shrink-0 text-right text-xs tabular-nums ${
              task.done ? 'text-accent' : 'text-gray-500'
            }`}
          >
            {task.progress} / {task.target}
          </span>
        )}

        <div className="flex w-20 shrink-0 items-center justify-end gap-1">
          {task.kind === 'mediaLog' && !editMode && (
            <button className="btn-ghost px-2 py-1 text-xs" onClick={() => onLog(task)}>
              Log
            </button>
          )}
          {task.kind === 'detected' && !editMode && (
            <button
              className="btn-ghost px-2 py-1 text-xs"
              onClick={() => onCredit(task)}
              title="Count one that you did outside the app"
              aria-label={`Add a credit to ${task.label}`}
            >
              +1
            </button>
          )}
          {editMode && (
            <button
              className="px-1 text-gray-500 hover:text-red-400"
              onClick={() => onRemove(task)}
              title={`Remove ${task.label}`}
              aria-label={`Remove ${task.label}`}
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {task.entries.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5 pl-1">
          {task.entries.map((e) => (
            <span key={e.id} className="chip">
              <span className="max-w-[16rem] truncate">
                {e.title ?? (task.kind === 'detected' ? 'Counted by hand' : 'Done')}
              </span>
              <button
                className="text-gray-500 hover:text-red-400"
                onClick={() => onUndo(e.id)}
                title="Undo this entry"
                aria-label={`Undo ${e.title ?? 'entry'}`}
              >
                ✕
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  )
}

// Editing the target writes on blur/Enter, and an empty box clears the override
// back to the catalog's default.
function TargetInput({
  task,
  onTarget
}: {
  task: ChecklistTaskStatus
  onTarget: (task: ChecklistTaskStatus, target: number | null) => void
}) {
  const [value, setValue] = useState(String(task.target))
  useEffect(() => setValue(String(task.target)), [task.target])

  function commit(): void {
    const raw = value.trim()
    const n = Number(raw)
    // ONLY an empty box means "reset to the default". A typo ("5o") is not a
    // request to throw the user's target away — put the current one back.
    if (raw !== '' && (!Number.isFinite(n) || n < 1)) {
      setValue(String(task.target))
      return
    }
    const next = raw === '' ? null : Math.floor(n)
    if ((next ?? task.defaultTarget) !== task.target) onTarget(task, next)
    else setValue(String(task.target))
  }

  return (
    <input
      className="input w-14 shrink-0 px-1.5 py-0.5 text-center text-xs tabular-nums"
      value={value}
      inputMode="numeric"
      title={`Target (default ${task.defaultTarget}) — clear to reset`}
      aria-label={`Target for ${task.label}`}
      onChange={(e) => setValue(e.target.value)}
      onBlur={commit}
      onKeyDown={(e) => {
        if (e.key === 'Enter') e.currentTarget.blur()
      }}
    />
  )
}
