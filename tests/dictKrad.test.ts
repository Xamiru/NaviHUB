import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))

import {
  componentsFor,
  getKradSetInfo,
  importKradData,
  kradComponents,
  kradFor,
  kradSample,
  kradSearch,
  parseKradComponentsJson,
  parseKradJson,
  removeKradSet
} from '../src/main/dict/krad'

beforeEach(() => {
  db = createDictTestDb()
})

// Slices of the real krad.json / krad_components.json shapes (verified live).
const KRAD = [
  { literal: '亜', components: ['｜', '一', '口'] },
  { literal: '娃', components: ['女', '土'] },
  { literal: '土', components: ['土'] },
  { literal: '亜', components: ['duplicate', 'must', 'lose'] }, // dup literal kept-first
  { literal: '', components: ['x'] }, // skipped
  { literal: '壊', components: ['土', '罒', '衣'] }
]
const COMPONENTS = [
  { component: '一', strokeCount: 1 },
  { component: '｜', strokeCount: 1 },
  { component: '口', strokeCount: 3 },
  { component: '女', strokeCount: 3 },
  { component: '土', strokeCount: 3 },
  { component: '罒', strokeCount: 5 },
  { component: '衣', strokeCount: 6 },
  { component: 'broken' } // strokeCount missing -> null
]

describe('parsers', () => {
  it('parses the array-of-objects shapes and skips junk', () => {
    const entries = parseKradJson(KRAD)
    expect(entries.map((e) => e.kanji)).toEqual(['亜', '娃', '土', '亜', '壊'])
    const comps = parseKradComponentsJson(COMPONENTS)
    expect(comps).toHaveLength(8)
    expect(comps.find((c) => c.component === 'broken')!.strokes).toBeNull()
  })

  it('throws on drifted formats', () => {
    expect(() => parseKradJson({ not: 'an array' })).toThrow(/format drifted/)
    expect(() => parseKradJson([{ nothing: true }])).toThrow(/no usable entries/)
    expect(() => parseKradComponentsJson('nope')).toThrow(/expected an array/)
  })
})

describe('importKradData', () => {
  it('imports, dedupes literals keep-first, and writes the registry last', async () => {
    const summary = await importKradData(KRAD, COMPONENTS)
    expect(summary.kanjiCount).toBe(4) // 亜 kept once
    expect(summary.componentCount).toBe(8)
    const info = getKradSetInfo()!
    expect(info.kanjiCount).toBe(4)
    expect(componentsFor('亜')).toEqual(['｜', '一', '口']) // first wins
  })

  it('re-import replaces the previous set', async () => {
    await importKradData(KRAD, COMPONENTS)
    await importKradData([{ literal: '口', components: ['口'] }], COMPONENTS.slice(0, 3))
    const info = getKradSetInfo()!
    expect(info.kanjiCount).toBe(1)
    expect((db.prepare('SELECT COUNT(*) AS n FROM krad_set').get() as { n: number }).n).toBe(1)
    expect(componentsFor('亜')).toEqual([])
  })

  it('remove clears everything', async () => {
    await importKradData(KRAD, COMPONENTS)
    removeKradSet()
    expect(getKradSetInfo()).toBeNull()
    for (const table of ['krad', 'krad_part', 'krad_component']) {
      expect((db.prepare(`SELECT COUNT(*) AS n FROM ${table}`).get() as { n: number }).n).toBe(0)
    }
  })
})

describe('queries', () => {
  beforeEach(async () => {
    await importKradData(KRAD, COMPONENTS)
  })

  it('kradFor returns components with stroke counts', () => {
    const k = kradFor('娃')!
    expect(k.components).toEqual([
      { char: '女', strokes: 3 },
      { char: '土', strokes: 3 }
    ])
    expect(kradFor('謎')).toBeNull()
  })

  it('kradSearch is an AND over components', () => {
    expect(kradSearch(['土']).map((h) => h.character)).toEqual(['土', '娃', '壊'])
    expect(kradSearch(['土', '女']).map((h) => h.character)).toEqual(['娃'])
    expect(kradSearch(['土', '口']).map((h) => h.character)).toEqual([])
    expect(kradSearch([])).toEqual([])
  })

  it('kradComponents carries per-component kanji counts', () => {
    const comps = kradComponents()
    expect(comps.find((c) => c.component === '土')!.kanjiCount).toBe(3)
    expect(comps.find((c) => c.component === '女')!.kanjiCount).toBe(1)
  })

  it('kradSample returns decompositions', () => {
    const sample = kradSample(10)
    expect(sample.length).toBe(4)
    expect(sample.every((s) => s.components.length > 0)).toBe(true)
  })

  it('queries return empty when the pack is absent', () => {
    removeKradSet()
    expect(kradFor('娃')).toBeNull()
    expect(kradSearch(['土'])).toEqual([])
    expect(kradComponents()).toEqual([])
    expect(kradSample(5)).toEqual([])
  })
})
