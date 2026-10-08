import { definePerson } from '../../schema'

export default definePerson({
  id: 'hassan-ali-mansur',
  names: [
    { text: 'Hassan Ali Mansur', lang: 'en', role: 'primary' },
    { text: 'حسنعلی منصور', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-08',
  born: {
    alts: [
      {
        value: { d: '1923' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1965' }
          }
        ]
      }
    ]
  },
  died: {
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
  regions: ['iran'],
  roles: ['politician'],
  offices: [
    {
      title: 'prime minister',
      polity: 'polity:pahlavi-iran',
      start: {
        alts: [
          {
            value: { d: '1964-03' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'State and Society, 1964-74', para: '1' }
              },
              {
                source: 'iranica-milani-hoveyda',
                loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '13' }
              }
            ]
          }
        ]
      },
      end: {
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
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'State and Society, 1964-74', para: '1' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1964' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/55/Hassan_Ali_Mansur_2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Hassan_Ali_Mansur_2.jpg',
    credit: { institution: 'Political Studies and Research Institute (ir-psri.com)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Irān-e Novin Party is formed by Ḥasan-ʿAli Manṣur, a son of the former prime minister ʿAli Manṣur-al-Molk. It replaces the Melliyun Party as the majority party.',
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
          text: 'After the elections, the largest bloc in the new Majlis, with forty seats, was a group called the Progressive Center. The center, an exclusive club of senior civil servants, had been established by Hasan Ali Mansur in 1961 to study and make policy recommendations on major economic and social issues. In June 1963, the shah had designated the center as his personal research bureau. When the new Majlis convened in October, 100 more deputies joined the center, giving Mansur a majority. In December, Mansur converted the Progressive Center into a political party, the Iran Novin. In March 1964, Alam resigned and the shah appointed Mansur prime minister, at the head of an Iran Novin-led government.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/19.htm' }
        },
        {
          id: 'q3',
          text: 'In carrying out economic and administrative reforms, Mansur created four new ministries and transferred the authority for drawing up the budget from the Ministry of Finance to the newly created Budget Bureau. The bureau was attached to the Plan Organization and was responsible directly to the prime minister. In subsequent years it introduced greater rationality in planning and budgeting. Mansur appointed younger technocrats to senior civil service posts, a policy continued by his successor. He also created the Health Corps, modeled after the Literacy Corps, to provide primary health care to rural areas.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/iran/19.htm' }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q4',
          text: 'On Thursday 1 Bahman 1343 Š./21 January 1965, barely a year after reaching his lifelong goal of becoming Iran’s prime minister, Manṣur became the target of an assassination attempt.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
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
