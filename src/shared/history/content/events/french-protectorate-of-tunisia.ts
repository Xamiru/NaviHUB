import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'french-protectorate-of-tunisia',
  names: [
    { text: 'French protectorate over Tunisia (1881)', lang: 'en', role: 'primary' },
    { text: 'الحماية الفرنسية على تونس', lang: 'ar', role: 'native' },
    {
      text: 'Treaty of Bardo',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '55' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1881' },
        cites: [
          { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:tunis',
      cites: [
        { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:french-third-republic' }
  ],
  related: [
    {
      ref: 'event:congress-of-berlin',
      rel: 'caused-by',
      cites: [
        { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '53' } },
        { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } }
      ]
    }
  ],
  participants: [
    {
      name: 'the Bey of Tunis',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } },
        { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '55' } }
      ]
    },
    {
      name: 'Lord Salisbury',
      role: 'diplomat',
      cites: [
        { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '53' } }
      ]
    },
    {
      name: 'Sir Richard Wood',
      role: 'diplomat',
      cites: [
        { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '53' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1881 a French force crossed the Algerian frontier under pretext of chastising the independent Khmir or Kroumir tribes on the north-east of the regency, and, quickly dropping the mask, advanced on the capital and compelled the Bey to accept the French protectorate.',
          lang: 'en',
          cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
          }
        },
        {
          id: 'q2',
          text: 'In the course of the nineteenth century, France seized Algeria and Tunisia, while Britain began its occupation of Egypt in 1882.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In the third quarter of the 19th century not more than a tenth part of the fertile land was under cultivation, and the yearly charge on the public debt exceeded the whole annual revenue.',
          lang: 'en',
          cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '53' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
          }
        },
        {
          id: 'q4',
          text: 'When the country went bankrupt in 1869, a triple control was established over Tunisian finances, with British, French and Italian “controllers.”',
          lang: 'en',
          cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
          }
        },
        {
          id: 'q5',
          text: 'In 1880 the Italians bought the British railway from Tunis to Goletta.',
          lang: 'en',
          cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q6',
          text: 'The actual conquest of the country was not effected without a serious struggle with Moslem fanaticism, especially at Sfax; but all Tunisia was brought completely under French jurisdiction and administration, supported by military posts at every important point.',
          lang: 'en',
          cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q7',
          text: 'In 1883 the new situation under the French protectorate was recognized by the British government withdrawing its consular jurisdiction in favour of the French courts, and in 1885 it ceased to be represented by a diplomatic official.',
          lang: 'en',
          cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
          }
        },
        {
          id: 'q8',
          text: 'The other powers followed suit, except Italy, which did not recognize the full consequences of the French protectorate until 1896.',
          lang: 'en',
          cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
          }
        },
        {
          id: 'q9',
          text: 'In 1884 a thorough reform of the government and administration of the country was begun under the direction of a succession of eminent French residents-general.',
          lang: 'en',
          cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '54' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
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
            value: { d: '1878' },
            cites: [
              { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '53' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'But in 1878, at the Congress of Berlin, Lord Salisbury agreed to allow France a “free hand” in Tunisia in return for French acquiescence in the British lease of Cyprus.',
        lang: 'en',
        cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '53' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1881-05-12' },
            cites: [
              { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '55' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The French protectorate over Tunisia, based on the treaty signed by the Bey at Bardo on the 12th of May 1881 and confirmed by the treaty of La Marsa (June 8, 1883), was not recognized by Turkey, which claimed the regency as part of the Ottoman dominions.',
        lang: 'en',
        cite: { source: 'britannica-1911-tunisia', loc: { section: 'TUNISIA', para: '55' } },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Tunisia'
        }
      }
    }
  ]
})
