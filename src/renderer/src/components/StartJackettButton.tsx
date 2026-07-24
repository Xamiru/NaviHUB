import { useState } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { api } from '../lib/api'
import { qk } from '../lib/queryKeys'
import { toast, toastError } from '../lib/toast'

// "Start Jackett" — probes first and only runs the start command when Jackett
// is actually down, then waits for it to bind (a .NET service needs a few
// seconds). On success it invalidates qk.torrents so a failed search retries.
export default function StartJackettButton({
  className = 'btn-ghost'
}: {
  className?: string
}): React.JSX.Element {
  const qc = useQueryClient()
  const [busy, setBusy] = useState(false)

  async function run(): Promise<void> {
    setBusy(true)
    try {
      const res = await api.torrents.ensureJackett()
      toast(res.message, res.running ? 'success' : 'error')
      if (res.running) qc.invalidateQueries({ queryKey: qk.torrents.all })
    } catch (e) {
      toastError(e)
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      className={className}
      disabled={busy}
      title="Check Jackett and start it if it isn't running"
      onClick={() => void run()}
    >
      {busy ? 'Starting…' : 'Start Jackett'}
    </button>
  )
}
