import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-greece',
  names: [
    { text: 'Kingdom of Greece', lang: 'en', role: 'primary' },
    { text: 'Βασίλειον τῆς Ἑλλάδος', lang: 'el', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1832-05-07' },
        cites: [
          { source: 'britannica-1911-greece', loc: { section: 'GREECE', para: '863' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:nafplio',
      end: {
        alts: [
          {
            value: { d: '1835' },
            cites: [
              {
                source: 'cshapes-2-dataset',
                loc: { section: 'Greece (code 350), 1829–1835, capital Nauplion' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Greece (code 350), 1829–1835, capital Nauplion' }
        }
      ]
    },
    {
      ref: 'place:athens',
      start: {
        alts: [
          {
            value: { d: '1835' },
            cites: [
              {
                source: 'cshapes-2-dataset',
                loc: { section: 'Greece (code 350), 1835–1865, capital Athens' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Greece (code 350), 1835–1865, capital Athens' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'europe', code: 350, from: 1832.35, to: 1886 },
    { set: 'world', code: 350, to: 1924.23 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Von_Hess.-_The_Entry_of_King_Othon_of_Greece_into_Nauplia.jpg/1280px-Von_Hess.-_The_Entry_of_King_Othon_of_Greece_into_Nauplia.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Von_Hess.-_The_Entry_of_King_Othon_of_Greece_into_Nauplia.jpg',
    credit: { institution: 'Neue Pinakothek', creator: 'Peter von Hess' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Greece is a constitutional monarchy; hereditary in the male line, or, in case of its extinction, in the female. The sovereign, by decision of the conference of London (August 1863), is styled “king of the Hellenes”; the title “king of Greece” was borne by King Otho.',
          lang: 'en',
          cite: { source: 'britannica-1911-greece', loc: { section: 'GREECE', para: '162' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Greece'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'By the convention of London (May 7, 1832) Greece was declared an independent kingdom under the protection of Great Britain, France and Russia with Prince Otto, son of King Louis I. of Bavaria, as king.',
          lang: 'en',
          cite: { source: 'britannica-1911-greece', loc: { section: 'GREECE', para: '863' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Greece'
          }
        },
        {
          id: 'q3',
          text: 'In an earlier episode in April 1833, Great Britain, France, and Russia sent the United States an invitation to acknowledge Prince Otho (or Otto) of Bavaria as King of Greece.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-greece',
            loc: { section: 'Greece: Summary', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://history.state.gov/countries/greece' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'On the 29th of October 1863 the new sovereign arrived in Athens, and in the following June the British authorities handed over the Ionian Islands to a Greek commissioner.',
          lang: 'en',
          cite: { source: 'britannica-1911-greece', loc: { section: 'GREECE', para: '864' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Greece'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'svoronos-1953-histoire-de-la-grece-moderne', perspective: 'european' }
  ]
})
