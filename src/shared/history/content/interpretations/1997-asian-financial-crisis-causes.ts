import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: '1997-asian-financial-crisis-causes',
  about: ['event:1997-asian-financial-crisis'],
  topic: 'causes',
  framing: {
    id: 'q1',
    text: 'Since the crisis began, economists have searched for answers as to what triggered the crisis in Asia and its spread to other emerging markets around the world.',
    lang: 'en',
    cite: {
      source: 'neely-1999-paper-tigers-how-the-asian-economies-lost-their-bite',
      loc: { section: 'Paper Tigers? How the Asian Economies Lost Their Bite', para: '21' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-10',
      url: 'https://web.archive.org/web/2021/https://www.stlouisfed.org/publications/regional-economist/january-1999/paper-tigers-how-the-asian-economies-lost-their-bite'
    }
  },
  positions: [
    {
      id: 'krugman-financial-excess',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Paul Krugman', discipline: 'economist' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'What all of this suggests is that the Asian crisis is best seen not as a problem brought on by fiscal deficits, as in "first-generation" models, nor as one brought on by macroeconomic temptation, as in "second-generation" models, but as one brought on by financial excess and then financial collapse.',
          lang: 'en',
          cite: {
            source: 'krugman-1998-what-happened-to-asia',
            loc: { section: 'What Happened to Asia?', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://web.mit.edu/krugman/www/DISINTER.html' }
        },
        {
          id: 'q3',
          text: 'The problem began with financial intermediaries - institutions whose liabilities were perceived as having an implicit government guarantee, but were essentially unregulated and therefore subject to severe moral hazard problems.',
          lang: 'en',
          cite: {
            source: 'krugman-1998-what-happened-to-asia',
            loc: { section: 'What Happened to Asia?', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'http://web.mit.edu/krugman/www/DISINTER.html' }
        }
      ]
    },
    {
      id: 'radelet-sachs-financial-panic',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Steven Radelet', discipline: 'economist' },
        { kind: 'scholar', name: 'Jeffrey Sachs', discipline: 'economist' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The main goal is to emphasize the role of financial panic as an essential element of the Asian crisis.',
          lang: 'en',
          cite: {
            source: 'radelet-sachs-1998-the-onset-of-the-east-asian-financial-crisis',
            loc: { section: 'The Onset of the East Asian Financial Crisis', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nber.org/papers/w6680' }
        },
        {
          id: 'q5',
          text: 'At the core of the crisis were large-scale foreign capital inflows into financial systems that became vulnerable to panic.',
          lang: 'en',
          cite: {
            source: 'radelet-sachs-1998-the-onset-of-the-east-asian-financial-crisis',
            loc: { section: 'The Onset of the East Asian Financial Crisis', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-10', url: 'https://www.nber.org/papers/w6680' }
        }
      ]
    }
  ],
  researched: '2026-10-10'
})
