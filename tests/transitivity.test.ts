import { describe, expect, it } from 'vitest'
import { conjugate } from '../src/shared/conjugate'
import { isKanaOnly } from '../src/shared/kana'
import { TRANSITIVITY_PAIRS, transitivityPartner } from '../src/shared/transitivity'

describe('TRANSITIVITY_PAIRS structure', () => {
  it('keys are unique and match the kanji-form convention', () => {
    const keys = new Set<string>()
    for (const p of TRANSITIVITY_PAIRS) {
      expect(p.key).toBe(`${p.intrans}-${p.trans}`)
      expect(keys.has(p.key), `duplicate key ${p.key}`).toBe(false)
      keys.add(p.key)
    }
  })

  it('kana fields are kana-only and members differ', () => {
    for (const p of TRANSITIVITY_PAIRS) {
      expect(isKanaOnly(p.intransKana), p.key).toBe(true)
      expect(isKanaOnly(p.transKana), p.key).toBe(true)
      expect(p.intrans, p.key).not.toBe(p.trans)
    }
  })

  it('every example contains its surface, with the right particle', () => {
    for (const p of TRANSITIVITY_PAIRS) {
      expect(p.exampleIntrans.includes(p.exampleIntransSurface), p.key).toBe(true)
      expect(p.exampleTrans.includes(p.exampleTransSurface), p.key).toBe(true)
      // The particle IS the lesson: intransitive examples show が, transitive を.
      expect(p.exampleIntrans.includes('が'), p.key).toBe(true)
      expect(p.exampleTrans.includes('を'), p.key).toBe(true)
    }
  })

  it('surfaces are mechanically derivable from the member (past form)', () => {
    // kanji stem + conjugate(kana, cls, 'past') minus the kana stem — a typo
    // in either the kana, the class, or the surface fails here.
    const surfaceOf = (kanji: string, kana: string, cls: 'v1' | 'v5' | 'vs' | 'vk' | 'adj-i'): string => {
      let okurigana = 0
      for (let i = kanji.length - 1; i >= 0; i--) {
        const c = kanji.codePointAt(i)!
        if ((c >= 0x3041 && c <= 0x309f) || c === 0x30fc) okurigana++
        else break
      }
      const past = conjugate(kana, cls, 'past')!
      expect(past, `${kanji} must conjugate`).toBeTruthy()
      return kanji.slice(0, kanji.length - okurigana) + past.slice(kana.length - okurigana)
    }
    for (const p of TRANSITIVITY_PAIRS) {
      expect(surfaceOf(p.intrans, p.intransKana, p.intransClass), p.key).toBe(
        p.exampleIntransSurface
      )
      expect(surfaceOf(p.trans, p.transKana, p.transClass), p.key).toBe(p.exampleTransSurface)
    }
  })

  it('pattern labels and glosses are non-empty', () => {
    for (const p of TRANSITIVITY_PAIRS) {
      expect(p.pattern.length, p.key).toBeGreaterThan(0)
      expect(p.gloss.length, p.key).toBeGreaterThan(0)
    }
  })

  it('has the promised volume', () => {
    expect(TRANSITIVITY_PAIRS.length).toBeGreaterThanOrEqual(80)
  })
})

describe('transitivityPartner', () => {
  it('round-trips both directions by kanji form', () => {
    const fromIntrans = transitivityPartner('開く')!
    expect(fromIntrans.partner).toBe('開ける')
    expect(fromIntrans.role).toBe('intransitive')
    const fromTrans = transitivityPartner('開ける')!
    expect(fromTrans.partner).toBe('開く')
    expect(fromTrans.role).toBe('transitive')
  })

  it('accepts kana forms', () => {
    expect(transitivityPartner('だす')?.partner).toBe('出る')
    expect(transitivityPartner('でる')?.partner).toBe('出す')
  })

  it('returns null for non-members', () => {
    expect(transitivityPartner('食べる')).toBeNull()
    expect(transitivityPartner('')).toBeNull()
  })
})
