import { useMemo, useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toast, toastError } from '../../lib/toast'
import Section from '../Section'
import { Field } from '../Field'
import { PLATFORMS, type PlatformKey } from '@shared/emulation/platforms'
import type { RomScanRow } from '@shared/types'

// The folder scan's status, polled while it runs, and a start that opens the
// folder picker in main. One scan runs at a time across the app.
export function useRomScan(platform?: PlatformKey) {
  const qc = useQueryClient()
  const { data: scan } = useQuery({
    queryKey: qk.games.romScan,
    queryFn: () => api.games.romScanStatus(),
    refetchInterval: (q) => (q.state.data?.state === 'scanning' ? 700 : false)
  })
  async function start(): Promise<boolean> {
    try {
      const started = await api.games.romScanStart(platform)
      if (started) await qc.invalidateQueries({ queryKey: qk.games.romScan })
      return started != null
    } catch (e) {
      toastError(e)
      return false
    }
  }
  return { scan, start }
}

function ScanRowView({
  row,
  choice,
  onChoose
}: {
  row: RomScanRow
  choice: number | null
  onChoose: (mediaId: number | null) => void
}) {
  return (
    <tr className="border-t border-base-700 align-top">
      <td className="py-2 pr-3">
        <p className="break-all text-sm">{row.fileName}</p>
        <p className="break-all font-mono text-[11px] text-gray-500">{row.folder}</p>
      </td>
      <td className="py-2 pr-3 text-xs text-gray-300">
        {PLATFORMS[row.platform].short}
        {row.gameCode ? <span className="block font-mono text-gray-400">{row.gameCode}</span> : null}
      </td>
      <td className="py-2">
        {row.alreadyLinked ? (
          <span className="text-xs text-gray-400">Linked</span>
        ) : row.candidates.length === 0 ? (
          <span className="text-xs text-gray-400">No matching game in the library</span>
        ) : (
          <Field label={`Game for ${row.fileName}`} hiddenLabel>
            <select
              className="input w-full"
              value={choice ?? ''}
              onChange={(e) => onChoose(e.target.value ? Number(e.target.value) : null)}
            >
              <option value="">Skip</option>
              {row.candidates.map((c) => (
                <option key={c.mediaId} value={c.mediaId}>
                  {c.title}
                </option>
              ))}
            </select>
          </Field>
        )}
      </td>
    </tr>
  )
}

// A console page passes its console: the scan then finds only that console's
// files, and the panel shows only a scan started for it.
export default function ScanPanel({ platform }: { platform?: PlatformKey }) {
  const qc = useQueryClient()
  const { scan: anyScan, start: startScan } = useRomScan(platform)
  // A console page shows its own scan and any scan still running (so it can be
  // stopped); Tools shows whichever ran last.
  const scan =
    platform && anyScan?.platform !== platform && anyScan?.state !== 'scanning' ? null : anyScan
  // Picks belong to one scan: row ids restart at 1 in every scan, so a scan
  // started anywhere else (the console banner, Tools) must not inherit them.
  const [picks, setPicks] = useState<{ scanId: string | null; choices: Record<number, number | null> }>({
    scanId: null,
    choices: {}
  })
  const choices = useMemo(
    () => (scan && picks.scanId === scan.id ? picks.choices : {}),
    [scan, picks]
  )
  const [busy, setBusy] = useState(false)

  const effective = useMemo(() => {
    const out = new Map<number, number>()
    for (const row of scan?.results ?? []) {
      const picked = row.id in choices ? choices[row.id] : row.suggestedMediaId
      if (picked != null && !row.alreadyLinked) out.set(row.id, picked)
    }
    return out
  }, [scan, choices])

  async function accept(): Promise<void> {
    setBusy(true)
    try {
      const res = await api.games.romScanAccept([...effective].map(([resultId, mediaId]) => ({ resultId, mediaId })))
      toast(
        res.failed.length > 0
          ? `Linked ${res.linked} game files; ${res.failed.length} failed: ${res.failed[0]}`
          : `Linked ${res.linked} game files.`,
        res.failed.length > 0 ? 'warning' : 'success'
      )
      setPicks({ scanId: null, choices: {} })
      await qc.invalidateQueries({ queryKey: qk.games.all })
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  const rows = scan?.results ?? []
  const matched = rows.filter((r) => r.candidates.length > 0 && !r.alreadyLinked)
  const unmatched = rows.filter((r) => r.candidates.length === 0 && !r.alreadyLinked)

  return (
    <Section
      title={platform ? `Find ${PLATFORMS[platform].short} game files` : 'Find game files'}
      actions={
        scan?.state === 'scanning' ? (
          <button type="button" className="btn-ghost text-xs" onClick={() => void api.games.romScanCancel()}>
            Stop
          </button>
        ) : (
          <button type="button" className="btn text-xs" onClick={() => void startScan()}>
            Scan folders…
          </button>
        )
      }
    >
      <p className="text-xs text-gray-400">
        Pick the folders that hold your {platform ? `${PLATFORMS[platform].label} ` : ''}disc images and ROMs. NaviHUB reads each file&apos;s id and suggests
        the library game it belongs to; nothing is linked until you confirm.
      </p>
      {scan?.state === 'scanning' && (
        <p className="mt-3 text-sm text-gray-300" role="status">
          {platform && scan.platform !== platform
            ? `Scanning for ${scan.platform ? PLATFORMS[scan.platform].label : 'every console'}… `
            : 'Scanning… '}
          {scan.found} game files in {scan.scanned} files.
        </p>
      )}
      {scan?.state === 'error' && (
        <p className="mt-3 text-sm text-signal-caution" role="alert">
          The scan failed: {scan.message}
        </p>
      )}
      {scan?.state === 'done' && (
        <div className="mt-4">
          {matched.length > 0 ? (
            <>
              <table className="w-full text-left">
                <caption className="sr-only">Game files with a matching library game</caption>
                <thead>
                  <tr className="text-[10px] uppercase tracking-[0.15em] text-gray-400">
                    <th scope="col" className="pb-2">File</th>
                    <th scope="col" className="pb-2">Console</th>
                    <th scope="col" className="pb-2">Library game</th>
                  </tr>
                </thead>
                <tbody>
                  {matched.map((row) => (
                    <ScanRowView
                      key={row.id}
                      row={row}
                      choice={effective.get(row.id) ?? null}
                      onChoose={(mediaId) => setPicks({ scanId: scan.id, choices: { ...choices, [row.id]: mediaId } })}
                    />
                  ))}
                </tbody>
              </table>
              <button
                type="button"
                className="btn-primary mt-4"
                disabled={busy || effective.size === 0}
                onClick={() => void accept()}
              >
                Link {effective.size} game file{effective.size === 1 ? '' : 's'}
              </button>
            </>
          ) : (
            <p className="text-sm text-gray-400">No new game files match games in your library.</p>
          )}
          {unmatched.length > 0 && (
            <details className="mt-4">
              <summary className="cursor-pointer text-xs text-gray-400 hover:text-gray-200">
                {unmatched.length} files with no matching library game
              </summary>
              <ul className="mt-2 space-y-1 text-xs text-gray-400">
                {unmatched.map((row) => (
                  <li key={row.id} className="break-all">
                    {row.fileName} <span className="text-gray-500">({PLATFORMS[row.platform].short})</span>
                  </li>
                ))}
              </ul>
              <p className="mt-2 text-xs text-gray-400">
                Add the game to your library first, or link the file from the game&apos;s Playtime tab.
              </p>
            </details>
          )}
        </div>
      )}
    </Section>
  )
}
