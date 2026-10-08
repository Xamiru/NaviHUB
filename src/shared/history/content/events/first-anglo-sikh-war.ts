import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-anglo-sikh-war',
  names: [
    { text: 'First Anglo-Sikh War', lang: 'en', role: 'primary' },
    { text: 'ਪਹਿਲੀ ਐਂਗਲੋ-ਸਿੱਖ ਜੰਗ', lang: 'pa', role: 'native' },
    {
      text: 'First Sikh War',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1845-12-11' },
        cites: [
          { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1846-03-11' },
        cites: [
          { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '6' } }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:lahore',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '6' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:annexation-of-the-punjab',
      rel: 'led-to',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '7' } }
      ]
    }
  ],
  sides: [
    {
      key: 'british',
      name: 'the British',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } }
      ]
    },
    {
      key: 'sikh',
      name: 'the Sikh army',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Sir Hugh Gough',
      role: 'commander',
      side: 'british',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } }
      ]
    },
    {
      name: 'Sir Henry Hardinge',
      role: 'head-of-government',
      side: 'british',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } }
      ]
    },
    {
      name: 'Sir Harry Smith',
      role: 'commander',
      side: 'british',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '5' } }
      ]
    },
    {
      name: 'Lal Singh',
      role: 'commander',
      side: 'sikh',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '4' } }
      ]
    },
    {
      name: 'Tej Singh',
      role: 'commander',
      side: 'sikh',
      cites: [
        { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '4' } }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fa/The_Battle_of_Sobraon_10_February_1846.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:The_Battle_of_Sobraon_10_February_1846.jpg',
    credit: { institution: 'National Army Museum', creator: 'J. Harris after Henry Martens' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'SIKH WARS, two Indian campaigns fought between the Sikhs and the British, which resulted in the conquest and annexation of the Punjab',
          lang: 'en',
          cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
          }
        },
        {
          id: 'q2',
          text: 'The first Sikh War was brought about by the insubordination of the Sikh army, which after the death of Ranjit Singh became uncontrollable and on the 11th of December 1845 crossed the Sutlej, and virtually declared war upon the British.',
          lang: 'en',
          cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The British authorities had foreseen the outbreak, and had massed sufficient troops at Ferozepore, Ludhiana and Umballa to protect the frontier, but not to offer provocation.',
          lang: 'en',
          cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'The British losses throughout the campaign were considerably heavier than was usual in Indian warfare; but this was partly due to the fact that the Sikhs were the best natural fighters in India, and partly to the lack of energy of the Hindostani sepoys.',
          lang: 'en',
          cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '6' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'For two years after the battle of Sobraon the Punjab remained a British protectorate, with Sir Henry Lawrence as resident; but the Sikhs were unconvinced of their military inferiority, the Rani Jindan and her ministers were constantly intriguing to recover their power, and a further trial of strength was inevitable.',
          lang: 'en',
          cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '7' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
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
            value: { d: '1845-12-13' },
            cites: [
              { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'So complete were the preparations for advance that on the 12th, the day after the Sikhs crossed the Sutlej, Sir Hugh Gough, the commander-in-chief, marched 16 m. with the Umballa force to Rajpura; on the 13th the governor-general, Sir Henry Hardinge, declared war, and by the 18th the whole army had marched 150 m. to Moodkee, in order to protect Ferozepore from the Sikh attack.',
        lang: 'en',
        cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1845-12-18' },
            cites: [
              { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '2' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The battle opened with an artillery duel, in which the British guns, though inferior in weight, soon silenced the enemy, the 3rd Light Dragoons delivered a brilliant charge, and the infantry drove the enemy from position after position with great slaughter and the loss of seventeen guns.',
        lang: 'en',
        cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '3' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1845-12-21' },
            cites: [
              { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '4' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'The British were exhausted with their sleepless night, the native troops were shaken, and a determined attack by this fresh army might have won the day; but Tej Singh, after a half-hearted attack, which was repulsed, marched away, whether from cowardice, incapacity or treason, and left the British masters of the position.',
        lang: 'en',
        cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '4' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1846-01-28' },
            cites: [
              { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '5' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'After receiving reinforcements Sir Harry again advanced from Ludhiana and attacked the Sikhs at Aliwal on the 28th of January.',
        lang: 'en',
        cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '5' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1846-02-10' },
            cites: [
              { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '6' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'On the 10th of February Sir Hugh attacked the Sikhs, who occupied a strong entrenched position in a bend of the Sutlej.',
        lang: 'en',
        cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1846-02-10' },
            cites: [
              { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '6' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The Sikhs, with the river behind them, suffered terrible carnage, and are computed to have lost 10,000 men and 67 guns.',
        lang: 'en',
        cite: { source: 'britannica-1911-sikh-wars', loc: { section: 'SIKH WARS', para: '6' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Sikh_Wars'
        }
      }
    }
  ],
  furtherReading: [
    { source: 'khushwant-singh-2004-a-history-of-the-sikhs', perspective: 'south-asian' },
    {
      source: 'ganda-singh-1955-private-correspondence-anglo-sikh-wars',
      perspective: 'south-asian'
    }
  ]
})
