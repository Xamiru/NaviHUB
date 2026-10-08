import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'purchase-of-the-suez-canal-shares',
  names: [
    { text: 'British purchase of the Suez Canal shares', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'economic',
  start: {
    alts: [
      {
        value: { d: '1875' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Khedive Ismail, 1863-79', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 3,
  places: [
    { ref: 'place:cairo' },
    { ref: 'place:london' }
  ],
  polities: [
    { ref: 'polity:united-kingdom' },
    { ref: 'polity:khedivate-of-egypt' }
  ],
  participants: [
    {
      name: 'Ismail',
      role: 'head-of-state',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Khedive Ismail, 1863-79', para: '5' }
        }
      ]
    },
    {
      ref: 'person:benjamin-disraeli',
      role: 'head-of-government',
      cites: [
        {
          source: 'hansard-commons-1876-02-21-suez-canal-shares',
          loc: { section: 'HC Deb 21 February 1876 vol 227 cc562-661', para: '41' }
        }
      ]
    },
    {
      name: 'Messrs. Rothschild',
      role: 'participant',
      cites: [
        {
          source: 'hansard-commons-1876-02-21-suez-canal-shares',
          loc: { section: 'HC Deb 21 February 1876 vol 227 cc562-661', para: '41' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q2',
          text: 'Ismail greatly expanded Egypt\'s revenues and exports during his reign. But the country\'s prosperity was tied to the export of cotton, whose price was set on a fluctuating world market, making income uncertain. Moreover, Ismail\'s infrastructure development entailed more expenditure than Egypt\'s income could provide, with the result that he was obliged to contract foreign loans. These loans, added to the expensive concessions that Said had made concerning the Suez Canal, meant that by 1875 Egypt was £100 million in debt. In that year, Ismail sold his shares in the Suez Canal Company, making the British government overnight the single largest shareholder in the company.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Khedive Ismail, 1863-79', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-07', url: 'http://countrystudies.us/egypt/24.htm' }
        },
        {
          id: 'q3',
          text: 'I have agreed to purchase, subject to your sanction, the shares which belonged to the Khedive of Egypt in the Suez Canal, and I rely with confidence on your enabling me to complete a transaction in which the public interests are deeply involved.',
          lang: 'en',
          cite: {
            source: 'hansard-lords-1876-02-08-queens-speech',
            loc: { section: 'HL Deb 08 February 1876 vol 227 cc1-6', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://api.parliament.uk/historic-hansard/lords/1876/feb/08/the-queens-speech'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'The sale of Ismail\'s shares did not solve the country\'s financial problems, however, but merely staved off the crisis for another year.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Khedive Ismail, 1863-79', para: '5' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/24.htm' }
        },
        {
          id: 'q5',
          text: 'When Ismail suspended payment of interest on the loans in 1875, his creditors in Britain and France appointed two men to represent their interests and negotiate new arrangements with the khedive.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'From Intervention to Occupation, 1876-82', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/25.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/f/ff/Khedive_Isma%27il_Pasha.png/1280px-Khedive_Isma%27il_Pasha.png',
    page: 'https://commons.wikimedia.org/wiki/File:Khedive_Isma%27il_Pasha.png',
    credit: { institution: 'Bibliothèque nationale de France', creator: 'Gustave Le Gray' },
    license: { id: 'public-domain' }
  }
})
