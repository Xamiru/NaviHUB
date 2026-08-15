// Pause/cancel primitives for the task registry. Pure of electron and of any
// real child process (the ChildProcess is reached through an injected getter),
// so every branch below is directly testable — the gameLaunchCore/gameLaunch
// split applied to process control.
import type { TaskControls } from './tasks'

// ---------------------------------------------------------------------------
// Child processes — SIGSTOP / SIGCONT
// ---------------------------------------------------------------------------

// THE trap. Node has no signals on Windows: proc.kill('SIGSTOP') there IGNORES
// the name and terminates the process unconditionally. Un-gated, pressing Pause
// on a dist:win build would destroy the user's in-flight download on the one
// machine they actually run the app on.
export function canSignalPause(platform: NodeJS.Platform = process.platform): boolean {
  return platform !== 'win32'
}

// Minimal surface so tests can pass a recorder instead of a real child.
export interface Killable {
  kill(signal?: NodeJS.Signals): boolean
  exitCode: number | null
}

export interface ProcessControlOpts {
  // Called before SIGTERM so the module can set its own `cancelled` flag —
  // that is what makes the exit read as a cancel rather than a crash.
  onCancel?: () => void
  killAfterMs?: number
  platform?: NodeJS.Platform
  // Test seam for the SIGKILL follow-up (defaults to a real unref'd timer).
  schedule?: (fn: () => void, ms: number) => void
}

const defaultSchedule = (fn: () => void, ms: number): void => {
  // Unref'd: a pending kill timer must never hold the app open at quit.
  setTimeout(fn, ms).unref()
}

export function processControls(
  getProc: () => Killable | null,
  opts: ProcessControlOpts = {}
): TaskControls {
  const platform = opts.platform ?? process.platform
  const killAfterMs = opts.killAfterMs ?? 5000
  const schedule = opts.schedule ?? defaultSchedule

  const cancel = (): void => {
    const proc = getProc()
    if (!proc) return
    // SIGCONT FIRST, unconditionally. A SIGSTOPped process does not act on
    // SIGTERM until it is continued, so cancelling a paused job would appear to
    // hang for the whole killAfterMs and then hard-kill. (SIGKILL *is*
    // delivered to a stopped process, which is why the before-quit killers are
    // already safe and need no change.)
    if (canSignalPause(platform)) {
      try {
        proc.kill('SIGCONT')
      } catch {
        /* already gone */
      }
    }
    opts.onCancel?.()
    try {
      proc.kill('SIGTERM')
    } catch {
      return
    }
    schedule(() => {
      const p = getProc()
      if (p && p.exitCode === null) {
        try {
          p.kill('SIGKILL')
        } catch {
          /* already gone */
        }
      }
    }, killAfterMs)
  }

  if (!canSignalPause(platform)) {
    // No pause/resume at all, so the registry derives canPause:false and the
    // button renders disabled with this note as its tooltip.
    return { cancel, pauseNote: 'Pause is unavailable on Windows' }
  }

  return {
    cancel,
    pause: () => void getProc()?.kill('SIGSTOP'),
    resume: () => void getProc()?.kill('SIGCONT'),
    // SIGSTOP takes effect immediately, so the row goes straight to 'paused'
    // rather than through 'pausing'.
    pauseIsInstant: true,
    // Best-effort by design: kill() signals the DIRECT child only, so a pause
    // during yt-dlp's [ExtractAudio] stops yt-dlp but not the ffmpeg it spawned.
    // Fixing that means detached process groups, which would change the quit
    // semantics of three existing killers — a separate, riskier change.
    pauseNote: null
  }
}

// ---------------------------------------------------------------------------
// Loop jobs — cooperative pause between iterations
// ---------------------------------------------------------------------------

export interface PauseGate {
  // await at every iteration boundary.
  wait(): Promise<void>
  readonly paused: boolean
  readonly cancelled: boolean
  controls: TaskControls
}

// For jobs that are a loop over items rather than a child process. Pause means
// "stop starting new work": the current item finishes first, which for an
// import can be a whole fetchWithRetry timeout away. That is why the registry
// shows 'pausing' until wait() actually blocks.
export function cooperativeGate(onPaused?: () => void, onResumed?: () => void): PauseGate {
  let paused = false
  let cancelled = false
  let release: (() => void) | null = null

  const wakeUp = (): void => {
    release?.()
    release = null
  }

  return {
    get paused() {
      return paused
    },
    get cancelled() {
      return cancelled
    },
    async wait(): Promise<void> {
      if (!paused || cancelled) return
      onPaused?.()
      while (paused && !cancelled) {
        await new Promise<void>((resolve) => {
          release = resolve
        })
      }
      onResumed?.()
    },
    controls: {
      pause: () => {
        paused = true
      },
      resume: () => {
        paused = false
        wakeUp()
      },
      cancel: () => {
        cancelled = true
        // MUST clear `paused` and release the waiter. Without this a paused
        // loop deadlocks forever on the promise above, and settleAllOnQuit can
        // never finish it.
        paused = false
        wakeUp()
      }
    }
  }
}
