import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-opec',
  names: [
    { text: 'Founding of OPEC', lang: 'en', role: 'primary' },
    { text: 'تأسیس اوپک', lang: 'fa', role: 'native' },
    {
      text: 'Organization of the Petroleum Exporting Countries',
      lang: 'en',
      role: 'alternative'
    }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1960-09' },
        cites: [
          {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'Post-World War II Through the 1970s', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena', 'latin-america', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:baghdad',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'Post-World War II Through the 1970s', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' },
    { ref: 'polity:saudi-arabia' },
    { ref: 'polity:republic-of-iraq' }
  ],
  participants: [
    {
      name: 'Juan Pablo Pérez Alfonso',
      role: 'organizer',
      cites: [
        {
          source: 'loc-venezuela-country-study-1990',
          loc: { section: 'The Triumph of Democracy', para: '10' }
        }
      ]
    },
    {
      name: 'Foʾād Ruḥāni',
      role: 'participant',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1960' }
        }
      ]
    },
    {
      name: 'Iran',
      role: 'participant',
      cites: [
        {
          source: 'loc-venezuela-country-study-1990',
          loc: { section: 'The Triumph of Democracy', para: '10' }
        }
      ]
    },
    {
      name: 'Iraq',
      role: 'participant',
      cites: [
        {
          source: 'loc-venezuela-country-study-1990',
          loc: { section: 'The Triumph of Democracy', para: '10' }
        }
      ]
    },
    {
      name: 'Kuwait',
      role: 'participant',
      cites: [
        {
          source: 'loc-venezuela-country-study-1990',
          loc: { section: 'The Triumph of Democracy', para: '10' }
        }
      ]
    },
    {
      name: 'Saudi Arabia',
      role: 'participant',
      cites: [
        {
          source: 'loc-venezuela-country-study-1990',
          loc: { section: 'The Triumph of Democracy', para: '10' }
        }
      ]
    },
    {
      name: 'Venezuela',
      role: 'participant',
      cites: [
        {
          source: 'loc-venezuela-country-study-1990',
          loc: { section: 'The Triumph of Democracy', para: '10' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:nationalization-of-the-iranian-oil-industry',
      rel: 'related',
      cites: [
        {
          source: 'loc-iraq-country-study-1988',
          loc: { section: 'Post-World War II Through the 1970s', para: '5' }
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
          text: 'During 1960 two institutions were founded that made important contributions toward the development of a national petroleum policy: the Venezuelan Petroleum Corporation (Corporación Venezolana de Petróleos--CVP), conceived to oversee the national petroleum industry, and the Organization of the Petroleum Exporting Countries (OPEC), the international oil cartel that Venezuela established in partnership with Kuwait, Saudi Arabia, Iraq, and Iran.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Triumph of Democracy', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/venezuela/7.htm' }
        },
        {
          id: 'q2',
          text: '1960 Inauguration of The Organization of Petroleum Exporting Countries (OPEC) with Iran as a founding member; Iran’s Foʾād Ruḥāni serves as OPEC’s first Secretary-General from 1960 to 1964.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1960' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1959 and in 1960, surpluses led the international oil companies to reduce the posted price for Middle Eastern oil unilaterally, which reduced government revenues significantly.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'Post-World War II Through the 1970s', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/54.htm' }
        },
        {
          id: 'q4',
          text: 'Iran\'s experience when it nationalized its oil industry was a vivid reminder to the Iraqis of the power the oil companies still wielded.',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'Post-World War II Through the 1970s', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/54.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Perhaps in response to the general situation, Iraq convened a meeting in Baghdad of the major oil-producing nations, which resulted in the September 1960 formation of the Organization of Petroleum Exporting Countries (OPEC).',
          lang: 'en',
          cite: {
            source: 'loc-iraq-country-study-1988',
            loc: { section: 'Post-World War II Through the 1970s', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iraq/54.htm' }
        },
        {
          id: 'q6',
          text: 'Both organizations were the creations of Juan Pablo Pérez Alfonso, who, for the second time, served as Betancourt\'s minister of energy.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Triumph of Democracy', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/venezuela/7.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: '1973 In what is known as the “OPEC oil crisis,” Arab members of OPEC boycott oil exports to Western countries that had supported Israel during the Arab-Israeli War; the price of oil quadruples with Iranian oil revenues increasing to over $20 billion.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1973' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ]
})
