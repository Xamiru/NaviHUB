import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'siege-of-vienna-1683',
  names: [
    { text: 'Siege of Vienna (1683)', lang: 'en', role: 'primary' },
    {
      text: 'Second Siege of Vienna',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-vienna', loc: { section: 'Vienna', para: '21' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1683-07-14' },
        cites: [
          { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1683-09-12' },
        cites: [
          { source: 'britannica-1911-hungary', loc: { section: 'HUNGARY', para: '513' } }
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
  participants: [
    {
      name: 'Rüdiger von Starhemberg',
      role: 'commander',
      cites: [
        { source: 'britannica-1911-vienna', loc: { section: 'Vienna', para: '21' } }
      ]
    },
    {
      name: 'John Sobieski',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:great-turkish-war',
      rel: 'contributed-to',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } }
      ]
    },
    {
      ref: 'event:siege-of-vienna-1529',
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
          text: 'A vast Turkish army marched to the walls of Vienna and closely beleaguered the imperial city, from which the emperor and his court fled.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1385' } },
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
          text: 'A revolt of the Hungarian Protestants, in consequence of the persecuting policy of the house of Habsburg, now led to a renewal of the war between Turkey and Austria, due in part to the overweening ambition of Kuprili\'s successor, Kara Mustafa, who desired to immortalize his tenure of office by some great exploit, and who cherished dreams of founding for himself a western Moslem Empire.',
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
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
          id: 'q5',
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
        id: 'q6',
        text: 'All hope seemed lost, when by a brilliant feat of arms John Sobieski, king of Poland, drove away the besiegers in hopeless confusion and saved the cause of Christianity, 1683.',
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b0/Battle_of_Vienna_%281683%29_by_J%C3%B3zef_Brandt.PNG/1280px-Battle_of_Vienna_%281683%29_by_J%C3%B3zef_Brandt.PNG',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Vienna_(1683)_by_J%C3%B3zef_Brandt.PNG',
    credit: { creator: 'Józef Brandt' },
    license: { id: 'public-domain' }
  }
})
