import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'iran-crisis-of-1946',
  names: [
    { text: 'Iran crisis of 1946', lang: 'en', role: 'primary' },
    { text: 'بحران آذربایجان', lang: 'fa', role: 'native' },
    {
      text: 'Azarbaijan Crisis',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1955' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1945-12-30' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1945' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1947-10-21' },
        cites: [
          {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '7' }
          }
        ]
      },
      {
        value: { d: '1947-10-22' },
        cites: [
          {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '21' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'global'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '21' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '11' }
        }
      ]
    },
    {
      ref: 'place:moscow',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1946' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' },
    { ref: 'polity:soviet-union' }
  ],
  participants: [
    {
      ref: 'person:ahmad-qavam',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1946' }
        },
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '11' }
        }
      ]
    },
    {
      ref: 'person:joseph-stalin',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1946' }
        },
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '9' }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
        }
      ]
    },
    {
      ref: 'person:hasan-taqizadeh',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1945' }
        }
      ]
    },
    {
      name: 'Ḥosayn ʿAlāʾ',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1946' }
        }
      ]
    },
    {
      ref: 'person:mohammad-mosaddegh',
      role: 'participant',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '4' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '4' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:tripartite-treaty-of-alliance-1942',
      rel: 'related',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '11' }
        }
      ]
    },
    {
      ref: 'event:azerbaijan-peoples-government',
      rel: 'related',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '11' }
        }
      ]
    },
    { ref: 'event:republic-of-mahabad', rel: 'related' },
    {
      ref: 'event:founding-of-the-national-front-of-iran',
      rel: 'related',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '4' }
        }
      ]
    },
    { ref: 'period:cold-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q15',
          text: 'In December 1945, the Azarbaijan Democratic Party, which had close links with the Tudeh and was led by Jafar Pishevari, announced the establishment of an autonomous republic. In a similar move, activists in neighboring Kordestan established the Kurdish Republic of Mahabad. Both autonomous republics enjoyed the support of the Soviets, and Soviet troops remaining in Khorasan, Gorgan, Mazandaran, and Gilan. Other Soviet troops prevented government forces from entering Azarbaijan and Kordestan. Soviet pressure on Iran continued as British and American troops evacuated in keeping with their treaty undertakings. Soviet troops remained in the country.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/16.htm' }
        },
        {
          id: 'q1',
          text: 'In the meantime, the Soviet Union was pressing toobtain oil concessions in northern Persia, a demand that was generally opposed, except by the Tudeh party. The pressure was particularly threatening because of the continued presence of Soviet troops in Azarbaijan and northern Persia, even after the war had ended and contrary to an agreement signed by Josef Stalin, Winston Churchill, and Franklin D. Roosevelt in their Tehran Conference of 1943.',
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
          id: 'q2',
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
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In October, 1944, the Russian vice commissar of foreign affairs S. Kavtaradze, reacting perhaps to apprehension over potential American penetration of Iran (encouraged by the central government as a counterweight to Soviet and British influence), asked for exclusive exploration rights for five years along Iran’s northern, Caspian coast from the Russian border in Azarbaijan to Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '4' }
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
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'On December 30, on the last day prior to prime minister Ebrāhim Ḥakimi’s resignation, Sayyed Ḥasan Taqizādeh, the Iranian ambassador to London, submits a complaint to the Security Council of the United Nations against Russia, whose forces had remained in Iran contrary to a prior agreement.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1945' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q5',
          text: 'Rather, in the course of the next three weeks, Soviet reinforcements of at least 200 tanks and 3,500 trucks arrived in Tabrīz and were deployed south toward Qazvīn, west toward the Turkish border, and southwest toward the Iraqi border',
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
        {
          id: 'q6',
          text: 'Prime Minister Ahmad Qavam had to persuade Stalin to withdraw his troops by agreeing to submit a Soviet oil concession to the Majlis and to negotiate a peaceful settlement to the Azarbaijan crisis with the Pishevari government.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'The fifteenth Majles did not open until July, and did not vote on the controversial oil agreement with the Soviet Union until October. Then, by a vote of 102 to 2, the agreement was rejected and the issues generated by the Soviet occupation of Azarbaijan were finally resolved',
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
        {
          id: 'q8',
          text: 'The eventual rejection of the Soviet oil demands (30 Mehr 1326 Š./22 October 1947) did indeed contribute to mobilizing vocal discontent against the AIOC and the British government.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
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
            value: { d: '1944-12-02' },
            cites: [
              {
                source: 'iranica-kuniholm-azerbaijan-1941-1947',
                loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Despite Soviet intimidation, Moḥammad Moṣaddeq led the Majles on 2 December, 1944, to pass a law forbidding oil negotiations between cabinets and foreigners;',
        lang: 'en',
        cite: {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1946-01-19' },
            cites: [
              {
                source: 'iranica-kuniholm-azerbaijan-1941-1947',
                loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 19 January 1946, meanwhile, Iran called for investigation of Russian interference in Iran’s internal affairs.',
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
    },
    {
      date: {
        alts: [
          {
            value: { d: '1946-03-02' },
            cites: [
              {
                source: 'iranica-kuniholm-azerbaijan-1941-1947',
                loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'By March 2, the date set under the Tripartite Treaty for the withdrawal of all foreign troops from Iran, British and U.S. troops had withdrawn, but Soviet troops had not.',
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
    },
    {
      date: {
        alts: [
          {
            value: { d: '1946-04-04' },
            cites: [
              {
                source: 'iranica-mamedova-russia-iranian-soviet-relations',
                loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On 4 April 1946, the Agreement on Oil was signed in Tehran. Upon signing the provisional communiqué, the USSR announced the withdrawal of the troops.',
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
    },
    {
      date: {
        alts: [
          {
            value: { d: '1946-05' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '4' }
              },
              {
                source: 'iranica-mamedova-russia-iranian-soviet-relations',
                loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '21' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In April the government signed an oil agreement with the Soviet Union; in May, partly as a result of United States, British, and UN pressure, Soviet troops withdrew from Iranian territory.',
        lang: 'en',
        cite: {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '4' }
        },
        provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1947-10-21' },
            cites: [
              {
                source: 'iranica-zabih-communism-in-persia-1941-1953',
                loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '7' }
              }
            ]
          },
          {
            value: { d: '1947-10-22' },
            cites: [
              {
                source: 'iranica-azimi-great-britain-v',
                loc: {
                  section: 'GREAT BRITAIN v. British influence in Persia, 1941-79',
                  para: '21'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The Tudeh party faced a severe ideological and political crisis after the collapse of the insurrections in Azarbaijan and Kurdistan, a crisis that was aggravated when a draft treaty for oil concessions to the Soviets was rejected by the Fifteenth Majles on 29 Mehr 1326 Š./21 October 1947.',
        lang: 'en',
        cite: {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/communism-ii/'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/14/Repros%2C_Bestanddeelnr_901-5673.jpg/1280px-Repros%2C_Bestanddeelnr_901-5673.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Repros,_Bestanddeelnr_901-5673.jpg',
    credit: { institution: 'Nationaal Archief' },
    license: { id: 'cc0' }
  },
  furtherReading: [
    { source: 'hasanli-2006-at-the-dawn-of-the-cold-war', perspective: 'central-asian' },
    { source: 'showkat-2007-dar-tirras-e-hadeseh', perspective: 'iranian' }
  ]
})
