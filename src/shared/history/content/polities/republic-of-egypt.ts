import { definePolity } from '../../schema'

export default definePolity({
  id: 'republic-of-egypt',
  names: [
    { text: 'Republic of Egypt', lang: 'en', role: 'primary' },
    { text: 'جمهورية مصر', lang: 'ar', role: 'native' },
    {
      text: 'United Arab Republic',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt and the Arab World', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1953-06-18' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '10'
            }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:cairo',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt and the Arab World', para: '1' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:kingdom-of-egypt',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'The Revolution and the Early Years of the New Government: 1952-56',
            para: '10'
          }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 651, from: 1953.46 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/82/Stevan_Kragujevic%2C_Gamal_Abdel_Naser_u_Beogradu%2C_1962.jpg/1280px-Stevan_Kragujevic%2C_Gamal_Abdel_Naser_u_Beogradu%2C_1962.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Stevan_Kragujevic,_Gamal_Abdel_Naser_u_Beogradu,_1962.jpg',
    credit: { creator: 'Stevan Kragujević' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On June 18, Egypt was declared a republic, and the monarchy was abolished, ending the rule of Muhammad Ali\'s dynasty. Naguib became the first president and also prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '10'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'On January 17, 1953, all political parties were dissolved and banned. A three-year transition period was proclaimed during which the RCC would rule.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '10'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/32.htm' }
        },
        {
          id: 'q3',
          text: 'A plebiscite was held in both countries in 1958, and Nasser was elected president. Cairo was designated the capital of the United Arab Republic.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt and the Arab World', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/33.htm' }
        }
      ]
    }
  ]
})
