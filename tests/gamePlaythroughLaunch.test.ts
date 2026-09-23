import { EventEmitter } from 'node:events'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
const m = vi.hoisted(() => ({
  spawn: vi.fn(),
  activeId: vi.fn(),
  record: vi.fn(),
  startWatch: vi.fn(),
  stopWatch: vi.fn()
}))
vi.mock('child_process', () => ({ spawn: m.spawn }))
vi.mock('fs', () => ({ existsSync: () => true }))
vi.mock('electron', () => ({ dialog: {} }))
vi.mock('../src/main/repos/playthroughRepo', () => ({ activeId: m.activeId }))
vi.mock('../src/main/repos/gameSessionRepo', () => ({
  launchInfo: () => ({ title: 'Game', mediaType: 'game', exePath: 'C:\\Games\\game.exe' }),
  recordSession: m.record
}))
vi.mock('../src/main/achievementWatcher', () => ({
  startWatch: m.startWatch,
  stopWatch: m.stopWatch
}))
vi.mock('../src/main/logBus', () => ({ logWarn: vi.fn() }))
import { startSession, finalizeActiveGameSession, getLaunchStatus } from '../src/main/gameLaunch'
const platform = Object.getOwnPropertyDescriptor(process, 'platform')!
let child: EventEmitter & { unref: () => void }
beforeEach(() => {
  vi.useFakeTimers()
  vi.setSystemTime(new Date('2026-09-23T10:00:00Z'))
  Object.defineProperty(process, 'platform', { value: 'win32' })
  child = Object.assign(new EventEmitter(), { unref: vi.fn() })
  m.spawn.mockReturnValue(child)
  m.activeId.mockReturnValue(4)
  m.record.mockReturnValue({ progressDelta: 1, progressAfter: 21 })
})
afterEach(() => {
  finalizeActiveGameSession()
  Object.defineProperty(process, 'platform', platform)
  vi.useRealTimers()
  vi.clearAllMocks()
})
describe('playthrough identity during a running game', () => {
  it('keeps the launch-time run when the user changes the active run before exit', () => {
    startSession(1)
    m.activeId.mockReturnValue(9)
    vi.advanceTimersByTime(3600_000)
    child.emit('exit', 0)
    expect(m.record).toHaveBeenCalledWith(1, 1790157600, 1790161200, 3600, 4)
    expect(m.activeId).toHaveBeenCalledTimes(1)
    expect(getLaunchStatus()).toMatchObject({ state: 'ended', durationSec: 3600 })
  })
  it('records once on quit, ignores a late exit, and never kills the game', () => {
    startSession(1)
    vi.advanceTimersByTime(120_000)
    finalizeActiveGameSession()
    child.emit('exit', 0)
    expect(m.record).toHaveBeenCalledTimes(1)
    expect(m.record.mock.calls[0][4]).toBe(4)
    expect(m.spawn).toHaveBeenCalledWith(
      expect.any(String),
      [],
      expect.objectContaining({ detached: true, stdio: 'ignore' })
    )
  })
  it('does not create a journal session for a launcher stub or a failed launch', () => {
    startSession(1)
    vi.advanceTimersByTime(20_000)
    child.emit('exit', 0)
    expect(m.record).not.toHaveBeenCalled()
    expect(getLaunchStatus()).toMatchObject({ discarded: true })
    startSession(1)
    child.emit('error', new Error('Launch failed'))
    expect(m.record).not.toHaveBeenCalled()
    expect(getLaunchStatus()).toMatchObject({ state: 'error' })
  })
})
