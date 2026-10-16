import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-ming-dynasty',
  names: [
    { text: 'Founding of the Ming dynasty', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1368' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '1' }
          },
          { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  places: [
    {
      ref: 'place:nanjing',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Chinese Regain Power', para: '1' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:ming-dynasty',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Chinese Regain Power', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:zhu-yuanzhang',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:yongle-emperor-and-the-move-to-beijing',
      rel: 'followed-by',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Ming dynasty (1368-1644) was founded by a Han Chinese peasant and former Buddhist monk turned rebel army leader.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q2',
          text: 'The Ming dynasty (1368-1644) was a Chinese dynasty with a Chinese imperial family, as distinct from the dynasty that came before it (the Mongol, or Yuan, dynasty of Chinggis and Khubilai Khan) or the one that followed it (the Manchu, or Qing, dynasty).',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Rivalry among the Mongol imperial heirs, natural disasters, and numerous peasant uprisings led to the collapse of the Yuan dynasty.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q4',
          text: 'Jên-tsung’s successors were weak and incapable rulers, and in the person of Shun-ti (1333–1368) were summed up the vices and faults of his predecessors.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'For a time the western provinces of China continued to hold out against the rebels, but with the flight of Toghon Timur the Mongol troops lost heart, and in 1368 the ex-Buddhist priest ascended the throne as the first sovereign of the Ming or “Bright” dynasty, under the title of Hung-wu.',
          lang: 'en',
          cite: { source: 'britannica-1911-mongols', loc: { section: 'Mongols', para: '12' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mongols'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'By the Mings, who partly revived the feudal system by making large territorial grants to members of the reigning house, China was divided into fifteen provinces;',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q7',
          text: 'All intercourse with Europe seems now to have ceased until the Portuguese arrived in the 16th century, but Hung-wu cultivated friendly relations with the neighbouring states.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
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
            value: { d: '1355' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In 1355 he captured Nanking, and proclaimed himself duke of Wu',
        lang: 'en',
        cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1368' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'Even when master of the empire, thirteen years later, he still professed to dislike the idea of assuming the imperial title. His scruples were overcome, and he declared himself emperor in 1368.',
        lang: 'en',
        cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fd/City_Wall_of_Nanjing.jpg/1280px-City_Wall_of_Nanjing.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:City_Wall_of_Nanjing.jpg',
    credit: { creator: 'Mattias Hill' },
    license: { id: 'cc-by-sa', version: '3.0', url: 'https://creativecommons.org/licenses/by-sa/3.0' }
  }
})
