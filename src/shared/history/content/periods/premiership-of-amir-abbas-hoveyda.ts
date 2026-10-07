import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'premiership-of-amir-abbas-hoveyda',
  names: [
    { text: 'Premiership of Amir-Abbas Hoveyda', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1965-01-26' },
        cites: [
          {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1977' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1965-77' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  parent: 'period:reign-of-mohammad-reza-shah',
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1d/PM_Amir_Abbas_Hoveyda.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:PM_Amir_Abbas_Hoveyda.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies (iichs.ir)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Hoveyda\'s appointment marked the beginning of nearly a decade of impressive economic growth and relative political stability at home. During this period, the shah also used Iran\'s enhanced economic and military strength to secure for the country a more influential role in the Persian Gulf region, and he improved relations with Iran\'s immediate neighbors and the Soviet Union and its allies. Hoveyda remained in office for the next twelve years, the longest term of any of Iran\'s modern prime ministers.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        },
        {
          id: 'q2',
          text: 'Hoveyda’s long tenure as the prime minister can be divided into two distinct phases: first, the latter half of the 1960s, and second, the first half of the 1970s.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'During this decade, the Iran Novin dominated the government and the Majlis. It won large majorities in both the 1967 and the 1971 elections. These elections were carefully controlled by the authorities.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        },
        {
          id: 'q4',
          text: 'Under Hoveyda the government improved its administrative machinery and launched what was dubbed "the education revolution." It adopted a new civil service code and a new tax law and appointed better qualified personnel to key posts.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        },
        {
          id: 'q5',
          text: 'Agrarian, premodern Iran gradually turned into a rapidly industrializing capitalist economy.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        }
      ]
    }
  ]
})
