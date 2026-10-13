import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'acts-of-union-1707',
  names: [
    { text: 'Acts of Union 1707', lang: 'en', role: 'primary' },
    {
      text: 'Union of 1707',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1289' } }
      ]
    },
    {
      text: 'Act of Union',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1268' } }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1707' },
        cites: [
          { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1268' } },
          {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:edinburgh',
      cites: [
        { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1466' } }
      ]
    },
    {
      ref: 'place:london',
      cites: [
        { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1466' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:kingdom-of-great-britain',
      cites: [
        {
          source: 'britannica-1911-united-kingdom',
          loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Anne',
      role: 'head-of-state',
      cites: [
        { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1466' } }
      ]
    }
  ],
  related: [
    {
      ref: 'polity:kingdom-of-great-britain',
      rel: 'led-to',
      cites: [
        {
          source: 'britannica-1911-united-kingdom',
          loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
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
          text: 'By the Act of Union in 1707 Scotland ceased to have a separate parliament, and its government was assimilated to that of England.',
          lang: 'en',
          cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1268' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
          }
        },
        {
          id: 'q2',
          text: '“Great Britain” was employed as a formal designation from the time of the union of the kingdoms of England and Scotland in 1707.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-united-kingdom',
            loc: { section: 'UNITED KINGDOM OF GREAT BRITAIN AND IRELAND', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/United_Kingdom'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The losses and the apparent injustice caused a frenzy of excitement in Scotland, and William could only express his regret and his desire for an incorporating Union of the two kingdoms.',
          lang: 'en',
          cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1465' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The Union was at first rich in causes of friction, and in nothing else; even as late as 1745 it was most unpopular, but Scotland had no choice.',
          lang: 'en',
          cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1466' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
          }
        },
        {
          id: 'q5',
          text: 'The Act of Union with Scotland constituted one of the strongest foundations of the future empire.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-anne-queen-of-great-britain-and-ireland',
            loc: { section: 'Anne, Queen of Great Britain and Ireland', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Anne,_Queen_of_Great_Britain_and_Ireland'
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
            value: { d: '1707-03' },
            cites: [
              {
                source: 'britannica-1911-scotland',
                loc: { section: 'Scotland', para: '1466' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q6',
        text: 'Anne, from the beginning of her reign, advocated union, which, with the question of the succession, was the subject of constant and furious debates in the Scots parliament, till, on the 4th of March 1707, the act received the royal assent.',
        lang: 'en',
        cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1466' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1706' },
            cites: [
              {
                source: 'britannica-1911-scotland',
                loc: { section: 'Scotland', para: '1466' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'The final debates of 1706 were conducted under apprehensions of an invasion of Edinburgh by highlanders and wild western fanatics of the Covenant; but the astuteness of Harley’s agent in Edinburgh, de Foe, the resolution of Argyll and the tact of Queensberry, who easily terrified the duke of Hamilton, carried the measure into haven.',
        lang: 'en',
        cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1466' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1708-03' },
            cites: [
              {
                source: 'britannica-1911-scotland',
                loc: { section: 'Scotland', para: '1467' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'Friction about matters of trade was the instant sequel of the Union: so much ill-feeling was provoked that, in the general opinion, had King James VIII. landed alone when brought to the Scottish coast by Forbin’s fleet in March 1708, he would have carried Scotland with him.',
        lang: 'en',
        cite: { source: 'britannica-1911-scotland', loc: { section: 'Scotland', para: '1467' } },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Scotland'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/a/ad/Articles_of_Union_between_England_and_Scotland_28_Jan_1707.png/1280px-Articles_of_Union_between_England_and_Scotland_28_Jan_1707.png',
    page: 'https://commons.wikimedia.org/wiki/File:Articles_of_Union_between_England_and_Scotland_28_Jan_1707.png',
    credit: { institution: 'UK Parliamentary Archives', creator: 'Parliament of England' },
    license: { id: 'public-domain' }
  }
})
