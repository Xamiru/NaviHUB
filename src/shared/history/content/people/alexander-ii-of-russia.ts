import { definePerson } from '../../schema'

export default definePerson({
  id: 'alexander-ii-of-russia',
  names: [
    { text: 'Alexander II of Russia', lang: 'en', role: 'primary' },
    { text: 'Александр II', lang: 'ru', role: 'native' }
  ],
  researched: '2026-10-08',
  died: {
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
  roles: ['monarch'],
  offices: [
    {
      title: 'Tsar',
      polity: 'polity:russian-empire',
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
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Tsar Alexander II, who succeeded Nicholas I in 1855, was a conservative who saw no alternative but to implement change.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        },
        {
          id: 'q2',
          text: 'In 1861 he proclaimed the emancipation of about 20 million privately held serfs.',
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
      kind: 'death',
      quotes: [
        {
          id: 'q3',
          text: 'In 1881 revolutionaries assassinated Alexander II.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Transformation of Russia in the Nineteenth Century', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/6.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/4/4a/AlexanderII1860.jpg/1280px-AlexanderII1860.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:AlexanderII1860.jpg',
    credit: { creator: 'Sergey Levitsky' },
    license: { id: 'public-domain' }
  }
})
