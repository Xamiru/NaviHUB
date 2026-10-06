import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'partition-of-bengal-motives',
  about: ['event:partition-of-bengal-1905'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'administration',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'divided Bengal into eastern and western sectors in order to improve administrative control of the huge and populous province.',
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
      id: 'divide-and-rule',
      category: 'contemporary',
      holders: [
        { kind: 'party', name: 'Indian National Congress' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Congress leaders objected that Curzon\'s partition of Bengal deprived Bengali Hindus of a majority in either new province--in effect a tactic of divide and rule.',
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
      id: 'muslim-recognition',
      category: 'contemporary',
      holders: [
        { kind: 'public', name: 'Bengali Muslims' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Many Bengali Muslims viewed the partition as initial recognition of their cultural and political separation from the Hindu majority population.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'The Division of Bengal, 1905-12', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bangladesh/11.htm' }
        }
      ]
    }
  ]
})
