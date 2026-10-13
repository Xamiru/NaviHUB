import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'agha-mohammad-khans-rise',
  names: [
    { text: 'Agha Mohammad Khan’s rise to power', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1779-03-02' },
        cites: [
          {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1794-11' },
        cites: [
          {
            source: 'iranica-perry-zand-dynasty',
            loc: { section: 'ZAND DYNASTY', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:shiraz',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
        }
      ]
    },
    {
      ref: 'place:isfahan',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
        }
      ]
    },
    {
      ref: 'place:kerman',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:qajar-iran',
      cites: [
        { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '1' } }
      ]
    },
    {
      ref: 'polity:zand-iran',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'qajars',
      name: 'Qajars',
      polity: 'polity:qajar-iran',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
        }
      ]
    },
    {
      key: 'zands',
      name: 'Zands',
      polity: 'polity:zand-iran',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:agha-mohammad-khan-qajar',
      role: 'leader',
      side: 'qajars',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
        }
      ]
    },
    {
      ref: 'person:lotf-ali-khan-zand',
      role: 'leader',
      side: 'zands',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
        }
      ]
    },
    {
      ref: 'person:hajji-ebrahim-kalantar-shirazi',
      role: 'participant',
      side: 'zands',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:death-of-karim-khan-zand-and-the-succession-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
        }
      ]
    },
    {
      ref: 'event:coronation-of-agha-mohammad-khan-qajar',
      rel: 'led-to',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '6' }
        }
      ]
    },
    {
      ref: 'event:fall-of-lotf-ali-khan-zand',
      rel: 'contributed-to',
      cites: [
        {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
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
          text: 'For almost a decade, Āḡā Moḥammad was involved in a ceaseless campaign of warfare, diplomacy, and treachery to unify the Qajar factions, to expand and consolidate his hold on Iran’s northern provinces, to stave off threats from his brothers Mortażā-qolī and Reżā-qolī, and to defeat successive Zand pretenders.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q2',
          text: 'Āḡā Moḥammad’s salient characteristics were those which caused his death: avarice and cruelty.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'For the next ten years, while the Afsharid state of Khorasan fell victim to the rapacity of rival chieftains and incursions by Aḥmad Shah Dorrānī of Afghanistan, Moḥammad-Ḥasan battled against Āzād Khan Afḡān and Karīm Khan Zand for control of the western portion of Nāder’s empire.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q4',
          text: 'By all accounts, Āḡā Moḥammad was treated more as an honored guest than a prisoner throughout his sixteen years at Karīm Khan’s court.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Āḡā Moḥammad’s conduct at Kermān has come down as an exemplar of brutality: Nearly 20,000 women and children were given as slaves to the soldiers, and all adult males were either put to death or blinded.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
          }
        },
        {
          id: 'q6',
          text: 'However, it is chiefly owing to his eighteen years of tireless conquest and consolidation that Iran (in its modern extent) was finally integrated under a single monarch and thus enabled to weather the storms of the 19th and early 20th centuries.',
          lang: 'en',
          cite: {
            source: 'iranica-perry-aga-mohammad-khan-qajar',
            loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
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
            value: { d: '1779-03-02' },
            cites: [
              {
                source: 'iranica-perry-aga-mohammad-khan-qajar',
                loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'Aga Mahommed, son of Mahommed Ḥasan, the Kajar chief of Astarabad, a prisoner at large in Shiraz, was in the environs of that city awaiting intelligence of the old king’s decease, and, hearing it, instantly escaped to Mazandaran, there to gather his tribesmen together and compete for the crown of Persia.',
        lang: 'en',
        cite: { source: 'britannica-1911-persia', loc: { section: 'PERSIA', para: '1112' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Persia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1781' },
            cites: [
              {
                source: 'iranica-perry-aga-mohammad-khan-qajar',
                loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
              },
              {
                source: 'iranica-andreeva-russia-relations',
                loc: {
                  section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
                  para: '9'
                }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In 1781 a naval expedition under Count Voinovich attempted to establish a fortified trading post near Ašraf; but the Qajar chief invited the officers to an entertainment, took them prisoner, and obliged them to dismantle their fort and sail home',
        lang: 'en',
        cite: {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1785-02' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'ʿAli-Morād Khan (r. 1781-85) was faced with a resurgence of Qajar power and established his capital strategically at Isfahan.',
        lang: 'en',
        cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '7' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/zand-dynasty'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1791' },
            cites: [
              {
                source: 'iranica-perry-aga-mohammad-khan-qajar',
                loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'In 1206/1791 he was faced with renewed attacks on Gīlān by Mortażā-qolī Khan and an advance on Isfahan by Loṭf-ʿAlī Khan, the courageous and popular young Zand prince who had again rallied support in Fārs.',
        lang: 'en',
        cite: {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1792-07-21' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '9' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Qajar leader transported the remaining Zands, along with 12,000 families of their supporters from various Lak and Lor tribes, to Astarābād and Māzandarān; he demolished the walls of the city and, not content with all movable booty, had the pillars and doors of the palace taken to Tehran.',
        lang: 'en',
        cite: {
          source: 'iranica-perry-aga-mohammad-khan-qajar',
          loc: { section: 'ĀḠĀ MOḤAMMAD KHAN QĀJĀR', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/aga-mohammad-khan'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1794-11' },
            cites: [
              {
                source: 'iranica-perry-zand-dynasty',
                loc: { section: 'ZAND DYNASTY', para: '10' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Āḡā Moḥammad Khan Qājār had his last Zand enemy blinded and cruelly tortured before taking him back to Tehran for execution in Rabiʿ II 1209/November 1794.',
        lang: 'en',
        cite: { source: 'iranica-perry-zand-dynasty', loc: { section: 'ZAND DYNASTY', para: '10' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/zand-dynasty'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Agha_Mohammad_Khan_Qajar%2C_painting%2C_ca._1840.jpg/1280px-Agha_Mohammad_Khan_Qajar%2C_painting%2C_ca._1840.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Agha_Mohammad_Khan_Qajar,_painting,_ca._1840.jpg',
    credit: { institution: 'Victoria and Albert Museum' },
    license: { id: 'public-domain' }
  }
})
