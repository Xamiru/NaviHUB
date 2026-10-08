import { definePolity } from '../../schema'

export default definePolity({
  id: 'republic-of-turkey',
  names: [
    { text: 'Republic of Turkey', lang: 'en', role: 'primary' },
    { text: 'Türkiye Cumhuriyeti', lang: 'tr', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1923-10-29' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:ankara',
      start: {
        alts: [
          {
            value: { d: '1923-10-29' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'Atatürk and the Turkish Nation', para: '17' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 640, from: 1923.83 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/02/Ghazi_Moustapha_Kemal_Pasha_LCCN2014716853_%28cropped%29.jpg/1280px-Ghazi_Moustapha_Kemal_Pasha_LCCN2014716853_%28cropped%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ghazi_Moustapha_Kemal_Pasha_LCCN2014716853_(cropped).jpg',
    credit: { institution: 'Library of Congress', creator: 'Bain News Service' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On October 29, 1923, the Grand National Assembly proclaimed the Republic of Turkey. Atatürk was named its president and Ankara its capital, and the modern state of Turkey was born.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '20' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'The ideological foundation of Atatürk\'s reform program became known as Kemalism. Its main points were enumerated in the "Six Arrows" of Kemalism: republicanism, nationalism, populism, reformism, etatism (statism), and secularism.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '24' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q3',
          text: 'The abolition of the caliphate ended any connection between the state and religion.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '25' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q4',
          text: 'In 1924 the Grand National Assembly adopted a new constitution to replace the 1876 document that had continued to serve as the legal framework of the republican government.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '26' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q5',
          text: 'Throughout his presidency, repeatedly extended by the assembly, Atatürk governed Turkey essentially by personal rule in a one-party state.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Atatürk and the Turkish Nation', para: '27' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/13.htm' }
        },
        {
          id: 'q6',
          text: 'The stability of the new republic was made evident by the smoothness of the presidential succession. The day after Atatürk\'s death, the Grand National Assembly elected his chief lieutenant, Inönü, president.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'Turkey after Atatürk', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/15.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'ataturk-1999-nutuk', perspective: 'turkish' },
    { source: 'bayur-1940-turk-inkilabi-tarihi', perspective: 'turkish' },
    { source: 'harp-tarihi-dairesi-1962-turk-istiklal-harbi', perspective: 'turkish' }
  ]
})
