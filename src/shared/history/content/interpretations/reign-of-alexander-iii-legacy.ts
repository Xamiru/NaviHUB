import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'reign-of-alexander-iii-legacy',
  about: ['person:alexander-iii-of-russia', 'period:reign-of-alexander-iii'],
  topic: 'legacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'retrograde-but-progress',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Donald Mackenzie Wallace' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'As a whole his reign cannot be regarded as one of the eventful periods of Russian history; but it must be admitted that under his hard unsympathetic rule the country made considerable progress.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_III._(tsar)'
          }
        },
        {
          id: 'q2',
          text: 'All the internal reforms which he initiated were intended to correct what he considered as the too liberal tendencies of the previous reign, so that he left behind him the reputation of a sovereign of the retrograde type.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-alexander-iii-tsar',
            loc: { section: 'ALEXANDER III. (tsar)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_III._(tsar)'
          }
        }
      ]
    },
    {
      id: 'reaction-alienated',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Their attacks on liberal and non-Russian elements alienated large segments of the population.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    }
  ]
})
