import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'mexican-war-of-independence',
  names: [
    { text: 'Mexican War of Independence', lang: 'en', role: 'primary' },
    { text: 'Guerra de Independencia de México', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1810-09-16' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '2' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1821' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:dolores',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Hidalgo and Morelos', para: '1' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:kingdom-of-spain' }
  ],
  participants: [
    {
      ref: 'person:miguel-hidalgo',
      role: 'leader',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Hidalgo and Morelos', para: '2' }
        }
      ]
    },
    {
      ref: 'person:jose-maria-morelos',
      role: 'leader',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Hidalgo and Morelos', para: '4' }
        }
      ]
    },
    {
      name: 'Vicente Guerrero',
      role: 'leader',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Hidalgo and Morelos', para: '5' }
        }
      ]
    },
    {
      name: 'Guadalupe Victoria',
      role: 'leader',
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Hidalgo and Morelos', para: '5' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The eleven-year period of civil war that marked the Mexican wars of independence was largely a byproduct of the crisis and breakdown of Spanish royal political authority throughout the American colonies.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Wars of Independence, 1810-21', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/11.htm' }
        },
        {
          id: 'q2',
          text: 'The independence movement was born out of these informal discussions and was directed against Spanish domination of political and economic life in New Spain.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
        },
        {
          id: 'q3',
          text: 'Pressed by this new development, on September 16, 1810, Hidalgo decided to strike out for independence without delay (this date is celebrated as Mexico\'s independence day). The church bells summoned the people, and Hidalgo asked them to join him against the Spanish government and the peninsulares in the famous Grito de Dolores (Cry of Dolores): "Long live Our Lady of Guadalupe! Death to bad government! Death to the gachupines !"',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'From 1815 to 1821, most of the fighting by those seeking independence from Spain was done by isolated guerrilla bands.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
        },
        {
          id: 'q5',
          text: 'After ten years of civil war and the death of two of its founders, by early 1820 the independence movement was stalemated and close to collapse.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Hidalgo and Morelos', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1810-10-30' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Hidalgo and Morelos', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'On October 30, 1810, they encountered resistance at Monte de las Cruces and, despite a rebel victory, lost momentum and did not take Mexico City.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Hidalgo and Morelos', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1813-06' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Hidalgo and Morelos', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In June 1813, Morelos convoked a national congress of representatives from all of the provinces, which met at Chilpancingo in the present-day state of Guerrero to discuss the future of Mexico as an independent nation.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Hidalgo and Morelos', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1815' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Hidalgo and Morelos', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In 1815 Morelos was captured and met the same fate as Hidalgo.',
        lang: 'en',
        cite: {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Hidalgo and Morelos', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/12.htm' }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/General%C3%ADsimo_Miguel_Hidalgo_y_Costilla.png/1280px-General%C3%ADsimo_Miguel_Hidalgo_y_Costilla.png',
    page: 'https://commons.wikimedia.org/wiki/File:General%C3%ADsimo_Miguel_Hidalgo_y_Costilla.png',
    credit: {
      institution: 'Instituto Nacional de Antropología e Historia',
      creator: 'Joaquín Ramírez'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'alaman-1968-historia-de-mejico', perspective: 'latin-american' },
    { source: 'villoro-1967-el-proceso-ideologico', perspective: 'latin-american' }
  ]
})
