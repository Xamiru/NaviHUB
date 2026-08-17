import { describe, expect, it } from 'vitest'
import { orderByComponent } from '../src/shared/kanjiGroups'

const COMPONENTS: Record<string, string[]> = {
  持: ['扌', '寺'],
  待: ['彳', '寺'],
  時: ['日', '寺'],
  明: ['日', '月'],
  休: ['亻', '木'],
  林: ['木', '木'],
  猫: [] // no component data
}
const comps = (c: string): string[] => COMPONENTS[c] ?? []

describe('orderByComponent', () => {
  it('keeps every character exactly once', () => {
    const chars = Object.keys(COMPONENTS)
    const out = orderByComponent(chars, comps)
    expect([...out].sort()).toEqual([...chars].sort())
  })

  it('deals characters sharing a component consecutively', () => {
    const out = orderByComponent(['持', '休', '待', '林', '時'], comps)
    const idx = (c: string): number => out.indexOf(c)
    // The 寺 family lands as a run.
    const teraPositions = [idx('持'), idx('待'), idx('時')].sort((a, b) => a - b)
    expect(teraPositions[2] - teraPositions[0]).toBe(2)
    // 休 and 林 share 木 and sit together too.
    expect(Math.abs(idx('休') - idx('林'))).toBe(1)
  })

  it('puts characters with no component data last, in their original order', () => {
    const out = orderByComponent(['猫', '持', '待'], comps)
    expect(out[out.length - 1]).toBe('猫')
  })

  it('handles empty and single-character input', () => {
    expect(orderByComponent([], comps)).toEqual([])
    expect(orderByComponent(['持'], comps)).toEqual(['持'])
  })
})
