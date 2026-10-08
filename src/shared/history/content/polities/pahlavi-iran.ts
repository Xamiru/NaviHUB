import { definePolity } from '../../schema'

export default definePolity({
  id: 'pahlavi-iran',
  names: [
    { text: 'Pahlavi Iran', lang: 'en', role: 'primary' },
    {
      text: 'کشور شاهنشاهی ایران',
      lang: 'fa',
      role: 'native',
      translit: 'Kešvar-e Šāhanšāhi-ye Irān'
    },
    {
      text: 'Persia',
      lang: 'en',
      role: 'former',
      cites: [
        {
          source: 'iranica-kazemi-anglo-persian-oil-company',
          loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '9' }
        }
      ]
    }
  ],
  researched: '2026-10-08',
  polityType: 'kingdom',
  start: {
    alts: [
      {
        value: { d: '1925-12-12' },
        cites: [
          {
            source: 'iranica-sheikh-ol-islami-ahmad-shah',
            loc: { section: 'AḤMAD SHAH QĀJĀR', para: '16' }
          }
        ]
      }
    ]
  },
  end: {
    alts: [
      {
        value: { d: '1979-02-12' },
        cites: [
          {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '4' }
          }
        ]
      },
      {
        value: { d: '1979-02-11' },
        cites: [
          {
            source: 'iranica-yarshater-chronology-part-4',
            loc: { section: 'Chronology of Iranian History Part 4, 1979' }
          }
        ]
      }
    ]
  },
  regions: ['iran'],
  prominence: 1,
  capitals: [
    {
      ref: 'place:tehran',
      cites: [
        { source: 'loc-iran-country-study-1987', loc: { section: 'Major Cities', para: '1' } }
      ]
    }
  ],
  predecessors: [
    {
      ref: 'polity:qajar-iran',
      cites: [
        {
          source: 'loc-iran-country-study-1987',
          loc: { section: 'THE ERA OF REZA SHAH', para: '1' }
        }
      ]
    }
  ],
  dynasties: ['period:pahlavi-dynasty'],
  cshapes: [
    { set: 'world', code: 630, from: 1925.95, to: 1979.11 }
  ],
  hero: {
    url: 'https://upload.wikimedia.org/wikipedia/commons/4/48/Reza_shah_coronation.jpg',
    page: 'https://commons.wikimedia.org/wiki/File:Reza_shah_coronation.jpg',
    credit: {
      institution: 'تاجگذاری شاهنشاهان ایران (Central Council of the Imperial Celebrations, 1967)'
    },
    license: { id: 'public-domain' }
  },
  sections: [
    {
      kind: 'overview',
      quotes: [
        {
          id: 'q1',
          text: 'In October 1925, a Majlis dominated by Reza Khan\'s men deposed the Qajar dynasty; in December the Majlis conferred the crown on Reza Khan and his heirs.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '1' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/15.htm' }
        },
        {
          id: 'q2',
          text: 'Superficially, the bureaucracy existed within the framework set by the Majlis; in practice, it was an extension of the Pahlavi household.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-administration-pahlavi',
            loc: { section: 'ADMINISTRATION in Iran vii. Pahlavi period', para: '2' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/administration-vii-pahlavi/'
          }
        }
      ]
    },
    {
      kind: 'course',
      quotes: [
        {
          id: 'q3',
          text: 'To extend government control and promote Westernization, the shah overhauled the administrative machinery and vastly expanded the bureaucracy.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE ERA OF REZA SHAH', para: '3' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/15.htm' }
        },
        {
          id: 'q4',
          text: 'In 1935 it was renamed the Anglo-Iranian Oil Company (AIOC) to conform with Reżā Shah’s wish that foreign governments should call the country Iran rather than Persia.',
          lang: 'en',
          cite: {
            source: 'iranica-kazemi-anglo-persian-oil-company',
            loc: { section: 'ANGLO-PERSIAN OIL COMPANY', para: '9' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/anglo-persian-oil-company/'
          }
        },
        {
          id: 'q5',
          text: 'In 1941 the abdication of the first Pahlavi monarch under the pressure of the Allies, particularly the British, halted the period of centralization and further bureaucratization.',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-administration-pahlavi',
            loc: { section: 'ADMINISTRATION in Iran vii. Pahlavi period', para: '11' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/administration-vii-pahlavi/'
          }
        },
        {
          id: 'q6',
          text: 'Based on a division of labor requiring technical specialization, it was hierarchically organized under the central organ, i.e. the shah. Only in name was it responsible to the legislature;',
          lang: 'en',
          cite: {
            source: 'iranica-sheikholeslami-administration-pahlavi',
            loc: { section: 'ADMINISTRATION in Iran vii. Pahlavi period', para: '13' }
          },
          provenance: {
            via: 'web',
            at: '2026-10-08',
            url: 'https://www.iranicaonline.org/articles/administration-vii-pahlavi/'
          }
        },
        {
          id: 'q7',
          text: 'Hoveyda\'s appointment marked the beginning of nearly a decade of impressive economic growth and relative political stability at home.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/19.htm' }
        },
        {
          id: 'q8',
          text: 'These elections were carefully controlled by the authorities.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'State and Society, 1964-74', para: '8' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/19.htm' }
        }
      ]
    },
    {
      kind: 'aftermath',
      quotes: [
        {
          id: 'q9',
          text: 'On February 11, twenty-two senior military commanders met and announced that the armed forces would observe neutrality in the confrontation between the government and the people. The army\'s withdrawal from the streets was tantamount to a withdrawal of support for the Bakhtiar government and acted as a trigger for a general uprising. By late afternoon on February 12, Bakhtiar was in hiding, and key points throughout the capital were in rebel hands. The Pahlavi monarchy had collapsed.',
          lang: 'en',
          cite: {
            source: 'loc-iran-country-study-1987',
            loc: { section: 'THE BAKHTIAR GOVERNMENT', para: '4' }
          },
          provenance: { via: 'web', at: '2026-10-08', url: 'http://countrystudies.us/iran/22.htm' }
        }
      ]
    }
  ],
  furtherReading: [
    { source: 'makki-1983-tarikh-e-bist-saleh-ye-iran', perspective: 'iranian' },
    {
      source: 'ruhani-1977-barresi-va-tahlili-az-nehzat-e-imam-khomeini',
      perspective: 'iranian'
    },
    { source: 'ivanov-1952-ocherk-istorii-irana', perspective: 'russian-soviet' }
  ]
})
