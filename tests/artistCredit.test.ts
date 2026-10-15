import { describe, expect, it } from 'vitest'
import { artistKey, linkArtistCredit } from '../src/shared/artistCredit'

const library = new Map(
  ['Daft Punk', 'Pharrell Williams', 'Simon & Garfunkel', 'AC/DC', 'Beyoncé', 'Nile Rodgers'].map(
    (name, i) => [artistKey(name), i + 1]
  )
)
const link = (credit: string) => linkArtistCredit(credit, (key) => library.get(key))

describe('linkArtistCredit', () => {
  it('links each library artist and keeps the separators as text', () => {
    expect(link('Daft Punk feat. Pharrell Williams & Nile Rodgers')).toEqual([
      { text: 'Daft Punk', artistId: 1 },
      { text: ' feat. ', artistId: null },
      { text: 'Pharrell Williams', artistId: 2 },
      { text: ' & ', artistId: null },
      { text: 'Nile Rodgers', artistId: 6 }
    ])
  })

  it('keeps a name containing a separator whole', () => {
    expect(link('Simon & Garfunkel, AC/DC')).toEqual([
      { text: 'Simon & Garfunkel', artistId: 3 },
      { text: ', ', artistId: null },
      { text: 'AC/DC', artistId: 4 }
    ])
  })

  it('leaves unknown names as plain text and folds case and accents', () => {
    expect(link('beyonce, Someone Else')).toEqual([
      { text: 'beyonce', artistId: 5 },
      { text: ', Someone Else', artistId: null }
    ])
  })

  it('returns no links when nothing matches', () => {
    expect(link('Nobody & Noone').every((p) => p.artistId == null)).toBe(true)
    expect(link('Nobody & Noone').map((p) => p.text).join('')).toBe('Nobody & Noone')
  })
})
