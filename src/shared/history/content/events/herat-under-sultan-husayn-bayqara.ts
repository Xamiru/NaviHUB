import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'herat-under-sultan-husayn-bayqara',
  names: [
    { text: 'Herat under Sultan Husayn Bayqara', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'cultural',
  start: {
    alts: [
      {
        value: { d: '1469-03-24' },
        cites: [
          {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '4' }
          }
        ]
      },
      {
        value: { d: '1470' },
        cites: [
          {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '20' }
          },
          {
            source: 'iranica-central-asia-v',
            loc: { section: 'CENTRAL ASIA v. In the Mongol and Timurid Periods', para: '19' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1506-05-04' },
        cites: [
          {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '20' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:timurid-empire',
      cites: [
        {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:sultan-husayn-bayqara',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '1' }
        }
      ]
    },
    {
      ref: 'person:jami',
      role: 'participant',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
        }
      ]
    },
    {
      ref: 'person:ali-shir-navai',
      role: 'participant',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '11' }
        }
      ]
    },
    {
      ref: 'person:behzad',
      role: 'participant',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '13' }
        }
      ]
    },
    {
      name: 'Badīʿ-al-Zamān',
      role: 'combatant',
      cites: [
        {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '5' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:jami-and-the-naqshbandi-order-in-herat', rel: 'related' },
    { ref: 'event:ali-shir-navai-and-chaghatay-literature', rel: 'related' },
    { ref: 'event:behzad-and-the-herat-school', rel: 'related' },
    { ref: 'event:rise-of-muhammad-shaybani', rel: 'followed-by' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Solṭān-Ḥosayn Bāyqarā (r. 1470-1506, q.v.), who seized power after the initial period of internal struggle, is certainly the most famous Timurid ruler of Herat',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q2',
          text: 'The Herat royal court was celebrated in the whole Muslim East for its patronage of arts and scholarly activities, which attracted leading artists and scholars of the age.',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Under the Timurids, Herat assumed the role of the main capital of an empire that extended in the West as far as central Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        },
        {
          id: 'q4',
          text: 'Solṭān-Abu Saʿid (r. 1451-69), a descendent of Mirānšāh, succeeded in taking power in Herat with the help of Uzbek tribes.',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '19' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'In 913/1507, the Uzbek Moḥammad Šaybāni Khan took control of Herat, thus bringing to an end the rule of the Timurids in the Near East.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        },
        {
          id: 'q6',
          text: 'The fall of the Timurids under the pressure from the Shaybanids opened a period of unrest and struggle all over Khorasan.',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'Architecture was among the foremost areas of cultural life in which Ḥosayn Bāyqarā took a personal interest.',
          lang: 'en',
          cite: {
            source: 'iranica-roemer-hosayn-bayqara',
            loc: { section: 'ḤOSAYN BĀYQARĀ', para: '14' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
          }
        },
        {
          id: 'q8',
          text: 'The reforms of the fiscal and land systems intended under Solṭān-Ḥosayn Bāyqarā met with strong opposition from the Timurid amirs, and, therefore, were not effective',
          lang: 'en',
          cite: {
            source: 'iranica-herat-iii-history-medieval-period',
            loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://www.iranicaonline.org/articles/herat-iii'
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
            value: { d: '1469-03-24' },
            cites: [
              {
                source: 'iranica-roemer-hosayn-bayqara',
                loc: { section: 'ḤOSAYN BĀYQARĀ', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Ḥosayn then claimed the throne on 10 Ramażān 873/24 March 1469.',
        lang: 'en',
        cite: {
          source: 'iranica-roemer-hosayn-bayqara',
          loc: { section: 'ḤOSAYN BĀYQARĀ', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/hosayn-bayqara'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1501', approx: true },
            cites: [
              {
                source: 'iranica-herat-iii-history-medieval-period',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'After conquering Transoxiana, the Uzbek Shaybanids, under the leadership of Moḥammad Khan (d. 1510) threatened the territories governed by Solṭān-Ḥosayn Bāyqarā, from about 1501',
        lang: 'en',
        cite: {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
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
            value: { d: '1506' },
            cites: [
              {
                source: 'iranica-herat-iii-history-medieval-period',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'After the death of Solṭān-Ḥosayn during a military campaign against the Uzbeks in 1506, two of his sons, Badiʿ-al-Zamān Mirzā and Moẓaffar-Ḥosayn Mirzā, fought for the succession.',
        lang: 'en',
        cite: {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
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
            value: { d: '1507' },
            cites: [
              {
                source: 'iranica-herat-iii-history-medieval-period',
                loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In 1507, when the army of Moḥammad Khan Šaybāni (Šibak Khan) arrived at Herat, only the garrison, besieged in the citadel, resisted, while the notables surrendered the town without fight',
        lang: 'en',
        cite: {
          source: 'iranica-herat-iii-history-medieval-period',
          loc: { section: 'HERAT iii. HISTORY, MEDIEVAL PERIOD', para: '22' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://www.iranicaonline.org/articles/herat-iii'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/68/A_Convivial_Gathering_at_the_Court_of_Sultan_Husayn_Bayqara_in_Herat_%28Husayn_Bayqara_detail%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:A_Convivial_Gathering_at_the_Court_of_Sultan_Husayn_Bayqara_in_Herat_(Husayn_Bayqara_detail).jpg',
    credit: { institution: 'National Library of Egypt' },
    license: { id: 'public-domain' }
  }
})
