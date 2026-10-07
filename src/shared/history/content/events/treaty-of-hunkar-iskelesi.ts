import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'treaty-of-hunkar-iskelesi',
  names: [
    { text: 'Treaty of Hünkâr İskelesi', lang: 'en', role: 'primary' },
    { text: 'Hünkâr İskelesi Antlaşması', lang: 'tr', role: 'native' },
    {
      text: 'Treaty of Unkiar-Skelessi',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '17' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'treaty',
  start: {
    alts: [
      {
        value: { d: '1833' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '4' }
          },
          {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'russia-central-asia', 'europe'],
  prominence: 3,
  partOf: [
    { ref: 'period:reign-of-nicholas-i' }
  ],
  participants: [
    {
      ref: 'person:nicholas-i-of-russia',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-russia-country-study-1996',
          loc: { section: 'Ruling the Empire', para: '17' }
        }
      ]
    }
  ],
  related: [
    {
      ref: 'event:egyptian-ottoman-war-1831-1833',
      rel: 'response-to',
      cites: [
        {
          source: 'loc-turkey-country-study-1995',
          loc: { section: 'External Threats and Internal Transformations', para: '4' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'background',
      quotes: [
        {
          id: 'q1',
          text: 'While Nicholas was attempting to maintain the status quo in Europe, he adopted an aggressive policy toward the Ottoman Empire.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'In 1833 Russia negotiated the Treaty of Unkiar-Skelessi with the Ottoman Empire.',
          lang: 'en',
          cite: {
            source: 'loc-russia-country-study-1996',
            loc: { section: 'Ruling the Empire', para: '17' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/russia/5.htm' }
        },
        {
          id: 'q2',
          text: 'The price the sultan paid Russia for its assistance was the Treaty of Hünkar Iskelesi of 1833.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q4',
          text: 'Russia waived its rights under the 1833 treaty and aligned itself with British efforts to support the Ottoman Empire militarily and diplomatically.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q5',
          text: 'By the London Straits Convention of 1841, they affirmed Ottoman control over the straits and forbade any power, including Russia, to send warships through the straits.',
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
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d8/Mahmud_II.jpg/1280px-Mahmud_II.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Mahmud_II.jpg',
    credit: { institution: 'Château de Versailles', creator: 'Henri-Guillaume Schlesinger' },
    license: { id: 'public-domain' }
  }
})
