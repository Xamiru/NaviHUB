import { definePerson } from '../../schema'

export default definePerson({
  id: 'saad-zaghlul',
  names: [
    { text: 'Saad Zaghlul', lang: 'en', role: 'primary' },
    { text: 'سعد زغلول', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1859' },
        cites: [
          {
            source: 'eo1418-rose-egypt',
            loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '5' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1927' },
        cites: [
          {
            source: 'eo1418-rose-egypt',
            loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  roles: ['politician', 'revolutionary'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:kingdom-of-egypt',
      start: {
        alts: [
          {
            value: { d: '1924' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'The Rise and Decline of the Wafd, 1924-39', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1924-11-24' },
            cites: [
              {
                source: 'loc-egypt-country-study-1990',
                loc: { section: 'The Rise and Decline of the Wafd, 1924-39', para: '5' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'The Rise and Decline of the Wafd, 1924-39', para: '4' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'The delegation was headed by Saad Zaghlul (1859-1927), a lawyer originally from Kafr el-Shaykh in the Nile Delta, Ali Sha’arawi (1849-1922), and Abd al-Aziz Fahmy Bey (1870-1951).',
          lang: 'en',
          cite: {
            source: 'eo1418-rose-egypt',
            loc: { section: 'Increased Disease Rates and Neglect of Public Health', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://encyclopedia.1914-1918-online.net/article/egypt/'
          }
        },
        {
          id: 'q2',
          text: 'On April 4, 1921, Zaghlul\'s return to Egypt was met by an unprecedented welcome, showing that the vast majority of Egyptians supported him.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Egypt under the Protectorate and the 1919 Revolution', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/28.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/15/Zaghlul_Pacha_-_btv1b53119930j.jpg/1280px-Zaghlul_Pacha_-_btv1b53119930j.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Zaghlul_Pacha_-_btv1b53119930j.jpg',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Agence Rol' },
    license: { id: 'public-domain' }
  }
})
