import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'haitian-independence-significance',
  about: ['event:haitian-independence'],
  topic: 'significance',
  researched: '2026-10-06',
  positions: [
    {
      id: 'symbol-and-nonintervention',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Haiti\'s uniqueness attracted much attention and symbolized the aspirations of enslaved and exploited peoples around the globe. Nonetheless, Haitians made no overt effort to inspire, to support, or to aid slave rebellions similar to their own because they feared that the great powers would take renewed action against them. For the sake of national survival, nonintervention became a Haitian credo.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/11.htm' }
        }
      ]
    },
    {
      id: 'little-progress-under-dessalines',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Under Dessalines the Haitian economy had made little progress despite the restoration of forced labor. Conflict between blacks and mulattoes ended the cooperation that the revolution had produced, and the brutality toward whites shocked foreign governments and isolated Haiti internationally.',
          lang: 'en',
          cite: {
            source: 'loc-haiti-country-study-1989',
            loc: { section: 'INDEPENDENT HAITI', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/haiti/11.htm' }
        }
      ]
    },
    {
      id: 'us-ambivalence',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'U.S. political leaders, many of them slaveowners, reacted to the emergence of Haiti as a state borne out of a slave revolt with ambivalence, at times providing aid to put down the revolt, and, later in the revolution, providing support to Toussaint L’Ouverture’s forces. Due to these shifts in policy and domestic concerns, the United States would not officially recognize Haitian independence until 1862.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1784-1800/haitian-rev'
          }
        }
      ]
    },
    {
      id: 'us-isolation',
      category: 'contemporary',
      holders: [
        { kind: 'participant', name: 'Thomas Jefferson', ref: 'person:thomas-jefferson' }
      ],
      statements: [
        {
          id: 'q4',
          text: 'Under President Thomas Jefferson’s presidency, the United States cut off aid to L’Ouverture and instead pursued a policy to isolate Haiti, fearing that the Haitian revolution would spread to the United States.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1784-1800/haitian-rev'
          }
        }
      ],
      reception: [
        {
          id: 'q5',
          text: 'These concerns were in fact unfounded, as the fledgling Haitian state was more concerned with its own survival than with exporting revolution.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-haitian-revolution',
            loc: { section: 'The United States and the Haitian Revolution, 1791–1804', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1784-1800/haitian-rev'
          }
        }
      ]
    }
  ]
})
