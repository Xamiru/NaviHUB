import { definePolity } from '../../schema'

export default definePolity({
  id: 'mughal-empire',
  names: [
    { text: 'Mughal Empire', lang: 'en', role: 'primary' },
    {
      text: 'Mogul Empire',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-mogul', loc: { section: 'MOGUL', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1526' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1858-05' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:agra',
      start: {
        alts: [
          {
            value: { d: '1599' },
            cites: [
              {
                source: 'loc-india-country-study-1995',
                loc: { section: 'The Mughals', para: '4' }
              }
            ]
          }
        ]
      },
      cites: [
        { source: 'loc-india-country-study-1995', loc: { section: 'The Mughals', para: '4' } }
      ]
    },
    {
      ref: 'place:delhi',
      cites: [
        {
          source: 'loc-blog-khatoon-2017-delhi-durbar',
          loc: { section: 'The Delhi Durbar and the Proclamation of Queen Victoria', para: '5' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/7/75/Miskin_-_Mughal_Emperor_Akbar_Observing_an_Animal_Combat_-_1999.297_-_Arthur_M._Sackler_Museum.jpg/1280px-Miskin_-_Mughal_Emperor_Akbar_Observing_an_Animal_Combat_-_1999.297_-_Arthur_M._Sackler_Museum.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Miskin_-_Mughal_Emperor_Akbar_Observing_an_Animal_Combat_-_1999.297_-_Arthur_M._Sackler_Museum.jpg',
    credit: { institution: 'Harvard Art Museums', creator: 'Miskina' },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'MOGUL, Moghal, or Mughal, the Arabic and Persian form of the word Mongol, usually applied to the Mahommedan Empire in India, which was founded by Baber.',
          lang: 'en',
          cite: { source: 'britannica-1911-mogul', loc: { section: 'MOGUL', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Mogul'
          }
        },
        {
          id: 'q2',
          text: 'In the early sixteenth century, descendants of the Mongol, Turkish, Iranian, and Afghan invaders of South Asia--the Mughals--invaded India under the leadership of Zahir-ud-Din Babur.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/12.htm' }
        },
        {
          id: 'q3',
          text: 'Babur was driven from Samarkand and initially established his rule in Kabul in 1504; he later became the first Mughal ruler (1526-30).',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/12.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q4',
          text: 'An astute ruler who genuinely appreciated the challenges of administering so vast an empire, Akbar introduced a policy of reconciliation and assimilation of Hindus (including Maryam al-Zamani, the Hindu Rajput mother of his son and heir, Jahangir), who represented the majority of the population.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '6' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/12.htm' }
        },
        {
          id: 'q5',
          text: 'As the state became a huge military machine, whose nobles and their contingents multiplied almost fourfold, so did its demands for more revenue from the peasantry.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'The Mughals', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/12.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q6',
          text: 'In May 1858, the British exiled Emperor Bahadur Shah II (r. 1837-57) to Burma, thus formally liquidating the Mughal Empire.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'After the Sepoy Rebellion', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/india/18.htm' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 33296 }
  ],
  furtherReading: [
    { source: 'habib-1963-the-agrarian-system-of-mughal-india', perspective: 'south-asian' },
    {
      source: 'chandra-1959-parties-and-politics-at-the-mughal-court',
      perspective: 'south-asian'
    },
    {
      source: 'athar-ali-2001-the-mughal-nobility-under-aurangzeb',
      perspective: 'south-asian'
    }
  ]
})
