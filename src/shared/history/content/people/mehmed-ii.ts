import { definePerson } from '../../schema'

export default definePerson({
  id: 'mehmed-ii',
  names: [
    { text: 'Mehmed II', lang: 'en', role: 'primary' },
    {
      text: 'Mehmet II',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        }
      ]
    },
    {
      text: 'Mahommed II',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1352' } }
      ]
    },
    {
      text: 'Mehmed the Conqueror',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } },
        {
          source: 'loc-name-authority-mehmed-ii',
          loc: { section: 'MARC field 400: variant headings' }
        }
      ]
    },
    {
      text: 'Fatih',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-name-authority-mehmed-ii',
          loc: { section: 'MARC field 400: variant headings' }
        }
      ]
    }
  ],
  researched: '2026-10-16',
  born: {
    alts: [
      {
        value: { d: '1432' },
        cites: [
          {
            source: 'loc-name-authority-mehmed-ii',
            loc: { section: 'MARC field 100 $d: heading dates' }
          },
          {
            source: 'loc-guide-ottoman-turkish-reference-works',
            loc: { section: 'Reference Works' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1481' },
        cites: [
          {
            source: 'loc-name-authority-mehmed-ii',
            loc: { section: 'MARC field 100 $d: heading dates' }
          },
          {
            source: 'loc-guide-ottoman-turkish-reference-works',
            loc: { section: 'Reference Works' }
          },
          { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1352' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  roles: ['monarch', 'military'],
  offices: [
    {
      title: 'Sultan of the Ottoman Empire',
      polity: 'polity:ottoman-empire',
      start: {
        alts: [
          {
            value: { d: '1444' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'The Ottoman Empire', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1481' },
            cites: [
              {
                source: 'loc-turkey-country-study-1995',
                loc: { section: 'The Ottoman Empire', para: '4' }
              },
              { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1352' } }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'The Ottoman Empire', para: '4' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/8/8d/Bellini%2C_Gentile_-_Portrait_of_Mehmed_II_-_National_Gallery%2C_London.jpg/1280px-Bellini%2C_Gentile_-_Portrait_of_Mehmed_II_-_National_Gallery%2C_London.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Bellini,_Gentile_-_Portrait_of_Mehmed_II_-_National_Gallery,_London.jpg',
    credit: { institution: 'National Gallery, London', creator: 'Gentile Bellini' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Mehmet II regarded himself as the direct successor to the Byzantine emperors.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'On becoming sultan in 1444, Mehmet II (r. 1444-46, 1451-81) immediately set out to conquer the city.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q3',
          text: 'The sultan triumphantly entered the palace of the emperors, and the next Friday\'s prayer was celebrated in the church of St Sofia',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1351' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q4',
          text: 'The independent princes of Asia Minor were now completely subjugated and their territories finally absorbed into the Turkish dominions; Walachia was next reduced to the state of a tributary province.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1352' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q5',
          text: 'The Crimea was next conquered and bestowed as a tributary province on the Tatar khan Mengli Girai.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1352' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q6',
          text: 'Mahommed now endeavoured to strike a blow at Rhodes, the stronghold of the Knights of St John, preparatory to carrying out his long-cherished plan of conquering Italy.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1352' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q7',
          text: 'He made Constantinople the imperial capital, as it had been under the Byzantine emperors, and set about rebuilding the city.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'The Ottoman Empire', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/turkey/6.htm' }
        },
        {
          id: 'q8',
          text: 'In 1481 the sultan was believed to be projecting a campaign against the Circassian rulers of Syria and Egypt, when he died at Gebzé.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1352' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q9',
          text: 'He is said to have been of a merry and even jocular disposition, to have afforded a generous patronage to learning, and, strange to say for a sultan, to have been master of six languages.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '1352' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        }
      ]
    }
  ]
})
