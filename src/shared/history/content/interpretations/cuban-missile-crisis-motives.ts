import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'cuban-missile-crisis-motives',
  about: ['event:cuban-missile-crisis'],
  topic: 'motives',
  researched: '2026-10-09',
  positions: [
    {
      id: 'offensive-threat-to-the-hemisphere',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'John F. Kennedy' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Despite this, the rapid development of long-range missile bases and other offensive weapons systems in Cuba has proceeded. I must tell you that the United States is determined that this threat to the security of this hemisphere be removed.',
          lang: 'en',
          cite: {
            source: 'frus-1961-63-v06-kennedy-to-khrushchev-1962-10-22',
            loc: { para: '6', page: '166' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1961-63v06/d60'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'Meanwhile, U.S. reconnaissance flights over Cuba indicated the Soviet missile sites were nearing operational readiness.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-cuban-missile-crisis',
            loc: { section: 'The Cuban Missile Crisis, October 1962', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1961-1968/cuban-missile-crisis'
          }
        }
      ]
    },
    {
      id: 'defence-of-cuba',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Soviet Union' },
        { kind: 'participant', name: 'Nikita Khrushchev' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'All the means located there, and I assure you of this, have a defensive character, are on Cuba solely for the purposes of defense, and we have sent them to Cuba at the request of the Cuban Government.',
          lang: 'en',
          cite: {
            source: 'frus-1961-63-v06-khrushchev-to-kennedy-1962-10-26',
            loc: { para: '9', page: '173' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1961-63v06/d65'
          }
        },
        {
          id: 'q3',
          text: 'It is also not a secret to anyone that the threat of armed attack, aggression, has constantly hung, and continues to hang over Cuba. It was only this which impelled us to respond to the request of the Cuban Government to furnish it aid for the strengthening of the defensive capacity of this country.',
          lang: 'en',
          cite: { source: 'frus-1961-63-v06-khrushchev-to-kennedy-1962-10-26', loc: { para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1961-63v06/d65'
          }
        }
      ],
      reception: [
        {
          id: 'q7',
          text: 'In April 1961, a short few months into his administration, Kennedy authorized a clandestine invasion of Cuba by a brigade of Cuban exiles.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-1961-1968-foreword',
            loc: {
              section: '1961–1968: The Presidencies of John F. Kennedy and Lyndon B. Johnson',
              para: '5'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1961-1968/foreword'
          }
        }
      ]
    },
    {
      id: 'offsetting-us-strategic-superiority',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'To offset the United States military advantage and thereby improve the Soviet negotiating position, Khrushchev in 1962 tried to install nuclear missiles in Cuba, but he agreed to withdraw them after Kennedy ordered a blockade around the island nation.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'The Khrushchev Era', para: '14' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/13.htm' }
        },
        {
          id: 'q5',
          text: 'The Cold War reached a frightening apex when in late 1962 the Soviet Union gave the Cuban Government medium-range ballistic missiles to defend against another U.S. invasion.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-1961-1968-foreword',
            loc: {
              section: '1961–1968: The Presidencies of John F. Kennedy and Lyndon B. Johnson',
              para: '7'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/milestones/1961-1968/foreword'
          }
        }
      ]
    }
  ]
})
