import { describe, expect, it } from 'vitest'
import fixture from './fixtures/gamebanana.json'
import {
  downloadUrl,
  htmlToParagraphs,
  isGameBananaHost,
  isSafeProfile,
  isSafeRow,
  parseGames,
  parseModDetail,
  parseModPage,
  safeImageUrl,
  sortParam
} from '../src/main/gamebananaCore'

// Parsers over real apiv11 responses (trimmed, 2026-10-16), plus synthetic
// adult-flagged rows built from them. The adult filter is a hard invariant.

describe('adult content never passes', () => {
  it('keeps only openly shown rows without content ratings', () => {
    const page = parseModPage(fixture.modIndex, 1)
    expect(page.mods.map((m) => m.name)).toEqual(['Linkle Mod', 'TP Definitive Edition+ 2.1 Texture Pack'])
    for (const name of ['Rated mod', 'Hidden mod', 'Show but rated', 'No rating flag']) {
      expect(page.mods.some((m) => m.name === name)).toBe(false)
    }
  })

  it('checks a row and a profile on their own flags', () => {
    expect(isSafeRow({ _sInitialVisibility: 'show', _bHasContentRatings: false })).toBe(true)
    expect(isSafeRow({ _sInitialVisibility: 'show' })).toBe(false)
    expect(isSafeRow({ _sInitialVisibility: 'warn', _bHasContentRatings: false })).toBe(false)
    expect(isSafeProfile(fixture.profile)).toBe(true)
    expect(isSafeProfile({ ...fixture.profile, _aContentRatings: { st: 'Sexual Themes' } })).toBe(false)
    expect(isSafeProfile({ ...fixture.profile, _sInitialVisibility: 'hide' })).toBe(false)
    expect(isSafeProfile({ ...fixture.profile, _bHasContentRatings: true })).toBe(false)
    expect(isSafeProfile({ ...fixture.profile, _bIsWithheld: true })).toBe(false)
    expect(isSafeProfile(null)).toBe(false)
  })

  it('returns nothing for a rated mod page', () => {
    expect(parseModDetail({ ...fixture.profile, _sInitialVisibility: 'warn' })).toBeNull()
  })
})

describe('parsers', () => {
  it('reads the list with previews from GameBanana’s image host', () => {
    const page = parseModPage(fixture.modIndex, 1)
    expect(page).toMatchObject({ page: 1, gameName: 'The Legend of Zelda: Twilight Princess', complete: false })
    const linkle = page.mods[0]
    expect(linkle).toMatchObject({ id: 660882, submitter: 'Ditrey', category: 'Skins', version: 'Version 2', obsolete: false })
    expect(linkle.thumbUrl).toBe('https://images.gamebanana.com/img/ss/mods/530-90_69b8854234554.jpg')
    expect(linkle.images[0]).toBe('https://images.gamebanana.com/img/ss/mods/69b8854234554.jpg')
  })

  it('reads a mod’s files, checksums and virus scan result', () => {
    const mod = parseModDetail(fixture.profile)!
    expect(mod.files[0]).toMatchObject({
      id: 1822074,
      name: 'tpde_21_-_part_1_main.7z',
      size: 1314848426,
      md5: '0554a9a66f0afcbb67f406bede7e40ad',
      avClean: true,
      version: '2.1'
    })
    expect(mod.profileUrl).toBe('https://gamebanana.com/mods/714018')
    expect(mod.license).toContain('Creative Commons')
  })

  it('turns mod HTML into plain paragraphs with no markup or script', () => {
    const mod = parseModDetail(fixture.profile)!
    expect(mod.body.length).toBeGreaterThan(1)
    expect(mod.body.join('\n')).not.toMatch(/<|alert\(1\)|onerror/)
    expect(htmlToParagraphs('A<br>B &amp; C<ul><li>one</li></ul><style>x{}</style>')).toEqual(['A', 'B & C', '- one'])
    expect(htmlToParagraphs(null)).toEqual([])
  })

  it('reads game search results', () => {
    expect(
      parseGames({ _aRecords: [{ _idRow: 6167, _sName: 'Twilight Princess', _sIconUrl: 'https://evil.example/x.png' }, { _sName: 'no id' }] })
    ).toEqual([{ id: 6167, name: 'Twilight Princess', iconUrl: null }])
    expect(parseGames('nonsense')).toEqual([])
  })

  it('never throws on malformed input', () => {
    expect(parseModPage(null, 2)).toMatchObject({ mods: [], page: 2 })
    expect(parseModDetail({ _sInitialVisibility: 'show', _bHasContentRatings: false })).toBeNull()
  })
})

describe('urls', () => {
  it('accepts images and downloads only from GameBanana hosts', () => {
    expect(safeImageUrl('http://images.gamebanana.com/a.jpg')).toBeNull()
    expect(safeImageUrl('https://images.gamebanana.com.evil.io/a.jpg')).toBeNull()
    expect(downloadUrl(519330)).toBe('https://gamebanana.com/dl/519330')
    expect(isGameBananaHost('https://filecache36.gamebanana.com/mods/x.zip')).toBe(true)
    expect(isGameBananaHost('https://gamebanana.com.evil.io/x.zip')).toBe(false)
    expect(isGameBananaHost('http://files.gamebanana.com/x.zip')).toBe(false)
  })

  it('maps sorts to the API’s names', () => {
    expect(sortParam('downloads')).toBe('Generic_MostDownloaded')
    expect(sortParam('newest')).toBe('Generic_Newest')
    expect(sortParam('likes')).toBe('Generic_MostLiked')
  })
})
