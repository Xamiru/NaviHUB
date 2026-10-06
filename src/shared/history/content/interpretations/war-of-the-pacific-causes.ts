import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'war-of-the-pacific-causes',
  about: ['event:war-of-the-pacific'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'nitrates-and-preeminence',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Library of Congress, Federal Research Division (Chile: A Country Study)'
        }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Chile wanted not only to acquire the nitrate fields but also to weaken Peru and Bolivia in order to strengthen its own strategic preeminence on the Pacific Coast.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'War of the Pacific, 1879-83', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/15.htm' }
        },
        {
          id: 'q2',
          text: 'But Bolivia soon repudiated the treaty, and its subsequent levying of taxes on a Chilean company operating in the area led to an arms race between Chile and its northern neighbors of Bolivia and Peru.',
          lang: 'en',
          cite: {
            source: 'loc-chile-country-study-1994',
            loc: { section: 'War of the Pacific, 1879-83', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/chile/15.htm' }
        }
      ]
    },
    {
      id: 'bolivian-breach',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Library of Congress, Federal Research Division (Peru: A Country Study)'
        }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Neither Peru, nor its ally, Bolivia, in the regional balance of power against Chile, had been able to solidify its territorial claims in the desert, which left the rising power of Chile to assert its designs over the region.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'WAR WITH CHILE', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/14.htm' }
        },
        {
          id: 'q4',
          text: 'Chile chose to attack Bolivia after Bolivia broke the Treaty of 1866 between the two countries by raising taxes on the export of nitrates from the region, mainly controlled by Chilean companies.',
          lang: 'en',
          cite: {
            source: 'loc-peru-country-study-1992',
            loc: { section: 'WAR WITH CHILE', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/peru/14.htm' }
        }
      ]
    },
    {
      id: 'tax-dispute',
      category: 'scholarly',
      holders: [
        {
          kind: 'organization',
          name: 'Library of Congress, Federal Research Division (Bolivia: A Country Study)'
        }
      ],
      statements: [
        {
          id: 'q5',
          text: 'In 1874 Chile agreed to fix the border at 24° south latitude in return for Bolivia\'s promise not to increase taxes on Chilean nitrate enterprises for twenty-five years.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: { section: 'War of the Pacific', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/11.htm' }
        },
        {
          id: 'q6',
          text: 'But in 1878, Daza imposed a slight increase on export taxes.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: { section: 'War of the Pacific', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/11.htm' }
        }
      ]
    }
  ]
})
