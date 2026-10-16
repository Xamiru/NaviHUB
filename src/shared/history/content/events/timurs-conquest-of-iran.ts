import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'timurs-conquest-of-iran',
  names: [
    { text: 'Timur’s conquest of Iran', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1381' },
        cites: [
          { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '9' } },
          {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1387' },
        cites: [
          { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } },
          { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '14' } }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } }
      ]
    },
    {
      ref: 'place:isfahan',
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '14' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
        }
      ]
    },
    {
      ref: 'polity:kartids',
      cites: [
        { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '9' } }
      ]
    },
    {
      ref: 'polity:muzaffarids',
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '14' } }
      ]
    },
    {
      ref: 'polity:jalayirid-sultanate',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } }
      ]
    }
  ],
  sides: [
    {
      key: 'timurid',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
        }
      ]
    },
    {
      key: 'kartids',
      name: 'Kartids',
      polity: 'polity:kartids',
      cites: [
        { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '9' } }
      ]
    },
    {
      key: 'muzaffarids',
      name: 'Muzaffarids',
      polity: 'polity:muzaffarids',
      cites: [
        { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '14' } }
      ]
    },
    {
      key: 'jalayirids',
      name: 'Jalayerids',
      polity: 'polity:jalayirid-sultanate',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:timur',
      role: 'commander',
      side: 'timurid',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
        }
      ]
    },
    {
      name: 'Mirānšāh',
      role: 'commander',
      side: 'timurid',
      cites: [
        {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
        }
      ]
    },
    {
      name: 'Pīr ʿAlī',
      role: 'leader',
      side: 'kartids',
      cites: [
        { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '9' } }
      ]
    },
    {
      name: 'Solṭān Aḥmad',
      role: 'leader',
      side: 'jalayirids',
      cites: [
        { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } }
      ]
    }
  ],
  related: [
    { ref: 'event:rise-of-timur', rel: 'preceded-by' },
    { ref: 'event:five-years-campaign', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The first hostilities, in 783/1381, ended with Tīmūr’s occupation of Herat and capture of Pīr ʿAlī, whom he then pardoned.',
          lang: 'en',
          cite: { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '9' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/al-e-kart'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The weakening of the Mongols after Abu Saʿid produced a result only too familiar in Persian history: the rise and rebellion of contending generals who had been in the service of a once strong dynasty and the resurgence of local potentates and belligerent warlords, until a strongman rose again.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iran-ii2-islamic-period-page-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        },
        {
          id: 'q3',
          text: 'However, the internal situation of the Kart state was unstable; and after the death of Moʿezz-al-Din (771/1369-70) each of his two sons, Ḡiāṯ-al-Din II Pir-ʿAli (ruler in Herat, a Chaghatayid by his mother) and Malek Moḥammad (ruler in Saraḵs), struggled for power.',
          lang: 'en',
          cite: {
            source: 'iranica-szuppe-herat-iii',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q4',
          text: 'By this juncture western Iran lay under the shadow of the Central Asian conqueror Timur, who had welded together the forces of the Chaghatayid',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q9',
          text: 'The dynasty now suffered the almost permanent loss of Azarbaijan, since when Timur withdrew to Khorasan in 1387, he left his son Mirānšāh as viceroy of the province.',
          lang: 'en',
          cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/jalayerids'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q10',
          text: 'As he methodically expanded his territory from the province of Transoxania in 784-808/1382-1405, he treated both settled and nomadic populations as part of the booty, deporting selected groups of the former to serve in Samarqand and of the latter to defend the frontiers of Turkestan.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-deportations-iii',
            loc: { section: 'DEPORTATIONS iii. In the Islamic period', para: '16' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/deportations/deportations-iii-in-the-islamic-period/'
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
            value: { d: '1381' },
            cites: [
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
              },
              { source: 'iranica-spuler-al-e-kart', loc: { section: 'ĀL-E KART', para: '9' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'When Timur’s armies arrived in Herat in 1381 after destroying Bušanj, the elites, supported by the population, surrendered the town in Moḥarram 783/April 1381 after some initial fighting, on the promise that the lives and properties of the people who had not taken part in the battle would be spared; they also undertook the payment of a substantial tribute (māl-e āmān).',
        lang: 'en',
        cite: {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/herat-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1383' },
            cites: [
              {
                source: 'iranica-szuppe-herat-iii',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In 1383, Herat had to pay another heavy tribute after a short-lived and limited rebellion, and numerous craftsmen, artists, and religious scholars were deported to Transoxiana.',
        lang: 'en',
        cite: {
          source: 'iranica-szuppe-herat-iii',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/herat-iii'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1386' },
            cites: [
              {
                source: 'iranica-jackson-jalayerids',
                loc: { section: 'JALAYERIDS', para: '11' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'In the spring of 1386 his forces entered Tabriz and installed ʿĀdel Āqā there; Solṭān Aḥmad’s army was put to flight.',
        lang: 'en',
        cite: { source: 'iranica-jackson-jalayerids', loc: { section: 'JALAYERIDS', para: '11' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/jalayerids'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1387' },
            cites: [
              {
                source: 'iranica-wing-mozaffarids',
                loc: { section: 'MOZAFFARIDS', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'When Timur’s armies came to ʿErāq-e ʿAjam in 789/1387, Zayn-al-ʿĀbedin’s uncle and governor of Isfahan, Amir Moẓaffar Kāši, also submitted, along with the elites. However, an uprising among some of the Isfahanis against Timur’s tax collectors led to Timur’s order of a general massacre of the inhabitants',
        lang: 'en',
        cite: { source: 'iranica-wing-mozaffarids', loc: { section: 'MOZAFFARIDS', para: '14' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/mozaffarids'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/e/ec/Capture_of_Isfahan_by_Timur._A_miniature_painting_from_a_1533_manuscript_of_the_Zafarnama.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Capture_of_Isfahan_by_Timur._A_miniature_painting_from_a_1533_manuscript_of_the_Zafarnama.jpg',
    credit: { institution: 'British Library', creator: '1533 artist' },
    license: { id: 'public-domain' }
  }
})
