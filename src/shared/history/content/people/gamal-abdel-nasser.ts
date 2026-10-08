import { definePerson } from '../../schema'

export default definePerson({
  id: 'gamal-abdel-nasser',
  names: [
    { text: 'Gamal Abdel Nasser', lang: 'en', role: 'primary' },
    { text: 'جمال عبد الناصر', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1918-01-15' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '5'
            }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1970' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Nasser\'s Legacy', para: '4' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:alexandria',
    cites: [
      {
        source: 'loc-egypt-country-study-1990',
        loc: {
          section: 'The Revolution and the Early Years of the New Government: 1952-56',
          para: '5'
        }
      }
    ]
  },
  regions: ['mena'],
  roles: ['head-of-state', 'military'],
  offices: [
    {
      title: 'president of the United Arab Republic',
      polity: 'polity:republic-of-egypt',
      start: {
        alts: [
          {
            value: { d: '1958' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'Egypt and the Arab World', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Egypt and the Arab World', para: '1' }
        }
      ]
    }
  ],
  portrait: {
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
          text: 'It was under Nasser that Egypt finally succeeded in ridding itself of the last vestiges of British imperialism',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Nasser\'s Legacy', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/39.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Nasser himself came from a rural notable family. His father was from a small village in Upper Egypt and worked as a postal clerk. In 1915 the senior Nasser moved to Alexandria, where on January 15, 1918, his first son, Gamal, was born.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/32.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Although Naguib headed the RCC and Mahir the civilian government, Nasser was the real power behind the RCC. The years between 1952 and 1954 witnessed a struggle for control of the government that Nasser ultimately won.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'The Revolution and the Early Years of the New Government: 1952-56',
              para: '7'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/32.htm' }
        },
        {
          id: 'q4',
          text: 'Nāṣer opposed the Pact because he perceived it as a threat to his foreign policy objectives and as a tool geared to serve Western political and economic interests.',
          lang: 'en',
          cite: {
            source: 'iranica-kechichian-baghdad-pact',
            loc: { section: 'BAGHDAD PACT', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/baghdad-pact/'
          }
        },
        {
          id: 'q5',
          text: 'The Suez Crisis, which had resulted in military mobilization by Great Britain, France, and Israel—as well as United Nations action—against Egypt, had encouraged pan-Arab sentiment in the Middle East, and elevated the popularity and influence of Egyptian President Gamal Abdel Nasser.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-eisenhower-doctrine',
            loc: { section: 'The Eisenhower Doctrine, 1957', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1953-1960/eisenhower-doctrine'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q6',
          text: 'When news of Nasser\'s death was announced, Egyptians took to the streets by the tens of thousands to express shock and grief at the death of their leader.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Nasser\'s Legacy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/39.htm' }
        }
      ]
    }
  ]
})
