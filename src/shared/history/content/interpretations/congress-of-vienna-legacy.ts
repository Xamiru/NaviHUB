import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'congress-of-vienna-legacy',
  about: ['event:congress-of-vienna'],
  topic: 'legacy',
  researched: '2026-10-06',
  positions: [
    {
      id: 'lasting-order',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'After months of deliberations, the congress established an international political order that was to endure for nearly 100 years and that brought Europe a measure of peace.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'The German Confederation, 1815-66', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/23.htm' }
        }
      ]
    },
    {
      id: 'austria-dependent',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Although Austria emerged from the Congress of Vienna as one of the great powers in Europe, throughout the nineteenth century its status and territorial integrity depended on the support of at least one of the other great powers.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        },
        {
          id: 'q3',
          text: 'But the other great powers, which were better able to defend their interests by force, did not always share Austria\'s devotion to Metternich\'s creation.',
          lang: 'en',
          cite: {
            source: 'loc-austria-country-study-1994',
            loc: { section: 'The Congress of Vienna', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/austria/20.htm' }
        }
      ]
    }
  ]
})
