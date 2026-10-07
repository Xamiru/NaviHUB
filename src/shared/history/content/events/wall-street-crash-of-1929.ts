import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'wall-street-crash-of-1929',
  names: [
    { text: 'Wall Street crash of 1929', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-07',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1929-10-24' },
        cites: [
          { source: 'lemo-chronik-1929', loc: { section: 'Chronik 1929', para: '213' } }
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
          id: 'q1',
          text: 'Der Kurssturz an der New-Yorker Börse leitet die Weltwirtschaftskrise ein.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1929', loc: { section: 'Chronik 1929', para: '214' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1929.html'
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
      kind: 'consequences',
      quotes: [
        {
          id: 'q5',
          text: 'Der Crash an der Wallstreet hat vor allem für die deutsche Wirtschaft gravierende Folgen. Die kurzfristigen Auslandskredite werden aus Deutschland zurückgezogen.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1929', loc: { section: 'Chronik 1929', para: '214' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1929.html'
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
          text: 'The Great Depression hit Germany hard because the German economy\'s well-being depended on short-term loans from the United States.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
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
  }
})
