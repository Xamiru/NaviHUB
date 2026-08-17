import { describe, expect, it } from 'vitest'
import { readdirSync, readFileSync, statSync } from 'fs'
import { join } from 'path'
import { shuffle } from '../src/shared/shuffle'

// A tiny deterministic LCG so the uniformity check is reproducible.
function lcg(seed: number): () => number {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1664525) + 1013904223) >>> 0
    return s / 0x100000000
  }
}

function walk(dir: string, out: string[] = []): string[] {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) walk(p, out)
    else if (/\.(ts|tsx)$/.test(name)) out.push(p)
  }
  return out
}

describe('shuffle', () => {
  it('returns a copy with the same members', () => {
    const src = [1, 2, 3, 4, 5]
    const out = shuffle(src, lcg(1))
    expect(out).not.toBe(src)
    expect([...out].sort()).toEqual([1, 2, 3, 4, 5])
    expect(src).toEqual([1, 2, 3, 4, 5])
  })

  it('handles empty and single-element arrays', () => {
    expect(shuffle([])).toEqual([])
    expect(shuffle(['x'])).toEqual(['x'])
  })

  it('is uniform: with the answer authored at index 0, every slot is equally likely', () => {
    // This is the whole reason the module exists — the biased comparator put
    // index 0 into slot 1 ~36% of the time and slot 3 ~16%.
    const rng = lcg(42)
    const trials = 40_000
    const slots = [0, 0, 0, 0]
    for (let t = 0; t < trials; t++) {
      const out = shuffle(['answer', 'b', 'c', 'd'], rng)
      slots[out.indexOf('answer')]++
    }
    for (const n of slots) {
      const share = n / trials
      expect(share).toBeGreaterThan(0.23)
      expect(share).toBeLessThan(0.27)
    }
  })

  it('no file under src/ uses the biased .sort(() => Math.random() - 0.5) comparator', () => {
    const offenders: string[] = []
    for (const file of walk('src')) {
      const lines = readFileSync(file, 'utf8').split('\n')
      lines.forEach((line, i) => {
        if (line.trimStart().startsWith('//')) return // comments may explain the ban
        if (/\.sort\(\s*\(\)\s*=>\s*Math\.random\(\)\s*-\s*0\.5\s*\)/.test(line)) {
          offenders.push(`${file}:${i + 1}`)
        }
      })
    }
    expect(offenders, 'use shuffle() from @shared/shuffle instead').toEqual([])
  })
})
