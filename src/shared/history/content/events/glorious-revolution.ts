import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'glorious-revolution',
  names: [
    { text: 'Glorious Revolution', lang: 'en', role: 'primary' },
    {
      text: 'Revolution of 1688',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-william-iii-king-of-england',
          loc: { section: 'William III., King of England', para: '13' }
        }
      ]
    }
  ],
  researched: '2026-10-13',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1688-06' },
        cites: [
          {
            source: 'britannica-1911-james-ii-of-great-britain-and-ireland',
            loc: { section: 'James II. of Great Britain and Ireland', para: '2' }
          },
          {
            source: 'britannica-1911-william-iii-king-of-england',
            loc: { section: 'William III., King of England', para: '4' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1689-02' },
        cites: [
          {
            source: 'britannica-1911-william-iii-king-of-england',
            loc: { section: 'William III., King of England', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  polities: [
    {
      ref: 'polity:kingdom-of-england',
      cites: [
        {
          source: 'britannica-1911-william-iii-king-of-england',
          loc: { section: 'William III., King of England', para: '5' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'William of Orange',
      role: 'leader',
      cites: [
        {
          source: 'britannica-1911-william-iii-king-of-england',
          loc: { section: 'William III., King of England', para: '5' }
        }
      ]
    },
    {
      name: 'James II',
      role: 'head-of-state',
      cites: [
        {
          source: 'britannica-1911-james-ii-of-great-britain-and-ireland',
          loc: { section: 'James II. of Great Britain and Ireland', para: '2' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:english-civil-war',
      rel: 'caused-by',
      cites: [
        {
          source: 'britannica-1911-william-iii-king-of-england',
          loc: { section: 'William III., King of England', para: '5' }
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
          text: 'Protestant nobles of England, enraged at the tolerant policy of James, had been in negotiation with William of Orange since 1687.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-james-ii-of-great-britain-and-ireland',
            loc: { section: 'James II. of Great Britain and Ireland', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/James_II._of_Great_Britain_and_Ireland'
          }
        },
        {
          id: 'q2',
          text: 'James remained in a fool’s paradise till the last, and only awakened to his danger when William landed at Torbay (November 5, 1688) and swept all before him.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-james-ii-of-great-britain-and-ireland',
            loc: { section: 'James II. of Great Britain and Ireland', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/James_II._of_Great_Britain_and_Ireland'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'In April 1687 he published a Declaration of Indulgence—exempting Catholics and Dissenters from penal statutes.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-james-ii-of-great-britain-and-ireland',
            loc: { section: 'James II. of Great Britain and Ireland', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/James_II._of_Great_Britain_and_Ireland'
          }
        },
        {
          id: 'q4',
          text: 'Seven bishops refused, were indicted by James for libel, but acquitted amid the indescribable enthusiasm of the populace.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-james-ii-of-great-britain-and-ireland',
            loc: { section: 'James II. of Great Britain and Ireland', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/James_II._of_Great_Britain_and_Ireland'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'A constitutional settlement was effected by the end of 1689, almost all the disputed points between king and parliament being settled in favour of the latter.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-william-iii-king-of-england',
            loc: { section: 'William III., King of England', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_III.,_King_of_England'
          }
        },
        {
          id: 'q6',
          text: 'His own initiative is more clearly traceable in the Toleration Act, extending liberty of private worship to Dissenters.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-william-iii-king-of-england',
            loc: { section: 'William III., King of England', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_III.,_King_of_England'
          }
        },
        {
          id: 'q7',
          text: 'After his defeat at the Boyne (July 1, 1690) he speedily departed from Ireland, where he had so conducted himself that his English followers had been ashamed of his incapacity, while French officers had derided him.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-james-ii-of-great-britain-and-ireland',
            loc: { section: 'James II. of Great Britain and Ireland', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/James_II._of_Great_Britain_and_Ireland'
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
            value: { d: '1688-06' },
            cites: [
              {
                source: 'britannica-1911-william-iii-king-of-england',
                loc: { section: 'William III., King of England', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On the 30th of June 1688 Admiral Herbert, disguised as a bluejacket, set out from England with a letter from seven influential Englishmen, asking William to “bring over an army and secure the infringed liberties” of England.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-william-iii-king-of-england',
          loc: { section: 'William III., King of England', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_III.,_King_of_England'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1688-11' },
            cites: [
              {
                source: 'britannica-1911-william-iii-king-of-england',
                loc: { section: 'William III., King of England', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q9',
        text: 'William set out from Holland with an army on the 2nd of November and landed at Torbay (Nov. 5th 1688).',
        lang: 'en',
        cite: {
          source: 'britannica-1911-william-iii-king-of-england',
          loc: { section: 'William III., King of England', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_III.,_King_of_England'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1688-12' },
            cites: [
              {
                source: 'britannica-1911-james-ii-of-great-britain-and-ireland',
                loc: { section: 'James II. of Great Britain and Ireland', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'He was intercepted at Faversham and brought back, but the politic prince of Orange allowed him to escape a second time (December 23, 1688).',
        lang: 'en',
        cite: {
          source: 'britannica-1911-james-ii-of-great-britain-and-ireland',
          loc: { section: 'James II. of Great Britain and Ireland', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/James_II._of_Great_Britain_and_Ireland'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1689-01' },
            cites: [
              {
                source: 'britannica-1911-william-iii-king-of-england',
                loc: { section: 'William III., King of England', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'After this final flight of James, William, on the advice of an assembly of notables, summoned a convention parliament on the 22nd of January 1689.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-william-iii-king-of-england',
          loc: { section: 'William III., King of England', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_III.,_King_of_England'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1689-02' },
            cites: [
              {
                source: 'britannica-1911-william-iii-king-of-england',
                loc: { section: 'William III., King of England', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'After a great deal of discussion, William was at length proclaimed joint-sovereign of England in conjunction with his wife, Mary (Feb. 13th 1689).',
        lang: 'en',
        cite: {
          source: 'britannica-1911-william-iii-king-of-england',
          loc: { section: 'William III., King of England', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-13',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/William_III.,_King_of_England'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/09/Joseph_Mallord_William_Turner_%281775-1851%29_-_The_Prince_of_Orange%2C_William_III%2C_Embarked_from_Holland%2C_and_Landed_at_Torbay%2C_November_4th%2C_1688%2C_after_a_Stormy_Passage_-_N00369_-_National_Gallery.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Joseph_Mallord_William_Turner_(1775-1851)_-_The_Prince_of_Orange,_William_III,_Embarked_from_Holland,_and_Landed_at_Torbay,_November_4th,_1688,_after_a_Stormy_Passage_-_N00369_-_National_Gallery.jpg',
    credit: { institution: 'Tate', creator: 'J. M. W. Turner' },
    license: { id: 'public-domain' }
  }
})
