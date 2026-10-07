import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'bengal-famine-of-1943',
  names: [
    { text: 'Bengal famine of 1943', lang: 'en', role: 'primary' },
    { text: 'পঞ্চাশের মন্বন্তর', lang: 'bn', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'famine',
  start: {
    alts: [
      {
        value: { d: '1943' },
        cites: [
          { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1944' },
        cites: [
          { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '108' } }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:bengal',
      cites: [
        { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '1' } }
      ]
    },
    {
      ref: 'place:kolkata',
      cites: [
        { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '102' } }
      ]
    }
  ],
  partOf: [
    { ref: 'event:second-world-war' },
    { ref: 'period:british-raj' }
  ],
  participants: [
    {
      name: 'Leopold Amery',
      role: 'head-of-government',
      cites: [
        {
          source: 'hansard-commons-1943-11-04-india-food-situation',
          loc: { section: 'HC Deb 04 November 1943 vol 393 cc886-970', para: '29' }
        }
      ]
    },
    {
      name: 'Government of Bengal',
      role: 'participant',
      cites: [
        { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '105' } }
      ]
    }
  ],
  figures: [
    {
      key: 'deaths',
      value: {
        alts: [
          {
            value: { min: 1000000, max: 2000000 },
            cites: [
              { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '1' } }
            ],
            heldBy: [
              { kind: 'organization', name: 'Famine Inquiry Commission' }
            ]
          }
        ]
      }
    }
  ],
  related: [
    {
      ref: 'event:second-world-war',
      rel: 'related',
      cites: [
        { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '102' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q6',
          text: 'The Bengal famine of 1943 stands out as a great calamity',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        },
        {
          id: 'q1',
          text: 'Well-to-do people, and industrial workers in Greater Calcutta and elsewhere did not go short of food in 1943. We have estimated in our report that perhaps one-tenth of the population—6 million people—were seriously affected by the famine.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '3' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: 'Prices rose rapidly and by January 1943 had reached levels never before known in Bengal. This rise in prices continued unchecked and converted a shortage of supply into a famine.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '81' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        },
        {
          id: 'q3',
          text: 'Better arrangements for the despatch and distribution would have saved many lives.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '105' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        }
      ]
    },
    {
      kind: 'casualties',
      quotes: [
        {
          id: 'q4',
          text: 'Death continued to take its toll in 1944. In the first 6 months of 1944, 981,228 deaths were recorded, an excess of 422,371 over the quinquennial average.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '108' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        },
        {
          id: 'q5',
          text: 'we are of the opinion that the number of deaths in excess of the average in 1943 was of the order of one million— that is, some 40 per cent, in excess of the officially recorded mortality. We have found no valid reason for accepting estimates in excess of this figure.',
          lang: 'en',
          cite: { source: 'famine-inquiry-commission-1945-report-on-bengal', loc: { page: '110' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://archive.org/download/dli.ernet.26318/26318-Famine%20Inquiry%20Commission%20Report%20On%20Bengal_djvu.txt'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/FatherSonCowRummagingFoodBengalFamine1943.jpg/1280px-FatherSonCowRummagingFoodBengalFamine1943.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:FatherSonCowRummagingFoodBengalFamine1943.jpg',
    credit: { institution: 'Bengal Speaks (Hind Kitabs, Bombay, 1944)' },
    license: { id: 'public-domain' }
  }
})
