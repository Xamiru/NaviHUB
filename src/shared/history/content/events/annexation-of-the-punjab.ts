import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'annexation-of-the-punjab',
  names: [
    { text: 'Annexation of the Punjab', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'occupation',
  start: {
    alts: [
      {
        value: { d: '1849' },
        cites: [
          {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'COMPANY RULE', para: '4' }
          },
          {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'COMPANY RULE', para: '6' }
          },
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Company Rule, 1757-1857', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:lahore',
      cites: [
        {
          source: 'loc-pakistan-country-study-1994',
          loc: { section: 'COMPANY RULE', para: '4' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'James Andrew Brown Ramsay (Marquess of Dalhousie)',
      role: 'leader',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Company Rule, 1757-1857', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'After Ranjit Singh died in 1839, political conditions in Punjab deteriorated, and the British fought two wars with the Sikhs. The second of these wars, in 1849, saw the annexation of Punjab, including the present-day North-West Frontier Province, to the company\'s territories.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'COMPANY RULE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/pakistan/7.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'Sindh was ruled by the Muslim Talpur mirs (chiefs) in three small states that were annexed by the British in 1843.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'COMPANY RULE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/7.htm' }
        },
        {
          id: 'q4',
          text: 'Despite desperate efforts at salvaging their tottering power and keeping the British at bay, many Hindu and Muslim rulers lost their territories: Mysore (1799, but later restored), the Maratha Confederacy (1818), and Punjab (1849).',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Company Rule, 1757-1857', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/16.htm' }
        },
        {
          id: 'q5',
          text: 'The British success in large measure was the result not only of their superiority in tactics and weapons but also of their ingenious relations with Indian rulers through the "subsidiary alliance" system, introduced in the early nineteenth century.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Company Rule, 1757-1857', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/16.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'In Punjab, annexed in 1849, a group of extraordinarily able British officers, serving first the company and then the British crown, governed the area.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'COMPANY RULE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/7.htm' }
        },
        {
          id: 'q7',
          text: 'Irrigation projects later in the century helped Punjab become the granary of northern India.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'COMPANY RULE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/7.htm' }
        },
        {
          id: 'q8',
          text: 'Punjab was to become the major recruiting area for the British Indian Army, recruiting both Sikhs and Muslims.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'COMPANY RULE', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/7.htm' }
        },
        {
          id: 'q9',
          text: 'Kashmir was transferred by sale in the Treaty of Amritsar in 1850 to the Dogra Dynasty, which ruled the area under British paramountcy until 1947.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'COMPANY RULE', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/7.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f8/Battle_of_Chillianwala_oil_painting.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Battle_of_Chillianwala_oil_painting.jpg',
    credit: { institution: 'National Army Museum', creator: 'Charles Becher Young' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'khushwant-singh-2004-a-history-of-the-sikhs', perspective: 'south-asian' },
    {
      source: 'ganda-singh-1955-private-correspondence-anglo-sikh-wars',
      perspective: 'south-asian'
    }
  ]
})
