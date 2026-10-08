import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'azerbaijan-peoples-government',
  names: [
    { text: 'Azerbaijan People’s Government', lang: 'en', role: 'primary' },
    { text: 'آذربایجان میللی حؤکومتی', lang: 'azb', role: 'native' },
    { text: 'حکومت ملی آذربایجان', lang: 'fa', role: 'native' },
    {
      text: 'Autonomous Government of Azarbaijan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
        }
      ]
    },
    {
      text: 'Democratic Republic of Azarbaijan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '21' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'movement',
  start: {
    alts: [
      {
        value: { d: '1945-11-12' },
        cites: [
          {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '21' }
          }
        ]
      },
      {
        value: { d: '1945-12' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1946-12-13' },
        cites: [
          {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  polities: [
    { ref: 'polity:pahlavi-iran' }
  ],
  participants: [
    {
      ref: 'person:jafar-pishevari',
      role: 'leader',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1945' }
        }
      ]
    },
    {
      ref: 'person:ahmad-qavam',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
        }
      ]
    },
    {
      ref: 'person:joseph-stalin',
      role: 'head-of-government',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '9' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:iran-crisis-of-1946', rel: 'related' },
    {
      ref: 'event:republic-of-mahabad',
      rel: 'related',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Formation of separatist Azarbaijan Republic with the support of the Red Army and with Jaʿfar Pišavari elected as its president.',
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
          id: 'q2',
          text: 'In December 1945, the Azarbaijan Democratic Party, which had close links with the Tudeh and was led by Jafar Pishevari, announced the establishment of an autonomous republic.',
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
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In 1945, the United States and Britain repeatedly sought the early withdrawal of all foreign troops from Iran, but the Russians refused to discuss the matter; instead, they encouraged dissolution of the Tūda Party in Azarbaijan and, in order to build a wider base of support, the establishment in its place of the Democratic Party of Azarbaijan (Ferqa-ye Demokrāt-e Āḏarbāyjān).',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '5' }
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
          text: 'By December 10, Tabrīz was in the hands of the Democratic Party; shortly thereafter, a newly inaugurated “National Assembly” proclaimed the Autonomous Government of Azarbaijan with Pīšavarī as Premier.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q5',
          text: 'He also began badly needed work on roads, established workers’ welfare pensions, and declared Azeri Turkish the official language of Azarbaijan.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '10' }
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
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'Almost a year to the day after the republics had been founded, they collapsed. In the process, several hundred rebels were killed, while approximately one thousand Azarbaijanis and as many as 10,000 Kurds under Mollā Moṣṭafā Bārzānī fled to the Soviet Union.',
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
          id: 'q7',
          text: 'Grim reminders of the regimes were embodied for months afterward in rows of bodies swinging from crude gibbets in many public squares of Azarbaijan and northern Kurdistan.',
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
          text: 'The regional movements for local autonomy were suppressed, and their activists arrested, and many killed. Thousands of Iranian families emigrated to the Soviet Union, mainly from Azarbaijan and Kurdistan.',
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
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1945-11-19' },
            cites: [
              {
                source: 'iranica-kuniholm-azerbaijan-1941-1947',
                loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'By November 19, all major routes entering the province had been seized by the Democratic Party; communications had been cut, and an Iranian force of 1,500 troops was stopped at Qazvīn by the Soviets.',
        lang: 'en',
        cite: {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '8' }
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
            value: { d: '1946-12-09' },
            cites: [
              {
                source: 'iranica-kuniholm-azerbaijan-1941-1947',
                loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
              }
            ]
          },
          {
            value: { d: '1946-12-12' },
            cites: [
              {
                source: 'iranica-yarshater-iranian-history-islamic-period-6',
                loc: {
                  section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In the face of Soviet threats and with the unqualified support of the United States in the Security Council if complications arose, Iranian troops began moving into Azarbaijan on 9 December 1946.',
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
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1946-12-13' },
            cites: [
              {
                source: 'iranica-kuniholm-azerbaijan-1941-1947',
                loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'By 21 Āḏar 1325 Š./13 December 1946, Pīšavarī had fled to Baku and Iranian forces entered Tabrīz.',
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
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Jafar_Pishevari_in_Tehran_guarded_by_armed_members_of_his_party.png',
    page: 'https://commons.wikimedia.org/wiki/File:Jafar_Pishevari_in_Tehran_guarded_by_armed_members_of_his_party.png',
    credit: { institution: 'Ettela\'at newspaper' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'hasanli-2006-at-the-dawn-of-the-cold-war', perspective: 'central-asian' },
    { source: 'showkat-2007-dar-tirras-e-hadeseh', perspective: 'iranian' }
  ]
})
