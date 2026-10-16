import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'uzun-hasans-empire',
  names: [
    { text: 'Uzun Hasan’s empire', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1468' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '11' }
          },
          {
            source: 'iranica-bosworth-azarbaijan-iv',
            loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1478-01-05', notAfter: '1478-01-06' },
        cites: [
          {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '13' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '14' }
        }
      ]
    },
    {
      ref: 'polity:qara-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '11' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '13' }
        }
      ]
    },
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'aq-qoyunlu',
      name: 'Aq Qoyunlu',
      polity: 'polity:aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '14' }
        }
      ]
    },
    {
      key: 'timurids',
      name: 'Timurids',
      polity: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:uzun-hasan',
      role: 'leader',
      side: 'aq-qoyunlu',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '14' }
        }
      ]
    },
    {
      ref: 'person:abu-said-mirza',
      role: 'combatant',
      side: 'timurids',
      cites: [
        {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        }
      ]
    },
    {
      name: 'Ambrogio Contarini',
      role: 'diplomat',
      cites: [
        {
          source: 'hakluyt-1873-travels-to-tana-and-persia',
          loc: { section: 'BRIEF ACCOUNT OF THE DOMINIONS OF USSUNCASSAN', para: '563' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      value: {
        alts: [
          {
            value: { min: 100000, qualifier: 'over' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '17' }
              }
            ]
          }
        ]
      }
    }
  ],
  related: [
    { ref: 'event:fall-of-jahan-shah', rel: 'preceded-by' },
    { ref: 'event:battle-of-otlukbeli', rel: 'related' },
    { ref: 'event:aq-qoyunlu-civil-wars', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Āq Qoyunlū empire reached its zenith under Uzun Ḥasan. He was the first of their rulers to declare himself an independent sultan, and as a token of this status, he began to send a splendid maḥmel (brocade-covered litter) with the annual pilgrim caravan to Mecca.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The Timurid Abū Saʿīd, ruling in Herat since 855/1451, saw the Qara Qoyunlū chief’s death as a good occasion for recovery of the Iranian provinces that had been lost to the Turkmans. Hastily advancing from Khorasan, he overran ʿErāq-e ʿAǰam but lacked adequate reinforcements and had to seek shelter in winter quarters in Qarabāḡ, where the Āq Qoyunlū besieged him. He was taken prisoner in an attempted breakout in Raǰab, 873/January, 1469, and put to death soon afterward.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'With the conquest of Iran, not only did the Āq Qoyunlū center of power shift eastward, but Iranian influences were soon brought to bear on their method of government and their culture.',
          lang: 'en',
          cite: {
            source: 'iranica-quiring-zoche-aq-qoyunlu',
            loc: { section: 'AQ QOYUNLŪ', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
          }
        },
        {
          id: 'q4',
          text: 'His successors continued their struggles against the Ottomans for a while, but soon had to face a mightier enemy, the Safavids.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-iranian-history-islamic-period-3',
            loc: { section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period (page 3)', para: '29' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/iran-ii2-islamic-period-page-3'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q5',
          text: 'Azarbaijan passed to the rival Āq Qoyunlū leader Uzun Ḥasan and his successors, for whose reigns we possess important accounts of the beauties of Tabrīz from Venetian envoys anxious to forge an alliance with the White Sheep Turkmen against the Ottomans.',
          lang: 'en',
          cite: {
            source: 'iranica-bosworth-azarbaijan-iv',
            loc: { section: 'Azarbaijan iv. Islamic History to 1941', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/azerbaijan-iv'
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
            value: { d: '1469' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'With his last rival for hegemony over western Iran eliminated, Uzun Ḥasan immediately annexed the Iranian provinces up to the borders of Khorasan and moved his government from Āmed to Tabrīz, the traditional seat of authority that had been the capital of not only the Qara Qoyunlū and the Jalayerids but also the Il-khans.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1471' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '12' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'An Ottoman intervention in the Qaramān principality in late 875/early 1471 alarmed Uzun Ḥasan so much that he moved his garrison from Khorasan to the western frontier; relations between Tabrīz and Herat subsequently took a friendly turn, to their mutual benefit.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '12' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1476' },
            cites: [
              {
                source: 'iranica-quiring-zoche-aq-qoyunlu',
                loc: { section: 'AQ QOYUNLŪ', para: '17' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'According to an eyewitness account of a military review held by Ḵalīl b. Uzun Ḥasan, the governor of Fārs, in 881/1476, this governor alone commanded a standing force of 25,000 cavalry and 10,000 infantry plus auxiliaries.',
        lang: 'en',
        cite: {
          source: 'iranica-quiring-zoche-aq-qoyunlu',
          loc: { section: 'AQ QOYUNLŪ', para: '17' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/aq-qoyunlu-confederation'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ab/Hunting_Sultan_Uzun_Hasa_diptych%2C_1467-1473%2C_Aq_Qoyunlu.jpg/1280px-Hunting_Sultan_Uzun_Hasa_diptych%2C_1467-1473%2C_Aq_Qoyunlu.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hunting_Sultan_Uzun_Hasa_diptych,_1467-1473,_Aq_Qoyunlu.jpg',
    credit: { institution: 'National Library of Russia' },
    license: { id: 'public-domain' }
  }
})
