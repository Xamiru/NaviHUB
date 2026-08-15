import { describe, expect, it } from 'vitest'
import { matchLibrary, normalizeGameTitle } from '../src/shared/franchises/match'
import type { FranchiseEntry } from '../src/shared/franchises/types'
import type { MediaItem } from '../src/shared/types'

// The library<->canon matcher. Exact normalized equality only — the rules
// here are what keeps "Final Fantasy VII" from lighting up the "Final
// Fantasy VII Remake" row and vice versa.

let nextId = 1
const item = (over: Partial<MediaItem>): MediaItem =>
  ({
    id: nextId++,
    mediaType: 'game',
    title: 'Untitled',
    titleOriginal: null,
    externalSource: null,
    externalId: null,
    metadata: null,
    ...over
  }) as MediaItem

const entry = (over: Partial<FranchiseEntry> & { id: string; title: string }): FranchiseEntry => ({
  year: 2000,
  bgUrl: 'https://example.test/bg.jpg',
  ...over
})

describe('normalizeGameTitle', () => {
  it('is case, punctuation, trademark and diacritic insensitive', () => {
    expect(normalizeGameTitle('YAKUZA: 0™')).toBe('yakuza 0')
    expect(normalizeGameTitle('Pokémon')).toBe('pokemon')
    expect(normalizeGameTitle("Link's  Awakening!")).toBe('link s awakening')
    expect(normalizeGameTitle('Metal Gear Solid Δ: Snake Eater')).toBe(
      normalizeGameTitle('METAL GEAR SOLID Δ SNAKE EATER')
    )
  })

  it('keeps distinct titles distinct', () => {
    expect(normalizeGameTitle('Final Fantasy VII')).not.toBe(
      normalizeGameTitle('Final Fantasy VII Remake')
    )
  })
})

describe('matchLibrary', () => {
  it('matches by external id first, regardless of title', () => {
    const e = entry({
      id: 'a',
      title: 'Some Canonical Name',
      externalIds: [{ source: 'steam', id: '638970' }]
    })
    const it1 = item({ title: 'Totally Different', externalSource: 'steam', externalId: '638970' })
    const m = matchLibrary([e], [it1])
    expect(m.get('a')).toBe(it1)
  })

  it('tries each external ref in order (legacy + relisted appids)', () => {
    const e = entry({
      id: 'a',
      title: 'X',
      externalIds: [
        { source: 'steam', id: 'new' },
        { source: 'steam', id: 'old' }
      ]
    })
    const legacy = item({ title: 'Y', externalSource: 'steam', externalId: 'old' })
    expect(matchLibrary([e], [legacy]).get('a')).toBe(legacy)
  })

  it('matches by normalized title and aliases, not substrings', () => {
    const orig = entry({ id: 'ff7', title: 'Final Fantasy VII' })
    const remake = entry({
      id: 'ff7r',
      title: 'Final Fantasy VII Remake',
      aliases: ['Final Fantasy VII Remake Intergrade']
    })
    const owned = item({ title: 'FINAL FANTASY VII REMAKE INTERGRADE' })
    const m = matchLibrary([orig, remake], [owned])
    expect(m.get('ff7r')).toBe(owned)
    expect(m.has('ff7')).toBe(false)
  })

  it('checks titleOriginal too', () => {
    const e = entry({ id: 'a', title: 'Yakuza 0' })
    const jp = item({ title: 'Ryu ga Gotoku 0', titleOriginal: 'Yakuza 0' })
    expect(matchLibrary([e], [jp]).get('a')).toBe(jp)
  })

  it('never assigns one library row to two entries', () => {
    const a = entry({ id: 'a', title: 'Resident Evil (2002)', aliases: ['Resident Evil'] })
    const b = entry({ id: 'b', title: 'Resident Evil (1996)', aliases: ['Resident Evil'] })
    const owned = item({ title: 'Resident Evil' })
    const m = matchLibrary([a, b], [owned])
    expect(m.get('a')).toBe(owned)
    expect(m.has('b')).toBe(false)
  })

  it('external-id claims exclude a row from later title matching', () => {
    const strong = entry({
      id: 'strong',
      title: 'Nope',
      externalIds: [{ source: 'steam', id: '1' }]
    })
    const weak = entry({ id: 'weak', title: 'Shared Name' })
    const row = item({ title: 'Shared Name', externalSource: 'steam', externalId: '1' })
    const m = matchLibrary([strong, weak], [row])
    expect(m.get('strong')).toBe(row)
    expect(m.has('weak')).toBe(false)
  })

  it('is deterministic on duplicate library rows (lowest id wins)', () => {
    const e = entry({ id: 'a', title: 'Dup' })
    const first = item({ title: 'Dup' })
    const second = item({ title: 'Dup' })
    expect(matchLibrary([e], [first, second]).get('a')).toBe(first)
  })
})
