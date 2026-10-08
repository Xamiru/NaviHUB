import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'french-intervention-in-mexico-outcome',
  about: ['event:french-intervention-in-mexico'],
  topic: 'outcome',
  researched: '2026-10-08',
  positions: [
    {
      id: 'mexican-resistance-us-pressure',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Stiff Mexican resistance caused Napoleon III to order French withdrawal in 1867, a decision strongly encouraged by a United States recovered from its Civil War weakness in foreign affairs.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-french-intervention-in-mexico',
            loc: {
              section: 'French Intervention in Mexico and the American Civil War, 1862–1867',
              para: '1'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/french-intervention'
          }
        },
        {
          id: 'q2',
          text: 'U.S. pressure, combined with Mexican resentment and military success against Emperor Maximilian ultimately compelled French Emperor Napoleon III to end his imperial venture in Mexico.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-consequences-of-union-victory',
            loc: { section: 'The Consequences of Union Victory, 1865', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/victory'
          }
        },
        {
          id: 'q3',
          text: 'By then, the intervention in Mexico had grown unpopular with the French public, and was an increasing drain on the French treasury.',
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
    },
    {
      id: 'us-civil-war-end-and-prussia',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'The end of the Civil War in the United States in 1865, however, prompted a more assertive foreign policy toward Mexico and released manpower and arms that were directed to help Juárez in his fight against the French.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        },
        {
          id: 'q5',
          text: 'In Europe, France was increasingly threatened by a belligerent Prussia.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Civil War and the French Intervention', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/21.htm' }
        }
      ]
    }
  ]
})
