import { beforeEach, describe, expect, it, vi } from 'vitest'
import type Database from 'better-sqlite3'
import { createDictTestDb, createTestDb } from './helpers'
import type { JpConfusableCardRef } from '../src/shared/types'

let db: Database.Database
let dictDb: Database.Database
vi.mock('../src/main/db/connection', () => ({ getSqlite: () => db }))
vi.mock('../src/main/dict/dictDb', () => ({ getDictDb: () => dictDb, closeDictDb: () => {} }))

import { findConfusablePairs, listConfusables } from '../src/main/jpConfusables'
import { importKradData } from '../src/main/dict/krad'
import * as jp from '../src/main/repos/japaneseRepo'

beforeEach(() => {
  db = createTestDb()
  dictDb = createDictTestDb()
})

const card = (id: number, front: string, reading: string | null, lapses = 0): JpConfusableCardRef => ({
  id,
  front,
  reading,
  back: `gloss-${id}`,
  lapses
})

describe('findConfusablePairs (pure)', () => {
  const noComponents = (): string[] => []

  it('pairs exact readings, kana-normalized', () => {
    const a = card(1, '帰る', 'かえる', 4)
    const b = card(2, '変える', 'カエル') // katakana reading still matches
    const pairs = findConfusablePairs([a], [a, b], noComponents)
    expect(pairs).toHaveLength(1)
    expect(pairs[0].reasons).toEqual(['reading'])
    expect(pairs[0].a.id).toBe(1)
  })

  it('pairs shared kanji characters', () => {
    const a = card(1, '出す', 'だす', 3)
    const b = card(2, '出る', 'でる')
    const pairs = findConfusablePairs([a], [a, b], noComponents)
    expect(pairs[0].reasons).toEqual(['kanji'])
  })

  it('pairs component-similar kanji only when no character is shared', () => {
    const components = (k: string): string[] =>
      k === '末' || k === '未' ? ['木', '一'] : []
    const a = card(1, '末', 'すえ', 5)
    const b = card(2, '未来', 'みらい')
    const pairs = findConfusablePairs([a], [a, b], components)
    expect(pairs).toHaveLength(1)
    expect(pairs[0].reasons).toEqual(['components'])
    // Below the Jaccard bar: nothing.
    const weak = (k: string): string[] => (k === '末' ? ['木', '一', '丶', '口'] : k === '未' ? ['木'] : [])
    expect(findConfusablePairs([a], [a, b], weak)).toHaveLength(0)
  })

  it('merges reasons for one pair and never self-pairs or duplicate-fronts', () => {
    const a = card(1, '出る', 'でる', 4)
    const b = card(2, '出る', 'でる') // duplicate front — excluded
    const c = card(3, '出す', 'です') // shared kanji only... give same reading too
    const d = card(4, '出す', 'でる') // shares kanji AND reading
    const pairs = findConfusablePairs([a], [a, b, d], () => [])
    expect(pairs).toHaveLength(1)
    expect(new Set(pairs[0].reasons)).toEqual(new Set(['reading', 'kanji']))
    expect(pairs.some((p) => p.a.front === p.b.front)).toBe(false)
    void c
  })

  it('reading-based pairs outrank component-only pairs', () => {
    const components = (k: string): string[] => (k === '待' || k === '持' ? ['寺', '一'] : [])
    const lapsing = [card(1, '買う', 'かう', 6), card(3, '待つ', 'まつ', 3)]
    const all = [...lapsing, card(2, '飼う', 'かう'), card(4, '持つ', 'もつ')]
    const pairs = findConfusablePairs(lapsing, all, components)
    expect(pairs[0].reasons).toContain('reading')
  })
})

describe('listConfusables (IO)', () => {
  it('applies the lapses gate and uses real krad components', async () => {
    await importKradData(
      [
        { literal: '末', components: ['木', '一'] },
        { literal: '未', components: ['木', '一'] }
      ],
      [
        { component: '木', strokeCount: 4 },
        { component: '一', strokeCount: 1 }
      ]
    )
    const courseId = jp.createCourse({ title: 'C', description: null, level: null, difficulty: null })
    const lessonId = jp.createLesson({ courseId, kind: 'vocab', title: 'L', body: null })
    const a = jp.createCard(lessonId, { front: '末', reading: 'すえ', back: 'end' })
    jp.createCard(lessonId, { front: '未だ', reading: 'まだ', back: 'not yet' })
    // Below the gate → nothing.
    expect(listConfusables()).toEqual([])
    db.prepare('UPDATE jp_card SET lapses = 4 WHERE id = ?').run(a)
    const pairs = listConfusables()
    expect(pairs).toHaveLength(1)
    expect(pairs[0].reasons).toEqual(['components'])
  })
})
