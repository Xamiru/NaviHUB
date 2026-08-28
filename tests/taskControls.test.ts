import { describe, expect, it, vi } from 'vitest'
import { canSignalPause, cooperativeGate, processControls, type Killable } from '../src/main/taskControls'

// No real child process anywhere: processControls reaches its process through
// an injected getter, and the SIGKILL timer through an injected scheduler. That
// is what makes the two dangerous branches below testable at all.

function recorder(exitCode: number | null = null): Killable & { signals: string[] } {
  const signals: string[] = []
  return {
    signals,
    exitCode,
    kill(sig?: NodeJS.Signals) {
      signals.push(sig ?? 'SIGTERM')
      return true
    }
  }
}

describe('canSignalPause', () => {
  it('is false on Windows', () => {
    // Node has no signals there: proc.kill('SIGSTOP') IGNORES the name and
    // terminates the process. This one boolean is what stops the Pause button
    // from destroying an in-flight download on the machine the user runs.
    expect(canSignalPause('win32')).toBe(false)
    expect(canSignalPause('linux')).toBe(true)
    expect(canSignalPause('darwin')).toBe(true)
  })
})

describe('processControls on a signalling platform', () => {
  it('pauses and resumes with SIGSTOP / SIGCONT', () => {
    const proc = recorder()
    const c = processControls(() => proc, { platform: 'linux' })
    c.pause?.()
    c.resume?.()
    expect(proc.signals).toEqual(['SIGSTOP', 'SIGCONT'])
  })

  it('reports pause as instant, so the row skips "pausing"', () => {
    const c = processControls(() => recorder(), { platform: 'linux' })
    expect(c.pauseIsInstant).toBe(true)
  })

  it('sends SIGCONT BEFORE SIGTERM when cancelling', () => {
    // A SIGSTOPped process does not act on SIGTERM until it is continued, so
    // without the SIGCONT first, cancelling a paused job appears to hang for
    // the full five seconds and then hard-kills.
    const proc = recorder()
    const c = processControls(() => proc, { platform: 'linux', schedule: () => undefined })
    c.pause?.()
    c.cancel?.()
    expect(proc.signals).toEqual(['SIGSTOP', 'SIGCONT', 'SIGTERM'])
  })

  it('calls onCancel before SIGTERM so the exit reads as a cancel', () => {
    const order: string[] = []
    const proc: Killable = {
      exitCode: null,
      kill(sig) {
        order.push(String(sig))
        return true
      }
    }
    const c = processControls(() => proc, {
      platform: 'linux',
      schedule: () => undefined,
      onCancel: () => order.push('flag')
    })
    c.cancel?.()
    expect(order).toEqual(['flag', 'SIGCONT', 'SIGTERM'])
  })

  it('escalates to SIGKILL only if the process is still alive', () => {
    const alive = recorder(null)
    let fire: (() => void) | null = null
    processControls(() => alive, {
      platform: 'linux',
      killAfterMs: 5000,
      schedule: (fn) => {
        fire = fn
      }
    }).cancel?.()
    expect(alive.signals).toEqual(['SIGCONT', 'SIGTERM'])
    fire!()
    expect(alive.signals).toEqual(['SIGCONT', 'SIGTERM', 'SIGKILL'])
  })

  it('does not SIGKILL a process that already exited', () => {
    const dead = recorder(0)
    let fire: (() => void) | null = null
    processControls(() => dead, { platform: 'linux', schedule: (fn) => (fire = fn) }).cancel?.()
    fire!()
    expect(dead.signals).not.toContain('SIGKILL')
  })

  it('records cancellation between process phases and rejects a false pause acknowledgement', () => {
    const onCancel = vi.fn()
    const c = processControls(() => null, { platform: 'linux', onCancel })
    expect(() => c.cancel?.()).not.toThrow()
    expect(onCancel).toHaveBeenCalledOnce()
    expect(() => c.pause?.()).toThrow(/between process phases/)
    expect(() => c.resume?.()).toThrow(/between process phases/)
  })
})

describe('processControls on Windows', () => {
  it('exposes cancel but NO pause/resume, with a note saying why', () => {
    const proc = recorder()
    const c = processControls(() => proc, { platform: 'win32', schedule: () => undefined })
    expect(c.pause).toBeUndefined()
    expect(c.resume).toBeUndefined()
    expect(c.pauseNote).toBe('Pause is unavailable on Windows')

    c.cancel?.()
    // And no SIGCONT either — that call would itself kill the process there.
    expect(proc.signals).toEqual(['SIGTERM'])
  })

  it('kills the complete Windows process tree when a pid is available', () => {
    const proc = recorder()
    proc.pid = 4242
    const killTree = vi.fn()
    const onCancel = vi.fn()
    processControls(() => proc, { platform: 'win32', killTree, onCancel }).cancel?.()
    expect(onCancel).toHaveBeenCalledOnce()
    expect(killTree).toHaveBeenCalledWith(4242)
    expect(proc.signals).toEqual([])
  })
})

describe('cooperativeGate', () => {
  it('does not block while running', async () => {
    const gate = cooperativeGate()
    await expect(gate.wait()).resolves.toBeUndefined()
    expect(gate.paused).toBe(false)
  })

  it('blocks while paused and releases on resume', async () => {
    const gate = cooperativeGate()
    gate.controls.pause?.()
    expect(gate.paused).toBe(true)

    let released = false
    const waiting = gate.wait().then(() => {
      released = true
    })
    await Promise.resolve()
    expect(released).toBe(false)

    gate.controls.resume?.()
    await waiting
    expect(released).toBe(true)
    expect(gate.paused).toBe(false)
  })

  it('CANCEL RELEASES A PAUSED WAITER — the deadlock regression', async () => {
    // Without this, a paused loop waits forever on its promise and
    // settleAllOnQuit can never finish it.
    const gate = cooperativeGate()
    gate.controls.pause?.()
    const waiting = gate.wait()
    gate.controls.cancel?.()
    await expect(waiting).resolves.toBeUndefined()
    expect(gate.cancelled).toBe(true)
    expect(gate.paused).toBe(false)
    expect(gate.signal.aborted).toBe(true)
  })

  it('never blocks once cancelled', async () => {
    const gate = cooperativeGate()
    gate.controls.cancel?.()
    gate.controls.pause?.()
    await expect(gate.wait()).resolves.toBeUndefined()
  })

  it('fires the paused/resumed callbacks exactly once per pause', async () => {
    const onPaused = vi.fn()
    const onResumed = vi.fn()
    const gate = cooperativeGate(onPaused, onResumed)

    await gate.wait() // running: neither fires
    expect(onPaused).not.toHaveBeenCalled()

    gate.controls.pause?.()
    const waiting = gate.wait()
    await Promise.resolve()
    // This is what turns the registry row from 'pausing' into 'paused'.
    expect(onPaused).toHaveBeenCalledOnce()
    expect(onResumed).not.toHaveBeenCalled()

    gate.controls.resume?.()
    await waiting
    expect(onResumed).toHaveBeenCalledOnce()
  })

  it('survives a pause/resume cycle and pauses again', async () => {
    const gate = cooperativeGate()
    for (let i = 0; i < 3; i++) {
      gate.controls.pause?.()
      const waiting = gate.wait()
      await Promise.resolve()
      gate.controls.resume?.()
      await waiting
      expect(gate.paused).toBe(false)
    }
  })
})
