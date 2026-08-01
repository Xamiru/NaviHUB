import { describe, expect, it } from 'vitest'
import {
  COUNTERS,
  generateExercise,
  readCounter,
  readDate,
  readNumber,
  readPrice,
  readTime
} from '../src/shared/numbers'

describe('readNumber', () => {
  it('reads single digits with the standalone variants', () => {
    expect(readNumber(1)).toEqual(['いち'])
    expect(readNumber(4)).toEqual(['よん', 'し'])
    expect(readNumber(7)).toEqual(['なな', 'しち'])
    expect(readNumber(9)).toEqual(['きゅう', 'く'])
  })

  it('does not accept し/く in compounds', () => {
    expect(readNumber(24)).toContain('にじゅうよん')
    expect(readNumber(24)).not.toContain('にじゅうし')
    expect(readNumber(19)).toEqual(['じゅうきゅう'])
  })

  it('accepts しちじゅう in the tens place', () => {
    expect(readNumber(70)).toEqual(['ななじゅう', 'しちじゅう'])
    expect(readNumber(77)).toContain('ななじゅうなな')
    expect(readNumber(77)).toContain('しちじゅうなな')
  })

  it('applies the hundreds euphonics', () => {
    expect(readNumber(100)).toEqual(['ひゃく'])
    expect(readNumber(300)).toEqual(['さんびゃく'])
    expect(readNumber(600)).toEqual(['ろっぴゃく'])
    expect(readNumber(800)).toEqual(['はっぴゃく'])
    expect(readNumber(400)).toEqual(['よんひゃく'])
  })

  it('applies the thousands euphonics', () => {
    expect(readNumber(1000)).toEqual(['せん'])
    expect(readNumber(3000)).toEqual(['さんぜん'])
    expect(readNumber(8000)).toEqual(['はっせん'])
  })

  it('reads 10,000 as いちまん', () => {
    expect(readNumber(10000)).toEqual(['いちまん'])
    expect(readNumber(40000)).toEqual(['よんまん'])
  })

  it('composes full five-digit numbers', () => {
    expect(readNumber(99999)).toContain('きゅうまんきゅうせんきゅうひゃくきゅうじゅうきゅう')
    expect(readNumber(3600)).toEqual(['さんぜんろっぴゃく'])
    expect(readNumber(11111)).toEqual(['いちまんせんひゃくじゅういち'])
  })

  it('rejects out-of-range input', () => {
    expect(readNumber(0)).toEqual([])
    expect(readNumber(100000)).toEqual([])
    expect(readNumber(1.5)).toEqual([])
  })
})

describe('readCounter', () => {
  it('handles 本 euphonics', () => {
    expect(readCounter(1, '本')).toEqual(['いっぽん'])
    expect(readCounter(2, '本')).toEqual(['にほん'])
    expect(readCounter(3, '本')).toEqual(['さんぼん'])
    expect(readCounter(6, '本')).toEqual(['ろっぽん'])
    expect(readCounter(8, '本')).toEqual(['はっぽん', 'はちほん'])
    expect(readCounter(10, '本')).toEqual(['じゅっぽん', 'じっぽん'])
  })

  it('handles 匹 / 杯 / 回 / 個 / 冊', () => {
    expect(readCounter(3, '匹')).toEqual(['さんびき'])
    expect(readCounter(1, '杯')).toEqual(['いっぱい'])
    expect(readCounter(6, '回')).toEqual(['ろっかい'])
    expect(readCounter(8, '個')).toEqual(['はっこ'])
    expect(readCounter(8, '冊')).toEqual(['はっさつ', 'はちさつ'])
  })

  it('handles 人 with the native 1/2 and よにん', () => {
    expect(readCounter(1, '人')).toEqual(['ひとり'])
    expect(readCounter(2, '人')).toEqual(['ふたり'])
    expect(readCounter(4, '人')).toEqual(['よにん'])
    expect(readCounter(7, '人')).toEqual(['しちにん', 'ななにん'])
  })

  it('handles 枚 as fully regular', () => {
    expect(readCounter(1, '枚')).toEqual(['いちまい'])
    expect(readCounter(10, '枚')).toEqual(['じゅうまい'])
  })

  it('handles つ native numerals', () => {
    expect(readCounter(1, 'つ')).toEqual(['ひとつ'])
    expect(readCounter(3, 'つ')).toEqual(['みっつ'])
    expect(readCounter(8, 'つ')).toEqual(['やっつ'])
    expect(readCounter(10, 'つ')).toEqual(['とお'])
  })

  it('handles 歳 including はたち', () => {
    expect(readCounter(1, '歳')).toEqual(['いっさい'])
    expect(readCounter(20, '歳')).toEqual(['はたち', 'にじゅっさい', 'にじっさい'])
  })

  it('rejects unknown counters and out-of-range counts', () => {
    expect(readCounter(11, '本')).toEqual([])
    expect(readCounter(3, '台')).toEqual([])
  })

  it('has 10 non-empty rows for every counter', () => {
    for (const def of COUNTERS) {
      for (let n = 1; n <= 10; n++) {
        expect(readCounter(n, def.counter).length, `${n}${def.counter}`).toBeGreaterThan(0)
      }
    }
  })
})

