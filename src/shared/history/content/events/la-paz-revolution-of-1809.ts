import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'la-paz-revolution-of-1809',
  names: [
    { text: 'La Paz revolution of 1809', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'uprising',
  start: {
    alts: [
      {
        value: { d: '1809-07-16' },
        cites: [
          {
            source: 'loc-bolivia-country-study-1989',
            loc: {
              section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence',
              para: '3'
            }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 3,
  places: [
    { ref: 'place:la-paz' }
  ],
  participants: [
    {
      name: 'Pedro Domingo Murillo',
      role: 'leader',
      cites: [
        {
          source: 'loc-bolivia-country-study-1989',
          loc: { section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence', para: '3' }
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
          text: 'The invasion of the Iberian Peninsula in 1807-08 by Napoleón\'s forces proved critical to the independence struggle in South America.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: {
              section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence',
              para: '1'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/8.htm' }
        },
        {
          id: 'q2',
          text: 'Events in Europe were perhaps even more crucial to the movement for Latin American independence than Miranda\'s efforts.',
          lang: 'en',
          cite: {
            source: 'loc-venezuela-country-study-1990',
            loc: { section: 'The Epic of Independence', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/venezuela/4.htm' }
        },
        {
          id: 'q3',
          text: 'This conflict of authority resulted in a local power struggle in Upper Peru between 1808 and 1810 and constituted the first phase of the efforts to achieve independence.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: {
              section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/8.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'On July 16, 1809, Pedro Domingo Murillo led another revolt by criollos and mestizos (those of mixed European and Indian ancestry) in La Paz and proclaimed an independent state in Upper Peru in the name of Ferdinand VII.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: {
              section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/8.htm' }
        },
        {
          id: 'q5',
          text: 'The loyalty to Ferdinand was a pretense used to legitimize the independence movement.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: {
              section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/8.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Although the revolt was put down by royalist forces sent to La Paz by the viceroy of Peru and to Chuquisaca by the viceroy of Río de La Plata, Upper Peru was never again completely controlled by Spain.',
          lang: 'en',
          cite: {
            source: 'loc-bolivia-country-study-1989',
            loc: {
              section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence',
              para: '3'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/8.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1809-05-25' },
            cites: [
              {
                source: 'loc-bolivia-country-study-1989',
                loc: {
                  section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence',
                  para: '2'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'On May 25, 1809, tensions grew when radical criollos, also refusing to recognize the junta because they wanted independence, took to the streets. This revolt, one of the first in Latin America, was soon put down by the authorities.',
        lang: 'en',
        cite: {
          source: 'loc-bolivia-country-study-1989',
          loc: { section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence', para: '2' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/8.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1809-11' },
            cites: [
              {
                source: 'loc-bolivia-country-study-1989',
                loc: {
                  section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence',
                  para: '3'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'By November 1809, Cochabamba, Oruro, and Potosí had joined Murillo.',
        lang: 'en',
        cite: {
          source: 'loc-bolivia-country-study-1989',
          loc: { section: 'INDEPENDENCE FROM SPAIN, 1809-39: Struggle for Independence', para: '3' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bolivia/8.htm' }
      }
    }
  ]
})
