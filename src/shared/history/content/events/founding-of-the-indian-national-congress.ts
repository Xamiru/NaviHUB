import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-indian-national-congress',
  names: [
    { text: 'Founding of the Indian National Congress', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1885' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '1' }
          },
          {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'The Seeds of Muslim Nationalism', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:mumbai',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'The Independence Movement', para: '1' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:british-raj' }
  ],
  participants: [
    {
      name: 'A.O. Hume',
      role: 'organizer',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'The Independence Movement', para: '1' }
        }
      ]
    }
  ],
  figures: [
    {
      key: 'participants',
      value: {
        alts: [
          {
            value: { min: 73 },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'The Independence Movement', para: '1' }
              }
            ]
          }
        ]
      }
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Inspired by the suggestion made by A.O. Hume, a retired British civil servant, seventy-three Indian delegates met in Bombay in 1885 and founded the Indian National Congress (Congress--see Glossary).',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/19.htm' }
        },
        {
          id: 'q2',
          text: 'In 1885 the Indian National Congress (also referred to as Congress) was founded to formulate proposals and demands to present to the British.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'The Seeds of Muslim Nationalism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/10.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'The decades following the Sepoy Rebellion were a period of growing political awareness, manifestation of Indian public opinion, and emergence of Indian leadership at national and provincial levels. Ominous economic uncertainties created by British colonial rule and the limited opportunities that awaited the ever-expanding number of Western-educated graduates began to dominate the rhetoric of leaders who had begun to think of themselves as a "nation," despite fissures along the lines of region, religion, language, and caste.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/19.htm' }
        },
        {
          id: 'q4',
          text: 'Meanwhile, the beginnings of the Indian nationalist movement were to be discerned in the increasing tendency to form all-India associations representing various interests.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'The Seeds of Muslim Nationalism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/10.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q5',
          text: 'At its inception, the Congress had no well-defined ideology and commanded few of the resources essential to a political organization.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/19.htm' }
        },
        {
          id: 'q6',
          text: 'Many of its members envisioned a long British period of tutelage and advocated strictly constitutionalist and gradualist reforms, but after World War I, Congress argued for a speedy end to alien rule.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'The Seeds of Muslim Nationalism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/10.htm' }
        }
      ]
    }
  ]
})
