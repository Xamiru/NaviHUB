import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-nicholas-i',
  names: [
    { text: 'Reign of Nicholas I', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1825' },
        cites: [
          {
            source: 'iranica-andreeva-russia-relations',
            loc: {
              section: 'RUSSIA i. Russo-Iranian Relations up to the Bolshevik Revolution',
              para: '21'
            }
          }
        ]
      }
    ]
  },
  end: {
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
  regions: ['russia-central-asia'],
  prominence: 2,
  parent: 'polity:russian-empire',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'A secret police, the so-called Third Section, ran a huge network of spies and informers.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q2',
          text: 'The government exercised censorship and other controls over education, publishing, and all manifestations of public life.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q3',
          text: 'In 1833 the minister of education, Sergey Uvarov, devised a program of "autocracy, Orthodoxy, and nationality" as the guiding principle of the regime.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '13' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Russian dominance proved illusory, however.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q5',
          text: 'Russia now faced the choice of initiating major reforms or losing its status as a major European power.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/4e/Franz_Kr%C3%BCger_%281797-1857%29_-_Nicholas_I%2C_Emperor_of_Russia_%281796-1855%29_-_RCIN_406814_-_Royal_Collection.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Franz_Kr%C3%BCger_(1797-1857)_-_Nicholas_I,_Emperor_of_Russia_(1796-1855)_-_RCIN_406814_-_Royal_Collection.jpg',
    credit: { institution: 'Royal Collection', creator: 'Franz Krüger' },
    license: { id: 'public-domain' }
  }
})
