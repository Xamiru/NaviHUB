import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'california-gold-rush',
  names: [
    { text: 'California Gold Rush', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'migration',
  start: {
    alts: [
      {
        value: { d: '1848-01-24' },
        cites: [
          {
            source: 'nps-cali-california-gold-rush',
            loc: { section: 'The California Gold Rush', para: '4' }
          }
        ]
      }
    ]
  },
  regions: ['north-america'],
  prominence: 2,
  places: [
    {
      ref: 'place:american-river',
      cites: [
        {
          source: 'nps-cali-california-gold-rush',
          loc: { section: 'The California Gold Rush', para: '3' }
        }
      ]
    }
  ],
  participants: [
    {
      name: 'James Marshall',
      role: 'participant',
      cites: [
        {
          source: 'nps-cali-california-gold-rush',
          loc: { section: 'The California Gold Rush', para: '3' }
        },
        {
          source: 'nps-cali-california-gold-rush',
          loc: { section: 'The California Gold Rush', para: '4' }
        }
      ]
    },
    {
      name: 'John Sutter',
      role: 'participant',
      cites: [
        {
          source: 'nps-cali-california-gold-rush',
          loc: { section: 'The California Gold Rush', para: '3' }
        }
      ]
    },
    {
      ref: 'person:james-k-polk',
      role: 'head-of-state',
      cites: [
        {
          source: 'nps-cali-california-gold-rush',
          loc: { section: 'The California Gold Rush', para: '5' }
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
          text: 'At a time when restless Americans were already itching to go west, the discovery of gold in California in 1848 was like gasoline on a fire. Within a year of its discovery, emigrants using the California Trail were flooding into the Sierra Nevada Range by the thousands.',
          lang: 'en',
          cite: {
            source: 'nps-cali-california-gold-rush',
            loc: { section: 'The California Gold Rush', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q2',
          text: '"I reached my hand down and picked it up; it made my heart thump, for I was certain it was gold." - James Marshall, 1848',
          lang: 'en',
          cite: {
            source: 'nps-cali-california-gold-rush',
            loc: { section: 'The California Gold Rush', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
          }
        },
        {
          id: 'q3',
          text: 'Both Marshall and Sutter tried to keep things quiet, but soon word leaked out.',
          lang: 'en',
          cite: {
            source: 'nps-cali-california-gold-rush',
            loc: { section: 'The California Gold Rush', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
          }
        },
        {
          id: 'q4',
          text: 'Gold fever quickly became an epidemic.',
          lang: 'en',
          cite: {
            source: 'nps-cali-california-gold-rush',
            loc: { section: 'The California Gold Rush', para: '4' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
          }
        },
        {
          id: 'q5',
          text: 'Grass and clean water became scarcer as the trip wore on, and diseases like cholera took their toll.',
          lang: 'en',
          cite: {
            source: 'nps-cali-california-gold-rush',
            loc: { section: 'The California Gold Rush', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Indians in particular suffered from the "Forty-Niners" who streamed across the land.',
          lang: 'en',
          cite: {
            source: 'nps-cali-california-gold-rush',
            loc: { section: 'The California Gold Rush', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
          }
        },
        {
          id: 'q7',
          text: 'But now the pioneers\' lust for wealth was threatening to decimate the Indians through the consumption of foods, lands, water and space.',
          lang: 'en',
          cite: {
            source: 'nps-cali-california-gold-rush',
            loc: { section: 'The California Gold Rush', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
          }
        },
        {
          id: 'q8',
          text: 'Many new routes were opened into California as a result of the Gold Rush.',
          lang: 'en',
          cite: {
            source: 'nps-cali-california-gold-rush',
            loc: { section: 'The California Gold Rush', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
          }
        },
        {
          id: 'q9',
          text: 'Immigration from Great Britain often came in waves: huge numbers fled famine in Ireland -- part of Britain until the early twentieth century -- after 1845, and others came during events such as the California Gold Rush in 1849.',
          lang: 'en',
          cite: {
            source: 'loc-exhibit-john-bull-and-uncle-sam-exploration-and-settlement',
            loc: { section: 'Exploration and Settlement' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.loc.gov/exhibits/british/brit-1.html'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1848-01-24' },
            cites: [
              {
                source: 'nps-cali-california-gold-rush',
                loc: { section: 'The California Gold Rush', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q10',
        text: 'Marshall discovered a gold nugget on January 24, 1848, while at the sawmill.',
        lang: 'en',
        cite: {
          source: 'nps-cali-california-gold-rush',
          loc: { section: 'The California Gold Rush', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1848-12' },
            cites: [
              {
                source: 'nps-cali-california-gold-rush',
                loc: { section: 'The California Gold Rush', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'But it wasn\'t until December of 1848 that President James Polk confirmed the findings to Congress, which meant it was too late to start a trip for easterners.',
        lang: 'en',
        cite: {
          source: 'nps-cali-california-gold-rush',
          loc: { section: 'The California Gold Rush', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1849' },
            cites: [
              {
                source: 'nps-cali-california-gold-rush',
                loc: { section: 'The California Gold Rush', para: '5' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'But by the spring of 1849, the largest migration (25,000 that year alone) in American history was already taking place.',
        lang: 'en',
        cite: {
          source: 'nps-cali-california-gold-rush',
          loc: { section: 'The California Gold Rush', para: '5' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.nps.gov/cali/learn/historyculture/california-gold-rush.htm'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/69/California_gold_miners_with_long_tom.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:California_gold_miners_with_long_tom.jpg',
    credit: { institution: 'Nelson-Atkins Museum of Art', creator: 'George H. Johnson' },
    license: { id: 'public-domain' }
  }
})
