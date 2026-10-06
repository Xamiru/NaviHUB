import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'paraguayan-war-responsibility',
  about: ['event:paraguayan-war'],
  topic: 'responsibility',
  researched: '2026-10-06',
  positions: [
    {
      id: 'lopez-miscalculation',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Paraguay: A Country Study (Library of Congress)' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Francisco\'s foreign policy vastly underestimated Paraguay\'s neighbors and overrated Paraguay\'s potential as a military power.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'Francisco Solano Lopez', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/10.htm' }
        },
        {
          id: 'q2',
          text: 'But he concluded incorrectly that preserving Uruguayan "independence" was crucial to Paraguay\'s future as a nation.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        }
      ]
    },
    {
      id: 'not-wholly-responsible',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Paraguay: A Country Study (Library of Congress)' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Despite several historians\' accounts of what happened between 1865 and 1870, Solano López was not wholly responsible for the war.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        },
        {
          id: 'q4',
          text: 'Its causes were complex and included Argentine anger over Antonio López\'s meddling in Corrientes.',
          lang: 'en',
          cite: {
            source: 'loc-paraguay-country-study-1988',
            loc: { section: 'The War of the Triple Alliance', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/paraguay/11.htm' }
        }
      ]
    },
    {
      id: 'brazilian-intervention-mutual-miscalculation',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Brazil: A Country Study (Library of Congress)' }
      ],
      statements: [
        {
          id: 'q5',
          text: 'In the mid-1860s, the imperial government conspired with Buenos Aires authorities to replace the Blanco regime in Montevideo with a Colorado one.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        },
        {
          id: 'q6',
          text: 'Each side miscalculated the intentions, capabilities, and will of the other.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Second Empire, 1840-89', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/13.htm' }
        }
      ]
    }
  ]
})
