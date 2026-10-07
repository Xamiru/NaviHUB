import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'founding-of-the-national-front-of-iran',
  names: [
    { text: 'Founding of the National Front of Iran', lang: 'en', role: 'primary' },
    { text: 'جبهه ملی ایران', lang: 'fa', role: 'native' },
    {
      text: 'Jebha-ye Melli',
      lang: 'fa-Latn',
      role: 'alternative',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1949' }
        }
      ]
    }
  ],
  researched: '2026-10-07',
  type: 'founding',
  start: {
    alts: [
      {
        value: { d: '1949-10-22' },
        cites: [
          {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '20' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 2,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: {
            section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
            para: '15'
          }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      name: 'Moḥammad Moṣaddeq',
      role: 'leader',
      cites: [
        {
          source: 'iranica-yarshater-chronology-part-3',
          loc: { section: 'Chronology of Iranian History Part 3, 1949' }
        },
        {
          source: 'iranica-azimi-bakhash-kakar-elections',
          loc: {
            section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
            para: '14'
          }
        }
      ]
    },
    {
      name: 'Ayatollah Abu’l-Qāsem Kāšāni',
      role: 'participant',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '20' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:iran-crisis-of-1946', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'Establishment of Jebha-ye Melli (National Front), founded by Moḥammad Moṣaddeq, a loose association of diverse political groups sharing the common goals of Persian independence, freedom, and resistance to foreign intervention, with the Iran Party serving as its backbone and Moḥammad Moṣaddeq as its leader.',
          lang: 'en',
          cite: {
            source: 'iranica-yarshater-chronology-part-3',
            loc: { section: 'Chronology of Iranian History Part 3, 1949' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/chronology-of-iranian-history-part-3/'
          }
        },
        {
          id: 'q2',
          text: 'The National Front, under the leadership of Moṣaddeq, announced its formation on the eve of 22 October 1949.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '20' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        }
      ]
    },
    {
      kind: 'causes',
      quotes: [
        {
          id: 'q3',
          text: 'The failure of the authorities to live up to their promises, however, resulted in widespread protest, violence, and demands for the dismissal of Eqbāl. It also prompted the formation of the National Front (Jabha-ye mellī) led by Moṣaddeq.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '14'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        },
        {
          id: 'q4',
          text: 'From 1949 on, sentiment for nationalization of Iran\'s oil industry grew.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/17.htm' }
        },
        {
          id: 'q5',
          text: 'Politically conscious Iranians were aware, however, that the British government derived more revenue from taxing the concessionaire, the Anglo-Iranian Oil Company (AIOC--formerly the Anglo-Persian Oil Company), than the Iranian government derived from royalties.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'MOSSADEQ AND OIL NATIONALIZATION', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-06', url: 'http://countrystudies.us/iran/17.htm' }
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q6',
          text: 'Seven members of the National Front were elected from the capital, including Moṣaddeq, who, with 30,738 votes, became Tehran’s first deputy',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '15'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        },
        {
          id: 'q7',
          text: 'The primary objective of Moṣaddeq and his colleagues was to lend substance to Persia’s independence by asserting her sovereign rights over her natural sources of wealth, particularly oil.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '22' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/great-britain-v/'
          }
        }
      ]
    }
  ],
  course: [
    {
      date: {
        alts: [
          {
            value: { d: '1949-11-02' },
            cites: [
              {
                source: 'iranica-rahnema-kashani',
                loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '23' }
              }
            ]
          },
          {
            value: { d: '1949-11-04' },
            cites: [
              {
                source: 'iranica-azimi-bakhash-kakar-elections',
                loc: {
                  section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
                  para: '15'
                }
              },
              {
                source: 'iranica-kazemi-fedaian-e-eslam',
                loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '6' }
              }
            ]
          }
        ]
      },
      quote: {
        id: 'q8',
        text: 'On 2 November 1949, twelve days after the inception of the National Front, ʿAbd-al-Ḥosayn Hažir, the powerful minister of court and one of the shah’s closest confidants, was assassinated at the Sepahsalar Mosque (Masjed-e Sepahsālār).',
        lang: 'en',
        cite: {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '23' }
        },
        provenance: {
          via: 'web',
          at: '2026-10-06',
          url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
        }
      }
    }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/f/f5/Some_members_of_firts_national_front_of_Iran%2C_Mohammad_Mosaddegh_and_Hossein_Fatemi_-_Early_1950s.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Some_members_of_firts_national_front_of_Iran,_Mohammad_Mosaddegh_and_Hossein_Fatemi_-_Early_1950s.jpg',
    credit: { institution: 'Institute for Iranian Contemporary Historical Studies' },
    license: { id: 'public-domain' }
  }
})
