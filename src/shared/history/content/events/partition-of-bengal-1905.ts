import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'partition-of-bengal-1905',
  names: [
    { text: 'Partition of Bengal (1905)', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'partition',
  start: {
    alts: [
      {
        value: { d: '1905' },
        cites: [
          {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The Division of Bengal, 1905-12', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1912' },
        cites: [
          {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The Division of Bengal, 1905-12', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    { ref: 'place:dhaka' }
  ],
  participants: [
    {
      name: 'George Curzon',
      role: 'head-of-government',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The Division of Bengal, 1905-12', para: '1' }
        }
      ]
    },
    {
      name: 'Indian National Congress',
      role: 'organizer',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'The Division of Bengal, 1905-12', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q4',
          text: 'Lord Curzon (George Nathaniel Curzon), the viceroy, partitioned the large province of Bengal (which then included Bihar and Orissa) in 1905.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'The Seeds of Muslim Nationalism', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/pakistan/10.htm' }
        },
        {
          id: 'q1',
          text: 'Curzon established a new province called Eastern Bengal and Assam, which had its capital at Dhaka. The new province of West Bengal (the present-day state of West Bengal in India) had its capital at Calcutta, which also was the capital of British India.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The Division of Bengal, 1905-12', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bangladesh/11.htm' }
        },
        {
          id: 'q2',
          text: 'A swadeshi (a devotee of one\'s own country) movement boycotted British-made goods and encouraged the production and use of Indian-made goods to take their place. Swadeshi agitation spread throughout India and became a major plank in the Congress platform.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The Division of Bengal, 1905-12', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bangladesh/11.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q3',
          text: 'In 1912 the British voided the partition of Bengal, a decision that heightened the growing estrangement between the Muslims and Hindus in many parts of the country. The reunited province was reconstituted as a presidency and the capital of India was moved from Calcutta to the less politically electric atmosphere of New Delhi. The reunion of divided Bengal was perceived by Muslims as a British accommodation to Hindu pressures.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The Division of Bengal, 1905-12', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bangladesh/11.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/fc/Pope1880BengalPres2.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Pope1880BengalPres2.jpg',
    credit: {
      institution: 'G. U. Pope, Text-book of Indian History (W. H. Allen, 1880)',
      creator: 'W. H. Allen and Co.'
    },
    license: { id: 'public-domain' }
  }
})
