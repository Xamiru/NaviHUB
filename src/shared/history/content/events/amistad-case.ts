import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'amistad-case',
  names: [
    { text: 'Amistad case', lang: 'en', role: 'primary' },
    {
      text: 'La Amistad',
      lang: 'es',
      role: 'alternative',
      cites: [
        {
          source: 'state-dept-milestones-amistad',
          loc: { section: 'The Amistad Case, 1839', para: '1' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1839-08' },
        cites: [
          {
            source: 'state-dept-milestones-amistad',
            loc: { section: 'The Amistad Case, 1839', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'latin-america', 'subsaharan-africa'],
  prominence: 3,
  participants: [
    {
      name: 'John Forsyth',
      role: 'diplomat',
      cites: [
        {
          source: 'state-dept-milestones-amistad',
          loc: { section: 'The Amistad Case, 1839', para: '3' }
        }
      ]
    },
    {
      name: 'John Quincy Adams',
      role: 'participant',
      cites: [
        {
          source: 'state-dept-milestones-amistad',
          loc: { section: 'The Amistad Case, 1839', para: '4' }
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
            value: { min: 53 },
            cites: [
              {
                source: 'state-dept-milestones-amistad',
                loc: { section: 'The Amistad Case, 1839', para: '1' }
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
          text: 'When the Spanish cargo schooner La Amistad came aground off the coast of Long Island, New York in August 1839, the United States found itself with an explosive legal and diplomatic case',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-amistad',
            loc: { section: 'The Amistad Case, 1839', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/amistad'
          }
        },
        {
          id: 'q2',
          text: 'Officers of the United States survey ship Washington found the Amistad in a state of distress, bearing 53 Africans and the two Spaniards who purchased them in Cuba with the intention of trading them into slavery there.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-amistad',
            loc: { section: 'The Amistad Case, 1839', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/amistad'
          }
        },
        {
          id: 'q3',
          text: 'The Africans had mutinied, however, and attempted to have the Spanish owners sail them back to Africa.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-amistad',
            loc: { section: 'The Amistad Case, 1839', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/amistad'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'The Spanish foreign minister, however, demanded that the Amistad and its cargo be released from custody and the “slaves” sent to Cuba for punishment by Spanish authorities.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-amistad',
            loc: { section: 'The Amistad Case, 1839', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/amistad'
          }
        },
        {
          id: 'q5',
          text: 'The district court judge ruled that the Africans were not Spanish slaves, being captured as free men in Africa, and he ordered the U.S. to release them from prison and transport them back to Africa.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-amistad',
            loc: { section: 'The Amistad Case, 1839', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/amistad'
          }
        },
        {
          id: 'q6',
          text: 'In a masterpiece of American law, Adams presented the case of the Africans’ freedom as a test of the American republic’s sincerity in the ideals it espoused abroad.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-amistad',
            loc: { section: 'The Amistad Case, 1839', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/amistad'
          }
        },
        {
          id: 'q7',
          text: 'The Supreme Court ruled for the Africans, accepting the argument that they were never citizens of Spain and were illegally taken from Africa where they lived in a state of freedom.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-amistad',
            loc: { section: 'The Amistad Case, 1839', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1830-1860/amistad'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/3/3a/Sengbe_Pieh.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Sengbe_Pieh.jpg',
    credit: { institution: 'New Haven Colony Historical Society', creator: 'Nathaniel Jocelyn' },
    license: { id: 'public-domain' }
  }
})
