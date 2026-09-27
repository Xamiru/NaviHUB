import { describe, expect, it } from 'vitest'
import { createThrottle } from '../src/main/requestThrottle'

// One API budget shared by every caller: concurrent requests are queued into
// successive slots rather than all firing together.
describe('createThrottle', () => {
  it('spaces concurrent callers into successive slots', async () => {
    let clock = 1000
    const waits: number[] = []
    const t = createThrottle(2000, {
      now: () => clock,
      wait: async (ms) => {
        waits.push(ms)
      }
    })
    await Promise.all([t.take(), t.take(), t.take()])
    expect(waits).toEqual([2000, 4000])

    // Once the booked slots have passed, the next caller goes straight through.
    clock = 10_000
    await t.take()
    expect(waits).toEqual([2000, 4000])
  })

  it('never waits when disabled', async () => {
    const waits: number[] = []
    const t = createThrottle(2000, { now: () => 0, wait: async (ms) => void waits.push(ms) })
    t.intervalMs = 0
    await Promise.all([t.take(), t.take()])
    expect(waits).toEqual([])
  })
})
