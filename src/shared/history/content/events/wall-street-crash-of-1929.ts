import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'wall-street-crash-of-1929',
  names: [
    { text: 'Wall Street crash of 1929', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1929-10-24' },
        cites: [
          {
            source: 'hoover-heads-schaefer-four-score-2017',
            loc: { section: 'Four Score and Seven Years Ago', para: '4' }
          },
          {
            source: 'loc-guide-business-booms-busts-stock-market',
            loc: { section: 'Stock Market Panics' }
          }
        ]
      }
    ]
  },
  regions: ['north-america', 'global'],
  prominence: 1,
  places: [
    {
      ref: 'place:new-york-city',
      cites: [
        { source: 'lemo-chronik-1929', loc: { section: 'Chronik 1929', para: '214' } }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q10',
          text: 'For historians and economists looking back, the Stock Market Crash of 1929, is seen as a pivotal point in American history. While they cannot agree on the weight to assign to the Crash, all agree that it marked the beginning of the Great Depression.',
          lang: 'en',
          cite: {
            source: 'hoover-heads-schaefer-four-score-2017',
            loc: { section: 'Four Score and Seven Years Ago', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://hoover.blogs.archives.gov/2017/10/25/four-score-and-seven-years-ago/'
          }
        },
        {
          id: 'q9',
          text: 'In October, 1929, the bubble burst, and in less than a week, the market dropped by almost half of its recent record highs. Billions of dollars were lost, and thousands of investors were ruined.',
          lang: 'en',
          cite: {
            source: 'hoover-library-great-depression',
            loc: { section: 'The Great Depression' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-07',
            url: 'https://hoover.archives.gov/exhibits/great-depression'
          }
        }
      ]
    },
    {
      kind: 'background',
      quotes: [
        {
          id: 'q11',
          text: 'When Herbert Hoover became President in 1929, the stock market was climbing to unprecedented levels, and some investors were taking advantage of low interest rates to buy stocks on credit, pushing prices even higher.',
          lang: 'en',
          cite: {
            source: 'hoover-library-great-depression',
            loc: { section: 'The Great Depression' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://hoover.archives.gov/exhibits/great-depression'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'The origins of the Great Depression were complicated and have been much debated among scholars.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/great-depression'
          }
        },
        {
          id: 'q4',
          text: 'However, this introduced inflexibility into domestic and international financial markets, which meant that they were less able to deal with additional shocks when they came in the late 1920s and early 1930s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/great-depression'
          }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q16',
          text: 'Secretary of Treasury Andrew Mellon saw the crash as a needed correction, to remove speculative liquidity from the market. President Hoover described it as a Wall Street problem, not a Main Street problem.',
          lang: 'en',
          cite: {
            source: 'hoover-heads-schaefer-four-score-2017',
            loc: { section: 'Four Score and Seven Years Ago', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://hoover.blogs.archives.gov/2017/10/25/four-score-and-seven-years-ago/'
          }
        },
        {
          id: 'q17',
          text: 'In the wake of the crash, Hoover convened the Conference for Continued Industrial Progress in November 1929, bringing together 400 leaders from business, government, labor and banking.',
          lang: 'en',
          cite: {
            source: 'hoover-heads-schaefer-four-score-2017',
            loc: { section: 'Four Score and Seven Years Ago', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://hoover.blogs.archives.gov/2017/10/25/four-score-and-seven-years-ago/'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q2',
          text: 'The U.S. stock market crash of 1929, an economic downturn in Germany, and financial difficulties in France and Great Britain all coincided to cause a global financial crisis.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/great-depression'
          }
        },
        {
          id: 'q15',
          text: 'The Great Depression saw unemployment in America rise to nearly 25%, with another 20% working less than full-time; hundreds of banks closed their doors; thousands of homes and farms fell into foreclosure; GDP fell precipitously.',
          lang: 'en',
          cite: {
            source: 'hoover-heads-schaefer-four-score-2017',
            loc: { section: 'Four Score and Seven Years Ago', para: '5' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://hoover.blogs.archives.gov/2017/10/25/four-score-and-seven-years-ago/'
          }
        },
        {
          id: 'q6',
          text: 'Had it not been for the economic collapse that began with the Wall Street stock market crash of October 1929, Hitler probably would not have come to power.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        },
        {
          id: 'q7',
          text: 'The Great Depression hit Germany hard because the German economy\'s well-being depended on short-term loans from the United States. Once these loans were recalled, Germany was devastated.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/germany/38.htm' }
        },
        {
          id: 'q8',
          text: 'The Depression caused the United States to retreat further into its post-World War I isolationism.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '7' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/great-depression'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3f/Crowds_gathering_outside_New_York_Stock_Exchange.jpg/1280px-Crowds_gathering_outside_New_York_Stock_Exchange.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Crowds_gathering_outside_New_York_Stock_Exchange.jpg',
    credit: { creator: 'Associated Press' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1929-10-24' },
            cites: [
              {
                source: 'hoover-heads-schaefer-four-score-2017',
                loc: { section: 'Four Score and Seven Years Ago', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q12',
        text: 'Black Thursday, October 24, 1929, saw the New York Stock Exchange lose 11% of its value in heavy trading.',
        lang: 'en',
        cite: {
          source: 'hoover-heads-schaefer-four-score-2017',
          loc: { section: 'Four Score and Seven Years Ago', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://hoover.blogs.archives.gov/2017/10/25/four-score-and-seven-years-ago/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1929-10-28' },
            cites: [
              {
                source: 'hoover-heads-schaefer-four-score-2017',
                loc: { section: 'Four Score and Seven Years Ago', para: '4' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q13',
        text: 'After a quiescent Friday, the stock market resumed its slide on Monday, October 28, 1929, losing nearly 13%.',
        lang: 'en',
        cite: {
          source: 'hoover-heads-schaefer-four-score-2017',
          loc: { section: 'Four Score and Seven Years Ago', para: '4' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://hoover.blogs.archives.gov/2017/10/25/four-score-and-seven-years-ago/'
        }
      }
    },
    {
      date: {
        alts: [
          {
            value: { d: '1929-10-29' },
            cites: [
              {
                source: 'loc-guide-business-booms-busts-stock-market',
                loc: { section: 'Stock Market Panics' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q14',
        text: 'October 29, 1929 (Black Tuesday) is when investors traded some 16 million shares on the New York Stock Exchange in a single day.',
        lang: 'en',
        cite: {
          source: 'loc-guide-business-booms-busts-stock-market',
          loc: { section: 'Stock Market Panics' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://guides.loc.gov/business-booms-busts/stock-market'
        }
      }
    }
  ],
  end: {
    alts: [
      {
        value: { d: '1929-10-29' },
        cites: [
          {
            source: 'loc-guide-business-booms-busts-stock-market',
            loc: { section: 'Stock Market Panics' }
          }
        ]
      }
    ]
  },
  participants: [
    {
      name: 'Herbert Hoover',
      role: 'head-of-state',
      cites: [
        {
          source: 'hoover-heads-schaefer-four-score-2017',
          loc: { section: 'Four Score and Seven Years Ago', para: '6' }
        }
      ]
    },
    {
      name: 'Andrew Mellon',
      role: 'participant',
      cites: [
        {
          source: 'hoover-heads-schaefer-four-score-2017',
          loc: { section: 'Four Score and Seven Years Ago', para: '6' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'varga-1930-mirovoi-ekonomicheskii-krizis', perspective: 'russian-soviet' }
  ]
})
