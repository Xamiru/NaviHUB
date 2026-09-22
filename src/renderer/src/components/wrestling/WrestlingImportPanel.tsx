import { useState } from 'react'
import { api } from '../../lib/api'
import { useWrestlingImport } from '../../lib/useWrestlingImport'
import { WRESTLING_PROMOTIONS } from '@shared/wrestling'
import type { WrestlingPromotionId } from '@shared/types'

// Install/refresh the wiki from Wikipedia. Fire-and-poll: start returns as soon
// as the crawl is spawned and the bar follows `wrestling:importStatus`, so the
// run survives navigating away (the bulk-import posture).
export default function WrestlingImportPanel({
  installed,
  onDone
}: {
  installed: boolean
  onDone?: () => void
}) {
  const { status, running, kick } = useWrestlingImport()
  const [picked, setPicked] = useState<WrestlingPromotionId[]>(
    WRESTLING_PROMOTIONS.map((p) => p.id)
  )
  const [busy, setBusy] = useState(false)

  const toggle = (id: WrestlingPromotionId): void =>
    setPicked((prev) => (prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]))

  async function start(refresh: boolean): Promise<void> {
    setBusy(true)
    try {
      await api.wrestling.startImport({ promotions: picked, refresh })
      // The poll is idle-gated; without this kick a started run never reports.
      await kick()
      onDone?.()
    } finally {
      setBusy(false)
    }
  }

  const pct =
    status && status.total > 0 ? Math.min(100, Math.round((status.done / status.total) * 100)) : 0

  return (
    <div className="card p-5">
      <p className="font-semibold">{installed ? 'Refresh the wiki' : 'Install the wiki'}</p>
      <p className="mt-1 text-sm text-gray-500">
        Events, cards and wrestlers are read from Wikipedia. Pick the promotions you want — you can
        add the rest later, and re-running only fetches what is missing.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        {WRESTLING_PROMOTIONS.map((p) => (
          <button
            type="button"
            key={p.id}
            onClick={() => toggle(p.id)}
            disabled={running}
            aria-pressed={picked.includes(p.id)}
            className={picked.includes(p.id) ? 'chip-toggle chip-toggle-active' : 'chip-toggle'}
          >
            {p.short}
          </button>
        ))}
      </div>

      {running && status ? (
        <div className="mt-5">
          <div className="mb-1 flex items-baseline justify-between text-xs text-gray-400">
            <span>
              {status.phase === 'enumerating'
                ? `Finding events${status.message ? ` — ${status.message}` : ''}`
                : status.phase === 'wrestlers'
                  ? `Wrestler pages — ${status.wrestlers} fetched`
                  : `${status.events} events · ${status.matches} matches`}
            </span>
            <span>
              {status.total > 0 ? `${status.done} / ${status.total}` : ''}
              {status.failed > 0 ? ` · ${status.failed} failed` : ''}
            </span>
          </div>
          <div
            className="h-1.5 overflow-hidden rounded-full bg-base-700"
            role="progressbar"
            aria-label="Wrestling wiki import"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={pct}
          >
            <div className="h-full bg-accent transition-all" style={{ width: `${pct}%` }} />
          </div>
          {status.message && status.phase !== 'enumerating' && (
            <p className="mt-2 truncate text-xs text-gray-500">{status.message}</p>
          )}
          <button
            type="button"
            className="btn mt-4"
            onClick={async () => {
              await api.wrestling.cancelImport()
              await kick()
            }}
          >
            Stop
          </button>
        </div>
      ) : (
        <div className="mt-5 flex gap-2">
          <button
            type="button"
            className="btn-primary"
            disabled={busy || picked.length === 0}
            onClick={() => start(false)}
          >
            {installed ? 'Fetch missing events' : 'Install wiki'}
          </button>
          {installed && (
            <button
              type="button"
              className="btn"
              disabled={busy || picked.length === 0}
              onClick={() => start(true)}
            >
              Re-fetch everything
            </button>
          )}
        </div>
      )}
    </div>
  )
}
