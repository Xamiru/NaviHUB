import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'azerbaijan-peoples-government-nature',
  about: ['event:azerbaijan-peoples-government', 'event:republic-of-mahabad'],
  topic: 'nature',
  researched: '2026-10-08',
  framing: {
    id: 'q1',
    text: 'Subsequent developments are subject to differing interpretations.',
    lang: 'en',
    cite: {
      source: 'iranica-kuniholm-azerbaijan-1941-1947',
      loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '11' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
    }
  },
  positions: [
    {
      id: 'soviet-backed-separatism',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' },
        { kind: 'scholar', name: 'Sepehr Zabih' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Whereas the British and the Americans had accordingly withdrawn their troops, the Soviets stayed on and encouraged a separatist movement in Azerbijan headed by Jaʿfar Piševari, who, for all practical purposes, had staged an autonomous government in that province, with a program of dividing the lands among the peasants and replacing Persian by Azari Turkish.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-6/'
          }
        },
        {
          id: 'q3',
          text: 'In the autumn of 1324 Š./1945 declared communist groups had launched separatist movements in the provinces of Azarbaijan and Kurdistan, with the support of Soviet troops.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-ii/'
          }
        }
      ]
    },
    {
      id: 'local-grievances-with-soviet-backing',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Bruce R. Kuniholm' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'While benefiting from Soviet support, the Azeris were partly reacting to the process of centralization instituted under Reżā Shah and to the central government’s incompetence, corruption, and discrimination against the province;',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q5',
          text: 'Thus, a concern for identity within their own communal groups seemed logical to both Kurds and Azeris in the aftermath of the Soviet occupation in 1941.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '7' }
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
      id: 'autonomy-movements-and-baku-ambitions',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nina M. Mamedova' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'Since on November 12 the Democratic Republic of Azarbaijan was declared in Tabriz, claiming a wide measure of autonomy within Iran, and in January 1946 the Kurdish Autonomous Republic was proclaimed, the Soviet troops prevaricated and did not follow suit.',
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
          id: 'q7',
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
      id: 'great-power-ambitions-decided-mahabad',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Keith Hitchins' },
        { kind: 'scholar', name: 'William Eagleton' }
      ],
      statements: [
        {
          id: 'q8',
          text: 'William Eagleton, an American foreign service officer, gives a first-hand account of the brief existence of the Republic of Mahābād in Iran in The Kurdish Republic of 1946 (London, 1963). Of particular importance are his observations on the involvement of the Barzanis and the turns in Soviet policy and his conclusions about the fate of the Republic being decided largely by great-power ambitions in the region.',
          lang: 'en',
          cite: {
            source: 'iranica-hitchins-kurds-modern-history',
            loc: { section: 'KURDS. STUDIES OF MODERN KURDISH HISTORY', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kurds-studies-of-modern-kurdish-history'
          }
        }
      ]
    },
    {
      id: 'soviet-national-autonomy',
      category: 'official',
      holders: [
        { kind: 'state', name: 'Soviet Union' },
        { kind: 'participant', name: 'Andrey Vyshinsky' }
      ],
      statements: [
        {
          id: 'q9',
          text: 'As is known, what is happening in northern Iran is connected with the aspirations of the population of northern Iran for national autonomy within the limits of the Iranian State, and with the achievement of the wishes of the local population, which is nothing unusual for a democratic State.',
          lang: 'en',
          cite: {
            source: 'frus-1946-v07-vyshinsky-to-security-council-1946-01-24',
            loc: { para: '6', page: '311' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/historicaldocuments/frus1946v07/d224'
          }
        }
      ]
    }
  ]
})
