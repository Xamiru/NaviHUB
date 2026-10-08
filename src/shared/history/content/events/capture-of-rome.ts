import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'capture-of-rome',
  names: [
    { text: 'Capture of Rome', lang: 'en', role: 'primary' },
    { text: 'Presa di Roma', lang: 'it', role: 'native' },
    {
      text: 'Besetzung Roms',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '42' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1870-09-20' },
        cites: [
          { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '41' } },
          { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '7' } }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 3,
  places: [
    {
      ref: 'place:rome',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '42' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:kingdom-of-italy' }
  ],
  participants: [
    {
      name: 'Pius IX',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '38' } }
      ]
    },
    {
      name: 'Viktor Emanuel II',
      role: 'head-of-state',
      cites: [
        { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '45' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:franco-prussian-war',
      rel: 'related',
      cites: [
        { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '33' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q8',
          text: 'In December 1869 the XXI. oecumenical council began its sittings in Rome, and on the 18th of July 1870 proclaimed the infallibility of the pope (see Vatican Council). Two days previously Napoleon had declared war on Prussia, and immediately afterwards he withdrew his troops from Civitavecchia;',
          lang: 'en',
          cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1583' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q7',
          text: 'Italy incorporated Venetia and the former Papal States (including Rome) by 1871 following the Franco-Prussian War (1870-71).',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-italy',
            loc: {
              section: 'A Guide to the United States’ History of Recognition, Diplomatic, and Consular Relations, by Country, since 1776: Italy'
            }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://history.state.gov/countries/italy' }
        },
        {
          id: 'q9',
          text: 'On the 20th the Italians began the attack, and General Mazé de la Roche’s division having effected a breach in the Porta Pia, the pope ordered the garrison to cease fire and the Italians poured into the Eternal City followed by thousands of Roman exiles.',
          lang: 'en',
          cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1583' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q10',
          text: 'An encyclical of Pius IX. to the bishops of the Catholic Church on the 15th of May 1871 repudiated the Law of Guarantees, and summoned Catholic princes to co-operate in restoring the temporal power.',
          lang: 'en',
          cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1591' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
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
            value: { d: '1870-10-02' },
            cites: [
              { source: 'lemo-chronik-1870', loc: { section: 'Chronik 1870', para: '46' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'At the plebiscite there were 133,681 votes for union and 1507 against it.',
        lang: 'en',
        cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1583' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-01-26' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '6' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'In spite of pressure from the French government, which desired Italy to maintain Florence as the political and to regard Rome merely as the moral capital of the realm, the government offices and both legislative chambers were transferred in 1871 to the Eternal City.',
        lang: 'en',
        cite: { source: 'britannica-1911-italy', loc: { section: 'ITALY', para: '1592' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Italy'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1871-06-02' },
            cites: [
              { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '44' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'König Viktor Emanuel II. (1820-1878) zieht feierlich in die neue italienische Hauptstadt Rom ein.',
        lang: 'de',
        cite: { source: 'lemo-chronik-1871', loc: { section: 'Chronik 1871', para: '45' } },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.dhm.de/lemo/jahreschronik/1871.html'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/c9/La_Breccia_di_Porta_Pia_%E2%80%93_20_settembre_1870.jpg/1280px-La_Breccia_di_Porta_Pia_%E2%80%93_20_settembre_1870.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:La_Breccia_di_Porta_Pia_%E2%80%93_20_settembre_1870.jpg',
    credit: { creator: 'Edoardo Matania' },
    license: { id: 'public-domain' }
  }
})
