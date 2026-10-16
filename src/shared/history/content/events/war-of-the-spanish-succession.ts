import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'war-of-the-spanish-succession',
  names: [
    { text: 'War of the Spanish Succession', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1701' },
        cites: [
          {
            source: 'britannica-1911-spanish-succession-war-of-the',
            loc: { section: 'Spanish Succession, War of the', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1714' },
        cites: [
          {
            source: 'britannica-1911-spanish-succession-war-of-the',
            loc: { section: 'Spanish Succession, War of the', para: '1' }
          },
          {
            source: 'britannica-1911-spanish-succession-war-of-the',
            loc: { section: 'Spanish Succession, War of the', para: '31' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '2' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'alliance',
      name: 'Grand Alliance',
      cites: [
        {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '2' }
        }
      ]
    },
    {
      key: 'bourbon',
      name: 'France and Spain',
      polity: 'polity:kingdom-of-france',
      cites: [
        {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '2' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:louis-xiv',
      role: 'leader',
      side: 'bourbon',
      cites: [
        {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '1' }
        }
      ]
    },
    {
      name: 'Duke of Marlborough',
      role: 'commander',
      side: 'alliance',
      cites: [
        {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '1' }
        }
      ]
    },
    {
      name: 'Prince Eugene',
      role: 'commander',
      side: 'alliance',
      cites: [
        {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '1' }
        }
      ]
    },
    {
      name: 'Marshal Villars',
      role: 'commander',
      side: 'bourbon',
      cites: [
        {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:great-northern-war', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'SPANISH SUCCESSION, WAR OF THE, the name given to the general European war which began in 1701 and ended with the Treaties of Utrecht and Rastatt in 1713–14.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-spanish-succession-war-of-the',
            loc: { section: 'Spanish Succession, War of the', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spanish_Succession,_War_of_the'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The action of Louis XIV. in the matter of the Spanish succession was foreseen, and William III. of England had devoted his last years to providing against the emergency by the formation of a coalition to deal with it, and the production of a claimant for the Spanish throne, the archduke Charles.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-spanish-succession-war-of-the',
            loc: { section: 'Spanish Succession, War of the', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spanish_Succession,_War_of_the'
          }
        },
        {
          id: 'q3',
          text: 'On the other side Louis XIV. was supported by Spain—where Philip, recognized as heir by the dying Charles II., had been promptly installed—Bavaria and Cologne.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-spanish-succession-war-of-the',
            loc: { section: 'Spanish Succession, War of the', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spanish_Succession,_War_of_the'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'By the treaty between England and France Louis XIV. recognized the Protestant succession in England and undertook to give no further aid to the Stuarts.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-utrecht-treaty-of',
            loc: { section: 'Utrecht, Treaty of', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Utrecht,_Treaty_of'
          }
        },
        {
          id: 'q5',
          text: 'Spain ceded to England Gibraltar and Minorca and promised to give up Sicily to Savoy.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-utrecht-treaty-of',
            loc: { section: 'Utrecht, Treaty of', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Utrecht,_Treaty_of'
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
            value: { d: '1701-03' },
            cites: [
              {
                source: 'britannica-1911-spanish-succession-war-of-the',
                loc: { section: 'Spanish Succession, War of the', para: '3' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'The war began, to all intents and purposes, with the handing over of the fortresses in the Spanish Netherlands to the French in March 1701.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '3' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spanish_Succession,_War_of_the'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1704-08-13' },
            cites: [
              { source: 'britannica-1911-blenheim', loc: { section: 'Blenheim', para: '1' } },
              {
                source: 'britannica-1911-marlborough-john-churchill-1st-duke-of',
                loc: { section: 'Marlborough, John Churchill, 1st Duke of', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The two armies (that under Marlborough and Prince Eugène numbering more than fifty thousand men, whilst Tallard’s forces were nearly four thousand stronger) met in battle near the village of Blenheim on the left bank of the Danube.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-marlborough-john-churchill-1st-duke-of',
          loc: { section: 'Marlborough, John Churchill, 1st Duke of', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Marlborough,_John_Churchill,_1st_Duke_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1706-05-23', julian: true },
            cites: [
              { source: 'britannica-1911-ramillies', loc: { section: 'Ramillies', para: '1' } },
              {
                source: 'britannica-1911-marlborough-john-churchill-1st-duke-of',
                loc: { section: 'Marlborough, John Churchill, 1st Duke of', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Through the superior tactics of Marlborough the battle of Ramillies (May 23, 1706) ended in the total rout of the French, and caused the transference of nearly the whole of Brabant and Flanders to the allies.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-marlborough-john-churchill-1st-duke-of',
          loc: { section: 'Marlborough, John Churchill, 1st Duke of', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Marlborough,_John_Churchill,_1st_Duke_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1709-09-11' },
            cites: [
              {
                source: 'britannica-1911-marlborough-john-churchill-1st-duke-of',
                loc: { section: 'Marlborough, John Churchill, 1st Duke of', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'For the last time during the protracted war the two armies met in fair fight at Malplaquet, on the south of Mons (Sept. 11, 1709), where the French leader had strengthened his position by extensive earthworks.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-marlborough-john-churchill-1st-duke-of',
          loc: { section: 'Marlborough, John Churchill, 1st Duke of', para: '6' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Marlborough,_John_Churchill,_1st_Duke_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1712-07-10' },
            cites: [
              {
                source: 'britannica-1911-utrecht-treaty-of',
                loc: { section: 'Utrecht, Treaty of', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'One of the first questions discussed was the nature of the guarantees to be given by France and Spain that these crowns would be kept separate, and matters did not make much progress until after the 10th of July 1712, when Philip signed a renunciation.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-utrecht-treaty-of',
          loc: { section: 'Utrecht, Treaty of', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Utrecht,_Treaty_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1713-07-13' },
            cites: [
              {
                source: 'britannica-1911-utrecht-treaty-of',
                loc: { section: 'Utrecht, Treaty of', para: '7' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On the 13th of July 1713 a treaty was signed between England and Spain, which embodied certain commercial arrangements previously made between the two countries.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-utrecht-treaty-of',
          loc: { section: 'Utrecht, Treaty of', para: '7' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Utrecht,_Treaty_of'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1714-03-07' },
            cites: [
              {
                source: 'britannica-1911-spanish-succession-war-of-the',
                loc: { section: 'Spanish Succession, War of the', para: '31' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'The treaty of Rastatt, between Austria and France, was signed on the 7th of March 1714, Eugene and Villars being the negotiators.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '31' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spanish_Succession,_War_of_the'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/71/Louis_Laguerre_%281663-1721%29_%28possibly%29_-_The_Duke_of_Marlborough_at_the_Battle_of_Blenheim%2C_The_Surrender_of_Mar%C3%A9chal_Tallard_%28eight_ricordi_-_1176007_-_National_Trust.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Louis_Laguerre_(1663-1721)_(possibly)_-_The_Duke_of_Marlborough_at_the_Battle_of_Blenheim,_The_Surrender_of_Mar%C3%A9chal_Tallard_(eight_ricordi_-_1176007_-_National_Trust.jpg',
    credit: { institution: 'National Trust', creator: 'Louis Laguerre (possibly)' },
    license: { id: 'public-domain' }
  },
  places: [
    {
      ref: 'place:madrid',
      cites: [
        {
          source: 'britannica-1911-spanish-succession-war-of-the',
          loc: { section: 'Spanish Succession, War of the', para: '38' }
        }
      ]
    }
  ]
})
