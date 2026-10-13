import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'first-battle-of-panipat',
  names: [
    { text: 'First Battle of Panipat', lang: 'en', role: 'primary' },
    {
      text: 'Battle of Panipat (1526)',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-panipat', loc: { section: 'PANIPAT', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1526-04-21' },
        cites: [
          { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Encyclopædia Britannica, 11th edition (article on Baber)'
          }
        ]
      },
      {
        value: { d: '1526-04-20' },
        cites: [
          {
            source: 'iranica-lehmann-babor',
            loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '10' }
          }
        ],
        heldBy: [
          {
            kind: 'scholar',
            name: 'Encyclopaedia Iranica (article on Babor, with Babur’s own date 8 Rajab 932)'
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:panipat',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:mughal-empire',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    }
  ],
  sides: [
    {
      key: 'baber',
      name: 'Baber’s army',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    },
    {
      key: 'delhi',
      name: 'Ibrahim, emperor of Delhi',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:babur',
      role: 'commander',
      side: 'baber',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    },
    {
      name: 'Ibrahim Lodi',
      role: 'commander',
      side: 'delhi',
      cites: [
        { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
      ]
    }
  ],
  figures: [
    {
      key: 'combatants',
      side: 'baber',
      value: {
        alts: [
          {
            value: { min: 12000 },
            cites: [
              { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
            ]
          }
        ]
      }
    },
    {
      key: 'combatants',
      side: 'delhi',
      value: {
        alts: [
          {
            value: { min: 100000 },
            cites: [
              { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:third-battle-of-panipat',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-panipat', loc: { section: 'PANIPAT', para: '1' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Babur defeated the Lodi sultan decisively at Panipat (in modern-day Haryana, about ninety kilometers north of Delhi).',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/india/12.htm' }
        },
        {
          id: 'q2',
          text: 'In modern times, the plains of Panipat thrice formed the scene of decisive battles which sealed the fate of upper India—in 1526, when Bāber completely defeated the imperial forces; in 1556, when his grandson, Akbar, on the same battlefield, conquered Himu, the Hindu general of the Afghān Adil Shāh, thus a second time establishing the Mogul power; and finally, on the 7th of January 1761, when Ahmad Shāh Durāni shattered the Mahratta confederacy.',
          lang: 'en',
          cite: { source: 'britannica-1911-panipat', loc: { section: 'PANIPAT', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Panipat'
          }
        },
        {
          id: 'q3',
          text: 'The great battle was fought at Panipat on the 21st of April 1526, when Ibrahim was slain and his army routed.',
          lang: 'en',
          cite: { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Baber'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Ibrahim, emperor of Delhi, had made himself detested, even by his Afghan nobles, several of whom called upon Baber for assistance.',
          lang: 'en',
          cite: { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Baber'
          }
        },
        {
          id: 'q5',
          text: 'But in 1514 he was utterly defeated by the Uzbegs and with difficulty reached Kabul.',
          lang: 'en',
          cite: { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Baber'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Baber at once took possession of Agra.',
          lang: 'en',
          cite: { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Baber'
          }
        },
        {
          id: 'q7',
          text: 'At Kanwaha, on the 10th of March 1527, he won a great victory and made himself absolute master of northern India.',
          lang: 'en',
          cite: { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Baber'
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
            value: { d: '1521' },
            cites: [
              { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Several preliminary incursions had been already made, when in 1521 an opportunity presented itself for a more extended expedition.',
        lang: 'en',
        cite: { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Baber'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1526-04-20' },
            cites: [
              {
                source: 'iranica-lehmann-babor',
                loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '10' }
              }
            ],
            heldBy: [
              {
                kind: 'scholar',
                name: 'Encyclopaedia Iranica (article on Babor, with Babur’s own date 8 Rajab 932)'
              }
            ]
          },
          {
            value: { d: '1526-04-21' },
            cites: [
              { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
            ],
            heldBy: [
              {
                kind: 'organization',
                name: 'Encyclopædia Britannica, 11th edition (article on Baber)'
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'First he maneuvered Sultan Ebrāhīm Lōdī into attacking his prepared position at the village of Panipat north of Delhi on 8 Rajab 932/20 April 1526.',
        lang: 'en',
        cite: {
          source: 'iranica-lehmann-babor',
          loc: { section: 'BĀBOR, ẒAHĪR-AL-DĪN MOḤAMMAD', para: '10' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://www.iranicaonline.org/articles/babor-zahir-al-din'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1526-04-21' },
            cites: [
              { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Ibrahim, with 100,000 soldiers and numerous elephants, advanced against him.',
        lang: 'en',
        cite: { source: 'britannica-1911-baber', loc: { section: 'Baber', para: '1' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Baber'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/6c/1526-First_Battle_of_Panipat-Ibrahim_Lodhi_and_Babur.jpg/1280px-1526-First_Battle_of_Panipat-Ibrahim_Lodhi_and_Babur.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:1526-First_Battle_of_Panipat-Ibrahim_Lodhi_and_Babur.jpg',
    credit: { creator: 'Painters of Babur' },
    license: { id: 'public-domain' }
  }
})
