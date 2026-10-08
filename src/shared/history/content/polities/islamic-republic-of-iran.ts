import { definePolity } from '../../schema'

export default definePolity({
  id: 'islamic-republic-of-iran',
  names: [
    { text: 'Islamic Republic of Iran', lang: 'en', role: 'primary' },
    {
      text: 'جمهوری اسلامی ایران',
      lang: 'fa',
      role: 'native',
      translit: 'Jomhūrī-ye Eslāmī-ye Īrān'
    }
  ],
  researched: '2026-10-09',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1979-04-01' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Consolidation of the Islamic Republic', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:tehran',
      start: {
        alts: [
          {
            value: { d: '1979-04-01' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'Consolidation of the Islamic Republic', para: '1' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Iran (Persia) (code 630), capital Tehran' }
        }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:pahlavi-iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'Consolidation of the Islamic Republic', para: '1' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'world', code: 630, from: 1979.11, to: 2019.999 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/c/ca/Flag_of_Iran.svg/1280px-Flag_of_Iran.svg.png',
    page: 'https://commons.wikimedia.org/wiki/File:Flag_of_Iran.svg',
    credit: {
      institution: 'Institute of Standards and Industrial Research of Iran (ISIRI)',
      creator: 'Hamid Nadimi'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Khomeini proclaimed the establishment of the Islamic Republic of Iran on April 1, 1979.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Consolidation of the Islamic Republic', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        },
        {
          id: 'q2',
          text: 'The government is based upon the Constitution that was approved in a national referendum in December 1979. This republican Constitution replaced the 1906 constitution, which, with its provisions for a shah to reign as head of state, was the earliest constitution in the Middle East.',
          lang: 'en',
          cite: { source: 'loc-iran-country-study-1987', loc: { section: 'Government', para: '1' } },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/81.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'A step in this direction was taken on March 30 and 31, 1979, when a national referendum was held to determine the kind of political system to be established. Khomeini rejected demands by various political groups and by Shariatmadari that voters be given a wide choice. The only form of government to appear on the ballot was an Islamic republic, and voting was not by secret ballot. The government reported an overwhelming majority of over 98 percent in favor of an Islamic republic.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Consolidation of the Islamic Republic', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        },
        {
          id: 'q4',
          text: 'March 30-31: The establishment of an Islamic Republic is approved in a nationwide referendum.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'A newly created seventy-three-member Assembly of Experts convened on August 18, 1979, to consider the draft constitution. Clerics, and members and supporters of the IRP dominated the assembly, which revamped the constitution to establish the basis for a state dominated by the Shia clergy. The Assembly of Experts completed its work on November 15, and the Constitution was approved in a national referendum on December 2 and 3, 1979, once again, according to government figures, by over 98 percent of the vote.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'Consolidation of the Islamic Republic', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/24.htm' }
        },
        {
          id: 'q6',
          text: 'September 12: The Assembly of Experts approves a clause in the new Constitution that grants supreme powers to the Supreme Leader (wali-ye faqih), Ayatollah Khomeini.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-4/'
          }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q7',
          text: 'The creation of the Islamic Republic of Iran in 1979 resulted in the destruction of the power and influence of the predominantly secular and Western-oriented political elite that had ruled Iran since the early part of the twentieth century.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Revolution and Social Change', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/31.htm' }
        }
      ]
    }
  ]
})
