import { useId, useState } from 'react'
import type { GameRun, GameRunSession } from '@shared/types'
import { usePopover } from '../lib/hooks'
import { fmtDurationSec } from '../lib/useGameSession'

// Tracked play sessions, one line each: the day (on its first session only), the
// time span, the duration and the playthrough, which reassigns through a menu.

const parseUtc = (s: string): Date => new Date(s.replace(' ', 'T') + 'Z')
const dayKey = (d: Date): string => d.toLocaleDateString('en-CA')
const clock = (d: Date): string =>
  d.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' })

function dayLabel(d: Date, now: Date): string {
  const yesterday = new Date(now)
  yesterday.setDate(now.getDate() - 1)
  if (dayKey(d) === dayKey(now)) return 'Today'
  if (dayKey(d) === dayKey(yesterday)) return 'Yesterday'
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    ...(d.getFullYear() === now.getFullYear() ? {} : { year: 'numeric' })
  })
}

export default function GameSessionList({
  sessions,
  runs,
  busy,
  onAssign
}: {
  sessions: GameRunSession[]
  runs: GameRun[]
  busy: boolean
  onAssign: (sessionId: number, runId: number | null) => void
}) {
  const now = new Date()
  let lastDay = ''

  return (
    <ul className="text-sm">
      {sessions.map((s) => {
        const start = parseUtc(s.startedAt)
        const key = dayKey(start)
        const firstOfDay = key !== lastDay
        lastDay = key
        return (
          <li
            key={s.id}
            className={`grid grid-cols-[7rem_1fr_auto_auto] items-center gap-x-4 py-1 ${
              firstOfDay ? 'mt-2 first:mt-0' : ''
            }`}
          >
            <span className="text-ink-muted">{firstOfDay ? dayLabel(start, now) : ''}</span>
            <span className="tabular-nums text-ink-secondary">
              {clock(start)} – {clock(parseUtc(s.endedAt))}
            </span>
            <span className="text-right tabular-nums">{fmtDurationSec(s.duration)}</span>
            {runs.length > 0 ? (
              <RunChip session={s} runs={runs} busy={busy} onAssign={onAssign} />
            ) : (
              <span />
            )}
          </li>
        )
      })}
    </ul>
  )
}

function RunChip({
  session,
  runs,
  busy,
  onAssign
}: {
  session: GameRunSession
  runs: GameRun[]
  busy: boolean
  onAssign: (sessionId: number, runId: number | null) => void
}) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const { panelRef, triggerRef } = usePopover(open, () => setOpen(false), {
    initialFocus: 'first',
    navigation: 'menu'
  })
  const options: { id: number | null; title: string }[] = [
    ...runs.map((r) => ({ id: r.id, title: r.title })),
    { id: null, title: 'Unassigned' }
  ]

  return (
    <div className="relative justify-self-end">
      <button
        ref={triggerRef}
        className="max-w-[12rem] truncate text-ink-muted hover:text-ink"
        aria-label={`Playthrough for session ${session.id}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        disabled={busy}
        onClick={() => setOpen((v) => !v)}
      >
        {session.runTitle ?? 'Unassigned'}
      </button>
      {open && (
        <div
          id={menuId}
          ref={panelRef}
          role="menu"
          aria-label={`Playthrough for session ${session.id}`}
          className="absolute right-0 z-30 mt-1 w-56 rounded-md border border-base-500 bg-base-800 p-1 shadow-lg"
        >
          {options.map((o) => (
            <button
              key={o.id ?? 'none'}
              role="menuitem"
              className="flex w-full items-center gap-2 rounded px-2 py-1.5 text-left text-sm text-gray-200 transition-colors hover:bg-base-700"
              onClick={() => {
                setOpen(false)
                if (o.id !== session.runId) onAssign(session.id, o.id)
              }}
            >
              <span className="w-3 text-accent" aria-hidden="true">
                {o.id === session.runId ? '✓' : ''}
              </span>
              <span className="truncate">{o.title}</span>
              {o.id === session.runId && <span className="sr-only">(current)</span>}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
