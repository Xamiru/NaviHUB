import { definePerson } from '../../schema'

export default definePerson({
  id: 'charles-gordon',
  names: [
    { text: 'Charles George Gordon', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  born: {
    alts: [
      {
        value: { d: '1833-01-28' },
        cites: [
          {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1885-01-26' },
        cites: [
          {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
          }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:khartoum',
    cites: [
      {
        source: 'britannica-1911-gordon-charles-george',
        loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
      }
    ]
  },
  regions: ['europe', 'subsaharan-africa', 'east-asia'],
  roles: ['military'],
  offices: [
    {
      title: 'Governor-general of the Sudan',
      start: {
        alts: [
          {
            value: { d: '1877' },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'THE MAHDIYAH, 1884-98', para: '2' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1880' },
            cites: [
              {
                source: 'loc-sudan-country-study-1991',
                loc: { section: 'THE MAHDIYAH, 1884-98', para: '2' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '2' }
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
          text: 'GORDON, CHARLES GEORGE (1833–1885), British soldier and administrator, fourth son of General H. W. Gordon, Royal Artillery, was born at Woolwich on the 28th of January 1833.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'But his stay in England In China.was brief, for in 1860 war was declared against China, and Gordon was ordered out there, arriving at Tientsin in September.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        },
        {
          id: 'q3',
          text: 'After the removal, in 1877, of Ismail, who had appointed him to the post, Gordon resigned as governor general of Sudan in 1880.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q4',
          text: 'The British government then asked General Gordon to proceed to Khartum to report on the best method of carrying out the evacuation.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q5',
          text: 'On the 24th Wilson started with two of the steamers for Khartum, but on arriving there on the 28th he found that the place had been captured by the rebels and Gordon killed two days before.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        },
        {
          id: 'q6',
          text: 'The last words of his last letter to his sister, written when he knew that death was very near, sum up his character:',
          lang: 'en',
          cite: {
            source: 'britannica-1911-gordon-charles-george',
            loc: { section: 'GORDON, CHARLES GEORGE', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Gordon,_Charles_George'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Portret_van_Charles_George_Gordon%2C_RP-F-2001-7-1091-1.jpg/1280px-Portret_van_Charles_George_Gordon%2C_RP-F-2001-7-1091-1.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portret_van_Charles_George_Gordon,_RP-F-2001-7-1091-1.jpg',
    credit: { institution: 'Rijksmuseum' },
    license: { id: 'cc0' }
  }
})
