import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'great-turkish-war',
  names: [
    { text: 'Great Turkish War', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  type: 'war',
  start: {
    alts: [
      {
        value: { d: '1683-07-14' },
        cites: [
          { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } },
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1699-01-26' },
        cites: [
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
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
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    },
    {
      ref: 'place:karlowitz',
      cites: [
        { source: 'britannica-1911-karlowitz', loc: { section: 'Karlowitz', para: '1' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:ottoman-empire',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    },
    {
      ref: 'polity:holy-roman-empire',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    }
  ],
  sides: [
    {
      key: 'holy-league',
      name: 'Austria, Poland, Venice and their allies',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    },
    {
      key: 'ottoman',
      name: 'Turkey',
      polity: 'polity:ottoman-empire',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    }
  ],
  participants: [
    {
      name: 'Kara Mustafa',
      role: 'commander',
      side: 'ottoman',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    },
    {
      name: 'John Sobieski',
      role: 'head-of-state',
      side: 'holy-league',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    },
    {
      name: 'Prince Eugene',
      role: 'commander',
      side: 'holy-league',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:siege-of-vienna-1683',
      rel: 'contributed-to',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    },
    { ref: 'event:siege-of-vienna-1529', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The war, which lasted for 16 years and put an end to the Turkish dominion in Hungary, began with the world-renowned siege of Vienna (July 14–Sept. 12, 1683).',
          lang: 'en',
          cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
          }
        },
        {
          id: 'q2',
          text: 'This was the signal for a general coalition against Turkey; Venice, Poland and the pope allied themselves with the Austrians; Russia, Tuscany and Malta joined in the attack.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'For several centuries Vienna filled an important role as the most advanced bulwark of Western civilization and Christianity against the Turks, for during the whole of the middle ages Hungary practically retained its Asiatic character.',
          lang: 'en',
          cite: { source: 'britannica-1911-vienna', loc: { section: 'Vienna', para: '21' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vienna'
          }
        },
        {
          id: 'q4',
          text: 'Leopold, intent on the doings of his perennial rival Louis XIV., was loth to engage in an eastern war even for the liberation of Hungary, which he regarded as of far less importance than a strip or two of German territory on the Rhine.',
          lang: 'en',
          cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The peace of Karlowitz marks the definitive termination of Turkey\'s power of offence in Europe.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q6',
          text: 'The peace of Karlowitz marks the term of the Magyar’s secular struggle with Mahommedanism and finally reunited her long-separated provinces beneath a common sceptre.',
          lang: 'en',
          cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
          }
        },
        {
          id: 'q7',
          text: 'The main provisions of these were, that Turkey retained the Banat, while Austria kept Transylvania; Poland restored the places captured in Moldavia, but retained Kamenets, Podolia and the Ukraine; Venice restored her conquests north of Corinth, but kept those in the Morea and Dalmatia.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } },
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
            value: { d: '1683' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'A vast Turkish army marched to the walls of Vienna and closely beleaguered the imperial city, from which the emperor and his court fled.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } },
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
            value: { d: '1686' },
            cites: [
              { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'This statesmanlike persistence was rewarded by an uninterrupted series of triumphs, culminating in the recapture of Buda (1686) and Belgrade (1688), and the recovery of Bosnia (1689).',
        lang: 'en',
        cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1691-08-18' },
            cites: [
              { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Once more the road to Vienna lay open, but the grand vizier wasted the remainder of the year in fortifying Belgrade, and on August 18th, 1691, he was defeated and slain at Slankamen by the margrave of Baden.',
        lang: 'en',
        cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1697-09-11' },
            cites: [
              { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'For the next six years the war languished owing to the timidity of the emperor, the incompetence of his generals and the exhaustion of the Porte; but on the 11th of September 1697 Prince Eugene of Savoy routed the Turks at Zenta and on the 13th of November 1698 a peace-congress was opened at Karlowitz which resulted in the peace of that name (Jan. 26, 1699).',
        lang: 'en',
        cite: { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Hungary'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1699-01-26' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'It is noteworthy also as being the first occasion on which representatives of the mediating powers took part in the peace negotiations.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/eb/Jan_III_Sobieski_%2876852272%29.jpg/1280px-Jan_III_Sobieski_%2876852272%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jan_III_Sobieski_(76852272).jpg',
    credit: { creator: 'Jan Matejko' },
    license: { id: 'public-domain' }
  }
})
