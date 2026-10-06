import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'treaty-of-hunkar-iskelesi-terms',
  about: ['event:treaty-of-hunkar-iskelesi'],
  topic: 'nature',
  researched: '2026-10-06',
  positions: [
    {
      id: 'straits-closed-on-russian-demand',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Under this treaty, the Bosporus and Dardanelles straits were to be closed on Russian demand to naval vessels of other powers.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      id: 'secret-clause',
      category: 'contemporary',
      holders: [
        { kind: 'state', name: 'The major European powers' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'The major European parties mistakenly believed that the treaty contained a secret clause granting Russia the right to send warships through the Bosporus and Dardanelles straits.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ]
})
