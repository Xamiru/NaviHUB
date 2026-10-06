import { definePerson } from '../../schema'

export default definePerson({
  id: 'mohammad-reza-pahlavi',
  names: [
    { text: 'Mohammad Reza Shah Pahlavi', lang: 'en', role: 'primary' },
    { text: 'محمدرضا شاه پهلوی', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  regions: ['iran'],
  roles: ['monarch'],
  offices: [
    {
      title: 'shah of Iran',
      start: {
        alts: [
          {
            value: { d: '1941-09-16' },
            cites: [
              {
                source: 'iranica-yarshater-iranian-history-islamic-period-6',
                loc: {
                  section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
                }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1979' },
            cites: [
              {
                source: 'iranica-yarshater-iranian-history-islamic-period-6',
                loc: {
                  section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
                }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-iranian-history-islamic-period-6',
          loc: {
            section: 'IRAN ii. IRANIAN HISTORY (2) Islamic period, Moḥammad Reza Shah (1941-79)'
          }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'early-life',
      quotes: [
        {
          id: 'q1',
          text: 'Marriage of Crown Prince Moḥammad-Reżā to Fawzia, sister of King Faruq of Egypt.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1939' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q2',
          text: 'Reza Shah knew the Allies would not permit him to remain in power, so he abdicated on September 16 in favor of his son, who ascended the throne as Mohammad Reza Shah Pahlavi.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'WORLD WAR II AND THE AZARBAIJAN CRISIS', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/16.htm' }
        },
        {
          id: 'q3',
          text: 'The British acquiesced grudgingly in the assumption of the throne by Moḥammad-Reżā Pahlavi, “subject to good behaviour”',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q4',
          text: 'Without British backing or acquiescence, the shah, although considerably emboldened by the assassination attempt on his life (15 Bahman 1327 Š./4 February 1949) would have felt less confident to proceed with his plans.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '17' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        },
        {
          id: 'q5',
          text: 'Moḥammad-Reżā Shah visits the United States, consolidating his relations with President Truman.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1949' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/20/Photograph_of_President_Truman_and_the_Shah_of_Iran_in_the_Oval_Office._-_NARA_-_200149.jpg/1280px-Photograph_of_President_Truman_and_the_Shah_of_Iran_in_the_Oval_Office._-_NARA_-_200149.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Photograph_of_President_Truman_and_the_Shah_of_Iran_in_the_Oval_Office._-_NARA_-_200149.jpg',
    credit: { institution: 'US National Archives and Records Administration', creator: 'Abbie Rowe' },
    license: { id: 'public-domain' }
  }
})
