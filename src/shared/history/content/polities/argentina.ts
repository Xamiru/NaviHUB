import { definePolity } from '../../schema'

export default definePolity({
  id: 'argentina',
  names: [
    { text: 'Argentina', lang: 'en', role: 'primary' },
    {
      text: 'República Argentina',
      lang: 'es',
      role: 'official',
      cites: [
        { source: 'britannica-1911-argentina', loc: { section: 'ARGENTINA', para: '1' } }
      ]
    },
    {
      text: 'Argentine Republic',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-argentina', loc: { section: 'ARGENTINA', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1816-07-09' },
        cites: [
          {
            source: 'state-dept-countries-argentina',
            loc: { section: 'Argentina: Summary', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:buenos-aires',
      cites: [
        { source: 'britannica-1911-argentina', loc: { section: 'ARGENTINA', para: '226' } }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 832554 },
    { set: 'world', code: 160 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/2/26/Acta_Independencia_argentina_quechua.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Acta_Independencia_argentina_quechua.jpg',
    credit: { institution: 'Archivo General de la Nación' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'ARGENTINA, or the Argentine Republic (officially, Republica Argentina), a country occupying the greater part of the southern extremity of South America.',
          lang: 'en',
          cite: { source: 'britannica-1911-argentina', loc: { section: 'ARGENTINA', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Argentina'
          }
        },
        {
          id: 'q2',
          text: 'The present constitution of Argentina dates from the 25th of September 1860.',
          lang: 'en',
          cite: { source: 'britannica-1911-argentina', loc: { section: 'ARGENTINA', para: '146' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Argentina'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q3',
          text: 'After Argentina gained independence from the Spanish in 1816, the nation was paralyzed by tension between Centralist and Federalist forces. In 1854 the Federalist provinces ratified a constitution that established the Argentine Confederation, which Centralists in Buenos Aires repudiated while declaring themselves independent. Resistance forces expelled a brief Federalist incursion into Buenos Aires and the Confederation collapsed in 1861, paving way for the national rule under the Argentine Republic that same year.',
          lang: 'en',
          cite: {
            source: 'state-dept-countries-argentina',
            loc: { section: 'Argentina: Summary', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://history.state.gov/countries/argentina'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'In 1835, with the title of governor and captain-general, he acquired dictatorial powers, and all public authority passed into his hands. This dictatorship of Rosas continued until 1852.',
          lang: 'en',
          cite: { source: 'britannica-1911-argentina', loc: { section: 'ARGENTINA', para: '223' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Argentina'
          }
        },
        {
          id: 'q5',
          text: 'The constitution of 1853 was maintained, but Buenos Aires became the seat of federal government without ceasing to be a provincial capital.',
          lang: 'en',
          cite: { source: 'britannica-1911-argentina', loc: { section: 'ARGENTINA', para: '226' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Argentina'
          }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'halperin-donghi-1972-revolucion-y-guerra', perspective: 'latin-american' },
    { source: 'romero-1997-breve-historia-de-la-argentina', perspective: 'latin-american' }
  ]
})
