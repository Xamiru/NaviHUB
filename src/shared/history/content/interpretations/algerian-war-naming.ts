import { defineInterpretation } from '../../schema'

export default defineInterpretation({
  id: 'algerian-war-naming',
  about: ['event:algerian-war'],
  topic: 'naming',
  positions: [
    {
      id: 'guerre-d-algerie',
      category: 'official',
      holders: [
        { kind: 'state', name: 'France' }
      ],
      statements: [
        {
          id: 'q1',
          text: 'Loi n° 99-882 du 18 octobre 1999 relative à la substitution, à l\'expression " aux opérations effectuées en Afrique du Nord ", de l\'expression " à la guerre d\'Algérie ou aux combats en Tunisie et au Maroc " (1)',
          lang: 'fr',
          cite: {
            source: 'legifrance-loi-99-882-guerre-dalgerie',
            loc: { section: 'Loi n° 99-882 du 18 octobre 1999' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://web.archive.org/web/2023/https://www.legifrance.gouv.fr/loda/id/JORFTEXT000000578132'
          }
        }
      ],
      reception: [
        {
          id: 'q2',
          text: 'Despite complaints from the military command in Algiers, the French government was reluctant for many months to admit that the Algerian situation was out of control and that what was viewed officially as a pacification operation had developed into a major colonial war.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Conduct of the War', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/31.htm' }
        }
      ]
    },
    {
      id: 'war-of-national-liberation',
      category: 'scholarly',
      holders: [
        { kind: 'organization', name: 'Federal Research Division, Library of Congress' }
      ],
      statements: [
        {
          id: 'q3',
          text: 'The war of national liberation and its aftermath severely disrupted Algeria\'s society and economy.',
          lang: 'en',
          cite: {
            source: 'loc-algeria-country-study-1994',
            loc: { section: 'Aftermath of the War', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/algeria/36.htm' }
        }
      ]
    }
  ],
  researched: '2026-10-07'
})
