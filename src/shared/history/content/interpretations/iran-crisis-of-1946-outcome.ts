import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'iran-crisis-of-1946-outcome',
  about: ['event:iran-crisis-of-1946', 'person:ahmad-qavam'],
  topic: 'outcome',
  researched: '2026-10-06',
  framing: {
    id: 'q1',
    text: 'The influence of both Qawām and the Shah in resolving the situation in Azarbaijan was crucial and can be quickly summarized:',
    lang: 'en',
    cite: {
      source: 'iranica-kuniholm-azerbaijan-1941-1947',
      loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
    },
    provenance: {
      via: 'web',
      at: '2026-10-06',
      url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
    }
  },
  positions: [
    {
      id: 'qavam-outfoxed-stalin',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Ehsan Yarshater' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'In a smart game of politics, Qawām unbelievably managed to outfox and checkmate Stalin. To appease the Soviets and gain Stalin’s confidence, Qawām included six members of the Tudeh Party in his cabinet and then started negotiating with the Soviet Union. He promised the Soviets most of what they were demanding, particularly the oil concession, against the pledge on their part to withdraw from northern Persia.',
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
          text: 'The Soviets apparently did not pay enough attention to the fine print of the agreement, which made any concessions to the Soviets dependant on Majles approval. Before the Agreement was presented to the Majles, Qawām made sure that the Soviet troops withdrew. They did, and the Persian army entered Azarbaijan on 12 December 1946, but the Majles, as expected, rejected all the promised concessions.',
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
          id: 'q4',
          text: 'Outfoxing Stalin, Qawām-al-Salṭana obtains Russian agreement for the withdrawal of troops from Azarbaijan with the promise of oil concession, the formation of a Soviet-Iranian oil company, and the granting of greater autonomy to Azarbaijan, all subject to the approval of the Majles; the Majles, however, nullifies the oil concession.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1946' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      id: 'iranian-diplomacy-and-us-support',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Bruce R. Kuniholm' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Whatever Soviet motives, and their movements suggest the possibility of a coup d’état, they were thwarted by masterful Iranian diplomacy and by firm U.S. support for the Iranian case at the United Nations.',
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
        }
      ]
    },
    {
      id: 'soviet-expectation-of-autonomy',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Nina M. Mamedova' }
      ],
      statements: [
        {
          id: 'q6',
          text: 'In a letter by Qawām addressed to Stalin, which the Persian prime minister sent before leaving Moscow, he assured Stalin that his aim was “to consolidate the political, economic, and cultural relations between our two countries” (Aliev, 2004, p. 222). This, to the Russian side, implied the retaining of the democratic autonomous governments in Azarbaijan and Kurdistan.',
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
    }
  ]
})
