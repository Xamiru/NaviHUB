import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'fall-of-the-ming-dynasty',
  names: [
    { text: 'Fall of the Ming dynasty', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'dissolution',
  start: {
    alts: [
      {
        value: { d: '1644' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '3' }
          },
          { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Chinese Regain Power', para: '3' }
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
    },
    {
      ref: 'polity:qing-empire',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Chinese Regain Power', para: '3' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'manchu',
      name: 'Manchus',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    },
    {
      key: 'ming',
      name: 'Ming',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Tsʽung-chêng',
      role: 'head-of-state',
      side: 'ming',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    },
    {
      name: 'Li Tsze-chʽêng',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    },
    {
      name: 'Shun-chi',
      role: 'head-of-state',
      side: 'manchu',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  related: [
    {
      ref: 'polity:qing-empire',
      rel: 'led-to',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Chinese Regain Power', para: '3' }
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
          text: 'In 1644 the Manchus took Beijing from the north and became masters of north China, establishing the last imperial dynasty, the Qing (1644- 1911).',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q2',
          text: 'The Ming dynasty (1368-1644) was founded by a Han Chinese peasant and former Buddhist monk turned rebel army leader.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/11.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Long wars with the Mongols, incursions by the Japanese into Korea, and harassment of Chinese coastal cities by the Japanese in the sixteenth century weakened Ming rule, which became, as earlier Chinese dynasties had, ripe for an alien takeover.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q4',
          text: 'The empire was now torn by internal dissensions.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The accession to the throne of the emperor Shun-chi did not restore peace to the country.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q6',
          text: 'Although the Manchus were not Han Chinese and were strongly resisted, especially in the south, they had assimilated a great deal of Chinese culture before conquering China Proper.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Rise of the Manchus', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/12.htm' }
        },
        {
          id: 'q7',
          text: 'Under Manchu rule the empire grew to include a larger area than before or since; Taiwan, the last outpost of anti-Manchu resistance, was also incorporated into China for the first time.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Rise of the Manchus', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/12.htm' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1616' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'About this time the Manchu Tatars, goaded into war by the injustice they were constantly receiving at the hands of the Chinese, led an army into China (in 1616) and completely defeated the force which was sent against them.',
        lang: 'en',
        cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1644' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'A treacherous eunuch opened the gates to him, on being informed of which the emperor committed suicide.',
        lang: 'en',
        cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1644' },
            cites: [
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'The Chinese now wished the Manchus to retire, but, having taken possession of Peking, they proclaimed the ninth son of Tʽien-ming emperor of China under the title of Shun-chi, and adopted the name of Ta-tsʽing, or “Great Pure,” for the dynasty (1644).',
        lang: 'en',
        cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/be/1627-1644_Chongzhen_%28Ming_Dynasty%29_porcelain_mark.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:1627-1644_Chongzhen_(Ming_Dynasty)_porcelain_mark.jpg',
    credit: { creator: 'Unknown' },
    license: { id: 'public-domain' }
  }
})
