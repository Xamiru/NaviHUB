import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'partition-of-india-responsibility',
  about: ['event:partition-of-india', 'person:muhammad-ali-jinnah', 'person:jawaharlal-nehru'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'jinnah-and-communal-politics',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, India: A Country Study' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'However, the volatile political climate, the personal hostilities between the leaders, and the opportunism of Jinnah transformed the idea of Pakistan into a popular demand.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/21.htm' }
        },
        {
          id: 'q2',
          text: 'Jinnah doubted the motives of Gandhi and Nehru and accused them of practicing Hindu chauvinism.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/21.htm' }
        }
      ]
    },
    {
      id: 'congress-failures',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, India: A Country Study' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The Congress wasted precious time denouncing the British rather than allaying Muslim fears during the highly charged election campaign of 1946. Even the more mature Congress leaders, especially Gandhi and Nehru, failed to see how genuinely afraid the Muslims were and how exhausted and weak the British had become in the aftermath of the war.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Political Impasse and Independence', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/21.htm' }
        }
      ]
    },
    {
      id: 'congress-wrecked-cabinet-mission',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Pakistan: A Country Study' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Nehru effectively quashed any prospect of the plan\'s success when he announced that Congress would not be "fettered" by agreements with the British, thereby making it clear that Congress would use its majority in the newly created Constituent Assembly to write a constitution that conformed to its ideas.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Toward Partition', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/13.htm' }
        }
      ]
    },
    {
      id: 'british-haste',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Pakistan: A Country Study' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'Mountbatten was convinced by the rising temperature of communal emotions that the June 1948 date for partition was too distant and persuaded most Indian leaders that immediate acceptance of his plan was imperative.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'Toward Partition', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/13.htm' }
        },
        {
          id: 'q6',
          text: 'No one was prepared for the communal rioting and the mass movements of population that followed the June 3, 1947, London announcement of imminent independence and partition.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'INDEPENDENT PAKISTAN', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/14.htm' }
        }
      ]
    }
  ]
})
