import { definePeriod } from '../../schema'

export default definePeriod({
  id: 'reign-of-abdul-hamid-ii',
  names: [
    { text: 'Reign of Abdul Hamid II', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  periodType: 'reign',
  start: {
    alts: [
      {
        value: { d: '1876-08-31' },
        cites: [
          { source: 'lemo-chronik-1876', loc: { section: 'Chronik 1876', para: '72' } }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1909' },
        cites: [
          {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '10' }
          }
        ]
      }
    ]
  },
  regions: ['mena', 'europe'],
  prominence: 2,
  parent: 'polity:ottoman-empire',
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'His successor, Abdül Hamid II (r. 1876-1909), came to the throne with the approval of Midhat and other reformers.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '10' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        },
        {
          id: 'q2',
          text: 'Im Osmanischen Reich löst Padischah Abd Al Hamid II. (1842-1918) das erst 1876 eingerichtete Parlament auf und regiert fortan autokratisch.',
          lang: 'de',
          cite: { source: 'lemo-chronik-1878', loc: { section: 'Chronik 1878', para: '10' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.dhm.de/lemo/jahreschronik/1878.html'
          }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'Heavy borrowing from foreign banks in the 1870s to reinforce the treasury and the undertaking of new loans to pay the interest on older ones created a financial crisis that in 1881 obliged the Porte to surrender administration of the Ottoman debt to a commission representing foreign investors. The debt commission collected public revenues and transferred the receipts directly to creditors in Europe.',
          lang: 'en',
          cite: {
            source: 'loc-turkey-country-study-1995',
            loc: { section: 'External Threats and Internal Transformations', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/turkey/10.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/6/6e/Cuma_selaml%C4%B1%C4%9F%C4%B1_Abd%C3%BCl_Hamid_II_Hamidiye_Mosque_4.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Cuma_selaml%C4%B1%C4%9F%C4%B1_Abd%C3%BCl_Hamid_II_Hamidiye_Mosque_4.jpg',
    credit: { institution: 'Library of Congress', creator: 'Abdullah Frères' },
    license: { id: 'public-domain' }
  }
})
