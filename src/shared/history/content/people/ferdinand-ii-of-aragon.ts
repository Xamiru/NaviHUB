import { definePerson } from '../../schema'

export default definePerson({
  id: 'ferdinand-ii-of-aragon',
  names: [
    { text: 'Ferdinand II of Aragon', lang: 'en', role: 'primary' },
    {
      text: 'Ferdinand V of Castile',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'britannica-1911-ferdinand-v-of-castile-and-ii-of-aragon',
          loc: { section: 'Ferdinand V. of Castile and Leon and II. of Aragon', para: '1' }
        }
      ]
    },
    {
      text: 'Fernando',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-1492-christopher-columbus',
          loc: { section: 'Christopher Columbus: Man and Myth', para: '2' }
        }
      ]
    },
    { text: 'Fernando II de Aragón', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1452-03-16' },
        cites: [
          {
            source: 'britannica-1911-ferdinand-v-of-castile-and-ii-of-aragon',
            loc: { section: 'Ferdinand V. of Castile and Leon and II. of Aragon', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1516-02-23' },
        cites: [
          {
            source: 'britannica-1911-ferdinand-v-of-castile-and-ii-of-aragon',
            loc: { section: 'Ferdinand V. of Castile and Leon and II. of Aragon', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  roles: ['monarch'],
  offices: [
    {
      title: 'King of Aragon',
      start: {
        alts: [
          {
            value: { d: '1479' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'THE GOLDEN AGE', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1516' },
            cites: [
              {
                source: 'britannica-1911-ferdinand-v-of-castile-and-ii-of-aragon',
                loc: { section: 'Ferdinand V. of Castile and Leon and II. of Aragon', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '2' }
        },
        {
          source: 'britannica-1911-ferdinand-v-of-castile-and-ii-of-aragon',
          loc: { section: 'Ferdinand V. of Castile and Leon and II. of Aragon', para: '1' }
        }
      ]
    },
    {
      title: 'King consort of Castile',
      start: {
        alts: [
          {
            value: { d: '1479' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'THE GOLDEN AGE', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1504' },
            cites: [
              {
                source: 'loc-spain-country-study-1988',
                loc: { section: 'THE GOLDEN AGE', para: '3' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE GOLDEN AGE', para: '3' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/7/74/Spanish_School%2C_15th_century_-_King_Ferdinand_V_of_Spain%2C_King_of_Aragon_%281452-1516%29_-_RCIN_403448_-_Royal_Collection.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Spanish_School,_15th_century_-_King_Ferdinand_V_of_Spain,_King_of_Aragon_(1452-1516)_-_RCIN_403448_-_Royal_Collection.jpg',
    credit: { institution: 'Royal Collection Trust' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The marriage in 1469 of royal cousins, Ferdinand of Aragon (1452-1516) and Isabella of Castile (1451-1504), eventually brought stability to both kingdoms.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q2',
          text: 'Greatly admired by Italian political theorist Niccolo Machiavelli (1469-1527), Ferdinand was one of the most skillful diplomats in an age of great diplomats, and he assigned to Castile its predominant role in the dual monarchy.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'FERDINAND V. of Castile and Leon, and II. of Aragon (1452–1516), was the son of John I. of Aragon by his second marriage with Joanna Henriquez, of the family of the hereditary grand admirals of Castile, and was born at Sos in Aragon on the 16th of March 1452.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-ferdinand-v-of-castile-and-ii-of-aragon',
            loc: { section: 'Ferdinand V. of Castile and Leon and II. of Aragon', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ferdinand_V._of_Castile_and_Leon_and_II._of_Aragon'
          }
        },
        {
          id: 'q4',
          text: 'His marriage in 1469 to his cousin Isabella of Castile was dictated by the desire to unite his own claims to the crown, as the head of the younger branch of the same family, with hers, in case Henry IV. should die childless.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-ferdinand-v-of-castile-and-ii-of-aragon',
            loc: { section: 'Ferdinand V. of Castile and Leon and II. of Aragon', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ferdinand_V._of_Castile_and_Leon_and_II._of_Aragon'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q5',
          text: 'Ferdinand and Isabella were proclaimed king and queen of Castile together, although the crown was hers alone, and although she never consented to part with her sovereign authority.',
          lang: 'en',
          cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '666' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
          }
        },
        {
          id: 'q6',
          text: 'The Treaty of Alcaçovas ended the war in September 1479, and as Ferdinand had succeeded his father in Aragon earlier in the same year, it was possible to link Castile with Aragon.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE GOLDEN AGE', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/spain/7.htm' }
        },
        {
          id: 'q7',
          text: 'His second marriage with Germaine of Foix in 1505 was apparently contracted in the hope that by securing an heir male he might punish his Habsburg son-in-law.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-ferdinand-v-of-castile-and-ii-of-aragon',
            loc: { section: 'Ferdinand V. of Castile and Leon and II. of Aragon', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ferdinand_V._of_Castile_and_Leon_and_II._of_Aragon'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q8',
          text: 'Ferdinand died at Madrigalejo in Estremadura on the 23rd of February 1516.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-ferdinand-v-of-castile-and-ii-of-aragon',
            loc: { section: 'Ferdinand V. of Castile and Leon and II. of Aragon', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Ferdinand_V._of_Castile_and_Leon_and_II._of_Aragon'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q9',
          text: 'The death of John, the only son of Ferdinand and Isabella, the worst misfortune which ever happened to Spain, opened the succession to all the crowns and coronets worn by the Catholic sovereigns to Charles of Habsburg—the emperor Charles V. From that day Spain became a part—the leader, then the paymaster, then the dupe—of the international monarchical confederation called “the illustrious House of Austria.”',
          lang: 'en',
          cite: { source: 'britannica-1911-spain', loc: { section: 'SPAIN', para: '665' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Spain'
          }
        }
      ]
    }
  ]
})
