import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'mexican-oil-expropriation',
  names: [
    { text: 'Mexican oil expropriation', lang: 'en', role: 'primary' },
    { text: 'Expropiación petrolera', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'nationalization',
  start: {
    alts: [
      {
        value: { d: '1938-03-18' },
        cites: [
          {
            source: 'state-dept-milestones-mexican-oil',
            loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '1' }
          },
          {
            source: 'state-dept-milestones-mexican-oil',
            loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    { ref: 'place:mexico-city' }
  ],
  polities: [
    { ref: 'polity:mexico' }
  ],
  participants: [
    {
      ref: 'person:lazaro-cardenas',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-mexican-oil',
          loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '1' }
        },
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '5' }
        }
      ]
    },
    {
      name: 'Cordell Hull',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-mexican-oil',
          loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '9' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Prior to expropriation in 1938, the oil industry in Mexico had been dominated by the Mexican Eagle Company (a subsidiary of the Royal Dutch/Shell Company), which accounted for over 60% of Mexican oil production, and by American-owned oil firms including Jersey Standard and Standard Oil Company of California (SOCAL – now Chevron), which accounted for approximately 30% of total production. However, in Article 27 of the Constitution of 1917, the Mexican Government asserted ownership of the “subsoil,” including any natural resources discovered below ground.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mexican-oil',
            loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1937-1945/mexican-oil'
          }
        },
        {
          id: 'q2',
          text: 'Nevertheless, the foreign-owned oil companies were the object of much popular resentment.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mexican-oil',
            loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/mexican-oil'
          }
        },
        {
          id: 'q3',
          text: 'A strike by oil workers in 1937 ultimately led the Mexican Government to act.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mexican-oil',
            loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/mexican-oil'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'On March 18, 1938, Mexican President Lázaro Cárdenas signed an order that expropriated the assets of nearly all of the foreign oil companies operating in Mexico. He later created Petróleos Mexicanos (PEMEX), a state-owned firm that held a monopoly over the Mexican oil industry, and barred all foreign oil companies from operating in Mexico.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mexican-oil',
            loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/mexican-oil'
          }
        },
        {
          id: 'q5',
          text: 'Cárdenas\'s boldest act was his expropriation in March 1938 of all foreign oil operations on Mexican territory.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/34.htm' }
        },
        {
          id: 'q6',
          text: 'The expropriation, which Cárdenas considered a natural outcome of the constitutional claim to national ownership of all subsoil resources, temporarily disrupted commerce between Mexico and the United States.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/34.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The foreign-owned oil companies retaliated by instituting an embargo against Mexican oil. Mexican oil exports decreased by 50% and the Mexican Government’s primary customer for oil became Nazi Germany.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mexican-oil',
            loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/mexican-oil'
          }
        },
        {
          id: 'q8',
          text: 'Nationalization, however, won Cárdenas widespread praise both within Mexico and throughout Latin America, where nationalist sentiment against foreign commercial interests ran high.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/34.htm' }
        },
        {
          id: 'q9',
          text: 'Although it was a significant political victory for Cárdenas, the oil expropriation cost Mexico dearly in terms of capital flight and foreign investment.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/34.htm' }
        },
        {
          id: 'q10',
          text: 'Secretary of State Cordell Hull initially supported a strong stance against Cárdenas’ actions.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mexican-oil',
            loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1937-1945/mexican-oil'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1942-04-18' },
            cites: [
              {
                source: 'state-dept-milestones-mexican-oil',
                loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Finally, on April 18, 1942, the U.S. and Mexican Governments signed the Cooke-Zevada agreement, whereby the Mexicans agreed to pay roughly $29 million in compensation to several American firms, including Jersey Standard and Socal.',
        lang: 'en',
        cite: {
          source: 'state-dept-milestones-mexican-oil',
          loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://history.state.gov/milestones/1937-1945/mexican-oil'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/L%C3%A1zaro_C%C3%A1rdenas%2C_Retrato.png',
    page: 'https://commons.wikimedia.org/wiki/File:L%C3%A1zaro_C%C3%A1rdenas,_Retrato.png',
    credit: { institution: 'Secretaría de Cultura (México), Mexicana' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  furtherReading: [
    { source: 'silva-herzog-1988-historia-de-la-expropiacion', perspective: 'latin-american' },
    {
      source: 'meyer-1972-mexico-y-los-estados-unidos-en-el-conflicto-petrolero',
      perspective: 'latin-american'
    }
  ]
})
