import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'mahdiyah',
  names: [
    { text: 'Mahdiyah', lang: 'en', role: 'primary' },
    {
      text: 'Mahdist regime',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-sudan-country-study-1991',
          loc: { section: 'THE MAHDIYAH, 1884-98', para: '10' }
        }
      ]
    },
    { text: 'المهدية', lang: 'ar', role: 'native' }
  ],
  researched: '2026-10-07',
  periodType: 'regime',
  start: {
    alts: [
      {
        value: { d: '1884' },
        cites: [
          { source: 'loc-sudan-country-study-1991', loc: { section: 'THE MAHDIYAH, 1884-98' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1898' },
        cites: [
          { source: 'loc-sudan-country-study-1991', loc: { section: 'THE MAHDIYAH, 1884-98' } },
          { source: 'britannica-1911-mahdi', loc: { section: 'MAHDI', para: '1' } }
        ]
      }
    ]
  },
  regions: ['subsaharan-africa'],
  prominence: 2,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Mahdiyah (Mahdist regime) imposed traditional Islamic laws.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q2',
          text: 'The Mahdi modified Islam\'s five pillars to support the dogma that loyalty to him was essential to true belief.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q3',
          text: 'Zakat (almsgiving) became the tax paid to the state.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '11' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q4',
          text: 'Developments in Sudan during this period cannot be understood without reference to the British position in Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        },
        {
          id: 'q5',
          text: 'The illegal slave trade revived, although not enough to satisfy the merchants whom Gordon had put out of business. The Sudanese army suffered from a lack of resources, and unemployed soldiers from disbanded units troubled garrison towns. Tax collectors arbitrarily increased taxation.',
          lang: 'en',
          cite: {
            source: 'loc-sudan-country-study-1991',
            loc: { section: 'THE MAHDIYAH, 1884-98', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/sudan/12.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/6/61/SLATIN%281896%29_p561_THE_KHALIFA_INCITING_HIS_TROOPS_TO_ATTACK_KASSALA.jpg/1280px-SLATIN%281896%29_p561_THE_KHALIFA_INCITING_HIS_TROOPS_TO_ATTACK_KASSALA.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:SLATIN(1896)_p561_THE_KHALIFA_INCITING_HIS_TROOPS_TO_ATTACK_KASSALA.jpg',
    credit: { institution: 'British Library', creator: 'Robert Talbot Kelly' },
    license: { id: 'public-domain' }
  }
})
