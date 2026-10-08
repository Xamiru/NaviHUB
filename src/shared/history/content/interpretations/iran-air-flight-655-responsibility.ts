import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iran-air-flight-655-responsibility',
  about: ['event:iran-air-flight-655'],
  topic: 'responsibility',
  framing: {
    id: 'q1',
    text: 'The captain of the Vincennes, which was later admitted to have been in Iranian territorial waters, gave orders to fire at the plane allegedly after concluding that the plane was a hostile warplane (i.e., an F14 Tomcat).',
    lang: 'en',
    cite: {
      source: 'iranica-gieling-iraq-vii-iran-iraq-war',
      loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-08',
      url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
    }
  },
  positions: [
    {
      id: 'us-government-1988',
      category: 'official',
      holders: [
        { kind: 'state', name: 'United States' },
        { kind: 'participant', name: 'Ronald Reagan', ref: 'person:ronald-reagan' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'We deeply regret any loss of life. The course of the Iranian civilian airliner was such that it was headed directly for the U.S.S. Vincennes, which was at the time engaged with five Iranian Boghammar boats that had attacked our forces. When the aircraft failed to heed repeated warnings, the Vincennes followed standing orders and widely publicized procedures, firing to protect itself against possible attack.',
          lang: 'en',
          cite: {
            source: 'reagan-library-1988-07-03-statement-destruction-of-iranian-jetliner',
            loc: {
              section: 'Statement on the Destruction of an Iranian Jetliner by the United States Navy Over the Persian Gulf',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/statement-destruction-iranian-jetliner-united-states-navy-over-persian-gulf'
          }
        },
        {
          id: 'q3',
          text: 'This tragic accident was ultimately the result of the conflict between Iran and Iraq, which we now hope is on the verge of settlement.',
          lang: 'en',
          cite: {
            source: 'reagan-library-1988-08-19-fitzwater-statement-iran-air-investigation',
            loc: {
              section: 'Statement by Assistant to the President for Press Relations Fitzwater on the Investigation of the Accidental Attack on an Iranian Airliner',
              para: '3'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.reaganlibrary.gov/archives/speech/statement-assistant-president-press-relations-fitzwater-investigation-accidental'
          }
        }
      ],
      reception: [
        {
          id: 'q4',
          text: 'Iran, however, insisted that the civilian aircraft was ascending and therefore could not have posed a threat to the Vincennes. Other independent sources, including the airport controllers in Dubai, have confirmed this as well as Iran’s claim that the plane did indeed identify itself to the American naval ship.',
          lang: 'en',
          cite: {
            source: 'iranica-gieling-iraq-vii-iran-iraq-war',
            loc: { section: 'IRAQ vii. IRAN-IRAQ WAR', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/iraq-vii-iran-iraq-war'
          }
        }
      ]
    },
    {
      id: 'iranian-account',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Islamic Republic of Iran' },
        { kind: 'organization', name: 'Khamenei.ir (Office of the Supreme Leader)' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Feeling the need to prove the viability of Aegis (the sophisticated anti-aircraft system on the cruiser), the Vincennes shot down the Iranian civilian airbus, even though it had clearly been identified as a civilian aircraft and had transmitted the correct transponder, flying in the correct route. The 290 innocent passengers and crew, including 66 children, were all killed',
          lang: 'en',
          cite: {
            source: 'khamenei-ir-2015-11-04-legion-of-merit-iran-air-flight-655',
            loc: {
              section: 'Legion of Merit awarded to the one who killed 290 passengers of Iran Air flight 655',
              para: '8'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://web.archive.org/web/2024/https://english.khamenei.ir/news/2171/Legion-of-Merit-awarded-to-the-one-who-killed-290-passengers'
          }
        }
      ],
      reception: [
        {
          id: 'q6',
          text: 'On 3 July 1988, the USS Vincennes shot down an Iranian Airbus over the Persian Gulf, killing all 290 aboard. The plane had been in Iranian airspace and was not descending menacingly in the direction of the American ship, as was initially asserted, apart from which it was clearly a civilian, not a military, plane.',
          lang: 'en',
          cite: { source: 'iranica-algar-khomeini-life', loc: { section: 'KHOMEINI i. Life' } },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/khomeini-i-life/'
          }
        }
      ]
    }
  ],
  researched: '2026-10-09'
})
