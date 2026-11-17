import { useEffect, useRef } from 'react'

// Shown instead of a black or silent player: the file's codecs cannot be
// decoded inside NaviHUB, so the system player (normally VLC) is the way to
// watch it. Also the screen for a file that is missing from disk. Inside a
// shuffle queue it offers Skip to next; it never skips by itself, so a show
// whose every file is unplayable cannot spin through the queue.
export default function DecodePanel({
  title,
  heading,
  reason,
  onExternal,
  onBack,
  onSkip = null,
  onStopQueue = null
}: {
  title: string
  heading: string
  reason: string
  onExternal: (() => void) | null
  onBack: () => void
  onSkip?: (() => void) | null
  onStopQueue?: (() => void) | null
}): JSX.Element {
  const primaryRef = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    primaryRef.current?.focus()
  }, [])
  return (
    <div className="theme-dark flex h-screen flex-col items-center justify-center gap-4 bg-black px-8 text-center">
      <p className="text-xs uppercase tracking-wide text-gray-400">{title}</p>
      <h1 className="text-lg font-semibold text-white">{heading}</h1>
      <p className="max-w-md text-sm text-gray-300">{reason}</p>
      <div className="flex gap-2">
        {onExternal && (
          <button ref={primaryRef} type="button" className="btn-primary" onClick={onExternal}>
            Open externally
          </button>
        )}
        {onSkip && (
          <button type="button" className="btn-ghost" onClick={onSkip}>
            Skip to next
          </button>
        )}
        {onStopQueue && (
          <button type="button" className="btn-ghost" onClick={onStopQueue}>
            Stop shuffle
          </button>
        )}
        <button
          ref={onExternal ? undefined : primaryRef}
          type="button"
          className="btn-ghost"
          onClick={onBack}
        >
          ← Back
        </button>
      </div>
    </div>
  )
}
