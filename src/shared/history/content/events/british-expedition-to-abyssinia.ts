import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'british-expedition-to-abyssinia',
  names: [
    { text: 'British expedition to Abyssinia', lang: 'en', role: 'primary' },
    { text: 'Fall of Magdala', lang: 'en', role: 'alternative' }
  ],
  researched: '2026-10-08',
  type: 'expedition',
  start: {
    alts: [
      {
        value: { d: '1868-01-07' },
        cites: [
          { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1868-05' },
        cites: [
          { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:magdala',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
      ]
    }
  ],
  sides: [
    {
      key: 'british',
      name: 'the English troops',
      polity: 'polity:united-kingdom',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
      ]
    },
    {
      key: 'ethiopia',
      name: 'Theodore',
      polity: 'polity:ethiopian-empire',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:tewodros-ii',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '75' } },
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '3' }
        }
      ],
      side: 'ethiopia'
    },
    {
      name: 'Sir Robert Napier',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
      ],
      side: 'british'
    },
    {
      name: 'Hormuzd Rassam',
      role: 'diplomat',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '75' } }
      ]
    },
    {
      name: 'Captain C. D. Cameron',
      role: 'diplomat',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '75' } }
      ]
    },
    {
      name: 'Dejaj Kassai of Tigré',
      role: 'participant',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
      ]
    },
    {
      ref: 'person:queen-victoria',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '75' } },
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
      ],
      side: 'british'
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'british',
      value: {
        alts: [
          {
            value: { min: 16000, qualifier: 'over' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '76' }
              }
            ]
          }
        ]
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bd/Map_of_the_portion_of_Abyssinia_traversed_by_the_British_expedition_in_1868_from_Annesley_Bay_to_Magdala..png/1280px-Map_of_the_portion_of_Abyssinia_traversed_by_the_British_expedition_in_1868_from_Annesley_Bay_to_Magdala..png',
    page: 'https://commons.wikimedia.org/wiki/File:Map_of_the_portion_of_Abyssinia_traversed_by_the_British_expedition_in_1868_from_Annesley_Bay_to_Magdala..png',
    credit: { institution: 'Henry M. Stanley, Coomassie and Magdala' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In addition to his conflicts with rebels and rivals, Tewodros encountered difficulties with the European powers.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        },
        {
          id: 'q2',
          text: 'Seeking aid from the British government (he proposed a joint expedition to conquer Jerusalem), he became unhappy with the behavior of those Britons whom he had counted on to advance his request, and he took them hostage.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        },
        {
          id: 'q3',
          text: 'In 1868, as a British expeditionary force sent from India to secure release of the hostages stormed his stronghold, Tewodros committed suicide.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'In October Captain Cameron was sent home by Theodore, with a letter to the queen of England, which reached the Foreign Office on the 12th of February 1863.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '75' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        },
        {
          id: 'q5',
          text: 'This letter was put aside and no answer returned, and to this in no small degree are to be attributed the difficulties that subsequently arose with that country.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '75' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        },
        {
          id: 'q6',
          text: 'In the meantime the power of Theodore in the country was rapidly waning.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q7',
          text: 'The inhabitants and troops were subsequently sent away, the fortifications destroyed and the town burned.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        },
        {
          id: 'q8',
          text: 'The queen Terunish having expressed her wish to go back to her own country, accompanied the British army, but died during the march, and her son Alamayahu, the only legitimate son of the emperor, was brought to England, as this was the desire of his father.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q9',
          text: 'The success of the expedition was in no small degree owing to the aid afforded by the several native chiefs through whose country it passed, and no one did more in this way than Dejaj Kassa or Kassai of Tigré.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        },
        {
          id: 'q10',
          text: 'Tewodros never realized his dream of restoring a strong monarchy, although he took some important initial steps.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1864-01' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '75' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'In November despatches were received from England, but no answer to the emperor’s letter, and this, together with a visit paid by Captain Cameron to the Egyptian frontier town of Kassala, greatly offended him; accordingly in January 1864 Captain Cameron and his suite, with Messrs Stern and Rosenthal, were cast into prison.',
        lang: 'en',
        cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '75' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1866-01-25' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '75' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Later in the year Theodore became more civil, and the British party on arrival at the king’s camp in Damot, on the 25th of January 1866, were received with all honour, and were afterwards sent to Kwarata, on Lake Tsana, there to await the arrival of the captives.',
        lang: 'en',
        cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '75' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1867-07' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '76' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'In July 1867, therefore, it was resolved to send an army into Abyssinia to enforce the release of the captives, under Sir Robert Napier (1st Baron Napier of Magdala).',
        lang: 'en',
        cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868-01-07' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '76' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'The commander-in-chief landed on the 7th of January 1868, and soon after the troops began to move forward through the pass of Senafé, and southward through the districts of Agamé, Tera, Endarta, Wojerat, Lasta and Wadela.',
        lang: 'en',
        cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868-04-10' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '76' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On the afternoon of the 10th of April a force of about 3000 men suddenly poured down upon the English in the plain of Arogié, a few miles from Magdala.',
        lang: 'en',
        cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868-04-13' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '76' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q16',
        text: 'The same day (13th April) Magdala was stormed and taken, practically without loss, and within they found the dead body of the emperor, who had fallen by his own hand.',
        lang: 'en',
        cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1868-05' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '76' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q17',
        text: 'In acknowledgment of this, several pieces of ordnance, small arms and ammunition, with much of the surplus stores, were handed over to him, and the English troops left the country in May 1868.',
        lang: 'en',
        cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'bahru-zewde-1991-a-history-of-modern-ethiopia', perspective: 'african' },
    { source: 'rubenson-1966-king-of-kings-tewodros', perspective: 'european' }
  ]
})
