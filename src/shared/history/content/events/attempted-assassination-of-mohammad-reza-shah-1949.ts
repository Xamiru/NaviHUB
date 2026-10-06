import { defineEvent } from '../../schema'

export default defineEvent({
  id: 'attempted-assassination-of-mohammad-reza-shah-1949',
  names: [
    {
      text: 'Attempted assassination of Mohammad Reza Shah (1949)',
      lang: 'en',
      role: 'primary'
    },
    { text: 'ترور نافرجام محمدرضا شاه در ۱۵ بهمن ۱۳۲۷', lang: 'fa', role: 'native' }
  ],
  researched: '2026-10-06',
  type: 'assassination',
  start: {
    alts: [
      {
        value: { d: '1949-02-04' },
        cites: [
          {
            source: 'iranica-azimi-great-britain-v',
            loc: { section: 'GREAT BRITAIN v. British influence in Persia, 1941-79', para: '17' }
          },
          {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '9' }
          },
          {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '18' }
          },
          {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '6' }
          },
          {
            source: 'iranica-chaqueri-eskandari-iraj',
            loc: { section: 'ESKANDARĪ, ĪRAJ', para: '5' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 3,
  places: [
    {
      ref: 'place:tehran',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '18' }
        }
      ]
    }
  ],
  partOf: [
    { ref: 'period:reign-of-mohammad-reza-shah' }
  ],
  participants: [
    {
      ref: 'person:mohammad-reza-pahlavi',
      role: 'victim',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '18' }
        }
      ]
    },
    {
      name: 'Nāṣer Faḵr Ārāʾi',
      role: 'perpetrator',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '18' }
        }
      ]
    },
    {
      name: 'Ayatollah Abu’l-Qāsem Kāšāni',
      role: 'participant',
      cites: [
        {
          source: 'iranica-rahnema-kashani',
          loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '18' }
        },
        {
          source: 'iranica-kazemi-fedaian-e-eslam',
          loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '6' }
        }
      ]
    }
  ],
  related: [
    { ref: 'event:founding-of-the-tudeh-party', rel: 'related' },
    { ref: 'event:founding-of-the-national-front-of-iran', rel: 'related' }
  ],
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'On 4 February 1949 during an official commemoration ceremony at the University of Tehran, Nāṣer Faḵr Ārāʾi shot five bullets at Mohammad Reza Shah. The shah escaped from the assassination attempt.',
          lang: 'en',
          cite: {
            source: 'iranica-rahnema-kashani',
            loc: { section: 'KĀŠĀNI, SAYYED ABU’L-QĀSEM', para: '18' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/kasani-abul-qasem/'
          }
        },
        {
          id: 'q2',
          text: 'An attempt is made on the Shah’s life and suspicion falls on the Tudeh Party; the party is officially outlawed and its leaders are arrested and jailed.',
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
        }
      ]
    },
    {
      kind: 'consequences',
      quotes: [
        {
          id: 'q3',
          text: 'The attempt on the shah’s life on 4 February 1949 provided the ruler with an opportunity to seize the initiative by establishing control over the cabinet and the Majles. Martial law was restored, the Tudeh party was outlawed, a number of leading politicians and journalists were arrested, and the Fedāīān’s patron, Ayatollah Kāšānī, was accused of collusion and exiled for some sixteen month to the Levant.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-fedaian-e-eslam',
            loc: { section: 'FEDĀʾĪĀN-E ESLĀM', para: '6' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/fedaian-e-esla/'
          }
        },
        {
          id: 'q4',
          text: 'Although the top leaders escaped the country, eight members of the central committee and a majority of the leaders of the Central united council were arrested and tried before a military tribunal. Thirteen of the fugitives received death sentences in absentia, and those who were caught were sentenced to terms of five to ten years',
          lang: 'en',
          cite: {
            source: 'iranica-zabih-communism-in-persia-1941-1953',
            loc: { section: 'COMMUNISM ii. In Persia from 1941 to 1953', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/communism-ii/'
          }
        },
        {
          id: 'q5',
          text: 'Following an assassination attempt on his life in Bahman 1327/February 1949, the shah proceeded to arrange not only for the convening of the constitutionally stipulated Senate but also for his long-cherished revision of the Constitution through a constituent assembly, the elections for which were conducted under martial law and were widely regarded to have been largely fraudulent.',
          lang: 'en',
          cite: {
            source: 'iranica-azimi-bakhash-kakar-elections',
            loc: {
              section: 'ELECTIONS i. Under the Qajar and Pahlavi monarchies, 1906-79',
              para: '13'
            }
          },
          provenance: {
            via: 'web',
            at: '2026-10-06',
            url: 'https://www.iranicaonline.org/articles/elections/'
          }
        },
        {
          id: 'q6',
          text: 'The Constituent Assembly convenes and grants the Shah power to dissolve Majles.',
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
        }
      ]
    }
  ]
})
