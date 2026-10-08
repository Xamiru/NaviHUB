import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iran-crisis-of-1946-soviet-motives',
  about: ['event:iran-crisis-of-1946'],
  topic: 'motives',
  researched: '2026-10-09',
  positions: [
    {
      id: 'soviet-stated-grounds',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Soviet Union' },
        { kind: 'participant', name: 'Andrey Vyshinsky' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'The events in Iranian Azerbaijan have no connexion with the presence there of Soviet troops, as the indisputable and entirely objective facts bear witness. These events are of an exclusively Iranian and internal nature.',
          lang: 'en',
          cite: {
            source: 'frus-1946-v07-vyshinsky-to-security-council-1946-01-24',
            loc: { para: '5', page: '311' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1946v07/d224'
          }
        },
        {
          id: 'q7',
          text: 'The anti-democratic and pogrom activity, hostile to the Soviet Union, on the part of the reactionary forces in Iran which are supported by certain influential Iranian groups drawn from the ruling circles and the police authorities, creates for the Azerbaijan Soviet Socialist Republic and for Baku a danger of organized hostile actions, diversions and so forth.',
          lang: 'en',
          cite: {
            source: 'frus-1946-v07-vyshinsky-to-security-council-1946-01-24',
            loc: { para: '8', page: '311' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1946v07/d224'
          }
        }
      ],
      reception: [
        {
          id: 'q8',
          text: 'The pressure was particularly threatening because of the continued presence of Soviet troops in Azarbaijan and northern Persia, even after the war had ended and contrary to an agreement signed by Josef Stalin, Winston Churchill, and Franklin D. Roosevelt in their Tehran Conference of 1943. Whereas the British and the Americans had accordingly withdrawn their troops, the Soviets stayed on and encouraged a separatist movement in Azerbijan headed by Jaʿfar Piševari',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        }
      ]
    },
    {
      id: 'security-and-sphere-of-influence',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Bruce R. Kuniholm' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Stalin’s stated reason for maintaining approximately 30,000 troops in Azarbaijan after the war was that they served as a precaution against sabotage and “hostile” actions. More likely, he was protecting security interests on his southern flank, preventing Anglo-American influence in what he felt to be his sphere of influence, exploiting several of the opportunities that occupation afforded him with a view to controlling the government in Tehran and, perhaps, creating conditions that, in the long run, would give the Soviet Union access to warm water ports. A friendly government in Azarbaijan and oil concessions were both means to the same end.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        }
      ]
    },
    {
      id: 'oil-and-azerbaijani-unification',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nina M. Mamedova' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'At the time when the Soviet troops were sent into Iran, a geological survey group from Baku was deputed to the Northern Iranian provinces. The group attested to the existence of substantial oil deposits in Iranian Azarbaijan, Gilān and other northern provinces.',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
          }
        },
        {
          id: 'q3',
          text: 'It appears that the earlier positive conclusion was made under pressure from Bagirov who, as the First Secretary of the Central Committee of the Communist Party of Soviet Azarbaijan, was eager to occupy and control the Azarbaijani territories of Iran with the perspective of their unification with the Soviet Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-ii-iranian-soviet-relations-1917-1991/'
          }
        }
      ]
    },
    {
      id: 'oil-concession-pressure',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' },
        { kind: 'scholar', name: 'Sepehr Zabih' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Eventually, collusion between the Tudeh and the Soviet Union brought further disintegration to Iran. In September 1944, while American companies were negotiating for oil concessions in Iran, the Soviets requested an oil concession in the five northern provinces.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        },
        {
          id: 'q5',
          text: 'At a public rally on 5 Ābān/27 October of that year the Tudeh party publicly expressed support of Soviet demands for an oil concession in northern Persia, comparable to that of the British in the south, and proposed that the region should be recognized as an essential security perimeter for the U.S.S.R.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-ii/'
          }
        }
      ]
    }
  ]
})
