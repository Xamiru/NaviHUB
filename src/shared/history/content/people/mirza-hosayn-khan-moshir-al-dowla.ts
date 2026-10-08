import { definePerson } from '../../schema'

export default definePerson({
  id: 'mirza-hosayn-khan-moshir-al-dowla',
  names: [
    { text: 'Mirza Hosayn Khan Moshir-al-Dowla', lang: 'en', role: 'primary' },
    { text: 'میرزا حسین‌خان مشیرالدوله', lang: 'fa', role: 'native' },
    {
      text: 'Mīrzā Ḥosayn Khan Sepahsālār',
      lang: 'en',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '9' }
        }
      ]
    },
    {
      text: 'Mīrzā Ḥosayn Khan Mošīr-al-Dawla',
      lang: 'en',
      role: 'alternative',
      cites: [
        { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } }
      ]
    }
  ],
  researched: '2026-10-08',
  regions: ['iran', 'mena'],
  roles: ['diplomat', 'politician'],
  offices: [
    {
      title: 'Persian ambassador at the Ottoman court',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1858' },
            cites: [
              {
                source: 'iranica-algar-freemasonry-qajar',
                loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '9' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1870' },
            cites: [
              {
                source: 'iranica-algar-freemasonry-qajar',
                loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '9' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-algar-freemasonry-qajar',
          loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '9' }
        }
      ]
    },
    {
      title: 'grand vizier (ṣadr-e aʿẓam)',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1870-12' },
            cites: [
              {
                source: 'iranica-nabavi-journalism-qajar',
                loc: { section: 'JOURNALISM i. Qajar Period' }
              }
            ]
          },
          {
            value: { d: '1871-11' },
            cites: [
              {
                source: 'iranica-nashat-darbar-e-azam',
                loc: { section: 'DARBĀR-E AʿẒAM', para: '3' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1873-09' },
            cites: [
              {
                source: 'iranica-nabavi-journalism-qajar',
                loc: { section: 'JOURNALISM i. Qajar Period' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-nabavi-journalism-qajar',
          loc: { section: 'JOURNALISM i. Qajar Period' }
        }
      ]
    },
    {
      title: 'Minister of Foreign Affairs (wazir-e omur-e ḵāreja)',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1873' },
            cites: [
              {
                source: 'iranica-nabavi-journalism-qajar',
                loc: { section: 'JOURNALISM i. Qajar Period' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1880' },
            cites: [
              {
                source: 'iranica-nabavi-journalism-qajar',
                loc: { section: 'JOURNALISM i. Qajar Period' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-nabavi-journalism-qajar',
          loc: { section: 'JOURNALISM i. Qajar Period' }
        }
      ]
    },
    {
      title: 'Minister of War (wazir-e jang)',
      polity: 'polity:qajar-iran',
      start: {
        alts: [
          {
            value: { d: '1874' },
            cites: [
              {
                source: 'iranica-nabavi-journalism-qajar',
                loc: { section: 'JOURNALISM i. Qajar Period' }
              }
            ]
          }
        ]
      },
      end: {
        alts: [
          {
            value: { d: '1880' },
            cites: [
              {
                source: 'iranica-nabavi-journalism-qajar',
                loc: { section: 'JOURNALISM i. Qajar Period' }
              }
            ]
          }
        ]
      },
      cites: [
        {
          source: 'iranica-nabavi-journalism-qajar',
          loc: { section: 'JOURNALISM i. Qajar Period' }
        }
      ]
    }
  ],
  sections: [
    {
      kind: 'career',
      quotes: [
        {
          id: 'q1',
          text: 'Mīrzā Ḥosayn Khan Sepahsālār, the Persian ambassador at the Ottoman court from 1858 to 1870, is said to have owed much of his success in promoting Persian interests to such Masonic connections, but firm evidence of Masonic activity on his part while in Istanbul—indeed, even of his ever having been initiated—is lacking.',
          lang: 'en',
          cite: {
            source: 'iranica-algar-freemasonry-qajar',
            loc: { section: 'FREEMASONRY ii. In the Qajar Period', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/freemasonry-ii-in-the-qajar-period'
          }
        },
        {
          id: 'q2',
          text: 'Alarmed at the revival of Babi activity under Bahāʾ-Allāh’s de facto leadership, and at the easy access to Iranians enjoyed by the Babi leaders situated so near the Shiʿite shrine cities, Mīrzā Ḥosayn Khan Mošīr-al-Dawla (q.v.), the Iranian consul in Istanbul who at that point considered the Babis subversive, pressured the Ottomans to exile Bahāʾ-Allāh farther from Iran.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '13' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q3',
          text: 'Because he refused to build alliances with Ottoman politicians, Bahāʾ-Allāh had no means of resisting Mošīr-al-Dawla’s pressure on the sultan to exile him still farther away.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '14' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        },
        {
          id: 'q4',
          text: 'After a failed attempt by Ḥosayn Khan, the shah’s ambassador to the Porte, and Nāmeq Pasha, the wāli of Baghdad, to negotiate a division of no-man’s land, the governor of Kermānšāh threatened to uproot all the Ottoman telegraphic poles and replace them with Iranian posts.',
          lang: 'en',
          cite: {
            source: 'iranica-rubin-indo-european-telegraph-department',
            loc: { section: 'INDO-EUROPEAN TELEGRAPH DEPARTMENT', para: '8' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/indo-european-telegraph-department'
          }
        },
        {
          id: 'q5',
          text: 'Later, with the political restructuring of the 1870s and the promotion of the spirit of reform that was encouraged by Mirzā Ḥosayn Khan Mošir-al-Dawla during his tenure as grand vizier (ṣadr-e aʿẓam; December 1870-September 1873) and his subsequent positions as Minister of Foreign Affairs (wazir-e omur-e ḵāreja; 1873-80) and Minister of War (wazir-e jang; 1874-80), some change was introduced in the journalistic culture (Ādamiyat, p. 386).',
          lang: 'en',
          cite: {
            source: 'iranica-nabavi-journalism-qajar',
            loc: { section: 'JOURNALISM i. Qajar Period' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/journalism-i-qajar-period/'
          }
        },
        {
          id: 'q6',
          text: 'His advocacy of social reforms in the 1870s won him new respect from old foes like Mošīr-al-Dawla.',
          lang: 'en',
          cite: { source: 'iranica-cole-baha-allah', loc: { section: 'BAHĀʾ-ALLĀH', para: '17' } },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/baha-allah'
          }
        }
      ]
    }
  ],
  portrait: {
    url: 'https://thumb.wikimedia.org/wikipedia/commons/thumb/3/3a/Portrait_of_Mirza_Hossein_Khan_Moshir_al-Dowleh_-_Unknown_Artist_-_Islamic_Consultative_Assembly_Museum_of_Iran.jpg/1280px-Portrait_of_Mirza_Hossein_Khan_Moshir_al-Dowleh_-_Unknown_Artist_-_Islamic_Consultative_Assembly_Museum_of_Iran.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Portrait_of_Mirza_Hossein_Khan_Moshir_al-Dowleh_-_Unknown_Artist_-_Islamic_Consultative_Assembly_Museum_of_Iran.jpg',
    credit: { institution: 'Islamic Consultative Assembly Museum of Iran' },
    license: { id: 'public-domain' }
  },
  died: {
    alts: [
      {
        value: { d: '1881' },
        cites: [
          {
            source: 'iranica-cronin-army-qajar',
            loc: { section: 'ARMY v. Qajar Period, (4) Mirzā Ḥosayn Khan', para: '1' }
          }
        ]
      }
    ]
  },
  furtherReading: [
    { source: 'adamiyat-1973-andisheh-ye-taraqqi', perspective: 'iranian' },
    { source: 'sasani-1960-siyasatgaran-e-dowreh-ye-qajar', perspective: 'iranian' }
  ]
})
