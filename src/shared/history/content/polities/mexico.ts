import { definePolity } from '../../schema'

export default definePolity({
  id: 'mexico',
  names: [
    { text: 'Mexico', lang: 'en', role: 'primary' },
    { text: 'Estados Unidos Mexicanos', lang: 'es', role: 'native' },
    {
      text: 'República Mexicana',
      lang: 'es',
      role: 'official',
      cites: [
        { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'republic',
  start: {
    alts: [
      {
        value: { d: '1824' },
        cites: [
          {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Federalist Republic, 1824-36', para: '2' }
          }
        ]
      }
    ]
  },
  regions: ['latin-america', 'north-america'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:mexico-city',
      cites: [
        {
          source: 'cshapes-2-dataset',
          loc: { section: 'Mexico (code 70), capital Mexico City' }
        }
      ]
    }
  ],
  predecessors: [
    { ref: 'polity:first-mexican-empire' }
  ],
  cshapes: [
    { set: 'early', code: 5062192 },
    { set: 'early', code: 1109279 },
    { set: 'world', code: 70 }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e9/Constitucion_federal_de_los_Estados_Unidos_Mexicanos_1824.jpg/1280px-Constitucion_federal_de_los_Estados_Unidos_Mexicanos_1824.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Constitucion_federal_de_los_Estados_Unidos_Mexicanos_1824.jpg',
    credit: { institution: 'Constitución federal de los Estados Unidos Mexicanos (1824)' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'MEXICO (Span. Méjico, or Mexico,) officially styled Estados Unidos Mexicanos and República Mexicana, a federal republic of North America extending from the United States of America southward to Guatemala and British Honduras, and lying between the Pacific Ocean on the west and the Gulf of Mexico and Caribbean Sea on the east.',
          lang: 'en',
          cite: { source: 'britannica-1911-mexico', loc: { section: 'MEXICO', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mexico'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q2',
          text: 'The constitution of 1824, which was strongly influenced by the United States constitution and Mexico\'s legislative relationship with Spain since 1810, established the United Mexican States (Estados Unidos Mexicanos) as a federal republic composed of nineteen states and four territories',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Federalist Republic, 1824-36', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/mexico/15.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Under the constitution of 1836, Mexico became a centralist regime in which power was concentrated in the president and his immediate subordinates.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'Centralism and the Caudillo State, 1836-55', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/mexico/16.htm' }
        },
        {
          id: 'q4',
          text: 'The liberal republicans under Juárez\'s leadership consolidated the victory of the principles of the constitution of 1857. The Restoration, as the period from 1867 to 1876 is called, was marked by peace and tolerance toward the conservatives. Juárez returned to Mexico City on July 15, 1867, called for presidential elections, and presented himself as a candidate. By the end of the year, he was victorious.',
          lang: 'en',
          cite: {
            source: 'loc-mexico-country-study-1996',
            loc: { section: 'The Restoration, 1867-76', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/mexico/22.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'cosio-villegas-1955-historia-moderna-de-mexico', perspective: 'latin-american' },
    {
      source: 'vazquez-meyer-1982-mexico-frente-a-estados-unidos',
      perspective: 'latin-american'
    }
  ]
})
