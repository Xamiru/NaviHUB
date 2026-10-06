import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'indian-national-congress-representation',
  about: ['event:founding-of-the-indian-national-congress'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'national-all-india-forum',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'A national, all-India forum, Congress was an umbrella organization.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'The Seeds of Muslim Nationalism', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/10.htm' }
        }
      ]
    },
    {
      id: 'urban-elites',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Despite its claim to represent all India, the Congress voiced the interests of urban elites; the number of participants from other economic backgrounds remained negligible.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/19.htm' }
        },
        {
          id: 'q3',
          text: 'They were mostly members of the upwardly mobile and successful Western-educated provincial elites,',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Independence Movement', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/19.htm' }
        }
      ]
    },
    {
      id: 'hindu-dominated',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Sir Syed Ahmad Khan' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'he remained aloof when Congress was founded and advised his followers not to join Congress, because he thought the organization would be dominated by Hindus and would inevitably become antigovernment.',
          lang: 'en',
          cite: {
            source: 'loc-pakistan-country-study-1994',
            loc: { section: 'The Seeds of Muslim Nationalism', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/pakistan/10.htm' }
        }
      ]
    }
  ]
})
