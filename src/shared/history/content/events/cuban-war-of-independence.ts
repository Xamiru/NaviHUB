import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'cuban-war-of-independence',
  names: [
    { text: 'Cuban War of Independence', lang: 'en', role: 'primary' },
    { text: 'Guerra de Independencia cubana', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1895-02-24' },
        cites: [
          { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '7' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1898' },
        cites: [
          { source: 'lemo-chronik-1895', loc: { section: 'Chronik 1895', para: '8' } },
          {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:cuba',
      cites: [
        {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '3' }
        }
      ]
    }
  ],
  polities: [
    { ref: 'polity:kingdom-of-spain' }
  ],
  related: [
    {
      ref: 'event:spanish-american-war',
      rel: 'led-to',
      cites: [
        {
          source: 'state-dept-milestones-spanish-american-war',
          loc: { section: 'The Spanish-American War, 1898', para: '3' }
        },
        {
          source: 'loc-philippines-country-study-1991',
          loc: { section: 'Outbreak of War, 1898', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'The war that erupted in 1898 between the United States and Spain was preceded by three years of fighting by Cuban revolutionaries to gain independence from Spanish colonial rule.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Cuba had long been a Spanish colony and the revolutionary movement, which had been simmering on and off there for much of the 19th century, intensified during the 1890s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-yellow-journalism',
            loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/yellow-journalism'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'From 1895–1898, the violent conflict in Cuba captured the attention of Americans because of the economic and political instability that it produced in a region within such close geographical proximity to the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        },
        {
          id: 'q5',
          text: 'Many in the United States called upon Spain to withdraw from the island, and some even gave material support to the Cuban revolutionaries.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-yellow-journalism',
            loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/yellow-journalism'
          }
        },
        {
          id: 'q6',
          text: 'Hearst and Pulitzer devoted more and more attention to the Cuban struggle for independence, at times accentuating the harshness of Spanish rule or the nobility of the revolutionaries, and occasionally printing rousing stories that proved to be false.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-yellow-journalism',
            loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/yellow-journalism'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/0/0d/CubanMambisesSixthCorps.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:CubanMambisesSixthCorps.jpg',
    credit: { creator: 'José Gómez de la Carrera' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'miro-argenter-1981-cronicas-de-la-guerra', perspective: 'latin-american' },
    {
      source: 'roig-de-leuchsenring-1952-la-guerra-libertadora-cubana',
      perspective: 'latin-american'
    }
  ]
})
