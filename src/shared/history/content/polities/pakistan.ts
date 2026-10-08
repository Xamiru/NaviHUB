import { definePolity } from '../../schema'

export default definePolity({
  id: 'pakistan',
  names: [
    { text: 'Pakistan', lang: 'en', role: 'primary' },
    { text: 'پاکستان', lang: 'ur', role: 'native' },
    {
      text: 'Dominion of Pakistan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'legislation-gov-uk-indian-independence-act-1947',
          loc: { section: 'Section 1' }
        }
      ]
    },
    {
      text: 'Islamic Republic of Pakistan',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'Early Constitution Building', para: '3' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1947-08' },
        cites: [
          {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'INDEPENDENT PAKISTAN', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:karachi',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'INDEPENDENT PAKISTAN', para: '3' }
        }
      ]
    },
    {
      ref: 'place:islamabad',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Pakistan (code 770), capital Islamabad' }
        }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:british-raj' }
  ],
  cshapes: [
    { set: 'world', code: 770, from: 1947.62 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Muhammad_Ali_Jinnah.png',
    page: 'https://commons.wikimedia.org/wiki/File:Muhammad_Ali_Jinnah.png',
    credit: { institution: 'Press Information Department of Pakistan' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In August 1947, Pakistan was faced with a number of problems, some immediate but others long term.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'INDEPENDENT PAKISTAN', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/14.htm' }
        },
        {
          id: 'q2',
          text: 'The territory of Pakistan was divided into two parts at independence, separated by about 1,600 kilometers of Indian territory.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'INDEPENDENT PAKISTAN', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/14.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Even its capital, Karachi, was a second choice--Lahore was rejected because it was too close to the Indian border.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'INDEPENDENT PAKISTAN', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/14.htm' }
        },
        {
          id: 'q4',
          text: 'The revived Constituent Assembly promulgated Pakistan\'s first indigenous constitution in 1956 and reconstituted itself as the national legislature--the Legislative Assembly--under the constitution it adopted. Pakistan became an Islamic republic.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Early Constitution Building', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/60.htm' }
        },
        {
          id: 'q5',
          text: 'The governor general was replaced by a president, but despite efforts to create regional parity between the East Wing and the West Wing, the regional tensions remained.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Early Constitution Building', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/pakistan/60.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'jalal-1990-the-state-of-martial-rule', perspective: 'south-asian' },
    {
      source: 'ikram-1977-modern-muslim-india-and-the-birth-of-pakistan',
      perspective: 'south-asian'
    }
  ]
})
