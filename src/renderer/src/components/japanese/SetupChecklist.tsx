import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { STARTER_PACKS, starterPackInstalled } from '@shared/japanese/starterPacks'

// One-time setup on Today: the six offline packs the section leans on, installed
// with one button. Renders nothing until every query has answered (no "nothing
// installed" flash) and nothing once all six are in. The per-pack controls and
// the optional extras stay in Settings.

const SETTINGS_LINK = '/settings?tab=learning'

export default function SetupChecklist() {
  const qc = useQueryClient()
  const [starting, setStarting] = useState(false)
  const dictsQ = useQuery({ queryKey: qk.dict.list, queryFn: () => api.dict.list() })
  const sentencesQ = useQuery({ queryKey: qk.dict.sentenceBank, queryFn: () => api.dict.sentenceBank() })
  const kradQ = useQuery({ queryKey: qk.dict.kradSet, queryFn: () => api.dict.kradSet() })
  const grammarQ = useQuery({ queryKey: qk.dict.grammarBank, queryFn: () => api.dict.grammarBank() })
  const statusQ = useQuery({
    queryKey: qk.dict.starterStatus,
    queryFn: () => api.dict.starterStatus(),
    // Poll while a run is going so each finished pack ticks off here.
    refetchInterval: (query) => (query.state.data?.running || starting ? 1000 : false)
  })

  // Each pack that lands changes what is installed; refresh the lists then.
  const doneCount = statusQ.data?.done.length ?? 0
  useEffect(() => {
    if (doneCount > 0) void qc.invalidateQueries({ queryKey: qk.dict.all })
  }, [doneCount, qc])

  if (!dictsQ.isSuccess || !sentencesQ.isSuccess || !kradQ.isSuccess || !grammarQ.isSuccess) return null

  const facts = {
    dicts: dictsQ.data,
    krad: kradQ.data != null,
    grammar: grammarQ.data != null,
    sentences: sentencesQ.data != null
  }
  const rows = STARTER_PACKS.map((pack) => ({ ...pack, installed: starterPackInstalled(pack.key, facts) }))
  const status = statusQ.data
  const running = starting || !!status?.running
  if (rows.every((row) => row.installed) && !running) return null

  const installedCount = rows.filter((row) => row.installed).length
  const current = rows.find((row) => row.key === status?.current)

  async function install(): Promise<void> {
    setStarting(true)
    try {
      await api.dict.installStarter()
    } finally {
      setStarting(false)
      await qc.invalidateQueries({ queryKey: qk.dict.all })
    }
  }

  return (
    <section className="card mb-8 p-5" aria-labelledby="jp-setup">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 id="jp-setup" className="font-semibold text-white">
            Install the offline dictionaries
          </h2>
          <p className="mt-1 text-sm text-gray-400" aria-live="polite">
            {running
              ? `Installing ${current?.title ?? 'the next pack'}… ${installedCount} of ${rows.length} ready.`
              : `${installedCount} of ${rows.length} ready. One download each, then everything works without a network.`}
          </p>
          {status?.error && !running && (
            <p className="mt-1 text-sm text-signal-anomaly">Stopped: {status.error}</p>
          )}
        </div>
        <button type="button" className="btn-ghost" disabled={running} onClick={() => void install()}>
          {running ? 'Installing…' : installedCount === 0 ? 'Install all' : 'Install the rest'}
        </button>
      </div>
      <details className="mt-4">
        <summary className="cursor-pointer text-sm text-gray-300">What gets installed</summary>
        <ul className="mt-3 divide-y divide-base-700 border-y border-base-700">
          {rows.map((row) => (
            <li key={row.key} className="flex items-center gap-3 py-2.5">
              <span
                className={`w-5 text-center ${row.installed ? 'text-signal-affirmative' : 'text-gray-500'}`}
                aria-label={row.installed ? 'Installed' : 'Not installed'}
              >
                {row.installed ? '✓' : '○'}
              </span>
              <span className="min-w-0 flex-1">
                <span className="text-sm font-medium text-gray-100">
                  {row.title}
                  {row.size && <span className="ml-2 text-xs text-gray-400">{row.size}</span>}
                </span>
                <span className="mt-0.5 block text-xs text-gray-400">{row.unlocks}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-gray-400">
          Optional extras (names, stroke order, pitch accent, audio) are in{' '}
          <Link to={SETTINGS_LINK} className="text-signal-link hover:underline">Settings</Link>.
        </p>
      </details>
    </section>
  )
}
