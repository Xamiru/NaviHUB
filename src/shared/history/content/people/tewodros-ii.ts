import { definePerson } from '../../schema'

export default definePerson({
  id: 'tewodros-ii',
  names: [
    { text: 'Tewodros II', lang: 'en', role: 'primary' },
    { text: 'ዳግማዊ ቴዎድሮስ', lang: 'am', role: 'native' },
    {
      text: 'Theodore',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '72' } }
      ]
    },
    {
      text: 'Kassa',
      lang: 'en',
      role: 'former',
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '70' } }
      ]
    }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1818' },
        cites: [
          { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '70' } }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1868-04-13' },
        cites: [
          { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
        ]
      }
    ]
  },
  diedIn: {
    ref: 'place:magdala',
    cites: [
      { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } }
    ]
  },
  regions: ['subsaharan-africa'],
  roles: ['monarch'],
  offices: [
    {
      title: 'Emperor of Ethiopia',
      polity: 'polity:ethiopian-empire',
      start: {
        alts: [
          {
            value: { d: '1855-02' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '70' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1868-04-13' },
            cites: [
              {
                source: 'britannica-1911-abyssinia',
                loc: { section: 'ABYSSINIA', para: '76' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '70' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Tewodros II\'s origins were in the Era of the Princes, but his ambitions were not those of the regional nobility.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        },
        {
          id: 'q2',
          text: 'He sought to reestablish a cohesive Ethiopian state and to reform its administration and church.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        }
      ]
    },
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q3',
          text: 'Lij (＝Mr) Kassa was born in Kwara, a small district of Western Amhara, in 1818.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '70' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q4',
          text: 'Shortly afterwards Kassa moved against Tigré, defeated Ubié’s forces at Deragié, in Simen (February 1855), took their chief prisoner and proclaimed himself negūs negusti of Ethiopia under the name of Theodore III.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '70' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        },
        {
          id: 'q5',
          text: 'Tewodros\'s first task was to bring Shewa under his control.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        },
        {
          id: 'q6',
          text: 'He sought to establish the principle that governors and judges must be salaried appointees.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        },
        {
          id: 'q7',
          text: 'He also established a professional standing army, rather than depending on local lords to provide soldiers for his expeditions.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        },
        {
          id: 'q8',
          text: 'He is described as being generous to excess, free from cupidity, merciful to his vanquished enemies, and strictly continent, but subject to violent bursts of anger and possessed of unyielding pride and fanatical religious zeal.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '73' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q9',
          text: 'The same day (13th April) Magdala was stormed and taken, practically without loss, and within they found the dead body of the emperor, who had fallen by his own hand.',
          lang: 'en',
          cite: { source: 'britannica-1911-abyssinia', loc: { section: 'ABYSSINIA', para: '76' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Abyssinia'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q10',
          text: 'Essentially, Tewodros was a talented military campaigner but a poor politician.',
          lang: 'en',
          cite: {
            source: 'loc-ethiopia-country-study-1991',
            loc: { section: 'From Tewodros II to Menelik II, 1855-89', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/ethiopia/14.htm' }
        }
      ]
    }
  ]
})
