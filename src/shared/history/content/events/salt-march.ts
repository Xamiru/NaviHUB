import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'salt-march',
  names: [
    { text: 'Salt March', lang: 'en', role: 'primary' },
    { text: 'Dandi March', lang: 'en', role: 'alternative' },
    { text: 'Salt Satyagraha', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-06',
  type: 'protest',
  start: {
    alts: [
      {
        value: { d: '1930-03-12' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1930-04-06' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:ahmedabad',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '6' }
        }
      ]
    },
    {
      ref: 'place:dandi',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:british-raj' }
  ],
  participants: [
    {
      ref: 'person:mahatma-gandhi',
      role: 'leader',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Mahatma Gandhi', para: '6' }
        }
      ]
    },
    {
      name: 'Edward Lord Irwin',
      role: 'negotiator',
      cites: [
        { source: 'lemo-chronik-1931', loc: { section: 'Chronik 1931', para: '39' } },
        { source: 'lemo-chronik-1931', loc: { section: 'Chronik 1931', para: '46' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'In 1929 the Congress responded by drafting its own constitution under the guidance of Motilal Nehru (Jawaharlal\'s father) demanding full independence (purna swaraj ) by 1930; the Congress went so far as to observe January 26, 1930, as the first anniversary of the first year of independence.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Gandhi reemerged from his long seclusion by undertaking his most inspired campaign, a march of about 400 kilometers from his commune in Ahmadabad to Dandi, on the coast of Gujarat between March 12 and April 6, 1930.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        },
        {
          id: 'q3',
          text: 'At Dandi, in protest against extortionate British taxes on salt, he and thousands of followers illegally but symbolically made their own salt from sea water.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Their defiance reflected India\'s determination to be free, despite the imprisonment of thousands of protesters.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        },
        {
          id: 'q5',
          text: 'For the next five years, the Congress and government were locked in conflict and negotiations until what became the Government of India Act of 1935 could be hammered out.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Mahatma Gandhi', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/20.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1930-04-18' },
            cites: [
              { source: 'lemo-chronik-1930', loc: { section: 'Chronik 1930', para: '81' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'In Indien kommt es zu schweren Auseinandersetzungen zwischen den Anhängern des Führers der indischen Freiheitsbewegung "Mahatma" Gandhi (1869-1948) und den britischen Kolonialbehörden.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1930', loc: { section: 'Chronik 1930', para: '82' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1930.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1930-05-05' },
            cites: [
              { source: 'lemo-chronik-1930', loc: { section: 'Chronik 1930', para: '90' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Gandhi wird wegen "Gehorsamsverweigerung" von der britischen Kolonialregierung verhaftet.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1930', loc: { section: 'Chronik 1930', para: '92' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1930.html'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1931-03-04' },
            cites: [
              { source: 'lemo-chronik-1931', loc: { section: 'Chronik 1931', para: '46' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Gandhi und Irwin vereinbaren die Einstellung der Kampagne des bürgerlichen Ungehorsams gegen die britische Kolonialmacht.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1931', loc: { section: 'Chronik 1931', para: '47' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1931.html'
        }
      }
    }
  ]
})
