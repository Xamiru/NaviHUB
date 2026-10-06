import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'massacre-of-the-mamluks-1811',
  names: [
    { text: 'Massacre of the Mamluks', lang: 'en', role: 'primary' },
    { text: 'Citadel massacre', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'massacre',
  start: {
    alts: [
      {
        value: { d: '1811-03' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    { ref: 'place:cairo' }
  ],
  participants: [
    {
      ref: 'person:muhammad-ali-of-egypt',
      role: 'perpetrator',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Muhammad Ali, 1805-48', para: '4' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 64 },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Muhammad Ali, 1805-48', para: '4' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The Ottoman government was determined to prevent a revival of Mamluk power and autonomy and to bring Egypt under the control of the central government.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        },
        {
          id: 'q2',
          text: 'Between 1805 and 1811, Muhammad Ali consolidated his position in Egypt by defeating the Mamluks and bringing Upper Egypt under his control.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Finally, in March 1811, Muhammad Ali had sixty-four Mamluks, including twenty-four beys, assassinated in the citadel.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        },
        {
          id: 'q4',
          text: 'From then on, Muhammad Ali was the sole ruler of Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d1/Massacre_of_the_Mamelukes_at_Cairo.png/1280px-Massacre_of_the_Mamelukes_at_Cairo.png',
    page: 'https://commons.wikimedia.org/wiki/File:Massacre_of_the_Mamelukes_at_Cairo.png',
    credit: { creator: 'Horace Vernet' },
    license: { id: 'public-domain' }
  }
})
