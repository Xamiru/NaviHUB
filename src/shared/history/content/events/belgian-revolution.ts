import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'belgian-revolution',
  names: [
    { text: 'Belgian Revolution', lang: 'en', role: 'primary' },
    { text: 'Révolution belge', lang: 'fr', role: 'native' }
  ],
  researched: '2026-10-07',
  type: 'revolution',
  start: {
    alts: [
      {
        value: { d: '1830' },
        cites: [
          {
            source: 'belgium-be-belgiums-independence',
            loc: { section: 'Revolution and independence' }
          }
        ]
      }
    ]
  },
  regions: ['europe'],
  prominence: 2,
  places: [
    {
      ref: 'place:brussels',
      cites: [
        {
          source: 'belgium-be-belgiums-independence',
          loc: { section: 'Revolution and independence' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'William I',
      role: 'head-of-state',
      cites: [
        {
          source: 'belgium-be-belgiums-independence',
          loc: { section: 'Revolution and independence' }
        }
      ]
    },
    {
      name: 'Leopold I of Saxe-Coburg',
      role: 'head-of-state',
      cites: [
        { source: 'belgium-be-belgiums-independence', loc: { section: '1830 to 1908' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'At the Congress of Vienna, in 1815, Belgium (The Southern Netherlands) and the Northern Netherlands (Holland) were united to form one State.',
          lang: 'en',
          cite: {
            source: 'belgium-be-belgiums-independence',
            loc: { section: 'Revolution and independence' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
          }
        },
        {
          id: 'q2',
          text: 'The Catholics objected against the interference of the protestant king in clerical matters.',
          lang: 'en',
          cite: {
            source: 'belgium-be-belgiums-independence',
            loc: { section: 'Revolution and independence' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
          }
        },
        {
          id: 'q3',
          text: 'The Liberals demanded more freedom.',
          lang: 'en',
          cite: {
            source: 'belgium-be-belgiums-independence',
            loc: { section: 'Revolution and independence' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
          }
        },
        {
          id: 'q4',
          text: 'In 1828 Catholics and Liberals drew up a concerted programme of demands.',
          lang: 'en',
          cite: {
            source: 'belgium-be-belgiums-independence',
            loc: { section: 'Revolution and independence' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
          }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q16',
          text: 'The Kingdom of Belgium declared its independence from the Kingdom of the Netherlands on October 4, 1830.',
          lang: 'en',
          cite: { source: 'state-dept-countries-belgium', loc: { section: 'Belgium: Summary' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'https://history.state.gov/countries/belgium' }
        },
        {
          id: 'q5',
          text: 'After a series of incidents, the revolution erupted in Brussels in 1830.',
          lang: 'en',
          cite: {
            source: 'belgium-be-belgiums-independence',
            loc: { section: 'Revolution and independence' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
          }
        },
        {
          id: 'q6',
          text: 'The rebels received support from volunteers outside the city.',
          lang: 'en',
          cite: {
            source: 'belgium-be-belgiums-independence',
            loc: { section: 'Revolution and independence' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
          }
        },
        {
          id: 'q7',
          text: 'Following this rising Belgium separated from the Northern Netherlands.',
          lang: 'en',
          cite: {
            source: 'belgium-be-belgiums-independence',
            loc: { section: 'Revolution and independence' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The great powers of the time recognised the secession of Belgium from the (Northern) Netherlands.',
          lang: 'en',
          cite: { source: 'belgium-be-belgiums-independence', loc: { section: '1830 to 1908' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
          }
        },
        {
          id: 'q9',
          text: 'Leopold I of Saxe-Coburg became the first King of the Belgians (1831 - 1865).',
          lang: 'en',
          cite: { source: 'belgium-be-belgiums-independence', loc: { section: '1830 to 1908' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
          }
        },
        {
          id: 'q10',
          text: 'However, it was not until the Netherlands signed the Treaty of London on April 19, 1839 that the former ruler recognized Brussels as a sovereign state.',
          lang: 'en',
          cite: { source: 'state-dept-countries-belgium', loc: { section: 'Belgium: Summary' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'https://history.state.gov/countries/belgium' }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1830-09-27' },
            cites: [
              {
                source: 'belgium-be-belgiums-independence',
                loc: { section: 'Revolution and independence' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'William I sent in his troops, but they were expelled on September 27th, 1830.',
        lang: 'en',
        cite: {
          source: 'belgium-be-belgiums-independence',
          loc: { section: 'Revolution and independence' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1830-10-04' },
            cites: [
              {
                source: 'belgium-be-belgiums-independence',
                loc: { section: 'Revolution and independence' }
              },
              { source: 'state-dept-countries-belgium', loc: { section: 'Belgium: Summary' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'A provisional government declared independence on October 4th, 1830.',
        lang: 'en',
        cite: {
          source: 'belgium-be-belgiums-independence',
          loc: { section: 'Revolution and independence' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1830-11-03' },
            cites: [
              {
                source: 'belgium-be-belgiums-independence',
                loc: { section: 'Revolution and independence' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'On November 3th of the same year, a National Congress was elected by an electorate of 30,000 men, who paid a given level of taxes or who had special qualifications.',
        lang: 'en',
        cite: {
          source: 'belgium-be-belgiums-independence',
          loc: { section: 'Revolution and independence' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1830-12-20' },
            cites: [
              { source: 'state-dept-countries-belgium', loc: { section: 'Belgium: Summary' } }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'Most of the European powers recognized de facto independence on December 20, 1830.',
        lang: 'en',
        cite: { source: 'state-dept-countries-belgium', loc: { section: 'Belgium: Summary' } },
        provenance: { via: 'web', at: '2026-10-06', url: 'https://history.state.gov/countries/belgium' }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1831-02-07' },
            cites: [
              {
                source: 'belgium-be-belgiums-independence',
                loc: { section: 'Revolution and independence' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q15',
        text: 'On February 7th, 1831 the national congress adopted a constitution which, for its time, was very progressive.',
        lang: 'en',
        cite: {
          source: 'belgium-be-belgiums-independence',
          loc: { section: 'Revolution and independence' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.belgium.be/en/about_belgium/country/history/belgium_from_1830'
        }
      }
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/34/Gustave_Wappers_-_Episode_of_the_September_Days_1830%2C_on_the_Grand_Place_of_Brussels_-_Google_Art_Project.jpg/1280px-Gustave_Wappers_-_Episode_of_the_September_Days_1830%2C_on_the_Grand_Place_of_Brussels_-_Google_Art_Project.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Gustave_Wappers_-_Episode_of_the_September_Days_1830,_on_the_Grand_Place_of_Brussels_-_Google_Art_Project.jpg',
    credit: { institution: 'Royal Museums of Fine Arts of Belgium', creator: 'Gustaaf Wappers' },
    license: { id: 'public-domain' }
  }
})
