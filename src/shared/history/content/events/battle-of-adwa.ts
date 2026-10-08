import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'battle-of-adwa',
  names: [
    { text: 'Battle of Adwa', lang: 'en', role: 'primary' },
    { text: 'የዓድዋ ጦርነት', lang: 'am', role: 'native' },
    {
      text: 'Adua',
      lang: 'de',
      role: 'alternative',
      cites: [
        { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '21' } }
      ]
    }
  ],
  researched: '2026-10-08',
  type: 'battle',
  start: {
    alts: [
      {
        value: { d: '1896-03-01' },
        cites: [
          { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '20' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:adwa',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'The Reign of Menelik II, 1889-1913', para: '6' }
        }
      ]
    }
  ],
  sides: [
    {
      key: 'ethiopia',
      name: 'Ethiopia',
      polity: 'polity:ethiopian-empire',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'The Reign of Menelik II, 1889-1913', para: '6' }
        }
      ]
    },
    {
      key: 'italy',
      name: 'Italy',
      polity: 'polity:kingdom-of-italy',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'The Reign of Menelik II, 1889-1913', para: '6' }
        }
      ]
    }
  ],
  participants: [
    {
      ref: 'person:menelik-ii',
      role: 'commander',
      side: 'ethiopia',
      cites: [
        {
          source: 'loc-ethiopia-country-study-1991',
          loc: { section: 'The Reign of Menelik II, 1889-1913', para: '6' }
        },
        { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '21' } }
      ]
    },
    {
      name: 'Francesco Crispi',
      role: 'head-of-government',
      side: 'italy',
      cites: [
        { source: 'lemo-chronik-1896', loc: { section: 'Chronik 1896', para: '21' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'Italian ambitions were encouraged by British actions in 1891, when, hoping to stabilize the region in the face of the Mahdist threat in Sudan, Britain agreed with the Italian government that Ethiopia should fall within the Italian sphere of influence.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/15.htm' }
        },
        {
          id: 'q2',
          text: 'Italian-Ethiopian relations reached a low point in 1895, when Ras Mengesha of Tigray, hitherto reluctant to recognize the Shewan emperor\'s claims, was threatened by the Italians and asked for the support of Menelik.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/15.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q10',
          text: 'In 1893 Menelek denounced the treaty of Uccialli, and eventually, in a great battle, fought at Adowa on the 1st of March 1896, the Italians were disastrously defeated.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-africa',
            loc: { section: 'AFRICA, V. Partition among European Powers', para: '65' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Africa'
          }
        },
        {
          id: 'q3',
          text: 'In late 1895, Italian forces invaded Tigray.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/15.htm' }
        },
        {
          id: 'q4',
          text: 'However, Menelik completely routed them in early 1896 as they approached the Tigrayan capital, Adwa.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/15.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'This victory brought Ethiopia new prestige as well as general recognition of its sovereign status by the European powers.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/15.htm' }
        },
        {
          id: 'q7',
          text: 'Besides confirming the annulment of the Treaty of Wuchale, the peace agreement ending the conflict also entailed Italian recognition of Ethiopian independence; in return, Menelik permitted the Italians to retain their colony of Eritrea.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'The Reign of Menelik II, 1889-1913', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/ethiopia/15.htm' }
        },
        {
          id: 'q11',
          text: 'They produced so little effect that the general election of 1895 gave Crispi a huge majority, but, a year later, the defeat of the Italian army at Adowa in Abyssinia brought about his resignation.',
          lang: 'en',
          cite: {
            source: 'britannica-1911-crispi',
            loc: { section: 'CRISPI, FRANCESCO', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Crispi,_Francesco'
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
            value: { d: '1896-10-26' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '110' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'On the 26th of October following a provisional treaty of peace was concluded at Adis Ababa, annulling the treaty of Uccialli and recognizing the absolute independence of Abyssinia.',
        lang: 'en',
        cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '110' } },
        provenance: {
          via: 'web',
          at: '2026-10-07',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/27/Ethiopian_painting%2C_Battle_of_Adwa%2C_1896.jpg/1280px-Ethiopian_painting%2C_Battle_of_Adwa%2C_1896.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Ethiopian_painting,_Battle_of_Adwa,_1896.jpg',
    credit: { institution: 'British Museum', creator: 'Szilas' },
    license: { id: 'cc-by-sa', version: '4.0' }
  },
  furtherReading: [
    { source: 'bahru-zewde-1991-a-history-of-modern-ethiopia', perspective: 'african' },
    { source: 'del-boca-1976-gli-italiani-in-africa-orientale', perspective: 'european' }
  ]
})
