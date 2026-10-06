import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'constitution-of-cadiz',
  names: [
    { text: 'Constitution of Cádiz', lang: 'en', role: 'primary' },
    { text: 'Constitución de Cádiz', lang: 'es', role: 'native' },
    {
      text: 'Constitution of 1812',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE LIBERAL ASCENDANCY: The Cadiz Cortes', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-06',
  type: 'law',
  start: {
    alts: [
      {
        value: { d: '1812' },
        cites: [
          {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE LIBERAL ASCENDANCY: The Cadiz Cortes', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['europe', 'latin-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:cadiz',
      cites: [
        {
          source: 'loc-spain-country-study-1988',
          loc: { section: 'THE LIBERAL ASCENDANCY: The Cadiz Cortes', para: '2' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'A central junta sat in Cadiz. It had little authority, except as surrogate for the absent royal government. It succeeded, however, in calling together representatives from local juntas in 1810, with the vague notion of creating the Cortes of All the Spains, so called because it would be the single legislative body for the empire and its colonies.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE LIBERAL ASCENDANCY: The Cadiz Cortes', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/14.htm' }
        },
        {
          id: 'q2',
          text: 'As the liberals were the majority, they were able to transform the assembly from interim government to constitutional convention.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE LIBERAL ASCENDANCY: The Cadiz Cortes', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/14.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'As the principal aim of the new constitution was the prevention of arbitrary and corrupt royal rule, it provided for a limited monarchy which governed through ministers subject to parliamentary control.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE LIBERAL ASCENDANCY: The Cadiz Cortes', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/14.htm' }
        },
        {
          id: 'q4',
          text: 'The product of the Cortes\' deliberations reflected the liberals dominance for the constitution of 1812 came to be the "sacred codex" of liberalism, and during the nineteenth century it served as a model for liberal constitutions of Latin nations.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE LIBERAL ASCENDANCY: The Cadiz Cortes', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/14.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q5',
          text: 'The 1812 Constitution marked the initiation of the Spanish tradition of liberalism; by the country\'s standards, however, it was a revolutionary document, and when Ferdinand VII was restored to the throne in 1814 he refused to recognize it. He dismissed the Cadiz Cortes and was determined to rule as an absolute monarch.',
          lang: 'en',
          cite: {
            source: 'loc-spain-country-study-1988',
            loc: { section: 'THE LIBERAL ASCENDANCY: The Cadiz Cortes', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/spain/14.htm' }
        }
      ]
    }
  ],
  archive: [
    {
      id: 'cadiz-1812',
      mediaKind: 'document',
      title: 'Constitucion politica de la Monarquia Española : promulgada en Cádiz á 19 de Marzo de 1812',
      date: { d: '1812' },
      url: 'https://archive.org/download/A0393081482/A0393081482.pdf',
      page: 'https://archive.org/details/A0393081482',
      credit: { institution: 'Biblioteca de la Universidad de Sevilla (Internet Archive)' },
      license: { id: 'public-domain' },
      bytes: 8415167
    }
  ]
})
