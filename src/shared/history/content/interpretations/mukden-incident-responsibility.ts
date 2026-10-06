import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'mukden-incident-responsibility',
  about: ['event:mukden-incident'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'blamed-on-chinese-or-staged',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'The Japanese, who owned the railway, blamed Chinese nationalists for the incident and used the opportunity to retaliate and invade Manchuria. However, others speculated that the bomb may have been planted by mid-level officers in the Japanese Army to provide a pretext for the subsequent military action.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-mukden-incident',
            loc: { section: 'The Mukden Incident of 1931 and the Stimson Doctrine', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/mukden-incident'
          }
        }
      ]
    },
    {
      id: 'guandong-army-conspiracy',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The Manchurian Incident of September 1931 did not fail, and it set the stage for the eventual military takeover of the Japanese government.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Rise of the Militarists', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/32.htm' }
        },
        {
          id: 'q3',
          text: 'Guandong Army conspirators blew up a few meters of South Manchurian Railway Company track near Mukden (now Shenyang), blamed it on Chinese saboteurs, and used the event as an excuse to seize Mukden.',
          lang: 'en',
          cite: {
            source: 'loc-japan-country-study-1994',
            loc: { section: 'The Rise of the Militarists', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/japan/32.htm' }
        }
      ]
    }
  ]
})
