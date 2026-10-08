import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'opening-of-the-suez-canal',
  names: [
    { text: 'Opening of the Suez Canal', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1869-11' },
        cites: [
          { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '2' } }
        ]
      }
    ]
  },
  regions: ['mena', 'europe', 'global'],
  prominence: 2,
  places: [
    {
      ref: 'place:suez-canal',
      cites: [
        { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '1' } }
      ]
    }
  ],
  related: [
    { ref: 'event:suez-canal-concession', rel: 'preceded-by' }
  ],
  polities: [
    { ref: 'polity:khedivate-of-egypt' }
  ],
  participants: [
    {
      name: 'Ferdinand de Lesseps',
      role: 'organizer',
      cites: [
        { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '1' } }
      ]
    },
    {
      name: 'Khedive Ismail',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: {
            section: 'ISMAIL, TAWFIQ, AND THE URABI REVOLT: Khedive Ismail, 1863-79',
            para: '5'
          }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q8',
          text: 'The French played a significant role in the building of the Suez Canal, which links the Red Sea and the Mediterranean.',
          lang: 'en',
          cite: { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '1' } },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/99.htm' }
        },
        {
          id: 'q2',
          text: 'French engineer Ferdinand de Lesseps designed and supervised the construction of the project.',
          lang: 'en',
          cite: { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/99.htm' }
        },
        {
          id: 'q1',
          text: 'The canal was opened to navigation in November 1869 under a concession to Britain and France scheduled to expire in 1968.',
          lang: 'en',
          cite: { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '2' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/99.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'Completion of the 160- kilometer long waterway, however, took ten years of excruciating and poorly compensated labor by Egyptian workers, who were drafted at the rate of 20,000 every ten months from the ranks of the peasantry.',
          lang: 'en',
          cite: { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '1' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/99.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Although the French were the force behind the project, Britain stood to gain the most because of its extensive possessions in Asia.',
          lang: 'en',
          cite: { source: 'loc-egypt-country-study-1990', loc: { section: 'Suez Canal', para: '2' } },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/99.htm' }
        },
        {
          id: 'q5',
          text: 'The opening of the Suez Canal (1869) probably was the most significant of these transformations revolutionizing Persia’s southern trade.',
          lang: 'en',
          cite: {
            source: 'iranica-hakimian-economy-qajar',
            loc: { section: 'ECONOMY viii. IN THE QAJAR PERIOD', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/economy-viii-in-the-qajar-period'
          }
        },
        {
          id: 'q6',
          text: 'For the first time, it became cheaper to ship goods from Britain to northern Persia via the Suez Canal and Būšehr than it was to ship them from Britain to Tabrīz via Trebizond.',
          lang: 'en',
          cite: {
            source: 'iranica-hakimian-economy-qajar',
            loc: { section: 'ECONOMY viii. IN THE QAJAR PERIOD', para: '12' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/economy-viii-in-the-qajar-period'
          }
        },
        {
          id: 'q7',
          text: 'These loans, added to the expensive concessions that Said had made concerning the Suez Canal, meant that by 1875 Egypt was £100 million in debt. In that year, Ismail sold his shares in the Suez Canal Company, making the British government overnight the single largest shareholder in the company.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: {
              section: 'ISMAIL, TAWFIQ, AND THE URABI REVOLT: Khedive Ismail, 1863-79',
              para: '5'
            }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/24.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/0/0e/L%27inauguration_du_canal_de_Suez%2C_17_November_1869_Gal18_riou_001f.jpg/1280px-L%27inauguration_du_canal_de_Suez%2C_17_November_1869_Gal18_riou_001f.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:L%27inauguration_du_canal_de_Suez,_17_November_1869_Gal18_riou_001f.jpg',
    credit: { creator: 'Édouard Riou' },
    license: { id: 'public-domain' }
  }
})
