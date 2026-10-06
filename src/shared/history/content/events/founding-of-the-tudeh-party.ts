import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-tudeh-party',
  names: [
    { text: 'Founding of the Tudeh Party', lang: 'en', role: 'primary' },
    { text: 'حزب توده ایران', lang: 'fa', role: 'native' },
    {
      text: 'Ḥezb-e Tūda-ye Īrān',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1941-09-29' },
        cites: [
          {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '2' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      name: 'Solaymān-Mīrzā Eskandarī',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1941' }
        }
      ]
    },
    {
      name: 'Īraj Eskandarī',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-chaqueri-eskandari-iraj',
          loc: { section: 'ESKANDARĪ, ĪRAJ', para: '4' }
        }
      ]
    },
    {
      name: 'Rostam Aliev',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:anglo-soviet-invasion-of-iran',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
        }
      ]
    },
    { ref: 'event:attempted-assassination-of-mohammad-reza-shah-1949', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The founding committee of the pro-Soviet leftist Tudeh Party is formed at the residence of Solaymān Mirzā Eskandari, a veteran of the Social Democratic Party.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1941' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q2',
          text: 'On 7 Mehr 1320 Š./29 September 1941 a number of Arānī’s followers met with a group of politicians at the residence of Solaymān-Mīrzā Eskandarī, an elderly prince of the Qajar family and a veteran of the early Persian socialist movement (see democrat party), to form a moderate socialist party. Rostam Aliev, first secretary at the Soviet embassy, also attended the meeting, as a representative of the Comintern and liaison between the Soviet communist party and the new group, thus continuing the traditional connection between Persian communists and the Soviet party. At the end of the meeting the formation of Ḥezb-e Tūda-ye Īrān (Tudeh party of Iran) was announced',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
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
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'With the Anglo-Soviet occupation of Persia and the abdication of Reżā Shah on 25 Šahrīvar 1320 Š./16 September 1941, the climate for resumption of political activities was vastly improved. Under a general amnesty political prisoners, including members of the Marxist-Leninist group led by Taqī Arānī (in Western sources usually Erani) between the two world wars, were released from prison.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-ii/'
          }
        },
        {
          id: 'q4',
          text: 'He was one of the first to be released after the forced abdication of Reżā Shah in September 1941, and he and several associates immediately established the pro-Soviet Tudeh party',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-eskandari-iraj',
            loc: { section: 'ESKANDARĪ, ĪRAJ', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/eskandari-iraj/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Initially the party played down its communist orientation and pursued a nonrevolutionary strategy, promoting a populist, democratic, and reformist platform. The latter included abolition of the Anti-communist act (Qānūn-e mojāzāt-e moqdemīn baṛʿalayh-e amnīyat wa esteqlāl-e kešvar) of 1310 Š./1931 (see i, above); various types of labor legislation, including a mandatory eight-hour work day; redistribution of state and crown lands among the peasantry; and political rights for women',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-ii/'
          }
        },
        {
          id: 'q6',
          text: 'The communist Tudeh Party was especially active in organizing industrial workers. Like many other political parties of the left and center, it called for economic and social reform.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        },
        {
          id: 'q7',
          text: 'The Tudeh party gains nine seats in Majles elections with the help of the Red Army.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1944' }
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'The links with the Soviet Union do not appear to have been a liability in the years of Allied occupation during World War II, but in the postwar period, as the Soviets began to use national communist groups as leverage against the central government, the inevitable conflict with nationalist sentiment led to major setbacks for Persian communists.',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-ii/'
          }
        },
        {
          id: 'q9',
          text: 'Dissention of a number of Tudeh Party members, led by Ḵalil Maleki, mainly on account of the Party’s subservience to the interests of the Soviet Union, rather than the promotion of Iranian national interests.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1948' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1942-10-09' },
            cites: [
              {
                source: 'iranica-zabih-communism-in-persia-1941-1953',
                loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 17 Mehr 1321 Š./9 October 1942 the first provincial conference of the Tudeh party (Naḵostīn konfarāns-e ayālatī) was convened in Tehran, with the participation of most of the former political prisoners.',
        lang: 'en',
        cite: {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/communism-ii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1944-08-01' },
            cites: [
              {
                source: 'iranica-zabih-communism-in-persia-1941-1953',
                loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On 10 Mordād 1323 Š./1 August 1944 the first party congress was held in Tehran, with 168 delegates representing 25,000 members organized in eighty local and twelve regional committees',
        lang: 'en',
        cite: {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/communism-ii/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1948-04-25' },
            cites: [
              {
                source: 'iranica-zabih-communism-in-persia-1941-1953',
                loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'After weathering several schisms in the wake of the Azarbaijan failure the party convened its second congress in Tehran on 5 Ordībehešt 1327 Š./25 April 1948, with 118 delegates representing almost every region of the country.',
        lang: 'en',
        cite: {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/communism-ii/'
        }
      }
    }
  ]
})
