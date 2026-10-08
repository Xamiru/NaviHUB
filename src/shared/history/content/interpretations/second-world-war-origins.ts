import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'second-world-war-origins',
  about: ['event:second-world-war'],
  topic: 'causes',
  researched: '2026-10-08',
  positions: [
    {
      id: 'premeditated-nazi-aggression',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'International Military Tribunal (Nuremberg)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The war against Poland did not come suddenly out of an otherwise clear sky; the evidence has made it plain that this war of aggression, as well as the seizure of Austria and Czechoslovakia, was pre-meditated and carefully prepared, and was not undertaken until the moment was thought opportune for it to be carried through as a definite part of the pre-ordained scheme and plan.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-common-plan-and-aggressive-war',
            loc: { section: 'The Common Plan or Conspiracy and Aggressive War' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://avalon.law.yale.edu/imt/judnazi.asp' }
        },
        {
          id: 'q2',
          text: 'For the aggressive designs of the Nazi Government were not accidents arising out of the immediate political situation in Europe and the world; they were a deliberate and essential part of Nazi foreign policy.',
          lang: 'en',
          cite: {
            source: 'avalon-imt-judgment-common-plan-and-aggressive-war',
            loc: { section: 'The Common Plan or Conspiracy and Aggressive War' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'https://avalon.law.yale.edu/imt/judnazi.asp' }
        }
      ]
    },
    {
      id: 'hitlers-geopolitical-goal',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Once his regime was consolidated, Hitler took little interest in domestic policy, his sole concern being that Germany become sufficiently strong to realize his long-term geopolitical goal of creating a German empire that would dominate western Europe and extend deep into Russia.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich: Foreign Policy', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/40.htm' }
        },
        {
          id: 'q4',
          text: 'It was also in 1936 that Hitler informed the regime\'s top officials that Germany must be ready for war by 1940.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The Third Reich: Foreign Policy', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/germany/40.htm' }
        }
      ]
    },
    {
      id: 'versailles-and-munich',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Russian Federation' },
        { kind: 'participant', name: 'Vladimir Putin' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'The root causes of World War II mainly stem from the decisions made after World War I.',
          lang: 'en',
          cite: {
            source: 'kremlin-2020-06-19-putin-75th-anniversary-great-victory',
            loc: {
              section: '75th Anniversary of the Great Victory: Shared Responsibility to History and our Future',
              para: '15'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'http://en.kremlin.ru/events/president/news/63527'
          }
        },
        {
          id: 'q6',
          text: 'It was the Munich Betrayal that served as the “trigger” and made the great war in Europe inevitable.',
          lang: 'en',
          cite: {
            source: 'kremlin-2020-06-19-putin-75th-anniversary-great-victory',
            loc: {
              section: '75th Anniversary of the Great Victory: Shared Responsibility to History and our Future',
              para: '23'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'http://en.kremlin.ru/events/president/news/63527'
          }
        }
      ]
    },
    {
      id: 'nazi-soviet-pact',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'European Parliament' }
      ],
      statements: [
        {
          id: 'q7',
          text: '2. Stresses that the Second World War, the most devastating war in Europe’s history, was started as an immediate result of the notorious Nazi-Soviet Treaty on Non-Aggression of 23 August 1939, also known as the Molotov-Ribbentrop Pact, and its secret protocols, whereby two totalitarian regimes that shared the goal of world conquest divided Europe into two zones of influence;',
          lang: 'en',
          cite: {
            source: 'european-parliament-2019-09-19-european-remembrance-resolution',
            loc: { section: 'Paragraph 2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/20241227154400/https://www.europarl.europa.eu/doceo/document/TA-9-2019-0021_EN.html'
          }
        }
      ]
    }
  ]
})
