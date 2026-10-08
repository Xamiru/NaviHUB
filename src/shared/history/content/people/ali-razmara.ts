import { definePerson } from '../../schema'

export default definePerson({
  id: 'ali-razmara',
  names: [
    { text: 'Ali Razmara', lang: 'en', role: 'primary' },
    { text: 'حاجعلی رزم‌آرا', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1902' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1951' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1951-03-07' },
        cites: [
          {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
          },
          {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '43' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1950-06-26' },
            cites: [
              {
                source: 'iranica-rahnema-kashani',
                loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '38' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1951-03-07' },
            cites: [
              {
                source: 'iranica-kazemi-fedaian-e-eslam',
                loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '8' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '38' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '2' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/da/Iran_Over_Volcano_-_Razmara%2C_the_Prime_Minister.png/1280px-Iran_Over_Volcano_-_Razmara%2C_the_Prime_Minister.png',
    page: 'https://commons.wikimedia.org/wiki/File:Iran_Over_Volcano_-_Razmara,_the_Prime_Minister.png',
    credit: { institution: 'Akhbar al-Yawm' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'General Ḥājj-ʿAli Razmārā is appointed prime minister with the tacit support of the United States and Britain.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1950' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q2',
          text: 'Subsequent negotiations with the AIOC were unsuccessful, partly because General Ali Razmara, who became prime minister in June 1950, failed to persuade the oil company of the strength of nationalist feeling in the country and in the Majlis.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/17.htm' }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'Kāšāni’s line of attack on Razmārā was very similar to Moṣaddeq’s. Kāšāni warned of invisible hands pushing Iran into “the clutches of a dictatorship.” He argued that Razmārā was trying to usurp power with the support and intervention of foreigners.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '38' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'On 7 March 1951 Razmārā was shot to death at The Shah’s Mosque (Masjed-e šāh). Ḵalil Ṭahmāsbi, a 26-year-old member of the Fedāʾiān-e Eslām, was arrested for his murder.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '43' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    }
  ]
})
