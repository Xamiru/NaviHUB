import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'khosrow-mirza-mission-to-saint-petersburg',
  names: [
    { text: 'Khosrow Mirza’s mission to Saint Petersburg', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1829-04-21' },
        cites: [
          {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1830-03-15' },
        cites: [
          {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '7' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'russia-central-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:moscow',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '4' }
        }
      ]
    },
    {
      ref: 'place:saint-petersburg',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '5' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  participants: [
    {
      ref: 'person:khosrow-mirza-qajar',
      role: 'leader',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '2' }
        }
      ]
    },
    {
      ref: 'person:nicholas-i-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '5' }
        }
      ]
    },
    {
      ref: 'person:ivan-paskevich',
      role: 'participant',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '4' }
        }
      ]
    },
    {
      name: 'Mirzā Taqi Khan Farāhāni',
      role: 'participant',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '3' }
        }
      ]
    },
    {
      name: 'Mirzā Moṣṭafā Afšār',
      role: 'witness',
      cites: [
        {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '8' }
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
          text: 'Following the murder of Alexander Griboedov, the envoy and minister plenipotentiary of Russia in Tehran (wazir-e moḵtār) in 1829, and the massacre of the entire Russian legation, save one, by an angry mob, the government of Iran, fearing that Griboedov’s death might provoke the Russians to start a new war, dispatched a mission with valuable gifts and an official letter of apology from Fatḥ-ʿAli Shah to Tsar Nicholas I',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
          }
        },
        {
          id: 'q2',
          text: 'In Šawwāl 1244/April 1829, Ḵosrow Mirzā left for the mission, accompanied by a large entourage, which included Mirzā Moḥammad Khan Zangana (amir-e neẓām), Mirzā Masʿud Garmrudi (ʿAbbās Mirzā’s chief secretary [monši]), Mirzā Ṣāleḥ Širāzi (Iranian envoy to Tbilisi), Ḥosayn-ʿAli Beg (Ḵosrow Mirzā’s tutor), Mirzā Taqi Khan Farāhāni (the future Amir-e Kabir), Mirzā Bābā Afšār (physician), Fāżel Khan Garrusi (poet), Moḥammad-Ḥosayn Khan (the chief chamberlain of ʿAbbās Mirzā), Magniago de Borea (Ḵosrow Mirzā’s French tutor), and Batholomeo Semino (a military advisor to ʿAbbās Mirzā)',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'In exchange for the official gifts from the shah, which included a large diamond that Nāder Shah Afšār had brought from India as war booty (see Kelly, p. 201), carpets, rare manuscripts, and a pearl necklace; in return Russia gave fabulous gifts of crystal, porcelain, furs, and other items to the prince and senior members of his delegation.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
          }
        }
      ]
    },
    {
      kind: 'memory',
      quotes: [
        {
          id: 'q4',
          text: 'Fortunately, both Iranians and Russians kept a detailed account of the trip.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
          }
        },
        {
          id: 'q5',
          text: 'Mirzā Moṣṭafā Afšār, the secretary of Mirzā Masʿud, accompanied the group and kept a journal (safar-nama) of the trip.',
          lang: 'en',
          cite: {
            source: 'iranica-bournoutian-khosrow-mirza',
            loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
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
            value: { d: '1829-04-21' },
            cites: [
              {
                source: 'iranica-bournoutian-khosrow-mirza',
                loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'The delegation left Tabriz on 21 April 1829 (16 Šawwāl 1244) and crossed the Aras river on May 9.',
        lang: 'en',
        cite: {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1829-07-26' },
            cites: [
              {
                source: 'iranica-bournoutian-khosrow-mirza',
                loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'They arrived in Moscow on July 26, after an arduous journey by carriage through difficult roads and mountain passes.',
        lang: 'en',
        cite: {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1829-08-22' },
            cites: [
              {
                source: 'iranica-bournoutian-khosrow-mirza',
                loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '5' }
              },
              {
                source: 'iranica-bournoutian-khosrow-mirza',
                loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The official apology ceremony in which the prince read Fatḥ-ʿAli Shah’s letter to Tsar Nicholas I took place in the Winter Palace on August 22 (Bournoutian, pp. 160-62) and has been recreated in the 2002 Russian film Russian Ark, directed by Alexander Sokurov.',
        lang: 'en',
        cite: {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1830-02-27' },
            cites: [
              {
                source: 'iranica-bournoutian-khosrow-mirza',
                loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Having accomplished his mission, Ḵosrow Mirzā left St. Petersburg on 27 February 1830/4 Ramadan 1245 and arrived in Tabriz on 20 Ramadan 1245/15 March 1830.',
        lang: 'en',
        cite: {
          source: 'iranica-bournoutian-khosrow-mirza',
          loc: { section: 'ḴOSROW MIRZĀ QĀJĀR', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/khosrow-mirza/'
        }
      }
    }
  ]
})
