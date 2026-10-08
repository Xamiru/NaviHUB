import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'indian-rebellion-of-1857-nature',
  about: ['event:indian-rebellion-of-1857'],
  topic: 'nature',
  researched: '2026-10-08',
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
      ],
      reception: [
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
    },
    {
      id: 'military-mutiny',
      category: 'official',
      holders: [
        { kind: 'state', name: 'British government' },
        { kind: 'participant', name: 'Robert Vernon Smith' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'There is not a tittle of evidence, and the right hon. Gentleman has adduced none to show that the outbreak arose from national discontent.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1857-07-27-motion-for-papers',
            loc: { section: 'HC Deb 27 July 1857 vol 147 cc440-546', para: '15' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1857/jul/27/motion-for-papers'
          }
        },
        {
          id: 'q6',
          text: 'The right hon. Gentleman says it is a national revolt. If I was compelled to give an opinion, I should have said that it was more a military mutiny.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1857-07-27-motion-for-papers',
            loc: { section: 'HC Deb 27 July 1857 vol 147 cc440-546', para: '21' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1857/jul/27/motion-for-papers'
          }
        }
      ]
    },
    {
      id: 'national-revolt',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Benjamin Disraeli', ref: 'person:benjamin-disraeli' }
      ],
      statements: [
        {
          id: 'q7',
          text: 'A mere military mutiny may be met by a mere military effort. But if, on the contrary, what we have to deal with be an insurrection, supported by the favour and sympathy of the great mass of the population, our measures must, as I think, be both in nature and degree different from those of which we have had an intimation from Her Majesty\'s Government.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1857-07-27-motion-for-papers',
            loc: { section: 'HC Deb 27 July 1857 vol 147 cc440-546', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1857/jul/27/motion-for-papers'
          }
        },
        {
          id: 'q8',
          text: 'But, I said, and I think I have shown, that the condition of things was this—that the people of India were only waiting for an occasion and a pretext.',
          lang: 'en',
          cite: {
            source: 'hansard-commons-1857-07-27-motion-for-papers',
            loc: { section: 'HC Deb 27 July 1857 vol 147 cc440-546', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://api.parliament.uk/historic-hansard/commons/1857/jul/27/motion-for-papers'
          }
        }
      ]
    }
  ]
})
