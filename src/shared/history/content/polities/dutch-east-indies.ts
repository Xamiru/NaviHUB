import { definePolity } from '../../schema'

export default definePolity({
  id: 'dutch-east-indies',
  names: [
    { text: 'Dutch East Indies', lang: 'en', role: 'primary' },
    { text: 'Nederlands-Indië', lang: 'nl', role: 'native' },
    {
      text: 'Netherlands Indies',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'THE NETHERLANDS INDIES EMPIRE' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'colony',
  start: {
    alts: [
      {
        value: { d: '1799' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'VOC Bankruptcy and the British Occupation', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1949-12-27' },
        cites: [
          {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['southeast-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:jakarta',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Indonesia (code 850), capital Jakarta' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 188161 },
    { set: 'world', code: 850, to: 1949.99 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a0/Kaart_van_Indonesi%C3%AB_met_daarop_de_stoombootdiensten_aangegeven%2C_RP-P-2018-1002.jpg/1280px-Kaart_van_Indonesi%C3%AB_met_daarop_de_stoombootdiensten_aangegeven%2C_RP-P-2018-1002.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Kaart_van_Indonesi%C3%AB_met_daarop_de_stoombootdiensten_aangegeven,_RP-P-2018-1002.jpg',
    credit: { institution: 'Rijksmuseum' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Nineteenth-century Indonesia experienced not only the replacement of company rule by Dutch government rule but also the complete transformation of Java into a colonial society and the successful extension of colonial rule to Sumatra and the eastern archipelago.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'THE NETHERLANDS INDIES EMPIRE', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/10.htm' }
        },
        {
          id: 'q2',
          text: 'The modern state of Indonesia is in a real sense a nineteenth-century creation.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'THE NETHERLANDS INDIES EMPIRE', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/10.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The new government abolished the VOC by allowing its charter to lapse in 1799. VOC territories became the property of the Dutch government.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'VOC Bankruptcy and the British Occupation', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/9.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The dismantling of the Cultivation System on Java, Dutch subjugation of Sumatra and the eastern archipelago, and the opening of the Suez Canal in 1869 stimulated the rapid development of a cash-crop, export economy.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'Colonial Economy and Society, 1870-1940', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/13.htm' }
        },
        {
          id: 'q5',
          text: 'The Japanese occupied the archipelago in order, like their Portuguese and Dutch predecessors, to secure its rich natural resources.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The Japanese Occupation, 1942-45', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/15.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Sovereignty was formally transferred on December 27, 1949.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'The National Revolution, 1945-50', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/indonesia/16.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    {
      source: 'kartodirdjo-1987-pengantar-sejarah-indonesia-baru',
      perspective: 'southeast-asian'
    },
    { source: 'stapel-1938-geschiedenis-van-nederlandsch-indie', perspective: 'european' }
  ]
})
