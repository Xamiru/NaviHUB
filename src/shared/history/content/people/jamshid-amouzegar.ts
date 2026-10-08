import { definePerson } from '../../schema'

export default definePerson({
  id: 'jamshid-amouzegar',
  names: [
    { text: 'Jamshid Amouzegar', lang: 'en', role: 'primary' },
    { text: 'جمشید آموزگار', lang: 'fa', role: 'native', translit: 'Jamšid Āmuzegār' }
  ],
  researched: '2026-10-09',
  died: {
    alts: [
      {
        value: { d: '2016' },
        cites: [
          {
            source: 'gnd-1114933783',
            loc: { section: 'Lebensdaten: 1923-2016' }
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
            value: { d: '1977-08-05' },
            cites: [
              {
                source: 'iranica-milani-hoveyda',
                loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '27' }
              }
            ],
            heldBy: [
              { kind: 'scholar', name: 'Abbas Milani' }
            ]
          },
          {
            value: { d: '1977-07' },
            cites: [
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '5' }
              }
            ],
            heldBy: [
              { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1978-08-27' },
            cites: [
              {
                source: 'iranica-yarshater-chronology-part-4',
                loc: { section: 'Chronology of Iranian History Part 4, 1978' }
              },
              {
                source: 'loc-iran-country-study-1987',
                loc: { section: 'The Coming of the Revolution', para: '9' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-4',
          loc: { section: 'Chronology of Iranian History Part 4, 1977' }
        },
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'The Coming of the Revolution', para: '5' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/d/d6/Jamshid_Amouzegar_Speech.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Jamshid_Amouzegar_Speech.jpg',
    credit: {
      institution: 'National Library and Archives of the Islamic Republic of Iran (dl.nlai.ir)'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Jamšid Āmuzegār, a capable technocrat of dour disposition and little political finesse, was named his successor.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '27' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-09',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        },
        {
          id: 'q1',
          text: '1977 Jamšid Āmuzegār, a former minister of health, minister of labor, and minister of finance, with a reputation for rectitude, assumes the premiership.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1977' }
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
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In July the shah replaced Hoveyda, his prime minister of twelve years, with Jamshid Amuzegar, who had served for over a decade in various cabinet posts. Unfortunately for the shah, however, Amuzegar also became unpopular, as he attempted to slow the overheated economy with measures that, although generally thought necessary, triggered a downturn in employment and private sector profits that would later compound the government\'s problems.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        },
        {
          id: 'q4',
          text: 'Following the Rex Cinema fire, the shah removed Amuzegar and named Jafar Sharif-Emami prime minister.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'The Coming of the Revolution', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-09', url: 'http://countrystudies.us/iran/21.htm' }
        }
      ]
    }
  ],
  born: {
    alts: [
      {
        value: { d: '1923' },
        cites: [
          {
            source: 'lc-names-n2003070323',
            loc: { section: 'Āmūzgār, Jamshīd, 1923 or 1924-' }
          }
        ]
      },
      {
        value: { d: '1924' },
        cites: [
          {
            source: 'lc-names-n2003070323',
            loc: { section: 'Āmūzgār, Jamshīd, 1923 or 1924-' }
          }
        ]
      }
    ]
  }
})
