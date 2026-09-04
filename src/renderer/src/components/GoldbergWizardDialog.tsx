import { useState } from 'react'
import { api } from '../lib/api'
import { useDialog } from '../lib/hooks'
import { toastError } from '../lib/toast'

// The guided setup for a game whose crack writes no achievement files at all.
// NaviHUB generates the steam_settings folder Goldberg reads and tells the
// user exactly where to put it — it deliberately never writes into the game
// folder itself, because a wrong guess there breaks an install and the copy is
// one step the user can see and undo.

const GBE_RELEASES = 'https://github.com/Detanup01/gbe_fork/releases'

export default function GoldbergWizardDialog({
  mediaId,
  onClose
}: {
  mediaId: number
  onClose: () => void
}) {
  const panelRef = useDialog(onClose)
  const [busy, setBusy] = useState(false)
  const [result, setResult] = useState<{ dir: string; achievements: number } | null>(null)

  async function generate(): Promise<void> {
    setBusy(true)
    try {
      const res = await api.achievements.generateGoldberg(mediaId)
      if (res) setResult(res)
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center bg-black/70 p-6 overflow-y-auto"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="goldberg-setup-title"
        tabIndex={-1}
        className="card w-full max-w-2xl p-6 mt-10"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <div>
            <h2 id="goldberg-setup-title" className="text-lg font-medium">
              Set up Goldberg for this game
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Some cracks stub achievements out entirely, so nothing is ever written to disk for
              NaviHUB to read. Swapping in the Goldberg emulator fixes that.
            </p>
          </div>
          <button className="btn-ghost" onClick={onClose} aria-label="Close" title="Close">
            ✕
          </button>
        </div>

        {!result ? (
          <>
            <ol className="space-y-3 text-sm text-gray-400 list-decimal pl-5">
              <li>
                Check the game folder for <code className="text-gray-300">steam_api64.dll</code> (or{' '}
                <code className="text-gray-300">steam_api.dll</code>). If there is none, or the crack
                is a patched .exe rather than a replaced DLL, this will not work — leave that game on
                manual tracking.
              </li>
              <li>
                Download the Goldberg fork (gbe_fork) and keep the{' '}
                <code className="text-gray-300">experimental</code> build handy.
                <button
                  className="btn-ghost text-xs ml-2"
                  onClick={() => void api.app.openExternal(GBE_RELEASES)}
                >
                  Open releases page
                </button>
              </li>
              <li>Generate the config below, then copy it and the DLL into the game folder.</li>
            </ol>
            <p className="mt-4 text-xs text-gray-500">
              Back up the original DLL before replacing it — renaming it to{' '}
              <code>steam_api64.dll.bak</code> is enough to undo everything.
            </p>
            <div className="mt-5 flex gap-2">
              <button className="btn-primary" disabled={busy} onClick={generate}>
                {busy ? 'Generating…' : 'Generate config…'}
              </button>
              <button className="btn-ghost" onClick={onClose}>
                Cancel
              </button>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-gray-400">
              Wrote {result.achievements} achievements to:
            </p>
            <p className="mt-1 mb-4 font-mono text-xs text-gray-300 break-all">{result.dir}</p>
            <ol className="space-y-2 text-sm text-gray-400 list-decimal pl-5">
              <li>
                Copy that whole <code className="text-gray-300">steam_settings</code> folder next to
                the game’s executable.
              </li>
              <li>
                Rename the game’s <code className="text-gray-300">steam_api64.dll</code> to{' '}
                <code className="text-gray-300">steam_api64.dll.bak</code>, then copy Goldberg’s
                <code className="text-gray-300"> steam_api64.dll</code> in its place.
              </li>
              <li>
                Launch the game from NaviHUB and earn something. Unlocks pop up as they happen; use
                “Import from emulator files” to catch up anything earned outside a session.
              </li>
            </ol>
            <div className="mt-5">
              <button className="btn-primary" onClick={onClose}>
                Done
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
