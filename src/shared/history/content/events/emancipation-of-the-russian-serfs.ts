import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'emancipation-of-the-russian-serfs',
  names: [
    { text: 'Emancipation of the serfs in Russia', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'reform',
  start: {
    alts: [
      {
        value: { d: '1861-03-03', julian: true },
        cites: [
          {
            source: 'britannica-1911-alexander-ii-tsar',
            loc: { section: 'ALEXANDER II. (tsar)', para: '2' }
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
  polities: [
    { ref: 'polity:russian-empire' }
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
          text: 'Tsar Alexander II, who succeeded Nicholas I in 1855, was a conservative who saw no alternative but to implement change. Alexander initiated substantial reforms in education, the government, the judiciary, and the military. In 1861 he proclaimed the emancipation of about 20 million privately held serfs.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/russia/6.htm' }
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
        },
        {
          id: 'q12',
          text: 'In 1864 most local government in the European part of Russia was organized into provincial and district zemstva (sing., zemstvo), which were made up of representatives of all classes and were responsible for local schools, public health, roads, prisons, food supply, and other concerns.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q13',
          text: 'In 1870 elected city councils, or dumy (sing., duma ), were formed.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q14',
          text: 'In 1864 the regime implemented judicial reforms.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '9' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q15',
          text: 'The levy system introduced in 1874 gave the army a role in teaching many peasants to read and in pioneering medical education for women.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '12' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/1/16/Reading_of_the_Manifest_%28Liberation_of_peasants%29_-_Kustodiev%2C_1907.jpg/1280px-Reading_of_the_Manifest_%28Liberation_of_peasants%29_-_Kustodiev%2C_1907.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Reading_of_the_Manifest_(Liberation_of_peasants)_-_Kustodiev,_1907.jpg',
    credit: { creator: 'Boris Kustodiev' },
    license: { id: 'public-domain' }
  },
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1861-03-03', julian: true },
            cites: [
              {
                source: 'britannica-1911-alexander-ii-tsar',
                loc: { section: 'ALEXANDER II. (tsar)', para: '2' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q11',
        text: 'On the 3rd of March 1861, the sixth anniversary of his accession, the emancipation law was signed and published.',
        lang: 'en',
        cite: {
          source: 'britannica-1911-alexander-ii-tsar',
          loc: { section: 'ALEXANDER II. (tsar)', para: '2' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-08',
          url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Alexander_II._(tsar)'
        }
      }
    }
  ],
  furtherReading: [
    {
      source: 'zaionchkovskii-1954-otmena-krepostnogo-prava-v-rossii',
      perspective: 'russian-soviet'
    },
    {
      source: 'zaionchkovskii-1958-provedenie-v-zhizn-krestianskoi-reformy',
      perspective: 'russian-soviet'
    }
  ]
})
