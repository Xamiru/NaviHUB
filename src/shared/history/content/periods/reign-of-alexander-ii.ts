import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-alexander-ii',
  names: [
    { text: 'Reign of Alexander II', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1855' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1881' },
        cites: [
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          }
        ]
      }
    ]
  },
  regions: ['russia-central-asia'],
  prominence: 2,
  parent: 'polity:russian-empire',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Alexander initiated substantial reforms in education, the government, the judiciary, and the military.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q2',
          text: 'The accession of Alexander II brought a social restructuring that required a public discussion of issues and the lifting of some types of censorship.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q3',
          text: 'Following the Crimean War, the regime revived its expansionist policies.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '16' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/AlexanderII1860.jpg/1280px-AlexanderII1860.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:AlexanderII1860.jpg',
    credit: { creator: 'Sergey Levitsky' },
    license: { id: 'public-domain' }
  }
})
