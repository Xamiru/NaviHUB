import { definePerson } from '../../schema'

export default definePerson({
  id: 'amir-abbas-hoveyda',
  names: [
    { text: 'Amir-Abbas Hoveyda', lang: 'en', role: 'primary' },
    { text: 'امیرعباس هویدا', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-07',
  born: {
    alts: [
      {
        value: { d: '1919-02-19' },
        cites: [
          {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '1' }
          }
        ]
      }
    ]
  },
  died: {
    alts: [
      {
        value: { d: '1979-04-07' },
        cites: [
          {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '1' }
          }
        ]
      }
    ]
  },
  bornIn: {
    ref: 'place:tehran',
    cites: [
      { source: 'iranica-milani-hoveyda', loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '1' } }
    ]
  },
  regions: ['iran'],
  roles: ['politician', 'diplomat'],
  offices: [
    {
      title: 'minister of finance',
      start: {
        alts: [
          {
            value: { d: '1964-03' },
            cites: [
              {
                source: 'iranica-milani-hoveyda',
                loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '13' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-milani-hoveyda',
          loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '13' }
        }
      ]
    },
    {
      title: 'prime minister',
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
      cites: [
        {
          source: 'iranica-milani-hoveyda',
          loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '17' }
        },
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1965-77' }
        }
      ]
    }
  ],
  portrait: {
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
          text: 'HOVEYDA, AMIR-ABBAS (Amir ʿAbbās Hoveydā), the longest serving prime minister in the modern history of Iran (b. 28 Bahman 1297 Š./19 February 1919; d. 18 Farvardin 1359 Š./7 April 1979; Figure 1). He was born in Tehran to a family of hybrid affinities and identity (Milani, p. 37).',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '1' }
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
      kind: 'early-life',
      quotes: [
        {
          id: 'q2',
          text: 'Amir-ʿAbbās was only two when his father, by then a mid-level diplomat in Iran’s foreign ministry, was dispatched to Damascus. The young Hoveyda thus spent a great deal of his childhood and youth abroad, first in Damascus, then in Beirut, Paris, London, and Brussels.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '2' }
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
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'By this time Manṣur was also back in Tehran, and together with Hoveyda he formed what eventually was called “the Progressive Circle” (Kānun-e motaraqqi).',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        },
        {
          id: 'q4',
          text: 'In the course of conducting his ministerial duties, Hoveyda had his first private audience with the shah. All evidence indicates that the king took an almost instant liking to Hoveyda.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/20261002185029/https://www.iranicaonline.org/articles/hoveyda-amir-abbas/'
          }
        },
        {
          id: 'q5',
          text: 'Hoveyda was often criticized for further contributing to the demise and denigration of the office of the prime minister. He lived to rue the day he said that he was no more than a chief of staff to the shah.',
          lang: 'en',
          cite: {
            source: 'iranica-milani-hoveyda',
            loc: { section: 'HOVEYDA, AMIR-ABBAS', para: '21' }
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
