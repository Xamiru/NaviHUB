import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'soviet-socialist-republic-of-iran',
  names: [
    { text: 'Soviet Socialist Republic of Iran', lang: 'en', role: 'primary' },
    {
      text: 'حکومت جمهوری شوروی ایران',
      lang: 'fa',
      role: 'native',
      translit: 'Ḥokūmat-e jomhūrī-e šūrawī-e Īrān'
    },
    {
      text: 'Soviet Republic of Gilān',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-dailami-jangali-movement',
          loc: { section: 'JANGALI MOVEMENT', para: '65' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1920-06-05' },
        cites: [
          {
            source: 'iranica-chaqueri-ehsan-allah-khan',
            loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
          },
          {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '65' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1921-10' },
        cites: [
          {
            source: 'iranica-chaqueri-communism-in-persia',
            loc: { section: 'COMMUNISM i. In Persia to 1941', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:rasht',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1920' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:mirza-kuchik-khan',
      role: 'leader',
      cites: [
        {
          source: 'iranica-chaqueri-ehsan-allah-khan',
          loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
        },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1920' }
        }
      ]
    },
    {
      ref: 'person:ehsanollah-khan-dustdar',
      role: 'leader',
      cites: [
        {
          source: 'iranica-chaqueri-ehsan-allah-khan',
          loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
        },
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1920' }
        }
      ]
    },
    {
      ref: 'person:reza-shah-pahlavi',
      role: 'commander',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1921' }
        }
      ]
    },
    {
      name: 'Theodor Rothstein',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-chaqueri-ehsan-allah-khan',
          loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '4' }
        },
        {
          source: 'iranica-chaqueri-communism-in-persia',
          loc: { section: 'COMMUNISM i. In Persia to 1941', para: '9' }
        }
      ]
    },
    {
      name: 'Ḥaydar Khan ʿAmū-oḡlī',
      role: 'leader',
      cites: [
        {
          source: 'iranica-chaqueri-ehsan-allah-khan',
          loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:soviet-persian-treaty-of-1921',
      rel: 'related',
      cites: [
        {
          source: 'iranica-chaqueri-communism-in-persia',
          loc: { section: 'COMMUNISM i. In Persia to 1941', para: '9' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'The 11th Red Army, having entered Baku on 28 April 1920, landed in Gilān on 18 May and the Bolsheviks were welcomed by the Jangalis.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '64' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement/'
          }
        },
        {
          id: 'q2',
          text: 'The political demands of the radical leaders of the Jangali movement eventually culminated in the establishment of the Soviet Republic of Gilān on 5 June 1920.',
          lang: 'en',
          cite: {
            source: 'iranica-dailami-jangali-movement',
            loc: { section: 'JANGALI MOVEMENT', para: '65' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/jangali-movement/'
          }
        },
        {
          id: 'q3',
          text: 'Aiming to weaken the British position in Persia and acting from ideological considerations (mainly having the idea of spreading the proletarian revolution to the East), the leadership of the Soviet Republics in Russia, Trans-Caucasus and Turkistan started to provide considerable help to the Jangali movement of Mirza Kuček Khan.',
          lang: 'en',
          cite: {
            source: 'iranica-mamedova-russia-iranian-soviet-relations',
            loc: { section: 'RUSSIA ii. IRANIAN-SOVIET RELATIONS (1917-1991)', para: '4' }
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
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'Communist forces headed by Eḥsān-Allāh Khan form the Soviet Republic of Iran in Rasht. Mirzā Kučak Khan protests this move, separates from Eḥsān-Allāh Khan, and retreats to the forest.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1920' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q5',
          text: 'In that capacity he carried out extremist policies, including confiscation of property, that seriously undermined the new republic.',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-ehsan-allah-khan',
            loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/ehsan-allah-khan/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'A combination of external political pressure, internal party conflict, and military persecution led, at the end of October 1921, to final defeat of the Jangalīs by a superior force supported by both Britain and the Soviet Union',
          lang: 'en',
          cite: {
            source: 'iranica-chaqueri-communism-in-persia',
            loc: { section: 'COMMUNISM i. In Persia to 1941', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-i/'
          }
        },
        {
          id: 'q7',
          text: 'Reżā Khan defeats Kučak Khan and the Communist forces in Gilan.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1921' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
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
            value: { d: '1920-05-18' },
            cites: [
              {
                source: 'iranica-chaqueri-ehsan-allah-khan',
                loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
              },
              {
                source: 'iranica-dailami-jangali-movement',
                loc: { section: 'JANGALI MOVEMENT', para: '64' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Bolshevik forces bombard British contingents and occupy the port of Anzeli; Iran lodges a complaint with the League of Nations.',
        lang: 'en',
        cite: {
          source: 'iranica-yarshater-chronology-part-2',
          loc: { section: 'Chronology of Iranian History Part 2, 1920' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-06-23' },
            cites: [
              {
                source: 'iranica-chaqueri-communism-in-persia',
                loc: { section: 'COMMUNISM i. In Persia to 1941', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The first ʿAdalāt congress on Persian soil was convened at Anzalī on 6-8 Šawwāl 1338/23-25 June 1920. The main outcome was declaration of the new Ferqa-ye kāmūnīst (bālšovīk)-e Īrān (F.K.I.; Communist party of Iran).',
        lang: 'en',
        cite: {
          source: 'iranica-chaqueri-communism-in-persia',
          loc: { section: 'COMMUNISM i. In Persia to 1941', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/communism-i/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1920-07' },
            cites: [
              {
                source: 'iranica-chaqueri-ehsan-allah-khan',
                loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In late July 1920 he associated himself with the coup d’état directed against Kūček Khan and became head of the new soviet government dominated by the Communist party',
        lang: 'en',
        cite: {
          source: 'iranica-chaqueri-ehsan-allah-khan',
          loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/ehsan-allah-khan/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1921-04' },
            cites: [
              {
                source: 'iranica-chaqueri-ehsan-allah-khan',
                loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'He finally did so in April 1921 through the intervention and participation of the “moderate” communist leader Ḥaydar Khan',
        lang: 'en',
        cite: {
          source: 'iranica-chaqueri-ehsan-allah-khan',
          loc: { section: 'EḤSĀN-ALLĀH KHAN DŪSTDĀR', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/ehsan-allah-khan/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b3/%D8%B9%DA%A9%D8%B3_%DB%B3%DB%B1%D8%8C_%D8%AA%D8%A7%D8%B1%DB%8C%D8%AE_%D9%85%D8%AE%D8%AA%D8%B5%D8%B1_%D8%A7%D8%AD%D8%B2%D8%A7%D8%A8_%D8%B3%DB%8C%D8%A7%D8%B3%DB%8C_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86%D8%8C_%D8%AC%D9%84%D8%AF_%D8%A7%D9%88%D9%84.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:%D8%B9%DA%A9%D8%B3_%DB%B3%DB%B1%D8%8C_%D8%AA%D8%A7%D8%B1%DB%8C%D8%AE_%D9%85%D8%AE%D8%AA%D8%B5%D8%B1_%D8%A7%D8%AD%D8%B2%D8%A7%D8%A8_%D8%B3%DB%8C%D8%A7%D8%B3%DB%8C_%D8%A7%DB%8C%D8%B1%D8%A7%D9%86%D8%8C_%D8%AC%D9%84%D8%AF_%D8%A7%D9%88%D9%84.jpg',
    credit: { institution: 'Mohammad-Taqi Bahar, Tarikh-e mokhtasar-e ahzab-e siyasi-ye Iran, vol. 1' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'fakhrai-1978-sardar-e-jangal', perspective: 'iranian' }
  ]
})
