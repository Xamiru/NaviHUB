import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'prague-spring-invasion-justification',
  about: ['event:prague-spring'],
  topic: 'legitimacy',
  positions: [
    {
      id: 'brezhnev-doctrine',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Soviet Union' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'However, none of their decisions should damage either socialism in their country or the fundamental interests of other socialist countries, and the whole working class movement, which is working for socialism.',
          lang: 'en',
          cite: {
            source: 'fordham-brezhnev-doctrine-1968',
            loc: { section: 'The Brezhnev Doctrine, 1968', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://sourcebooks.fordham.edu/mod/1968brezhnev.asp'
          }
        },
        {
          id: 'q2',
          text: 'Discharging their internationalist duty toward the fraternal peoples of Czechoslovakia and defending their own socialist gains, the U.S.S.R. and the other socialist states had to act decisively and they did act against the antisocialist forces in Czechoslovakia.',
          lang: 'en',
          cite: {
            source: 'fordham-brezhnev-doctrine-1968',
            loc: { section: 'The Brezhnev Doctrine, 1968', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://sourcebooks.fordham.edu/mod/1968brezhnev.asp'
          }
        }
      ],
      reception: [
        {
          id: 'q3',
          text: 'After the invasion, the Soviet leadership justified the use of force in Prague under what would become known as the Brezhnev Doctrine, which stated that Moscow had the right to intervene in any country where a communist government had been threatened.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
            loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '8' }
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
      id: 'warsaw-pact-letter',
      category: 'contemporary',
      holders: [
        { kind: 'organization', name: 'Warsaw Pact' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The Warsaw Pact nations drafted a letter to the KSC leadership referring to the manifesto as an "organizational and political platform of counterrevolution."',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'The Prague Spring, 1968', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/40.htm'
          }
        }
      ]
    },
    {
      id: 'fear-of-contagion',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Recalling the 1956 uprising in Hungary, leaders in Moscow worried that if Czechoslovakia carried reforms too far, other satellite states in Eastern Europe might follow, leading to a widespread rebellion against Moscow’s leadership of the Eastern Bloc.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-soviet-invasion-of-czechoslovakia',
            loc: { section: 'Soviet Invasion of Czechoslovakia, 1968', para: '5' }
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
      id: 'interventionist-coalition',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The pro-interventionist coalition viewed the situation in Czechoslovakia as "counterrevolutionary" and favored the defeat of Dubcek and his supporters.',
          lang: 'en',
          cite: {
            source: 'loc-czechoslovakia-country-study-1987',
            loc: { section: 'Intervention', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'http://countrystudies.us/czech-republic/41.htm'
          }
        }
      ]
    }
  ],
  researched: '2026-10-07'
})
