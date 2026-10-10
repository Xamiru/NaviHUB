import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'united-states-invasion-of-grenada',
  names: [
    { text: 'United States invasion of Grenada', lang: 'en', role: 'primary' },
    {
      text: 'Rescue mission',
      lang: 'en',
      role: 'contested',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada: Relations with the United States', para: '5' }
        }
      ],
      usedBy: [
        { kind: 'public', name: 'Most Grenadians' }
      ]
    }
  ],
  researched: '2026-10-10',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1983-10-25' },
        cites: [
          {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada', para: '9' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:grenada',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada', para: '9' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  polities: [
    { ref: 'polity:united-states' }
  ],
  sides: [
    {
      key: 'us-caribbean',
      name: 'United States and Caribbean forces',
      polity: 'polity:united-states',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada', para: '9' }
        }
      ]
    },
    {
      key: 'rmc',
      name: 'Revolutionary Military Council',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada: Government and Politics', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:ronald-reagan',
      role: 'head-of-state',
      side: 'us-caribbean',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada', para: '9' }
        }
      ]
    },
    {
      name: 'Maurice Bishop',
      role: 'victim',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada', para: '8' }
        }
      ]
    },
    {
      name: 'Bernard Coard',
      role: 'leader',
      side: 'rmc',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada: Government and Politics', para: '3' }
        }
      ]
    },
    {
      name: 'Hudson Austin',
      role: 'commander',
      side: 'rmc',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada: Government and Politics', para: '3' }
        }
      ]
    },
    {
      name: 'Paul Scoon',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada: Government and Politics', para: '3' }
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
          text: 'Bishop\'s murder set the stage for the October 25, 1983, military intervention by United States and Caribbean forces',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/73.htm'
          }
        },
        {
          id: 'q2',
          text: 'Swift military action by United States and Caribbean forces left little time for the Cubans or the PRA to fortify the island and provide additional supplies and troop reinforcements, even if the Cubans had been willing to do so.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada: Foreign Relations', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/80.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In March 1979, Maurice Bishop and his followers in the New Jewel Movement (NJM) seized power in Grenada.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/73.htm'
          }
        },
        {
          id: 'q4',
          text: 'In the economic sphere, the PRG made only slow and halting progress toward socialism.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/73.htm'
          }
        },
        {
          id: 'q5',
          text: 'The advent of the People\'s Revolutionary Government (PRG) produced a sharp deviation in the previous norms of Grenadian policy.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada: Foreign Relations', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/80.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The events of October 1983 exposed the limitations of the PRG\'s policy.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada: Foreign Relations', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/80.htm'
          }
        },
        {
          id: 'q7',
          text: 'After the events of October 1983, the status of the courts set up by the PRG came into question.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada: Government and Politics', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/79.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'By September 1986, postintervention United States aid to Grenada had totaled approximately US$85 million.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada: Relations with the United States', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/82.htm'
          }
        },
        {
          id: 'q9',
          text: 'After that date, Grenada turned to the United States as its principal ally and benefactor.',
          lang: 'en',
          cite: {
            source: 'loc-caribbean-islands-country-study-1987',
            loc: { section: 'Grenada', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-10',
            url: 'http://countrystudies.us/caribbean-islands/73.htm'
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
            value: { d: '1983-10-19' },
            cites: [
              {
                source: 'loc-caribbean-islands-country-study-1987',
                loc: { section: 'Grenada', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'This internal struggle, essentially a contest between the more pragmatic Bishop and his doctrinaire deputy prime minister Bernard Coard, led directly to the downfall of the PRG and the murder of Bishop and many others on October 19, 1983.',
        lang: 'en',
        cite: {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'http://countrystudies.us/caribbean-islands/73.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1983-10-25' },
            cites: [
              {
                source: 'loc-caribbean-islands-country-study-1987',
                loc: { section: 'Grenada', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'After the United States-Caribbean military intervention of October 1983 that deposed the short-lived Revolutionary Military Council established by Bernard Coard and General Hudson Austin of the People\'s Revolutionary Army (PRA), the Constitution of 1973 was brought back into force by Governor General Paul Scoon (see Current Strategic Considerations, ch. 7).',
        lang: 'en',
        cite: {
          source: 'loc-caribbean-islands-country-study-1987',
          loc: { section: 'Grenada: Government and Politics', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-10',
          url: 'http://countrystudies.us/caribbean-islands/79.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/CH-46_HMM-261_on_Grenada_1983.JPEG/1280px-CH-46_HMM-261_on_Grenada_1983.JPEG',
    page: 'https://commons.wikimedia.org/wiki/File:CH-46_HMM-261_on_Grenada_1983.JPEG',
    credit: { institution: 'U.S. DefenseImagery', creator: 'TSgt. Mike Creen' },
    license: { id: 'public-domain' }
  }
})
