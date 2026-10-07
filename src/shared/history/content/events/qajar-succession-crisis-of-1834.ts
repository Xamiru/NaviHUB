import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'qajar-succession-crisis-of-1834',
  names: [
    { text: 'Qajar succession crisis of 1834', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1834-10-24' },
        cites: [
          {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '1' }
          },
          {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
          }
        ]
      },
      {
        value: { d: '1834-10-22' },
        cites: [
          {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
          }
        ],
        heldBy: [
          { kind: 'scholar', name: 'Gavin R. G. Hambly' }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1835-07-22' },
        cites: [
          {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:isfahan',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      ref: 'place:tabriz',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      ref: 'place:shiraz',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '8' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:qajar-dynasty' }
  ],
  sides: [
    {
      key: 'mohammad',
      name: 'Moḥammad Mirzā',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      key: 'fars',
      name: 'the southerners',
      cites: [
        {
          source: 'iranica-hambly-farmanfarma',
          loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:mohammad-shah-qajar',
      role: 'leader',
      side: 'mohammad',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      ref: 'person:fath-ali-shah-qajar',
      role: 'head-of-state',
      cites: [
        {
          source: 'iranica-amanat-fath-ali-shah',
          loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '35' }
        }
      ]
    },
    {
      ref: 'person:abolqasem-qaem-maqam-farahani',
      role: 'organizer',
      side: 'mohammad',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '9' }
        }
      ]
    },
    {
      ref: 'person:hosayn-ali-mirza-farmanfarma',
      role: 'leader',
      side: 'fars',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '8' }
        }
      ]
    },
    {
      name: 'Ḥasan-ʿAli Mirzā Šojāʿ-al-Salṭana',
      role: 'commander',
      side: 'fars',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '8' }
        }
      ]
    },
    {
      name: 'ʿAli Mirzā Ẓell-al-Solṭān',
      role: 'leader',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      name: 'Manučehr Khan Moʿtamed-al-Dawla',
      role: 'commander',
      side: 'mohammad',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '8' }
        }
      ]
    },
    {
      name: 'Henry Lindesay-Bethune',
      role: 'commander',
      side: 'mohammad',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      name: 'John Campbell',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        }
      ]
    },
    {
      name: 'Comte Simonich',
      role: 'diplomat',
      cites: [
        {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
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
          text: 'ʿAbbās Mīrzā died at Mašhad, aged forty-four, on 10 Jomādā II 1249/25 October 1833, and was buried in the shrine of Imam Reżā',
          lang: 'en',
          cite: {
            source: 'iranica-busse-abbas-mirza',
            loc: { section: 'ʿABBĀS MĪRZĀ QAJAR', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/abbas-mirza'
          }
        },
        {
          id: 'q2',
          text: 'The succession crisis and accession. As in the case with his father ʿAbbās Mirzā, in the absence of any clear order of succession and the limited authority of the Shah in this respect, Moḥammad Mirzā’s position long remained in jeopardy.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q3',
          text: 'But his death not only deprived the shah of a beloved son and a capable successor, who in his later years served almost as an equal partner to his aging and demoralized father, but faced Fatḥ-ʿAlī Shah with a stiff resistance to his decision to bypass his surviving senior sons in succession and instead nominate as heir-apparent the young Moḥammad Mīrzā, ʿAbbās Mīrzā’s senior son.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        },
        {
          id: 'q4',
          text: 'To limit frictions between contending claimants, the Shah held an assembly (šurā) to confirm Moḥammad Mirzā as nāyeb-al-salṭana (20 June 1834), thereby fulfilling the common wish of Russian and British powers (Ebrahimnejad, pp. 289-90).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q5',
          text: 'Most significantly, Ḥosayn-ʿAlī Mīrzā, the Farmānfarmā of Fārs, viewed the nomination not only as a personal affront to his own rightful position but a sign of the shah’s surrender to a pro-Russian interpretation of Article 13 of the Treaty of Torkamānčāy, which guaranteed ʿAbbās Mīrzā’s succession (Hurowitz, I, pp. 234; Amanat, 1997, p. 22).',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-fath-ali-shah',
            loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '35' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fath-ali-shah'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'Disorders everywhere, and particularly in the south, had obliged Fatḥ-ʿAli Shah to undertake his last campaign. His death at Isfahan (24 October 1834) stirred up succession disputes and intrigues.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q7',
          text: 'When the news reached Tabriz in early November, the British and Russian envoys, John Campbell and Comte Simonich, hailed Moḥammad Mirzā as king, “conjunctly and separately” (Ingram, p. 318).',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q8',
          text: 'Under both Russian and British diplomatic protection, Moḥammad headed for Tehran, where ʿAli Mirzā Ẓell-al-Solṭān (ʿAbbās Mirzā’s full brother) had proclaimed himself shah.',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q9',
          text: 'On the news of the king’s death reaching Shiraz, Ḥosayn-ʿAlī had his name read in the ḵoṭba and coins were struck in his name, gold and silver in Shiraz and silver in Yazd and Kermān.',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
          }
        },
        {
          id: 'q10',
          text: 'Ḥosayn-ʿAlī had failed to anticipate the role of the British and Russian missions which had provided the heir-apparent with funds and military assistance, and, in fact, the force that defeated Šojāʿal-Solṭana near Qomša, while led by Manūčehr Khan Moʿtamed-al-Dawla, included British officers who had marched with the new king from Tabrīz to Tehran and whose horse-artillery under Lt. Henry Lindesay-Bethune, probably determined the defeat of the southerners',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q11',
          text: 'The accession of Moḥammad Shah in 1834 clearly demonstrated the commitment of both powers to the continuity of the Qajar rule and the order of succession in the house of ʿAbbās Mirzā, deemed essential for a lasting buffer state.',
          lang: 'en',
          cite: {
            source: 'iranica-amanat-great-britain-ii',
            loc: {
              section: 'GREAT BRITAIN ii. British influence in Persia in the 19th century',
              para: '11'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-ii/'
          }
        },
        {
          id: 'q12',
          text: 'On their way to Tabriz (July 1834), he had Moḥammad Mirzā’s brothers (Jahāngir Mirzā, Ḵosrow Mirzā, and two younger brothers) imprisoned at Ardabil, and, upon Moḥammad’s accession, he had Jahāngir and Ḵosrow blinded',
          lang: 'en',
          cite: {
            source: 'iranica-calmard-mohammad-shah',
            loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/mohammad-shah'
          }
        },
        {
          id: 'q13',
          text: 'A curious postscript to the fall of Ḥosayn-ʿAlī Mīrzā concerns the adventures of three of his nineteen sons, who, with the prompting of their father and apparently assisted by some minor British consular officials acting without instructions, managed to escape from Persia and make their way to England, at first causing some diplomatic embarrassment but thereafter enjoying the protection and pensions of successive British governments',
          lang: 'en',
          cite: {
            source: 'iranica-hambly-farmanfarma',
            loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
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
            value: { d: '1834-10-24' },
            cites: [
              {
                source: 'iranica-amanat-fath-ali-shah',
                loc: { section: 'FATḤ-ʿALĪ SHAH QĀJĀR', para: '1' }
              },
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
              }
            ]
          },
          {
            value: { d: '1834-10-22' },
            cites: [
              {
                source: 'iranica-hambly-farmanfarma',
                loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Gavin R. G. Hambly' }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Fatḥ-ʿAlī Shah died in Isfahan (19 Jomādā II/22 October 1834) on his way to Shiraz to extract from Ḥosayn-ʿAlī the taxes that had been in arrears for four years.',
        lang: 'en',
        cite: {
          source: 'iranica-hambly-farmanfarma',
          loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1834-11-09' },
            cites: [
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'The day after Moḥammad’s accession at Tabriz (9 November 1834), a force set out for Tehran under the command of Colonel Henry Lindesay-Bethune, who had previously served in Persia (on him, see Wright, 1977, pp. 52-58).',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/mohammad-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1834-12-04' },
            cites: [
              {
                source: 'iranica-hambly-farmanfarma',
                loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'A formal enthronement took place on the 3 Shaʿbān 1250/4 December 1834.',
        lang: 'en',
        cite: {
          source: 'iranica-hambly-farmanfarma',
          loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1835-01-14' },
            cites: [
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'After his coronation (14 Ramażān 1250/14 January 1835), Moḥammad Shah gave governorship of provinces to Qajar princes that he felt were loyal to the dynasty (Ḵormuji, pp. 23-24).',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/mohammad-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1835-02' },
            cites: [
              {
                source: 'iranica-calmard-mohammad-shah',
                loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q18',
        text: 'To quell this rebellion, in February 1835, Moḥammad Shah dispatched Manučehr Khan Moʿtamed-al-Dawla, with a force under the command of Lindesay-Bethune.',
        lang: 'en',
        cite: {
          source: 'iranica-calmard-mohammad-shah',
          loc: { section: 'MOḤAMMAD SHAH QĀJĀR', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/mohammad-shah'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1835-07-22' },
            cites: [
              {
                source: 'iranica-hambly-farmanfarma',
                loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '8' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q19',
        text: 'Ḥosayn-ʿAlī died in confinement on 22 July 1835 from cholera.',
        lang: 'en',
        cite: {
          source: 'iranica-hambly-farmanfarma',
          loc: { section: 'FARMĀNFARMĀ, ḤOSAYN-ʿALĪ MĪRZĀ', para: '8' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/farmanfarma-hosayn-ali-mirza'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/2c/Portrait_of_Muhammad_Shah_Qadjar_-_MV_6700_-_v1.JPG',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Muhammad_Shah_Qadjar_-_MV_6700_-_v1.JPG',
    credit: { institution: 'Musée du Louvre', creator: 'Muhammad Hasan Afshar' },
    license: { id: 'public-domain' }
  }
})
