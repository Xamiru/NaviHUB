import { definePerson } from '../../schema'

export default definePerson({
  id: 'lazaro-cardenas',
  names: [
    { text: 'Lázaro Cárdenas', lang: 'en', role: 'primary' },
    { text: 'Lázaro Cárdenas del Río', lang: 'es', role: 'native' }
  ],
  researched: '2026-10-06',
  regions: ['latin-america'],
  roles: ['head-of-state', 'politician', 'military'],
  offices: [
    {
      title: 'President of Mexico',
      start: {
        alts: [
          {
            value: { d: '1934' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'The Maximato', para: '5' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1940' },
            cites: [
              {
                source: 'loc-mexico-country-study-1996',
                loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '7' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-mexico-country-study-1996',
          loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '1' }
        },
        {
          source: 'state-dept-milestones-mexican-oil',
          loc: { section: 'Mexican Expropriation of Foreign Oil, 1938', para: '1' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Cárdenas immediately showed his independence by becoming the first Mexican president to campaign for office.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/34.htm' }
        },
        {
          id: 'q2',
          text: 'Land reform was one of Cárdenas\'s major accomplishments. In the course of six years, he distributed almost 18 million hectares--more than twice as much land as all of his predecessors combined--to two-thirds of the Mexican peasantry',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/34.htm' }
        }
      ]
    },
    {
      kind: 'legacy',
      quotes: [
        {
          id: 'q3',
          text: 'By the end of his term in 1940, Cárdenas had dramatically transformed the Mexican political system.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/34.htm' }
        },
        {
          id: 'q4',
          text: 'Even though agriculture suffered an initial setback because of the loss of economies of scale and a lack of resources and credit, the redistribution proved tremendously popular with the majority of the Mexican people and earned Cárdenas a special place in Mexican history.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Cardenismo and the Revolution Rekindled, 1934-40', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/mexico/34.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/1/1e/L%C3%A1zaro_C%C3%A1rdenas%2C_Retrato.png',
    page: 'https://commons.wikimedia.org/wiki/File:L%C3%A1zaro_C%C3%A1rdenas,_Retrato.png',
    credit: { institution: 'Secretaría de Cultura (México), Mexicana' },
    license: { id: 'cc-by', version: '4.0', url: 'https://creativecommons.org/licenses/by/4.0' }
  }
})
