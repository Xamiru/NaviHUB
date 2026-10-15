import { describe, expect, it } from 'vitest'
import {
  FRANCHISE_WIKIS,
  categoryStems,
  importanceFrom,
  parseCharacter,
  parseVoices,
  wikiFor
} from '../src/main/wikiCastCore'

const yakuza = FRANCHISE_WIKIS.find((w) => w.key === 'yakuza')!

describe('which wiki covers a game', () => {
  it('recognises the franchise by English or Japanese title', () => {
    expect(wikiFor(['Yakuza 2'])?.key).toBe('yakuza')
    expect(wikiFor(['Like a Dragon: Infinite Wealth'])?.key).toBe('yakuza')
    expect(wikiFor(['Some Title', '龍が如く3'])?.key).toBe('yakuza')
    expect(wikiFor(['Persona 5 Royal', 'ペルソナ5 ザ・ロイヤル'])).toBeNull()
  })

  it('tries the title, then without an edition, then without a subtitle', () => {
    expect(categoryStems(['Yakuza 6: The Song of Life', '龍が如く6 命の詩。'])).toEqual([
      'Yakuza 6: The Song of Life',
      'Yakuza 6'
    ])
    expect(categoryStems(['Yakuza 3 Remastered'])).toEqual(['Yakuza 3 Remastered', 'Yakuza 3'])
    expect(categoryStems(["Yakuza 0: Director's Cut"])).toEqual(["Yakuza 0: Director's Cut", 'Yakuza 0'])
  })
})

describe('voice credits', () => {
  it('reads linked, labelled and plain names and keeps notes like (child)', () => {
    const raw = '*{{WP|Takaya Kuroda}}\n*{{WP|Kenji Nojima}} (child)\n*[[w:c:jpop:Uehara Ai|Ai Uehara]]\n*Satoshi Tokushige'
    expect(parseVoices(raw, 'Yakuza 2', yakuza)).toEqual([
      { name: 'Takaya Kuroda', enwiki: 'Takaya Kuroda' },
      { name: 'Kenji Nojima', enwiki: 'Kenji Nojima' },
      { name: 'Ai Uehara', enwiki: null },
      { name: 'Satoshi Tokushige', enwiki: null }
    ])
  })

  it('drops English dub credits and credits for other games only', () => {
    const raw =
      '*{{WP|Hidenari Ugaki}}\n*{{WP|Mark Hamill}} (English, Yakuza)\n*Yu Ayase (Yakuza 3, Yakuza Kiwami 3)\n*Aya Hisakawa (Yakuza Kiwami 2)'
    expect(parseVoices(raw, 'Yakuza Kiwami 2', yakuza).map((v) => v.name)).toEqual(['Aya Hisakawa'])
    expect(parseVoices(raw, 'Yakuza 3', yakuza).map((v) => v.name)).toEqual(['Yu Ayase'])
    // No note names this game: the un-noted credit is its cast; the dub never is.
    expect(parseVoices(raw, 'Yakuza 0', yakuza).map((v) => v.name)).toEqual(['Hidenari Ugaki'])
  })

  it('gives un-noted credits to the games no note names', () => {
    const raw = ' * Yu Daiki (Yakuza 2, Yakuza 3)\n* {{WP|Aya Hisakawa}}\n'
    expect(parseVoices(raw, 'Yakuza 2', yakuza).map((v) => v.name)).toEqual(['Yu Daiki'])
    expect(parseVoices(raw, 'Yakuza Kiwami 2', yakuza).map((v) => v.name)).toEqual(['Aya Hisakawa'])
    // Whole game names: the first game is not "in" a note naming Yakuza 2.
    expect(parseVoices(raw, 'Yakuza', yakuza).map((v) => v.name)).toEqual(['Aya Hisakawa'])
  })

  it('matches a note naming the game by its full title', () => {
    const raw = '*Kiyoshi Kobayashi (Yakuza 6: The Song of Life)\n*Someone Else'
    expect(parseVoices(raw, 'Yakuza 6', yakuza).map((v) => v.name)).toEqual(['Kiyoshi Kobayashi'])
  })

  it('reads a single unlisted value', () => {
    expect(parseVoices(' {{WP|Masami Iwasaki}}', 'Yakuza 2', yakuza)).toEqual([
      { name: 'Masami Iwasaki', enwiki: 'Masami Iwasaki' }
    ])
  })
})

describe('character pages', () => {
  const wikitext = `{{Character Infobox
| jp = 郷田 龍司
| rom = Gōda Ryūji
| img = <gallery>
YK2 - Ryuji.png|YK2
</gallery>
| voiced_by = {{WP|Masami Iwasaki}}
| appears_in = * [[Yakuza 0]]
}}
'''Ryuji Goda''' is a character.`

  it('takes the Japanese name, voices, image and rank', () => {
    const c = parseCharacter(
      {
        title: 'Ryuji Goda (Yakuza 2)',
        wikitext,
        categories: ['Category:Yakuza 2 Characters', 'Category:Yakuza 2 Antagonists'],
        imageUrl: 'https://static.wikia.nocookie.net/yakuza/images/0/07/Ryuji.png'
      },
      'Yakuza 2',
      yakuza
    )
    expect(c).toEqual({
      page: 'Ryuji Goda (Yakuza 2)',
      name: 'Ryuji Goda',
      native: '郷田 龍司',
      voices: [{ name: 'Masami Iwasaki', enwiki: 'Masami Iwasaki' }],
      imageUrl: 'https://static.wikia.nocookie.net/yakuza/images/0/07/Ryuji.png',
      importance: 1
    })
  })

  it('skips pages that are not characters and ranks substory people last', () => {
    expect(parseCharacter({ title: 'Kamurocho', wikitext: '{{Location Infobox}}', categories: [], imageUrl: null }, 'Yakuza 2', yakuza)).toBeNull()
    expect(importanceFrom(['Category:Yakuza 2 Substory Characters'], 'Yakuza 2')).toBe(3)
    expect(importanceFrom([], 'Yakuza 2')).toBe(2)
  })
})
