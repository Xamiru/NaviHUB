import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-all-india-muslim-league',
  names: [
    { text: 'Founding of the All-India Muslim League', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1906' },
        cites: [
          {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Development of the Muslim League, 1906-20', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  places: [
    {
      ref: 'place:dhaka',
      cites: [
        {
          source: 'loc-bangladesh-country-study-1989',
          loc: { section: 'Development of the Muslim League, 1906-20', para: '1' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:partition-of-bengal-1905', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In 1906 the All-India Muslim League (Muslim League) met in Dhaka for the first time. The Muslim League used the occasion to declare its support for the partition of Bengal and to proclaim its mission as a "political association to protect and advance the political rights and interests of the Mussalmans of India."',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Development of the Muslim League, 1906-20', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bangladesh/12.htm' }
        },
        {
          id: 'q2',
          text: 'The Muslim League initially professed its loyalty to the British government and its condemnation of the swadeshi movement. It was of an altogether different nature from Congress.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Development of the Muslim League, 1906-20', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bangladesh/12.htm' }
        },
        {
          id: 'q3',
          text: 'The Muslim League looked to the British for protection of Muslim minority rights and insisted on guarantees for Muslim minority rights as the price of its participation with Congress in the nationalist movement.',
          lang: 'en',
          cite: {
            source: 'loc-bangladesh-country-study-1989',
            loc: { section: 'Development of the Muslim League, 1906-20', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/bangladesh/12.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3c/All_India_Muslim_League_Dhaka_1906.jpg/1280px-All_India_Muslim_League_Dhaka_1906.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:All_India_Muslim_League_Dhaka_1906.jpg',
    credit: { institution: 'Dawn' },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'pirzada-1969-foundations-of-pakistan', perspective: 'south-asian' },
    {
      source: 'ikram-1977-modern-muslim-india-and-the-birth-of-pakistan',
      perspective: 'south-asian'
    },
    { source: 'qureshi-1969-the-struggle-for-pakistan', perspective: 'south-asian' }
  ]
})
