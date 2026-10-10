import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { qk } from '../../lib/queryKeys'
import { SHORTCUT_GROUPS } from '../../lib/shortcuts'
import { api } from '../../lib/api'
import { type SecretStorageState } from '@shared/types'
import { useUpdateStatus } from '../../lib/useUpdateStatus'
import { confirmDialog } from '../../lib/confirm'
import { SecretStateLine } from '../../components/SecretField'
import { type SaveFn, SettingCard } from './shared'

// ---- in-app updates -------------------------------------------------------
// Progress comes from polling update:status via useUpdateStatus — there is no
// push channel. `environment` explains builds that cannot update themselves.
export function UpdateSettings({
  secretStorage,
  onSave
}: {
  secretStorage?: SecretStorageState
  onSave: SaveFn
}) {
  const { status, kick } = useUpdateStatus()
  const [busy, setBusy] = useState(false)

  const canUpdate = status?.environment === 'ok'

  // Every mutation ends in kick(): refetchInterval is false while idle, so the
  // poll has to be restarted or a running download would never report progress.
  async function act(fn: () => Promise<unknown>) {
    setBusy(true)
    try {
      await fn()
    } finally {
      setBusy(false)
      await kick()
    }
  }

  return (
    <SettingCard
      title="Updates"
      description="Checks GitHub Releases for a newer build. Always manual — nothing checks on launch."
    >
      {secretStorage?.configured['github.token'] && (
        <div className="rounded-md border border-base-700 bg-base-800 p-3">
          <p className="text-sm text-gray-400">
            A GitHub token from the private repository setup is saved. Public updates no longer use it.
          </p>
          <SecretStateLine settingKey="github.token" state={secretStorage} />
          <button
            className="btn-ghost mt-3"
            onClick={async () => {
              if (!(await confirmDialog('Clear the saved GitHub token?', { confirmLabel: 'Clear', danger: true }))) return
              await onSave('github.token', '')
            }}
          >
            Clear saved token
          </button>
        </div>
      )}

      <div className="mt-3 rounded-md border border-base-700 bg-base-800 p-3">
        <p className="text-sm">
          Current version <span className="text-gray-400">{status?.currentVersion ?? '—'}</span>
        </p>

        {status && !canUpdate && status.message && (
          <p className="mt-2 text-sm text-gray-400">{status.message}</p>
        )}
        {status?.state === 'available' && (
          <p className="mt-2 text-sm">Version {status.version} is available.</p>
        )}
        {status?.state === 'upToDate' && (
          <p className="mt-2 text-sm text-gray-400">You are on the latest version.</p>
        )}
        {status?.state === 'error' && status.message && (
          <p className="mt-2 text-sm text-red-400">{status.message}</p>
        )}
        {status?.state === 'downloading' && (
          <div className="mt-3">
            <p className="mb-1 text-sm text-gray-400">
              Downloading {status.version} — {status.percent ?? 0}%
            </p>
            <div className="h-1.5 overflow-hidden rounded bg-base-600">
              <div
                className="h-full bg-accent transition-all"
                style={{ width: `${status.percent ?? 0}%` }}
              />
            </div>
          </div>
        )}

        <div className="mt-3 flex gap-2">
          {status?.state === 'downloading' ? (
            <button className="btn-ghost" onClick={() => act(() => api.updates.cancel())}>
              Stop
            </button>
          ) : status?.state === 'ready' ? (
            <button className="btn-primary" onClick={() => api.updates.install()}>
              Restart &amp; install {status.version}
            </button>
          ) : (
            <>
              <button
                className="btn-ghost"
                disabled={!canUpdate || busy}
                onClick={() => act(() => api.updates.check())}
              >
                {busy ? 'Checking…' : 'Check for updates'}
              </button>
              {status?.state === 'available' && (
                <button className="btn-primary" onClick={() => act(() => api.updates.download())}>
                  Download {status.version}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </SettingCard>
  )
}

// ---- about ------------------------------------------------------------------
export function AboutSettings() {
  const about = useQuery({ queryKey: qk.app.about, queryFn: () => api.app.about(), staleTime: Infinity })
  const rows: [string, string | undefined][] = [
    ['Version', about.data?.version],
    ['Electron', about.data?.electron],
    ['Chromium', about.data?.chrome],
    ['Node.js', about.data?.node],
    ['Platform', about.data ? `${about.data.platform} (${about.data.arch})` : undefined],
    ['Data folder', about.data?.dataFolder],
    ['Log folder', about.data?.logFolder]
  ]
  return (
    <SettingCard
      title="About NaviHUB"
      description="A personal, local-only media hub. Everything it knows lives in the data folder below."
    >
      {about.isError ? (
        <p className="text-sm text-signal-anomaly">Could not read the build details.</p>
      ) : (
        <dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[max-content_minmax(0,1fr)]">
          {rows.map(([label, value]) => (
            <div key={label} className="contents">
              <dt className="text-ink-muted">{label}</dt>
              <dd className="min-w-0 break-all font-mono text-ink">{value ?? 'Loading…'}</dd>
            </div>
          ))}
        </dl>
      )}
      <div className="mt-4 flex flex-wrap gap-2">
        <button className="btn-ghost" onClick={() => void api.storage.openDataFolder()}>
          Open data folder
        </button>
        <button className="btn-ghost" onClick={() => void api.logs.reveal()}>
          Open logs folder
        </button>
      </div>
    </SettingCard>
  )
}

// ---- keyboard shortcuts -----------------------------------------------------
export function ShortcutSettings() {
  return (
    <SettingCard title="Keyboard shortcuts" description="Every app-wide key, in one place.">
      <div className="space-y-6">
        {SHORTCUT_GROUPS.map((group) => (
          <section key={group.title} aria-label={group.title}>
            <h3 className="text-sm font-semibold text-ink">{group.title}</h3>
            {group.note && <p className="mt-0.5 text-xs text-ink-muted">{group.note}</p>}
            <table className="mt-2 w-full text-sm">
              <caption className="sr-only">{group.title} shortcuts</caption>
              <tbody>
                {group.rows.map((row) => (
                  <tr key={`${row.keys.join('|')}-${row.label}`} className="border-t border-line-subtle">
                    <th scope="row" className="w-1/3 py-1.5 pr-3 text-left font-normal">
                      <span className="flex flex-wrap gap-1">
                        {row.keys.map((key) => (
                          <kbd key={key} className="kbd">
                            {key}
                          </kbd>
                        ))}
                      </span>
                    </th>
                    <td className="py-1.5 text-ink-secondary">{row.label}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        ))}
      </div>
    </SettingCard>
  )
}
