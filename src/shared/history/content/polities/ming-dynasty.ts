import { definePolity } from '../../schema'

export default definePolity({
  id: 'ming-dynasty',
  names: [
    { text: 'Ming dynasty', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-13',
  polityType: 'empire',
  start: {
    alts: [
      {
        value: { d: '1368' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '1' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1644' },
        cites: [
          {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['east-asia'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:nanjing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Chinese Regain Power', para: '1' }
        }
      ]
    },
    {
      ref: 'place:beijing',
      cites: [
        {
          source: 'loc-china-country-study-1987',
          loc: { section: 'The Chinese Regain Power', para: '1' }
        }
      ]
    }
  ],
  cshapes: [
    { set: 'early', code: 9903, to: 1645 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/8/87/Flag_Map_Ming_Dynasty_%281%29.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Flag_Map_Ming_Dynasty_(1).jpg',
    credit: { creator: 'Bình Tây Đại Nguyên Soái' },
    license: { id: 'cc0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'The Ming dynasty (1368-1644) was founded by a Han Chinese peasant and former Buddhist monk turned rebel army leader.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q2',
          text: 'Having its capital first at Nanjing (which means Southern Capital) and later at Beijing (Northern Capital), the Ming reached the zenith of power during the first quarter of the fifteenth century.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/11.htm' }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'The Chinese armies reconquered Annam, as northern Vietnam was then known, in Southeast Asia and kept back the Mongols, while the Chinese fleet sailed the China seas and the Indian Ocean, cruising as far as the east coast of Africa.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q4',
          text: 'The Ming maritime expeditions stopped rather suddenly after 1433, the date of the last voyage.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q5',
          text: 'The most notable event in the reign of the next monarch, Chêng-te (1506–1522), was the arrival of the Portuguese at Canton (1517).',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q6',
          text: 'During the reign of this sovereign, in the year 1592, the Japanese successfully invaded Korea, and Taikosarna, the regent of Japan, was on the point of proclaiming himself king of the peninsula, when a large Chinese force, answering to the invitation of the king, appeared and completely routed the Japanese army, at the same time that the Chinese fleet cut off their retreat by sea.',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        },
        {
          id: 'q7',
          text: 'Long wars with the Mongols, incursions by the Japanese into Korea, and harassment of Chinese coastal cities by the Japanese in the sixteenth century weakened Ming rule, which became, as earlier Chinese dynasties had, ripe for an alien takeover.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/11.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q8',
          text: 'The stability of the Ming dynasty, which was without major disruptions of the population (then around 100 million), economy, arts, society, or politics, promoted a belief among the Chinese that they had achieved the most satisfactory civilization on earth and that nothing foreign was needed or welcome.',
          lang: 'en',
          cite: {
            source: 'loc-china-country-study-1987',
            loc: { section: 'The Chinese Regain Power', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-13', url: 'http://countrystudies.us/china/11.htm' }
        },
        {
          id: 'q9',
          text: 'The Chinese now wished the Manchus to retire, but, having taken possession of Peking, they proclaimed the ninth son of Tʽien-ming emperor of China under the title of Shun-chi, and adopted the name of Ta-tsʽing, or “Great Pure,” for the dynasty (1644).',
          lang: 'en',
          cite: { source: 'britannica-1911-china', loc: { section: 'CHINA: History' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://en.wikisource.org/wiki/1911_Encyclop%C3%A6dia_Britannica/China'
          }
        }
      ]
    }
  ]
})
