import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'maximilian-i-of-mexico-character',
  about: ['person:maximilian-i-of-mexico'],
  topic: 'character',
  researched: '2026-10-06',
  positions: [
    {
      id: 'well-intentioned-liberal',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Maximilian was a well-intentioned monarch who accepted the crown believing that this act responded to the desire of a majority of Mexicans.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q2',
          text: 'Maximilian, schooled in the European liberal tradition, was a strong supporter of Mexican nationalism.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        }
      ]
    },
    {
      id: 'ill-informed',
      category: 'official',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Maximilian, ill-informed on Mexican affairs prior to his arrival, alienated his Conservative allies by attempting to adopt more Liberal policies, while he failed to win over Liberals, who saw him as a tool of French interests and Mexican Conservatives.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-intervention-in-mexico',
            loc: {
              section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
              para: '9'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
          }
        }
      ]
    }
  ]
})
