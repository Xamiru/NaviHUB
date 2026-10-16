import { definePolity } from '../../schema'

export default definePolity({
  id: 'vijayanagara-empire',
  names: [
    { text: 'Vijayanagara Empire', lang: 'en', role: 'primary' },
    {
      text: 'Vijayanagar',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Southern Dynasties', para: '2' }
        }
      ]
    },
    {
      text: 'Bijanagar',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } }
      ]
    }
  ],
  researched: '2026-10-16',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1336' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '2' }
          },
          { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1565' },
        cites: [
          {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '3' }
          },
          { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } }
        ]
      }
    ]
  },
  regions: ['south-asia'],
  prominence: 2,
  capitals: [
    {
      ref: 'place:hampi',
      cites: [
        {
          source: 'loc-india-country-study-1995',
          loc: { section: 'Southern Dynasties', para: '2' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 167639 }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Founded in 1336, the empire of Vijayanagar (named for its capital Vijayanagar, "City of Victory," in present-day Karnataka) expanded rapidly toward Madurai in the south and Goa in the west and exerted intermittent control over the east coast and the extreme southwest.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
        },
        {
          id: 'q2',
          text: 'VIJAYANAGAR, or Bijanagar (“the city of victory”), an ancient Hindu kingdom and ruined city of southern India.',
          lang: 'en',
          cite: { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vijayanagar'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Vijayanagar rulers closely followed Chola precedents, especially in collecting agricultural and trade revenues, in giving encouragement to commercial guilds, and in honoring temples with lavish endowments.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
        },
        {
          id: 'q4',
          text: 'Added revenue needed for waging war against the Bahmani sultans was raised by introducing a set of taxes on commercial enterprises, professions, and industries.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
        },
        {
          id: 'q5',
          text: 'The city of Vijayanagar itself contained numerous temples with rich ornamentation, especially the gateways, and a cluster of shrines for the deities.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'When the five rulers of what was once the Bahmani Sultanate combined their forces and attacked Vijayanagar in 1565, the empire crumbled at the Battle of Talikot.',
          lang: 'en',
          cite: {
            source: 'loc-india-country-study-1995',
            loc: { section: 'Southern Dynasties', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-16', url: 'http://countrystudies.us/india/11.htm' }
        },
        {
          id: 'q7',
          text: 'The Raya fled south to Penukonda, and later to Chandragiri, where one of his descendants granted to the English the site of Fort St George or Madras.',
          lang: 'en',
          cite: { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vijayanagar'
          }
        },
        {
          id: 'q8',
          text: 'The city has ever since remained a wilderness of immense ruins, which are now conserved by the British government.',
          lang: 'en',
          cite: { source: 'britannica-1911-vijayanagar', loc: { section: 'Vijayanagar', para: '1' } },
          provenance: {
            via: 'web',
            at: '2026-10-16',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/Vijayanagar'
          }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/5/54/Vijayanagara_Empire_around_1525.jpg/1280px-Vijayanagara_Empire_around_1525.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Vijayanagara_Empire_around_1525.jpg',
    credit: { institution: 'Internet Archive', creator: 'M. H. Rama Sharma' },
    license: { id: 'public-domain' }
  }
})
