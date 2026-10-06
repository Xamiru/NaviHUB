import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'great-depression',
  names: [
    { text: 'Great Depression', lang: 'en', role: 'primary' },
    { text: 'Weltwirtschaftskrise', lang: 'de', role: 'alternative' }
  ],
  researched: '2026-10-06',
  periodType: 'era',
  start: {
    alts: [
      {
        value: { d: '1929' },
        cites: [
          {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['global', 'north-america', 'europe'],
  prominence: 1,
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Great Depression of the 1930s was a global event that derived in part from events in the United States and U.S. financial policies.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/great-depression'
          }
        },
        {
          id: 'q2',
          text: 'At the London Economic Conference in 1933, leaders of the world’s main economies met to resolve the economic crisis, but failed to reach any major collective agreements. As a result, the Depression dragged on through the rest of the 1930s.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '5' }
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
          text: 'The U.S. stock market crash of 1929, an economic downturn in Germany, and financial difficulties in France and Great Britain all coincided to cause a global financial crisis. Dedication to the gold standard in each of these nations and Japan, which only managed to return to it in 1930, only made the problem worse and hastened the slide into what is now known as the Great Depression.',
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
          id: 'q5',
          text: 'The key factor in turning national economic difficulties into worldwide Depression seems to have been a lack of international coordination as most governments and financial institutions turned inwards.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '5' }
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
          id: 'q6',
          text: 'As the United States turned inwards to deal with the lingering effects of the Depression, militaristic regimes came to power in Germany, Italy, and Japan promising economic relief and national expansion.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '10' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1921-1936/great-depression'
          }
        },
        {
          id: 'q7',
          text: 'Unemployment went from 8.5 percent in 1929 to 14 percent in 1930, to 21.9 percent in 1931, and, at its peak, to 29.9 percent in 1932.',
          lang: 'en',
          cite: {
            source: 'loc-germany-country-study-1995',
            loc: { section: 'Hitler and the Rise of National Socialism', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/germany/38.htm' }
        },
        {
          id: 'q8',
          text: 'Ironically, it was World War II, which had arisen in part out of the Great Depression, that finally pulled the United States out of its decade-long economic crisis.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-great-depression',
            loc: { section: 'The Great Depression and U.S. Foreign Policy', para: '10' }
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/b/bc/Migrant_Mother_%28LOC_fsa.8b29516%29.jpg/1280px-Migrant_Mother_%28LOC_fsa.8b29516%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Migrant_Mother_(LOC_fsa.8b29516).jpg',
    credit: {
      institution: 'Library of Congress, Farm Security Administration collection',
      creator: 'Dorothea Lange'
    },
    license: { id: 'public-domain' }
  }
})
