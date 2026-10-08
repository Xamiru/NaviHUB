import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'prague-spring',
  names: [
    { text: 'Prague Spring', lang: 'en', role: 'primary' },
    { text: 'Pražské jaro', lang: 'cs', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1968-01-05' },
        cites: [
          {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'The Reform Movement', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1968-08-20' },
        cites: [
          {
            source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
            loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:prague',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
          loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '6' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:cold-war' }
  ],
  participants: [
    {
      ref: 'person:alexander-dubcek',
      role: 'leader',
      cites: [
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'The Reform Movement', para: '6' }
        },
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'The Prague Spring, 1968', para: '1' }
        }
      ]
    },
    {
      ref: 'person:leonid-brezhnev',
      role: 'leader',
      cites: [
        {
          source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
          loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '7' }
        },
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'Intervention', para: '1' }
        }
      ]
    },
    {
      name: 'Antonin Novotny',
      role: 'leader',
      cites: [
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'The Reform Movement', para: '6' }
        }
      ]
    },
    {
      name: 'Ludvik Vaculik',
      role: 'participant',
      cites: [
        {
          source: 'loc-czechoslovakia-country-study-1987',
          loc: { section: 'The Prague Spring, 1968', para: '3' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Soviet_tanks_-_Hradcany_Square_Prague_-_via_Swiss_embassy_1968-08-21.png',
    page: 'https://commons.wikimedia.org/wiki/File:Soviet_tanks_-_Hradcany_Square_Prague_-_via_Swiss_embassy_1968-08-21.png',
    credit: {
      institution: 'Dodis - Diplomatic Documents of Switzerland (Swiss embassy Prague report, via Swiss Federal Archives)'
    },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The movement to democratize socialism in Czechoslovakia, formerly confined largely to the party intelligentsia, acquired a new, popular dynamism in the spring of 1968.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'The Prague Spring, 1968', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/40.htm'
          }
        },
        {
          id: 'q2',
          text: 'On August 20, 1968, the Soviet Union led Warsaw Pact troops in an invasion of Czechoslovakia to crack down on reformist trends in Prague. Although the Soviet Union’s action successfully halted the pace of reform in Czechoslovakia, it had unintended consequences for the unity of the communist bloc.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
            loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/soviet-invasion-czechoslavkia'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In the early 1960s, the Czechoslovak economy became severely stagnated. The industrial growth rate was the lowest in Eastern Europe. Food imports strained the balance of payments. Pressures both from Moscow and from within the party precipitated a reform movement.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'The Reform Movement', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/39.htm'
          }
        },
        {
          id: 'q4',
          text: 'On January 5, 1968, the Central Committee elected Dubcek to replace Novotny as first secretary of the KSC.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'The Reform Movement', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/39.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'In April the KSC Presidium adopted the Action Program that had been drafted by a coalition headed by Dubcek and made up of reformers, moderates, centrists, and conservatives. The program proposed a "new model of socialism," profoundly "democratic" and "national," that is, adapted to Czechoslovak conditions. The National Front and the electoral system were to be democratized, and Czechoslovakia was to be federalized. Freedom of assembly and expression would be guaranteed in constitutional law. The New Economic Model was to be implemented. The Action Program also reaffirmed the Czechoslovak alliance with the Soviet Union and other socialist states. The reform movement, which rejected Stalinism as the road to communism, remained committed to communism as a goal.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'The Prague Spring, 1968', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/40.htm'
          }
        },
        {
          id: 'q6',
          text: 'On June 27, Ludvik Vaculik, a lifelong communist and a candidate member of the Central Committee, published a manifesto entitled "Two Thousand Words." The manifesto expressed concern about conservative elements within the KSC and "foreign" forces as well. (Warsaw Pact maneuvers were held in Czechoslovakia in late June.) It called on the "people" to take the initiative in implementing the reform program.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'The Prague Spring, 1968', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/40.htm'
          }
        },
        {
          id: 'q7',
          text: 'The Warsaw Pact invasion of August 20–21 caught Czechoslovakia and much of the Western world by surprise. In anticipation of the invasion, the Soviet Union had moved troops from the Soviet Union, along with limited numbers of troops from Hungary, Poland, East Germany and Bulgaria into place by announcing Warsaw Pact military exercises. When these forces did invade, they swiftly took control of Prague, other major cities, and communication and transportation links.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
            loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://history.state.gov/milestones/1961-1968/soviet-invasion-czechoslavkia'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'Although the Soviet crackdown on Czechoslovakia was swift and successful, small-scale resistance continued throughout early 1969 while the Soviets struggled to install a stable government. Finally, in April of 1969, the Soviets forced Dubcek from power in favor of a more conservative administrator. In the years that followed, the new leadership reestablished government censorship and controls preventing freedom of movement, but it also improved economic conditions, eliminating one of the sources for revolutionary fervor. Czechoslovakia once again became a cooperative member of the Warsaw Pact.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
            loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://history.state.gov/milestones/1961-1968/soviet-invasion-czechoslavkia'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'mlynar-1978-mraz-prichazi-z-kremlu', perspective: 'european' }
  ]
})
