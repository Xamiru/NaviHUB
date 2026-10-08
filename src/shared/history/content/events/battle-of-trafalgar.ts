import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-trafalgar',
  names: [
    { text: 'Battle of Trafalgar', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1805-10-21' },
        cites: [
          {
            source: 'fondation-napoleon-close-up-trafalgar',
            loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
          },
          {
            source: 'fondation-napoleon-nelson-biography',
            loc: { section: 'NELSON, Horatio', para: '14' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    { ref: 'place:cape-trafalgar' }
  ],
  partOf: [
    { ref: 'period:napoleonic-wars' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' }
  ],
  sides: [
    {
      key: 'britain',
      name: 'British fleet',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    },
    {
      key: 'france',
      name: 'French',
      polity: 'polity:first-french-empire',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    },
    {
      key: 'spain',
      name: 'Spanish',
      polity: 'polity:kingdom-of-spain',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:horatio-nelson',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    },
    {
      name: 'Admiral Villeneuve',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    },
    {
      name: 'Admiral Gravina',
      role: 'commander',
      side: 'spain',
      cites: [
        {
          source: 'fondation-napoleon-close-up-trafalgar',
          loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
        }
      ]
    },
    {
      name: 'Vice-Admiral Cuthbert Collingwood',
      role: 'commander',
      side: 'britain',
      cites: [
        {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '1' }
        }
      ]
    },
    {
      name: 'Admiral Dumanoir',
      role: 'commander',
      side: 'france',
      cites: [
        {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '3' }
        }
      ]
    },
    {
      name: 'Alava',
      role: 'commander',
      side: 'spain',
      cites: [
        {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '3' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'military-deaths',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 449 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 1214 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 3499 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 1138 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'prisoners',
      side: 'france',
      value: {
        alts: [
          {
            value: { min: 2200 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'military-deaths',
      side: 'spain',
      value: {
        alts: [
          {
            value: { min: 1050 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'wounded',
      side: 'spain',
      value: {
        alts: [
          {
            value: { min: 1390 },
            cites: [
              {
                source: 'fondation-napoleon-close-up-trafalgar',
                loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'casualties',
      side: 'britain',
      value: {
        alts: [
          {
            value: { min: 1690 },
            cites: [
              {
                source: 'britannica-1911-trafalgar-battle-of',
                loc: { section: 'TRAFALGAR, BATTLE OF', para: '6' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'The British victory over the French off Cape Trafalgar, fought on the 21st of October 1805, was a sequel of the breakdown of Napoleon\'s great scheme for the invasion of the British Isles',
          lang: 'en',
          cite: {
            source: 'britannica-1911-trafalgar-battle-of',
            loc: { section: 'TRAFALGAR, BATTLE OF', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trafalgar,_Battle_of'
          }
        },
        {
          id: 'q1',
          text: 'On 21 October, 1805, the allied Franco-Spanish fleet under Admiral Villeneuve was ‘annihilated’ by the British fleet under Admiral Nelson.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-close-up-trafalgar',
            loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-trafalgar-21-october-1805/'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q2',
          text: 'After four hours of particularly fierce fighting (indeed much fiercer than the British had expected) the French had had 15 ships captured (soon to be twenty), 3,499 killed or drowned, 1,138 wounded and 2,200 prisonniers, the Spanish had 1,050 killed (including the Admiral Gravina, commander of the Spanish Fleet) and 1,390 wounded. The British for their part had only 1,214 wounded and 449 killed, one of which was however Admiral Nelson, commander in chief of the British vessels.',
          lang: 'en',
          cite: {
            source: 'fondation-napoleon-close-up-trafalgar',
            loc: { section: 'A close-up on: Trafalgar, 21 October, 1805' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.napoleon.org/en/history-of-the-two-empires/close-up/a-close-up-on-trafalgar-21-october-1805/'
          }
        },
        {
          id: 'q11',
          text: 'The loss of life of the allies cannot be stated with precision. In the British fleet the reported loss in killed and wounded was 1690, of whom 1452 belonged to 14 out of the 27 ships of the line present—the inequality of loss being mainly due to the fact that it was as a rule these vessels which came earliest into action.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-trafalgar-battle-of',
            loc: { section: 'TRAFALGAR, BATTLE OF', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trafalgar,_Battle_of'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/30/The_Battle_of_Trafalgar%2C_21_October_1805_RMG_L8148-001.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Battle_of_Trafalgar,_21_October_1805_RMG_L8148-001.jpg',
    title: 'The Battle of Trafalgar, 21 October 1805',
    credit: { institution: 'National Maritime Museum, Greenwich', creator: 'J. M. W. Turner' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1805-08-20' },
            cites: [
              {
                source: 'britannica-1911-trafalgar-battle-of',
                loc: { section: 'TRAFALGAR, BATTLE OF', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q4',
        text: 'When Villeneuve gave up in despair the attempt to enter the Channel, he steered for Cadiz, and anchored in that port on the 20th of August 1805.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trafalgar,_Battle_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1805-09-28' },
            cites: [
              {
                source: 'britannica-1911-trafalgar-battle-of',
                loc: { section: 'TRAFALGAR, BATTLE OF', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q5',
        text: 'Nelson left Portsmouth on the 15th of September, and reached Cadiz on the 28th, bringing three ships of the line with him.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trafalgar,_Battle_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1805-10-18' },
            cites: [
              {
                source: 'britannica-1911-trafalgar-battle-of',
                loc: { section: 'TRAFALGAR, BATTLE OF', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'On the 18th of October Villeneuve heard that Rosily had reached Madrid, and of his own supersession. Stung by the prospect of being disgraced before the fleet, he resolved to go to sea before his successor could reach Cadiz.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trafalgar,_Battle_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1805-10-20' },
            cites: [
              {
                source: 'britannica-1911-trafalgar-battle-of',
                loc: { section: 'TRAFALGAR, BATTLE OF', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The allies, having left Cadiz on the 20th of October, were 33 sail of the line strong, one of the fleet having been left behind.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trafalgar,_Battle_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1805-10-21' },
            cites: [
              {
                source: 'britannica-1911-trafalgar-battle-of',
                loc: { section: 'TRAFALGAR, BATTLE OF', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The “Royal Sovereign” was the first British ship to break into the enemy\'s line, which she did about midday and astern of Alava\'s flagship the “Santa Ana.”',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trafalgar,_Battle_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1805-10-21' },
            cites: [
              {
                source: 'britannica-1911-trafalgar-battle-of',
                loc: { section: 'TRAFALGAR, BATTLE OF', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Nelson\'s division was headed by himself to cut through the enemy between his van and centre, and to bar his road to Cadiz. It was certainly in a nearer approach to a line ahead than Collingwood\'s. After making a demonstration at the allied van, he broke into their line astern of the “Bucentaure” (100), the flagship of Villeneuve.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trafalgar,_Battle_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1805-10-21' },
            cites: [
              {
                source: 'britannica-1911-trafalgar-battle-of',
                loc: { section: 'TRAFALGAR, BATTLE OF', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The battle, which began at midday, was terminated about five. Eighteen of the allies were taken.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-trafalgar-battle-of',
          loc: { section: 'TRAFALGAR, BATTLE OF', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Trafalgar,_Battle_of'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'marliani-1850-combate-de-trafalgar', perspective: 'european' }
  ]
})
