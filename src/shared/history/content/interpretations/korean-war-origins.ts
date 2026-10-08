import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'korean-war-origins',
  about: ['event:korean-war'],
  topic: 'responsibility',
  researched: '2026-10-08',
  positions: [
    {
      id: 'communist-armed-invasion',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Harry S. Truman' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'IN KOREA the Government forces, which were armed to prevent border raids and to preserve internal security, were attacked by invading forces from North Korea.',
          lang: 'en',
          cite: {
            source: 'truman-1950-06-27-statement-on-the-situation-in-korea',
            loc: { para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.trumanlibrary.gov/library/public-papers/173/statement-president-situation-korea'
          }
        },
        {
          id: 'q2',
          text: 'The attack upon Korea makes it plain beyond all doubt that communism has passed beyond the use of subversion to conquer independent nations and will now use armed invasion and war.',
          lang: 'en',
          cite: {
            source: 'truman-1950-06-27-statement-on-the-situation-in-korea',
            loc: { para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.trumanlibrary.gov/library/public-papers/173/statement-president-situation-korea'
          }
        }
      ]
    },
    {
      id: 'provoked-by-the-south',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Soviet Union' },
        { kind: 'participant', name: 'Andrei Gromyko' }
      ],
      statements: [
        {
          id: 'q3',
          text: '1. In accordance with facts verified by the Soviet Government, the events taking place in Korea were provoked by an attack by forces of the South Korean authorities on border regions of North Korea. Therefore the responsibility for these events rests upon the South Korean authorities and upon those who stand behind their back.',
          lang: 'en',
          cite: {
            source: 'frus-1950-v07-kirk-gromyko-soviet-statement-1950-06-29',
            loc: { para: '3', page: '229' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1950v07/d151'
          }
        }
      ]
    },
    {
      id: 'civil-war-turned-conventional',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'When the Rhee regime, with help from United States military advisers, severely reduced the guerrilla threat in the winter of 1949-50, the civil war moved into a conventional phase.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'THE KOREAN WAR', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/15.htm' }
        },
        {
          id: 'q5',
          text: 'Kim sought Stalin\'s backing for his assault, but documents from Soviet and Chinese sources suggested that he got more support from China.',
          lang: 'en',
          cite: {
            source: 'loc-north-korea-country-study-1993',
            loc: { section: 'THE KOREAN WAR', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/north-korea/15.htm' }
        }
      ]
    }
  ]
})
