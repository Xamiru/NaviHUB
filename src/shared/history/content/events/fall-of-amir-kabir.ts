import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'fall-of-amir-kabir',
  names: [
    { text: 'Fall and execution of Amir Kabir', lang: 'en', role: 'primary' },
    { text: 'عزل و قتل امیرکبیر', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1851-11-16' },
        cites: [
          {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1852-01-10' },
        cites: [
          {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
          }
        ]
      },
      {
        value: { d: '1851' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
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
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
        }
      ]
    },
    {
      ref: 'place:kashan',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-naser-al-din-shah-qajar' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:amir-kabir',
      role: 'victim',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
        }
      ]
    },
    {
      ref: 'person:naser-al-din-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
        }
      ]
    },
    {
      ref: 'person:mirza-aqa-khan-nuri',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
        }
      ]
    },
    {
      name: 'the queen mother',
      role: 'organizer',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
        }
      ]
    },
    {
      name: 'ʿAlī Khan Moqaddam',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
        }
      ]
    },
    {
      name: 'Justin Sheil',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-amanat-great-britain-ii',
          loc: {
            section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
            para: '13'
          }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:founding-of-the-dar-al-fonun', rel: 'related' },
    { ref: 'event:reforms-of-amir-kabir', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'When Naser ad Din acceded to the throne in 1848, his prime minister, Mirza Taqi Khan Amir Kabir, attempted to strengthen the administration by reforming the tax system, asserting central control over the bureaucracy and the provincial governors, encouraging trade and industry, and reducing the influence of the Islamic clergy and foreign powers.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q2',
          text: 'His appointment as the chief minister aroused resentment in various persons who thought themselves more deserving, particularly Mīrzā Āqā Khan Nūrī Eʿtemād-al-dawla, and also in the queen mother, who evidently resented Amīr Kabīr’s proud and self-confident bearing.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q3',
          text: 'This measure increased his unpopularity with many influential figures and thus contributed to his ultimate disgrace and death.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q11',
          text: '1852 Mirzā Taqi Khan Amir Kabir (b. 1807), reformist and capable prime minister, is executed by order of Nāṣer-al-Din Shah.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-2',
            loc: { section: 'Chronology of Iranian History Part 2, 1927' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-2/'
          }
        },
        {
          id: 'q4',
          text: 'He was dismissed and put to death in 1851, a fate shared by earlier powerful prime ministers.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/12.htm' }
        },
        {
          id: 'q5',
          text: 'The chasm between the premier and the British envoy grew deeper by the time of his downfall and his secret execution in early 1852.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'In 1266/1850, bast was abolished, for example, at the Masǰed-e Šāh in Tehran, although it was restored after the downfall of Amīr Kabīr.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
          }
        },
        {
          id: 'q6',
          text: 'Later on, however, the Foreign Office was exceptionally vocal in its strong condemnation of Nāṣer-al-Din Shah for the murder.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q8',
          text: 'Mīrzā Āqā Khan Nūrī, Amīr Kabīr’s successor, sought to persuade Nāṣer-al-dīn Shah to abrogate the whole project, but the Dār al-Fonūn soon became a posthumous monument to its founder.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-amir-kabir',
            loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
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
            value: { d: '1851-11-16' },
            cites: [
              {
                source: 'iranica-algar-amir-kabir',
                loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'The fruitful career of Amīr Kabīr came to a sudden end on 20 Moḥarram 1268/16 November 1851, when Nāṣer-al-dīn Shah dismissed him from the position of chief minister.',
        lang: 'en',
        cite: {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1852-01-10' },
            cites: [
              {
                source: 'iranica-algar-amir-kabir',
                loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
              }
            ]
          },
          {
            value: { d: '1851' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'THE QAJARS, 1795-1925', para: '4' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Soon after he was sent under armed escort to Kāšān, and after a period of forty days’ confinement was put to death in the bathhouse at Fīn, outside Kāšān, by the slashing of his wrists (17 Rabīʿ I 1268/10 January 1852).',
        lang: 'en',
        cite: {
          source: 'iranica-algar-amir-kabir',
          loc: { section: 'AMĪR KABĪR, MĪRZĀ TAQĪ KHAN', para: '14' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/amir-e-kabir-mirza-taqi-khan'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6f/Portrait_of_Amir_Kabir_by_Sani_al-Molk%2C_Islamic_Art_Museum%2C_Tehran_%281%29_%2845334166754%29.jpg/1280px-Portrait_of_Amir_Kabir_by_Sani_al-Molk%2C_Islamic_Art_Museum%2C_Tehran_%281%29_%2845334166754%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Amir_Kabir_by_Sani_al-Molk,_Islamic_Art_Museum,_Tehran_(1)_(45334166754).jpg',
    credit: {
      institution: 'Islamic Art Museum, Tehran',
      creator: 'Mirza Abolhassan Khan Ghaffari (Sani al-Molk)'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'adamiyat-1982-amir-kabir-va-iran', perspective: 'iranian' },
    { source: 'eqbal-1962-mirza-taqi-khan-amir-kabir', perspective: 'iranian' }
  ]
})
