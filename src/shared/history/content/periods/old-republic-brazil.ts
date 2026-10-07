import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'old-republic-brazil',
  names: [
    { text: 'Old Republic', lang: 'en', role: 'primary' },
    {
      text: 'First Republic',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-brazil-country-study-1997',
          loc: { section: 'The Old or First Republic, 1889-1930' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1889' },
        cites: [
          {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1930' },
        cites: [
          {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The founders of the Brazilian republic faced a serious question of legitimacy.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/15.htm' }
        },
        {
          id: 'q2',
          text: 'It was a regime born of a coup d\'état that maintained itself by force.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/15.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'In 1874, in a population of about 10 million, the franchise was held by about 1 million, but in 1881 this had been cut to 145,296. This reduction was one reason the empire\'s legitimacy foundered, but the republic did not move to correct the situation.',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/15.htm' }
        },
        {
          id: 'q4',
          text: 'The instability and violence of the 1890s were related to the absence of consensus among the elites regarding a governmental model;',
          lang: 'en',
          cite: {
            source: 'loc-brazil-country-study-1997',
            loc: { section: 'The Old or First Republic, 1889-1930', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/brazil/15.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Deodoro_da_Fonseca_%281889%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Deodoro_da_Fonseca_(1889).jpg',
    credit: { institution: 'Galeria de Presidentes (Governo do Brasil)' },
    license: { id: 'public-domain' }
  }
})
