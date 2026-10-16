import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'ottoman-interregnum',
  names: [
    { text: 'Ottoman interregnum', lang: 'en', role: 'primary' },
    {
      text: 'Interregnum',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } }
      ]
    }
  ],
  researched: '2026-10-16',
  type: 'crisis',
  start: {
    alts: [
      {
        value: { d: '1403' },
        cites: [
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1413' },
        cites: [
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1347' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:bursa',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } }
      ]
    },
    {
      ref: 'place:edirne',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } }
      ]
    }
  ],
  polities: [
    {
      ref: 'polity:ottoman-empire',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'Mussa',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } }
      ]
    },
    {
      name: 'Mahommed',
      role: 'leader',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } }
      ]
    }
  ],
  related: [
    {
      ref: 'event:battle-of-ankara',
      rel: 'preceded-by',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '3' }
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
          text: 'Some years of strife followed between the sons of Bayezid, in which three of them fell; Mussa, seizing Adrianople, laid siege to Constantinople, and Manuel Palaeologus, the emperor, appealed for aid to Mahommed, the other son, who had established himself at Brusa.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'Timur reached Brusa, and there laid hands on the treasure of Bayezid; one after another the cities of the Turks were seized and plundered by the Tatars.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q3',
          text: 'Meanwhile Timur sent letters after the fugitive sons of Bayezid promising to confer on them their father\'s dominions, and protesting that his attack had been due merely to the insulting tone adopted towards him by Bayezid and to the entreaties of the dispossessed princes of Asia Minor.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'Timur did not cross into Europe, and contented himself with accepting some trifling presents from the Greek emperor.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1346' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'The Turkish dominions in Asia Minor were extended, Amasia, Samsun and Janik being captured, and an insurrection of dervishes was quelled.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1347' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q6',
          text: 'His services in the regeneration of the Turkish power can hardly be over-estimated; all agree in recognizing his great qualities and the charm of his character; even Timur is said to have admired him so much as to offer him his daughter in marriage.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1347' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
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
            value: { d: '1413' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1347' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q7',
        text: 'In 1413 Mahommed defeated Mussa',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1347' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1421' },
            cites: [
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1347' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'In 1421 the sultan died.',
        lang: 'en',
        cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1347' } },
        provenance: {
          via: 'web',
          at: '2026-10-16',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fa/Sultan_Mehmed_I_in_discussion_with_a_religious_scholar_%28Ulama%29._Page_263._Tadj_al-Tawarikh_%28The_Crown_of_the_Chronicles%29%2C_1616%2C_Ottoman_%28Mus%C3%A9e_Jacquemart-Andr%C3%A9%2C_Ms_13141%29.jpg/1280px-thumbnail.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sultan_Mehmed_I_in_discussion_with_a_religious_scholar_(Ulama)._Page_263._Tadj_al-Tawarikh_(The_Crown_of_the_Chronicles),_1616,_Ottoman_(Mus%C3%A9e_Jacquemart-Andr%C3%A9,_Ms_13141).jpg',
    credit: { institution: 'Bibliothèque Mazarine' },
    license: { id: 'public-domain' }
  }
})
