import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'emancipation-of-the-russian-serfs',
  names: [
    { text: 'Emancipation of the serfs in Russia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-06',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1861' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
          },
          {
            source: 'state-dept-milestones-consequences-of-union-victory',
            loc: { section: 'The Consequences of Union Victory, 1865', para: '8' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia', 'europe'],
  prominence: 1,
  partOf: [
    { ref: 'period:reign-of-alexander-ii' }
  ],
  participants: [
    {
      ref: 'person:alexander-ii-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
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
          text: 'In 1861 he proclaimed the emancipation of about 20 million privately held serfs.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q2',
          text: 'Local commissions, which were dominated by landlords, effected emancipation by giving land and limited freedom to the serfs. The former serfs usually remained in the village commune, but they were required to make redemption payments to the government over a period of almost fifty years. The government compensated former owners of serfs by issuing them bonds.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'Tsar Alexander II, who succeeded Nicholas I in 1855, was a conservative who saw no alternative but to implement change.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q4',
          text: 'One of the chief reasons for the emancipation of the serfs was to facilitate the transition from a large standing army to a reserve army by instituting territorial levies and mobilization in times of need.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q5',
          text: 'Before emancipation, serfs could not receive military training and then return to their owners.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Neither of the government\'s expectations was realistic, however, and emancipation left both former serfs and their former owners dissatisfied.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q7',
          text: 'The new peasants soon fell behind in their payments to the government because the land they had received was poor and because Russian agricultural methods were inadequate.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '7' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q8',
          text: 'Reforms of local government closely followed emancipation.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q9',
          text: 'When Russia officially emancipated the Polish serfs in early 1864, it removed a major rallying point from the agenda of potential Polish revolutionaries.',
          lang: 'en',
          cite: {
            source: 'loc-poland-country-study-1992',
            loc: { section: 'PARTITIONED POLAND', para: '15' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/poland/12.htm' }
        },
        {
          id: 'q10',
          text: 'The Russian empire had already announced the end of serfdom in 1861, and the Dutch government abolished slavery in its colonies in 1863.',
          lang: 'en',
          cite: {
            source: 'state-dept-milestones-consequences-of-union-victory',
            loc: { section: 'The Consequences of Union Victory, 1865', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://history.state.gov/milestones/1861-1865/victory'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Reading_of_the_Manifest_%28Liberation_of_peasants%29_-_Kustodiev%2C_1907.jpg/1280px-Reading_of_the_Manifest_%28Liberation_of_peasants%29_-_Kustodiev%2C_1907.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Reading_of_the_Manifest_(Liberation_of_peasants)_-_Kustodiev,_1907.jpg',
    credit: { creator: 'Boris Kustodiev' },
    license: { id: 'public-domain' }
  }
})
