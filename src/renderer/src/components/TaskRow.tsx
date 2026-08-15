import { useState } from 'react'
import { Link } from 'react-router-dom'
import { PauseIcon, PlayIcon } from './PlayerIcons'
import { api } from '../lib/api'
import { confirmDialog } from '../lib/confirm'
import { fmtDurationSec } from '../lib/useGameSession'
import type { TaskSnapshot, TaskState } from '@shared/types'

// One row of the task registry, shared by the Topbar dropdown (dense) and the
// Tasks page. Terminal-dense on purpose: a fixed-width state column so the
// badges line up down the list.

const STATE_TEXT: Record<TaskState, [string, string]> = {
  running: ['RUN', 'text-accent'],
  pausing: ['PAUSE…', 'text-amber-400'],
  paused: ['PAUSE', 'text-amber-400'],
  cancelling: ['STOP…', 'text-gray-400'],
  done: ['DONE', 'text-gray-400'],
  cancelled: ['STOP', 'text-gray-500'],
  error: ['FAIL', 'text-red-400']
}

export function StateBadge({ state }: { state: TaskState }) {
  const [text, cls] = STATE_TEXT[state]
  return (
    <span
      className={`w-16 shrink-0 text-[10px] font-semibold uppercase tracking-widest ${cls}`}
    >
      {text}
    </span>
  )
}

// Local rather than QueuePanel's exported edit button: that one is
// player-coupled (it stopPropagations a row jump).
function IconBtn({
  label,
  disabled,
  onClick,
  children
}: {
  label: string
  disabled?: boolean
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      className="rounded px-1.5 py-0.5 text-xs text-gray-500 transition-colors hover:bg-base-700 hover:text-white disabled:cursor-not-allowed disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-gray-500"
      title={label}
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default function TaskRow({
  task,
  kick,
  dense = false
}: {
  task: TaskSnapshot
  // Passed in, NOT pulled from useTasks() here: every row would otherwise mount
  // its own polling observer and settle-toast effect for the sake of one
  // callback. Both call sites already hold it.
  kick: () => Promise<void>
  dense?: boolean
}) {
  const [busy, setBusy] = useState(false)
  const paused = task.state === 'paused' || task.state === 'pausing'
  const live =
    task.state === 'running' ||
    task.state === 'pausing' ||
    task.state === 'paused' ||
    task.state === 'cancelling'

  // Plain awaits in the handler, not useMutation (house convention); errors
  // surface through the global unhandledrejection net.
  async function act(fn: () => Promise<void>): Promise<void> {
    setBusy(true)
    try {
      await fn()
      await kick()
    } finally {
      setBusy(false)
    }
  }

  async function cancel(): Promise<void> {
    // confirmDialog, never window.confirm — a native modal here would steal
    // keyboard focus mid-import, which is a bug this app already had once.
    const ok = await confirmDialog(`Stop "${task.label}"?`, {
      confirmLabel: 'Stop',
      danger: true
    })
    if (!ok) return
    await act(() => api.tasks.cancel(task.id))
  }

  const pauseLabel = !task.canPause
    ? (task.pauseNote ?? 'This task cannot be paused')
    : paused
      ? 'Resume'
      : 'Pause'

  const counter =
    task.total > 0
      ? `${task.done}/${task.total}`
      : task.percent != null
        ? `${Math.round(task.percent)}%`
        : ''

  return (
    <div
      className={`border-b border-base-700/60 last:border-b-0 hover:bg-base-700/25 ${
        dense ? 'px-3 py-1.5' : 'px-3 py-2.5'
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-2">
            <StateBadge state={task.state} />
            <span className="truncate text-sm text-gray-100">{task.label}</span>
            {!dense && task.route && (
              <Link
                to={task.route}
                className="shrink-0 text-xs text-gray-500 hover:text-accent"
              >
                open
              </Link>
            )}
          </div>
          <p
            className={`truncate text-xs leading-tight ${
              task.state === 'error' ? 'text-red-400' : 'text-gray-500'
            }`}
          >
            {task.error ?? task.detail ?? '—'}
          </p>
        </div>

        {live && (
          <div className="flex shrink-0 items-start gap-0.5">
            <IconBtn
              label={pauseLabel}
              disabled={busy || !task.canPause}
              onClick={() =>
                void act(() => (paused ? api.tasks.resume(task.id) : api.tasks.pause(task.id)))
              }
            >
              {/* SVG transport, never unicode — ⏸/▶ render as blue emoji pictures
                  on Windows (components/PlayerIcons.tsx exists for this). */}
              {paused ? <PlayIcon className="h-3 w-3" /> : <PauseIcon className="h-3 w-3" />}
            </IconBtn>
            <IconBtn label="Cancel" disabled={busy || !task.canCancel} onClick={() => void cancel()}>
              ✕
            </IconBtn>
          </div>
        )}
      </div>

      <div className="mt-1.5 flex items-center gap-2">
        <div className="h-1 flex-1 overflow-hidden rounded bg-base-700">
          <div
            className={`h-full transition-[width] duration-500 ${
              task.state === 'error'
                ? 'bg-red-500'
                : paused
                  ? 'bg-gray-500'
                  : task.state === 'running' || task.state === 'cancelling'
                    ? 'bg-accent'
                    : 'bg-gray-600'
            } ${task.percent == null && live && !paused ? 'w-1/3 motion-safe:animate-pulse' : ''}`}
            style={
              task.percent == null
                ? live && !paused
                  ? undefined
                  : { width: '100%' }
                : { width: `${Math.min(Math.max(task.percent, 0), 100)}%` }
            }
          />
        </div>
        <span className="shrink-0 text-[10px] uppercase tracking-widest text-gray-500 tabular-nums">
          {counter && `${counter} · `}
          {fmtDurationSec(task.elapsedSec)}
        </span>
      </div>
    </div>
  )
}