describe('readTime', () => {
  it('handles the irregular hours', () => {
    expect(readTime(4, 0)).toEqual(['よじ'])
    expect(readTime(7, 0)).toEqual(['しちじ', 'ななじ'])
    expect(readTime(9, 0)).toEqual(['くじ'])
  })

  it('handles minute euphonics', () => {
    expect(readTime(3, 1)).toEqual(['さんじいっぷん'])
    expect(readTime(3, 4)).toEqual(['さんじよんぷん'])
    expect(readTime(3, 5)).toEqual(['さんじごふん'])
    expect(readTime(3, 6)).toEqual(['さんじろっぷん'])
    expect(readTime(3, 8)).toContain('さんじはっぷん')
    expect(readTime(3, 10)).toEqual(['さんじじゅっぷん', 'さんじじっぷん'])
  })

  it('composes compound minutes', () => {
    expect(readTime(1, 15)).toEqual(['いちじじゅうごふん'])
    expect(readTime(1, 30)).toContain('いちじはん')
    expect(readTime(1, 30)).toContain('いちじさんじゅっぷん')
    expect(readTime(1, 45)).toEqual(['いちじよんじゅうごふん'])
  })

  it('rejects invalid hours', () => {
    expect(readTime(13, 0)).toEqual([])
    expect(readTime(0, 0)).toEqual([])
  })
})

describe('readDate', () => {
  it('handles the irregular months', () => {
    expect(readDate(4, 15)).toEqual(['しがつじゅうごにち'])
    expect(readDate(7, 15)[0]).toBe('しちがつじゅうごにち')
    expect(readDate(9, 15)).toEqual(['くがつじゅうごにち'])
  })

  it('handles the native days 1-10', () => {
    expect(readDate(1, 1)).toEqual(['いちがつついたち'])
    expect(readDate(1, 2)).toEqual(['いちがつふつか'])
    expect(readDate(1, 8)).toEqual(['いちがつようか'])
    expect(readDate(1, 10)).toEqual(['いちがつとおか'])
  })

  it('handles 14 / 20 / 24', () => {
    expect(readDate(2, 14)).toEqual(['にがつじゅうよっか'])
    expect(readDate(2, 20)).toEqual(['にがつはつか'])
    expect(readDate(2, 24)).toEqual(['にがつにじゅうよっか'])
  })

  it('reads regular days with にち', () => {
    expect(readDate(3, 11)).toEqual(['さんがつじゅういちにち'])
    expect(readDate(3, 31)).toEqual(['さんがつさんじゅういちにち'])
  })
})

describe('readPrice', () => {
  it('reads plain prices', () => {
    expect(readPrice(3600)).toEqual(['さんぜんろっぴゃくえん'])
    expect(readPrice(100)).toEqual(['ひゃくえん'])
  })

  it('reads a trailing 4 as よえん (accepting よんえん)', () => {
    expect(readPrice(4)).toEqual(['よえん', 'よんえん'])
    expect(readPrice(14)[0]).toBe('じゅうよえん')
    expect(readPrice(14)).toContain('じゅうよんえん')
  })
})

describe('generateExercise', () => {
  // Deterministic rng cycling through fixed values.
  const rngOf = (vals: number[]) => {
    let i = 0
    return () => vals[i++ % vals.length]
  }

  it('respects the enabled category set', () => {
    for (let seed = 0; seed < 20; seed++) {
      const ex = generateExercise(['counters'], rngOf([seed / 20, 0.3, 0.7]))
      expect(ex?.category).toBe('counters')
    }
  })

  it('always produces at least one answer', () => {
    const cats = ['numbers', 'time', 'date', 'price', 'counters'] as const
    for (let seed = 0; seed < 200; seed++) {
      const rng = rngOf([(seed % 40) / 40, ((seed * 7) % 23) / 23, ((seed * 13) % 31) / 31])
      const ex = generateExercise([...cats], rng)
      expect(ex).not.toBeNull()
      expect(ex!.answers.length, `${ex!.category} ${ex!.prompt}`).toBeGreaterThan(0)
      expect(ex!.prompt.length).toBeGreaterThan(0)
    }
  })

  it('half-hour prompts accept only はん readings', () => {
    // Force the time category and m=30 (second pick index 1 → the literal 30).
    const ex = generateExercise(['time'], rngOf([0, 0.4, 0.2]))
    expect(ex?.category).toBe('time')
    if (ex && ex.prompt.endsWith('半')) {
      expect(ex.answers.every((a) => a.endsWith('はん'))).toBe(true)
    }
  })
})
