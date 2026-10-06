import { describe, expect, it } from 'vitest'
import type { IpcMainInvokeEvent } from 'electron'
import { slowHandlerTimer, timeIpcHandlers } from '../src/main/ipcTiming'

const event = {} as IpcMainInvokeEvent

function fakeClock() {
  let t = 0
  return { now: () => t, advance: (ms: number) => void (t += ms) }
}

describe('slow IPC handler log', () => {
  it('names a slow handler once per window and never logs its arguments', () => {
    const clock = fakeClock()
    const warnings: string[] = []
    const wrap = slowHandlerTimer({ thresholdMs: 100, repeatMs: 10_000, now: clock.now, warn: (m) => warnings.push(m) })
    const slow = wrap('quiz:availability', (_e, request) => {
      clock.advance(250)
      return { request }
    })
    const fast = wrap('media:get', () => clock.advance(5))

    expect(slow(event, { secret: 'token-123' })).toEqual({ request: { secret: 'token-123' } })
    fast(event)
    slow(event, {})
    expect(warnings).toEqual(['slow handler quiz:availability: 250 ms on the main process'])

    clock.advance(10_000)
    slow(event, {})
    expect(warnings).toHaveLength(2)
    expect(warnings.join(' ')).not.toContain('token-123')
  })

  it('times a handler that throws and only the synchronous part of an async one', async () => {
    const clock = fakeClock()
    const warnings: string[] = []
    const wrap = slowHandlerTimer({ now: clock.now, warn: (m) => warnings.push(m) })
    const failing = wrap('dict:lookup', () => {
      clock.advance(120)
      throw new Error('broken')
    })
    expect(() => failing(event)).toThrow('broken')
    const asyncHandler = wrap('music:scan', async () => {
      await Promise.resolve()
      clock.advance(5_000)
    })
    await asyncHandler(event)
    expect(warnings).toEqual(['slow handler dict:lookup: 120 ms on the main process'])
  })

  it('wraps every handler registered after installation', () => {
    const registered = new Map<string, (...args: unknown[]) => unknown>()
    const ipc = { handle: (channel: string, listener: (...args: unknown[]) => unknown) => void registered.set(channel, listener) }
    timeIpcHandlers(ipc as never)
    const original = () => 'value'
    ipc.handle('tags:list', original)
    expect(registered.get('tags:list')).not.toBe(original)
    expect(registered.get('tags:list')!(event)).toBe('value')
  })
})
