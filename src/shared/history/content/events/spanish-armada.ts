import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'spanish-armada',
  names: [
    { text: 'Spanish Armada', lang: 'en', role: 'primary' },
    {
      text: 'Invincible Armada',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'invasion',
  start: {
    alts: [
      {
        value: { d: '1588-05' },
        cites: [
          { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1588' },
        cites: [
          { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:spanish-empire',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
      ]
    },
    {
      ref: 'polity:kingdom-of-england',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
      ]
    }
  ],
  sides: [
    {
      key: 'spain',
      name: 'Spain',
      polity: 'polity:spanish-empire',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
      ]
    },
    {
      key: 'england',
      name: 'England',
      polity: 'polity:kingdom-of-england',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:philip-ii',
      role: 'leader',
      side: 'spain',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
      ]
    },
    {
      name: 'Duke of Medina Sidonia',
      role: 'commander',
      side: 'spain',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
      ]
    },
    {
      name: 'Lord Howard of Effingham',
      role: 'commander',
      side: 'england',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
      ]
    },
    {
      ref: 'person:elizabeth-i',
      role: 'head-of-state',
      side: 'england',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:reformation',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '2' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Spanish or Invincible Armada was the great fleet (in Spanish, armada) sent against England by Philip II. in 1588.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
          }
        },
        {
          id: 'q2',
          text: 'But the repulse of the great Spanish armament was an event of the first historical importance.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Though Philip II. had political reasons for hostility to Queen Elizabeth, they were so intimately bound up with the struggle between the Reformation and the Counter Reformation that the secular and the religious elements of the conflict cannot be separated from one another.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
          }
        },
        {
          id: 'q4',
          text: 'The Armada had much of the character of a crusade.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The failure of the Armada was mainly due to its own interior weakness, and as a military operation the English victory was less glorious than some other less renowned achievements of the British fleet.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
          }
        },
        {
          id: 'q6',
          text: 'From that time forward no serious attempt to invade England was, or could be, made.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
          }
        },
        {
          id: 'q7',
          text: 'Of the total number of the vessels originally collected for the invasion of England one-half, if not more, perished, and the crews of those which escaped were terribly diminished by scurvy and starvation.',
          lang: 'en',
          cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
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
            value: { d: '1588-05' },
            cites: [
              {
                source: 'britannica-1911-armada-the',
                loc: { section: 'Armada, The', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The fleet was collected at Lisbon, after many delays, and sailed on the 20th of May 1588.',
        lang: 'en',
        cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1588-07' },
            cites: [
              {
                source: 'britannica-1911-armada-the',
                loc: { section: 'Armada, The', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'On the 20th of July the Armada was seen off the Lizard.',
        lang: 'en',
        cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1588-07' },
            cites: [
              {
                source: 'britannica-1911-armada-the',
                loc: { section: 'Armada, The', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On the night of the 28th of July the fireships were sent in, and produced an utter panic in the Armada.',
        lang: 'en',
        cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1588-07' },
            cites: [
              {
                source: 'britannica-1911-armada-the',
                loc: { section: 'Armada, The', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On the 29th of July the scattered Spaniards, who were quite unable to restore order, were attacked by the English off Gravelines.',
        lang: 'en',
        cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1588' },
            cites: [
              {
                source: 'britannica-1911-armada-the',
                loc: { section: 'Armada, The', para: '1' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Nineteen of them are known to have been wrecked on the coasts of Scotland and Ireland.',
        lang: 'en',
        cite: { source: 'britannica-1911-armada-the', loc: { section: 'Armada, The', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Armada,_The'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8e/Defeat_of_the_Spanish_Armada%2C_8_August_1588_RMG_BHC0264.tiff/lossy-page1-1280px-Defeat_of_the_Spanish_Armada%2C_8_August_1588_RMG_BHC0264.tiff.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Defeat_of_the_Spanish_Armada,_8_August_1588_RMG_BHC0264.tiff',
    credit: { institution: 'National Maritime Museum', creator: 'Philip James de Loutherbourg' },
    license: { id: 'public-domain' }
  }
})
