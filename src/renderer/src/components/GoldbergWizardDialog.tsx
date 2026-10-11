import { useState } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import type { GoldbergState } from '@shared/types'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { confirmDialog } from '../lib/confirm'
import { toast, toastError } from '../lib/toast'
import Dialog from './Dialog'

// One-click achievement saving. The Goldberg emulator (gbe_fork) only saves an
// achievement its steam_settings/achievements.json lists, so for a game already
// running Goldberg this writes a complete list beside its DLL, backing up the
// release's own list once (Restore puts it back). NaviHUB never touches the DLL
// itself: a game that is not on Goldberg yet gets the manual steps instead.

const GBE_RELEASES = 'https://github.com/Detanup01/gbe_fork/releases'

function listSummary(state: GoldbergState): string {
  if (state.list === 'complete') return `The achievement list is in place (${state.total} achievements).`
  if (state.list === 'incomplete') {
    return `The achievement list is missing ${state.missing} of ${state.total} achievements, so those cannot be saved when you earn them.`
  }
  return 'There is no achievement list yet, so the emulator cannot save any achievement you earn.'
}

export default function GoldbergWizardDialog({
  mediaId,
  onClose
}: {
  mediaId: number
  onClose: () => void
}) {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)
  const [done, setDone] = useState<string | null>(null)
  const query = useQuery({
    queryKey: qk.achievements.goldberg(mediaId),
    queryFn: () => api.achievements.goldbergState(mediaId),
    // The folder changes outside the app (a DLL swapped by hand in Explorer),
    // so every opening reads it fresh rather than trusting the app's 5 s cache.
    refetchOnMount: 'always'
  })
  const state = query.data
  const close = (): void => {
    if (!busy) onClose()
  }

  async function run(fn: () => Promise<GoldbergState | null>, message: string): Promise<void> {
    setBusy(true)
    try {
      const next = await fn()
      if (next) {
        qc.setQueryData(qk.achievements.goldberg(mediaId), next)
        setDone(message)
        toast(message, 'success')
      }
    } catch (e) {
      toastError(e)
      // A failure can still have changed the folder (Restore reporting a lost
      // original drops its manifest), so read it again.
      void qc.invalidateQueries({ queryKey: qk.achievements.goldberg(mediaId) })
    } finally {
      setBusy(false)
    }
  }

  async function saveElsewhere(): Promise<void> {
    setBusy(true)
    try {
      const res = await api.achievements.generateGoldberg(mediaId)
      if (res) toast(`Wrote ${res.achievements} achievements to ${res.dir}`, 'success')
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  async function restore(): Promise<void> {
    const ok = await confirmDialog(
      "Put the game's original achievement list back? Achievements it does not list will not be saved again.",
      { confirmLabel: 'Restore original' }
    )
    if (ok) await run(() => api.achievements.goldbergRestore(mediaId), 'The original list is back.')
  }

  return (
    <Dialog
      labelledBy="goldberg-setup-title"
      describedBy="goldberg-setup-help"
      onClose={close}
      overlayClassName="fixed inset-0 z-50 bg-black/70 p-4 overflow-y-auto"
      panelClassName="card w-full max-w-2xl p-6"
    >
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 id="goldberg-setup-title" className="text-lg font-medium">
            Set up achievement saving
          </h2>
          <p id="goldberg-setup-help" className="mt-1 text-sm text-gray-400">
            The Goldberg emulator saves an achievement only if the game folder lists it. NaviHUB
            writes that list for you and keeps a backup of the game's own.
          </p>
        </div>
        <button className="btn-ghost" onClick={close} disabled={busy} aria-label="Close" title="Close">
          ✕
        </button>
      </div>

      {query.isError ? (
        <div role="alert" className="text-sm text-gray-400">
          Could not look at the game folder.
          <button className="btn ml-3" onClick={() => void query.refetch()}>
            Try again
          </button>
        </div>
      ) : !state ? (
        <div className="space-y-3" aria-label="Checking the game folder">
          <div className="h-3 w-64 motion-safe:animate-pulse rounded bg-base-600" />
          <div className="h-10 motion-safe:animate-pulse rounded bg-base-700" />
        </div>
      ) : (
        <div className="space-y-4 text-sm">
          {state.gameDir && (
            <p className="text-xs text-gray-400">
              Game folder: <span className="break-all font-mono text-gray-300">{state.gameDir}</span>
            </p>
          )}

          {state.emulator === 'none' && (
            <p className="text-gray-300">
              There is no steam_api64.dll or steam_api.dll next to this game's executable, so
              Goldberg cannot be set up here. Mark achievements by hand instead, or save the
              config to a folder and place it yourself.
            </p>
          )}

          {state.emulator === 'other' && (
            <>
              <p className="text-gray-300">
                This game's {state.dllName} is not Goldberg, so it never saves achievements
                anywhere. To track them, swap Goldberg in by hand:
              </p>
              <ol className="list-decimal space-y-2 pl-5 text-gray-400">
                <li>
                  Download the gbe_fork release and unpack it.
                  <button
                    className="btn-ghost ml-2 text-xs"
                    onClick={() => void api.app.openExternal(GBE_RELEASES)}
                  >
                    Open releases page
                  </button>
                </li>
                <li>
                  In the game folder, rename {state.dllName} to {state.dllName}.bak so you can undo
                  this.
                </li>
                <li>
                  Copy in the release's {state.dllName} from{' '}
                  <code className="text-gray-300">
                    release/experimental/{state.dllName === 'steam_api64.dll' ? 'x64' : 'x86'}
                  </code>
                  .
                </li>
                <li>Open this dialog again to write the achievement list.</li>
              </ol>
            </>
          )}

          {state.emulator === 'goldberg' && (
            <>
              <p className={state.list === 'complete' ? 'text-gray-300' : 'text-signal-caution'}>
                {listSummary(state)}
              </p>
              <button
                className="btn-primary"
                disabled={busy}
                onClick={() =>
                  void run(
                    () => api.achievements.goldbergInstall(mediaId),
                    `Wrote ${state.total} achievements to the game folder.`
                  )
                }
              >
                {busy
                  ? 'Writing…'
                  : state.list === 'complete'
                    ? 'Rewrite the list'
                    : 'Write the achievement list'}
              </button>
              {state.list === 'complete' && (
                <p className="text-xs text-gray-400">
                  Rewrite after fixing a name, so the game's own notifications use it too.
                </p>
              )}
            </>
          )}

          {done && (
            <p role="status" className="text-signal-affirmative">
              {done}
            </p>
          )}

          <div className="flex flex-wrap gap-2 border-t border-base-700 pt-4">
            {state.canRestore && (
              <button className="btn-ghost text-xs" disabled={busy} onClick={() => void restore()}>
                Restore the original list
              </button>
            )}
            <button className="btn-ghost text-xs" disabled={busy} onClick={() => void saveElsewhere()}>
              Save the config to a folder instead…
            </button>
            <button className="btn-ghost ml-auto" onClick={close} disabled={busy}>
              {done ? 'Done' : 'Not now'}
            </button>
          </div>
        </div>
      )}
    </Dialog>
  )
}
