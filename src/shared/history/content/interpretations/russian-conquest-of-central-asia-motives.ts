import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'russian-conquest-of-central-asia-motives',
  about: ['event:russian-conquest-of-central-asia'],
  topic: 'motives',
  researched: '2026-10-06',
  positions: [
    {
      id: 'trade-slaves-cotton',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Library of Congress, Federal Research Division' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'In the nineteenth century, Russian interest in the area increased greatly, sparked by nominal concern over British designs on Central Asia; by anger over the situation of Russian citizens held as slaves; and by the desire to control the trade in the region and to establish a secure source of cotton for Russia.',
          lang: 'en',
          cite: {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Russian Conquest', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uzbekistan/8.htm' }
        },
        {
          id: 'q2',
          text: 'When the United States Civil War prevented cotton delivery from Russia\'s primary supplier, the southern United States, Central Asian cotton assumed much greater importance for Russia.',
          lang: 'en',
          cite: {
            source: 'loc-uzbekistan-country-study-1996',
            loc: { section: 'The Russian Conquest', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/uzbekistan/8.htm' }
        }
      ]
    },
    {
      id: 'compensation-after-crimea',
      category: 'scholarly',
      holders: [
        { kind: 'scholar', name: 'Elena Andreeva' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'Internal weakness resulted in diplomatic failures, which were followed by the humiliating defeat in the Crimean War against the allied forces of Britain, France, Turkey, and Sardinia (1853-56). The Russian role in European politics was reduced, while its politics towards Central Asia and the Far East acquired more significance. It was only there that Russia was still able to compete successfully with the Western European powers.',
          lang: 'en',
          cite: {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '32'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/russia-i-relations/'
          }
        }
      ]
    }
  ]
})
