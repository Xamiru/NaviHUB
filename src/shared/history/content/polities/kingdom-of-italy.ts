import { definePolity } from '../../schema'

export default definePolity({
  id: 'kingdom-of-italy',
  names: [
    { text: 'Kingdom of Italy', lang: 'en', role: 'primary' },
    { text: 'Regno d’Italia', lang: 'it', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1861' },
        cites: [
          {
            source: 'state-dept-countries-italy',
            loc: {
              section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
            }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1946' },
        cites: [
          {
            source: 'state-dept-countries-italy',
            loc: {
              section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
            }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:turin',
      end: {
        alts: [
          {
            value: { d: '1865' },
            cites: [
              { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1571' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1571' } }
      ]
    },
    {
      ref: 'place:florence',
      start: {
        alts: [
          {
            value: { d: '1865' },
            cites: [
              { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1571' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1871' },
            cites: [
              { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1592' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1571' } }
      ]
    },
    {
      ref: 'place:rome',
      start: {
        alts: [
          {
            value: { d: '1871' },
            cites: [
              { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1592' } }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1592' } }
      ]
    }
  ],
  cshapes: [
    { set: 'europe', code: 325, to: 1886 },
    { set: 'world', code: 325, to: 1946.42 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Ritratto_di_Vittorio_Emanuele_II.png',
    page: 'https://commons.wikimedia.org/wiki/File:Ritratto_di_Vittorio_Emanuele_II.png',
    credit: { institution: 'Storia e Memoria di Bologna', creator: 'Carlo Arienti' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The formation of the modern Italian state began in 1861 with the unification of most of the peninsula under the House of Savoy (Piedmont-Sardinia) into the Kingdom of Italy.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-italy',
            loc: {
              section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://history.state.gov/countries/italy' }
        },
        {
          id: 'q2',
          text: 'Italy incorporated Venetia and the former Papal States (including Rome) by 1871 following the Franco-Prussian War (1870-71).',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-italy',
            loc: {
              section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://history.state.gov/countries/italy' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In spite of pressure from the French government, which desired Italy to maintain Florence as the political and to regard Rome merely as the moral capital of the realm, the government offices and both legislative chambers were transferred in 1871 to the Eternal City.',
          lang: 'en',
          cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1592' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'With the exception of the World War II years when Benito Mussolini’s government declared war upon the United States (1941-43), the United States has had warm relations with the Kingdom of Italy and, after 1946, its successor, the Republic of Italy.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-italy',
            loc: {
              section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://history.state.gov/countries/italy' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'candeloro-1966-storia-dellitalia-moderna', perspective: 'european' },
    { source: 'romeo-1970-risorgimento-e-capitalismo', perspective: 'european' }
  ]
})
