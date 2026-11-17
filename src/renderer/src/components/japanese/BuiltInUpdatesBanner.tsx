import { useQuery } from '@tanstack/react-query'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { builtInSummary, useBuiltInRestore } from './useBuiltInRestore'

// Today's notice for built-in course content the one-time key backfill held
// back: lessons and cards missing since keys were assigned, and built-in rows
// it left on older text. It reads plain counts (japanese:builtInHeldBack, no
// hashing), so a deliberate later edit never brings it back. Startup applies
// held-back content by itself when the library shows no hand edit or deletion
// (japaneseSeedSync.ts autoReattachVerdict); otherwise the choice is the
// user's, here or in Settings. Renders nothing while loading, on an error
// (Settings reports that) and at zero.
export default function BuiltInUpdatesBanner() {
  const heldBack = useQuery({ queryKey: qk.japanese.builtInHeldBack, queryFn: () => api.japanese.builtInHeldBack() })
  const { busy, restore } = useBuiltInRestore()
  if (!heldBack.isSuccess) return null
  const { older, missing } = heldBack.data
  if (older + missing === 0) return null

  return (
    <section className="card mb-8 p-5" aria-labelledby="jp-builtin-updates">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="min-w-0">
          <h2 id="jp-builtin-updates" className="font-semibold text-white">
            Built-in course updates are waiting
          </h2>
          <p className="mt-1 text-sm text-gray-400">{builtInSummary(older, missing)}</p>
        </div>
        <button type="button" className="btn" disabled={busy} onClick={() => void restore()}>
          {busy ? 'Restoring…' : 'Restore built-in text'}
        </button>
      </div>
    </section>
  )
}
