import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'indian-rebellion-of-1857-nature',
  about: ['event:indian-rebellion-of-1857'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'first-war-of-independence',
      category: 'popular',
      holders: [
        { kind: 'public', name: 'Many people in South Asia' },
        { kind: 'school', name: 'Indian nationalists' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The uprising, which seriously threatened British rule in India, has been called many names by historians, including the Sepoy Rebellion, the Great Mutiny, and the Revolt of 1857; many people in South Asia, however, prefer to call it India\'s first war of independence.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
        },
        {
          id: 'q2',
          text: 'The spontaneous and widespread rebellion later fired the imagination of the nationalists who would debate the most effective method of protest against British rule. For them, the rebellion represented the first Indian attempt at gaining independence.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
        }
      ]
    },
    {
      id: 'open-to-question',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'This interpretation, however, is open to serious question.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
        }
      ]
    },
    {
      id: 'culmination-of-resentment',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Undoubtedly, it was the culmination of mounting Indian resentment toward British economic and social policies over many decades.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Sepoy Rebellion, 1857-59', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/india/17.htm' }
        }
      ]
    }
  ]
})
