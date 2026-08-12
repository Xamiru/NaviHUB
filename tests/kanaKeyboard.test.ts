import { describe, expect, it } from 'vitest'
import {
  GOJUON_ROWS,
  FLICK_KEYS,
  FlickDir,
  applyDakuten,
  applyHandakuten,
  applySmall,
  cycleKana,
  flickResult,
  QWERTY_ROWS
} from '../src/shared/kanaKeyboard'
import { acceptedRomaji } from '../src/shared/romaji'
import { isKanaOnly } from '../src/shared/kana'

const gojuonKana = GOJUON_ROWS.flat().filter((k): k is string => k !== null)

describe('gojūon table', () => {
  it('holds exactly the 46 modern kana, no duplicates', () => {
    expect(gojuonKana).toHaveLength(46)
    expect(new Set(gojuonKana).size).toBe(46)
    expect(gojuonKana.every((k) => isKanaOnly(k))).toBe(true)
  })

  it('every cell has a romaji rendering for the hint labels', () => {
    for (const k of gojuonKana) {
      expect(acceptedRomaji(k).length, `no romaji for ${k}`).toBeGreaterThan(0)
    }
  })

  it('rows are uniform 5-column chart rows', () => {
    expect(GOJUON_ROWS).toHaveLength(11)
    for (const row of GOJUON_ROWS) expect(row).toHaveLength(5)
  })
})

describe('kana transforms', () => {
  it('dakuten toggles both ways', () => {
    expect(applyDakuten('か')).toBe('が')
    expect(applyDakuten('が')).toBe('か')
    expect(applyDakuten('う')).toBe('ゔ')
    expect(applyDakuten('ん')).toBe(null)
  })

  it('handakuten toggles the は row only', () => {
    expect(applyHandakuten('は')).toBe('ぱ')
    expect(applyHandakuten('ぱ')).toBe('は')
    expect(applyHandakuten('ば')).toBe('ぱ') // cross-variant: voiced →半濁
    expect(applyHandakuten('か')).toBe(null)
  })

  it('small toggles both ways', () => {
    expect(applySmall('つ')).toBe('っ')
    expect(applySmall('っ')).toBe('つ')
    expect(applySmall('や')).toBe('ゃ')
    expect(applySmall('ま')).toBe(null)
  })

  it('cycle follows the phone convention and every orbit closes', () => {
    expect(cycleKana('つ')).toBe('っ')
    expect(cycleKana('っ')).toBe('づ')
    expect(cycleKana('づ')).toBe('つ')
    expect(cycleKana('は')).toBe('ば')
    expect(cycleKana('ば')).toBe('ぱ')
    expect(cycleKana('ぱ')).toBe('は')
    expect(cycleKana('あ')).toBe('ぁ')
    expect(cycleKana('ぁ')).toBe('あ')
    expect(cycleKana('ん')).toBe('ん')
    // Every gojūon kana's orbit returns to itself within the variant count.
    for (const k of gojuonKana) {
      let cur = k
      let steps = 0
      do {
        cur = cycleKana(cur)
        steps++
        expect(steps).toBeLessThanOrEqual(4)
      } while (cur !== k)
    }
  })
})

describe('flick layout', () => {
  it('tap yields the center, petals resolve, missing petals are null', () => {
    const a = FLICK_KEYS[0]
    expect(flickResult(a, 'tap')).toBe('あ')
    expect(flickResult(a, 'left')).toBe('い')
    expect(flickResult(a, 'down')).toBe('お')
    const ya = FLICK_KEYS.find((k) => k.id === 'ya')!
    expect(flickResult(ya, 'up')).toBe('ゆ')
  })

  it('all outputs across keys are unique', () => {
    const outs: string[] = []
    const dirs: FlickDir[] = ['tap', 'left', 'up', 'right', 'down']
    for (const key of FLICK_KEYS) {
      for (const dir of dirs) {
        const r = flickResult(key, dir)
        if (r !== null) outs.push(r)
      }
    }
    expect(new Set(outs).size).toBe(outs.length)
  })

  it('every gojūon kana is reachable by flick (directly or via the cycle key)', () => {
    const reachable = new Set<string>()
    const dirs: FlickDir[] = ['tap', 'left', 'up', 'right', 'down']
    for (const key of FLICK_KEYS) {
      for (const dir of dirs) {
        const r = flickResult(key, dir)
        if (r === null) continue
        let cur = r
        for (let i = 0; i < 4; i++) {
          reachable.add(cur)
          cur = cycleKana(cur)
        }
      }
    }
    for (const k of gojuonKana) {
      expect(reachable.has(k), `${k} unreachable by flick`).toBe(true)
    }
    // ...and so is every voiced / half-voiced / small form of the table.
    for (const k of gojuonKana) {
      for (const v of [applyDakuten(k), applyHandakuten(k), applySmall(k)]) {
        if (v) expect(reachable.has(v), `${v} unreachable by flick`).toBe(true)
      }
    }
  })
})

describe('qwerty layout', () => {
  it('covers a-z exactly once plus the long-vowel dash', () => {
    const chars = QWERTY_ROWS.join('')
    expect(chars).toHaveLength(27)
    expect(new Set(chars).size).toBe(27)
    for (const c of 'abcdefghijklmnopqrstuvwxyz-') {
      expect(chars.includes(c), `missing ${c}`).toBe(true)
    }
  })
})
