import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'abbas-mirza-khorasan-campaign',
  names: [
    { text: 'Khorasan campaign of Abbas Mirza', lang: 'en', role: 'primary' },
    { text: 'لشکرکشی عباس میرزا به خراسان', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1831-09-09' },
        cites: [
          {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1833' },
        cites: [
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['iran', 'south-asia'],
  prominence: 3,
  places: [
    {
      ref: 'place:mashhad',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
        }
      ]
    },
    {
      ref: 'place:herat',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-fath-ali-shah' },
    { ref: 'period:qajar-dynasty' }
  ],
  polities: [
    { ref: 'polity:qajar-iran' }
  ],
  participants: [
    {
      ref: 'person:abbas-mirza',
      role: 'commander',
      cites: [
        {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
        }
      ]
    },
    {
      ref: 'person:mohammad-shah-qajar',
      role: 'commander',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
        }
      ]
    },
    {
      ref: 'person:abolqasem-qaem-maqam-farahani',
      role: 'participant',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
        }
      ]
    },
    {
      ref: 'person:khosrow-mirza-qajar',
      role: 'commander',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
        }
      ]
    },
    {
      name: 'Kāmrān Mirzā',
      role: 'leader',
      cites: [
        {
          source: 'iranica-amanat-herat-vi',
          loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:qajar-succession-crisis-of-1834', rel: 'related' },
    { ref: 'event:russo-persian-war-1826-1828', rel: 'related' }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The crown prince’s position was always in jeopardy from the lack of any clear order of succession and the decentralizing policy of Fatḥ-ʿAlī Shah (factors which had an important effect on British and Russian attitudes).',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In the aftermath of Persia’s 1827 defeat in the second round of wars with Russia, the whole of Khorasan plunged into a phase of tribal insurrection. Fearing the immanent loss of the province to Afghans, Turkmans, and Kurds, in 1830 the shah summoned ʿAbbās Mirzā from Azarbaijan and gave him the task of pacifying Khorasan, a move that was bound to arouse British suspicion.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q3',
          text: 'ʿAbbās Mīrzā departed at once for the east and, in the summer and autumn of 1832, conquered the territory east and northeast of Mašhad—Ḵabūšān, Saraḵs, and Torbat-e Haydarī (Hedāyat, X, pp. 52, 55).',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q4',
          text: 'By 1833, after sweeping campaigns against the local chiefs of Khorasan and the Turkman chiefs of the Saraḵs frontier, ʿAbbās Mirzā was ready to move on Herat, in part to underscore his military prowess but also to carry out Russian strategic wishes in the east, as directed through diplomatic channels in the Tehran court.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q5',
          text: 'In the face of Kāmrān’s intransigence, two of ʿAbbās Mirzā’s senior sons, Moḥammad Mirzā and Ḵosrow Mirzā, accompanied by the crown prince’s capable minister, Mirzā Abu’l-Qāsem Qāʾem-maqām Farahāni, were instructed to lay siege to the seemingly penetrable Herat.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'When Moḥammad Mīrzā succeeded Fatḥ-ʿAlī Shah in 1834 and tried to continue that task in the east which Āqā Moḥammad Shah had already begun, he was checked by British intervention, just as his father had been thwarted by Russia on the Aras.',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q6',
          text: 'However, news of ʿAbbās’s death in Mašhad in November 1833 compelled Moḥammad Mirzā to lift the siege and return to the capital, where he was installed as the new crown prince.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
          }
        },
        {
          id: 'q7',
          text: 'The relieved Kāmrān Mirzā agreed only to pay an annual tribute to Tehran (Hedāyat, X, pp. 30-31, 56-61).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-herat-vi',
            loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/herat-vi'
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
            value: { d: '1831-01-21' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'He arrived at the Tehran court on 12 Šaʿbān 1246/21 January 1831.',
        lang: 'en',
        cite: {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/abbas-mirza'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1831-09-09' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On 1 Rabīʿ II 1247/9 September 1831, the crown prince was again with the shah at Deh Kord near Isfahan.',
        lang: 'en',
        cite: {
          source: 'iranica-busse-abbas-mirza',
          loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/abbas-mirza'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1833-10-25' },
            cites: [
              {
                source: 'iranica-busse-abbas-mirza',
                loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '8' }
              },
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '4' }
              }
            ]
          },
          {
            value: { d: '1833-11' },
            cites: [
              {
                source: 'iranica-amanat-herat-vi',
                loc: { section: 'HERAT vi. THE HERAT QUESTION', para: '9' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Abbas Amanat' }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'After his conquests in Khorasan (fall 1832), ʿAbbās Mirzā entrusted him with the preparation of a major offensive on Herat and perhaps Marv, but ʿAbbās Mirzā’s death at Mašhad (25 October 1833) put an end to this plan.',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/mohammad-shah'
        }
      }
    }
  ]
})
