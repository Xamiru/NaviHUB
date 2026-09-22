import { describe, expect, it } from 'vitest'
import {
  environmentMessage,
  friendlyUpdateError,
  idleStatus,
  reduceUpdate,
  updateEnvironment,
  type UpdaterEvent
} from '../src/main/updaterCore'
import type { UpdateStatus } from '../src/shared/types'

// The in-app updater's decisions, isolated from electron-updater (updater.ts
// holds the SDK wiring; everything here is pure — the coachTools.ts split).

describe('updateEnvironment', () => {
  const base = { packaged: true, portableExe: null }

  it('allows public updates for a packaged, non-portable build', () => {
    expect(updateEnvironment(base)).toBe('ok')
  })

  it('reports a dev run', () => {
    expect(updateEnvironment({ ...base, packaged: false })).toBe('dev')
  })

  it('reports the portable build', () => {
    expect(updateEnvironment({ ...base, portableExe: 'NaviHUB-portable.exe' })).toBe('portable')
  })

  it('explains every blocked environment and stays silent when ok', () => {
    expect(environmentMessage('ok')).toBeNull()
    for (const env of ['dev', 'portable'] as const) {
      expect(environmentMessage(env)).toBeTruthy()
    }
  })
})

describe('idleStatus', () => {
  it('carries the environment message so the card can explain itself', () => {
    const s = idleStatus('0.4.0', 'portable')
    expect(s.state).toBe('idle')
    expect(s.currentVersion).toBe('0.4.0')
    expect(s.message).toBeTruthy()
    expect(s.percent).toBeNull()
  })

  it('has no message when updates are available', () => {
    expect(idleStatus('0.4.0', 'ok').message).toBeNull()
  })
})

describe('reduceUpdate', () => {
  const start = (): UpdateStatus => ({ ...idleStatus('0.4.0', 'ok'), id: 'upd-1' })
  const run = (events: UpdaterEvent[]): UpdateStatus => events.reduce(reduceUpdate, start())

  it('walks the happy path check -> available -> download -> ready', () => {
    const s = run([
      { kind: 'checking' },
      { kind: 'available', version: '0.5.0' },
      { kind: 'progress', percent: 40 },
      { kind: 'downloaded', version: '0.5.0' }
    ])
    expect(s.state).toBe('ready')
    expect(s.version).toBe('0.5.0')
    expect(s.percent).toBe(100)
  })

  it('reports up to date without a version', () => {
    const s = run([{ kind: 'checking' }, { kind: 'notAvailable' }])
    expect(s.state).toBe('upToDate')
    expect(s.version).toBeNull()
  })

  it('clamps and rounds download progress', () => {
    expect(run([{ kind: 'progress', percent: 41.6 }]).percent).toBe(42)
    expect(run([{ kind: 'progress', percent: -5 }]).percent).toBe(0)
    expect(run([{ kind: 'progress', percent: 140 }]).percent).toBe(100)
  })

  it('ignores a late progress event after the download finished', () => {
    // electron-updater can emit one after update-downloaded; it must not drag a
    // finished download back to 'downloading'.
    const s = run([
      { kind: 'available', version: '0.5.0' },
      { kind: 'downloaded', version: '0.5.0' },
      { kind: 'progress', percent: 90 }
    ])
    expect(s.state).toBe('ready')
    expect(s.percent).toBe(100)
  })

  it('treats a cancel as still-available, not an error', () => {
    const s = run([
      { kind: 'available', version: '0.5.0' },
      { kind: 'progress', percent: 30 },
      { kind: 'cancelled' }
    ])
    expect(s.state).toBe('available')
    expect(s.version).toBe('0.5.0')
    expect(s.percent).toBeNull()
  })

  it('keeps the version on error so the UI can name the failed release', () => {
    const s = run([
      { kind: 'available', version: '0.5.0' },
      { kind: 'error', message: 'boom' }
    ])
    expect(s.state).toBe('error')
    expect(s.version).toBe('0.5.0')
    expect(s.message).toBe('boom')
  })

  it('clears a previous error when a new check starts', () => {
    const s = run([{ kind: 'error', message: 'boom' }, { kind: 'checking' }])
    expect(s.state).toBe('checking')
    expect(s.message).toBeNull()
  })

  it('never mutates the status it was given', () => {
    const prev = start()
    const next = reduceUpdate(prev, { kind: 'available', version: '0.5.0' })
    expect(prev.state).toBe('idle')
    expect(next).not.toBe(prev)
  })
})

describe('friendlyUpdateError', () => {
  it('explains a missing public release or manifest', () => {
    const msg = friendlyUpdateError('HttpError: 404 Not Found')
    expect(msg).toMatch(/release|manifest/i)
    expect(msg).not.toBe('HttpError: 404 Not Found')
  })

  it('explains 401 and 403 too', () => {
    expect(friendlyUpdateError('401 Unauthorized')).toMatch(/rejected/i)
    expect(friendlyUpdateError('Bad credentials')).toMatch(/rejected/i)
    expect(friendlyUpdateError('403 Forbidden')).toMatch(/rate limit/i)
  })

  it('passes an unrecognized message through unchanged', () => {
    expect(friendlyUpdateError('ENOTFOUND api.github.com')).toBe('ENOTFOUND api.github.com')
  })
})
