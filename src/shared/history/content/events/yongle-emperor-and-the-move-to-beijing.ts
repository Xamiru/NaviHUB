import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'yongle-emperor-and-the-move-to-beijing',
  names: [
    { text: 'Yongle Emperor and the move to Beijing', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-16',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1403' },
        cites: [
          { source: 'britannica-1911-nanking', loc: { section: 'Nanking', para: '1' } },
          { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1425' },
        cites: [
          { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          { source: 'britannica-1911-peking', loc: { section: 'Peking', para: '1' } }
        ],
        heldBy: [
          { kind: 'organization', name: 'Encyclopædia Britannica (11th edition, 1911)' }
        ]
      },
      {
        value: { d: '1428' },
        cites: [
          { source: 'britannica-1911-nanking', loc: { section: 'Nanking', para: '2' } }
        ],
        heldBy: [
          {
            kind: 'organization',
            name: 'Encyclopædia Britannica (11th edition, 1911), article Nanking'
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:nanjing',
      cites: [
        { source: 'britannica-1911-nanking', loc: { section: 'Nanking', para: '1' } },
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '22' }
        }
      ]
    },
    {
      ref: 'place:beijing',
      cites: [
        { source: 'britannica-1911-peking', loc: { section: 'Peking', para: '1' } },
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '22' }
        }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:ming-dynasty',
      cites: [
        { source: 'britannica-1911-peking', loc: { section: 'Peking', para: '1' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:yongle-emperor',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:founding-of-the-ming-dynasty',
      rel: 'preceded-by',
      cites: [
        { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
      ]
    },
    {
      ref: 'event:voyages-of-zheng-he',
      rel: 'related',
      cites: [
        {
          source: 'afe-columbia-ming-voyages',
          loc: { section: 'The Ming Voyages', para: '22' }
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
          text: 'Having its capital first at Nanjing (which means Southern Capital) and later at Beijing (Northern Capital), the Ming reached the zenith of power during the first quarter of the fifteenth century.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q2',
          text: 'During the reign of the first emperor of the dynasty (1368–1399) which succeeded that founded by Jenghiz Khan the court resided at the modern Nanking, but the succeeding sovereign Yung-lo (1403–1425) transferred his court to Pe-king (i.e.',
          lang: 'en',
          cite: { source: 'britannica-1911-peking', loc: { section: 'Peking', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Peking'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Aware that the appointment of this youth—his father was dead—would give offence to the young emperor’s uncles, Hung-wu had dismissed them to their respective governments.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q4',
          text: 'However, the prince of Yen, his eldest surviving son, rose in revolt as soon as the news reached him of his nephew’s accession, and after gaining several victories over the armies of Kien-wên he presented himself before the gates of Nanking, the capital.',
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
          text: 'In addition to these foreign exploits, he had further depleted the treasury by moving the capital from Nanjing to Beijing and, with a grandeur on land to match that on sea, by ordering the construction of the magnificent Forbidden City.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q6',
          text: 'This project involved over a million laborers.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q7',
          text: 'To further fortifying the north of his empire, he pledged his administration to the enormous task of reviving and extending the Grand Canal.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '22' }
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'Factions at court had long been critical of the Yongle emperor\'s extravagant ways.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
          }
        },
        {
          id: 'q9',
          text: 'Causing further hardship were natural disasters, severe famines in Shantong and Hunan, epidemics in Fujian, plus lightning strikes that destroyed part of the newly constructed Forbidden City.',
          lang: 'en',
          cite: {
            source: 'afe-columbia-ming-voyages',
            loc: { section: 'The Ming Voyages', para: '23' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://afe.easia.columbia.edu/special/china_1000ce_mingvoyages.htm'
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
            value: { d: '1403' },
            cites: [
              { source: 'britannica-1911-nanking', loc: { section: 'Nanking', para: '1' } },
              { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Treachery opened the gates to him, and the emperor having fled in the disguise of a monk, the victorious prince became emperor and took the title of Yung-lo (1403).',
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
            value: { d: '1409' },
            cites: [
              { source: 'britannica-1911-cambaluc', loc: { section: 'Cambaluc', para: '4' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'The restoration of Cambaluc was commenced in 1409.',
        lang: 'en',
        cite: { source: 'britannica-1911-cambaluc', loc: { section: 'Cambaluc', para: '4' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Cambaluc'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/f3/Beijing%2C_Forbidden_City%2C_Hall_of_Supreme_Harmony_%286170352582%29.jpg/1280px-Beijing%2C_Forbidden_City%2C_Hall_of_Supreme_Harmony_%286170352582%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Beijing,_Forbidden_City,_Hall_of_Supreme_Harmony_(6170352582).jpg',
    credit: { creator: 'Arian Zwegers' },
    license: { id: 'cc-by', version: '2.0', url: 'https://creativecommons.org/licenses/by/2.0' }
  }
})
