import { useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import type { VideoSource, VideoSourceRef } from '@shared/types'
import { api } from '../../lib/api'
import { qk } from '../../lib/queryKeys'
import { toastError } from '../../lib/toast'

// Shown instead of the video when a file needs an ffmpeg pass first.
//
// A REMUX starts on its own — it's a stream copy, disk-bound, and lossless, so
// making the user click through it would be pointless friction. A TRANSCODE
// never does: it pegs the CPU for tens of minutes and writes a second full-size
// copy, which is a decision, not a formality.
export default function PreparePanel({
  source,
  sourceRef,
  onReady,
  onBack
}: {
  source: VideoSource
  sourceRef: VideoSourceRef
  onReady: () => void
  onBack: () => void
}): JSX.Element {
  const [runId, setRunId] = useState<string | null>(null)
  const [starting, setStarting] = useState(false)
  const autoRef = useRef(false)

  const { data: status } = useQuery({
    queryKey: qk.video.prepareStatus,
    queryFn: () => api.video.prepareStatus(),
    enabled: runId != null,
    // Self-gates on the POLLED data, not local state, so the conversion keeps
    // reporting if the component re-renders mid-run.
    refetchInterval: (q) => {
      const s = q.state.data
      return s && (s.state === 'converting' || s.state === 'finalizing' || s.state === 'probing')
        ? 500
        : false
    }
  })

  async function start(): Promise<void> {
    setStarting(true)
    try {
      const { id } = await api.video.prepare(sourceRef)
      setRunId(id)
    } catch (e) {
      toastError(e)
    } finally {
      setStarting(false)
    }
  }

  // Auto-start a remux exactly once. StrictMode double-invokes effects, hence
  // the ref rather than a bare dependency guard.
  useEffect(() => {
    if (autoRef.current || source.plan !== 'remux') return
    autoRef.current = true
    void start()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [source.plan])

  // When it lands, tell the page to re-resolve — the source becomes 'cached'.
  const doneRef = useRef(false)
  useEffect(() => {
    if (status?.state !== 'done' || doneRef.current) return
    doneRef.current = true
    onReady()
  }, [status?.state, onReady])

  const running =
    status != null && ['probing', 'converting', 'finalizing'].includes(status.state)

  return (
    <div className="flex h-screen flex-col items-center justify-center gap-4 bg-black px-8 text-center">
      <p className="text-sm uppercase tracking-wide text-gray-500">{source.title}</p>
      <p className="max-w-lg text-sm text-gray-400">{status?.message ?? source.reason}</p>
      {source.warnings.map((w) => (
        <p key={w} className="max-w-lg text-xs text-gray-500">
          {w}
        </p>
      ))}

      {running ? (
        <div className="w-full max-w-md space-y-2">
          <div className="h-1.5 w-full overflow-hidden rounded bg-base-700">
            <div
              className="h-full bg-accent transition-[width] duration-500"
              style={{ width: `${status?.percent ?? 0}%` }}
            />
          </div>
          <p className="text-xs text-gray-500">
            {status?.state === 'finalizing'
              ? // +faststart rewrites the file after encoding hits 100%; without
                // saying so a big remux looks hung right at the finish line.
                'Finalizing — moving the index to the front so seeking is instant…'
              : `${Math.round(status?.percent ?? 0)}%${
                  status?.speed ? ` · ${status.speed.toFixed(1)}×` : ''
                }${status?.etaSec ? ` · ${formatEta(status.etaSec)} left` : ''}`}
          </p>
          <button
            className="btn-ghost"
            onClick={() => {
              if (runId) void api.video.prepareCancel(runId)
            }}
          >
            Cancel
          </button>
        </div>
      ) : status?.state === 'error' ? (
        <>
          <p className="max-w-lg text-sm text-red-400">{status.message}</p>
          <div className="flex gap-2">
            <button className="btn-primary" disabled={starting} onClick={() => void start()}>
              Try again
            </button>
            <button className="btn-ghost" onClick={onBack}>
              ← Back
            </button>
          </div>
        </>
      ) : (
        <div className="flex gap-2">
          <button className="btn-primary" disabled={starting} onClick={() => void start()}>
            {source.plan === 'transcode' ? 'Convert anyway' : 'Convert'}
          </button>
          <button className="btn-ghost" onClick={onBack}>
            ← Back
          </button>
        </div>
      )}
    </div>
  )
}

function formatEta(sec: number): string {
  if (sec < 90) return `${Math.round(sec)}s`
  const m = Math.round(sec / 60)
  return m < 90 ? `${m}m` : `${(m / 60).toFixed(1)}h`
}
