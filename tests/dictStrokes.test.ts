import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb } from './helpers'

let db: Database.Database
vi.mock('../src/main/dict/dictDb', () => ({
  getDictDb: () => db,
  closeDictDb: () => {}
}))

import {
  getStrokeSetInfo,
  getStrokes,
  importStrokeXml,
  parseKanjiVgXml,
  removeStrokeSet
} from '../src/main/dict/strokes'
import { pathStart, polylineLength, samplePath } from '../src/shared/strokes'

beforeEach(() => {
  db = createDictTestDb()
})

// Trimmed from real KanjiVG output: 一 (one stroke), 十 (two strokes), plus a
// Kaisho variant of 一 that must not overwrite the canonical entry.
const XML = `<?xml version="1.0" encoding="UTF-8"?>
<kanjivg>
<kanji id="kvg:kanji_04e00">
<g id="kvg:04e00" kvg:element="一">
	<path id="kvg:04e00-s1" kvg:type="㇐" d="M11,54.25c3.19,0.62,6.25,0.75,9.66,0.5c20.34-1.5,50.21-4.87,68.34-5.5c3.42-0.12,6.75,0,10.5,0.5"/>
</g>
</kanji>
<kanji id="kvg:kanji_04e00-Kaisho">
<g id="kvg:04e00-Kaisho" kvg:element="一">
	<path id="kvg:04e00-Kaisho-s1" d="M9,9L99,9"/>
</g>
</kanji>
<kanji id="kvg:kanji_05341">
<g id="kvg:05341" kvg:element="十">
	<path id="kvg:05341-s1" d="M11.75,49.5c1.62,0.38,4.62,0.62,7,0.5c15.5-0.75,50.5-3.25,66.5-3.5c2.75-0.05,5.25,0.12,7.5,0.5"/>
	<path id="kvg:05341-s2" d="M50.25,10.75c1.5,1,2.25,3.25,2.25,5.5c0,15.75,0.25,60.25,0.25,72.5c0,12.25,0.5,15.25-1,3.75"/>
</g>
</kanji>
</kanjivg>`

describe('parseKanjiVgXml', () => {
  it('decodes codepoints, keeps stroke order and skips variant forms', () => {
    const map = parseKanjiVgXml(XML)
    expect([...map.keys()].sort()).toEqual(['一', '十'])
    expect(map.get('一')).toHaveLength(1)
    const ten = map.get('十')!
    expect(ten).toHaveLength(2)
    // Order matters: 十 is the horizontal stroke first, then the vertical.
    expect(ten[0].startsWith('M11.75,49.5')).toBe(true)
    expect(ten[1].startsWith('M50.25,10.75')).toBe(true)
    // The Kaisho variant must not have replaced 一's canonical path.
    expect(map.get('一')![0]).not.toBe('M9,9L99,9')
  })

  it('returns an empty map for junk input', () => {
    expect(parseKanjiVgXml('<html>nope</html>').size).toBe(0)
  })
})

describe('importStrokeXml / getStrokes', () => {
  it('imports and reads back ordered strokes', async () => {
    const summary = await importStrokeXml(XML, 'r-test')
    expect(summary).toEqual({ charCount: 2, revision: 'r-test' })

    const ten = getStrokes('十')
    expect(ten?.character).toBe('十')
    expect(ten?.strokes).toHaveLength(2)
    expect(getStrokeSetInfo()).toMatchObject({ revision: 'r-test', charCount: 2 })
  })

  it('returns null for uncovered characters and when nothing is installed', () => {
    expect(getStrokes('猫')).toBeNull()
    expect(getStrokeSetInfo()).toBeNull()
  })

  it('takes only the first character of a multi-char string', async () => {
    await importStrokeXml(XML)
    expect(getStrokes('十字')?.character).toBe('十')
  })

  it('re-import swaps the set, remove clears it', async () => {
    await importStrokeXml(XML, 'r-old')
    await importStrokeXml(
      `<kanji id="kvg:kanji_04e00"><path d="M1,1L9,9"/></kanji>`,
      'r-new'
    )
    expect(getStrokeSetInfo()).toMatchObject({ revision: 'r-new', charCount: 1 })
    expect(getStrokes('十')).toBeNull() // gone with the old set
    expect((db.prepare('SELECT COUNT(*) AS n FROM stroke').get() as { n: number }).n).toBe(1)

    await removeStrokeSet()
    expect(getStrokeSetInfo()).toBeNull()
    expect((db.prepare('SELECT COUNT(*) AS n FROM stroke').get() as { n: number }).n).toBe(0)
  })

  it('rejects a file with no stroke data', async () => {
    await expect(importStrokeXml('<html>nope</html>')).rejects.toThrow(/no stroke data/i)
  })
})

describe('shared/strokes geometry', () => {
  const ICHI = parseKanjiVgXml(XML).get('一')![0]

  it('pathStart reads the leading moveto', () => {
    expect(pathStart(ICHI)).toEqual({ x: 11, y: 54.25 })
    expect(pathStart('M 10.5 20.5 L 30 40')).toEqual({ x: 10.5, y: 20.5 })
    expect(pathStart('L10,10')).toBeNull()
  })

  it('samplePath walks a cubic path from its start to its end', () => {
    const pts = samplePath(ICHI, 24)
    expect(pts.length).toBeGreaterThan(10)
    expect(pts[0]).toEqual({ x: 11, y: 54.25 })
    // 一 is a near-horizontal stroke: it ends far to the right, barely lower.
    const end = pts[pts.length - 1]
    expect(end.x).toBeGreaterThan(90)
    expect(Math.abs(end.y - 54.25)).toBeLessThan(15)
  })

  it('samplePath handles line and relative commands', () => {
    expect(samplePath('M0,0L10,0', 4)[0]).toEqual({ x: 0, y: 0 })
    const rel = samplePath('m5,5l10,0', 4)
    expect(rel[0]).toEqual({ x: 5, y: 5 })
    expect(rel[rel.length - 1].x).toBeCloseTo(15, 5)
  })

  it('always terminates on malformed paths', () => {
    // A stray coordinate after closepath used to spin the parser forever, which
    // froze the writing drill (strokeVerdict samples on every drawn stroke).
    expect(samplePath('M10,10 L20,20 Z 5').length).toBeGreaterThan(0)
    expect(samplePath('M10,10 Z Z Z').length).toBeGreaterThan(0)
    expect(samplePath('Z 1 2 3')).toEqual([])
    expect(samplePath('garbage')).toEqual([])
    expect(samplePath('')).toEqual([])
  })

  it('polylineLength measures a straight run', () => {
    expect(
      polylineLength([
        { x: 0, y: 0 },
        { x: 3, y: 4 }
      ])
    ).toBeCloseTo(5, 5)
  })
})
