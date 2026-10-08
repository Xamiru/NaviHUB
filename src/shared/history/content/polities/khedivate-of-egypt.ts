import { definePolity } from '../../schema'

export default definePolity({
  id: 'khedivate-of-egypt',
  names: [
    { text: 'Khedivate of Egypt', lang: 'en', role: 'primary' },
    { text: 'الخديوية المصرية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  polityType: 'emirate',
  start: {
    alts: [
      {
        value: { d: '1867' },
        cites: [
          { source: 'britannica-1911-khedive', loc: { section: 'KHEDIVE', para: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1914-11-03' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'FROM OCCUPATION TO NOMINAL INDEPENDENCE: 1882-1923', para: '6' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:cairo',
      cites: [
        { source: 'cshapes-2-dataset', loc: { section: 'Egypt (code 651), capital Cairo' } }
      ]
    }
  ],
  partOf: [
    {
      ref: 'polity:ottoman-empire',
      start: {
        alts: [
          {
            value: { d: '1867' },
            cites: [
              { source: 'britannica-1911-khedive', loc: { section: 'KHEDIVE', para: '1' } }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1914-11-03' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'FROM OCCUPATION TO NOMINAL INDEPENDENCE: 1882-1923', para: '6' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '5' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 127861 },
    { set: 'world', code: 651, to: 1914.84 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Khedive_Isma%27il_Pasha.png/1280px-Khedive_Isma%27il_Pasha.png',
    page: 'https://commons.wikimedia.org/wiki/File:Khedive_Isma%27il_Pasha.png',
    credit: { institution: 'Bibliothèque nationale de France (Gallica)', creator: 'Gustave Le Gray' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Egypt, though nominally under Turkish suzerainty, has formed a practically independent principality since 1841, and has been de facto under British protection since 1881.',
          lang: 'en',
          cite: { source: 'britannica-1911-turkey', loc: { section: 'TURKEY', para: '5' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Turkey'
          }
        },
        {
          id: 'q2',
          text: 'KHEDIVE, a Persian word meaning prince or sovereign, granted as a title by the sultan of Turkey in 1867 to his viceroy in Egypt, Ismail, in place of that of “vali.”',
          lang: 'en',
          cite: { source: 'britannica-1911-khedive', loc: { section: 'KHEDIVE', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Khedive'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Ismail achieved a considerable degree of independence from the Porte (from Sublime Porte, the term for the High Gate that came to be synonymous with the Ottoman government) by making large payments to the Ottoman treasury.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'ISMAIL, TAWFIQ, AND THE URABI REVOLT: Khedive Ismail, 1863-79',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/24.htm' }
        },
        {
          id: 'q4',
          text: 'The sultan also granted Ismail the formal title of khedive, which elevated his standing to a position closer to royalty.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'ISMAIL, TAWFIQ, AND THE URABI REVOLT: Khedive Ismail, 1863-79',
              para: '2'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/24.htm' }
        },
        {
          id: 'q5',
          text: 'These loans, added to the expensive concessions that Said had made concerning the Suez Canal, meant that by 1875 Egypt was £100 million in debt.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'ISMAIL, TAWFIQ, AND THE URABI REVOLT: Khedive Ismail, 1863-79',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/24.htm' }
        },
        {
          id: 'q6',
          text: 'Without the British presence, the khedival government would probably have collapsed.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'FROM OCCUPATION TO NOMINAL INDEPENDENCE: 1882-1923', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/26.htm' }
        },
        {
          id: 'q7',
          text: 'Cromer was an autocrat whose control over Egypt was more absolute than that of any Mamluk or khedive.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'FROM OCCUPATION TO NOMINAL INDEPENDENCE: 1882-1923', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/26.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q8',
          text: 'On November 3, the British government unilaterally declared Egypt a protectorate, severing the country from the Ottoman Empire.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'FROM OCCUPATION TO NOMINAL INDEPENDENCE: 1882-1923', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/egypt/26.htm' }
        }
      ]
    }
  ]
})
