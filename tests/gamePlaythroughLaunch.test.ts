import { EventEmitter } from 'node:events'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
const m = vi.hoisted(() => ({
  spawn: vi.fn(),
  activeId: vi.fn(),
  record: vi.fn(),
  startWatch: vi.fn(),
  stopWatch: vi.fn(),
  spec: vi.fn(),
  shots: vi.fn(),
  addFromPaths: vi.fn()
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
// The launch spec is emulation.ts's job (tests/emulation.test.ts); here the
// linked executable is the way to play.
vi.mock('../src/main/emulation', () => ({
  launchSpec: () => m.spec(),
  findSessionShots: (...args: unknown[]) => m.shots(...args),
  SHOT_GRACE_MS: 8_000
}))
vi.mock('../src/main/pictures', () => ({ addFromPaths: (...args: unknown[]) => m.addFromPaths(...args) }))
const NATIVE = {
  program: 'C:\\Games\\game.exe',
  args: [],
  cwd: 'C:\\Games',
  via: 'native',
  platform: null,
  native: true,
  emulatorId: null
}
import { startSession, finalizeActiveGameSession, getLaunchStatus, importSessionShots } from '../src/main/gameLaunch'
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
  m.spec.mockReturnValue(NATIVE)
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
    expect(m.record).toHaveBeenCalledWith(1, 1790157600, 1790161200, 3600, 4, { via: 'native', platform: null })
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

  it('spawns the emulator with its argv, then offers the session screenshots once', async () => {
    m.spec.mockReturnValue({
      program: 'C:\\Emu\\pcsx2-qt.exe',
      args: ['-batch', '-fullscreen', '--', 'D:\\PS2\\sotc.iso'],
      cwd: 'C:\\Emu',
      via: 'emu:pcsx2',
      platform: 'ps2',
      native: false,
      emulatorId: 3
    })
    m.shots.mockResolvedValue(['C:\\shots\\a.png', 'C:\\shots\\b.png'])
    m.addFromPaths.mockReturnValue({ added: [{}, {}], skipped: 0 })
    const { id } = startSession(1, { kind: 'rom', romId: 5 })
    expect(m.spawn).toHaveBeenCalledWith(
      'C:\\Emu\\pcsx2-qt.exe',
      ['-batch', '-fullscreen', '--', 'D:\\PS2\\sotc.iso'],
      expect.objectContaining({ cwd: 'C:\\Emu', detached: true })
    )
    vi.advanceTimersByTime(600_000)
    child.emit('exit', 0)
    expect(m.record.mock.calls[0][5]).toEqual({ via: 'emu:pcsx2', platform: 'ps2' })
    expect(getLaunchStatus()).toMatchObject({ state: 'ended', shotsPending: true })
    await vi.advanceTimersByTimeAsync(8_500)
    expect(m.shots).toHaveBeenCalledWith(3, expect.any(Number), expect.any(Number))
    expect(getLaunchStatus()).toMatchObject({ shotsPending: false, screenshotCount: 2 })
    vi.useRealTimers()
    await expect(importSessionShots(id)).resolves.toEqual({ added: 2, skipped: 0 })
    expect(m.addFromPaths).toHaveBeenCalledWith(1, 'fanart', ['C:\\shots\\a.png', 'C:\\shots\\b.png'])
    await expect(importSessionShots(id)).rejects.toThrow(/no longer available/)
  })

  it('never sweeps screenshots while the app is quitting', () => {
    m.spec.mockReturnValue({ ...NATIVE, via: 'emu:dolphin', platform: 'gc', native: false, emulatorId: 2 })
    startSession(1)
    vi.advanceTimersByTime(120_000)
    finalizeActiveGameSession()
    vi.advanceTimersByTime(20_000)
    expect(m.shots).not.toHaveBeenCalled()
  })
})
