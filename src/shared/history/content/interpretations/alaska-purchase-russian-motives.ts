import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'alaska-purchase-russian-motives',
  about: ['event:alaska-purchase'],
  topic: 'motives',
  researched: '2026-10-08',
  positions: [
    {
      id: 'offset-britain',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Office of the Historian, U.S. Department of State' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Russia offered to sell Alaska to the United States in 1859, believing the United States would off-set the designs of Russia’s greatest rival in the Pacific, Great Britain.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-purchase-of-alaska',
            loc: { section: 'Purchase of Alaska, 1867', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1866-1898/alaska-purchase'
          }
        }
      ]
    },
    {
      id: 'funds-and-amur',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q2',
          text: 'Meanwhile, in 1867 the logic of the balance of power and the cost of developing and defending the Amur-Ussuri region dictated that Russia sell Alaska to the United States in order to acquire much-needed funds.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    }
  ]
})
