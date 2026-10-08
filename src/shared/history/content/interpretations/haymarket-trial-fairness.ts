import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'haymarket-trial-fairness',
  about: ['event:haymarket-affair'],
  topic: 'responsibility',
  researched: '2026-10-08',
  positions: [
    {
      id: 'verdict-upheld',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'After an appeal is filed, the Illinois Supreme Court upholds the lower court’s ruling.',
          lang: 'en',
          cite: {
            source: 'loc-guide-haymarket-affair',
            loc: { section: 'Haymarket Affair: Topics in Chronicling America' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://guides.loc.gov/chronicling-america-haymarket-affair'
          }
        }
      ]
    },
    {
      id: 'class-verdict',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'August Spies' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'This verdict against us is the anathema of the wealthy classes over their despoiled victims—the vast army of wage workers and farmers.',
          lang: 'en',
          cite: {
            source: 'spies-1886-address-in-court',
            loc: { section: 'Address of August Spies' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Chicago_Martyrs/Address_of_August_Spies'
          }
        },
        {
          id: 'q3',
          text: 'If the opinion of the court given this morning is good law, then there is no person in this country who could not lawfully be hanged.',
          lang: 'en',
          cite: {
            source: 'spies-1886-address-in-court',
            loc: { section: 'Address of August Spies' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Chicago_Martyrs/Address_of_August_Spies'
          }
        }
      ]
    },
    {
      id: 'packed-jury',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'John Peter Altgeld' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'First—That the jury which tried the case was a packed jury selected to convict.',
          lang: 'en',
          cite: {
            source: 'altgeld-1893-reasons-for-pardoning-fielden-neebe-and-schwab',
            loc: { section: 'Altgeld\'s Reasons for Pardoning Fielden, Neebe and Schwab' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Chicago_Martyrs/Altgeld%27s_Reasons_for_Pardoning_Fielden,_Neebe_and_Schwab'
          }
        },
        {
          id: 'q5',
          text: 'Fifth—That the trial judge was either so prejudiced against the defendants, or else so determined to win the applause of a certain class in the community, that he could not and did not grant a fair trial.',
          lang: 'en',
          cite: {
            source: 'altgeld-1893-reasons-for-pardoning-fielden-neebe-and-schwab',
            loc: { section: 'Altgeld\'s Reasons for Pardoning Fielden, Neebe and Schwab' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://en.wikisource.org/wiki/The_Chicago_Martyrs/Altgeld%27s_Reasons_for_Pardoning_Fielden,_Neebe_and_Schwab'
          }
        }
      ]
    }
  ]
})
