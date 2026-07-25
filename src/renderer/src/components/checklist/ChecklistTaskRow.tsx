import { Link } from 'react-router-dom'
import type { ChecklistTaskStatus } from '@shared/types'

// One row of a checklist board. The action differs per kind: mediaLog opens a
// picker (and lists what was logged, each undoable), detected links to the
// place the activity happens, manual is a plain tick.
export default function ChecklistTaskRow({
  task,
  hint,
  editMode,
  onLog,
  onUndo,
  onToggle,
  onRemove
}: {
  task: ChecklistTaskStatus
  hint: string
  editMode: boolean
  onLog: (task: ChecklistTaskStatus) => void
  onUndo: (logId: number) => void
  onToggle: (task: ChecklistTaskStatus, done: boolean) => void
  onRemove: (task: ChecklistTaskStatus) => void
}) {
  const label = (
    <span className={task.done ? 'text-gray-500 line-through' : ''}>{task.label}</span>
  )

  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 border-b border-base-700 px-4 py-3 last:border-b-0">
      {task.kind === 'manual' ? (
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={task.done}
            onChange={(e) => onToggle(task, e.target.checked)}
            className="h-4 w-4 accent-accent"
          />
          {label}
        </label>
      ) : task.kind === 'detected' && task.route ? (
        <Link to={task.route} className="hover:text-accent" title={hint}>
          {label}
        </Link>
      ) : (
        <span title={hint}>{label}</span>
      )}

      <span className={`text-xs ${task.done ? 'text-accent' : 'text-gray-500'}`}>
        {task.progress} / {task.target}
      </span>

      <div className="ml-auto flex items-center gap-2">
        {task.done && (
          <span className="text-[10px] font-semibold uppercase tracking-widest text-accent">
            Done
          </span>
        )}
        {task.kind === 'mediaLog' && (
          <button className="btn-ghost text-xs" onClick={() => onLog(task)}>
            Log
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

      {task.entries.length > 0 && (
        <div className="flex w-full flex-wrap gap-2">
          {task.entries.map((e) => (
            <span key={e.id} className="chip flex items-center gap-1.5">
              <span className="max-w-[16rem] truncate">{e.title ?? 'Untitled'}</span>
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
