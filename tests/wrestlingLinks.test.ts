import { describe, it, expect } from 'vitest'
import { parseInline } from '@shared/markdown'
import { extractWikiTitles } from '@shared/wikiLinks'

// The wiki's link contract, end to end through the REAL markdown parser: the
// importer emits [label](wiki:Target), parseInline already understands that
// shape (so shared/markdown.ts needed no change), and extractWikiTitles pulls
// the targets back out for batch resolution.
describe('wiki links', () => {
  const prose =
    'The 1997 [Starrcade](wiki:Starrcade) was held in [Washington, D.C.](wiki:Washington,_D.C.) ' +
    'and headlined by [Sting](wiki:Sting_%28wrestler%29).'

  it('round-trips through the app markdown parser', () => {
    const links = parseInline(prose).filter((s) => s.type === 'link')
    expect(links.map((l) => (l.type === 'link' ? l.href : ''))).toEqual([
      'wiki:Starrcade',
      'wiki:Washington,_D.C.',
      'wiki:Sting_%28wrestler%29'
    ])
  })

  it('extracts targets deduped and sorted, so the query key is stable', () => {
    // Sorted: the same prose in any order must produce one cache entry.
    // Decoded on the way out, so what reaches resolveLinks matches the stored
    // article title once underscores become spaces.
    expect(extractWikiTitles(prose)).toEqual([
      'Starrcade',
      'Sting_(wrestler)',
      'Washington,_D.C.'
    ])
    expect(extractWikiTitles('[a](wiki:X) [b](wiki:X)')).toEqual(['X'])
    expect(extractWikiTitles(null)).toEqual([])
    // http links are not wiki targets and must not be resolved locally.
    expect(extractWikiTitles('[site](https://example.com)')).toEqual([])
  })

  it('a target with a space would break — underscores are load-bearing', () => {
    // parseInline's href class is [^)\s]+, so a raw space ends the link early
    // and the text silently degrades. This pins WHY the importer underscores.
    const bad = parseInline('[Sting](wiki:Sting wrestler)').filter((s) => s.type === 'link')
    expect(bad).toHaveLength(0)
  })
})
