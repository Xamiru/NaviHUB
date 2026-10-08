import { definePolity } from '../../schema'

export default definePolity({
  id: 'sokoto-caliphate',
  names: [
    { text: 'Sokoto Caliphate', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  polityType: 'caliphate',
  start: {
    alts: [
      {
        value: { d: '1809' },
        cites: [
          {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '3' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1903' },
        cites: [
          {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Frederick Lugard', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:sokoto',
      start: {
        alts: [
          {
            value: { d: '1809' },
            cites: [
              {
                source: 'loc-nigeria-country-study-1991',
                loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-nigeria-country-study-1991',
          loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '1' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/83/The_States_of_the_Nigerian_Region_in_the_19th_Century.png/1280px-The_States_of_the_Nigerian_Region_in_the_19th_Century.png',
    page: 'https://commons.wikimedia.org/wiki/File:The_States_of_the_Nigerian_Region_in_the_19th_Century.png',
    credit: { institution: 'United States government' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The new state that arose during Usman dan Fodio\'s jihad came to be known as the Sokoto Caliphate, named after his capital at Sokoto, founded in 1809. The caliphate was a loose confederation of emirates that recognized the suzerainty of the commander of the faithful, the sultan.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nigeria/9.htm' }
        },
        {
          id: 'q2',
          text: 'Usman dan Fodio\'s jihad created the largest empire in Africa since the fall of Songhai in 1591.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Usman dan Fodio and the Sokoto Caliphate', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/nigeria/9.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'Borno capitulated without a fight, but in 1903 Lugard\'s RWAFF mounted assaults on Kano and Sokoto.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Frederick Lugard', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/nigeria/17.htm' }
        },
        {
          id: 'q4',
          text: 'The emirs retained their caliphate titles but were responsible to British district officers, who had final authority.',
          lang: 'en',
          cite: {
            source: 'loc-nigeria-country-study-1991',
            loc: { section: 'Frederick Lugard', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/nigeria/17.htm' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 600524 }
  ],
  furtherReading: [
    { source: 'sulaiman-1986-a-revolution-in-history', perspective: 'african' },
    { source: 'adeleye-1971-power-and-diplomacy-in-northern-nigeria', perspective: 'african' }
  ]
})
