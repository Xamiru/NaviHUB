import { definePerson } from '../../schema'

export default definePerson({
  id: 'allahverdi-khan',
  names: [
    { text: 'Allahverdi Khan', lang: 'en', role: 'primary' },
    { text: 'الله‌وردی‌خان', lang: 'fa', role: 'native', translit: 'Allāhverdī Khan' }
  ],
  researched: '2026-10-13',
  died: {
    alts: [
      {
        value: { d: '1613-06-03' },
        cites: [
          {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '3' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  roles: ['military', 'politician'],
  offices: [
    {
      title: 'Commander-in-chief of the army (sardār-e laškar)',
      polity: 'polity:safavid-iran',
      cites: [
        { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '8' } }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/e/e4/Si-o-se_Pol%2C_Isfah%C3%A1n%2C_Ir%C3%A1n%2C_2016-09-20%2C_DD_91.jpg/1280px-Si-o-se_Pol%2C_Isfah%C3%A1n%2C_Ir%C3%A1n%2C_2016-09-20%2C_DD_91.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Si-o-se_Pol,_Isfah%C3%A1n,_Ir%C3%A1n,_2016-09-20,_DD_91.jpg',
    credit: { creator: 'Diego Delso' },
    license: { id: 'cc-by-sa', version: '4.0', url: 'https://creativecommons.org/licenses/by-sa/4.0' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In order to counterbalance the power of the qizilbāš Turkman tribesmen, who constituted the Safavid military aristocracy, Shah ʿAbbās I created a standing army of Georgian, Armenian, and Circassian Christians taken prisoner in the course of campaigns in the Caucasus.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/allahverdi-khan-d-1'
          }
        },
        {
          id: 'q2',
          text: 'In place of the office of amīr-al-omarā, Shah ʿAbbās created the office of sardār-e laškar, or commander-in-chief of the army; the name suggests the triumph of the Persian elements in the Safavid state, but, ironically, the office went initially to the Georgian ḡolām Allāhverdī Khan.',
          lang: 'en',
          cite: { source: 'iranica-savory-abbas-i', loc: { section: 'ʿABBĀS I', para: '8' } },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/abbas-i'
          }
        }
      ]
    },
    {
      kind: 'career',
      quotes: [
        {
          id: 'q3',
          text: 'In 997/1589, Allāhverdī Khan agreed to be party to the assassination of the kingmaker and wakīl Moršed-qolī Khan Ostāǰlū, whose excessive power could no longer be tolerated by the shah; for this service, he was rewarded by being made governor of Jorpādaqān near Isfahan, with the rank of sultan',
          lang: 'en',
          cite: {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '1' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/allahverdi-khan-d-1'
          }
        },
        {
          id: 'q4',
          text: 'Allāhverdī Khan distinguished himself in action in Shah ʿAbbās’s great victory over the Uzbeks at Rebāṭ-e Parīān in Moḥarram, 1007/August, 1598, a victory which led to the recovery of Herat after ten years of Uzbek occupation.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/allahverdi-khan-d-1'
          }
        },
        {
          id: 'q5',
          text: 'By this act, Allāhverdī Khan became the most powerful man in the Safavid state after the shah.',
          lang: 'en',
          cite: {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/allahverdi-khan-d-1'
          }
        },
        {
          id: 'q6',
          text: 'In 1602, his general Allāhverdi Khan took Bahrain, which had been in Portuguese hands since 922/1516-17, and in 1614 Gamru (Gombron), the last foothold of the Portuguese on the Persian mainland.',
          lang: 'en',
          cite: {
            source: 'iranica-floor-hormuz-ii',
            loc: { section: 'HORMUZ ii. Islamic Period', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/hormuz-ii'
          }
        }
      ]
    },
    {
      kind: 'death',
      quotes: [
        {
          id: 'q7',
          text: 'Allāhverdī Khan died on 14 Rabīʿ II 1022/3 June 1613',
          lang: 'en',
          cite: {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/allahverdi-khan-d-1'
          }
        },
        {
          id: 'q8',
          text: 'Shah ʿAbbās demonstrated his genuine respect and affection for him by personally supervising the funeral arrangements, and by going to the khan’s house the day after his death to offer his personal condolences to his family',
          lang: 'en',
          cite: {
            source: 'iranica-savory-allahverdi-khan',
            loc: { section: 'ALLĀHVERDĪ KHAN (1)', para: '3' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-13',
            url: 'https://www.iranicaonline.org/articles/allahverdi-khan-d-1'
          }
        }
      ]
    }
  ]
})
