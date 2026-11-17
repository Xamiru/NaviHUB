import { beforeEach, describe, expect, it } from 'vitest'
import {
  QUEUE_AHEAD,
  QUEUE_BEHIND,
  advanceTo,
  loadQueue,
  removeAt,
  reshuffleUpcoming,
  showFromFiles,
  startQueue,
  videoQueue,
  type QueueShow,
  type VideoQueue
} from '../../src/renderer/src/lib/videoQueue'

// Deterministic rng (mulberry32) so draws are reproducible.
function seeded(seed: number): () => number {
  let a = seed
  return () => {
    a |= 0
    a = (a + 0x6d2b79f5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function show(mediaId: number, count: number, title = `Show ${mediaId}`): QueueShow {
  return {
    mediaId,
    title,
    files: Array.from({ length: count }, (_, i) => ({ fileId: mediaId * 1000 + i + 1, title: `E${i + 1}` }))
  }
}

// Plays every item in order, collecting what played.
function play(q: VideoQueue, steps: number, rng: () => number): number[] {
  const played = [q.items[q.index].fileId]
  for (let i = 0; i < steps - 1; i++) {
    q = advanceTo(q, q.index + 1, rng)
    played.push(q.items[q.index].fileId)
  }
  return played
}

describe('video shuffle queue', () => {
  it('plays every episode of a show once before any repeats', () => {
    const rng = seeded(1)
    const q = startQueue([show(1, 180)], rng)!
    const firstCycle = play(q, 180, rng)
    expect(new Set(firstCycle).size).toBe(180)
  })

  it('never opens a new cycle with the episode that closed the last one', () => {
    for (let seed = 1; seed <= 40; seed++) {
      const rng = seeded(seed)
      const played = play(startQueue([show(1, 3)], rng)!, 30, rng)
      for (let i = 1; i < played.length; i++) expect(played[i]).not.toBe(played[i - 1])
    }
  })

  it('mixes shows evenly whatever their sizes', () => {
    const rng = seeded(7)
    const played = play(startQueue([show(1, 180), show(2, 10)], rng)!, 400, rng)
    const small = played.filter((id) => id >= 2000).length
    // Equal share: about half the slots, far above the 10/190 a pooled shuffle gives.
    expect(small).toBeGreaterThan(150)
    expect(small).toBeLessThan(250)
    // The small show still never repeats within its own cycle.
    const smallRun = played.filter((id) => id >= 2000).slice(0, 10)
    expect(new Set(smallRun).size).toBe(10)
  })

  it('keeps a bounded window ahead and behind', () => {
    const rng = seeded(3)
    let q = startQueue([show(1, 500)], rng)!
    expect(q.items.length).toBe(QUEUE_AHEAD + 1)
    for (let i = 0; i < 80; i++) q = advanceTo(q, q.index + 1, rng)
    expect(q.index).toBe(QUEUE_BEHIND)
    expect(q.items.length - q.index - 1).toBe(QUEUE_AHEAD)
  })

  it('removes only upcoming items, and reshuffle keeps the current one', () => {
    const rng = seeded(5)
    let q = startQueue([show(1, 100)], rng)!
    const current = q.items[0].fileId
    const target = q.items[2].fileId
    expect(removeAt(q, 0, rng)).toBe(q)
    q = removeAt(q, 2, rng)
    expect(q.items.map((i) => i.fileId)).not.toContain(target)
    expect(q.items[0].fileId).toBe(current)

    const before = q.items.slice(1).map((i) => i.fileId)
    q = reshuffleUpcoming(q, rng)
    expect(q.items[0].fileId).toBe(current)
    expect(q.items.slice(1).map((i) => i.fileId)).not.toEqual(before)
    // Reshuffling returns cards to the deck: nothing is lost or duplicated in the cycle.
    const cycle = play(q, 99, rng)
    expect(new Set(cycle).size).toBe(99)
  })

  it('reshuffle across a cycle boundary never doubles an episode or replays the current one', () => {
    for (let seed = 1; seed <= 20; seed++) {
      const rng = seeded(seed)
      // Eight episodes: the 50-item window spans six cycles.
      let q = startQueue([show(1, 8)], rng)!
      q = advanceTo(q, 3, rng)
      const current = q.items[q.index].fileId
      q = reshuffleUpcoming(q, rng)
      const deckAndNext = q.items.slice(q.index + 1, q.index + 8).map((i) => i.fileId)
      expect(new Set(deckAndNext).size).toBe(7)
      expect(deckAndNext).not.toContain(current)
    }
  })

  it('leaves specials out unless asked, unless they are all there is', () => {
    const files = [
      { id: 1, title: 'E1', season: 1 },
      { id: 2, title: 'OVA', season: 0 }
    ]
    expect(showFromFiles(9, 'X', files).files.map((f) => f.fileId)).toEqual([1])
    expect(showFromFiles(9, 'X', files, true).files.map((f) => f.fileId)).toEqual([1, 2])
    expect(showFromFiles(9, 'X', [files[1]]).files.map((f) => f.fileId)).toEqual([2])
  })

  it('returns no queue when nothing can play', () => {
    expect(startQueue([show(1, 0)])).toBeNull()
  })
})

describe('video queue store', () => {
  beforeEach(() => {
    localStorage.clear()
    videoQueue.resetForTests()
  })

  it('persists, survives a reload, and clears on stop', () => {
    const first = videoQueue.start([show(1, 5)])!
    videoQueue.resetForTests()
    expect(videoQueue.get()?.items[0].fileId).toBe(first.fileId)
    const next = videoQueue.jump(1)!
    expect(videoQueue.get()?.items[videoQueue.get()!.index].fileId).toBe(next.fileId)
    videoQueue.stop()
    videoQueue.resetForTests()
    expect(videoQueue.get()).toBeNull()
  })

  it('ignores corrupt or foreign stored data', () => {
    localStorage.setItem('video.shuffleQueue', '{not json')
    expect(loadQueue()).toBeNull()
    localStorage.setItem('video.shuffleQueue', JSON.stringify({ v: 2, items: [] }))
    expect(loadQueue()).toBeNull()
    localStorage.setItem(
      'video.shuffleQueue',
      JSON.stringify({ v: 1, shows: [], decks: {}, items: [{ fileId: 1 }], index: 0 })
    )
    expect(loadQueue()).toBeNull()
  })
})
