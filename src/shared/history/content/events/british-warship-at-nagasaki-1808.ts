import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'british-warship-at-nagasaki-1808',
  names: [
    { text: 'British warship at Nagasaki (1808)', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1808' },
        cites: [
          {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 3,
  places: [
    { ref: 'place:nagasaki' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Western intrusions were on the increase in the early nineteenth century. Russian warships and traders encroached on Karafuto (called Sakhalin under Russian and Soviet control) and on the Kuril Islands, the southernmost of which are considered by the Japanese as the northern islands of Hokkaido.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'A British warship entered Nagasaki Harbor searching for enemy Dutch ships in 1808, and other warships and whalers were seen in Japanese waters with increasing frequency in the 1810s and 1820s.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        },
        {
          id: 'q3',
          text: 'Although the Japanese made some minor concessions and allowed some landings, they largely attempted to keep all foreigners out, sometimes using force.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'Decline of the Tokugawa', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/21.htm' }
        }
      ]
    }
  ]
})
