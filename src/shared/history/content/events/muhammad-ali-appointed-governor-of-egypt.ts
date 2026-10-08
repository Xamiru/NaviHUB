import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'muhammad-ali-appointed-governor-of-egypt',
  names: [
    { text: 'Muhammad Ali appointed governor of Egypt', lang: 'en', role: 'primary' }
  ],
  researched: '2026-10-08',
  type: 'other',
  start: {
    alts: [
      {
        value: { d: '1805-06' },
        cites: [
          {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['mena'],
  prominence: 2,
  places: [
    {
      ref: 'place:cairo',
      cites: [
        { source: 'britannica-1911-mehemet-ali', loc: { section: 'MEHEMET ALI', para: '1' } }
      ]
    }
  ],
  polities: [
    { ref: 'polity:ottoman-empire' }
  ],
  participants: [
    {
      ref: 'person:muhammad-ali-of-egypt',
      role: 'leader',
      cites: [
        {
          source: 'loc-egypt-country-study-1990',
          loc: { section: 'Muhammad Ali, 1805-48', para: '3' }
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
          text: 'After the French left Egypt, an Ottoman army remained in the country. The Ottoman government was determined to prevent a revival of Mamluk power and autonomy and to bring Egypt under the control of the central government.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        },
        {
          id: 'q2',
          text: 'By 1803 it was apparent that a third party had emerged in the struggle for power in Egypt. This was the Albanian contingent of Ottoman forces that had come in 1801 to fight against the French.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '2' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    },
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q3',
          text: 'Muhammad Ali, who has been called the "father of modern Egypt," was able to attain control of Egypt because of his own leadership abilities and political shrewdness but also because the country seemed to be slipping into anarchy. The urban notables and the ulama believed that Muhammad Ali was the only leader capable of bringing order and security to the country. The Ottoman government, however, aware of the threat Muhammad Ali represented to the central authority, attempted to get rid of him by making him governor of the Hijaz. Eventually, the Ottomans capitulated to Egyptian pressure, and in June 1805, they appointed Muhammad Ali governor of Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q4',
          text: 'Between 1805 and 1811, Muhammad Ali consolidated his position in Egypt by defeating the Mamluks and bringing Upper Egypt under his control. Finally, in March 1811, Muhammad Ali had sixty-four Mamluks, including twenty-four beys, assassinated in the citadel. From then on, Muhammad Ali was the sole ruler of Egypt.',
          lang: 'en',
          cite: {
            source: 'loc-egypt-country-study-1990',
            loc: { section: 'Muhammad Ali, 1805-48', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/egypt/21.htm' }
        }
      ]
    }
  ],
  hero: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/2/2d/ModernEgypt%2C_Muhammad_Ali_by_Auguste_Couder%2C_BAP_17996.jpg/1280px-ModernEgypt%2C_Muhammad_Ali_by_Auguste_Couder%2C_BAP_17996.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:ModernEgypt,_Muhammad_Ali_by_Auguste_Couder,_BAP_17996.jpg',
    credit: {
      institution: 'Bibliotheca Alexandrina, Memory of Modern Egypt Digital Archive',
      creator: 'Auguste Couder'
    },
    license: { id: 'public-domain' }
  },
  furtherReading: [
    { source: 'jabarti-1958-ajaib-al-athar', perspective: 'arab' },
    { source: 'rafii-1982-asr-muhammad-ali', perspective: 'arab' }
  ]
})
