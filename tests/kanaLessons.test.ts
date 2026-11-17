import { describe, expect, it } from 'vitest'
import { KANA_SCRIPT_GROUPS, KANA_UNITS } from '../src/shared/japanese/kanaLessons'
import { SECTIONS } from '../src/shared/kanaRows'
import { acceptedRomaji } from '../src/shared/romaji'

const rows = SECTIONS.flatMap((s) => s.rows)
const rowByKey = new Map(rows.map((r) => [r.key, r]))
const basicRowKeys = new Set(
  SECTIONS.filter((s) => s.title === 'Hiragana' || s.title === 'Katakana')
    .flatMap((s) => s.rows)
    .filter((r) => !['ga', 'za', 'da', 'ba', 'pa'].includes(r.key.replace(/^k-/, '')))
    .map((r) => r.key)
)

describe('kana lessons', () => {
  it('has unique unit keys and only known scripts', () => {
    const keys = KANA_UNITS.map((u) => u.key)
    expect(new Set(keys).size).toBe(keys.length)
    const scripts = new Set(KANA_SCRIPT_GROUPS.map((g) => g.script))
    for (const u of KANA_UNITS) expect(scripts.has(u.script)).toBe(true)
  })

  it('assigns every drill row to exactly one unit, with matching keys', () => {
    const owners = new Map<string, string[]>()
    for (const u of KANA_UNITS) {
      for (const key of u.rows) {
        expect(rowByKey.has(key), `${u.key} names unknown row ${key}`).toBe(true)
        owners.set(key, [...(owners.get(key) ?? []), u.key])
      }
    }
    for (const r of rows) expect(owners.get(r.key), r.key).toHaveLength(1)
    // A basic-row unit is keyed by its row.
    for (const key of basicRowKeys) {
      const unit = KANA_UNITS.find((u) => u.key === key)
      expect(unit?.rows, key).toEqual([key])
    }
  })

  it('shows every kana of a drill row in exactly one unit, and only those', () => {
    const shown = new Map<string, number>()
    for (const u of KANA_UNITS) for (const ch of u.chars) shown.set(ch.kana, (shown.get(ch.kana) ?? 0) + 1)
    for (const r of rows) for (const kana of r.kana) expect(shown.get(kana), kana).toBe(1)
    for (const u of KANA_UNITS) {
      if (u.rows.length === 0) continue
      const expected = u.rows.flatMap((k) => rowByKey.get(k)!.kana)
      expect(u.chars.map((ch) => ch.kana), u.key).toEqual(expected)
    }
  })

  it('teaches the romaji the drill accepts, with a shape hook on every basic row', () => {
    for (const u of KANA_UNITS) {
      for (const ch of u.chars) {
        if (u.rows.length > 0) expect(acceptedRomaji(ch.kana), ch.kana).toContain(ch.romaji)
        if (basicRowKeys.has(u.key)) expect(ch.hook, ch.kana).toBeTruthy()
      }
    }
  })

  it('gives each unit practice words that use only kana already taught', () => {
    const taught = new Set<string>()
    for (const u of KANA_UNITS) {
      for (const ch of u.chars) for (const part of ch.kana) taught.add(part)
      expect(u.words.length, u.key).toBeGreaterThanOrEqual(6)
      expect(u.words.length, u.key).toBeLessThanOrEqual(8)
      for (const wd of u.words) {
        expect(wd.meaning, wd.word).toBeTruthy()
        expect(wd.romaji, wd.word).toBeTruthy()
        for (const part of wd.word) {
          expect(taught.has(part), `${u.key}: ${wd.word} uses ${part} before it is taught`).toBe(true)
        }
      }
      const words = u.words.map((wd) => wd.word)
      expect(new Set(words).size, u.key).toBe(words.length)
    }
  })

  it('has look-alike sets of at least two', () => {
    for (const u of KANA_UNITS) {
      expect(u.lookAlikes.length, u.key).toBeGreaterThan(0)
      for (const l of u.lookAlikes) {
        expect(l.kana.length).toBeGreaterThanOrEqual(2)
        expect(l.tell).toBeTruthy()
      }
    }
  })

  it('contains no pictographic glyphs', () => {
    const text = JSON.stringify(KANA_UNITS)
    expect(text).not.toMatch(/\p{Extended_Pictographic}/u)
    expect(text).not.toMatch(/[☀-➿️]/u)
  })
})
