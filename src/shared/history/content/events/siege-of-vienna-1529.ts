import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'siege-of-vienna-1529',
  names: [
    { text: 'Siege of Vienna (1529)', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1529' },
        cites: [
          { source: 'britannica-1911-vienna', loc: { section: 'Vienna', para: '21' } },
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1529-10-14' },
        cites: [
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:vienna',
      cites: [
        { source: 'britannica-1911-vienna', loc: { section: 'Vienna', para: '21' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:ottoman-empire',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } }
      ]
    },
    {
      ref: 'polity:holy-roman-empire',
      cites: [
        { source: 'britannica-1911-vienna', loc: { section: 'Vienna', para: '21' } }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:suleiman-the-magnificent',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } }
      ]
    },
    {
      name: 'Count Niclas von Salm',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-vienna', loc: { section: 'Vienna', para: '21' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:great-turkish-war',
      rel: 'related',
      cites: [
        { source: 'britannica-1911-vienna', loc: { section: 'Vienna', para: '21' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Turks then marched on Vienna, which was bombarded and closely invested, but so valiant was the resistance offered that after three weeks the siege was abandoned (Oct. 14, 1529).',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q2',
          text: 'Of more importance were the two sieges by the Turks (1529 and 1683), when the city was saved on the first occasion by the gallant defence of Count Niclas von Salm (1459–1530), and on the second by Rüdiger von Starhemberg (1638–1701), who held out until the arrival of the Poles and Germans under John Sobieski of Poland.',
          lang: 'en',
          cite: { source: 'britannica-1911-vienna', loc: { section: 'Vienna', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'With these he marched southwards to the plain of Mohács, where, on the 29th of August, the Hungarians, after a two hours’ fight, were annihilated, the king, both the archbishops, five bishops and 24,000 men perishing on the field.',
          lang: 'en',
          cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '502' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
          }
        },
        {
          id: 'q4',
          text: 'But the crown of Hungary was claimed by the archduke Ferdinand, brother of the emperor Charles V., as being king Louis\'s brother-in-law.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q5',
          text: 'Moreover, Francis I. of France, who had just been defeated by Charles, sent to the sultan ambassadors and messages dwelling on the danger of allowing Charles\'s power to become too great, and imploring the assistance of Suleiman as the only means of preserving the balance of power in Europe.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Suleiman now prepared for a campaign in Germany and sought to measure himself against Charles, who, however, withdrew from his approach, and little was done save to ravage Styria and Slavonia.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q7',
          text: 'In 1533 a truce was arranged, Hungary being divided between Zápolya and Ferdinand.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
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
            value: { d: '1529' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Suleiman decided against Charles, and marched north (1529).',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } },
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
            value: { d: '1529' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'After five days\' siege the Austrians were driven out, and Zápolya was reinstated on the throne of Hungary.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1357' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/Belagerung_Wiens_011.jpg/1280px-Belagerung_Wiens_011.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Belagerung_Wiens_011.jpg',
    credit: { creator: 'Peter Stern von Labach' },
    license: { id: 'public-domain' }
  }
})
