import { useEffect, useMemo, useRef, useState } from 'react'
import EmptyState from './EmptyState'
import { Group, Pill } from './PillGroup'
import { api } from '../lib/api'
import { useDebouncedValue, useIncrementalList } from '../lib/hooks'
import { usePersistedState } from '../lib/navState'
import { useLogTail } from '../lib/useLogTail'
import type { LogEntry, LogLevel, LogSource } from '@shared/types'

// The structured log tail: timestamp, level, source, message. Rows only — no
// raw process stream, no shell. Child-process output (yt-dlp, ffmpeg, mokuro)
// arrives here as ordinary `proc` rows.
//
// NEWEST FIRST, and Follow pins to the top. useIncrementalList (the mandated
// big-list helper) is a top-anchored reveal — batch 1 is items.slice(0, 96) and
// the sentinel pulls the NEXT batch as you scroll down. Bottom-following would
// need a scroll-anchoring idiom that exists nowhere else in this app and would
// fight the reveal on every append. This way Follow is scrollTo({top: 0}), the
// sentinel means "load older", and it is correct by construction.

const LEVELS: LogLevel[] = ['debug', 'info', 'warn', 'error']
const SOURCES: LogSource[] = ['app', 'db', 'http', 'task', 'proc', 'ipc', 'football']
const LEVEL_ORDER: Record<LogLevel, number> = { debug: 0, info: 1, warn: 2, error: 3 }

const LEVEL_TAG: Record<LogLevel, { tag: string; cls: string }> = {
  debug: { tag: 'DBG', cls: 'text-gray-500' },
  info: { tag: 'INF', cls: 'text-gray-500' },
  warn: { tag: 'WRN', cls: 'text-amber-400' },
  error: { tag: 'ERR', cls: 'text-red-400' }
}

// Time only — the log is read within one session, and a date column on every
// row would eat a quarter of the width for nothing.
function fmtTs(ms: number): string {
  const d = new Date(ms)
  const p = (n: number, w = 2): string => String(n).padStart(w, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}.${p(d.getMilliseconds(), 3)}`
}

function LogLine({ row }: { row: LogEntry }) {
  const lv = LEVEL_TAG[row.level]
  return (
    <div
      className={`log-row grid grid-cols-[6.5rem_2.5rem_3.5rem_1fr] gap-2 px-3 py-[3px] text-xs leading-[1.35] hover:bg-base-700/40 ${
        row.level === 'error' ? 'bg-red-500/5' : ''
      }`}
    >
      <span className="text-gray-500">{fmtTs(row.ts)}</span>
      <span className={`font-semibold ${lv.cls}`}>{lv.tag}</span>
      <span className="truncate text-gray-500" title={row.taskId ?? row.source}>
        {row.source}
      </span>
      <span
        className={`whitespace-pre-wrap break-words ${
          row.level === 'error' ? 'text-red-300' : 'text-gray-300'
        }`}
      >
        {row.message}
      </span>
    </div>
  )
}

export default function LogViewer() {
  const [follow, setFollow] = useState(true)
  const [minLevel, setMinLevel] = usePersistedState<LogLevel>('logs.level', 'debug')
  const [hidden, setHidden] = usePersistedState<LogSource[]>('logs.hidden', [])
  const [search, setSearch] = usePersistedState('logs.q', '')
  const debounced = useDebouncedValue(search, 250)
  const paneRef = useRef<HTMLDivElement>(null)

  const { rows, dropped, refetch } = useLogTail(follow)

  const filtered = useMemo(() => {
    const needle = debounced.trim().toLowerCase()
    const out = rows.filter(
      (r) =>
        LEVEL_ORDER[r.level] >= LEVEL_ORDER[minLevel] &&
        !hidden.includes(r.source) &&
        (needle === '' || r.message.toLowerCase().includes(needle))
    )
    // Newest first for display; the tail arrives oldest-first.
    return out.reverse()
  }, [rows, minLevel, hidden, debounced])

  const { visible, sentinelRef, hasMore } = useIncrementalList(filtered)

  // Follow pins to the top, where the newest row is.
  useEffect(() => {
    if (follow) paneRef.current?.scrollTo({ top: 0 })
  }, [follow, filtered])

  // Auto-disarm when the user scrolls away to read history, re-arm at the top.
  // Without this the pane yanks out from under them on every new line.
  function onScroll(): void {
    const top = paneRef.current?.scrollTop ?? 0
    if (follow && top > 40) setFollow(false)
    else if (!follow && top <= 4) setFollow(true)
  }

  async function copyVisible(): Promise<void> {
    // Re-reversed: a pasted log should read chronologically.
    const text = [...filtered]
      .reverse()
      .map((r) => `${fmtTs(r.ts)} ${r.level.toUpperCase()} ${r.source} ${r.message}`)
      .join('\n')
    await navigator.clipboard.writeText(text)
  }

  function toggleSource(source: LogSource): void {
    setHidden(hidden.includes(source) ? hidden.filter((s) => s !== source) : [...hidden, source])
  }

  return (
    <div>
      <div className="mb-3 flex flex-wrap items-end gap-x-5 gap-y-3">
        <Group label="Level">
          {LEVELS.map((l) => (
            <Pill
              key={l}
              label={LEVEL_TAG[l].tag}
              active={minLevel === l}
              onClick={() => setMinLevel(l)}
            />
          ))}
        </Group>

        {/* Multi-select, so square chip-toggles rather than pills — the
            documented split between the two idioms. */}
        <div>
          <div className="label mb-2">Source</div>
          <div className="flex flex-wrap gap-1.5">
            {SOURCES.map((s) => (
              <button
                key={s}
                className={hidden.includes(s) ? 'chip-toggle' : 'chip-toggle chip-toggle-active'}
                aria-pressed={!hidden.includes(s)}
                onClick={() => toggleSource(s)}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="ml-auto flex items-end gap-2">
          <input
            className="input w-56"
            placeholder="Filter messages…"
            aria-label="Filter log messages"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            className={follow ? 'chip-toggle chip-toggle-active' : 'chip-toggle'}
            aria-pressed={follow}
            title="Keep the newest lines in view and keep polling"
            onClick={() => setFollow((v) => !v)}
          >
            Follow
          </button>
          <button className="btn-ghost" onClick={() => refetch()}>
            Refresh
          </button>
          <button className="btn-ghost" onClick={() => void copyVisible()}>
            Copy
          </button>
          <button className="btn-ghost" onClick={() => void api.logs.reveal()}>
            Open logs folder
          </button>
        </div>
      </div>

      <p className="mb-1 text-[10px] uppercase tracking-widest text-gray-500">
        Newest first · {filtered.length} of {rows.length} lines
        {dropped > 0 && ` · ${dropped} dropped`}
      </p>

      {filtered.length === 0 ? (
        <EmptyState
          title="No log lines"
          body={
            rows.length === 0
              ? 'Nothing has been logged yet this session. Start an import or a scan and it will appear here.'
              : 'Every line is filtered out — widen the level or re-enable a source.'
          }
        />
      ) : (
        <div
          ref={paneRef}
          onScroll={onScroll}
          className="card max-h-[calc(100vh-19rem)] overflow-y-auto p-0"
        >
          {visible.map((row) => (
            <LogLine key={row.seq} row={row} />
          ))}
          {hasMore && <div ref={sentinelRef} className="h-8" />}
        </div>
      )}
    </div>
  )
}
