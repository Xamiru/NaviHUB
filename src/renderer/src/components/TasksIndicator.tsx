import { useEffect, useId, useState } from 'react'
import { Link } from 'react-router-dom'
import TaskRow from './TaskRow'
import { useTasks } from '../lib/useTasks'
import { usePopover } from '../lib/hooks'

// Topbar pill for everything the main process is currently doing, and the
// dropdown that lets you pause or stop any of it.
//
// Replaces ActivityIndicator in the bar (that file survives — ImportDialog
// still imports useActivity/activityText for its own in-dialog bar). Hidden
// entirely when nothing is running: no persistent chrome, so the header is
// exactly as quiet as it was. The POLL still runs while idle, on a slow
// heartbeat, because this is the app's discovery surface for work started
// somewhere other than a dialog (see useTasks).
//
// A popover, not a dialog: mousedown-outside + Escape via document listeners,
// per the convention documented in ActionMenu.tsx — useDialog would trap and
// restore focus, which is wrong for something anchored in the header.
export default function TasksIndicator() {
  const { active, running, kick } = useTasks()
  const [open, setOpen] = useState(false)
  const panelId = useId()
  const triggerId = useId()
  const { panelRef, triggerRef } = usePopover(open, () => setOpen(false), {
    initialFocus: 'first'
  })

  // Close the panel when the last task settles, so it can't linger empty.
  useEffect(() => {
    if (!running) setOpen(false)
  }, [running])

  if (!running) return null

  const first = active[0]
  const summary =
    active.length === 1 ? (first?.label ?? '') : `${active.length} tasks running`

  return (
    <div className="relative shrink-0">
      <button
        id={triggerId}
        ref={triggerRef}
        className="flex shrink-0 items-center gap-2 rounded-full bg-base-700/80 px-3 py-1.5 text-xs text-gray-300 transition-colors hover:text-white"
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        title={active.map((t) => t.label).join(' · ')}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="inline-block h-3 w-3 motion-safe:animate-spin rounded-full border-2 border-accent border-t-transparent" />
        <span className="max-w-[18rem] truncate">{summary}</span>
      </button>

      {open && (
        <div
          id={panelId}
          ref={panelRef}
          role="region"
          aria-labelledby={triggerId}
          className="panel-in absolute right-0 z-40 mt-2 w-[26rem] overflow-hidden rounded-md border border-base-500 bg-base-800 shadow-lg"
        >
          <div className="max-h-96 overflow-y-auto">
            {active.map((task) => (
              <TaskRow key={task.id} task={task} kick={kick} dense />
            ))}
          </div>
          <div className="border-t border-base-700 px-3 py-2 text-right">
            <Link
              to="/tasks"
              className="text-xs text-gray-500 hover:text-accent"
              onClick={() => setOpen(false)}
            >
              All tasks and logs ›
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}
