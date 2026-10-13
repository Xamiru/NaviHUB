import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-lepanto',
  names: [
    { text: 'Battle of Lepanto', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1571-10' },
        cites: [
          {
            source: 'britannica-1911-lepanto-battle-of',
            loc: { section: 'Lepanto, Battle of', para: '1' }
          },
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1376' } }
        ]
      },
      {
        value: { d: '1572' },
        cites: [
          {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'Charles V and Philip II', para: '6' }
          }
        ],
        heldBy: [
          { kind: 'organization', name: 'Library of Congress, Spain: A Country Study' }
        ]
      }
    ]
  },
  regions: ['europe', 'mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:lepanto',
      cites: [
        {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:spanish-empire',
      cites: [
        {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        }
      ]
    },
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'holy-league',
      name: 'Holy League',
      cites: [
        {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        }
      ]
    },
    {
      key: 'ottoman',
      name: 'Turks',
      polity: 'polity:ottoman-empire',
      cites: [
        {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Don John of Austria',
      role: 'commander',
      side: 'holy-league',
      cites: [
        {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        }
      ]
    },
    {
      ref: 'person:philip-ii',
      role: 'leader',
      side: 'holy-league',
      cites: [
        {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        }
      ]
    },
    {
      name: 'Ali Pasha',
      role: 'commander',
      side: 'ottoman',
      cites: [
        {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      side: 'ottoman',
      value: {
        alts: [
          {
            value: { min: 20000 },
            cites: [
              {
                source: 'britannica-1911-lepanto-battle-of',
                loc: { section: 'Lepanto, Battle of', para: '2' }
              }
            ]
          }
        ]
      }
    },
    {
      key: 'deaths',
      side: 'holy-league',
      value: {
        alts: [
          {
            value: { min: 8000 },
            cites: [
              {
                source: 'britannica-1911-lepanto-battle-of',
                loc: { section: 'Lepanto, Battle of', para: '2' }
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
          id: 'q1',
          text: 'On the 7th of October was fought the naval battle of Lepanto, which broke for ever the tradition of the invincibility of the Turks at sea.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1376' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q2',
          text: 'The battle of Lepanto was of immense political importance.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lepanto-battle-of',
            loc: { section: 'Lepanto, Battle of', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lepanto,_Battle_of'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The conquest of Cyprus by the Turks, and their aggressions on the Christian powers, frightened the states of the Mediterranean into forming a holy league for their common defence.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lepanto-battle-of',
            loc: { section: 'Lepanto, Battle of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lepanto,_Battle_of'
          }
        },
        {
          id: 'q4',
          text: 'The main promoter of the league was Pope Pius V., but the bulk of the forces was supplied by the republic of Venice and Philip II. of Spain, who was peculiarly interested in checking the Turks both because of the Moorish element in the population of Spain, and because he was also sovereign of Naples and Sicily.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lepanto-battle-of',
            loc: { section: 'Lepanto, Battle of', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lepanto,_Battle_of'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The immediate results of the battle were not, however, as decisive as might have been expected.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1376' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q6',
          text: 'After a series of indecisive engagements Venice broke from the league and, under the mediation of France, concluded a treaty with the Porte practically on the basis of uti possidetis (March 7, 1573).',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1376' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q7',
          text: 'Historically the battle is interesting because it was the last example of an encounter on a great scale between fleets of galleys and also because it was the last crusade.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lepanto-battle-of',
            loc: { section: 'Lepanto, Battle of', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lepanto,_Battle_of'
          }
        },
        {
          id: 'q8',
          text: 'It gave the naval power of the Turks a blow from which it never recovered, and put a stop to their aggression in the Eastern Mediterranean.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-lepanto-battle-of',
            loc: { section: 'Lepanto, Battle of', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lepanto,_Battle_of'
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
            value: { d: '1571-05' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1376' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Already, on the 25th of May, had been concluded the holy league between the pope, Venice and Spain for a new crusade against the infidel, in spite of the efforts of France to prevent the adhesion of the republic.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1376' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1571-10' },
            cites: [
              {
                source: 'britannica-1911-lepanto-battle-of',
                loc: { section: 'Lepanto, Battle of', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On the 7th of October the Christian fleet advanced to the neighbourhood of Cape Scropha.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lepanto,_Battle_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1571-10' },
            cites: [
              {
                source: 'britannica-1911-lepanto-battle-of',
                loc: { section: 'Lepanto, Battle of', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'Ali Pasha was slain and his galley taken.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lepanto,_Battle_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1571-10' },
            cites: [
              {
                source: 'britannica-1911-lepanto-battle-of',
                loc: { section: 'Lepanto, Battle of', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Everywhere on the centre the Christians gained the upper hand, but their victory was almost turned into a defeat by the mistaken manœuvres of Doria.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '1' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lepanto,_Battle_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1571-10' },
            cites: [
              {
                source: 'britannica-1911-lepanto-battle-of',
                loc: { section: 'Lepanto, Battle of', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'The loss of life in the battle was enormous, being put at 20,000 for the Turks and 8000 for the Christians.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-lepanto-battle-of',
          loc: { section: 'Lepanto, Battle of', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Lepanto,_Battle_of'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ae/Battle_of_Lepanto%2C_1571_%28by_Andrea_Vicentino%29_-_Doge%27s_Palace%2C_Venice.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Lepanto,_1571_(by_Andrea_Vicentino)_-_Doge%27s_Palace,_Venice.jpg',
    credit: { creator: 'Andrea Vicentino' },
    license: { id: 'public-domain' }
  }
})
