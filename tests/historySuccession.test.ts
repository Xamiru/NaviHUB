import { describe, expect, it } from 'vitest'
import { axisTicks, officeKey, successionLayout, type SuccessionRuler } from '../src/shared/history/succession'

const cite = [{ source: 's', loc: { page: '1' } }]
const at = (...ds: string[]) => ({ alts: ds.map((d) => ({ value: { d }, cites: cite })) })

function ruler(person: string, start: string | null, end: string | null, title = 'Shah'): SuccessionRuler {
  return { person, title, start: start ? at(start) : null, end: end ? at(end) : null }
}

describe('successionLayout', () => {
  it('lays reigns end to end in one row', () => {
    const l = successionLayout([ruler('a', '1501', '1524'), ruler('b', '1524', '1576')], { s: 1501, e: 1736 }, 2026)!
    expect(l.rows).toEqual([{ title: 'Shah', lanes: 1 }])
    expect(l.bars.map((b) => [b.person, b.lane, b.s, b.e])).toEqual([
      ['a', 0, 1501, 1524],
      ['b', 0, 1524, 1577]
    ])
    expect(l.from).toBe(1501)
    expect(l.to).toBe(1577)
  })

  it('reaches the state edges only when they are near', () => {
    const near = successionLayout([ruler('a', '1501', '1524'), ruler('b', '1524', '1576')], { s: 1490, e: 1590 }, 2026)!
    expect([near.from, near.to]).toEqual([1490, 1590])
    const far = successionLayout([ruler('a', '1801', '1810'), ruler('b', '1810', '1820')], { s: 1299, e: 1922 }, 2026)!
    expect([far.from, far.to]).toEqual([1801, 1821])
  })

  it('groups by office however it is styled, and stacks overlapping holders', () => {
    const l = successionLayout(
      [
        ruler('a', '1501-01-01', '1520-01-01', 'Shah of Iran'),
        ruler('m', '1505', '1510', 'Minister of the Interior'),
        ruler('n', '1505', '1510', 'Minister of Finance'),
        ruler('b', '1510-01-01', '1530-01-01', 'shah of Iran'),
        ruler('c', '1530-01-01', '1540-01-01', 'Shah of Iran'),
        ruler('v', '1505', '1515', 'Grand vizier'),
        ruler('w', '1515', '1520', 'grand vizier (sadr-e aʿẓam)'),
        ruler('x', '1505', '1515', 'Governor of Herat')
      ],
      null,
      2026,
      ['Safavid Iran']
    )!
    expect(l.rows).toEqual([
      { title: 'Shah of Iran', lanes: 2 },
      { title: 'Grand vizier', lanes: 1 }
    ])
    expect(l.bars.find((b) => b.person === 'b')).toMatchObject({ row: 0, lane: 1 })
    expect(l.bars.find((b) => b.person === 'w')).toMatchObject({ row: 1, lane: 0 })
    // An office only one person held is left to the list.
    expect(l.bars.some((b) => b.person === 'x')).toBe(false)
  })

  it('draws nothing when no office changed hands', () => {
    expect(successionLayout([ruler('a', '1501', '1524', 'Shah'), ruler('v', '1505', '1515', 'Grand vizier')], null, 2026)).toBeNull()
  })

  it('runs an open end to the next holder, then to the state end or today', () => {
    const l = successionLayout([ruler('a', '1501-01-01', null), ruler('b', '1524-01-01', null)], { s: 1501, e: null }, 2026)!
    const [a, b] = l.bars
    expect(a.e).toBeCloseTo(1524)
    expect(a.openEnd).toBe(true)
    expect(b.e).toBe(2026)
    expect(l.to).toBe(2026)
  })

  it('leaves out holders with no start, and needs two bars', () => {
    expect(successionLayout([ruler('a', '1501', '1524'), ruler('b', null, '1576')], null, 2026)).toBeNull()
  })

  it('marks a disputed or approximate edge as soft', () => {
    const disputed: SuccessionRuler = { person: 'a', title: 'Shah', start: at('1501', '1502'), end: at('1524') }
    const approx: SuccessionRuler = { person: 'b', title: 'Shah', start: at('1524'), end: { alts: [{ value: { d: '1576', approx: true }, cites: cite }] } }
    const l = successionLayout([disputed, approx], null, 2026)!
    expect(l.bars[0].softStart).toEqual({ from: 1501, to: 1502 })
    expect(l.bars[0].softEnd).toBeNull()
    expect(l.bars[1].softEnd).toEqual({ from: 1576.5, to: 1577.5 })
    expect(l.to).toBe(1577.5)
  })
})

describe('officeKey', () => {
  it('folds case, glosses and the state named after "of"', () => {
    const uk = ['United Kingdom of Great Britain and Northern Ireland', 'United Kingdom']
    expect(officeKey('Prime Minister of the United Kingdom', uk)).toBe('prime minister')
    expect(officeKey('Prime Minister', uk)).toBe('prime minister')
    expect(officeKey('crown prince (Nāyeb-al-salṭana)')).toBe('crown prince')
    expect(officeKey('Emperor of All Russia', ['Russian Empire'])).toBe('emperor')
    expect(officeKey('Shah of Iran', ['Safavid Iran'])).toBe('shah')
  })

  it('keeps offices whose "of" names a portfolio or a province apart', () => {
    const iran = ['Pahlavi Iran', 'Imperial State of Iran']
    expect(officeKey('Minister of the Interior', iran)).not.toBe(officeKey('minister of finance', iran))
    expect(officeKey('governor of Azarbaijan', iran)).toBe('governor of azarbaijan')
  })
})

describe('axisTicks', () => {
  it('picks round steps', () => {
    expect(axisTicks(1501, 1736)).toEqual([1550, 1600, 1650, 1700])
    expect(axisTicks(1979, 2026)).toEqual([1980, 1990, 2000, 2010, 2020])
    expect(axisTicks(-550, -330)).toEqual([-550, -500, -450, -400, -350])
  })
})
