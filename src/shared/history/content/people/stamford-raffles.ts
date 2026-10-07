import { definePerson } from '../../schema'

export default definePerson({
  id: 'stamford-raffles',
  names: [
    { text: 'Stamford Raffles', lang: 'en', role: 'primary' },
    {
      text: 'Sir Thomas Stamford Raffles',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-singapore-country-study-1989',
          loc: { section: 'Founding and Early Years', para: '5' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  regions: ['southeast-asia'],
  roles: ['politician'],
  offices: [
    {
      title: 'lieutenant governor of Java',
      start: {
        alts: [
          {
            value: { d: '1811' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'VOC Bankruptcy and the British Occupation', para: '4' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1816' },
            cites: [
              {
                source: 'loc-indonesia-country-study-1993',
                loc: { section: 'VOC Bankruptcy and the British Occupation', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'loc-indonesia-country-study-1993',
          loc: { section: 'VOC Bankruptcy and the British Occupation', para: '4' }
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
          text: 'Raffles, who had started his career as a clerk for the British East India Company in London, was promoted at the age of twenty-three to assistant secretary of the newly formed government in Penang in 1805. A serious student of the history and culture of the region and fluent in Malay, Raffles served as governor general of Java (1811-16).',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        },
        {
          id: 'q2',
          text: 'Raffles, best known for being the founder of Singapore in 1819, attempted, like Daendels, comprehensive reform.',
          lang: 'en',
          cite: {
            source: 'loc-indonesia-country-study-1993',
            loc: { section: 'VOC Bankruptcy and the British Occupation', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/indonesia/9.htm' }
        }
      ]
    },
    {
      kind: 'in-their-words',
      quotes: [
        {
          id: 'q3',
          text: 'He wrote to a friend that Singapore "is by far the most important station in the East; and, as far as naval superiority and commercial interests are concerned, of much higher value than whole continents of territory."',
          lang: 'en',
          cite: {
            source: 'loc-singapore-country-study-1989',
            loc: { section: 'Founding and Early Years', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/singapore/4.htm' }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/81/StamfordRaffles.jpeg',
    page: 'https://commons.wikimedia.org/wiki/File:StamfordRaffles.jpeg',
    credit: { institution: 'National Portrait Gallery, London', creator: 'James Thomson' },
    license: { id: 'public-domain' }
  }
})
