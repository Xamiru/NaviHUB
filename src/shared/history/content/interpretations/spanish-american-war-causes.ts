import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'spanish-american-war-causes',
  about: ['event:spanish-american-war'],
  topic: 'causes',
  researched: '2026-10-06',
  positions: [
    {
      id: 'yellow-press-climate-not-sole-cause',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The rise of yellow journalism helped to create a climate conducive to the outbreak of international conflict and the expansion of U.S. influence overseas, but it did not by itself cause the war.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-yellow-journalism',
            loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/yellow-journalism'
          }
        },
        {
          id: 'q2',
          text: 'Moreover, influential figures such as Theodore Roosevelt led a drive for U.S. overseas expansion that had been gaining strength since the 1880s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-yellow-journalism',
            loc: { section: 'U.S. Diplomacy and Yellow Journalism, 1895–1898', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/yellow-journalism'
          }
        }
      ]
    },
    {
      id: 'anti-colonial-interest-and-outrage',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The long-held U.S. interest in ridding the Western Hemisphere of European colonial powers and American public outrage over brutal Spanish tactics created much sympathy for the Cuban revolutionaries.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-spanish-american-war',
            loc: { section: 'The Spanish-American War, 1898', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/spanish-american-war'
          }
        }
      ]
    },
    {
      id: 'business-interests-and-public-opinion',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'American business interests were anxious for a resolution--with or without Spain--of the insurrection that had broken out in Cuba in February 1895.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'Outbreak of War, 1898', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/13.htm' }
        },
        {
          id: 'q5',
          text: 'Moreover, public opinion in the United States had been aroused by newspaper accounts of the brutalities of Spanish rule.',
          lang: 'en',
          cite: {
            source: 'loc-philippines-country-study-1991',
            loc: { section: 'Outbreak of War, 1898', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/philippines/13.htm' }
        }
      ]
    }
  ]
})
