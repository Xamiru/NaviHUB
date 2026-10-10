import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { MaintenanceResult, StorageUsageEntry } from '@shared/types'
import { formatBytes } from '@shared/torrents'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { confirmDialog } from '../../lib/confirm'
import { SettingCard } from './shared'

function ResultLine({ result }: { result: MaintenanceResult | null }) {
  return (
    <p
      role="status"
      className={`mt-2 text-xs ${result?.ok ? 'text-signal-affirmative' : 'text-signal-anomaly'}`}
    >
      {result?.message ?? ''}
    </p>
  )
}

// Sizes are measured only when asked: a walk over Media or Pictures reads
// every file's metadata and can take seconds on a large library.
export function StorageUsageSettings() {
  const qc = useQueryClient()
  const usage = useQuery({
    queryKey: qk.storage.usage,
    queryFn: () => api.storage.usage(),
    enabled: false,
    staleTime: Infinity
  })
  const [result, setResult] = useState<MaintenanceResult | null>(null)
  const [busy, setBusy] = useState(false)

  async function clear(entry: StorageUsageEntry): Promise<void> {
    if (entry.key !== 'thumbnails' && entry.key !== 'subtitles') return
    const ok = await confirmDialog(
      entry.key === 'thumbnails'
        ? 'Clear the thumbnail cache? Thumbnails are rebuilt as covers are shown again, so grids may load more slowly for a while.'
        : 'Clear extracted subtitles? Each track is extracted again the next time its video needs it.',
      { confirmLabel: 'Clear' }
    )
    if (!ok) return
    setBusy(true)
    try {
      setResult(await api.storage.clearCache(entry.key))
      await qc.invalidateQueries({ queryKey: qk.storage.usage })
      await usage.refetch()
    } finally {
      setBusy(false)
    }
  }

  const total = usage.data?.entries.reduce((sum, entry) => sum + entry.bytes, 0) ?? 0

  return (
    <SettingCard
      title="Storage usage"
      description="How much space each part of NaviHUB uses on this machine. Measuring reads every file in Media and Pictures, so it runs only when you ask."
    >
      <div className="flex flex-wrap gap-2">
        <button className="btn-ghost" disabled={usage.isFetching} onClick={() => void usage.refetch()}>
          {usage.isFetching ? 'Measuring…' : usage.data ? 'Measure again' : 'Measure'}
        </button>
        <button className="btn-ghost" onClick={() => void api.storage.openDataFolder()}>
          Open data folder
        </button>
        <button className="btn-ghost" onClick={() => void api.logs.reveal()}>
          Open logs folder
        </button>
      </div>
      {usage.data && (
        <>
          <p className="mt-4 text-xs text-ink-muted">
            Data folder: <span className="font-mono text-ink-secondary">{usage.data.dataFolder}</span>
          </p>
          {/* Fixed layout: long paths truncate instead of pushing sizes off-screen. */}
          <table className="mt-3 w-full table-fixed text-sm">
            <caption className="sr-only">Disk space used by NaviHUB</caption>
            <thead>
              <tr className="text-left text-xs text-ink-muted">
                <th scope="col" className="py-1 font-normal">Part</th>
                <th scope="col" className="w-20 py-1 text-right font-normal">Files</th>
                <th scope="col" className="w-24 py-1 text-right font-normal">Size</th>
                <th scope="col" className="w-20 py-1"><span className="sr-only">Action</span></th>
              </tr>
            </thead>
            <tbody>
              {usage.data.entries.map((entry) => (
                <tr key={entry.key} className="border-t border-line-subtle">
                  <th scope="row" className="py-2 pr-3 text-left font-normal text-ink">
                    {entry.label}
                    <span className="block truncate font-mono text-xs text-ink-muted" title={entry.path}>
                      {entry.path}
                    </span>
                  </th>
                  <td className="py-2 text-right tabular-nums text-ink-secondary">
                    {entry.files.toLocaleString()}
                  </td>
                  <td className="py-2 pl-3 text-right tabular-nums text-ink">
                    {entry.bytes > 0 ? formatBytes(entry.bytes) : 'Empty'}
                  </td>
                  <td className="py-2 pl-3 text-right">
                    {entry.clearable && entry.files > 0 && (
                      <button
                        className="btn-ghost px-2 py-1 text-xs"
                        disabled={busy}
                        aria-label={`Clear ${entry.label.toLowerCase()}`}
                        onClick={() => void clear(entry)}
                      >
                        Clear
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-line-strong">
                <th scope="row" className="py-2 text-left font-semibold text-ink">Total</th>
                <td />
                <td className="py-2 pl-3 text-right font-semibold tabular-nums text-ink">
                  {formatBytes(total)}
                </td>
                <td />
              </tr>
            </tfoot>
          </table>
        </>
      )}
      <ResultLine result={result} />
    </SettingCard>
  )
}

export function MaintenanceSettings() {
  const qc = useQueryClient()
  const pending = useQuery({
    queryKey: qk.storage.compactPending,
    queryFn: () => api.storage.compactPending()
  })
  const [result, setResult] = useState<MaintenanceResult | null>(null)
  const [checking, setChecking] = useState(false)

  async function check(): Promise<void> {
    setChecking(true)
    setResult(null)
    try {
      setResult(await api.storage.checkDatabase())
    } finally {
      setChecking(false)
    }
  }

  async function toggleCompact(on: boolean): Promise<void> {
    await api.storage.setCompactOnLaunch(on)
    await qc.invalidateQueries({ queryKey: qk.storage.compactPending })
  }

  return (
    <SettingCard
      title="Database maintenance"
      description="Check the library database for damage, or shrink it after large deletions. Neither changes your data."
    >
      <div className="flex flex-wrap items-center gap-2">
        <button className="btn-ghost" disabled={checking} onClick={() => void check()}>
          {checking ? 'Checking…' : 'Check database'}
        </button>
      </div>
      <ResultLine result={result} />
      <label className="mt-4 flex items-start gap-2 text-sm text-ink">
        <input
          type="checkbox"
          className="mt-0.5"
          checked={pending.data ?? false}
          disabled={pending.isPending}
          onChange={(e) => void toggleCompact(e.target.checked)}
        />
        <span>
          Compact the database on next launch
          <span className="block text-xs text-ink-muted">
            Rewrites the file without unused space before the window opens. Launch takes a few
            seconds longer that once.
          </span>
        </span>
      </label>
    </SettingCard>
  )
}
