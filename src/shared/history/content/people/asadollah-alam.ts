import { definePerson } from '../../schema'

export default definePerson({
  id: 'asadollah-alam',
  names: [
    { text: 'Asadollah Alam', lang: 'en', role: 'primary' },
    { text: 'اسدالله علم', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1962-07-19' },
            cites: [
              {
                source: 'iranica-azimi-bakhash-kakar-elections',
                loc: {
                  section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
                  para: '22'
                }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1964-03' },
            cites: [
              {
                source: 'iranica-milani-hoveyda',
                loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '13' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'State and Society, 1964-74', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: {
            section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
            para: '22'
          }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1962-64' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/b/b4/Alam_1961.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Alam_1961.jpg',
    credit: { institution: 'Magiran (Iranian press/periodical archive)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Ayatollah Khomeini launches a campaign against the Shah’s reforms; his ensuing imprisonment leads to anti-government rioting in Tehran and elsewhere, which are decisively crushed by prime minister Asad-Allāh ʿAlam.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1963' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
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
          text: 'Prime Minister Amir Asad-Allāh ʿAlam bitterly and begrudgingly submitted his resignation',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        },
        {
          id: 'q3',
          text: 'Watchful control and manipulation continued to extend to the local and municipal elections, whenever they were held, despite the arguments of royalists such as ʿAlam, who underlined the expediency of allowing free elections at those levels (ʿAlam, I, pp. 339-41).',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '24'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        }
      ]
    }
  ]
})
