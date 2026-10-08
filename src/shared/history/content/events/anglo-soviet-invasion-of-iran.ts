import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'anglo-soviet-invasion-of-iran',
  names: [
    { text: 'Anglo-Soviet invasion of Iran', lang: 'en', role: 'primary' },
    { text: 'اشغال ایران در جنگ جهانی دوم', lang: 'fa', role: 'native' },
    {
      text: 'Šahrīvar 1320',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1941-08-25' },
        cites: [
          {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
          },
          {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '20' }
          }
        ]
      },
      {
        value: { d: '1941-08-26' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1941-09-16' },
        cites: [
          {
            source: 'iranica-yarshater-iranian-history-islamic-period-6',
            loc: {
              section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
            }
          },
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
          },
          {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia', 'europe'],
  prominence: 1,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '20' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
        }
      ]
    },
    {
      ref: 'place:mashhad',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'event:second-world-war' },
    { ref: 'period:pahlavi-dynasty' }
  ],
  sides: [
    {
      key: 'ussr',
      name: 'Soviet Union',
      polity: 'polity:soviet-union',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
        }
      ]
    },
    {
      key: 'uk',
      name: 'United Kingdom',
      polity: 'polity:united-kingdom',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
        }
      ]
    },
    {
      key: 'iran',
      name: 'Iran',
      polity: 'polity:pahlavi-iran',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'head-of-state',
      side: 'iran',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
        }
      ]
    },
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'head-of-state',
      side: 'iran',
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
        }
      ]
    },
    {
      ref: 'person:mohammad-ali-foroughi',
      role: 'head-of-government',
      side: 'iran',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1941' }
        }
      ]
    },
    {
      name: 'Reader Bullard',
      role: 'diplomat',
      side: 'uk',
      cites: [
        {
          source: 'iranica-azimi-great-britain-v',
          loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '8' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'ussr',
      value: {
        alts: [
          {
            value: { min: 40000, qualifier: 'about' },
            cites: [
              {
                source: 'iranica-kuniholm-azerbaijan-1941-1947',
                loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'uk',
      value: {
        alts: [
          {
            value: { min: 19000 },
            cites: [
              {
                source: 'iranica-kuniholm-azerbaijan-1941-1947',
                loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:tripartite-treaty-of-alliance-1942',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '3' }
        }
      ]
    },
    {
      ref: 'event:persian-corridor',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-kuniholm-azerbaijan-1941-1947',
          loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
        }
      ]
    },
    {
      ref: 'event:founding-of-the-tudeh-party',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-zabih-communism-in-persia-1941-1953',
          loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '1' }
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
          text: 'The United Kingdom and the Soviet Union invaded Iran on 3 Šahrīvar 1320 Š./25 August 1941, invoking an unsatisfactory response to parallel demands for expulsion of four-fifths of the 1,500 Germans in Iran.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q2',
          text: 'At the outbreak of World War II, Iran declared its neutrality, but the country was soon invaded by both Britain and the Soviet Union.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'The Allied forces demanded right of passage through Persia in order to transport food and ammunition to the Soviet Union. They also demanded the expulsion from Persia of the Germans, some of whom were engaged in anti-Alliedactivities. Reza Shah, proud of his position and insisting on the neutrality of the country, refused.',
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
          text: 'He had been inclined towards the Germans, traditionally regarded in Persia as non-imperialist and capable of countervailing British and Russian influence. He sought German technical assistance in Persian economic, industrial, and military projects. In the context of the growing threat of Nazi Germany, the pursuit of such a policy by Reżā Shah was bound to antagonize the British.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'Approximately 40,000 Soviet troops entered Iran from the north, occupying Azarbaijan and Mašhad, while 19,000 British troops entered from the south along a six hundred-mile front to protect the oil fields in Ḵūzestān.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q6',
          text: 'The British and Soviet armies attacked from the south and the north, respectively; the Persian army could not present any effective resistance, and Reza Shah had to abdicate his throne, leaving it to his eldest son, the 22-year-old Moḥammad Reza (16 September 1941), following an agreement with the invading powers.',
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
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'The dispersal of the Iranian army undermined Reżā Shah’s earlier efforts to consolidate or repress the centrifugal forces (political, administrative, religious, tribal, and economic) in his country, leaving the central government vulnerable to them and aggravating mutual suspicions between central and provincial administrations.',
          lang: 'en',
          cite: {
            source: 'iranica-kuniholm-azerbaijan-1941-1947',
            loc: { section: 'AZERBAIJAN v. History from 1941 to 1947', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-v/'
          }
        },
        {
          id: 'q8',
          text: 'The occupation undermined Persian sovereignty and revived overt British influence in the country.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q9',
          text: 'The censorship having been lifted overnight with Reza Shah’s departure, the country was exposed to a torrent of ideas and ideologies, including communism (q.v.).',
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
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1941-09-08' },
            cites: [
              {
                source: 'iranica-mamedova-russia-iranian-soviet-relations',
                loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The agreement between Iran, the USSR and Great Britain, concluded on 8th September 1941, defined the troop disposition according to which the Iranian troops remained in the central part of Iran.',
        lang: 'en',
        cite: {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '20' }
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
            value: { d: '1941-09-15' },
            cites: [
              {
                source: 'iranica-mamedova-russia-iranian-soviet-relations',
                loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '20' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'However, since the main condition of the Agreement, namely the expulsion of the representatives of Germany, was not fulfilled, the Allied troops occupied Tehran on September 15.',
        lang: 'en',
        cite: {
          source: 'iranica-mamedova-russia-iranian-soviet-relations',
          loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '20' }
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
            value: { d: '1941-09-16' },
            cites: [
              {
                source: 'iranica-yarshater-iranian-history-islamic-period-6',
                loc: {
                  section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
                }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Reżā Shah is forced to abdicate in favor of his son, Crown Prince Moḥammad Reżā, 21, with the agreement of the Allies.',
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
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0f/Abadan_invasion_of_Iran.jpg/1280px-Abadan_invasion_of_Iran.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Abadan_invasion_of_Iran.jpg',
    credit: { institution: 'Imperial War Museum', creator: 'Geoffrey Keating' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'hasanli-2006-at-the-dawn-of-the-cold-war', perspective: 'central-asian' },
    { source: 'grechko-1973-istoriia-vtoroi-mirovoi-voiny', perspective: 'russian-soviet' }
  ]
})
